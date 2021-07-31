const ConfigHtmlLTRClassesFormsTabs = {
    default: {
        section: {
            self: 'i-from-tabs',
            vertical: 'row col-12',
        },
        nav: {
            self: 'nav',
            vertical: 'flex-column nav-pills',
            verticalIf: 'col-md-3',
            item: 'nav-item',
            link: 'nav-link'
        },
        contents: {
            self: 'tab-content',
            verticalIf: 'col-md-9',
            tab: 'tab-pane fade show py-2',
            btnLoad: 'btn btn-warning'
        },
    },
    variable: {

    }
};

export default ConfigHtmlLTRClassesFormsTabs;
