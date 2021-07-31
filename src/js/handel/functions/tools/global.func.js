/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 9/7/20, 8:36 AM
 * Copyright (c) 2021. Powered by iamir.net
 */

import LoadSingleData from "../store/loadSingle.func";

const ToolsGlobal = {
    computed() {
        return {
            ...LoadSingleData.computed(),
        }
    },
    methods() {
        return {
            ...LoadSingleData.methods(),
        }
    },
    watch() {
        return {
            ...LoadSingleData.watch(),
        }
    },
};

export default ToolsGlobal;
