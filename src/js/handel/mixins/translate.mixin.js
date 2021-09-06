import Vue from 'vue';
import TranslateService from "../services/system/translate.service";

Vue.mixin({
    computed: {
        languages() {
            return TranslateService.getLangs();
        },
    },
    methods: {
        trans(...args) {
            return TranslateService.get(...args);
        },
        setLang(...args) {
            return TranslateService.setLang(...args)
        },
        getLang(...args) {
            return TranslateService.getLang(...args)
        },
    }
})
