const ConfigHtmlLTRClassesFormsWizard = {
    default: {
        section: {
            self: 'i-form-wizard',
            vertical: 'row col-12',
        },
        steps: 'steps',
        nav: {
            self: 'my-0 pl-2 pr-1',
            vertical: 'flex-column nav-pills',
            verticalIf: 'col-md-3',
            item: 'nav-item',
            link: 'nav-link'
        },
        content: {
            self: 'tab-content',
            vertical: 'col-md-9',
            tab: 'tab-pane fade show',
            btnLoad: 'btn btn-warning'
        },
        contents: 'content px-2',
        actions: {
            self: 'actions align-items-center justify-content-center mt-2'
        }
    },
    variable: {

    }
};

export default ConfigHtmlLTRClassesFormsWizard;
