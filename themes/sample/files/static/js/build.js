(function(c){if(!c.console){var b="log debug info warn error assert dir dirxml group groupEnd time timeEnd count trace profile profileEnd".split(" "),e,d=b.length;c.console={};for(e=0;e<d;e++)c.console[b[e]]=function(){}}b=function(a,m,d){this._configuration=a;this._moduleLoader=m;this._events=d;this._numberOfInitializedModules=0;this._pendingCallbacks=[];this._events.subscribe("log-error",this.onLogError,this)};b.prototype.run=function(){this._moduleLoader.load(this._configuration.modules,c.document)};
b.prototype.registerModule=function(a){var d=a.name,c=a.initialize,b=a.filterVideos,e=a.queryConfigMap,g,h,j=this;d?c?(g=(a=this._configuration.modules.filter(function(a){return a.name===d?!0:!1}))&&a[0]||null,e&&Object.keys(e).forEach(function(a){h=e[a];g[h]=j._configuration.query_arguments[a]}),b?(c(g,this._events,this._configuration.videos),b(function(a){j._configuration.videos=a;j._numberOfInitializedModules+=1})):(this._pendingCallbacks.push({callback:c,configuration:g}),this._numberOfInitializedModules+=
1)):(console.log("!! Missing initialize callback for module `"+d+"` -- ignoring registration."),j._numberOfInitializedModules+=1):(console.log("!! Missing module name -- ignoring registration."),j._numberOfInitializedModules+=1)};b.prototype.onModulesInitialized=function(a){var d=this,b,e;b=c.setInterval(function(){if(d._configuration.modules.length==d._numberOfInitializedModules){var k=d._configuration.modules.length,g=k,h=function(){g-=1;console.log("Modules remaining: "+g+" / "+k);0===g&&(c.clearTimeout(e),
a())};d._pendingCallbacks.forEach(function(a){a.callback(a.configuration,d._events,d._configuration.videos,h)});d._pendingCallbacks=[];c.clearInterval(b)}},10);e=c.setTimeout(function(){console.log("ERROR -- modules did not initialize.")},3E4)};b.prototype.onLogError=function(a,d){$.ajax({type:"POST",url:"/error/player",data:JSON.stringify({errorType:a,errorData:d,configuration:this._configuration,userAgent:c.navigator.userAgent}),contentType:"text/plain"}).fail(this.logErrorFailed)};b.prototype.logErrorFailed=
function(a,d,b){console.log("Unable to send Player error: "+a.status+" "+b)};c.uStudio=c.uStudio||{};c.uStudio.Core=b;c.uStudio.uStudioCore={instance:null}})(this);(function(c){var b,e=function(d){this.name="ConfigurationLoaderError";this.message=d||"Configuation loader error."};e.prototype=Error();e.prototype.constructor=e;b={load:function(d,a,c){var f=$.ajax({url:a});f.done(function(a){if(!a)throw new e("Invalid configuration.");if(!a.modules)throw new e("Configuration ("+JSON.stringify(a)+") requires a modules section.");if(!(a.modules instanceof Array))throw new e("Configuration ("+JSON.stringify(a)+") requires a module array.");if(0===a.modules.length)throw new e("Configuration ("+
JSON.stringify(a)+") requires at least one module definition.");var b;b={};var f,h,j;if(d.location.search){j=d.location.search.substr(1).split("&");for(f=0;f<j.length;f++)h=j[f].split("="),2===h.length&&(b[h[0]]=d.decodeURIComponent(h[1]))}else b={};a.query_arguments=b;c(a)});f.fail(function(d,c){throw new b.ConfigurationLoaderError("Unable to fetch configuration from ("+a+"). Reason: "+c);})},ConfigurationLoaderError:e};c.uStudio=c.uStudio||{};c.uStudio.ConfigurationLoaderNamespace=b})(this);(function(c){var b=function(){var d=this;this._eventSubscriptions={};this._pageUrl=this._pageId=this._pageOrigin=null;this._postMessageSupported=!!c.parent.postMessage;this._started=!1;var a=function(a){d._onMessage(a)};c.addEventListener?c.addEventListener("message",a,!1):c.attachEvent("onmessage",a);this._externalBroadcast("uStudio.eventsReady",[])},e=1;b.prototype._onMessage=function(d){var a=JSON.parse(d.data);if(a.event&&"undefined"!==typeof a.arguments){if("uStudio.pageReady"===a.event){var b=
a.arguments[0];if(!b.url||!b.id){console.log("Invalid page ready event: "+a.event);return}this._pageUrl=b.url;this._pageOrigin=d.origin;this._pageId=b.id;this._started&&this._externalBroadcast("start",[])}this._internalBroadcast(a.event,a.arguments)}};b.prototype.subscribe=function(d,a,b){d in this._eventSubscriptions||(this._eventSubscriptions[d]=[]);a._guid||(a._guid=e++);this._eventSubscriptions[d].push({context:b,callback:a})};b.prototype.unsubscribe=function(d,a,b){var c=this._eventSubscriptions[d],
e=0,k=!1,g,h;if(!c||a&&!a._guid)return k;if(1==arguments.length)return c.length=0,k;for(h=a._guid;g=c[e];++e)if(g.callback._guid===h&&g.context===b){k=c.splice(e,1);break}return k};b.prototype._internalBroadcast=function(d,a){if(d in this._eventSubscriptions){var b=this._eventSubscriptions[d];a=a||[];for(var c=0;c<b.length;++c)b[c].callback.apply(b[c].context,a)}};b.prototype._externalBroadcast=function(d,a){if(this._postMessageSupported){var b={event:d,id:this._pageId,arguments:a},e=this._pageOrigin||
"*";"*"==e&&"uStudio.eventsReady"!=d||c.parent.postMessage(JSON.stringify(b),e)}};b.prototype.broadcast=function(b,a){"start"===b&&(this._started=!0);this._internalBroadcast(b,a);this._pageOrigin&&this._externalBroadcast(b,a)};c.uStudio=c.uStudio||{};c.uStudio.Events=b})(this);(function(c){var b=function(b){this.name="FactoryManagerError";this.message=b||"Factory error."};b.prototype=Error();b.prototype.constructor=b;var e=function(){this._registeredFactories={}};e.prototype.register=function(d,a,c){if(d in this._registeredFactories)throw new b("Factory ("+d+") already registered.");this._registeredFactories[d]={context:c||null,callback:a}};e.prototype.create=function(d,a){if(!(d in this._registeredFactories))throw new b("No factory registered for ("+d+").");var c=this._registeredFactories[d];
a=a||[];return c.callback.apply(c.context,a)};c.uStudio=c.uStudio||{};c.uStudio.FactoryManager=e})(this);(function(c){var b;b=function(){};b.prototype.load=function(b,a){for(var c=0;c<b.length;c++){var f=b[c],l=a;if(!f.name)throw new e("Module configuration ("+JSON.stringify(f)+") requires a name.");if(!f.path)throw new e("Module configuration ("+JSON.stringify(f)+") requires a path.");var k=l.createElement("script");k.id=f.name+"_module";k.src=f.path;l.getElementsByTagName("body")[0].appendChild(k)}};var e=function(b){this.name="ModuleLoaderError";this.message=b||"Module loader error."};e.prototype=
Error();e.prototype.constructor=e;b={ModuleLoader:b,ModuleLoaderError:e};c.uStudio=c.uStudio||{};c.uStudio.ModuleLoaderNamespace=b})(this);