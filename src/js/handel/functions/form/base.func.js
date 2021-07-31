/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 9/7/20, 8:36 AM
 * Copyright (c) 2021. Powered by iamir.net
 */

const FormBase = {
    computed: {
        getItems() {
            return this.fields(this.name);
        },
    },
    methods: {
        fields(name = null) {
            var items = this.items ||  this.$store.getters[this.storeNamespace + '/iFields'];
            return name ? items[name] : items;
        },
        setState(key, value) {
            this.$store.commit(this.storeNamespace + '/setState', {key: key, value: value})
        }
    }
};

export default FormBase;
