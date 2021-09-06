const ConfigHtmlLTRClassesFieldsSelect = {
    default: {
        select: {
            header: 'select-title cursor-pointer text-no-wrap w-75',
            items: {
                self: 'select-items p-0',
                search: {
                    self: 'select-search px-3',
                    input: 'form-control'
                },
                actions: {
                    self: 'select-actions px-3',
                    group: 'btn-group btn-group-sm btn-block',
                    selectAll: 'actions-btn bs-select-all btn btn-light',
                    deSelectAll: 'actions-btn bs-deselect-all btn btn-light'
                }
            },
            item: 'select-item'
        }
    },
    variable: {
    }
};

export default ConfigHtmlLTRClassesFieldsSelect;
