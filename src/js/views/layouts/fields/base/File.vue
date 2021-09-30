<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 2/2/21, 11:54 AM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div class="w-100" :class="{'i-file': !getOption('just-input')}">
        <input v-if="getOption('just-input')" type="file" :class="classForField" @change="handleFileChange" :multiple="multiple"/>
        <template v-else>
            <label :class="getHtmlClass('label.self')">
                <div v-if="btn" :class="classForBtn">
                    <template v-if="getUrls && !multiple">
                        <div v-bind:style="{backgroundImage: 'url(' + getUrls + ')'}"
                             :class="getHtmlClass('label.btn.image')"></div>
                    </template>
                    <div :class="getHtmlClass('label.btn.group')" v-else>
                        <div :class="getHtmlClass('label.btn.icon')"></div>
                        <div :class="getHtmlClass('label.btn.title')">{{ trans(btnTitle, transType) }}</div>
                    </div>
                </div>
                <slot v-else name="action" v-bind:value="model" v-bind:url="url" v-bind:multiple="multiple"></slot>
                <input type="file" hidden @change="handleFileChange" :multiple="multiple"/>
            </label>
            <hr v-if="multiple && Object.keys(getUrls).length" :class="getHtmlClass('hr')">
            <div v-if="getUrls && multiple" :class="getHtmlClass('images.self')">
                <div v-for="(ur,  index) in getUrls" :class="getHtmlClass('images.item')">
                    <div v-bind:style="{backgroundImage: 'url(' + ur.url + ')'}" :class="getHtmlClass('images.image')"></div>
                    <span :class="getHtmlClass('images.cancel')" @click="delFile(index)">
                </span>
                </div>
            </div>
        </template>
    </div>
</template>


<script>
    import GlobalField from "../../../../handel/functions/field/global.func";
    import LoadSingleData from "../../../../handel/functions/store/loadSingle.func";
    import FileField from "../../../../handel/functions/field/file.func";

    var storeNamespace = 'DataSingle';

    export default {
        name: 'i-base-file',
        index: {
            group: 'fields',
            html: 'file',
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
            multiple: Boolean,
            btn: {
                type: Boolean,
                default: true
            },
            btnTitle: {
                type: String,
                default: 'ivue.fields.file.upload'
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
                model: null,
                url: null,
                deletes: [],
                files: [],
            }
        },
        created() {
            LoadSingleData.setValueOnCreate(this)
        },
        computed: {
            ...GlobalField.computed(storeNamespace),
            ...FileField.computed,
        },
        methods: {
            ...GlobalField.methods(storeNamespace),
            ...FileField.methods,
        },
        watch: {
            ...GlobalField.watch(storeNamespace),
            ...FileField.watch,
        }
    }

</script>
