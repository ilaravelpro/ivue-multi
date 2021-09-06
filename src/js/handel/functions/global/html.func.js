/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 1/16/21, 1:33 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

const FuncGlobalHtml = {
    storeNamespace: 'ConfigHtml',
    changeDirection(dir = 'ltr') {
        appStore.dispatch(this.storeNamespace + '/set', ['base.direction.all', dir])
        return this.changeDirectionCurrent(dir);
    },
    changeDirectionCurrent(dir = 'ltr') {
        return appStore.dispatch(this.storeNamespace + '/set', ['base.direction.current', dir])
    }
};

export default FuncGlobalHtml;
