const ConfigHtmlLTRClassesRepeatersBase = {
    default: {
        main: 'i-repeater-time-line',
        group: {
            head: {
                self: 'd-flex flex-wrap my-2 hidden-mobile',
                child: 'px-0'
            },
            body: {
                self: 'd-flex flex-wrap my-2',
                del: {
                    self: 'btn btn-sm font-weight-bolder btn-danger',
                    icon: 'fa fa-trash'
                }
            }
        },
        add: {
            self: 'd-flex flex-wrap mt-2',
            item: 'col-lg-4',
            link: 'btn btn-sm font-weight-bolder btn-primary',
            icon: 'fa fa-plus'
        },
    },
    variable: {}
};

export default ConfigHtmlLTRClassesRepeatersBase;
