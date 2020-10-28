// RGraph common core version: 2020-10-03

window.RGraph = window.RGraph || {
		isrgraph: !0,
		isRGraph: !0,
		rgraph: !0
	},
	function() {
		var t = navigator.userAgent;
		RGraph.Highlight = {},
			RGraph.Registry = {},
			RGraph.Registry.store = [],
			RGraph.Registry.store["event.handlers"] = [],
			RGraph.Registry.store.__rgraph_event_listeners__ = [],
			RGraph.Background = {},
			RGraph.background = {},
			RGraph.objects = [],
			RGraph.Resizing = {},
			RGraph.events = [],
			RGraph.cursor = [],
			RGraph.Effects = RGraph.Effects || {},
			RGraph.cache = [],
			RGraph.ObjectRegistry = {},
			RGraph.ObjectRegistry.objects = {},
			RGraph.ObjectRegistry.objects.byUID = [],
			RGraph.ObjectRegistry.objects.byCanvasID = [],
			RGraph.OR = RGraph.ObjectRegistry,
			RGraph.PI = Math.PI,
			RGraph.HALFPI = RGraph.PI / 2,
			RGraph.TWOPI = 2 * RGraph.PI,
			RGraph.ISFF = -1 != t.indexOf("Firefox"),
			RGraph.ISOPERA = -1 != t.indexOf("Opera"),
			RGraph.ISCHROME = -1 != t.indexOf("Chrome"),
			RGraph.ISSAFARI = -1 != t.indexOf("Safari") && !RGraph.ISCHROME,
			RGraph.ISWEBKIT = -1 != t.indexOf("WebKit"),
			RGraph.ISIE = 0 < t.indexOf("Trident") || 0 < navigator.userAgent.indexOf("MSIE"),
			RGraph.ISIE6 = 0 < t.indexOf("MSIE 6"),
			RGraph.ISIE7 = 0 < t.indexOf("MSIE 7"),
			RGraph.ISIE8 = 0 < t.indexOf("MSIE 8"),
			RGraph.ISIE9 = 0 < t.indexOf("MSIE 9"),
			RGraph.ISIE10 = 0 < t.indexOf("MSIE 10"),
			RGraph.ISOLD = RGraph.ISIE6 || RGraph.ISIE7 || RGraph.ISIE8,
			RGraph.ISIE11UP = -1 == t.indexOf("MSIE") && 0 < t.indexOf("Trident"),
			RGraph.ISIE10UP = RGraph.ISIE10 || RGraph.ISIE11UP,
			RGraph.ISIE9UP = RGraph.ISIE9 || RGraph.ISIE10UP,
			RGraph.MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			RGraph.MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			RGraph.DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			RGraph.DAYS_LONG = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			RGraph.getArgs = function(t, e) {
				var r = {},
					o = 0;
				if (e = e.trim().split(/ *, */),
					t && t[0] && 1 === t.length && void 0 !== t[0][e[0]]) {
					for (var a = 0; a < e.length; ++a)
						void 0 === t[0][e[a]] && (t[0][e[a]] = null);
					return t[0]
				}
				for (var a in e)
					r[e[a]] = void 0 === t[o] ? null : t[o],
					o += 1;
				return r
			},
			RGraph.arrayClone = function() {
				var t = RGraph.getArgs(arguments, "array");
				if (null === t.array || "object" != typeof t.array)
					return t.array;
				var e, r, o = RGraph.isArray(t.array) ? [] : {};
				for (var a in t.array)
					"string" != typeof a && "number" != typeof a || ("number" == typeof t.array[a] ? o[a] = (r = t.array[a],
						Number(r)) : "string" == typeof t.array[a] ? o[a] = (e = t.array[a],
						String(e)) : "function" == typeof t.array[a] ? o[a] = t.array[a] : o[a] = RGraph.arrayClone(t.array[a]));
				return o
			},
			RGraph.clear = RGraph.Clear = function(t) {
				var e, r = (t = RGraph.getArgs(arguments, "canvas,color")).canvas.__object__,
					o = t.canvas.getContext("2d"),
					a = t.color || r && r.get("clearto");
				if (t.canvas) {
					if (RGraph.fireCustomEvent(r, "onbeforeclear"),
						RGraph.text.domNodeCache && RGraph.text.domNodeCache[t.canvas.id])
						for (var n in RGraph.text.domNodeCache[t.canvas.id]) {
							var i = RGraph.text.domNodeCache[t.canvas.id][n];
							i && i.style && (i.style.display = "none")
						}!a || a && "rgba(0,0,0,0)" === a || "transparent" === a ? (o.clearRect(-100, -100, t.canvas.width + 200, t.canvas.height + 200),
							o.globalCompositeOperation = "source-over") : a ? r.path("fs % fr -100 -100 % %", a, t.canvas.width + 200, t.canvas.height + 200) : r.path("fs % fr -100 -100 % %", r.get("clearto"), t.canvas.width + 200, t.canvas.height + 200),
						RGraph.Registry.get("background.image." + t.canvas.id) && ((e = RGraph.Registry.get("background.image." + t.canvas.id)).style.position = "absolute",
							e.style.left = "-10000px",
							e.style.top = "-10000px"),
						RGraph.Registry.get("tooltip") && r && !r.get("tooltipsNohideonclear") && RGraph.hideTooltip(t.canvas),
						t.canvas.style.cursor = "default",
						RGraph.fireCustomEvent(r, "onclear")
				}
			},
			RGraph.drawTitle = function() {
				var t, e, r = RGraph.getArgs(arguments, "object,text,marginTop,centerx"),
					o = r.object.canvas,
					a = r.object.context,
					n = r.object.properties,
					i = n.marginLeft,
					s = n.marginRight,
					l = r.marginTop,
					p = n.marginBottom,
					c = r.centerx ? r.centerx : (o.width - i - s) / 2 + i,
					h = n.keyPosition,
					d = n.titleVpos,
					g = n.titleHpos,
					f = n.titleBackground,
					u = n.titleX,
					b = n.titleY,
					y = "center",
					R = "center",
					x = RGraph.getTextConf({
						object: r.object,
						prefix: "title"
					}),
					m = x.size,
					G = x.bold;
				x.italic;
				RGraph.isNull(G) && (G = x.bold = !0),
					"bar" == r.object.type && "3d" == n.variant && (h = "margin"),
					a.beginPath(),
					a.fillStyle = x.color ? x.color : "black",
					R = (!h || "margin" == h) && h ? "bottom" : "center",
					"number" == typeof n.titleVpos ? (d = n.titleVpos * l,
						"top" === n.xaxisPosition && (d = n.titleVpos * p + l + (o.height - l - p))) : (d = l - m - 5,
						"top" === n.xaxisPosition && (d = o.height - p + m + 5)),
					"number" == typeof g && (c = g * o.width),
					"number" == typeof u && (c = u),
					"number" == typeof b && (d = b),
					"string" == typeof u && (c += parseFloat(u)),
					"string" == typeof b && (d += parseFloat(b)),
					"string" == typeof n.titleHalign && (y = n.titleHalign),
					"string" == typeof n.titleValign && (R = n.titleValign),
					null !== typeof x.color && (t = a.fillStyle,
						e = x.color,
						a.fillStyle = e || "black");
				RGraph.text({
					object: r.object,
					font: x.font,
					size: x.size,
					color: x.color,
					bold: x.bold,
					italic: x.italic,
					x: c,
					y: d,
					text: r.text,
					valign: R,
					halign: y,
					bounding: null != f,
					"bounding.fill": f,
					tag: "title",
					marker: !1
				});
				a.fillStyle = t
			},
			RGraph.register = function() {
				var t = RGraph.getArgs(arguments, "object");
				t.object.get("noregister") || !1 === t.object.get("register") || (RGraph.ObjectRegistry.add(t.object),
					t.object.set("register", !1))
			},
			RGraph.redrawCanvas = function() {
				var t = RGraph.getArgs(arguments, "canvas,clear,color"),
					e = RGraph.ObjectRegistry.getObjectsByCanvasID(t.canvas.id);
				(RGraph.isNull(t.clear) || "boolean" == typeof t.clear && !1 !== t.clear) && (t.color || t.canvas.__object__.get("clearto"),
					RGraph.clear(t.canvas, t.color));
				for (var r = 0, o = e.length; r < o; ++r)
					e[r] && e[r] && e[r].isrgraph && e[r].draw()
			},
			RGraph.numberFormat = function(t) {
				var e, r, o, a = t.unitspre ? String(t.unitspre) : "",
					n = t.unitspost ? String(t.unitspost) : "",
					i = "",
					s = "",
					l = "string" == typeof t.point ? t.point : ".",
					p = "string" == typeof t.thousand ? t.thousand : ",";
				if (RegExp.$1 = "",
					"function" == typeof t.formatter)
					return t.formatter(t);
				if (0 < String(t.number).indexOf("e"))
					return String(a + String(t.number) + n);
				t.number = String(t.number),
					0 < t.number.indexOf(".") && (o = t.number,
						t.number = t.number.replace(/\.(.*)/, ""),
						s = o.replace(/(.*)\.(.*)/, "$2"));
				var c = p;
				for (e = t.number.length - 1,
					r = 0; 0 <= e; r++,
					e--) {
					r % 3 == 0 && 0 != r && (i += c),
						i += t.number.charAt(e)
				}
				var h = i,
					i = "";
				for (e = h.length - 1; 0 <= e; e--)
					i += h.charAt(e);
				return 0 == i.indexOf("-" + t.thousand) && (i = "-" + i.substr(("-" + t.thousand).length)),
					s.length && (i = i + l + s,
						s = "",
						RegExp.$1 = ""),
					"-" == i.charAt(0) && (i = i.replace(/-/, ""),
						a = "-" + a),
					a + (i = i.replace(/^,+/, "")) + n
			},
			RGraph.fireCustomEvent = function() {
				var t = RGraph.getArgs(arguments, "object,name");
				if ("on" !== t.name.substr(0, 2) && (t.name = "on" + t.name),
					t.object && t.object.isrgraph) {
					t.object[t.name] && t.object[t.name](t.object);
					var e = t.object.uid;
					if ("string" == typeof e && "object" == typeof RGraph.events && "object" == typeof RGraph.events[e] && 0 < RGraph.events[e].length)
						for (var r = 0; r < RGraph.events[e].length; ++r)
							RGraph.events[e][r] && RGraph.events[e][r][1] === t.name && RGraph.events[e][r][2](t.object)
				}
			},
			RGraph.hasTooltips = function() {
				var t = RGraph.getArgs(arguments, "object"),
					e = t.object.properties;
				if ("object" == typeof e.tooltips && e.tooltips) {
					for (var r = 0, o = e.tooltips.length; r < o; ++r)
						if (!RGraph.isNull(t.object.get("tooltips")[r]))
							return !0
				} else if ("function" == typeof e.tooltips)
					return !0;
				return !1
			},
			RGraph.createUID = function() {
				return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
					var e = 16 * Math.random() | 0;
					return ("x" == t ? e : 3 & e | 8).toString(16)
				})
			},
			RGraph.ObjectRegistry.add = function() {
				var t = RGraph.getArgs(arguments, "object"),
					e = t.object.uid,
					r = t.object.canvas.id;
				RGraph.ObjectRegistry.objects.byUID[RGraph.ObjectRegistry.objects.byUID.length] = [e, t.object],
					RGraph.ObjectRegistry.objects.byCanvasID.push([r, t.object])
			},
			RGraph.ObjectRegistry.getObjectsByCanvasID = function() {
				for (var t = RGraph.getArgs(arguments, "id"), e = RGraph.ObjectRegistry.objects.byCanvasID, r = [], o = 0, a = e.length; o < a; ++o)
					e[o] && e[o][0] == t.id && r.push(e[o][1]);
				return r
			},
			RGraph.getRadiusEndPoint = function() {
				var t = RGraph.getArgs(arguments, "cx,cy,angle,radius");
				return [t.cx + Math.cos(t.angle) * t.radius, t.cy + Math.sin(t.angle) * t.radius]
			},
			RGraph.installEventListeners = function() {
				var t = RGraph.getArgs(arguments, "object"),
					e = t.object.properties;
				RGraph.installCanvasClickListener ? (RGraph.installWindowMousedownListener(t.object),
					RGraph.installWindowMouseupListener(t.object),
					RGraph.installCanvasMousemoveListener(t.object),
					RGraph.installCanvasMouseupListener(t.object),
					RGraph.installCanvasMousedownListener(t.object),
					RGraph.installCanvasClickListener(t.object)) : (RGraph.hasTooltips(t.object) || e.adjustable || e.annotatable || e.contextmenu || e.keyInteractive || "function" == typeof t.object.onclick || "function" == typeof t.object.onmousemove || "function" == typeof t.object.onmouseout || "function" == typeof t.object.onmouseover) && alert("[RGRAPH] You appear to have used dynamic features but not included the file: RGraph.common.dynamic.js")
			},
			RGraph.text = function(h) {
				var d, t, g, e;
				for (var f in h && arguments[1] && "string" == typeof arguments[1].text ? (g = h,
							h = arguments[1]) : g = h.object,
						RGraph.text.defaults)
					"string" == typeof f && void 0 === h[f] && (h[f] = RGraph.text.defaults[f]);

				function r() {
					-1 !== String(h.size).toLowerCase().indexOf("italic") && (h.size = h.size.replace(/ *italic +/, ""),
						h.italic = !0);
					var t, e = Math.abs(parseInt(h.x)) + "_" + Math.abs(parseInt(h.y)) + "_" + String(h.text).replace(/[^a-zA-Z0-9]+/g, "_") + "_" + g.canvas.id;
					g.canvas.rgraph_domtext_wrapper ? t = g.canvas.rgraph_domtext_wrapper : ((t = document.createElement("div")).id = g.canvas.id + "_rgraph_domtext_wrapper",
						t.className = "rgraph_domtext_wrapper",
						t.style.overflow = 0 != g.properties.textAccessibleOverflow && "hidden" != g.properties.textAccessibleOverflow ? "visible" : "hidden",
						t.style.width = g.canvas.offsetWidth + "px",
						t.style.height = g.canvas.offsetHeight + "px",
						t.style.cssFloat = g.canvas.style.cssFloat,
						t.style.display = g.canvas.style.display || "inline-block",
						t.style.position = g.canvas.style.position || "relative",
						t.style.left = g.canvas.style.left,
						t.style.right = g.canvas.style.right,
						t.style.top = g.canvas.style.top,
						t.style.bottom = g.canvas.style.bottom,
						t.style.width = g.canvas.width + "px",
						t.style.height = g.canvas.height + "px",
						t.style.lineHeight = "initial",
						g.canvas.style.position = "absolute",
						g.canvas.style.left = 0,
						g.canvas.style.top = 0,
						g.canvas.style.display = "inline",
						g.canvas.style.cssFloat = "none",
						"bar" !== g.type && "bipolar" !== g.type && "hbar" !== g.type || "3d" !== g.properties.variant || (t.style.transform = "skewY(5.7deg)"),
						g.canvas.parentNode.insertBefore(t, g.canvas),
						g.canvas.parentNode.removeChild(g.canvas),
						t.appendChild(g.canvas),
						g.canvas.rgraph_domtext_wrapper = t);
					var r, o, a, n, i, s, l, p = {
						size: 12,
						font: "Arial",
						italic: "normal",
						bold: "normal",
						valign: "bottom",
						halign: "left",
						marker: !0,
						color: d.fillStyle,
						bounding: {
							enabled: !1,
							fill: "rgba(255,255,255,0.7)",
							stroke: "#666",
							linewidth: 1
						}
					};
					h.text = String(h.text).replace(/\r?\n/g, "[[RETURN]]"),
						void 0 === RGraph.text.domNodeCache && (RGraph.text.domNodeCache = new Array),
						void 0 === RGraph.text.domNodeCache[g.id] && (RGraph.text.domNodeCache[g.id] = new Array),
						void 0 === RGraph.text.domNodeDimensionCache && (RGraph.text.domNodeDimensionCache = new Array),
						void 0 === RGraph.text.domNodeDimensionCache[g.id] && (RGraph.text.domNodeDimensionCache[g.id] = new Array),
						RGraph.text.domNodeCache[g.id] && RGraph.text.domNodeCache[g.id][e] ? ((r = RGraph.text.domNodeCache[g.id][e]).style.display = "inline",
							n = RGraph.text.domNodeDimensionCache[g.id][e].width,
							i = RGraph.text.domNodeDimensionCache[g.id][e].height,
							s = RGraph.text.domNodeDimensionCache[g.id][e].top,
							l = RGraph.text.domNodeDimensionCache[g.id][e].left) : ((r = document.createElement("span")).style.position = "absolute",
							r.style.display = "inline",
							r.className = " rgraph_accessible_text rgraph_accessible_text_" + g.id + " rgraph_accessible_text_" + (h.tag || "").replace(/\./, "_") + " rgraph_accessible_text_" + g.type,
							r.style.left = h.x * (parseInt(g.canvas.offsetWidth) / parseInt(g.canvas.width)) + "px",
							r.style.top = h.y * (parseInt(g.canvas.offsetHeight) / parseInt(g.canvas.height)) + "px",
							r.style.color = h.color || p.color,
							r.style.fontFamily = h.font || p.font,
							r.style.fontWeight = h.bold ? "bold" : p.bold,
							r.style.fontStyle = h.italic ? "italic" : p.italic,
							r.style.fontSize = (h.size || p.size) + "pt",
							r.style.whiteSpace = "nowrap",
							r.style.lineHeight = RGraph.ISIE ? "normal" : "initial",
							r.tag = h.tag,
							"number" == typeof h.angle && 0 !== h.angle && (RGraph.measureText(h.text, h.bold, h.font, h.size),
								o = "center" === h.halign ? "50%" : "right" === h.halign ? "100%" : "0%",
								a = "center" === h.valign ? "50%" : "top" === h.valign ? "0%" : "100%",
								r.style.transformOrigin = "{1} {2}".format(o, a),
								r.style.transform = "rotate(" + h.angle + "deg)"),
							r.style.textShadow = "{1}px {2}px {3}px {4}".format(d.shadowOffsetX, d.shadowOffsetY, d.shadowBlur, d.shadowColor),
							h.bounding && (r.style.border = "1px solid " + (h["bounding.stroke"] || p.bounding.stroke),
								r.style.backgroundColor = h["bounding.fill"] || p.bounding.fill,
								r.style.borderWidth = "number" == typeof h["bounding.linewidth"] ? h["bounding.linewidth"] : p.bounding.linewidth),
							void 0 !== g.properties.textAccessiblePointerevents && !g.properties.textAccessiblePointerevents || "none" === g.properties.textAccessiblePointerevents ? r.style.pointerEvents = "none" : r.style.pointerEvents = "auto",
							r.style.padding = h.bounding ? "2px" : null,
							r.__text__ = h.text,
							r.insertAdjacentHTML("afterbegin", h.text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace(/\[\[RETURN\]\]/g, "<br />")),
							t.appendChild(r),
							h.halign = h.halign || "left",
							h.valign = h.valign || "bottom",
							"right" === h.halign ? (r.style.left = parseFloat(r.style.left) - r.offsetWidth + "px",
								r.style.textAlign = "right") : "center" === h.halign && (r.style.left = parseFloat(r.style.left) - r.offsetWidth / 2 + "px",
								r.style.textAlign = "center"),
							"top" === h.valign || ("center" === h.valign ? r.style.top = parseFloat(r.style.top) - r.offsetHeight / 2 + "px" : r.style.top = parseFloat(r.style.top) - r.offsetHeight + "px"),
							n = parseFloat(r.offsetWidth),
							i = parseFloat(r.offsetHeight),
							s = parseFloat(r.style.top),
							l = parseFloat(r.style.left),
							RGraph.text.domNodeCache[g.id][e] = r,
							RGraph.text.domNodeDimensionCache[g.id][e] = {
								left: l,
								top: s,
								width: n,
								height: i
							},
							r.id = e),
						h.marker && g.path("b m % % l % % m % % l % % s", h.x - 5, h.y, h.x + 5, h.y, h.x, h.y - 5, h.x, h.y + 5),
						"drawing.text" === g.type && g.properties.tooltips && r.addEventListener(-1 !== g.properties.tooltipsEvent.indexOf("mousemove") ? "mousemove" : "click", function(t) {
							RGraph.Registry.get("tooltip") && 0 === RGraph.Registry.get("tooltip").__index__ && RGraph.Registry.get("tooltip").__object__.uid == g.uid || (RGraph.hideTooltip(),
								RGraph.redraw(),
								RGraph.tooltip(g, g.properties.tooltips[0], h.x, h.y, 0, t))
						}, !1);
					var c = {};
					return c.x = l,
						c.y = s,
						c.width = n,
						c.height = i,
						c.object = g,
						c.text = h.text,
						c.tag = h.tag,
						RGraph.text.domNodeCache.reset = function() {
							if (arguments[0]) {
								var t;
								t = "string" == typeof arguments[0] ? document.getElementById(arguments[0]) : arguments[0];
								var e = RGraph.text.domNodeCache[t.id];
								for (j in e) {
									var r = RGraph.text.domNodeCache[t.id][j];
									r && r.parentNode && r.parentNode.removeChild(r)
								}
								RGraph.text.domNodeCache[t.id] = [],
									RGraph.text.domNodeDimensionCache[t.id] = []
							} else {
								for (f in RGraph.text.domNodeCache)
									for (j in RGraph.text.domNodeCache[f])
										RGraph.text.domNodeCache[f][j] && RGraph.text.domNodeCache[f][j].parentNode && RGraph.text.domNodeCache[f][j].parentNode.removeChild(RGraph.text.domNodeCache[f][j]);
								RGraph.text.domNodeCache = [],
									RGraph.text.domNodeDimensionCache = []
							}
						},
						RGraph.text.find = function(t) {
							var e, r = [];
							if (t.object && t.object.isrgraph)
								var o = t.object.id;
							else {
								if (!t.id)
									return alert("[RGRAPH] You Must give either an object or an ID to the RGraph.text.find() function"), !1;
								o = "string" == typeof t.id ? t.id : t.object.id;
								t.object = document.getElementById(o).__object__
							}
							for (f in RGraph.text.domNodeCache[o])
								if (e = RGraph.text.domNodeCache[o][f],
									"string" != typeof t.tag || t.tag !== e.tag) {
									if ("object" == typeof t.tag && t.tag.constructor.toString().indexOf("RegExp"))
										if (new RegExp(t.tag).test(e.tag)) {
											r.push(e);
											continue
										}
									if ("string" != typeof t.text || t.text !== e.__text__) {
										if ("object" == typeof t.text && t.text.constructor.toString().indexOf("RegExp"))
											if (new RegExp(t.text).test(e.__text__)) {
												r.push(e);
												continue
											}
									} else
										r.push(e)
								} else
									r.push(e);
							return "function" == typeof t.callback && t.callback({
									nodes: r,
									object: t.object
								}),
								r
						},
						c.node = r,
						g && g.isrgraph && g.coordsText && g.coordsText.push(c),
						c
				}
				if (g && g.isrgraph ? (t = (g = g).canvas,
						d = g.context) : "string" == typeof g ? (d = (t = document.getElementById(g)).getContext("2d"),
						g = t.__object__) : "function" == typeof g.getContext ? (d = (t = g).getContext("2d"),
						g = t.__object__) : (-1 != g.toString().indexOf("CanvasRenderingContext2D") || RGraph.ISIE8 && g.moveTo || RGraph.ISOLD && g.fillText) && (g = (t = (d = g).canvas).__object__),
					"string" == typeof h.boundingFill && (h["bounding.fill"] = h.boundingFill),
					"string" == typeof h.boundingStroke && (h["bounding.stroke"] = h.boundingStroke),
					"number" == typeof h.boundingLinewidth && (h["bounding.linewidth"] = h.boundingLinewidth),
					"string" == typeof h.textConfPrefix && h.textConfPrefix.length && (e = RGraph.getTextConf({
							object: g,
							prefix: h.textConfPrefix
						}),
						h.font = e.font,
						h.size = e.size,
						h.color = e.color,
						h.bold = e.bold,
						h.italic = e.italic),
					void 0 === h.accessible) {
					if (g && g.properties.textAccessible)
						return r()
				} else if ("boolean" == typeof h.accessible && h.accessible)
					return r();
				var o, a = h.x,
					n = h.y,
					i = a,
					s = n,
					l = h.text,
					p = "string" == typeof l ? l.split(/\r?\n/g) : "",
					c = p.length,
					u = h.font ? h.font : "Arial",
					b = h.size ? h.size : 10,
					y = 1.5 * b,
					R = (h.bold,
						h.italic,
						h.halign ? h.halign : "left"),
					x = h.valign ? h.valign : "bottom",
					m = "string" == typeof h.tag && 0 < h.tag.length ? h.tag : "",
					G = (h.marker,
						h.angle || 0),
					v = h.bounding,
					w = h["bounding.stroke"] ? h["bounding.stroke"] : "black",
					S = h["bounding.fill"] ? h["bounding.fill"] : "rgba(255,255,255,0.7)",
					C = h["bounding.shadow"],
					I = h["bounding.shadow.color"] || "#ccc",
					_ = h["bounding.shadow.blur"] || 3,
					O = h["bounding.shadow.offsetx"] || 3,
					A = h["bounding.shadow.offsety"] || 3,
					N = "number" == typeof h["bounding.linewidth"] ? h["bounding.linewidth"] : 1,
					E = {};
				if ("string" == typeof h.color && (o = d.fillStyle,
						d.fillStyle = h.color),
					"number" == typeof l && (l = String(l)),
					"string" == typeof l) {
					0 != G && (d.save(),
							d.translate(a, n),
							d.rotate(Math.PI / 180 * G),
							n = a = 0),
						d.font = (h.italic ? "italic " : "") + (h.bold ? "bold " : "") + b + "pt " + u;
					for (var k = 0, f = 0; f < c; ++f)
						k = Math.max(k, d.measureText(p[f]).width);
					var T, F, M, D = y * c;
					h.marker && (T = d.strokeStyle,
							d.beginPath(),
							d.strokeStyle = "red",
							d.moveTo(a, n - 10),
							d.lineTo(a, n + 10),
							d.moveTo(a - 10, n),
							d.lineTo(a + 10, n),
							d.stroke(),
							d.strokeStyle = T),
						F = "center" == R ? (d.textAlign = "center",
							a - 2 - k / 2) : "right" == R ? (d.textAlign = "right",
							a - 2 - k) : (d.textAlign = "left",
							a - 2),
						M = "center" == x ? (d.textBaseline = "middle",
							--n, (n -= (c - 1) / 2 * y) - y / 2 - 2) : "top" == x ? (d.textBaseline = "top",
							n - 2) : (d.textBaseline = "bottom",
							1 < c && (n -= (c - 1) * y),
							n - y - 2);
					var P, z, B, H, L, W, U, Y = k + 4,
						q = 4 + D;
					if (v && (P = d.lineWidth,
							z = d.strokeStyle,
							B = d.fillStyle,
							H = d.shadowColor,
							L = d.shadowBlur,
							W = d.shadowOffsetX,
							U = d.shadowOffsetY,
							d.lineWidth = N || .001,
							d.strokeStyle = w,
							d.fillStyle = S,
							C && (d.shadowColor = I,
								d.shadowBlur = _,
								d.shadowOffsetX = O,
								d.shadowOffsetY = A),
							d.fillRect(F, M, Y, q),
							d.strokeRect(F, M, Y, q),
							d.lineWidth = P,
							d.strokeStyle = z,
							d.fillStyle = B,
							d.shadowColor = H,
							d.shadowBlur = L,
							d.shadowOffsetX = W,
							d.shadowOffsetY = U),
						1 < c)
						for (f = 0; f < c; ++f)
							d.fillText(p[f], a, n + y * f);
					else
						d.fillText(l, a + .5, n + .5);
					return 0 != G && (90 == G ? "left" == R ? ("bottom" == x && (F = i - 2,
									M = s - 2,
									Y = 4 + D,
									q = k + 4),
								"center" == x && (F = i - D / 2 - 2,
									M = s - 2,
									Y = 4 + D,
									q = k + 4),
								"top" == x && (F = i - D - 2,
									M = s - 2,
									Y = 4 + D,
									q = k + 4)) : "center" == R ? ("bottom" == x && (F = i - 2,
									M = s - k / 2 - 2,
									Y = 4 + D,
									q = k + 4),
								"center" == x && (F = i - D / 2 - 2,
									M = s - k / 2 - 2,
									Y = 4 + D,
									q = k + 4),
								"top" == x && (F = i - D - 2,
									M = s - k / 2 - 2,
									Y = 4 + D,
									q = k + 4)) : "right" == R && ("bottom" == x && (F = i - 2,
									M = s - k - 2,
									Y = 4 + D,
									q = k + 4),
								"center" == x && (F = i - D / 2 - 2,
									M = s - k - 2,
									Y = 4 + D,
									q = k + 4),
								"top" == x && (F = i - D - 2,
									M = s - k - 2,
									Y = 4 + D,
									q = k + 4)) : 180 == G ? "left" == R ? ("bottom" == x && (F = i - k - 2,
									M = s - 2,
									Y = k + 4,
									q = 4 + D),
								"center" == x && (F = i - k - 2,
									M = s - D / 2 - 2,
									Y = k + 4,
									q = 4 + D),
								"top" == x && (F = i - k - 2,
									M = s - D - 2,
									Y = k + 4,
									q = 4 + D)) : "center" == R ? ("bottom" == x && (F = i - k / 2 - 2,
									M = s - 2,
									Y = k + 4,
									q = 4 + D),
								"center" == x && (F = i - k / 2 - 2,
									M = s - D / 2 - 2,
									Y = k + 4,
									q = 4 + D),
								"top" == x && (F = i - k / 2 - 2,
									M = s - D - 2,
									Y = k + 4,
									q = 4 + D)) : "right" == R && ("bottom" == x && (F = i - 2,
									M = s - 2,
									Y = k + 4,
									q = 4 + D),
								"center" == x && (F = i - 2,
									M = s - D / 2 - 2,
									Y = k + 4,
									q = 4 + D),
								"top" == x && (F = i - 2,
									M = s - D - 2,
									Y = k + 4,
									q = 4 + D)) : 270 == G && ("left" == R ? ("bottom" == x && (F = i - D - 2,
									M = s - k - 2,
									Y = 4 + D,
									q = k + 4),
								"center" == x && (F = i - D / 2 - 4,
									M = s - k - 2,
									Y = 4 + D,
									q = k + 4),
								"top" == x && (F = i - 2,
									M = s - k - 2,
									Y = 4 + D,
									q = k + 4)) : "center" == R ? ("bottom" == x && (F = i - D - 2,
									M = s - k / 2 - 2,
									Y = 4 + D,
									q = k + 4),
								"center" == x && (F = i - D / 2 - 4,
									M = s - k / 2 - 2,
									Y = 4 + D,
									q = k + 4),
								"top" == x && (F = i - 2,
									M = s - k / 2 - 2,
									Y = 4 + D,
									q = k + 4)) : "right" == R && ("bottom" == x && (F = i - D - 2,
									M = s - 2,
									Y = 4 + D,
									q = k + 4),
								"center" == x && (F = i - D / 2 - 2,
									M = s - 2,
									Y = 4 + D,
									q = k + 4),
								"top" == x && (F = i - 2,
									M = s - 2,
									Y = 4 + D,
									q = k + 4))),
							d.restore()),
						d.textBaseline = "alphabetic",
						d.textAlign = "left",
						E.x = F,
						E.y = M,
						E.width = Y,
						E.height = q,
						E.object = g,
						E.text = l,
						E.tag = m,
						g && g.isrgraph && g.coordsText && g.coordsText.push(E),
						"string" == typeof o && (d.fillStyle = o),
						E
				}
			},
			RGraph.text.defaults = {},
			RGraph.random = function() {
				var t = RGraph.getArgs(arguments, "min,max,decimals"),
					e = t.decimals ? t.decimals : 0,
					r = Math.random();
				return Number(((t.max - t.min) * r + t.min).toFixed(e))
			},
			RGraph.noShadow = function() {
				var t = RGraph.getArgs(arguments, "object");
				t.object.context.shadowColor = "rgba(0,0,0,0)",
					t.object.context.shadowBlur = 0,
					t.object.context.shadowOffsetx = 0,
					t.object.context.shadowOffsety = 0
			},
			RGraph.Registry.get = function() {
				var t = RGraph.getArgs(arguments, "name");
				return t.name = t.name.replace(/([A-Z])/g, function(t) {
						return "." + String(RegExp.$1).toLowerCase()
					}),
					RGraph.Registry.store[t.name]
			},
			RGraph.isArray = function() {
				var t = RGraph.getArgs(arguments, "object");
				if (!t.object || !t.object.constructor)
					return !1;
				var e = t.object.constructor.toString().indexOf("Array");
				return null != t.object && "number" == typeof e && 0 < e && e < 20
			},
			RGraph.isNull = function() {
				var t = RGraph.getArgs(arguments, "arg");
				return "object" == typeof t.arg && !t.arg
			},
			RGraph.Effects.updateCanvas = function() {
				var t = RGraph.getArgs(arguments, "func");
				window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || function(t) {
						setTimeout(t, 16.666)
					},
					window.requestAnimationFrame(t.func)
			},
			RGraph.stringsToNumbers = function() {
				var t = RGraph.getArgs(arguments, "string,separator"),
					e = t.separator || ",";
				if ("number" == typeof t.string)
					return t.string;
				if ("string" == typeof t.string && (-1 != t.string.indexOf(e) ? t.string = t.string.split(e) : t.string = parseFloat(t.string)),
					"object" == typeof t.string && !RGraph.isNull(t.string))
					for (var r = 0, o = t.string.length; r < o; r += 1)
						t.string[r] = parseFloat(t.string[r]);
				return t.string
			},
			RGraph.parseObjectStyleConfig = function() {
				var t = RGraph.getArgs(arguments, "object,config");
				for (var e in t.config)
					"string" == typeof e && t.object.set(e, t.config[e])
			},
			RGraph.getTextConf = function(t) {
				var e = t.object.properties,
					r = t.prefix;
				return {
					font: "string" == typeof e[r + "Font"] ? e[r + "Font"] : e.textFont,
					size: "number" == typeof e[r + "Size"] ? e[r + "Size"] : e.textSize,
					color: "string" == typeof e[r + "Color"] ? e[r + "Color"] : e.textColor,
					bold: RGraph.isNull(e[r + "Bold"]) ? e.textBold : e[r + "Bold"],
					italic: RGraph.isNull(e[r + "Italic"]) ? e.textItalic : e[r + "Italic"]
				}
			},
			RGraph.isString = function(t) {
				return "string" == typeof t
			},
			RGraph.isNumber = function(t) {
				return "number" == typeof t
			},
			RGraph.isObject = function(t) {
				return "object" == typeof t && 0 < t.constructor.toString().toLowerCase().indexOf("object")
			},
			RGraph.isFunction = function(t) {
				return "function" == typeof t
			},
			RGraph.isUndefined = function(t) {
				return void 0 === t
			}
	}((window,
		document));

// RGraph common sheets version: 2020-10-03

RGraph = window.RGraph || {
}, window, document, RGraph.Sheets = function() {
	var e = RGraph.getArgs(arguments, "key,worksheet,callback");
	2 === arguments.length && (e.callback = arguments[1], e.worksheet = null);
	var t, l = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		r = e.key,
		a = (3 === arguments.length ? (t = Number(e.worksheet), e.callback) : (t = 1, e.worksheet), RGraph.random(0, 999999999)),
		n = ("https://spreadsheets.google.com/feeds/cells/[KEY]/[WORKSHEET]/public/full?alt=json-in-script&callback=__rgraph_JSONPCallback" + a).replace(/\[KEY\]/, r).replace(/\[WORKSHEET\]/, t);
	this.load = function(e, i) {
		var o = this;
		window["__rgraph_JSONPCallback" + a] = function(e) {
			o.json = e;
			for (var t = [], r = 0, a = 0, l = 0; l < e.feed.entry.length; ++l) r = e.feed.entry[l].gs$cell.row - 1, a = e.feed.entry[l].gs$cell.col - 1, t[r] || (t[r] = []), t[r][a] = e.feed.entry[l].content.$t;
			for (var n = 0, l = 0; l < t.length; ++l) n = t[l] ? Math.max(n, t[l].length) : n;
			for (l = 0; l < t.length; ++l) {
				void 0 === t[l] && (t[l] = new Array(n));
				for (var h = 0; h < n; h++) void 0 === t[l][h] && (t[l][h] = ""), t[l][h].match(/^[0-9]+$/) ? t[l][h] = parseInt(t[l][h]) : t[l][h].match(/^[0-9.]+$/) && (t[l][h] = parseFloat(t[l][h]))
			}
			o.data = t, i(o)
		};
		var t = document.createElement("script");
		t.src = e, document.body.appendChild(t)
	}, this.col = function(e, t) {
		var r = {},
			a = [];
		t = t || 1, arguments && "object" == typeof arguments[2] && "boolean" == typeof arguments[2].trim ? r.trim = arguments[2].trim : r.trim = !0;
		for (var l = 0; l < this.data.length; ++l) a.push(this.data[l][e - 1]);
		return r.trim && (a = RGraph.Sheets.arrayRTrim(a)), a = a.slice(t - 1)
	}, this.get = function(e) {
		if ((e = e.toUpperCase()).match(/^\s*([a-z]+)\s*$/i)) {
			if (1 === (e = RegExp.$1).length) {
				var t = l.indexOf(e) + 1;
				return this.col(t, 1, arguments[1])
			}
		}
		if (e.match(/^\s*[0-9]+\s*$/i)) return this.row(e, null, arguments[1]);
		if (e.match(/^\s*([a-z]{1,2})([0-9]+)\s*$/i)) {
			var r = RegExp.$1,
				a = RegExp.$2;
			return this.get(r, {
				trim: !1
			})[a - 1]
		}
	}, this.load(n, e.callback)
};

// RGraph meter version: 2020-10-03

RGraph = window.RGraph || {
}, RGraph.Meter = function(t) {
	var e = t.id,
		s = document.getElementById(e),
		a = t.min,
		n = t.max,
		r = t.value;
	this.id = e, this.canvas = s, this.context = this.canvas.getContext ? this.canvas.getContext("2d", {
		alpha: "object" != typeof e || !1 !== e.alpha
	}) : null, (this.canvas.__object__ = this).type = "meter", this.min = RGraph.stringsToNumbers(a), this.max = RGraph.stringsToNumbers(n), this.value = RGraph.stringsToNumbers(r), this.centerx = null, this.centery = null, this.radius = null, this.isRGraph = !0, this.isrgraph = !0, this.rgraph = !0, this.currentValue = null, this.uid = RGraph.createUID(), this.canvas.uid = this.canvas.uid ? this.canvas.uid : RGraph.createUID(), this.colorsParsed = !1, this.coordsText = [], this.original_colors = [], this.firstDraw = !0, this.properties = {
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
	var b = this.properties;
	this.path = RGraph.pathObjectFunction, this.responsive = RGraph.responsive, this.set = function(t) {
		var e = void 0 === arguments[1] ? null : arguments[1];
		if (1 !== arguments.length || "object" != typeof t) return b[t] = e, this;
	}, this.get = function(t) {
		return b[t]
	}, this.draw = function() {
		return RGraph.fireCustomEvent(this, "onbeforedraw"), this.canvas.__rgraph_aa_translated__ || (this.context.translate(.5, .5), this.canvas.__rgraph_aa_translated__ = !0), this.value > this.max && (this.value = this.max), this.value < this.min && (this.value = this.min), this.currentValue = this.value, this.marginLeft = b.marginLeft, this.marginRight = b.marginRight, this.marginTop = b.marginTop, this.marginBottom = b.marginBottom, this.centerx = (this.canvas.width - this.marginLeft - this.marginRight) / 2 + this.marginLeft, this.centery = this.canvas.height - this.marginBottom, this.radius = Math.min((this.canvas.width - this.marginLeft - this.marginRight) / 2, this.canvas.height - this.marginTop - this.marginBottom), this.coordsText = [], "number" == typeof b.centerx && (this.centerx = b.centerx), "number" == typeof b.centery && (this.centery = b.centery), "number" == typeof b.radius && (this.radius = b.radius), this.colorsParsed || (this.parseColors(), this.colorsParsed = !0), this.drawBackground(), this.drawLabels(), this.drawNeedle(), this.drawReadout(), RGraph.drawTitle(this, b.title, this.marginTop, null, "boolean" == typeof b.titleSize ? b.titleSize : b.textSize), RGraph.installEventListeners(this), this.firstDraw && (this.firstDraw = !1, RGraph.fireCustomEvent(this, "onfirstdraw"), this.firstDrawFunc()), RGraph.fireCustomEvent(this, "ondraw"), this
	}, this.drawBackground = function() {
		if (this.context.beginPath(), this.context.fillStyle = b.backgroundColor, this.context.moveTo(this.centerx, this.centery), this.context.arc(this.centerx, this.centery, this.radius, b.anglesStart, b.anglesEnd, !1), this.context.fill(), RGraph.noShadow(this), b.tickmarksSmallCount) {
			for (var t = 0; t < b.anglesEnd - b.anglesStart; t += RGraph.PI / b.tickmarksSmallCount) this.context.beginPath(), this.context.strokeStyle = b.tickmarksSmallColor, this.context.arc(this.centerx, this.centery, this.radius, b.anglesStart + t, b.anglesStart + t + 1e-5, 0), this.context.arc(this.centerx, this.centery, this.radius - 5, b.anglesStart + t, b.anglesStart + t + 1e-5, 0), this.context.stroke();
			this.context.beginPath(), this.context.fillStyle = b.backgroundColor, this.context.arc(this.centerx, this.centery, this.radius - 4, b.anglesStart, b.anglesEnd, !1), this.context.closePath(), this.context.fill()
		}
		if (b.tickmarksLargeCount)
			for (var e = ["white", "white", b.tickmarksLargeColor], i = 0; i < e.length; ++i)
				for (t = 0; t < b.anglesEnd - b.anglesStart; t += (b.anglesEnd - b.anglesStart) / b.tickmarksLargeCount) this.context.beginPath(), this.context.strokeStyle = e[i], this.context.arc(this.centerx, this.centery, this.radius, b.anglesStart + t, b.anglesStart + t + .001, 0), this.context.arc(this.centerx, this.centery, this.radius - 5, b.anglesStart + t, b.anglesStart + t + 1e-4, 0), this.context.stroke();
		this.context.beginPath(), this.context.fillStyle = b.backgroundColor, this.context.moveTo(this.centerx, this.centery), this.context.arc(this.centerx, this.centery, this.radius - 7, b.anglesStart, b.anglesEnd, !1), this.context.closePath(), this.context.fill();
		var s = b.colorsRanges;
		if (RGraph.isArray(b.colorsRanges)) {
			for (s = b.colorsRanges, t = 0; t < s.length; ++t) this.context.strokeStyle = b.colorsStroke ? b.colorsStroke : s[t][2], this.context.fillStyle = s[t][2], this.context.lineWidth = b.linewidthSegments, this.context.beginPath(), this.context.arc(this.centerx, this.centery, .85 * this.radius, (s[t][0] - this.min) / (this.max - this.min) * (b.anglesEnd - b.anglesStart) + b.anglesStart, (s[t][1] - this.min) / (this.max - this.min) * (b.anglesEnd - b.anglesStart) + b.anglesStart, !1), 0 < b.segmentsRadiusStart ? this.context.arc(this.centerx, this.centery, b.segmentsRadiusStart, (s[t][1] - this.min) / (this.max - this.min) * (b.anglesEnd - b.anglesStart) + b.anglesStart, (s[t][0] - this.min) / (this.max - this.min) * (b.anglesEnd - b.anglesStart) + b.anglesStart, !0) : this.context.lineTo(this.centerx, this.centery), this.context.closePath(), this.context.stroke(), this.context.fill();
			this.context.beginPath()
		} else this.context.lineWidth = b.linewidth, this.context.lineWidth = 1;
		this.context.stroke(), this.context.lineWidth = 1
	}, this.drawNeedle = function() {
		var t, e = (this.value - this.min) / (this.max - this.min) * (b.anglesEnd - b.anglesStart) + b.anglesStart,
			i = "number" == typeof b.needleRadius ? b.needleRadius : .7 * this.radius;
		"pointer" === b.needleType && (t = 40 < .06 * this.radius ? 40 : .06 * this.radius, this.context.beginPath(), this.context.fillStyle = b.needleColor, this.context.moveTo(this.centerx, this.centery), this.context.arc(this.centerx, this.centery, t, 0, RGraph.TWOPI, !1), this.context.fill(), this.context.beginPath(), this.context.arc(this.centerx, this.centery, t, e + RGraph.HALFPI, e + RGraph.HALFPI + 1e-4, !1), this.context.arc(this.centerx, this.centery, i, e, e + .001, !1), this.context.arc(this.centerx, this.centery, t, e - RGraph.HALFPI, e - RGraph.HALFPI + .001, !1), this.context.fill())
	}, this.drawLabels = function() {
		if (b.labels) {
			this.radius, b.textItalic;
			var t = b.scaleUnitsPost,
				e = b.scaleUnitsPre,
				i = b.scalePoint,
				s = b.scaleThousand,
				a = this.centerx,
				n = this.centery,
				r = (this.min, this.max, b.scaleDecimals),
				l = b.labelsCount,
				o = (b.labelsRadiusOffset, b.labelsSpecific, RGraph.getTextConf({
					object: this,
					prefix: "labels"
				}));
			this.context.fillStyle = b.textColor, this.context.lineWidth = 1, this.context.beginPath();
			for (var h = 0; h <= l; ++h) {
				var c = (b.anglesEnd - b.anglesStart) * (h / l) + b.anglesStart,
					u = RGraph.getRadiusEndPoint(a, n, c + (0 != h && h != l || !b.border ? 0 : 0 == h ? .05 : -.05), .925 * this.radius - ("bottom" === b.textValign ? 15 : 0) + b.labelsRadiusOffset),
					g = b.anglesStart,
					d = b.anglesEnd,
					x = d - g,
					m = g * (180 / RGraph.PI),
					p = (RGraph.PI, x * (180 / RGraph.PI));
				valign = b.textValign, halign = b.border ? 0 == h ? "left" : h == l ? "right" : "center" : "center";
				var f = (this.max - this.min) * (h / l) + this.min;
				RGraph.text({
					object: this,
					font: o.font,
					size: o.size,
					color: o.color,
					bold: o.bold,
					italic: o.italic,
					x: u[0],
					y: u[1],
					text: RGraph.numberFormat({
						object: this,
						number: f.toFixed(0 === f ? 0 : r),
						unitspre: e,
						unitspost: t,
						point: i,
						thousand: s
					}),
					halign: halign,
					valign: valign,
					angle: 1 / l * p * h + m - 270,
					bounding: !1,
					boundingFill: 0 == h || h == l ? "white" : null,
					tag: "scale"
				})
			}
		}
	}, this.drawReadout = function() {
		b.labelsValueText
	}, this.getShape = function(t) {}, this.getValue = function(t) {}, this.parseColors = function() {
		0 === this.original_colors.length && (this.original_colors.colorsGreenColor = RGraph.arrayClone(b.colorsGreenColor), this.original_colors.colorsYellowColor = RGraph.arrayClone(b.colorsYellowColor), this.original_colors.colorsRedColor = RGraph.arrayClone(b.colorsRedColor), this.original_colorsColorsRanges = RGraph.arrayClone(b.colorsRanges)), b.colorsGreenColor = this.parseSingleColorForGradient(b.colorsGreenColor), b.colorsYellowColor = this.parseSingleColorForGradient(b.colorsYellowColor), b.colorsRedColor = this.parseSingleColorForGradient(b.colorsRedColor);
		var t = b.colorsRanges;
		if (t && t.length)
			for (var e = 0; e < t.length; ++e) t[e][2] = this.parseSingleColorForGradient(t[e][2])
	}, this.reset = function() {}, this.parseSingleColorForGradient = function(t) {
		if (!t || "string" != typeof t) return t;
		if (t.match(/^gradient\((.*)\)$/i)) {
			if (t.match(/^gradient\(({.*})\)$/i)) return RGraph.parseJSONGradient(
			);
			for (var e = RegExp.$1.split(":"), i = this.context.createRadialGradient(this.centerx, this.centery, b.segmentsRadiusStart, this.centerx, this.centery, .85 * this.radius), s = 1 / (e.length - 1), a = 0; a < e.length; ++a) i.addColorStop(a * s, RGraph.trim(e[a]))
		}
		return i || t
	}, this.firstDrawFunc = function() {}, this.grow = function() {
		var e = this;
		e.currentValue = e.currentValue || e.min;
		var i = (arguments[0] || {}).frames || 30,
			s = 0,
			a = (e.value - e.currentValue) / i,
			n = arguments[1] || function() {},
			r = e.currentValue;
		return function t() {
			e.value = r + s++ * a, RGraph.clear(e.canvas), RGraph.redrawCanvas(e.canvas), s <= i ? RGraph.Effects.updateCanvas(t) : n(e)
		}(), this
	}, RGraph.register(this), RGraph.parseObjectStyleConfig(this, t.options)
};