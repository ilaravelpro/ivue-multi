/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 1/9/21, 5:13 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

window.arrayColumn = function (array, columnName) {
    return array.map(function (value, index) {
        return value[columnName];
    })
}
window.num_format = function num_format(Number) {
    Number += '';
    Number = Number.replace(',', '');
    Number = Number.replace(',', '');
    Number = Number.replace(',', '');
    Number = Number.replace(',', '');
    Number = Number.replace(',', '');
    Number = Number.replace(',', '');
    var x = Number.split('.');
    var y = x[0];
    var z = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(y))
        y = y.replace(rgx, '$1' + ',' + '$2');
    return y + z;
}
window.roundLikePHP = function (num, dec = 0) {
    if (num === 'NIL') return num;
    var num_sign = num >= 0 ? 1 : -1;
    return parseFloat((Math.round((num * Math.pow(10, dec)) + (num_sign * 0.0001)) / Math.pow(10, dec)).toFixed(dec));
}


window.date2str = function (x, y) {
    var z = {
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds()
    };
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
    });

    return y.replace(/(y+)/g, function (v) {
        return x.getFullYear().toString().slice(-v.length)
    });
}


window.capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

window.capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

window.array_replace_recursive = function (arr) {
    let i = 0
    let p = ''
    const argl = arguments.length
    let retObj
    if (argl < 2) {
        throw new Error('There should be at least 2 arguments passed to array_replace_recursive()')
    }
    // Although docs state that the arguments are passed in by reference,
    // it seems they are not altered, but rather the copy that is returned
    // So we make a copy here, instead of acting on arr itself
    if (Object.prototype.toString.call(arr) === '[object Array]') {
        retObj = []
        for (p in arr) {
            retObj.push(arr[p])
        }
    } else {
        retObj = {}
        for (p in arr) {
            retObj[p] = arr[p]
        }
    }
    for (i = 1; i < argl; i++) {
        for (p in arguments[i]) {
            if (retObj[p] && typeof retObj[p] === 'object') {
                retObj[p] = array_replace_recursive(retObj[p], arguments[i][p])
            } else {
                retObj[p] = arguments[i][p]
            }
        }
    }
    return retObj
}
