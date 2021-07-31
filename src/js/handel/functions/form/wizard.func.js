/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 9/7/20, 8:36 AM
 * Copyright (c) 2021. Powered by iamir.net
 */

const FormWizard = {
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
                var $class = this.getHtmlClass('content.self', '');
                if (this.vertical) $class = this.getHtmlClass('content.vertical', '') + ' ' + ($class === '' ? this.getHtmlClass('content.verticalIf') : $class);
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
            _class_nav_item(index) {
                var $class = '';
                if (index === 0) $class = 'first';
                if (index === Object.keys(this.tabs).length - 1) $class = 'last';
                if (index < this.current) $class += ' done';
                if (this.current === index) $class += ' active';
                return $class;
            },
            _class_content(index) {
                var $class = this.getHtmlClass('content.tab') + 'body';
                if (index === 0) $class = 'body';
                if (this.current === index) $class += ' active';
                return $class;
            },
        }
    },
    watch() {
        return {
        }
    },
};

export default FormWizard;
