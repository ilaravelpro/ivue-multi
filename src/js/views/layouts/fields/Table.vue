<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 1/5/21, 12:07 PM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div :class="getHtmlClass('table.self')">
        <h5 v-if="title" :class="getHtmlClass('table.title')">{{ title }}</h5>
        <button :class="getHtmlClass('table.btnLoad')" v-if="!viewTable" @click="viewTable = !viewTable">{{ trans('ivue.fields.table.load') }}</button>
        <div :class="getHtmlClass('table.contents.self')" v-if="viewTable">
            <component v-if="getSlots('columns')" :is="getSlots('columns')"
                       :store-namespace="storeNamespace"></component>
            <div v-else :class="getHtmlClass('table.contents.header.self')">
                <div :class="getHtmlClass('table.contents.header.right')"></div>
                <div v-if="getOption('fields.prepend')" v-for="item in getOption('fields.prepend')"
                     :class="handelClassTableItem(getHtmlClass('table.contents.header.prepend'), item)" v-text="item.title || item.attrs.placeholder"></div>
                <div :class="handelClassTableItem(getHtmlClass('table.contents.header.main'), 'column')" v-for="column in getColumns">{{ column ? column + ' '+
                    String(getOption('unit.column')).toUpperCase() : '' }}
                </div>
                <div v-if="getOption('fields.append')" v-for="item in getOption('fields.append')"
                     :class="handelClassTableItem(getHtmlClass('table.contents.header.append'), item)" v-text="item.title || item.attrs.placeholder"></div>
            </div>
            <div class="d-flex" v-for="(row, index) in getRows">
                <div class="my-auto" :class="getHtmlClass('table.contents.body.right')">{{ row }} {{ getOption('unit.row') ? getOption('unit.row') :
                    String(getOption('prefix.row')).toUpperCase() }}
                </div>
                <div v-if="getOption('fields.prepend')" v-for="item in getOption('fields.prepend')" :class="handelClassTableItem(getHtmlClass('table.contents.body.prepend'), item)">
                    <component :is="item.component" v-bind="item.attrs"
                               :field-index="handelIndexAP(item, row, index)"
                               :store-namespace="storeNamespace"></component>
                </div>
                <div :class="handelClassTableItem(getHtmlClass('table.contents.body.main.self'), 'column')" v-for="(column, key) in getColumns">
                    <div v-if="getOption('fields.columns')" :class="getHtmlClass('table.contents.body.main.group')">
                        <div v-for="item in getOption('fields.columns')" :class="getHtmlClass('item')">
                            <component :is="item.component" v-bind="item.attrs"
                                       :field-index="handelIndex(item, row, index, column, key)"
                                       :store-namespace="storeNamespace"></component>
                            <div :class="getHtmlClass('table.contents.body.main.space')"></div>
                        </div>
                    </div>
                </div>
                <div v-if="getOption('fields.append')" v-for="item in getOption('fields.append')" :class="handelClassTableItem(getHtmlClass('table.contents.body.append'), item)">
                    <component :is="item.component" v-bind="item.attrs"
                               :field-index="handelIndexAP(item, row, index)"
                               :store-namespace="storeNamespace"></component>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import LoadSingleData from "../../../handel/functions/store/loadSingle.func";

    export default {
        name: 'i-table',
        index: {
            group: 'fields',
            html: 'table',
        },
        props: {
            title: String,
            slots: Object,
            rows: [Object, Array, Function],
            columns: [Object, Array, Function],
            storeNamespace: {
                type: [String, Object],
                default: 'DataSingle'
            },
            transType: {
                type: [String, Object],
                default: 'current'
            },
            fieldIndex: [String, Object, Function],
            useIndex: Boolean,
            handelExternalIndex: Function,
            options: {
                type: [Object, Array, Function],
                default: () => []
            },
            css: {
                type: [Object, Array],
                default: () => []
            },
        },
        data() {
            return {
                viewTable: false
            }
        },
        computed: {
            ...LoadSingleData.computed(),
            getColumns() {
                return typeof (this.columns) === 'function' ? this.columns(this.getValue, this.updateValue) : this.columns;
            },
            getRows() {
                return typeof (this.rows) === 'function' ? this.rows(this.getValue, this.updateValue) : this.rows;
            },
        },
        methods: {
            ...LoadSingleData.methods(),
            handelIndex: function (item, row, index, column, key) {
                if (this.handelExternalIndex) return this.handelExternalIndex(item, row, index, column, key)
                if (this.useIndex)
                    return this.fieldIndex + '.'  + this.getOption('prefix.row')+ index + '.' + item.name + '.' + this.getOption('prefix.column')+ key;
                return this.fieldIndex + '.'  + String(row).replace('.', '_') + '.' + item.name + '.' + String(column).replace('.', '_');
            },
            handelIndexAP: function (item, row, index) {
                if (this.useIndex)
                    return this.fieldIndex + '.' + (this.getOption('prefix.column') ? this.getOption('prefix.row')+ index + '.' + item.name : item.name + '.' + this.getOption('prefix.row')+ index);
                return this.fieldIndex + '.' + (this.getOption('unit.column') ? String(row).replace('.', '_') + '.' + item.name : item.name + '.' + String(row).replace('.', '_'));
            },
            handelClassTableItem($classes = '', item = '') {
                var $iclasses = item instanceof String ? this.getHtmlClass(item) : item.classes
                if ($iclasses instanceof Object) {
                    $.each($iclasses, function (i, v) {
                        if (v) $classes += ' ' + i;
                    })
                }else if($iclasses)
                    $classes += ' ' + $iclasses;
                return $classes
            }
        }
    }
</script>
