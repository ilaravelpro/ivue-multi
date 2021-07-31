<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 7/28/20, 12:02 PM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div :class="getHtmlClass('section')" :id="$attrs.id" tabindex="-1" role="dialog" :aria-labelledby="`${$attrs.id}Label`"
         aria-hidden="true">
        <div :class="getHtmlClass('dialog.self')" role="document">
            <div :class="getHtmlClass('dialog.content.self')">
                <div :class="getHtmlClass('dialog.content.header.self')">
                    <h5 :class="getHtmlClass('dialog.content.header.title')" :id="`${$attrs.id}Label`" v-text="$attrs.title"></h5>
                    <button type="button" :class="getHtmlClass('dialog.content.header.close')" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <slot name="body" :class="getHtmlClass('dialog.content.body')">

                </slot>
                <slot name="footer" :class="getHtmlClass('dialog.content.footer')">

                </slot>
            </div>
        </div>
    </div>
</template>


<script>
    import ToolsGlobal from "../../../handel/functions/tools/global.func";

    export default {
        name: 'i-modal',
        index: {
            group: 'tools',
            html: 'modal',
        },
        props: {
            storeNamespace: {
                type: String,
                default: 'DataSingle'
            }
        },
        computed: {
            ...ToolsGlobal.computed(),
        },
        methods: {
            ...ToolsGlobal.methods(),
        },
    }

</script>
