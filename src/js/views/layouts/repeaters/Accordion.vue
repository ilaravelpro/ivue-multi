<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 1/5/21, 12:04 PM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div :class="getHtmlClass('main')">
        <h5 v-if="title" v-text="title"></h5>
        <div v-if="getErrorStatus(getIndex('error'))" :class="`${getHtmlClass('alert')}-${getErrorStatus(getIndex('error')) === 'valid' ? 'success' : 'danger'}`" role="alert">{{ getError(getIndex('error') + '.text') }}</div>
        <div :class="getHtmlClass('add.self')" v-if="getOption('addBtn') !== false">
            <div :class="getHtmlClass('add.item')">
                <a @click="addRow"
                   :class="getHtmlClass('add.link')">
                    <i :class="getHtmlClass('add.icon')"></i> {{ trans(addTitle, transType) }}
                </a>
            </div>
        </div>
        <div :class="getHtmlClass('contents.self')" :id="id">
            <div v-for="(row, index)  in (getOption('items') ? getOption('items') : getValue(getIndex('get')))" :class="getHtmlClass('contents.card.self')" >
                <div :class="getHtmlClass('contents.card.head.self')" :id="'heading_' + id + '_' +index">
                    <div :class="getHtmlClass('contents.card.head.title.self')" data-toggle="collapse" :data-target="'#collapse_' + id + '_' +index"
                         aria-expanded="false" :aria-controls="'collapse_' + id + '_' +index">
                        <div v-if="typeof(header) === 'function'" :class="getHtmlClass('contents.card.head.title.text')" v-html="header(row, index, prefixTitle)"></div>
                        <slot v-else-if="$scopedSlots['row.title']" name="row.title" v-bind:row="row" v-bind:index="index" v-bind:prefix="prefixTitle"></slot>
                        <span v-else :class="getHtmlClass('contents.card.head.title.text')">{{ trans(prefixTitle, transType) }} {{ getValue(getIndex('get')+'.'+index+'.'+itemName) && getValue(getIndex('get')+'.'+index+'.'+itemName) !== "undefined" ? getValue(getIndex('get')+'.'+index+'.'+itemName) : index+1 }}</span>
                        <a @click="removeRow(index)" v-if="getOption('delBtn') !== false"
                           :class="getHtmlClass('contents.card.head.del.self')">
                            <i :class="getHtmlClass('contents.card.head.del.icon')"></i>
                            {{ trans('ivue.repeaters.accordion.actions.delete', transType) }}
                        </a>
                    </div>
                </div>

                <div :id="'collapse_' + id + '_' +index" :class="getHtmlClass('contents.card.collapse')" :aria-labelledby="'heading_' + id + '_' +index" :data-parent="`#${id}`">
                    <div :class="getHtmlClass('contents.card.body.self')">
                        <div v-if="getErrorStatus(getIndex('error') + '.' . index)" :class="`${getHtmlClass('contents.card.body.alert')}-${getErrorStatus(getIndex('error') + '.' . index) === 'valid' ? 'success' : 'danger'}`" role="alert">{{ getError(getIndex('error') + '.' . index+ '.text') }}</div>
                        <template v-if="typeof(body) === 'function'" >
                            <template v-for="item in body(row, index, getContext)">
                                <component :is="item.component" v-bind="item.attrs" :transType="item.attrs.transType || transType" :storeNamespace="storeNamespace"/>
                            </template>
                        </template>
                        <slot v-else name="body" v-bind:row="row" v-bind:index="index"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LoadSingleData from "../../../handel/functions/store/loadSingle.func";
    import BaseRepeater from "../../../handel/functions/repeaters/base.func";

    export default {
        name: "i-repeater-accordion",
        index: {
            group: 'repeaters',
            html: 'accordion',
        },
        props: {
            title: {
                type: String,
                default : ""
            },
            addTitle: {
                type: String,
                default : "ivue.repeaters.accordion.actions.add"
            },
            prefixTitle: {
                type: String,
                default : ""
            },
            id: {
                type: String,
                default : ""
            },
            itemName: {
                type: String,
                default : "name"
            },
            value: [String, Number, Object, Array],
            desc: [String, Number, Object, Array],
            header: Function,
            body: Function,
            storeNamespace: {
                type: [String, Object],
                default: 'DataSingle'
            },
            transType: {
                type: [String, Object],
                default: 'current'
            },
            fieldIndex: [String, Object],
            options: {
                type: [Object, Array, Function],
                default: () => []
            },
            css: {
                type: [Object, Array],
                default: () => []
            },
            items: {
                type: Array,
                default: () => []
            },
        },
        data() {
            return {
                model: null,
            }
        },
        created() {
            LoadSingleData.setValueOnCreate(this)
        },
        computed: {
            ...LoadSingleData.computed(),
        },
        methods: {
            ...LoadSingleData.methods(),
            ...BaseRepeater.methods
        },
        watch: {
            ...LoadSingleData.watch(),
        }
    }
</script>

