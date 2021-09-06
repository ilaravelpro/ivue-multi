/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 10/8/20, 7:13 AM
 * Copyright (c) 2021. Powered by iamir.net
 */
import config from "../../../config/html";

const state = {
    config: window.html_configs || config,
};

const getters = {
    iConfigHtml: state => state.config,
};

const actions = {
    set(context, [key, value]) {
        return context.commit('set', [key, value]);
    },
    remove(context, key) {
        return context.commit('remove', key);
    },
};

const mutations = {
    set(state, [key, value]) {
        return iPath.set(state.config, key, value)
    },
    remove(state, key) {
        return iPath.del(state.config, key)
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
