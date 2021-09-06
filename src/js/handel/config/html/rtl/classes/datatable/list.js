const ConfigHtmlLTRClassesDataTableList = {
    default: {
        section: 'data-table',
        filter: {
            self: 'row mx-0',
            noChild: 'px-lg-3',
            form: {
                self: 'col-lg-6 col-xl-5 col-12 px-0',
                fields: {
                    self: 'd-flex flex-wrap',
                    type: {
                        self: 'col-md-6 my-2 align-self-center',
                        group: 'input-group',
                        isChild: 'p-0',
                    },
                    value: {
                        self: 'col-md-6 my-2 align-self-center',
                        group: 'input-group',
                        isChild: 'p-0 px-lg-3',
                        icon: 'fa fa-search'
                    },
                },
                actions: {
                    self: 'col-lg-6 col-xl-5 col-12 my-2 align-self-center',
                    search: 'btn btn-primary px-6 font-weight-bold',
                    reset: 'btn btn-warning px-6 font-weight-bold',
                    isChild: 'p-0',
                }
            },
            status: {
                self: 'd-flex flex-wrap mt-2',
                isChild: 'mx-0 p-0 mb-2',
                noChild: 'mx-2 mx-lg-4',
                btn: {
                    self: 'btn px-6 font-weight-bold',
                    noChild: 'mx-2',
                    isStatus: 'bg-green color-white',
                    noChildNoStatus: 'bg-white color-primary',
                    isChildNoStatus: 'bg-primary color-white',

                }
            }
        },
        container: {
            self: 'container-table',
            isChild: 'p-0',
            list: {
                self: 'wrap-table position-relative',
                head: 'table-head',
                actions: {
                    btn: {
                        self: 'btn btn-icon btn-light btn-sm',
                        space: 'mr-1',
                        isChild: 'mx-2'
                    }
                },
                pagination: {
                    self: 'w-100 d-md-flex mt-2',
                    start: {
                        self: 'col-md-9 col-12 d-md-flex px-0',
                        length: {
                            self: 'col-md-2 px-0 my-2 mr-md-2',
                            select: 'form-control cursor-pointer',
                        },
                        model: 'my-2',
                    },
                    end: {
                        self: 'col-md-3 col-12 p-0',
                        text: 'page-stats text-md-right text-center'
                    }
                }
            }
        }
    },
    variable: {}
};

export default ConfigHtmlLTRClassesDataTableList;
