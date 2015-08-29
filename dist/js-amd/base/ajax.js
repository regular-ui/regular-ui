define(function (require, exports, module) {'use strict';

var reqwest = require('reqwest');
var ajax = {};
// var eventEmitter = new require('events').EventEmitter();
// var ajax = {
//     $on: eventEmitter.on,
//     $off: eventEmitter.removeListener,
//     $emit: eventEmitter.emit
// };

var Notify = require('../module/notify.js');

ajax.request = function(opt) {
    var noop = function(){};
    var oldError = opt.error || noop,
        oldSuccess = opt.success || noop,
        oldComplete = opt.complete || noop;

    opt.data = opt.data || {};

    if(!opt.contentType && opt.method && opt.method.toLowerCase() !== 'get')
        opt.contentType = 'application/json';
    else
        opt.data.timestamp = +new Date;

    if(opt.contentType === 'application/json') {
        opt.data = JSON.stringify(opt.data);
    }

    //ajax.$emit('start', opt);
    opt.success = function(data) {
        //ajax.$emit('success', data);

        if(!data.success) {
            Notify.error(data.message);
            oldError(data.result, data);
            return;
        }
        
        oldSuccess(data.result, data);
    }

    opt.error = function(data) {
        //ajax.$emit('error', data);
        oldError(data.result, data);
    }

    opt.complete = function(data) {
        //ajax.$emit('complete', data);
        oldComplete(data.result, data);
    }

    reqwest(opt);
}

ajax.get = function(url, success) {
    ajax.request({
        url: url,
        method: 'get',
        success: success
    });
}

ajax.post = function(url, data, success) {
    ajax.request({
        url: url,
        method: 'post',
        type: 'json',
        success: success
    })
}

module.exports = ajax;
});
