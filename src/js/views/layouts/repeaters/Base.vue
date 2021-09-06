<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 1/5/21, 11:58 AM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div :class="getHtmlClass('main')">
        <i-base
            :label="title"
            :store-namespace="storeNamespace"
            :field-index="fieldIndex"
            :options="options"
            :css="css"
            :slots="slots"
        >
            <slot slot="label-append" name="label-append"/>
            <slot slot="label-prepend" name="label-prepend"/>
            <slot slot="prepend" name="prepend"/>
            <slot slot="append" name="append"/>
            <template slot="input-group">
                <div v-if="type !== 'single' && model && model.length > 0" :class="getHtmlClass('group.head.self')">
                    <template v-if="typeof(body) === 'function'">
                        <template v-for="comp in body({}, -1, getContext)">
                            <div v-if="comp.component === 'i-form-fields'" :class="comp.attrs.class">
                                <div v-for="child in comp.attrs.items" :class="String(getHtmlClass('group.head.child') + (child.attrs.class ? ' ' + child.attrs.class : '')).trim()">{{ getTrans(child.title || child.attrs.placeholder) }}</div>
                            </div>
                            <div v-else :class="String(getHtmlClass('group.head.child') + (comp.attrs.class ? ' ' + comp.attrs.class : '')).trim()">{{ getTrans(comp.title || comp.attrs.placeholder) }}</div>
                        </template>
                    </template>
                </div>
                <template v-for="(item, index) in model">
                    <div :class="getHtmlClass('group.body.self')">
                        <template v-if="typeof(body) === 'function'">
                            <template v-for="comp in body(item, index, getContext)">
                                <component :is="comp.component" v-bind="comp.attrs" :storeNamespace="storeNamespace"/>
                            </template>
                        </template>
                        <slot v-else name="body" v-bind:item="item" v-bind:index="index"></slot>
                        <div :class="removeClass">
                            <a @click="removeRow(index)"
                               :class="getHtmlClass('group.body.del.self')">
                                <i :class="getHtmlClass('group.body.del.icon')"></i>
                                {{ getTrans('ivue.repeaters.base.actions.delete') }}
                            </a>
                        </div>
                    </div>
                </template>
            </template>
        </i-base>
        <div :class="getHtmlClass('add.self')">
            <div :class="getHtmlClass('add.item')">
                <a @click="addRow"
                   :class="getHtmlClass('add.link')">
                    <i :class="getHtmlClass('add.icon')"></i> {{ getTrans(addTitle) }}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import LoadSingleData from "../../../handel/functions/store/loadSingle.func";
    import BaseRepeater from "../../../handel/functions/repeaters/base.func";
    import BaseField from "../../../handel/functions/field/base.func";

    export default {
        name: "i-repeater-base",
        index: {
            group: 'repeaters',
            html: 'base',
        },
        props: {
            title: {
                type: String,
                default: ""
            },
            addTitle: {
                type: String,
                default: "ivue.repeaters.base.actions.add"
            },
            prefixTitle: {
                type: String,
                default: ""
            },
            id: {
                type: String,
                default: ""
            },
            itemName: {
                type: String,
                default: "name"
            },
            value: [String, Number, Object, Array],
            desc: [String, Number, Object, Array],
            slots: Object,
            header: Function,
            body: Function,
            storeNamespace: {
                type: [String, Object],
                default: 'DataSingle'
            },
            fieldIndex: [String, Object],
            options: {
                type: [Object, Array],
                default: () => []
            },
            css: {
                type: [Object, Array],
                default: () => []
            },
            removeClass: {
                type: [String, Object],
                default: 'col-4 my-auto'
            },
            type: {
                type: String,
                default: 'multi'
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
            ...BaseField.computed,
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

