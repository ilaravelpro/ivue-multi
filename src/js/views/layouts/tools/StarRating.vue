<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 12/20/20, 11:20 AM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div :class="getHtmlClass('section')">
        <div :class="getHtmlClass('group.self') + (dynamic ? ' cursor-pointer' : '')">
            <div v-for="score in 5">
                <i @mouseover="hover(score)" @click="dynamic ? $emit('change', score) : () => {}" @mouseleave="setAllClass()" :class="styles[score]"></i>
            </div>
            <span v-if="star" :class="getHtmlClass('group.text')" >{{ star }}</span>
        </div>
    </div>
</template>

<script>

    import ToolsStarRating from "../../../handel/functions/tools/star.rating.func";
    import ToolsGlobal from "../../../handel/functions/tools/global.func";

    export default {
        name: "i-star-rating",
        index: {
            group: 'tools',
            html: 'star-rating',
        },
        props: {
            transType: {
                type: [String, Object],
                default: 'current'
            },
            dynamic: {
                type: Boolean,
                default: true
            },
            star: {
                type: [Number, String],
                default: 0
            },
            styleIcon: {
                type: String,
                default: 'fa-2x'
            },
        },
        data() {
            return {
                styles: []
            }
        },
        computed: {
            ...ToolsGlobal.computed(),
        },
        created() {
            this.setAllClass()
        },
        methods: {
            ...ToolsGlobal.methods(),
            ...ToolsStarRating.methods,
        },
        watch: {
            ...ToolsStarRating.watch,
        }
    }
</script>

<style scoped>

</style>
