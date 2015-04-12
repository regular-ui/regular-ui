var reqwest = require("reqwest");
var request = {};
//var Progress = require("../component/progress/progress.rglc");
//var progress = new Progress();
request.request = function(opt) {
  var noop = function(){};
  var olderror = opt.error || noop,
      oldsuccess = opt.success || noop;

  if(opt.method && opt.method.toLowerCase() === "post"){
    opt.contentType = 'application/json'
  }

  if(opt.contentType === 'application/json' || opt.headers && opt.headers.contentType === 'application/json'){
    opt.data = JSON.stringify(opt.data);
  }
  if(!opt.method || opt.method === 'get') {
    if(opt.data) opt.data.timestamp = +new Date;
    else opt.data = {timestamp: +new Date}
  }
  //opt.progress && progress.start();
  opt.success = function(json) {
    //opt.progress && progress.end();
    oldsuccess.apply(this, arguments);
    //router.go('app.forbidden');
  }
  opt.error = function(json) {
    //opt.progress && progress.end(true);
    olderror.apply(this, arguments);
  }
  reqwest(opt);
}

module.exports = request;