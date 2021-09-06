const ConfigHtmlLTRClassesFieldsTabel = {
    default: {
        table: {
            self: 'i-table my-2 overflow-hidden',
            title: 'mb-1 col-12 p-1',
            btnLoad: 'btn btn-warning',
            mark: 'checkmark fa color-blue',
            contents: {
                self: 'overflow-x-auto w-fit-content w-md-100',
                header: {
                    self: 'd-flex',
                    right: 'col-2 col-lg-1',
                    prepend: 'p-0 pr-2 text-center',
                    main: 'pr-4 text-center',
                    append: 'p-0 pr-2 text-center'
                },
                body: {
                    self: 'd-flex',
                    right: 'col-2 col-lg-1',
                    prepend: 'p-0 pr-2',
                    main: {
                        self: 'pr-4 mb-2',
                        group: 'form-group row mb-0',
                        space: 'd-md-none mb-3'
                    },
                    append: 'p-0 pr-2'
                }
            }
        }
    },
    variable: {
    }
};

export default ConfigHtmlLTRClassesFieldsTabel;
