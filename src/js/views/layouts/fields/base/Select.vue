<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 2/2/21, 7:45 AM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div ref="select" class="i-select" :class="classForField">
        <div :class="getHtmlClass('select.header')" @click="onShow">
            {{ getSelects() }}
        </div>
        <ul :class="getHtmlClass('select.items.self')" ref="items">
            <li v-if="search" :class="getHtmlClass('select.items.search.self')">
                <input ref="search" type="text" :placeholder="getTrans('ivue.fields.select.search')" :class="getHtmlClass('select.items.search.input')" @keyup="filtering($event)" v-model="searchText">
            </li>
            <li v-if="actions" :class="getHtmlClass('select.items.actions.self')">
                <div :class="getHtmlClass('select.items.actions.group')">
                    <button v-if="multiple" @click="selectAll" type="button" :class="getHtmlClass('select.items.actions.selectAll')">{{ trans('ivue.fields.select.actions.selectAll') }}</button>
                    <button type="button" @click="deSelect" :class="getHtmlClass('select.items.actions.deSelectAll')">{{ trans('ivue.fields.select.actions.deselect') }}{{ multiple ? ' ' + trans('ivue.fields.select.actions.all') : ''}}</button>
                </div>
            </li>
            <li :class="getHtmlClass('select.item')" v-for="(item, index) in itemsByFiltered" :data-key="index" :data-value="item.value"
                @click="onSelect(item, index, $event)" v-html="viewItem(item, index, itemsByFiltered)">
            </li>
        </ul>
    </div>
</template>


<script>
    import GlobalField from "../../../../handel/functions/field/global.func";
    import SelectField from "../../../../handel/functions/field/select.func";
    import LoadSingleData from "../../../../handel/functions/store/loadSingle.func";
    export default {
        name: 'i-base-select',
        index: {
            group: 'fields',
            html: 'select',
        },
        model: {
            event: 'change'
        },
        props: {
            label: String,
            value: [String, Number, Object, Array],
            placeholder: {
                type: String,
                default: 'ivue.fields.select.placeholder'
            },
            placeholderSelected: {
                type: String,
                default: 'ivue.fields.select.placeholderSelected'
            },
            desc: [String, Number, Object, Array],
            storeNamespace: {
                type: [String, Object],
                default: 'DataSingle'
            },
            fieldIndex: [String, Object, Function],
            search: Boolean,
            multiple: Boolean,
            actions: Boolean,
            diff: [String, Number, Object, Array],
            release: [Function, Object],
            view: Function,
            icon: Object,
            url: [String, Function],
            type: {
                type: String,
                default: 'single'
            },
            items: {
                type: [Object, Array, Function],
                default: () => []
            },
            firstItems: {
                type: [Object, Array],
                default: () => []
            },
            firstSelect: Boolean,
            options: {
                type: [Object, Array, Function],
                default: () => []
            },
            query: {
                type: [Object, Array, Function],
                default: () =>  {}
            },
            css: {
                type: [Object, Array],
                default: () => []
            },
        },
        data() {
            return {
                model: null,
                searchText: '',
                selected: null,
                loading: false,
                height: 0,
                serverItems: [],
                serverQuery: {
                    page: 0,
                    pages: 1,
                },
                useModel: false,
                useFirst: false,
                modelAll: null
            }
        },
        mounted() {
            var $this = this;
            window.onclick = function(event) {
                if (event.target.matches && !event.target.matches('.select-title, .select-item, .select-search input, .select-actions div button'))
                    $('.select-items').removeClass('d-block')
            }
            $(document).ready(function(){
                if ($this.url)
                    $($this.$refs.items).scroll(function() {
                        var $el = $(this);
                        if (!$this.loading && $el.scrollTop() + $($this.$refs.select).outerHeight(true) > $el.children().length  * $($el.children()[0]).height()){
                            $this.moreLoad();
                        }

                    });
            });
            this.checkItems();
        },
        created() {
            LoadSingleData.setValueOnCreate(this)
            if (this.url)this.moreLoad()
        },
        computed: {
            ...GlobalField.computed(),
            ...SelectField.computed,
        },
        methods: {
            ...GlobalField.methods(),
            ...SelectField.methods,
        },
        watch: {
            ...GlobalField.watch(),
            ...SelectField.watch
        }
    }

</script>
