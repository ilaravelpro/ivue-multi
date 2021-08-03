<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 1/13/21, 9:58 PM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div :class="_class" :id="id">
        <ul :class="_class_nav" role="tablist"
            :aria-orientation="_orientation">
            <template v-for="(tab, index) in Object.values(getTabs)">
                <slot v-if="$scopedSlots[`tab.action_head.${tab.name}`]" :name="`tab.action_head.${tab.name}`" v-bind:tab="tab" v-bind:namespace="tab.storeNamespace || storeNamespace"></slot>
                <slot v-else-if="$scopedSlots[`tab_actions_head`]" name="tab_actions_head" v-bind:tab="tab" v-bind:namespace="tab.storeNamespace || storeNamespace"></slot>
                <component v-else-if="tab.action_head" :is="tab.action_head.component" :index="index" :tab="tab" :id="_id(tab.name)" v-bind="tab.action_head.attrs" :storeNamespace="storeNamespace"/>
                <li v-else :class="getHtmlClass('nav.item')">
                    <a :class="getHtmlClassOther('nav.link', {'active': index === 0 && showFirst})" :id="`${_id(tab.name)}_tab`" data-toggle="tab"
                       :href="`#${_id(tab.name)}`" role="tab" :aria-controls="_id(tab.name)" aria-selected="true" v-html="tab.title"></a>
                </li>
            </template>
        </ul>
        <div :class="_class_contents">
            <div v-for="(tab, index) in  Object.values(getTabs)" :class="getHtmlClassOther('contents.tab', {'active' : index === 0 && showFirst})"
                 :id="_id(tab.name)" role="tabpanel" :aria-labelledby="`${_id(tab.name)}_tab`">
                <button v-if="isBtnView(tab)" :class="getHtmlClass('contents.btnLoad')" @click="setView(tab)">Load Tab</button>
                <slot v-if="$scopedSlots[`tab.${tab.name}`]" :name="`tab.${tab.name}`" v-bind:tab="tab" v-bind:namespace="tab.storeNamespace || storeNamespace"></slot>
                <slot v-else-if="$scopedSlots[`tab_body`]" name="tab_body" v-bind:tab="tab" v-bind:namespace="tab.storeNamespace || storeNamespace"></slot>
                <template v-else-if="tab.items" v-for="item in tab.items" v-if="isView(tab)">
                    <component :is="item.component" v-bind="item.attrs" v-if="item.if ? item.if() : true" :storeNamespace="item.attrs.storeNamespace || storeNamespace"/>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import FormTabs from "../../../handel/functions/form/tabs.func";
    import FormGlobal from "../../../handel/functions/form/global.func";

    export default {
        name: "i-form-tabs",
        index: {
            group: 'forms',
            html: 'tabs',
        },
        props: {
            tabs: [Object, Array, Function],
            css: [String, Object, Array],
            id: String,
            vertical: {
                type: Boolean,
                default: false
            },
            storeNamespace: {
                type: String,
                default: 'DataSingle'
            },
            btnView: Boolean,
            showFirst: {
                type: Boolean,
                default: true
            },
        },
        data() {
          return {
              viewComp: {}
          }
        },
        computed: {
            ...FormGlobal.computed(),
            ...FormTabs.computed(),
        },
        methods: {
            ...FormGlobal.methods(),
            ...FormTabs.methods(),
        }
    }
</script>
