/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 1/16/21, 1:33 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

const FuncUtilsHtml = {
    computed() {
        return {
            iConfigHtml() {
                return this.$store.getters['ConfigHtml' + '/' + 'iConfigHtml']
            },
            iHtmlStyleAll() {
                return this.$store.getters[this.storeNamespace + '/' + 'iHtmlStyleAll']
            },
            iHtmlClassAll() {
                return this.$store.getters[this.storeNamespace + '/' + 'iHtmlClassAll']
            },
            getHtmlDirection() {
                return this.getConfigHtml('base.direction.current', this.getConfigHtml('base.direction.all', 'ltr'));
            },
        }
    },
    methods() {
        return {
            getConfigHtml(key, $default = '') {
                return iPath.get(this.iConfigHtml, key , $default);
            },
            getHtmlBaseClass(key, $default = undefined) {
                var $baseindex = this.getIndex('classBase',false) || this.getIndex('globalClassBase',false) || (this.$options.index ? this.$options.index.group + '.' + this.$options.index.html : 'components.global');
                return this.getConfigHtml(this.getHtmlDirection + '.classes.' + $baseindex + '.' + key, $default);
            },
            getHtmlGlobalClass(key, $default = undefined) {
                var $baseindex = this.getIndex('globalClassBase', false) || (this.$options.index ? this.$options.index.group + '.global' : 'components.global');
                return this.getConfigHtml(this.getHtmlDirection + '.classes.' + $baseindex + '.' + key, $default);
            },
            getHtmlClass(key, $default = '') {
                var $classesDefault = this.getHtmlBaseClass('default.' + key, this.getHtmlGlobalClass('default.' + key, ''));
                var $classesVariable = this.getHtmlBaseClass('variable.' + key, this.getHtmlGlobalClass('variable.' + key, ''));
                var $iclasses = iPath.get(this.iHtmlClassAll, this.getIndex('class')) || iPath.get(this.iHtmlClassAll, 'global');
                $iclasses = iPath.get($iclasses, key, '');
                var $cclasses = iPath.get(this.css, key, '');
                $iclasses = ($cclasses || $iclasses || $classesVariable || $default);
                var $classes = $classesDefault;
                if ($iclasses instanceof Object) {
                    $.each($iclasses, function (i, v) {
                        if (v) $classes += ' ' + i;
                    })
                }else
                    $classes += ' ' + $iclasses;
                return $classes;
            },
            getHtmlBaseStyle(key, $default = {}) {
                var $baseindex = this.getIndex('styleBase', false) || this.getIndex('globalStyleBase', false) || (this.$options.index ? this.$options.index.group + '.' + this.$options.index.html : 'components.global');
                return this.getConfigHtml(this.getHtmlDirection + '.styles.' + $baseindex + '.' + key, $default);
            },
            getHtmlGlobalStyle(key, $default = {}) {
                var $baseindex = this.getIndex('globalStyleBase', false) || (this.$options.index ? this.$options.index.group + '.global' : 'components.global');
                return this.getConfigHtml(this.getHtmlDirection + '.styles.' + $baseindex + '.' + key, $default);
            },
            getHtmlStyle(key, $default = '') {
                var $stylesDefault = this.getHtmlBaseStyle('default.' + key, this.getHtmlGlobalStyle('default.' + key, ''));
                var $stylesVariable = this.getHtmlBaseStyle('variable.' + key, this.getHtmlGlobalStyle('variable.' + key, ''));
                var $istyles = iPath.get(this.iHtmlStyleAll, this.getIndex('style')) || iPath.get(this.iHtmlStyleAll, 'global');
                $istyles = iPath.get($istyles, key, '');
                var $cstyles = iPath.get(this.styles, key, '');
                $istyles = ($stylesVariable || $istyles || $cstyles || $default);
                var $styles = $stylesDefault;
                if ($istyles instanceof Object) {
                    $.each($istyles, function (i, v) {
                        if (v) $styles += i;
                    })
                }else
                    $styles += $istyles;
                return $styles;
            },
        }
    },
    watch() {
        return {
            iConfigHtml: {
                handler: function () {
                    console.log(2)
                },
                deep: true
            }
        }
    },
};

export default FuncUtilsHtml;
