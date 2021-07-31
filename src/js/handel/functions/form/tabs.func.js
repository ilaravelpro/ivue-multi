/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 9/7/20, 8:36 AM
 * Copyright (c) 2021. Powered by iamir.net
 */


const FormTabs = {
    computed() {
        return {
            getTabs() {
                return typeof(this.tabs) == 'function' ? this.tabs(this) : this.tabs;
            },
            _class() {
                var $class = this.getHtmlClass('section.self', '');
                if (this.vertical) $class += ($class === '' ? '' : ' ') + this.getHtmlClass('section.vertical');
                return $class.trim();
            },
            _class_nav() {
                var $class = this.getHtmlClass('nav.self', '');
                if (this.vertical) $class = this.getHtmlClass('nav.vertical', '') + ' ' + ($class === '' ? this.getHtmlClass('nav.verticalIf') : $class);
                else $class += ' nav-tabs';
                return $class.trim();
            },
            _class_contents() {
                var $class = this.getHtmlClass('contents.self', '');
                if (this.vertical) $class = this.getHtmlClass('contents.vertical', '') + ' ' + ($class === '' ? this.getHtmlClass('contents.verticalIf') : $class);
                return $class.trim();
            },
            _orientation() {
                return this.vertical ? 'vertical' : 'horizontal';
            },
        }
    },
    methods() {
        return {
            _id(name) {
                return this.id + '_' + name;
            },
            isBtnView(tab) {
                return this.btnView || tab.btnView;
            },
            isView(tab) {
                return this.isBtnView(tab) ? this.viewComp[tab.name] : true;
            },
            setView(tab) {
                this.viewComp[tab.name] = !this.viewComp[tab.name];
                this.$forceUpdate()
            },
        }
    },
    watch() {
        return {
        }
    },
};

export default FormTabs;
