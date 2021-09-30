"use strict"
/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 11/4/20, 3:58 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

import TranslateLocal from "../../translate/local";
import iPath from "../../libs/iPath.lib";

const TranslateService = {
    lang: {
        all: 'en',
        current: 'en'
    },
    data() {
        return {
            local: array_replace_recursive(TranslateLocal, window.dataTranslateLocal || {})
        }
    },
    setLang(lang = 'en', type = 'all') {
        return this.lang[type] = lang;
    },
    getLang(type = 'all') {
        return this.lang[type];
    },
    getLangs() {
        return this.lang
    },
    get(key, type = 'all', $default = null, method = 'local') {
        return this.local(key, type, $default);
    },
    local(key, type = 'all', $default = null) {
        return iPath.get(this.data().local.languages, this.getLang(type) + '.' + key, $default || key);
    }
};

export default TranslateService;
