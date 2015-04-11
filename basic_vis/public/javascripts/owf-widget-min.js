(function() {
    eval('var djConfig = {scopeMap:[["dojo","owfdojo"],["dijit","owfdijit"],["dojox","owfdojox"]]};');
    var sMap = null;
    if ((sMap || (typeof djConfig != "undefined" && djConfig.scopeMap)) && (typeof window != "undefined")) {
        var scopeDef = "",
            scopePrefix = "",
            scopeSuffix = "",
            scopeMap = {},
            scopeMapRev = {};
        sMap = sMap || djConfig.scopeMap;
        for (var i = 0; i < sMap.length; i++) {
            var newScope = sMap[i];
            scopeDef += "var " + newScope[0] + " = {}; " + newScope[1] + " = " + newScope[0] + ";" + newScope[1] + "._scopeName = '" + newScope[1] + "';";
            scopePrefix += (i == 0 ? "" : ",") + newScope[0];
            scopeSuffix += (i == 0 ? "" : ",") + newScope[1];
            scopeMap[newScope[0]] = newScope[1];
            scopeMapRev[newScope[1]] = newScope[0]
        }
        eval(scopeDef + "dojo._scopeArgs = [" + scopeSuffix + "];");
        dojo._scopePrefixArgs = scopePrefix;
        dojo._scopePrefix = "(function(" + scopePrefix + "){";
        dojo._scopeSuffix = "})(" + scopeSuffix + ")";
        dojo._scopeMap = scopeMap;
        dojo._scopeMapRev = scopeMapRev
    }(function() {
        if (typeof this["loadFirebugConsole"] == "function") {
            this["loadFirebugConsole"]()
        } else {
            this.console = this.console || {};
            var cn = ["assert", "count", "debug", "dir", "dirxml", "error", "group", "groupEnd", "info", "profile", "profileEnd", "time", "timeEnd", "trace", "warn", "log"];
            var i = 0,
                tn;
            while ((tn = cn[i++])) {
                if (!console[tn]) {
                    (function() {
                        var tcn = tn + "";
                        console[tcn] = ("log" in console) ? function() {
                            var a = Array.apply({}, arguments);
                            a.unshift(tcn + ":");
                            console.log(a.join(" "))
                        } : function() {};
                        console[tcn]._fake = true
                    })()
                }
            }
        } if (typeof dojo == "undefined") {
            dojo = {
                _scopeName: "dojo",
                _scopePrefix: "",
                _scopePrefixArgs: "",
                _scopeSuffix: "",
                _scopeMap: {},
                _scopeMapRev: {}
            }
        }
        var d = dojo;
        if (typeof dijit == "undefined") {
            dijit = {
                _scopeName: "dijit"
            }
        }
        if (typeof dojox == "undefined") {
            dojox = {
                _scopeName: "dojox"
            }
        }
        if (!d._scopeArgs) {
            d._scopeArgs = [dojo, dijit, dojox]
        }
        d.global = this;
        d.config = {
            isDebug: false,
            debugAtAllCosts: false
        };
        if (typeof djConfig != "undefined") {
            for (var opt in djConfig) {
                d.config[opt] = djConfig[opt]
            }
        }
        dojo.locale = d.config.locale;
        var rev = "$Rev: 22487 $".match(/\d+/);
        dojo.version = {
            major: 1,
            minor: 0,
            patch: 0,
            flag: "",
            revision: rev ? +rev[0] : NaN,
            toString: function() {
                with(d.version) {
                    return major + "." + minor + "." + patch + flag + " (" + revision + ")"
                }
            }
        };
        if (typeof OpenAjax != "undefined") {
            OpenAjax.hub.registerLibrary(dojo._scopeName, "http://dojotoolkit.org", d.version.toString())
        }
        var extraNames, extraLen, empty = {};
        for (var i in {
            toString: 1
        }) {
            extraNames = [];
            break
        }
        dojo._extraNames = extraNames = extraNames || ["hasOwnProperty", "valueOf", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "constructor"];
        extraLen = extraNames.length;
        dojo._mixin = function(target, source) {
            var name, s, i;
            for (name in source) {
                s = source[name];
                if (!(name in target) || (target[name] !== s && (!(name in empty) || empty[name] !== s))) {
                    target[name] = s
                }
            }
            if (extraLen && source) {
                for (i = 0; i < extraLen; ++i) {
                    name = extraNames[i];
                    s = source[name];
                    if (!(name in target) || (target[name] !== s && (!(name in empty) || empty[name] !== s))) {
                        target[name] = s
                    }
                }
            }
            return target
        };
        dojo.mixin = function(obj, props) {
            if (!obj) {
                obj = {}
            }
            for (var i = 1, l = arguments.length; i < l; i++) {
                d._mixin(obj, arguments[i])
            }
            return obj
        };
        dojo._getProp = function(parts, create, context) {
            var obj = context || d.global;
            for (var i = 0, p; obj && (p = parts[i]); i++) {
                if (i == 0 && d._scopeMap[p]) {
                    p = d._scopeMap[p]
                }
                obj = (p in obj ? obj[p] : (create ? obj[p] = {} : undefined))
            }
            return obj
        };
        dojo.setObject = function(name, value, context) {
            var parts = name.split("."),
                p = parts.pop(),
                obj = d._getProp(parts, true, context);
            return obj && p ? (obj[p] = value) : undefined
        };
        dojo.getObject = function(name, create, context) {
            return d._getProp(name.split("."), create, context)
        };
        dojo.exists = function(name, obj) {
            return !!d.getObject(name, false, obj)
        };
        dojo["eval"] = function(scriptFragment) {
            return d.global.eval ? d.global.eval(scriptFragment) : eval(scriptFragment)
        };
        d.deprecated = d.experimental = function() {}
    })();
    (function() {
        var d = dojo;
        d.mixin(d, {
            _loadedModules: {},
            _inFlightCount: 0,
            _hasResource: {},
            _modulePrefixes: {
                dojo: {
                    name: "dojo",
                    value: "."
                },
                doh: {
                    name: "doh",
                    value: "../util/doh"
                },
                tests: {
                    name: "tests",
                    value: "tests"
                }
            },
            _moduleHasPrefix: function(module) {
                var mp = d._modulePrefixes;
                return !!(mp[module] && mp[module].value)
            },
            _getModulePrefix: function(module) {
                var mp = d._modulePrefixes;
                if (d._moduleHasPrefix(module)) {
                    return mp[module].value
                }
                return module
            },
            _loadedUrls: [],
            _postLoad: false,
            _loaders: [],
            _unloaders: [],
            _loadNotifying: false
        });
        dojo._loadPath = function(relpath, module, cb) {
            var uri = ((relpath.charAt(0) == "/" || relpath.match(/^\w+:/)) ? "" : d.baseUrl) + relpath;
            try {
                return !module ? d._loadUri(uri, cb) : d._loadUriAndCheck(uri, module, cb)
            } catch (e) {
                console.error(e);
                return false
            }
        };
        dojo._loadUri = function(uri, cb) {
            if (d._loadedUrls[uri]) {
                return true
            }
            d._inFlightCount++;
            var contents = d._getText(uri, true);
            if (contents) {
                d._loadedUrls[uri] = true;
                d._loadedUrls.push(uri);
                if (cb) {
                    contents = "(" + contents + ")"
                } else {
                    contents = d._scopePrefix + contents + d._scopeSuffix
                } if (!d.isIE) {
                    contents += "\r\n//@ sourceURL=" + uri
                }
                var value = d["eval"](contents);
                if (cb) {
                    cb(value)
                }
            }
            if (--d._inFlightCount == 0 && d._postLoad && d._loaders.length) {
                setTimeout(function() {
                    if (d._inFlightCount == 0) {
                        d._callLoaded()
                    }
                }, 0)
            }
            return !!contents
        };
        dojo._loadUriAndCheck = function(uri, moduleName, cb) {
            var ok = false;
            try {
                ok = d._loadUri(uri, cb)
            } catch (e) {
                console.error("failed loading " + uri + " with error: " + e)
            }
            return !!(ok && d._loadedModules[moduleName])
        };
        dojo.loaded = function() {
            d._loadNotifying = true;
            d._postLoad = true;
            var mll = d._loaders;
            d._loaders = [];
            for (var x = 0; x < mll.length; x++) {
                mll[x]()
            }
            d._loadNotifying = false;
            if (d._postLoad && d._inFlightCount == 0 && mll.length) {
                d._callLoaded()
            }
        };
        dojo.unloaded = function() {
            var mll = d._unloaders;
            while (mll.length) {
                (mll.pop())()
            }
        };
        d._onto = function(arr, obj, fn) {
            if (!fn) {
                arr.push(obj)
            } else {
                if (fn) {
                    var func = (typeof fn == "string") ? obj[fn] : fn;
                    arr.push(function() {
                        func.call(obj)
                    })
                }
            }
        };
        dojo.ready = dojo.addOnLoad = function(obj, functionName) {
            d._onto(d._loaders, obj, functionName);
            if (d._postLoad && d._inFlightCount == 0 && !d._loadNotifying) {
                d._callLoaded()
            }
        };
        var dca = d.config.addOnLoad;
        if (dca) {
            d.addOnLoad[(dca instanceof Array ? "apply" : "call")](d, dca)
        }
        dojo._modulesLoaded = function() {
            if (d._postLoad) {
                return
            }
            if (d._inFlightCount > 0) {
                console.warn("files still in flight!");
                return
            }
            d._callLoaded()
        };
        dojo._callLoaded = function() {
            if (typeof setTimeout == "object" || (d.config.useXDomain && d.isOpera)) {
                setTimeout(d.isAIR ? function() {
                    d.loaded()
                } : d._scopeName + ".loaded();", 0)
            } else {
                d.loaded()
            }
        };
        dojo._getModuleSymbols = function(modulename) {
            var syms = modulename.split(".");
            for (var i = syms.length; i > 0; i--) {
                var parentModule = syms.slice(0, i).join(".");
                if (i == 1 && !d._moduleHasPrefix(parentModule)) {
                    syms[0] = "../" + syms[0]
                } else {
                    var parentModulePath = d._getModulePrefix(parentModule);
                    if (parentModulePath != parentModule) {
                        syms.splice(0, i, parentModulePath);
                        break
                    }
                }
            }
            return syms
        };
        dojo._global_omit_module_check = false;
        dojo.loadInit = function(init) {
            init()
        };
        dojo._loadModule = dojo.require = function(moduleName, omitModuleCheck) {
            omitModuleCheck = d._global_omit_module_check || omitModuleCheck;
            var module = d._loadedModules[moduleName];
            if (module) {
                return module
            }
            var relpath = d._getModuleSymbols(moduleName).join("/") + ".js";
            var modArg = !omitModuleCheck ? moduleName : null;
            var ok = d._loadPath(relpath, modArg);
            if (!ok && !omitModuleCheck) {
                throw new Error("Could not load '" + moduleName + "'; last tried '" + relpath + "'")
            }
            if (!omitModuleCheck && !d._isXDomain) {
                module = d._loadedModules[moduleName];
                if (!module) {
                    throw new Error("symbol '" + moduleName + "' is not defined after loading '" + relpath + "'")
                }
            }
            return module
        };
        dojo.provide = function(resourceName) {
            resourceName = resourceName + "";
            return (d._loadedModules[resourceName] = d.getObject(resourceName, true))
        };
        dojo.platformRequire = function(modMap) {
            var common = modMap.common || [];
            var result = common.concat(modMap[d._name] || modMap["default"] || []);
            for (var x = 0; x < result.length; x++) {
                var curr = result[x];
                if (curr.constructor == Array) {
                    d._loadModule.apply(d, curr)
                } else {
                    d._loadModule(curr)
                }
            }
        };
        dojo.requireIf = function(condition, resourceName) {
            if (condition === true) {
                var args = [];
                for (var i = 1; i < arguments.length; i++) {
                    args.push(arguments[i])
                }
                d.require.apply(d, args)
            }
        };
        dojo.requireAfterIf = d.requireIf;
        dojo.registerModulePath = function(module, prefix) {
            d._modulePrefixes[module] = {
                name: module,
                value: prefix
            }
        };
        dojo.requireLocalization = function(moduleName, bundleName, locale, availableFlatLocales) {
            d.require("dojo.i18n");
            d.i18n._requireLocalization.apply(d.hostenv, arguments)
        };
        var ore = new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),
            ire = new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$");
        dojo._Url = function() {
            var n = null,
                _a = arguments,
                uri = [_a[0]];
            for (var i = 1; i < _a.length; i++) {
                if (!_a[i]) {
                    continue
                }
                var relobj = new d._Url(_a[i] + ""),
                    uriobj = new d._Url(uri[0] + "");
                if (relobj.path == "" && !relobj.scheme && !relobj.authority && !relobj.query) {
                    if (relobj.fragment != n) {
                        uriobj.fragment = relobj.fragment
                    }
                    relobj = uriobj
                } else {
                    if (!relobj.scheme) {
                        relobj.scheme = uriobj.scheme;
                        if (!relobj.authority) {
                            relobj.authority = uriobj.authority;
                            if (relobj.path.charAt(0) != "/") {
                                var path = uriobj.path.substring(0, uriobj.path.lastIndexOf("/") + 1) + relobj.path;
                                var segs = path.split("/");
                                for (var j = 0; j < segs.length; j++) {
                                    if (segs[j] == ".") {
                                        if (j == segs.length - 1) {
                                            segs[j] = ""
                                        } else {
                                            segs.splice(j, 1);
                                            j--
                                        }
                                    } else {
                                        if (j > 0 && !(j == 1 && segs[0] == "") && segs[j] == ".." && segs[j - 1] != "..") {
                                            if (j == (segs.length - 1)) {
                                                segs.splice(j, 1);
                                                segs[j - 1] = ""
                                            } else {
                                                segs.splice(j - 1, 2);
                                                j -= 2
                                            }
                                        }
                                    }
                                }
                                relobj.path = segs.join("/")
                            }
                        }
                    }
                }
                uri = [];
                if (relobj.scheme) {
                    uri.push(relobj.scheme, ":")
                }
                if (relobj.authority) {
                    uri.push("//", relobj.authority)
                }
                uri.push(relobj.path);
                if (relobj.query) {
                    uri.push("?", relobj.query)
                }
                if (relobj.fragment) {
                    uri.push("#", relobj.fragment)
                }
            }
            this.uri = uri.join("");
            var r = this.uri.match(ore);
            this.scheme = r[2] || (r[1] ? "" : n);
            this.authority = r[4] || (r[3] ? "" : n);
            this.path = r[5];
            this.query = r[7] || (r[6] ? "" : n);
            this.fragment = r[9] || (r[8] ? "" : n);
            if (this.authority != n) {
                r = this.authority.match(ire);
                this.user = r[3] || n;
                this.password = r[4] || n;
                this.host = r[6] || r[7];
                this.port = r[9] || n
            }
        };
        dojo._Url.prototype.toString = function() {
            return this.uri
        };
        dojo.moduleUrl = function(module, url) {
            var loc = d._getModuleSymbols(module).join("/");
            if (!loc) {
                return null
            }
            if (loc.lastIndexOf("/") != loc.length - 1) {
                loc += "/"
            }
            var colonIndex = loc.indexOf(":");
            if (loc.charAt(0) != "/" && (colonIndex == -1 || colonIndex > loc.indexOf("/"))) {
                loc = d.baseUrl + loc
            }
            return new d._Url(loc, url)
        }
    })();
    if (typeof window != "undefined") {
        dojo.isBrowser = true;
        dojo._name = "browser";
        (function() {
            var d = dojo;
            if (document && document.getElementsByTagName) {
                var scripts = document.getElementsByTagName("script");
                var rePkg = /dojo(\.xd)?\.js(\W|$)/i;
                for (var i = 0; i < scripts.length; i++) {
                    var src = scripts[i].getAttribute("src");
                    if (!src) {
                        continue
                    }
                    var m = src.match(rePkg);
                    if (m) {
                        if (!d.config.baseUrl) {
                            d.config.baseUrl = src.substring(0, m.index)
                        }
                        var cfg = scripts[i].getAttribute("djConfig");
                        if (cfg) {
                            var cfgo = eval("({ " + cfg + " })");
                            for (var x in cfgo) {
                                dojo.config[x] = cfgo[x]
                            }
                        }
                        break
                    }
                }
            }
            d.baseUrl = d.config.baseUrl;
            var n = navigator;
            var dua = n.userAgent,
                dav = n.appVersion,
                tv = parseFloat(dav);
            if (dua.indexOf("Opera") >= 0) {
                d.isOpera = tv
            }
            if (dua.indexOf("AdobeAIR") >= 0) {
                d.isAIR = 1
            }
            d.isKhtml = (dav.indexOf("Konqueror") >= 0) ? tv : 0;
            d.isWebKit = parseFloat(dua.split("WebKit/")[1]) || undefined;
            d.isChrome = parseFloat(dua.split("Chrome/")[1]) || undefined;
            d.isMac = dav.indexOf("Macintosh") >= 0;
            var index = Math.max(dav.indexOf("WebKit"), dav.indexOf("Safari"), 0);
            if (index && !dojo.isChrome) {
                d.isSafari = parseFloat(dav.split("Version/")[1]);
                if (!d.isSafari || parseFloat(dav.substr(index + 7)) <= 419.3) {
                    d.isSafari = 2
                }
            }
            if (dua.indexOf("Gecko") >= 0 && !d.isKhtml && !d.isWebKit) {
                d.isMozilla = d.isMoz = tv
            }
            if (d.isMoz) {
                d.isFF = parseFloat(dua.split("Firefox/")[1] || dua.split("Minefield/")[1]) || undefined
            }
            if (document.all && !d.isOpera) {
                d.isIE = parseFloat(dav.split("MSIE ")[1]) || undefined;
                var mode = document.documentMode;
                if (mode && mode != 5 && Math.floor(d.isIE) != mode) {
                    d.isIE = mode
                }
            }
            if (dojo.isIE && window.location.protocol === "file:") {
                dojo.config.ieForceActiveXXhr = true
            }
            d.isQuirks = document.compatMode == "BackCompat";
            d.locale = dojo.config.locale || (d.isIE ? n.userLanguage : n.language).toLowerCase();
            d._XMLHTTP_PROGIDS = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"];
            d._xhrObj = function() {
                var http, last_e;
                if (!dojo.isIE || !dojo.config.ieForceActiveXXhr) {
                    try {
                        http = new XMLHttpRequest()
                    } catch (e) {}
                }
                if (!http) {
                    for (var i = 0; i < 3; ++i) {
                        var progid = d._XMLHTTP_PROGIDS[i];
                        try {
                            http = new ActiveXObject(progid)
                        } catch (e) {
                            last_e = e
                        }
                        if (http) {
                            d._XMLHTTP_PROGIDS = [progid];
                            break
                        }
                    }
                }
                if (!http) {
                    throw new Error("XMLHTTP not available: " + last_e)
                }
                return http
            };
            d._isDocumentOk = function(http) {
                var stat = http.status || 0,
                    lp = location.protocol;
                return (stat >= 200 && stat < 300) || stat == 304 || stat == 1223 || (!stat && (lp == "file:" || lp == "chrome:" || lp == "chrome-extension:" || lp == "app:"))
            };
            var owloc = window.location + "";
            var base = document.getElementsByTagName("base");
            var hasBase = (base && base.length > 0);
            d._getText = function(uri, fail_ok) {
                var http = d._xhrObj();
                if (!hasBase && dojo._Url) {
                    uri = (new dojo._Url(owloc, uri)).toString()
                }
                if (d.config.cacheBust) {
                    uri += "";
                    uri += (uri.indexOf("?") == -1 ? "?" : "&") + String(d.config.cacheBust).replace(/\W+/g, "")
                }
                http.open("GET", uri, false);
                try {
                    http.send(null);
                    if (!d._isDocumentOk(http)) {
                        var err = Error("Unable to load " + uri + " status:" + http.status);
                        err.status = http.status;
                        err.responseText = http.responseText;
                        throw err
                    }
                } catch (e) {
                    if (fail_ok) {
                        return null
                    }
                    throw e
                }
                return http.responseText
            };
            var _w = window;
            var _handleNodeEvent = function(evtName, fp) {
                var _a = _w.attachEvent || _w.addEventListener;
                evtName = _w.attachEvent ? evtName : evtName.substring(2);
                _a(evtName, function() {
                    fp.apply(_w, arguments)
                }, false)
            };
            d._windowUnloaders = [];
            d.windowUnloaded = function() {
                var mll = d._windowUnloaders;
                while (mll.length) {
                    (mll.pop())()
                }
                d = null
            };
            var _onWindowUnloadAttached = 0;
            d.addOnWindowUnload = function(obj, functionName) {
                d._onto(d._windowUnloaders, obj, functionName);
                if (!_onWindowUnloadAttached) {
                    _onWindowUnloadAttached = 1;
                    _handleNodeEvent("onunload", d.windowUnloaded)
                }
            };
            var _onUnloadAttached = 0;
            d.addOnUnload = function(obj, functionName) {
                d._onto(d._unloaders, obj, functionName);
                if (!_onUnloadAttached) {
                    _onUnloadAttached = 1;
                    _handleNodeEvent("onbeforeunload", dojo.unloaded)
                }
            }
        })();
        dojo._initFired = false;
        dojo._loadInit = function(e) {
            if (dojo._scrollIntervalId) {
                clearInterval(dojo._scrollIntervalId);
                dojo._scrollIntervalId = 0
            }
            if (!dojo._initFired) {
                dojo._initFired = true;
                if (!dojo.config.afterOnLoad && window.detachEvent) {
                    window.detachEvent("onload", dojo._loadInit)
                }
                if (dojo._inFlightCount == 0) {
                    dojo._modulesLoaded()
                }
            }
        };
        if (!dojo.config.afterOnLoad) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", dojo._loadInit, false);
                window.addEventListener("load", dojo._loadInit, false)
            } else {
                if (window.attachEvent) {
                    window.attachEvent("onload", dojo._loadInit);
                    if (!dojo.config.skipIeDomLoaded && self === self.top) {
                        dojo._scrollIntervalId = setInterval(function() {
                            try {
                                if (document.body) {
                                    document.documentElement.doScroll("left");
                                    dojo._loadInit()
                                }
                            } catch (e) {}
                        }, 30)
                    }
                }
            }
        }
        if (dojo.isIE) {
            try {
                (function() {
                    document.namespaces.add("v", "urn:schemas-microsoft-com:vml");
                    var vmlElems = ["*", "group", "roundrect", "oval", "shape", "rect", "imagedata", "path", "textpath", "text"],
                        i = 0,
                        l = 1,
                        s = document.createStyleSheet();
                    if (dojo.isIE >= 8) {
                        i = 1;
                        l = vmlElems.length
                    }
                    for (; i < l; ++i) {
                        s.addRule("v\\:" + vmlElems[i], "behavior:url(#default#VML); display:inline-block")
                    }
                })()
            } catch (e) {}
        }
    }(function() {
        var mp = dojo.config.modulePaths;
        if (mp) {
            for (var param in mp) {
                dojo.registerModulePath(param, mp[param])
            }
        }
    })();
    if (dojo.config.isDebug) {
        dojo.require("dojo._firebug.firebug")
    }
    if (dojo.config.debugAtAllCosts) {
        dojo.config.useXDomain = true;
        dojo.require("dojo._base._loader.loader_xd");
        dojo.require("dojo._base._loader.loader_debug");
        dojo.require("dojo.i18n")
    }
    if (!dojo._hasResource["dojo._base.lang"]) {
        dojo._hasResource["dojo._base.lang"] = true;
        dojo.provide("dojo._base.lang");
        (function() {
            var d = dojo,
                opts = Object.prototype.toString;
            dojo.isString = function(it) {
                return (typeof it == "string" || it instanceof String)
            };
            dojo.isArray = function(it) {
                return it && (it instanceof Array || typeof it == "array")
            };
            dojo.isFunction = function(it) {
                return opts.call(it) === "[object Function]"
            };
            dojo.isObject = function(it) {
                return it !== undefined && (it === null || typeof it == "object" || d.isArray(it) || d.isFunction(it))
            };
            dojo.isArrayLike = function(it) {
                return it && it !== undefined && !d.isString(it) && !d.isFunction(it) && !(it.tagName && it.tagName.toLowerCase() == "form") && (d.isArray(it) || isFinite(it.length))
            };
            dojo.isAlien = function(it) {
                return it && !d.isFunction(it) && /\{\s*\[native code\]\s*\}/.test(String(it))
            };
            dojo.extend = function(constructor, props) {
                for (var i = 1, l = arguments.length; i < l; i++) {
                    d._mixin(constructor.prototype, arguments[i])
                }
                return constructor
            };
            dojo._hitchArgs = function(scope, method) {
                var pre = d._toArray(arguments, 2);
                var named = d.isString(method);
                return function() {
                    var args = d._toArray(arguments);
                    var f = named ? (scope || d.global)[method] : method;
                    return f && f.apply(scope || this, pre.concat(args))
                }
            };
            dojo.hitch = function(scope, method) {
                if (arguments.length > 2) {
                    return d._hitchArgs.apply(d, arguments)
                }
                if (!method) {
                    method = scope;
                    scope = null
                }
                if (d.isString(method)) {
                    scope = scope || d.global;
                    if (!scope[method]) {
                        throw (['dojo.hitch: scope["', method, '"] is null (scope="', scope, '")'].join(""))
                    }
                    return function() {
                        return scope[method].apply(scope, arguments || [])
                    }
                }
                return !scope ? method : function() {
                    return method.apply(scope, arguments || [])
                }
            };
            dojo.delegate = dojo._delegate = (function() {
                function TMP() {}
                return function(obj, props) {
                    TMP.prototype = obj;
                    var tmp = new TMP();
                    TMP.prototype = null;
                    if (props) {
                        d._mixin(tmp, props)
                    }
                    return tmp
                }
            })();
            var efficient = function(obj, offset, startWith) {
                return (startWith || []).concat(Array.prototype.slice.call(obj, offset || 0))
            };
            var slow = function(obj, offset, startWith) {
                var arr = startWith || [];
                for (var x = offset || 0; x < obj.length; x++) {
                    arr.push(obj[x])
                }
                return arr
            };
            dojo._toArray = d.isIE ? function(obj) {
                return ((obj.item) ? slow : efficient).apply(this, arguments)
            } : efficient;
            dojo.partial = function(method) {
                var arr = [null];
                return d.hitch.apply(d, arr.concat(d._toArray(arguments)))
            };
            var extraNames = d._extraNames,
                extraLen = extraNames.length,
                empty = {};
            dojo.clone = function(o) {
                if (!o || typeof o != "object" || d.isFunction(o)) {
                    return o
                }
                if (o.nodeType && "cloneNode" in o) {
                    return o.cloneNode(true)
                }
                if (o instanceof Date) {
                    return new Date(o.getTime())
                }
                var r, i, l, s, name;
                if (d.isArray(o)) {
                    r = [];
                    for (i = 0, l = o.length; i < l; ++i) {
                        if (i in o) {
                            r.push(d.clone(o[i]))
                        }
                    }
                } else {
                    r = o.constructor ? new o.constructor() : {}
                }
                for (name in o) {
                    s = o[name];
                    if (!(name in r) || (r[name] !== s && (!(name in empty) || empty[name] !== s))) {
                        r[name] = d.clone(s)
                    }
                }
                if (extraLen) {
                    for (i = 0; i < extraLen; ++i) {
                        name = extraNames[i];
                        s = o[name];
                        if (!(name in r) || (r[name] !== s && (!(name in empty) || empty[name] !== s))) {
                            r[name] = s
                        }
                    }
                }
                return r
            };
            dojo.trim = String.prototype.trim ? function(str) {
                return str.trim()
            } : function(str) {
                return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
            };
            var _pattern = /\{([^\}]+)\}/g;
            dojo.replace = function(tmpl, map, pattern) {
                return tmpl.replace(pattern || _pattern, d.isFunction(map) ? map : function(_, k) {
                    return d.getObject(k, false, map)
                })
            }
        })()
    }
    if (!dojo._hasResource["dojo._base.array"]) {
        dojo._hasResource["dojo._base.array"] = true;
        dojo.provide("dojo._base.array");
        (function() {
            var _getParts = function(arr, obj, cb) {
                return [(typeof arr == "string") ? arr.split("") : arr, obj || dojo.global, (typeof cb == "string") ? new Function("item", "index", "array", cb) : cb]
            };
            var everyOrSome = function(every, arr, callback, thisObject) {
                var _p = _getParts(arr, thisObject, callback);
                arr = _p[0];
                for (var i = 0, l = arr.length; i < l; ++i) {
                    var result = !!_p[2].call(_p[1], arr[i], i, arr);
                    if (every ^ result) {
                        return result
                    }
                }
                return every
            };
            dojo.mixin(dojo, {
                indexOf: function(array, value, fromIndex, findLast) {
                    var step = 1,
                        end = array.length || 0,
                        i = 0;
                    if (findLast) {
                        i = end - 1;
                        step = end = -1
                    }
                    if (fromIndex != undefined) {
                        i = fromIndex
                    }
                    if ((findLast && i > end) || i < end) {
                        for (; i != end; i += step) {
                            if (array[i] == value) {
                                return i
                            }
                        }
                    }
                    return -1
                },
                lastIndexOf: function(array, value, fromIndex) {
                    return dojo.indexOf(array, value, fromIndex, true)
                },
                forEach: function(arr, callback, thisObject) {
                    if (!arr || !arr.length) {
                        return
                    }
                    var _p = _getParts(arr, thisObject, callback);
                    arr = _p[0];
                    for (var i = 0, l = arr.length; i < l; ++i) {
                        _p[2].call(_p[1], arr[i], i, arr)
                    }
                },
                every: function(arr, callback, thisObject) {
                    return everyOrSome(true, arr, callback, thisObject)
                },
                some: function(arr, callback, thisObject) {
                    return everyOrSome(false, arr, callback, thisObject)
                },
                map: function(arr, callback, thisObject) {
                    var _p = _getParts(arr, thisObject, callback);
                    arr = _p[0];
                    var outArr = (arguments[3] ? (new arguments[3]()) : []);
                    for (var i = 0, l = arr.length; i < l; ++i) {
                        outArr.push(_p[2].call(_p[1], arr[i], i, arr))
                    }
                    return outArr
                },
                filter: function(arr, callback, thisObject) {
                    var _p = _getParts(arr, thisObject, callback);
                    arr = _p[0];
                    var outArr = [];
                    for (var i = 0, l = arr.length; i < l; ++i) {
                        if (_p[2].call(_p[1], arr[i], i, arr)) {
                            outArr.push(arr[i])
                        }
                    }
                    return outArr
                }
            })
        })()
    }
    if (!dojo._hasResource["dojo._base.declare"]) {
        dojo._hasResource["dojo._base.declare"] = true;
        dojo.provide("dojo._base.declare");
        (function() {
            var d = dojo,
                mix = d._mixin,
                op = Object.prototype,
                opts = op.toString,
                xtor = new Function,
                counter = 0,
                cname = "constructor";

            function err(msg) {
                throw new Error("declare: " + msg)
            }

            function c3mro(bases) {
                var result = [],
                    roots = [{
                        cls: 0,
                        refs: []
                    }],
                    nameMap = {},
                    clsCount = 1,
                    l = bases.length,
                    i = 0,
                    j, lin, base, top, proto, rec, name, refs;
                for (; i < l; ++i) {
                    base = bases[i];
                    if (!base) {
                        err("mixin #" + i + " is unknown. Did you use dojo.require to pull it in?")
                    } else {
                        if (opts.call(base) != "[object Function]") {
                            err("mixin #" + i + " is not a callable constructor.")
                        }
                    }
                    lin = base._meta ? base._meta.bases : [base];
                    top = 0;
                    for (j = lin.length - 1; j >= 0; --j) {
                        proto = lin[j].prototype;
                        if (!proto.hasOwnProperty("declaredClass")) {
                            proto.declaredClass = "uniqName_" + (counter++)
                        }
                        name = proto.declaredClass;
                        if (!nameMap.hasOwnProperty(name)) {
                            nameMap[name] = {
                                count: 0,
                                refs: [],
                                cls: lin[j]
                            };
                            ++clsCount
                        }
                        rec = nameMap[name];
                        if (top && top !== rec) {
                            rec.refs.push(top);
                            ++top.count
                        }
                        top = rec
                    }++top.count;
                    roots[0].refs.push(top)
                }
                while (roots.length) {
                    top = roots.pop();
                    result.push(top.cls);
                    --clsCount;
                    while (refs = top.refs, refs.length == 1) {
                        top = refs[0];
                        if (!top || --top.count) {
                            top = 0;
                            break
                        }
                        result.push(top.cls);
                        --clsCount
                    }
                    if (top) {
                        for (i = 0, l = refs.length; i < l; ++i) {
                            top = refs[i];
                            if (!--top.count) {
                                roots.push(top)
                            }
                        }
                    }
                }
                if (clsCount) {
                    err("can't build consistent linearization")
                }
                base = bases[0];
                result[0] = base ? base._meta && base === result[result.length - base._meta.bases.length] ? base._meta.bases.length : 1 : 0;
                return result
            }

            function inherited(args, a, f) {
                var name, chains, bases, caller, meta, base, proto, opf, pos, cache = this._inherited = this._inherited || {};
                if (typeof args == "string") {
                    name = args;
                    args = a;
                    a = f
                }
                f = 0;
                caller = args.callee;
                name = name || caller.nom;
                if (!name) {
                    err("can't deduce a name to call inherited()")
                }
                meta = this.constructor._meta;
                bases = meta.bases;
                pos = cache.p;
                if (name != cname) {
                    if (cache.c !== caller) {
                        pos = 0;
                        base = bases[0];
                        meta = base._meta;
                        if (meta.hidden[name] !== caller) {
                            chains = meta.chains;
                            if (chains && typeof chains[name] == "string") {
                                err("calling chained method with inherited: " + name)
                            }
                            do {
                                meta = base._meta;
                                proto = base.prototype;
                                if (meta && (proto[name] === caller && proto.hasOwnProperty(name) || meta.hidden[name] === caller)) {
                                    break
                                }
                            } while (base = bases[++pos]);
                            pos = base ? pos : -1
                        }
                    }
                    base = bases[++pos];
                    if (base) {
                        proto = base.prototype;
                        if (base._meta && proto.hasOwnProperty(name)) {
                            f = proto[name]
                        } else {
                            opf = op[name];
                            do {
                                proto = base.prototype;
                                f = proto[name];
                                if (f && (base._meta ? proto.hasOwnProperty(name) : f !== opf)) {
                                    break
                                }
                            } while (base = bases[++pos])
                        }
                    }
                    f = base && f || op[name]
                } else {
                    if (cache.c !== caller) {
                        pos = 0;
                        meta = bases[0]._meta;
                        if (meta && meta.ctor !== caller) {
                            chains = meta.chains;
                            if (!chains || chains.constructor !== "manual") {
                                err("calling chained constructor with inherited")
                            }
                            while (base = bases[++pos]) {
                                meta = base._meta;
                                if (meta && meta.ctor === caller) {
                                    break
                                }
                            }
                            pos = base ? pos : -1
                        }
                    }
                    while (base = bases[++pos]) {
                        meta = base._meta;
                        f = meta ? meta.ctor : base;
                        if (f) {
                            break
                        }
                    }
                    f = base && f
                }
                cache.c = f;
                cache.p = pos;
                if (f) {
                    return a === true ? f : f.apply(this, a || args)
                }
            }

            function getInherited(name, args) {
                if (typeof name == "string") {
                    return this.inherited(name, args, true)
                }
                return this.inherited(name, true)
            }

            function isInstanceOf(cls) {
                var bases = this.constructor._meta.bases;
                for (var i = 0, l = bases.length; i < l; ++i) {
                    if (bases[i] === cls) {
                        return true
                    }
                }
                return this instanceof cls
            }

            function mixOwn(target, source) {
                var name, i = 0,
                    l = d._extraNames.length;
                for (name in source) {
                    if (name != cname && source.hasOwnProperty(name)) {
                        target[name] = source[name]
                    }
                }
                for (; i < l; ++i) {
                    name = d._extraNames[i];
                    if (name != cname && source.hasOwnProperty(name)) {
                        target[name] = source[name]
                    }
                }
            }

            function safeMixin(target, source) {
                var name, t, i = 0,
                    l = d._extraNames.length;
                for (name in source) {
                    t = source[name];
                    if ((t !== op[name] || !(name in op)) && name != cname) {
                        if (opts.call(t) == "[object Function]") {
                            t.nom = name
                        }
                        target[name] = t
                    }
                }
                for (; i < l; ++i) {
                    name = d._extraNames[i];
                    t = source[name];
                    if ((t !== op[name] || !(name in op)) && name != cname) {
                        if (opts.call(t) == "[object Function]") {
                            t.nom = name
                        }
                        target[name] = t
                    }
                }
                return target
            }

            function extend(source) {
                safeMixin(this.prototype, source);
                return this
            }

            function chainedConstructor(bases, ctorSpecial) {
                return function() {
                    var a = arguments,
                        args = a,
                        a0 = a[0],
                        f, i, m, l = bases.length,
                        preArgs;
                    if (!(this instanceof a.callee)) {
                        return applyNew(a)
                    }
                    if (ctorSpecial && (a0 && a0.preamble || this.preamble)) {
                        preArgs = new Array(bases.length);
                        preArgs[0] = a;
                        for (i = 0;;) {
                            a0 = a[0];
                            if (a0) {
                                f = a0.preamble;
                                if (f) {
                                    a = f.apply(this, a) || a
                                }
                            }
                            f = bases[i].prototype;
                            f = f.hasOwnProperty("preamble") && f.preamble;
                            if (f) {
                                a = f.apply(this, a) || a
                            }
                            if (++i == l) {
                                break
                            }
                            preArgs[i] = a
                        }
                    }
                    for (i = l - 1; i >= 0; --i) {
                        f = bases[i];
                        m = f._meta;
                        f = m ? m.ctor : f;
                        if (f) {
                            f.apply(this, preArgs ? preArgs[i] : a)
                        }
                    }
                    f = this.postscript;
                    if (f) {
                        f.apply(this, args)
                    }
                }
            }

            function singleConstructor(ctor, ctorSpecial) {
                return function() {
                    var a = arguments,
                        t = a,
                        a0 = a[0],
                        f;
                    if (!(this instanceof a.callee)) {
                        return applyNew(a)
                    }
                    if (ctorSpecial) {
                        if (a0) {
                            f = a0.preamble;
                            if (f) {
                                t = f.apply(this, t) || t
                            }
                        }
                        f = this.preamble;
                        if (f) {
                            f.apply(this, t)
                        }
                    }
                    if (ctor) {
                        ctor.apply(this, a)
                    }
                    f = this.postscript;
                    if (f) {
                        f.apply(this, a)
                    }
                }
            }

            function simpleConstructor(bases) {
                return function() {
                    var a = arguments,
                        i = 0,
                        f, m;
                    if (!(this instanceof a.callee)) {
                        return applyNew(a)
                    }
                    for (; f = bases[i]; ++i) {
                        m = f._meta;
                        f = m ? m.ctor : f;
                        if (f) {
                            f.apply(this, a);
                            break
                        }
                    }
                    f = this.postscript;
                    if (f) {
                        f.apply(this, a)
                    }
                }
            }

            function chain(name, bases, reversed) {
                return function() {
                    var b, m, f, i = 0,
                        step = 1;
                    if (reversed) {
                        i = bases.length - 1;
                        step = -1
                    }
                    for (; b = bases[i]; i += step) {
                        m = b._meta;
                        f = (m ? m.hidden : b.prototype)[name];
                        if (f) {
                            f.apply(this, arguments)
                        }
                    }
                }
            }

            function forceNew(ctor) {
                xtor.prototype = ctor.prototype;
                var t = new xtor;
                xtor.prototype = null;
                return t
            }

            function applyNew(args) {
                var ctor = args.callee,
                    t = forceNew(ctor);
                ctor.apply(t, args);
                return t
            }
            d.declare = function(className, superclass, props) {
                if (typeof className != "string") {
                    props = superclass;
                    superclass = className;
                    className = ""
                }
                props = props || {};
                var proto, i, t, ctor, name, bases, chains, mixins = 1,
                    parents = superclass;
                if (opts.call(superclass) == "[object Array]") {
                    bases = c3mro(superclass);
                    t = bases[0];
                    mixins = bases.length - t;
                    superclass = bases[mixins]
                } else {
                    bases = [0];
                    if (superclass) {
                        if (opts.call(superclass) == "[object Function]") {
                            t = superclass._meta;
                            bases = bases.concat(t ? t.bases : superclass)
                        } else {
                            err("base class is not a callable constructor.")
                        }
                    } else {
                        if (superclass !== null) {
                            err("unknown base class. Did you use dojo.require to pull it in?")
                        }
                    }
                } if (superclass) {
                    for (i = mixins - 1;; --i) {
                        proto = forceNew(superclass);
                        if (!i) {
                            break
                        }
                        t = bases[i];
                        (t._meta ? mixOwn : mix)(proto, t.prototype);
                        ctor = new Function;
                        ctor.superclass = superclass;
                        ctor.prototype = proto;
                        superclass = proto.constructor = ctor
                    }
                } else {
                    proto = {}
                }
                safeMixin(proto, props);
                t = props.constructor;
                if (t !== op.constructor) {
                    t.nom = cname;
                    proto.constructor = t
                }
                for (i = mixins - 1; i; --i) {
                    t = bases[i]._meta;
                    if (t && t.chains) {
                        chains = mix(chains || {}, t.chains)
                    }
                }
                if (proto["-chains-"]) {
                    chains = mix(chains || {}, proto["-chains-"])
                }
                t = !chains || !chains.hasOwnProperty(cname);
                bases[0] = ctor = (chains && chains.constructor === "manual") ? simpleConstructor(bases) : (bases.length == 1 ? singleConstructor(props.constructor, t) : chainedConstructor(bases, t));
                ctor._meta = {
                    bases: bases,
                    hidden: props,
                    chains: chains,
                    parents: parents,
                    ctor: props.constructor
                };
                ctor.superclass = superclass && superclass.prototype;
                ctor.extend = extend;
                ctor.prototype = proto;
                proto.constructor = ctor;
                proto.getInherited = getInherited;
                proto.inherited = inherited;
                proto.isInstanceOf = isInstanceOf;
                if (className) {
                    proto.declaredClass = className;
                    d.setObject(className, ctor)
                }
                if (chains) {
                    for (name in chains) {
                        if (proto[name] && typeof chains[name] == "string" && name != cname) {
                            t = proto[name] = chain(name, bases, chains[name] === "after");
                            t.nom = name
                        }
                    }
                }
                return ctor
            };
            d.safeMixin = safeMixin
        })()
    }
    if (!dojo._hasResource["dojo._base.connect"]) {
        dojo._hasResource["dojo._base.connect"] = true;
        dojo.provide("dojo._base.connect");
        dojo._listener = {
            getDispatcher: function() {
                return function() {
                    var ap = Array.prototype,
                        c = arguments.callee,
                        ls = c._listeners,
                        t = c.target;
                    var r = t && t.apply(this, arguments);
                    var i, lls;
                    lls = [].concat(ls);
                    for (i in lls) {
                        if (!(i in ap)) {
                            lls[i].apply(this, arguments)
                        }
                    }
                    return r
                }
            },
            add: function(source, method, listener) {
                source = source || dojo.global;
                var f = source[method];
                if (!f || !f._listeners) {
                    var d = dojo._listener.getDispatcher();
                    d.target = f;
                    d._listeners = [];
                    f = source[method] = d
                }
                return f._listeners.push(listener)
            },
            remove: function(source, method, handle) {
                var f = (source || dojo.global)[method];
                if (f && f._listeners && handle--) {
                    delete f._listeners[handle]
                }
            }
        };
        dojo.connect = function(obj, event, context, method, dontFix) {
            var a = arguments,
                args = [],
                i = 0;
            args.push(dojo.isString(a[0]) ? null : a[i++], a[i++]);
            var a1 = a[i + 1];
            args.push(dojo.isString(a1) || dojo.isFunction(a1) ? a[i++] : null, a[i++]);
            for (var l = a.length; i < l; i++) {
                args.push(a[i])
            }
            return dojo._connect.apply(this, args)
        };
        dojo._connect = function(obj, event, context, method) {
            var l = dojo._listener,
                h = l.add(obj, event, dojo.hitch(context, method));
            return [obj, event, h, l]
        };
        dojo.disconnect = function(handle) {
            if (handle && handle[0] !== undefined) {
                dojo._disconnect.apply(this, handle);
                delete handle[0]
            }
        };
        dojo._disconnect = function(obj, event, handle, listener) {
            listener.remove(obj, event, handle)
        };
        dojo._topics = {};
        dojo.subscribe = function(topic, context, method) {
            return [topic, dojo._listener.add(dojo._topics, topic, dojo.hitch(context, method))]
        };
        dojo.unsubscribe = function(handle) {
            if (handle) {
                dojo._listener.remove(dojo._topics, handle[0], handle[1])
            }
        };
        dojo.publish = function(topic, args) {
            var f = dojo._topics[topic];
            if (f) {
                f.apply(this, args || [])
            }
        };
        dojo.connectPublisher = function(topic, obj, event) {
            var pf = function() {
                dojo.publish(topic, arguments)
            };
            return event ? dojo.connect(obj, event, pf) : dojo.connect(obj, pf)
        }
    }
    if (!dojo._hasResource["dojo._base.Deferred"]) {
        dojo._hasResource["dojo._base.Deferred"] = true;
        dojo.provide("dojo._base.Deferred");
        (function() {
            var mutator = function() {};
            var freeze = Object.freeze || function() {};
            dojo.Deferred = function(canceller) {
                var result, finished, isError, head, nextListener;
                var promise = this.promise = {};

                function complete(value) {
                    if (finished) {
                        throw new Error("This deferred has already been resolved")
                    }
                    result = value;
                    finished = true;
                    notify()
                }

                function notify() {
                    var mutated;
                    while (!mutated && nextListener) {
                        var listener = nextListener;
                        nextListener = nextListener.next;
                        if (mutated = (listener.progress == mutator)) {
                            finished = false
                        }
                        var func = (isError ? listener.error : listener.resolved);
                        if (func) {
                            try {
                                var newResult = func(result);
                                if (newResult && typeof newResult.then === "function") {
                                    newResult.then(dojo.hitch(listener.deferred, "resolve"), dojo.hitch(listener.deferred, "reject"));
                                    continue
                                }
                                var unchanged = mutated && newResult === undefined;
                                listener.deferred[unchanged && isError ? "reject" : "resolve"](unchanged ? result : newResult)
                            } catch (e) {
                                listener.deferred.reject(e)
                            }
                        } else {
                            if (isError) {
                                listener.deferred.reject(result)
                            } else {
                                listener.deferred.resolve(result)
                            }
                        }
                    }
                }
                this.resolve = this.callback = function(value) {
                    this.fired = 0;
                    this.results = [value, null];
                    complete(value)
                };
                this.reject = this.errback = function(error) {
                    isError = true;
                    this.fired = 1;
                    complete(error);
                    this.results = [null, error];
                    if (!error || error.log !== false) {
                        (dojo.config.deferredOnError || function(x) {
                            console.error(x)
                        })(error)
                    }
                };
                this.progress = function(update) {
                    var listener = nextListener;
                    while (listener) {
                        var progress = listener.progress;
                        progress && progress(update);
                        listener = listener.next
                    }
                };
                this.addCallbacks = function(callback, errback) {
                    this.then(callback, errback, mutator);
                    return this
                };
                this.then = promise.then = function(resolvedCallback, errorCallback, progressCallback) {
                    var returnDeferred = progressCallback == mutator ? this : new dojo.Deferred(promise.cancel);
                    var listener = {
                        resolved: resolvedCallback,
                        error: errorCallback,
                        progress: progressCallback,
                        deferred: returnDeferred
                    };
                    if (nextListener) {
                        head = head.next = listener
                    } else {
                        nextListener = head = listener
                    } if (finished) {
                        notify()
                    }
                    return returnDeferred.promise
                };
                var deferred = this;
                this.cancel = promise.cancel = function() {
                    if (!finished) {
                        var error = canceller && canceller(deferred);
                        if (!finished) {
                            if (!(error instanceof Error)) {
                                error = new Error(error)
                            }
                            error.log = false;
                            deferred.reject(error)
                        }
                    }
                };
                freeze(promise)
            };
            dojo.extend(dojo.Deferred, {
                addCallback: function(callback) {
                    return this.addCallbacks(dojo.hitch.apply(dojo, arguments))
                },
                addErrback: function(errback) {
                    return this.addCallbacks(null, dojo.hitch.apply(dojo, arguments))
                },
                addBoth: function(callback) {
                    var enclosed = dojo.hitch.apply(dojo, arguments);
                    return this.addCallbacks(enclosed, enclosed)
                },
                fired: -1
            })
        })();
        dojo.when = function(promiseOrValue, callback, errback, progressHandler) {
            if (promiseOrValue && typeof promiseOrValue.then === "function") {
                return promiseOrValue.then(callback, errback, progressHandler)
            }
            return callback(promiseOrValue)
        }
    }
    if (!dojo._hasResource["dojo._base.json"]) {
        dojo._hasResource["dojo._base.json"] = true;
        dojo.provide("dojo._base.json");
        dojo.fromJson = function(json) {
            return eval("(" + json + ")")
        };
        dojo._escapeString = function(str) {
            return ('"' + str.replace(/(["\\])/g, "\\$1") + '"').replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r")
        };
        dojo.toJsonIndentStr = "\t";
        dojo.toJson = function(it, prettyPrint, _indentStr) {
            if (it === undefined) {
                return "undefined"
            }
            var objtype = typeof it;
            if (objtype == "number" || objtype == "boolean") {
                return it + ""
            }
            if (it === null) {
                return "null"
            }
            if (dojo.isString(it)) {
                return dojo._escapeString(it)
            }
            var recurse = arguments.callee;
            var newObj;
            _indentStr = _indentStr || "";
            var nextIndent = prettyPrint ? _indentStr + dojo.toJsonIndentStr : "";
            var tf = it.__json__ || it.json;
            if (dojo.isFunction(tf)) {
                newObj = tf.call(it);
                if (it !== newObj) {
                    return recurse(newObj, prettyPrint, nextIndent)
                }
            }
            if (it.nodeType && it.cloneNode) {
                throw new Error("Can't serialize DOM nodes")
            }
            var sep = prettyPrint ? " " : "";
            var newLine = prettyPrint ? "\n" : "";
            if (dojo.isArray(it)) {
                var res = dojo.map(it, function(obj) {
                    var val = recurse(obj, prettyPrint, nextIndent);
                    if (typeof val != "string") {
                        val = "undefined"
                    }
                    return newLine + nextIndent + val
                });
                return "[" + res.join("," + sep) + newLine + _indentStr + "]"
            }
            if (objtype == "function") {
                return null
            }
            var output = [],
                key;
            for (key in it) {
                var keyStr, val;
                if (typeof key == "number") {
                    keyStr = '"' + key + '"'
                } else {
                    if (typeof key == "string") {
                        keyStr = dojo._escapeString(key)
                    } else {
                        continue
                    }
                }
                val = recurse(it[key], prettyPrint, nextIndent);
                if (typeof val != "string") {
                    continue
                }
                output.push(newLine + nextIndent + keyStr + ":" + sep + val)
            }
            return "{" + output.join("," + sep) + newLine + _indentStr + "}"
        }
    }
    if (!dojo._hasResource["dojo._base.Color"]) {
        dojo._hasResource["dojo._base.Color"] = true;
        dojo.provide("dojo._base.Color");
        (function() {
            var d = dojo;
            dojo.Color = function(color) {
                if (color) {
                    this.setColor(color)
                }
            };
            dojo.Color.named = {
                black: [0, 0, 0],
                silver: [192, 192, 192],
                gray: [128, 128, 128],
                white: [255, 255, 255],
                maroon: [128, 0, 0],
                red: [255, 0, 0],
                purple: [128, 0, 128],
                fuchsia: [255, 0, 255],
                green: [0, 128, 0],
                lime: [0, 255, 0],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                navy: [0, 0, 128],
                blue: [0, 0, 255],
                teal: [0, 128, 128],
                aqua: [0, 255, 255],
                transparent: d.config.transparentColor || [255, 255, 255]
            };
            dojo.extend(dojo.Color, {
                r: 255,
                g: 255,
                b: 255,
                a: 1,
                _set: function(r, g, b, a) {
                    var t = this;
                    t.r = r;
                    t.g = g;
                    t.b = b;
                    t.a = a
                },
                setColor: function(color) {
                    if (d.isString(color)) {
                        d.colorFromString(color, this)
                    } else {
                        if (d.isArray(color)) {
                            d.colorFromArray(color, this)
                        } else {
                            this._set(color.r, color.g, color.b, color.a);
                            if (!(color instanceof d.Color)) {
                                this.sanitize()
                            }
                        }
                    }
                    return this
                },
                sanitize: function() {
                    return this
                },
                toRgb: function() {
                    var t = this;
                    return [t.r, t.g, t.b]
                },
                toRgba: function() {
                    var t = this;
                    return [t.r, t.g, t.b, t.a]
                },
                toHex: function() {
                    var arr = d.map(["r", "g", "b"], function(x) {
                        var s = this[x].toString(16);
                        return s.length < 2 ? "0" + s : s
                    }, this);
                    return "#" + arr.join("")
                },
                toCss: function(includeAlpha) {
                    var t = this,
                        rgb = t.r + ", " + t.g + ", " + t.b;
                    return (includeAlpha ? "rgba(" + rgb + ", " + t.a : "rgb(" + rgb) + ")"
                },
                toString: function() {
                    return this.toCss(true)
                }
            });
            dojo.blendColors = function(start, end, weight, obj) {
                var t = obj || new d.Color();
                d.forEach(["r", "g", "b", "a"], function(x) {
                    t[x] = start[x] + (end[x] - start[x]) * weight;
                    if (x != "a") {
                        t[x] = Math.round(t[x])
                    }
                });
                return t.sanitize()
            };
            dojo.colorFromRgb = function(color, obj) {
                var m = color.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
                return m && dojo.colorFromArray(m[1].split(/\s*,\s*/), obj)
            };
            dojo.colorFromHex = function(color, obj) {
                var t = obj || new d.Color(),
                    bits = (color.length == 4) ? 4 : 8,
                    mask = (1 << bits) - 1;
                color = Number("0x" + color.substr(1));
                if (isNaN(color)) {
                    return null
                }
                d.forEach(["b", "g", "r"], function(x) {
                    var c = color & mask;
                    color >>= bits;
                    t[x] = bits == 4 ? 17 * c : c
                });
                t.a = 1;
                return t
            };
            dojo.colorFromArray = function(a, obj) {
                var t = obj || new d.Color();
                t._set(Number(a[0]), Number(a[1]), Number(a[2]), Number(a[3]));
                if (isNaN(t.a)) {
                    t.a = 1
                }
                return t.sanitize()
            };
            dojo.colorFromString = function(str, obj) {
                var a = d.Color.named[str];
                return a && d.colorFromArray(a, obj) || d.colorFromRgb(str, obj) || d.colorFromHex(str, obj)
            }
        })()
    }
    if (!dojo._hasResource["dojo._base"]) {
        dojo._hasResource["dojo._base"] = true;
        dojo.provide("dojo._base")
    }
    if (!dojo._hasResource["dojo._base.window"]) {
        dojo._hasResource["dojo._base.window"] = true;
        dojo.provide("dojo._base.window");
        dojo.doc = window.document || null;
        dojo.body = function() {
            return dojo.doc.body || dojo.doc.getElementsByTagName("body")[0]
        };
        dojo.setContext = function(globalObject, globalDocument) {
            dojo.global = globalObject;
            dojo.doc = globalDocument
        };
        dojo.withGlobal = function(globalObject, callback, thisObject, cbArguments) {
            var oldGlob = dojo.global;
            try {
                dojo.global = globalObject;
                return dojo.withDoc.call(null, globalObject.document, callback, thisObject, cbArguments)
            } finally {
                dojo.global = oldGlob
            }
        };
        dojo.withDoc = function(documentObject, callback, thisObject, cbArguments) {
            var oldDoc = dojo.doc,
                oldLtr = dojo._bodyLtr,
                oldQ = dojo.isQuirks;
            try {
                dojo.doc = documentObject;
                delete dojo._bodyLtr;
                dojo.isQuirks = dojo.doc.compatMode == "BackCompat";
                if (thisObject && typeof callback == "string") {
                    callback = thisObject[callback]
                }
                return callback.apply(thisObject, cbArguments || [])
            } finally {
                dojo.doc = oldDoc;
                delete dojo._bodyLtr;
                if (oldLtr !== undefined) {
                    dojo._bodyLtr = oldLtr
                }
                dojo.isQuirks = oldQ
            }
        }
    }
    if (!dojo._hasResource["dojo._base.event"]) {
        dojo._hasResource["dojo._base.event"] = true;
        dojo.provide("dojo._base.event");
        (function() {
            var del = (dojo._event_listener = {
                add: function(node, name, fp) {
                    if (!node) {
                        return
                    }
                    name = del._normalizeEventName(name);
                    fp = del._fixCallback(name, fp);
                    var oname = name;
                    if (!dojo.isIE && (name == "mouseenter" || name == "mouseleave")) {
                        var ofp = fp;
                        name = (name == "mouseenter") ? "mouseover" : "mouseout";
                        fp = function(e) {
                            if (!dojo.isDescendant(e.relatedTarget, node)) {
                                return ofp.call(this, e)
                            }
                        }
                    }
                    node.addEventListener(name, fp, false);
                    return fp
                },
                remove: function(node, event, handle) {
                    if (node) {
                        event = del._normalizeEventName(event);
                        if (!dojo.isIE && (event == "mouseenter" || event == "mouseleave")) {
                            event = (event == "mouseenter") ? "mouseover" : "mouseout"
                        }
                        node.removeEventListener(event, handle, false)
                    }
                },
                _normalizeEventName: function(name) {
                    return name.slice(0, 2) == "on" ? name.slice(2) : name
                },
                _fixCallback: function(name, fp) {
                    return name != "keypress" ? fp : function(e) {
                        return fp.call(this, del._fixEvent(e, this))
                    }
                },
                _fixEvent: function(evt, sender) {
                    switch (evt.type) {
                        case "keypress":
                            del._setKeyChar(evt);
                            break
                    }
                    return evt
                },
                _setKeyChar: function(evt) {
                    evt.keyChar = evt.charCode ? String.fromCharCode(evt.charCode) : "";
                    evt.charOrCode = evt.keyChar || evt.keyCode
                },
                _punctMap: {
                    106: 42,
                    111: 47,
                    186: 59,
                    187: 43,
                    188: 44,
                    189: 45,
                    190: 46,
                    191: 47,
                    192: 96,
                    219: 91,
                    220: 92,
                    221: 93,
                    222: 39
                }
            });
            dojo.fixEvent = function(evt, sender) {
                return del._fixEvent(evt, sender)
            };
            dojo.stopEvent = function(evt) {
                evt.preventDefault();
                evt.stopPropagation()
            };
            var node_listener = dojo._listener;
            dojo._connect = function(obj, event, context, method, dontFix) {
                var isNode = obj && (obj.nodeType || obj.attachEvent || obj.addEventListener);
                var lid = isNode ? (dontFix ? 2 : 1) : 0,
                    l = [dojo._listener, del, node_listener][lid];
                var h = l.add(obj, event, dojo.hitch(context, method));
                return [obj, event, h, lid]
            };
            dojo._disconnect = function(obj, event, handle, listener) {
                ([dojo._listener, del, node_listener][listener]).remove(obj, event, handle)
            };
            dojo.keys = {
                BACKSPACE: 8,
                TAB: 9,
                CLEAR: 12,
                ENTER: 13,
                SHIFT: 16,
                CTRL: 17,
                ALT: 18,
                META: dojo.isSafari ? 91 : 224,
                PAUSE: 19,
                CAPS_LOCK: 20,
                ESCAPE: 27,
                SPACE: 32,
                PAGE_UP: 33,
                PAGE_DOWN: 34,
                END: 35,
                HOME: 36,
                LEFT_ARROW: 37,
                UP_ARROW: 38,
                RIGHT_ARROW: 39,
                DOWN_ARROW: 40,
                INSERT: 45,
                DELETE: 46,
                HELP: 47,
                LEFT_WINDOW: 91,
                RIGHT_WINDOW: 92,
                SELECT: 93,
                NUMPAD_0: 96,
                NUMPAD_1: 97,
                NUMPAD_2: 98,
                NUMPAD_3: 99,
                NUMPAD_4: 100,
                NUMPAD_5: 101,
                NUMPAD_6: 102,
                NUMPAD_7: 103,
                NUMPAD_8: 104,
                NUMPAD_9: 105,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_PLUS: 107,
                NUMPAD_ENTER: 108,
                NUMPAD_MINUS: 109,
                NUMPAD_PERIOD: 110,
                NUMPAD_DIVIDE: 111,
                F1: 112,
                F2: 113,
                F3: 114,
                F4: 115,
                F5: 116,
                F6: 117,
                F7: 118,
                F8: 119,
                F9: 120,
                F10: 121,
                F11: 122,
                F12: 123,
                F13: 124,
                F14: 125,
                F15: 126,
                NUM_LOCK: 144,
                SCROLL_LOCK: 145,
                copyKey: dojo.isMac && !dojo.isAIR ? (dojo.isSafari ? 91 : 224) : 17
            };
            var evtCopyKey = dojo.isMac ? "metaKey" : "ctrlKey";
            dojo.isCopyKey = function(e) {
                return e[evtCopyKey]
            };
            if (dojo.isIE) {
                dojo.mouseButtons = {
                    LEFT: 1,
                    MIDDLE: 4,
                    RIGHT: 2,
                    isButton: function(e, button) {
                        return e.button & button
                    },
                    isLeft: function(e) {
                        return e.button & 1
                    },
                    isMiddle: function(e) {
                        return e.button & 4
                    },
                    isRight: function(e) {
                        return e.button & 2
                    }
                }
            } else {
                dojo.mouseButtons = {
                    LEFT: 0,
                    MIDDLE: 1,
                    RIGHT: 2,
                    isButton: function(e, button) {
                        return e.button == button
                    },
                    isLeft: function(e) {
                        return e.button == 0
                    },
                    isMiddle: function(e) {
                        return e.button == 1
                    },
                    isRight: function(e) {
                        return e.button == 2
                    }
                }
            } if (dojo.isIE) {
                var _trySetKeyCode = function(e, code) {
                    try {
                        return (e.keyCode = code)
                    } catch (e) {
                        return 0
                    }
                };
                var iel = dojo._listener;
                var listenersName = (dojo._ieListenersName = "_" + dojo._scopeName + "_listeners");
                if (!dojo.config._allow_leaks) {
                    node_listener = iel = dojo._ie_listener = {
                        handlers: [],
                        add: function(source, method, listener) {
                            source = source || dojo.global;
                            var f = source[method];
                            if (!f || !f[listenersName]) {
                                var d = dojo._getIeDispatcher();
                                d.target = f && (ieh.push(f) - 1);
                                d[listenersName] = [];
                                f = source[method] = d
                            }
                            return f[listenersName].push(ieh.push(listener) - 1)
                        },
                        remove: function(source, method, handle) {
                            var f = (source || dojo.global)[method],
                                l = f && f[listenersName];
                            if (f && l && handle--) {
                                delete ieh[l[handle]];
                                delete l[handle]
                            }
                        }
                    };
                    var ieh = iel.handlers
                }
                dojo.mixin(del, {
                    add: function(node, event, fp) {
                        if (!node) {
                            return
                        }
                        event = del._normalizeEventName(event);
                        if (event == "onkeypress") {
                            var kd = node.onkeydown;
                            if (!kd || !kd[listenersName] || !kd._stealthKeydownHandle) {
                                var h = del.add(node, "onkeydown", del._stealthKeyDown);
                                kd = node.onkeydown;
                                kd._stealthKeydownHandle = h;
                                kd._stealthKeydownRefs = 1
                            } else {
                                kd._stealthKeydownRefs++
                            }
                        }
                        return iel.add(node, event, del._fixCallback(fp))
                    },
                    remove: function(node, event, handle) {
                        event = del._normalizeEventName(event);
                        iel.remove(node, event, handle);
                        if (event == "onkeypress") {
                            var kd = node.onkeydown;
                            if (--kd._stealthKeydownRefs <= 0) {
                                iel.remove(node, "onkeydown", kd._stealthKeydownHandle);
                                delete kd._stealthKeydownHandle
                            }
                        }
                    },
                    _normalizeEventName: function(eventName) {
                        return eventName.slice(0, 2) != "on" ? "on" + eventName : eventName
                    },
                    _nop: function() {},
                    _fixEvent: function(evt, sender) {
                        if (!evt) {
                            var w = sender && (sender.ownerDocument || sender.document || sender).parentWindow || window;
                            evt = w.event
                        }
                        if (!evt) {
                            return (evt)
                        }
                        evt.target = evt.srcElement;
                        evt.currentTarget = (sender || evt.srcElement);
                        evt.layerX = evt.offsetX;
                        evt.layerY = evt.offsetY;
                        var se = evt.srcElement,
                            doc = (se && se.ownerDocument) || document;
                        var docBody = ((dojo.isIE < 6) || (doc.compatMode == "BackCompat")) ? doc.body : doc.documentElement;
                        var offset = dojo._getIeDocumentElementOffset();
                        evt.pageX = evt.clientX + dojo._fixIeBiDiScrollLeft(docBody.scrollLeft || 0) - offset.x;
                        evt.pageY = evt.clientY + (docBody.scrollTop || 0) - offset.y;
                        if (evt.type == "mouseover") {
                            evt.relatedTarget = evt.fromElement
                        }
                        if (evt.type == "mouseout") {
                            evt.relatedTarget = evt.toElement
                        }
                        evt.stopPropagation = del._stopPropagation;
                        evt.preventDefault = del._preventDefault;
                        return del._fixKeys(evt)
                    },
                    _fixKeys: function(evt) {
                        switch (evt.type) {
                            case "keypress":
                                var c = ("charCode" in evt ? evt.charCode : evt.keyCode);
                                if (c == 10) {
                                    c = 0;
                                    evt.keyCode = 13
                                } else {
                                    if (c == 13 || c == 27) {
                                        c = 0
                                    } else {
                                        if (c == 3) {
                                            c = 99
                                        }
                                    }
                                }
                                evt.charCode = c;
                                del._setKeyChar(evt);
                                break
                        }
                        return evt
                    },
                    _stealthKeyDown: function(evt) {
                        var kp = evt.currentTarget.onkeypress;
                        if (!kp || !kp[listenersName]) {
                            return
                        }
                        var k = evt.keyCode;
                        var unprintable = k != 13 && k != 32 && k != 27 && (k < 48 || k > 90) && (k < 96 || k > 111) && (k < 186 || k > 192) && (k < 219 || k > 222);
                        if (unprintable || evt.ctrlKey) {
                            var c = unprintable ? 0 : k;
                            if (evt.ctrlKey) {
                                if (k == 3 || k == 13) {
                                    return
                                } else {
                                    if (c > 95 && c < 106) {
                                        c -= 48
                                    } else {
                                        if ((!evt.shiftKey) && (c >= 65 && c <= 90)) {
                                            c += 32
                                        } else {
                                            c = del._punctMap[c] || c
                                        }
                                    }
                                }
                            }
                            var faux = del._synthesizeEvent(evt, {
                                type: "keypress",
                                faux: true,
                                charCode: c
                            });
                            kp.call(evt.currentTarget, faux);
                            evt.cancelBubble = faux.cancelBubble;
                            evt.returnValue = faux.returnValue;
                            _trySetKeyCode(evt, faux.keyCode)
                        }
                    },
                    _stopPropagation: function() {
                        this.cancelBubble = true
                    },
                    _preventDefault: function() {
                        this.bubbledKeyCode = this.keyCode;
                        if (this.ctrlKey) {
                            _trySetKeyCode(this, 0)
                        }
                        this.returnValue = false
                    }
                });
                dojo.stopEvent = function(evt) {
                    evt = evt || window.event;
                    del._stopPropagation.call(evt);
                    del._preventDefault.call(evt)
                }
            }
            del._synthesizeEvent = function(evt, props) {
                var faux = dojo.mixin({}, evt, props);
                del._setKeyChar(faux);
                faux.preventDefault = function() {
                    evt.preventDefault()
                };
                faux.stopPropagation = function() {
                    evt.stopPropagation()
                };
                return faux
            };
            if (dojo.isOpera) {
                dojo.mixin(del, {
                    _fixEvent: function(evt, sender) {
                        switch (evt.type) {
                            case "keypress":
                                var c = evt.which;
                                if (c == 3) {
                                    c = 99
                                }
                                c = c < 41 && !evt.shiftKey ? 0 : c;
                                if (evt.ctrlKey && !evt.shiftKey && c >= 65 && c <= 90) {
                                    c += 32
                                }
                                return del._synthesizeEvent(evt, {
                                    charCode: c
                                })
                        }
                        return evt
                    }
                })
            }
            if (dojo.isWebKit) {
                del._add = del.add;
                del._remove = del.remove;
                dojo.mixin(del, {
                    add: function(node, event, fp) {
                        if (!node) {
                            return
                        }
                        var handle = del._add(node, event, fp);
                        if (del._normalizeEventName(event) == "keypress") {
                            handle._stealthKeyDownHandle = del._add(node, "keydown", function(evt) {
                                var k = evt.keyCode;
                                var unprintable = k != 13 && k != 32 && (k < 48 || k > 90) && (k < 96 || k > 111) && (k < 186 || k > 192) && (k < 219 || k > 222);
                                if (unprintable || evt.ctrlKey) {
                                    var c = unprintable ? 0 : k;
                                    if (evt.ctrlKey) {
                                        if (k == 3 || k == 13) {
                                            return
                                        } else {
                                            if (c > 95 && c < 106) {
                                                c -= 48
                                            } else {
                                                if (!evt.shiftKey && c >= 65 && c <= 90) {
                                                    c += 32
                                                } else {
                                                    c = del._punctMap[c] || c
                                                }
                                            }
                                        }
                                    }
                                    var faux = del._synthesizeEvent(evt, {
                                        type: "keypress",
                                        faux: true,
                                        charCode: c
                                    });
                                    fp.call(evt.currentTarget, faux)
                                }
                            })
                        }
                        return handle
                    },
                    remove: function(node, event, handle) {
                        if (node) {
                            if (handle._stealthKeyDownHandle) {
                                del._remove(node, "keydown", handle._stealthKeyDownHandle)
                            }
                            del._remove(node, event, handle)
                        }
                    },
                    _fixEvent: function(evt, sender) {
                        switch (evt.type) {
                            case "keypress":
                                if (evt.faux) {
                                    return evt
                                }
                                var c = evt.charCode;
                                c = c >= 32 ? c : 0;
                                return del._synthesizeEvent(evt, {
                                    charCode: c,
                                    faux: true
                                })
                        }
                        return evt
                    }
                })
            }
        })();
        if (dojo.isIE) {
            dojo._ieDispatcher = function(args, sender) {
                var ap = Array.prototype,
                    h = dojo._ie_listener.handlers,
                    c = args.callee,
                    ls = c[dojo._ieListenersName],
                    t = h[c.target];
                var r = t && t.apply(sender, args);
                var lls = [].concat(ls);
                for (var i in lls) {
                    var f = h[lls[i]];
                    if (!(i in ap) && f) {
                        f.apply(sender, args)
                    }
                }
                return r
            };
            dojo._getIeDispatcher = function() {
                return new Function(dojo._scopeName + "._ieDispatcher(arguments, this)")
            };
            dojo._event_listener._fixCallback = function(fp) {
                var f = dojo._event_listener._fixEvent;
                return function(e) {
                    return fp.call(this, f(e, this))
                }
            }
        }
    }
    if (!dojo._hasResource["dojo._base.html"]) {
        dojo._hasResource["dojo._base.html"] = true;
        dojo.provide("dojo._base.html");
        try {
            document.execCommand("BackgroundImageCache", false, true)
        } catch (e) {}
        if (dojo.isIE || dojo.isOpera) {
            dojo.byId = function(id, doc) {
                if (typeof id != "string") {
                    return id
                }
                var _d = doc || dojo.doc,
                    te = _d.getElementById(id);
                if (te && (te.attributes.id.value == id || te.id == id)) {
                    return te
                } else {
                    var eles = _d.all[id];
                    if (!eles || eles.nodeName) {
                        eles = [eles]
                    }
                    var i = 0;
                    while ((te = eles[i++])) {
                        if ((te.attributes && te.attributes.id && te.attributes.id.value == id) || te.id == id) {
                            return te
                        }
                    }
                }
            }
        } else {
            dojo.byId = function(id, doc) {
                return (typeof id == "string") ? (doc || dojo.doc).getElementById(id) : id
            }
        }(function() {
            var d = dojo;
            var byId = d.byId;
            var _destroyContainer = null,
                _destroyDoc;
            d.addOnWindowUnload(function() {
                _destroyContainer = null
            });
            dojo._destroyElement = dojo.destroy = function(node) {
                node = byId(node);
                try {
                    var doc = node.ownerDocument;
                    if (!_destroyContainer || _destroyDoc != doc) {
                        _destroyContainer = doc.createElement("div");
                        _destroyDoc = doc
                    }
                    _destroyContainer.appendChild(node.parentNode ? node.parentNode.removeChild(node) : node);
                    _destroyContainer.innerHTML = ""
                } catch (e) {}
            };
            dojo.isDescendant = function(node, ancestor) {
                try {
                    node = byId(node);
                    ancestor = byId(ancestor);
                    while (node) {
                        if (node == ancestor) {
                            return true
                        }
                        node = node.parentNode
                    }
                } catch (e) {}
                return false
            };
            dojo.setSelectable = function(node, selectable) {
                node = byId(node);
                if (d.isMozilla) {
                    node.style.MozUserSelect = selectable ? "" : "none"
                } else {
                    if (d.isKhtml || d.isWebKit) {
                        node.style.KhtmlUserSelect = selectable ? "auto" : "none"
                    } else {
                        if (d.isIE) {
                            var v = (node.unselectable = selectable ? "" : "on");
                            d.query("*", node).forEach("item.unselectable = '" + v + "'")
                        }
                    }
                }
            };
            var _insertBefore = function(node, ref) {
                var parent = ref.parentNode;
                if (parent) {
                    parent.insertBefore(node, ref)
                }
            };
            var _insertAfter = function(node, ref) {
                var parent = ref.parentNode;
                if (parent) {
                    if (parent.lastChild == ref) {
                        parent.appendChild(node)
                    } else {
                        parent.insertBefore(node, ref.nextSibling)
                    }
                }
            };
            dojo.place = function(node, refNode, position) {
                refNode = byId(refNode);
                if (typeof node == "string") {
                    node = node.charAt(0) == "<" ? d._toDom(node, refNode.ownerDocument) : byId(node)
                }
                if (typeof position == "number") {
                    var cn = refNode.childNodes;
                    if (!cn.length || cn.length <= position) {
                        refNode.appendChild(node)
                    } else {
                        _insertBefore(node, cn[position < 0 ? 0 : position])
                    }
                } else {
                    switch (position) {
                        case "before":
                            _insertBefore(node, refNode);
                            break;
                        case "after":
                            _insertAfter(node, refNode);
                            break;
                        case "replace":
                            refNode.parentNode.replaceChild(node, refNode);
                            break;
                        case "only":
                            d.empty(refNode);
                            refNode.appendChild(node);
                            break;
                        case "first":
                            if (refNode.firstChild) {
                                _insertBefore(node, refNode.firstChild);
                                break
                            }
                        default:
                            refNode.appendChild(node)
                    }
                }
                return node
            };
            dojo.boxModel = "content-box";
            if (d.isIE) {
                d.boxModel = document.compatMode == "BackCompat" ? "border-box" : "content-box"
            }
            var gcs;
            if (d.isWebKit) {
                gcs = function(node) {
                    var s;
                    if (node.nodeType == 1) {
                        var dv = node.ownerDocument.defaultView;
                        s = dv.getComputedStyle(node, null);
                        if (!s && node.style) {
                            node.style.display = "";
                            s = dv.getComputedStyle(node, null)
                        }
                    }
                    return s || {}
                }
            } else {
                if (d.isIE) {
                    gcs = function(node) {
                        return node.nodeType == 1 ? node.currentStyle : {}
                    }
                } else {
                    gcs = function(node) {
                        return node.nodeType == 1 ? node.ownerDocument.defaultView.getComputedStyle(node, null) : {}
                    }
                }
            }
            dojo.getComputedStyle = gcs;
            if (!d.isIE) {
                d._toPixelValue = function(element, value) {
                    return parseFloat(value) || 0
                }
            } else {
                d._toPixelValue = function(element, avalue) {
                    if (!avalue) {
                        return 0
                    }
                    if (avalue == "medium") {
                        return 4
                    }
                    if (avalue.slice && avalue.slice(-2) == "px") {
                        return parseFloat(avalue)
                    }
                    with(element) {
                        var sLeft = style.left;
                        var rsLeft = runtimeStyle.left;
                        runtimeStyle.left = currentStyle.left;
                        try {
                            style.left = avalue;
                            avalue = style.pixelLeft
                        } catch (e) {
                            avalue = 0
                        }
                        style.left = sLeft;
                        runtimeStyle.left = rsLeft
                    }
                    return avalue
                }
            }
            var px = d._toPixelValue;
            var astr = "DXImageTransform.Microsoft.Alpha";
            var af = function(n, f) {
                try {
                    return n.filters.item(astr)
                } catch (e) {
                    return f ? {} : null
                }
            };
            dojo._getOpacity = d.isIE ? function(node) {
                try {
                    return af(node).Opacity / 100
                } catch (e) {
                    return 1
                }
            } : function(node) {
                return gcs(node).opacity
            };
            dojo._setOpacity = d.isIE ? function(node, opacity) {
                var ov = opacity * 100,
                    opaque = opacity == 1;
                node.style.zoom = opaque ? "" : 1;
                if (!af(node)) {
                    if (opaque) {
                        return opacity
                    }
                    node.style.filter += " progid:" + astr + "(Opacity=" + ov + ")"
                } else {
                    af(node, 1).Opacity = ov
                }
                af(node, 1).Enabled = !opaque;
                if (node.nodeName.toLowerCase() == "tr") {
                    d.query("> td", node).forEach(function(i) {
                        d._setOpacity(i, opacity)
                    })
                }
                return opacity
            } : function(node, opacity) {
                return node.style.opacity = opacity
            };
            var _pixelNamesCache = {
                left: true,
                top: true
            };
            var _pixelRegExp = /margin|padding|width|height|max|min|offset/;
            var _toStyleValue = function(node, type, value) {
                type = type.toLowerCase();
                if (d.isIE) {
                    if (value == "auto") {
                        if (type == "height") {
                            return node.offsetHeight
                        }
                        if (type == "width") {
                            return node.offsetWidth
                        }
                    }
                    if (type == "fontweight") {
                        switch (value) {
                            case 700:
                                return "bold";
                            case 400:
                            default:
                                return "normal"
                        }
                    }
                }
                if (!(type in _pixelNamesCache)) {
                    _pixelNamesCache[type] = _pixelRegExp.test(type)
                }
                return _pixelNamesCache[type] ? px(node, value) : value
            };
            var _floatStyle = d.isIE ? "styleFloat" : "cssFloat",
                _floatAliases = {
                    cssFloat: _floatStyle,
                    styleFloat: _floatStyle,
                    "float": _floatStyle
                };
            dojo.style = function(node, style, value) {
                var n = byId(node),
                    args = arguments.length,
                    op = (style == "opacity");
                style = _floatAliases[style] || style;
                if (args == 3) {
                    return op ? d._setOpacity(n, value) : n.style[style] = value
                }
                if (args == 2 && op) {
                    return d._getOpacity(n)
                }
                var s = gcs(n);
                if (args == 2 && typeof style != "string") {
                    for (var x in style) {
                        d.style(node, x, style[x])
                    }
                    return s
                }
                return (args == 1) ? s : _toStyleValue(n, style, s[style] || n.style[style])
            };
            dojo._getPadExtents = function(n, computedStyle) {
                var s = computedStyle || gcs(n),
                    l = px(n, s.paddingLeft),
                    t = px(n, s.paddingTop);
                return {
                    l: l,
                    t: t,
                    w: l + px(n, s.paddingRight),
                    h: t + px(n, s.paddingBottom)
                }
            };
            dojo._getBorderExtents = function(n, computedStyle) {
                var ne = "none",
                    s = computedStyle || gcs(n),
                    bl = (s.borderLeftStyle != ne ? px(n, s.borderLeftWidth) : 0),
                    bt = (s.borderTopStyle != ne ? px(n, s.borderTopWidth) : 0);
                return {
                    l: bl,
                    t: bt,
                    w: bl + (s.borderRightStyle != ne ? px(n, s.borderRightWidth) : 0),
                    h: bt + (s.borderBottomStyle != ne ? px(n, s.borderBottomWidth) : 0)
                }
            };
            dojo._getPadBorderExtents = function(n, computedStyle) {
                var s = computedStyle || gcs(n),
                    p = d._getPadExtents(n, s),
                    b = d._getBorderExtents(n, s);
                return {
                    l: p.l + b.l,
                    t: p.t + b.t,
                    w: p.w + b.w,
                    h: p.h + b.h
                }
            };
            dojo._getMarginExtents = function(n, computedStyle) {
                var s = computedStyle || gcs(n),
                    l = px(n, s.marginLeft),
                    t = px(n, s.marginTop),
                    r = px(n, s.marginRight),
                    b = px(n, s.marginBottom);
                if (d.isWebKit && (s.position != "absolute")) {
                    r = l
                }
                return {
                    l: l,
                    t: t,
                    w: l + r,
                    h: t + b
                }
            };
            dojo._getMarginBox = function(node, computedStyle) {
                var s = computedStyle || gcs(node),
                    me = d._getMarginExtents(node, s);
                var l = node.offsetLeft - me.l,
                    t = node.offsetTop - me.t,
                    p = node.parentNode;
                if (d.isMoz) {
                    var sl = parseFloat(s.left),
                        st = parseFloat(s.top);
                    if (!isNaN(sl) && !isNaN(st)) {
                        l = sl, t = st
                    } else {
                        if (p && p.style) {
                            var pcs = gcs(p);
                            if (pcs.overflow != "visible") {
                                var be = d._getBorderExtents(p, pcs);
                                l += be.l, t += be.t
                            }
                        }
                    }
                } else {
                    if (d.isOpera || (d.isIE > 7 && !d.isQuirks)) {
                        if (p) {
                            be = d._getBorderExtents(p);
                            l -= be.l;
                            t -= be.t
                        }
                    }
                }
                return {
                    l: l,
                    t: t,
                    w: node.offsetWidth + me.w,
                    h: node.offsetHeight + me.h
                }
            };
            dojo._getContentBox = function(node, computedStyle) {
                var s = computedStyle || gcs(node),
                    pe = d._getPadExtents(node, s),
                    be = d._getBorderExtents(node, s),
                    w = node.clientWidth,
                    h;
                if (!w) {
                    w = node.offsetWidth, h = node.offsetHeight
                } else {
                    h = node.clientHeight, be.w = be.h = 0
                } if (d.isOpera) {
                    pe.l += be.l;
                    pe.t += be.t
                }
                return {
                    l: pe.l,
                    t: pe.t,
                    w: w - pe.w - be.w,
                    h: h - pe.h - be.h
                }
            };
            dojo._getBorderBox = function(node, computedStyle) {
                var s = computedStyle || gcs(node),
                    pe = d._getPadExtents(node, s),
                    cb = d._getContentBox(node, s);
                return {
                    l: cb.l - pe.l,
                    t: cb.t - pe.t,
                    w: cb.w + pe.w,
                    h: cb.h + pe.h
                }
            };
            dojo._setBox = function(node, l, t, w, h, u) {
                u = u || "px";
                var s = node.style;
                if (!isNaN(l)) {
                    s.left = l + u
                }
                if (!isNaN(t)) {
                    s.top = t + u
                }
                if (w >= 0) {
                    s.width = w + u
                }
                if (h >= 0) {
                    s.height = h + u
                }
            };
            dojo._isButtonTag = function(node) {
                return node.tagName == "BUTTON" || node.tagName == "INPUT" && (node.getAttribute("type") || "").toUpperCase() == "BUTTON"
            };
            dojo._usesBorderBox = function(node) {
                var n = node.tagName;
                return d.boxModel == "border-box" || n == "TABLE" || d._isButtonTag(node)
            };
            dojo._setContentSize = function(node, widthPx, heightPx, computedStyle) {
                if (d._usesBorderBox(node)) {
                    var pb = d._getPadBorderExtents(node, computedStyle);
                    if (widthPx >= 0) {
                        widthPx += pb.w
                    }
                    if (heightPx >= 0) {
                        heightPx += pb.h
                    }
                }
                d._setBox(node, NaN, NaN, widthPx, heightPx)
            };
            dojo._setMarginBox = function(node, leftPx, topPx, widthPx, heightPx, computedStyle) {
                var s = computedStyle || gcs(node),
                    bb = d._usesBorderBox(node),
                    pb = bb ? _nilExtents : d._getPadBorderExtents(node, s);
                if (d.isWebKit) {
                    if (d._isButtonTag(node)) {
                        var ns = node.style;
                        if (widthPx >= 0 && !ns.width) {
                            ns.width = "4px"
                        }
                        if (heightPx >= 0 && !ns.height) {
                            ns.height = "4px"
                        }
                    }
                }
                var mb = d._getMarginExtents(node, s);
                if (widthPx >= 0) {
                    widthPx = Math.max(widthPx - pb.w - mb.w, 0)
                }
                if (heightPx >= 0) {
                    heightPx = Math.max(heightPx - pb.h - mb.h, 0)
                }
                d._setBox(node, leftPx, topPx, widthPx, heightPx)
            };
            var _nilExtents = {
                l: 0,
                t: 0,
                w: 0,
                h: 0
            };
            dojo.marginBox = function(node, box) {
                var n = byId(node),
                    s = gcs(n),
                    b = box;
                return !b ? d._getMarginBox(n, s) : d._setMarginBox(n, b.l, b.t, b.w, b.h, s)
            };
            dojo.contentBox = function(node, box) {
                var n = byId(node),
                    s = gcs(n),
                    b = box;
                return !b ? d._getContentBox(n, s) : d._setContentSize(n, b.w, b.h, s)
            };
            var _sumAncestorProperties = function(node, prop) {
                if (!(node = (node || 0).parentNode)) {
                    return 0
                }
                var val, retVal = 0,
                    _b = d.body();
                while (node && node.style) {
                    if (gcs(node).position == "fixed") {
                        return 0
                    }
                    val = node[prop];
                    if (val) {
                        retVal += val - 0;
                        if (node == _b) {
                            break
                        }
                    }
                    node = node.parentNode
                }
                return retVal
            };
            dojo._docScroll = function() {
                var n = d.global;
                return "pageXOffset" in n ? {
                    x: n.pageXOffset,
                    y: n.pageYOffset
                } : (n = d.doc.documentElement, n.clientHeight ? {
                    x: d._fixIeBiDiScrollLeft(n.scrollLeft),
                    y: n.scrollTop
                } : (n = d.body(), {
                    x: n.scrollLeft || 0,
                    y: n.scrollTop || 0
                }))
            };
            dojo._isBodyLtr = function() {
                return "_bodyLtr" in d ? d._bodyLtr : d._bodyLtr = (d.body().dir || d.doc.documentElement.dir || "ltr").toLowerCase() == "ltr"
            };
            dojo._getIeDocumentElementOffset = function() {
                var de = d.doc.documentElement;
                if (d.isIE < 8) {
                    var r = de.getBoundingClientRect();
                    var l = r.left,
                        t = r.top;
                    if (d.isIE < 7) {
                        l += de.clientLeft;
                        t += de.clientTop
                    }
                    return {
                        x: l < 0 ? 0 : l,
                        y: t < 0 ? 0 : t
                    }
                } else {
                    return {
                        x: 0,
                        y: 0
                    }
                }
            };
            dojo._fixIeBiDiScrollLeft = function(scrollLeft) {
                var dd = d.doc;
                if (d.isIE < 8 && !d._isBodyLtr()) {
                    var de = d.isQuirks ? dd.body : dd.documentElement;
                    return scrollLeft + de.clientWidth - de.scrollWidth
                }
                return scrollLeft
            };
            dojo._abs = dojo.position = function(node, includeScroll) {
                var db = d.body(),
                    dh = db.parentNode,
                    ret;
                node = byId(node);
                if (node.getBoundingClientRect) {
                    ret = node.getBoundingClientRect();
                    ret = {
                        x: ret.left,
                        y: ret.top,
                        w: ret.right - ret.left,
                        h: ret.bottom - ret.top
                    };
                    if (d.isIE) {
                        var offset = d._getIeDocumentElementOffset();
                        ret.x -= offset.x + (d.isQuirks ? db.clientLeft + db.offsetLeft : 0);
                        ret.y -= offset.y + (d.isQuirks ? db.clientTop + db.offsetTop : 0)
                    } else {
                        if (d.isFF == 3) {
                            var cs = gcs(dh);
                            ret.x -= px(dh, cs.marginLeft) + px(dh, cs.borderLeftWidth);
                            ret.y -= px(dh, cs.marginTop) + px(dh, cs.borderTopWidth)
                        }
                    }
                } else {
                    ret = {
                        x: 0,
                        y: 0,
                        w: node.offsetWidth,
                        h: node.offsetHeight
                    };
                    if (node.offsetParent) {
                        ret.x -= _sumAncestorProperties(node, "scrollLeft");
                        ret.y -= _sumAncestorProperties(node, "scrollTop");
                        var curnode = node;
                        do {
                            var n = curnode.offsetLeft,
                                t = curnode.offsetTop;
                            ret.x += isNaN(n) ? 0 : n;
                            ret.y += isNaN(t) ? 0 : t;
                            cs = gcs(curnode);
                            if (curnode != node) {
                                if (d.isMoz) {
                                    ret.x += 2 * px(curnode, cs.borderLeftWidth);
                                    ret.y += 2 * px(curnode, cs.borderTopWidth)
                                } else {
                                    ret.x += px(curnode, cs.borderLeftWidth);
                                    ret.y += px(curnode, cs.borderTopWidth)
                                }
                            }
                            if (d.isMoz && cs.position == "static") {
                                var parent = curnode.parentNode;
                                while (parent != curnode.offsetParent) {
                                    var pcs = gcs(parent);
                                    if (pcs.position == "static") {
                                        ret.x += px(curnode, pcs.borderLeftWidth);
                                        ret.y += px(curnode, pcs.borderTopWidth)
                                    }
                                    parent = parent.parentNode
                                }
                            }
                            curnode = curnode.offsetParent
                        } while ((curnode != dh) && curnode)
                    } else {
                        if (node.x && node.y) {
                            ret.x += isNaN(node.x) ? 0 : node.x;
                            ret.y += isNaN(node.y) ? 0 : node.y
                        }
                    }
                } if (includeScroll) {
                    var scroll = d._docScroll();
                    ret.x += scroll.x;
                    ret.y += scroll.y
                }
                return ret
            };
            dojo.coords = function(node, includeScroll) {
                var n = byId(node),
                    s = gcs(n),
                    mb = d._getMarginBox(n, s);
                var abs = d.position(n, includeScroll);
                mb.x = abs.x;
                mb.y = abs.y;
                return mb
            };
            var _propNames = {
                    "class": "className",
                    "for": "htmlFor",
                    tabindex: "tabIndex",
                    readonly: "readOnly",
                    colspan: "colSpan",
                    frameborder: "frameBorder",
                    rowspan: "rowSpan",
                    valuetype: "valueType"
                },
                _attrNames = {
                    classname: "class",
                    htmlfor: "for",
                    tabindex: "tabIndex",
                    readonly: "readOnly"
                },
                _forcePropNames = {
                    innerHTML: 1,
                    className: 1,
                    htmlFor: d.isIE,
                    value: 1
                };
            var _fixAttrName = function(name) {
                return _attrNames[name.toLowerCase()] || name
            };
            var _hasAttr = function(node, name) {
                var attr = node.getAttributeNode && node.getAttributeNode(name);
                return attr && attr.specified
            };
            dojo.hasAttr = function(node, name) {
                var lc = name.toLowerCase();
                return _forcePropNames[_propNames[lc] || name] || _hasAttr(byId(node), _attrNames[lc] || name)
            };
            var _evtHdlrMap = {},
                _ctr = 0,
                _attrId = dojo._scopeName + "attrid",
                _roInnerHtml = {
                    col: 1,
                    colgroup: 1,
                    table: 1,
                    tbody: 1,
                    tfoot: 1,
                    thead: 1,
                    tr: 1,
                    title: 1
                };
            dojo.attr = function(node, name, value) {
                node = byId(node);
                var args = arguments.length,
                    prop;
                if (args == 2 && typeof name != "string") {
                    for (var x in name) {
                        d.attr(node, x, name[x])
                    }
                    return node
                }
                var lc = name.toLowerCase(),
                    propName = _propNames[lc] || name,
                    forceProp = _forcePropNames[propName],
                    attrName = _attrNames[lc] || name;
                if (args == 3) {
                    do {
                        if (propName == "style" && typeof value != "string") {
                            d.style(node, value);
                            break
                        }
                        if (propName == "innerHTML") {
                            if (d.isIE && node.tagName.toLowerCase() in _roInnerHtml) {
                                d.empty(node);
                                node.appendChild(d._toDom(value, node.ownerDocument))
                            } else {
                                node[propName] = value
                            }
                            break
                        }
                        if (d.isFunction(value)) {
                            var attrId = d.attr(node, _attrId);
                            if (!attrId) {
                                attrId = _ctr++;
                                d.attr(node, _attrId, attrId)
                            }
                            if (!_evtHdlrMap[attrId]) {
                                _evtHdlrMap[attrId] = {}
                            }
                            var h = _evtHdlrMap[attrId][propName];
                            if (h) {
                                d.disconnect(h)
                            } else {
                                try {
                                    delete node[propName]
                                } catch (e) {}
                            }
                            _evtHdlrMap[attrId][propName] = d.connect(node, propName, value);
                            break
                        }
                        if (forceProp || typeof value == "boolean") {
                            node[propName] = value;
                            break
                        }
                        node.setAttribute(attrName, value)
                    } while (false);
                    return node
                }
                value = node[propName];
                if (forceProp && typeof value != "undefined") {
                    return value
                }
                if (propName != "href" && (typeof value == "boolean" || d.isFunction(value))) {
                    return value
                }
                return _hasAttr(node, attrName) ? node.getAttribute(attrName) : null
            };
            dojo.removeAttr = function(node, name) {
                byId(node).removeAttribute(_fixAttrName(name))
            };
            dojo.getNodeProp = function(node, name) {
                node = byId(node);
                var lc = name.toLowerCase(),
                    propName = _propNames[lc] || name;
                if ((propName in node) && propName != "href") {
                    return node[propName]
                }
                var attrName = _attrNames[lc] || name;
                return _hasAttr(node, attrName) ? node.getAttribute(attrName) : null
            };
            dojo.create = function(tag, attrs, refNode, pos) {
                var doc = d.doc;
                if (refNode) {
                    refNode = byId(refNode);
                    doc = refNode.ownerDocument
                }
                if (typeof tag == "string") {
                    tag = doc.createElement(tag)
                }
                if (attrs) {
                    d.attr(tag, attrs)
                }
                if (refNode) {
                    d.place(tag, refNode, pos)
                }
                return tag
            };
            d.empty = d.isIE ? function(node) {
                node = byId(node);
                for (var c; c = node.lastChild;) {
                    d.destroy(c)
                }
            } : function(node) {
                byId(node).innerHTML = ""
            };
            var tagWrap = {
                    option: ["select"],
                    tbody: ["table"],
                    thead: ["table"],
                    tfoot: ["table"],
                    tr: ["table", "tbody"],
                    td: ["table", "tbody", "tr"],
                    th: ["table", "thead", "tr"],
                    legend: ["fieldset"],
                    caption: ["table"],
                    colgroup: ["table"],
                    col: ["table", "colgroup"],
                    li: ["ul"]
                },
                reTag = /<\s*([\w\:]+)/,
                masterNode = {},
                masterNum = 0,
                masterName = "__" + d._scopeName + "ToDomId";
            for (var param in tagWrap) {
                var tw = tagWrap[param];
                tw.pre = param == "option" ? '<select multiple="multiple">' : "<" + tw.join("><") + ">";
                tw.post = "</" + tw.reverse().join("></") + ">"
            }
            d._toDom = function(frag, doc) {
                doc = doc || d.doc;
                var masterId = doc[masterName];
                if (!masterId) {
                    doc[masterName] = masterId = ++masterNum + "";
                    masterNode[masterId] = doc.createElement("div")
                }
                frag += "";
                var match = frag.match(reTag),
                    tag = match ? match[1].toLowerCase() : "",
                    master = masterNode[masterId],
                    wrap, i, fc, df;
                if (match && tagWrap[tag]) {
                    wrap = tagWrap[tag];
                    master.innerHTML = wrap.pre + frag + wrap.post;
                    for (i = wrap.length; i; --i) {
                        master = master.firstChild
                    }
                } else {
                    master.innerHTML = frag
                } if (master.childNodes.length == 1) {
                    return master.removeChild(master.firstChild)
                }
                df = doc.createDocumentFragment();
                while (fc = master.firstChild) {
                    df.appendChild(fc)
                }
                return df
            };
            var _className = "className";
            dojo.hasClass = function(node, classStr) {
                return ((" " + byId(node)[_className] + " ").indexOf(" " + classStr + " ") >= 0)
            };
            var spaces = /\s+/,
                a1 = [""],
                str2array = function(s) {
                    if (typeof s == "string" || s instanceof String) {
                        if (s.indexOf(" ") < 0) {
                            a1[0] = s;
                            return a1
                        } else {
                            return s.split(spaces)
                        }
                    }
                    return s || ""
                };
            dojo.addClass = function(node, classStr) {
                node = byId(node);
                classStr = str2array(classStr);
                var cls = node[_className],
                    oldLen;
                cls = cls ? " " + cls + " " : " ";
                oldLen = cls.length;
                for (var i = 0, len = classStr.length, c; i < len; ++i) {
                    c = classStr[i];
                    if (c && cls.indexOf(" " + c + " ") < 0) {
                        cls += c + " "
                    }
                }
                if (oldLen < cls.length) {
                    node[_className] = cls.substr(1, cls.length - 2)
                }
            };
            dojo.removeClass = function(node, classStr) {
                node = byId(node);
                var cls;
                if (classStr !== undefined) {
                    classStr = str2array(classStr);
                    cls = " " + node[_className] + " ";
                    for (var i = 0, len = classStr.length; i < len; ++i) {
                        cls = cls.replace(" " + classStr[i] + " ", " ")
                    }
                    cls = d.trim(cls)
                } else {
                    cls = ""
                } if (node[_className] != cls) {
                    node[_className] = cls
                }
            };
            dojo.toggleClass = function(node, classStr, condition) {
                if (condition === undefined) {
                    condition = !d.hasClass(node, classStr)
                }
                d[condition ? "addClass" : "removeClass"](node, classStr)
            }
        })()
    }
    if (!dojo._hasResource["dojo._base.NodeList"]) {
        dojo._hasResource["dojo._base.NodeList"] = true;
        dojo.provide("dojo._base.NodeList");
        (function() {
            var d = dojo;
            var ap = Array.prototype,
                aps = ap.slice,
                apc = ap.concat;
            var tnl = function(a, parent, NodeListCtor) {
                if (!a.sort) {
                    a = aps.call(a, 0)
                }
                var ctor = NodeListCtor || this._NodeListCtor || d._NodeListCtor;
                a.constructor = ctor;
                dojo._mixin(a, ctor.prototype);
                a._NodeListCtor = ctor;
                return parent ? a._stash(parent) : a
            };
            var loopBody = function(f, a, o) {
                a = [0].concat(aps.call(a, 0));
                o = o || d.global;
                return function(node) {
                    a[0] = node;
                    return f.apply(o, a)
                }
            };
            var adaptAsForEach = function(f, o) {
                return function() {
                    this.forEach(loopBody(f, arguments, o));
                    return this
                }
            };
            var adaptAsMap = function(f, o) {
                return function() {
                    return this.map(loopBody(f, arguments, o))
                }
            };
            var adaptAsFilter = function(f, o) {
                return function() {
                    return this.filter(loopBody(f, arguments, o))
                }
            };
            var adaptWithCondition = function(f, g, o) {
                return function() {
                    var a = arguments,
                        body = loopBody(f, a, o);
                    if (g.call(o || d.global, a)) {
                        return this.map(body)
                    }
                    this.forEach(body);
                    return this
                }
            };
            var magicGuard = function(a) {
                return a.length == 1 && (typeof a[0] == "string")
            };
            var orphan = function(node) {
                var p = node.parentNode;
                if (p) {
                    p.removeChild(node)
                }
            };
            dojo.NodeList = function() {
                return tnl(Array.apply(null, arguments))
            };
            d._NodeListCtor = d.NodeList;
            var nl = d.NodeList,
                nlp = nl.prototype;
            nl._wrap = nlp._wrap = tnl;
            nl._adaptAsMap = adaptAsMap;
            nl._adaptAsForEach = adaptAsForEach;
            nl._adaptAsFilter = adaptAsFilter;
            nl._adaptWithCondition = adaptWithCondition;
            d.forEach(["slice", "splice"], function(name) {
                var f = ap[name];
                nlp[name] = function() {
                    return this._wrap(f.apply(this, arguments), name == "slice" ? this : null)
                }
            });
            d.forEach(["indexOf", "lastIndexOf", "every", "some"], function(name) {
                var f = d[name];
                nlp[name] = function() {
                    return f.apply(d, [this].concat(aps.call(arguments, 0)))
                }
            });
            d.forEach(["attr", "style"], function(name) {
                nlp[name] = adaptWithCondition(d[name], magicGuard)
            });
            d.forEach(["connect", "addClass", "removeClass", "toggleClass", "empty", "removeAttr"], function(name) {
                nlp[name] = adaptAsForEach(d[name])
            });
            dojo.extend(dojo.NodeList, {
                _normalize: function(content, refNode) {
                    var parse = content.parse === true ? true : false;
                    if (typeof content.template == "string") {
                        var templateFunc = content.templateFunc || (dojo.string && dojo.string.substitute);
                        content = templateFunc ? templateFunc(content.template, content) : content
                    }
                    var type = (typeof content);
                    if (type == "string" || type == "number") {
                        content = dojo._toDom(content, (refNode && refNode.ownerDocument));
                        if (content.nodeType == 11) {
                            content = dojo._toArray(content.childNodes)
                        } else {
                            content = [content]
                        }
                    } else {
                        if (!dojo.isArrayLike(content)) {
                            content = [content]
                        } else {
                            if (!dojo.isArray(content)) {
                                content = dojo._toArray(content)
                            }
                        }
                    } if (parse) {
                        content._runParse = true
                    }
                    return content
                },
                _cloneNode: function(node) {
                    return node.cloneNode(true)
                },
                _place: function(ary, refNode, position, useClone) {
                    if (refNode.nodeType != 1 && position == "only") {
                        return
                    }
                    var rNode = refNode,
                        tempNode;
                    var length = ary.length;
                    for (var i = length - 1; i >= 0; i--) {
                        var node = (useClone ? this._cloneNode(ary[i]) : ary[i]);
                        if (ary._runParse && dojo.parser && dojo.parser.parse) {
                            if (!tempNode) {
                                tempNode = rNode.ownerDocument.createElement("div")
                            }
                            tempNode.appendChild(node);
                            dojo.parser.parse(tempNode);
                            node = tempNode.firstChild;
                            while (tempNode.firstChild) {
                                tempNode.removeChild(tempNode.firstChild)
                            }
                        }
                        if (i == length - 1) {
                            dojo.place(node, rNode, position)
                        } else {
                            rNode.parentNode.insertBefore(node, rNode)
                        }
                        rNode = node
                    }
                },
                _stash: function(parent) {
                    this._parent = parent;
                    return this
                },
                end: function() {
                    if (this._parent) {
                        return this._parent
                    } else {
                        return new this._NodeListCtor()
                    }
                },
                concat: function(item) {
                    var t = d.isArray(this) ? this : aps.call(this, 0),
                        m = d.map(arguments, function(a) {
                            return a && !d.isArray(a) && (typeof NodeList != "undefined" && a.constructor === NodeList || a.constructor === this._NodeListCtor) ? aps.call(a, 0) : a
                        });
                    return this._wrap(apc.apply(t, m), this)
                },
                map: function(func, obj) {
                    return this._wrap(d.map(this, func, obj), this)
                },
                forEach: function(callback, thisObj) {
                    d.forEach(this, callback, thisObj);
                    return this
                },
                coords: adaptAsMap(d.coords),
                position: adaptAsMap(d.position),
                place: function(queryOrNode, position) {
                    var item = d.query(queryOrNode)[0];
                    return this.forEach(function(node) {
                        d.place(node, item, position)
                    })
                },
                orphan: function(simpleFilter) {
                    return (simpleFilter ? d._filterQueryResult(this, simpleFilter) : this).forEach(orphan)
                },
                adopt: function(queryOrListOrNode, position) {
                    return d.query(queryOrListOrNode).place(this[0], position)._stash(this)
                },
                query: function(queryStr) {
                    if (!queryStr) {
                        return this
                    }
                    var ret = this.map(function(node) {
                        return d.query(queryStr, node).filter(function(subNode) {
                            return subNode !== undefined
                        })
                    });
                    return this._wrap(apc.apply([], ret), this)
                },
                filter: function(simpleFilter) {
                    var a = arguments,
                        items = this,
                        start = 0;
                    if (typeof simpleFilter == "string") {
                        items = d._filterQueryResult(this, a[0]);
                        if (a.length == 1) {
                            return items._stash(this)
                        }
                        start = 1
                    }
                    return this._wrap(d.filter(items, a[start], a[start + 1]), this)
                },
                addContent: function(content, position) {
                    content = this._normalize(content, this[0]);
                    for (var i = 0, node; node = this[i]; i++) {
                        this._place(content, node, position, i > 0)
                    }
                    return this
                },
                instantiate: function(declaredClass, properties) {
                    var c = d.isFunction(declaredClass) ? declaredClass : d.getObject(declaredClass);
                    properties = properties || {};
                    return this.forEach(function(node) {
                        new c(properties, node)
                    })
                },
                at: function() {
                    var t = new this._NodeListCtor();
                    d.forEach(arguments, function(i) {
                        if (i < 0) {
                            i = this.length + i
                        }
                        if (this[i]) {
                            t.push(this[i])
                        }
                    }, this);
                    return t._stash(this)
                }
            });
            nl.events = ["blur", "focus", "change", "click", "error", "keydown", "keypress", "keyup", "load", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "submit"];
            d.forEach(nl.events, function(evt) {
                var _oe = "on" + evt;
                nlp[_oe] = function(a, b) {
                    return this.connect(_oe, a, b)
                }
            })
        })()
    }
    if (!dojo._hasResource["dojo._base.query"]) {
        dojo._hasResource["dojo._base.query"] = true;
        if (typeof dojo != "undefined") {
            dojo.provide("dojo._base.query")
        }(function(d) {
            var trim = d.trim;
            var each = d.forEach;
            var qlc = d._NodeListCtor = d.NodeList;
            var getDoc = function() {
                return d.doc
            };
            var cssCaseBug = ((d.isWebKit || d.isMozilla) && ((getDoc().compatMode) == "BackCompat"));
            var childNodesName = !!getDoc().firstChild.children ? "children" : "childNodes";
            var specials = ">~+";
            var caseSensitive = false;
            var yesman = function() {
                return true
            };
            var getQueryParts = function(query) {
                if (specials.indexOf(query.slice(-1)) >= 0) {
                    query += " * "
                } else {
                    query += " "
                }
                var ts = function(s, e) {
                    return trim(query.slice(s, e))
                };
                var queryParts = [];
                var inBrackets = -1,
                    inParens = -1,
                    inMatchFor = -1,
                    inPseudo = -1,
                    inClass = -1,
                    inId = -1,
                    inTag = -1,
                    lc = "",
                    cc = "",
                    pStart;
                var x = 0,
                    ql = query.length,
                    currentPart = null,
                    _cp = null;
                var endTag = function() {
                    if (inTag >= 0) {
                        var tv = (inTag == x) ? null : ts(inTag, x);
                        currentPart[(specials.indexOf(tv) < 0) ? "tag" : "oper"] = tv;
                        inTag = -1
                    }
                };
                var endId = function() {
                    if (inId >= 0) {
                        currentPart.id = ts(inId, x).replace(/\\/g, "");
                        inId = -1
                    }
                };
                var endClass = function() {
                    if (inClass >= 0) {
                        currentPart.classes.push(ts(inClass + 1, x).replace(/\\/g, ""));
                        inClass = -1
                    }
                };
                var endAll = function() {
                    endId();
                    endTag();
                    endClass()
                };
                var endPart = function() {
                    endAll();
                    if (inPseudo >= 0) {
                        currentPart.pseudos.push({
                            name: ts(inPseudo + 1, x)
                        })
                    }
                    currentPart.loops = (currentPart.pseudos.length || currentPart.attrs.length || currentPart.classes.length);
                    currentPart.oquery = currentPart.query = ts(pStart, x);
                    currentPart.otag = currentPart.tag = (currentPart.oper) ? null : (currentPart.tag || "*");
                    if (currentPart.tag) {
                        currentPart.tag = currentPart.tag.toUpperCase()
                    }
                    if (queryParts.length && (queryParts[queryParts.length - 1].oper)) {
                        currentPart.infixOper = queryParts.pop();
                        currentPart.query = currentPart.infixOper.query + " " + currentPart.query
                    }
                    queryParts.push(currentPart);
                    currentPart = null
                };
                for (; lc = cc, cc = query.charAt(x), x < ql; x++) {
                    if (lc == "\\") {
                        continue
                    }
                    if (!currentPart) {
                        pStart = x;
                        currentPart = {
                            query: null,
                            pseudos: [],
                            attrs: [],
                            classes: [],
                            tag: null,
                            oper: null,
                            id: null,
                            getTag: function() {
                                return (caseSensitive) ? this.otag : this.tag
                            }
                        };
                        inTag = x
                    }
                    if (inBrackets >= 0) {
                        if (cc == "]") {
                            if (!_cp.attr) {
                                _cp.attr = ts(inBrackets + 1, x)
                            } else {
                                _cp.matchFor = ts((inMatchFor || inBrackets + 1), x)
                            }
                            var cmf = _cp.matchFor;
                            if (cmf) {
                                if ((cmf.charAt(0) == '"') || (cmf.charAt(0) == "'")) {
                                    _cp.matchFor = cmf.slice(1, -1)
                                }
                            }
                            currentPart.attrs.push(_cp);
                            _cp = null;
                            inBrackets = inMatchFor = -1
                        } else {
                            if (cc == "=") {
                                var addToCc = ("|~^$*".indexOf(lc) >= 0) ? lc : "";
                                _cp.type = addToCc + cc;
                                _cp.attr = ts(inBrackets + 1, x - addToCc.length);
                                inMatchFor = x + 1
                            }
                        }
                    } else {
                        if (inParens >= 0) {
                            if (cc == ")") {
                                if (inPseudo >= 0) {
                                    _cp.value = ts(inParens + 1, x)
                                }
                                inPseudo = inParens = -1
                            }
                        } else {
                            if (cc == "#") {
                                endAll();
                                inId = x + 1
                            } else {
                                if (cc == ".") {
                                    endAll();
                                    inClass = x
                                } else {
                                    if (cc == ":") {
                                        endAll();
                                        inPseudo = x
                                    } else {
                                        if (cc == "[") {
                                            endAll();
                                            inBrackets = x;
                                            _cp = {}
                                        } else {
                                            if (cc == "(") {
                                                if (inPseudo >= 0) {
                                                    _cp = {
                                                        name: ts(inPseudo + 1, x),
                                                        value: null
                                                    };
                                                    currentPart.pseudos.push(_cp)
                                                }
                                                inParens = x
                                            } else {
                                                if ((cc == " ") && (lc != cc)) {
                                                    endPart()
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return queryParts
            };
            var agree = function(first, second) {
                if (!first) {
                    return second
                }
                if (!second) {
                    return first
                }
                return function() {
                    return first.apply(window, arguments) && second.apply(window, arguments)
                }
            };
            var getArr = function(i, arr) {
                var r = arr || [];
                if (i) {
                    r.push(i)
                }
                return r
            };
            var _isElement = function(n) {
                return (1 == n.nodeType)
            };
            var blank = "";
            var _getAttr = function(elem, attr) {
                if (!elem) {
                    return blank
                }
                if (attr == "class") {
                    return elem.className || blank
                }
                if (attr == "for") {
                    return elem.htmlFor || blank
                }
                if (attr == "style") {
                    return elem.style.cssText || blank
                }
                return (caseSensitive ? elem.getAttribute(attr) : elem.getAttribute(attr, 2)) || blank
            };
            var attrs = {
                "*=": function(attr, value) {
                    return function(elem) {
                        return (_getAttr(elem, attr).indexOf(value) >= 0)
                    }
                },
                "^=": function(attr, value) {
                    return function(elem) {
                        return (_getAttr(elem, attr).indexOf(value) == 0)
                    }
                },
                "$=": function(attr, value) {
                    var tval = " " + value;
                    return function(elem) {
                        var ea = " " + _getAttr(elem, attr);
                        return (ea.lastIndexOf(value) == (ea.length - value.length))
                    }
                },
                "~=": function(attr, value) {
                    var tval = " " + value + " ";
                    return function(elem) {
                        var ea = " " + _getAttr(elem, attr) + " ";
                        return (ea.indexOf(tval) >= 0)
                    }
                },
                "|=": function(attr, value) {
                    var valueDash = " " + value + "-";
                    return function(elem) {
                        var ea = " " + _getAttr(elem, attr);
                        return ((ea == value) || (ea.indexOf(valueDash) == 0))
                    }
                },
                "=": function(attr, value) {
                    return function(elem) {
                        return (_getAttr(elem, attr) == value)
                    }
                }
            };
            var _noNES = (typeof getDoc().firstChild.nextElementSibling == "undefined");
            var _ns = !_noNES ? "nextElementSibling" : "nextSibling";
            var _ps = !_noNES ? "previousElementSibling" : "previousSibling";
            var _simpleNodeTest = (_noNES ? _isElement : yesman);
            var _lookLeft = function(node) {
                while (node = node[_ps]) {
                    if (_simpleNodeTest(node)) {
                        return false
                    }
                }
                return true
            };
            var _lookRight = function(node) {
                while (node = node[_ns]) {
                    if (_simpleNodeTest(node)) {
                        return false
                    }
                }
                return true
            };
            var getNodeIndex = function(node) {
                var root = node.parentNode;
                var i = 0,
                    tret = root[childNodesName],
                    ci = (node._i || -1),
                    cl = (root._l || -1);
                if (!tret) {
                    return -1
                }
                var l = tret.length;
                if (cl == l && ci >= 0 && cl >= 0) {
                    return ci
                }
                root._l = l;
                ci = -1;
                for (var te = root.firstElementChild || root.firstChild; te; te = te[_ns]) {
                    if (_simpleNodeTest(te)) {
                        te._i = ++i;
                        if (node === te) {
                            ci = i
                        }
                    }
                }
                return ci
            };
            var isEven = function(elem) {
                return !((getNodeIndex(elem)) % 2)
            };
            var isOdd = function(elem) {
                return ((getNodeIndex(elem)) % 2)
            };
            var pseudos = {
                checked: function(name, condition) {
                    return function(elem) {
                        return !!("checked" in elem ? elem.checked : elem.selected)
                    }
                },
                "first-child": function() {
                    return _lookLeft
                },
                "last-child": function() {
                    return _lookRight
                },
                "only-child": function(name, condition) {
                    return function(node) {
                        if (!_lookLeft(node)) {
                            return false
                        }
                        if (!_lookRight(node)) {
                            return false
                        }
                        return true
                    }
                },
                empty: function(name, condition) {
                    return function(elem) {
                        var cn = elem.childNodes;
                        var cnl = elem.childNodes.length;
                        for (var x = cnl - 1; x >= 0; x--) {
                            var nt = cn[x].nodeType;
                            if ((nt === 1) || (nt == 3)) {
                                return false
                            }
                        }
                        return true
                    }
                },
                contains: function(name, condition) {
                    var cz = condition.charAt(0);
                    if (cz == '"' || cz == "'") {
                        condition = condition.slice(1, -1)
                    }
                    return function(elem) {
                        return (elem.innerHTML.indexOf(condition) >= 0)
                    }
                },
                not: function(name, condition) {
                    var p = getQueryParts(condition)[0];
                    var ignores = {
                        el: 1
                    };
                    if (p.tag != "*") {
                        ignores.tag = 1
                    }
                    if (!p.classes.length) {
                        ignores.classes = 1
                    }
                    var ntf = getSimpleFilterFunc(p, ignores);
                    return function(elem) {
                        return (!ntf(elem))
                    }
                },
                "nth-child": function(name, condition) {
                    var pi = parseInt;
                    if (condition == "odd") {
                        return isOdd
                    } else {
                        if (condition == "even") {
                            return isEven
                        }
                    } if (condition.indexOf("n") != -1) {
                        var tparts = condition.split("n", 2);
                        var pred = tparts[0] ? ((tparts[0] == "-") ? -1 : pi(tparts[0])) : 1;
                        var idx = tparts[1] ? pi(tparts[1]) : 0;
                        var lb = 0,
                            ub = -1;
                        if (pred > 0) {
                            if (idx < 0) {
                                idx = (idx % pred) && (pred + (idx % pred))
                            } else {
                                if (idx > 0) {
                                    if (idx >= pred) {
                                        lb = idx - idx % pred
                                    }
                                    idx = idx % pred
                                }
                            }
                        } else {
                            if (pred < 0) {
                                pred *= -1;
                                if (idx > 0) {
                                    ub = idx;
                                    idx = idx % pred
                                }
                            }
                        } if (pred > 0) {
                            return function(elem) {
                                var i = getNodeIndex(elem);
                                return (i >= lb) && (ub < 0 || i <= ub) && ((i % pred) == idx)
                            }
                        } else {
                            condition = idx
                        }
                    }
                    var ncount = pi(condition);
                    return function(elem) {
                        return (getNodeIndex(elem) == ncount)
                    }
                }
            };
            var defaultGetter = (d.isIE) ? function(cond) {
                var clc = cond.toLowerCase();
                if (clc == "class") {
                    cond = "className"
                }
                return function(elem) {
                    return (caseSensitive ? elem.getAttribute(cond) : elem[cond] || elem[clc])
                }
            } : function(cond) {
                return function(elem) {
                    return (elem && elem.getAttribute && elem.hasAttribute(cond))
                }
            };
            var getSimpleFilterFunc = function(query, ignores) {
                if (!query) {
                    return yesman
                }
                ignores = ignores || {};
                var ff = null;
                if (!("el" in ignores)) {
                    ff = agree(ff, _isElement)
                }
                if (!("tag" in ignores)) {
                    if (query.tag != "*") {
                        ff = agree(ff, function(elem) {
                            return (elem && (elem.tagName == query.getTag()))
                        })
                    }
                }
                if (!("classes" in ignores)) {
                    each(query.classes, function(cname, idx, arr) {
                        var re = new RegExp("(?:^|\\s)" + cname + "(?:\\s|$)");
                        ff = agree(ff, function(elem) {
                            return re.test(elem.className)
                        });
                        ff.count = idx
                    })
                }
                if (!("pseudos" in ignores)) {
                    each(query.pseudos, function(pseudo) {
                        var pn = pseudo.name;
                        if (pseudos[pn]) {
                            ff = agree(ff, pseudos[pn](pn, pseudo.value))
                        }
                    })
                }
                if (!("attrs" in ignores)) {
                    each(query.attrs, function(attr) {
                        var matcher;
                        var a = attr.attr;
                        if (attr.type && attrs[attr.type]) {
                            matcher = attrs[attr.type](a, attr.matchFor)
                        } else {
                            if (a.length) {
                                matcher = defaultGetter(a)
                            }
                        } if (matcher) {
                            ff = agree(ff, matcher)
                        }
                    })
                }
                if (!("id" in ignores)) {
                    if (query.id) {
                        ff = agree(ff, function(elem) {
                            return (!!elem && (elem.id == query.id))
                        })
                    }
                }
                if (!ff) {
                    if (!("default" in ignores)) {
                        ff = yesman
                    }
                }
                return ff
            };
            var _nextSibling = function(filterFunc) {
                return function(node, ret, bag) {
                    while (node = node[_ns]) {
                        if (_noNES && (!_isElement(node))) {
                            continue
                        }
                        if ((!bag || _isUnique(node, bag)) && filterFunc(node)) {
                            ret.push(node)
                        }
                        break
                    }
                    return ret
                }
            };
            var _nextSiblings = function(filterFunc) {
                return function(root, ret, bag) {
                    var te = root[_ns];
                    while (te) {
                        if (_simpleNodeTest(te)) {
                            if (bag && !_isUnique(te, bag)) {
                                break
                            }
                            if (filterFunc(te)) {
                                ret.push(te)
                            }
                        }
                        te = te[_ns]
                    }
                    return ret
                }
            };
            var _childElements = function(filterFunc) {
                filterFunc = filterFunc || yesman;
                return function(root, ret, bag) {
                    var te, x = 0,
                        tret = root[childNodesName];
                    while (te = tret[x++]) {
                        if (_simpleNodeTest(te) && (!bag || _isUnique(te, bag)) && (filterFunc(te, x))) {
                            ret.push(te)
                        }
                    }
                    return ret
                }
            };
            var _isDescendant = function(node, root) {
                var pn = node.parentNode;
                while (pn) {
                    if (pn == root) {
                        break
                    }
                    pn = pn.parentNode
                }
                return !!pn
            };
            var _getElementsFuncCache = {};
            var getElementsFunc = function(query) {
                var retFunc = _getElementsFuncCache[query.query];
                if (retFunc) {
                    return retFunc
                }
                var io = query.infixOper;
                var oper = (io ? io.oper : "");
                var filterFunc = getSimpleFilterFunc(query, {
                    el: 1
                });
                var qt = query.tag;
                var wildcardTag = ("*" == qt);
                var ecs = getDoc()["getElementsByClassName"];
                if (!oper) {
                    if (query.id) {
                        filterFunc = (!query.loops && wildcardTag) ? yesman : getSimpleFilterFunc(query, {
                            el: 1,
                            id: 1
                        });
                        retFunc = function(root, arr) {
                            var te = d.byId(query.id, (root.ownerDocument || root));
                            if (!te || !filterFunc(te)) {
                                return
                            }
                            if (9 == root.nodeType) {
                                return getArr(te, arr)
                            } else {
                                if (_isDescendant(te, root)) {
                                    return getArr(te, arr)
                                }
                            }
                        }
                    } else {
                        if (ecs && /\{\s*\[native code\]\s*\}/.test(String(ecs)) && query.classes.length && !cssCaseBug) {
                            filterFunc = getSimpleFilterFunc(query, {
                                el: 1,
                                classes: 1,
                                id: 1
                            });
                            var classesString = query.classes.join(" ");
                            retFunc = function(root, arr, bag) {
                                var ret = getArr(0, arr),
                                    te, x = 0;
                                var tret = root.getElementsByClassName(classesString);
                                while ((te = tret[x++])) {
                                    if (filterFunc(te, root) && _isUnique(te, bag)) {
                                        ret.push(te)
                                    }
                                }
                                return ret
                            }
                        } else {
                            if (!wildcardTag && !query.loops) {
                                retFunc = function(root, arr, bag) {
                                    var ret = getArr(0, arr),
                                        te, x = 0;
                                    var tret = root.getElementsByTagName(query.getTag());
                                    while ((te = tret[x++])) {
                                        if (_isUnique(te, bag)) {
                                            ret.push(te)
                                        }
                                    }
                                    return ret
                                }
                            } else {
                                filterFunc = getSimpleFilterFunc(query, {
                                    el: 1,
                                    tag: 1,
                                    id: 1
                                });
                                retFunc = function(root, arr, bag) {
                                    var ret = getArr(0, arr),
                                        te, x = 0;
                                    var tret = root.getElementsByTagName(query.getTag());
                                    while ((te = tret[x++])) {
                                        if (filterFunc(te, root) && _isUnique(te, bag)) {
                                            ret.push(te)
                                        }
                                    }
                                    return ret
                                }
                            }
                        }
                    }
                } else {
                    var skipFilters = {
                        el: 1
                    };
                    if (wildcardTag) {
                        skipFilters.tag = 1
                    }
                    filterFunc = getSimpleFilterFunc(query, skipFilters);
                    if ("+" == oper) {
                        retFunc = _nextSibling(filterFunc)
                    } else {
                        if ("~" == oper) {
                            retFunc = _nextSiblings(filterFunc)
                        } else {
                            if (">" == oper) {
                                retFunc = _childElements(filterFunc)
                            }
                        }
                    }
                }
                return _getElementsFuncCache[query.query] = retFunc
            };
            var filterDown = function(root, queryParts) {
                var candidates = getArr(root),
                    qp, x, te, qpl = queryParts.length,
                    bag, ret;
                for (var i = 0; i < qpl; i++) {
                    ret = [];
                    qp = queryParts[i];
                    x = candidates.length - 1;
                    if (x > 0) {
                        bag = {};
                        ret.nozip = true
                    }
                    var gef = getElementsFunc(qp);
                    for (var j = 0;
                        (te = candidates[j]); j++) {
                        gef(te, ret, bag)
                    }
                    if (!ret.length) {
                        break
                    }
                    candidates = ret
                }
                return ret
            };
            var _queryFuncCacheDOM = {},
                _queryFuncCacheQSA = {};
            var getStepQueryFunc = function(query) {
                var qparts = getQueryParts(trim(query));
                if (qparts.length == 1) {
                    var tef = getElementsFunc(qparts[0]);
                    return function(root) {
                        var r = tef(root, new qlc());
                        if (r) {
                            r.nozip = true
                        }
                        return r
                    }
                }
                return function(root) {
                    return filterDown(root, qparts)
                }
            };
            var nua = navigator.userAgent;
            var wk = "WebKit/";
            var is525 = (d.isWebKit && (nua.indexOf(wk) > 0) && (parseFloat(nua.split(wk)[1]) > 528));
            var noZip = d.isIE ? "commentStrip" : "nozip";
            var qsa = "querySelectorAll";
            var qsaAvail = (!!getDoc()[qsa] && (!d.isSafari || (d.isSafari > 3.1) || is525));
            var infixSpaceRe = /n\+\d|([^ ])?([>~+])([^ =])?/g;
            var infixSpaceFunc = function(match, pre, ch, post) {
                return ch ? (pre ? pre + " " : "") + ch + (post ? " " + post : "") : match
            };
            var getQueryFunc = function(query, forceDOM) {
                query = query.replace(infixSpaceRe, infixSpaceFunc);
                if (qsaAvail) {
                    var qsaCached = _queryFuncCacheQSA[query];
                    if (qsaCached && !forceDOM) {
                        return qsaCached
                    }
                }
                var domCached = _queryFuncCacheDOM[query];
                if (domCached) {
                    return domCached
                }
                var qcz = query.charAt(0);
                var nospace = (-1 == query.indexOf(" "));
                if ((query.indexOf("#") >= 0) && (nospace)) {
                    forceDOM = true
                }
                var useQSA = (qsaAvail && (!forceDOM) && (specials.indexOf(qcz) == -1) && (!d.isIE || (query.indexOf(":") == -1)) && (!(cssCaseBug && (query.indexOf(".") >= 0))) && (query.indexOf(":contains") == -1) && (query.indexOf(":checked") == -1) && (query.indexOf("|=") == -1));
                if (useQSA) {
                    var tq = (specials.indexOf(query.charAt(query.length - 1)) >= 0) ? (query + " *") : query;
                    return _queryFuncCacheQSA[query] = function(root) {
                        try {
                            if (!((9 == root.nodeType) || nospace)) {
                                throw ""
                            }
                            var r = root[qsa](tq);
                            r[noZip] = true;
                            return r
                        } catch (e) {
                            return getQueryFunc(query, true)(root)
                        }
                    }
                } else {
                    var parts = query.split(/\s*,\s*/);
                    return _queryFuncCacheDOM[query] = ((parts.length < 2) ? getStepQueryFunc(query) : function(root) {
                        var pindex = 0,
                            ret = [],
                            tp;
                        while ((tp = parts[pindex++])) {
                            ret = ret.concat(getStepQueryFunc(tp)(root))
                        }
                        return ret
                    })
                }
            };
            var _zipIdx = 0;
            var _nodeUID = d.isIE ? function(node) {
                if (caseSensitive) {
                    return (node.getAttribute("_uid") || node.setAttribute("_uid", ++_zipIdx) || _zipIdx)
                } else {
                    return node.uniqueID
                }
            } : function(node) {
                return (node._uid || (node._uid = ++_zipIdx))
            };
            var _isUnique = function(node, bag) {
                if (!bag) {
                    return 1
                }
                var id = _nodeUID(node);
                if (!bag[id]) {
                    return bag[id] = 1
                }
                return 0
            };
            var _zipIdxName = "_zipIdx";
            var _zip = function(arr) {
                if (arr && arr.nozip) {
                    return (qlc._wrap) ? qlc._wrap(arr) : arr
                }
                var ret = new qlc();
                if (!arr || !arr.length) {
                    return ret
                }
                if (arr[0]) {
                    ret.push(arr[0])
                }
                if (arr.length < 2) {
                    return ret
                }
                _zipIdx++;
                if (d.isIE && caseSensitive) {
                    var szidx = _zipIdx + "";
                    arr[0].setAttribute(_zipIdxName, szidx);
                    for (var x = 1, te; te = arr[x]; x++) {
                        if (arr[x].getAttribute(_zipIdxName) != szidx) {
                            ret.push(te)
                        }
                        te.setAttribute(_zipIdxName, szidx)
                    }
                } else {
                    if (d.isIE && arr.commentStrip) {
                        try {
                            for (var x = 1, te; te = arr[x]; x++) {
                                if (_isElement(te)) {
                                    ret.push(te)
                                }
                            }
                        } catch (e) {}
                    } else {
                        if (arr[0]) {
                            arr[0][_zipIdxName] = _zipIdx
                        }
                        for (var x = 1, te; te = arr[x]; x++) {
                            if (arr[x][_zipIdxName] != _zipIdx) {
                                ret.push(te)
                            }
                            te[_zipIdxName] = _zipIdx
                        }
                    }
                }
                return ret
            };
            d.query = function(query, root) {
                qlc = d._NodeListCtor;
                if (!query) {
                    return new qlc()
                }
                if (query.constructor == qlc) {
                    return query
                }
                if (typeof query != "string") {
                    return new qlc(query)
                }
                if (typeof root == "string") {
                    root = d.byId(root);
                    if (!root) {
                        return new qlc()
                    }
                }
                root = root || getDoc();
                var od = root.ownerDocument || root.documentElement;
                caseSensitive = (root.contentType && root.contentType == "application/xml") || (d.isOpera && (root.doctype || od.toString() == "[object XMLDocument]")) || (!!od) && (d.isIE ? od.xml : (root.xmlVersion || od.xmlVersion));
                var r = getQueryFunc(query)(root);
                if (r && r.nozip && !qlc._wrap) {
                    return r
                }
                return _zip(r)
            };
            d.query.pseudos = pseudos;
            d._filterQueryResult = function(nodeList, simpleFilter) {
                var tmpNodeList = new d._NodeListCtor();
                var filterFunc = getSimpleFilterFunc(getQueryParts(simpleFilter)[0]);
                for (var x = 0, te; te = nodeList[x]; x++) {
                    if (filterFunc(te)) {
                        tmpNodeList.push(te)
                    }
                }
                return tmpNodeList
            }
        })(this["queryPortability"] || this["acme"] || dojo)
    }
    if (!dojo._hasResource["dojo._base.xhr"]) {
        dojo._hasResource["dojo._base.xhr"] = true;
        dojo.provide("dojo._base.xhr");
        (function() {
            var _d = dojo,
                cfg = _d.config;

            function setValue(obj, name, value) {
                if (value === null) {
                    return
                }
                var val = obj[name];
                if (typeof val == "string") {
                    obj[name] = [val, value]
                } else {
                    if (_d.isArray(val)) {
                        val.push(value)
                    } else {
                        obj[name] = value
                    }
                }
            }
            dojo.fieldToObject = function(inputNode) {
                var ret = null;
                var item = _d.byId(inputNode);
                if (item) {
                    var _in = item.name;
                    var type = (item.type || "").toLowerCase();
                    if (_in && type && !item.disabled) {
                        if (type == "radio" || type == "checkbox") {
                            if (item.checked) {
                                ret = item.value
                            }
                        } else {
                            if (item.multiple) {
                                ret = [];
                                _d.query("option", item).forEach(function(opt) {
                                    if (opt.selected) {
                                        ret.push(opt.value)
                                    }
                                })
                            } else {
                                ret = item.value
                            }
                        }
                    }
                }
                return ret
            };
            dojo.formToObject = function(formNode) {
                var ret = {};
                var exclude = "file|submit|image|reset|button|";
                _d.forEach(dojo.byId(formNode).elements, function(item) {
                    var _in = item.name;
                    var type = (item.type || "").toLowerCase();
                    if (_in && type && exclude.indexOf(type) == -1 && !item.disabled) {
                        setValue(ret, _in, _d.fieldToObject(item));
                        if (type == "image") {
                            ret[_in + ".x"] = ret[_in + ".y"] = ret[_in].x = ret[_in].y = 0
                        }
                    }
                });
                return ret
            };
            dojo.objectToQuery = function(map) {
                var enc = encodeURIComponent;
                var pairs = [];
                var backstop = {};
                for (var name in map) {
                    var value = map[name];
                    if (value != backstop[name]) {
                        var assign = enc(name) + "=";
                        if (_d.isArray(value)) {
                            for (var i = 0; i < value.length; i++) {
                                pairs.push(assign + enc(value[i]))
                            }
                        } else {
                            pairs.push(assign + enc(value))
                        }
                    }
                }
                return pairs.join("&")
            };
            dojo.formToQuery = function(formNode) {
                return _d.objectToQuery(_d.formToObject(formNode))
            };
            dojo.formToJson = function(formNode, prettyPrint) {
                return _d.toJson(_d.formToObject(formNode), prettyPrint)
            };
            dojo.queryToObject = function(str) {
                var ret = {};
                var qp = str.split("&");
                var dec = decodeURIComponent;
                _d.forEach(qp, function(item) {
                    if (item.length) {
                        var parts = item.split("=");
                        var name = dec(parts.shift());
                        var val = dec(parts.join("="));
                        if (typeof ret[name] == "string") {
                            ret[name] = [ret[name]]
                        }
                        if (_d.isArray(ret[name])) {
                            ret[name].push(val)
                        } else {
                            ret[name] = val
                        }
                    }
                });
                return ret
            };
            dojo._blockAsync = false;
            var handlers = _d._contentHandlers = dojo.contentHandlers = {
                text: function(xhr) {
                    return xhr.responseText
                },
                json: function(xhr) {
                    return _d.fromJson(xhr.responseText || null)
                },
                "json-comment-filtered": function(xhr) {
                    if (!dojo.config.useCommentedJson) {
                        console.warn("Consider using the standard mimetype:application/json. json-commenting can introduce security issues. To decrease the chances of hijacking, use the standard the 'json' handler and prefix your json with: {}&&\nUse djConfig.useCommentedJson=true to turn off this message.")
                    }
                    var value = xhr.responseText;
                    var cStartIdx = value.indexOf("/*");
                    var cEndIdx = value.lastIndexOf("*/");
                    if (cStartIdx == -1 || cEndIdx == -1) {
                        throw new Error("JSON was not comment filtered")
                    }
                    return _d.fromJson(value.substring(cStartIdx + 2, cEndIdx))
                },
                javascript: function(xhr) {
                    return _d.eval(xhr.responseText)
                },
                xml: function(xhr) {
                    var result = xhr.responseXML;
                    if (_d.isIE && (!result || !result.documentElement)) {
                        var ms = function(n) {
                            return "MSXML" + n + ".DOMDocument"
                        };
                        var dp = ["Microsoft.XMLDOM", ms(6), ms(4), ms(3), ms(2)];
                        _d.some(dp, function(p) {
                            try {
                                var dom = new ActiveXObject(p);
                                dom.async = false;
                                dom.loadXML(xhr.responseText);
                                result = dom
                            } catch (e) {
                                return false
                            }
                            return true
                        })
                    }
                    return result
                },
                "json-comment-optional": function(xhr) {
                    if (xhr.responseText && /^[^{\[]*\/\*/.test(xhr.responseText)) {
                        return handlers["json-comment-filtered"](xhr)
                    } else {
                        return handlers.json(xhr)
                    }
                }
            };
            dojo._ioSetArgs = function(args, canceller, okHandler, errHandler) {
                var ioArgs = {
                    args: args,
                    url: args.url
                };
                var formObject = null;
                if (args.form) {
                    var form = _d.byId(args.form);
                    var actnNode = form.getAttributeNode("action");
                    ioArgs.url = ioArgs.url || (actnNode ? actnNode.value : null);
                    formObject = _d.formToObject(form)
                }
                var miArgs = [{}];
                if (formObject) {
                    miArgs.push(formObject)
                }
                if (args.content) {
                    miArgs.push(args.content)
                }
                if (args.preventCache) {
                    miArgs.push({
                        "dojo.preventCache": new Date().valueOf()
                    })
                }
                ioArgs.query = _d.objectToQuery(_d.mixin.apply(null, miArgs));
                ioArgs.handleAs = args.handleAs || "text";
                var d = new _d.Deferred(canceller);
                d.addCallbacks(okHandler, function(error) {
                    return errHandler(error, d)
                });
                var ld = args.load;
                if (ld && _d.isFunction(ld)) {
                    d.addCallback(function(value) {
                        return ld.call(args, value, ioArgs)
                    })
                }
                var err = args.error;
                if (err && _d.isFunction(err)) {
                    d.addErrback(function(value) {
                        return err.call(args, value, ioArgs)
                    })
                }
                var handle = args.handle;
                if (handle && _d.isFunction(handle)) {
                    d.addBoth(function(value) {
                        return handle.call(args, value, ioArgs)
                    })
                }
                if (cfg.ioPublish && _d.publish && ioArgs.args.ioPublish !== false) {
                    d.addCallbacks(function(res) {
                        _d.publish("/dojo/io/load", [d, res]);
                        return res
                    }, function(res) {
                        _d.publish("/dojo/io/error", [d, res]);
                        return res
                    });
                    d.addBoth(function(res) {
                        _d.publish("/dojo/io/done", [d, res]);
                        return res
                    })
                }
                d.ioArgs = ioArgs;
                return d
            };
            var _deferredCancel = function(dfd) {
                dfd.canceled = true;
                var xhr = dfd.ioArgs.xhr;
                var _at = typeof xhr.abort;
                if (_at == "function" || _at == "object" || _at == "unknown") {
                    xhr.abort()
                }
                var err = dfd.ioArgs.error;
                if (!err) {
                    err = new Error("xhr cancelled");
                    err.dojoType = "cancel"
                }
                return err
            };
            var _deferredOk = function(dfd) {
                var ret = handlers[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);
                return ret === undefined ? null : ret
            };
            var _deferError = function(error, dfd) {
                if (!dfd.ioArgs.args.failOk) {
                    console.error(error)
                }
                return error
            };
            var _inFlightIntvl = null;
            var _inFlight = [];
            var _pubCount = 0;
            var _checkPubCount = function(dfd) {
                if (_pubCount <= 0) {
                    _pubCount = 0;
                    if (cfg.ioPublish && _d.publish && (!dfd || dfd && dfd.ioArgs.args.ioPublish !== false)) {
                        _d.publish("/dojo/io/stop")
                    }
                }
            };
            var _watchInFlight = function() {
                var now = (new Date()).getTime();
                if (!_d._blockAsync) {
                    for (var i = 0, tif; i < _inFlight.length && (tif = _inFlight[i]); i++) {
                        var dfd = tif.dfd;
                        var func = function() {
                            if (!dfd || dfd.canceled || !tif.validCheck(dfd)) {
                                _inFlight.splice(i--, 1);
                                _pubCount -= 1
                            } else {
                                if (tif.ioCheck(dfd)) {
                                    _inFlight.splice(i--, 1);
                                    tif.resHandle(dfd);
                                    _pubCount -= 1
                                } else {
                                    if (dfd.startTime) {
                                        if (dfd.startTime + (dfd.ioArgs.args.timeout || 0) < now) {
                                            _inFlight.splice(i--, 1);
                                            var err = new Error("timeout exceeded");
                                            err.dojoType = "timeout";
                                            dfd.errback(err);
                                            dfd.cancel();
                                            _pubCount -= 1
                                        }
                                    }
                                }
                            }
                        };
                        if (dojo.config.debugAtAllCosts) {
                            func.call(this)
                        } else {
                            try {
                                func.call(this)
                            } catch (e) {
                                dfd.errback(e)
                            }
                        }
                    }
                }
                _checkPubCount(dfd);
                if (!_inFlight.length) {
                    clearInterval(_inFlightIntvl);
                    _inFlightIntvl = null;
                    return
                }
            };
            dojo._ioCancelAll = function() {
                try {
                    _d.forEach(_inFlight, function(i) {
                        try {
                            i.dfd.cancel()
                        } catch (e) {}
                    })
                } catch (e) {}
            };
            if (_d.isIE) {
                _d.addOnWindowUnload(_d._ioCancelAll)
            }
            _d._ioNotifyStart = function(dfd) {
                if (cfg.ioPublish && _d.publish && dfd.ioArgs.args.ioPublish !== false) {
                    if (!_pubCount) {
                        _d.publish("/dojo/io/start")
                    }
                    _pubCount += 1;
                    _d.publish("/dojo/io/send", [dfd])
                }
            };
            _d._ioWatch = function(dfd, validCheck, ioCheck, resHandle) {
                var args = dfd.ioArgs.args;
                if (args.timeout) {
                    dfd.startTime = (new Date()).getTime()
                }
                _inFlight.push({
                    dfd: dfd,
                    validCheck: validCheck,
                    ioCheck: ioCheck,
                    resHandle: resHandle
                });
                if (!_inFlightIntvl) {
                    _inFlightIntvl = setInterval(_watchInFlight, 50)
                }
                if (args.sync) {
                    _watchInFlight()
                }
            };
            var _defaultContentType = "application/x-www-form-urlencoded";
            var _validCheck = function(dfd) {
                return dfd.ioArgs.xhr.readyState
            };
            var _ioCheck = function(dfd) {
                return 4 == dfd.ioArgs.xhr.readyState
            };
            var _resHandle = function(dfd) {
                var xhr = dfd.ioArgs.xhr;
                if (_d._isDocumentOk(xhr)) {
                    dfd.callback(dfd)
                } else {
                    var err = new Error("Unable to load " + dfd.ioArgs.url + " status:" + xhr.status);
                    err.status = xhr.status;
                    err.responseText = xhr.responseText;
                    dfd.errback(err)
                }
            };
            dojo._ioAddQueryToUrl = function(ioArgs) {
                if (ioArgs.query.length) {
                    ioArgs.url += (ioArgs.url.indexOf("?") == -1 ? "?" : "&") + ioArgs.query;
                    ioArgs.query = null
                }
            };
            dojo.xhr = function(method, args, hasBody) {
                var dfd = _d._ioSetArgs(args, _deferredCancel, _deferredOk, _deferError);
                var ioArgs = dfd.ioArgs;
                var xhr = ioArgs.xhr = _d._xhrObj(ioArgs.args);
                if (!xhr) {
                    dfd.cancel();
                    return dfd
                }
                if ("postData" in args) {
                    ioArgs.query = args.postData
                } else {
                    if ("putData" in args) {
                        ioArgs.query = args.putData
                    } else {
                        if ("rawBody" in args) {
                            ioArgs.query = args.rawBody
                        } else {
                            if ((arguments.length > 2 && !hasBody) || "POST|PUT".indexOf(method.toUpperCase()) == -1) {
                                _d._ioAddQueryToUrl(ioArgs)
                            }
                        }
                    }
                }
                xhr.open(method, ioArgs.url, args.sync !== true, args.user || undefined, args.password || undefined);
                if (args.headers) {
                    for (var hdr in args.headers) {
                        if (hdr.toLowerCase() === "content-type" && !args.contentType) {
                            args.contentType = args.headers[hdr]
                        } else {
                            if (args.headers[hdr]) {
                                xhr.setRequestHeader(hdr, args.headers[hdr])
                            }
                        }
                    }
                }
                xhr.setRequestHeader("Content-Type", args.contentType || _defaultContentType);
                if (!args.headers || !("X-Requested-With" in args.headers)) {
                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
                }
                _d._ioNotifyStart(dfd);
                if (dojo.config.debugAtAllCosts) {
                    xhr.send(ioArgs.query)
                } else {
                    try {
                        xhr.send(ioArgs.query)
                    } catch (e) {
                        ioArgs.error = e;
                        dfd.cancel()
                    }
                }
                _d._ioWatch(dfd, _validCheck, _ioCheck, _resHandle);
                xhr = null;
                return dfd
            };
            dojo.xhrGet = function(args) {
                return _d.xhr("GET", args)
            };
            dojo.rawXhrPost = dojo.xhrPost = function(args) {
                return _d.xhr("POST", args, true)
            };
            dojo.rawXhrPut = dojo.xhrPut = function(args) {
                return _d.xhr("PUT", args, true)
            };
            dojo.xhrDelete = function(args) {
                return _d.xhr("DELETE", args)
            }
        })()
    }
    if (!dojo._hasResource["dojo._base.fx"]) {
        dojo._hasResource["dojo._base.fx"] = true;
        dojo.provide("dojo._base.fx");
        (function() {
            var d = dojo;
            var _mixin = d._mixin;
            dojo._Line = function(start, end) {
                this.start = start;
                this.end = end
            };
            dojo._Line.prototype.getValue = function(n) {
                return ((this.end - this.start) * n) + this.start
            };
            dojo.Animation = function(args) {
                _mixin(this, args);
                if (d.isArray(this.curve)) {
                    this.curve = new d._Line(this.curve[0], this.curve[1])
                }
            };
            d._Animation = d.Animation;
            d.extend(dojo.Animation, {
                duration: 350,
                repeat: 0,
                rate: 20,
                _percent: 0,
                _startRepeatCount: 0,
                _getStep: function() {
                    var _p = this._percent,
                        _e = this.easing;
                    return _e ? _e(_p) : _p
                },
                _fire: function(evt, args) {
                    var a = args || [];
                    if (this[evt]) {
                        if (d.config.debugAtAllCosts) {
                            this[evt].apply(this, a)
                        } else {
                            try {
                                this[evt].apply(this, a)
                            } catch (e) {
                                console.error("exception in animation handler for:", evt);
                                console.error(e)
                            }
                        }
                    }
                    return this
                },
                play: function(delay, gotoStart) {
                    var _t = this;
                    if (_t._delayTimer) {
                        _t._clearTimer()
                    }
                    if (gotoStart) {
                        _t._stopTimer();
                        _t._active = _t._paused = false;
                        _t._percent = 0
                    } else {
                        if (_t._active && !_t._paused) {
                            return _t
                        }
                    }
                    _t._fire("beforeBegin", [_t.node]);
                    var de = delay || _t.delay,
                        _p = dojo.hitch(_t, "_play", gotoStart);
                    if (de > 0) {
                        _t._delayTimer = setTimeout(_p, de);
                        return _t
                    }
                    _p();
                    return _t
                },
                _play: function(gotoStart) {
                    var _t = this;
                    if (_t._delayTimer) {
                        _t._clearTimer()
                    }
                    _t._startTime = new Date().valueOf();
                    if (_t._paused) {
                        _t._startTime -= _t.duration * _t._percent
                    }
                    _t._active = true;
                    _t._paused = false;
                    var value = _t.curve.getValue(_t._getStep());
                    if (!_t._percent) {
                        if (!_t._startRepeatCount) {
                            _t._startRepeatCount = _t.repeat
                        }
                        _t._fire("onBegin", [value])
                    }
                    _t._fire("onPlay", [value]);
                    _t._cycle();
                    return _t
                },
                pause: function() {
                    var _t = this;
                    if (_t._delayTimer) {
                        _t._clearTimer()
                    }
                    _t._stopTimer();
                    if (!_t._active) {
                        return _t
                    }
                    _t._paused = true;
                    _t._fire("onPause", [_t.curve.getValue(_t._getStep())]);
                    return _t
                },
                gotoPercent: function(percent, andPlay) {
                    var _t = this;
                    _t._stopTimer();
                    _t._active = _t._paused = true;
                    _t._percent = percent;
                    if (andPlay) {
                        _t.play()
                    }
                    return _t
                },
                stop: function(gotoEnd) {
                    var _t = this;
                    if (_t._delayTimer) {
                        _t._clearTimer()
                    }
                    if (!_t._timer) {
                        return _t
                    }
                    _t._stopTimer();
                    if (gotoEnd) {
                        _t._percent = 1
                    }
                    _t._fire("onStop", [_t.curve.getValue(_t._getStep())]);
                    _t._active = _t._paused = false;
                    return _t
                },
                status: function() {
                    if (this._active) {
                        return this._paused ? "paused" : "playing"
                    }
                    return "stopped"
                },
                _cycle: function() {
                    var _t = this;
                    if (_t._active) {
                        var curr = new Date().valueOf();
                        var step = (curr - _t._startTime) / (_t.duration);
                        if (step >= 1) {
                            step = 1
                        }
                        _t._percent = step;
                        if (_t.easing) {
                            step = _t.easing(step)
                        }
                        _t._fire("onAnimate", [_t.curve.getValue(step)]);
                        if (_t._percent < 1) {
                            _t._startTimer()
                        } else {
                            _t._active = false;
                            if (_t.repeat > 0) {
                                _t.repeat--;
                                _t.play(null, true)
                            } else {
                                if (_t.repeat == -1) {
                                    _t.play(null, true)
                                } else {
                                    if (_t._startRepeatCount) {
                                        _t.repeat = _t._startRepeatCount;
                                        _t._startRepeatCount = 0
                                    }
                                }
                            }
                            _t._percent = 0;
                            _t._fire("onEnd", [_t.node]);
                            !_t.repeat && _t._stopTimer()
                        }
                    }
                    return _t
                },
                _clearTimer: function() {
                    clearTimeout(this._delayTimer);
                    delete this._delayTimer
                }
            });
            var ctr = 0,
                timer = null,
                runner = {
                    run: function() {}
                };
            d.extend(d.Animation, {
                _startTimer: function() {
                    if (!this._timer) {
                        this._timer = d.connect(runner, "run", this, "_cycle");
                        ctr++
                    }
                    if (!timer) {
                        timer = setInterval(d.hitch(runner, "run"), this.rate)
                    }
                },
                _stopTimer: function() {
                    if (this._timer) {
                        d.disconnect(this._timer);
                        this._timer = null;
                        ctr--
                    }
                    if (ctr <= 0) {
                        clearInterval(timer);
                        timer = null;
                        ctr = 0
                    }
                }
            });
            var _makeFadeable = d.isIE ? function(node) {
                var ns = node.style;
                if (!ns.width.length && d.style(node, "width") == "auto") {
                    ns.width = "auto"
                }
            } : function() {};
            dojo._fade = function(args) {
                args.node = d.byId(args.node);
                var fArgs = _mixin({
                        properties: {}
                    }, args),
                    props = (fArgs.properties.opacity = {});
                props.start = !("start" in fArgs) ? function() {
                    return +d.style(fArgs.node, "opacity") || 0
                } : fArgs.start;
                props.end = fArgs.end;
                var anim = d.animateProperty(fArgs);
                d.connect(anim, "beforeBegin", d.partial(_makeFadeable, fArgs.node));
                return anim
            };
            dojo.fadeIn = function(args) {
                return d._fade(_mixin({
                    end: 1
                }, args))
            };
            dojo.fadeOut = function(args) {
                return d._fade(_mixin({
                    end: 0
                }, args))
            };
            dojo._defaultEasing = function(n) {
                return 0.5 + ((Math.sin((n + 1.5) * Math.PI)) / 2)
            };
            var PropLine = function(properties) {
                this._properties = properties;
                for (var p in properties) {
                    var prop = properties[p];
                    if (prop.start instanceof d.Color) {
                        prop.tempColor = new d.Color()
                    }
                }
            };
            PropLine.prototype.getValue = function(r) {
                var ret = {};
                for (var p in this._properties) {
                    var prop = this._properties[p],
                        start = prop.start;
                    if (start instanceof d.Color) {
                        ret[p] = d.blendColors(start, prop.end, r, prop.tempColor).toCss()
                    } else {
                        if (!d.isArray(start)) {
                            ret[p] = ((prop.end - start) * r) + start + (p != "opacity" ? prop.units || "px" : 0)
                        }
                    }
                }
                return ret
            };
            dojo.animateProperty = function(args) {
                var n = args.node = d.byId(args.node);
                if (!args.easing) {
                    args.easing = d._defaultEasing
                }
                var anim = new d.Animation(args);
                d.connect(anim, "beforeBegin", anim, function() {
                    var pm = {};
                    for (var p in this.properties) {
                        if (p == "width" || p == "height") {
                            this.node.display = "block"
                        }
                        var prop = this.properties[p];
                        if (d.isFunction(prop)) {
                            prop = prop(n)
                        }
                        prop = pm[p] = _mixin({}, (d.isObject(prop) ? prop : {
                            end: prop
                        }));
                        if (d.isFunction(prop.start)) {
                            prop.start = prop.start(n)
                        }
                        if (d.isFunction(prop.end)) {
                            prop.end = prop.end(n)
                        }
                        var isColor = (p.toLowerCase().indexOf("color") >= 0);

                        function getStyle(node, p) {
                            var v = {
                                height: node.offsetHeight,
                                width: node.offsetWidth
                            }[p];
                            if (v !== undefined) {
                                return v
                            }
                            v = d.style(node, p);
                            return (p == "opacity") ? +v : (isColor ? v : parseFloat(v))
                        }
                        if (!("end" in prop)) {
                            prop.end = getStyle(n, p)
                        } else {
                            if (!("start" in prop)) {
                                prop.start = getStyle(n, p)
                            }
                        } if (isColor) {
                            prop.start = new d.Color(prop.start);
                            prop.end = new d.Color(prop.end)
                        } else {
                            prop.start = (p == "opacity") ? +prop.start : parseFloat(prop.start)
                        }
                    }
                    this.curve = new PropLine(pm)
                });
                d.connect(anim, "onAnimate", d.hitch(d, "style", anim.node));
                return anim
            };
            dojo.anim = function(node, properties, duration, easing, onEnd, delay) {
                return d.animateProperty({
                    node: node,
                    duration: duration || d.Animation.prototype.duration,
                    properties: properties,
                    easing: easing,
                    onEnd: onEnd
                }).play(delay || 0)
            }
        })()
    }
    if (!dojo._hasResource["dojo._base.browser"]) {
        dojo._hasResource["dojo._base.browser"] = true;
        dojo.provide("dojo._base.browser");
        dojo.forEach(dojo.config.require, function(i) {
            dojo.require(i)
        })
    }
    if (!dojo._hasResource["dojox.io.windowName"]) {
        dojo._hasResource["dojox.io.windowName"] = true;
        dojo.provide("dojox.io.windowName");
        dojox.io.windowName = {
            send: function(method, args) {
                args.url += (args.url.match(/\?/) ? "&" : "?") + "windowname=" + (args.authElement ? "auth" : true);
                var authElement = args.authElement;
                var cleanup = function(result) {
                    try {
                        var innerDoc = dfd.ioArgs.frame.contentWindow.document;
                        innerDoc.write(" ");
                        innerDoc.close()
                    } catch (e) {}(authElement || dojo.body()).removeChild(dfd.ioArgs.outerFrame);
                    return result
                };
                var dfd = dojo._ioSetArgs(args, cleanup, cleanup, cleanup);
                if (args.timeout) {
                    setTimeout(function() {
                        if (dfd.fired == -1) {
                            dfd.callback(new Error("Timeout"))
                        }
                    }, args.timeout)
                }
                var self = dojox.io.windowName;
                if (dojo.body()) {
                    self._send(dfd, method, authElement, args.onAuthLoad)
                } else {
                    dojo.addOnLoad(function() {
                        self._send(dfd, method, authElement, args.onAuthLoad)
                    })
                }
                return dfd
            },
            _send: function(dfd, method, authTarget, onAuthLoad) {
                var ioArgs = dfd.ioArgs;
                var frameNum = dojox.io.windowName._frameNum++;
                var sameDomainUrl = (dojo.config.dojoBlankHtmlUrl || dojo.config.dojoCallbackUrl || dojo.moduleUrl("dojo", "resources/blank.html")) + "#" + frameNum;
                var frameName = new dojo._Url(window.location, sameDomainUrl);
                var doc = dojo.doc;
                var frameContainer = authTarget || dojo.body();

                function styleFrame(frame) {
                    frame.style.width = "100%";
                    frame.style.height = "100%";
                    frame.style.border = "0px"
                }
                if (dojo.isMoz && ![].reduce) {
                    var outerFrame = doc.createElement("iframe");
                    styleFrame(outerFrame);
                    if (!authTarget) {
                        outerFrame.style.display = "none"
                    }
                    frameContainer.appendChild(outerFrame);
                    var firstWindow = outerFrame.contentWindow;
                    doc = firstWindow.document;
                    doc.write("<html><body margin='0px'><iframe style='width:100%;height:100%;border:0px' name='protectedFrame'></iframe></body></html>");
                    doc.close();
                    var secondWindow = firstWindow[0];
                    firstWindow.__defineGetter__(0, function() {});
                    firstWindow.__defineGetter__("protectedFrame", function() {});
                    doc = secondWindow.document;
                    doc.write("<html><body margin='0px'></body></html>");
                    doc.close();
                    frameContainer = doc.body
                }
                var frame = ioArgs.frame = frame = doc.createElement(dojo.isIE < 9 ? '<iframe src="init_src.html" name="' + frameName + '" onload="' + dojox._scopeName + ".io.windowName[" + frameNum + ']()">' : "iframe");
                styleFrame(frame);
                ioArgs.outerFrame = outerFrame = outerFrame || frame;
                if (!authTarget) {
                    outerFrame.style.display = "none"
                }
                var state = 0;

                function getData() {
                    var data = frame.contentWindow.name;
                    if (typeof data == "string") {
                        if (data != frameName) {
                            state = 2;
                            dfd.ioArgs.hash = frame.contentWindow.location.hash;
                            dfd.callback(data)
                        }
                    }
                }
                dojox.io.windowName[frameNum] = frame.onload = function() {
                    try {
                        if (frame.contentWindow.location == "about:blank") {
                            return
                        }
                    } catch (e) {}
                    if (!state) {
                        state = 1;
                        if (authTarget) {
                            if (onAuthLoad) {
                                onAuthLoad()
                            }
                        } else {
                            frame.contentWindow.location = sameDomainUrl
                        }
                    }
                    try {
                        if (state < 2) {
                            getData()
                        }
                    } catch (e) {}
                };
                frame.name = frameName;
                if (method.match(/GET/i)) {
                    dojo._ioAddQueryToUrl(ioArgs);
                    frame.src = ioArgs.url;
                    frameContainer.appendChild(frame)
                } else {
                    if (method.match(/POST/i)) {
                        frameContainer.appendChild(frame);
                        var form = dojo.doc.createElement("form");
                        dojo.body().appendChild(form);
                        var query = dojo.queryToObject(ioArgs.query);
                        for (var i in query) {
                            var values = query[i];
                            values = values instanceof Array ? values : [values];
                            for (var j = 0; j < values.length; j++) {
                                var input = doc.createElement("input");
                                input.type = "hidden";
                                input.name = i;
                                input.value = values[j];
                                form.appendChild(input)
                            }
                        }
                        form.method = "POST";
                        form.action = ioArgs.url;
                        form.target = frameName;
                        form.submit();
                        form.parentNode.removeChild(form)
                    } else {
                        throw new Error("Method " + method + " not supported with the windowName transport")
                    }
                } if (frame.contentWindow) {
                    frame.contentWindow.name = frameName
                }
            },
            _frameNum: 0
        }
    }
    if (!dojo._hasResource["dojox.secure.capability"]) {
        dojo._hasResource["dojox.secure.capability"] = true;
        dojo.provide("dojox.secure.capability");
        dojox.secure.badProps = /^__|^(apply|call|callee|caller|constructor|eval|prototype|this|unwatch|valueOf|watch)$|__$/;
        dojox.secure.capability = {
            keywords: ["break", "case", "catch", "const", "continue", "debugger", "default", "delete", "do", "else", "enum", "false", "finally", "for", "function", "if", "in", "instanceof", "new", "null", "yield", "return", "switch", "throw", "true", "try", "typeof", "var", "void", "while"],
            validate: function(script, safeLibraries, safeGlobals) {
                var keywords = this.keywords;
                for (var i = 0; i < keywords.length; i++) {
                    safeGlobals[keywords[i]] = true
                }
                var badThis = "|this| keyword in object literal without a Class call";
                var blocks = [];
                if (script.match(/[\u200c-\u200f\u202a-\u202e\u206a-\u206f\uff00-\uffff]/)) {
                    throw new Error("Illegal unicode characters detected")
                }
                if (script.match(/\/\*@cc_on/)) {
                    throw new Error("Conditional compilation token is not allowed")
                }
                script = script.replace(/\\["'\\\/bfnrtu]/g, "@").replace(/\/\/.*|\/\*[\w\W]*?\*\/|\/(\\[\/\\]|[^*\/])(\\.|[^\/\n\\])*\/[gim]*|("[^"]*")|('[^']*')/g, function(t) {
                    return t.match(/^\/\/|^\/\*/) ? " " : "0"
                }).replace(/\.\s*([a-z\$_A-Z][\w\$_]*)|([;,{])\s*([a-z\$_A-Z][\w\$_]*\s*):/g, function(t, prop, prefix, key) {
                    prop = prop || key;
                    if (/^__|^(apply|call|callee|caller|constructor|eval|prototype|this|unwatch|valueOf|watch)$|__$/.test(prop)) {
                        throw new Error("Illegal property name " + prop)
                    }
                    return (prefix && (prefix + "0:")) || "~"
                });
                script.replace(/([^\[][\]\}]\s*=)|((\Wreturn|\S)\s*\[\s*\+?)|([^=!][=!]=[^=])/g, function(oper) {
                    if (!oper.match(/((\Wreturn|[=\&\|\:\?\,])\s*\[)|\[\s*\+$/)) {
                        throw new Error("Illegal operator " + oper.substring(1))
                    }
                });
                script = script.replace(new RegExp("(" + safeLibraries.join("|") + ")[\\s~]*\\(", "g"), function(call) {
                    return "new("
                });

                function findOuterRefs(block, func) {
                    var outerRefs = {};
                    block.replace(/#\d+/g, function(b) {
                        var refs = blocks[b.substring(1)];
                        for (var i in refs) {
                            if (i == badThis) {
                                throw i
                            }
                            if (i == "this" && refs[":method"] && refs["this"] == 1) {
                                i = badThis
                            }
                            if (i != ":method") {
                                outerRefs[i] = 2
                            }
                        }
                    });
                    block.replace(/(\W|^)([a-z_\$A-Z][\w_\$]*)/g, function(t, a, identifier) {
                        if (identifier.charAt(0) == "_") {
                            throw new Error("Names may not start with _")
                        }
                        outerRefs[identifier] = 1
                    });
                    return outerRefs
                }
                var newScript, outerRefs;

                function parseBlock(t, func, a, b, params, block) {
                    block.replace(/(^|,)0:\s*function#(\d+)/g, function(t, a, b) {
                        var refs = blocks[b];
                        refs[":method"] = 1
                    });
                    block = block.replace(/(^|[^_\w\$])Class\s*\(\s*([_\w\$]+\s*,\s*)*#(\d+)/g, function(t, p, a, b) {
                        var refs = blocks[b];
                        delete refs[badThis];
                        return (p || "") + (a || "") + "#" + b
                    });
                    outerRefs = findOuterRefs(block, func);

                    function parseVars(t, a, b, decl) {
                        decl.replace(/,?([a-z\$A-Z][_\w\$]*)/g, function(t, identifier) {
                            if (identifier == "Class") {
                                throw new Error("Class is reserved")
                            }
                            delete outerRefs[identifier]
                        })
                    }
                    if (func) {
                        parseVars(t, a, a, params)
                    }
                    block.replace(/(\W|^)(var) ([ \t,_\w\$]+)/g, parseVars);
                    return (a || "") + (b || "") + "#" + (blocks.push(outerRefs) - 1)
                }
                do {
                    newScript = script.replace(/((function|catch)(\s+[_\w\$]+)?\s*\(([^\)]*)\)\s*)?{([^{}]*)}/g, parseBlock)
                } while (newScript != script && (script = newScript));
                parseBlock(0, 0, 0, 0, 0, script);
                for (i in outerRefs) {
                    if (!(i in safeGlobals)) {
                        throw new Error("Illegal reference to " + i)
                    }
                }
            }
        }
    }
    if (dojo.isBrowser && (document.readyState === "complete" || dojo.config.afterOnLoad)) {
        window.setTimeout(dojo._loadInit, 100)
    }
})();
var Ozone = Ozone || {};
Ozone.util = Ozone.util || {};
Ozone.util.pageLoad = Ozone.util.pageLoad || {};
Ozone.util.pageLoad.autoSend = true;
Ozone.util.pageLoad.beforeLoad = (new Date()).getTime();
Ozone.util.pageLoad.afterLoad = null;
Ozone.util.pageLoad.calcLoadTime = function(a) {
    Ozone.util.pageLoad.loadTime = (a != null ? a : Ozone.util.pageLoad.afterLoad) - Ozone.util.pageLoad.beforeLoad;
    return Ozone.util.pageLoad.loadTime
};
var Ozone = Ozone || {};
Ozone.version = Ozone.version || {};
Ozone.version = {
    owfversion: "7.0.1-GA",
    mpversion: "2.3",
    preference: "-v1",
    eventing: "-v1",
    widgetLauncher: "-v1",
    state: "-v1",
    dragAndDrop: "-v1",
    widgetChrome: "-v1",
    logging: "-v1",
    language: "-v1"
};
var Ozone = Ozone || {};
Ozone.util = Ozone.util || {};
Ozone.util.formField = Ozone.util.formField || {};
Ozone.config = Ozone.config || {};
Ozone.util.isUrlLocal = function(c) {
    var a = Ozone.util.contextPath();
    if (a != "" && a != null) {
        a += "/"
    }
    var d = new RegExp("^(https?:)//([^/:]+):?(.*)" + a);
    var e = c.match(d);
    if (!e) {
        if (c.match(new RegExp("^https?://"))) {
            return false
        } else {
            return true
        }
    }
    var b = window.location.port;
    return window.location.protocol === e[1] && window.location.hostname === e[2] && b === e[3]
};
Ozone.util.parseJson = function(b) {
    if (typeof(b) === "string") {
        owfdojox.secure.capability.validate(b, [], {});
        var a = owfdojo.fromJson(b);
        return a
    } else {
        throw "Ozone.util.parseJson expected a string, but didn't get one"
    }
};
Ozone.util.HTMLEncodeReservedJS = function(a) {
    return a.replace(/"/g, "&quot;").replace(/'/g, "&#39;")
};
Ozone.util.HTMLEncode = function(a) {
    return !a ? a : String(a).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
};
Ozone.util.parseWindowNameData = function() {
    var a = null;
    return function() {
        if (a) {
            return a
        }
        try {
            a = Ozone.util.parseJson(window.name);
            return a
        } catch (b) {
            return null
        }
    }
}();
Ozone.util.contextPath = (function() {
    var a = Ozone.util.parseWindowNameData(),
        b = Ozone.config.webContextPath;
    if (a && a.webContextPath) {
        b = Ozone.config.webContextPath = a.webContextPath
    }
    return function() {
        return b || ""
    }
})();
Ozone.util.validUrlContext = function(d, f) {
    var g = (d.indexOf("../") == 0) ? true : false;
    var b = (d.indexOf("/") == 0) ? true : false;
    var a = (b || g || (d.indexOf("localhost") == 7) || (d.indexOf("localhost") == 11) || (d.indexOf("127.0.0.1") == 7)) ? true : false;
    var c = d;
    f = ((f == undefined) ? Ozone.util.contextPath() : f);
    if ((a == true) && (f != null)) {
        if (b) {
            c = String.format("{0}{1}", f, d)
        } else {
            if (g) {
                var e = d.substring(3);
                c = String.format("{0}/{1}", f, e)
            }
        }
    }
    return c
};
Ozone.util.getContainerRelay = function() {
    return Ozone.util.contextPath() + "/js/eventing/rpc_relay.uncompressed.html"
};
Ozone.util.toString = function(a) {
    if (typeof(a) === "object") {
        return owfdojo.toJson(a)
    } else {
        return a + ""
    }
};
Ozone.util.formatWindowNameData = function(a) {
    return Ozone.util.toString(a)
};
Ozone.util.formField.removeLeadingTrailingSpaces = function(a) {
    var b = a.getValue().replace(new RegExp(Ozone.lang.regexLeadingTailingSpaceChars), "");
    a.setValue(b);
    return b
};
if (!Ozone.util.ModalBox) {
    Ozone.util.ModalBox = function() {
        var q = "absolute";
        var e = "none";
        var k = document.getElementsByTagName("body")[0];
        var o = document.createDocumentFragment();
        var c = document.createElement("div");
        c.setAttribute("id", "ol");
        c.style.display = e;
        c.style.position = q;
        c.style.top = 0;
        c.style.left = 0;
        c.style.zIndex = 10000;
        c.style.width = "100%";
        c.style.backgroundColor = "#555";
        c.style.filter = "alpha(opacity=50)";
        c.style.MozOpacity = 0.5;
        c.style.opacity = 0.5;
        o.appendChild(c);
        this.obol = c;
        var b = document.createElement("div");
        b.setAttribute("id", "mbox");
        b.style.display = e;
        b.style.position = q;
        b.style.backgroundColor = "#eee";
        b.style.padding = "8px";
        b.style.border = "2px outset #666";
        b.style.zIndex = 10001;
        this.obbx = b;
        var f = document.createElement("span");
        b.appendChild(f);
        var p = document.createElement("div");
        p.setAttribute("id", "mbd");
        var j = document.createElement("div");
        var g = document.createElement("span");
        g.innerHTML = "Press OK to continue.";
        this.txt = g;
        var a = document.createElement("div");
        a.style.textAlign = "center";
        a.style.fontSize = "14px";
        a.appendChild(g);
        a.appendChild(document.createElement("br"));
        var h = document.createElement("button");
        h.innerHTML = "OK";
        var m = this;
        h.onclick = function() {
            m.hide()
        };
        a.appendChild(h);
        j.appendChild(a);
        p.appendChild(j);
        this.obbxd = p;
        f.appendChild(p);
        o.insertBefore(b, c.nextSibling);
        k.insertBefore(o, k.firstChild);
        window.onscroll = function() {
            m.scrollFix()
        };
        window.onresize = function() {
            m.sizeFix()
        }
    };
    Ozone.util.ModalBox.prototype.pageWidth = function() {
        return window.innerWidth != null ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body != null ? document.body.clientWidth : null
    };
    Ozone.util.ModalBox.prototype.pageHeight = function() {
        return window.innerHeight != null ? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body != null ? document.body.clientHeight : null
    };
    Ozone.util.ModalBox.prototype.posLeft = function() {
        return typeof window.pageXOffset != "undefined" ? window.pageXOffset : document.documentElement && document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft ? document.body.scrollLeft : 0
    };
    Ozone.util.ModalBox.prototype.posTop = function() {
        return typeof window.pageYOffset != "undefined" ? window.pageYOffset : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0
    };
    Ozone.util.ModalBox.prototype.scrollFix = function() {
        this.obol.style.top = this.posTop() + "px";
        this.obol.style.left = this.posLeft() + "px"
    };
    Ozone.util.ModalBox.prototype.sizeFix = function() {
        this.obol.style.height = this.pageHeight() + "px";
        this.obol.style.width = this.pageWidth() + "px";
        var b = this.posTop() + ((this.pageHeight() - this.height) / 2) - 12;
        var a = this.posLeft() + ((this.pageWidth() - this.width) / 2) - 12;
        this.obbx.style.top = (b < 0 ? 0 : b) + "px";
        this.obbx.style.left = (a < 0 ? 0 : a) + "px"
    };
    Ozone.util.ModalBox.prototype.kp = function(a) {
        ky = a ? a.which : event.keyCode;
        if (ky == 88 || ky == 120) {
            this.hide()
        }
        return false
    };
    Ozone.util.ModalBox.prototype.inf = function(a) {
        tag = document.getElementsByTagName("select");
        for (i = tag.length - 1; i >= 0; i--) {
            tag[i].style.visibility = a
        }
        tag = document.getElementsByTagName("iframe");
        for (i = tag.length - 1; i >= 0; i--) {
            tag[i].style.visibility = a
        }
        tag = document.getElementsByTagName("object");
        for (i = tag.length - 1; i >= 0; i--) {
            tag[i].style.visibility = a
        }
    };
    Ozone.util.ModalBox.prototype.hide = function() {
        var a = "visible";
        var b = "none";
        this.obol.style.display = b;
        this.obbx.style.display = b;
        this.inf(a);
        document.onkeypress = ""
    };
    Ozone.util.ModalBox.prototype.show = function(e, f, n) {
        var j = "hidden";
        var k = "block";
        var d = "px";
        f = f | 200;
        n = n | 100;
        var c = this.obol;
        var o = this.obbxd;
        this.txt.innerHTML = e;
        c.style.height = this.pageHeight() + d;
        c.style.width = this.pageWidth() + d;
        c.style.top = this.posTop() + d;
        c.style.left = this.posLeft() + d;
        c.style.display = k;
        var m = this.posTop() + ((this.pageHeight() - n) / 2) - 12;
        var g = this.posLeft() + ((this.pageWidth() - f) / 2) - 12;
        var a = this.obbx;
        a.style.top = (m < 0 ? 0 : m) + d;
        a.style.left = (g < 0 ? 0 : g) + d;
        a.style.width = f + d;
        a.style.height = n + d;
        this.inf(j);
        a.style.display = k;
        this.width = f;
        this.height = n;
        return false
    }
}
if (!Ozone.util.ErrorDlg) {
    Ozone.util.ErrorDlg = {};
    Ozone.util.ErrorDlg.show = function(c, b, a) {
        if (!this.dlgBox) {
            this.dlgBox = new Ozone.util.ModalBox()
        }
        this.dlgBox.show(c, b, a)
    }
}
Ozone.util.fireBrowserEvent = function(e, c, b, a) {
    if (document.createEvent) {
        var d = document.createEvent("Events");
        d.initEvent(c, b || true, a || true);
        e.dispatchEvent(d)
    } else {
        if (document.createEventObject) {
            e.fireEvent("on" + c)
        }
    }
};
Ozone.util.cloneDashboard = function(e, j, g) {
    var f = Ozone.util.toString(e);
    if (j === true) {
        var d = guid.util.guid(),
            b = e.guid;
        f = f.replace(new RegExp(b, "g"), d);
        dashboardStrCopy = f;
        var a = /\"uniqueId\"\:\"([A-Fa-f\d]{8}-[A-Fa-f\d]{4}-[A-Fa-f\d]{4}-[A-Fa-f\d]{4}-[A-Fa-f\d]{12})\"/g;
        var k;
        while ((k = a.exec(dashboardStrCopy)) != null) {
            f = f.replace(new RegExp(k[1], "g"), guid.util.guid())
        }
    }
    var h = Ozone.util.parseJson(f);
    if (g === true) {
        var c = function(n) {
            if (!n || !n.items) {
                return
            }
            if (n.items.length === 0 && n.widgets) {
                for (var o = 0, m = n.widgets.length; o < m; o++) {
                    delete n.widgets[o].launchData
                }
            } else {
                for (var o = 0, m = n.items.length; o < m; o++) {
                    c(n.items[o])
                }
            }
        };
        c(h.layoutConfig)
    }
    return h
};
Ozone.util.createRequiredLabel = function(a) {
    return "<span class='required-label'>" + a + " <span class='required-indicator'>*</span></span>"
};
var guid = guid || {};
var Ozone = Ozone || {};
Ozone.util = Ozone.util || {};
guid.util = function() {
    function a() {
        return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
    }
    return {
        guid: function() {
            return (a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a())
        }
    }
}();
Ozone.util.guid = function() {
    return guid.util.guid()
};
Ozone = Ozone || {};
Ozone.components = Ozone.components || {};
Ozone.components.keys = Ozone.components.keys || {};
Ozone.components.keys.EVENT_NAME = "keyup";
Ozone.components.keys.HotKeys = Ozone.components.keys.HotKeys || {};
Ozone.components.keys.MoveHotKeys = Ozone.components.keys.MoveHotKeys || {};
(function() {
    var a = Ozone.components.keys.HotKeys;
    a.SETTINGS = {
        key: "S".charCodeAt(0),
        exclusive: true
    };
    a.ADMINISTRATION = {
        key: "A".charCodeAt(0),
        exclusive: true
    };
    a.MARKETPLACE = {
        key: "M".charCodeAt(0),
        exclusive: true
    };
    a.METRIC = {
        key: "R".charCodeAt(0),
        exclusive: true
    };
    a.LAUNCH_MENU = {
        key: "L".charCodeAt(0)
    };
    a.HELP = {
        key: "H".charCodeAt(0),
        exclusive: true
    };
    a.LOGOUT = {
        key: "O".charCodeAt(0)
    };
    a.PREVIOUS_DASHBOARD = {
        key: owfdojo.keys.PAGE_UP
    };
    a.NEXT_DASHBOARD = {
        key: owfdojo.keys.PAGE_DOWN
    };
    a.DASHBOARD_SWITCHER = {
        key: "C".charCodeAt(0),
        exclusive: true
    };
    a.WIDGET_SWITCHER = {
        key: "Q".charCodeAt(0),
        exclusive: true
    };
    a.DEFAULT_DASHBOARD = {
        key: owfdojo.keys.HOME
    };
    a.CLOSE_WIDGET = {
        key: "W".charCodeAt(0)
    };
    a.MAXIMIZE_COLLAPSE_WIDGET = {
        key: owfdojo.keys.UP_ARROW,
        focusParent: false
    };
    a.MINIMIZE_EXPAND_WIDGET = {
        key: owfdojo.keys.DOWN_ARROW,
        focusParent: false
    };
    a.ESCAPE_FOCUS = {
        key: owfdojo.keys.ESCAPE,
        alt: false,
        shift: false
    };
    var b = {};
    for (var c in a) {
        var e = a[c];
        if (e.alt === undefined) {
            e.alt = true
        }
        if (e.shift === undefined) {
            e.shift = true
        }
        if (e.focusParent === undefined) {
            e.focusParent = true
        }
        b[e.key] = e
    }
    owfdojo.connect(document, "onkeydown", function(f) {
        var g = b[f.keyCode];
        if (g && f.altKey === g.alt && f.shiftKey === g.shift) {
            f.preventDefault()
        }
    });
    var d = Ozone.components.keys.MoveHotKeys;
    d.MOVE_UP = {
        key: owfdojo.keys.UP_ARROW
    };
    d.MOVE_RIGHT = {
        key: owfdojo.keys.RIGHT_ARROW
    };
    d.MOVE_DOWN = {
        key: owfdojo.keys.DOWN_ARROW
    };
    d.MOVE_LEFT = {
        key: owfdojo.keys.LEFT_ARROW
    };
    for (c in d) {
        var e = d[c];
        if (e.ctrl === undefined) {
            e.ctrl = true
        }
        if (e.alt === undefined) {
            e.alt = false
        }
        if (e.shift === undefined) {
            e.shift = false
        }
        if (e.focusParent === undefined) {
            e.focusParent = false
        }
    }
})();
Ozone = Ozone || {};
Ozone.components = Ozone.components || {};
Ozone.components.keys = Ozone.components.keys || {};
Ozone.components.keys.createKeyEventSender = function(b) {
    var d = "_keyEvent",
        c = gadgets.rpc,
        a = c.call;
    c.register("_focus_widget_window", function() {
        try {
            window.focus()
        } catch (f) {}
    });
    a("..", "_widget_iframe_ready", null, b.getWidgetId());
    owfdojo.connect(document, "on" + Ozone.components.keys.EVENT_NAME, this, function(e) {
        var h = Ozone.components.keys.HotKeys,
            f, j = false;
        for (var g in h) {
            f = h[g];
            if (f.key === e.keyCode && f.alt === e.altKey && f.shift === e.shiftKey) {
                if (f.focusParent === true) {
                    parent.focus()
                }
                a("..", "_key_eventing", null, b.getWidgetId(), {
                    keyCode: e.keyCode,
                    altKey: e.altKey,
                    shiftKey: e.shiftKey,
                    focusParent: f.focusParent
                });
                j = true;
                break
            }
        }
        if (j === true) {
            return
        }
        h = Ozone.components.keys.MoveHotKeys;
        for (var g in h) {
            f = h[g];
            if (f.key === e.keyCode && f.ctrl === e.ctrlKey && f.alt === e.altKey && f.shift === e.shiftKey) {
                a("..", "_key_eventing", null, b.getWidgetId(), {
                    keyCode: e.keyCode,
                    ctrlKey: e.ctrlKey,
                    altKey: e.altKey,
                    shiftKey: e.shiftKey,
                    focusParent: f.focusParent
                });
                break
            }
        }
    });
    owfdojo.connect(document, "onkeydown", this, function(e) {
        var h = Ozone.components.keys.MoveHotKeys,
            f;
        for (var g in h) {
            f = h[g];
            if (f.key === e.keyCode && f.ctrl === e.ctrlKey && f.alt === e.altKey && f.shift === e.shiftKey) {
                a("..", "_key_eventing", null, b.getWidgetId(), {
                    keyCode: e.keyCode,
                    ctrlKey: e.ctrlKey,
                    altKey: e.altKey,
                    shiftKey: e.shiftKey,
                    keydown: true,
                    focusParent: f.focusParent
                });
                break
            }
        }
    })
};
var Ozone = Ozone || {};
Ozone.layout = Ozone.layout || {};
Ozone.ux = Ozone.ux || {};
Ozone.util = Ozone.util || {};
Ozone.lang = {
    languageSetting: "en-US",
    regexLeadingTailingSpaceChars: /^\s+|\s+$/g,
    regexTrailingSpaceChars: /\s+$/,
    regexLeadingSpaceChars: /^\s+/,
    version: Ozone.version.owfversion + Ozone.version.language,
    urlDecode: function(f, h) {
        if (!f || !f.length) {
            return {}
        }
        var d = {};
        var b = f.split("&");
        var c, a, j;
        for (var e = 0, g = b.length; e < g; e++) {
            c = b[e].split("=");
            a = decodeURIComponent(c[0]);
            j = decodeURIComponent(c[1]);
            if (h !== true) {
                if (typeof d[a] == "undefined") {
                    d[a] = j
                } else {
                    if (typeof d[a] == "string") {
                        d[a] = [d[a]];
                        d[a].push(j)
                    } else {
                        d[a].push(j)
                    }
                }
            } else {
                d[a] = j
            }
        }
        return d
    },
    getLanguage: function() {
        var b = Ozone.lang.urlDecode(window.location.search.substring(1));
        if (b.lang) {
            return b.lang
        } else {
            if (Ozone.util.parseWindowNameData) {
                var a = Ozone.util.parseWindowNameData();
                if (a != null && a.lang) {
                    return a.lang
                }
            }
        }
        return Ozone.lang.languageSetting
    }
};
Ozone.layout.Menu = {
    overflowMenuButtonTooltip: "Click to show more buttons"
};
Ozone.layout.ConfigurationWindowString = {
    setAsNew: "Save as new",
    setAsDefault: "Set as default",
    showCarousel: "Show Launch Menu",
    showShortcuts: "Show Shortcuts",
    showToolbar: "Show toolbar options",
    documentTitle: "Document Title",
    topSelector: "Top",
    centerSelector: "Center",
    accordionSelector: "Accordion",
    toolbarButtons: "Toolbar Buttons",
    clear: "Clear",
    save: "OK",
    cancel: "Cancel",
    clearAll: "Clear All",
    column: "Column",
    columns: "Columns",
    tab: "Tab",
    tabs: "Tabs"
};
Ozone.layout.CreateViewWindowString = {
    createNew: "Create new",
    createFromExisiting: "Create from existing",
    importView: "Import"
};
Ozone.layout.ManageViewsWindowString = {
    languages: "Language"
};
Ozone.layout.ToolbarString = {
    configurationManager: "Configuration Manager"
};
Ozone.layout.DesktopWindowManagerString = {
    configureDashboard: "Configure Dashboard",
    toggleCarousel: "Toggle Launch Menu",
    welcomeMessage: "Welcome"
};
Ozone.layout.tooltipString = {
    widgetLaunchMenuTitle: "Launch Menu",
    manageDashboardsTitle: "Dashboard Settings",
    manageDashboardsContent: "This screen allows users to rearrange, edit, and delete dashboards. It also allows users to set their language preference.",
    createDashboardTitle: "Create Dashboard",
    createDashboardContent: "This screen allows users to create blank dashboards, copy an existing dashboard, or import a dashboard from a shared configuration.",
    addWidgetsTitle: "Launch Menu (Alt+Shift+L)",
    addWidgetsContent: "This button opens or closes the Launch Menu, allowing users to add widgets to their current dashboard.",
    dashboardSwitcherTitle: "Switcher (Alt+Shift+C)",
    dashboardSwitcherContent: "This button opens or closes the Switcher, allowing users to switch between their dashboards.",
    marketplaceWindowTitle: "Marketplace (Alt+Shift+M)",
    marketplaceWindowContent: "This button opens the Marketplace window, allowing users to discover widgets in Marketplace and add them to their OWF instance.",
    metricWindowTitle: "Metric (Alt+Shift+R)",
    metricWindowContent: "This button opens the Metric window, where widgets that monitor OWF and widget statistics are located.",
    settingsTitle: "Settings (Alt+Shift+S)",
    settingsContent: "This button opens the Settings window, allowing users to customize their widgets or change themes.",
    adminToolsTitle: "Administration (Alt+Shift+A)",
    adminToolsContent: "This button opens the Administration window, exposing administrators to functionality for managing groups, dashboards, widgets, and users.",
    helpTitle: "Help (Alt+Shift+H)",
    helpContent: "This button opens the Help window, allowing users to browse help files for assistance on using OWF.",
    shareTitle: "Share Dashboard",
    shareContent: "This feature allows a user to export their current dashboard so that other users can import it.",
    customizeDashboardTitle: "Customize Dashboard",
    customizeDashboardContent: "This screen allows users to customize the current dashboard.",
    eventingTitle: "Dynamic Eventing",
    eventingContent: "This screen allows users to manage dynamic widget eventing.",
    themeSelectorTitle: "Change the styling of your OWF",
    themeSelectorContent: "This screen allows users to change the background, window color and style for OWF.",
    showBannerTitle: "Show/Hide Banner",
    showBannerContent: "This button shows and hides the bottom two rows of the dashboard banner.",
    carouselCloseContent: "This button closes the widget Launch Menu.",
    carouselCloseTitle: "Close Launch Menu",
    carouselManageWidgetsTitle: "Widget Settings",
    carouselManageWidgetsContent: "This screen allows users to customize their Launch Menu, controlling which widgets are visible and the order in which they appear. It also allows for the deletion of widgets and contains a link to the OWF Marketplace. The grouping tags of a widget can also be modified in this screen.",
    adminWDEditTitle: "Edit Widget Definition",
    adminWDEditContent: "Change the properties of a widget definition. Note that while properties such as URLs will propagate to already existing instances of a widget, malleable properties such as height will not be affected.",
    adminWDDeleteTitle: "Delete Widget Definition",
    adminWDDeleteContent: "Deletes the selected widget definition. In addition to removing the definition itself, all instances of this widget will be removed from all user dashboards.",
    adminDashAddTitle: "Add Dashboard",
    adminPWDApplyTitle: "Apply User Widgets",
    adminPWDApproveTitle: "Approve User Widgets",
    adminDashCopyTitle: "Copy Dashboard",
    adminDashCopyContent: "Copy an existing dashboard to one or more users. Note that once copied, each dashboard instance is an independent entity. Changes made to the initial dashboard at a later date will not be copied.",
    adminDashEditTitle: "Edit Dashboard",
    adminDashEditContent: "Changes the properties of a dashboard. Note that dashboard state is represented as a JSON object, and any changes made to it must be valid JSON.",
    adminDashDeleteTitle: "Delete Dashboard",
    adminDashDeleteContent: "Deletes the selected dashboard. Note that if a user is currently using the dashboard, they will not be kicked out. However, it will not be available once they navigate away.",
    adminPrefsCopyTitle: "Copy Preference",
    adminPrefsCopyContent: "Copy an existing preference to one or more users. Note that once copied, each preference instance is an independent entity. Changes made to the initial preference at a later date will not be copied.",
    adminPrefsEditTitle: "Edit Preference",
    adminPrefsEditContent: "Changes the properties of a preference.",
    adminPrefsDeleteTitle: "Delete Preference.",
    adminPrefsDeleteContent: "Deletes the selected preference.",
    adminUsersEditTitle: "Edit User",
    adminUsersEditContent: "Changes the properties of a user. Note that this does not edit any user information in an underlying security implementation. Only the information that is stored in the framework itself will be changed.",
    adminUsersDeleteTitle: "Delete User",
    adminUsersDeleteContent: "Deletes a given user from the framework. Note that this does not delete the user information in an underlying security implementation. Only the user information that is stored in the framework itself will be removed. In addition, it is possible that with certain security implementations such as x509 certificates, a user will be re-created by the framework if they successfully authenticate.",
    adminUserWidgetsDeleteTitle: "Delete User Widget",
    adminUserWidgetsDeleteContent: "Removes access to this widget for a given user. Please note that this will not delete the underlying widget definition - other users will still have access.",
    clearConnectionsTitle: "Clear All Connections",
    clearConnectionsContent: "Removes all directed dynamic eventing connections between the widgets on this dashboard.",
    bannerDockTitle: "Dock",
    bannerDockContent: "Dock toolbar to banner at top of page.",
    bannerUndockTitle: "Undock",
    bannerUndockContent: "Undock toolbar to floating position and hide banner."
};
Ozone.layout.admin = {
    updateDashboardTitle: "Update Dashboard",
    dashboardUpdatedContent: "Dashboard updated successfully."
};
Ozone.ux.DashboardMgmtString = {
    createDashboard: "Create a Dashboard",
    selectDashboardDotDot: "Select a dashboard...",
    deleteDashboard: "Delete a Dashboard",
    importaDashboard: "Import a Dashboard",
    exportDashboard: "Export Current Dashboard",
    exportDashboardConfig: "Export Dashboard Configuration",
    uploadConfig: "Upload...",
    setAsDefault: "Set as default",
    dashboards: "Dashboards",
    title: "Title",
    layout: "Layout",
    description: "Description",
    top: "Top",
    bottom: "Bottom",
    columns: "Columns",
    arrangement: "Arrangement",
    selectDashboard: "Select Dashboard",
    accordion: "Accordion",
    portal: "Portal",
    tabbed: "Tabbed",
    desktop: "Desktop",
    fit: "Fit",
    tooltipManageDashboards: "Dashboard Settings",
    tooltipCreateDashboard: "Create Dashboard",
    ok: "OK",
    reset: "Reset",
    about: "About",
    logout: "Logout",
    importDashboard: "Import Dashboard",
    dashboardTitle: "Dashboard Title",
    enterDashboardTitle: "Enter Dashboard Title...",
    browse: "Browse...",
    loadDefaultMsg: "Load Default Configuration?",
    noDashboardSelectedMsg: "No configuration was selected.  Do you want to load the default configuration?",
    changeLanguage: "Change Language",
    es: "Spanish",
    en_US: "English",
    ko: "Korean"
};
Ozone.layout.AccordionWindowManagerString = {
    configureAccordion: "Configure Accordion"
};
Ozone.layout.PortalWindowManagerString = {
    configurePortlets: "Configure Portlets"
};
Ozone.layout.TabbedWindowManagerString = {
    configureTabs: '<span class="configureTabButton">Configure Tabs</span>'
};
Ozone.util.ErrorMessageString = {
    errorTitle: "Error",
    dashboardConfig: "Dashboard Configuration",
    widgetConfiguration: "Widget Configuration",
    noWidgets: "There are no widgets to which you have access.",
    configurationMsg: "Failed to retrieve configuration data",
    dashboardBlankMsg: "Invalid Dashboard Name, it cannot be blank. <br />Please provide a valid Dashboard Name.",
    dashboardInvalidEntryMsg: "Unable to update dashboard name(s) due <br/>to invalid characters.",
    invalidForm: "Invalid Form",
    invalidFormMsg: "Form is invalid.  Please make sure all required fields are completed.",
    languagePreference: "Language Preference",
    languagePreferenceMsg: "Error saving language preference",
    settingSessionDataMsg: "Error setting session data",
    retrievingSessionDataMsg: "Error retrieving session data",
    saveUserPreferences: "Error saving user preference",
    storeErrorMsg: "Store Error Message",
    sendAndForget: "Send and Forget",
    userName: "User Name",
    updateDashboardMsg: "Error updating dashboard",
    saveUpdatedViews: "Update Dashboards",
    saveUpdatedViewsMsg: "Error updating Dashboards",
    saveUpdatedWidgets: "Update Widgets",
    saveUpdatedWidgetsMsg: "Error updating widgets",
    retrieveUpdatedWidgets: "Retrieving Updated Widgets",
    retrieveUpdatedWidgetsMsg: "Error retrieving updated widgets",
    invalidUrl: "Invalid Url",
    invalidUrlMsg: "The dashboard can not be found. It may have been deleted. You will be redirected to your default dashboard.",
    invalidDashboard: "Invalid Dashboard Id",
    invalidDashboardGotoDefaultMsg: "The dashboard can not be found. It may have been deleted. You will be redirected to your default dashboard.",
    invalidDashboardMsg: "The dashboard can not be found. It may have been deleted. You will be redirected to the previous dashboard",
    invalidDashboardNameMsg: "Dashboard name is invalid.  It cannot include start or end with a space.",
    leadingOrTrailingWhiteSpacesMsg: "Leading or trailing spaces around dashboard name are not allowed",
    logoutError: "Logout Error",
    logoutErrorMsg: "Please close your browser to ensure logout success.",
    widgetName: "Widget Name",
    maximumLength: "The maximum length for this field is {0}",
    about: "About",
    aboutErrorMsg: "Error retrieving application information.",
    widgetNotApproved: "This widget has not yet been approved for use.  Please see a system administrator for approval.",
    restrictedTagError: " is a restricted tag.  You may not edit it or add it to other widgets",
    mpErrorTitle: "Marketplace Error",
    mpErrorMsg: "There has been an error accessing Marketplace. Please contact your System Administrator to verify that Marketplace connectivity has been correctly configured and that the Marketplace server is currently running.",
    oneSingleton: "Only one instance of a Singleton is permitted"
};
Ozone.layout.MessageBoxButtonText = {
    ok: "OK",
    cancel: "Cancel",
    yes: "Yes",
    no: "No"
};
Ozone.layout.DialogMessages = {
    update: "Update",
    updating: "Updating...",
    updated: "Updated",
    add: "Add",
    adding: "Adding...",
    added: "Added",
    added_colon: "Added:",
    added_successfully: "added successfully",
    copy: "Copy",
    copying: "Copying...",
    copied: "Copied",
    cancel: "Cancel",
    ok: "OK",
    error: "Error",
    addWidget: "Add Widget",
    editWidget: "Edit Widget",
    removed_colon: "Removed:",
    retained_colon: "Retained:",
    applied_colon: "Applied:",
    updated_successfully: "updated successfully",
    added_for: "added for",
    formInvalid_CheckFieldMessages: "Form Invalid.<br />Check highlighted field messages (!).",
    formInvalid_SelectOneUser: "Form Invalid.<br />You need to select at least 1 user.",
    formInvalid_SelectOneWidget: "Form Invalid.<br />You need to select at least 1 widget.",
    view: "Dashboard",
    view_status: "Dashboard Status",
    view_dashboardNameField_label: "Dashboard name",
    view_dashboardNameField_blankText: "Please supply a Dashboard Name",
    view_dashboardStateField_label: "Configuration",
    view_dashboardStateField_blankText: "Please supply a Dashboard Configuration",
    view_dashboardGuidField_label: "GUID",
    view_dashboardLayoutField_label: "Layout",
    view_dashboardIsDefaultField_label: "Default",
    formError_saveView: "An error occurred while attempting to save a dashboard.",
    user: "User",
    users_opt: "user(s)",
    user_status: "User Status",
    user_usernameField_label: "User ID",
    user_usernameField_blankText: "Please supply a User ID",
    user_userRealNameField_label: "Name",
    user_userRealNameField_blankText: "Please supply a name for the user",
    formError_saveUser: "An error occurred while attempting to save a user.",
    preference: "Preference",
    preference_preferenceNameField_label: "Preference Name",
    preference_preferenceNameField_blankText: "Please supply a Preference Name",
    preference_preferenceNamespaceField_label: "Namespace",
    preference_preferenceNamespaceField_blankText: "Please supply a Preference Namespace",
    preference_preferenceValueField_label: "Value",
    preference_preferenceValueField_blankText: "Please supply a Preference Value",
    preference_status: "Preference Status",
    formError_savePreference: "An error occurred while attempting to save a preference.",
    widgetDefinition: "Widget Definition",
    widgetDefinition_status: "Widget Status",
    widgetDefinition_widgetAccess: "Widget Access",
    widgetDefinition_descriptorUrlField_blankText: "Please supply a Widget Descriptor URL",
    widgetDefinition_displayNameField_label: "Widget Name",
    widgetDefinition_widgetVersionField_label: "Version",
    widgetDefinition_displayNameField_blankText: "Please supply a Widget Name",
    widgetDefinition_widgetVersionField_blankText: "Please supply a Widget Version",
    widgetDefinition_widgetGuidField_label: "GUID",
    widgetDefinition_widgetUrlField_label: "URL",
    widgetDefinition_widgetUrlField_blankText: "Please supply a Widget URL",
    widgetDefinition_imageUrlSmallField_label: "Container Icon URL",
    widgetDefinition_imageUrlSmallField_blankText: "Please supply a Container Icon URL",
    widgetDefinition_imageLargeUrlField_label: "Launch Menu Icon URL",
    widgetDefinition_imageLargeUrlField_blankText: "Please supply a Launch Menu Icon URL",
    widgetDefinition_widthNumberField_label: "Width",
    widgetDefinition_widthNumberField_blankText: "Please supply a Widget width",
    widgetDefinition_heightNumberField_label: "Height",
    widgetDefinition_heightNumberField_blankText: "Please supply a Widget height",
    widgetDefinition_secureUrl_warningText: 'Entering a secure HTTPS address may prevent browser security warnings such as "This page contains unsecure content."',
    personWidgetDef_Apply: "Apply",
    personWidgetDef_Order: "Order",
    personWidgetDef_Widget: "Widget",
    personWidgetDef_WidgetAccessApplied: "Widget Access Applied",
    personWidgetDef_ApplyStatus: "Apply Status",
    personWidgetDef_NoChangesNecessary: "No changes were necessary",
    formError_savePersonDefWidgets: "An error occurred while attempting to save user widget(s).",
    formError_saveWidgetDefinition: "An error occurred while attempting to save the widget.",
    personWidgetDef_WidgetContainerPanelTitle: "Widgets",
    marketplaceWindow_AddWidget: "An error occurred while attempting to add the widget from Marketplace.",
    marketplaceWindow_currentUser: "Could not retrieve current user name and id.",
    marketplaceWindow_AddSuccessful: "The widget was added successfully from Marketplace",
    widgetAdded: "Selected widget is already added for this user",
    marketplaceWindow_RequiredListingsAlertMsg: "The widget you have launched will not work without some dependencies.  These widgets are listed below and will be additionally added to the launch menu.",
    fitPaneFullWarning: "You are attempting to add a widget to a pane with a single-widget layout. Continuing will replace the existing widget.",
    dashboardLockTitle: "Lock Dashboard",
    dashboardLockWarning: "Locking this dashboard disables the Launch Menu. New widgets cannot be launched or added to this layout. Do you still want to lock this dashboard?",
    dashboardLockAlertTitle: "Locked Dashboard",
    dashboardLockAlert: "This dashboard is locked. Widgets cannot be added or removed from a locked dashboard.",
    closeBackgroundWidgetWarning: " is a background widget. You won’t see it on your screen because it runs behind the scenes.<br/><br/>To close the widget, click OK."
};
Ozone.layout.ThemeSwitcherWindowConstants = {
    title: "Theme Settings",
    header: "Change the styling of your OWF",
    subheader: "Select a theme below to change the background, window color, and style for OWF.",
    ok: "OK",
    cancel: "Cancel"
};
Date.CultureInfo = {
    name: "en-US",
    englishName: "English (United States)",
    nativeName: "English (United States)",
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    abbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    shortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    firstLetterDayNames: ["S", "M", "T", "W", "T", "F", "S"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    amDesignator: "AM",
    pmDesignator: "PM",
    firstDayOfWeek: 0,
    twoDigitYearMax: 2029,
    dateElementOrder: "mdy",
    formatPatterns: {
        shortDate: "M/d/yyyy",
        longDate: "dddd, MMMM dd, yyyy",
        shortTime: "h:mm tt",
        longTime: "h:mm:ss tt",
        fullDateTime: "dddd, MMMM dd, yyyy h:mm:ss tt",
        sortableDateTime: "yyyy-MM-ddTHH:mm:ss",
        universalSortableDateTime: "yyyy-MM-dd HH:mm:ssZ",
        rfc1123: "ddd, dd MMM yyyy HH:mm:ss GMT",
        monthDay: "MMMM dd",
        yearMonth: "MMMM, yyyy"
    },
    regexPatterns: {
        jan: /^jan(uary)?/i,
        feb: /^feb(ruary)?/i,
        mar: /^mar(ch)?/i,
        apr: /^apr(il)?/i,
        may: /^may/i,
        jun: /^jun(e)?/i,
        jul: /^jul(y)?/i,
        aug: /^aug(ust)?/i,
        sep: /^sep(t(ember)?)?/i,
        oct: /^oct(ober)?/i,
        nov: /^nov(ember)?/i,
        dec: /^dec(ember)?/i,
        sun: /^su(n(day)?)?/i,
        mon: /^mo(n(day)?)?/i,
        tue: /^tu(e(s(day)?)?)?/i,
        wed: /^we(d(nesday)?)?/i,
        thu: /^th(u(r(s(day)?)?)?)?/i,
        fri: /^fr(i(day)?)?/i,
        sat: /^sa(t(urday)?)?/i,
        future: /^next/i,
        past: /^last|past|prev(ious)?/i,
        add: /^(\+|after|from)/i,
        subtract: /^(\-|before|ago)/i,
        yesterday: /^yesterday/i,
        today: /^t(oday)?/i,
        tomorrow: /^tomorrow/i,
        now: /^n(ow)?/i,
        millisecond: /^ms|milli(second)?s?/i,
        second: /^sec(ond)?s?/i,
        minute: /^min(ute)?s?/i,
        hour: /^h(ou)?rs?/i,
        week: /^w(ee)?k/i,
        month: /^m(o(nth)?s?)?/i,
        day: /^d(ays?)?/i,
        year: /^y((ea)?rs?)?/i,
        shortMeridian: /^(a|p)/i,
        longMeridian: /^(a\.?m?\.?|p\.?m?\.?)/i,
        timezone: /^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt)/i,
        ordinalSuffix: /^\s*(st|nd|rd|th)/i,
        timeContext: /^\s*(\:|a|p)/i
    },
    abbreviatedTimeZoneStandard: {
        GMT: "-000",
        EST: "-0400",
        CST: "-0500",
        MST: "-0600",
        PST: "-0700"
    },
    abbreviatedTimeZoneDST: {
        GMT: "-000",
        EDT: "-0500",
        CDT: "-0600",
        MDT: "-0700",
        PDT: "-0800"
    }
};
var Ozone = Ozone || {};
Ozone.util = Ozone.util || {};
Ozone.util.Transport = {
    version: Ozone.version.owfversion + Ozone.version.preference
};
Ozone.util.Transport.send = function(b) {
    if (Ozone.log) {
        Ozone.log.getDefaultLogger().debug("Transport Send", b.url, b.method, b.content)
    }
    var a = function(k) {
        if (k == undefined || k == null) {
            k = ""
        }
        var m = k.indexOf("<body");
        if (m > -1) {
            m = k.indexOf(">", m) + 1;
            var e = k.indexOf("</body>", m);
            if (e > -1) {
                k = k.substring(m, e)
            } else {
                k = k.substring(m)
            }
        }
        if (!Ozone.Msg) {
            Ozone.util.ErrorDlg.show(k, 200, 50)
        } else {
            Ozone.Msg.alert("Server Error", k, null, this, {
                cls: "owfAlert"
            })
        }
    };
    if (!b.onFailure) {
        b.onFailure = function(e) {
            a(e)
        }
    }
    var h = b.method;
    var g = false;
    if (h == "PUT" || h == "DELETE") {
        h = "POST"
    }
    if (h == "POST") {
        g = true
    }
    if (b.content == null) {
        b.content = {}
    }
    if (!(b.autoSendVersion === false)) {
        b.content.version = Ozone.util.Transport.version
    }
    if (b.content.state) {
        b.content.state = Ozone.util.toString(b.content.state)
    }
    var f = b.content;
    var d = "json";
    if (b.handleAs != null) {
        d = b.handleAs
    }
    if (Ozone.util.isUrlLocal(b.url) && !b.forceXdomain) {
        return owfdojo.xhr(h.toUpperCase(), {
            url: b.url,
            content: b.content,
            preventCache: true,
            sync: b.async == false ? true : false,
            timeout: b.timeout ? b.timeout : 0,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            load: function(m, k) {
                if (Ozone.log) {
                    Ozone.log.getDefaultLogger().debug("Transport AJAX Return", m)
                }
                if (d == "json") {
                    try {
                        var n = Ozone.util.parseJson(m);
                        b.onSuccess(n)
                    } catch (o) {
                        b.onFailure(o.name + " : " + o.message)
                    }
                } else {
                    b.onSuccess(m)
                }
            },
            error: function(k, e) {
                if (k.dojoType == "cancel") {
                    return
                }
                if (k.status != 0) {
                    if (b.ignoredErrorCodes != null && b.ignoredErrorCodes.length > 0 && owfdojo.indexOf(b.ignoredErrorCodes, k.status) > -1) {
                        b.onSuccess({})
                    } else {
                        b.onFailure(k.responseText, k.status)
                    }
                }
            }
        }, g)
    } else {
        try {
            var h = b.method;
            if (h == "PUT" || h == "DELETE") {
                h = "POST"
            }
            var c = owfdojox.io.windowName.send(h.toUpperCase(), {
                url: b.url,
                content: f,
                preventCache: true,
                timeout: b.timeout ? b.timeout : 20000,
                load: function(e) {
                    try {
                        var k = null;
                        if (e && typeof(e) === "string") {
                            k = Ozone.util.parseJson(e)
                        } else {
                            k = e
                        } if (k && k.message && k.message == "Timeout") {
                            return b.onFailure("Error: Request timed out")
                        }
                        if (k.status === 200) {
                            if (Ozone.log) {
                                Ozone.log.getDefaultLogger().debug("Transport AJAX Return", k.data)
                            }
                            if (d == "json") {
                                b.onSuccess(k.data)
                            } else {
                                b.onSuccess(e)
                            }
                        } else {
                            if (k.status === 500 || k.status === 401) {
                                b.onFailure(k.data)
                            } else {
                                if (b.ignoredErrorCodes != null && b.ignoredErrorCodes.length > 0 && owfdojo.indexOf(b.ignoredErrorCodes, k.status) > -1) {
                                    b.onSuccess({})
                                } else {
                                    b.onFailure(k.data, k.status)
                                }
                            }
                        }
                        return k
                    } catch (m) {
                        b.onFailure(m.name + " : " + m.message)
                    }
                },
                error: function(e) {
                    if (e.dojoType == "cancel") {
                        return
                    }
                    if (e instanceof Error) {
                        b.onFailure(e.name + " : " + e.message)
                    } else {
                        b.onFailure(e)
                    }
                }
            });
            return c
        } catch (j) {
            b.onFailure(j.name + " : " + j.message)
        }
    }
};
Ozone.util.Transport.sendAndForget = function(a) {
    var a = a;
    if (Ozone.log) {
        Ozone.log.getDefaultLogger().debug("Transport SendAndForget", a.url, a.method, a.content)
    }
    var f = a.method;
    if (f == "PUT" || f == "DELETE") {
        f = "POST"
    }
    var d = false;
    if (f == "POST") {
        d = true
    }
    if (a.content == null) {
        a.content = {}
    }
    if (a.autoSendVersion === false) {
        a.content.version = Ozone.util.Transport.version
    }
    if (a.content.state) {
        a.content.state = Ozone.util.toString(a.content.state)
    }
    var c = null;
    if (f == "GET") {
        c = owfdojo.objectToQuery(a.content)
    } else {
        c = a.content
    } if (Ozone.util.isUrlLocal(a.url)) {
        owfdojo.xhr(f.toUpperCase(), {
            url: a.url,
            content: a.content,
            preventCache: true,
            sync: a.async == false ? false : true
        }, d)
    } else {
        try {
            var f = a.method;
            if (f == "PUT" || f == "DELETE") {
                f = "POST"
            }
            var b = owfdojox.io.windowName.send(f.toUpperCase(), {
                url: a.url,
                content: c,
                preventCache: true
            })
        } catch (g) {
            if (!Ozone.Msg) {
                Ozone.util.ErrorDlg.show(Ozone.util.ErrorMessageString.sendAndForget, g.name + " : " + g.message, 200, 50)
            } else {
                Ozone.Msg.alert(Ozone.util.ErrorMessageString.sendAndForget, g.name + " : " + g.message)
            }
        }
    }
};
Ozone.util.Transport.sendToFirst = function(a) {
    var b = a.urls.shift();
    if (b === undefined) {
        if (a.onLastFailure !== undefined) {
            a.onLastFailure()
        }
        return
    }
    var c = function() {
        Ozone.util.Transport.sendToFirst({
            urls: a.urls,
            method: a.method,
            onSuccess: a.onSuccess,
            onLastFailure: a.onLastFailure,
            content: a.content
        })
    };
    Ozone.util.Transport.send({
        url: b,
        method: a.method,
        onSuccess: a.onSuccess,
        onFailure: c,
        content: a.content
    })
};
var Ozone = Ozone || {};
Ozone.util = Ozone.util || {};
Ozone.util.isInContainer = function() {
    var a = false;
    if (Ozone.util.parseJson) {
        var b = Ozone.util.parseWindowNameData();
        if (b != null) {
            a = true
        }
    }
    return a
};
Ozone.util.isRunningInOWF = function() {
    var a = false;
    if (Ozone.util.parseJson) {
        var b = Ozone.util.parseWindowNameData();
        if (b != null && b.owf) {
            a = true
        }
    }
    return a
};
Ozone.util.parseID = function(b, a) {
    return b.substring(0, a.length) == a ? b.substring(a.length) : b
};
Ozone.util.getFlashApp = function(a) {
    a = a || Ozone.dragAndDrop.WidgetDragAndDrop.getInstance().getFlashWidgetId();
    if (!a) {
        return
    }
    if (navigator.appName.indexOf("Microsoft") != -1) {
        return window[a]
    } else {
        return document[a]
    }
};
var gadgets = gadgets || {};
gadgets.util = function() {
    function f() {
        var m;
        var k = document.location.href;
        var h = k.indexOf("?");
        var j = k.indexOf("#");
        if (j === -1) {
            m = k.substr(h + 1)
        } else {
            m = [k.substr(h + 1, j - h - 1), "&", k.substr(j + 1)].join("")
        }
        return m.split("&")
    }
    var d = null;
    var c = {};
    var e = [];
    var a = {
        0: false,
        10: true,
        13: true,
        34: true,
        39: true,
        60: true,
        62: true,
        92: true,
        8232: true,
        8233: true
    };

    function b(h, j) {
        return String.fromCharCode(j)
    }

    function g(h) {
        c = h["core.util"] || {}
    }
    if (gadgets.config) {
        gadgets.config.register("core.util", null, g)
    }
    return {
        getUrlParameters: function() {
            if (d !== null) {
                return d
            }
            d = {};
            var n = f();
            var q = window.decodeURIComponent ? decodeURIComponent : unescape;
            for (var k = 0, h = n.length; k < h; ++k) {
                var p = n[k].indexOf("=");
                if (p === -1) {
                    continue
                }
                var o = n[k].substring(0, p);
                var m = n[k].substring(p + 1);
                m = m.replace(/\+/g, " ");
                d[o] = q(m)
            }
            return d
        },
        makeClosure: function(n, p, o) {
            var m = [];
            for (var k = 2, h = arguments.length; k < h; ++k) {
                m.push(arguments[k])
            }
            return function() {
                var q = m.slice();
                for (var s = 0, r = arguments.length; s < r; ++s) {
                    q.push(arguments[s])
                }
                return p.apply(n, q)
            }
        },
        makeEnum: function(j) {
            var m = {};
            for (var k = 0, h; h = j[k]; ++k) {
                m[h] = h
            }
            return m
        },
        getFeatureParameters: function(h) {
            return typeof c[h] === "undefined" ? null : c[h]
        },
        hasFeature: function(h) {
            return typeof c[h] !== "undefined"
        },
        registerOnLoadHandler: function(h) {
            e.push(h)
        },
        runOnLoadHandlers: function() {
            for (var k = 0, h = e.length; k < h; ++k) {
                e[k]()
            }
        },
        escape: function(h, o) {
            if (!h) {
                return h
            } else {
                if (typeof h === "string") {
                    return gadgets.util.escapeString(h)
                } else {
                    if (typeof h === "array") {
                        for (var n = 0, k = h.length; n < k; ++n) {
                            h[n] = gadgets.util.escape(h[n])
                        }
                    } else {
                        if (typeof h === "object" && o) {
                            var m = {};
                            for (var p in h) {
                                if (h.hasOwnProperty(p)) {
                                    m[gadgets.util.escapeString(p)] = gadgets.util.escape(h[p], true)
                                }
                            }
                            return m
                        }
                    }
                }
            }
            return h
        },
        escapeString: function(o) {
            var k = [],
                n, p;
            for (var m = 0, h = o.length; m < h; ++m) {
                n = o.charCodeAt(m);
                p = a[n];
                if (p === true) {
                    k.push("&#", n, ";")
                } else {
                    if (p !== false) {
                        k.push(o.charAt(m))
                    }
                }
            }
            return k.join("")
        },
        unescapeString: function(h) {
            return h.replace(/&#([0-9]+);/g, b)
        }
    }
}();
gadgets.util.getUrlParameters();
var gadgets = gadgets || {};
gadgets.json = function() {
    function f(n) {
        return n < 10 ? "0" + n : n
    }
    Date.prototype.toJSON = function() {
        return [this.getUTCFullYear(), "-", f(this.getUTCMonth() + 1), "-", f(this.getUTCDate()), "T", f(this.getUTCHours()), ":", f(this.getUTCMinutes()), ":", f(this.getUTCSeconds()), "Z"].join("")
    };
    var m = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    };

    function stringify(value) {
        var a, i, k, l, r = /["\\\x00-\x1f\x7f-\x9f]/g,
            v;
        switch (typeof value) {
            case "string":
                return r.test(value) ? '"' + value.replace(r, function(a) {
                    var c = m[a];
                    if (c) {
                        return c
                    }
                    c = a.charCodeAt();
                    return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16)
                }) + '"' : '"' + value + '"';
            case "number":
                return isFinite(value) ? String(value) : "null";
            case "boolean":
            case "null":
                return String(value);
            case "object":
                if (!value) {
                    return "null"
                }
                a = [];
                if (typeof value.length === "number" && !(value.propertyIsEnumerable("length"))) {
                    l = value.length;
                    for (i = 0; i < l; i += 1) {
                        a.push(stringify(value[i]) || "null")
                    }
                    return "[" + a.join(",") + "]"
                }
                for (k in value) {
                    if (value.hasOwnProperty(k)) {
                        if (typeof k === "string") {
                            v = stringify(value[k]);
                            if (v) {
                                a.push(stringify(k) + ":" + v)
                            }
                        }
                    }
                }
                return "{" + a.join(",") + "}"
        }
    }
    return {
        stringify: stringify,
        parse: function(text) {
            if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/b-u]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                return eval("(" + text + ")")
            }
            return false
        }
    }
}();
var gadgets = gadgets || {};
gadgets.rpc = function() {
    var C = "__cb";
    var I = "";
    var h = "__g2c_rpc";
    var f = "__c2g_rpc";
    var d = "GRPC____NIXVBS_wrapper";
    var o = "GRPC____NIXVBS_get_wrapper";
    var w = "GRPC____NIXVBS_handle_message";
    var G = "GRPC____NIXVBS_create_channel";
    var t = {};
    var n = {};
    var B = [];
    var J = {};
    var y = {};
    var v = {};
    var u = 0;
    var g = {};
    var j = {};
    var H = {};
    var b = {};
    if (gadgets.util) {
        b = gadgets.util.getUrlParameters()
    }
    v[".."] = b.rpctoken || b.ifpctok || 0;
    var r = 2000;
    var P = {};
    var s = {};

    function c() {
        return typeof window.postMessage === "function" ? "wpm" : typeof window.postMessage === "object" ? "wpm" : typeof document.postMessage === "function" ? "dpm" : window.ActiveXObject ? "nix" : navigator.product === "Gecko" ? "fe" : "ifpc"
    }

    function q() {
        if (p === "dpm" || p === "wpm") {
            var S = function(T) {
                M(gadgets.json.parse(T.data))
            };
            if (typeof window.addEventListener != "undefined") {
                window.addEventListener("message", S, false)
            } else {
                if (typeof window.attachEvent != "undefined") {
                    window.attachEvent("onmessage", S)
                }
            }
        }
        if (p === "nix") {
            if (typeof window[o] !== "unknown") {
                window[w] = function(T) {
                    M(gadgets.json.parse(T))
                };
                window[G] = function(T, V, U) {
                    if (v[T] == U) {
                        t[T] = V
                    }
                };
                var Q = "Class " + d + "\n Private m_Intended\nPrivate m_Auth\nPublic Sub SetIntendedName(name)\n If isEmpty(m_Intended) Then\nm_Intended = name\nEnd If\nEnd Sub\nPublic Sub SetAuth(auth)\n If isEmpty(m_Auth) Then\nm_Auth = auth\nEnd If\nEnd Sub\nPublic Sub SendMessage(data)\n " + w + "(data)\nEnd Sub\nPublic Function GetAuthToken()\n GetAuthToken = m_Auth\nEnd Function\nPublic Sub CreateChannel(channel, auth)\n Call " + G + "(m_Intended, channel, auth)\nEnd Sub\nEnd Class\nFunction " + o + "(name, auth)\nDim wrap\nSet wrap = New " + d + "\nwrap.SetIntendedName name\nwrap.SetAuth auth\nSet " + o + " = wrap\nEnd Function";
                try {
                    window.execScript(Q, "vbscript")
                } catch (R) {
                    p = "ifpc"
                }
            }
        }
    }
    var E = null;

    function N(Q) {
        if (Q.charAt(0) != "{") {
            return Q
        } else {
            var R = gadgets.json.parse(Q);
            var S = R.id;
            return gadgets.json.stringify({
                id: R.id
            })
        }
    }
    var p = c();
    q();
    n[I] = function() {};
    n[C] = function(R, Q) {
        var S = g[R];
        if (S) {
            delete g[R];
            S(Q)
        }
    };

    function K(R, Q) {
        if (j[R]) {
            return
        }
        if (p === "fe") {
            try {
                var T = document.getElementById(R);
                T[h] = function(V) {
                    M(gadgets.json.parse(V))
                }
            } catch (S) {}
        }
        if (p === "nix") {
            try {
                var T = document.getElementById(R);
                var U = window[o](R, Q);
                T.contentWindow.opener = U
            } catch (S) {}
        }
        j[R] = true
    }

    function k(S) {
        var U = gadgets.json.stringify;
        var Q = [];
        for (var T = 0, R = S.length; T < R; ++T) {
            Q.push(encodeURIComponent(U(S[T])))
        }
        return Q.join("&")
    }

    function M(R) {
        if (R && typeof R.s === "string" && typeof R.f === "string" && R.a instanceof Array) {
            R.f = N(R.f);
            if (v[R.f]) {
                if (v[R.f] != R.t) {
                    throw new Error("Invalid auth token.")
                }
            }
            if (R.c) {
                R.callback = function(S) {
                    gadgets.rpc.call(R.f, C, null, R.c, S)
                }
            }
            var Q = (n[R.s] || n[I]).apply(R, R.a);
            if (R.c && typeof Q != "undefined") {
                gadgets.rpc.call(R.f, C, null, R.c, Q)
            }
        }
    }

    function x(Q, T, W, U) {
        try {
            if (W != "..") {
                var S = t[".."];
                if (!S && window.opener && "GetAuthToken" in window.opener) {
                    S = window.opener;
                    if (S.GetAuthToken() == v[".."]) {
                        var R = v[".."];
                        S.CreateChannel(window[o]("..", R), R);
                        t[".."] = S;
                        window.opener = null
                    }
                }
                if (S) {
                    S.SendMessage(U);
                    return
                }
            } else {
                if (t[Q]) {
                    t[Q].SendMessage(U);
                    return
                }
            }
        } catch (V) {}
        F(Q, T, W, U)
    }

    function e(R, S, X, T, V) {
        try {
            if (X != "..") {
                var Q = window.frameElement;
                if (typeof Q[h] === "function") {
                    if (typeof Q[h][f] !== "function") {
                        Q[h][f] = function(Y) {
                            M(gadgets.json.parse(Y))
                        }
                    }
                    Q[h](T);
                    return
                }
            } else {
                var W = document.getElementById(R);
                if (typeof W[h] === "function" && typeof W[h][f] === "function") {
                    W[h][f](T);
                    return
                }
            }
        } catch (U) {}
        F(R, S, X, T, V)
    }

    function F(ab, Z, aa, V, X) {
        var T = gadgets.rpc.getRelayUrl(ab);
        if (!T) {
            throw new Error("No relay file assigned for IFPC")
        }
        var Q = null,
            R = [];
        if (y[ab]) {
            Q = [T, "#", k([aa, u, 1, 0, k([aa, Z, "", "", aa].concat(X))])].join("");
            R.push(Q)
        } else {
            Q = [T, "#", encodeURIComponent(ab), "&", aa, "@", u, "&"].join("");
            if (!s[ab]) {
                R.push([Q, 1, "&", 0, "&", , encodeURIComponent(V)].join(""))
            } else {
                var ac = encodeURIComponent(V),
                    W = r - Q.length,
                    Y = Math.ceil(ac.length / W),
                    U = 0,
                    S;
                while (ac.length > 0) {
                    S = ac.substring(0, W);
                    ac = ac.substring(W);
                    R.push([Q, Y, "&", U, "&", S].join(""));
                    U += 1
                }
            }
        }
        do {
            z(R.shift(), ab)
        } while (R.length > 0);
        return true
    }

    function a(Q) {
        if (!Q) {
            return false
        }
        if (Q == "..") {
            return false
        }
        var R = document.getElementById(Q);
        if (R) {
            return false
        }
        if (typeof _childWindows === "undefined") {
            return false
        }
        return true
    }
    window._childWindowMessageQueue = [];
    window._childWindowMessageId = 0;
    window._getChildWindowMessage = function(T) {
        var S = _childWindowMessageQueue;
        for (var R = 0; R < S.length; R++) {
            var Q = S[R];
            if (Q.id == T) {
                return Q
            }
        }
    };

    function m(Q, S) {
        for (var R = S - 1; R >= 0; --R) {
            if (typeof Q[R] === "undefined") {
                return false
            }
        }
        return true
    }

    function z(U, Q) {
        if (a(Q)) {
            var W = window._childWindowMessageId;
            W++;
            window._childWindowMessageQueue.push({
                id: W,
                target: Q,
                src: U
            });
            window._childWindowMessageId++;
            if (window._childWindowMessageQueue.length > 20) {
                window._childWindowMessageQueue.shift()
            }
            return
        }
        var S;
        for (var R = B.length - 1; R >= 0; --R) {
            var V = B[R];
            try {
                if (V && (V.recyclable || V.readyState === "complete")) {
                    V.parentNode.removeChild(V);
                    if (window.ActiveXObject) {
                        B[R] = V = null;
                        B.splice(R, 1)
                    } else {
                        V.recyclable = false;
                        S = V;
                        break
                    }
                }
            } catch (T) {}
        }
        if (!S) {
            S = document.createElement("iframe");
            S.style.border = S.style.width = S.style.height = "0px";
            S.style.visibility = "hidden";
            S.style.position = "absolute";
            S.onload = function() {
                this.recyclable = true
            };
            B.push(S)
        }
        S.src = U;
        setTimeout(function() {
            document.body.appendChild(S)
        }, 0)
    }

    function O(U) {
        if (typeof U === "undefined" || U === "..") {
            try {
                if (H[U] !== false && window.parent.opener) {
                    return window.parent.opener.parent
                }
            } catch (T) {}
            return window.parent
        }
        U = String(U);
        var S = null;
        S = document.getElementById(U);
        if (S && S.contentWindow) {
            return S.contentWindow
        }
        if (typeof _childWindows !== "undefined") {
            for (var Q = 0; Q < _childWindows.length; Q++) {
                var R = _childWindows[Q];
                try {
                    if (R.document) {
                        S = R.document.getElementById(U)
                    }
                } catch (T) {}
                if (S && S.contentWindow) {
                    return S.contentWindow
                }
            }
        }
        return null
    }

    function D(S, U) {
        var Q;
        if (H[S] !== false) {
            var T = O(S);
            try {
                Q = T.gadgets.rpc.receiveSameDomain
            } catch (R) {}
        }
        if (typeof Q === "function") {
            Q(U);
            H[S] = true;
            return true
        } else {
            H[S] = false
        }
        return false
    }
    if (gadgets.config) {
        function L(Q) {
            if (Q.rpc.parentRelayUrl.substring(0, 7) === "http://") {
                J[".."] = Q.rpc.parentRelayUrl
            } else {
                var U = document.location.search.substring(0).split("&");
                var T = "";
                for (var R = 0, S; S = U[R]; ++R) {
                    if (S.indexOf("parent=") === 0) {
                        T = decodeURIComponent(S.substring(7));
                        break
                    }
                }
                J[".."] = T + Q.rpc.parentRelayUrl
            }
            y[".."] = !!Q.rpc.useLegacyProtocol
        }
        var A = {
            parentRelayUrl: gadgets.config.NonEmptyStringValidator
        };
        gadgets.config.register("rpc", A, L)
    }
    return {
        register: function(R, Q) {
            if (R == C) {
                throw new Error("Cannot overwrite callback service")
            }
            if (R == I) {
                throw new Error("Cannot overwrite default service: use registerDefault")
            }
            n[R] = Q
        },
        unregister: function(Q) {
            if (Q == C) {
                throw new Error("Cannot delete callback service")
            }
            if (Q == I) {
                throw new Error("Cannot delete default service: use unregisterDefault")
            }
            delete n[Q]
        },
        registerDefault: function(Q) {
            n[""] = Q
        },
        unregisterDefault: function() {
            delete n[""]
        },
        call: function(Y, U, Z, X) {
            ++u;
            Y = N(Y) || "..";
            if (Z) {
                g[u] = Z
            }
            var W = "..";
            if (Y === "..") {
                W = N(window.name)
            }
            var S = {
                s: U,
                f: W,
                c: Z ? u : 0,
                a: Array.prototype.slice.call(arguments, 3),
                t: v[Y]
            };
            if (D(Y, S)) {
                return
            }
            var Q = gadgets.json.stringify(S);
            var R = p;
            if (y[Y]) {
                R = "ifpc"
            }
            switch (R) {
                case "dpm":
                    var V = O(Y);
                    var aa = V.document;
                    if (aa != null) {
                        try {
                            aa.postMessage(Q)
                        } catch (T) {
                            F(Y, U, W, Q, S.a)
                        }
                    }
                    break;
                case "wpm":
                    var V = O(Y);
                    if (V != null) {
                        try {
                            V.postMessage(Q, J[Y])
                        } catch (T) {
                            F(Y, U, W, Q, S.a)
                        }
                    }
                    break;
                case "nix":
                    x(Y, U, W, Q);
                    break;
                case "fe":
                    e(Y, U, W, Q, S.a);
                    break;
                default:
                    F(Y, U, W, Q, S.a);
                    break
            }
        },
        getRelayUrl: function(Q) {
            return J[Q]
        },
        setRelayUrl: function(R, Q, T, S) {
            J[R] = Q;
            y[R] = !!T;
            s[R] = !!S
        },
        setAuthToken: function(Q, R) {
            v[Q] = R;
            K(Q, R)
        },
        getRelayChannel: function() {
            return p
        },
        receive: function(Q) {
            if (Q.length > 4) {
                var V = Q[1],
                    U = parseInt(Q[2], 10),
                    S = parseInt(Q[3], 10),
                    T = Q[Q.length - 1],
                    R = U === 1;
                if (U > 1) {
                    if (!P[V]) {
                        P[V] = []
                    }
                    P[V][S] = T;
                    if (m(P[V], U)) {
                        T = P[V].join("");
                        delete P[V];
                        R = true
                    }
                }
                if (R) {
                    M(gadgets.json.parse(decodeURIComponent(T)))
                }
            }
        },
        receiveSameDomain: function(Q) {
            Q.a = Array.prototype.slice.call(Q.a);
            window.setTimeout(function() {
                M(Q)
            }, 0)
        }
    }
}();
var gadgets = gadgets || {};
gadgets.pubsub = (function() {
    var b = {};

    function a(e, c, d) {
        var f = b[e];
        if (typeof f === "function") {
            f(c, d, e)
        }
    }
    return {
        publish: function(e, d, c) {
            gadgets.rpc.call("..", "pubsub", null, "publish", e, d, c)
        },
        subscribe: function(c, d) {
            b[c] = d;
            gadgets.rpc.register("pubsub", a);
            gadgets.rpc.call("..", "pubsub", null, "subscribe", c)
        },
        unsubscribe: function(c) {
            delete b[c];
            gadgets.rpc.call("..", "pubsub", null, "unsubscribe", c)
        }
    }
})();
if (!Array.prototype.push) {
    Array.prototype.push = function() {
        for (var b = 0, a = arguments.length; b < a; b++) {
            this[this.length] = arguments[b]
        }
        return this.length
    }
}
if (!Array.prototype.shift) {
    Array.prototype.shift = function() {
        if (this.length > 0) {
            var c = this[0];
            for (var b = 0, a = this.length - 1; b < a; b++) {
                this[b] = this[b + 1]
            }
            this.length = this.length - 1;
            return c
        }
    }
}
if (!Array.prototype.splice) {
    Array.prototype.splice = function(h, e) {
        var b = this.slice(h + e);
        var c = this.slice(h, h + e);
        this.length = h;
        var f = [];
        for (var d = 0, a = arguments.length; d < a; d++) {
            f[d] = arguments[d]
        }
        var g = (f.length > 2) ? b = f.slice(2).concat(b) : b;
        for (d = 0, a = g.length; d < a; d++) {
            this.push(g[d])
        }
        return c
    }
}
var log4javascript;
(function() {
    function isUndefined(obj) {
        return typeof obj == "undefined"
    }

    function EventSupport() {}
    EventSupport.prototype = {
        eventTypes: [],
        eventListeners: {},
        setEventTypes: function(eventTypesParam) {
            if (eventTypesParam instanceof Array) {
                this.eventTypes = eventTypesParam;
                this.eventListeners = {};
                for (var i = 0, len = this.eventTypes.length; i < len; i++) {
                    this.eventListeners[this.eventTypes[i]] = []
                }
            } else {
                handleError("log4javascript.EventSupport [" + this + "]: setEventTypes: eventTypes parameter must be an Array")
            }
        },
        addEventListener: function(eventType, listener) {
            if (typeof listener == "function") {
                if (!array_contains(this.eventTypes, eventType)) {
                    handleError("log4javascript.EventSupport [" + this + "]: addEventListener: no event called '" + eventType + "'")
                }
                this.eventListeners[eventType].push(listener)
            } else {
                handleError("log4javascript.EventSupport [" + this + "]: addEventListener: listener must be a function")
            }
        },
        removeEventListener: function(eventType, listener) {
            if (typeof listener == "function") {
                if (!array_contains(this.eventTypes, eventType)) {
                    handleError("log4javascript.EventSupport [" + this + "]: removeEventListener: no event called '" + eventType + "'")
                }
                array_remove(this.eventListeners[eventType], listener)
            } else {
                handleError("log4javascript.EventSupport [" + this + "]: removeEventListener: listener must be a function")
            }
        },
        dispatchEvent: function(eventType, eventArgs) {
            if (array_contains(this.eventTypes, eventType)) {
                var listeners = this.eventListeners[eventType];
                for (var i = 0, len = listeners.length; i < len; i++) {
                    listeners[i](this, eventType, eventArgs)
                }
            } else {
                handleError("log4javascript.EventSupport [" + this + "]: dispatchEvent: no event called '" + eventType + "'")
            }
        }
    };
    var applicationStartDate = new Date();
    var uniqueId = "log4javascript_" + applicationStartDate.getTime() + "_" + Math.floor(Math.random() * 100000000);
    var emptyFunction = function() {};
    var newLine = "\r\n";
    var pageLoaded = false;

    function Log4JavaScript() {}
    Log4JavaScript.prototype = new EventSupport();
    log4javascript = new Log4JavaScript();
    log4javascript.version = "1.4.1";
    log4javascript.edition = "log4javascript";

    function toStr(obj) {
        if (obj && obj.toString) {
            return obj.toString()
        } else {
            return String(obj)
        }
    }

    function getExceptionMessage(ex) {
        if (ex.message) {
            return ex.message
        } else {
            if (ex.description) {
                return ex.description
            } else {
                return toStr(ex)
            }
        }
    }

    function getUrlFileName(url) {
        var lastSlashIndex = Math.max(url.lastIndexOf("/"), url.lastIndexOf("\\"));
        return url.substr(lastSlashIndex + 1)
    }

    function getExceptionStringRep(ex) {
        if (ex) {
            var exStr = "Exception: " + getExceptionMessage(ex);
            try {
                if (ex.lineNumber) {
                    exStr += " on line number " + ex.lineNumber
                }
                if (ex.fileName) {
                    exStr += " in file " + getUrlFileName(ex.fileName)
                }
            } catch (localEx) {
                logLog.warn("Unable to obtain file and line information for error")
            }
            if (showStackTraces && ex.stack) {
                exStr += newLine + "Stack trace:" + newLine + ex.stack
            }
            return exStr
        }
        return null
    }

    function bool(obj) {
        return Boolean(obj)
    }

    function trim(str) {
        return str.replace(/^\s+/, "").replace(/\s+$/, "")
    }

    function splitIntoLines(text) {
        var text2 = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        return text2.split("\n")
    }

    function urlEncode(str) {
        return escape(str).replace(/\+/g, "%2B").replace(/"/g, "%22").replace(/'/g, "%27").replace(/\//g, "%2F").replace(/=/g, "%3D")
    }

    function urlDecode(str) {
        return unescape(str).replace(/%2B/g, "+").replace(/%22/g, '"').replace(/%27/g, "'").replace(/%2F/g, "/").replace(/%3D/g, "=")
    }

    function array_remove(arr, val) {
        var index = -1;
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] === val) {
                index = i;
                break
            }
        }
        if (index >= 0) {
            arr.splice(index, 1);
            return true
        } else {
            return false
        }
    }

    function array_contains(arr, val) {
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] == val) {
                return true
            }
        }
        return false
    }

    function extractBooleanFromParam(param, defaultValue) {
        if (isUndefined(param)) {
            return defaultValue
        } else {
            return bool(param)
        }
    }

    function extractStringFromParam(param, defaultValue) {
        if (isUndefined(param)) {
            return defaultValue
        } else {
            return String(param)
        }
    }

    function extractIntFromParam(param, defaultValue) {
        if (isUndefined(param)) {
            return defaultValue
        } else {
            try {
                var value = parseInt(param, 10);
                return isNaN(value) ? defaultValue : value
            } catch (ex) {
                logLog.warn("Invalid int param " + param, ex);
                return defaultValue
            }
        }
    }

    function extractFunctionFromParam(param, defaultValue) {
        if (typeof param == "function") {
            return param
        } else {
            return defaultValue
        }
    }

    function isError(err) {
        return (err instanceof Error)
    }
    if (!Function.prototype.apply) {
        Function.prototype.apply = function(obj, args) {
            var methodName = "__apply__";
            if (typeof obj[methodName] != "undefined") {
                methodName += String(Math.random()).substr(2)
            }
            obj[methodName] = this;
            var argsStrings = [];
            for (var i = 0, len = args.length; i < len; i++) {
                argsStrings[i] = "args[" + i + "]"
            }
            var script = "obj." + methodName + "(" + argsStrings.join(",") + ")";
            var returnValue = eval(script);
            delete obj[methodName];
            return returnValue
        }
    }
    if (!Function.prototype.call) {
        Function.prototype.call = function(obj) {
            var args = [];
            for (var i = 1, len = arguments.length; i < len; i++) {
                args[i - 1] = arguments[i]
            }
            return this.apply(obj, args)
        }
    }

    function getListenersPropertyName(eventName) {
        return "__log4javascript_listeners__" + eventName
    }

    function addEvent(node, eventName, listener, useCapture, win) {
        win = win ? win : window;
        if (node.addEventListener) {
            node.addEventListener(eventName, listener, useCapture)
        } else {
            if (node.attachEvent) {
                node.attachEvent("on" + eventName, listener)
            } else {
                var propertyName = getListenersPropertyName(eventName);
                if (!node[propertyName]) {
                    node[propertyName] = [];
                    node["on" + eventName] = function(evt) {
                        evt = getEvent(evt, win);
                        var listenersPropertyName = getListenersPropertyName(eventName);
                        var listeners = this[listenersPropertyName].concat([]);
                        var currentListener;
                        while ((currentListener = listeners.shift())) {
                            currentListener.call(this, evt)
                        }
                    }
                }
                node[propertyName].push(listener)
            }
        }
    }

    function removeEvent(node, eventName, listener, useCapture) {
        if (node.removeEventListener) {
            node.removeEventListener(eventName, listener, useCapture)
        } else {
            if (node.detachEvent) {
                node.detachEvent("on" + eventName, listener)
            } else {
                var propertyName = getListenersPropertyName(eventName);
                if (node[propertyName]) {
                    array_remove(node[propertyName], listener)
                }
            }
        }
    }

    function getEvent(evt, win) {
        win = win ? win : window;
        return evt ? evt : win.event
    }

    function stopEventPropagation(evt) {
        if (evt.stopPropagation) {
            evt.stopPropagation()
        } else {
            if (typeof evt.cancelBubble != "undefined") {
                evt.cancelBubble = true
            }
        }
        evt.returnValue = false
    }
    var logLog = {
        quietMode: false,
        debugMessages: [],
        setQuietMode: function(quietMode) {
            this.quietMode = bool(quietMode)
        },
        numberOfErrors: 0,
        alertAllErrors: false,
        setAlertAllErrors: function(alertAllErrors) {
            this.alertAllErrors = alertAllErrors
        },
        debug: function(message) {
            this.debugMessages.push(message)
        },
        displayDebug: function() {
            alert(this.debugMessages.join(newLine))
        },
        warn: function(message, exception) {},
        error: function(message, exception) {
            if (++this.numberOfErrors == 1 || this.alertAllErrors) {
                if (!this.quietMode) {
                    var alertMessage = "log4javascript error: " + message;
                    if (exception) {
                        alertMessage += newLine + newLine + "Original error: " + getExceptionStringRep(exception)
                    }
                    alert(alertMessage)
                }
            }
        }
    };
    log4javascript.logLog = logLog;
    log4javascript.setEventTypes(["load", "error"]);

    function handleError(message, exception) {
        logLog.error(message, exception);
        log4javascript.dispatchEvent("error", {
            message: message,
            exception: exception
        })
    }
    log4javascript.handleError = handleError;
    var enabled = !((typeof log4javascript_disabled != "undefined") && log4javascript_disabled);
    log4javascript.setEnabled = function(enable) {
        enabled = bool(enable)
    };
    log4javascript.isEnabled = function() {
        return enabled
    };
    var useTimeStampsInMilliseconds = true;
    log4javascript.setTimeStampsInMilliseconds = function(timeStampsInMilliseconds) {
        useTimeStampsInMilliseconds = bool(timeStampsInMilliseconds)
    };
    log4javascript.isTimeStampsInMilliseconds = function() {
        return useTimeStampsInMilliseconds
    };
    log4javascript.evalInScope = function(expr) {
        return eval(expr)
    };
    var showStackTraces = false;
    log4javascript.setShowStackTraces = function(show) {
        showStackTraces = bool(show)
    };
    var Level = function(level, name) {
        this.level = level;
        this.name = name
    };
    Level.prototype = {
        toString: function() {
            return this.name
        },
        equals: function(level) {
            return this.level == level.level
        },
        isGreaterOrEqual: function(level) {
            return this.level >= level.level
        }
    };
    Level.ALL = new Level(Number.MIN_VALUE, "ALL");
    Level.TRACE = new Level(10000, "TRACE");
    Level.DEBUG = new Level(20000, "DEBUG");
    Level.INFO = new Level(30000, "INFO");
    Level.WARN = new Level(40000, "WARN");
    Level.ERROR = new Level(50000, "ERROR");
    Level.FATAL = new Level(60000, "FATAL");
    Level.OFF = new Level(Number.MAX_VALUE, "OFF");
    log4javascript.Level = Level;

    function Timer(name, level) {
        this.name = name;
        this.level = isUndefined(level) ? Level.INFO : level;
        this.start = new Date()
    }
    Timer.prototype.getElapsedTime = function() {
        return new Date().getTime() - this.start.getTime()
    };
    var anonymousLoggerName = "[anonymous]";
    var defaultLoggerName = "[default]";
    var nullLoggerName = "[null]";
    var rootLoggerName = "root";

    function Logger(name) {
        this.name = name;
        this.parent = null;
        this.children = [];
        var appenders = [];
        var loggerLevel = null;
        var isRoot = (this.name === rootLoggerName);
        var isNull = (this.name === nullLoggerName);
        var appenderCache = null;
        var appenderCacheInvalidated = false;
        this.addChild = function(childLogger) {
            this.children.push(childLogger);
            childLogger.parent = this;
            childLogger.invalidateAppenderCache()
        };
        var additive = true;
        this.getAdditivity = function() {
            return additive
        };
        this.setAdditivity = function(additivity) {
            var valueChanged = (additive != additivity);
            additive = additivity;
            if (valueChanged) {
                this.invalidateAppenderCache()
            }
        };
        this.addAppender = function(appender) {
            if (isNull) {
                handleError("Logger.addAppender: you may not add an appender to the null logger")
            } else {
                if (appender instanceof log4javascript.Appender) {
                    if (!array_contains(appenders, appender)) {
                        appenders.push(appender);
                        appender.setAddedToLogger(this);
                        this.invalidateAppenderCache()
                    }
                } else {
                    handleError("Logger.addAppender: appender supplied ('" + toStr(appender) + "') is not a subclass of Appender")
                }
            }
        };
        this.removeAppender = function(appender) {
            array_remove(appenders, appender);
            appender.setRemovedFromLogger(this);
            this.invalidateAppenderCache()
        };
        this.removeAllAppenders = function() {
            var appenderCount = appenders.length;
            if (appenderCount > 0) {
                for (var i = 0; i < appenderCount; i++) {
                    appenders[i].setRemovedFromLogger(this)
                }
                appenders.length = 0;
                this.invalidateAppenderCache()
            }
        };
        this.getEffectiveAppenders = function() {
            if (appenderCache === null || appenderCacheInvalidated) {
                var parentEffectiveAppenders = (isRoot || !this.getAdditivity()) ? [] : this.parent.getEffectiveAppenders();
                appenderCache = parentEffectiveAppenders.concat(appenders);
                appenderCacheInvalidated = false
            }
            return appenderCache
        };
        this.invalidateAppenderCache = function() {
            appenderCacheInvalidated = true;
            for (var i = 0, len = this.children.length; i < len; i++) {
                this.children[i].invalidateAppenderCache()
            }
        };
        this.log = function(level, params) {
            if (level.isGreaterOrEqual(this.getEffectiveLevel())) {
                var exception;
                var finalParamIndex = params.length - 1;
                var lastParam = params[params.length - 1];
                if (params.length > 1 && isError(lastParam)) {
                    exception = lastParam;
                    finalParamIndex--
                }
                var messages = [];
                for (var i = 0; i <= finalParamIndex; i++) {
                    messages[i] = params[i]
                }
                var loggingEvent = new LoggingEvent(this, new Date(), level, messages, exception);
                this.callAppenders(loggingEvent)
            }
        };
        this.callAppenders = function(loggingEvent) {
            var effectiveAppenders = this.getEffectiveAppenders();
            for (var i = 0, len = effectiveAppenders.length; i < len; i++) {
                effectiveAppenders[i].doAppend(loggingEvent)
            }
        };
        this.setLevel = function(level) {
            if (isRoot && level === null) {
                handleError("Logger.setLevel: you cannot set the level of the root logger to null")
            } else {
                if (level instanceof Level) {
                    loggerLevel = level
                } else {
                    handleError("Logger.setLevel: level supplied to logger " + this.name + " is not an instance of log4javascript.Level")
                }
            }
        };
        this.getLevel = function() {
            return loggerLevel
        };
        this.getEffectiveLevel = function() {
            for (var logger = this; logger !== null; logger = logger.parent) {
                var level = logger.getLevel();
                if (level !== null) {
                    return level
                }
            }
        };
        this.group = function(name, initiallyExpanded) {
            var effectiveAppenders = this.getEffectiveAppenders();
            for (var i = 0, len = effectiveAppenders.length; i < len; i++) {
                effectiveAppenders[i].group(name, initiallyExpanded)
            }
        };
        this.groupEnd = function(name) {
            var effectiveAppenders = this.getEffectiveAppenders();
            for (var i = 0, len = effectiveAppenders.length; i < len; i++) {
                effectiveAppenders[i].groupEnd()
            }
        };
        var timers = {};
        this.time = function(name, level) {
            if (isUndefined(name)) {
                handleError("Logger.time: a name for the timer must be supplied")
            } else {
                if (level && !(level instanceof Level)) {
                    handleError("Logger.time: level supplied to timer " + name + " is not an instance of log4javascript.Level")
                } else {
                    timers[name] = new Timer(name, level)
                }
            }
        };
        this.timeEnd = function(name) {
            if (isUndefined(name)) {
                handleError("Logger.timeEnd: a name for the timer must be supplied")
            } else {
                if (timers[name]) {
                    var timer = timers[name];
                    var milliseconds = timer.getElapsedTime();
                    this.log(timer.level, ["Timer " + toStr(name) + " completed in " + milliseconds + "ms"]);
                    delete timers[name]
                } else {
                    logLog.warn("Logger.timeEnd: no timer found with name " + name)
                }
            }
        };
        this.assert = function(expr) {
            if (!expr) {
                var args = [];
                for (var i = 1, len = arguments.length; i < len; i++) {
                    args.push(arguments[i])
                }
                args = (args.length > 0) ? args : ["Assertion Failure"];
                args.push(newLine);
                args.push(expr);
                this.log(Level.ERROR, args)
            }
        };
        this.toString = function() {
            return "Logger[" + this.name + "]"
        }
    }
    Logger.prototype = {
        trace: function() {
            this.log(Level.TRACE, arguments)
        },
        debug: function() {
            this.log(Level.DEBUG, arguments)
        },
        info: function() {
            this.log(Level.INFO, arguments)
        },
        warn: function() {
            this.log(Level.WARN, arguments)
        },
        error: function() {
            this.log(Level.ERROR, arguments)
        },
        fatal: function() {
            this.log(Level.FATAL, arguments)
        },
        isEnabledFor: function(level) {
            return level.isGreaterOrEqual(this.getEffectiveLevel())
        },
        isTraceEnabled: function() {
            return this.isEnabledFor(Level.TRACE)
        },
        isDebugEnabled: function() {
            return this.isEnabledFor(Level.DEBUG)
        },
        isInfoEnabled: function() {
            return this.isEnabledFor(Level.INFO)
        },
        isWarnEnabled: function() {
            return this.isEnabledFor(Level.WARN)
        },
        isErrorEnabled: function() {
            return this.isEnabledFor(Level.ERROR)
        },
        isFatalEnabled: function() {
            return this.isEnabledFor(Level.FATAL)
        }
    };
    Logger.prototype.trace.isEntryPoint = true;
    Logger.prototype.debug.isEntryPoint = true;
    Logger.prototype.info.isEntryPoint = true;
    Logger.prototype.warn.isEntryPoint = true;
    Logger.prototype.error.isEntryPoint = true;
    Logger.prototype.fatal.isEntryPoint = true;
    var loggers = {};
    var loggerNames = [];
    var ROOT_LOGGER_DEFAULT_LEVEL = Level.DEBUG;
    var rootLogger = new Logger(rootLoggerName);
    rootLogger.setLevel(ROOT_LOGGER_DEFAULT_LEVEL);
    log4javascript.getRootLogger = function() {
        return rootLogger
    };
    log4javascript.getLogger = function(loggerName) {
        if (!(typeof loggerName == "string")) {
            loggerName = anonymousLoggerName;
            logLog.warn("log4javascript.getLogger: non-string logger name " + toStr(loggerName) + " supplied, returning anonymous logger")
        }
        if (loggerName == rootLoggerName) {
            handleError("log4javascript.getLogger: root logger may not be obtained by name")
        }
        if (!loggers[loggerName]) {
            var logger = new Logger(loggerName);
            loggers[loggerName] = logger;
            loggerNames.push(loggerName);
            var lastDotIndex = loggerName.lastIndexOf(".");
            var parentLogger;
            if (lastDotIndex > -1) {
                var parentLoggerName = loggerName.substring(0, lastDotIndex);
                parentLogger = log4javascript.getLogger(parentLoggerName)
            } else {
                parentLogger = rootLogger
            }
            parentLogger.addChild(logger)
        }
        return loggers[loggerName]
    };
    var defaultLogger = null;
    log4javascript.getDefaultLogger = function() {
        if (!defaultLogger) {
            defaultLogger = log4javascript.getLogger(defaultLoggerName);
            var a = new log4javascript.PopUpAppender();
            defaultLogger.addAppender(a)
        }
        return defaultLogger
    };
    var nullLogger = null;
    log4javascript.getNullLogger = function() {
        if (!nullLogger) {
            nullLogger = new Logger(nullLoggerName);
            nullLogger.setLevel(Level.OFF)
        }
        return nullLogger
    };
    log4javascript.resetConfiguration = function() {
        rootLogger.setLevel(ROOT_LOGGER_DEFAULT_LEVEL);
        loggers = {}
    };
    var LoggingEvent = function(logger, timeStamp, level, messages, exception) {
        this.logger = logger;
        this.timeStamp = timeStamp;
        this.timeStampInMilliseconds = timeStamp.getTime();
        this.timeStampInSeconds = Math.floor(this.timeStampInMilliseconds / 1000);
        this.milliseconds = this.timeStamp.getMilliseconds();
        this.level = level;
        this.messages = messages;
        this.exception = exception
    };
    LoggingEvent.prototype = {
        getThrowableStrRep: function() {
            return this.exception ? getExceptionStringRep(this.exception) : ""
        },
        getCombinedMessages: function() {
            return (this.messages.length == 1) ? this.messages[0] : this.messages.join(newLine)
        },
        toString: function() {
            return "LoggingEvent[" + this.level + "]"
        }
    };
    log4javascript.LoggingEvent = LoggingEvent;
    var Layout = function() {};
    Layout.prototype = {
        defaults: {
            loggerKey: "logger",
            timeStampKey: "timestamp",
            millisecondsKey: "milliseconds",
            levelKey: "level",
            messageKey: "message",
            exceptionKey: "exception",
            urlKey: "url"
        },
        loggerKey: "logger",
        timeStampKey: "timestamp",
        millisecondsKey: "milliseconds",
        levelKey: "level",
        messageKey: "message",
        exceptionKey: "exception",
        urlKey: "url",
        batchHeader: "",
        batchFooter: "",
        batchSeparator: "",
        returnsPostData: false,
        overrideTimeStampsSetting: false,
        useTimeStampsInMilliseconds: null,
        format: function(loggingEvent) {
            handleError("Layout.format: layout supplied has no format() method")
        },
        ignoresThrowable: function() {
            handleError("Layout.ignoresThrowable: layout supplied has no ignoresThrowable() method")
        },
        getContentType: function() {
            return "text/plain"
        },
        allowBatching: function() {
            return true
        },
        setTimeStampsInMilliseconds: function(timeStampsInMilliseconds) {
            this.overrideTimeStampsSetting = true;
            this.useTimeStampsInMilliseconds = bool(timeStampsInMilliseconds)
        },
        isTimeStampsInMilliseconds: function() {
            return this.overrideTimeStampsSetting ? this.useTimeStampsInMilliseconds : useTimeStampsInMilliseconds
        },
        getTimeStampValue: function(loggingEvent) {
            return this.isTimeStampsInMilliseconds() ? loggingEvent.timeStampInMilliseconds : loggingEvent.timeStampInSeconds
        },
        getDataValues: function(loggingEvent, combineMessages) {
            var dataValues = [
                [this.loggerKey, loggingEvent.logger.name],
                [this.timeStampKey, this.getTimeStampValue(loggingEvent)],
                [this.levelKey, loggingEvent.level.name],
                [this.urlKey, window.location.href],
                [this.messageKey, combineMessages ? loggingEvent.getCombinedMessages() : loggingEvent.messages]
            ];
            if (!this.isTimeStampsInMilliseconds()) {
                dataValues.push([this.millisecondsKey, loggingEvent.milliseconds])
            }
            if (loggingEvent.exception) {
                dataValues.push([this.exceptionKey, getExceptionStringRep(loggingEvent.exception)])
            }
            if (this.hasCustomFields()) {
                for (var i = 0, len = this.customFields.length; i < len; i++) {
                    var val = this.customFields[i].value;
                    if (typeof val === "function") {
                        val = val(this, loggingEvent)
                    }
                    dataValues.push([this.customFields[i].name, val])
                }
            }
            return dataValues
        },
        setKeys: function(loggerKey, timeStampKey, levelKey, messageKey, exceptionKey, urlKey, millisecondsKey) {
            this.loggerKey = extractStringFromParam(loggerKey, this.defaults.loggerKey);
            this.timeStampKey = extractStringFromParam(timeStampKey, this.defaults.timeStampKey);
            this.levelKey = extractStringFromParam(levelKey, this.defaults.levelKey);
            this.messageKey = extractStringFromParam(messageKey, this.defaults.messageKey);
            this.exceptionKey = extractStringFromParam(exceptionKey, this.defaults.exceptionKey);
            this.urlKey = extractStringFromParam(urlKey, this.defaults.urlKey);
            this.millisecondsKey = extractStringFromParam(millisecondsKey, this.defaults.millisecondsKey)
        },
        setCustomField: function(name, value) {
            var fieldUpdated = false;
            for (var i = 0, len = this.customFields.length; i < len; i++) {
                if (this.customFields[i].name === name) {
                    this.customFields[i].value = value;
                    fieldUpdated = true
                }
            }
            if (!fieldUpdated) {
                this.customFields.push({
                    name: name,
                    value: value
                })
            }
        },
        hasCustomFields: function() {
            return (this.customFields.length > 0)
        },
        toString: function() {
            handleError("Layout.toString: all layouts must override this method")
        }
    };
    log4javascript.Layout = Layout;
    var Appender = function() {};
    Appender.prototype = new EventSupport();
    Appender.prototype.layout = new PatternLayout();
    Appender.prototype.threshold = Level.ALL;
    Appender.prototype.loggers = [];
    Appender.prototype.doAppend = function(loggingEvent) {
        if (enabled && loggingEvent.level.level >= this.threshold.level) {
            this.append(loggingEvent)
        }
    };
    Appender.prototype.append = function(loggingEvent) {};
    Appender.prototype.setLayout = function(layout) {
        if (layout instanceof Layout) {
            this.layout = layout
        } else {
            handleError("Appender.setLayout: layout supplied to " + this.toString() + " is not a subclass of Layout")
        }
    };
    Appender.prototype.getLayout = function() {
        return this.layout
    };
    Appender.prototype.setThreshold = function(threshold) {
        if (threshold instanceof Level) {
            this.threshold = threshold
        } else {
            handleError("Appender.setThreshold: threshold supplied to " + this.toString() + " is not a subclass of Level")
        }
    };
    Appender.prototype.getThreshold = function() {
        return this.threshold
    };
    Appender.prototype.setAddedToLogger = function(logger) {
        this.loggers.push(logger)
    };
    Appender.prototype.setRemovedFromLogger = function(logger) {
        array_remove(this.loggers, logger)
    };
    Appender.prototype.group = emptyFunction;
    Appender.prototype.groupEnd = emptyFunction;
    Appender.prototype.toString = function() {
        handleError("Appender.toString: all appenders must override this method")
    };
    log4javascript.Appender = Appender;

    function SimpleLayout() {
        this.customFields = []
    }
    SimpleLayout.prototype = new Layout();
    SimpleLayout.prototype.format = function(loggingEvent) {
        return loggingEvent.level.name + " - " + loggingEvent.getCombinedMessages()
    };
    SimpleLayout.prototype.ignoresThrowable = function() {
        return true
    };
    SimpleLayout.prototype.toString = function() {
        return "SimpleLayout"
    };
    log4javascript.SimpleLayout = SimpleLayout;

    function NullLayout() {
        this.customFields = []
    }
    NullLayout.prototype = new Layout();
    NullLayout.prototype.format = function(loggingEvent) {
        return loggingEvent.messages
    };
    NullLayout.prototype.ignoresThrowable = function() {
        return true
    };
    NullLayout.prototype.toString = function() {
        return "NullLayout"
    };
    log4javascript.NullLayout = NullLayout;

    function XmlLayout(combineMessages) {
        this.combineMessages = extractBooleanFromParam(combineMessages, true);
        this.customFields = []
    }
    XmlLayout.prototype = new Layout();
    XmlLayout.prototype.isCombinedMessages = function() {
        return this.combineMessages
    };
    XmlLayout.prototype.getContentType = function() {
        return "text/xml"
    };
    XmlLayout.prototype.escapeCdata = function(str) {
        return str.replace(/\]\]>/, "]]>]]&gt;<![CDATA[")
    };
    XmlLayout.prototype.format = function(loggingEvent) {
        var layout = this;
        var i, len;

        function formatMessage(message) {
            message = (typeof message === "string") ? message : toStr(message);
            return "<log4javascript:message><![CDATA[" + layout.escapeCdata(message) + "]]></log4javascript:message>"
        }
        var str = '<log4javascript:event logger="' + loggingEvent.logger.name + '" timestamp="' + this.getTimeStampValue(loggingEvent) + '"';
        if (!this.isTimeStampsInMilliseconds()) {
            str += ' milliseconds="' + loggingEvent.milliseconds + '"'
        }
        str += ' level="' + loggingEvent.level.name + '">' + newLine;
        if (this.combineMessages) {
            str += formatMessage(loggingEvent.getCombinedMessages())
        } else {
            str += "<log4javascript:messages>" + newLine;
            for (i = 0, len = loggingEvent.messages.length; i < len; i++) {
                str += formatMessage(loggingEvent.messages[i]) + newLine
            }
            str += "</log4javascript:messages>" + newLine
        } if (this.hasCustomFields()) {
            for (i = 0, len = this.customFields.length; i < len; i++) {
                str += '<log4javascript:customfield name="' + this.customFields[i].name + '"><![CDATA[' + this.customFields[i].value.toString() + "]]></log4javascript:customfield>" + newLine
            }
        }
        if (loggingEvent.exception) {
            str += "<log4javascript:exception><![CDATA[" + getExceptionStringRep(loggingEvent.exception) + "]]></log4javascript:exception>" + newLine
        }
        str += "</log4javascript:event>" + newLine + newLine;
        return str
    };
    XmlLayout.prototype.ignoresThrowable = function() {
        return false
    };
    XmlLayout.prototype.toString = function() {
        return "XmlLayout"
    };
    log4javascript.XmlLayout = XmlLayout;

    function escapeNewLines(str) {
        return str.replace(/\r\n|\r|\n/g, "\\r\\n")
    }

    function JsonLayout(readable, combineMessages) {
        this.readable = extractBooleanFromParam(readable, false);
        this.combineMessages = extractBooleanFromParam(combineMessages, true);
        this.batchHeader = this.readable ? "[" + newLine : "[";
        this.batchFooter = this.readable ? "]" + newLine : "]";
        this.batchSeparator = this.readable ? "," + newLine : ",";
        this.setKeys();
        this.colon = this.readable ? ": " : ":";
        this.tab = this.readable ? "\t" : "";
        this.lineBreak = this.readable ? newLine : "";
        this.customFields = []
    }
    JsonLayout.prototype = new Layout();
    JsonLayout.prototype.isReadable = function() {
        return this.readable
    };
    JsonLayout.prototype.isCombinedMessages = function() {
        return this.combineMessages
    };
    JsonLayout.prototype.format = function(loggingEvent) {
        var layout = this;
        var dataValues = this.getDataValues(loggingEvent, this.combineMessages);
        var str = "{" + this.lineBreak;
        var i;

        function formatValue(val, prefix, expand) {
            var formattedValue;
            var valType = typeof val;
            if (val instanceof Date) {
                formattedValue = String(val.getTime())
            } else {
                if (expand && (val instanceof Array)) {
                    formattedValue = "[" + layout.lineBreak;
                    for (i = 0, len = val.length; i < len; i++) {
                        var childPrefix = prefix + layout.tab;
                        formattedValue += childPrefix + formatValue(val[i], childPrefix, false);
                        if (i < val.length - 1) {
                            formattedValue += ","
                        }
                        formattedValue += layout.lineBreak
                    }
                    formattedValue += prefix + "]"
                } else {
                    if (valType !== "number" && valType !== "boolean") {
                        formattedValue = '"' + escapeNewLines(toStr(val).replace(/\"/g, '\\"')) + '"'
                    } else {
                        formattedValue = val
                    }
                }
            }
            return formattedValue
        }
        for (i = 0, len = dataValues.length; i < len; i++) {
            str += this.tab + '"' + dataValues[i][0] + '"' + this.colon + formatValue(dataValues[i][1], this.tab, true);
            if (i < dataValues.length - 1) {
                str += ","
            }
            str += this.lineBreak
        }
        str += "}" + this.lineBreak;
        return str
    };
    JsonLayout.prototype.ignoresThrowable = function() {
        return false
    };
    JsonLayout.prototype.toString = function() {
        return "JsonLayout"
    };
    JsonLayout.prototype.getContentType = function() {
        return "application/json"
    };
    log4javascript.JsonLayout = JsonLayout;

    function HttpPostDataLayout() {
        this.setKeys();
        this.customFields = [];
        this.returnsPostData = true
    }
    HttpPostDataLayout.prototype = new Layout();
    HttpPostDataLayout.prototype.allowBatching = function() {
        return false
    };
    HttpPostDataLayout.prototype.format = function(loggingEvent) {
        var dataValues = this.getDataValues(loggingEvent);
        var queryBits = [];
        for (var i = 0, len = dataValues.length; i < len; i++) {
            var val = (dataValues[i][1] instanceof Date) ? String(dataValues[i][1].getTime()) : dataValues[i][1];
            queryBits.push(urlEncode(dataValues[i][0]) + "=" + urlEncode(val))
        }
        return queryBits.join("&")
    };
    HttpPostDataLayout.prototype.ignoresThrowable = function(loggingEvent) {
        return false
    };
    HttpPostDataLayout.prototype.toString = function() {
        return "HttpPostDataLayout"
    };
    log4javascript.HttpPostDataLayout = HttpPostDataLayout;

    function formatObjectExpansion(obj, depth, indentation) {
        var objectsExpanded = [];

        function doFormat(obj, depth, indentation) {
            var i, j, len, childDepth, childIndentation, childLines, expansion, childExpansion;
            if (!indentation) {
                indentation = ""
            }

            function formatString(text) {
                var lines = splitIntoLines(text);
                for (var j = 1, jLen = lines.length; j < jLen; j++) {
                    lines[j] = indentation + lines[j]
                }
                return lines.join(newLine)
            }
            if (obj === null) {
                return "null"
            } else {
                if (typeof obj == "undefined") {
                    return "undefined"
                } else {
                    if (typeof obj == "string") {
                        return formatString(obj)
                    } else {
                        if (typeof obj == "object" && array_contains(objectsExpanded, obj)) {
                            try {
                                expansion = toStr(obj)
                            } catch (ex) {
                                expansion = "Error formatting property. Details: " + getExceptionStringRep(ex)
                            }
                            return expansion + " [already expanded]"
                        } else {
                            if ((obj instanceof Array) && depth > 0) {
                                objectsExpanded.push(obj);
                                expansion = "[" + newLine;
                                childDepth = depth - 1;
                                childIndentation = indentation + "  ";
                                childLines = [];
                                for (i = 0, len = obj.length; i < len; i++) {
                                    try {
                                        childExpansion = doFormat(obj[i], childDepth, childIndentation);
                                        childLines.push(childIndentation + childExpansion)
                                    } catch (ex) {
                                        childLines.push(childIndentation + "Error formatting array member. Details: " + getExceptionStringRep(ex) + "")
                                    }
                                }
                                expansion += childLines.join("," + newLine) + newLine + indentation + "]";
                                return expansion
                            } else {
                                if (typeof obj == "object" && depth > 0) {
                                    objectsExpanded.push(obj);
                                    expansion = "{" + newLine;
                                    childDepth = depth - 1;
                                    childIndentation = indentation + "  ";
                                    childLines = [];
                                    for (i in obj) {
                                        try {
                                            childExpansion = doFormat(obj[i], childDepth, childIndentation);
                                            childLines.push(childIndentation + i + ": " + childExpansion)
                                        } catch (ex) {
                                            childLines.push(childIndentation + i + ": Error formatting property. Details: " + getExceptionStringRep(ex))
                                        }
                                    }
                                    expansion += childLines.join("," + newLine) + newLine + indentation + "}";
                                    return expansion
                                } else {
                                    return formatString(toStr(obj))
                                }
                            }
                        }
                    }
                }
            }
        }
        return doFormat(obj, depth, indentation)
    }
    var SimpleDateFormat;
    (function() {
        var regex = /('[^']*')|(G+|y+|M+|w+|W+|D+|d+|F+|E+|a+|H+|k+|K+|h+|m+|s+|S+|Z+)|([a-zA-Z]+)|([^a-zA-Z']+)/;
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var TEXT2 = 0,
            TEXT3 = 1,
            NUMBER = 2,
            YEAR = 3,
            MONTH = 4,
            TIMEZONE = 5;
        var types = {
            G: TEXT2,
            y: YEAR,
            M: MONTH,
            w: NUMBER,
            W: NUMBER,
            D: NUMBER,
            d: NUMBER,
            F: NUMBER,
            E: TEXT3,
            a: TEXT2,
            H: NUMBER,
            k: NUMBER,
            K: NUMBER,
            h: NUMBER,
            m: NUMBER,
            s: NUMBER,
            S: NUMBER,
            Z: TIMEZONE
        };
        var ONE_DAY = 24 * 60 * 60 * 1000;
        var ONE_WEEK = 7 * ONE_DAY;
        var DEFAULT_MINIMAL_DAYS_IN_FIRST_WEEK = 1;
        var newDateAtMidnight = function(year, month, day) {
            var d = new Date(year, month, day, 0, 0, 0);
            d.setMilliseconds(0);
            return d
        };
        Date.prototype.getDifference = function(date) {
            return this.getTime() - date.getTime()
        };
        Date.prototype.isBefore = function(d) {
            return this.getTime() < d.getTime()
        };
        Date.prototype.getUTCTime = function() {
            return Date.UTC(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
        };
        Date.prototype.getTimeSince = function(d) {
            return this.getUTCTime() - d.getUTCTime()
        };
        Date.prototype.getPreviousSunday = function() {
            var midday = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 12, 0, 0);
            var previousSunday = new Date(midday.getTime() - this.getDay() * ONE_DAY);
            return newDateAtMidnight(previousSunday.getFullYear(), previousSunday.getMonth(), previousSunday.getDate())
        };
        Date.prototype.getWeekInYear = function(minimalDaysInFirstWeek) {
            if (isUndefined(this.minimalDaysInFirstWeek)) {
                minimalDaysInFirstWeek = DEFAULT_MINIMAL_DAYS_IN_FIRST_WEEK
            }
            var previousSunday = this.getPreviousSunday();
            var startOfYear = newDateAtMidnight(this.getFullYear(), 0, 1);
            var numberOfSundays = previousSunday.isBefore(startOfYear) ? 0 : 1 + Math.floor(previousSunday.getTimeSince(startOfYear) / ONE_WEEK);
            var numberOfDaysInFirstWeek = 7 - startOfYear.getDay();
            var weekInYear = numberOfSundays;
            if (numberOfDaysInFirstWeek < minimalDaysInFirstWeek) {
                weekInYear--
            }
            return weekInYear
        };
        Date.prototype.getWeekInMonth = function(minimalDaysInFirstWeek) {
            if (isUndefined(this.minimalDaysInFirstWeek)) {
                minimalDaysInFirstWeek = DEFAULT_MINIMAL_DAYS_IN_FIRST_WEEK
            }
            var previousSunday = this.getPreviousSunday();
            var startOfMonth = newDateAtMidnight(this.getFullYear(), this.getMonth(), 1);
            var numberOfSundays = previousSunday.isBefore(startOfMonth) ? 0 : 1 + Math.floor(previousSunday.getTimeSince(startOfMonth) / ONE_WEEK);
            var numberOfDaysInFirstWeek = 7 - startOfMonth.getDay();
            var weekInMonth = numberOfSundays;
            if (numberOfDaysInFirstWeek >= minimalDaysInFirstWeek) {
                weekInMonth++
            }
            return weekInMonth
        };
        Date.prototype.getDayInYear = function() {
            var startOfYear = newDateAtMidnight(this.getFullYear(), 0, 1);
            return 1 + Math.floor(this.getTimeSince(startOfYear) / ONE_DAY)
        };
        SimpleDateFormat = function(formatString) {
            this.formatString = formatString
        };
        SimpleDateFormat.prototype.setMinimalDaysInFirstWeek = function(days) {
            this.minimalDaysInFirstWeek = days
        };
        SimpleDateFormat.prototype.getMinimalDaysInFirstWeek = function() {
            return isUndefined(this.minimalDaysInFirstWeek) ? DEFAULT_MINIMAL_DAYS_IN_FIRST_WEEK : this.minimalDaysInFirstWeek
        };
        var padWithZeroes = function(str, len) {
            while (str.length < len) {
                str = "0" + str
            }
            return str
        };
        var formatText = function(data, numberOfLetters, minLength) {
            return (numberOfLetters >= 4) ? data : data.substr(0, Math.max(minLength, numberOfLetters))
        };
        var formatNumber = function(data, numberOfLetters) {
            var dataString = "" + data;
            return padWithZeroes(dataString, numberOfLetters)
        };
        SimpleDateFormat.prototype.format = function(date) {
            var formattedString = "";
            var result;
            var searchString = this.formatString;
            while ((result = regex.exec(searchString))) {
                var quotedString = result[1];
                var patternLetters = result[2];
                var otherLetters = result[3];
                var otherCharacters = result[4];
                if (quotedString) {
                    if (quotedString == "''") {
                        formattedString += "'"
                    } else {
                        formattedString += quotedString.substring(1, quotedString.length - 1)
                    }
                } else {
                    if (otherLetters) {} else {
                        if (otherCharacters) {
                            formattedString += otherCharacters
                        } else {
                            if (patternLetters) {
                                var patternLetter = patternLetters.charAt(0);
                                var numberOfLetters = patternLetters.length;
                                var rawData = "";
                                switch (patternLetter) {
                                    case "G":
                                        rawData = "AD";
                                        break;
                                    case "y":
                                        rawData = date.getFullYear();
                                        break;
                                    case "M":
                                        rawData = date.getMonth();
                                        break;
                                    case "w":
                                        rawData = date.getWeekInYear(this.getMinimalDaysInFirstWeek());
                                        break;
                                    case "W":
                                        rawData = date.getWeekInMonth(this.getMinimalDaysInFirstWeek());
                                        break;
                                    case "D":
                                        rawData = date.getDayInYear();
                                        break;
                                    case "d":
                                        rawData = date.getDate();
                                        break;
                                    case "F":
                                        rawData = 1 + Math.floor((date.getDate() - 1) / 7);
                                        break;
                                    case "E":
                                        rawData = dayNames[date.getDay()];
                                        break;
                                    case "a":
                                        rawData = (date.getHours() >= 12) ? "PM" : "AM";
                                        break;
                                    case "H":
                                        rawData = date.getHours();
                                        break;
                                    case "k":
                                        rawData = date.getHours() || 24;
                                        break;
                                    case "K":
                                        rawData = date.getHours() % 12;
                                        break;
                                    case "h":
                                        rawData = (date.getHours() % 12) || 12;
                                        break;
                                    case "m":
                                        rawData = date.getMinutes();
                                        break;
                                    case "s":
                                        rawData = date.getSeconds();
                                        break;
                                    case "S":
                                        rawData = date.getMilliseconds();
                                        break;
                                    case "Z":
                                        rawData = date.getTimezoneOffset();
                                        break
                                }
                                switch (types[patternLetter]) {
                                    case TEXT2:
                                        formattedString += formatText(rawData, numberOfLetters, 2);
                                        break;
                                    case TEXT3:
                                        formattedString += formatText(rawData, numberOfLetters, 3);
                                        break;
                                    case NUMBER:
                                        formattedString += formatNumber(rawData, numberOfLetters);
                                        break;
                                    case YEAR:
                                        if (numberOfLetters <= 3) {
                                            var dataString = "" + rawData;
                                            formattedString += dataString.substr(2, 2)
                                        } else {
                                            formattedString += formatNumber(rawData, numberOfLetters)
                                        }
                                        break;
                                    case MONTH:
                                        if (numberOfLetters >= 3) {
                                            formattedString += formatText(monthNames[rawData], numberOfLetters, numberOfLetters)
                                        } else {
                                            formattedString += formatNumber(rawData + 1, numberOfLetters)
                                        }
                                        break;
                                    case TIMEZONE:
                                        var isPositive = (rawData > 0);
                                        var prefix = isPositive ? "-" : "+";
                                        var absData = Math.abs(rawData);
                                        var hours = "" + Math.floor(absData / 60);
                                        hours = padWithZeroes(hours, 2);
                                        var minutes = "" + (absData % 60);
                                        minutes = padWithZeroes(minutes, 2);
                                        formattedString += prefix + hours + minutes;
                                        break
                                }
                            }
                        }
                    }
                }
                searchString = searchString.substr(result.index + result[0].length)
            }
            return formattedString
        }
    })();
    log4javascript.SimpleDateFormat = SimpleDateFormat;

    function PatternLayout(pattern) {
        if (pattern) {
            this.pattern = pattern
        } else {
            this.pattern = PatternLayout.DEFAULT_CONVERSION_PATTERN
        }
        this.customFields = []
    }
    PatternLayout.TTCC_CONVERSION_PATTERN = "%r %p %c - %m%n";
    PatternLayout.DEFAULT_CONVERSION_PATTERN = "%m%n";
    PatternLayout.ISO8601_DATEFORMAT = "yyyy-MM-dd HH:mm:ss,SSS";
    PatternLayout.DATETIME_DATEFORMAT = "dd MMM yyyy HH:mm:ss,SSS";
    PatternLayout.ABSOLUTETIME_DATEFORMAT = "HH:mm:ss,SSS";
    PatternLayout.prototype = new Layout();
    PatternLayout.prototype.format = function(loggingEvent) {
        var regex = /%(-?[0-9]+)?(\.?[0-9]+)?([acdfmMnpr%])(\{([^\}]+)\})?|([^%]+)/;
        var formattedString = "";
        var result;
        var searchString = this.pattern;
        while ((result = regex.exec(searchString))) {
            var matchedString = result[0];
            var padding = result[1];
            var truncation = result[2];
            var conversionCharacter = result[3];
            var specifier = result[5];
            var text = result[6];
            if (text) {
                formattedString += "" + text
            } else {
                var replacement = "";
                switch (conversionCharacter) {
                    case "a":
                    case "m":
                        var depth = 0;
                        if (specifier) {
                            depth = parseInt(specifier, 10);
                            if (isNaN(depth)) {
                                handleError("PatternLayout.format: invalid specifier '" + specifier + "' for conversion character '" + conversionCharacter + "' - should be a number");
                                depth = 0
                            }
                        }
                        var messages = (conversionCharacter === "a") ? loggingEvent.messages[0] : loggingEvent.messages;
                        for (var i = 0, len = messages.length; i < len; i++) {
                            if (i > 0 && (replacement.charAt(replacement.length - 1) !== " ")) {
                                replacement += " "
                            }
                            if (depth === 0) {
                                replacement += messages[i]
                            } else {
                                replacement += formatObjectExpansion(messages[i], depth)
                            }
                        }
                        break;
                    case "c":
                        var loggerName = loggingEvent.logger.name;
                        if (specifier) {
                            var precision = parseInt(specifier, 10);
                            var loggerNameBits = loggingEvent.logger.name.split(".");
                            if (precision >= loggerNameBits.length) {
                                replacement = loggerName
                            } else {
                                replacement = loggerNameBits.slice(loggerNameBits.length - precision).join(".")
                            }
                        } else {
                            replacement = loggerName
                        }
                        break;
                    case "d":
                        var dateFormat = PatternLayout.ISO8601_DATEFORMAT;
                        if (specifier) {
                            dateFormat = specifier;
                            if (dateFormat == "ISO8601") {
                                dateFormat = PatternLayout.ISO8601_DATEFORMAT
                            } else {
                                if (dateFormat == "ABSOLUTE") {
                                    dateFormat = PatternLayout.ABSOLUTETIME_DATEFORMAT
                                } else {
                                    if (dateFormat == "DATE") {
                                        dateFormat = PatternLayout.DATETIME_DATEFORMAT
                                    }
                                }
                            }
                        }
                        replacement = (new SimpleDateFormat(dateFormat)).format(loggingEvent.timeStamp);
                        break;
                    case "f":
                        if (this.hasCustomFields()) {
                            var fieldIndex = 0;
                            if (specifier) {
                                fieldIndex = parseInt(specifier, 10);
                                if (isNaN(fieldIndex)) {
                                    handleError("PatternLayout.format: invalid specifier '" + specifier + "' for conversion character 'f' - should be a number")
                                } else {
                                    if (fieldIndex === 0) {
                                        handleError("PatternLayout.format: invalid specifier '" + specifier + "' for conversion character 'f' - must be greater than zero")
                                    } else {
                                        if (fieldIndex > this.customFields.length) {
                                            handleError("PatternLayout.format: invalid specifier '" + specifier + "' for conversion character 'f' - there aren't that many custom fields")
                                        } else {
                                            fieldIndex = fieldIndex - 1
                                        }
                                    }
                                }
                            }
                            replacement = this.customFields[fieldIndex].value
                        }
                        break;
                    case "n":
                        replacement = newLine;
                        break;
                    case "p":
                        replacement = loggingEvent.level.name;
                        break;
                    case "r":
                        replacement = "" + loggingEvent.timeStamp.getDifference(applicationStartDate);
                        break;
                    case "%":
                        replacement = "%";
                        break;
                    default:
                        replacement = matchedString;
                        break
                }
                var l;
                if (truncation) {
                    l = parseInt(truncation.substr(1), 10);
                    var strLen = replacement.length;
                    if (l < strLen) {
                        replacement = replacement.substring(strLen - l, strLen)
                    }
                }
                if (padding) {
                    if (padding.charAt(0) == "-") {
                        l = parseInt(padding.substr(1), 10);
                        while (replacement.length < l) {
                            replacement += " "
                        }
                    } else {
                        l = parseInt(padding, 10);
                        while (replacement.length < l) {
                            replacement = " " + replacement
                        }
                    }
                }
                formattedString += replacement
            }
            searchString = searchString.substr(result.index + result[0].length)
        }
        return formattedString
    };
    PatternLayout.prototype.ignoresThrowable = function() {
        return true
    };
    PatternLayout.prototype.toString = function() {
        return "PatternLayout"
    };
    log4javascript.PatternLayout = PatternLayout;

    function AlertAppender() {}
    AlertAppender.prototype = new Appender();
    AlertAppender.prototype.layout = new SimpleLayout();
    AlertAppender.prototype.append = function(loggingEvent) {
        var formattedMessage = this.getLayout().format(loggingEvent);
        if (this.getLayout().ignoresThrowable()) {
            formattedMessage += loggingEvent.getThrowableStrRep()
        }
        alert(formattedMessage)
    };
    AlertAppender.prototype.toString = function() {
        return "AlertAppender"
    };
    log4javascript.AlertAppender = AlertAppender;

    function BrowserConsoleAppender() {}
    BrowserConsoleAppender.prototype = new log4javascript.Appender();
    BrowserConsoleAppender.prototype.layout = new NullLayout();
    BrowserConsoleAppender.prototype.threshold = Level.DEBUG;
    BrowserConsoleAppender.prototype.append = function(loggingEvent) {
        var appender = this;
        var getFormattedMessage = function() {
            var layout = appender.getLayout();
            var formattedMessage = layout.format(loggingEvent);
            if (layout.ignoresThrowable() && loggingEvent.exception) {
                formattedMessage += loggingEvent.getThrowableStrRep()
            }
            return formattedMessage
        };
        if ((typeof opera != "undefined") && opera.postError) {
            opera.postError(getFormattedMessage())
        } else {
            if (window.console && window.console.log) {
                var formattedMesage = getFormattedMessage();
                if (window.console.debug && Level.DEBUG.isGreaterOrEqual(loggingEvent.level)) {
                    window.console.debug(formattedMesage)
                } else {
                    if (window.console.info && Level.INFO.equals(loggingEvent.level)) {
                        window.console.info(formattedMesage)
                    } else {
                        if (window.console.warn && Level.WARN.equals(loggingEvent.level)) {
                            window.console.warn(formattedMesage)
                        } else {
                            if (window.console.error && loggingEvent.level.isGreaterOrEqual(Level.ERROR)) {
                                window.console.error(formattedMesage)
                            } else {
                                window.console.log(formattedMesage)
                            }
                        }
                    }
                }
            }
        }
    };
    BrowserConsoleAppender.prototype.group = function(name) {
        if (window.console && window.console.group) {
            window.console.group(name)
        }
    };
    BrowserConsoleAppender.prototype.groupEnd = function() {
        if (window.console && window.console.groupEnd) {
            window.console.groupEnd()
        }
    };
    BrowserConsoleAppender.prototype.toString = function() {
        return "BrowserConsoleAppender"
    };
    log4javascript.BrowserConsoleAppender = BrowserConsoleAppender;

    function getXmlHttp(errorHandler) {
        var xmlHttp = null;
        if (typeof XMLHttpRequest == "object" || typeof XMLHttpRequest == "function") {
            xmlHttp = new XMLHttpRequest()
        } else {
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (e1) {
                try {
                    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (e2) {
                    if (errorHandler) {
                        errorHandler()
                    } else {
                        handleError("getXmlHttp: unable to obtain XMLHttpRequest object")
                    }
                }
            }
        }
        return xmlHttp
    }

    function isHttpRequestSuccessful(xmlHttp) {
        return (isUndefined(xmlHttp.status) || xmlHttp.status === 0 || (xmlHttp.status >= 200 && xmlHttp.status < 300))
    }

    function AjaxAppender(url) {
        var appender = this;
        var isSupported = true;
        if (!url) {
            handleError("AjaxAppender: URL must be specified in constructor");
            isSupported = false
        }
        var timed = this.defaults.timed;
        var waitForResponse = this.defaults.waitForResponse;
        var batchSize = this.defaults.batchSize;
        var timerInterval = this.defaults.timerInterval;
        var requestSuccessCallback = this.defaults.requestSuccessCallback;
        var failCallback = this.defaults.failCallback;
        var postVarName = this.defaults.postVarName;
        var sendAllOnUnload = this.defaults.sendAllOnUnload;
        var sessionId = null;
        var queuedLoggingEvents = [];
        var queuedRequests = [];
        var sending = false;
        var initialized = false;

        function checkCanConfigure(configOptionName) {
            if (initialized) {
                handleError("AjaxAppender: configuration option '" + configOptionName + "' may not be set after the appender has been initialized");
                return false
            }
            return true
        }
        this.getSessionId = function() {
            return sessionId
        };
        this.setSessionId = function(sessionIdParam) {
            sessionId = extractStringFromParam(sessionIdParam, null);
            this.layout.setCustomField("sessionid", sessionId)
        };
        this.setLayout = function(layoutParam) {
            if (checkCanConfigure("layout")) {
                this.layout = layoutParam;
                if (sessionId !== null) {
                    this.setSessionId(sessionId)
                }
            }
        };
        this.isTimed = function() {
            return timed
        };
        this.setTimed = function(timedParam) {
            if (checkCanConfigure("timed")) {
                timed = bool(timedParam)
            }
        };
        this.getTimerInterval = function() {
            return timerInterval
        };
        this.setTimerInterval = function(timerIntervalParam) {
            if (checkCanConfigure("timerInterval")) {
                timerInterval = extractIntFromParam(timerIntervalParam, timerInterval)
            }
        };
        this.isWaitForResponse = function() {
            return waitForResponse
        };
        this.setWaitForResponse = function(waitForResponseParam) {
            if (checkCanConfigure("waitForResponse")) {
                waitForResponse = bool(waitForResponseParam)
            }
        };
        this.getBatchSize = function() {
            return batchSize
        };
        this.setBatchSize = function(batchSizeParam) {
            if (checkCanConfigure("batchSize")) {
                batchSize = extractIntFromParam(batchSizeParam, batchSize)
            }
        };
        this.isSendAllOnUnload = function() {
            return sendAllOnUnload
        };
        this.setSendAllOnUnload = function(sendAllOnUnloadParam) {
            if (checkCanConfigure("sendAllOnUnload")) {
                sendAllOnUnload = extractIntFromParam(sendAllOnUnloadParam, sendAllOnUnload)
            }
        };
        this.setRequestSuccessCallback = function(requestSuccessCallbackParam) {
            requestSuccessCallback = extractFunctionFromParam(requestSuccessCallbackParam, requestSuccessCallback)
        };
        this.setFailCallback = function(failCallbackParam) {
            failCallback = extractFunctionFromParam(failCallbackParam, failCallback)
        };
        this.getPostVarName = function() {
            return postVarName
        };
        this.setPostVarName = function(postVarNameParam) {
            if (checkCanConfigure("postVarName")) {
                postVarName = extractStringFromParam(postVarNameParam, postVarName)
            }
        };

        function sendAll() {
            if (isSupported && enabled) {
                sending = true;
                var currentRequestBatch;
                if (waitForResponse) {
                    if (queuedRequests.length > 0) {
                        currentRequestBatch = queuedRequests.shift();
                        sendRequest(preparePostData(currentRequestBatch), sendAll)
                    } else {
                        sending = false;
                        if (timed) {
                            scheduleSending()
                        }
                    }
                } else {
                    while ((currentRequestBatch = queuedRequests.shift())) {
                        sendRequest(preparePostData(currentRequestBatch))
                    }
                    sending = false;
                    if (timed) {
                        scheduleSending()
                    }
                }
            }
        }
        this.sendAll = sendAll;

        function sendAllRemaining() {
            if (isSupported && enabled) {
                var actualBatchSize = appender.getLayout().allowBatching() ? batchSize : 1;
                var currentLoggingEvent;
                var postData = "";
                var batchedLoggingEvents = [];
                while ((currentLoggingEvent = queuedLoggingEvents.shift())) {
                    batchedLoggingEvents.push(currentLoggingEvent);
                    if (queuedLoggingEvents.length >= actualBatchSize) {
                        queuedRequests.push(batchedLoggingEvents);
                        batchedLoggingEvents = []
                    }
                }
                if (batchedLoggingEvents.length > 0) {
                    queuedRequests.push(batchedLoggingEvents)
                }
                waitForResponse = false;
                timed = false;
                sendAll()
            }
        }

        function preparePostData(batchedLoggingEvents) {
            var formattedMessages = [];
            var currentLoggingEvent;
            var postData = "";
            while ((currentLoggingEvent = batchedLoggingEvents.shift())) {
                var currentFormattedMessage = appender.getLayout().format(currentLoggingEvent);
                if (appender.getLayout().ignoresThrowable()) {
                    currentFormattedMessage += loggingEvent.getThrowableStrRep()
                }
                formattedMessages.push(currentFormattedMessage)
            }
            if (batchedLoggingEvents.length == 1) {
                postData = formattedMessages.join("")
            } else {
                postData = appender.getLayout().batchHeader + formattedMessages.join(appender.getLayout().batchSeparator) + appender.getLayout().batchFooter
            }
            postData = appender.getLayout().returnsPostData ? postData : urlEncode(postVarName) + "=" + urlEncode(postData);
            if (postData.length > 0) {
                postData += "&"
            }
            return postData + "layout=" + urlEncode(appender.getLayout().toString())
        }

        function scheduleSending() {
            setTimeout(sendAll, timerInterval)
        }

        function xmlHttpErrorHandler() {
            var msg = "AjaxAppender: could not create XMLHttpRequest object. AjaxAppender disabled";
            handleError(msg);
            isSupported = false;
            if (failCallback) {
                failCallback(msg)
            }
        }

        function sendRequest(postData, successCallback) {
            try {
                var xmlHttp = getXmlHttp(xmlHttpErrorHandler);
                if (isSupported) {
                    if (xmlHttp.overrideMimeType) {
                        xmlHttp.overrideMimeType(appender.getLayout().getContentType())
                    }
                    xmlHttp.onreadystatechange = function() {
                        if (xmlHttp.readyState == 4) {
                            if (isHttpRequestSuccessful(xmlHttp)) {
                                if (requestSuccessCallback) {
                                    requestSuccessCallback(xmlHttp)
                                }
                                if (successCallback) {
                                    successCallback(xmlHttp)
                                }
                            } else {
                                var msg = "AjaxAppender.append: XMLHttpRequest request to URL " + url + " returned status code " + xmlHttp.status;
                                handleError(msg);
                                if (failCallback) {
                                    failCallback(msg)
                                }
                            }
                            xmlHttp.onreadystatechange = emptyFunction;
                            xmlHttp = null
                        }
                    };
                    xmlHttp.open("POST", url, true);
                    try {
                        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                    } catch (headerEx) {
                        var msg = "AjaxAppender.append: your browser's XMLHttpRequest implementation does not support setRequestHeader, therefore cannot post data. AjaxAppender disabled";
                        handleError(msg);
                        isSupported = false;
                        if (failCallback) {
                            failCallback(msg)
                        }
                        return
                    }
                    xmlHttp.send(postData)
                }
            } catch (ex) {
                var errMsg = "AjaxAppender.append: error sending log message to " + url;
                handleError(errMsg, ex);
                isSupported = false;
                if (failCallback) {
                    failCallback(errMsg + ". Details: " + getExceptionStringRep(ex))
                }
            }
        }
        this.append = function(loggingEvent) {
            if (isSupported) {
                if (!initialized) {
                    init()
                }
                queuedLoggingEvents.push(loggingEvent);
                var actualBatchSize = this.getLayout().allowBatching() ? batchSize : 1;
                if (queuedLoggingEvents.length >= actualBatchSize) {
                    var currentLoggingEvent;
                    var postData = "";
                    var batchedLoggingEvents = [];
                    while ((currentLoggingEvent = queuedLoggingEvents.shift())) {
                        batchedLoggingEvents.push(currentLoggingEvent)
                    }
                    queuedRequests.push(batchedLoggingEvents);
                    if (!timed) {
                        if (!waitForResponse || (waitForResponse && !sending)) {
                            sendAll()
                        }
                    }
                }
            }
        };

        function init() {
            initialized = true;
            if (sendAllOnUnload) {
                addEvent(window, "unload", sendAllRemaining)
            }
            if (timed) {
                scheduleSending()
            }
        }
    }
    AjaxAppender.prototype = new Appender();
    AjaxAppender.prototype.defaults = {
        waitForResponse: false,
        timed: false,
        timerInterval: 1000,
        batchSize: 1,
        sendAllOnUnload: true,
        requestSuccessCallback: null,
        failCallback: null,
        postVarName: "data"
    };
    AjaxAppender.prototype.layout = new HttpPostDataLayout();
    AjaxAppender.prototype.toString = function() {
        return "AjaxAppender"
    };
    log4javascript.AjaxAppender = AjaxAppender;

    function setCookie(name, value, days, path) {
        var expires;
        path = path ? "; path=" + path : "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString()
        } else {
            expires = ""
        }
        document.cookie = escape(name) + "=" + escape(value) + expires + path
    }

    function getCookie(name) {
        var nameEquals = escape(name) + "=";
        var ca = document.cookie.split(";");
        for (var i = 0, len = ca.length; i < len; i++) {
            var c = ca[i];
            while (c.charAt(0) === " ") {
                c = c.substring(1, c.length)
            }
            if (c.indexOf(nameEquals) === 0) {
                return unescape(c.substring(nameEquals.length, c.length))
            }
        }
        return null
    }

    function getBaseUrl() {
        var scripts = document.getElementsByTagName("script");
        for (var i = 0, len = scripts.length; i < len; ++i) {
            if (scripts[i].src.indexOf("log4javascript") != -1) {
                var lastSlash = scripts[i].src.lastIndexOf("/");
                return (lastSlash == -1) ? "" : scripts[i].src.substr(0, lastSlash + 1)
            }
        }
        return null
    }

    function isLoaded(win) {
        try {
            return bool(win.loaded)
        } catch (ex) {
            return false
        }
    }
    var ConsoleAppender;
    (function() {
        var getConsoleHtmlLines = function() {
            return ['<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">', '<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">', "<head>", "<title>log4javascript</title>", '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />', "<!-- Make IE8 behave like IE7, having gone to all the trouble of making IE work -->", '<meta http-equiv="X-UA-Compatible" content="IE=7" />', '<script type="text/javascript">var isIe = false, isIePre7 = false;<\/script>', '<!--[if IE]><script type="text/javascript">isIe = true<\/script><![endif]-->', '<!--[if lt IE 7]><script type="text/javascript">isIePre7 = true<\/script><![endif]-->', '<script type="text/javascript">', "//<![CDATA[", "var loggingEnabled=true;var logQueuedEventsTimer=null;var logEntries=[];var logEntriesAndSeparators=[];var logItems=[];var renderDelay=100;var unrenderedLogItemsExist=false;var rootGroup,currentGroup=null;var loaded=false;var currentLogItem=null;var logMainContainer;function copyProperties(obj,props){for(var i in props){obj[i]=props[i];}}", "function LogItem(){}", "LogItem.prototype={mainContainer:null,wrappedContainer:null,unwrappedContainer:null,group:null,appendToLog:function(){for(var i=0,len=this.elementContainers.length;i<len;i++){this.elementContainers[i].appendToLog();}", "this.group.update();},doRemove:function(doUpdate,removeFromGroup){if(this.rendered){for(var i=0,len=this.elementContainers.length;i<len;i++){this.elementContainers[i].remove();}", "this.unwrappedElementContainer=null;this.wrappedElementContainer=null;this.mainElementContainer=null;}", "if(this.group&&removeFromGroup){this.group.removeChild(this,doUpdate);}", "if(this===currentLogItem){currentLogItem=null;}},remove:function(doUpdate,removeFromGroup){this.doRemove(doUpdate,removeFromGroup);},render:function(){},accept:function(visitor){visitor.visit(this);},getUnwrappedDomContainer:function(){return this.group.unwrappedElementContainer.contentDiv;},getWrappedDomContainer:function(){return this.group.wrappedElementContainer.contentDiv;},getMainDomContainer:function(){return this.group.mainElementContainer.contentDiv;}};LogItem.serializedItemKeys={LOG_ENTRY:0,GROUP_START:1,GROUP_END:2};function LogItemContainerElement(){}", 'LogItemContainerElement.prototype={appendToLog:function(){var insertBeforeFirst=(newestAtTop&&this.containerDomNode.hasChildNodes());if(insertBeforeFirst){this.containerDomNode.insertBefore(this.mainDiv,this.containerDomNode.firstChild);}else{this.containerDomNode.appendChild(this.mainDiv);}}};function SeparatorElementContainer(containerDomNode){this.containerDomNode=containerDomNode;this.mainDiv=document.createElement("div");this.mainDiv.className="separator";this.mainDiv.innerHTML="&nbsp;";}', "SeparatorElementContainer.prototype=new LogItemContainerElement();SeparatorElementContainer.prototype.remove=function(){this.mainDiv.parentNode.removeChild(this.mainDiv);this.mainDiv=null;};function Separator(){this.rendered=false;}", "Separator.prototype=new LogItem();copyProperties(Separator.prototype,{render:function(){var containerDomNode=this.group.contentDiv;if(isIe){this.unwrappedElementContainer=new SeparatorElementContainer(this.getUnwrappedDomContainer());this.wrappedElementContainer=new SeparatorElementContainer(this.getWrappedDomContainer());this.elementContainers=[this.unwrappedElementContainer,this.wrappedElementContainer];}else{this.mainElementContainer=new SeparatorElementContainer(this.getMainDomContainer());this.elementContainers=[this.mainElementContainer];}", 'this.content=this.formattedMessage;this.rendered=true;}});function GroupElementContainer(group,containerDomNode,isRoot,isWrapped){this.group=group;this.containerDomNode=containerDomNode;this.isRoot=isRoot;this.isWrapped=isWrapped;this.expandable=false;if(this.isRoot){if(isIe){this.contentDiv=logMainContainer.appendChild(document.createElement("div"));this.contentDiv.id=this.isWrapped?"log_wrapped":"log_unwrapped";}else{this.contentDiv=logMainContainer;}}else{var groupElementContainer=this;this.mainDiv=document.createElement("div");this.mainDiv.className="group";this.headingDiv=this.mainDiv.appendChild(document.createElement("div"));this.headingDiv.className="groupheading";this.expander=this.headingDiv.appendChild(document.createElement("span"));this.expander.className="expander unselectable greyedout";this.expander.unselectable=true;var expanderText=this.group.expanded?"-":"+";this.expanderTextNode=this.expander.appendChild(document.createTextNode(expanderText));this.headingDiv.appendChild(document.createTextNode(" "+this.group.name));this.contentDiv=this.mainDiv.appendChild(document.createElement("div"));var contentCssClass=this.group.expanded?"expanded":"collapsed";this.contentDiv.className="groupcontent "+contentCssClass;this.expander.onclick=function(){if(groupElementContainer.group.expandable){groupElementContainer.group.toggleExpanded();}};}}', 'GroupElementContainer.prototype=new LogItemContainerElement();copyProperties(GroupElementContainer.prototype,{toggleExpanded:function(){if(!this.isRoot){var oldCssClass,newCssClass,expanderText;if(this.group.expanded){newCssClass="expanded";oldCssClass="collapsed";expanderText="-";}else{newCssClass="collapsed";oldCssClass="expanded";expanderText="+";}', "replaceClass(this.contentDiv,newCssClass,oldCssClass);this.expanderTextNode.nodeValue=expanderText;}},remove:function(){if(!this.isRoot){this.headingDiv=null;this.expander.onclick=null;this.expander=null;this.expanderTextNode=null;this.contentDiv=null;this.containerDomNode=null;this.mainDiv.parentNode.removeChild(this.mainDiv);this.mainDiv=null;}},reverseChildren:function(){var node=null;var childDomNodes=[];while((node=this.contentDiv.firstChild)){this.contentDiv.removeChild(node);childDomNodes.push(node);}", 'while((node=childDomNodes.pop())){this.contentDiv.appendChild(node);}},update:function(){if(!this.isRoot){if(this.group.expandable){removeClass(this.expander,"greyedout");}else{addClass(this.expander,"greyedout");}}},clear:function(){if(this.isRoot){this.contentDiv.innerHTML="";}}});function Group(name,isRoot,initiallyExpanded){this.name=name;this.group=null;this.isRoot=isRoot;this.initiallyExpanded=initiallyExpanded;this.elementContainers=[];this.children=[];this.expanded=initiallyExpanded;this.rendered=false;this.expandable=false;}', "Group.prototype=new LogItem();copyProperties(Group.prototype,{addChild:function(logItem){this.children.push(logItem);logItem.group=this;},render:function(){if(isIe){var unwrappedDomContainer,wrappedDomContainer;if(this.isRoot){unwrappedDomContainer=logMainContainer;wrappedDomContainer=logMainContainer;}else{unwrappedDomContainer=this.getUnwrappedDomContainer();wrappedDomContainer=this.getWrappedDomContainer();}", "this.unwrappedElementContainer=new GroupElementContainer(this,unwrappedDomContainer,this.isRoot,false);this.wrappedElementContainer=new GroupElementContainer(this,wrappedDomContainer,this.isRoot,true);this.elementContainers=[this.unwrappedElementContainer,this.wrappedElementContainer];}else{var mainDomContainer=this.isRoot?logMainContainer:this.getMainDomContainer();this.mainElementContainer=new GroupElementContainer(this,mainDomContainer,this.isRoot,false);this.elementContainers=[this.mainElementContainer];}", "this.rendered=true;},toggleExpanded:function(){this.expanded=!this.expanded;for(var i=0,len=this.elementContainers.length;i<len;i++){this.elementContainers[i].toggleExpanded();}},expand:function(){if(!this.expanded){this.toggleExpanded();}},accept:function(visitor){visitor.visitGroup(this);},reverseChildren:function(){if(this.rendered){for(var i=0,len=this.elementContainers.length;i<len;i++){this.elementContainers[i].reverseChildren();}}},update:function(){var previouslyExpandable=this.expandable;this.expandable=(this.children.length!==0);if(this.expandable!==previouslyExpandable){for(var i=0,len=this.elementContainers.length;i<len;i++){this.elementContainers[i].update();}}},flatten:function(){var visitor=new GroupFlattener();this.accept(visitor);return visitor.logEntriesAndSeparators;},removeChild:function(child,doUpdate){array_remove(this.children,child);child.group=null;if(doUpdate){this.update();}},remove:function(doUpdate,removeFromGroup){for(var i=0,len=this.children.length;i<len;i++){this.children[i].remove(false,false);}", "this.children=[];this.update();if(this===currentGroup){currentGroup=this.group;}", "this.doRemove(doUpdate,removeFromGroup);},serialize:function(items){items.push([LogItem.serializedItemKeys.GROUP_START,this.name]);for(var i=0,len=this.children.length;i<len;i++){this.children[i].serialize(items);}", "if(this!==currentGroup){items.push([LogItem.serializedItemKeys.GROUP_END]);}},clear:function(){for(var i=0,len=this.elementContainers.length;i<len;i++){this.elementContainers[i].clear();}}});function LogEntryElementContainer(){}", 'LogEntryElementContainer.prototype=new LogItemContainerElement();copyProperties(LogEntryElementContainer.prototype,{remove:function(){this.doRemove();},doRemove:function(){this.mainDiv.parentNode.removeChild(this.mainDiv);this.mainDiv=null;this.contentElement=null;this.containerDomNode=null;},setContent:function(content,wrappedContent){if(content===this.formattedMessage){this.contentElement.innerHTML="";this.contentElement.appendChild(document.createTextNode(this.formattedMessage));}else{this.contentElement.innerHTML=content;}},setSearchMatch:function(isMatch){var oldCssClass=isMatch?"searchnonmatch":"searchmatch";var newCssClass=isMatch?"searchmatch":"searchnonmatch";replaceClass(this.mainDiv,newCssClass,oldCssClass);},clearSearch:function(){removeClass(this.mainDiv,"searchmatch");removeClass(this.mainDiv,"searchnonmatch");}});function LogEntryWrappedElementContainer(logEntry,containerDomNode){this.logEntry=logEntry;this.containerDomNode=containerDomNode;this.mainDiv=document.createElement("div");this.mainDiv.appendChild(document.createTextNode(this.logEntry.formattedMessage));this.mainDiv.className="logentry wrapped "+this.logEntry.level;this.contentElement=this.mainDiv;}', 'LogEntryWrappedElementContainer.prototype=new LogEntryElementContainer();LogEntryWrappedElementContainer.prototype.setContent=function(content,wrappedContent){if(content===this.formattedMessage){this.contentElement.innerHTML="";this.contentElement.appendChild(document.createTextNode(this.formattedMessage));}else{this.contentElement.innerHTML=wrappedContent;}};function LogEntryUnwrappedElementContainer(logEntry,containerDomNode){this.logEntry=logEntry;this.containerDomNode=containerDomNode;this.mainDiv=document.createElement("div");this.mainDiv.className="logentry unwrapped "+this.logEntry.level;this.pre=this.mainDiv.appendChild(document.createElement("pre"));this.pre.appendChild(document.createTextNode(this.logEntry.formattedMessage));this.pre.className="unwrapped";this.contentElement=this.pre;}', 'LogEntryUnwrappedElementContainer.prototype=new LogEntryElementContainer();LogEntryUnwrappedElementContainer.prototype.remove=function(){this.doRemove();this.pre=null;};function LogEntryMainElementContainer(logEntry,containerDomNode){this.logEntry=logEntry;this.containerDomNode=containerDomNode;this.mainDiv=document.createElement("div");this.mainDiv.className="logentry nonielogentry "+this.logEntry.level;this.contentElement=this.mainDiv.appendChild(document.createElement("span"));this.contentElement.appendChild(document.createTextNode(this.logEntry.formattedMessage));}', "LogEntryMainElementContainer.prototype=new LogEntryElementContainer();function LogEntry(level,formattedMessage){this.level=level;this.formattedMessage=formattedMessage;this.rendered=false;}", 'LogEntry.prototype=new LogItem();copyProperties(LogEntry.prototype,{render:function(){var logEntry=this;var containerDomNode=this.group.contentDiv;if(isIe){this.formattedMessage=this.formattedMessage.replace(/\\r\\n/g,"\\r");this.unwrappedElementContainer=new LogEntryUnwrappedElementContainer(this,this.getUnwrappedDomContainer());this.wrappedElementContainer=new LogEntryWrappedElementContainer(this,this.getWrappedDomContainer());this.elementContainers=[this.unwrappedElementContainer,this.wrappedElementContainer];}else{this.mainElementContainer=new LogEntryMainElementContainer(this,this.getMainDomContainer());this.elementContainers=[this.mainElementContainer];}', 'this.content=this.formattedMessage;this.rendered=true;},setContent:function(content,wrappedContent){if(content!=this.content){if(isIe&&(content!==this.formattedMessage)){content=content.replace(/\\r\\n/g,"\\r");}', "for(var i=0,len=this.elementContainers.length;i<len;i++){this.elementContainers[i].setContent(content,wrappedContent);}", 'this.content=content;}},getSearchMatches:function(){var matches=[];var i,len;if(isIe){var unwrappedEls=getElementsByClass(this.unwrappedElementContainer.mainDiv,"searchterm","span");var wrappedEls=getElementsByClass(this.wrappedElementContainer.mainDiv,"searchterm","span");for(i=0,len=unwrappedEls.length;i<len;i++){matches[i]=new Match(this.level,null,unwrappedEls[i],wrappedEls[i]);}}else{var els=getElementsByClass(this.mainElementContainer.mainDiv,"searchterm","span");for(i=0,len=els.length;i<len;i++){matches[i]=new Match(this.level,els[i]);}}', "return matches;},setSearchMatch:function(isMatch){for(var i=0,len=this.elementContainers.length;i<len;i++){this.elementContainers[i].setSearchMatch(isMatch);}},clearSearch:function(){for(var i=0,len=this.elementContainers.length;i<len;i++){this.elementContainers[i].clearSearch();}},accept:function(visitor){visitor.visitLogEntry(this);},serialize:function(items){items.push([LogItem.serializedItemKeys.LOG_ENTRY,this.level,this.formattedMessage]);}});function LogItemVisitor(){}", "LogItemVisitor.prototype={visit:function(logItem){},visitParent:function(logItem){if(logItem.group){logItem.group.accept(this);}},visitChildren:function(logItem){for(var i=0,len=logItem.children.length;i<len;i++){logItem.children[i].accept(this);}},visitLogEntry:function(logEntry){this.visit(logEntry);},visitSeparator:function(separator){this.visit(separator);},visitGroup:function(group){this.visit(group);}};function GroupFlattener(){this.logEntriesAndSeparators=[];}", 'GroupFlattener.prototype=new LogItemVisitor();GroupFlattener.prototype.visitGroup=function(group){this.visitChildren(group);};GroupFlattener.prototype.visitLogEntry=function(logEntry){this.logEntriesAndSeparators.push(logEntry);};GroupFlattener.prototype.visitSeparator=function(separator){this.logEntriesAndSeparators.push(separator);};window.onload=function(){if(location.search){var queryBits=unescape(location.search).substr(1).split("&"),nameValueBits;for(var i=0,len=queryBits.length;i<len;i++){nameValueBits=queryBits[i].split("=");if(nameValueBits[0]=="log4javascript_domain"){document.domain=nameValueBits[1];break;}}}', 'logMainContainer=$("log");if(isIePre7){addClass(logMainContainer,"oldIe");}', 'rootGroup=new Group("root",true);rootGroup.render();currentGroup=rootGroup;setCommandInputWidth();setLogContainerHeight();toggleLoggingEnabled();toggleSearchEnabled();toggleSearchFilter();toggleSearchHighlight();applyFilters();checkAllLevels();toggleWrap();toggleNewestAtTop();toggleScrollToLatest();renderQueuedLogItems();loaded=true;$("command").value="";$("command").autocomplete="off";$("command").onkeydown=function(evt){evt=getEvent(evt);if(evt.keyCode==10||evt.keyCode==13){evalCommandLine();stopPropagation(evt);}else if(evt.keyCode==27){this.value="";this.focus();}else if(evt.keyCode==38&&commandHistory.length>0){currentCommandIndex=Math.max(0,currentCommandIndex-1);this.value=commandHistory[currentCommandIndex];moveCaretToEnd(this);}else if(evt.keyCode==40&&commandHistory.length>0){currentCommandIndex=Math.min(commandHistory.length-1,currentCommandIndex+1);this.value=commandHistory[currentCommandIndex];moveCaretToEnd(this);}};$("command").onkeypress=function(evt){evt=getEvent(evt);if(evt.keyCode==38&&commandHistory.length>0&&evt.preventDefault){evt.preventDefault();}};$("command").onkeyup=function(evt){evt=getEvent(evt);if(evt.keyCode==27&&evt.preventDefault){evt.preventDefault();this.focus();}};document.onkeydown=function keyEventHandler(evt){evt=getEvent(evt);switch(evt.keyCode){case 69:if(evt.shiftKey&&(evt.ctrlKey||evt.metaKey)){evalLastCommand();cancelKeyEvent(evt);return false;}', "break;case 75:if(evt.shiftKey&&(evt.ctrlKey||evt.metaKey)){focusSearch();cancelKeyEvent(evt);return false;}", "break;case 40:case 76:if(evt.shiftKey&&(evt.ctrlKey||evt.metaKey)){focusCommandLine();cancelKeyEvent(evt);return false;}", "break;}};setTimeout(setLogContainerHeight,20);setShowCommandLine(showCommandLine);doSearch();};window.onunload=function(){if(mainWindowExists()){appender.unload();}", 'appender=null;};function toggleLoggingEnabled(){setLoggingEnabled($("enableLogging").checked);}', "function setLoggingEnabled(enable){loggingEnabled=enable;}", "var appender=null;function setAppender(appenderParam){appender=appenderParam;}", 'function setShowCloseButton(showCloseButton){$("closeButton").style.display=showCloseButton?"inline":"none";}', 'function setShowHideButton(showHideButton){$("hideButton").style.display=showHideButton?"inline":"none";}', "var newestAtTop=false;function LogItemContentReverser(){}", "LogItemContentReverser.prototype=new LogItemVisitor();LogItemContentReverser.prototype.visitGroup=function(group){group.reverseChildren();this.visitChildren(group);};function setNewestAtTop(isNewestAtTop){var oldNewestAtTop=newestAtTop;var i,iLen,j,jLen;newestAtTop=Boolean(isNewestAtTop);if(oldNewestAtTop!=newestAtTop){var visitor=new LogItemContentReverser();rootGroup.accept(visitor);if(currentSearch){var currentMatch=currentSearch.matches[currentMatchIndex];var matchIndex=0;var matches=[];var actOnLogEntry=function(logEntry){var logEntryMatches=logEntry.getSearchMatches();for(j=0,jLen=logEntryMatches.length;j<jLen;j++){matches[matchIndex]=logEntryMatches[j];if(currentMatch&&logEntryMatches[j].equals(currentMatch)){currentMatchIndex=matchIndex;}", "matchIndex++;}};if(newestAtTop){for(i=logEntries.length-1;i>=0;i--){actOnLogEntry(logEntries[i]);}}else{for(i=0,iLen=logEntries.length;i<iLen;i++){actOnLogEntry(logEntries[i]);}}", "currentSearch.matches=matches;if(currentMatch){currentMatch.setCurrent();}}else if(scrollToLatest){doScrollToLatest();}}", '$("newestAtTop").checked=isNewestAtTop;}', 'function toggleNewestAtTop(){var isNewestAtTop=$("newestAtTop").checked;setNewestAtTop(isNewestAtTop);}', "var scrollToLatest=true;function setScrollToLatest(isScrollToLatest){scrollToLatest=isScrollToLatest;if(scrollToLatest){doScrollToLatest();}", '$("scrollToLatest").checked=isScrollToLatest;}', 'function toggleScrollToLatest(){var isScrollToLatest=$("scrollToLatest").checked;setScrollToLatest(isScrollToLatest);}', 'function doScrollToLatest(){var l=logMainContainer;if(typeof l.scrollTop!="undefined"){if(newestAtTop){l.scrollTop=0;}else{var latestLogEntry=l.lastChild;if(latestLogEntry){l.scrollTop=l.scrollHeight;}}}}', "var closeIfOpenerCloses=true;function setCloseIfOpenerCloses(isCloseIfOpenerCloses){closeIfOpenerCloses=isCloseIfOpenerCloses;}", "var maxMessages=null;function setMaxMessages(max){maxMessages=max;pruneLogEntries();}", 'var showCommandLine=false;function setShowCommandLine(isShowCommandLine){showCommandLine=isShowCommandLine;if(loaded){$("commandLine").style.display=showCommandLine?"block":"none";setCommandInputWidth();setLogContainerHeight();}}', 'function focusCommandLine(){if(loaded){$("command").focus();}}', 'function focusSearch(){if(loaded){$("searchBox").focus();}}', "function getLogItems(){var items=[];for(var i=0,len=logItems.length;i<len;i++){logItems[i].serialize(items);}", "return items;}", "function setLogItems(items){var loggingReallyEnabled=loggingEnabled;loggingEnabled=true;for(var i=0,len=items.length;i<len;i++){switch(items[i][0]){case LogItem.serializedItemKeys.LOG_ENTRY:log(items[i][1],items[i][2]);break;case LogItem.serializedItemKeys.GROUP_START:group(items[i][1]);break;case LogItem.serializedItemKeys.GROUP_END:groupEnd();break;}}", "loggingEnabled=loggingReallyEnabled;}", "function log(logLevel,formattedMessage){if(loggingEnabled){var logEntry=new LogEntry(logLevel,formattedMessage);logEntries.push(logEntry);logEntriesAndSeparators.push(logEntry);logItems.push(logEntry);currentGroup.addChild(logEntry);if(loaded){if(logQueuedEventsTimer!==null){clearTimeout(logQueuedEventsTimer);}", "logQueuedEventsTimer=setTimeout(renderQueuedLogItems,renderDelay);unrenderedLogItemsExist=true;}}}", "function renderQueuedLogItems(){logQueuedEventsTimer=null;var pruned=pruneLogEntries();var initiallyHasMatches=currentSearch?currentSearch.hasMatches():false;for(var i=0,len=logItems.length;i<len;i++){if(!logItems[i].rendered){logItems[i].render();logItems[i].appendToLog();if(currentSearch&&(logItems[i]instanceof LogEntry)){currentSearch.applyTo(logItems[i]);}}}", "if(currentSearch){if(pruned){if(currentSearch.hasVisibleMatches()){if(currentMatchIndex===null){setCurrentMatchIndex(0);}", "displayMatches();}else{displayNoMatches();}}else if(!initiallyHasMatches&&currentSearch.hasVisibleMatches()){setCurrentMatchIndex(0);displayMatches();}}", "if(scrollToLatest){doScrollToLatest();}", "unrenderedLogItemsExist=false;}", "function pruneLogEntries(){if((maxMessages!==null)&&(logEntriesAndSeparators.length>maxMessages)){var numberToDelete=logEntriesAndSeparators.length-maxMessages;var prunedLogEntries=logEntriesAndSeparators.slice(0,numberToDelete);if(currentSearch){currentSearch.removeMatches(prunedLogEntries);}", "var group;for(var i=0;i<numberToDelete;i++){group=logEntriesAndSeparators[i].group;array_remove(logItems,logEntriesAndSeparators[i]);array_remove(logEntries,logEntriesAndSeparators[i]);logEntriesAndSeparators[i].remove(true,true);if(group.children.length===0&&group!==currentGroup&&group!==rootGroup){array_remove(logItems,group);group.remove(true,true);}}", "logEntriesAndSeparators=array_removeFromStart(logEntriesAndSeparators,numberToDelete);return true;}", "return false;}", 'function group(name,startExpanded){if(loggingEnabled){initiallyExpanded=(typeof startExpanded==="undefined")?true:Boolean(startExpanded);var newGroup=new Group(name,false,initiallyExpanded);currentGroup.addChild(newGroup);currentGroup=newGroup;logItems.push(newGroup);if(loaded){if(logQueuedEventsTimer!==null){clearTimeout(logQueuedEventsTimer);}', "logQueuedEventsTimer=setTimeout(renderQueuedLogItems,renderDelay);unrenderedLogItemsExist=true;}}}", "function groupEnd(){currentGroup=(currentGroup===rootGroup)?rootGroup:currentGroup.group;}", "function mainPageReloaded(){currentGroup=rootGroup;var separator=new Separator();logEntriesAndSeparators.push(separator);logItems.push(separator);currentGroup.addChild(separator);}", "function closeWindow(){if(appender&&mainWindowExists()){appender.close(true);}else{window.close();}}", "function hide(){if(appender&&mainWindowExists()){appender.hide();}}", 'var mainWindow=window;var windowId="log4javascriptConsoleWindow_"+new Date().getTime()+"_"+(""+Math.random()).substr(2);function setMainWindow(win){mainWindow=win;mainWindow[windowId]=window;if(opener&&closeIfOpenerCloses){pollOpener();}}', "function pollOpener(){if(closeIfOpenerCloses){if(mainWindowExists()){setTimeout(pollOpener,500);}else{closeWindow();}}}", "function mainWindowExists(){try{return(mainWindow&&!mainWindow.closed&&mainWindow[windowId]==window);}catch(ex){}", "return false;}", 'var logLevels=["TRACE","DEBUG","INFO","WARN","ERROR","FATAL"];function getCheckBox(logLevel){return $("switch_"+logLevel);}', 'function getIeWrappedLogContainer(){return $("log_wrapped");}', 'function getIeUnwrappedLogContainer(){return $("log_unwrapped");}', "function applyFilters(){for(var i=0;i<logLevels.length;i++){if(getCheckBox(logLevels[i]).checked){addClass(logMainContainer,logLevels[i]);}else{removeClass(logMainContainer,logLevels[i]);}}", "updateSearchFromFilters();}", 'function toggleAllLevels(){var turnOn=$("switch_ALL").checked;for(var i=0;i<logLevels.length;i++){getCheckBox(logLevels[i]).checked=turnOn;if(turnOn){addClass(logMainContainer,logLevels[i]);}else{removeClass(logMainContainer,logLevels[i]);}}}', 'function checkAllLevels(){for(var i=0;i<logLevels.length;i++){if(!getCheckBox(logLevels[i]).checked){getCheckBox("ALL").checked=false;return;}}', 'getCheckBox("ALL").checked=true;}', "function clearLog(){rootGroup.clear();currentGroup=rootGroup;logEntries=[];logItems=[];logEntriesAndSeparators=[];doSearch();}", 'function toggleWrap(){var enable=$("wrap").checked;if(enable){addClass(logMainContainer,"wrap");}else{removeClass(logMainContainer,"wrap");}', "refreshCurrentMatch();}", "var searchTimer=null;function scheduleSearch(){try{clearTimeout(searchTimer);}catch(ex){}", "searchTimer=setTimeout(doSearch,500);}", "function Search(searchTerm,isRegex,searchRegex,isCaseSensitive){this.searchTerm=searchTerm;this.isRegex=isRegex;this.searchRegex=searchRegex;this.isCaseSensitive=isCaseSensitive;this.matches=[];}", "Search.prototype={hasMatches:function(){return this.matches.length>0;},hasVisibleMatches:function(){if(this.hasMatches()){for(var i=0;i<this.matches.length;i++){if(this.matches[i].isVisible()){return true;}}}", "return false;},match:function(logEntry){var entryText=String(logEntry.formattedMessage);var matchesSearch=false;if(this.isRegex){matchesSearch=this.searchRegex.test(entryText);}else if(this.isCaseSensitive){matchesSearch=(entryText.indexOf(this.searchTerm)>-1);}else{matchesSearch=(entryText.toLowerCase().indexOf(this.searchTerm.toLowerCase())>-1);}", "return matchesSearch;},getNextVisibleMatchIndex:function(){for(var i=currentMatchIndex+1;i<this.matches.length;i++){if(this.matches[i].isVisible()){return i;}}", "for(i=0;i<=currentMatchIndex;i++){if(this.matches[i].isVisible()){return i;}}", "return-1;},getPreviousVisibleMatchIndex:function(){for(var i=currentMatchIndex-1;i>=0;i--){if(this.matches[i].isVisible()){return i;}}", "for(var i=this.matches.length-1;i>=currentMatchIndex;i--){if(this.matches[i].isVisible()){return i;}}", 'return-1;},applyTo:function(logEntry){var doesMatch=this.match(logEntry);if(doesMatch){logEntry.group.expand();logEntry.setSearchMatch(true);var logEntryContent;var wrappedLogEntryContent;var searchTermReplacementStartTag="<span class=\\"searchterm\\">";var searchTermReplacementEndTag="<"+"/span>";var preTagName=isIe?"pre":"span";var preStartTag="<"+preTagName+" class=\\"pre\\">";var preEndTag="<"+"/"+preTagName+">";var startIndex=0;var searchIndex,matchedText,textBeforeMatch;if(this.isRegex){var flags=this.isCaseSensitive?"g":"gi";var capturingRegex=new RegExp("("+this.searchRegex.source+")",flags);var rnd=(""+Math.random()).substr(2);var startToken="%%s"+rnd+"%%";var endToken="%%e"+rnd+"%%";logEntryContent=logEntry.formattedMessage.replace(capturingRegex,startToken+"$1"+endToken);logEntryContent=escapeHtml(logEntryContent);var result;var searchString=logEntryContent;logEntryContent="";wrappedLogEntryContent="";while((searchIndex=searchString.indexOf(startToken,startIndex))>-1){var endTokenIndex=searchString.indexOf(endToken,searchIndex);matchedText=searchString.substring(searchIndex+startToken.length,endTokenIndex);textBeforeMatch=searchString.substring(startIndex,searchIndex);logEntryContent+=preStartTag+textBeforeMatch+preEndTag;logEntryContent+=searchTermReplacementStartTag+preStartTag+matchedText+', "preEndTag+searchTermReplacementEndTag;if(isIe){wrappedLogEntryContent+=textBeforeMatch+searchTermReplacementStartTag+", "matchedText+searchTermReplacementEndTag;}", "startIndex=endTokenIndex+endToken.length;}", 'logEntryContent+=preStartTag+searchString.substr(startIndex)+preEndTag;if(isIe){wrappedLogEntryContent+=searchString.substr(startIndex);}}else{logEntryContent="";wrappedLogEntryContent="";var searchTermReplacementLength=searchTermReplacementStartTag.length+', "this.searchTerm.length+searchTermReplacementEndTag.length;var searchTermLength=this.searchTerm.length;var searchTermLowerCase=this.searchTerm.toLowerCase();var logTextLowerCase=logEntry.formattedMessage.toLowerCase();while((searchIndex=logTextLowerCase.indexOf(searchTermLowerCase,startIndex))>-1){matchedText=escapeHtml(logEntry.formattedMessage.substr(searchIndex,this.searchTerm.length));textBeforeMatch=escapeHtml(logEntry.formattedMessage.substring(startIndex,searchIndex));var searchTermReplacement=searchTermReplacementStartTag+", "preStartTag+matchedText+preEndTag+searchTermReplacementEndTag;logEntryContent+=preStartTag+textBeforeMatch+preEndTag+searchTermReplacement;if(isIe){wrappedLogEntryContent+=textBeforeMatch+searchTermReplacementStartTag+", "matchedText+searchTermReplacementEndTag;}", "startIndex=searchIndex+searchTermLength;}", "var textAfterLastMatch=escapeHtml(logEntry.formattedMessage.substr(startIndex));logEntryContent+=preStartTag+textAfterLastMatch+preEndTag;if(isIe){wrappedLogEntryContent+=textAfterLastMatch;}}", "logEntry.setContent(logEntryContent,wrappedLogEntryContent);var logEntryMatches=logEntry.getSearchMatches();this.matches=this.matches.concat(logEntryMatches);}else{logEntry.setSearchMatch(false);logEntry.setContent(logEntry.formattedMessage,logEntry.formattedMessage);}", "return doesMatch;},removeMatches:function(logEntries){var matchesToRemoveCount=0;var currentMatchRemoved=false;var matchesToRemove=[];var i,iLen,j,jLen;for(i=0,iLen=this.matches.length;i<iLen;i++){for(j=0,jLen=logEntries.length;j<jLen;j++){if(this.matches[i].belongsTo(logEntries[j])){matchesToRemove.push(this.matches[i]);if(i===currentMatchIndex){currentMatchRemoved=true;}}}}", "var newMatch=currentMatchRemoved?null:this.matches[currentMatchIndex];if(currentMatchRemoved){for(i=currentMatchIndex,iLen=this.matches.length;i<iLen;i++){if(this.matches[i].isVisible()&&!array_contains(matchesToRemove,this.matches[i])){newMatch=this.matches[i];break;}}}", "for(i=0,iLen=matchesToRemove.length;i<iLen;i++){array_remove(this.matches,matchesToRemove[i]);matchesToRemove[i].remove();}", "if(this.hasVisibleMatches()){if(newMatch===null){setCurrentMatchIndex(0);}else{var newMatchIndex=0;for(i=0,iLen=this.matches.length;i<iLen;i++){if(newMatch===this.matches[i]){newMatchIndex=i;break;}}", "setCurrentMatchIndex(newMatchIndex);}}else{currentMatchIndex=null;displayNoMatches();}}};function getPageOffsetTop(el,container){var currentEl=el;var y=0;while(currentEl&&currentEl!=container){y+=currentEl.offsetTop;currentEl=currentEl.offsetParent;}", "return y;}", 'function scrollIntoView(el){var logContainer=logMainContainer;if(!$("wrap").checked){var logContainerLeft=logContainer.scrollLeft;var logContainerRight=logContainerLeft+logContainer.offsetWidth;var elLeft=el.offsetLeft;var elRight=elLeft+el.offsetWidth;if(elLeft<logContainerLeft||elRight>logContainerRight){logContainer.scrollLeft=elLeft-(logContainer.offsetWidth-el.offsetWidth)/2;}}', "var logContainerTop=logContainer.scrollTop;var logContainerBottom=logContainerTop+logContainer.offsetHeight;var elTop=getPageOffsetTop(el)-getToolBarsHeight();var elBottom=elTop+el.offsetHeight;if(elTop<logContainerTop||elBottom>logContainerBottom){logContainer.scrollTop=elTop-(logContainer.offsetHeight-el.offsetHeight)/2;}}", "function Match(logEntryLevel,spanInMainDiv,spanInUnwrappedPre,spanInWrappedDiv){this.logEntryLevel=logEntryLevel;this.spanInMainDiv=spanInMainDiv;if(isIe){this.spanInUnwrappedPre=spanInUnwrappedPre;this.spanInWrappedDiv=spanInWrappedDiv;}", "this.mainSpan=isIe?spanInUnwrappedPre:spanInMainDiv;}", 'Match.prototype={equals:function(match){return this.mainSpan===match.mainSpan;},setCurrent:function(){if(isIe){addClass(this.spanInUnwrappedPre,"currentmatch");addClass(this.spanInWrappedDiv,"currentmatch");var elementToScroll=$("wrap").checked?this.spanInWrappedDiv:this.spanInUnwrappedPre;scrollIntoView(elementToScroll);}else{addClass(this.spanInMainDiv,"currentmatch");scrollIntoView(this.spanInMainDiv);}},belongsTo:function(logEntry){if(isIe){return isDescendant(this.spanInUnwrappedPre,logEntry.unwrappedPre);}else{return isDescendant(this.spanInMainDiv,logEntry.mainDiv);}},setNotCurrent:function(){if(isIe){removeClass(this.spanInUnwrappedPre,"currentmatch");removeClass(this.spanInWrappedDiv,"currentmatch");}else{removeClass(this.spanInMainDiv,"currentmatch");}},isOrphan:function(){return isOrphan(this.mainSpan);},isVisible:function(){return getCheckBox(this.logEntryLevel).checked;},remove:function(){if(isIe){this.spanInUnwrappedPre=null;this.spanInWrappedDiv=null;}else{this.spanInMainDiv=null;}}};var currentSearch=null;var currentMatchIndex=null;function doSearch(){var searchBox=$("searchBox");var searchTerm=searchBox.value;var isRegex=$("searchRegex").checked;var isCaseSensitive=$("searchCaseSensitive").checked;var i;if(searchTerm===""){$("searchReset").disabled=true;$("searchNav").style.display="none";removeClass(document.body,"searching");removeClass(searchBox,"hasmatches");removeClass(searchBox,"nomatches");for(i=0;i<logEntries.length;i++){logEntries[i].clearSearch();logEntries[i].setContent(logEntries[i].formattedMessage,logEntries[i].formattedMessage);}', 'currentSearch=null;setLogContainerHeight();}else{$("searchReset").disabled=false;$("searchNav").style.display="block";var searchRegex;var regexValid;if(isRegex){try{searchRegex=isCaseSensitive?new RegExp(searchTerm,"g"):new RegExp(searchTerm,"gi");regexValid=true;replaceClass(searchBox,"validregex","invalidregex");searchBox.title="Valid regex";}catch(ex){regexValid=false;replaceClass(searchBox,"invalidregex","validregex");searchBox.title="Invalid regex: "+(ex.message?ex.message:(ex.description?ex.description:"unknown error"));return;}}else{searchBox.title="";removeClass(searchBox,"validregex");removeClass(searchBox,"invalidregex");}', 'addClass(document.body,"searching");currentSearch=new Search(searchTerm,isRegex,searchRegex,isCaseSensitive);for(i=0;i<logEntries.length;i++){currentSearch.applyTo(logEntries[i]);}', "setLogContainerHeight();if(currentSearch.hasVisibleMatches()){setCurrentMatchIndex(0);displayMatches();}else{displayNoMatches();}}}", "function updateSearchFromFilters(){if(currentSearch){if(currentSearch.hasMatches()){if(currentMatchIndex===null){currentMatchIndex=0;}", "var currentMatch=currentSearch.matches[currentMatchIndex];if(currentMatch.isVisible()){displayMatches();setCurrentMatchIndex(currentMatchIndex);}else{currentMatch.setNotCurrent();var nextVisibleMatchIndex=currentSearch.getNextVisibleMatchIndex();if(nextVisibleMatchIndex>-1){setCurrentMatchIndex(nextVisibleMatchIndex);displayMatches();}else{displayNoMatches();}}}else{displayNoMatches();}}}", "function refreshCurrentMatch(){if(currentSearch&&currentSearch.hasVisibleMatches()){setCurrentMatchIndex(currentMatchIndex);}}", 'function displayMatches(){replaceClass($("searchBox"),"hasmatches","nomatches");$("searchBox").title=""+currentSearch.matches.length+" matches found";$("searchNav").style.display="block";setLogContainerHeight();}', 'function displayNoMatches(){replaceClass($("searchBox"),"nomatches","hasmatches");$("searchBox").title="No matches found";$("searchNav").style.display="none";setLogContainerHeight();}', 'function toggleSearchEnabled(enable){enable=(typeof enable=="undefined")?!$("searchDisable").checked:enable;$("searchBox").disabled=!enable;$("searchReset").disabled=!enable;$("searchRegex").disabled=!enable;$("searchNext").disabled=!enable;$("searchPrevious").disabled=!enable;$("searchCaseSensitive").disabled=!enable;$("searchNav").style.display=(enable&&($("searchBox").value!=="")&&currentSearch&&currentSearch.hasVisibleMatches())?"block":"none";if(enable){removeClass($("search"),"greyedout");addClass(document.body,"searching");if($("searchHighlight").checked){addClass(logMainContainer,"searchhighlight");}else{removeClass(logMainContainer,"searchhighlight");}', 'if($("searchFilter").checked){addClass(logMainContainer,"searchfilter");}else{removeClass(logMainContainer,"searchfilter");}', '$("searchDisable").checked=!enable;}else{addClass($("search"),"greyedout");removeClass(document.body,"searching");removeClass(logMainContainer,"searchhighlight");removeClass(logMainContainer,"searchfilter");}', "setLogContainerHeight();}", 'function toggleSearchFilter(){var enable=$("searchFilter").checked;if(enable){addClass(logMainContainer,"searchfilter");}else{removeClass(logMainContainer,"searchfilter");}', "refreshCurrentMatch();}", 'function toggleSearchHighlight(){var enable=$("searchHighlight").checked;if(enable){addClass(logMainContainer,"searchhighlight");}else{removeClass(logMainContainer,"searchhighlight");}}', 'function clearSearch(){$("searchBox").value="";doSearch();}', 'function searchNext(){if(currentSearch!==null&&currentMatchIndex!==null){currentSearch.matches[currentMatchIndex].setNotCurrent();var nextMatchIndex=currentSearch.getNextVisibleMatchIndex();if(nextMatchIndex>currentMatchIndex||confirm("Reached the end of the page. Start from the top?")){setCurrentMatchIndex(nextMatchIndex);}}}', 'function searchPrevious(){if(currentSearch!==null&&currentMatchIndex!==null){currentSearch.matches[currentMatchIndex].setNotCurrent();var previousMatchIndex=currentSearch.getPreviousVisibleMatchIndex();if(previousMatchIndex<currentMatchIndex||confirm("Reached the start of the page. Continue from the bottom?")){setCurrentMatchIndex(previousMatchIndex);}}}', "function setCurrentMatchIndex(index){currentMatchIndex=index;currentSearch.matches[currentMatchIndex].setCurrent();}", 'function addClass(el,cssClass){if(!hasClass(el,cssClass)){if(el.className){el.className+=" "+cssClass;}else{el.className=cssClass;}}}', 'function hasClass(el,cssClass){if(el.className){var classNames=el.className.split(" ");return array_contains(classNames,cssClass);}', "return false;}", 'function removeClass(el,cssClass){if(hasClass(el,cssClass)){var existingClasses=el.className.split(" ");var newClasses=[];for(var i=0,len=existingClasses.length;i<len;i++){if(existingClasses[i]!=cssClass){newClasses[newClasses.length]=existingClasses[i];}}', 'el.className=newClasses.join(" ");}}', "function replaceClass(el,newCssClass,oldCssClass){removeClass(el,oldCssClass);addClass(el,newCssClass);}", "function getElementsByClass(el,cssClass,tagName){var elements=el.getElementsByTagName(tagName);var matches=[];for(var i=0,len=elements.length;i<len;i++){if(hasClass(elements[i],cssClass)){matches.push(elements[i]);}}", "return matches;}", "function $(id){return document.getElementById(id);}", "function isDescendant(node,ancestorNode){while(node!=null){if(node===ancestorNode){return true;}", "node=node.parentNode;}", "return false;}", "function isOrphan(node){var currentNode=node;while(currentNode){if(currentNode==document.body){return false;}", "currentNode=currentNode.parentNode;}", "return true;}", 'function escapeHtml(str){return str.replace(/&/g,"&amp;").replace(/[<]/g,"&lt;").replace(/>/g,"&gt;");}', "function getWindowWidth(){if(window.innerWidth){return window.innerWidth;}else if(document.documentElement&&document.documentElement.clientWidth){return document.documentElement.clientWidth;}else if(document.body){return document.body.clientWidth;}", "return 0;}", "function getWindowHeight(){if(window.innerHeight){return window.innerHeight;}else if(document.documentElement&&document.documentElement.clientHeight){return document.documentElement.clientHeight;}else if(document.body){return document.body.clientHeight;}", "return 0;}", 'function getToolBarsHeight(){return $("switches").offsetHeight;}', 'function getChromeHeight(){var height=getToolBarsHeight();if(showCommandLine){height+=$("commandLine").offsetHeight;}', "return height;}", 'function setLogContainerHeight(){if(logMainContainer){var windowHeight=getWindowHeight();$("body").style.height=getWindowHeight()+"px";logMainContainer.style.height=""+', 'Math.max(0,windowHeight-getChromeHeight())+"px";}}', 'function setCommandInputWidth(){if(showCommandLine){$("command").style.width=""+Math.max(0,$("commandLineContainer").offsetWidth-', '($("evaluateButton").offsetWidth+13))+"px";}}', "window.onresize=function(){setCommandInputWidth();setLogContainerHeight();};if(!Array.prototype.push){Array.prototype.push=function(){for(var i=0,len=arguments.length;i<len;i++){this[this.length]=arguments[i];}", "return this.length;};}", "if(!Array.prototype.pop){Array.prototype.pop=function(){if(this.length>0){var val=this[this.length-1];this.length=this.length-1;return val;}};}", "if(!Array.prototype.shift){Array.prototype.shift=function(){if(this.length>0){var firstItem=this[0];for(var i=0,len=this.length-1;i<len;i++){this[i]=this[i+1];}", "this.length=this.length-1;return firstItem;}};}", "if(!Array.prototype.splice){Array.prototype.splice=function(startIndex,deleteCount){var itemsAfterDeleted=this.slice(startIndex+deleteCount);var itemsDeleted=this.slice(startIndex,startIndex+deleteCount);this.length=startIndex;var argumentsArray=[];for(var i=0,len=arguments.length;i<len;i++){argumentsArray[i]=arguments[i];}", "var itemsToAppend=(argumentsArray.length>2)?itemsAfterDeleted=argumentsArray.slice(2).concat(itemsAfterDeleted):itemsAfterDeleted;for(i=0,len=itemsToAppend.length;i<len;i++){this.push(itemsToAppend[i]);}", "return itemsDeleted;};}", "function array_remove(arr,val){var index=-1;for(var i=0,len=arr.length;i<len;i++){if(arr[i]===val){index=i;break;}}", "if(index>=0){arr.splice(index,1);return index;}else{return false;}}", "function array_removeFromStart(array,numberToRemove){if(Array.prototype.splice){array.splice(0,numberToRemove);}else{for(var i=numberToRemove,len=array.length;i<len;i++){array[i-numberToRemove]=array[i];}", "array.length=array.length-numberToRemove;}", "return array;}", "function array_contains(arr,val){for(var i=0,len=arr.length;i<len;i++){if(arr[i]==val){return true;}}", "return false;}", "function getErrorMessage(ex){if(ex.message){return ex.message;}else if(ex.description){return ex.description;}", 'return""+ex;}', "function moveCaretToEnd(input){if(input.setSelectionRange){input.focus();var length=input.value.length;input.setSelectionRange(length,length);}else if(input.createTextRange){var range=input.createTextRange();range.collapse(false);range.select();}", "input.focus();}", 'function stopPropagation(evt){if(evt.stopPropagation){evt.stopPropagation();}else if(typeof evt.cancelBubble!="undefined"){evt.cancelBubble=true;}}', "function getEvent(evt){return evt?evt:event;}", "function getTarget(evt){return evt.target?evt.target:evt.srcElement;}", 'function getRelatedTarget(evt){if(evt.relatedTarget){return evt.relatedTarget;}else if(evt.srcElement){switch(evt.type){case"mouseover":return evt.fromElement;case"mouseout":return evt.toElement;default:return evt.srcElement;}}}', "function cancelKeyEvent(evt){evt.returnValue=false;stopPropagation(evt);}", 'function evalCommandLine(){var expr=$("command").value;evalCommand(expr);$("command").value="";}', "function evalLastCommand(){if(lastCommand!=null){evalCommand(lastCommand);}}", 'var lastCommand=null;var commandHistory=[];var currentCommandIndex=0;function evalCommand(expr){if(appender){appender.evalCommandAndAppend(expr);}else{var prefix=">>> "+expr+"\\r\\n";try{log("INFO",prefix+eval(expr));}catch(ex){log("ERROR",prefix+"Error: "+getErrorMessage(ex));}}', "if(expr!=commandHistory[commandHistory.length-1]){commandHistory.push(expr);if(appender){appender.storeCommandHistory(commandHistory);}}", "currentCommandIndex=(expr==commandHistory[currentCommandIndex])?currentCommandIndex+1:commandHistory.length;lastCommand=expr;}", "//]]>", "<\/script>", '<style type="text/css">', "body{background-color:white;color:black;padding:0;margin:0;font-family:tahoma,verdana,arial,helvetica,sans-serif;overflow:hidden}div#switchesContainer input{margin-bottom:0}div.toolbar{border-top:solid #ffffff 1px;border-bottom:solid #aca899 1px;background-color:#f1efe7;padding:3px 5px;font-size:68.75%}div.toolbar,div#search input{font-family:tahoma,verdana,arial,helvetica,sans-serif}div.toolbar input.button{padding:0 5px;font-size:100%}div.toolbar input.hidden{display:none}div#switches input#clearButton{margin-left:20px}div#levels label{font-weight:bold}div#levels label,div#options label{margin-right:5px}div#levels label#wrapLabel{font-weight:normal}div#search label{margin-right:10px}div#search label.searchboxlabel{margin-right:0}div#search input{font-size:100%}div#search input.validregex{color:green}div#search input.invalidregex{color:red}div#search input.nomatches{color:white;background-color:#ff6666}div#search input.nomatches{color:white;background-color:#ff6666}div#searchNav{display:none}div#commandLine{display:none}div#commandLine input#command{font-size:100%;font-family:Courier New,Courier}div#commandLine input#evaluateButton{}*.greyedout{color:gray !important;border-color:gray !important}*.greyedout *.alwaysenabled{color:black}*.unselectable{-khtml-user-select:none;-moz-user-select:none;user-select:none}div#log{font-family:Courier New,Courier;font-size:75%;width:100%;overflow:auto;clear:both;position:relative}div.group{border-color:#cccccc;border-style:solid;border-width:1px 0 1px 1px;overflow:visible}div.oldIe div.group,div.oldIe div.group *,div.oldIe *.logentry{height:1%}div.group div.groupheading span.expander{border:solid black 1px;font-family:Courier New,Courier;font-size:0.833em;background-color:#eeeeee;position:relative;top:-1px;color:black;padding:0 2px;cursor:pointer;cursor:hand;height:1%}div.group div.groupcontent{margin-left:10px;padding-bottom:2px;overflow:visible}div.group div.expanded{display:block}div.group div.collapsed{display:none}*.logentry{overflow:visible;display:none;white-space:pre}span.pre{white-space:pre}pre.unwrapped{display:inline !important}pre.unwrapped pre.pre,div.wrapped pre.pre{display:inline}div.wrapped pre.pre{white-space:normal}div.wrapped{display:none}body.searching *.logentry span.currentmatch{color:white !important;background-color:green !important}body.searching div.searchhighlight *.logentry span.searchterm{color:black;background-color:yellow}div.wrap *.logentry{white-space:normal !important;border-width:0 0 1px 0;border-color:#dddddd;border-style:dotted}div.wrap #log_wrapped,#log_unwrapped{display:block}div.wrap #log_unwrapped,#log_wrapped{display:none}div.wrap *.logentry span.pre{overflow:visible;white-space:normal}div.wrap *.logentry pre.unwrapped{display:none}div.wrap *.logentry span.wrapped{display:inline}div.searchfilter *.searchnonmatch{display:none !important}div#log *.TRACE,label#label_TRACE{color:#666666}div#log *.DEBUG,label#label_DEBUG{color:green}div#log *.INFO,label#label_INFO{color:#000099}div#log *.WARN,label#label_WARN{color:#999900}div#log *.ERROR,label#label_ERROR{color:red}div#log *.FATAL,label#label_FATAL{color:#660066}div.TRACE#log *.TRACE,div.DEBUG#log *.DEBUG,div.INFO#log *.INFO,div.WARN#log *.WARN,div.ERROR#log *.ERROR,div.FATAL#log *.FATAL{display:block}div#log div.separator{background-color:#cccccc;margin:5px 0;line-height:1px}", "</style>", "</head>", '<body id="body">', '<div id="switchesContainer">', '<div id="switches">', '<div id="levels" class="toolbar">', "Filters:", '<input type="checkbox" id="switch_TRACE" onclick="applyFilters(); checkAllLevels()" checked="checked" title="Show/hide trace messages" /><label for="switch_TRACE" id="label_TRACE">trace</label>', '<input type="checkbox" id="switch_DEBUG" onclick="applyFilters(); checkAllLevels()" checked="checked" title="Show/hide debug messages" /><label for="switch_DEBUG" id="label_DEBUG">debug</label>', '<input type="checkbox" id="switch_INFO" onclick="applyFilters(); checkAllLevels()" checked="checked" title="Show/hide info messages" /><label for="switch_INFO" id="label_INFO">info</label>', '<input type="checkbox" id="switch_WARN" onclick="applyFilters(); checkAllLevels()" checked="checked" title="Show/hide warn messages" /><label for="switch_WARN" id="label_WARN">warn</label>', '<input type="checkbox" id="switch_ERROR" onclick="applyFilters(); checkAllLevels()" checked="checked" title="Show/hide error messages" /><label for="switch_ERROR" id="label_ERROR">error</label>', '<input type="checkbox" id="switch_FATAL" onclick="applyFilters(); checkAllLevels()" checked="checked" title="Show/hide fatal messages" /><label for="switch_FATAL" id="label_FATAL">fatal</label>', '<input type="checkbox" id="switch_ALL" onclick="toggleAllLevels(); applyFilters()" checked="checked" title="Show/hide all messages" /><label for="switch_ALL" id="label_ALL">all</label>', "</div>", '<div id="search" class="toolbar">', '<label for="searchBox" class="searchboxlabel">Search:</label> <input type="text" id="searchBox" onclick="toggleSearchEnabled(true)" onkeyup="scheduleSearch()" size="20" />', '<input type="button" id="searchReset" disabled="disabled" value="Reset" onclick="clearSearch()" class="button" title="Reset the search" />', '<input type="checkbox" id="searchRegex" onclick="doSearch()" title="If checked, search is treated as a regular expression" /><label for="searchRegex">Regex</label>', '<input type="checkbox" id="searchCaseSensitive" onclick="doSearch()" title="If checked, search is case sensitive" /><label for="searchCaseSensitive">Match case</label>', '<input type="checkbox" id="searchDisable" onclick="toggleSearchEnabled()" title="Enable/disable search" /><label for="searchDisable" class="alwaysenabled">Disable</label>', '<div id="searchNav">', '<input type="button" id="searchNext" disabled="disabled" value="Next" onclick="searchNext()" class="button" title="Go to the next matching log entry" />', '<input type="button" id="searchPrevious" disabled="disabled" value="Previous" onclick="searchPrevious()" class="button" title="Go to the previous matching log entry" />', '<input type="checkbox" id="searchFilter" onclick="toggleSearchFilter()" title="If checked, non-matching log entries are filtered out" /><label for="searchFilter">Filter</label>', '<input type="checkbox" id="searchHighlight" onclick="toggleSearchHighlight()" title="Highlight matched search terms" /><label for="searchHighlight" class="alwaysenabled">Highlight all</label>', "</div>", "</div>", '<div id="options" class="toolbar">', "Options:", '<input type="checkbox" id="enableLogging" onclick="toggleLoggingEnabled()" checked="checked" title="Enable/disable logging" /><label for="enableLogging" id="enableLoggingLabel">Log</label>', '<input type="checkbox" id="wrap" onclick="toggleWrap()" title="Enable / disable word wrap" /><label for="wrap" id="wrapLabel">Wrap</label>', '<input type="checkbox" id="newestAtTop" onclick="toggleNewestAtTop()" title="If checked, causes newest messages to appear at the top" /><label for="newestAtTop" id="newestAtTopLabel">Newest at the top</label>', '<input type="checkbox" id="scrollToLatest" onclick="toggleScrollToLatest()" checked="checked" title="If checked, window automatically scrolls to a new message when it is added" /><label for="scrollToLatest" id="scrollToLatestLabel">Scroll to latest</label>', '<input type="button" id="clearButton" value="Clear" onclick="clearLog()" class="button" title="Clear all log messages"  />', '<input type="button" id="hideButton" value="Hide" onclick="hide()" class="hidden button" title="Hide the console" />', '<input type="button" id="closeButton" value="Close" onclick="closeWindow()" class="hidden button" title="Close the window" />', "</div>", "</div>", "</div>", '<div id="log" class="TRACE DEBUG INFO WARN ERROR FATAL"></div>', '<div id="commandLine" class="toolbar">', '<div id="commandLineContainer">', '<input type="text" id="command" title="Enter a JavaScript command here and hit return or press \'Evaluate\'" />', '<input type="button" id="evaluateButton" value="Evaluate" class="button" title="Evaluate the command" onclick="evalCommandLine()" />', "</div>", "</div>", "</body>", "</html>", ""]
        };
        var defaultCommandLineFunctions = [];
        ConsoleAppender = function() {};
        var consoleAppenderIdCounter = 1;
        ConsoleAppender.prototype = new Appender();
        ConsoleAppender.prototype.create = function(inPage, container, lazyInit, initiallyMinimized, useDocumentWrite, width, height, focusConsoleWindow) {
            var appender = this;
            var initialized = false;
            var consoleWindowCreated = false;
            var consoleWindowLoaded = false;
            var consoleClosed = false;
            var queuedLoggingEvents = [];
            var isSupported = true;
            var consoleAppenderId = consoleAppenderIdCounter++;
            initiallyMinimized = extractBooleanFromParam(initiallyMinimized, this.defaults.initiallyMinimized);
            lazyInit = extractBooleanFromParam(lazyInit, this.defaults.lazyInit);
            useDocumentWrite = extractBooleanFromParam(useDocumentWrite, this.defaults.useDocumentWrite);
            var newestMessageAtTop = this.defaults.newestMessageAtTop;
            var scrollToLatestMessage = this.defaults.scrollToLatestMessage;
            width = width ? width : this.defaults.width;
            height = height ? height : this.defaults.height;
            var maxMessages = this.defaults.maxMessages;
            var showCommandLine = this.defaults.showCommandLine;
            var commandLineObjectExpansionDepth = this.defaults.commandLineObjectExpansionDepth;
            var showHideButton = this.defaults.showHideButton;
            var showCloseButton = this.defaults.showCloseButton;
            var showLogEntryDeleteButtons = this.defaults.showLogEntryDeleteButtons;
            this.setLayout(this.defaults.layout);
            var init, createWindow, safeToAppend, getConsoleWindow, open;
            var appenderName = inPage ? "InPageAppender" : "PopUpAppender";
            var checkCanConfigure = function(configOptionName) {
                if (consoleWindowCreated) {
                    handleError(appenderName + ": configuration option '" + configOptionName + "' may not be set after the appender has been initialized");
                    return false
                }
                return true
            };
            var consoleWindowExists = function() {
                return (consoleWindowLoaded && isSupported && !consoleClosed)
            };
            this.isNewestMessageAtTop = function() {
                return newestMessageAtTop
            };
            this.setNewestMessageAtTop = function(newestMessageAtTopParam) {
                newestMessageAtTop = bool(newestMessageAtTopParam);
                if (consoleWindowExists()) {
                    getConsoleWindow().setNewestAtTop(newestMessageAtTop)
                }
            };
            this.isScrollToLatestMessage = function() {
                return scrollToLatestMessage
            };
            this.setScrollToLatestMessage = function(scrollToLatestMessageParam) {
                scrollToLatestMessage = bool(scrollToLatestMessageParam);
                if (consoleWindowExists()) {
                    getConsoleWindow().setScrollToLatest(scrollToLatestMessage)
                }
            };
            this.getWidth = function() {
                return width
            };
            this.setWidth = function(widthParam) {
                if (checkCanConfigure("width")) {
                    width = extractStringFromParam(widthParam, width)
                }
            };
            this.getHeight = function() {
                return height
            };
            this.setHeight = function(heightParam) {
                if (checkCanConfigure("height")) {
                    height = extractStringFromParam(heightParam, height)
                }
            };
            this.getMaxMessages = function() {
                return maxMessages
            };
            this.setMaxMessages = function(maxMessagesParam) {
                maxMessages = extractIntFromParam(maxMessagesParam, maxMessages);
                if (consoleWindowExists()) {
                    getConsoleWindow().setMaxMessages(maxMessages)
                }
            };
            this.isShowCommandLine = function() {
                return showCommandLine
            };
            this.setShowCommandLine = function(showCommandLineParam) {
                showCommandLine = bool(showCommandLineParam);
                if (consoleWindowExists()) {
                    getConsoleWindow().setShowCommandLine(showCommandLine)
                }
            };
            this.isShowHideButton = function() {
                return showHideButton
            };
            this.setShowHideButton = function(showHideButtonParam) {
                showHideButton = bool(showHideButtonParam);
                if (consoleWindowExists()) {
                    getConsoleWindow().setShowHideButton(showHideButton)
                }
            };
            this.isShowCloseButton = function() {
                return showCloseButton
            };
            this.setShowCloseButton = function(showCloseButtonParam) {
                showCloseButton = bool(showCloseButtonParam);
                if (consoleWindowExists()) {
                    getConsoleWindow().setShowCloseButton(showCloseButton)
                }
            };
            this.getCommandLineObjectExpansionDepth = function() {
                return commandLineObjectExpansionDepth
            };
            this.setCommandLineObjectExpansionDepth = function(commandLineObjectExpansionDepthParam) {
                commandLineObjectExpansionDepth = extractIntFromParam(commandLineObjectExpansionDepthParam, commandLineObjectExpansionDepth)
            };
            var minimized = initiallyMinimized;
            this.isInitiallyMinimized = function() {
                return initiallyMinimized
            };
            this.setInitiallyMinimized = function(initiallyMinimizedParam) {
                if (checkCanConfigure("initiallyMinimized")) {
                    initiallyMinimized = bool(initiallyMinimizedParam);
                    minimized = initiallyMinimized
                }
            };
            this.isUseDocumentWrite = function() {
                return useDocumentWrite
            };
            this.setUseDocumentWrite = function(useDocumentWriteParam) {
                if (checkCanConfigure("useDocumentWrite")) {
                    useDocumentWrite = bool(useDocumentWriteParam)
                }
            };

            function QueuedLoggingEvent(loggingEvent, formattedMessage) {
                this.loggingEvent = loggingEvent;
                this.levelName = loggingEvent.level.name;
                this.formattedMessage = formattedMessage
            }
            QueuedLoggingEvent.prototype.append = function() {
                getConsoleWindow().log(this.levelName, this.formattedMessage)
            };

            function QueuedGroup(name, initiallyExpanded) {
                this.name = name;
                this.initiallyExpanded = initiallyExpanded
            }
            QueuedGroup.prototype.append = function() {
                getConsoleWindow().group(this.name, this.initiallyExpanded)
            };

            function QueuedGroupEnd() {}
            QueuedGroupEnd.prototype.append = function() {
                getConsoleWindow().groupEnd()
            };
            var checkAndAppend = function() {
                safeToAppend();
                if (!initialized) {
                    init()
                } else {
                    if (consoleClosed && reopenWhenClosed) {
                        createWindow()
                    }
                } if (safeToAppend()) {
                    appendQueuedLoggingEvents()
                }
            };
            this.append = function(loggingEvent) {
                if (isSupported) {
                    var formattedMessage = appender.getLayout().format(loggingEvent);
                    if (this.getLayout().ignoresThrowable()) {
                        formattedMessage += loggingEvent.getThrowableStrRep()
                    }
                    queuedLoggingEvents.push(new QueuedLoggingEvent(loggingEvent, formattedMessage));
                    checkAndAppend()
                }
            };
            this.group = function(name, initiallyExpanded) {
                if (isSupported) {
                    queuedLoggingEvents.push(new QueuedGroup(name, initiallyExpanded));
                    checkAndAppend()
                }
            };
            this.groupEnd = function() {
                if (isSupported) {
                    queuedLoggingEvents.push(new QueuedGroupEnd());
                    checkAndAppend()
                }
            };
            var appendQueuedLoggingEvents = function() {
                var currentLoggingEvent;
                while (queuedLoggingEvents.length > 0) {
                    queuedLoggingEvents.shift().append()
                }
                if (focusConsoleWindow) {
                    getConsoleWindow().focus()
                }
            };
            this.setAddedToLogger = function(logger) {
                this.loggers.push(logger);
                if (enabled && !lazyInit) {
                    init()
                }
            };
            this.clear = function() {
                if (consoleWindowExists()) {
                    getConsoleWindow().clearLog()
                }
                queuedLoggingEvents.length = 0
            };
            this.focus = function() {
                if (consoleWindowExists()) {
                    getConsoleWindow().focus()
                }
            };
            this.focusCommandLine = function() {
                if (consoleWindowExists()) {
                    getConsoleWindow().focusCommandLine()
                }
            };
            this.focusSearch = function() {
                if (consoleWindowExists()) {
                    getConsoleWindow().focusSearch()
                }
            };
            var commandWindow = window;
            this.getCommandWindow = function() {
                return commandWindow
            };
            this.setCommandWindow = function(commandWindowParam) {
                commandWindow = commandWindowParam
            };
            this.executeLastCommand = function() {
                if (consoleWindowExists()) {
                    getConsoleWindow().evalLastCommand()
                }
            };
            var commandLayout = new PatternLayout("%m");
            this.getCommandLayout = function() {
                return commandLayout
            };
            this.setCommandLayout = function(commandLayoutParam) {
                commandLayout = commandLayoutParam
            };
            this.evalCommandAndAppend = function(expr) {
                var commandReturnValue = {
                    appendResult: true,
                    isError: false
                };
                var commandOutput = "";
                try {
                    var result, i;
                    if (!commandWindow.eval && commandWindow.execScript) {
                        commandWindow.execScript("null")
                    }
                    var commandLineFunctionsHash = {};
                    for (i = 0, len = commandLineFunctions.length; i < len; i++) {
                        commandLineFunctionsHash[commandLineFunctions[i][0]] = commandLineFunctions[i][1]
                    }
                    var objectsToRestore = [];
                    var addObjectToRestore = function(name) {
                        objectsToRestore.push([name, commandWindow[name]])
                    };
                    addObjectToRestore("appender");
                    commandWindow.appender = appender;
                    addObjectToRestore("commandReturnValue");
                    commandWindow.commandReturnValue = commandReturnValue;
                    addObjectToRestore("commandLineFunctionsHash");
                    commandWindow.commandLineFunctionsHash = commandLineFunctionsHash;
                    var addFunctionToWindow = function(name) {
                        addObjectToRestore(name);
                        commandWindow[name] = function() {
                            return this.commandLineFunctionsHash[name](appender, arguments, commandReturnValue)
                        }
                    };
                    for (i = 0, len = commandLineFunctions.length; i < len; i++) {
                        addFunctionToWindow(commandLineFunctions[i][0])
                    }
                    if (commandWindow === window && commandWindow.execScript) {
                        addObjectToRestore("evalExpr");
                        addObjectToRestore("result");
                        window.evalExpr = expr;
                        commandWindow.execScript("window.result=eval(window.evalExpr);");
                        result = window.result
                    } else {
                        result = commandWindow.eval(expr)
                    }
                    commandOutput = isUndefined(result) ? result : formatObjectExpansion(result, commandLineObjectExpansionDepth);
                    for (i = 0, len = objectsToRestore.length; i < len; i++) {
                        commandWindow[objectsToRestore[i][0]] = objectsToRestore[i][1]
                    }
                } catch (ex) {
                    commandOutput = "Error evaluating command: " + getExceptionStringRep(ex);
                    commandReturnValue.isError = true
                }
                if (commandReturnValue.appendResult) {
                    var message = ">>> " + expr;
                    if (!isUndefined(commandOutput)) {
                        message += newLine + commandOutput
                    }
                    var level = commandReturnValue.isError ? Level.ERROR : Level.INFO;
                    var loggingEvent = new LoggingEvent(null, new Date(), level, [message], null);
                    var mainLayout = this.getLayout();
                    this.setLayout(commandLayout);
                    this.append(loggingEvent);
                    this.setLayout(mainLayout)
                }
            };
            var commandLineFunctions = defaultCommandLineFunctions.concat([]);
            this.addCommandLineFunction = function(functionName, commandLineFunction) {
                commandLineFunctions.push([functionName, commandLineFunction])
            };
            var commandHistoryCookieName = "log4javascriptCommandHistory";
            this.storeCommandHistory = function(commandHistory) {
                setCookie(commandHistoryCookieName, commandHistory.join(","))
            };
            var writeHtml = function(doc) {
                var lines = getConsoleHtmlLines();
                doc.open();
                for (var i = 0, len = lines.length; i < len; i++) {
                    doc.writeln(lines[i])
                }
                doc.close()
            };
            this.setEventTypes(["load", "unload"]);
            var consoleWindowLoadHandler = function() {
                var win = getConsoleWindow();
                win.setAppender(appender);
                win.setNewestAtTop(newestMessageAtTop);
                win.setScrollToLatest(scrollToLatestMessage);
                win.setMaxMessages(maxMessages);
                win.setShowCommandLine(showCommandLine);
                win.setShowHideButton(showHideButton);
                win.setShowCloseButton(showCloseButton);
                win.setMainWindow(window);
                var storedValue = getCookie(commandHistoryCookieName);
                if (storedValue) {
                    win.commandHistory = storedValue.split(",");
                    win.currentCommandIndex = win.commandHistory.length
                }
                appender.dispatchEvent("load", {
                    win: win
                })
            };
            this.unload = function() {
                logLog.debug("unload " + this + ", caller: " + this.unload.caller);
                if (!consoleClosed) {
                    logLog.debug("really doing unload " + this);
                    consoleClosed = true;
                    consoleWindowLoaded = false;
                    consoleWindowCreated = false;
                    appender.dispatchEvent("unload", {})
                }
            };
            var pollConsoleWindow = function(windowTest, interval, successCallback, errorMessage) {
                function doPoll() {
                    try {
                        if (consoleClosed) {
                            clearInterval(poll)
                        }
                        if (windowTest(getConsoleWindow())) {
                            clearInterval(poll);
                            successCallback()
                        }
                    } catch (ex) {
                        clearInterval(poll);
                        isSupported = false;
                        handleError(errorMessage, ex)
                    }
                }
                var poll = setInterval(doPoll, interval)
            };
            var getConsoleUrl = function() {
                var documentDomainSet = (document.domain != location.hostname);
                return useDocumentWrite ? "" : getBaseUrl() + "console.html" + (documentDomainSet ? "?log4javascript_domain=" + escape(document.domain) : "")
            };
            if (inPage) {
                var containerElement = null;
                var cssProperties = [];
                this.addCssProperty = function(name, value) {
                    if (checkCanConfigure("cssProperties")) {
                        cssProperties.push([name, value])
                    }
                };
                var windowCreationStarted = false;
                var iframeContainerDiv;
                var iframeId = uniqueId + "_InPageAppender_" + consoleAppenderId;
                this.hide = function() {
                    if (initialized && consoleWindowCreated) {
                        if (consoleWindowExists()) {
                            getConsoleWindow().$("command").blur()
                        }
                        iframeContainerDiv.style.display = "none";
                        minimized = true
                    }
                };
                this.show = function() {
                    if (initialized) {
                        if (consoleWindowCreated) {
                            iframeContainerDiv.style.display = "block";
                            this.setShowCommandLine(showCommandLine);
                            minimized = false
                        } else {
                            if (!windowCreationStarted) {
                                createWindow(true)
                            }
                        }
                    }
                };
                this.isVisible = function() {
                    return !minimized && !consoleClosed
                };
                this.close = function(fromButton) {
                    if (!consoleClosed && (!fromButton || confirm("This will permanently remove the console from the page. No more messages will be logged. Do you wish to continue?"))) {
                        iframeContainerDiv.parentNode.removeChild(iframeContainerDiv);
                        this.unload()
                    }
                };
                open = function() {
                    var initErrorMessage = "InPageAppender.open: unable to create console iframe";

                    function finalInit() {
                        try {
                            if (!initiallyMinimized) {
                                appender.show()
                            }
                            consoleWindowLoadHandler();
                            consoleWindowLoaded = true;
                            appendQueuedLoggingEvents()
                        } catch (ex) {
                            isSupported = false;
                            handleError(initErrorMessage, ex)
                        }
                    }

                    function writeToDocument() {
                        try {
                            var windowTest = function(win) {
                                return isLoaded(win)
                            };
                            if (useDocumentWrite) {
                                writeHtml(getConsoleWindow().document)
                            }
                            if (windowTest(getConsoleWindow())) {
                                finalInit()
                            } else {
                                pollConsoleWindow(windowTest, 100, finalInit, initErrorMessage)
                            }
                        } catch (ex) {
                            isSupported = false;
                            handleError(initErrorMessage, ex)
                        }
                    }
                    minimized = false;
                    iframeContainerDiv = containerElement.appendChild(document.createElement("div"));
                    iframeContainerDiv.style.width = width;
                    iframeContainerDiv.style.height = height;
                    iframeContainerDiv.style.border = "solid gray 1px";
                    for (var i = 0, len = cssProperties.length; i < len; i++) {
                        iframeContainerDiv.style[cssProperties[i][0]] = cssProperties[i][1]
                    }
                    var iframeSrc = useDocumentWrite ? "" : " src='" + getConsoleUrl() + "'";
                    iframeContainerDiv.innerHTML = "<iframe id='" + iframeId + "' name='" + iframeId + "' width='100%' height='100%' frameborder='0'" + iframeSrc + "scrolling='no'></iframe>";
                    consoleClosed = false;
                    var iframeDocumentExistsTest = function(win) {
                        try {
                            return bool(win) && bool(win.document)
                        } catch (ex) {
                            return false
                        }
                    };
                    if (iframeDocumentExistsTest(getConsoleWindow())) {
                        writeToDocument()
                    } else {
                        pollConsoleWindow(iframeDocumentExistsTest, 100, writeToDocument, initErrorMessage)
                    }
                    consoleWindowCreated = true
                };
                createWindow = function(show) {
                    if (show || !initiallyMinimized) {
                        var pageLoadHandler = function() {
                            if (!container) {
                                containerElement = document.createElement("div");
                                containerElement.style.position = "fixed";
                                containerElement.style.left = "0";
                                containerElement.style.right = "0";
                                containerElement.style.bottom = "0";
                                document.body.appendChild(containerElement);
                                appender.addCssProperty("borderWidth", "1px 0 0 0");
                                appender.addCssProperty("zIndex", 1000000);
                                open()
                            } else {
                                try {
                                    var el = document.getElementById(container);
                                    if (el.nodeType == 1) {
                                        containerElement = el
                                    }
                                    open()
                                } catch (ex) {
                                    handleError("InPageAppender.init: invalid container element '" + container + "' supplied", ex)
                                }
                            }
                        };
                        if (pageLoaded && container && container.appendChild) {
                            containerElement = container;
                            open()
                        } else {
                            if (pageLoaded) {
                                pageLoadHandler()
                            } else {
                                log4javascript.addEventListener("load", pageLoadHandler)
                            }
                        }
                        windowCreationStarted = true
                    }
                };
                init = function() {
                    createWindow();
                    initialized = true
                };
                getConsoleWindow = function() {
                    var iframe = window.frames[iframeId];
                    if (iframe) {
                        return iframe
                    }
                };
                safeToAppend = function() {
                    if (isSupported && !consoleClosed) {
                        if (consoleWindowCreated && !consoleWindowLoaded && getConsoleWindow() && isLoaded(getConsoleWindow())) {
                            consoleWindowLoaded = true
                        }
                        return consoleWindowLoaded
                    }
                    return false
                }
            } else {
                var useOldPopUp = appender.defaults.useOldPopUp;
                var complainAboutPopUpBlocking = appender.defaults.complainAboutPopUpBlocking;
                var reopenWhenClosed = this.defaults.reopenWhenClosed;
                this.isUseOldPopUp = function() {
                    return useOldPopUp
                };
                this.setUseOldPopUp = function(useOldPopUpParam) {
                    if (checkCanConfigure("useOldPopUp")) {
                        useOldPopUp = bool(useOldPopUpParam)
                    }
                };
                this.isComplainAboutPopUpBlocking = function() {
                    return complainAboutPopUpBlocking
                };
                this.setComplainAboutPopUpBlocking = function(complainAboutPopUpBlockingParam) {
                    if (checkCanConfigure("complainAboutPopUpBlocking")) {
                        complainAboutPopUpBlocking = bool(complainAboutPopUpBlockingParam)
                    }
                };
                this.isFocusPopUp = function() {
                    return focusConsoleWindow
                };
                this.setFocusPopUp = function(focusPopUpParam) {
                    focusConsoleWindow = bool(focusPopUpParam)
                };
                this.isReopenWhenClosed = function() {
                    return reopenWhenClosed
                };
                this.setReopenWhenClosed = function(reopenWhenClosedParam) {
                    reopenWhenClosed = bool(reopenWhenClosedParam)
                };
                this.close = function() {
                    logLog.debug("close " + this);
                    try {
                        popUp.close();
                        this.unload()
                    } catch (ex) {}
                };
                this.hide = function() {
                    logLog.debug("hide " + this);
                    if (consoleWindowExists()) {
                        this.close()
                    }
                };
                this.show = function() {
                    logLog.debug("show " + this);
                    if (!consoleWindowCreated) {
                        open()
                    }
                };
                this.isVisible = function() {
                    return safeToAppend()
                };
                var popUp;
                open = function() {
                    var windowProperties = "width=" + width + ",height=" + height + ",status,resizable";
                    var windowName = "PopUp_" + location.host.replace(/[^a-z0-9]/gi, "_") + "_" + consoleAppenderId;
                    if (!useOldPopUp || !useDocumentWrite) {
                        windowName = windowName + "_" + uniqueId
                    }
                    var checkPopUpClosed = function(win) {
                        if (consoleClosed) {
                            return true
                        } else {
                            try {
                                return bool(win) && win.closed
                            } catch (ex) {}
                        }
                        return false
                    };
                    var popUpClosedCallback = function() {
                        if (!consoleClosed) {
                            appender.unload()
                        }
                    };

                    function finalInit() {
                        getConsoleWindow().setCloseIfOpenerCloses(!useOldPopUp || !useDocumentWrite);
                        consoleWindowLoadHandler();
                        consoleWindowLoaded = true;
                        appendQueuedLoggingEvents();
                        pollConsoleWindow(checkPopUpClosed, 500, popUpClosedCallback, "PopUpAppender.checkPopUpClosed: error checking pop-up window")
                    }
                    try {
                        popUp = window.open(getConsoleUrl(), windowName, windowProperties);
                        consoleClosed = false;
                        consoleWindowCreated = true;
                        if (popUp) {
                            if (useDocumentWrite && useOldPopUp && isLoaded(popUp)) {
                                popUp.mainPageReloaded();
                                finalInit()
                            } else {
                                if (useDocumentWrite) {
                                    writeHtml(popUp.document)
                                }
                                var popUpLoadedTest = function(win) {
                                    return bool(win) && isLoaded(win)
                                };
                                if (isLoaded(popUp)) {
                                    finalInit()
                                } else {
                                    pollConsoleWindow(popUpLoadedTest, 100, finalInit, "PopUpAppender.init: unable to create console window")
                                }
                            }
                        } else {
                            isSupported = false;
                            logLog.warn("PopUpAppender.init: pop-ups blocked, please unblock to use PopUpAppender");
                            if (complainAboutPopUpBlocking) {
                                handleError("log4javascript: pop-up windows appear to be blocked. Please unblock them to use pop-up logging.")
                            }
                        }
                    } catch (ex) {
                        handleError("PopUpAppender.init: error creating pop-up", ex)
                    }
                };
                createWindow = function() {
                    if (!initiallyMinimized) {
                        open()
                    }
                };
                init = function() {
                    createWindow();
                    initialized = true
                };
                getConsoleWindow = function() {
                    return popUp
                };
                safeToAppend = function() {
                    if (isSupported && !isUndefined(popUp) && !consoleClosed) {
                        if (popUp.closed || (consoleWindowLoaded && isUndefined(popUp.closed))) {
                            appender.unload();
                            logLog.debug("PopUpAppender: pop-up closed");
                            return false
                        }
                        if (!consoleWindowLoaded && isLoaded(popUp)) {
                            consoleWindowLoaded = true
                        }
                    }
                    return isSupported && consoleWindowLoaded && !consoleClosed
                }
            }
            this.getConsoleWindow = getConsoleWindow
        };
        ConsoleAppender.addGlobalCommandLineFunction = function(functionName, commandLineFunction) {
            defaultCommandLineFunctions.push([functionName, commandLineFunction])
        };

        function PopUpAppender(lazyInit, initiallyMinimized, useDocumentWrite, width, height) {
            this.create(false, null, lazyInit, initiallyMinimized, useDocumentWrite, width, height, this.defaults.focusPopUp)
        }
        PopUpAppender.prototype = new ConsoleAppender();
        PopUpAppender.prototype.defaults = {
            layout: new PatternLayout("%d{HH:mm:ss} %-5p - %m{1}%n"),
            initiallyMinimized: false,
            focusPopUp: false,
            lazyInit: true,
            useOldPopUp: true,
            complainAboutPopUpBlocking: true,
            newestMessageAtTop: false,
            scrollToLatestMessage: true,
            width: "600",
            height: "400",
            reopenWhenClosed: false,
            maxMessages: null,
            showCommandLine: true,
            commandLineObjectExpansionDepth: 1,
            showHideButton: false,
            showCloseButton: true,
            showLogEntryDeleteButtons: true,
            useDocumentWrite: true
        };
        PopUpAppender.prototype.toString = function() {
            return "PopUpAppender"
        };
        log4javascript.PopUpAppender = PopUpAppender;

        function InPageAppender(container, lazyInit, initiallyMinimized, useDocumentWrite, width, height) {
            this.create(true, container, lazyInit, initiallyMinimized, useDocumentWrite, width, height, false)
        }
        InPageAppender.prototype = new ConsoleAppender();
        InPageAppender.prototype.defaults = {
            layout: new PatternLayout("%d{HH:mm:ss} %-5p - %m{1}%n"),
            initiallyMinimized: false,
            lazyInit: true,
            newestMessageAtTop: false,
            scrollToLatestMessage: true,
            width: "100%",
            height: "220px",
            maxMessages: null,
            showCommandLine: true,
            commandLineObjectExpansionDepth: 1,
            showHideButton: false,
            showCloseButton: false,
            showLogEntryDeleteButtons: true,
            useDocumentWrite: true
        };
        InPageAppender.prototype.toString = function() {
            return "InPageAppender"
        };
        log4javascript.InPageAppender = InPageAppender;
        log4javascript.InlineAppender = InPageAppender
    })();

    function padWithSpaces(str, len) {
        if (str.length < len) {
            var spaces = [];
            var numberOfSpaces = Math.max(0, len - str.length);
            for (var i = 0; i < numberOfSpaces; i++) {
                spaces[i] = " "
            }
            str += spaces.join("")
        }
        return str
    }(function() {
        function dir(obj) {
            var maxLen = 0;
            for (var p in obj) {
                maxLen = Math.max(toStr(p).length, maxLen)
            }
            var propList = [];
            for (p in obj) {
                var propNameStr = "  " + padWithSpaces(toStr(p), maxLen + 2);
                var propVal;
                try {
                    propVal = splitIntoLines(toStr(obj[p])).join(padWithSpaces(newLine, maxLen + 6))
                } catch (ex) {
                    propVal = "[Error obtaining property. Details: " + getExceptionMessage(ex) + "]"
                }
                propList.push(propNameStr + propVal)
            }
            return propList.join(newLine)
        }
        var nodeTypes = {
            ELEMENT_NODE: 1,
            ATTRIBUTE_NODE: 2,
            TEXT_NODE: 3,
            CDATA_SECTION_NODE: 4,
            ENTITY_REFERENCE_NODE: 5,
            ENTITY_NODE: 6,
            PROCESSING_INSTRUCTION_NODE: 7,
            COMMENT_NODE: 8,
            DOCUMENT_NODE: 9,
            DOCUMENT_TYPE_NODE: 10,
            DOCUMENT_FRAGMENT_NODE: 11,
            NOTATION_NODE: 12
        };
        var preFormattedElements = ["script", "pre"];
        var emptyElements = ["br", "img", "hr", "param", "link", "area", "input", "col", "base", "meta"];
        var indentationUnit = "  ";

        function getXhtml(rootNode, includeRootNode, indentation, startNewLine, preformatted) {
            includeRootNode = (typeof includeRootNode == "undefined") ? true : (includeRootNode ? true : false);
            if (typeof indentation != "string") {
                indentation = ""
            }
            startNewLine = startNewLine ? true : false;
            preformatted = preformatted ? true : false;
            var xhtml;

            function isWhitespace(node) {
                return ((node.nodeType == nodeTypes.TEXT_NODE) && /^[ \t\r\n]*$/.test(node.nodeValue))
            }

            function fixAttributeValue(attrValue) {
                return attrValue.toString().replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/\"/g, "&quot;")
            }

            function getStyleAttributeValue(el) {
                var stylePairs = el.style.cssText.split(";");
                var styleValue = "";
                var isFirst = true;
                for (var j = 0, len = stylePairs.length; j < len; j++) {
                    var nameValueBits = stylePairs[j].split(":");
                    var props = [];
                    if (!/^\s*$/.test(nameValueBits[0])) {
                        props.push(trim(nameValueBits[0]).toLowerCase() + ":" + trim(nameValueBits[1]))
                    }
                    styleValue = props.join(";")
                }
                return styleValue
            }

            function getNamespace(el) {
                if (el.prefix) {
                    return el.prefix
                } else {
                    if (el.outerHTML) {
                        var regex = new RegExp("<([^:]+):" + el.tagName + "[^>]*>", "i");
                        if (regex.test(el.outerHTML)) {
                            return RegExp.$1.toLowerCase()
                        }
                    }
                }
                return ""
            }
            var lt = "<";
            var gt = ">";
            if (includeRootNode && rootNode.nodeType != nodeTypes.DOCUMENT_FRAGMENT_NODE) {
                switch (rootNode.nodeType) {
                    case nodeTypes.ELEMENT_NODE:
                        var tagName = rootNode.tagName.toLowerCase();
                        xhtml = startNewLine ? newLine + indentation : "";
                        xhtml += lt;
                        var prefix = getNamespace(rootNode);
                        var hasPrefix = prefix ? true : false;
                        if (hasPrefix) {
                            xhtml += prefix + ":"
                        }
                        xhtml += tagName;
                        for (i = 0, len = rootNode.attributes.length; i < len; i++) {
                            var currentAttr = rootNode.attributes[i];
                            if (!currentAttr.specified || currentAttr.nodeValue === null || currentAttr.nodeName.toLowerCase() === "style" || typeof currentAttr.nodeValue !== "string" || currentAttr.nodeName.indexOf("_moz") === 0) {
                                continue
                            }
                            xhtml += " " + currentAttr.nodeName.toLowerCase() + '="';
                            xhtml += fixAttributeValue(currentAttr.nodeValue);
                            xhtml += '"'
                        }
                        if (rootNode.style.cssText) {
                            var styleValue = getStyleAttributeValue(rootNode);
                            if (styleValue !== "") {
                                xhtml += ' style="' + getStyleAttributeValue(rootNode) + '"'
                            }
                        }
                        if (array_contains(emptyElements, tagName) || (hasPrefix && !rootNode.hasChildNodes())) {
                            xhtml += "/" + gt
                        } else {
                            xhtml += gt;
                            var childStartNewLine = !(rootNode.childNodes.length === 1 && rootNode.childNodes[0].nodeType === nodeTypes.TEXT_NODE);
                            var childPreformatted = array_contains(preFormattedElements, tagName);
                            for (var i = 0, len = rootNode.childNodes.length; i < len; i++) {
                                xhtml += getXhtml(rootNode.childNodes[i], true, indentation + indentationUnit, childStartNewLine, childPreformatted)
                            }
                            var endTag = lt + "/" + tagName + gt;
                            xhtml += childStartNewLine ? newLine + indentation + endTag : endTag
                        }
                        return xhtml;
                    case nodeTypes.TEXT_NODE:
                        if (isWhitespace(rootNode)) {
                            xhtml = ""
                        } else {
                            if (preformatted) {
                                xhtml = rootNode.nodeValue
                            } else {
                                var lines = splitIntoLines(trim(rootNode.nodeValue));
                                var trimmedLines = [];
                                for (var i = 0, len = lines.length; i < len; i++) {
                                    trimmedLines[i] = trim(lines[i])
                                }
                                xhtml = trimmedLines.join(newLine + indentation)
                            } if (startNewLine) {
                                xhtml = newLine + indentation + xhtml
                            }
                        }
                        return xhtml;
                    case nodeTypes.CDATA_SECTION_NODE:
                        return "<![CDATA[" + rootNode.nodeValue + "]]>" + newLine;
                    case nodeTypes.DOCUMENT_NODE:
                        xhtml = "";
                        for (var i = 0, len = rootNode.childNodes.length; i < len; i++) {
                            xhtml += getXhtml(rootNode.childNodes[i], true, indentation)
                        }
                        return xhtml;
                    default:
                        return ""
                }
            } else {
                xhtml = "";
                for (var i = 0, len = rootNode.childNodes.length; i < len; i++) {
                    xhtml += getXhtml(rootNode.childNodes[i], true, indentation + indentationUnit)
                }
                return xhtml
            }
        }
        var layouts = {};

        function createCommandLineFunctions(appender) {
            ConsoleAppender.addGlobalCommandLineFunction("$", function(appender, args, returnValue) {
                return document.getElementById(args[0])
            });
            ConsoleAppender.addGlobalCommandLineFunction("dir", function(appender, args, returnValue) {
                var lines = [];
                for (var i = 0, len = args.length; i < len; i++) {
                    lines[i] = dir(args[i])
                }
                return lines.join(newLine + newLine)
            });
            ConsoleAppender.addGlobalCommandLineFunction("dirxml", function(appender, args, returnValue) {
                var lines = [];
                for (var i = 0, len = args.length; i < len; i++) {
                    var win = appender.getCommandWindow();
                    lines[i] = getXhtml(args[i])
                }
                return lines.join(newLine + newLine)
            });
            ConsoleAppender.addGlobalCommandLineFunction("cd", function(appender, args, returnValue) {
                var win, message;
                if (args.length === 0 || args[0] === "") {
                    win = window;
                    message = "Command line set to run in main window"
                } else {
                    if (args[0].window == args[0]) {
                        win = args[0];
                        message = "Command line set to run in frame '" + args[0].name + "'"
                    } else {
                        win = window.frames[args[0]];
                        if (win) {
                            message = "Command line set to run in frame '" + args[0] + "'"
                        } else {
                            returnValue.isError = true;
                            message = "Frame '" + args[0] + "' does not exist";
                            win = appender.getCommandWindow()
                        }
                    }
                }
                appender.setCommandWindow(win);
                return message
            });
            ConsoleAppender.addGlobalCommandLineFunction("clear", function(appender, args, returnValue) {
                returnValue.appendResult = false;
                appender.clear()
            });
            ConsoleAppender.addGlobalCommandLineFunction("keys", function(appender, args, returnValue) {
                var keys = [];
                for (var k in args[0]) {
                    keys.push(k)
                }
                return keys
            });
            ConsoleAppender.addGlobalCommandLineFunction("values", function(appender, args, returnValue) {
                var values = [];
                for (var k in args[0]) {
                    try {
                        values.push(args[0][k])
                    } catch (ex) {
                        logLog.warn("values(): Unable to obtain value for key " + k + ". Details: " + getExceptionMessage(ex))
                    }
                }
                return values
            });
            ConsoleAppender.addGlobalCommandLineFunction("expansionDepth", function(appender, args, returnValue) {
                var expansionDepth = parseInt(args[0], 10);
                if (isNaN(expansionDepth) || expansionDepth < 0) {
                    returnValue.isError = true;
                    return "" + args[0] + " is not a valid expansion depth"
                } else {
                    appender.setCommandLineObjectExpansionDepth(expansionDepth);
                    return "Object expansion depth set to " + expansionDepth
                }
            })
        }

        function init() {
            createCommandLineFunctions();
            initialized = true
        }
        init()
    })();

    function addWindowLoadListener(listener) {
        var oldOnload = window.onload;
        if (typeof window.onload != "function") {
            window.onload = listener
        } else {
            window.onload = function(evt) {
                if (oldOnload) {
                    oldOnload(evt)
                }
                listener(evt)
            }
        }
    }
    addWindowLoadListener(function() {
        pageLoaded = true;
        log4javascript.dispatchEvent("load", {})
    });
    window.log4javascript = log4javascript
})();
var Ozone = Ozone || {};
Ozone.log = {};
Ozone.log.logEnabled = false;
Ozone.log.defaultLogger = null;
Ozone.log.defaultAppender = null;
Ozone.log.version = Ozone.version.owfversion + Ozone.version.logging;
Ozone.log.getLogger = function(a) {
    return log4javascript.getLogger(a)
};
Ozone.log.setEnabled = function(a) {
    log4javascript.setEnabled(a)
};
Ozone.log.getDefaultLogger = function() {
    if (!Ozone.log.defaultLogger) {
        var a = "[ozonedefault]";
        Ozone.log.defaultLogger = Ozone.log.getLogger(a);
        Ozone.log.defaultAppender = new log4javascript.PopUpAppender();
        Ozone.log.defaultAppender.setUseOldPopUp(true);
        Ozone.log.defaultAppender.setComplainAboutPopUpBlocking(false);
        Ozone.log.defaultAppender.setThreshold(log4javascript.Level.OFF);
        log4javascript.getRootLogger().addAppender(Ozone.log.defaultAppender);
        return Ozone.log.defaultLogger
    }
    return Ozone.log.defaultLogger
};
Ozone.log.launchPopupAppender = function() {
    Ozone.log.defaultAppender.show();
    Ozone.log.getDefaultLogger().debug("Logger Window Lauched")
};
Ozone.log.widgetLog = function() {
    gadgets.rpc.call("..", "Ozone.log", null, arguments)
};
if (typeof(Ext) != "undefined") {
    Ext.onReady(function() {
        gadgets.rpc.register("Ozone.log", function(b) {
            var a = Ozone.log.getDefaultLogger();
            a.debug.apply(a, b)
        })
    })
}
var Ozone = Ozone || {};
Ozone.pref = Ozone.pref || {};
(function(d, a, e) {
    Ozone.pref.PrefServer = function(k) {
        if (k === e || k === "null" || k.indexOf("$") !== -1 || k.length === 0) {} else {
            if (k.lastIndexOf("/") === (k.length - 1)) {
                k = k.substring(0, k.length - 1)
            }
        }
        var h = function(q) {
            q.method = "GET";
            q.async = true;
            Ozone.util.Transport.send(q)
        };
        var m = function(q) {
            q.method = "DELETE";
            p(q)
        };
        var n = function(q) {
            q.url = k + "/" + q.url;
            h(q)
        };
        var j = function(q) {
            q.method = q.content._method;
            if (q.onSuccess) {
                if (!q.onFailure) {
                    q.onFailure = function(r) {
                        alert(Ozone.util.ErrorMessageString.saveUserPreferences + " : " + r)
                    }
                }
                Ozone.util.Transport.send(q)
            } else {
                Ozone.util.Transport.sendAndForget(q)
            }
        };
        var p = function(q) {
            if (q.method == null) {
                q.method = "PUT"
            }
            var r = {
                _method: q.method
            };
            if (q.json) {
                r = {
                    _method: q.method,
                    name: q.json.name,
                    description: q.json.description,
                    guid: q.json.guid,
                    isdefault: q.json.isdefault,
                    locked: q.json.locked,
                    state: q.json.state,
                    layoutConfig: q.json.layoutConfig,
                    stack: q.json.stack
                };
                if (q.json.cloned === true) {
                    r.cloned = true
                }
                if (q.json.bypassLayoutRearrange === true) {
                    r.bypassLayoutRearrange = true
                }
            }
            q.content = r;
            j(q)
        };
        var o = function(q) {
            if (q.jsonObject._method === e) {
                if (q.method == null) {
                    q.method = "PUT"
                }
                q.jsonObject._method = q.method
            }
            q.json = q.jsonObject;
            p(q)
        };
        var g = function(q) {
            var r = {
                name: q.name,
                description: q.description,
                guid: q.guid,
                isdefault: q.isdefault,
                locked: q.locked,
                state: q.state,
                layoutConfig: typeof q.layoutConfig === "string" ? q.layoutConfig : Ozone.util.toString(q.layoutConfig),
                stack: q.stack
            };
            return r
        };
        return {
            version: Ozone.version.owfversion + Ozone.version.preference,
            getUrl: function() {
                return k
            },
            setUrl: function(q) {
                k = q
            },
            getDashboard: function(q) {
                q.url = k + "/dashboard/" + q.dashboardId;
                h(q)
            },
            getDefaultDashboard: function(q) {
                q.url = k + "/dashboard?isdefault=true";
                q.method = "POST";
                Ozone.util.Transport.send(q)
            },
            setDefaultDashboard: function(q) {
                q.url = k + "/dashboard/" + q.dashboardId + "?isdefault=" + q.isDefault;
                q.method = "PUT";
                p(q)
            },
            createOrUpdateDashboard: function(q) {
                q.url = k + "/dashboard/" + q.json.guid;
                var r = g(q.json);
                r.bypassLayoutRearrange = true;
                q.method = q.saveAsNew ? "POST" : "PUT";
                q.jsonObject = r;
                o(q)
            },
            cloneDashboard: function(q) {
                q.url = k + "/dashboard/" + q.json.guid;
                var r = g(q.json);
                r.cloned = true;
                q.method = "POST";
                q.jsonObject = r;
                o(q)
            },
            updateAndDeleteDashboards: function(q) {
                q.url = k + "/dashboard";
                var r = {
                    _method: "PUT",
                    viewsToUpdate: Ozone.util.toString(q.viewsToUpdate),
                    viewGuidsToDelete: Ozone.util.toString(q.viewGuidsToDelete),
                    updateOrder: q.updateOrder
                };
                q.method = "POST";
                q.content = r;
                Ozone.util.Transport.send(q)
            },
            deleteDashboard: function(q) {
                q.url = k + "/dashboard/" + q.dashboardId;
                m(q)
            },
            findDashboards: function(q) {
                q.url = "dashboard";
                n(q)
            },
            findDashboardsByType: function(q) {
                if (typeof q.onSuccess === "function") {
                    var r = {
                        data: [],
                        results: 0,
                        success: true
                    };
                    q.onSuccess(r)
                }
            },
            getWidget: function(q) {
                q.url = k + "/widget/" + q.widgetId;
                if (q.universalName) {
                    q.url += "?universalName=" + q.universalName
                }
                h(q)
            },
            findWidgets: function(q) {
                q.url = k + "/widget";
                if (!q.userOnly) {
                    q.url += "/listUserAndGroupWidgets"
                }
                var s = {
                    _method: "GET"
                };
                if (q.searchParams) {
                    if (q.searchParams.widgetName && q.searchParams.widgetName.length > 0) {
                        var r = q.searchParams.widgetName;
                        if (!q.searchParams.widgetNameExactMatch) {
                            r = "%" + r + "%"
                        }
                        s.widgetName = r
                    }
                    if (q.searchParams.widgetVersion && q.searchParams.widgetVersion.length > 0) {
                        s.widgetVersion = q.searchParams.widgetVersion
                    }
                    if (q.searchParams.widgetGuid && q.searchParams.widgetGuid.length > 0) {
                        s.widgetGuid = q.searchParams.widgetGuid
                    }
                    if (q.searchParams.universalName && q.searchParams.universalName.length > 0) {
                        s.universalName = q.searchParams.universalName
                    }
                    if (q.searchParams.group_id) {
                        s.group_id = q.searchParams.group_id
                    }
                }
                q.method = "POST";
                q.content = s;
                Ozone.util.Transport.send(q)
            },
            updateAndDeleteWidgets: function(q) {
                q.url = k + "/widget";
                var r = {
                    _method: "PUT",
                    widgetsToUpdate: Ozone.util.toString(q.widgetsToUpdate),
                    widgetGuidsToDelete: Ozone.util.toString(q.widgetGuidsToDelete),
                    updateOrder: q.updateOrder
                };
                q.method = "POST";
                q.content = r;
                Ozone.util.Transport.send(q)
            },
            getUserPreference: function(q) {
                q.url = k + "/preference/" + q.namespace + "/" + q.name;
                q.ignoredErrorCodes = [404];
                h(q)
            },
            doesUserPreferenceExist: function(q) {
                q.url = k + "/hasPreference/" + q.namespace + "/" + q.name;
                h(q)
            },
            getCurrentUser: function(q) {
                q.url = k + "/person/whoami";
                h(q)
            },
            getServerVersion: function(q) {
                q.url = k + "/server/resources";
                h(q)
            },
            setUserPreference: function(q) {
                q.url = k + "/preference/" + q.namespace + "/" + q.name;
                if (q.method == null) {
                    q.method = "PUT"
                }
                q.content = {
                    _method: q.method,
                    value: q.value
                };
                if (q.onSuccess) {
                    if (!q.onFailure) {
                        q.onFailure = function(r) {
                            alert(Ozone.util.ErrorMessageString.saveUserPreferences + " : " + r)
                        }
                    }
                    Ozone.util.Transport.send(q)
                } else {
                    Ozone.util.Transport.sendAndForget(q)
                }
            },
            deleteUserPreference: function(q) {
                q.method = "DELETE";
                q.ignoredErrorCodes = [404];
                q.path = q.name;
                Ozone.pref.PrefServer.setUserPreference(q)
            },
            getDependentWidgets: function(q) {
                q.url = k + "/widgetDefinition/dependents";
                q.method = "POST";
                if (!q.content) {
                    q.content = {}
                }
                Ozone.util.Transport.send(q)
            },
            getDependentPersonWidgets: function(q) {
                q.url = k + "/personWidgetDefinition/dependents";
                q.method = "POST";
                if (!q.content) {
                    q.content = {}
                }
                Ozone.util.Transport.send(q)
            },
            deleteWidgetDefs: function(q) {
                q.url = k + "/widgetDefinition";
                q.method = "DELETE";
                if (!q.content) {
                    q.content = {}
                }
                Ozone.util.Transport.send(q)
            }
        }
    };
    var b = Ozone.util.parseWindowNameData();
    var c = null;
    if (b != null && b.preferenceLocation != null) {
        c = b.preferenceLocation
    } else {
        c = Ozone.config.prefsLocation
    }
    Ozone.pref.PrefServer = Ozone.pref.PrefServer(c);
    if (c == null) {
        for (var f in Ozone.pref.PrefServer) {
            if (typeof Ozone.pref.PrefServer[f] == "function") {
                Ozone.pref.PrefServer[f] = function() {}
            }
        }
    }
}(window, document));
var Ozone = Ozone ? Ozone : {};
Ozone.eventing = Ozone.eventing ? Ozone.eventing : {};
Ozone.eventing.Widget = function(b, a) {
    if (Ozone.eventing.Widget.instance == null) {
        Ozone.eventing.Widget.instance = this;
        this.isAfterInit = false;
        if (a != null) {
            owfdojo.connect(this, "afterInitCallBack", this, a)
        }
        this.setWidgetRelay(b);
        try {
            this.widgetInit()
        } catch (c) {
            throw "Widget relay init failed. Relaying will not work. Inner Exception: " + c.name + ": " + c.message
        }
    } else {
        if (a != null) {
            if (this.isAfterInit === false) {
                owfdojo.connect(this, "afterInitCallBack", this, a)
            } else {
                setTimeout(a, 50)
            }
        }
    }
    return Ozone.eventing.Widget.instance
};
Ozone.eventing.Widget.widgetRelayURL = Ozone.eventing.Widget.widgetRelayURL ? Ozone.eventing.Widget.widgetRelayURL : null;
Ozone.eventing.Widget.prototype = {
    version: Ozone.version.owfversion + Ozone.version.eventing,
    getWidgetRelay: function() {
        return this.widgetRelay
    },
    setWidgetRelay: function(b) {
        if (b == null) {
            if (Ozone.eventing.Widget.widgetRelayURL != null) {
                b = Ozone.eventing.Widget.widgetRelayURL
            } else {
                var d = window.location.pathname;
                var a = /^(\/[^\/]+\/).*$/i;
                var c = d.match(a);
                if (c != null && c[1] != null && c[1].length > 0) {
                    d = c[1];
                    d = d.substring(0, d.length - 1)
                } else {
                    d = ""
                }
                b = d + "/js/eventing/rpc_relay.uncompressed.html"
            }
        }
        this.widgetRelay = window.location.protocol + "//" + window.location.host + (b.charAt(0) != "/" ? ("/" + b) : b)
    },
    getWidgetId: function() {
        return this.widgetId
    },
    getContainerRelay: function() {
        return this.containerRelay
    },
    widgetInit: function() {
        var j = {};
        var h = null;
        var e = Ozone.util.parseWindowNameData();
        if (e != null) {
            this.widgetId = '{"id":"' + e.id + '"}';
            this.locked = e.locked;
            this.containerRelay = e.relayUrl
        } else {
            throw {
                name: "WidgetInitException",
                message: "The call to container_init failed. Inner Exception: "
            }
        }
        gadgets.rpc.setRelayUrl("..", this.containerRelay, false, true);
        var c, g;

        function b() {
            var m = {
                fn: "activateWidget",
                params: {
                    guid: e.id,
                    focusIframe: document.activeElement === document.body
                }
            };
            var k = "_WIDGET_STATE_CHANNEL_" + e.id;
            if (!this.disableActivateWidget) {
                gadgets.rpc.call("..", k, null, this.widgetId, m)
            } else {
                this.disableActivateWidget = false
            }
        }
        gadgets.rpc.register("after_container_init", owfdojo.hitch(this, function() {
            gadgets.rpc.unregister("after_container_init");
            if (!c) {
                c = owfdojo.connect(document, "click", owfdojo.hitch(this, b))
            }
            if (!g) {
                g = owfdojo.connect(document, "onkeyup", owfdojo.hitch(this, b))
            }
            this.afterContainerInit()
        }));
        gadgets.rpc.register("_widget_activated", owfdojo.hitch(this, function() {
            if (c) {
                owfdojo.disconnect(c)
            }
            if (c) {
                owfdojo.disconnect(g)
            }
            c = null;
            g = null
        }));
        gadgets.rpc.register("_widget_deactivated", owfdojo.hitch(this, function() {
            if (!c) {
                c = owfdojo.connect(document, "click", owfdojo.hitch(this, b))
            }
            if (!g) {
                g = owfdojo.connect(document, "onkeyup", owfdojo.hitch(this, b))
            }
        }));
        try {
            var a = '{"id":"' + e.id + '"}';
            var d = {
                id: a,
                version: this.version,
                useMultiPartMessagesForIFPC: true,
                relayUrl: this.widgetRelay
            };
            if (Ozone.util.pageLoad.loadTime != null && Ozone.util.pageLoad.autoSend) {
                d.loadTime = Ozone.util.pageLoad.loadTime
            }
            h = Ozone.util.toString(d);
            gadgets.rpc.call("..", "container_init", null, a, h)
        } catch (f) {
            throw {
                name: "WidgetInitException",
                message: "The call to container_init failed. Inner Exception: " + f
            }
        }
    },
    isInitialized: function() {
        return this.isAfterInit
    },
    afterInitCallBack: function(a) {},
    afterContainerInit: function() {
        this.isAfterInit = true;
        if (this.afterInitCallBack != null) {
            this.afterInitCallBack(this)
        }
    },
    registerHandler: function(a, b) {
        gadgets.rpc.register(a, b)
    },
    send: function() {
        gadgets.rpc.call.apply(gadgets.rpc, arguments)
    },
    subscribe: function(a, b) {
        gadgets.pubsub.subscribe(a, b);
        return this
    },
    unsubscribe: function(a) {
        gadgets.pubsub.unsubscribe(a);
        return this
    },
    publish: function(a, c, b) {
        gadgets.pubsub.publish(a, c, b);
        return this
    }
};
Ozone.eventing.Widget.getInstance = function(a, b) {
    if (Ozone.eventing.Widget.instance == null) {
        Ozone.eventing.Widget.instance = new Ozone.eventing.Widget(b, a)
    } else {
        if (a != null) {
            if (!Ozone.eventing.Widget.instance.isAfterInit) {
                owfdojo.connect(Ozone.eventing.Widget.instance, "afterInitCallBack", Ozone.eventing.Widget.instance, a)
            } else {
                setTimeout(function() {
                    a(Ozone.eventing.Widget.instance)
                }, 50)
            }
        }
    }
    return Ozone.eventing.Widget.instance
};
OWF = window.OWF ? window.OWF : {};
(function(b, a, c) {
    OWF.Intents = function() {
        var d = "_intents",
            e = "_intents_receive",
            f = {};
        return {
            startActivity: function(m, k, j, g) {
                var n = [];
                if (g != null) {
                    for (var h = 0; h < g.length; h++) {
                        n.push(g[h].id)
                    }
                }
                gadgets.rpc.call("..", d, function(r) {
                    if (j != null) {
                        var q = [];
                        if (r != null) {
                            var p = [].concat(r);
                            for (var o = 0; o < p.length; o++) {
                                var s = Ozone.eventing.getWidgetProxyMap()[p];
                                if (s != null) {
                                    q.push(s);
                                    if (q.length == p.length) {
                                        j(q)
                                    }
                                } else {
                                    Ozone.eventing.importWidget(p[o], function(t) {
                                        q.push(t);
                                        if (q.length == p.length) {
                                            j(q)
                                        }
                                    })
                                }
                            }
                            if (p.length < 1) {
                                j(q)
                            }
                        } else {
                            j(q)
                        }
                    }
                }, OWF.getIframeId(), m, k, n)
            },
            receive: function(h, g) {
                var j = owfdojo.toJson(h);
                f[j] = g;
                gadgets.rpc.register(d, function(m, o, n) {
                    var p = owfdojo.toJson(o);
                    var k = f[p];
                    if (f[p] != null) {
                        k.call(this, m, o, n)
                    }
                });
                gadgets.rpc.call("..", e, null, h, OWF.getIframeId())
            }
        }
    }()
}(window, document));
var Ozone = Ozone ? Ozone : {};
Ozone.chrome = Ozone.chrome ? Ozone.chrome : {};
Ozone.chrome.WidgetChrome = function(a) {
    if (Ozone.chrome.WidgetChrome.instance == null) {
        var b = this;
        b.channelName = "Ozone._WidgetChromeChannel";
        b.version = Ozone.version.owfversion + Ozone.version.widgetChrome;
        b.items = {};
        b.registerChromeMenu = function(d) {
            b.items[d.itemId != null ? d.itemId : d.id] = d;
            if (d.menu) {
                for (var e = 0; e < d.menu.items.length; e++) {
                    var f = d.menu.items[e];
                    b.registerChromeMenu(f)
                }
            }
        };
        var c = {
            init: function(d) {
                d = d || {};
                b.widgetEventingController = d.widgetEventingController || Ozone.eventing.Widget.instance;
                b.widgetEventingController.registerHandler(b.channelName, function(e, j) {
                    var g = true;
                    var h = Ozone.util.parseJson(j);
                    var k = h.itemId != null ? h.itemId : h.id;
                    var f = b.items[k].handler;
                    if (f != null && owfdojo.isFunction(f)) {
                        g = f.apply(h.scope != null ? h.scope : window, h.args != null ? h.args : [])
                    }
                    return g
                })
            },
            isModified: function(d) {
                var f = {
                    action: "isModified"
                };
                var e = gadgets.json.stringify(f);
                gadgets.rpc.call("..", b.channelName, d.callback, b.widgetEventingController.getWidgetId(), e)
            },
            addHeaderButtons: function(d) {
                var h = {};
                var e = null;
                if (!owfdojo.isArray(d.items)) {
                    e = [d.items]
                } else {
                    e = d.items
                }
                h.action = "addHeaderButtons";
                h.type = "button";
                h.items = e;
                for (var g = 0; g < e.length; g++) {
                    b.items[e[g].itemId != null ? e[g].itemId : e[g].id] = e[g]
                }
                var f = gadgets.json.stringify(h);
                gadgets.rpc.call("..", b.channelName, d.callback, b.widgetEventingController.getWidgetId(), f)
            },
            updateHeaderButtons: function(d) {
                var h = {};
                var e = null;
                if (!owfdojo.isArray(d.items)) {
                    e = [d.items]
                } else {
                    e = d.items
                }
                h.action = "updateHeaderButtons";
                h.type = "button";
                h.items = e;
                for (var g = 0; g < e.length; g++) {
                    var j = e[g].itemId != null ? e[g].itemId : e[g].id;
                    if (b.items[j] != null) {
                        owfdojo.mixin(b.items[j], e[g])
                    } else {
                        b.items[j] = e[g]
                    }
                }
                var f = gadgets.json.stringify(h);
                gadgets.rpc.call("..", b.channelName, d.callback, b.widgetEventingController.getWidgetId(), f)
            },
            insertHeaderButtons: function(d) {
                var h = {};
                var e = null;
                if (!owfdojo.isArray(d.items)) {
                    e = [d.items]
                } else {
                    e = d.items
                }
                h.action = "insertHeaderButtons";
                h.type = "button";
                if (d.pos != null) {
                    h.pos = d.pos
                }
                h.items = e;
                for (var g = 0; g < e.length; g++) {
                    b.items[e[g].itemId != null ? e[g].itemId : e[g].id] = e[g]
                }
                var f = gadgets.json.stringify(h);
                gadgets.rpc.call("..", b.channelName, d.callback, b.widgetEventingController.getWidgetId(), f)
            },
            removeHeaderButtons: function(d) {
                var h = {};
                var e = null;
                if (!owfdojo.isArray(d.items)) {
                    e = [d.items]
                } else {
                    e = d.items
                }
                h.action = "removeHeaderButtons";
                h.type = "button";
                h.items = e;
                for (var g = 0; g < e.length; g++) {
                    var j = e[g].itemId != null ? e[g].itemId : e[g].id;
                    if (b.items[j] != null) {
                        delete b.items[j]
                    }
                }
                var f = gadgets.json.stringify(h);
                gadgets.rpc.call("..", b.channelName, d.callback, b.widgetEventingController.getWidgetId(), f)
            },
            listHeaderButtons: function(d) {
                var f = {
                    action: "listHeaderMenus",
                    type: "button"
                };
                var e = gadgets.json.stringify(f);
                gadgets.rpc.call("..", b.channelName, d.callback, b.widgetEventingController.getWidgetId(), e)
            },
            addHeaderMenus: function(d) {
                var j = {};
                var e = null;
                if (!owfdojo.isArray(d.items)) {
                    e = [d.items]
                } else {
                    e = d.items
                }
                j.action = "addHeaderMenus";
                j.type = "menu";
                j.items = e;
                for (var g = 0; g < e.length; g++) {
                    var h = e[g];
                    b.registerChromeMenu(h)
                }
                var f = gadgets.json.stringify(j);
                gadgets.rpc.call("..", b.channelName, d.callback, b.widgetEventingController.getWidgetId(), f)
            },
            updateHeaderMenus: function(n) {
                var h = {};
                var o = null;
                if (!owfdojo.isArray(n.items)) {
                    o = [n.items]
                } else {
                    o = n.items
                }
                h.action = "updateHeaderMenus";
                h.type = "menu";
                h.items = o;
                var p = function(x, t, w) {
                    if (typeof t === "string") {
                        if (w && w.constructor === Object) {
                            if (x[t] && x[t].constructor === Object) {
                                p(x[t], w)
                            } else {
                                x[t] = Ext.clone(w)
                            }
                        } else {
                            x[t] = w
                        }
                        return x
                    }
                    var k = 1,
                        u = arguments.length,
                        j, v;
                    for (; k < u; k++) {
                        j = arguments[k];
                        for (v in j) {
                            if (j.hasOwnProperty(v)) {
                                p(x, v, j[v])
                            }
                        }
                    }
                    return x
                };
                for (var m = 0; m < o.length; m++) {
                    var s = o[m];
                    if (s.menu || s.handler) {
                        b.registerChromeMenu(s)
                    }
                    if (s.menu) {
                        for (var g = 0; g < s.menu.items.length; g++) {
                            var d = s.menu.items[g];
                            if (!d.menu) {
                                var r = d.itemId != null ? d.itemId : d.id;
                                b.items[r] = b.items[r] ? b.items[r] : {};
                                b.items[r] = p(b.items[r], d)
                            } else {
                                for (var f = 0; f < d.menu.items.length; f++) {
                                    var e = d.menu.items[f];
                                    var r = e.itemId != null ? e.itemId : e.id;
                                    b.items[r] = b.items[r] ? b.items[r] : {};
                                    b.items[r] = p(b.items[r], e)
                                }
                            }
                        }
                    } else {
                        var r = s.itemId != null ? s.itemId : s.id;
                        b.items[r] = b.items[r] ? b.items[r] : {};
                        b.items[r] = p(b.items[r], s)
                    }
                    h.items[m] = b.items[h.items[m].itemId]
                }
                var q = gadgets.json.stringify(h);
                gadgets.rpc.call("..", b.channelName, n.callback, b.widgetEventingController.getWidgetId(), q)
            },
            insertHeaderMenus: function(n) {
                var h = {};
                var o = null;
                if (!owfdojo.isArray(n.items)) {
                    o = [n.items]
                } else {
                    o = n.items
                }
                h.action = "insertHeaderMenus";
                h.type = "menu";
                if (n.pos != null) {
                    h.pos = n.pos
                }
                h.items = o;
                for (var m = 0; m < o.length; m++) {
                    var q = o[m];
                    if (q.menu) {
                        for (var g = 0; g < q.menu.items.length; g++) {
                            var d = q.menu.items[g];
                            if (!d.menu) {
                                b.items[d.itemId != null ? d.itemId : d.id] = d
                            } else {
                                for (var f = 0; f < d.menu.items.length; f++) {
                                    var e = d.menu.items[f];
                                    b.items[e.itemId != null ? e.itemId : e.id] = e
                                }
                            }
                        }
                    } else {
                        b.items[q.itemId != null ? q.itemId : q.id] = q
                    }
                }
                var p = gadgets.json.stringify(h);
                gadgets.rpc.call("..", b.channelName, n.callback, b.widgetEventingController.getWidgetId(), p)
            },
            removeHeaderMenus: function(d) {
                var h = {};
                var e = null;
                if (!owfdojo.isArray(d.items)) {
                    e = [d.items]
                } else {
                    e = d.items
                }
                h.action = "removeHeaderMenus";
                h.type = "menu";
                h.items = e;
                for (var g = 0; g < e.length; g++) {
                    var j = e[g];
                    if (b.items[j] != null) {
                        delete b.items[j]
                    }
                }
                var f = gadgets.json.stringify(h);
                gadgets.rpc.call("..", b.channelName, d.callback, b.widgetEventingController.getWidgetId(), f)
            },
            listHeaderMenus: function(d) {
                var f = {
                    action: "listHeaderMenus",
                    type: "menu"
                };
                var e = gadgets.json.stringify(f);
                gadgets.rpc.call("..", b.channelName, d.callback, b.widgetEventingController.getWidgetId(), e)
            },
            getTitle: function(d) {
                var f = {
                    action: "getTitle"
                };
                var e = gadgets.json.stringify(f);
                gadgets.rpc.call("..", b.channelName, d.callback, b.widgetEventingController.getWidgetId(), e)
            },
            setTitle: function(d) {
                var f = {
                    action: "setTitle",
                    title: d.title
                };
                var e = gadgets.json.stringify(f);
                gadgets.rpc.call("..", b.channelName, d.callback, b.widgetEventingController.getWidgetId(), e)
            }
        };
        c.init(a);
        Ozone.chrome.WidgetChrome.instance = c
    }
    return Ozone.chrome.WidgetChrome.instance
};
Ozone.chrome.WidgetChrome.getInstance = function(a) {
    if (Ozone.chrome.WidgetChrome.instance == null) {
        Ozone.chrome.WidgetChrome.instance = new Ozone.chrome.WidgetChrome(a)
    }
    return Ozone.chrome.WidgetChrome.instance
};
var Ozone = Ozone ? Ozone : {};
Ozone.dragAndDrop = Ozone.dragAndDrop ? Ozone.dragAndDrop : {};
Ozone.dragAndDrop.WidgetDragAndDrop = function(a) {
    this.listeners = {};
    this.callbacks = {};
    this.dragging = false;
    this.dropEnabledFlag = false;
    this.dropZoneHandlers = [];
    a = a || {};
    this.dragIndicatorText = a.dragIndicatorText ? a.dragIndicatorText : "Dragging Data";
    if (a.callbacks != null && owfdojo.isObject(a.callbacks)) {
        owfdojo.mixin(this.callbacks, a.callbacks)
    }
    this.dragIndicator = this.createDragIndicator();
    this.dragIndicatorTextNode = owfdojo.query("span.ddText", this.dragIndicator)[0];
    this.widgetEventingController = a.widgetEventingController || Ozone.eventing.Widget.instance;
    if (a.keepMouseListenersAttached === undefined && owfdojo.isIE) {
        a.keepMouseListenersAttached = true
    }
    if (a.autoInit || a.autoInit === undefined) {
        this.init(a)
    }

    function b(e, d, f) {
        var c;
        if (document.createEvent) {
            c = document.createEvent("MouseEvents");
            c.initMouseEvent(d, true, true, window, 1, f.screenX, f.screenY, f.pageX, f.pageY, false, false, false, false, null, null);
            e.dispatchEvent(c)
        } else {
            if (document.createEventObject) {
                c = document.createEventObject();
                e.fireEvent("on" + d, c)
            }
        }
    }
    gadgets.rpc.register("_fire_mouse_move", owfdojo.hitch(this, function(d) {
        var c = document.elementFromPoint(d.pageX, d.pageY);
        if (this.getFlashWidgetId()) {
            if (d.sender !== this.widgetEventingController.getWidgetId()) {
                Ozone.util.getFlashApp().dispatchExternalMouseEvent(d.pageX, d.pageY)
            }
            this.mouseMove(d, true)
        } else {
            if (!arguments.callee.lastEl) {
                arguments.callee.lastEl = c;
                b(c, "mouseover", d)
            } else {
                if (arguments.callee.lastEl !== c) {
                    b(arguments.callee.lastEl, "mouseout", d);
                    b(c, "mouseover", d);
                    arguments.callee.lastEl = c
                }
            }
            b(c, "mousemove", d)
        }
    }));
    gadgets.rpc.register("_fire_mouse_up", owfdojo.hitch(this, function(d) {
        var c = document.elementFromPoint(d.pageX, d.pageY);
        if (c && c.nodeName === "OBJECT") {
            this.mouseUp(d, true)
        } else {
            b(c, "mouseup", d)
        }
    }));
    Ozone.dragAndDrop.WidgetDragAndDrop.instance = this;
    return this
};
Ozone.dragAndDrop.WidgetDragAndDrop.prototype = {
    dragStart: "dragStart",
    dragStop: "dragStop",
    dropReceive: "dropReceive",
    dragStartName: "_dragStart",
    dragOverWidgetName: "_dragOverWidget",
    dragOutName: "_dragOutName",
    dragStopInContainerName: "_dragStopInContainer",
    dragStopInWidgetName: "_dragStopInWidget",
    dragSendDataName: "_dragSendData",
    dropReceiveDataName: "_dropReceiveData",
    version: Ozone.version.owfversion + Ozone.version.dragAndDrop,
    init: function(a) {
        a = a || {};
        this.widgetEventingController.subscribe(this.dragStartName, owfdojo.hitch(this, this.onStartDrag));
        this.widgetEventingController.subscribe(this.dragOutName, owfdojo.hitch(this, this.onDragOut));
        this.widgetEventingController.subscribe(this.dragStopInContainerName, owfdojo.hitch(this, this.onDragStopInContainer));
        this.widgetEventingController.subscribe(this.dropReceiveDataName, owfdojo.hitch(this, this.dropReceiveData));
        if (a.keepMouseListenersAttached === true) {
            this.keepMouseListenersAttached = true;
            if (this.listeners.onmousemove == null) {
                this.listeners.onmousemove = owfdojo.connect(document, "onmousemove", this, this.mouseMove)
            }
            if (this.listeners.onmouseup == null) {
                this.listeners.onmouseup = owfdojo.connect(document, "onmouseup", this, this.mouseUp)
            }
        }
    },
    createDragIndicator: function() {
        return owfdojo.create("span", {
            className: "ddBox ddBoxCannotDrop",
            style: {
                display: "none"
            },
            innerHTML: '<span class="ddText">' + this.dragIndicatorText + "</span>"
        }, owfdojo.body())
    },
    doStartDrag: function(a) {
        var b = {
            dragSourceId: this.widgetEventingController.getWidgetId()
        };
        this.dragZone = a.dragZone;
        owfdojo.mixin(b, a);
        delete b.dragDropData;
        delete b.dragZone;
        this.onStartDrag(this.widgetEventingController.getWidgetId(), b);
        this.widgetEventingController.unsubscribe(this.dragStartName);
        this.widgetEventingController.publish(this.dragStartName, b);
        this.widgetEventingController.subscribe(this.dragStartName, owfdojo.hitch(this, this.onStartDrag));
        this.widgetEventingController.publish(this.dragSendDataName, owfdojo.mixin({
            dragSourceId: this.widgetEventingController.getWidgetId()
        }, a), "..")
    },
    onStartDrag: function(a, b) {
        this.dragging = true;
        this.dragStartData = b;
        if (owfdojo.isFunction(this.callbacks[this.dragStart])) {
            if (this.callbacks[this.dragStart](a, b) === false) {
                this.dragging = false;
                return
            }
        }
        if (owfdojo.isIE) {
            document.onselectstart = function() {
                return false
            };
            document.ondragstart = function() {
                return false
            }
        }
        this.dragIndicatorText = b.dragDropLabel;
        this.dragIndicatorTextNode.innerHTML = this.dragIndicatorText;
        if (this.listeners.onmousemove == null) {
            this.listeners.onmousemove = owfdojo.connect(document, "onmousemove", this, this.mouseMove)
        }
        if (this.listeners.onmouseup == null) {
            this.listeners.onmouseup = owfdojo.connect(document, "onmouseup", this, this.mouseUp)
        }
    },
    onDragOut: function(a, b) {
        owfdojo.style(this.dragIndicator, {
            display: "none"
        })
    },
    getMouseCoordinates: function(b) {
        var a = null;
        if (b.pageX || b.pageY) {
            a = {
                x: b.pageX,
                y: b.pageY
            }
        } else {
            a = {
                x: b.clientX + document.body.scrollLeft - document.body.clientLeft,
                y: b.clientY + document.body.scrollTop - document.body.clientTop
            }
        }
        return a
    },
    mouseMove: function(d, g) {
        if (this.dragging === true) {
            if (this.getFlashWidgetId() && g !== true && Ozone.Widget.getDashboardLayout() === "tabbed") {
                gadgets.rpc.call("..", "_fake_mouse_move", null, {
                    sender: this.widgetEventingController.getWidgetId(),
                    pageX: d.pageX,
                    pageY: d.pageY,
                    screenX: d.screenX,
                    screenY: d.screenY
                });
                return
            }
            var f = null;
            var c = null;
            var h = this.getMouseCoordinates(d);
            var b = h.x;
            var k = h.y;
            owfdojo.style(this.dragIndicator, {
                display: "none"
            });
            if (d === undefined) {
                d = window.event
            }
            if (owfdojo.isIE) {
                f = document.body.clientWidth;
                c = document.body.clientHeight
            } else {
                f = window.innerWidth;
                c = window.innerHeight
            } if ((owfdojo.isFF && owfdojo.isFF >= 4) || this.getFlashWidgetId()) {
                if (d.clientX < 0 || d.clientX > f || d.clientY < 0 || d.clientY > c) {
                    if (!arguments.callee._fakeEventCounter) {
                        arguments.callee._fakeEventCounter = 1
                    } else {
                        arguments.callee._fakeEventCounter += 1
                    }
                    gadgets.rpc.call("..", "_fake_mouse_move", null, {
                        sender: this.widgetEventingController.getWidgetId(),
                        pageX: d.pageX,
                        pageY: d.pageY,
                        screenX: d.screenX,
                        screenY: d.screenY
                    });
                    return
                } else {
                    if (arguments.callee._fakeEventCounter) {
                        arguments.callee._fakeEventCounter = null;
                        gadgets.rpc.call("..", "_fake_mouse_out")
                    }
                }
            }
            this.dragIndicator.style.top = k + 19 + "px";
            var j = f - 100;
            if ((b < f) && (b > j)) {
                this.dragIndicator.style.left = b - 88 + "px"
            } else {
                this.dragIndicator.style.left = b + 12 + "px"
            }
            var a = c - 40;
            if ((k > a) && (k < c)) {
                this.dragIndicator.style.top = k - 30 + "px"
            }
            this.dragIndicatorTextNode.innerHTML = this.dragIndicatorText;
            owfdojo.style(this.dragIndicator, {
                display: "block"
            })
        }
    },
    onDragStopInContainer: function(a, b) {
        owfdojo.style(this.dragIndicator, {
            display: "none"
        });
        if (!this.keepMouseListenersAttached) {
            for (l in this.listeners) {
                owfdojo.disconnect(this.listeners[l]);
                this.listeners[l] = null
            }
        }
        this.dragging = false;
        this.dragStartData = null;
        this.dragZone = null;
        this.setDropEnabled(false);
        if (owfdojo.isFunction(this.callbacks[this.dragStop])) {
            this.callbacks[this.dragStop](this.dropTarget)
        }
    },
    mouseUp: function(c, a) {
        if (this.dragging === true) {
            this.dragging = false;
            if (owfdojo.isIE) {
                document.onselectstart = function() {
                    return true
                };
                document.ondragstart = function() {
                    return true
                }
            }
            owfdojo.style(this.dragIndicator, {
                display: "none"
            });
            if (this.getFlashWidgetId()) {
                var d = null;
                var b = null;
                if (owfdojo.isIE) {
                    d = document.body.clientWidth;
                    b = document.body.clientHeight
                } else {
                    d = window.innerWidth;
                    b = window.innerHeight
                } if ((c.clientX < 0 || c.clientX > d || c.clientY < 0 || c.clientY > b || Ozone.Widget.getDashboardLayout() === "tabbed") && a !== true) {
                    gadgets.rpc.call("..", "_fake_mouse_up", null, {
                        sender: this.widgetEventingController.getWidgetId(),
                        pageX: c.pageX,
                        pageY: c.pageY,
                        screenX: c.screenX,
                        screenY: c.screenY
                    });
                    return
                }
            }
            for (l in this.listeners) {
                owfdojo.disconnect(this.listeners[l]);
                this.listeners[l] = null
            }
            this.dropTarget = c.target;
            this.widgetEventingController.publish(this.dragStopInWidgetName, this.widgetEventingController.getWidgetId())
        }
    },
    dropReceiveData: function(b, d, c) {
        if (this.dropEnabledFlag) {
            if (this.dropTarget) {
                d.dropTarget = this.dropTarget;
                for (var a = 0; a < this.dropZoneHandlers.length; a++) {
                    if (((this.dropTarget.id == this.dropZoneHandlers[a].id && this.dropTarget.id != null) || (owfdojo.hasClass(this.dropTarget, this.dropZoneHandlers[a].className)) || (owfdojo.isDescendant(this.dropTarget, this.dropZoneHandlers[a].dropZone))) && this.dragZone != this.dropZoneHandlers[a].dropZone) {
                        this.dropZoneHandlers[a].handler(d)
                    }
                }
                this.dropTarget = null
            }
            if (owfdojo.isFunction(this.callbacks[this.dropReceive])) {
                this.callbacks[this.dropReceive](d)
            }
        }
    },
    addCallback: function(b, a) {
        if (this.callbacks[b] == null) {
            this.callbacks[b] = a
        } else {
            owfdojo.connect(this.callbacks, b, a)
        }
    },
    addDropZoneHandler: function(a) {
        this.dropZoneHandlers.push(a)
    },
    getDropEnabled: function() {
        return this.dropEnabledFlag
    },
    isDragging: function() {
        return this.dragging
    },
    getDragStartData: function() {
        return owfdojo.mixin(this.dragStartData, {
            dragZone: this.dragZone
        })
    },
    setDropEnabled: function(a) {
        if (a) {
            this.dropEnabledFlag = true;
            owfdojo.removeClass(this.dragIndicator, "ddBoxCannotDrop");
            owfdojo.addClass(this.dragIndicator, "ddBoxCanDrop")
        } else {
            this.dropEnabledFlag = false;
            owfdojo.removeClass(this.dragIndicator, "ddBoxCanDrop");
            owfdojo.addClass(this.dragIndicator, "ddBoxCannotDrop")
        }
    },
    setFlashWidgetId: function(a) {
        this.flashWidgetId = a
    },
    getFlashWidgetId: function(a) {
        return this.flashWidgetId
    }
};
Ozone.dragAndDrop.WidgetDragAndDrop.getInstance = function(a) {
    if (Ozone.dragAndDrop.WidgetDragAndDrop.instance == null) {
        Ozone.dragAndDrop.WidgetDragAndDrop.instance = new Ozone.dragAndDrop.WidgetDragAndDrop(a)
    }
    return owfdojo.mixin(Ozone.dragAndDrop.WidgetDragAndDrop.instance, a)
};
var Ozone = Ozone ? Ozone : {};
Ozone.launcher = Ozone.launcher ? Ozone.launcher : {};
(function() {
    var a = "_WIDGET_LAUNCHER_CHANNEL";
    Ozone.launcher.WidgetLauncher = function() {
        if (Ozone.launcher.WidgetLauncher.instance == null) {
            this.version = Ozone.version.owfversion + Ozone.version.widgetLauncher;
            Ozone.launcher.WidgetLauncher.instance = this
        }
        return Ozone.launcher.WidgetLauncher.instance
    };
    Ozone.launcher.WidgetLauncher.prototype = {
        launchWidget: function(b, d) {
            if (b.titleRegex != null && b.titleRegex instanceof RegExp) {
                b.titleRegex = b.titleRegex.toString()
            }
            var c = gadgets.json.stringify(b);
            gadgets.rpc.call("..", a, d, OWF.getIframeId(), c)
        }
    };
    Ozone.launcher.WidgetLauncherUtils = {
        getLaunchConfigData: function() {
            var c = null;
            var b = Ozone.util.parseWindowNameData();
            if (b != null) {
                c = b.data
            }
            return c
        }
    };
    Ozone.launcher.WidgetLauncher.getInstance = function() {
        if (Ozone.launcher.WidgetLauncher.instance == null) {
            Ozone.launcher.WidgetLauncher.instance = new Ozone.launcher.WidgetLauncher()
        }
        return Ozone.launcher.WidgetLauncher.instance
    }
}());
var Ozone = Ozone ? Ozone : {};
Ozone.state = Ozone.state ? Ozone.state : {};
Ozone.state.WidgetStateHandler = function(a) {
    if (Ozone.state.WidgetStateHandler.instance == null) {
        this.stateChannelName = "_WIDGET_STATE_CHANNEL_";
        this.widgetEventingController = a || Ozone.eventing.Widget.instance;
        this.widgetIdJSON = Ozone.util.parseJson(this.widgetEventingController.getWidgetId());
        this.version = Ozone.version.owfversion + Ozone.version.widgetStateHandler;
        Ozone.state.WidgetStateHandler.instance = this
    }
    return Ozone.state.WidgetStateHandler.instance
};
Ozone.state.WidgetStateHandler.prototype = {
    handleWidgetRequest: function(b, c) {
        var a = this.stateChannelName + this.widgetIdJSON.id;
        gadgets.rpc.call("..", a, c, this.widgetIdJSON, b)
    }
};
Ozone.state.WidgetStateHandler.getInstance = function(a) {
    if (Ozone.state.WidgetStateHandler.instance == null) {
        Ozone.state.WidgetStateHandler.instance = new Ozone.state.WidgetStateHandler(a)
    }
    return Ozone.state.WidgetStateHandler.instance
};
var Ozone = Ozone ? Ozone : {};
Ozone.state = Ozone.state ? Ozone.state : {};
Ozone.state.WidgetState = function(a) {
    if (Ozone.state.WidgetState.instance == null) {
        var b = "_WIDGET_STATE_CHANNEL_";
        a = a || {};
        this.widgetEventingController = a.widgetEventingController || Ozone.eventing.Widget.instance;
        this.widgetStateHandler = Ozone.state.WidgetStateHandler.getInstance(this.widgetEventingController);
        this.widgetIdJSON = Ozone.util.parseJson(this.widgetEventingController.getWidgetId());
        this.widgetGuid = a.widgetGuid ? a.widgetGuid : this.widgetIdJSON.id;
        this.stateChannel = b + this.widgetGuid;
        this.onStateEventReceived = a.onStateEventReceived ? a.onStateEventReceived : this.onStateEventReceived;
        if (a.autoInit !== false) {
            this.init()
        }
        Ozone.state.WidgetState.instance = this
    }
    return Ozone.state.WidgetState.instance
};
Ozone.state.WidgetState.prototype = {
    version: Ozone.version.owfversion + Ozone.version.state,
    init: function() {
        this.widgetEventingController.subscribe(this.stateChannel, this.onStateEventReceived)
    },
    onStateEventReceived: function() {
        return true
    },
    getStateChannel: function() {
        return this.stateChannel
    },
    getWidgetState: function(a) {
        a = a ? a : {};
        var b = {
            fn: "getWidgetState",
            params: {
                guid: a.guid ? a.guid : this.widgetGuid
            }
        };
        this.widgetStateHandler.handleWidgetRequest(b, a.callback)
    },
    getRegisteredStateEvents: function(a) {
        a = a ? a : {};
        var b = {
            fn: "getWidgetStateEvents",
            params: {
                guid: a.guid ? a.guid : this.widgetGuid
            }
        };
        this.widgetStateHandler.handleWidgetRequest(b, a.callback)
    },
    activateWidget: function(a) {
        a = a ? a : {};
        var b = {
            fn: "activateWidget",
            params: {
                guid: a.guid ? a.guid : this.widgetGuid
            }
        };
        this.widgetStateHandler.handleWidgetRequest(b, a.callback)
    },
    closeWidget: function(a) {
        a = a ? a : {};
        var b = {
            fn: "closeWidget",
            params: {
                guid: a.guid ? a.guid : this.widgetGuid
            }
        };
        this.widgetStateHandler.handleWidgetRequest(b, a.callback)
    },
    addStateEventListeners: function(a) {
        a = a ? a : {};
        var b = {
            fn: "addStateEventListeners",
            params: {
                guid: a.guid ? a.guid : this.widgetGuid,
                events: a.events
            }
        };
        this.widgetStateHandler.handleWidgetRequest(b, a.callback)
    },
    removeStateEventListeners: function(a) {
        a = a ? a : {};
        var b = {
            fn: "removeStateEventListeners",
            params: {
                guid: a.guid ? a.guid : this.widgetGuid,
                events: a.events
            }
        };
        this.widgetStateHandler.handleWidgetRequest(b, a.callback)
    },
    addStateEventOverrides: function(a) {
        a = a ? a : {};
        var b = {
            fn: "addStateEventOverrides",
            params: {
                guid: a.guid ? a.guid : this.widgetGuid,
                events: a.events
            }
        };
        this.widgetStateHandler.handleWidgetRequest(b, a.callback)
    },
    removeStateEventOverrides: function(a) {
        a = a ? a : {};
        var b = {
            fn: "removeStateEventOverrides",
            params: {
                guid: a.guid ? a.guid : this.widgetGuid,
                events: a.events
            }
        };
        this.widgetStateHandler.handleWidgetRequest(b, a.callback)
    }
};
Ozone.state.WidgetState.getInstance = function(a) {
    if (Ozone.state.WidgetState.instance == null) {
        Ozone.state.WidgetState.instance = new Ozone.state.WidgetState(a)
    }
    return Ozone.state.WidgetState.instance
};
var Ozone = Ozone ? Ozone : {};
Ozone.eventing = Ozone.eventing ? Ozone.eventing : {};
(function(c, a, d) {
    function b(f, e, g, h) {
        gadgets.rpc.call("..", "FUNCTION_CALL", null, f, e, g, h)
    }
    Ozone.eventing.WidgetProxy = function(p, h, e, m) {
        var j = p,
            f, o = [],
            g = m;
        if (j.charAt(0) === "{") {
            f = j;
            j = OWF.Util.parseJson(f).id
        } else {
            f = '{"id":"' + j + '"}'
        } if (g == null) {
            g = {
                id: f,
                isReady: false,
                callbacks: {},
                sendMessage: function(q) {
                    gadgets.rpc.call("..", "DIRECT_MESSAGE", null, j, q)
                },
                onReady: function(r, q) {
                    if (this.isReady) {
                        r.call(q)
                    } else {
                        o.push({
                            fn: r,
                            scope: q
                        })
                    }
                },
                fireReady: function() {
                    this.isReady = true;
                    for (var r = 0, q = o.length; r < q; r++) {
                        o[r].fn.call(o[r].scope)
                    }
                }
            }
        }
        if (h != null) {
            for (var n = 0; n < h.length; n++) {
                var k = h[n];
                g[k] = function(q) {
                    return function() {
                        var t = arguments[arguments.length - 1];
                        var s = typeof t == "function";
                        var r = Array.prototype.slice.call(arguments, 0, s ? arguments.length - 1 : arguments.length);
                        if (s) {
                            g.callbacks[q] = t
                        }
                        b.call(this, j, e, q, r)
                    }
                }(k)
            }
        }
        return g
    }
}(window, document));
var Ozone = Ozone || {};
Ozone.eventing = Ozone.eventing || {};
Ozone.eventing.priv = Ozone.eventing.priv || {};
(function(q) {
    if (typeof f === "undefined") {
        var f = gadgets.json
    }
    var g = "_widgetReady",
        y = "_getWidgetReady",
        x = null,
        p = {},
        n = {};

    function w() {
        if (x == null) {
            x = {};
            if (window.name.charAt(0) != "{") {
                x.rpcId = window.name
            } else {
                x = f.parse(window.name);
                x.rpcId = x.id;
                return x
            }
        } else {
            return x
        }
    }

    function d() {
        return n
    }

    function s() {
        return w().rpcId
    }

    function m(B) {
        if (q.handleDirectMessage) {
            q.handleDirectMessage(B)
        } else {
            if (console && console.log) {
                console.log("ChildWidget: Kernel: Default direct message handler, doing nothing.  Override by defining Ozone.eventing.handleDirectMessage")
            }
        }
    }

    function r() {
        var G = Array.prototype.slice.call(arguments);
        var E = Array.prototype.slice.call(arguments, 3);
        var F = G[0];
        var D = G[1];
        var H = G[2];
        var C = p[H];
        C.fn.widgetIdCaller = D;
        var B = C.fn.apply(C.scope, E[0]);
        gadgets.rpc.call("..", "FUNCTION_CALL_RESULT", null, F, D, H, B)
    }

    function t(D, E, C) {
        var F = n[D];
        if (F != null) {
            var B = F.callbacks[E];
            if (typeof B === "function") {
                B.call(window, C)
            }
        }
    }

    function u(B) {
        var C = q.priv.clientEventNameToHandler[B];
        var D = Array.prototype.slice.call(arguments, 1);
        C.apply(window, D)
    }
    q.priv.clientEventNameToHandler = {};
    q.after_container_init = function() {};

    function o(D) {
        if (D) {
            var B = [];
            for (var C = 0; C < D.length; C++) {
                var E = D[C].name;
                B.push(E)
            }
            return B
        }
    }

    function k(B, D, C) {
        n[B] = new Ozone.eventing.WidgetProxy(B, D, s(), C);
        return n[B]
    }

    function b(C) {
        var E = C.indexOf("//");
        var D = C.indexOf("/", E + 2);
        var B = C.indexOf("/", D + 1);
        var F = C.substring(0, B + 1) + "rpc_relay.html";
        return F
    }

    function A(E) {
        var C;
        for (var D = 0, B = E.length; D < B; D++) {
            C = E[D];
            if (!C.name) {
                throw "Error: name is not set"
            }
            if (!C.fn) {
                throw "Error: fn is not set"
            }
            p[C.name] = C
        }
    }

    function j(G, C) {
        gadgets.rpc.setRelayUrl("..", w().relayUrl, false, true);
        gadgets.rpc.register("after_container_init", q.after_container_init);
        G = [].concat(G);
        A(G);
        var F = o(G);
        var H = s();
        if (C == null) {
            C = b(document.location.href)
        }
        var B = '{"id":"' + H + '"}';
        var E = {
            id: B,
            version: "1.0",
            useMultiPartMessagesForIFPC: true,
            relayUrl: C
        };
        var D = f.stringify(E);
        gadgets.rpc.call("..", "container_init", null, B, D, F)
    }

    function c(B) {
        B = [].concat(B);
        A(B);
        gadgets.rpc.call("..", "register_functions", null, window.name, o(B))
    }

    function h(F, D) {
        if (F.charAt(0) === "{") {
            F = OWF.Util.parseJson(F).id
        }
        var C = k(F);

        function B(H) {
            C = k(F, H, C);
            gadgets.rpc.call("..", y, function(I) {
                if (I) {
                    C.fireReady()
                }
                if (typeof D == "function") {
                    D.call(this, C)
                }
            }, F, E)
        }
        var G = s();
        var E = '{"id":"' + G + '"}';
        gadgets.rpc.call("..", "GET_FUNCTIONS", B, F, E);
        return C
    }

    function a(B, C) {
        q.priv.clientEventNameToHandler[B] = C;
        var D = s();
        gadgets.rpc.call("..", "ADD_EVENT", null, D, B)
    }

    function e(B, C) {
        gadgets.rpc.call("..", "CALL_EVENT", null, B, C)
    }

    function v(B) {
        document.body.display = "none";
        gadgets.rpc.call("..", "CLOSE_EVENT", null, s(), B)
    }

    function z(C) {
        function B(D) {
            C(D)
        }
        gadgets.rpc.call("..", "LIST_WIDGETS", B)
    }
    gadgets.rpc.register("DIRECT_MESSAGEL_CLIENT", m);
    gadgets.rpc.register("FUNCTION_CALL_CLIENT", r);
    gadgets.rpc.register("FUNCTION_CALL_RESULT_CLIENT", t);
    gadgets.rpc.register("EVENT_CLIENT", u);
    gadgets.rpc.register(g, function(B) {
        var C = n[B];
        if (C != null) {
            C.fireReady()
        }
    });
    q.clientInitialize = j;
    q.registerFunctions = c;
    q.importWidget = h;
    q.addEventHandler = a;
    q.raiseEvent = e;
    q.closeDialog = v;
    q.getAllWidgets = z;
    q.getWidgetProxyMap = d
})(Ozone.eventing);
var Ozone = Ozone || {};
Ozone.metrics = Ozone.metrics || {};
Ozone.metrics.logMetric = function(d, g, c, e, f, j, a, h) {
    var b = new Date();
    Ozone.util.Transport.send({
        url: OWF.getContainerUrl() + "/metric",
        method: "POST",
        onSuccess: function(k) {},
        autoSendVersion: false,
        content: {
            metricTime: b.getTime(),
            userId: d,
            userName: g,
            site: c,
            userAgent: navigator.userAgent,
            component: e,
            componentId: f,
            instanceId: j,
            metricTypeId: a,
            widgetData: h
        }
    })
};
Ozone.metrics.logBatchMetrics = function(b) {
    var a = new Date();
    Ozone.util.Transport.send({
        url: OWF.getContainerUrl() + "/metric",
        method: "POST",
        onSuccess: function(c) {},
        autoSendVersion: false,
        content: {
            data: b
        }
    })
};
Ozone.metrics.logWidgetRender = function(a, c, d, b) {
    if (Ozone.config.metric.enabled === true) {
        Ozone.metrics.logMetric(a, c, d, b.name, b.widgetGuid, b.id, "ozone.widget.view", "")
    }
};
var Ozone = Ozone ? Ozone : {};
OWF = window.OWF ? window.OWF : {};
(function(f, h, a) {
    var b = "_widgetReady",
        g = false,
        k = [],
        c = Ozone.util.parseWindowNameData(),
        j, m, e, d;
    owfdojo.mixin(OWF, {
        Eventing: {},
        RPC: {},
        Preferences: {},
        Launcher: {},
        DragAndDrop: {},
        Chrome: {},
        Util: Ozone.util,
        Metrics: Ozone.metrics,
        Log: Ozone.log,
        Lang: Ozone.lang,
        Version: Ozone.version,
        ready: function(o, n) {
            if (o === a) {
                throw "Error: no arguments passed";
                return
            }
            if (typeof o !== "function") {
                throw "Error: handler must be a function";
                return
            }
            g === true ? o.call(n) : k.push({
                fn: o,
                scope: n
            })
        },
        notifyWidgetReady: function() {
            gadgets.rpc.call("..", b, null, OWF.getInstanceId())
        },
        getWidgetGuid: function() {
            return c.guid
        },
        getInstanceId: function() {
            return c.id
        },
        getIframeId: function() {
            return '{"id":"' + c.id + '"}'
        },
        getDashboardLayout: function() {
            return c.layout
        },
        getVersion: function() {
            return c.version
        },
        getUrl: function() {
            return c.url
        },
        getCurrentTheme: function() {
            return c.currentTheme
        },
        getContainerName: function() {
            return c.containerName
        },
        getContainerVersion: function() {
            return c.containerVersion
        },
        isDashboardLocked: function() {
            return c.locked
        },
        getContainerUrl: function() {
            var n = c.preferenceLocation;
            return n.substring(0, n.length - 6)
        },
        getOpenedWidgets: function(n) {
            if (n === a) {
                throw "Error: no arguments passed";
                return
            }
            if (typeof n !== "function") {
                throw "Error: fn must be a function";
                return
            }
            Ozone.eventing.getAllWidgets(n)
        }
    });
    Ozone.Widget = OWF;
    OWF._init = function(u, v, p) {
        if (OWF.relayFile != null) {
            Ozone.eventing.Widget.widgetRelayURL = OWF.relayFile
        }

        function s() {
            for (var x = 0, w = ["publish", "subscribe", "unsubscribe"]; x < w.length; x++) {
                OWF.Eventing[w[x]] = this[w[x]]
            }
        }

        function q() {
            OWF.RPC.registerFunctions = Ozone.eventing.registerFunctions;
            OWF.RPC.getWidgetProxy = Ozone.eventing.importWidget;
            OWF.RPC.handleDirectMessage = function(w) {
                if (typeof w !== "function") {
                    throw "Error: fn must be a function";
                    return
                }
                Ozone.eventing.handleDirectMessage = w
            }
        }

        function n() {
            for (var w in Ozone.pref.PrefServer) {
                if (typeof Ozone.pref.PrefServer[w] === "function") {
                    OWF.Preferences[w] = Ozone.pref.PrefServer[w]
                }
            }
        }

        function t() {
            OWF.Launcher.launch = e.launchWidget;
            OWF.Launcher.getLaunchData = Ozone.launcher.WidgetLauncherUtils.getLaunchConfigData
        }

        function r() {
            OWF.DragAndDrop = {
                onDragStart: function(z, y) {
                    m.addCallback("dragStart", owfdojo.hitch(y, z));
                    return this
                },
                onDragStop: function(z, y) {
                    m.addCallback("dragStop", owfdojo.hitch(y, z));
                    return this
                },
                onDrop: function(z, y) {
                    m.addCallback("dropReceive", owfdojo.hitch(y, z));
                    return this
                },
                startDrag: function(y) {
                    m.doStartDrag(y);
                    return this
                }
            };
            for (var x = 0, w = ["addDropZoneHandler", "getDragStartData", "getDropEnabled", "setDropEnabled", "isDragging", "getFlashWidgetId", "setFlashWidgetId"]; x < w.length; x++) {
                OWF.DragAndDrop[w[x]] = function(y) {
                    return function() {
                        return m[y].apply(m, arguments)
                    }
                }(w[x])
            }
        }

        function o() {
            for (var x = 0, w = ["addHeaderButtons", "addHeaderMenus", "insertHeaderButtons", "insertHeaderMenus", "isModified", "listHeaderButtons", "listHeaderMenus", "removeHeaderButtons", "removeHeaderMenus", "updateHeaderButtons", "updateHeaderMenus", "getTitle", "setTitle"]; x < w.length; x++) {
                OWF.Chrome[w[x]] = d[w[x]]
            }
        }
        j = Ozone.eventing.Widget.getInstance(function() {
            m = Ozone.dragAndDrop.WidgetDragAndDrop.getInstance({
                widgetEventingController: this
            });
            e = Ozone.launcher.WidgetLauncher.getInstance();
            d = Ozone.chrome.WidgetChrome.getInstance({
                widgetEventingController: this
            });
            s.call(this);
            q();
            n();
            t();
            r();
            o();
            Ozone.components.keys.createKeyEventSender(this);
            g = true;
            for (var x = 0, w = k.length; x < w; x++) {
                k[x].fn.call(k[x].scope)
            }
        })
    }
}(window, document));
if (!Ozone.disableWidgetInit) {
    owfdojo.addOnLoad(function() {
        Ozone.util.pageLoad.afterLoad = (new Date()).getTime();
        Ozone.util.pageLoad.calcLoadTime();
        if (Ozone.util.isInContainer()) {
            OWF._init(window, document)
        }
    })
};
