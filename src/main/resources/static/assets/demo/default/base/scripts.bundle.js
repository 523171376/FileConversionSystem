this.Element && function(t) {
		t.matches = t.matches || t.matchesSelector || t.webkitMatchesSelector || t.msMatchesSelector || function(t) {
			for(var e = (this.parentNode || this.document).querySelectorAll(t), a = -1; e[++a] && e[a] != this;);
			return !!e[a]
		}
	}(Element.prototype), this.Element && function(t) {
		t.closest = t.closest || function(t) {
			for(var e = this; e.matches && !e.matches(t);) e = e.parentNode;
			return e.matches ? e : null
		}
	}(Element.prototype), this.Element && function(t) {
		t.matches = t.matches || t.matchesSelector || t.webkitMatchesSelector || t.msMatchesSelector || function(t) {
			for(var e = (this.parentNode || this.document).querySelectorAll(t), a = -1; e[++a] && e[a] != this;);
			return !!e[a]
		}
	}(Element.prototype),
	function() {
		for(var t = 0, e = ["webkit", "moz"], a = 0; a < e.length && !window.requestAnimationFrame; ++a) window.requestAnimationFrame = window[e[a] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[a] + "CancelAnimationFrame"] || window[e[a] + "CancelRequestAnimationFrame"];
		window.requestAnimationFrame || (window.requestAnimationFrame = function(e) {
			var a = (new Date).getTime(),
				n = Math.max(0, 16 - (a - t)),
				o = window.setTimeout(function() {
					e(a + n)
				}, n);
			return t = a + n, o
		}), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
			clearTimeout(t)
		})
	}(), [Element.prototype, Document.prototype, DocumentFragment.prototype].forEach(function(t) {
		t.hasOwnProperty("prepend") || Object.defineProperty(t, "prepend", {
			configurable: !0,
			enumerable: !0,
			writable: !0,
			value: function() {
				var t = Array.prototype.slice.call(arguments),
					e = document.createDocumentFragment();
				t.forEach(function(t) {
					var a = t instanceof Node;
					e.appendChild(a ? t : document.createTextNode(String(t)))
				}), this.insertBefore(e, this.firstChild)
			}
		})
	}), window.mUtilElementDataStore = {}, window.mUtilElementDataStoreID = 0, window.mUtilDelegatedEventHandlers = {}, window.noZensmooth = !0;
var mUtil = function() {
	var t = [],
		e = {
			sm: 544,
			md: 768,
			lg: 1024,
			xl: 1200
		},
		a = function() {
			var e = !1;
			window.addEventListener("resize", function() {
				clearTimeout(e), e = setTimeout(function() {
					! function() {
						for(var e = 0; e < t.length; e++) t[e].call()
					}()
				}, 250)
			})
		};
	return {
		init: function(t) {
			t && t.breakpoints && (e = t.breakpoints), a()
		},
		addResizeHandler: function(e) {
			t.push(e)
		},
		runResizeHandlers: function() {
			_runResizeHandlers()
		},
		getURLParam: function(t) {
			var e, a, n = window.location.search.substring(1).split("&");
			for(e = 0; e < n.length; e++)
				if((a = n[e].split("="))[0] == t) return unescape(a[1]);
			return null
		},
		isMobileDevice: function() {
			return this.getViewPort().width < this.getBreakpoint("lg")
		},
		isDesktopDevice: function() {
			return !mUtil.isMobileDevice()
		},
		getViewPort: function() {
			var t = window,
				e = "inner";
			return "innerWidth" in window || (e = "client", t = document.documentElement || document.body), {
				width: t[e + "Width"],
				height: t[e + "Height"]
			}
		},
		isInResponsiveRange: function(t) {
			var e = this.getViewPort().width;
			return "general" == t || ("desktop" == t && e >= this.getBreakpoint("lg") + 1 || ("tablet" == t && e >= this.getBreakpoint("md") + 1 && e < this.getBreakpoint("lg") || ("mobile" == t && e <= this.getBreakpoint("md") || ("desktop-and-tablet" == t && e >= this.getBreakpoint("md") + 1 || ("tablet-and-mobile" == t && e <= this.getBreakpoint("lg") || "minimal-desktop-and-below" == t && e <= this.getBreakpoint("xl"))))))
		},
		getUniqueID: function(t) {
			return t + Math.floor(Math.random() * (new Date).getTime())
		},
		getBreakpoint: function(t) {
			return e[t]
		},
		isset: function(t, e) {
			var a;
			if(-1 !== (e = e || "").indexOf("[")) throw new Error("Unsupported object path notation.");
			e = e.split(".");
			do {
				if(void 0 === t) return !1;
				if(a = e.shift(), !t.hasOwnProperty(a)) return !1;
				t = t[a]
			} while (e.length);
			return !0
		},
		getHighestZindex: function(t) {
			for(var e, a, n = mUtil.get(t); n && n !== document;) {
				if(("absolute" === (e = mUtil.css(n, "position")) || "relative" === e || "fixed" === e) && (a = parseInt(mUtil.css(n, "z-index")), !isNaN(a) && 0 !== a)) return a;
				n = n.parentNode
			}
			return null
		},
		hasFixedPositionedParent: function(t) {
			for(; t && t !== document;) {
				if(position = mUtil.css(t, "position"), "fixed" === position) return !0;
				t = t.parentNode
			}
			return !1
		},
		sleep: function(t) {
			for(var e = (new Date).getTime(), a = 0; a < 1e7 && !((new Date).getTime() - e > t); a++);
		},
		getRandomInt: function(t, e) {
			return Math.floor(Math.random() * (e - t + 1)) + t
		},
		isAngularVersion: function() {
			return void 0 !== window.Zone
		},
		deepExtend: function(t) {
			t = t || {};
			for(var e = 1; e < arguments.length; e++) {
				var a = arguments[e];
				if(a)
					for(var n in a) a.hasOwnProperty(n) && ("object" == typeof a[n] ? t[n] = mUtil.deepExtend(t[n], a[n]) : t[n] = a[n])
			}
			return t
		},
		extend: function(t) {
			t = t || {};
			for(var e = 1; e < arguments.length; e++)
				if(arguments[e])
					for(var a in arguments[e]) arguments[e].hasOwnProperty(a) && (t[a] = arguments[e][a]);
			return t
		},
		get: function(t) {
			var e;
			return t === document ? document : t && 1 === t.nodeType ? t : (e = document.getElementById(t)) ? e : (e = document.getElementsByTagName(t)) ? e[0] : (e = document.getElementsByClassName(t)) ? e[0] : null
		},
		hasClasses: function(t, e) {
			if(t) {
				for(var a = e.split(" "), n = 0; n < a.length; n++)
					if(0 == mUtil.hasClass(t, mUtil.trim(a[n]))) return !1;
				return !0
			}
		},
		hasClass: function(t, e) {
			if(t) return t.classList ? t.classList.contains(e) : new RegExp("\\b" + e + "\\b").test(t.className)
		},
		addClass: function(t, e) {
			if(t && void 0 !== e) {
				var a = e.split(" ");
				if(t.classList)
					for(var n = 0; n < a.length; n++) a[n] && a[n].length > 0 && t.classList.add(mUtil.trim(a[n]));
				else if(!mUtil.hasClass(t, e))
					for(n = 0; n < a.length; n++) t.className += " " + mUtil.trim(a[n])
			}
		},
		removeClass: function(t, e) {
			if(t) {
				var a = e.split(" ");
				if(t.classList)
					for(var n = 0; n < a.length; n++) t.classList.remove(mUtil.trim(a[n]));
				else if(mUtil.hasClass(t, e))
					for(n = 0; n < a.length; n++) t.className = t.className.replace(new RegExp("\\b" + mUtil.trim(a[n]) + "\\b", "g"), "")
			}
		},
		triggerCustomEvent: function(t, e, a) {
			if(window.CustomEvent) var n = new CustomEvent(e, {
				detail: a
			});
			else(n = document.createEvent("CustomEvent")).initCustomEvent(e, !0, !0, a);
			t.dispatchEvent(n)
		},
		trim: function(t) {
			return t.trim()
		},
		eventTriggered: function(t) {
			return !!t.currentTarget.dataset.triggered || (t.currentTarget.dataset.triggered = !0, !1)
		},
		remove: function(t) {
			t && t.parentNode && t.parentNode.removeChild(t)
		},
		find: function(t, e) {
			return t.querySelector(e)
		},
		findAll: function(t, e) {
			return t.querySelectorAll(e)
		},
		insertAfter: function(t, e) {
			return e.parentNode.insertBefore(t, e.nextSibling)
		},
		parents: function(t, e) {
			function a(t, e) {
				for(var a = 0, n = t.length; a < n; a++)
					if(t[a] == e) return !0;
				return !1
			}
			return function(t, e) {
				for(var n = document.querySelectorAll(e), o = t.parentNode; o && !a(n, o);) o = o.parentNode;
				return o
			}(t, e)
		},
		children: function(t, e, a) {
			if(t && t.childNodes) {
				for(var n = [], o = 0, i = t.childNodes.length; o < i; ++o) 1 == t.childNodes[o].nodeType && mUtil.matches(t.childNodes[o], e, a) && n.push(t.childNodes[o]);
				return n
			}
		},
		child: function(t, e, a) {
			var n = mUtil.children(t, e, a);
			return n ? n[0] : null
		},
		matches: function(t, e, a) {
			var n = Element.prototype,
				o = n.matches || n.webkitMatchesSelector || n.mozMatchesSelector || n.msMatchesSelector || function(t) {
					return -1 !== [].indexOf.call(document.querySelectorAll(t), this)
				};
			return !(!t || !t.tagName) && o.call(t, e)
		},
		data: function(t) {
			return t = mUtil.get(t), {
				set: function(e, a) {
					void 0 === t.customDataTag && (mUtilElementDataStoreID++, t.customDataTag = mUtilElementDataStoreID), void 0 === mUtilElementDataStore[t.customDataTag] && (mUtilElementDataStore[t.customDataTag] = {}), mUtilElementDataStore[t.customDataTag][e] = a
				},
				get: function(e) {
					return this.has(e) ? mUtilElementDataStore[t.customDataTag][e] : null
				},
				has: function(e) {
					return !(!mUtilElementDataStore[t.customDataTag] || !mUtilElementDataStore[t.customDataTag][e])
				},
				remove: function(e) {
					this.has(e) && delete mUtilElementDataStore[t.customDataTag][e]
				}
			}
		},
		outerWidth: function(t, e) {
			if(!0 === e) {
				var a = parseFloat(t.offsetWidth);
				return a += parseFloat(mUtil.css(t, "margin-left")) + parseFloat(mUtil.css(t, "margin-right")), parseFloat(a)
			}
			return a = parseFloat(t.offsetWidth)
		},
		offset: function(t) {
			var e = t.getBoundingClientRect();
			return {
				top: e.top + document.body.scrollTop,
				left: e.left + document.body.scrollLeft
			}
		},
		height: function(t) {
			return mUtil.css(t, "height")
		},
		visible: function(t) {
			return !(0 === t.offsetWidth && 0 === t.offsetHeight)
		},
		attr: function(t, e, a) {
			if(void 0 != (t = mUtil.get(t))) return void 0 === a ? t.getAttribute(e) : void t.setAttribute(e, a)
		},
		hasAttr: function(t, e) {
			if(void 0 != (t = mUtil.get(t))) return !!t.getAttribute(e)
		},
		removeAttr: function(t, e) {
			void 0 != (t = mUtil.get(t)) && t.removeAttribute(e)
		},
		animate: function(t, e, a, n, o, i) {
			var l = {
				linear: function(t, e, a, n) {
					return a * t / n + e
				}
			};
			if("number" == typeof t && "number" == typeof e && "number" == typeof a && "function" == typeof n) {
				"string" == typeof o && l[o] && (o = l[o]), "function" != typeof o && (o = l.linear), "function" != typeof i && (i = function() {});
				var r = window.requestAnimationFrame || function(t) {
						window.setTimeout(t, 1e3 / 60)
					},
					s = e - t;
				n(t);
				var d = window.performance && window.performance.now ? window.performance.now() : +new Date;
				r(function l(c) {
					var m = (c || +new Date) - d;
					m >= 0 && n(o(m, t, s, a)), m >= 0 && m >= a ? (n(e), i()) : r(l)
				})
			}
		},
		actualCss: function(t, e, a) {
			var n;
			if(t instanceof HTMLElement != !1) return t.getAttribute("m-hidden-" + e) && !1 !== a ? parseFloat(t.getAttribute("m-hidden-" + e)) : (t.style.cssText = "position: absolute; visibility: hidden; display: block;", "width" == e ? n = t.offsetWidth : "height" == e && (n = t.offsetHeight), t.style.cssText = "", t.setAttribute("m-hidden-" + e, n), parseFloat(n))
		},
		actualHeight: function(t, e) {
			return mUtil.actualCss(t, "height", e)
		},
		actualWidth: function(t, e) {
			return mUtil.actualCss(t, "width", e)
		},
		getScroll: function(t, e) {
			return e = "scroll" + e, t == window || t == document ? self["scrollTop" == e ? "pageYOffset" : "pageXOffset"] || browserSupportsBoxModel && document.documentElement[e] || document.body[e] : t[e]
		},
		css: function(t, e, a) {
			if(t = mUtil.get(t))
				if(void 0 !== a) t.style[e] = a;
				else {
					var n = (t.ownerDocument || document).defaultView;
					if(n && n.getComputedStyle) return e = e.replace(/([A-Z])/g, "-$1").toLowerCase(), n.getComputedStyle(t, null).getPropertyValue(e);
					if(t.currentStyle) return e = e.replace(/\-(\w)/g, function(t, e) {
						return e.toUpperCase()
					}), a = t.currentStyle[e], /^\d+(em|pt|%|ex)?$/i.test(a) ? function(e) {
						var a = t.style.left,
							n = t.runtimeStyle.left;
						return t.runtimeStyle.left = t.currentStyle.left, t.style.left = e || 0, e = t.style.pixelLeft + "px", t.style.left = a, t.runtimeStyle.left = n, e
					}(a) : a
				}
		},
		slide: function(t, e, a, n, o) {
			if(!(!t || "up" == e && !1 === mUtil.visible(t) || "down" == e && !0 === mUtil.visible(t))) {
				a = a || 600;
				var i = mUtil.actualHeight(t),
					l = !1,
					r = !1;
				mUtil.css(t, "padding-top") && !0 !== mUtil.data(t).has("slide-padding-top") && mUtil.data(t).set("slide-padding-top", mUtil.css(t, "padding-top")), mUtil.css(t, "padding-bottom") && !0 !== mUtil.data(t).has("slide-padding-bottom") && mUtil.data(t).set("slide-padding-bottom", mUtil.css(t, "padding-bottom")), mUtil.data(t).has("slide-padding-top") && (l = parseInt(mUtil.data(t).get("slide-padding-top"))), mUtil.data(t).has("slide-padding-bottom") && (r = parseInt(mUtil.data(t).get("slide-padding-bottom"))), "up" == e ? (t.style.cssText = "display: block; overflow: hidden;", l && mUtil.animate(0, l, a, function(e) {
					t.style.paddingTop = l - e + "px"
				}, "linear"), r && mUtil.animate(0, r, a, function(e) {
					t.style.paddingBottom = r - e + "px"
				}, "linear"), mUtil.animate(0, i, a, function(e) {
					t.style.height = i - e + "px"
				}, "linear", function() {
					n(), t.style.height = "", t.style.display = "none"
				})) : "down" == e && (t.style.cssText = "display: block; overflow: hidden;", l && mUtil.animate(0, l, a, function(e) {
					t.style.paddingTop = e + "px"
				}, "linear", function() {
					t.style.paddingTop = ""
				}), r && mUtil.animate(0, r, a, function(e) {
					t.style.paddingBottom = e + "px"
				}, "linear", function() {
					t.style.paddingBottom = ""
				}), mUtil.animate(0, i, a, function(e) {
					t.style.height = e + "px"
				}, "linear", function() {
					n(), t.style.height = "", t.style.display = "", t.style.overflow = ""
				}))
			}
		},
		slideUp: function(t, e, a) {
			mUtil.slide(t, "up", e, a)
		},
		slideDown: function(t, e, a) {
			mUtil.slide(t, "down", e, a)
		},
		show: function(t, e) {
			t.style.display = e || "block"
		},
		hide: function(t) {
			t.style.display = "none"
		},
		addEvent: function(t, e, a, n) {
			void 0 !== (t = mUtil.get(t)) && t.addEventListener(e, a)
		},
		removeEvent: function(t, e, a) {
			(t = mUtil.get(t)).removeEventListener(e, a)
		},
		on: function(t, e, a, n) {
			if(e) {
				var o = mUtil.getUniqueID("event");
				return mUtilDelegatedEventHandlers[o] = function(a) {
					for(var o = t.querySelectorAll(e), i = a.target; i && i !== t;) {
						for(var l = 0, r = o.length; l < r; l++) i === o[l] && n.call(i, a);
						i = i.parentNode
					}
				}, mUtil.addEvent(t, a, mUtilDelegatedEventHandlers[o]), o
			}
		},
		off: function(t, e, a) {
			t && mUtilDelegatedEventHandlers[a] && (mUtil.removeEvent(t, e, mUtilDelegatedEventHandlers[a]), delete mUtilDelegatedEventHandlers[a])
		},
		one: function(t, e, a) {
			(t = mUtil.get(t)).addEventListener(e, function(t) {
				return t.target.removeEventListener(t.type, arguments.callee), a(t)
			})
		},
		hash: function(t) {
			var e, a = 0;
			if(0 === t.length) return a;
			for(e = 0; e < t.length; e++) a = (a << 5) - a + t.charCodeAt(e), a |= 0;
			return a
		},
		animateClass: function(t, e, a) {
			mUtil.addClass(t, "animated " + e), mUtil.one(t, "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
				mUtil.removeClass(t, "animated " + e)
			}), a && mUtil.one(t.animationEnd, a)
		},
		animateDelay: function(t, e) {
			for(var a = ["webkit-", "moz-", "ms-", "o-", ""], n = 0; n < a.length; n++) mUtil.css(t, a[n] + "animation-delay", e)
		},
		animateDuration: function(t, e) {
			for(var a = ["webkit-", "moz-", "ms-", "o-", ""], n = 0; n < a.length; n++) mUtil.css(t, a[n] + "animation-duration", e)
		},
		scrollTo: function(t, e, a) {
			a || (a = 600), zenscroll.toY(t, a)
		},
		scrollToViewport: function(t, e) {
			e || (e = 1200), zenscroll.intoView(t, e)
		},
		scrollToCenter: function(t, e) {
			e || (e = 1200), zenscroll.center(t, e)
		},
		scrollTop: function(t) {
			t || (t = 600), zenscroll.toY(0, t)
		},
		isArray: function(t) {
			return t && Array.isArray(t)
		},
		ready: function(t) {
			(document.attachEvent ? "complete" === document.readyState : "loading" !== document.readyState) ? t(): document.addEventListener("DOMContentLoaded", t)
		},
		isEmpty: function(t) {
			for(var e in t)
				if(t.hasOwnProperty(e)) return !1;
			return !0
		},
		numberString: function(t) {
			for(var e = (t += "").split("."), a = e[0], n = e.length > 1 ? "." + e[1] : "", o = /(\d+)(\d{3})/; o.test(a);) a = a.replace(o, "$1,$2");
			return a + n
		}
	}
}();
mUtil.ready(function() {
	mUtil.init()
});
var mApp = function() {
	var t = {
			brand: "#716aca",
			metal: "#c4c5d6",
			light: "#ffffff",
			accent: "#00c5dc",
			primary: "#5867dd",
			success: "#34bfa3",
			info: "#36a3f7",
			warning: "#ffb822",
			danger: "#f4516c",
			focus: "#9816f4"
		},
		e = function(t) {
			var e = t.data("skin") ? "m-tooltip--skin-" + t.data("skin") : "",
				a = "auto" == t.data("width") ? "m-tooltop--auto-width" : "",
				n = t.data("trigger") ? t.data("trigger") : "hover";
			t.tooltip({
				trigger: n,
				template: '<div class="m-tooltip ' + e + " " + a + ' tooltip" role="tooltip">                <div class="arrow"></div>                <div class="tooltip-inner"></div>            </div>'
			})
		},
		a = function() {
			$('[data-toggle="m-tooltip"]').each(function() {
				e($(this))
			})
		},
		n = function(t) {
			var e = t.data("skin") ? "m-popover--skin-" + t.data("skin") : "",
				a = t.data("trigger") ? t.data("trigger") : "hover";
			t.popover({
				trigger: a,
				template: '            <div class="m-popover ' + e + ' popover" role="tooltip">                <div class="arrow"></div>                <h3 class="popover-header"></h3>                <div class="popover-body"></div>            </div>'
			})
		},
		o = function() {
			$('[data-toggle="m-popover"]').each(function() {
				n($(this))
			})
		},
		i = function(t, e) {
			t = $(t), new mPortlet(t[0], e)
		},
		l = function() {
			$('[m-portlet="true"]').each(function() {
				var t = $(this);
				!0 !== t.data("portlet-initialized") && (i(t, {}), t.data("portlet-initialized", !0))
			})
		},
		r = function() {
			$("[data-tab-target]").each(function() {
				1 != $(this).data("tabs-initialized") && ($(this).click(function(t) {
					t.preventDefault();
					var e = $(this),
						a = e.closest('[data-tabs="true"]'),
						n = $(a.data("tabs-contents")),
						o = $(e.data("tab-target"));
					a.find(".m-tabs__item.m-tabs__item--active").removeClass("m-tabs__item--active"), e.addClass("m-tabs__item--active"), n.find(".m-tabs-content__item.m-tabs-content__item--active").removeClass("m-tabs-content__item--active"), o.addClass("m-tabs-content__item--active")
				}), $(this).data("tabs-initialized", !0))
			})
		};
	return {
		init: function(e) {
			e && e.colors && (t = e.colors), mApp.initComponents()
		},
		initComponents: function() {
			jQuery.event.special.touchstart = {
				setup: function(t, e, a) {
					"function" == typeof this && (e.includes("noPreventDefault") ? this.addEventListener("touchstart", a, {
						passive: !1
					}) : this.addEventListener("touchstart", a, {
						passive: !0
					}))
				}
			}, jQuery.event.special.touchmove = {
				setup: function(t, e, a) {
					"function" == typeof this && (e.includes("noPreventDefault") ? this.addEventListener("touchmove", a, {
						passive: !1
					}) : this.addEventListener("touchmove", a, {
						passive: !0
					}))
				}
			}, jQuery.event.special.wheel = {
				setup: function(t, e, a) {
					"function" == typeof this && (e.includes("noPreventDefault") ? this.addEventListener("wheel", a, {
						passive: !1
					}) : this.addEventListener("wheel", a, {
						passive: !0
					}))
				}
			}, $('[data-scrollable="true"]').each(function() {
				var t, e, a = $(this);
				mUtil.isInResponsiveRange("tablet-and-mobile") ? (t = a.data("mobile-max-height") ? a.data("mobile-max-height") : a.data("max-height"), e = a.data("mobile-height") ? a.data("mobile-height") : a.data("height")) : (t = a.data("max-height"), e = a.data("max-height")), t && a.css("max-height", t), e && a.css("height", e), mApp.initScroller(a, {})
			}), a(), o(), $("body").on("click", "[data-close=alert]", function() {
				$(this).closest(".alert").hide()
			}), l(), $(".custom-file-input").on("change", function() {
				var t = $(this).val();
				$(this).next(".custom-file-label").addClass("selected").html(t)
			}), r()
		},
		initCustomTabs: function() {
			r()
		},
		initTooltips: function() {
			a()
		},
		initTooltip: function(t) {
			e(t)
		},
		initPopovers: function() {
			o()
		},
		initPopover: function(t) {
			n(t)
		},
		initPortlet: function(t, e) {
			i(t, e)
		},
		initPortlets: function() {
			l()
		},
		scrollTo: function(t, e) {
			el = $(t);
			var a = el && el.length > 0 ? el.offset().top : 0;
			a += e || 0, jQuery("html,body").animate({
				scrollTop: a
			}, "slow")
		},
		scrollToViewport: function(t) {
			var e = $(t).offset().top,
				a = t.height(),
				n = e - (mUtil.getViewPort().height / 2 - a / 2);
			jQuery("html,body").animate({
				scrollTop: n
			}, "slow")
		},
		scrollTop: function() {
			mApp.scrollTo()
		},
		initScroller: function(t, e, a) {
			mUtil.isMobileDevice() ? t.css("overflow", "auto") : (!0 !== a && mApp.destroyScroller(t), t.mCustomScrollbar({
				scrollInertia: 0,
				autoDraggerLength: !0,
				autoHideScrollbar: !0,
				autoExpandScrollbar: !1,
				alwaysShowScrollbar: 0,
				axis: t.data("axis") ? t.data("axis") : "y",
				mouseWheel: {
					scrollAmount: 120,
					preventDefault: !0
				},
				setHeight: e.height ? e.height : "",
				theme: "minimal-dark"
			}))
		},
		destroyScroller: function(t) {
			t.mCustomScrollbar("destroy"), t.removeClass("mCS_destroyed")
		},
		alert: function(t) {
			t = $.extend(!0, {
				container: "",
				place: "append",
				type: "success",
				message: "",
				close: !0,
				reset: !0,
				focus: !0,
				closeInSeconds: 0,
				icon: ""
			}, t);
			var e = mUtil.getUniqueID("App_alert"),
				a = '<div id="' + e + '" class="custom-alerts alert alert-' + t.type + ' fade in">' + (t.close ? '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>' : "") + ("" !== t.icon ? '<i class="fa-lg fa fa-' + t.icon + '"></i>  ' : "") + t.message + "</div>";
			return t.reset && $(".custom-alerts").remove(), t.container ? "append" == t.place ? $(t.container).append(a) : $(t.container).prepend(a) : 1 === $(".page-fixed-main-content").size() ? $(".page-fixed-main-content").prepend(a) : ($("body").hasClass("page-container-bg-solid") || $("body").hasClass("page-content-white")) && 0 === $(".page-head").size() ? $(".page-title").after(a) : $(".page-bar").size() > 0 ? $(".page-bar").after(a) : $(".page-breadcrumb, .breadcrumbs").after(a), t.focus && mApp.scrollTo($("#" + e)), t.closeInSeconds > 0 && setTimeout(function() {
				$("#" + e).remove()
			}, 1e3 * t.closeInSeconds), e
		},
		block: function(t, e) {
			var a, n, o, i = $(t);
			if("spinner" == (e = $.extend(!0, {
					opacity: .03,
					overlayColor: "#000000",
					state: "brand",
					type: "loader",
					size: "lg",
					centerX: !0,
					centerY: !0,
					message: "",
					shadow: !0,
					width: "auto"
				}, e)).type ? o = '<div class="m-spinner ' + (a = e.skin ? "m-spinner--skin-" + e.skin : "") + " " + (n = e.state ? "m-spinner--" + e.state : "") + '"></div' : (a = e.skin ? "m-loader--skin-" + e.skin : "", n = e.state ? "m-loader--" + e.state : "", size = e.size ? "m-loader--" + e.size : "", o = '<div class="m-loader ' + a + " " + n + " " + size + '"></div'), e.message && e.message.length > 0) {
				var l = "m-blockui " + (!1 === e.shadow ? "m-blockui-no-shadow" : "");
				html = '<div class="' + l + '"><span>' + e.message + "</span><span>" + o + "</span></div>";
				i = document.createElement("div");
				mUtil.get("body").prepend(i), mUtil.addClass(i, l), i.innerHTML = "<span>" + e.message + "</span><span>" + o + "</span>", e.width = mUtil.actualWidth(i) + 10, mUtil.remove(i), "body" == t && (html = '<div class="' + l + '" style="margin-left:-' + e.width / 2 + 'px;"><span>' + e.message + "</span><span>" + o + "</span></div>")
			} else html = o;
			var r = {
				message: html,
				centerY: e.centerY,
				centerX: e.centerX,
				css: {
					top: "30%",
					left: "50%",
					border: "0",
					padding: "0",
					backgroundColor: "none",
					width: e.width
				},
				overlayCSS: {
					backgroundColor: e.overlayColor,
					opacity: e.opacity,
					cursor: "wait",
					zIndex: "10"
				},
				onUnblock: function() {
					i && (mUtil.css(i, "position", ""), mUtil.css(i, "zoom", ""))
				}
			};
			"body" == t ? (r.css.top = "50%", $.blockUI(r)) : (i = $(t)).block(r)
		},
		unblock: function(t) {
			t && "body" != t ? $(t).unblock() : $.unblockUI()
		},
		blockPage: function(t) {
			return mApp.block("body", t)
		},
		unblockPage: function() {
			return mApp.unblock("body")
		},
		progress: function(t, e) {
			var a = "m-loader m-loader--" + (e && e.skin ? e.skin : "light") + " m-loader--" + (e && e.alignment ? e.alignment : "right") + " m-loader--" + (e && e.size ? "m-spinner--" + e.size : "");
			mApp.unprogress(t), $(t).addClass(a), $(t).data("progress-classes", a)
		},
		unprogress: function(t) {
			$(t).removeClass($(t).data("progress-classes"))
		},
		getColor: function(e) {
			return t[e]
		}
	}
}();
$(document).ready(function() {
		mApp.init({})
	}),
	function(t) {
		if(void 0 === mUtil) throw new Error("mUtil is required and must be included before mDatatable.");
		t.fn.mDatatable = function(e) {
			if(0 !== t(this).length) {
				var a = this;
				a.debug = !1, a.API = {
					record: null,
					value: null,
					params: null
				};
				var n = {
					isInit: !1,
					offset: 110,
					stateId: "meta",
					ajaxParams: {},
					init: function(e) {
						var o = !1;
						return null === e.data.source && (n.extractTable(), o = !0), n.setupBaseDOM.call(), n.setupDOM(a.table), n.spinnerCallback(!0), n.setDataSourceQuery(n.getOption("data.source.read.params.query")), t(a).on("m-datatable--on-layout-updated", n.afterRender), a.debug && n.stateRemove(n.stateId), t.each(n.getOption("extensions"), function(e, n) {
							"function" == typeof t.fn.mDatatable[e] && new t.fn.mDatatable[e](a, n)
						}), "remote" !== e.data.type && "local" !== e.data.type || ((!1 === e.data.saveState || !1 === e.data.saveState.cookie && !1 === e.data.saveState.webstorage) && n.stateRemove(n.stateId), "local" === e.data.type && "object" == typeof e.data.source && (a.dataSet = a.originalDataSet = n.dataMapCallback(e.data.source)), n.dataRender()), o || (n.setHeadTitle(), n.getOption("layout.footer") && n.setHeadTitle(a.tableFoot)), void 0 !== e.layout.header && !1 === e.layout.header && t(a.table).find("thead").remove(), void 0 !== e.layout.footer && !1 === e.layout.footer && t(a.table).find("tfoot").remove(), null !== e.data.type && "local" !== e.data.type || (n.setupCellField.call(), n.setupTemplateCell.call(), n.setupSubDatatable.call(), n.setupSystemColumn.call(), n.redraw()), t(window).resize(n.fullRender), t(a).height(""), t(n.getOption("search.input")).on("keyup", function(e) {
							n.getOption("search.onEnter") && 13 !== e.which || n.search(t(this).val())
						}), a
					},
					extractTable: function() {
						var n = [],
							o = t(a).find("tr:first-child th").get().map(function(a, o) {
								var i = t(a).data("field");
								void 0 === i && (i = t(a).text().trim());
								var l = {
									field: i,
									title: i
								};
								for(var r in e.columns) e.columns[r].field === i && (l = t.extend(!0, {}, e.columns[r], l));
								return n.push(l), i
							});
						e.columns = n;
						var i = [],
							l = [];
						t(a).find("tr").each(function() {
							t(this).find("td").length && i.push(t(this).prop("attributes"));
							var e = {};
							t(this).find("td").each(function(t, a) {
								e[o[t]] = a.innerHTML.trim()
							}), mUtil.isEmpty(e) || l.push(e)
						}), e.data.attr.rowProps = i, e.data.source = l
					},
					layoutUpdate: function() {
						n.setupSubDatatable.call(), n.setupSystemColumn.call(), n.setupHover.call(), void 0 === e.detail && 1 === n.getDepth() && n.lockTable.call(), n.columnHide.call(), n.resetScroll(), n.isInit || (t(a).trigger("m-datatable--on-init", {
							table: t(a.wrap).attr("id"),
							options: e
						}), n.isInit = !0), t(a).trigger("m-datatable--on-layout-updated", {
							table: t(a.wrap).attr("id")
						})
					},
					lockTable: function() {
						var e = {
							lockEnabled: !1,
							init: function() {
								e.lockEnabled = n.lockEnabledColumns(), 0 === e.lockEnabled.left.length && 0 === e.lockEnabled.right.length || e.enable()
							},
							enable: function() {
								t(a.table).find("thead,tbody,tfoot").each(function() {
									var o = this;
									0 === t(this).find(".m-datatable__lock").length && t(this).ready(function() {
										! function(o) {
											if(t(o).find(".m-datatable__lock").length > 0) n.log("Locked container already exist in: ", o);
											else if(0 !== t(o).find(".m-datatable__row").length) {
												var i = t("<div/>").addClass("m-datatable__lock m-datatable__lock--left"),
													l = t("<div/>").addClass("m-datatable__lock m-datatable__lock--scroll"),
													r = t("<div/>").addClass("m-datatable__lock m-datatable__lock--right");
												t(o).find(".m-datatable__row").each(function() {
													var e = t("<tr/>").addClass("m-datatable__row").appendTo(i),
														a = t("<tr/>").addClass("m-datatable__row").appendTo(l),
														n = t("<tr/>").addClass("m-datatable__row").appendTo(r);
													t(this).find(".m-datatable__cell").each(function() {
														var o = t(this).data("locked");
														void 0 !== o ? (void 0 === o.left && !0 !== o || t(this).appendTo(e), void 0 !== o.right && t(this).appendTo(n)) : t(this).appendTo(a)
													}), t(this).remove()
												}), e.lockEnabled.left.length > 0 && (t(a.wrap).addClass("m-datatable--lock"), t(i).appendTo(o)), (e.lockEnabled.left.length > 0 || e.lockEnabled.right.length > 0) && t(l).appendTo(o), e.lockEnabled.right.length > 0 && (t(a.wrap).addClass("m-datatable--lock"), t(r).appendTo(o))
											} else n.log("No row exist in: ", o)
										}(o)
									})
								})
							}
						};
						return e.init(), e
					},
					fullRender: function() {
						n.spinnerCallback(!0), t(a.wrap).removeClass("m-datatable--loaded"), n.insertData()
					},
					lockEnabledColumns: function() {
						var a = t(window).width(),
							n = e.columns,
							o = {
								left: [],
								right: []
							};
						return t.each(n, function(t, e) {
							void 0 !== e.locked && (void 0 !== e.locked.left && mUtil.getBreakpoint(e.locked.left) <= a && o.left.push(e.locked.left), void 0 !== e.locked.right && mUtil.getBreakpoint(e.locked.right) <= a && o.right.push(e.locked.right))
						}), o
					},
					afterRender: function(e, o) {
						o.table == t(a.wrap).attr("id") && t(a).ready(function() {
							n.isLocked() || (n.redraw(), n.getOption("rows.autoHide") && (n.autoHide(), t(a.table).find(".m-datatable__row").css("height", ""))), t(a.tableBody).find(".m-datatable__row").removeClass("m-datatable__row--even"), t(a.wrap).hasClass("m-datatable--subtable") ? t(a.tableBody).find(".m-datatable__row:not(.m-datatable__row-detail):even").addClass("m-datatable__row--even") : t(a.tableBody).find(".m-datatable__row:nth-child(even)").addClass("m-datatable__row--even"), n.isLocked() && n.redraw(), t(a.tableBody).css("visibility", ""), t(a.wrap).addClass("m-datatable--loaded"), n.scrollbar.call(), n.sorting.call(), n.spinnerCallback(!1)
						})
					},
					hoverTimer: 0,
					isScrolling: !1,
					setupHover: function() {
						t(window).scroll(function(t) {
							clearTimeout(n.hoverTimer), n.isScrolling = !0
						}), t(a.tableBody).find(".m-datatable__cell").off("mouseenter", "mouseleave").on("mouseenter", function() {
							if(n.hoverTimer = setTimeout(function() {
									n.isScrolling = !1
								}, 200), !n.isScrolling) {
								var e = t(this).closest(".m-datatable__row").addClass("m-datatable__row--hover"),
									a = t(e).index() + 1;
								t(e).closest(".m-datatable__lock").parent().find(".m-datatable__row:nth-child(" + a + ")").addClass("m-datatable__row--hover")
							}
						}).on("mouseleave", function() {
							var e = t(this).closest(".m-datatable__row").removeClass("m-datatable__row--hover"),
								a = t(e).index() + 1;
							t(e).closest(".m-datatable__lock").parent().find(".m-datatable__row:nth-child(" + a + ")").removeClass("m-datatable__row--hover")
						})
					},
					adjustLockContainer: function() {
						if(!n.isLocked()) return 0;
						var e = t(a.tableHead).width(),
							o = t(a.tableHead).find(".m-datatable__lock--left").width(),
							i = t(a.tableHead).find(".m-datatable__lock--right").width();
						void 0 === o && (o = 0), void 0 === i && (i = 0);
						var l = Math.floor(e - o - i);
						return t(a.table).find(".m-datatable__lock--scroll").css("width", l), l
					},
					dragResize: function() {
						var e, n, o = !1,
							i = void 0;
						t(a.tableHead).find(".m-datatable__cell").mousedown(function(a) {
							i = t(this), o = !0, e = a.pageX, n = t(this).width(), t(i).addClass("m-datatable__cell--resizing")
						}).mousemove(function(l) {
							if(o) {
								var r = t(i).index(),
									s = t(a.tableBody),
									d = t(i).closest(".m-datatable__lock");
								if(d) {
									var c = t(d).index();
									s = t(a.tableBody).find(".m-datatable__lock").eq(c)
								}
								t(s).find(".m-datatable__row").each(function(a, o) {
									t(o).find(".m-datatable__cell").eq(r).width(n + (l.pageX - e)).children().width(n + (l.pageX - e))
								}), t(i).children().css("width", n + (l.pageX - e))
							}
						}).mouseup(function() {
							t(i).removeClass("m-datatable__cell--resizing"), o = !1
						}), t(document).mouseup(function() {
							t(i).removeClass("m-datatable__cell--resizing"), o = !1
						})
					},
					initHeight: function() {
						if(e.layout.height && e.layout.scroll) {
							var n = t(a.tableHead).find(".m-datatable__row").height(),
								o = t(a.tableFoot).find(".m-datatable__row").height(),
								i = e.layout.height;
							n > 0 && (i -= n), o > 0 && (i -= o), t(a.tableBody).css("max-height", i)
						}
					},
					setupBaseDOM: function() {
						a.initialDatatable = t(a).clone(), "TABLE" === t(a).prop("tagName") ? (a.table = t(a).removeClass("m-datatable").addClass("m-datatable__table"), 0 === t(a.table).parents(".m-datatable").length && (a.table.wrap(t("<div/>").addClass("m-datatable").addClass("m-datatable--" + e.layout.theme)), a.wrap = t(a.table).parent())) : (a.wrap = t(a).addClass("m-datatable").addClass("m-datatable--" + e.layout.theme), a.table = t("<table/>").addClass("m-datatable__table").appendTo(a)), void 0 !== e.layout.class && t(a.wrap).addClass(e.layout.class), t(a.table).removeClass("m-datatable--destroyed").css("display", "block"), void 0 === t(a).attr("id") && (n.setOption("data.saveState", !1), t(a.table).attr("id", mUtil.getUniqueID("m-datatable--"))), n.getOption("layout.minHeight") && t(a.table).css("min-height", n.getOption("layout.minHeight")), n.getOption("layout.height") && t(a.table).css("max-height", n.getOption("layout.height")), null === e.data.type && t(a.table).css("width", "").css("display", ""), a.tableHead = t(a.table).find("thead"), 0 === t(a.tableHead).length && (a.tableHead = t("<thead/>").prependTo(a.table)), a.tableBody = t(a.table).find("tbody"), 0 === t(a.tableBody).length && (a.tableBody = t("<tbody/>").appendTo(a.table)), void 0 !== e.layout.footer && e.layout.footer && (a.tableFoot = t(a.table).find("tfoot"), 0 === t(a.tableFoot).length && (a.tableFoot = t("<tfoot/>").appendTo(a.table)))
					},
					setupCellField: function(n) {
						void 0 === n && (n = t(a.table).children());
						var o = e.columns;
						t.each(n, function(e, a) {
							t(a).find(".m-datatable__row").each(function(e, a) {
								t(a).find(".m-datatable__cell").each(function(e, a) {
									void 0 !== o[e] && t(a).data(o[e])
								})
							})
						})
					},
					setupTemplateCell: function(o) {
						void 0 === o && (o = a.tableBody);
						var i = e.columns;
						t(o).find(".m-datatable__row").each(function(e, o) {
							var l = t(o).data("obj") || {},
								r = n.getOption("rows.callback");
							"function" == typeof r && r(t(o), l, e);
							var s = n.getOption("rows.beforeTemplate");
							"function" == typeof s && s(t(o), l, e), void 0 === l && (l = {}, t(o).find(".m-datatable__cell").each(function(e, a) {
								var n = t.grep(i, function(e, n) {
									return t(a).data("field") === e.field
								})[0];
								void 0 !== n && (l[n.field] = t(a).text())
							})), t(o).find(".m-datatable__cell").each(function(o, r) {
								var s = t.grep(i, function(e, a) {
									return t(r).data("field") === e.field
								})[0];
								if(void 0 !== s && void 0 !== s.template) {
									var d = "";
									"string" == typeof s.template && (d = n.dataPlaceholder(s.template, l)), "function" == typeof s.template && (d = s.template(l, e, a));
									var c = document.createElement("span");
									c.innerHTML = d, t(r).html(c), void 0 !== s.overflow && (t(c).css("overflow", s.overflow), t(c).css("position", "relative"))
								}
							});
							var d = n.getOption("rows.afterTemplate");
							"function" == typeof d && d(t(o), l, e)
						})
					},
					setupSystemColumn: function() {
						if(a.dataSet = a.dataSet || [], 0 !== a.dataSet.length) {
							var o = e.columns;
							t(a.tableBody).find(".m-datatable__row").each(function(e, a) {
								t(a).find(".m-datatable__cell").each(function(e, a) {
									var i = t.grep(o, function(e, n) {
										return t(a).data("field") === e.field
									})[0];
									if(void 0 !== i) {
										var l = t(a).text();
										if(void 0 !== i.selector && !1 !== i.selector) {
											if(t(a).find('.m-checkbox [type="checkbox"]').length > 0) return;
											t(a).addClass("m-datatable__cell--check");
											var r = t("<label/>").addClass("m-checkbox m-checkbox--single").append(t("<input/>").attr("type", "checkbox").attr("value", l).on("click", function() {
												t(this).is(":checked") ? n.setActive(this) : n.setInactive(this)
											})).append(t("<span/>"));
											void 0 !== i.selector.class && t(r).addClass(i.selector.class), t(a).children().html(r)
										}
										if(void 0 !== i.subtable && i.subtable) {
											if(t(a).find(".m-datatable__toggle-subtable").length > 0) return;
											t(a).children().html(t("<a/>").addClass("m-datatable__toggle-subtable").attr("href", "#").attr("data-value", l).append(t("<i/>").addClass(n.getOption("layout.icons.rowDetail.collapse"))))
										}
									}
								})
							});
							var i = function(e) {
								var a = t.grep(o, function(t, e) {
									return void 0 !== t.selector && !1 !== t.selector
								})[0];
								if(void 0 !== a && void 0 !== a.selector && !1 !== a.selector) {
									var i = t(e).find('[data-field="' + a.field + '"]');
									if(t(i).find('.m-checkbox [type="checkbox"]').length > 0) return;
									t(i).addClass("m-datatable__cell--check");
									var l = t("<label/>").addClass("m-checkbox m-checkbox--single m-checkbox--all").append(t("<input/>").attr("type", "checkbox").on("click", function() {
										t(this).is(":checked") ? n.setActiveAll(!0) : n.setActiveAll(!1)
									})).append(t("<span/>"));
									void 0 !== a.selector.class && t(l).addClass(a.selector.class), t(i).children().html(l)
								}
							};
							e.layout.header && i(t(a.tableHead).find(".m-datatable__row").first()), e.layout.footer && i(t(a.tableFoot).find(".m-datatable__row").first())
						}
					},
					adjustCellsWidth: function() {
						var e = t(a.tableHead).width(),
							o = t(a.tableHead).find(".m-datatable__row:first-child").find(".m-datatable__cell:visible").length;
						if(o > 0) {
							e -= 20 * o;
							var i = Math.floor(e / o);
							i <= n.offset && (i = n.offset), t(a.table).find(".m-datatable__row").find(".m-datatable__cell:visible").each(function(e, a) {
								var n = i,
									o = t(a).data("width");
								void 0 !== o && (n = o), t(a).children().css("width", parseInt(n))
							})
						}
						return a
					},
					adjustCellsHeight: function() {
						t.each(t(a.table).children(), function(e, a) {
							for(var n = t(a).find(".m-datatable__row").first().parent().find(".m-datatable__row").length, o = 1; o <= n; o++) {
								var i = t(a).find(".m-datatable__row:nth-child(" + o + ")");
								if(t(i).length > 0) {
									var l = Math.max.apply(null, t(i).map(function() {
										return t(this).height()
									}).get());
									t(i).css("height", Math.ceil(parseInt(l)))
								}
							}
						})
					},
					setupDOM: function(e) {
						t(e).find("> thead").addClass("m-datatable__head"), t(e).find("> tbody").addClass("m-datatable__body"), t(e).find("> tfoot").addClass("m-datatable__foot"), t(e).find("tr").addClass("m-datatable__row"), t(e).find("tr > th, tr > td").addClass("m-datatable__cell"), t(e).find("tr > th, tr > td").each(function(e, a) {
							0 === t(a).find("span").length && t(a).wrapInner(t("<span/>").css("width", n.offset))
						})
					},
					scrollbar: function() {
						var o = {
							scrollable: null,
							tableLocked: null,
							mcsOptions: {
								scrollInertia: 0,
								autoDraggerLength: !0,
								autoHideScrollbar: !0,
								autoExpandScrollbar: !1,
								alwaysShowScrollbar: 0,
								mouseWheel: {
									scrollAmount: 120,
									preventDefault: !1
								},
								advanced: {
									updateOnContentResize: !0,
									autoExpandHorizontalScroll: !0
								},
								theme: "minimal-dark"
							},
							init: function() {
								n.destroyScroller(o.scrollable);
								var i = mUtil.getViewPort().width;
								if(e.layout.scroll) {
									t(a.wrap).addClass("m-datatable--scroll");
									var l = t(a.tableBody).find(".m-datatable__lock--scroll");
									t(l).find(".m-datatable__row").length > 0 && t(l).length > 0 ? (o.scrollHead = t(a.tableHead).find("> .m-datatable__lock--scroll > .m-datatable__row"), o.scrollFoot = t(a.tableFoot).find("> .m-datatable__lock--scroll > .m-datatable__row"), o.tableLocked = t(a.tableBody).find(".m-datatable__lock:not(.m-datatable__lock--scroll)"), i > mUtil.getBreakpoint("lg") ? o.mCustomScrollbar(l) : o.defaultScrollbar(l)) : t(a.tableBody).find(".m-datatable__row").length > 0 && (o.scrollHead = t(a.tableHead).find("> .m-datatable__row"), o.scrollFoot = t(a.tableFoot).find("> .m-datatable__row"), i > mUtil.getBreakpoint("lg") ? o.mCustomScrollbar(a.tableBody) : o.defaultScrollbar(a.tableBody))
								} else t(a.table).css("overflow-x", "auto")
							},
							defaultScrollbar: function(e) {
								t(e).css("overflow", "auto").css("max-height", n.getOption("layout.height")).on("scroll", o.onScrolling)
							},
							onScrolling: function(e) {
								var a = t(this).scrollLeft(),
									n = t(this).scrollTop();
								t(o.scrollHead).css("left", -a), t(o.scrollFoot).css("left", -a), t(o.tableLocked).each(function(e, a) {
									t(a).css("top", -n)
								})
							},
							mCustomScrollbar: function(e) {
								o.scrollable = e;
								var i = "xy";
								null === n.getOption("layout.height") && (i = "x");
								var l = t.extend({}, o.mcsOptions, {
									axis: i,
									setHeight: t(a.tableBody).height(),
									callbacks: {
										whileScrolling: function() {
											var e = this.mcs;
											t(o.scrollHead).css("left", e.left), t(o.scrollFoot).css("left", e.left), t(o.tableLocked).each(function(a, n) {
												t(n).css("top", e.top)
											}), clearTimeout(n.hoverTimer), n.isScrolling = !0
										}
									}
								});
								!0 === n.getOption("layout.smoothScroll.scrollbarShown") && t(e).attr("data-scrollbar-shown", "true"), n.mCustomScrollbar(e, l)
							}
						};
						return o.init(), o
					},
					mCustomScrollbar: function(e, o) {
						t(a.tableBody).css("overflow", ""), n.destroyScroller(t(a.table).find(".mCustomScrollbar")), t(e).mCustomScrollbar(o)
					},
					setHeadTitle: function(o) {
						void 0 === o && (o = a.tableHead), o = t(o)[0];
						var i = e.columns,
							l = o.getElementsByTagName("tr")[0],
							r = o.getElementsByTagName("td");
						void 0 === l && (l = document.createElement("tr"), o.appendChild(l)), t.each(i, function(e, n) {
							var o = r[e];
							if(void 0 === o && (o = document.createElement("th"), l.appendChild(o)), void 0 !== n.title && (o.innerHTML = n.title, o.setAttribute("data-field", n.field), mUtil.addClass(o, n.class), t(o).data(n)), void 0 !== n.attr && t.each(n.attr, function(t, e) {
									o.setAttribute(t, e)
								}), void 0 !== n.textAlign) {
								var i = void 0 !== a.textAlign[n.textAlign] ? a.textAlign[n.textAlign] : "";
								mUtil.addClass(o, i)
							}
						}), n.setupDOM(o)
					},
					dataRender: function(o) {
						t(a.table).siblings(".m-datatable__pager").removeClass("m-datatable--paging-loaded");
						var i = function() {
								a.dataSet = a.dataSet || [], n.localDataUpdate();
								var o = n.getDataSourceParam("pagination");
								0 === o.perpage && (o.perpage = e.data.pageSize || 10), o.total = a.dataSet.length;
								var i = Math.max(o.perpage * (o.page - 1), 0),
									l = Math.min(i + o.perpage, o.total);
								return a.dataSet = t(a.dataSet).slice(i, l), o
							},
							l = function(o) {
								var l = function(e, o) {
									t(e.pager).hasClass("m-datatable--paging-loaded") || (t(e.pager).remove(), e.init(o)), t(e.pager).off().on("m-datatable--on-goto-page", function(a) {
										t(e.pager).remove(), e.init(o)
									});
									var i = Math.max(o.perpage * (o.page - 1), 0),
										l = Math.min(i + o.perpage, o.total);
									n.localDataUpdate(), a.dataSet = t(a.dataSet).slice(i, l), n.insertData()
								};
								if(t(a.wrap).removeClass("m-datatable--error"), e.pagination)
									if(e.data.serverPaging && "local" !== e.data.type) {
										var r = n.getObject("meta", o || null);
										null !== r ? n.paging(r) : n.paging(i(), l)
									} else n.paging(i(), l);
								else n.localDataUpdate();
								n.insertData()
							};
						"local" === e.data.type || void 0 === e.data.source.read && null !== a.dataSet || !1 === e.data.serverSorting && "sort" === o || !1 === e.data.serverFiltering && "search" === o ? l() : n.getData().done(l)
					},
					insertData: function() {
						a.dataSet = a.dataSet || [];
						var o = n.getDataSourceParam(),
							i = o.pagination,
							l = (Math.max(i.page, 1) - 1) * i.perpage,
							r = Math.min(i.page, i.pages) * i.perpage,
							s = {};
						void 0 !== e.data.attr.rowProps && e.data.attr.rowProps.length && (s = e.data.attr.rowProps.slice(l, r));
						var d = document.createElement("tbody");
						d.style.visibility = "hidden";
						var c = e.columns.length;
						if(t.each(a.dataSet, function(i, l) {
								var r = document.createElement("tr");
								r.setAttribute("data-row", i), t(r).data("obj", l), void 0 !== s[i] && t.each(s[i], function() {
									r.setAttribute(this.name, this.value)
								});
								for(var m = 0; m < c; m += 1) {
									var u = e.columns[m],
										p = [];
									if(n.getObject("sort.field", o) === u.field && p.push("m-datatable__cell--sorted"), void 0 !== u.textAlign) {
										var f = void 0 !== a.textAlign[u.textAlign] ? a.textAlign[u.textAlign] : "";
										p.push(f)
									}
									void 0 !== u.class && p.push(u.class);
									var g = document.createElement("td");
									mUtil.addClass(g, p.join(" ")), g.setAttribute("data-field", u.field), g.innerHTML = n.getObject(u.field, l), r.appendChild(g)
								}
								d.appendChild(r)
							}), 0 === a.dataSet.length) {
							n.destroyScroller(t(a.table).find(".mCustomScrollbar"));
							var m = document.createElement("span");
							mUtil.addClass(m, "m-datatable--error"), m.innerHTML = n.getOption("translate.records.noRecords"), d.appendChild(m), t(a.wrap).addClass("m-datatable--error m-datatable--loaded"), n.spinnerCallback(!1)
						}
						t(a.tableBody).replaceWith(d), a.tableBody = d, n.setupDOM(a.table), n.setupCellField([a.tableBody]), n.setupTemplateCell(a.tableBody), n.layoutUpdate()
					},
					updateTableComponents: function() {
						a.tableHead = t(a.table).children("thead"), a.tableBody = t(a.table).children("tbody"), a.tableFoot = t(a.table).children("tfoot")
					},
					getData: function() {
						n.spinnerCallback(!0);
						var o = {
							dataType: "json",
							method: "GET",
							data: {},
							timeout: n.getOption("data.source.read.timeout") || 3e4
						};
						if("local" === e.data.type && (o.url = e.data.source), "remote" === e.data.type) {
							o.url = n.getOption("data.source.read.url"), "string" != typeof o.url && (o.url = n.getOption("data.source.read")), "string" != typeof o.url && (o.url = n.getOption("data.source")), o.headers = n.getOption("data.source.read.headers"), o.method = n.getOption("data.source.read.method") || "POST";
							var i = n.getDataSourceParam();
							n.getOption("data.serverPaging") || delete i.pagination, n.getOption("data.serverSorting") || delete i.sort, o.data = t.extend(!0, o.data, i, n.getOption("data.source.read.params"))
						}
						return t.ajax(o).done(function(e, o, i) {
							a.lastResponse = e, a.dataSet = a.originalDataSet = n.dataMapCallback(e), n.setAutoColumns(), t(a).trigger("m-datatable--on-ajax-done", [a.dataSet])
						}).fail(function(e, o, i) {
							n.destroyScroller(t(a.table).find(".mCustomScrollbar")), t(a).trigger("m-datatable--on-ajax-fail", [e]), t(a.tableBody).html(t("<span/>").addClass("m-datatable--error").html(n.getOption("translate.records.noRecords"))), t(a.wrap).addClass("m-datatable--error m-datatable--loaded"), n.spinnerCallback(!1)
						}).always(function() {})
					},
					paging: function(e, o) {
						var i = {
							meta: null,
							pager: null,
							paginateEvent: null,
							pagerLayout: {
								pagination: null,
								info: null
							},
							callback: null,
							init: function(e) {
								i.meta = e, i.meta.pages = Math.max(Math.ceil(i.meta.total / i.meta.perpage), 1), i.meta.page > i.meta.pages && (i.meta.page = i.meta.pages), i.paginateEvent = n.getTablePrefix(), i.pager = t(a.table).siblings(".m-datatable__pager"), t(i.pager).hasClass("m-datatable--paging-loaded") || (t(i.pager).remove(), 0 !== i.meta.pages && (n.setDataSourceParam("pagination", {
									page: i.meta.page,
									pages: i.meta.pages,
									perpage: i.meta.perpage,
									total: i.meta.total
								}), i.callback = i.serverCallback, "function" == typeof o && (i.callback = o), i.addPaginateEvent(), i.populate(), i.meta.page = Math.max(i.meta.page || 1, i.meta.page), t(a).trigger(i.paginateEvent, i.meta), i.pagingBreakpoint.call(), t(window).resize(i.pagingBreakpoint)))
							},
							serverCallback: function(t, e) {
								n.dataRender()
							},
							populate: function() {
								var e = n.getOption("layout.icons.pagination"),
									o = n.getOption("translate.toolbar.pagination.items.default");
								i.pager = t("<div/>").addClass("m-datatable__pager m-datatable--paging-loaded clearfix");
								var l = t("<ul/>").addClass("m-datatable__pager-nav");
								i.pagerLayout.pagination = l, t("<li/>").append(t("<a/>").attr("title", o.first).addClass("m-datatable__pager-link m-datatable__pager-link--first").append(t("<i/>").addClass(e.first)).on("click", i.gotoMorePage).attr("data-page", 1)).appendTo(l), t("<li/>").append(t("<a/>").attr("title", o.prev).addClass("m-datatable__pager-link m-datatable__pager-link--prev").append(t("<i/>").addClass(e.prev)).on("click", i.gotoMorePage)).appendTo(l), t("<li/>").append(t("<a/>").attr("title", o.more).addClass("m-datatable__pager-link m-datatable__pager-link--more-prev").html(t("<i/>").addClass(e.more)).on("click", i.gotoMorePage)).appendTo(l), t("<li/>").append(t("<input/>").attr("type", "text").addClass("m-pager-input form-control").attr("title", o.input).on("keyup", function() {
									t(this).attr("data-page", Math.abs(t(this).val()))
								}).on("keypress", function(t) {
									13 === t.which && i.gotoMorePage(t)
								})).appendTo(l);
								var r = n.getOption("toolbar.items.pagination.pages.desktop.pagesNumber"),
									s = Math.ceil(i.meta.page / r) * r,
									d = s - r;
								s > i.meta.pages && (s = i.meta.pages);
								for(var c = d; c < s; c++) {
									var m = c + 1;
									t("<li/>").append(t("<a/>").addClass("m-datatable__pager-link m-datatable__pager-link-number").text(m).attr("data-page", m).attr("title", m).on("click", i.gotoPage)).appendTo(l)
								}
								t("<li/>").append(t("<a/>").attr("title", o.more).addClass("m-datatable__pager-link m-datatable__pager-link--more-next").html(t("<i/>").addClass(e.more)).on("click", i.gotoMorePage)).appendTo(l), t("<li/>").append(t("<a/>").attr("title", o.next).addClass("m-datatable__pager-link m-datatable__pager-link--next").append(t("<i/>").addClass(e.next)).on("click", i.gotoMorePage)).appendTo(l), t("<li/>").append(t("<a/>").attr("title", o.last).addClass("m-datatable__pager-link m-datatable__pager-link--last").append(t("<i/>").addClass(e.last)).on("click", i.gotoMorePage).attr("data-page", i.meta.pages)).appendTo(l), n.getOption("toolbar.items.info") && (i.pagerLayout.info = t("<div/>").addClass("m-datatable__pager-info").append(t("<span/>").addClass("m-datatable__pager-detail"))), t.each(n.getOption("toolbar.layout"), function(e, a) {
									t(i.pagerLayout[a]).appendTo(i.pager)
								});
								var u = t("<select/>").addClass("selectpicker m-datatable__pager-size").attr("title", n.getOption("translate.toolbar.pagination.items.default.select")).attr("data-width", "70px").val(i.meta.perpage).on("change", i.updatePerpage).prependTo(i.pagerLayout.info),
									p = n.getOption("toolbar.items.pagination.pageSizeSelect");
								0 == p.length && (p = [10, 20, 30, 50, 100]), t.each(p, function(e, a) {
									var n = a; - 1 === a && (n = "All"), t("<option/>").attr("value", a).html(n).appendTo(u)
								}), t(a).ready(function() {
									t(".selectpicker").selectpicker().siblings(".dropdown-toggle").attr("title", n.getOption("translate.toolbar.pagination.items.default.select"))
								}), i.paste()
							},
							paste: function() {
								t.each(t.unique(n.getOption("toolbar.placement")), function(e, n) {
									"bottom" === n && t(i.pager).clone(!0).insertAfter(a.table), "top" === n && t(i.pager).clone(!0).addClass("m-datatable__pager--top").insertBefore(a.table)
								})
							},
							gotoMorePage: function(e) {
								if(e.preventDefault(), "disabled" === t(this).attr("disabled")) return !1;
								var a = t(this).attr("data-page");
								return void 0 === a && (a = t(e.target).attr("data-page")), i.openPage(parseInt(a)), !1
							},
							gotoPage: function(e) {
								e.preventDefault(), t(this).hasClass("m-datatable__pager-link--active") || i.openPage(parseInt(t(this).data("page")))
							},
							openPage: function(e) {
								i.meta.page = parseInt(e), t(a).trigger(i.paginateEvent, i.meta), i.callback(i, i.meta), t(i.pager).trigger("m-datatable--on-goto-page", i.meta)
							},
							updatePerpage: function(e) {
								e.preventDefault(), null === n.getOption("layout.height") && t("html, body").animate({
									scrollTop: t(a).position().top
								}), i.pager = t(a.table).siblings(".m-datatable__pager").removeClass("m-datatable--paging-loaded"), e.originalEvent && (i.meta.perpage = parseInt(t(this).val())), t(i.pager).find("select.m-datatable__pager-size").val(i.meta.perpage).attr("data-selected", i.meta.perpage), n.setDataSourceParam("pagination", {
									page: i.meta.page,
									pages: i.meta.pages,
									perpage: i.meta.perpage,
									total: i.meta.total
								}), t(i.pager).trigger("m-datatable--on-update-perpage", i.meta), t(a).trigger(i.paginateEvent, i.meta), i.callback(i, i.meta), i.updateInfo.call()
							},
							addPaginateEvent: function(e) {
								t(a).off(i.paginateEvent).on(i.paginateEvent, function(e, o) {
									n.spinnerCallback(!0), i.pager = t(a.table).siblings(".m-datatable__pager");
									var l = t(i.pager).find(".m-datatable__pager-nav");
									t(l).find(".m-datatable__pager-link--active").removeClass("m-datatable__pager-link--active"), t(l).find('.m-datatable__pager-link-number[data-page="' + o.page + '"]').addClass("m-datatable__pager-link--active"), t(l).find(".m-datatable__pager-link--prev").attr("data-page", Math.max(o.page - 1, 1)), t(l).find(".m-datatable__pager-link--next").attr("data-page", Math.min(o.page + 1, o.pages)), t(i.pager).each(function() {
										t(this).find('.m-pager-input[type="text"]').prop("value", o.page)
									}), t(i.pager).find(".m-datatable__pager-nav").show(), o.pages <= 1 && t(i.pager).find(".m-datatable__pager-nav").hide(), n.setDataSourceParam("pagination", {
										page: i.meta.page,
										pages: i.meta.pages,
										perpage: i.meta.perpage,
										total: i.meta.total
									}), t(i.pager).find("select.m-datatable__pager-size").val(o.perpage).attr("data-selected", o.perpage), t(a.table).find('.m-checkbox > [type="checkbox"]').prop("checked", !1), t(a.table).find(".m-datatable__row--active").removeClass("m-datatable__row--active"), i.updateInfo.call(), i.pagingBreakpoint.call()
								})
							},
							updateInfo: function() {
								var e = Math.max(i.meta.perpage * (i.meta.page - 1) + 1, 1),
									a = Math.min(e + i.meta.perpage - 1, i.meta.total);
								t(i.pager).find(".m-datatable__pager-info").find(".m-datatable__pager-detail").html(n.dataPlaceholder(n.getOption("translate.toolbar.pagination.items.info"), {
									start: e,
									end: -1 === i.meta.perpage ? i.meta.total : a,
									pageSize: -1 === i.meta.perpage || i.meta.perpage >= i.meta.total ? i.meta.total : i.meta.perpage,
									total: i.meta.total
								}))
							},
							pagingBreakpoint: function() {
								var e = t(a.table).siblings(".m-datatable__pager").find(".m-datatable__pager-nav");
								if(0 !== t(e).length) {
									var o = n.getCurrentPage(),
										l = t(e).find(".m-pager-input").closest("li");
									t(e).find("li").show(), t.each(n.getOption("toolbar.items.pagination.pages"), function(a, r) {
										if(mUtil.isInResponsiveRange(a)) {
											switch(a) {
												case "desktop":
												case "tablet":
													Math.ceil(o / r.pagesNumber), r.pagesNumber, r.pagesNumber;
													t(l).hide(), i.meta = n.getDataSourceParam("pagination"), i.paginationUpdate();
													break;
												case "mobile":
													t(l).show(), t(e).find(".m-datatable__pager-link--more-prev").closest("li").hide(), t(e).find(".m-datatable__pager-link--more-next").closest("li").hide(), t(e).find(".m-datatable__pager-link-number").closest("li").hide()
											}
											return !1
										}
									})
								}
							},
							paginationUpdate: function() {
								var e = t(a.table).siblings(".m-datatable__pager").find(".m-datatable__pager-nav"),
									o = t(e).find(".m-datatable__pager-link--more-prev"),
									l = t(e).find(".m-datatable__pager-link--more-next"),
									r = t(e).find(".m-datatable__pager-link--first"),
									s = t(e).find(".m-datatable__pager-link--prev"),
									d = t(e).find(".m-datatable__pager-link--next"),
									c = t(e).find(".m-datatable__pager-link--last"),
									m = t(e).find(".m-datatable__pager-link-number"),
									u = Math.max(t(m).first().data("page") - 1, 1);
								t(o).each(function(e, a) {
									t(a).attr("data-page", u)
								}), 1 === u ? t(o).parent().hide() : t(o).parent().show();
								var p = Math.min(t(m).last().data("page") + 1, i.meta.pages);
								t(l).each(function(e, a) {
									t(l).attr("data-page", p).show()
								}), p === i.meta.pages && p === t(m).last().data("page") ? t(l).parent().hide() : t(l).parent().show(), 1 === i.meta.page ? (t(r).attr("disabled", !0).addClass("m-datatable__pager-link--disabled"), t(s).attr("disabled", !0).addClass("m-datatable__pager-link--disabled")) : (t(r).removeAttr("disabled").removeClass("m-datatable__pager-link--disabled"), t(s).removeAttr("disabled").removeClass("m-datatable__pager-link--disabled")), i.meta.page === i.meta.pages ? (t(d).attr("disabled", !0).addClass("m-datatable__pager-link--disabled"), t(c).attr("disabled", !0).addClass("m-datatable__pager-link--disabled")) : (t(d).removeAttr("disabled").removeClass("m-datatable__pager-link--disabled"), t(c).removeAttr("disabled").removeClass("m-datatable__pager-link--disabled"));
								var f = n.getOption("toolbar.items.pagination.navigation");
								f.first || t(r).remove(), f.prev || t(s).remove(), f.next || t(d).remove(), f.last || t(c).remove()
							}
						};
						return i.init(e), i
					},
					columnHide: function() {
						var n = mUtil.getViewPort().width;
						t.each(e.columns, function(e, o) {
							if(void 0 !== o.responsive) {
								var i = o.field,
									l = t.grep(t(a.table).find(".m-datatable__cell"), function(e, a) {
										return i === t(e).data("field")
									});
								mUtil.getBreakpoint(o.responsive.hidden) >= n ? t(l).hide() : t(l).show(), mUtil.getBreakpoint(o.responsive.visible) <= n ? t(l).show() : t(l).hide()
							}
						})
					},
					setupSubDatatable: function() {
						var o = n.getOption("detail.content");
						if("function" == typeof o && !(t(a.table).find(".m-datatable__subtable").length > 0)) {
							t(a.wrap).addClass("m-datatable--subtable"), e.columns[0].subtable = !0;
							var i = function(i) {
									i.preventDefault();
									var l = t(this).closest(".m-datatable__row"),
										r = t(l).next(".m-datatable__row-subtable");
									0 === t(r).length && (r = t("<tr/>").addClass("m-datatable__row-subtable m-datatable__row-loading").hide().append(t("<td/>").addClass("m-datatable__subtable").attr("colspan", n.getTotalColumns())), t(l).after(r), t(l).hasClass("m-datatable__row--even") && t(r).addClass("m-datatable__row-subtable--even")), t(r).toggle();
									var s = t(r).find(".m-datatable__subtable"),
										d = t(this).closest("[data-field]:first-child").find(".m-datatable__toggle-subtable").data("value"),
										c = t(this).find("i").removeAttr("class");
									t(l).hasClass("m-datatable__row--subtable-expanded") ? (t(c).addClass(n.getOption("layout.icons.rowDetail.collapse")), t(l).removeClass("m-datatable__row--subtable-expanded"), t(a).trigger("m-datatable--on-collapse-subtable", [l])) : (t(c).addClass(n.getOption("layout.icons.rowDetail.expand")), t(l).addClass("m-datatable__row--subtable-expanded"), t(a).trigger("m-datatable--on-expand-subtable", [l])), 0 === t(s).find(".m-datatable").length && (t.map(a.dataSet, function(t, a) {
										return d === t[e.columns[0].field] && (i.data = t, !0)
									}), i.detailCell = s, i.parentRow = l, i.subTable = s, o(i), t(s).children(".m-datatable").on("m-datatable--on-init", function(e) {
										t(r).removeClass("m-datatable__row-loading")
									}), "local" === n.getOption("data.type") && t(r).removeClass("m-datatable__row-loading"))
								},
								l = e.columns;
							t(a.tableBody).find(".m-datatable__row").each(function(e, a) {
								t(a).find(".m-datatable__cell").each(function(e, a) {
									var o = t.grep(l, function(e, n) {
										return t(a).data("field") === e.field
									})[0];
									if(void 0 !== o) {
										var r = t(a).text();
										if(void 0 !== o.subtable && o.subtable) {
											if(t(a).find(".m-datatable__toggle-subtable").length > 0) return;
											t(a).html(t("<a/>").addClass("m-datatable__toggle-subtable").attr("href", "#").attr("data-value", r).attr("title", n.getOption("detail.title")).on("click", i).append(t("<i/>").css("width", t(a).data("width")).addClass(n.getOption("layout.icons.rowDetail.collapse"))))
										}
									}
								})
							})
						}
					},
					dataMapCallback: function(t) {
						var e = t;
						return "function" == typeof n.getOption("data.source.read.map") ? n.getOption("data.source.read.map")(t) : (void 0 !== t && void 0 !== t.data && (e = t.data), e)
					},
					isSpinning: !1,
					spinnerCallback: function(t) {
						if(t) {
							if(!n.isSpinning) {
								var e = n.getOption("layout.spinner");
								!0 === e.message && (e.message = n.getOption("translate.records.processing")), n.isSpinning = !0, void 0 !== mApp && mApp.block(a, e)
							}
						} else n.isSpinning = !1, void 0 !== mApp && mApp.unblock(a)
					},
					sortCallback: function(e, a, n) {
						var o = n.type || "string",
							i = n.format || "",
							l = n.field;
						return t(e).sort(function(t, e) {
							var n = t[l],
								r = e[l];
							switch(o) {
								case "date":
									if("undefined" == typeof moment) throw new Error("Moment.js is required.");
									var s = moment(n, i).diff(moment(r, i));
									return "asc" === a ? s > 0 ? 1 : s < 0 ? -1 : 0 : s < 0 ? 1 : s > 0 ? -1 : 0;
								case "number":
									return isNaN(parseFloat(n)) && null != n && (n = Number(n.replace(/[^0-9\.-]+/g, ""))), isNaN(parseFloat(r)) && null != r && (r = Number(r.replace(/[^0-9\.-]+/g, ""))), n = parseFloat(n), r = parseFloat(r), "asc" === a ? n > r ? 1 : n < r ? -1 : 0 : n < r ? 1 : n > r ? -1 : 0;
								case "string":
								default:
									return "asc" === a ? n > r ? 1 : n < r ? -1 : 0 : n < r ? 1 : n > r ? -1 : 0
							}
						})
					},
					log: function(t, e) {
						void 0 === e && (e = ""), a.debug && console.log(t, e)
					},
					autoHide: function() {
						t(a.table).find(".m-datatable__cell").show(), t(a.tableBody).each(function() {
							for(; t(this)[0].offsetWidth < t(this)[0].scrollWidth;) t(a.table).find(".m-datatable__row").each(function(e) {
								var a = t(this).find(".m-datatable__cell").not(":hidden").last();
								t(a).hide()
							}), n.adjustCellsWidth.call()
						});
						var o = function(a) {
							a.preventDefault();
							var o = t(this).closest(".m-datatable__row"),
								i = t(o).next();
							if(t(i).hasClass("m-datatable__row-detail")) t(this).find("i").removeClass(n.getOption("layout.icons.rowDetail.expand")).addClass(n.getOption("layout.icons.rowDetail.collapse")), t(i).remove();
							else {
								t(this).find("i").removeClass(n.getOption("layout.icons.rowDetail.collapse")).addClass(n.getOption("layout.icons.rowDetail.expand"));
								var l = t(o).find(".m-datatable__cell:hidden").clone().show();
								i = t("<tr/>").addClass("m-datatable__row-detail").insertAfter(o);
								var r = t("<td/>").addClass("m-datatable__detail").attr("colspan", n.getTotalColumns()).appendTo(i),
									s = t("<table/>");
								t(l).each(function() {
									var a = t(this).data("field"),
										o = t.grep(e.columns, function(t, e) {
											return a === t.field
										})[0];
									t(s).append(t('<tr class="m-datatable__row"></tr>').append(t('<td class="m-datatable__cell"></td>').append(t("<span/>").css("width", n.offset).append(o.title))).append(this))
								}), t(r).append(s)
							}
						};
						t(a.tableBody).find(".m-datatable__row").each(function() {
							t(this).prepend(t("<td/>").addClass("m-datatable__cell m-datatable__toggle--detail").append(t("<a/>").addClass("m-datatable__toggle-detail").attr("href", "#").on("click", o).append(t("<i/>").css("width", "21px").addClass(n.getOption("layout.icons.rowDetail.collapse"))))), 0 === t(a.tableHead).find(".m-datatable__toggle-detail").length ? (t(a.tableHead).find(".m-datatable__row").first().prepend('<th class="m-datatable__cell m-datatable__toggle-detail"><span style="width: 21px"></span></th>'), t(a.tableFoot).find(".m-datatable__row").first().prepend('<th class="m-datatable__cell m-datatable__toggle-detail"><span style="width: 21px"></span></th>')) : t(a.tableHead).find(".m-datatable__toggle-detail").find("span").css("width", "21px")
						})
					},
					hoverColumn: function() {
						t(a.tableBody).on("mouseenter", ".m-datatable__cell", function() {
							var e = t(n.cell(this).nodes()).index();
							t(n.cells().nodes()).removeClass("m-datatable__cell--hover"), t(n.column(e).nodes()).addClass("m-datatable__cell--hover")
						})
					},
					setAutoColumns: function() {
						n.getOption("data.autoColumns") && (t.each(a.dataSet[0], function(a, n) {
							0 === t.grep(e.columns, function(t, e) {
								return a === t.field
							}).length && e.columns.push({
								field: a,
								title: a
							})
						}), t(a.tableHead).find(".m-datatable__row").remove(), n.setHeadTitle(), n.getOption("layout.footer") && (t(a.tableFoot).find(".m-datatable__row").remove(), n.setHeadTitle(a.tableFoot)))
					},
					isLocked: function() {
						return t(a.wrap).hasClass("m-datatable--lock") || !1
					},
					replaceTableContent: function(e, n) {
						void 0 === n && (n = a.tableBody), t(n).hasClass("mCustomScrollbar") ? t(n).find(".mCSB_container").html(e) : t(n).html(e)
					},
					getExtraSpace: function(e) {
						return parseInt(t(e).css("paddingRight")) + parseInt(t(e).css("paddingLeft")) + (parseInt(t(e).css("marginRight")) + parseInt(t(e).css("marginLeft"))) + Math.ceil(t(e).css("border-right-width").replace("px", ""))
					},
					dataPlaceholder: function(e, a) {
						var n = e;
						return t.each(a, function(t, e) {
							n = n.replace("{{" + t + "}}", e)
						}), n
					},
					getTableId: function(e) {
						void 0 === e && (e = "");
						var n = t(a).attr("id");
						return void 0 === n && (n = t(a).attr("class").split(" ")[0]), n + e
					},
					getTablePrefix: function(t) {
						return void 0 !== t && (t = "-" + t), n.getTableId() + "-" + n.getDepth() + t
					},
					getDepth: function() {
						var e = 0,
							n = a.table;
						do {
							n = t(n).parents(".m-datatable__table"), e++
						} while (t(n).length > 0);
						return e
					},
					stateKeep: function(t, e) {
						t = n.getTablePrefix(t), !1 !== n.getOption("data.saveState") && (n.getOption("data.saveState.webstorage") && localStorage && localStorage.setItem(t, JSON.stringify(e)), n.getOption("data.saveState.cookie") && Cookies.set(t, JSON.stringify(e)))
					},
					stateGet: function(t, e) {
						if(t = n.getTablePrefix(t), !1 !== n.getOption("data.saveState")) {
							var a = null;
							return void 0 !== (a = n.getOption("data.saveState.webstorage") && localStorage ? localStorage.getItem(t) : Cookies.get(t)) && null !== a ? JSON.parse(a) : void 0
						}
					},
					stateUpdate: function(e, a) {
						var o = n.stateGet(e);
						void 0 !== o && null !== o || (o = {}), n.stateKeep(e, t.extend({}, o, a))
					},
					stateRemove: function(t) {
						t = n.getTablePrefix(t), localStorage && localStorage.removeItem(t), Cookies.remove(t)
					},
					getTotalColumns: function(e) {
						return void 0 === e && (e = a.tableBody), t(e).find(".m-datatable__row").first().find(".m-datatable__cell").length
					},
					getOneRow: function(e, a, n) {
						void 0 === n && (n = !0);
						var o = t(e).find(".m-datatable__row:not(.m-datatable__row-detail):nth-child(" + a + ")");
						return n && (o = o.find(".m-datatable__cell")), o
					},
					hasOverflowY: function(e) {
						var a = t(e).find(".m-datatable__row"),
							n = 0;
						return a.length > 0 && (t(a).each(function(e, a) {
							n += Math.floor(t(a).innerHeight())
						}), n > t(e).innerHeight())
					},
					sortColumn: function(e, n, o) {
						void 0 === n && (n = "asc"), void 0 === o && (o = !1);
						var i = t(e).index(),
							l = t(a.tableBody).find(".m-datatable__row"),
							r = t(e).closest(".m-datatable__lock").index(); - 1 !== r && (l = t(a.tableBody).find(".m-datatable__lock:nth-child(" + (r + 1) + ")").find(".m-datatable__row"));
						var s = t(l).parent();
						t(l).sort(function(e, a) {
							var l = t(e).find("td:nth-child(" + i + ")").text(),
								r = t(a).find("td:nth-child(" + i + ")").text();
							return o && (l = parseInt(l), r = parseInt(r)), "asc" === n ? l > r ? 1 : l < r ? -1 : 0 : l < r ? 1 : l > r ? -1 : 0
						}).appendTo(s)
					},
					sorting: function() {
						var o = {
							init: function() {
								e.sortable && (t(a.tableHead).find(".m-datatable__cell:not(.m-datatable__cell--check)").addClass("m-datatable__cell--sort").off("click").on("click", o.sortClick), o.setIcon())
							},
							setIcon: function() {
								var e = n.getDataSourceParam("sort");
								if(!t.isEmptyObject(e)) {
									var o = t(a.tableHead).find('.m-datatable__cell[data-field="' + e.field + '"]').attr("data-sort", e.sort),
										i = t(o).find("span"),
										l = t(i).find("i"),
										r = n.getOption("layout.icons.sort");
									t(l).length > 0 ? t(l).removeAttr("class").addClass(r[e.sort]) : t(i).append(t("<i/>").addClass(r[e.sort]))
								}
							},
							sortClick: function(i) {
								var l = n.getDataSourceParam("sort"),
									r = t(this).data("field"),
									s = n.getColumnByField(r);
								if((void 0 === s.sortable || !1 !== s.sortable) && (t(a.tableHead).find(".m-datatable__cell > span > i").remove(), e.sortable)) {
									n.spinnerCallback(!0);
									var d = "desc";
									n.getObject("field", l) === r && (d = n.getObject("sort", l)), l = {
										field: r,
										sort: d = void 0 === d || "desc" === d ? "asc" : "desc"
									}, n.setDataSourceParam("sort", l), o.setIcon(), setTimeout(function() {
										n.dataRender("sort"), t(a).trigger("m-datatable--on-sort", l)
									}, 300)
								}
							}
						};
						o.init()
					},
					localDataUpdate: function() {
						var e = n.getDataSourceParam();
						void 0 === a.originalDataSet && (a.originalDataSet = a.dataSet);
						var o = n.getObject("sort.field", e),
							i = n.getObject("sort.sort", e),
							l = n.getColumnByField(o);
						if(void 0 !== l && !0 !== n.getOption("data.serverSorting") ? "function" == typeof l.sortCallback ? a.dataSet = l.sortCallback(a.originalDataSet, i, l) : a.dataSet = n.sortCallback(a.originalDataSet, i, l) : a.dataSet = a.originalDataSet, "object" == typeof e.query && !n.getOption("data.serverFiltering")) {
							e.query = e.query || {};
							var r = function(t) {
									for(var e in t)
										if(t.hasOwnProperty(e))
											if("string" == typeof t[e]) {
												if(t[e].toLowerCase() == s || -1 !== t[e].toLowerCase().indexOf(s)) return !0
											} else if("object" == typeof t[e]) return r(t[e]);
									return !1
								},
								s = t(n.getOption("search.input")).val();
							void 0 !== s && "" !== s && (s = s.toLowerCase(), a.dataSet = t.grep(a.dataSet, r), delete e.query[n.getGeneralSearchKey()]), t.each(e.query, function(t, a) {
								"" === a && delete e.query[t]
							}), a.dataSet = n.filterArray(a.dataSet, e.query), a.dataSet = a.dataSet.filter(function() {
								return !0
							})
						}
						return a.dataSet
					},
					filterArray: function(e, a, n) {
						if("object" != typeof e) return [];
						if(void 0 === n && (n = "AND"), "object" != typeof a) return e;
						if(n = n.toUpperCase(), -1 === t.inArray(n, ["AND", "OR", "NOT"])) return [];
						var o = Object.keys(a).length,
							i = [];
						return t.each(e, function(e, l) {
							var r = l,
								s = 0;
							t.each(a, function(t, e) {
								if(e = e instanceof Array ? e : [e], r.hasOwnProperty(t)) {
									var a = r[t].toString().toLowerCase();
									e.forEach(function(t, e) {
										t.toString().toLowerCase() != a && -1 === a.indexOf(t.toString().toLowerCase()) || s++
									})
								}
							}), ("AND" == n && s == o || "OR" == n && s > 0 || "NOT" == n && 0 == s) && (i[e] = l)
						}), e = i
					},
					resetScroll: function() {
						void 0 === e.detail && 1 === n.getDepth() && (t(a.table).find(".m-datatable__row").css("left", 0), t(a.table).find(".m-datatable__lock").css("top", 0), t(a.tableBody).scrollTop(0))
					},
					getColumnByField: function(a) {
						var n;
						if(void 0 !== a) return t.each(e.columns, function(t, e) {
							if(a === e.field) return n = e, !1
						}), n
					},
					getDefaultSortColumn: function() {
						var a;
						return t.each(e.columns, function(e, n) {
							if(void 0 !== n.sortable && -1 !== t.inArray(n.sortable, ["asc", "desc"])) return a = {
								sort: n.sortable,
								field: n.field
							}, !1
						}), a
					},
					getHiddenDimensions: function(e, a) {
						var n = {
								position: "absolute",
								visibility: "hidden",
								display: "block"
							},
							o = {
								width: 0,
								height: 0,
								innerWidth: 0,
								innerHeight: 0,
								outerWidth: 0,
								outerHeight: 0
							},
							i = t(e).parents().addBack().not(":visible");
						a = "boolean" == typeof a && a;
						var l = [];
						return i.each(function() {
							var t = {};
							for(var e in n) t[e] = this.style[e], this.style[e] = n[e];
							l.push(t)
						}), o.width = t(e).width(), o.outerWidth = t(e).outerWidth(a), o.innerWidth = t(e).innerWidth(), o.height = t(e).height(), o.innerHeight = t(e).innerHeight(), o.outerHeight = t(e).outerHeight(a), i.each(function(t) {
							var e = l[t];
							for(var a in n) this.style[a] = e[a]
						}), o
					},
					getGeneralSearchKey: function() {
						var e = t(n.getOption("search.input"));
						return t(e).prop("name") || t(e).prop("id")
					},
					getObject: function(t, e) {
						return t.split(".").reduce(function(t, e) {
							return null !== t && void 0 !== t[e] ? t[e] : null
						}, e)
					},
					extendObj: function(t, e, a) {
						var n = e.split("."),
							o = 0;
						return function t(e) {
							var i = n[o++];
							void 0 !== e[i] && null !== e[i] ? "object" != typeof e[i] && "function" != typeof e[i] && (e[i] = {}) : e[i] = {}, o === n.length ? e[i] = a : t(e[i])
						}(t), t
					},
					timer: 0,
					redraw: function() {
						return n.adjustCellsWidth.call(), n.isLocked() && (n.scrollbar(), n.resetScroll(), n.adjustCellsHeight.call()), n.adjustLockContainer.call(), n.initHeight.call(), a
					},
					load: function() {
						return n.reload(), a
					},
					reload: function() {
						return function(t, e) {
							clearTimeout(n.timer), n.timer = setTimeout(t, e)
						}(function() {
							e.data.serverFiltering || n.localDataUpdate(), n.dataRender(), t(a).trigger("m-datatable--on-reloaded")
						}, n.getOption("search.delay")), a
					},
					getRecord: function(e) {
						return void 0 === a.tableBody && (a.tableBody = t(a.table).children("tbody")), t(a.tableBody).find(".m-datatable__cell:first-child").each(function(o, i) {
							if(e == t(i).text()) {
								var l = t(i).closest(".m-datatable__row").index() + 1;
								return a.API.record = a.API.value = n.getOneRow(a.tableBody, l), a
							}
						}), a
					},
					getColumn: function(e) {
						return n.setSelectedRecords(), a.API.value = t(a.API.record).find('[data-field="' + e + '"]'), a
					},
					destroy: function() {
						t(a).parent().find(".m-datatable__pager").remove();
						var e = t(a.initialDatatable).addClass("m-datatable--destroyed").show();
						return t(a).replaceWith(e), t(a = e).trigger("m-datatable--on-destroy"), n.isInit = !1, e = null
					},
					sort: function(e, o) {
						o = void 0 === o ? "asc" : o, n.spinnerCallback(!0);
						var i = {
							field: e,
							sort: o
						};
						return n.setDataSourceParam("sort", i), setTimeout(function() {
							n.dataRender("sort"), t(a).trigger("m-datatable--on-sort", i), t(a.tableHead).find(".m-datatable__cell > span > i").remove()
						}, 300), a
					},
					getValue: function() {
						return t(a.API.value).text()
					},
					setActive: function(e) {
						"string" == typeof e && (e = t(a.tableBody).find('.m-checkbox--single > [type="checkbox"][value="' + e + '"]')), t(e).prop("checked", !0);
						var n = t(e).closest(".m-datatable__row").addClass("m-datatable__row--active"),
							o = t(n).index() + 1;
						t(n).closest(".m-datatable__lock").parent().find(".m-datatable__row:nth-child(" + o + ")").addClass("m-datatable__row--active");
						var i = [];
						t(n).each(function(e, a) {
							var n = t(a).find('.m-checkbox--single:not(.m-checkbox--all) > [type="checkbox"]').val();
							void 0 !== n && i.push(n)
						}), t(a).trigger("m-datatable--on-check", [i])
					},
					setInactive: function(e) {
						"string" == typeof e && (e = t(a.tableBody).find('.m-checkbox--single > [type="checkbox"][value="' + e + '"]')), t(e).prop("checked", !1);
						var n = t(e).closest(".m-datatable__row").removeClass("m-datatable__row--active"),
							o = t(n).index() + 1;
						t(n).closest(".m-datatable__lock").parent().find(".m-datatable__row:nth-child(" + o + ")").removeClass("m-datatable__row--active");
						var i = [];
						t(n).each(function(e, a) {
							var n = t(a).find('.m-checkbox--single:not(.m-checkbox--all) > [type="checkbox"]').val();
							void 0 !== n && i.push(n)
						}), t(a).trigger("m-datatable--on-uncheck", [i])
					},
					setActiveAll: function(e) {
						var o = t(a.table).find(".m-datatable__body .m-datatable__row").find('.m-datatable__cell--check .m-checkbox [type="checkbox"]');
						e ? n.setActive(o) : n.setInactive(o)
					},
					setSelectedRecords: function() {
						return a.API.record = t(a.tableBody).find(".m-datatable__row--active"), a
					},
					getSelectedRecords: function() {
						return n.setSelectedRecords(), a.API.record = a.rows(".m-datatable__row--active").nodes(), a.API.record
					},
					getOption: function(t) {
						return n.getObject(t, e)
					},
					setOption: function(t, a) {
						e = n.extendObj(e, t, a)
					},
					search: function(a, o) {
						void 0 !== o && (o = t.makeArray(o)), i = function() {
							var i = n.getDataSourceQuery();
							if(void 0 === o && void 0 !== a) {
								var l = n.getGeneralSearchKey();
								i[l] = a
							}
							"object" == typeof o && (t.each(o, function(t, e) {
								i[e] = a
							}), t.each(i, function(e, a) {
								("" === a || t.isEmptyObject(a)) && delete i[e]
							})), n.setDataSourceQuery(i), e.data.serverFiltering || n.localDataUpdate(), n.dataRender("search")
						}, l = n.getOption("search.delay"), clearTimeout(n.timer), n.timer = setTimeout(i, l);
						var i, l
					},
					setDataSourceParam: function(e, o) {
						a.API.params = t.extend({}, {
							pagination: {
								page: 1,
								perpage: n.getOption("data.pageSize")
							},
							sort: n.getDefaultSortColumn(),
							query: {}
						}, a.API.params, n.stateGet(n.stateId)), a.API.params = n.extendObj(a.API.params, e, o), n.stateKeep(n.stateId, a.API.params)
					},
					getDataSourceParam: function(e) {
						return a.API.params = t.extend({}, {
							pagination: {
								page: 1,
								perpage: n.getOption("data.pageSize")
							},
							sort: n.getDefaultSortColumn(),
							query: {}
						}, a.API.params, n.stateGet(n.stateId)), "string" == typeof e ? n.getObject(e, a.API.params) : a.API.params
					},
					getDataSourceQuery: function() {
						return n.getDataSourceParam("query") || {}
					},
					setDataSourceQuery: function(t) {
						n.setDataSourceParam("query", t)
					},
					getCurrentPage: function() {
						return t(a.table).siblings(".m-datatable__pager").last().find(".m-datatable__pager-nav").find(".m-datatable__pager-link.m-datatable__pager-link--active").data("page") || 1
					},
					getPageSize: function() {
						return t(a.table).siblings(".m-datatable__pager").last().find("select.m-datatable__pager-size").val() || 10
					},
					getTotalRows: function() {
						return a.API.params.pagination.total
					},
					getDataSet: function() {
						return a.originalDataSet
					},
					hideColumn: function(n) {
						t.map(e.columns, function(t) {
							return n === t.field && (t.responsive = {
								hidden: "xl"
							}), t
						});
						var o = t.grep(t(a.table).find(".m-datatable__cell"), function(e, a) {
							return n === t(e).data("field")
						});
						t(o).hide()
					},
					showColumn: function(n) {
						t.map(e.columns, function(t) {
							return n === t.field && delete t.responsive, t
						});
						var o = t.grep(t(a.table).find(".m-datatable__cell"), function(e, a) {
							return n === t(e).data("field")
						});
						t(o).show()
					},
					destroyScroller: function(e) {
						void 0 === e && (e = a.tableBody), t(e).each(function() {
							if(t(this).hasClass("mCustomScrollbar")) try {
								mApp.destroyScroller(t(this))
							} catch(t) {
								console.log(t)
							}
						})
					},
					nodeTr: [],
					nodeTd: [],
					nodeCols: [],
					recentNode: [],
					table: function() {
						return a.table
					},
					row: function(e) {
						return n.rows(e), n.nodeTr = n.recentNode = t(n.nodeTr).first(), a
					},
					rows: function(e) {
						return n.nodeTr = n.recentNode = t(a.tableBody).find(e).filter(".m-datatable__row"), a
					},
					column: function(e) {
						return n.nodeCols = n.recentNode = t(a.tableBody).find(".m-datatable__cell:nth-child(" + (e + 1) + ")"), a
					},
					columns: function(e) {
						var o = a.table;
						n.nodeTr === n.recentNode && (o = n.nodeTr);
						var i = t(o).find('.m-datatable__cell[data-field="' + e + '"]');
						return i.length > 0 ? n.nodeCols = n.recentNode = i : n.nodeCols = n.recentNode = t(o).find(e).filter(".m-datatable__cell"), a
					},
					cell: function(e) {
						return n.cells(e), n.nodeTd = n.recentNode = t(n.nodeTd).first(), a
					},
					cells: function(e) {
						var o = t(a.tableBody).find(".m-datatable__cell");
						return void 0 !== e && (o = t(o).filter(e)), n.nodeTd = n.recentNode = o, a
					},
					remove: function() {
						return t(n.nodeTr.length) && n.nodeTr === n.recentNode && t(n.nodeTr).remove(), n.layoutUpdate(), a
					},
					visible: function(a) {
						if(t(n.recentNode.length)) {
							var o = n.lockEnabledColumns();
							if(n.recentNode === n.nodeCols) {
								var i = n.recentNode.index();
								if(n.isLocked()) {
									var l = t(n.recentNode).closest(".m-datatable__lock--scroll").length;
									l ? i += o.left.length + 1 : t(n.recentNode).closest(".m-datatable__lock--right").length && (i += o.left.length + l + 1)
								}
							}
							a ? (n.recentNode === n.nodeCols && delete e.columns[i].responsive, t(n.recentNode).show()) : (n.recentNode === n.nodeCols && n.setOption("columns." + i + ".responsive", {
								hidden: "xl"
							}), t(n.recentNode).hide()), n.redraw()
						}
					},
					nodes: function() {
						return n.recentNode
					},
					dataset: function() {
						return a
					}
				};
				if(t.each(n, function(t, e) {
						a[t] = e
					}), void 0 !== e)
					if("string" == typeof e) {
						var o = e;
						void 0 !== (a = t(this).data("mDatatable")) && (e = a.options, n[o].apply(this, Array.prototype.slice.call(arguments, 1)))
					} else a.data("mDatatable") || t(this).hasClass("m-datatable--loaded") || (a.dataSet = null, a.textAlign = {
						left: "m-datatable__cell--left",
						center: "m-datatable__cell--center",
						right: "m-datatable__cell--right"
					}, e = t.extend(!0, {}, t.fn.mDatatable.defaults, e), a.options = e, n.init.apply(this, [e]), t(a.wrap).data("mDatatable", a));
				else void 0 === (a = t(this).data("mDatatable")) && t.error("mDatatable not initialized"), e = a.options;
				return a
			}
			console.log("No mDatatable element exist.")
		}, t.fn.mDatatable.defaults = {
			data: {
				type: "local",
				source: null,
				pageSize: 10,
				saveState: {
					cookie: !1,
					webstorage: !0
				},
				serverPaging: !1,
				serverFiltering: !1,
				serverSorting: !1,
				autoColumns: !1,
				attr: {
					rowProps: []
				}
			},
			layout: {
				theme: "default",
				class: "m-datatable--brand",
				scroll: !1,
				height: null,
				minHeight: 300,
				footer: !1,
				header: !0,
				smoothScroll: {
					scrollbarShown: !0
				},
				spinner: {
					overlayColor: "#000000",
					opacity: 0,
					type: "loader",
					state: "brand",
					message: !0
				},
				icons: {
					sort: {
						asc: "la la-arrow-up",
						desc: "la la-arrow-down"
					},
					pagination: {
						next: "la la-angle-right",
						prev: "la la-angle-left",
						first: "la la-angle-double-left",
						last: "la la-angle-double-right",
						more: "la la-ellipsis-h"
					},
					rowDetail: {
						expand: "fa fa-caret-down",
						collapse: "fa fa-caret-right"
					}
				}
			},
			sortable: !0,
			resizable: !1,
			filterable: !1,
			pagination: !0,
			editable: !1,
			columns: [],
			search: {
				onEnter: !1,
				input: null,
				delay: 400
			},
			rows: {
				callback: function() {},
				beforeTemplate: function() {},
				afterTemplate: function() {},
				autoHide: !1
			},
			toolbar: {
				layout: ["pagination", "info"],
				placement: ["bottom"],
				items: {
					pagination: {
						type: "default",
						pages: {
							desktop: {
								layout: "default",
								pagesNumber: 6
							},
							tablet: {
								layout: "default",
								pagesNumber: 3
							},
							mobile: {
								layout: "compact"
							}
						},
						navigation: {
							prev: !0,
							next: !0,
							first: !0,
							last: !0
						},
						pageSizeSelect: []
					},
					info: !0
				}
			},
			translate: {
				records: {
					processing: "Please wait...",
					noRecords: "No records found"
				},
				toolbar: {
					pagination: {
						items: {
							default: {
								first: "First",
								prev: "Previous",
								next: "Next",
								last: "Last",
								more: "More pages",
								input: "Page number",
								select: "Select page size"
							},
							info: "Displaying {{start}} - {{end}} of {{total}} records"
						}
					}
				}
			},
			extensions: {}
		}
	}(jQuery);
var mDropdown = function(t, e) {
	var a = this,
		n = mUtil.get(t),
		o = mUtil.get("body");
	if(n) {
		var i = {
				toggle: "click",
				hoverTimeout: 300,
				skin: "light",
				height: "auto",
				maxHeight: !1,
				minHeight: !1,
				persistent: !1,
				mobileOverlay: !0
			},
			l = {
				construct: function(t) {
					return mUtil.data(n).has("dropdown") ? a = mUtil.data(n).get("dropdown") : (l.init(t), l.setup(), mUtil.data(n).set("dropdown", a)), a
				},
				init: function(t) {
					a.options = mUtil.deepExtend({}, i, t), a.events = [], a.eventHandlers = {}, a.open = !1, a.layout = {}, a.layout.close = mUtil.find(n, ".m-dropdown__close"), a.layout.toggle = mUtil.find(n, ".m-dropdown__toggle"), a.layout.arrow = mUtil.find(n, ".m-dropdown__arrow"), a.layout.wrapper = mUtil.find(n, ".m-dropdown__wrapper"), a.layout.defaultDropPos = mUtil.hasClass(n, "m-dropdown--up") ? "up" : "down", a.layout.currentDropPos = a.layout.defaultDropPos, "hover" == mUtil.attr(n, "m-dropdown-toggle") && (a.options.toggle = "hover")
				},
				setup: function() {
					a.options.placement && mUtil.addClass(n, "m-dropdown--" + a.options.placement), a.options.align && mUtil.addClass(n, "m-dropdown--align-" + a.options.align), a.options.width && mUtil.css(a.layout.wrapper, "width", a.options.width + "px"), "1" == mUtil.attr(n, "m-dropdown-persistent") && (a.options.persistent = !0), "hover" == a.options.toggle && mUtil.addEvent(n, "mouseout", l.hideMouseout), l.setZindex()
				},
				toggle: function() {
					return a.open ? l.hide() : l.show()
				},
				setContent: function(t) {
					t = mUtil.find(n, ".m-dropdown__content").innerHTML = t;
					return a
				},
				show: function() {
					if("hover" == a.options.toggle && mUtil.hasAttr(n, "hover")) return l.clearHovered(), a;
					if(a.open) return a;
					if(a.layout.arrow && l.adjustArrowPos(), l.eventTrigger("beforeShow"), l.hideOpened(), mUtil.addClass(n, "m-dropdown--open"), mUtil.isMobileDevice() && a.options.mobileOverlay) {
						var t = mUtil.css(n, "z-index") - 1,
							e = mUtil.insertAfter(document.createElement("DIV"), n);
						mUtil.addClass(e, "m-dropdown__dropoff"), mUtil.css(e, "z-index", t), mUtil.data(e).set("dropdown", n), mUtil.data(n).set("dropoff", e), mUtil.addEvent(e, "click", function(t) {
							l.hide(), mUtil.remove(this), t.preventDefault()
						})
					}
					return n.focus(), n.setAttribute("aria-expanded", "true"), a.open = !0, l.eventTrigger("afterShow"), a
				},
				clearHovered: function() {
					var t = mUtil.attr(n, "timeout");
					mUtil.removeAttr(n, "hover"), mUtil.removeAttr(n, "timeout"), clearTimeout(t)
				},
				hideHovered: function(t) {
					if(!0 === t) {
						if(!1 === l.eventTrigger("beforeHide")) return;
						l.clearHovered(), mUtil.removeClass(n, "m-dropdown--open"), a.open = !1, l.eventTrigger("afterHide")
					} else {
						if(!0 === mUtil.hasAttr(n, "hover")) return;
						if(!1 === l.eventTrigger("beforeHide")) return;
						var e = setTimeout(function() {
							mUtil.attr(n, "hover") && (l.clearHovered(), mUtil.removeClass(n, "m-dropdown--open"), a.open = !1, l.eventTrigger("afterHide"))
						}, a.options.hoverTimeout);
						mUtil.attr(n, "hover", "1"), mUtil.attr(n, "timeout", e)
					}
				},
				hideClicked: function() {
					!1 !== l.eventTrigger("beforeHide") && (mUtil.removeClass(n, "m-dropdown--open"), mUtil.data(n).remove("dropoff"), a.open = !1, l.eventTrigger("afterHide"))
				},
				hide: function(t) {
					return !1 === a.open ? a : (mUtil.isDesktopDevice() && "hover" == a.options.toggle ? l.hideHovered(t) : l.hideClicked(), "down" == a.layout.defaultDropPos && "up" == a.layout.currentDropPos && (mUtil.removeClass(n, "m-dropdown--up"), a.layout.arrow.prependTo(a.layout.wrapper), a.layout.currentDropPos = "down"), a)
				},
				hideMouseout: function() {
					mUtil.isDesktopDevice() && l.hide()
				},
				hideOpened: function() {
					for(var t = mUtil.findAll(o, ".m-dropdown.m-dropdown--open"), e = 0, a = t.length; e < a; e++) {
						var n = t[e];
						mUtil.data(n).get("dropdown").hide(!0)
					}
				},
				adjustArrowPos: function() {
					var t = mUtil.outerWidth(n),
						e = mUtil.hasClass(a.layout.arrow, "m-dropdown__arrow--right") ? "right" : "left",
						o = 0;
					a.layout.arrow && (mUtil.isInResponsiveRange("mobile") && mUtil.hasClass(n, "m-dropdown--mobile-full-width") ? (o = mUtil.offset(n).left + t / 2 - Math.abs(parseInt(mUtil.css(a.layout.arrow, "width")) / 2) - parseInt(mUtil.css(a.layout.wrapper, "left")), mUtil.css(a.layout.arrow, "right", "auto"), mUtil.css(a.layout.arrow, "left", o + "px"), mUtil.css(a.layout.arrow, "margin-left", "auto"), mUtil.css(a.layout.arrow, "margin-right", "auto")) : mUtil.hasClass(a.layout.arrow, "m-dropdown__arrow--adjust") && (o = t / 2 - Math.abs(parseInt(mUtil.css(a.layout.arrow, "width")) / 2), mUtil.hasClass(n, "m-dropdown--align-push") && (o += 20), "right" == e ? (mUtil.css(a.layout.arrow, "left", "auto"), mUtil.css(a.layout.arrow, "right", o + "px")) : (mUtil.css(a.layout.arrow, "right", "auto"), mUtil.css(a.layout.arrow, "left", o + "px"))))
				},
				setZindex: function() {
					var t = 101,
						e = mUtil.getHighestZindex(n);
					e >= t && (t = e + 1), mUtil.css(a.layout.wrapper, "z-index", t)
				},
				isPersistent: function() {
					return a.options.persistent
				},
				isShown: function() {
					return a.open
				},
				eventTrigger: function(t, e) {
					for(var n = 0; n < a.events.length; n++) {
						var o = a.events[n];
						o.name == t && (1 == o.one ? 0 == o.fired && (a.events[n].fired = !0, o.handler.call(this, a, e)) : o.handler.call(this, a, e))
					}
				},
				addEvent: function(t, e, n) {
					a.events.push({
						name: t,
						handler: e,
						one: n,
						fired: !1
					})
				}
			};
		return a.setDefaults = function(t) {
			i = t
		}, a.show = function() {
			return l.show()
		}, a.hide = function() {
			return l.hide()
		}, a.toggle = function() {
			return l.toggle()
		}, a.isPersistent = function() {
			return l.isPersistent()
		}, a.isShown = function() {
			return l.isShown()
		}, a.setContent = function(t) {
			return l.setContent(t)
		}, a.on = function(t, e) {
			return l.addEvent(t, e)
		}, a.one = function(t, e) {
			return l.addEvent(t, e, !0)
		}, l.construct.apply(a, [e]), !0, a
	}
};
mUtil.on(document, '[m-dropdown-toggle="click"] .m-dropdown__toggle', "click", function(t) {
	var e = this.closest(".m-dropdown");
	e && ((mUtil.data(e).has("dropdown") ? mUtil.data(e).get("dropdown") : new mDropdown(e)).toggle(), t.preventDefault())
}), mUtil.on(document, '[m-dropdown-toggle="hover"] .m-dropdown__toggle', "click", function(t) {
	if(mUtil.isDesktopDevice()) "#" == mUtil.attr(this, "href") && t.preventDefault();
	else if(mUtil.isMobileDevice()) {
		var e = this.closest(".m-dropdown");
		e && ((mUtil.data(e).has("dropdown") ? mUtil.data(e).get("dropdown") : new mDropdown(e)).toggle(), t.preventDefault())
	}
}), mUtil.on(document, '[m-dropdown-toggle="hover"]', "mouseover", function(t) {
	if(mUtil.isDesktopDevice()) {
		this && ((mUtil.data(this).has("dropdown") ? mUtil.data(this).get("dropdown") : new mDropdown(this)).show(), t.preventDefault())
	}
}), document.addEventListener("click", function(t) {
	var e, a = mUtil.get("body"),
		n = t.target;
	if(e = a.querySelectorAll(".m-dropdown.m-dropdown--open"))
		for(var o = 0, i = e.length; o < i; o++) {
			var l = e[o];
			if(!1 === mUtil.data(l).has("dropdown")) return;
			var r = mUtil.data(l).get("dropdown"),
				s = mUtil.find(l, ".m-dropdown__toggle");
			mUtil.hasClass(l, "m-dropdown--disable-close") && (t.preventDefault(), t.stopPropagation()), s && n !== s && !1 === s.contains(n) && !1 === n.contains(s) ? !0 === r.isPersistent() ? !1 === l.contains(n) && r.hide() : r.hide() : !1 === l.contains(n) && r.hide()
		}
});
var mHeader = function(t, e) {
		var a = this,
			n = mUtil.get(t),
			o = mUtil.get("body");
		if(void 0 !== n) {
			var i = {
					classic: !1,
					offset: {
						mobile: 150,
						desktop: 200
					},
					minimize: {
						mobile: !1,
						desktop: !1
					}
				},
				l = {
					construct: function(t) {
						return mUtil.data(n).has("header") ? a = mUtil.data(n).get("header") : (l.init(t), l.build(), mUtil.data(n).set("header", a)), a
					},
					init: function(t) {
						a.events = [], a.options = mUtil.deepExtend({}, i, t)
					},
					build: function() {
						var t = 0;
						!1 === a.options.minimize.mobile && !1 === a.options.minimize.desktop || window.addEventListener("scroll", function() {
							var e, n, i, l = 0;
							mUtil.isInResponsiveRange("desktop") ? (l = a.options.offset.desktop, e = a.options.minimize.desktop.on, n = a.options.minimize.desktop.off) : mUtil.isInResponsiveRange("tablet-and-mobile") && (l = a.options.offset.mobile, e = a.options.minimize.mobile.on, n = a.options.minimize.mobile.off), i = window.pageYOffset, mUtil.isInResponsiveRange("tablet-and-mobile") && a.options.classic && a.options.classic.mobile || mUtil.isInResponsiveRange("desktop") && a.options.classic && a.options.classic.desktop ? i > l ? (mUtil.addClass(o, e), mUtil.removeClass(o, n)) : (mUtil.addClass(o, n), mUtil.removeClass(o, e)) : (i > l && t < i ? (mUtil.addClass(o, e), mUtil.removeClass(o, n)) : (mUtil.addClass(o, n), mUtil.removeClass(o, e)), t = i)
						})
					},
					eventTrigger: function(t, e) {
						for(var n = 0; n < a.events.length; n++) {
							var o = a.events[n];
							o.name == t && (1 == o.one ? 0 == o.fired && (a.events[n].fired = !0, o.handler.call(this, a, e)) : o.handler.call(this, a, e))
						}
					},
					addEvent: function(t, e, n) {
						a.events.push({
							name: t,
							handler: e,
							one: n,
							fired: !1
						})
					}
				};
			return a.setDefaults = function(t) {
				i = t
			}, a.on = function(t, e) {
				return l.addEvent(t, e)
			}, l.construct.apply(a, [e]), !0, a
		}
	},
	mMenu = function(t, e) {
		var a = this,
			n = !1,
			o = mUtil.get(t),
			i = mUtil.get("body");
		if(o) {
			var l = {
					autoscroll: {
						speed: 1200
					},
					accordion: {
						slideSpeed: 200,
						autoScroll: !0,
						autoScrollSpeed: 1200,
						expandAll: !0
					},
					dropdown: {
						timeout: 500
					}
				},
				r = {
					construct: function(t) {
						return mUtil.data(o).has("menu") ? a = mUtil.data(o).get("menu") : (r.init(t), r.reset(), r.build(), mUtil.data(o).set("menu", a)), a
					},
					init: function(t) {
						a.events = [], a.eventHandlers = {}, a.options = mUtil.deepExtend({}, l, t), a.pauseDropdownHoverTime = 0, a.uid = mUtil.getUniqueID()
					},
					reload: function() {
						r.reset(), r.build()
					},
					build: function() {
						a.eventHandlers.event_1 = mUtil.on(o, ".m-menu__toggle", "click", r.handleSubmenuAccordion), ("dropdown" === r.getSubmenuMode() || r.isConditionalSubmenuDropdown()) && (a.eventHandlers.event_2 = mUtil.on(o, '[m-menu-submenu-toggle="hover"]', "mouseover", r.handleSubmenuDrodownHoverEnter), a.eventHandlers.event_3 = mUtil.on(o, '[m-menu-submenu-toggle="hover"]', "mouseout", r.handleSubmenuDrodownHoverExit), a.eventHandlers.event_4 = mUtil.on(o, '[m-menu-submenu-toggle="click"] > .m-menu__toggle, [m-menu-submenu-toggle="click"] > .m-menu__link .m-menu__toggle', "click", r.handleSubmenuDropdownClick), a.eventHandlers.event_5 = mUtil.on(o, '[m-menu-submenu-toggle="tab"] > .m-menu__toggle, [m-menu-submenu-toggle="tab"] > .m-menu__link .m-menu__toggle', "click", r.handleSubmenuDropdownTabClick)), a.eventHandlers.event_6 = mUtil.on(o, ".m-menu__item:not(.m-menu__item--submenu) > .m-menu__link:not(.m-menu__toggle):not(.m-menu__link--toggle-skip)", "click", r.handleLinkClick)
					},
					reset: function() {
						mUtil.off(o, "click", a.eventHandlers.event_1), mUtil.off(o, "mouseover", a.eventHandlers.event_2), mUtil.off(o, "mouseout", a.eventHandlers.event_3), mUtil.off(o, "click", a.eventHandlers.event_4), mUtil.off(o, "click", a.eventHandlers.event_5), mUtil.off(o, "click", a.eventHandlers.event_6)
					},
					getSubmenuMode: function(t) {
						return mUtil.isInResponsiveRange("desktop") ? t && mUtil.hasAttr(t, "m-menu-submenu-toggle") ? mUtil.attr(t, "m-menu-submenu-toggle") : mUtil.isset(a.options.submenu, "desktop.state.body") ? mUtil.hasClass(i, a.options.submenu.desktop.state.body) ? a.options.submenu.desktop.state.mode : a.options.submenu.desktop.default : mUtil.isset(a.options.submenu, "desktop") ? a.options.submenu.desktop : void 0 : mUtil.isInResponsiveRange("tablet") && mUtil.isset(a.options.submenu, "tablet") ? a.options.submenu.tablet : !(!mUtil.isInResponsiveRange("mobile") || !mUtil.isset(a.options.submenu, "mobile")) && a.options.submenu.mobile
					},
					isConditionalSubmenuDropdown: function() {
						return !(!mUtil.isInResponsiveRange("desktop") || !mUtil.isset(a.options.submenu, "desktop.state.body"))
					},
					handleLinkClick: function(t) {
						!1 === r.eventTrigger("linkClick", this) && t.preventDefault(), ("dropdown" === r.getSubmenuMode(this) || r.isConditionalSubmenuDropdown()) && r.handleSubmenuDropdownClose(t, this)
					},
					handleSubmenuDrodownHoverEnter: function(t) {
						if("accordion" !== r.getSubmenuMode(this) && !1 !== a.resumeDropdownHover()) {
							"1" == this.getAttribute("data-hover") && (this.removeAttribute("data-hover"), clearTimeout(this.getAttribute("data-timeout")), this.removeAttribute("data-timeout")), r.showSubmenuDropdown(this)
						}
					},
					handleSubmenuDrodownHoverExit: function(t) {
						if(!1 !== a.resumeDropdownHover() && "accordion" !== r.getSubmenuMode(this)) {
							var e = this,
								n = a.options.dropdown.timeout,
								o = setTimeout(function() {
									"1" == e.getAttribute("data-hover") && r.hideSubmenuDropdown(e, !0)
								}, n);
							e.setAttribute("data-hover", "1"), e.setAttribute("data-timeout", o)
						}
					},
					handleSubmenuDropdownClick: function(t) {
						if("accordion" !== r.getSubmenuMode(this)) {
							var e = this.closest(".m-menu__item");
							"accordion" != e.getAttribute("m-menu-submenu-mode") && (!1 === mUtil.hasClass(e, "m-menu__item--hover") ? (mUtil.addClass(e, "m-menu__item--open-dropdown"), r.showSubmenuDropdown(e)) : (mUtil.removeClass(e, "m-menu__item--open-dropdown"), r.hideSubmenuDropdown(e, !0)), t.preventDefault())
						}
					},
					handleSubmenuDropdownTabClick: function(t) {
						if("accordion" !== r.getSubmenuMode(this)) {
							var e = this.closest(".m-menu__item");
							"accordion" != e.getAttribute("m-menu-submenu-mode") && (0 == mUtil.hasClass(e, "m-menu__item--hover") && (mUtil.addClass(e, "m-menu__item--open-dropdown"), r.showSubmenuDropdown(e)), t.preventDefault())
						}
					},
					handleSubmenuDropdownClose: function(t, e) {
						if("accordion" !== r.getSubmenuMode(e)) {
							var a = o.querySelectorAll(".m-menu__item.m-menu__item--submenu.m-menu__item--hover:not(.m-menu__item--tabs)");
							if(a.length > 0 && !1 === mUtil.hasClass(e, "m-menu__toggle") && 0 === e.querySelectorAll(".m-menu__toggle").length)
								for(var n = 0, i = a.length; n < i; n++) r.hideSubmenuDropdown(a[0], !0)
						}
					},
					handleSubmenuAccordion: function(t, e) {
						var n, o = e || this;
						if("dropdown" === r.getSubmenuMode(e) && (n = o.closest(".m-menu__item")) && "accordion" != n.getAttribute("m-menu-submenu-mode")) t.preventDefault();
						else {
							var i = o.closest(".m-menu__item"),
								l = mUtil.child(i, ".m-menu__submenu, .m-menu__inner");
							if(!mUtil.hasClass(o.closest(".m-menu__item"), "m-menu__item--open-always") && i && l) {
								t.preventDefault();
								var s = a.options.accordion.slideSpeed;
								if(!1 === mUtil.hasClass(i, "m-menu__item--open")) {
									if(!1 === a.options.accordion.expandAll) {
										var d = o.closest(".m-menu__nav, .m-menu__subnav"),
											c = mUtil.children(d, ".m-menu__item.m-menu__item--open.m-menu__item--submenu:not(.m-menu__item--expanded):not(.m-menu__item--open-always)");
										if(d && c)
											for(var m = 0, u = c.length; m < u; m++) {
												var p = c[0],
													f = mUtil.child(p, ".m-menu__submenu");
												f && mUtil.slideUp(f, s, function() {
													mUtil.removeClass(p, "m-menu__item--open")
												})
											}
									}
									mUtil.slideDown(l, s, function() {
										r.scrollToItem(o)
									}), mUtil.addClass(i, "m-menu__item--open")
								} else mUtil.slideUp(l, s, function() {
									r.scrollToItem(o)
								}), mUtil.removeClass(i, "m-menu__item--open")
							}
						}
					},
					scrollToItem: function(t) {
						mUtil.isInResponsiveRange("desktop") && a.options.accordion.autoScroll && "1" !== o.getAttribute("m-menu-scrollable") && mUtil.scrollToCenter(t, a.options.accordion.autoScrollSpeed)
					},
					hideSubmenuDropdown: function(t, e) {
						e && (mUtil.removeClass(t, "m-menu__item--hover"), mUtil.removeClass(t, "m-menu__item--active-tab")), t.removeAttribute("data-hover"), t.getAttribute("m-menu-dropdown-toggle-class") && mUtil.removeClass(i, t.getAttribute("m-menu-dropdown-toggle-class"));
						var a = t.getAttribute("data-timeout");
						t.removeAttribute("data-timeout"), clearTimeout(a)
					},
					showSubmenuDropdown: function(t) {
						var e = o.querySelectorAll(".m-menu__item--submenu.m-menu__item--hover, .m-menu__item--submenu.m-menu__item--active-tab");
						if(e)
							for(var a = 0, n = e.length; a < n; a++) {
								var l = e[a];
								t !== l && !1 === l.contains(t) && !1 === t.contains(l) && r.hideSubmenuDropdown(l, !0)
							}
						r.adjustSubmenuDropdownArrowPos(t), mUtil.addClass(t, "m-menu__item--hover"), t.getAttribute("m-menu-dropdown-toggle-class") && mUtil.addClass(i, t.getAttribute("m-menu-dropdown-toggle-class"))
					},
					createSubmenuDropdownClickDropoff: function(t) {
						var e, a = (e = mUtil.child(t, ".m-menu__submenu") ? mUtil.css(e, "z-index") : 0) - 1,
							n = document.createElement('<div class="m-menu__dropoff" style="background: transparent; position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: ' + a + '"></div>');
						i.appendChild(n), mUtil.addEvent(n, "click", function(e) {
							e.stopPropagation(), e.preventDefault(), mUtil.remove(this), r.hideSubmenuDropdown(t, !0)
						})
					},
					adjustSubmenuDropdownArrowPos: function(t) {
						var e = mUtil.child(t, ".m-menu__submenu"),
							a = mUtil.child(e, ".m-menu__arrow.m-menu__arrow--adjust");
						mUtil.child(e, ".m-menu__subnav");
						if(a) {
							var n = 0;
							mUtil.child(t, ".m-menu__link");
							mUtil.hasClass(e, "m-menu__submenu--classic") || mUtil.hasClass(e, "m-menu__submenu--fixed") ? mUtil.hasClass(e, "m-menu__submenu--right") ? (n = mUtil.outerWidth(t) / 2, mUtil.hasClass(e, "m-menu__submenu--pull") && (n += Math.abs(parseFloat(mUtil.css(e, "margin-right")))), n = parseInt(mUtil.css(e, "width")) - n) : mUtil.hasClass(e, "m-menu__submenu--left") && (n = mUtil.outerWidth(t) / 2, mUtil.hasClass(e, "m-menu__submenu--pull") && (n += Math.abs(parseFloat(mUtil.css(e, "margin-left"))))) : (mUtil.hasClass(e, "m-menu__submenu--center") || mUtil.hasClass(e, "m-menu__submenu--full")) && (n = mUtil.offset(t).left - (mUtil.getViewPort().width - parseInt(mUtil.css(e, "width"))) / 2, n += mUtil.outerWidth(t) / 2), mUtil.css(a, "left", n + "px")
						}
					},
					pauseDropdownHover: function(t) {
						var e = new Date;
						a.pauseDropdownHoverTime = e.getTime() + t
					},
					resumeDropdownHover: function() {
						return(new Date).getTime() > a.pauseDropdownHoverTime
					},
					resetActiveItem: function(t) {
						for(var e, n, i = 0, l = (e = o.querySelectorAll(".m-menu__item--active")).length; i < l; i++) {
							var r = e[0];
							mUtil.removeClass(r, "m-menu__item--active"), mUtil.hide(mUtil.child(r, ".m-menu__submenu"));
							for(var s = 0, d = (n = mUtil.parents(r, ".m-menu__item--submenu")).length; s < d; s++) {
								var c = n[i];
								mUtil.removeClass(c, "m-menu__item--open"), mUtil.hide(mUtil.child(c, ".m-menu__submenu"))
							}
						}
						if(!1 === a.options.accordion.expandAll && (e = o.querySelectorAll(".m-menu__item--open")))
							for(i = 0, l = e.length; i < l; i++) mUtil.removeClass(n[0], "m-menu__item--open")
					},
					setActiveItem: function(t) {
						r.resetActiveItem(), mUtil.addClass(t, "m-menu__item--active");
						for(var e = mUtil.parents(t, ".m-menu__item--submenu"), a = 0, n = e.length; a < n; a++) mUtil.addClass(e[a], "m-menu__item--open")
					},
					getBreadcrumbs: function(t) {
						var e, a = [],
							n = mUtil.child(t, ".m-menu__link");
						a.push({
							text: e = mUtil.child(n, ".m-menu__link-text") ? e.innerHTML : "",
							title: n.getAttribute("title"),
							href: n.getAttribute("href")
						});
						for(var o = mUtil.parents(t, ".m-menu__item--submenu"), i = 0, l = o.length; i < l; i++) {
							var r = mUtil.child(o[i], ".m-menu__link");
							a.push({
								text: e = mUtil.child(r, ".m-menu__link-text") ? e.innerHTML : "",
								title: r.getAttribute("title"),
								href: r.getAttribute("href")
							})
						}
						return a.reverse()
					},
					getPageTitle: function(t) {
						var e;
						return mUtil.child(t, ".m-menu__link-text") ? e.innerHTML : ""
					},
					eventTrigger: function(t, e) {
						for(var n = 0; n < a.events.length; n++) {
							var o = a.events[n];
							o.name == t && (1 == o.one ? 0 == o.fired && (a.events[n].fired = !0, o.handler.call(this, a, e)) : o.handler.call(this, a, e))
						}
					},
					addEvent: function(t, e, n) {
						a.events.push({
							name: t,
							handler: e,
							one: n,
							fired: !1
						})
					}
				};
			return a.setDefaults = function(t) {
				l = t
			}, a.setActiveItem = function(t) {
				return r.setActiveItem(t)
			}, a.reload = function() {
				return r.reload()
			}, a.getBreadcrumbs = function(t) {
				return r.getBreadcrumbs(t)
			}, a.getPageTitle = function(t) {
				return r.getPageTitle(t)
			}, a.getSubmenuMode = function(t) {
				return r.getSubmenuMode(t)
			}, a.hideDropdown = function(t) {
				r.hideSubmenuDropdown(t, !0)
			}, a.pauseDropdownHover = function(t) {
				r.pauseDropdownHover(t)
			}, a.resumeDropdownHover = function() {
				return r.resumeDropdownHover()
			}, a.on = function(t, e) {
				return r.addEvent(t, e)
			}, a.one = function(t, e) {
				return r.addEvent(t, e, !0)
			}, r.construct.apply(a, [e]), mUtil.addResizeHandler(function() {
				n && a.reload()
			}), n = !0, a
		}
	};
document.addEventListener("click", function(t) {
	var e;
	if(e = mUtil.get("body").querySelectorAll('.m-menu__nav .m-menu__item.m-menu__item--submenu.m-menu__item--hover:not(.m-menu__item--tabs)[m-menu-submenu-toggle="click"]'))
		for(var a = 0, n = e.length; a < n; a++) {
			var o = e[a].closest(".m-menu__nav").parentNode;
			if(o) {
				var i, l = mUtil.data(o).get("menu");
				if(!l) break;
				if(!l || "dropdown" !== l.getSubmenuMode()) break;
				if(t.target !== o && !1 === o.contains(t.target))
					if(i = o.querySelectorAll('.m-menu__item--submenu.m-menu__item--hover:not(.m-menu__item--tabs)[m-menu-submenu-toggle="click"]'))
						for(var r = 0, s = i.length; r < s; r++) l.hideDropdown(i[r])
			}
		}
});
var mOffcanvas = function(t, e) {
		var a = this,
			n = mUtil.get(t),
			o = mUtil.get("body");
		if(n) {
			var i = {},
				l = {
					construct: function(t) {
						return mUtil.data(n).has("offcanvas") ? a = mUtil.data(n).get("offcanvas") : (l.init(t), l.build(), mUtil.data(n).set("offcanvas", a)), a
					},
					init: function(t) {
						a.events = [], a.options = mUtil.deepExtend({}, i, t), a.overlay, a.classBase = a.options.baseClass, a.classShown = a.classBase + "--on", a.classOverlay = a.classBase + "-overlay", a.state = mUtil.hasClass(n, a.classShown) ? "shown" : "hidden"
					},
					build: function() {
						if(a.options.toggleBy)
							if("string" == typeof a.options.toggleBy) mUtil.addEvent(a.options.toggleBy, "click", l.toggle);
							else if(a.options.toggleBy && a.options.toggleBy[0] && a.options.toggleBy[0].target)
							for(var t in a.options.toggleBy) mUtil.addEvent(a.options.toggleBy[t].target, "click", l.toggle);
						else a.options.toggleBy && a.options.toggleBy.target && mUtil.addEvent(a.options.toggleBy.target, "click", l.toggle);
						var e = mUtil.get(a.options.closeBy);
						e && mUtil.addEvent(e, "click", l.hide)
					},
					toggle: function() {
						l.eventTrigger("toggle"), "shown" == a.state ? l.hide(this) : l.show(this)
					},
					show: function(t) {
						"shown" != a.state && (l.eventTrigger("beforeShow"), l.togglerClass(t, "show"), mUtil.addClass(o, a.classShown), mUtil.addClass(n, a.classShown), a.state = "shown", a.options.overlay && (a.overlay = mUtil.insertAfter(document.createElement("DIV"), n), mUtil.addClass(a.overlay, a.classOverlay), mUtil.addEvent(a.overlay, "click", function(e) {
							e.stopPropagation(), e.preventDefault(), l.hide(t)
						})), l.eventTrigger("afterShow"))
					},
					hide: function(t) {
						"hidden" != a.state && (l.eventTrigger("beforeHide"), l.togglerClass(t, "hide"), mUtil.removeClass(o, a.classShown), mUtil.removeClass(n, a.classShown), a.state = "hidden", a.options.overlay && a.overlay && mUtil.remove(a.overlay), l.eventTrigger("afterHide"))
					},
					togglerClass: function(t, e) {
						var n, o = mUtil.attr(t, "id");
						if(a.options.toggleBy && a.options.toggleBy[0] && a.options.toggleBy[0].target)
							for(var i in a.options.toggleBy) a.options.toggleBy[i].target === o && (n = a.options.toggleBy[i]);
						else a.options.toggleBy && a.options.toggleBy.target && (n = a.options.toggleBy);
						if(n) {
							var l = mUtil.get(n.target);
							"show" === e && mUtil.addClass(l, n.state), "hide" === e && mUtil.removeClass(l, n.state)
						}
					},
					eventTrigger: function(t, e) {
						for(var n = 0; n < a.events.length; n++) {
							var o = a.events[n];
							o.name == t && (1 == o.one ? 0 == o.fired && (a.events[n].fired = !0, o.handler.call(this, a, e)) : o.handler.call(this, a, e))
						}
					},
					addEvent: function(t, e, n) {
						a.events.push({
							name: t,
							handler: e,
							one: n,
							fired: !1
						})
					}
				};
			return a.setDefaults = function(t) {
				i = t
			}, a.hide = function() {
				return l.hide()
			}, a.show = function() {
				return l.show()
			}, a.on = function(t, e) {
				return l.addEvent(t, e)
			}, a.one = function(t, e) {
				return l.addEvent(t, e, !0)
			}, l.construct.apply(a, [e]), !0, a
		}
	},
	mPortlet = function(t, e) {
		var a = this,
			n = mUtil.get(t),
			o = mUtil.get("body");
		if(n) {
			var l = {
					bodyToggleSpeed: 400,
					tooltips: !0,
					tools: {
						toggle: {
							collapse: "Collapse",
							expand: "Expand"
						},
						reload: "Reload",
						remove: "Remove",
						fullscreen: {
							on: "Fullscreen",
							off: "Exit Fullscreen"
						}
					}
				},
				r = {
					construct: function(t) {
						return mUtil.data(n).has("portlet") ? a = mUtil.data(n).get("portlet") : (r.init(t), r.build(), mUtil.data(n).set("portlet", a)), a
					},
					init: function(t) {
						a.element = n, a.events = [], a.options = mUtil.deepExtend({}, l, t), a.head = mUtil.child(n, ".m-portlet__head"), a.foot = mUtil.child(n, ".m-portlet__foot"), mUtil.child(n, ".m-portlet__body") ? a.body = mUtil.child(n, ".m-portlet__body") : 0 !== mUtil.child(n, ".m-form").length && (a.body = mUtil.child(n, ".m-form"))
					},
					build: function() {
						var t = mUtil.find(a.head, "[m-portlet-tool=remove]");
						t && mUtil.addEvent(t, "click", function(t) {
							t.preventDefault(), r.remove()
						});
						var e = mUtil.find(a.head, "[m-portlet-tool=reload]");
						e && mUtil.addEvent(e, "click", function(t) {
							t.preventDefault(), r.reload()
						});
						var n = mUtil.find(a.head, "[m-portlet-tool=toggle]");
						n && mUtil.addEvent(n, "click", function(t) {
							t.preventDefault(), r.toggle()
						});
						var o = mUtil.find(a.head, "[m-portlet-tool=fullscreen]");
						o && mUtil.addEvent(o, "click", function(t) {
							t.preventDefault(), r.fullscreen()
						}), r.setupTooltips()
					},
					remove: function() {
						!1 !== r.eventTrigger("beforeRemove") && (mUtil.hasClass(o, "m-portlet--fullscreen") && mUtil.hasClass(n, "m-portlet--fullscreen") && r.fullscreen("off"), r.removeTooltips(), mUtil.remove(n), r.eventTrigger("afterRemove"))
					},
					setContent: function(t) {
						t && (a.body.innerHTML = t)
					},
					getBody: function() {
						return a.body
					},
					getSelf: function() {
						return n
					},
					setupTooltips: function() {
						if(a.options.tooltips) {
							var t = mUtil.hasClass(n, "m-portlet--collapse") || mUtil.hasClass(n, "m-portlet--collapsed"),
								e = mUtil.hasClass(o, "m-portlet--fullscreen") && mUtil.hasClass(n, "m-portlet--fullscreen"),
								i = mUtil.find(a.head, "[m-portlet-tool=remove]");
							if(i) {
								var l = e ? "bottom" : "top",
									r = new Tooltip(i, {
										title: a.options.tools.remove,
										placement: l,
										offset: e ? "0,10px,0,0" : "0,5px",
										trigger: "hover",
										template: '<div class="m-tooltip m-tooltip--portlet tooltip bs-tooltip-' + l + '" role="tooltip">                            <div class="tooltip-arrow arrow"></div>                            <div class="tooltip-inner"></div>                        </div>'
									});
								mUtil.data(i).set("tooltip", r)
							}
							var s = mUtil.find(a.head, "[m-portlet-tool=reload]");
							if(s) {
								l = e ? "bottom" : "top", r = new Tooltip(s, {
									title: a.options.tools.reload,
									placement: l,
									offset: e ? "0,10px,0,0" : "0,5px",
									trigger: "hover",
									template: '<div class="m-tooltip m-tooltip--portlet tooltip bs-tooltip-' + l + '" role="tooltip">                            <div class="tooltip-arrow arrow"></div>                            <div class="tooltip-inner"></div>                        </div>'
								});
								mUtil.data(s).set("tooltip", r)
							}
							var d = mUtil.find(a.head, "[m-portlet-tool=toggle]");
							if(d) {
								l = e ? "bottom" : "top", r = new Tooltip(d, {
									title: t ? a.options.tools.toggle.expand : a.options.tools.toggle.collapse,
									placement: l,
									offset: e ? "0,10px,0,0" : "0,5px",
									trigger: "hover",
									template: '<div class="m-tooltip m-tooltip--portlet tooltip bs-tooltip-' + l + '" role="tooltip">                            <div class="tooltip-arrow arrow"></div>                            <div class="tooltip-inner"></div>                        </div>'
								});
								mUtil.data(d).set("tooltip", r)
							}
							var c = mUtil.find(a.head, "[m-portlet-tool=fullscreen]");
							if(c) {
								l = e ? "bottom" : "top", r = new Tooltip(c, {
									title: e ? a.options.tools.fullscreen.off : a.options.tools.fullscreen.on,
									placement: l,
									offset: e ? "0,10px,0,0" : "0,5px",
									trigger: "hover",
									template: '<div class="m-tooltip m-tooltip--portlet tooltip bs-tooltip-' + l + '" role="tooltip">                            <div class="tooltip-arrow arrow"></div>                            <div class="tooltip-inner"></div>                        </div>'
								});
								mUtil.data(c).set("tooltip", r)
							}
						}
					},
					removeTooltips: function() {
						if(a.options.tooltips) {
							var t = mUtil.find(a.head, "[m-portlet-tool=remove]");
							t && mUtil.data(t).has("tooltip") && mUtil.data(t).get("tooltip").dispose();
							var e = mUtil.find(a.head, "[m-portlet-tool=reload]");
							e && mUtil.data(e).has("tooltip") && mUtil.data(e).get("tooltip").dispose();
							var n = mUtil.find(a.head, "[m-portlet-tool=toggle]");
							n && mUtil.data(n).has("tooltip") && mUtil.data(n).get("tooltip").dispose();
							var o = mUtil.find(a.head, "[m-portlet-tool=fullscreen]");
							o && mUtil.data(o).has("tooltip") && mUtil.data(o).get("tooltip").dispose()
						}
					},
					reload: function() {
						r.eventTrigger("reload")
					},
					toggle: function() {
						mUtil.hasClass(n, "m-portlet--collapse") || mUtil.hasClass(n, "m-portlet--collapsed") ? r.expand() : r.collapse()
					},
					collapse: function() {
						if(!1 !== r.eventTrigger("beforeCollapse")) {
							mUtil.slideUp(a.body, a.options.bodyToggleSpeed, function() {
								r.eventTrigger("afterCollapse")
							}), mUtil.addClass(n, "m-portlet--collapse");
							var t = mUtil.find(a.head, "[m-portlet-tool=toggle]");
							t && mUtil.data(t).has("tooltip") && mUtil.data(t).get("tooltip").updateTitleContent(a.options.tools.toggle.expand)
						}
					},
					expand: function() {
						if(!1 !== r.eventTrigger("beforeExpand")) {
							mUtil.slideDown(a.body, a.options.bodyToggleSpeed, function() {
								r.eventTrigger("afterExpand")
							}), mUtil.removeClass(n, "m-portlet--collapse"), mUtil.removeClass(n, "m-portlet--collapsed");
							var t = mUtil.find(a.head, "[m-portlet-tool=toggle]");
							t && mUtil.data(t).has("tooltip") && mUtil.data(t).get("tooltip").updateTitleContent(a.options.tools.toggle.collapse)
						}
					},
					fullscreen: function(t) {
						if("off" === t || mUtil.hasClass(o, "m-portlet--fullscreen") && mUtil.hasClass(n, "m-portlet--fullscreen")) r.eventTrigger("beforeFullscreenOff"), mUtil.removeClass(o, "m-portlet--fullscreen"), mUtil.removeClass(n, "m-portlet--fullscreen"), r.removeTooltips(), r.setupTooltips(), a.foot && (mUtil.css(a.body, "margin-bottom", ""), mUtil.css(a.foot, "margin-top", "")), r.eventTrigger("afterFullscreenOff");
						else {
							if(r.eventTrigger("beforeFullscreenOn"), mUtil.addClass(n, "m-portlet--fullscreen"), mUtil.addClass(o, "m-portlet--fullscreen"), r.removeTooltips(), r.setupTooltips(), a.foot) {
								var e = parseInt(mUtil.css(a.foot, "height")),
									i = parseInt(mUtil.css(a.foot, "height")) + parseInt(mUtil.css(a.head, "height"));
								mUtil.css(a.body, "margin-bottom", e + "px"), mUtil.css(a.foot, "margin-top", "-" + i + "px")
							}
							r.eventTrigger("afterFullscreenOn")
						}
					},
					eventTrigger: function(t) {
						for(i = 0; i < a.events.length; i++) {
							var e = a.events[i];
							e.name == t && (1 == e.one ? 0 == e.fired && (a.events[i].fired = !0, e.handler.call(this, a)) : e.handler.call(this, a))
						}
					},
					addEvent: function(t, e, n) {
						return a.events.push({
							name: t,
							handler: e,
							one: n,
							fired: !1
						}), a
					}
				};
			return a.setDefaults = function(t) {
				l = t
			}, a.remove = function() {
				return r.remove(html)
			}, a.reload = function() {
				return r.reload()
			}, a.setContent = function(t) {
				return r.setContent(t)
			}, a.toggle = function() {
				return r.toggle()
			}, a.collapse = function() {
				return r.collapse()
			}, a.expand = function() {
				return r.expand()
			}, a.fullscreen = function() {
				return r.fullscreen("on")
			}, a.unFullscreen = function() {
				return r.fullscreen("off")
			}, a.getBody = function() {
				return r.getBody()
			}, a.getSelf = function() {
				return r.getSelf()
			}, a.on = function(t, e) {
				return r.addEvent(t, e)
			}, a.one = function(t, e) {
				return r.addEvent(t, e, !0)
			}, r.construct.apply(a, [e]), a
		}
	},
	mQuicksearch = function(t, e) {
		var a = this,
			n = mUtil.get(t),
			o = mUtil.get("body");
		if(n) {
			var l = {
					mode: "default",
					minLength: 1,
					maxHeight: 300,
					requestTimeout: 200,
					inputTarget: "m_quicksearch_input",
					iconCloseTarget: "m_quicksearch_close",
					iconCancelTarget: "m_quicksearch_cancel",
					iconSearchTarget: "m_quicksearch_search",
					spinnerClass: "m-loader m-loader--skin-light m-loader--right",
					hasResultClass: "m-list-search--has-result",
					templates: {
						error: '<div class="m-search-results m-search-results--skin-light"><span class="m-search-result__message">{{message}}</div></div>'
					}
				},
				r = {
					construct: function(t) {
						return mUtil.data(n).has("quicksearch") ? a = mUtil.data(n).get("quicksearch") : (r.init(t), r.build(), mUtil.data(n).set("quicksearch", a)), a
					},
					init: function(t) {
						a.element = n, a.events = [], a.options = mUtil.deepExtend({}, l, t), a.query = "", a.form = mUtil.find(n, "form"), a.input = mUtil.get(a.options.inputTarget), a.iconClose = mUtil.get(a.options.iconCloseTarget), "default" == a.options.mode && (a.iconSearch = mUtil.get(a.options.iconSearchTarget), a.iconCancel = mUtil.get(a.options.iconCancelTarget)), a.dropdown = new mDropdown(n, {
							mobileOverlay: !1
						}), a.cancelTimeout, a.processing = !1, a.requestTimeout = !1
					},
					build: function() {
						mUtil.addEvent(a.input, "keyup", r.search), "default" == a.options.mode ? (mUtil.addEvent(a.input, "focus", r.showDropdown), mUtil.addEvent(a.iconCancel, "click", r.handleCancel), mUtil.addEvent(a.iconSearch, "click", function() {
							mUtil.isInResponsiveRange("tablet-and-mobile") && (mUtil.addClass(o, "m-header-search--mobile-expanded"), a.input.focus())
						}), mUtil.addEvent(a.iconClose, "click", function() {
							mUtil.isInResponsiveRange("tablet-and-mobile") && (mUtil.removeClass(o, "m-header-search--mobile-expanded"), r.closeDropdown())
						})) : "dropdown" == a.options.mode && (a.dropdown.on("afterShow", function() {
							a.input.focus()
						}), mUtil.addEvent(a.iconClose, "click", r.closeDropdown))
					},
					showProgress: function() {
						return a.processing = !0, mUtil.addClass(a.form, a.options.spinnerClass), r.handleCancelIconVisibility("off"), a
					},
					hideProgress: function() {
						return a.processing = !1, mUtil.removeClass(a.form, a.options.spinnerClass), r.handleCancelIconVisibility("on"), mUtil.addClass(n, a.options.hasResultClass), a
					},
					search: function(t) {
						if(a.query = a.input.value, 0 === a.query.length && (r.handleCancelIconVisibility("on"), mUtil.removeClass(n, a.options.hasResultClass), mUtil.removeClass(a.form, a.options.spinnerClass)), !(a.query.length < a.options.minLength || 1 == a.processing)) return a.requestTimeout && clearTimeout(a.requestTimeout), a.requestTimeout = !1, a.requestTimeout = setTimeout(function() {
							r.eventTrigger("search")
						}, a.options.requestTimeout), a
					},
					handleCancelIconVisibility: function(t) {
						"on" == t ? 0 === a.input.value.length ? (a.iconCancel && mUtil.css(a.iconCancel, "visibility", "hidden"), a.iconClose && mUtil.css(a.iconClose, "visibility", "visible")) : (clearTimeout(a.cancelTimeout), a.cancelTimeout = setTimeout(function() {
							a.iconCancel && mUtil.css(a.iconCancel, "visibility", "visible"), a.iconClose && mUtil.css(a.iconClose, "visibility", "visible")
						}, 500)) : (a.iconCancel && mUtil.css(a.iconCancel, "visibility", "hidden"), a.iconClose && mUtil.css(a.iconClose, "visibility", "hidden"))
					},
					handleCancel: function(t) {
						a.input.value = "", mUtil.css(a.iconCancel, "visibility", "hidden"), mUtil.removeClass(n, a.options.hasResultClass), r.closeDropdown()
					},
					closeDropdown: function() {
						a.dropdown.hide()
					},
					showDropdown: function(t) {
						0 == a.dropdown.isShown() && a.input.value.length > a.options.minLength && 0 == a.processing && (console.log("show!!!"), a.dropdown.show(), t && (t.preventDefault(), t.stopPropagation()))
					},
					eventTrigger: function(t) {
						for(i = 0; i < a.events.length; i++) {
							var e = a.events[i];
							e.name == t && (1 == e.one ? 0 == e.fired && (a.events[i].fired = !0, e.handler.call(this, a)) : e.handler.call(this, a))
						}
					},
					addEvent: function(t, e, n) {
						return a.events.push({
							name: t,
							handler: e,
							one: n,
							fired: !1
						}), a
					}
				};
			return a.setDefaults = function(t) {
				l = t
			}, a.search = function() {
				return r.handleSearch()
			}, a.showResult = function(t) {
				return a.dropdown.setContent(t), r.showDropdown(), a
			}, a.showError = function(t) {
				var e = a.options.templates.error.replace("{{message}}", t);
				return a.dropdown.setContent(e), r.showDropdown(), a
			}, a.showProgress = function() {
				return r.showProgress()
			}, a.hideProgress = function() {
				return r.hideProgress()
			}, a.search = function() {
				return r.search()
			}, a.on = function(t, e) {
				return r.addEvent(t, e)
			}, a.one = function(t, e) {
				return r.addEvent(t, e, !0)
			}, r.construct.apply(a, [e]), a
		}
	},
	mScrollTop = function(t, e) {
		var a = this,
			n = mUtil.get(t),
			o = mUtil.get("body");
		if(n) {
			var i = {
					offset: 300,
					speed: 600
				},
				l = {
					construct: function(t) {
						return mUtil.data(n).has("scrolltop") ? a = mUtil.data(n).get("scrolltop") : (l.init(t), l.build(), mUtil.data(n).set("scrolltop", a)), a
					},
					init: function(t) {
						a.events = [], a.options = mUtil.deepExtend({}, i, t)
					},
					build: function() {
						navigator.userAgent.match(/iPhone|iPad|iPod/i) ? (window.addEventListener("touchend", function() {
							l.handle()
						}), window.addEventListener("touchcancel", function() {
							l.handle()
						}), window.addEventListener("touchleave", function() {
							l.handle()
						})) : window.addEventListener("scroll", function() {
							l.handle()
						}), mUtil.addEvent(n, "click", l.scroll)
					},
					handle: function() {
						window.pageYOffset > a.options.offset ? mUtil.addClass(o, "m-scroll-top--shown") : mUtil.removeClass(o, "m-scroll-top--shown")
					},
					scroll: function(t) {
						t.preventDefault(), mUtil.scrollTop(a.options.speed)
					},
					eventTrigger: function(t, e) {
						for(var n = 0; n < a.events.length; n++) {
							var o = a.events[n];
							o.name == t && (1 == o.one ? 0 == o.fired && (a.events[n].fired = !0, o.handler.call(this, a, e)) : o.handler.call(this, a, e))
						}
					},
					addEvent: function(t, e, n) {
						a.events.push({
							name: t,
							handler: e,
							one: n,
							fired: !1
						})
					}
				};
			return a.setDefaults = function(t) {
				i = t
			}, a.on = function(t, e) {
				return l.addEvent(t, e)
			}, a.one = function(t, e) {
				return l.addEvent(t, e, !0)
			}, l.construct.apply(a, [e]), !0, a
		}
	},
	mToggle = function(t, e) {
		var a = this,
			n = mUtil.get(t);
		mUtil.get("body");
		if(n) {
			var o = {
					togglerState: "",
					targetState: ""
				},
				l = {
					construct: function(t) {
						return mUtil.data(n).has("toggle") ? a = mUtil.data(n).get("toggle") : (l.init(t), l.build(), mUtil.data(n).set("toggle", a)), a
					},
					init: function(t) {
						a.element = n, a.events = [], a.options = mUtil.deepExtend({}, o, t), a.target = mUtil.get(a.options.target), a.targetState = a.options.targetState, a.togglerState = a.options.togglerState, a.state = mUtil.hasClasses(a.target, a.targetState) ? "on" : "off"
					},
					build: function() {
						mUtil.addEvent(n, "mouseup", l.toggle)
					},
					toggle: function() {
						return "off" == a.state ? l.toggleOn() : l.toggleOff(), a
					},
					toggleOn: function() {
						return l.eventTrigger("beforeOn"), mUtil.addClass(a.target, a.targetState), a.togglerState && mUtil.addClass(n, a.togglerState), a.state = "on", l.eventTrigger("afterOn"), l.eventTrigger("toggle"), a
					},
					toggleOff: function() {
						return l.eventTrigger("beforeOff"), mUtil.removeClass(a.target, a.targetState), a.togglerState && mUtil.removeClass(n, a.togglerState), a.state = "off", l.eventTrigger("afterOff"), l.eventTrigger("toggle"), a
					},
					eventTrigger: function(t) {
						for(i = 0; i < a.events.length; i++) {
							var e = a.events[i];
							e.name == t && (1 == e.one ? 0 == e.fired && (a.events[i].fired = !0, e.handler.call(this, a)) : e.handler.call(this, a))
						}
					},
					addEvent: function(t, e, n) {
						return a.events.push({
							name: t,
							handler: e,
							one: n,
							fired: !1
						}), a
					}
				};
			return a.setDefaults = function(t) {
				o = t
			}, a.getState = function() {
				return a.state
			}, a.toggle = function() {
				return l.toggle()
			}, a.toggleOn = function() {
				return l.toggleOn()
			}, a.toggle = function() {
				return l.toggleOff()
			}, a.on = function(t, e) {
				return l.addEvent(t, e)
			}, a.one = function(t, e) {
				return l.addEvent(t, e, !0)
			}, l.construct.apply(a, [e]), a
		}
	},
	mWizard = function(t, e) {
		var a = this,
			n = mUtil.get(t);
		mUtil.get("body");
		if(n) {
			var o = {
					startStep: 1,
					manualStepForward: !1
				},
				l = {
					construct: function(t) {
						return mUtil.data(n).has("wizard") ? a = mUtil.data(n).get("wizard") : (l.init(t), l.build(), mUtil.data(n).set("wizard", a)), a
					},
					init: function(t) {
						a.element = n, a.events = [], a.options = mUtil.deepExtend({}, o, t), a.steps = mUtil.findAll(n, ".m-wizard__step"), a.progress = mUtil.find(n, ".m-wizard__progress .progress-bar"), a.btnSubmit = mUtil.find(n, '[data-wizard-action="submit"]'), a.btnNext = mUtil.find(n, '[data-wizard-action="next"]'), a.btnPrev = mUtil.find(n, '[data-wizard-action="prev"]'), a.btnLast = mUtil.find(n, '[data-wizard-action="last"]'), a.btnFirst = mUtil.find(n, '[data-wizard-action="first"]'), a.events = [], a.currentStep = 1, a.stop = !1, a.totalSteps = a.steps.length, a.options.startStep > 1 && l.goTo(a.options.startStep), l.updateUI()
					},
					build: function() {
						mUtil.addEvent(a.btnNext, "click", function(t) {
							t.preventDefault(), l.goNext()
						}), mUtil.addEvent(a.btnPrev, "click", function(t) {
							t.preventDefault(), l.goPrev()
						}), mUtil.addEvent(a.btnFirst, "click", function(t) {
							t.preventDefault(), l.goFirst()
						}), mUtil.addEvent(a.btnLast, "click", function(t) {
							t.preventDefault(), l.goLast()
						}), mUtil.on(n, ".m-wizard__step a.m-wizard__step-number", "click", function() {
							for(var t, e = this.closest(".m-wizard__step"), n = mUtil.parents(this, ".m-wizard__steps"), o = mUtil.findAll(n, ".m-wizard__step"), i = 0, r = o.length; i < r; i++)
								if(e === o[i]) {
									t = i + 1;
									break
								}
							t && (!1 === a.options.manualStepForward ? t < a.currentStep && l.goTo(t) : l.goTo(t))
						})
					},
					goTo: function(t) {
						if(t !== a.currentStep) {
							var e;
							if(e = (t = t ? parseInt(t) : l.getNextStep()) > a.currentStep ? l.eventTrigger("beforeNext") : l.eventTrigger("beforePrev"), !0 !== a.stop) return !1 !== e && (a.currentStep = t, l.updateUI(), l.eventTrigger("change")), t > a.startStep ? l.eventTrigger("afterNext") : l.eventTrigger("afterPrev"), a;
							a.stop = !1
						}
					},
					setStepClass: function() {
						l.isLastStep() ? mUtil.addClass(n, "m-wizard--step-last") : mUtil.removeClass(n, "m-wizard--step-last"), l.isFirstStep() ? mUtil.addClass(n, "m-wizard--step-first") : mUtil.removeClass(n, "m-wizard--step-first"), l.isBetweenStep() ? mUtil.addClass(n, "m-wizard--step-between") : mUtil.removeClass(n, "m-wizard--step-between")
					},
					updateUI: function(t) {
						l.updateProgress(), l.handleTarget(), l.setStepClass();
						for(var e = 0, n = a.steps.length; e < n; e++) mUtil.removeClass(a.steps[e], "m-wizard__step--current m-wizard__step--done");
						for(e = 1; e < a.currentStep; e++) mUtil.addClass(a.steps[e - 1], "m-wizard__step--done");
						mUtil.addClass(a.steps[a.currentStep - 1], "m-wizard__step--current")
					},
					stop: function() {
						a.stop = !0
					},
					start: function() {
						a.stop = !1
					},
					isLastStep: function() {
						return a.currentStep === a.totalSteps
					},
					isFirstStep: function() {
						return 1 === a.currentStep
					},
					isBetweenStep: function() {
						return !1 === l.isLastStep() && !1 === l.isFirstStep()
					},
					goNext: function() {
						return l.goTo(l.getNextStep())
					},
					goPrev: function() {
						return l.goTo(l.getPrevStep())
					},
					goLast: function() {
						return l.goTo(a.totalSteps)
					},
					goFirst: function() {
						return l.goTo(1)
					},
					updateProgress: function() {
						if(a.progress)
							if(mUtil.hasClass(n, "m-wizard--1")) {
								var t = a.currentStep / a.totalSteps * 100,
									e = mUtil.find(n, ".m-wizard__step-number"),
									o = parseInt(mUtil.css(e, "width"));
								mUtil.css(a.progress, "width", "calc(" + t + "% + " + o / 2 + "px)")
							} else if(mUtil.hasClass(n, "m-wizard--2")) {
							a.currentStep;
							var i = (a.currentStep - 1) * (1 / (a.totalSteps - 1) * 100);
							mUtil.isInResponsiveRange("minimal-desktop-and-below") ? mUtil.css(a.progress, "height", i + "%") : mUtil.css(a.progress, "width", i + "%")
						} else {
							t = a.currentStep / a.totalSteps * 100;
							mUtil.css(a.progress, "width", t + "%")
						}
					},
					handleTarget: function() {
						var t = a.steps[a.currentStep - 1],
							e = mUtil.get(mUtil.attr(t, "m-wizard-target")),
							o = mUtil.find(n, ".m-wizard__form-step--current");
						mUtil.removeClass(o, "m-wizard__form-step--current"), mUtil.addClass(e, "m-wizard__form-step--current")
					},
					getNextStep: function() {
						return a.totalSteps >= a.currentStep + 1 ? a.currentStep + 1 : a.totalSteps
					},
					getPrevStep: function() {
						return a.currentStep - 1 >= 1 ? a.currentStep - 1 : 1
					},
					eventTrigger: function(t) {
						for(i = 0; i < a.events.length; i++) {
							var e = a.events[i];
							e.name == t && (1 == e.one ? 0 == e.fired && (a.events[i].fired = !0, e.handler.call(this, a)) : e.handler.call(this, a))
						}
					},
					addEvent: function(t, e, n) {
						return a.events.push({
							name: t,
							handler: e,
							one: n,
							fired: !1
						}), a
					}
				};
			return a.setDefaults = function(t) {
				o = t
			}, a.goNext = function() {
				return l.goNext()
			}, a.goPrev = function() {
				return l.goPrev()
			}, a.goLast = function() {
				return l.goLast()
			}, a.stop = function() {
				return l.stop()
			}, a.start = function() {
				return l.start()
			}, a.goFirst = function() {
				return l.goFirst()
			}, a.goTo = function(t) {
				return l.goTo(t)
			}, a.getStep = function() {
				return a.currentStep
			}, a.isLastStep = function() {
				return l.isLastStep()
			}, a.isFirstStep = function() {
				return l.isFirstStep()
			}, a.on = function(t, e) {
				return l.addEvent(t, e)
			}, a.one = function(t, e) {
				return l.addEvent(t, e, !0)
			}, l.construct.apply(a, [e]), a
		}
	};
! function(t) {
	t.fn.mDatatable = t.fn.mDatatable || {}, t.fn.mDatatable.checkbox = function(e, a) {
		var n = {
			selectedAllRows: !1,
			selectedRows: [],
			unselectedRows: [],
			init: function() {
				n.selectorEnabled() && (a.vars.requestIds && e.setDataSourceParam(a.vars.requestIds, !0), n.selectedAllRows = e.getDataSourceParam(a.vars.selectedAllRows), t(e).on("m-datatable--on-layout-updated", function(a, o) {
					o.table == t(e.wrap).attr("id") && e.ready(function() {
						n.initVars(), n.initEvent(), n.initSelect()
					})
				}))
			},
			initEvent: function() {
				t(e.tableHead).find('.m-checkbox--all > [type="checkbox"]').click(function(o) {
					if(n.selectedRows = n.unselectedRows = [], e.stateRemove("checkbox"), t(this).is(":checked") ? n.selectedAllRows = !0 : n.selectedAllRows = !1, !a.vars.requestIds) {
						t(this).is(":checked") && (n.selectedRows = t.makeArray(t(e.tableBody).find('.m-checkbox--single > [type="checkbox"]').map(function(e, a) {
							return t(a).val()
						})));
						var i = {};
						i.selectedRows = t.unique(n.selectedRows), e.stateKeep("checkbox", i)
					}
					e.setDataSourceParam(a.vars.selectedAllRows, n.selectedAllRows), t(e).trigger("m-datatable--on-click-checkbox", [t(this)])
				}), t(e.tableBody).find('.m-checkbox--single > [type="checkbox"]').click(function(o) {
					var i = t(this).val();
					t(this).is(":checked") ? (n.selectedRows.push(i), n.unselectedRows = n.remove(n.unselectedRows, i)) : (n.unselectedRows.push(i), n.selectedRows = n.remove(n.selectedRows, i)), !a.vars.requestIds && n.selectedRows.length < 1 && t(e.tableHead).find('.m-checkbox--all > [type="checkbox"]').prop("checked", !1);
					var l = {};
					l.selectedRows = t.unique(n.selectedRows), l.unselectedRows = t.unique(n.unselectedRows), e.stateKeep("checkbox", l), t(e).trigger("m-datatable--on-click-checkbox", [t(this)])
				})
			},
			initSelect: function() {
				n.selectedAllRows && a.vars.requestIds ? (e.hasClass("m-datatable--error") || t(e.tableHead).find('.m-checkbox--all > [type="checkbox"]').prop("checked", !0), e.setActiveAll(!0), n.unselectedRows.forEach(function(t) {
					e.setInactive(t)
				})) : (n.selectedRows.forEach(function(t) {
					e.setActive(t)
				}), !e.hasClass("m-datatable--error") && t(e.tableBody).find('.m-checkbox--single > [type="checkbox"]').not(":checked").length < 1 && t(e.tableHead).find('.m-checkbox--all > [type="checkbox"]').prop("checked", !0))
			},
			selectorEnabled: function() {
				return t.grep(e.options.columns, function(t, e) {
					return t.selector || !1
				})[0]
			},
			initVars: function() {
				var t = e.stateGet("checkbox");
				void 0 !== t && (n.selectedRows = t.selectedRows || [], n.unselectedRows = t.unselectedRows || [])
			},
			getSelectedId: function(t) {
				if(n.initVars(), n.selectedAllRows && a.vars.requestIds) {
					void 0 === t && (t = a.vars.rowIds);
					var o = e.getObject(t, e.lastResponse) || [];
					return o.length > 0 && n.unselectedRows.forEach(function(t) {
						o = n.remove(o, parseInt(t))
					}), o
				}
				return n.selectedRows
			},
			remove: function(t, e) {
				return t.filter(function(t) {
					return t !== e
				})
			}
		};
		return e.checkbox = function() {
			return n
		}, "object" == typeof a && (a = t.extend(!0, {}, t.fn.mDatatable.checkbox.default, a), n.init.apply(this, [a])), e
	}, t.fn.mDatatable.checkbox.default = {
		vars: {
			selectedAllRows: "selectedAllRows",
			requestIds: "requestIds",
			rowIds: "meta.rowIds"
		}
	}
}(jQuery);
var mLayout = function() {
	var t, e, a, n, o, i = function() {
		0 !== $("#m_aside_left_hide_toggle").length && (i = new mToggle("m_aside_left_hide_toggle", {
			target: "body",
			targetState: "m-aside-left--hide",
			togglerState: "m-brand__toggler--active"
		})).on("toggle", function(a) {
			t.pauseDropdownHover(800), e.pauseDropdownHover(800), Cookies.set("sidebar_hide_state", a.getState())
		})
	};
	return {
		init: function() {
			this.initHeader(), this.initAside()
		},
		initHeader: function() {
			var e, a, o;
			a = mUtil.get("m_header"), o = {
				offset: {},
				minimize: {}
			}, "hide" == mUtil.attr(a, "m-minimize-mobile") ? (o.minimize.mobile = {}, o.minimize.mobile.on = "m-header--hide", o.minimize.mobile.off = "m-header--show") : o.minimize.mobile = !1, "hide" == mUtil.attr(a, "m-minimize") ? (o.minimize.desktop = {}, o.minimize.desktop.on = "m-header--hide", o.minimize.desktop.off = "m-header--show") : o.minimize.desktop = !1, (e = mUtil.attr(a, "m-minimize-offset")) && (o.offset.desktop = e), (e = mUtil.attr(a, "m-minimize-mobile-offset")) && (o.offset.mobile = e), new mHeader("m_header", o), n = new mOffcanvas("m_header_menu", {
				overlay: !0,
				baseClass: "m-aside-header-menu-mobile",
				closeBy: "m_aside_header_menu_mobile_close_btn",
				toggleBy: {
					target: "m_aside_header_menu_mobile_toggle",
					state: "m-brand__toggler--active"
				}
			}), t = new mMenu("m_header_menu", {
				submenu: {
					desktop: "dropdown",
					tablet: "accordion",
					mobile: "accordion"
				},
				accordion: {
					slideSpeed: 200,
					autoScroll: !0,
					expandAll: !1
				}
			}), $("#m_aside_header_topbar_mobile_toggle").click(function() {
				$("body").toggleClass("m-topbar--on")
			}), setInterval(function() {
				$("#m_topbar_notification_icon .m-nav__link-icon").addClass("m-animate-shake"), $("#m_topbar_notification_icon .m-nav__link-badge").addClass("m-animate-blink")
			}, 3e3), setInterval(function() {
				$("#m_topbar_notification_icon .m-nav__link-icon").removeClass("m-animate-shake"), $("#m_topbar_notification_icon .m-nav__link-badge").removeClass("m-animate-blink")
			}, 6e3), 0 !== $("#m_quicksearch").length && new mQuicksearch("m_quicksearch", {
				mode: mUtil.attr("m_quicksearch", "m-quicksearch-mode"),
				minLength: 1
			}).on("search", function(t) {
				t.showProgress(), $.ajax({
					url: "https://keenthemes.com/metronic/preview/inc/api/quick_search.php",
					data: {
						query: t.query
					},
					dataType: "html",
					success: function(e) {
						t.hideProgress(), t.showResult(e)
					},
					error: function(e) {
						t.hideProgress(), t.showError("Connection error. Pleae try again later.")
					}
				})
			}), new mScrollTop("m_scroll_top", {
				offset: 300,
				speed: 600
			})
		},
		initAside: function() {
			var n, l;
			n = mUtil.get("m_aside_left"), l = mUtil.hasClass(n, "m-aside-left--offcanvas-default") ? "m-aside-left--offcanvas-default" : "m-aside-left", a = new mOffcanvas("m_aside_left", {
					baseClass: l,
					overlay: !0,
					closeBy: "m_aside_left_close_btn",
					toggleBy: {
						target: "m_aside_left_offcanvas_toggle",
						state: "m-brand__toggler--active"
					}
				}),
				function() {
					var t = $("#m_ver_menu"),
						a = "1" === t.data("m-menu-dropdown") ? "dropdown" : "accordion";
					if(e = new mMenu("m_ver_menu", {
							submenu: {
								desktop: {
									default: a,
									state: {
										body: "m-aside-left--minimize",
										mode: "dropdown"
									}
								},
								tablet: "accordion",
								mobile: "accordion"
							},
							accordion: {
								autoScroll: !0,
								expandAll: !1
							}
						}), "1" === t.attr("m-menu-scrollable")) {
						function n(t) {
							if(mUtil.isInResponsiveRange("tablet-and-mobile")) mApp.destroyScroller(t);
							else {
								var e = mUtil.getViewPort().height - parseInt(mUtil.css("m_header", "height"));
								mApp.initScroller(t, {
									height: e
								})
							}
						}
						n(t), mUtil.addResizeHandler(function() {
							n(t)
						})
					}
				}(), 0 !== $("#m_aside_left_minimize_toggle").length && (o = new mToggle("m_aside_left_minimize_toggle", {
					target: "body",
					targetState: "m-brand--minimize m-aside-left--minimize",
					togglerState: "m-brand__toggler--active"
				})).on("toggle", function(a) {
					t.pauseDropdownHover(800), e.pauseDropdownHover(800), Cookies.set("sidebar_toggle_state", a.getState())
				}), i(), this.onLeftSidebarToggle(function(t) {
					var e = $(".m-datatable");
					$(e).each(function() {
						$(this).mDatatable("redraw")
					})
				})
		},
		getAsideMenu: function() {
			return e
		},
		onLeftSidebarToggle: function(t) {
			o && o.on("toggle", t)
		},
		closeMobileAsideMenuOffcanvas: function() {
			mUtil.isMobileDevice() && a.hide()
		},
		closeMobileHorMenuOffcanvas: function() {
			mUtil.isMobileDevice() && n.hide()
		}
	}
}();
$(document).ready(function() {
	!1 === mUtil.isAngularVersion() && mLayout.init()
});
var mQuickSidebar = function() {
	var t = $("#m_quick_sidebar"),
		e = $("#m_quick_sidebar_tabs"),
		a = t.find(".m-quick-sidebar__content"),
		n = function() {
			! function() {
				var a = $("#m_quick_sidebar_tabs_messenger");
				if(0 !== a.length) {
					var n = a.find(".m-messenger__messages"),
						o = function() {
							var o = t.outerHeight(!0) - e.outerHeight(!0) - a.find(".m-messenger__form").outerHeight(!0) - 120;
							n.css("height", o), mApp.initScroller(n, {})
						};
					o(), mUtil.addResizeHandler(o)
				}
			}(),
			function() {
				var t = $("#m_quick_sidebar_tabs_settings");
				if(0 !== t.length) {
					var a = function() {
						var a = mUtil.getViewPort().height - e.outerHeight(!0) - 60;
						t.css("height", a), mApp.initScroller(t, {})
					};
					a(), mUtil.addResizeHandler(a)
				}
			}(),
			function() {
				var t = $("#m_quick_sidebar_tabs_logs");
				if(0 !== t.length) {
					var a = function() {
						var a = mUtil.getViewPort().height - e.outerHeight(!0) - 60;
						t.css("height", a), mApp.initScroller(t, {})
					};
					a(), mUtil.addResizeHandler(a)
				}
			}()
		};
	return {
		init: function() {
			0 !== t.length && new mOffcanvas("m_quick_sidebar", {
				overlay: !0,
				baseClass: "m-quick-sidebar",
				closeBy: "m_quick_sidebar_close",
				toggleBy: "m_quick_sidebar_toggle"
			}).one("afterShow", function() {
				mApp.block(t), setTimeout(function() {
					mApp.unblock(t), a.removeClass("m--hide"), n()
				}, 1e3)
			})
		}
	}
}();
$(document).ready(function() {
	mQuickSidebar.init()
});