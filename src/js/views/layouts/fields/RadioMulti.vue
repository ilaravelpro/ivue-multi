<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 7/28/20, 8:30 PM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div>
        <div v-for="(item, index) in filteredAndSorted" :key="index">
            <label :class="getHtmlClass('radio.self')">
                <span :class="getHtmlClass('radio.title')">{{ trans(item.title, transType) }}</span>
                <input type="radio" @change="checking(item)"
                       :checked="checked(item)" :value="item.id">
                <span :class="getHtmlClass('radio.checkmark')"></span>
            </label>
            <label v-for="(child, cindex) in item.children" :class="getHtmlClass('radio.child.self')">
                <span :class="getHtmlClass('radio.child.title')">{{ trans(child.title, transType) }}</span>
                <input type="radio" @change="checking(child)" :checked="checked(child)"
                       :value="child.id">
                <span :class="getHtmlClass('radio.child.checkmark')"></span>
            </label>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'i-radio-multi',
        index: {
            group: 'fields',
            html: 'radio-multi',
        },
        props: {
            items: [Object, Array],
            selected: [Object, Array, String, Number],
            search_attr: String,
            transType: {
                type: [String, Object],
                default: 'current'
            },
            search: {
                type: String,
                default: ''
            },
        },
        computed: {
            filteredAndSorted() {
                function compare(a, b) {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                }
                return this.items.filter(item => {
                    var $has = item[this.search_attr].toLowerCase().includes(this.search.toLowerCase());
                    if (!$has && item.children && Object.keys(item.children).length > 0) {
                        var children = item.children.filter(child => {
                            return child[this.search_attr].toLowerCase().includes(this.search.toLowerCase())
                        }).sort(compare);
                        $has = Object.keys(children).length > 0;
                    }
                    return $has;
                }).sort(compare)
            }
        },
        methods: {
            checking(item) {
                this.$emit('update:selected', item);
            },
            checked(item) {
                var selected = this.selected.title ? this.selected : this.items[0];
                this.$emit('update:selected', selected);
                return selected.id === item.id;
            },
        }
    }

</script>
