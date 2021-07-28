
const ConfigHtml = {
    base: {
        direction: {
            all: 'ltr',
            current: 'ltr'
        }
    },
    ltr: require("./html/ltr").default,
    rtl: require("./html/rtl").default
};

export default ConfigHtml;
