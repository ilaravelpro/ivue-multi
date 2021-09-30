/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 1/16/21, 1:33 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

import iPath from "../../libs/iPath.lib";

const FuncUtilsTranslate = {
    computed() {
        return {
            iTranslateLocal() {
                return this.$store.getters['TranslateService' + '/' + 'iLocal']
            },
            iTranslateLang() {
                return this.$store.getters['TranslateService' + '/' + 'iLang']
            },
            getLangAll() {
                return this.$store.dispatch('TranslateService' + '/' + 'getLang', 'all');
            },
            getLangCurrent() {
                return this.$store.dispatch('TranslateService' + '/' + 'getLang', 'current');
            },
        }
    },
    methods() {
        return {
            getTranslateLocal(key, $default = '') {
                return iPath.get(this.iTranslateLocal, key , $default);
            },
            getTranslateLang(key, $default = '') {
                return iPath.get(this.iTranslateLang, key , $default);
            },
            $trans(key, type = 'all', $default = null) {
                return iPath.get(this.iTranslateLocal.languages, this.getLangCurrent(type) + '.' + key, $default || key);
            }
        }
    },
    watch() {
        return {
        }
    },
};

export default FuncUtilsTranslate;
