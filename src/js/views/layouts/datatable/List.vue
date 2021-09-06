<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 1/29/21, 6:09 PM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div :class="getHtmlClass('section')" :id="id">
        <div v-if="filter" :class="getHtmlClassOther('filter.self', {'index.filter.noChild': !child})">
            <div :class="getHtmlClass('filter.form.self')">
                <div :class="getHtmlClass('filter.form.fields.self')">
                    <div :class="getHtmlClassOther('filter.form.fields.type.self', {'index.filter.form.fields.type.isChild': child})">
                        <div :class="getHtmlClass('filter.form.fields.type.group')">
                            <i-base-select :items="getFilters" firstSelect type="array"
                                           v-model="filterData.type"/>
                        </div>
                    </div>
                    <div :class="getHtmlClassOther('filter.form.fields.value.self', {'index.filter.form.fields.value.isChild': child})">
                        <div :class="getHtmlClass('filter.form.fields.value.group')">
                            <i-base-select  v-if="filterData.type && filterData.type.type === 'select'" :multiple="filterData.type.multiple" type="array"
                                            :items="filterData.type.items"
                                            v-model="filterData.value"/>
                        </div>
                        <i-input  v-if="filterData.type && filterData.type.type === 'text'" v-model="filterData.value"  placeholder="ivue.datatable.list.filter.search" :options="{icon: {append: {class: getHtmlClass('filter.form.fields.value.icon')}}}" />
                    </div>
                </div>
            </div>
            <div :class="getHtmlClassOther('filter.form.actions.self', {'index.filter.form.actions.isChild': child})">
                <button v-if="server" :class="getHtmlClass('filter.form.actions.search')" @click="paginateServer()">{{ trans("ivue.datatable.list.filter.buttons.search") }}</button>
                <button :class="getHtmlClass('filter.form.actions.reset')" @click="resetQuery()">{{ trans("ivue.datatable.list.filter.buttons.reset") }}</button>
            </div>
        </div>

        <div v-if="status && iStatuses && iStatuses instanceof Array && iStatuses.length > 1" :class="getHtmlClassOther('filter.status.self', {'index.filter.status.isChild': child, 'index.filter.status.noChild': !child})">
            <button v-for="(status, index) in iStatuses" :class="getHtmlClassOther('filter.status.btn.self', {'index.filter.status.btn.noChild': (!child ? true : index),
             'index.filter.status.btn.isStatus': filterStatus === status.value,
             'index.filter.status.btn.noChildNoStatus': !child && filterStatus !== status.value,
             'index.filter.status.btn.isChildNoStatus': child && filterStatus !== status.value,
            })" @click="changeStatus(status.value)">
                {{ capitalizeFirstLetter(status.text) }}
            </button>
        </div>

        <div :class="getHtmlClassOther('container.self', {'index.container.isChild': child})">
            <div :class="getHtmlClass('container.list.self')">
                <loading :status="!iLoading"/>
                <table>
                    <thead>
                    <tr :class="getHtmlClass('container.list.head')">
                        <th v-for="column in columns" :key="column.name" @click="sortBy(column.name)"
                            :class="sortKey === column.name ? (sortOrders[column.name] > 0 ? 'sorting_asc' : 'sorting_desc') : 'sorting'"
                            :style="`width: ${100 / (columns.length + 2)}%; cursor:pointer;`">
                            {{ trans(column.label) }}
                        </th>
                        <th v-if="action" :style="`width: ${100 / (columns.length + 2)}%; cursor:pointer;`">{{ trans("ivue.datatable.list.actions.title") }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in paginatedItems" :key="item.id">
                        <td v-for="column in columns">
                            <slot v-if="$scopedSlots['item.'+column.name]" :name="'item.'+column.name" v-bind:column="column" v-bind:item="item"></slot>
                            <template v-else>
                                {{iPath.get(item, column.name)}}
                            </template>
                        </td>
                        <td v-if="action">
                            <button v-for="(action, index) in getActions" v-if="actionCheck(item, action, index)" @click="actionItem(item, action)"
                                    :class="getHtmlClassOther('container.list.actions.btn.self', {'index.container.list.actions.btn.space': index !== Object.keys(getActions)[Object.keys(getActions).length - 1]})" :title="action.title">
                                <span :class="action.icon"></span>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div :class="getHtmlClass('container.list.pagination.self')">
                <div :class="getHtmlClass('container.list.pagination.start.self')">
                    <div :class="getHtmlClass('container.list.pagination.start.length.self')">
                        <select v-model="pagination.length" :class="getHtmlClass('container.list.pagination.start.length.select')" id="rawsPerPage" @change="resetPagination()"
                                data-toggle="tooltip" data-placement="top" :title="getTrans('ivue.datatable.list.pagination.rawsPerPage')">
                            <option v-for="itemPerPage in itemsPerPage" :value="itemPerPage">{{ itemPerPage }}</option>
                        </select>
                    </div>
                    <i-datatable-pagination :class="getHtmlClass('container.list.pagination.start.model')" :current="iMeta.current_page" :pages="iMeta.last_page"
                                            v-on:update:current="pagination.current = $event"/>
                </div>
                <div :class="getHtmlClass('container.list.pagination.end.self')">
                    <div :class="getHtmlClass('container.list.pagination.end.text')">
                        {{pagination.from}} - {{pagination.to}} {{ trans('ivue.datatable.list.pagination.of') }} {{pagination.total}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import IDatatablePagination from "./Pagination";
    import DataTableList from "../../../handel/functions/datatable/list.func";

    export default {
        name: "i-datatable-list",
        index: {
            group: 'datatable',
            html: 'list',
        },
        components: {IDatatablePagination},
        props: {
            id: String,
            resource: String,
            url: String,
            status_url: String,
            columns: [Object, Array],
            options: Object,
            items: [Array, Object],
            storeNamespace: {
                type: String,
                default: 'DataIndex'
            },
            edit: {
                type: Boolean,
                default: true
            },
            delete: {
                type: Boolean,
                default: true
            },
            action: {
                type: Boolean,
                default: true
            },
            filter: {
                type: Boolean,
                default: true
            },
            server: {
                type: Boolean,
                default: true
            },
            status: {
                type: Boolean,
                default: true
            },
            actions: [Object, Function],
            baseFilter: [Array, Object, Function],
            baseQuery: [Array, Object, Function],
            newAction: Object,
            child: Boolean,
            actionIf: Function,
        },
        data() {
            return {
                iPath: window.iPath,
                filterData: {
                    type: {},
                    operator: {},
                    value: '',
                },
                filterStatus: 'active',
                styleTag: null,
                sortKey: 'id',
                sortOrders: {},
                pagination: {
                    current: 1,
                    length: 20,
                    total: 0,
                    from: 1,
                    to: 1
                },
            }
        },
        computed: {
            ...DataTableList.computed,
        },
        created() {
            var $this = this;
            this.setState('resource', this.resource);
            if (this.status) {
                this.fetchStatus()
            }
            if (this.server) this.paginateServer();
            this.columns.forEach((column) => {
                $this.sortOrders[column.name] = -1;
            });
        },
        mounted() {
            this.renderStyle();
        },
        watch: {
            ...DataTableList.watch
        },
        methods: {
            ...DataTableList.methods,
        },
    }
</script>

<style scoped>

</style>
