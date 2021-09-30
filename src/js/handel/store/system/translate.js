/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 10/8/20, 7:13 AM
 * Copyright (c) 2021. Powered by iamir.net
 */
import TranslateService from "../../services/system/translate.service";

const state = {

};

const getters = {
    iLocal: state => TranslateService.data(),
    iLang: state => TranslateService.data().local,
};

const actions = {
    set(context, [key, value]) {
        return context.commit('set', [key, value]);
    },
    setLang(context, [lang = 'en', type = 'all']) {
        return TranslateService.setLang(lang, type);
    },
    getLang(context, type = 'all') {
        return TranslateService.getLang(type);
    },
    get(context, [key, type = 'all', $default = null, method = 'local']) {
        return TranslateService.get(key, type, $default, method);
    },
    local(key, type = 'all', $default = null) {
        return TranslateService.local(key, type, $default);
    }
};

const mutations = {
    getFunc(state, [name, args]) {
        return TranslateService[name](...args)
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
