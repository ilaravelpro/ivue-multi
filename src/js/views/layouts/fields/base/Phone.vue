<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 1/16/21, 1:34 PM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div :class="getHtmlClass('input-group')">
        <i-base-autocomplete :class="getHtmlClass('groups.country')" placeholder="+1" :items="countries" v-model="model.country" :release="(country, index) => {return {text: `+${country.code}`, value: country.code}}" :options="getOptions"/>
        <i-base-input v-if="prefix" :class="getHtmlClass('groups.prefix')" v-model="model.prefix" :options="getOptions"/>
        <i-base-input :class="getHtmlClass('groups.' + (prefix ? 'number' : 'numberIf'))" v-model="model.number" :options="getOptions"/>
    </div>
</template>


<script>
    import GlobalField from "../../../../handel/functions/field/global.func";
    import LoadSingleData from "../../../../handel/functions/store/loadSingle.func";
    import Countries from "../../../../handel/data/countries";

    export default {
        name: 'i-base-phone',
        index: {
            group: 'fields',
            html: 'phone',
        },
        model: {
            event: 'change'
        },
        props: {
            placeholder: String,
            value: [String, Number, Object, Array],
            desc: [String, Number, Object, Array],
            storeNamespace: {
                type: [String, Object],
                default: 'DataSingle'
            },
            transType: {
                type: [String, Object],
                default: 'current'
            },
            fieldIndex: [String, Object, Function],
            icon: Object,
            focusin: {
                type: Function,
                default: () => []
            },
            focusout: {
                type: Function,
                default: () => []
            },
            type: {
                type: String,
                default: 'text'
            },
            prefix: {
                type: Boolean,
                default: true
            },
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
                countries: Countries,
                model: {
                    country: '',
                    number: ''
                },
                defCountry: 98,
                setNumber: false,
            }
        },
        created() {
            LoadSingleData.setValueOnCreate(this)
        },
        computed: {
            ...GlobalField.computed(),
        },
        methods: {
            ...GlobalField.methods(),
        },
        watch: {
            ...GlobalField.watch(),
        },
    }

</script>
