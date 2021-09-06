<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 2/3/21, 7:24 PM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div ref="select" class="i-autocomplete" :class="classForField">
        <div :class="getHtmlClass('select.header.self')">
            <div :class="getHtmlClass('select.header.group')">
                <input ref="search" type="text" :placeholder="getTrans(placeholder)" :class="classForHeaderSearch"
                       @keyup="filtering($event)" v-model="searchText" @focusin="focusin" @focusout="focusoutInternal">
            </div>
        </div>
        <ul :class="getHtmlClass('select.items')">
            <li :class="getHtmlClass('select.item')" v-for="(item, index) in itemsByFiltered" :data-key="index"
                :data-value="item.value"
                @click="onSelect(item, index, $event)" v-html="viewItem(item, index, itemsByFiltered)">
            </li>
        </ul>
    </div>
</template>


<script>
    import GlobalField from "../../../../handel/functions/field/global.func";
    import SelectField from "../../../../handel/functions/field/select.func";
    import AutoCompleteField from "../../../../handel/functions/field/auto.complete.func";
    import LoadSingleData from "../../../../handel/functions/store/loadSingle.func";

    var storeNamespace = 'DataSingle';

    export default {
        name: 'i-base-autocomplete',
        index: {
            group: 'fields',
            html: 'autocomplete',
        },
        model: {
            event: 'change'
        },
        props: {
            value: [String, Number, Object, Array],
            placeholder: {
                type: String,
                default: 'ivue.fields.autocomplete.placeholder'
            },
            desc: [String, Number, Object, Array],
            storeNamespace: {
                type: [String, Object],
                default: 'DataSingle'
            },
            fieldIndex: [String, Object, Function],
            diff: [String, Number, Object, Array],
            release: [Function, Object],
            view: Function,
            focusin: {
                type: Function,
                default: () => []
            },
            focusout: {
                type: Function,
                default: () => []
            },
            url: [String, Function],
            type: {
                type: String,
                default: 'single'
            },
            items: {
                type: [Object, Array],
                default: () => []
            },
            firstItems: {
                type: [Object, Array],
                default: () => []
            },
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
                searchText: '',
                selectText: '',
                selected: null,
                search: true,
                selecting: null,
                model: null,
                loading: false,
                height: 0,
                serverItems: [],
                serverQuery: {
                    page: 0,
                    pages: 1,
                },
                useModel: false,
                modelAll: null
            }
        },
        mounted() {
            window.onclick = function (event) {
                if (!event.target.matches('.select-title, .select-item, .select-search input, .select-actions div button'))
                    $('.select-items').removeClass('d-block')
            }
        },
        created() {
            LoadSingleData.setValueOnCreate(this)
        },
        computed: {
            ...GlobalField.computed(storeNamespace),
            ...SelectField.computed,
            ...AutoCompleteField.computed,
        },
        methods: {
            ...GlobalField.methods(storeNamespace),
            ...SelectField.methods,
            ...AutoCompleteField.methods,

        },
        watch: {
            ...GlobalField.watch(storeNamespace),
            ...SelectField.watch,
            ...AutoCompleteField.watch,
        }
    }

</script>
