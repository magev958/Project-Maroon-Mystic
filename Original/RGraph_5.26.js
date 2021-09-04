window.RGraph = window.RGraph || {
        isrgraph: !0,
        isRGraph: !0,
        rgraph: !0
    },
    function() {
        var t = navigator.userAgent;
        RGraph.Highlight = {}, RGraph.Registry = {}, RGraph.Registry.store = [], RGraph.Registry.store["event.handlers"] = [], RGraph.Registry.store.__rgraph_event_listeners__ = [], RGraph.Background = {}, RGraph.background = {}, RGraph.objects = [], RGraph.Resizing = {}, RGraph.events = [], RGraph.cursor = [], RGraph.Effects = RGraph.Effects || {}, RGraph.cache = [], RGraph.ObjectRegistry = {}, RGraph.ObjectRegistry.objects = {}, RGraph.ObjectRegistry.objects.byUID = [], RGraph.ObjectRegistry.objects.byCanvasID = [], RGraph.OR = RGraph.ObjectRegistry, RGraph.PI = Math.PI, RGraph.HALFPI = RGraph.PI / 2, RGraph.TWOPI = 2 * RGraph.PI, RGraph.ISFF = -1 != t.indexOf("Firefox"), RGraph.ISOPERA = -1 != t.indexOf("Opera"), RGraph.ISCHROME = -1 != t.indexOf("Chrome"), RGraph.ISSAFARI = -1 != t.indexOf("Safari") && !RGraph.ISCHROME, RGraph.ISWEBKIT = -1 != t.indexOf("WebKit"), RGraph.ISIE = 0 < t.indexOf("Trident") || 0 < navigator.userAgent.indexOf("MSIE"), RGraph.ISIE6 = 0 < t.indexOf("MSIE 6"), RGraph.ISIE7 = 0 < t.indexOf("MSIE 7"), RGraph.ISIE8 = 0 < t.indexOf("MSIE 8"), RGraph.ISIE9 = 0 < t.indexOf("MSIE 9"), RGraph.ISIE10 = 0 < t.indexOf("MSIE 10"), RGraph.ISOLD = RGraph.ISIE6 || RGraph.ISIE7 || RGraph.ISIE8, RGraph.ISIE11UP = -1 == t.indexOf("MSIE") && 0 < t.indexOf("Trident"), RGraph.ISIE10UP = RGraph.ISIE10 || RGraph.ISIE11UP, RGraph.ISIE9UP = RGraph.ISIE9 || RGraph.ISIE10UP, RGraph.MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], RGraph.MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], RGraph.DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], RGraph.DAYS_LONG = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], RGraph.getArgs = function(t, e) {
            var r = {},
                a = 0;
            e = e.trim().split(/ *, */), t && t[0] && 1 === t.length && void 0 !== t[0][e[0]];
            for (var n in e) r[e[n]] = void 0 === t[a] ? null : t[a], a += 1;
            return r
        }, RGraph.arrayClone = function() {
            var t = RGraph.getArgs(arguments, "array");
            if (null === t.array || "object" != typeof t.array) return t.array;
            var e, r, a = RGraph.isArray(t.array) ? [] : {};
            for (var n in t.array) "string" != typeof n && "number" != typeof n || ("number" == typeof t.array[n] ? a[n] = (r = t.array[n], Number(r)) : "string" == typeof t.array[n] ? a[n] = (e = t.array[n], String(e)) : "function" == typeof t.array[n] ? a[n] = t.array[n] : a[n] = RGraph.arrayClone(t.array[n]));
            return a
        }, RGraph.clear = RGraph.Clear = function(t) {
            var e, r = (t = RGraph.getArgs(arguments, "canvas,color")).canvas.__object__,
                a = t.canvas.getContext("2d"),
                n = t.color || r && r.get("clearto");
            if (t.canvas) {
                if (RGraph.fireCustomEvent(r, "onbeforeclear"), RGraph.text.domNodeCache && RGraph.text.domNodeCache[t.canvas.id])
                    for (var i in RGraph.text.domNodeCache[t.canvas.id]);
                !n || n && "rgba(0,0,0,0)" === n || "transparent" === n ? (a.clearRect(-100, -100, t.canvas.width + 200, t.canvas.height + 200), a.globalCompositeOperation = "source-over") : n ? r.path("fs % fr -100 -100 % %", n, t.canvas.width + 200, t.canvas.height + 200) : r.path("fs % fr -100 -100 % %", r.get("clearto"), t.canvas.width + 200, t.canvas.height + 200), RGraph.Registry.get("background.image." + t.canvas.id) && ((e = RGraph.Registry.get("background.image." + t.canvas.id)).style.position = "absolute"), RGraph.Registry.get("tooltip") && r && !r.get("tooltipsNohideonclear") && RGraph.hideTooltip(t.canvas), t.canvas.style.cursor = "default", RGraph.fireCustomEvent(r, "onclear")
            }
        }, RGraph.drawTitle = function() {
            var t, e, r = RGraph.getArgs(arguments, "object,text,marginTop,centerx"),
                a = r.object.canvas,
                n = r.object.context,
                i = r.object.properties,
                s = i.marginLeft,
                o = i.marginRight,
                l = r.marginTop,
                h = i.marginBottom,
                c = r.centerx ? r.centerx : (a.width - s - o) / 2 + s,
                g = i.keyPosition,
                u = i.titleVpos,
                p = i.titleHpos,
                d = i.titleBackground,
                f = i.titleX,
                b = i.titleY,
                m = "center",
                R = "center",
                x = RGraph.getTextConf({
                    object: r.object,
                    prefix: "title"
                }),
                G = x.size,
                y = x.bold;
            x.italic, RGraph.isNull(y) && (y = x.bold = !0), "bar" == r.object.type && "3d" == i.variant && (g = "margin"), n.beginPath(), n.fillStyle = x.color ? x.color : "black", R = g && "margin" != g || !g ? "center" : "bottom", "number" == typeof i.titleVpos ? (u = i.titleVpos * l, "top" === i.xaxisPosition && (u = i.titleVpos * h + l + (a.height - l - h))) : (u = l - G - 5, "top" === i.xaxisPosition && (u = a.height - h + G + 5)), "number" == typeof p && (c = p * a.width), "number" == typeof f && (c = f), "number" == typeof b && (u = b), "string" == typeof f && (c += parseFloat(f)), "string" == typeof b && (u += parseFloat(b)), "string" == typeof i.titleHalign && (m = i.titleHalign), "string" == typeof i.titleValign && (R = i.titleValign), null !== typeof x.color && (t = n.fillStyle, e = x.color, n.fillStyle = e || "black"), RGraph.text({
                object: r.object,
                font: x.font,
                size: x.size,
                color: x.color,
                bold: x.bold,
                italic: x.italic,
                x: c,
                y: u,
                text: r.text,
                valign: R,
                halign: m,
                bounding: null != d,
                "bounding.fill": d,
                tag: "title",
                marker: !1
            }), n.fillStyle = t
        }, RGraph.register = function() {
            var t = RGraph.getArgs(arguments, "object");
            t.object.get("noregister") || !1 === t.object.get("register") || (RGraph.ObjectRegistry.add(t.object), t.object.set("register", !1))
        }, RGraph.redrawCanvas = function() {
            var t = RGraph.getArgs(arguments, "canvas,clear,color"),
                e = RGraph.ObjectRegistry.getObjectsByCanvasID(t.canvas.id);
            (RGraph.isNull(t.clear) || "boolean" == typeof t.clear && !1 !== t.clear) && (t.color || t.canvas.__object__.get("clearto"), RGraph.clear(t.canvas, t.color));
            for (var r = 0, a = e.length; a > r; ++r) e[r] && e[r] && e[r].isrgraph && e[r].draw()
        }, RGraph.numberFormat = function(t) {
            var e, r, a, n = t.unitspre ? String(t.unitspre) : "",
                i = t.unitspost ? String(t.unitspost) : "",
                s = "",
                o = "",
                l = "string" == typeof t.point ? t.point : ".",
                h = "string" == typeof t.thousand ? t.thousand : ",";
            RegExp.$1 = "", "function" == typeof t.formatter, 0 < String(t.number).indexOf("e"), t.number = String(t.number), 0 < t.number.indexOf(".") && (a = t.number);
            var c = h;
            for (e = t.number.length - 1, r = 0; e >= 0; r++, e--) r % 3 == 0 && 0 != r && (s += c), s += t.number.charAt(e);
            var g = s,
                s = "";
            for (e = g.length - 1; e >= 0; e--) s += g.charAt(e);
            return 0 == s.indexOf("-" + t.thousand) && (s = "-" + s.substr(("-" + t.thousand).length)), o.length && (s = s + l + o), "-" == s.charAt(0) && (s = s.replace(/-/, "")), n + (s = s.replace(/^,+/, "")) + i
        }, RGraph.fireCustomEvent = function() {
            var t = RGraph.getArgs(arguments, "object,name");
            if ("on" !== t.name.substr(0, 2) && (t.name = "on" + t.name), t.object && t.object.isrgraph) {
                t.object[t.name] && t.object[t.name](t.object);
                var e = t.object.uid;
                if ("string" == typeof e && "object" == typeof RGraph.events && "object" == typeof RGraph.events[e] && 0 < RGraph.events[e].length)
                    for (var r = 0; r < RGraph.events[e].length; ++r) RGraph.events[e][r] && RGraph.events[e][r][1] === t.name && RGraph.events[e][r][2](t.object)
            }
        }, RGraph.hasTooltips = function() {
            var t = RGraph.getArgs(arguments, "object"),
                e = t.object.properties;
            if ("object" == typeof e.tooltips && e.tooltips);
            else if ("function" == typeof e.tooltips) return
        }, RGraph.createUID = function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
                var e = 16 * Math.random() | 0;
                return ("x" == t ? e : 3 & e | 8).toString(16)
            })
        }, RGraph.ObjectRegistry.add = function() {
            var t = RGraph.getArgs(arguments, "object"),
                e = t.object.uid,
                r = t.object.canvas.id;
            RGraph.ObjectRegistry.objects.byUID[RGraph.ObjectRegistry.objects.byUID.length] = [e, t.object], RGraph.ObjectRegistry.objects.byCanvasID.push([r, t.object])
        }, RGraph.ObjectRegistry.getObjectsByCanvasID = function() {
            for (var t = RGraph.getArgs(arguments, "id"), e = RGraph.ObjectRegistry.objects.byCanvasID, r = [], a = 0, n = e.length; n > a; ++a) e[a] && e[a][0] == t.id && r.push(e[a][1]);
            return r
        }, RGraph.getRadiusEndPoint = function() {
            var t = RGraph.getArgs(arguments, "cx,cy,angle,radius");
            return [t.cx + Math.cos(t.angle) * t.radius, t.cy + Math.sin(t.angle) * t.radius]
        }, RGraph.installEventListeners = function() {
            var t = RGraph.getArgs(arguments, "object"),
                e = t.object.properties;
            RGraph.installCanvasClickListener ? (RGraph.installWindowMousedownListener(t.object), RGraph.installCanvasClickListener(t.object)) : (RGraph.hasTooltips(t.object) || e.adjustable || e.annotatable || e.contextmenu || e.keyInteractive || "function" == typeof t.object.onclick || "function" == typeof t.object.onmousemove || "function" == typeof t.object.onmouseout || "function" == typeof t.object.onmouseover) && alert("[RGRAPH] You appear to have used dynamic features but not included the file: RGraph.common.dynamic.js")
        }, RGraph.text = function(t) {
            var e, r, a;
            for (var n in t && arguments[1] && "string" == typeof arguments[1].text ? (a = t, t = arguments[1]) : a = t.object, RGraph.text.defaults);
            if (a && a.isrgraph ? (r = (a = a).canvas, e = a.context) : "string" == typeof a ? (e = (r = document.getElementById(a)).getContext("2d"), a = r.__object__) : (-1 != a.toString().indexOf("CanvasRenderingContext2D") || RGraph.ISIE8 && a.moveTo || RGraph.ISOLD && a.fillText) && (a = (r = (e = a).canvas).__object__), "string" == typeof t.boundingFill && (t["bounding.fill"] = t.boundingFill), "string" == typeof t.boundingStroke && (t["bounding.stroke"] = t.boundingStroke), "number" == typeof t.boundingLinewidth && (t["bounding.linewidth"] = t.boundingLinewidth), "string" == typeof t.textConfPrefix && t.textConfPrefix.length, void 0 === t.accessible) {
                if (a && a.properties.textAccessible) return
            } else "boolean" == typeof t.accessible && t.accessible;
            var i, s = t.x,
                o = t.y,
                l = t.text,
                h = "string" == typeof l ? l.split(/\r?\n/g) : "",
                c = h.length,
                g = t.font ? t.font : "Arial",
                u = t.size ? t.size : 10,
                p = 1.5 * u,
                d = (t.bold, t.italic, t.halign ? t.halign : "left"),
                f = t.valign ? t.valign : "bottom",
                b = "string" == typeof t.tag && 0 < t.tag.length ? t.tag : "",
                m = (t.marker, t.angle || 0),
                R = t.bounding,
                x = (t["bounding.stroke"] ? t["bounding.stroke"] : "black", t["bounding.fill"] ? t["bounding.fill"] : "rgba(255,255,255,0.7)", t["bounding.shadow"], t["bounding.shadow.color"] || "#ccc", t["bounding.shadow.blur"] || 3, t["bounding.shadow.offsetx"] || 3, t["bounding.shadow.offsety"] || 3, "number" == typeof t["bounding.linewidth"] ? t["bounding.linewidth"] : 1, {});
            if ("string" == typeof t.color && (i = e.fillStyle, e.fillStyle = t.color), "number" == typeof l && (l = String(l)), "string" == typeof l) {
                0 != m && e.save(), e.font = (t.italic ? "italic " : "") + (t.bold ? "bold " : "") + u + "pt " + g;
                for (var G = 0, n = 0; c > n; ++n) G = Math.max(G, e.measureText(h[n]).width);
                var y, v, S, w = p * c;
                t.marker && (y = e.strokeStyle), v = "center" == d ? (e.textAlign = "center", s - 2 - G / 2) : "right" == d ? e.textAlign = "right" : e.textAlign = "left", S = "center" == f ? (e.textBaseline = "middle", --o, (o -= (c - 1) / 2 * p) - p / 2 - 2) : "top" == f ? e.textBaseline = "top" : e.textBaseline = "bottom";
                var C, j = G + 4,
                    I = 4 + w;
                return R && (C = e.lineWidth), c > 1 || e.fillText(l, s + .5, o + .5), e.textBaseline = "alphabetic", e.textAlign = "left", x.x = v, x.y = S, x.width = j, x.height = I, x.object = a, x.text = l, x.tag = b, a && a.isrgraph && a.coordsText && a.coordsText.push(x), "string" == typeof i && (e.fillStyle = i), x
            }
        }, RGraph.text.defaults = {}, RGraph.random = function() {
            var t = RGraph.getArgs(arguments, "min,max,decimals"),
                e = t.decimals ? t.decimals : 0,
                r = Math.random();
            return Number(((t.max - t.min) * r + t.min).toFixed(e))
        }, RGraph.noShadow = function() {
            var t = RGraph.getArgs(arguments, "object");
            t.object.context.shadowColor = "rgba(0,0,0,0)", t.object.context.shadowBlur = 0, t.object.context.shadowOffsetx = 0, t.object.context.shadowOffsety = 0
        }, RGraph.Registry.get = function() {
            var t = RGraph.getArgs(arguments, "name");
            return t.name = t.name.replace(/([A-Z])/g, function(t) {}), RGraph.Registry.store[t.name]
        }, RGraph.isArray = function() {
            var t = RGraph.getArgs(arguments, "object");
            if (t.object && t.object.constructor) {
                var e = t.object.constructor.toString().indexOf("Array");
                return null != t.object && "number" == typeof e && e > 0 && 20 > e
            }
        }, RGraph.isNull = function() {
            var t = RGraph.getArgs(arguments, "arg");
            return "object" == typeof t.arg && !t.arg
        }, RGraph.Effects.updateCanvas = function() {
            var t = RGraph.getArgs(arguments, "func");
            window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || function(t) {}, window.requestAnimationFrame(t.func)
        }, RGraph.stringsToNumbers = function() {
            var t = RGraph.getArgs(arguments, "string,separator"),
                e = t.separator || ",";
            return "number" == typeof t.string ? t.string : ("string" == typeof t.string && (-1 != t.string.indexOf(e) ? t.string = t.string.split(e) : t.string = parseFloat(t.string)), "object" == typeof t.string && !RGraph.isNull(t.string), t.string)
        }, RGraph.parseObjectStyleConfig = function() {
            var t = RGraph.getArgs(arguments, "object,config");
            for (var e in t.config) "string" == typeof e && t.object.set(e, t.config[e])
        }, RGraph.getTextConf = function(t) {
            var e = t.object.properties,
                r = t.prefix;
            return {
                font: "string" == typeof e[r + "Font"] ? e[r + "Font"] : e.textFont,
                size: "number" == typeof e[r + "Size"] ? e[r + "Size"] : e.textSize,
                color: "string" == typeof e[r + "Color"] ? e[r + "Color"] : e.textColor,
                bold: RGraph.isNull(e[r + "Bold"]) ? e.textBold : e[r + "Bold"],
                italic: RGraph.isNull(e[r + "Italic"]) ? e.textItalic : e[r + "Italic"]
            }
        }, RGraph.isString = function(t) {}, RGraph.isNumber = function(t) {}, RGraph.isObject = function(t) {}, RGraph.isFunction = function(t) {}, RGraph.isUndefined = function(t) {}
    }((window, document)), RGraph = window.RGraph || {}, window, document, RGraph.Sheets = function() {
        var t = RGraph.getArgs(arguments, "key,worksheet,callback");
        2 === arguments.length && (t.callback = arguments[1], t.worksheet = null);
        var e, r = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            a = t.key,
            n = (3 === arguments.length ? (e = Number(t.worksheet), t.callback) : (e = 1, t.worksheet), RGraph.random(0, 999999999)),
            i = ("https://spreadsheets.google.com/feeds/cells/[KEY]/[WORKSHEET]/public/full?alt=json-in-script&callback=__rgraph_JSONPCallback" + n).replace(/\[KEY\]/, a).replace(/\[WORKSHEET\]/, e);
        this.load = function(t, e) {
            var r = this;
            window["__rgraph_JSONPCallback" + n] = function(t) {
                r.json = t;
                for (var a = [], n = 0, i = 0, s = 0; s < t.feed.entry.length; ++s) n = t.feed.entry[s].gs$cell.row - 1, i = t.feed.entry[s].gs$cell.col - 1, a[n] || (a[n] = []), a[n][i] = t.feed.entry[s].content.$t;
                for (var o = 0, s = 0; s < a.length; ++s) o = a[s] ? Math.max(o, a[s].length) : o;
                for (s = 0; s < a.length; ++s) {
                    void 0 === a[s] && (a[s] = new Array(o));
                    for (var l = 0; o > l; l++) void 0 === a[s][l] && (a[s][l] = ""), a[s][l].match(/^[0-9]+$/) ? a[s][l] = parseInt(a[s][l]) : a[s][l].match(/^[0-9.]+$/) && (a[s][l] = parseFloat(a[s][l]))
                }
                r.data = a, e(r)
            };
            var a = document.createElement("script");
            a.src = t, document.body.appendChild(a)
        }, this.col = function(t, e) {
            var r = {},
                a = [];
            e = e || 1, arguments && "object" == typeof arguments[2] && "boolean" == typeof arguments[2].trim ? r.trim = arguments[2].trim : r.trim = !0;
            for (var n = 0; n < this.data.length; ++n) a.push(this.data[n][t - 1]);
            return r.trim && (a = RGraph.Sheets.arrayRTrim(a)), a = a.slice(e - 1)
        }, this.get = function(t) {
            if ((t = t.toUpperCase()).match(/^\s*([a-z]+)\s*$/i) && 1 === (t = RegExp.$1).length) {
                var e = r.indexOf(t) + 1;
                return this.col(e, 1, arguments[1])
            }
            if (t.match(/^\s*[0-9]+\s*$/i)) return this.row(t, null, arguments[1]);
            if (t.match(/^\s*([a-z]{1,2})([0-9]+)\s*$/i)) {
                var a = RegExp.$1,
                    n = RegExp.$2;
                return this.get(a, {
                    trim: !1
                })[n - 1]
            }
        }, this.load(i, t.callback)
    }, RGraph = window.RGraph || {}, RGraph.Meter = function(t) {
        var e = t.id,
            r = document.getElementById(e),
            a = t.min,
            n = t.max,
            i = t.value;
        this.id = e, this.canvas = r, this.context = this.canvas.getContext ? this.canvas.getContext("2d", {
            alpha: "object" != typeof e || !1 !== e.alpha
        }) : null, (this.canvas.__object__ = this).type = "meter", this.min = RGraph.stringsToNumbers(a), this.max = RGraph.stringsToNumbers(n), this.value = RGraph.stringsToNumbers(i), this.centerx = null, this.centery = null, this.radius = null, this.isRGraph = !0, this.isrgraph = !0, this.rgraph = !0, this.currentValue = null, this.uid = RGraph.createUID(), this.canvas.uid = this.canvas.uid ? this.canvas.uid : RGraph.createUID(), this.colorsParsed = !1, this.coordsText = [], this.original_colors = [], this.firstDraw = !0, this.properties = {
            backgroundImageUrl: null,
            backgroundImageOffsetx: 0,
            backgroundImageOffsety: 0,
            backgroundImageStretch: !0,
            backgroundColor: "white",
            marginLeft: 35,
            marginRight: 35,
            marginTop: 35,
            marginBottom: 35,
            linewidth: 1,
            linewidthSegments: 0,
            colorsStroke: null,
            border: !0,
            borderColor: "black",
            textFont: "Arial, Verdana, sans-serif",
            textSize: 12,
            textColor: "black",
            textBold: !1,
            textItalic: !1,
            textValign: "center",
            textAccessible: !1,
            textAccessibleOverflow: "visible",
            textAccessiblePointerevents: !1,
            labels: !0,
            labelsCount: 10,
            labelsSpecific: null,
            labelsRadiusOffset: 0,
            labelsFont: null,
            labelsSize: null,
            labelsColor: null,
            labelsBold: null,
            labelsItalic: null,
            labelsValueText: !1,
            labelsValueTextFont: null,
            labelsValueTextSize: null,
            labelsValueTextBold: null,
            labelsValueTextItalic: null,
            labelsValueTextColor: null,
            labelsValueTextDecimals: 0,
            labelsValueTextUnitsPre: "",
            labelsValueTextUnitsPost: "",
            labelsValueTextBackground: !0,
            labelsValueTextBackgroundFill: "rgba(255,255,255,0.75)",
            labelsValueTextBackgroundStroke: "rgba(0,0,0,0)",
            labelsValueTextSpecific: null,
            labelsValueTextAccessible: !0,
            title: "",
            titleBackground: null,
            titleHpos: null,
            titleVpos: null,
            titleColor: null,
            titleBold: null,
            titleFont: null,
            titleItalic: null,
            titleSize: null,
            titleX: null,
            titleY: null,
            titleHalign: null,
            titleValign: null,
            colorsGreenStart: .35 * (this.max - this.min) + this.min,
            colorsGreenEnd: this.max,
            colorsGreenColor: "#207A20",
            colorsYellowStart: .1 * (this.max - this.min) + this.min,
            colorsYellowEnd: .35 * (this.max - this.min) + this.min,
            colorsYellowColor: "#D0AC41",
            colorsRedStart: this.min,
            colorsRedEnd: .1 * (this.max - this.min) + this.min,
            colorsRedColor: "#9E1E1E",
            colorsRanges: null,
            contextmenu: null,
            annotatable: !1,
            annotatableColor: "black",
            shadow: !1,
            shadowColor: "rgba(0,0,0,0.5)",
            shadowBlur: 3,
            shadowOffsetx: 3,
            shadowOffsety: 3,
            resizable: !1,
            resizableHandleAdjust: [0, 0],
            resizableHandleBackground: null,
            tickmarksSmallCount: 100,
            tickmarksSmallColor: "#bbb",
            tickmarksLargeCount: 10,
            tickmarksLargeColor: "black",
            scaleUnitsPre: "",
            scaleUnitsPost: "",
            scaleDecimals: 0,
            scalePoint: ".",
            scaleThousand: ",",
            radius: null,
            centerx: null,
            centery: null,
            segmentsRadiusStart: 0,
            needleRadius: null,
            needleType: "normal",
            needleTail: !1,
            needleHead: !0,
            needleHeadLength: 30,
            needleHeadWidth: .088,
            needleColor: "black",
            needleImageUrl: null,
            needleImageOffsetx: 0,
            needleImageOffsety: 0,
            adjustable: !1,
            anglesStart: RGraph.PI,
            anglesEnd: RGraph.TWOPI,
            centerpinStroke: "black",
            centerpinFill: "white",
            clearto: "rgba(0,0,0,0)"
        };
        var s = this.properties;
        this.path = RGraph.pathObjectFunction, this.responsive = RGraph.responsive, this.set = function(t) {
            var e = void 0 === arguments[1] ? null : arguments[1];
            return 1 !== arguments.length || "object" != typeof t ? (s[t] = e, this) : void 0
        }, this.get = function(t) {
            return s[t]
        }, this.draw = function() {
            return RGraph.fireCustomEvent(this, "onbeforedraw"), this.canvas.__rgraph_aa_translated__ || (this.context.translate(.5, .5), this.canvas.__rgraph_aa_translated__ = !0), this.value > this.max && (this.value = this.max), this.value < this.min && (this.value = this.min), this.currentValue = this.value, this.marginLeft = s.marginLeft, this.marginRight = s.marginRight, this.marginTop = s.marginTop, this.marginBottom = s.marginBottom, this.centerx = (this.canvas.width - this.marginLeft - this.marginRight) / 2 + this.marginLeft, this.centery = this.canvas.height - this.marginBottom, this.radius = Math.min((this.canvas.width - this.marginLeft - this.marginRight) / 2, this.canvas.height - this.marginTop - this.marginBottom), this.coordsText = [], "number" == typeof s.centerx && (this.centerx = s.centerx), "number" == typeof s.centery && (this.centery = s.centery), "number" == typeof s.radius && (this.radius = s.radius), this.colorsParsed || (this.parseColors(), this.colorsParsed = !0), this.drawBackground(), this.drawLabels(), this.drawNeedle(), this.drawReadout(), RGraph.drawTitle(this, s.title, this.marginTop, null, "boolean" == typeof s.titleSize ? s.titleSize : s.textSize), RGraph.installEventListeners(this), this.firstDraw && (this.firstDraw = !1, RGraph.fireCustomEvent(this, "onfirstdraw"), this.firstDrawFunc()), RGraph.fireCustomEvent(this, "ondraw"), this
        }, this.drawBackground = function() {
            if (this.context.beginPath(), this.context.fillStyle = s.backgroundColor, this.context.moveTo(this.centerx, this.centery), this.context.arc(this.centerx, this.centery, this.radius, s.anglesStart, s.anglesEnd, !1), this.context.fill(), RGraph.noShadow(this), s.tickmarksSmallCount) {
                for (var t = 0; t < s.anglesEnd - s.anglesStart; t += RGraph.PI / s.tickmarksSmallCount) this.context.beginPath(), this.context.strokeStyle = s.tickmarksSmallColor, this.context.arc(this.centerx, this.centery, this.radius, s.anglesStart + t, s.anglesStart + t + 1e-5, 0), this.context.arc(this.centerx, this.centery, this.radius - 5, s.anglesStart + t, s.anglesStart + t + 1e-5, 0), this.context.stroke();
                this.context.beginPath(), this.context.fillStyle = s.backgroundColor, this.context.arc(this.centerx, this.centery, this.radius - 4, s.anglesStart, s.anglesEnd, !1), this.context.closePath(), this.context.fill()
            }
            if (s.tickmarksLargeCount)
                for (var e = ["white", "white", s.tickmarksLargeColor], r = 0; r < e.length; ++r)
                    for (t = 0; t < s.anglesEnd - s.anglesStart; t += (s.anglesEnd - s.anglesStart) / s.tickmarksLargeCount) this.context.beginPath(), this.context.strokeStyle = e[r], this.context.arc(this.centerx, this.centery, this.radius, s.anglesStart + t, s.anglesStart + t + .001, 0), this.context.arc(this.centerx, this.centery, this.radius - 5, s.anglesStart + t, s.anglesStart + t + 1e-4, 0), this.context.stroke();
            this.context.beginPath(), this.context.fillStyle = s.backgroundColor, this.context.moveTo(this.centerx, this.centery), this.context.arc(this.centerx, this.centery, this.radius - 7, s.anglesStart, s.anglesEnd, !1), this.context.closePath(), this.context.fill();
            var a = s.colorsRanges;
            if (RGraph.isArray(s.colorsRanges)) {
                for (a = s.colorsRanges, t = 0; t < a.length; ++t) this.context.strokeStyle = s.colorsStroke ? s.colorsStroke : a[t][2], this.context.fillStyle = a[t][2], this.context.lineWidth = s.linewidthSegments, this.context.beginPath(), this.context.arc(this.centerx, this.centery, .85 * this.radius, (a[t][0] - this.min) / (this.max - this.min) * (s.anglesEnd - s.anglesStart) + s.anglesStart, (a[t][1] - this.min) / (this.max - this.min) * (s.anglesEnd - s.anglesStart) + s.anglesStart, !1), 0 < s.segmentsRadiusStart ? this.context.arc(this.centerx, this.centery, s.segmentsRadiusStart, (a[t][1] - this.min) / (this.max - this.min) * (s.anglesEnd - s.anglesStart) + s.anglesStart, (a[t][0] - this.min) / (this.max - this.min) * (s.anglesEnd - s.anglesStart) + s.anglesStart, !0) : this.context.lineTo(this.centerx, this.centery), this.context.closePath(), this.context.stroke(), this.context.fill();
                this.context.beginPath()
            } else this.context.lineWidth = s.linewidth, this.context.lineWidth = 1;
            this.context.stroke(), this.context.lineWidth = 1
        }, this.drawNeedle = function() {
            var t, e = (this.value - this.min) / (this.max - this.min) * (s.anglesEnd - s.anglesStart) + s.anglesStart,
                r = "number" == typeof s.needleRadius ? s.needleRadius : .7 * this.radius;
            "pointer" === s.needleType && (t = 40 < .06 * this.radius ? 40 : .06 * this.radius, this.context.beginPath(), this.context.fillStyle = s.needleColor, this.context.moveTo(this.centerx, this.centery), this.context.arc(this.centerx, this.centery, t, 0, RGraph.TWOPI, !1), this.context.fill(), this.context.beginPath(), this.context.arc(this.centerx, this.centery, t, e + RGraph.HALFPI, e + RGraph.HALFPI + 1e-4, !1), this.context.arc(this.centerx, this.centery, r, e, e + .001, !1), this.context.arc(this.centerx, this.centery, t, e - RGraph.HALFPI, e - RGraph.HALFPI + .001, !1), this.context.fill())
        }, this.drawLabels = function() {
            if (s.labels) {
                this.radius, s.textItalic;
                var t = s.scaleUnitsPost,
                    e = s.scaleUnitsPre,
                    r = s.scalePoint,
                    a = s.scaleThousand,
                    n = this.centerx,
                    i = this.centery,
                    o = (this.min, this.max, s.scaleDecimals),
                    l = s.labelsCount,
                    h = (s.labelsRadiusOffset, s.labelsSpecific, RGraph.getTextConf({
                        object: this,
                        prefix: "labels"
                    }));
                this.context.fillStyle = s.textColor, this.context.lineWidth = 1, this.context.beginPath();
                for (var c = 0; l >= c; ++c) {
                    var g = (s.anglesEnd - s.anglesStart) * (c / l) + s.anglesStart,
                        u = RGraph.getRadiusEndPoint(n, i, g + (0 != c && c != l || !s.border ? 0 : 0 == c ? .05 : -.05), .925 * this.radius - ("bottom" === s.textValign ? 15 : 0) + s.labelsRadiusOffset),
                        p = s.anglesStart,
                        d = s.anglesEnd,
                        f = d - p,
                        b = p * (180 / RGraph.PI),
                        m = (RGraph.PI, f * (180 / RGraph.PI));
                    valign = s.textValign, halign = s.border ? 0 == c ? "left" : c == l ? "right" : "center" : "center";
                    var R = (this.max - this.min) * (c / l) + this.min;
                    RGraph.text({
                        object: this,
                        font: h.font,
                        size: h.size,
                        color: h.color,
                        bold: h.bold,
                        italic: h.italic,
                        x: u[0],
                        y: u[1],
                        text: RGraph.numberFormat({
                            object: this,
                            number: R.toFixed(0 === R ? 0 : o),
                            unitspre: e,
                            unitspost: t,
                            point: r,
                            thousand: a
                        }),
                        halign: halign,
                        valign: valign,
                        angle: 1 / l * m * c + b - 270,
                        bounding: !1,
                        boundingFill: 0 == c || c == l ? "white" : null,
                        tag: "scale"
                    })
                }
            }
        }, this.drawReadout = function() {
            s.labelsValueText
        }, this.getShape = function(t) {}, this.getValue = function(t) {}, this.parseColors = function() {
            0 === this.original_colors.length && (this.original_colors.colorsGreenColor = RGraph.arrayClone(s.colorsGreenColor), this.original_colors.colorsYellowColor = RGraph.arrayClone(s.colorsYellowColor), this.original_colors.colorsRedColor = RGraph.arrayClone(s.colorsRedColor), this.original_colorsColorsRanges = RGraph.arrayClone(s.colorsRanges)), s.colorsGreenColor = this.parseSingleColorForGradient(s.colorsGreenColor), s.colorsYellowColor = this.parseSingleColorForGradient(s.colorsYellowColor), s.colorsRedColor = this.parseSingleColorForGradient(s.colorsRedColor);
            var t = s.colorsRanges;
            if (t && t.length)
                for (var e = 0; e < t.length; ++e) t[e][2] = this.parseSingleColorForGradient(t[e][2])
        }, this.reset = function() {}, this.parseSingleColorForGradient = function(t) {
            if (!t || "string" != typeof t) return t;
            if (t.match(/^gradient\((.*)\)$/i))
                for (var e = RegExp.$1.split(":"), r = this.context.createRadialGradient(this.centerx, this.centery, s.segmentsRadiusStart, this.centerx, this.centery, .85 * this.radius), a = 1 / (e.length - 1), n = 0; n < e.length; ++n) r.addColorStop(n * a, RGraph.trim(e[n]));
            return r || t
        }, this.firstDrawFunc = function() {}, this.grow = function() {
            var t = this;
            t.currentValue = t.currentValue || t.min;
            var e = (arguments[0] || {}).frames || 30,
                r = 0,
                a = (t.value - t.currentValue) / e,
                n = arguments[1] || function() {},
                i = t.currentValue;
            return function s() {
                t.value = i + r++ * a, RGraph.clear(t.canvas), RGraph.redrawCanvas(t.canvas), e >= r ? RGraph.Effects.updateCanvas(s) : n(t)
            }(), this
        }, RGraph.register(this), RGraph.parseObjectStyleConfig(this, t.options)
    };
