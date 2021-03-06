// backbone-subroute.js v0.4.1
//
// Copyright (C) 2012 Dave Cadwallader, Model N, Inc.  
// Distributed under the MIT License
//
// Documentation and full license available at:
// https://github.com/ModelN/backbone.subroute
!function(a){"function"==typeof define&&define.amd?define(["lodash","backbone"],a):a(_,Backbone)}(function(a,b){return b.SubRoute=b.Router.extend({constructor:function(c,d){this.routes=a.clone(this.routes),this.prefix=c=c||"",this.separator="/"===c.slice(-1)?"":"/",this.createTrailingSlashRoutes=d&&d.createTrailingSlashRoutes,b.Router.prototype.constructor.call(this,d);var e;e=b.history.fragment?b.history.getFragment():b.history.getHash(),a.every(this.routes,function(a,c){return e.match(b.Router.prototype._routeToRegExp(c))?(b.history.loadUrl(e),!1):!0},this),this.postInitialize&&this.postInitialize(d)},navigate:function(a,c){"/"!=a.substr(0,1)&&0!==a.indexOf(this.prefix.substr(0,this.prefix.length-1))&&(a=this.prefix+(a?this.separator:"")+a),b.Router.prototype.navigate.call(this,a,c)},route:function(a,c,d){"/"===a.substr(0)&&(a=a.substr(1,a.length));var e=this.prefix;return a&&a.length>0&&(e+=this.separator+a),this.createTrailingSlashRoutes&&(this.routes[e+"/"]=c,b.Router.prototype.route.call(this,e+"/",c,d)),delete this.routes[a],this.routes[e]=c,b.Router.prototype.route.call(this,e,c,d)}}),b.SubRoute});