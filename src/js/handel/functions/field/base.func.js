/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 10/13/20, 11:36 AM
 * Copyright (c) 2021. Powered by iamir.net
 */

const BaseField = {
    computed: {
        classForSection() {
            var $style = '';
            if (this.getOption('field.validate')|| this.statusError === 'invalid') $style += ' validated';
            if (this.getHtmlClass('section')) $style += ' ' + this.getHtmlClass('section');
            return $style.trim();
        },
        classForGroup() {
            var $style = this.getHtmlClass('group', 'my-auto');
            $style += this.label ? '' : (' ' + this.getHtmlClass('noLabel', 'my-auto'));
            return $style.trim();
        },
        statusError() {
            return this.getError((this.getIndex('error') || this.getIndex('store')) + '.status') || null;
        }
    },
    methods: {
        focusin() {
            var $this = this;
            $.each([this.$refs.icon_prepend, this.$refs.icon_append], function (i, v) {
                if (!$(v).hasClass($this.getHtmlClass('border-color-primary', 'border-color-primary')))
                    $(v).addClass($this.getHtmlClass('border-color-primary', 'border-color-primary'));
                if (!$(v).hasClass($this.getHtmlClass('color-primary', 'color-primary')) && !$(v).find('i').hasClass('cursor-pointer'))
                    $(v).addClass($this.getHtmlClass('color-primary', 'color-primary'));
            })
        },
        focusout() {
            var $this = this;
            $.each([this.$refs.icon_prepend, this.$refs.icon_append], function (i, v) {
                $(v).removeClass($this.getHtmlClass('border-color-primary', 'border-color-primary'));
                $(v).removeClass($this.getHtmlClass('color-primary', 'color-primary'));
            })
        }
    }
};

export default BaseField;
