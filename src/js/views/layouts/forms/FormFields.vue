<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 1/23/21, 3:59 PM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div :class="getHtmlClass('section')" >
        <h5 v-if="title" :class="getHtmlClass('title')" v-html="getTitle"></h5>
        <template v-for="item in getItems">
            <component :is="item.component" v-bind="item.attrs" v-if="item && typeof(item.if) === 'function'? item.if(getContext) : item" :storeNamespace="item.attrs.storeNamespace || storeNamespace" >
                <template v-if="item.text">{{ item.text }}</template>
            </component>
        </template>
    </div>
</template>

<script>
    import FormGlobal from "../../../handel/functions/form/global.func";
    import FormFields from "../../../handel/functions/form/fields.func";

    export default {
        name: "i-form-fields",
        index: {
            group: 'forms',
            html: 'fields',
        },
        props: {
            items: [Object, Array, Function],
            title: [String, Function],
            css: String,
            externalSubmit: Function,
            storeNamespace: {
                type: String,
                default: 'DataSingle'
            }
        },
        computed: {
            ...FormGlobal.computed(),
            ...FormFields.computed(),
        },
        methods: {
            ...FormGlobal.methods(),
        },
    }
</script>
