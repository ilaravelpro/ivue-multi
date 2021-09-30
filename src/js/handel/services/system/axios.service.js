/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 11/4/20, 3:58 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

import Axios from "axios";
import iRequest from "../../libs/iRequest.lib";
import iPath from "../../libs/iPath.lib";
import TranslateService from "./translate.service";
const instance = Axios.create();
instance.interceptors.request.use(config => {
    return config
})
instance.interceptors.response.use(response => {
    return response
})
const AxiosService = {
    requests: {},
    useLocal: true,

    setBaseURL(url) {
        instance.defaults.baseURL = url;
    },

    setAuthorization(token) {
        instance.defaults.headers.common["Authorization"] = token;
    },

    renderLocal(options) {
        if (['get'].indexOf(options.method) !== -1) {
            if (typeof(options.params.local) === 'undefined' || options.params.local !== false){
                if (!options.params.local) options.params.local = 'current';
                iPath.set(options.params,'local',
                    ['all', 'current'].indexOf(options.params.local) !== -1 ? TranslateService.getLang(options.params.local) : options.params.local);
            }else if(options.params.local === false)
                iPath.del(options.params, 'local');
        }
        return options;
    },

    cancelAll() {
        $.each(this.requests, function (i, request) {
            if(typeof(request.cancel) !== 'undefined')
                request.cancel()
        })
    },

    query(options, notify = false) {
        if (typeof(options.cancelToken) === 'undefined' && options.useCancelToken !== false){
            var $request = iPath.get(this.requests, options.url)
            if($request)
                $request.cancel();
            const cancelTokenSource = Axios.CancelToken.source();
            options.cancelToken = cancelTokenSource.token
            iPath.set(this.requests, options.url, cancelTokenSource)
        }
        iPath.del(options, 'useCancelToken');
        if (this.useLocal && options.useLocal !== false)
            options = this.renderLocal(options)

        return new Promise((resolve, reject) => {
            try {
                instance(options)
                    .then(response => {
                        resolve({handel: iRequest.then(response, notify), root: response})
                    })
                    .catch(error => {
                        reject({handel: iRequest.catch(error), root: error})
                    })
            }catch (e) {
                reject(e)
            }
        })
    },

    get(resource, params = {}, headers = {}, notify = false, options = {}) {
        return this.query({
            method: 'get',
            url: resource,
            params : params,
            headers : headers,
            ...options
        }, notify)
    },

    post(resource, data = {}, notify = false, headers = {}, params = {}, options = {}) {
        return this.query({
            method: 'post',
            url: resource,
            data : data,
            headers : headers,
            params : params,
            ...options
        }, notify)
    },

    put(resource, data = {}, notify = false, headers = {}, params = {}, options = {}) {
        return this.query({
            method: 'put',
            url: resource,
            data : data,
            headers : headers,
            params : params,
            ...options
        }, notify)
    },

    delete(resource, notify = true, params = {}, headers = {}, options = {}) {
        return this.query({
            method: 'delete',
            url: resource,
            params : params,
            headers : headers,
            ...options
        }, notify)
    }
};

export default AxiosService;
