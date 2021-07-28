/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 9/9/20, 10:09 AM
 * Copyright (c) 2021. Powered by iamir.net
 */

const Notify = (content, options) => {
    switch (options['type']) {
        case 's':
            options['type'] = 'success';
            break;
        case 'd':
            options['type'] = 'danger';
            break;
        case 'w':
            options['type'] = 'warning';
            break;
        case 'i':
            options['type'] = 'info';
            break;
    }
    switch (options['type']) {
        case 'success':
            content.icon = 'icon ' + 'la la-check-circle';
            break;
        case 'danger':
            content.icon = 'icon ' + 'la la-radiation-alt';
            break;
        case 'warning':
            content.icon = 'icon ' + 'la la-warning';
            break;
        case 'info':
            content.icon = 'icon ' + 'la la-qrcode';
            break;
    }
    return  $.notify(content, {
        type: options['type'],
        allow_dismiss: false,
        newest_on_top: true,
        mouse_over: true,
        showProgressbar: false,
        spacing: 10,
        timer: 1500,
        placement: {
            from: 'top',
            align: 'right'
        },
        offset: {
            x: 20,
            y: 50
        },
        delay: 1000,
        z_index: 10000,
        animate: {
            enter: 'animated ' + 'bounce',
            exit: 'animated ' + 'bounce'
        }
    });
}

export default Notify;
