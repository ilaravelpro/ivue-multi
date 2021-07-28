/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 1/16/21, 1:52 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

import LoadSingleData from "../store/loadSingle.func";

const GlobalField = {
    computed() {
        return {
            ...LoadSingleData.computed(),
            _icon() {
                return this.icon || this.getOption('icon');
            },
            classForField() {
                var $style = '';
                if (this._icon && this._icon.prepend) $style += ' ' + this.getHtmlClass('input-group-prepend-input');
                if (this._icon && this._icon.append) $style += ' ' + this.getHtmlClass('input-group-append-input');
                if (this.error && typeof (this.error.status) !== 'undefined') $style += ' is-' + this.error.status;
                if (this.getHtmlClass('field')) $style += ' ' + this.getHtmlClass('field');
                if (this.getOption('readonly')) $style += ' readonly';
                return $style.trim();
            },
        }
    },
    methods() {
        return {
            ...LoadSingleData.methods(),
        }
    },
    watch(storeNamespace = 'DataSingle') {
        return {
            ...LoadSingleData.watch(),
            getMask: {
                handler: function (newValue) {
                    if (newValue){
                        if (typeof(newValue.numeric) !== "undefined"){
                            $(this.$refs.input).inputmask('numeric', JSON.parse(JSON.stringify(newValue.numeric)))
                        } else
                            $(this.$refs.input).inputmask(newValue)
                        this.$forceUpdate()
                    }
                },
                deep: true
            },
        }
    },
};

export default GlobalField;
