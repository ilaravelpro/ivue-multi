/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 9/7/20, 8:36 AM
 * Copyright (c) 2021. Powered by iamir.net
 */

const FormFields = {
    computed() {
        return {
            getTitle: function (){
                return typeof(this.title) == 'function' ? this.title(this) : this.trans(this.title);
            },
            getItems() {
                var $this = this;
                var $items = typeof(this.items) == 'function' ? this.items(this) : this.items;
                $items = Array.from($items).map(function (v) {
                    if(v.useESubmit)
                        v.attrs.externalSubmit = $this.externalSubmit
                    return v;
                })
                return $items
            },
        }
    },
    methods() {
        return {
        }
    },
    watch() {
        return {
        }
    },
};

export default FormFields;
