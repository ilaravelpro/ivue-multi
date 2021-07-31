const ConfigHtmlLTRClassesRepeatersAccordion = {
    default: {
        main: 'i-repeater-accordion',
        alert: 'alert alert-',
        add: {
            self: 'row mb-3',
            item: 'col-lg-4',
            link: 'btn btn-sm font-weight-bolder btn-primary',
            icon: 'fa fa-plus'
        },
        contents: {
            self: 'accordion',
            card: {
                self: 'card overflow-unset',
                head: {
                    self: 'card-header',
                    title: {
                        self: 'card-title d-block collapsed',
                        text: 'cursor-pointer',
                    },
                    del: {
                        self: 'btn btn-sm font-weight-bolder btn-danger float-right',
                        icon: 'fa fa-trash'
                    }
                },
                collapse: 'collapse',
                body: {
                    self: 'card-body',
                    alert: 'alert alert-',
                }
            }
        },
    },
    variable: {

    }
};

export default ConfigHtmlLTRClassesRepeatersAccordion;
