const ConfigHtmlLTRClassesPagesCreate = {
    default: {
        alert: {
            self: 'alert alert-danger',
            head: 'alert-heading'
        },
        contents: {
            self: 'd-flex flex-wrap',
            rows: {
                self: 'my-2 px-0 px-md-1 px-lg-3',
                card: {
                    self: 'card',
                    head: 'card-header',
                    body: {
                        self: 'card-body p-1',
                        form: 'd-flex flex-wrap'
                    },
                    foot: {
                        self: 'card-footer',
                        btn: 'btn btn-primary'
                    }
                }
            }
        }
    },
    variable: {

    }
};

export default ConfigHtmlLTRClassesPagesCreate;
