/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 10/8/20, 7:13 AM
 * Copyright (c) 2021. Powered by iamir.net
 */

import Notify from "../plugins/notify.plugin";

const iRequest = {
    then(response, notify) {
        var content = {};
        content.message = response.data.message_text || 'The operation was successful.';
        let data = response.data.data;
        let parent = {};
        let additional = response.data.additional ? response.data.additional : {};
        let links = response.data.links ? response.data.links : {};
        let meta = response.data.meta ? response.data.meta : {};
        if (meta.parent) {
            parent = response.data[meta.parent];
        }
        let message = response.data.message || response.message;
        let message_text = response.data.message_text || response.message_text;
        if (notify) Notify(content, {type: 's'})
        return {status: true ,message: message, message_text: message_text, data: data, parent: parent, additional: additional, meta: meta, links: links};
    },
    catch(error) {
        if (error.response || error.message){
            let message = error.response.data.message || error.message;
            let message_text = error.response.data.message_text || error.message_text
            let errors = error.response.data.errors;
            var content = {};
            content.message = message_text;
            if (errors) {
                var errorsHtml = this.errorsToHtml(errors);
                content.message += '<br>' + errorsHtml.html();
            }
            Notify(content, {type: 'd'})
            return {
                status: false,
                message: message,
                message_text: message_text,
                errors: errors,
                'html': errors ? content.message : null
            };
        }
        return {
            status: false,
            message: 'canceled',
            message_text: 'Canceled',
            errors: null,
            'html': null
        }
    },
    errorsToHtml(errors)  {
        var sub_ul = $('<ul/>');
        $.each(errors, function (index, value) {
            var sub_li = $('<li/>').html(value.join(', '));
            sub_ul.append(sub_li);
        });
        return sub_ul;
    }
};

export default iRequest;
