<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 9/4/20, 9:27 PM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <ul :class="getHtmlClass('section')">
        <li :class="getHtmlClass('previous.self')" @click="previous()">
            <a :class="getHtmlClass('previous.link')" aria-label="Previous" :aria-disabled="current === 1">
                <i :class="getHtmlClass('previous.icon')"></i>
            </a>
        </li>
        <template v-if="pages && current && pageList" v-for="i in pageList" >
            <li v-if="i === 0" :class="getHtmlClass('split.self')" ><span :class="getHtmlClass('split.link')" >...</span></li>
            <li v-else :class="`${getHtmlClass('item.self')} ${current === i ? 'active' : ''}`" @click="click(i)"><a
                :class="getHtmlClass('item.link')" v-text="i"></a></li>
        </template>
        <li :class="getHtmlClass('next.self')" @click="next()">
            <a :class="getHtmlClass('next.link')" aria-label="Next" :aria-disabled="current === pages">
                <i :class="getHtmlClass('next.icon')"></i>
            </a>
        </li>
    </ul>
</template>

<script>
    import DataTableGlobal from "../../../handel/functions/datatable/global.func";

    export default {
        name: "i-datatable-pagination",
        index: {
            group: 'datatable',
            html: 'pagination',
        },
        props: {
            current: [Number, String],
            pages: Number,
        },
        computed: {
            ...DataTableGlobal.computed(),
            page: {
                get: function () {
                    return this.current;
                },
                set: function (value) {
                    this.$emit('update:current', value);
                }
            },
            pageList() {
                return this.getPageList(this.pages || 1, this.current || 1, 6);
            }
        },
        methods: {
            ...DataTableGlobal.methods(),
            click(i) {
                this.page = i;
            },
            next() {
                if (this.current < this.pages) {
                    this.page++;
                }
            },
            previous() {
                if (this.current > 1) {
                    this.page--;
                }
            },
            getPageList(totalPages, page, maxLength) {
                if (maxLength < 5) throw "maxLength must be at least 5";

                function range(start, end) {
                    return Array.from(Array(end - start + 1), (_, i) => i + start);
                }

                var sideWidth = maxLength < 9 ? 1 : 2;
                var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
                var rightWidth = (maxLength - sideWidth * 2 - 2) >> 1;
                if (totalPages <= maxLength) {
                    // no breaks in list
                    return range(1, totalPages);
                }
                if (page <= maxLength - sideWidth - 1 - rightWidth) {
                    // no break on left of page
                    return range(1, maxLength - sideWidth - 1)
                        .concat(0, range(totalPages - sideWidth + 1, totalPages));
                }
                if (page >= totalPages - sideWidth - 1 - rightWidth) {
                    // no break on right of page
                    return range(1, sideWidth)
                        .concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
                }
                // Breaks on both sides
                return range(1, sideWidth)
                    .concat(0, range(page - leftWidth, page + rightWidth),
                        0, range(totalPages - sideWidth + 1, totalPages));
            }
        },

    }
</script>

<style scoped>
    .pagination > li:not(.page-split) {
        cursor: pointer;
    }
    .pagination > .page-split {
        cursor: default;
    }
</style>
