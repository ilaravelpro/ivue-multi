<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 12/28/20, 11:27 AM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <i-form-fields :items="getItems" :transType="transType" :storeNamespace="storeNamespace" :externalSubmit="externalSubmit" />
</template>

<script>
    import FormBase from "../../../handel/functions/form/base.func";
    import FormGlobal from "../../../handel/functions/form/global.func";

    export default {
        name: "i-form",
        index: {
            group: 'forms',
            html: 'self',
        },
        props: {
            items: [Object, Array],
            resource: String,
            url: String,
            typeForm: String,
            name: String,
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
        computed: {
            ...FormGlobal.computed(),
            ...FormBase.computed,
        },
        created() {
            if (this.resource)this.setState('resource', this.resource)
            if (this.url)this.setState('resource', this.url)
            if (this.typeForm)this.setState('options.typeForm', this.typeForm)
        },
        methods: {
            ...FormGlobal.methods(),
            ...FormBase.methods
        },
    }
</script>
