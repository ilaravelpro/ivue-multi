<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 11/4/20, 10:55 AM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div :class="_class">
        <h4 v-if="stepTitle">{{ tabs[current].title }}</h4>
        <div :class="getHtmlClass('steps')">
            <ul :class="_class_nav" role="tablist"
                :aria-orientation="_orientation">
                <li v-for="(tab, index) in getTabs"
                    :class="_class_nav_item(index)" @click="current = index" :style="`width: ${ 100  / Object.keys(getTabs).length }%`">
                    <a :id="`${_id(tab.name)}_tab`" data-toggle="tab"
                       :href="`#${_id(tab.name)}`" role="tab" :aria-controls="_id(tab.name)" aria-selected="true">
                    </a>
                </li>
            </ul>
        </div>
        <div :class="getHtmlClass('contents')">
            <div :class="_class_contents">
                <div v-for="(tab, index) in getTabs" class="tab-pane fade show" :class="_class_content(index)"
                     :id="_id(tab.name)" role="tabpanel" :aria-labelledby="`${_id(tab.name)}_tab`">
                    <template v-if="tab.items" v-for="item in tab.items">
                        <component :is="item.component" v-bind="item.attrs" :transType="item.attrs.transType || transType" :storeNamespace="item.attrs.storeNamespace || storeNamespace"/>
                    </template>
                </div>
            </div>
        </div>
        <div :class="getHtmlClass('actions.self')">
            <div :class="current === 0? 'd-none' : ''">
                <a @click="current--">{{ trans('ivue.forms.wizard.actions.backward', transType) }}</a>
            </div>
            <div :class="current > Object.keys(getTabs).length - 2? 'd-none' : ''">
                <a @click="current++">{{ trans('ivue.forms.wizard.actions.forward', transType) }}</a>
            </div>
            <div :class="current < Object.keys(getTabs).length - 1? 'd-none' : ''" @click="submit()">
                <a>{{ trans('ivue.forms.wizard.actions.submit', transType) }}</a>
            </div>
        </div>
    </div>
</template>

<script>
    import FormWizard from "../../../handel/functions/form/wizard.func";
    import FormGlobal from "../../../handel/functions/form/global.func";

    export default {
        name: "i-form-wizard",
        index: {
            group: 'forms',
            html: 'wizard',
        },
        props: {
            tabs: [Object, Array, Function],
            css: [String, Object, Array],
            id: String,
            stepTitle: false,
            vertical: {
                type: Boolean,
                default: false
            },
            externalSubmit: Function,
            storeNamespace: {
                type: String,
                default: 'DataSingle'
            },
            transType: {
                type: [String, Object],
                default: 'current'
            },
        },
        data() {
          return {
              current: 0
          }
        },
        computed: {
            ...FormGlobal.computed(),
            ...FormWizard.computed(),
        },
        methods: {
            ...FormGlobal.methods(),
            ...FormWizard.methods(),
        }
    }
</script>
