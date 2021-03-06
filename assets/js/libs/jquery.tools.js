/*!
 * jQuery Tools v1.2.7 - The missing UI library for the Web
 * 
 * dateinput/dateinput.js
 * overlay/overlay.js
 * overlay/overlay.apple.js
 * rangeinput/rangeinput.js
 * scrollable/scrollable.js
 * scrollable/scrollable.autoscroll.js
 * scrollable/scrollable.navigator.js
 * tabs/tabs.js
 * tabs/tabs.slideshow.js
 * toolbox/toolbox.expose.js
 * toolbox/toolbox.flashembed.js
 * toolbox/toolbox.history.js
 * toolbox/toolbox.mousewheel.js
 * tooltip/tooltip.js
 * tooltip/tooltip.dynamic.js
 * tooltip/tooltip.slide.js
 * validator/validator.js
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 * jquery.event.wheel.js - rev 1 
 * Copyright (c) 2008, Three Dub Media (http://threedubmedia.com)
 * Liscensed under the MIT License (MIT-LICENSE.txt)
 * http://www.opensource.org/licenses/mit-license.php
 * Created: 2008-07-01 | Updated: 2008-07-14
 * 
 * -----
 * 
 */
(function(d, D) {
    function M(b, a) {
        b = "" + b;
        for (a = a || 2; b.length < a;) b = "0" + b;
        return b
    }

    function N(b, a, d, g) {
        var f = a.getDate(),
            l = a.getDay(),
            k = a.getMonth(),
            c = a.getFullYear(),
            f = {
                d: f,
                dd: M(f),
                ddd: r[g].shortDays[l],
                dddd: r[g].days[l],
                m: k + 1,
                mm: M(k + 1),
                mmm: r[g].shortMonths[k],
                mmmm: r[g].months[k],
                yy: ("" + c).slice(2),
                yyyy: c
            },
            b = O[b](d, a, f, g);
        return S.html(b).html()
    }

    function l(b) {
        return parseInt(b, 10)
    }

    function P(b, a) {
        return b.getFullYear() === a.getFullYear() && b.getMonth() == a.getMonth() && b.getDate() == a.getDate()
    }

    function w(b) {
        if (b !==
            D) {
            if (b.constructor == Date) return b;
            if ("string" == typeof b) {
                var a = b.split("-");
                if (3 == a.length) return new Date(l(a[0]), l(a[1]) - 1, l(a[2]));
                if (!/^-?\d+$/.test(b)) return;
                b = l(b)
            }
            a = new Date;
            a.setDate(a.getDate() + b);
            return a
        }
    }

    function T(b, a) {
        function j(a, t, c) {
            o = a;
            z = a.getFullYear();
            B = a.getMonth();
            A = a.getDate();
            c || (c = d.Event("api"));
            "click" == c.type && !d.browser.msie && b.focus();
            c.type = "beforeChange";
            C.trigger(c, [a]);
            c.isDefaultPrevented() || (b.val(N(t.formatter, a, t.format, t.lang)), c.type = "change", C.trigger(c),
                b.data("date", a), f.hide(c))
        }

        function g(a) {
            a.type = "onShow";
            C.trigger(a);
            d(document).on("keydown.d", function(a) {
                if (a.ctrlKey) return !0;
                var e = a.keyCode;
                if (8 == e || 46 == e) return b.val(""), f.hide(a);
                if (27 == e || 9 == e) return f.hide(a);
                if (0 <= d(Q).index(e)) {
                    if (!u) return f.show(a), a.preventDefault();
                    var h = d("#" + c.weeks + " a"),
                        j = d("." + c.focus),
                        g = h.index(j);
                    j.removeClass(c.focus);
                    if (74 == e || 40 == e) g += 7;
                    else if (75 == e || 38 == e) g -= 7;
                    else if (76 == e || 39 == e) g += 1;
                    else if (72 == e || 37 == e) g -= 1;
                    41 < g ? (f.addMonth(), j = d("#" + c.weeks + " a:eq(" +
                        (g - 42) + ")")) : 0 > g ? (f.addMonth(-1), j = d("#" + c.weeks + " a:eq(" + (g + 42) + ")")) : j = h.eq(g);
                    j.addClass(c.focus);
                    return a.preventDefault()
                }
                if (34 == e) return f.addMonth();
                if (33 == e) return f.addMonth(-1);
                if (36 == e) return f.today();
                13 == e && (d(a.target).is("select") || d("." + c.focus).click());
                return 0 <= d([16, 17, 18, 9]).index(e)
            });
            d(document).on("click.d", function(a) {
                var e = a.target;
                !d(e).parents("#" + c.root).length && e != b[0] && (!E || e != E[0]) && f.hide(a)
            })
        }
        var f = this,
            q = new Date,
            k = q.getFullYear(),
            c = a.css,
            F = r[a.lang],
            i = d("#" + c.root),
            K = i.find("#" + c.title),
            E, G, H, z, B, A, o = b.attr("data-value") || a.value || b.val(),
            n = b.attr("min") || a.min,
            p = b.attr("max") || a.max,
            u, I;
        0 === n && (n = "0");
        o = w(o) || q;
        n = w(n || new Date(k + a.yearRange[0], 1, 1));
        p = w(p || new Date(k + a.yearRange[1] + 1, 1, -1));
        if (!F) throw "Dateinput: invalid language: " + a.lang;
        "date" == b.attr("type") && (I = b.clone(), k = I.wrap("<div/>").parent().html(), k = d(k.replace(/type/i, "type=text data-orig-type")), a.value && k.val(a.value), b.replaceWith(k), b = k);
        b.addClass(c.input);
        var C = b.add(f);
        if (!i.length) {
            i =
                d("<div><div><a/><div/><a/></div><div><div/><div/></div></div>").hide().css({
                    position: "absolute"
                }).attr("id", c.root);
            i.children().eq(0).attr("id", c.head).end().eq(1).attr("id", c.body).children().eq(0).attr("id", c.days).end().eq(1).attr("id", c.weeks).end().end().end().find("a").eq(0).attr("id", c.prev).end().eq(1).attr("id", c.next);
            K = i.find("#" + c.head).find("div").attr("id", c.title);
            if (a.selectors) {
                var x = d("<select/>").attr("id", c.month),
                    y = d("<select/>").attr("id", c.year);
                K.html(x.add(y))
            }
            for (var k =
                    i.find("#" + c.days), L = 0; 7 > L; L++) k.append(d("<span/>").text(F.shortDays[(L + a.firstDay) % 7]));
            d("body").append(i)
        }
        a.trigger && (E = d("<a/>").attr("href", "#").addClass(c.trigger).click(function(e) {
            a.toggle ? f.toggle() : f.show();
            return e.preventDefault()
        }).insertAfter(b));
        var J = i.find("#" + c.weeks),
            y = i.find("#" + c.year),
            x = i.find("#" + c.month);
        d.extend(f, {
            show: function(e) {
                if (!b.attr("readonly") && !b.attr("disabled") && !u) {
                    e = e || d.Event();
                    e.type = "onBeforeShow";
                    C.trigger(e);
                    if (!e.isDefaultPrevented()) {
                        d.each(R, function() {
                            this.hide()
                        });
                        u = true;
                        x.off("change").change(function() {
                            f.setValue(l(y.val()), l(d(this).val()))
                        });
                        y.off("change").change(function() {
                            f.setValue(l(d(this).val()), l(x.val()))
                        });
                        G = i.find("#" + c.prev).off("click").click(function() {
                            G.hasClass(c.disabled) || f.addMonth(-1);
                            return false
                        });
                        H = i.find("#" + c.next).off("click").click(function() {
                            H.hasClass(c.disabled) || f.addMonth();
                            return false
                        });
                        f.setValue(o);
                        var t = b.offset();
                        if (/iPad/i.test(navigator.userAgent)) t.top = t.top - d(window).scrollTop();
                        i.css({
                            top: t.top + b.outerHeight({
                                    margins: true
                                }) +
                                a.offset[0],
                            left: t.left + a.offset[1]
                        });
                        if (a.speed) i.show(a.speed, function() {
                            g(e)
                        });
                        else {
                            i.show();
                            g(e)
                        }
                        return f
                    }
                }
            },
            setValue: function(e, b, g) {
                var h = l(b) >= -1 ? new Date(l(e), l(b), l(g == D || isNaN(g) ? 1 : g)) : e || o;
                h < n ? h = n : h > p && (h = p);
                typeof e == "string" && (h = w(e));
                e = h.getFullYear();
                b = h.getMonth();
                g = h.getDate();
                if (b == -1) {
                    b = 11;
                    e--
                } else if (b == 12) {
                    b = 0;
                    e++
                }
                if (!u) {
                    j(h, a);
                    return f
                }
                B = b;
                z = e;
                A = g;
                var g = (new Date(e, b, 1 - a.firstDay)).getDay(),
                    i = (new Date(e, b + 1, 0)).getDate(),
                    k = (new Date(e, b - 1 + 1, 0)).getDate(),
                    r;
                if (a.selectors) {
                    x.empty();
                    d.each(F.months, function(a, b) {
                        n < new Date(e, a + 1, 1) && p > new Date(e, a, 0) && x.append(d("<option/>").html(b).attr("value", a))
                    });
                    y.empty();
                    for (var h = q.getFullYear(), m = h + a.yearRange[0]; m < h + a.yearRange[1]; m++) n < new Date(m + 1, 0, 1) && p > new Date(m, 0, 0) && y.append(d("<option/>").text(m));
                    x.val(b);
                    y.val(e)
                } else K.html(F.months[b] + " " + e);
                J.empty();
                G.add(H).removeClass(c.disabled);
                for (var m = !g ? -7 : 0, s, v; m < (!g ? 35 : 42); m++) {
                    s = d("<a/>");
                    if (m % 7 === 0) {
                        r = d("<div/>").addClass(c.week);
                        J.append(r)
                    }
                    if (m < g) {
                        s.addClass(c.off);
                        v = k -
                            g + m + 1;
                        h = new Date(e, b - 1, v)
                    } else if (m >= g + i) {
                        s.addClass(c.off);
                        v = m - i - g + 1;
                        h = new Date(e, b + 1, v)
                    } else {
                        v = m - g + 1;
                        h = new Date(e, b, v);
                        P(o, h) ? s.attr("id", c.current).addClass(c.focus) : P(q, h) && s.attr("id", c.today)
                    }
                    n && h < n && s.add(G).addClass(c.disabled);
                    p && h > p && s.add(H).addClass(c.disabled);
                    s.attr("href", "#" + v).text(v).data("date", h);
                    r.append(s)
                }
                J.find("a").click(function(b) {
                    var e = d(this);
                    if (!e.hasClass(c.disabled)) {
                        d("#" + c.current).removeAttr("id");
                        e.attr("id", c.current);
                        j(e.data("date"), a, b)
                    }
                    return false
                });
                c.sunday &&
                    J.find("." + c.week).each(function() {
                        var b = a.firstDay ? 7 - a.firstDay : 0;
                        d(this).children().slice(b, b + 1).addClass(c.sunday)
                    });
                return f
            },
            setMin: function(a, b) {
                n = w(a);
                b && o < n && f.setValue(n);
                return f
            },
            setMax: function(a, b) {
                p = w(a);
                b && o > p && f.setValue(p);
                return f
            },
            today: function() {
                return f.setValue(q)
            },
            addDay: function(a) {
                return this.setValue(z, B, A + (a || 1))
            },
            addMonth: function(a) {
                var a = B + (a || 1),
                    b = (new Date(z, a + 1, 0)).getDate();
                return this.setValue(z, a, A <= b ? A : b)
            },
            addYear: function(a) {
                return this.setValue(z + (a || 1), B, A)
            },
            destroy: function() {
                b.add(document).off("click.d keydown.d");
                i.add(E).remove();
                b.removeData("dateinput").removeClass(c.input);
                I && b.replaceWith(I)
            },
            hide: function(a) {
                if (u) {
                    a = d.Event();
                    a.type = "onHide";
                    C.trigger(a);
                    if (a.isDefaultPrevented()) return;
                    d(document).off("click.d keydown.d");
                    i.hide();
                    u = false
                }
                return f
            },
            toggle: function() {
                return f.isOpen() ? f.hide() : f.show()
            },
            getConf: function() {
                return a
            },
            getInput: function() {
                return b
            },
            getCalendar: function() {
                return i
            },
            getValue: function(b) {
                return b ? N(a.formatter, o, b,
                    a.lang) : o
            },
            isOpen: function() {
                return u
            }
        });
        d.each(["onBeforeShow", "onShow", "change", "onHide"], function(b, c) {
            if (d.isFunction(a[c])) d(f).on(c, a[c]);
            f[c] = function(a) {
                if (a) d(f).on(c, a);
                return f
            }
        });
        a.editable || b.on("focus.d click.d", f.show).keydown(function(a) {
            var c = a.keyCode;
            if (!u && d(Q).index(c) >= 0) {
                f.show(a);
                return a.preventDefault()
            }(c == 8 || c == 46) && b.val("");
            return a.shiftKey || a.ctrlKey || a.altKey || c == 9 ? true : a.preventDefault()
        });
        w(b.val()) && j(o, a)
    }
    d.tools = d.tools || {
        version: "@VERSION"
    };
    var R = [],
        O = {},
        q, Q = [75, 76, 38, 39, 74, 72, 40, 37],
        r = {};
    q = d.tools.dateinput = {
        conf: {
            format: "mm/dd/yy",
            formatter: "default",
            selectors: !1,
            yearRange: [-5, 5],
            lang: "en",
            offset: [0, 0],
            speed: 0,
            firstDay: 0,
            min: D,
            max: D,
            trigger: 0,
            toggle: 0,
            editable: 0,
            css: {
                prefix: "cal",
                input: "date",
                root: 0,
                head: 0,
                title: 0,
                prev: 0,
                next: 0,
                month: 0,
                year: 0,
                days: 0,
                body: 0,
                weeks: 0,
                today: 0,
                current: 0,
                week: 0,
                off: 0,
                sunday: 0,
                focus: 0,
                disabled: 0,
                trigger: 0
            }
        },
        addFormatter: function(b, a) {
            O[b] = a
        },
        localize: function(b, a) {
            d.each(a, function(b, d) {
                a[b] = d.split(",")
            });
            r[b] = a
        }
    };
    q.localize("en", {
        months: "January,February,March,April,May,June,July,August,September,October,November,December",
        shortMonths: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec",
        days: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",
        shortDays: "Sun,Mon,Tue,Wed,Thu,Fri,Sat"
    });
    var S = d("<a/>");
    q.addFormatter("default", function(b, a, d) {
        return b.replace(/d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*'/g, function(a) {
            return a in d ? d[a] : a
        })
    });
    q.addFormatter("prefixed", function(b, a, d) {
        return b.replace(/%(d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*')/g,
            function(a, b) {
                return b in d ? d[b] : a
            })
    });
    d.expr[":"].date = function(b) {
        var a = b.getAttribute("type");
        return a && "date" == a || !!d(b).data("dateinput")
    };
    d.fn.dateinput = function(b) {
        if (this.data("dateinput")) return this;
        b = d.extend(!0, {}, q.conf, b);
        d.each(b.css, function(a, d) {
            !d && "prefix" != a && (b.css[a] = (b.css.prefix || "") + (d || a))
        });
        var a;
        this.each(function() {
            var j = new T(d(this), b);
            R.push(j);
            j = j.getInput().data("dateinput", j);
            a = a ? a.add(j) : j
        });
        return a ? a : this
    }
})(jQuery);
(function(b) {
    function m(a, c) {
        var d = this,
            h = a.add(d),
            n = b(window),
            e, f, k, g = b.tools.expose && (c.mask || c.expose),
            l = Math.random().toString().slice(10);
        g && ("string" == typeof g && (g = {
            color: g
        }), g.closeOnClick = g.closeOnEsc = !1);
        var i = c.target || a.attr("rel");
        f = i ? b(i) : a;
        if (!f.length) throw "Could not find Overlay: " + i;
        a && -1 == a.index(f) && a.click(function(b) {
            d.load(b);
            return b.preventDefault()
        });
        b.extend(d, {
            load: function(a) {
                if (d.isOpened()) return d;
                var p = o[c.effect];
                if (!p) throw 'Overlay: cannot find effect : "' + c.effect +
                    '"';
                c.oneInstance && b.each(q, function() {
                    this.close(a)
                });
                a = a || b.Event();
                a.type = "onBeforeLoad";
                h.trigger(a);
                if (a.isDefaultPrevented()) return d;
                k = true;
                g && b(f).expose(g);
                var j = c.top,
                    e = c.left,
                    i = f.outerWidth({
                        margin: true
                    }),
                    m = f.outerHeight({
                        margin: true
                    });
                typeof j == "string" && (j = j == "center" ? Math.max((n.height() - m) / 2, 0) : parseInt(j, 10) / 100 * n.height());
                e == "center" && (e = Math.max((n.width() - i) / 2, 0));
                p[0].call(d, {
                    top: j,
                    left: e
                }, function() {
                    if (k) {
                        a.type = "onLoad";
                        h.trigger(a)
                    }
                });
                if (g && c.closeOnClick) b.mask.getMask().one("click",
                    d.close);
                if (c.closeOnClick) b(document).on("click." + l, function(a) {
                    b(a.target).parents(f).length || d.close(a)
                });
                if (c.closeOnEsc) b(document).on("keydown." + l, function(a) {
                    a.keyCode == 27 && d.close(a)
                });
                return d
            },
            close: function(a) {
                if (!d.isOpened()) return d;
                a = a || b.Event();
                a.type = "onBeforeClose";
                h.trigger(a);
                if (!a.isDefaultPrevented()) {
                    k = false;
                    o[c.effect][1].call(d, function() {
                        a.type = "onClose";
                        h.trigger(a)
                    });
                    b(document).off("click." + l + " keydown." + l);
                    g && b.mask.close();
                    return d
                }
            },
            getOverlay: function() {
                return f
            },
            getTrigger: function() {
                return a
            },
            getClosers: function() {
                return e
            },
            isOpened: function() {
                return k
            },
            getConf: function() {
                return c
            }
        });
        b.each(["onBeforeLoad", "onStart", "onLoad", "onBeforeClose", "onClose"], function(a, e) {
            if (b.isFunction(c[e])) b(d).on(e, c[e]);
            d[e] = function(a) {
                if (a) b(d).on(e, a);
                return d
            }
        });
        e = f.find(c.close || ".close");
        !e.length && !c.close && (e = b('<a class="close"></a>'), f.prepend(e));
        e.click(function(a) {
            d.close(a)
        });
        c.load && d.load()
    }
    b.tools = b.tools || {
        version: "@VERSION"
    };
    b.tools.overlay = {
        addEffect: function(a,
            b, d) {
            o[a] = [b, d]
        },
        conf: {
            close: null,
            closeOnClick: !0,
            closeOnEsc: !0,
            closeSpeed: "fast",
            effect: "default",
            fixed: !b.browser.msie || 6 < b.browser.version,
            left: "center",
            load: !1,
            mask: null,
            oneInstance: !0,
            speed: "normal",
            target: null,
            top: "10%"
        }
    };
    var q = [],
        o = {};
    b.tools.overlay.addEffect("default", function(a, c) {
        var d = this.getConf(),
            h = b(window);
        d.fixed || (a.top += h.scrollTop(), a.left += h.scrollLeft());
        a.position = d.fixed ? "fixed" : "absolute";
        this.getOverlay().css(a).fadeIn(d.speed, c)
    }, function(a) {
        this.getOverlay().fadeOut(this.getConf().closeSpeed,
            a)
    });
    b.fn.overlay = function(a) {
        var c = this.data("overlay");
        if (c) return c;
        b.isFunction(a) && (a = {
            onBeforeLoad: a
        });
        a = b.extend(!0, {}, b.tools.overlay.conf, a);
        this.each(function() {
            c = new m(b(this), a);
            q.push(c);
            b(this).data("overlay", c)
        });
        return a.api ? c : this
    }
})(jQuery);
(function(h) {
    function l(a) {
        var e = a.offset();
        return {
            top: e.top + a.height() / 2,
            left: e.left + a.width() / 2
        }
    }
    var i = h.tools.overlay,
        f = h(window);
    h.extend(i.conf, {
        start: {
            top: null,
            left: null
        },
        fadeInSpeed: "fast",
        zIndex: 9999
    });
    i.addEffect("apple", function(a, e) {
        var b = this.getOverlay(),
            d = this.getConf(),
            g = this.getTrigger(),
            i = this,
            m = b.outerWidth({
                margin: !0
            }),
            c = b.data("img"),
            n = d.fixed ? "fixed" : "absolute";
        if (!c) {
            c = b.css("backgroundImage");
            if (!c) throw "background-image CSS property not set for overlay";
            c = c.slice(c.indexOf("(") +
                1, c.indexOf(")")).replace(/\"/g, "");
            b.css("backgroundImage", "none");
            c = h('<img src="' + c + '"/>');
            c.css({
                border: 0,
                display: "none"
            }).width(m);
            h("body").append(c);
            b.data("img", c)
        }
        var j = d.start.top || Math.round(f.height() / 2),
            k = d.start.left || Math.round(f.width() / 2);
        g && (g = l(g), j = g.top, k = g.left);
        d.fixed ? (j -= f.scrollTop(), k -= f.scrollLeft()) : (a.top += f.scrollTop(), a.left += f.scrollLeft());
        c.css({
            position: "absolute",
            top: j,
            left: k,
            width: 0,
            zIndex: d.zIndex
        }).show();
        a.position = n;
        b.css(a);
        c.animate({
            top: a.top,
            left: a.left,
            width: m
        }, d.speed, function() {
            b.css("zIndex", d.zIndex + 1).fadeIn(d.fadeInSpeed, function() {
                i.isOpened() && !h(this).index(b) ? e.call() : b.hide()
            })
        }).css("position", n)
    }, function(a) {
        var e = this.getOverlay().hide(),
            b = this.getConf(),
            d = this.getTrigger(),
            e = e.data("img"),
            g = {
                top: b.start.top,
                left: b.start.left,
                width: 0
            };
        d && h.extend(g, l(d));
        b.fixed && e.css({
            position: "absolute"
        }).animate({
            top: "+=" + f.scrollTop(),
            left: "+=" + f.scrollLeft()
        }, 0);
        e.animate(g, b.closeSpeed, a)
    })
})(jQuery);
(function(a) {
    function z(c, b) {
        var a = Math.pow(10, b);
        return Math.round(c * a) / a
    }

    function m(c, b) {
        var a = parseInt(c.css(b), 10);
        return a ? a : (a = c[0].currentStyle) && a.width && parseInt(a.width, 10)
    }

    function y(a) {
        return (a = a.data("events")) && a.onSlide
    }

    function A(c, b) {
        function e(a, d, f, e) {
            void 0 === f ? f = d / i * v : e && (f -= b.min);
            s && (f = Math.round(f / s) * s);
            if (void 0 === d || s) d = f * i / v;
            if (isNaN(f)) return g;
            d = Math.max(0, Math.min(d, i));
            f = d / i * v;
            if (e || !n) f += b.min;
            n && (e ? d = i - d : f = b.max - f);
            var f = z(f, r),
                h = "click" == a.type;
            if (u && void 0 !== k &&
                !h && (a.type = "onSlide", w.trigger(a, [f, d]), a.isDefaultPrevented())) return g;
            e = h ? b.speed : 0;
            h = h ? function() {
                a.type = "change";
                w.trigger(a, [f])
            } : null;
            n ? (j.animate({
                top: d
            }, e, h), b.progress && x.animate({
                height: i - d + j.height() / 2
            }, e)) : (j.animate({
                left: d
            }, e, h), b.progress && x.animate({
                width: d + j.width() / 2
            }, e));
            k = f;
            c.val(f);
            return g
        }

        function o() {
            (n = b.vertical || m(h, "height") > m(h, "width")) ? (i = m(h, "height") - m(j, "height"), l = h.offset().top + i) : (i = m(h, "width") - m(j, "width"), l = h.offset().left)
        }

        function q() {
            o();
            g.setValue(void 0 !==
                b.value ? b.value : b.min)
        }
        var g = this,
            p = b.css,
            h = a("<div><div/><a href='#'/></div>").data("rangeinput", g),
            n, k, l, i;
        c.before(h);
        var j = h.addClass(p.slider).find("a").addClass(p.handle),
            x = h.find("div").addClass(p.progress);
        a.each(["min", "max", "step", "value"], function(a, d) {
            var f = c.attr(d);
            parseFloat(f) && (b[d] = parseFloat(f, 10))
        });
        var v = b.max - b.min,
            s = "any" == b.step ? 0 : b.step,
            r = b.precision;
        void 0 === r && (r = s.toString().split("."), r = 2 === r.length ? r[1].length : 0);
        if ("range" == c.attr("type")) {
            var t = c.clone().wrap("<div/>").parent().html(),
                t = a(t.replace(/type/i, "type=text data-orig-type"));
            t.val(b.value);
            c.replaceWith(t);
            c = t
        }
        c.addClass(p.input);
        var w = a(g).add(c),
            u = !0;
        a.extend(g, {
            getValue: function() {
                return k
            },
            setValue: function(b, d) {
                o();
                return e(d || a.Event("api"), void 0, b, true)
            },
            getConf: function() {
                return b
            },
            getProgress: function() {
                return x
            },
            getHandle: function() {
                return j
            },
            getInput: function() {
                return c
            },
            step: function(c, d) {
                d = d || a.Event();
                g.setValue(k + (b.step == "any" ? 1 : b.step) * (c || 1), d)
            },
            stepUp: function(a) {
                return g.step(a || 1)
            },
            stepDown: function(a) {
                return g.step(-a ||
                    -1)
            }
        });
        a.each(["onSlide", "change"], function(c, d) {
            if (a.isFunction(b[d])) a(g).on(d, b[d]);
            g[d] = function(b) {
                if (b) a(g).on(d, b);
                return g
            }
        });
        j.drag({
            drag: !1
        }).on("dragStart", function() {
            o();
            u = y(a(g)) || y(c)
        }).on("drag", function(a, b, f) {
            if (c.is(":disabled")) return false;
            e(a, n ? b : f)
        }).on("dragEnd", function(a) {
            if (!a.isDefaultPrevented()) {
                a.type = "change";
                w.trigger(a, [k])
            }
        }).click(function(a) {
            return a.preventDefault()
        });
        h.click(function(a) {
            if (c.is(":disabled") || a.target == j[0]) return a.preventDefault();
            o();
            var b =
                n ? j.height() / 2 : j.width() / 2;
            e(a, n ? i - l - b + a.pageY : a.pageX - l - b)
        });
        b.keyboard && c.keydown(function(b) {
            if (!c.attr("readonly")) {
                var d = b.keyCode,
                    f = a([75, 76, 38, 33, 39]).index(d) != -1,
                    e = a([74, 72, 40, 34, 37]).index(d) != -1;
                if ((f || e) && !b.shiftKey && !b.altKey && !b.ctrlKey) {
                    f ? g.step(d == 33 ? 10 : 1, b) : e && g.step(d == 34 ? -10 : -1, b);
                    return b.preventDefault()
                }
            }
        });
        c.blur(function(b) {
            var c = a(this).val();
            c !== k && g.setValue(c, b)
        });
        a.extend(c[0], {
            stepUp: g.stepUp,
            stepDown: g.stepDown
        });
        q();
        i || a(window).load(q)
    }
    a.tools = a.tools || {
        version: "@VERSION"
    };
    var u;
    u = a.tools.rangeinput = {
        conf: {
            min: 0,
            max: 100,
            step: "any",
            steps: 0,
            value: 0,
            precision: void 0,
            vertical: 0,
            keyboard: !0,
            progress: !1,
            speed: 100,
            css: {
                input: "range",
                slider: "slider",
                progress: "progress",
                handle: "handle"
            }
        }
    };
    var q, l;
    a.fn.drag = function(c) {
        document.ondragstart = function() {
            return !1
        };
        c = a.extend({
            x: !0,
            y: !0,
            drag: !0
        }, c);
        q = q || a(document).on("mousedown mouseup", function(b) {
            var e = a(b.target);
            if ("mousedown" == b.type && e.data("drag")) {
                var o = e.position(),
                    m = b.pageX - o.left,
                    g = b.pageY - o.top,
                    p = !0;
                q.on("mousemove.drag",
                    function(a) {
                        var b = a.pageX - m,
                            a = a.pageY - g,
                            k = {};
                        c.x && (k.left = b);
                        c.y && (k.top = a);
                        p && (e.trigger("dragStart"), p = !1);
                        c.drag && e.css(k);
                        e.trigger("drag", [a, b]);
                        l = e
                    });
                b.preventDefault()
            } else try {
                l && l.trigger("dragEnd")
            } finally {
                q.off("mousemove.drag"), l = null
            }
        });
        return this.data("drag", !0)
    };
    a.expr[":"].range = function(c) {
        var b = c.getAttribute("type");
        return b && "range" == b || !!a(c).filter("input").data("rangeinput")
    };
    a.fn.rangeinput = function(c) {
        if (this.data("rangeinput")) return this;
        var c = a.extend(!0, {}, u.conf, c),
            b;
        this.each(function() {
            var e = new A(a(this), a.extend(!0, {}, c)),
                e = e.getInput().data("rangeinput", e);
            b = b ? b.add(e) : e
        });
        return b ? b : this
    }
})(jQuery);
(function(d) {
    function p(f, b) {
        var c = d(b);
        return 2 > c.length ? c : f.parent().find(b)
    }

    function u(f, b) {
        var c = this,
            n = f.add(c),
            g = f.children(),
            l = 0,
            j = b.vertical;
        k || (k = c);
        1 < g.length && (g = d(b.items, f));
        1 < b.size && (b.circular = !1);
        d.extend(c, {
            getConf: function() {
                return b
            },
            getIndex: function() {
                return l
            },
            getSize: function() {
                return c.getItems().size()
            },
            getNaviButtons: function() {
                return h.add(m)
            },
            getRoot: function() {
                return f
            },
            getItemWrap: function() {
                return g
            },
            getItems: function() {
                return g.find(b.item).not("." + b.clonedClass)
            },
            move: function(a, b) {
                return c.seekTo(l + a, b)
            },
            next: function(a) {
                return c.move(b.size, a)
            },
            prev: function(a) {
                return c.move(-b.size, a)
            },
            begin: function(a) {
                return c.seekTo(0, a)
            },
            end: function(a) {
                return c.seekTo(c.getSize() - 1, a)
            },
            focus: function() {
                return k = c
            },
            addItem: function(a) {
                a = d(a);
                if (b.circular) {
                    g.children().last().before(a);
                    g.children().first().replaceWith(a.clone().addClass(b.clonedClass))
                } else {
                    g.append(a);
                    m.removeClass("disabled")
                }
                n.trigger("onAddItem", [a]);
                return c
            },
            seekTo: function(a, e, f) {
                a.jquery || (a =
                    a * 1);
                if (b.circular && a === 0 && l == -1 && e !== 0 || !b.circular && a < 0 || a > c.getSize() || a < -1) return c;
                var i = a;
                a.jquery ? a = c.getItems().index(a) : i = c.getItems().eq(a);
                var h = d.Event("onBeforeSeek");
                if (!f) {
                    n.trigger(h, [a, e]);
                    if (h.isDefaultPrevented() || !i.length) return c
                }
                i = j ? {
                    top: -i.position().top
                } : {
                    left: -i.position().left
                };
                l = a;
                k = c;
                if (e === void 0) e = b.speed;
                g.animate(i, e, b.easing, f || function() {
                    n.trigger("onSeek", [a])
                });
                return c
            }
        });
        d.each(["onBeforeSeek", "onSeek", "onAddItem"], function(a, e) {
            if (d.isFunction(b[e])) d(c).on(e,
                b[e]);
            c[e] = function(a) {
                if (a) d(c).on(e, a);
                return c
            }
        });
        if (b.circular) {
            var q = c.getItems().slice(-1).clone().prependTo(g),
                r = c.getItems().eq(1).clone().appendTo(g);
            q.add(r).addClass(b.clonedClass);
            c.onBeforeSeek(function(a, b, d) {
                if (!a.isDefaultPrevented()) {
                    if (b == -1) {
                        c.seekTo(q, d, function() {
                            c.end(0)
                        });
                        return a.preventDefault()
                    }
                    b == c.getSize() && c.seekTo(r, d, function() {
                        c.begin(0)
                    })
                }
            });
            var o = f.parents().add(f).filter(function() {
                if (d(this).css("display") === "none") return true
            });
            o.length ? (o.show(), c.seekTo(0, 0,
                function() {}), o.hide()) : c.seekTo(0, 0, function() {})
        }
        var h = p(f, b.prev).click(function(a) {
                a.stopPropagation();
                c.prev()
            }),
            m = p(f, b.next).click(function(a) {
                a.stopPropagation();
                c.next()
            });
        b.circular || (c.onBeforeSeek(function(a, e) {
            setTimeout(function() {
                if (!a.isDefaultPrevented()) {
                    h.toggleClass(b.disabledClass, e <= 0);
                    m.toggleClass(b.disabledClass, e >= c.getSize() - 1)
                }
            }, 1)
        }), b.initialIndex || h.addClass(b.disabledClass));
        2 > c.getSize() && h.add(m).addClass(b.disabledClass);
        b.mousewheel && d.fn.mousewheel && f.mousewheel(function(a,
            e) {
            if (b.mousewheel) {
                c.move(e < 0 ? 1 : -1, b.wheelSpeed || 50);
                return false
            }
        });
        if (b.touch) {
            var s, t;
            g[0].ontouchstart = function(a) {
                a = a.touches[0];
                s = a.clientX;
                t = a.clientY
            };
            g[0].ontouchmove = function(a) {
                if (a.touches.length == 1 && !g.is(":animated")) {
                    var b = a.touches[0],
                        d = s - b.clientX,
                        b = t - b.clientY;
                    c[j && b > 0 || !j && d > 0 ? "next" : "prev"]();
                    a.preventDefault()
                }
            }
        }
        if (b.keyboard) d(document).on("keydown.scrollable", function(a) {
            if (b.keyboard && !a.altKey && !a.ctrlKey && !a.metaKey && !d(a.target).is(":input") && !(b.keyboard != "static" && k !=
                    c)) {
                var e = a.keyCode;
                if (j && (e == 38 || e == 40)) {
                    c.move(e == 38 ? -1 : 1);
                    return a.preventDefault()
                }
                if (!j && (e == 37 || e == 39)) {
                    c.move(e == 37 ? -1 : 1);
                    return a.preventDefault()
                }
            }
        });
        b.initialIndex && c.seekTo(b.initialIndex, 0, function() {})
    }
    d.tools = d.tools || {
        version: "@VERSION"
    };
    d.tools.scrollable = {
        conf: {
            activeClass: "active",
            circular: !1,
            clonedClass: "cloned",
            disabledClass: "disabled",
            easing: "swing",
            initialIndex: 0,
            item: "> *",
            items: ".items",
            keyboard: !0,
            mousewheel: !1,
            next: ".next",
            prev: ".prev",
            size: 1,
            speed: 400,
            vertical: !1,
            touch: !0,
            wheelSpeed: 0
        }
    };
    var k;
    d.fn.scrollable = function(f) {
        var b = this.data("scrollable");
        if (b) return b;
        f = d.extend({}, d.tools.scrollable.conf, f);
        this.each(function() {
            b = new u(d(this), f);
            d(this).data("scrollable", b)
        });
        return f.api ? b : this
    }
})(jQuery);
(function(d) {
    var h = d.tools.scrollable;
    h.autoscroll = {
        conf: {
            autoplay: !0,
            interval: 3E3,
            autopause: !0
        }
    };
    d.fn.autoscroll = function(b) {
        "number" == typeof b && (b = {
            interval: b
        });
        var e = d.extend({}, h.autoscroll.conf, b),
            i;
        this.each(function() {
            function b() {
                c && clearTimeout(c);
                c = setTimeout(function() {
                    a.next()
                }, e.interval)
            }
            var a = d(this).data("scrollable"),
                f = a.getRoot(),
                c, g = !1;
            a && (i = a);
            a.play = function() {
                c || (g = !1, f.on("onSeek", b), b())
            };
            a.pause = function() {
                c = clearTimeout(c);
                f.off("onSeek", b)
            };
            a.resume = function() {
                g || a.play()
            };
            a.stop = function() {
                g = !0;
                a.pause()
            };
            e.autopause && f.add(a.getNaviButtons()).hover(a.pause, a.resume);
            e.autoplay && a.play()
        });
        return e.api ? i : this
    }
})(jQuery);
(function(b) {
    function m(a, f) {
        var d = b(f);
        return 2 > d.length ? d : a.parent().find(f)
    }
    var g = b.tools.scrollable;
    g.navigator = {
        conf: {
            navi: ".navi",
            naviItem: null,
            activeClass: "active",
            indexed: !1,
            idPrefix: null,
            history: !1
        }
    };
    b.fn.navigator = function(a) {
        "string" == typeof a && (a = {
            navi: a
        });
        var a = b.extend({}, g.navigator.conf, a),
            f;
        this.each(function() {
            function d() {
                return i.find(a.naviItem || "> *")
            }

            function g(h) {
                var e = b("<" + (a.naviItem || "a") + "/>").click(function(a) {
                    b(this);
                    c.seekTo(h);
                    a.preventDefault();
                    j && history.pushState({
                            i: h
                        },
                        "")
                });
                0 === h && e.addClass(k);
                a.indexed && e.text(h + 1);
                a.idPrefix && e.attr("id", a.idPrefix + h);
                return e.appendTo(i)
            }
            var c = b(this).data("scrollable"),
                i = a.navi.jquery ? a.navi : m(c.getRoot(), a.navi),
                n = c.getNaviButtons(),
                k = a.activeClass,
                j = a.history && !!history.pushState,
                l = c.getConf().size;
            c && (f = c);
            c.getNaviButtons = function() {
                return n.add(i)
            };
            j && (history.pushState({
                i: 0
            }, ""), b(window).on("popstate", function(a) {
                (a = a.originalEvent.state) && c.seekTo(a.i)
            }));
            d().length ? d().each(function(a) {
                b(this).click(function(e) {
                    b(this);
                    c.seekTo(a);
                    e.preventDefault();
                    j && history.pushState({
                        i: a
                    }, "")
                })
            }) : b.each(c.getItems(), function(a) {
                a % l == 0 && g(a)
            });
            c.onBeforeSeek(function(a, c) {
                setTimeout(function() {
                    if (!a.isDefaultPrevented()) {
                        var b = c / l;
                        d().eq(b).length && d().removeClass(k).eq(b).addClass(k)
                    }
                }, 1)
            });
            c.onAddItem(function(a, b) {
                var d = c.getItems().index(b);
                d % l == 0 && g(d)
            })
        });
        return a.api ? f : this
    }
})(jQuery);
(function(d) {
    function n(c, a, b) {
        var e = this,
            l = c.add(this),
            g = c.find(b.tabs),
            f = a.jquery ? a : c.children(a),
            i;
        g.length || (g = c.children());
        f.length || (f = c.parent().find(a));
        f.length || (f = d(a));
        d.extend(this, {
            click: function(a, h) {
                var f = g.eq(a),
                    j = !c.data("tabs");
                "string" == typeof a && a.replace("#", "") && (f = g.filter('[href*="' + a.replace("#", "") + '"]'), a = Math.max(g.index(f), 0));
                if (b.rotate) {
                    var k = g.length - 1;
                    if (0 > a) return e.click(k, h);
                    if (a > k) return e.click(0, h)
                }
                if (!f.length) {
                    if (0 <= i) return e;
                    a = b.initialIndex;
                    f = g.eq(a)
                }
                if (a ===
                    i) return e;
                h = h || d.Event();
                h.type = "onBeforeClick";
                l.trigger(h, [a]);
                if (!h.isDefaultPrevented()) return m[j ? b.initialEffect && b.effect || "default" : b.effect].call(e, a, function() {
                    i = a;
                    h.type = "onClick";
                    l.trigger(h, [a])
                }), g.removeClass(b.current), f.addClass(b.current), e
            },
            getConf: function() {
                return b
            },
            getTabs: function() {
                return g
            },
            getPanes: function() {
                return f
            },
            getCurrentPane: function() {
                return f.eq(i)
            },
            getCurrentTab: function() {
                return g.eq(i)
            },
            getIndex: function() {
                return i
            },
            next: function() {
                return e.click(i + 1)
            },
            prev: function() {
                return e.click(i -
                    1)
            },
            destroy: function() {
                g.off(b.event).removeClass(b.current);
                f.find('a[href^="#"]').off("click.T");
                return e
            }
        });
        d.each(["onBeforeClick", "onClick"], function(a, c) {
            if (d.isFunction(b[c])) d(e).on(c, b[c]);
            e[c] = function(a) {
                if (a) d(e).on(c, a);
                return e
            }
        });
        b.history && d.fn.history && (d.tools.history.init(g), b.event = "history");
        g.each(function(a) {
            d(this).on(b.event, function(b) {
                e.click(a, b);
                return b.preventDefault()
            })
        });
        f.find('a[href^="#"]').on("click.T", function(a) {
            e.click(d(this).attr("href"), a)
        });
        location.hash &&
            "a" == b.tabs && c.find('[href="' + location.hash + '"]').length ? e.click(location.hash) : (0 === b.initialIndex || 0 < b.initialIndex) && e.click(b.initialIndex)
    }
    d.tools = d.tools || {
        version: "@VERSION"
    };
    d.tools.tabs = {
        conf: {
            tabs: "a",
            current: "current",
            onBeforeClick: null,
            onClick: null,
            effect: "default",
            initialEffect: !1,
            initialIndex: 0,
            event: "click",
            rotate: !1,
            slideUpSpeed: 400,
            slideDownSpeed: 400,
            history: !1
        },
        addEffect: function(c, a) {
            m[c] = a
        }
    };
    var m = {
            "default": function(c, a) {
                this.getPanes().hide().eq(c).show();
                a.call()
            },
            fade: function(c,
                a) {
                var b = this.getConf(),
                    e = b.fadeOutSpeed,
                    d = this.getPanes();
                e ? d.fadeOut(e) : d.hide();
                d.eq(c).fadeIn(b.fadeInSpeed, a)
            },
            slide: function(c, a) {
                var b = this.getConf();
                this.getPanes().slideUp(b.slideUpSpeed);
                this.getPanes().eq(c).slideDown(b.slideDownSpeed, a)
            },
            ajax: function(c, a) {
                this.getPanes().eq(0).load(this.getTabs().eq(c).attr("href"), a)
            }
        },
        j, k;
    d.tools.tabs.addEffect("horizontal", function(c, a) {
        if (!j) {
            var b = this.getPanes().eq(c),
                e = this.getCurrentPane();
            k || (k = this.getPanes().eq(0).width());
            j = !0;
            b.show();
            e.animate({
                width: 0
            }, {
                step: function(a) {
                    b.css("width", k - a)
                },
                complete: function() {
                    d(this).hide();
                    a.call();
                    j = !1
                }
            });
            e.length || (a.call(), j = !1)
        }
    });
    d.fn.tabs = function(c, a) {
        var b = this.data("tabs");
        b && (b.destroy(), this.removeData("tabs"));
        d.isFunction(a) && (a = {
            onBeforeClick: a
        });
        a = d.extend({}, d.tools.tabs.conf, a);
        this.each(function() {
            b = new n(d(this), c, a);
            d(this).data("tabs", b)
        });
        return a.api ? b : this
    }
})(jQuery);
(function(d) {
    function n(c, a) {
        function h(a) {
            var b = d(a);
            return 2 > b.length ? b : c.parent().find(a)
        }

        function i() {
            g = setTimeout(function() {
                e.next()
            }, a.interval)
        }
        var b = this,
            f = c.add(this),
            e = c.data("tabs"),
            g, j = !0,
            m = h(a.next).click(function() {
                e.next()
            }),
            k = h(a.prev).click(function() {
                e.prev()
            });
        d.extend(b, {
            getTabs: function() {
                return e
            },
            getConf: function() {
                return a
            },
            play: function() {
                if (g) return b;
                var a = d.Event("onBeforePlay");
                f.trigger(a);
                if (a.isDefaultPrevented()) return b;
                j = !1;
                f.trigger("onPlay");
                f.on("onClick", i);
                i();
                return b
            },
            pause: function() {
                if (!g) return b;
                var a = d.Event("onBeforePause");
                f.trigger(a);
                if (a.isDefaultPrevented()) return b;
                g = clearTimeout(g);
                f.trigger("onPause");
                f.off("onClick", i);
                return b
            },
            resume: function() {
                j || b.play()
            },
            stop: function() {
                b.pause();
                j = !0
            }
        });
        d.each(["onBeforePlay", "onPlay", "onBeforePause", "onPause"], function(e, c) {
            if (d.isFunction(a[c])) d(b).on(c, a[c]);
            b[c] = function(a) {
                return d(b).on(c, a)
            }
        });
        a.autopause && e.getTabs().add(m).add(k).add(e.getPanes()).hover(b.pause, b.resume);
        a.autoplay &&
            b.play();
        a.clickable && e.getPanes().click(function() {
            e.next()
        });
        if (!e.getConf().rotate) {
            var l = a.disabledClass;
            e.getIndex() || k.addClass(l);
            e.onBeforeClick(function(a, b) {
                k.toggleClass(l, !b);
                m.toggleClass(l, b == e.getTabs().length - 1)
            })
        }
    }
    var h;
    h = d.tools.tabs.slideshow = {
        conf: {
            next: ".forward",
            prev: ".backward",
            disabledClass: "disabled",
            autoplay: !1,
            autopause: !0,
            interval: 3E3,
            clickable: !0,
            api: !1
        }
    };
    d.fn.slideshow = function(c) {
        var a = this.data("slideshow");
        if (a) return a;
        c = d.extend({}, h.conf, c);
        this.each(function() {
            a =
                new n(d(this), c);
            d(this).data("slideshow", a)
        });
        return c.api ? a : this
    }
})(jQuery);
(function(b) {
    function j() {
        if (b.browser.msie) {
            var a = b(document).height(),
                c = b(window).height();
            return [window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, 20 > a - c ? c : a]
        }
        return [b(document).width(), b(document).height()]
    }

    function g(a) {
        if (a) return a.call(b.mask)
    }
    b.tools = b.tools || {
        version: "@VERSION"
    };
    var k;
    k = b.tools.expose = {
        conf: {
            maskId: "exposeMask",
            loadSpeed: "slow",
            closeSpeed: "fast",
            closeOnClick: !0,
            closeOnEsc: !0,
            zIndex: 9998,
            opacity: 0.8,
            startOpacity: 0,
            color: "#fff",
            onLoad: null,
            onClose: null
        }
    };
    var c, h, d, e, i;
    b.mask = {
        load: function(a, f) {
            if (d) return this;
            "string" == typeof a && (a = {
                color: a
            });
            a = a || e;
            e = a = b.extend(b.extend({}, k.conf), a);
            c = b("#" + a.maskId);
            c.length || (c = b("<div/>").attr("id", a.maskId), b("body").append(c));
            var l = j();
            c.css({
                position: "absolute",
                top: 0,
                left: 0,
                width: l[0],
                height: l[1],
                display: "none",
                opacity: a.startOpacity,
                zIndex: a.zIndex
            });
            a.color && c.css("backgroundColor", a.color);
            if (!1 === g(a.onBeforeLoad)) return this;
            if (a.closeOnEsc) b(document).on("keydown.mask", function(a) {
                a.keyCode ==
                    27 && b.mask.close(a)
            });
            if (a.closeOnClick) c.on("click.mask", function(a) {
                b.mask.close(a)
            });
            b(window).on("resize.mask", function() {
                b.mask.fit()
            });
            f && f.length && (i = f.eq(0).css("zIndex"), b.each(f, function() {
                var a = b(this);
                /relative|absolute|fixed/i.test(a.css("position")) || a.css("position", "relative")
            }), h = f.css({
                zIndex: Math.max(a.zIndex + 1, "auto" == i ? 0 : i)
            }));
            c.css({
                display: "block"
            }).fadeTo(a.loadSpeed, a.opacity, function() {
                b.mask.fit();
                g(a.onLoad);
                d = "full"
            });
            d = !0;
            return this
        },
        close: function() {
            if (d) {
                if (!1 === g(e.onBeforeClose)) return this;
                c.fadeOut(e.closeSpeed, function() {
                    g(e.onClose);
                    h && h.css({
                        zIndex: i
                    });
                    d = !1
                });
                b(document).off("keydown.mask");
                c.off("click.mask");
                b(window).off("resize.mask")
            }
            return this
        },
        fit: function() {
            if (d) {
                var a = j();
                c.css({
                    width: a[0],
                    height: a[1]
                })
            }
        },
        getMask: function() {
            return c
        },
        isLoaded: function(a) {
            return a ? "full" == d : d
        },
        getConf: function() {
            return e
        },
        getExposed: function() {
            return h
        }
    };
    b.fn.mask = function(a) {
        b.mask.load(a);
        return this
    };
    b.fn.expose = function(a) {
        b.mask.load(a, this);
        return this
    }
})(jQuery);
(function() {
    function h(a, b) {
        if (b)
            for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
        return a
    }

    function k(a, b) {
        var c = [],
            d;
        for (d in a) a.hasOwnProperty(d) && (c[d] = b(a[d]));
        return c
    }

    function l(a, b, c) {
        if (e.isSupported(b.version)) a.innerHTML = e.getHTML(b, c);
        else if (b.expressInstall && e.isSupported([6, 65])) a.innerHTML = e.getHTML(h(b, {
            src: b.expressInstall
        }), {
            MMredirectURL: location.href,
            MMplayerType: "PlugIn",
            MMdoctitle: document.title
        });
        else if (a.innerHTML.replace(/\s/g, "") || (a.innerHTML = "<h2>Flash version " + b.version +
                " or greater is required</h2><h3>" + (0 < f[0] ? "Your version is " + f : "You have no flash plugin installed") + "</h3>" + ("A" == a.tagName ? "<p>Click here to download latest version</p>" : "<p>Download latest version from <a href='" + j + "'>here</a></p>"), "A" == a.tagName && (a.onclick = function() {
                    location.href = j
                })), b.onFail) {
            var d = b.onFail.call(this);
            "string" == typeof d && (a.innerHTML = d)
        }
        i && (window[b.id] = document.getElementById(b.id));
        h(this, {
            getRoot: function() {
                return a
            },
            getOptions: function() {
                return b
            },
            getConf: function() {
                return c
            },
            getApi: function() {
                return a.firstChild
            }
        })
    }
    var i = document.all,
        j = "http://www.adobe.com/go/getflashplayer",
        m = "function" == typeof jQuery,
        n = /(\d+)[^\d]+(\d+)[^\d]*(\d*)/,
        g = {
            width: "100%",
            height: "100%",
            id: "_" + ("" + Math.random()).slice(9),
            allowfullscreen: !0,
            allowscriptaccess: "always",
            quality: "high",
            version: [3, 0],
            onFail: null,
            expressInstall: null,
            w3c: !1,
            cachebusting: !1
        };
    window.attachEvent && window.attachEvent("onbeforeunload", function() {
        __flash_unloadHandler = function() {};
        __flash_savedUnloadHandler = function() {}
    });
    window.flashembed = function(a, b, c) {
        "string" == typeof a && (a = document.getElementById(a.replace("#", "")));
        if (a) return "string" == typeof b && (b = {
            src: b
        }), new l(a, h(h({}, g), b), c)
    };
    var e = h(window.flashembed, {
            conf: g,
            getVersion: function() {
                var a, b;
                try {
                    b = navigator.plugins["Shockwave Flash"].description.slice(16)
                } catch (c) {
                    try {
                        b = (a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")) && a.GetVariable("$version")
                    } catch (d) {
                        try {
                            b = (a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6")) && a.GetVariable("$version")
                        } catch (e) {}
                    }
                }
                return (b =
                    n.exec(b)) ? [b[1], b[3]] : [0, 0]
            },
            asString: function(a) {
                if (null === a || void 0 === a) return null;
                var b = typeof a;
                "object" == b && a.push && (b = "array");
                switch (b) {
                    case "string":
                        return a = a.replace(RegExp('(["\\\\])', "g"), "\\$1"), a = a.replace(/^\s?(\d+\.?\d*)%/, "$1pct"), '"' + a + '"';
                    case "array":
                        return "[" + k(a, function(a) {
                            return e.asString(a)
                        }).join(",") + "]";
                    case "function":
                        return '"function()"';
                    case "object":
                        var b = [],
                            c;
                        for (c in a) a.hasOwnProperty(c) && b.push('"' + c + '":' + e.asString(a[c]));
                        return "{" + b.join(",") + "}"
                }
                return ("" +
                    a).replace(/\s/g, " ").replace(/\'/g, '"')
            },
            getHTML: function(a, b) {
                var a = h({}, a),
                    c = '<object width="' + a.width + '" height="' + a.height + '" id="' + a.id + '" name="' + a.id + '"';
                a.cachebusting && (a.src += (-1 != a.src.indexOf("?") ? "&" : "?") + Math.random());
                c = a.w3c || !i ? c + (' data="' + a.src + '" type="application/x-shockwave-flash"') : c + ' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';
                c += ">";
                if (a.w3c || i) c += '<param name="movie" value="' + a.src + '" />';
                a.width = a.height = a.id = a.w3c = a.src = null;
                a.onFail = a.version = a.expressInstall =
                    null;
                for (var d in a) a[d] && (c += '<param name="' + d + '" value="' + a[d] + '" />');
                d = "";
                if (b) {
                    for (var f in b)
                        if (b[f]) {
                            var g = b[f];
                            d += f + "=" + encodeURIComponent(/function|object/.test(typeof g) ? e.asString(g) : g) + "&"
                        }
                    d = d.slice(0, -1);
                    c += '<param name="flashvars" value=\'' + d + "' />"
                }
                return c + "</object>"
            },
            isSupported: function(a) {
                return f[0] > a[0] || f[0] == a[0] && f[1] >= a[1]
            }
        }),
        f = e.getVersion();
    m && (jQuery.tools = jQuery.tools || {
        version: "@VERSION"
    }, jQuery.tools.flashembed = {
        conf: g
    }, jQuery.fn.flashembed = function(a, b) {
        return this.each(function() {
            jQuery(this).data("flashembed",
                flashembed(this, a, b))
        })
    })
})();
(function(a) {
    function g(a) {
        if (a) {
            var b = d.contentWindow.document;
            b.open().close();
            b.location.hash = a
        }
    }
    var f, d, e, h;
    a.tools = a.tools || {
        version: "@VERSION"
    };
    a.tools.history = {
        init: function(c) {
            h || (a.browser.msie && "8" > a.browser.version ? d || (d = a("<iframe/>").attr("src", "javascript:false;").hide().get(0), a("body").append(d), setInterval(function() {
                var b = d.contentWindow.document.location.hash;
                f !== b && a(window).trigger("hash", b)
            }, 100), g(location.hash || "#")) : setInterval(function() {
                var b = location.hash;
                b !== f && a(window).trigger("hash",
                    b)
            }, 100), e = !e ? c : e.add(c), c.click(function(b) {
                var c = a(this).attr("href");
                d && g(c);
                if (c.slice(0, 1) != "#") {
                    location.href = "#" + c;
                    return b.preventDefault()
                }
            }), h = !0)
        }
    };
    a(window).on("hash", function(c, b) {
        b ? e.filter(function() {
            var c = a(this).attr("href");
            return c == b || c == b.replace("#", "")
        }).trigger("history", [b]) : e.eq(0).trigger("history", [b]);
        f = b
    });
    a.fn.history = function(c) {
        a.tools.history.init(this);
        return this.on("history", c)
    }
})(jQuery);
(function(b) {
    function c(a) {
        switch (a.type) {
            case "mousemove":
                return b.extend(a.data, {
                    clientX: a.clientX,
                    clientY: a.clientY,
                    pageX: a.pageX,
                    pageY: a.pageY
                });
            case "DOMMouseScroll":
                b.extend(a, a.data);
                a.delta = -a.detail / 3;
                break;
            case "mousewheel":
                a.delta = a.wheelDelta / 120
        }
        a.type = "wheel";
        return b.event.handle.call(this, a, a.delta)
    }
    b.fn.mousewheel = function(a) {
        return this[a ? "on" : "trigger"]("wheel", a)
    };
    b.event.special.wheel = {
        setup: function() {
            b.event.add(this, d, c, {})
        },
        teardown: function() {
            b.event.remove(this, d, c)
        }
    };
    var d = !b.browser.mozilla ? "mousewheel" : "DOMMouseScroll" + ("1.9" > b.browser.version ? " mousemove" : "")
})(jQuery);
(function(e) {
    function p(a, b, d) {
        var f = d.relative ? a.position().top : a.offset().top,
            c = d.relative ? a.position().left : a.offset().left,
            h = d.position[0],
            f = f - (b.outerHeight() - d.offset[0]),
            c = c + (a.outerWidth() + d.offset[1]);
        /iPad/i.test(navigator.userAgent) && (f -= e(window).scrollTop());
        var i = b.outerHeight() + a.outerHeight();
        "center" == h && (f += i / 2);
        "bottom" == h && (f += i);
        h = d.position[1];
        a = b.outerWidth() + a.outerWidth();
        "center" == h && (c -= a / 2);
        "left" == h && (c -= a);
        return {
            top: f,
            left: c
        }
    }

    function n(a, b) {
        var d = this,
            f = a.add(d),
            c,
            h = 0,
            i = 0,
            m = a.attr("title"),
            q = a.attr("data-tooltip"),
            r = o[b.effect],
            l, s = a.is(":input"),
            n = s && a.is(":checkbox, :radio, select, :button, :submit"),
            t = a.attr("type"),
            j = b.events[t] || b.events[s ? n ? "widget" : "input" : "def"];
        if (!r) throw 'Nonexistent effect "' + b.effect + '"';
        j = j.split(/,\s*/);
        if (2 != j.length) throw "Tooltip: bad events configuration for " + t;
        a.on(j[0], function(a) {
            clearTimeout(h);
            b.predelay ? i = setTimeout(function() {
                d.show(a)
            }, b.predelay) : d.show(a)
        }).on(j[1], function(a) {
            clearTimeout(i);
            b.delay ? h = setTimeout(function() {
                    d.hide(a)
                },
                b.delay) : d.hide(a)
        });
        m && b.cancelDefault && (a.removeAttr("title"), a.data("title", m));
        e.extend(d, {
            show: function(k) {
                if (!c) {
                    if (q) c = e(q);
                    else if (b.tip) c = e(b.tip).eq(0);
                    else if (m) c = e(b.layout).addClass(b.tipClass).appendTo(document.body).hide().append(m);
                    else {
                        c = a.next();
                        c.length || (c = a.parent().next())
                    }
                    if (!c.length) throw "Cannot find tooltip for " + a;
                }
                if (d.isShown()) return d;
                c.stop(true, true);
                var g = p(a, c, b);
                b.tip && c.html(a.data("title"));
                k = e.Event();
                k.type = "onBeforeShow";
                f.trigger(k, [g]);
                if (k.isDefaultPrevented()) return d;
                g = p(a, c, b);
                c.css({
                    position: "absolute",
                    top: g.top,
                    left: g.left
                });
                l = true;
                r[0].call(d, function() {
                    k.type = "onShow";
                    l = "full";
                    f.trigger(k)
                });
                g = b.events.tooltip.split(/,\s*/);
                if (!c.data("__set")) {
                    c.off(g[0]).on(g[0], function() {
                        clearTimeout(h);
                        clearTimeout(i)
                    });
                    if (g[1] && !a.is("input:not(:checkbox, :radio), textarea")) c.off(g[1]).on(g[1], function(b) {
                        b.relatedTarget != a[0] && a.trigger(j[1].split(" ")[0])
                    });
                    b.tip || c.data("__set", true)
                }
                return d
            },
            hide: function(a) {
                if (!c || !d.isShown()) return d;
                a = e.Event();
                a.type = "onBeforeHide";
                f.trigger(a);
                if (!a.isDefaultPrevented()) {
                    l = false;
                    o[b.effect][1].call(d, function() {
                        a.type = "onHide";
                        f.trigger(a)
                    });
                    return d
                }
            },
            isShown: function(a) {
                return a ? l == "full" : l
            },
            getConf: function() {
                return b
            },
            getTip: function() {
                return c
            },
            getTrigger: function() {
                return a
            }
        });
        e.each(["onHide", "onBeforeShow", "onShow", "onBeforeHide"], function(a, c) {
            if (e.isFunction(b[c])) e(d).on(c, b[c]);
            d[c] = function(a) {
                if (a) e(d).on(c, a);
                return d
            }
        })
    }
    e.tools = e.tools || {
        version: "@VERSION"
    };
    e.tools.tooltip = {
        conf: {
            effect: "toggle",
            fadeOutSpeed: "fast",
            predelay: 0,
            delay: 30,
            opacity: 1,
            tip: 0,
            fadeIE: !1,
            position: ["top", "center"],
            offset: [0, 0],
            relative: !1,
            cancelDefault: !0,
            events: {
                def: "mouseenter,mouseleave",
                input: "focus,blur",
                widget: "focus mouseenter,blur mouseleave",
                tooltip: "mouseenter,mouseleave"
            },
            layout: "<div/>",
            tipClass: "tooltip"
        },
        addEffect: function(a, b, d) {
            o[a] = [b, d]
        }
    };
    var o = {
        toggle: [function(a) {
            var b = this.getConf(),
                d = this.getTip(),
                b = b.opacity;
            1 > b && d.css({
                opacity: b
            });
            d.show();
            a.call()
        }, function(a) {
            this.getTip().hide();
            a.call()
        }],
        fade: [function(a) {
            var b =
                this.getConf();
            !e.browser.msie || b.fadeIE ? this.getTip().fadeTo(b.fadeInSpeed, b.opacity, a) : (this.getTip().show(), a())
        }, function(a) {
            var b = this.getConf();
            !e.browser.msie || b.fadeIE ? this.getTip().fadeOut(b.fadeOutSpeed, a) : (this.getTip().hide(), a())
        }]
    };
    e.fn.tooltip = function(a) {
        var b = this.data("tooltip");
        if (b) return b;
        a = e.extend(!0, {}, e.tools.tooltip.conf, a);
        "string" == typeof a.position && (a.position = a.position.split(/,?\s/));
        this.each(function() {
            b = new n(e(this), a);
            e(this).data("tooltip", b)
        });
        return a.api ?
            b : this
    }
})(jQuery);
(function(c) {
    var i = c.tools.tooltip;
    i.dynamic = {
        conf: {
            classNames: "top right bottom left"
        }
    };
    c.fn.dynamic = function(f) {
        "number" == typeof f && (f = {
            speed: f
        });
        var f = c.extend({}, i.dynamic.conf, f),
            l = c.extend(!0, {}, f),
            j = f.classNames.split(/\s/),
            e;
        this.each(function() {
            var h = c(this).tooltip().onBeforeShow(function(f, h) {
                var d = this.getTip(),
                    a = this.getConf();
                e || (e = [a.position[0], a.position[1], a.offset[0], a.offset[1], c.extend({}, a)]);
                c.extend(a, e[4]);
                a.position = [e[0], e[1]];
                a.offset = [e[2], e[3]];
                d.css({
                    visibility: "hidden",
                    position: "absolute",
                    top: h.top,
                    left: h.left
                }).show();
                var k = c.extend(!0, {}, l),
                    b;
                b = c(window);
                var g = b.width() + b.scrollLeft(),
                    i = b.height() + b.scrollTop();
                b = [d.offset().top <= b.scrollTop(), g <= d.offset().left + d.width(), i <= d.offset().top + d.height(), b.scrollLeft() >= d.offset().left];
                a: {
                    for (g = b.length; g--;)
                        if (b[g]) {
                            g = !1;
                            break a
                        }
                    g = !0
                }
                if (!g) {
                    b[2] && (c.extend(a, k.top), a.position[0] = "top", d.addClass(j[0]));
                    b[3] && (c.extend(a, k.right), a.position[1] = "right", d.addClass(j[1]));
                    b[0] && (c.extend(a, k.bottom), a.position[0] = "bottom",
                        d.addClass(j[2]));
                    b[1] && (c.extend(a, k.left), a.position[1] = "left", d.addClass(j[3]));
                    if (b[0] || b[2]) a.offset[0] *= -1;
                    if (b[1] || b[3]) a.offset[1] *= -1
                }
                d.css({
                    visibility: "visible"
                }).hide()
            });
            h.onBeforeShow(function() {
                var c = this.getConf();
                this.getTip();
                setTimeout(function() {
                    c.position = [e[0], e[1]];
                    c.offset = [e[2], e[3]]
                }, 0)
            });
            h.onHide(function() {
                this.getTip().removeClass(f.classNames)
            });
            ret = h
        });
        return f.api ? ret : this
    }
})(jQuery);
(function(b) {
    var e = b.tools.tooltip;
    b.extend(e.conf, {
        direction: "up",
        bounce: !1,
        slideOffset: 10,
        slideInSpeed: 200,
        slideOutSpeed: 200,
        slideFade: !b.browser.msie
    });
    var f = {
        up: ["-", "top"],
        down: ["+", "top"],
        left: ["-", "left"],
        right: ["+", "left"]
    };
    e.addEffect("slide", function(b) {
        var a = this.getConf(),
            g = this.getTip(),
            c = a.slideFade ? {
                opacity: a.opacity
            } : {},
            d = f[a.direction] || f.up;
        c[d[1]] = d[0] + "=" + a.slideOffset;
        a.slideFade && g.css({
            opacity: 0
        });
        g.show().animate(c, a.slideInSpeed, b)
    }, function(e) {
        var a = this.getConf(),
            g = a.slideOffset,
            c = a.slideFade ? {
                opacity: 0
            } : {},
            d = f[a.direction] || f.up,
            h = "" + d[0];
        a.bounce && (h = "+" == h ? "-" : "+");
        c[d[1]] = h + "=" + g;
        this.getTip().animate(c, a.slideOutSpeed, function() {
            b(this).hide();
            e.call()
        })
    })
})(jQuery);
(function(c) {
    function i(b, a, f) {
        var a = c(a).first() || a,
            d = b.offset().top,
            e = b.offset().left,
            g = f.position.split(/,?\s+/),
            j = g[0],
            g = g[1],
            d = d - (a.outerHeight() - f.offset[0]),
            e = e + (b.outerWidth() + f.offset[1]);
        /iPad/i.test(navigator.userAgent) && (d -= c(window).scrollTop());
        f = a.outerHeight() + b.outerHeight();
        "center" == j && (d += f / 2);
        "bottom" == j && (d += f);
        b = b.outerWidth();
        "center" == g && (e -= (b + a.outerWidth()) / 2);
        "left" == g && (e -= b);
        return {
            top: d,
            left: e
        }
    }

    function q(b) {
        function a() {
            return this.getAttribute("type") == b
        }
        a.key = '[type="' +
            b + '"]';
        return a
    }

    function n(b, a, f) {
        function p(a, b, e) {
            if (f.grouped || !a.length) {
                var g;
                !1 === e || c.isArray(e) ? (g = d.messages[b.key || b] || d.messages["*"], g = g[f.lang] || d.messages["*"].en, (b = g.match(/\$\d/g)) && c.isArray(e) && c.each(b, function(a) {
                    g = g.replace(this, e[a])
                })) : g = e[f.lang] || e;
                a.push(g)
            }
        }
        var e = this,
            g = a.add(e),
            b = b.not(":button, :image, :reset, :submit");
        a.attr("novalidate", "novalidate");
        c.extend(e, {
            getConf: function() {
                return f
            },
            getForm: function() {
                return a
            },
            getInputs: function() {
                return b
            },
            reflow: function() {
                b.each(function() {
                    var a =
                        c(this),
                        b = a.data("msg.el");
                    b && (a = i(a, b, f), b.css({
                        top: a.top,
                        left: a.left
                    }))
                });
                return e
            },
            invalidate: function(a, h) {
                if (!h) {
                    var d = [];
                    c.each(a, function(a, f) {
                        var c = b.filter("[name='" + a + "']");
                        c.length && (c.trigger("OI", [f]), d.push({
                            input: c,
                            messages: [f]
                        }))
                    });
                    a = d;
                    h = c.Event()
                }
                h.type = "onFail";
                g.trigger(h, [a]);
                h.isDefaultPrevented() || l[f.effect][0].call(e, a, h);
                return e
            },
            reset: function(a) {
                a = a || b;
                a.removeClass(f.errorClass).each(function() {
                    var a = c(this).data("msg.el");
                    a && (a.remove(), c(this).data("msg.el", null))
                }).off(f.errorInputEvent +
                    ".v" || "");
                return e
            },
            destroy: function() {
                a.off(f.formEvent + ".V reset.V");
                b.off(f.inputEvent + ".V change.V");
                return e.reset()
            },
            checkValidity: function(a, h) {
                var a = a || b,
                    a = a.not(":disabled"),
                    d = {},
                    a = a.filter(function() {
                        var a = c(this).attr("name");
                        if (!d[a]) return d[a] = !0, c(this)
                    });
                if (!a.length) return !0;
                h = h || c.Event();
                h.type = "onBeforeValidate";
                g.trigger(h, [a]);
                if (h.isDefaultPrevented()) return h.result;
                var k = [];
                a.each(function() {
                    var a = [],
                        b = c(this).data("messages", a),
                        d = m && b.is(":date") ? "onHide.v" : f.errorInputEvent +
                        ".v";
                    b.off(d);
                    c.each(o, function() {
                        var c = this[0];
                        if (b.filter(c).length) {
                            var d = this[1].call(e, b, b.val());
                            if (!0 !== d) {
                                h.type = "onBeforeFail";
                                g.trigger(h, [b, c]);
                                if (h.isDefaultPrevented()) return !1;
                                var j = b.attr(f.messageAttr);
                                if (j) return a = [j], !1;
                                p(a, c, d)
                            }
                        }
                    });
                    if (a.length && (k.push({
                            input: b,
                            messages: a
                        }), b.trigger("OI", [a]), f.errorInputEvent)) b.on(d, function(a) {
                        e.checkValidity(b, a)
                    });
                    if (f.singleError && k.length) return !1
                });
                var i = l[f.effect];
                if (!i) throw 'Validator: cannot find effect "' + f.effect + '"';
                if (k.length) return e.invalidate(k,
                    h), !1;
                i[1].call(e, a, h);
                h.type = "onSuccess";
                g.trigger(h, [a]);
                a.off(f.errorInputEvent + ".v");
                return !0
            }
        });
        c.each(["onBeforeValidate", "onBeforeFail", "onFail", "onSuccess"], function(a, b) {
            if (c.isFunction(f[b])) c(e).on(b, f[b]);
            e[b] = function(a) {
                if (a) c(e).on(b, a);
                return e
            }
        });
        if (f.formEvent) a.on(f.formEvent + ".V", function(b) {
            if (!e.checkValidity(null, b)) return b.preventDefault();
            b.target = a;
            b.type = f.formEvent
        });
        a.on("reset.V", function() {
            e.reset()
        });
        b[0] && b[0].validity && b.each(function() {
            this.oninvalid = function() {
                return !1
            }
        });
        a[0] && (a[0].checkValidity = e.checkValidity);
        if (f.inputEvent) b.on(f.inputEvent + ".V", function(a) {
            e.checkValidity(c(this), a)
        });
        b.filter(":checkbox, select").filter("[required]").on("change.V", function(a) {
            var b = c(this);
            (this.checked || b.is("select") && c(this).val()) && l[f.effect][1].call(e, b, a)
        });
        b.filter(":radio[required]").on("change.V", function(a) {
            var b = c("[name='" + c(a.srcElement).attr("name") + "']");
            b != null && b.length != 0 && e.checkValidity(b, a)
        });
        c(window).resize(function() {
            e.reflow()
        })
    }
    c.tools = c.tools || {
        version: "@VERSION"
    };
    var r = /\[type=([a-z]+)\]/,
        s = /^-?[0-9]*(\.[0-9]+)?$/,
        m = c.tools.dateinput,
        t = /^([a-z0-9_\.\-\+]+)@([\da-z\.\-]+)\.([a-z\.]{2,6})$/i,
        u = /^(https?:\/\/)?[\da-z\.\-]+\.[a-z\.]{2,6}[#&+_\?\/\w \.\-=]*$/i,
        d;
    d = c.tools.validator = {
        conf: {
            grouped: !1,
            effect: "default",
            errorClass: "invalid",
            inputEvent: null,
            errorInputEvent: "keyup",
            formEvent: "submit",
            lang: "en",
            message: "<div/>",
            messageAttr: "data-message",
            messageClass: "error",
            offset: [0, 0],
            position: "center right",
            singleError: !1,
            speed: "normal"
        },
        messages: {
            "*": {
                en: "Please correct this value"
            }
        },
        localize: function(b, a) {
            c.each(a, function(a, c) {
                d.messages[a] = d.messages[a] || {};
                d.messages[a][b] = c
            })
        },
        localizeFn: function(b, a) {
            d.messages[b] = d.messages[b] || {};
            c.extend(d.messages[b], a)
        },
        fn: function(b, a, f) {
            c.isFunction(a) ? f = a : ("string" == typeof a && (a = {
                en: a
            }), this.messages[b.key || b] = a);
            (a = r.exec(b)) && (b = q(a[1]));
            o.push([b, f])
        },
        addEffect: function(b, a, f) {
            l[b] = [a, f]
        }
    };
    var o = [],
        l = {
            "default": [function(b) {
                var a = this.getConf();
                c.each(b, function(b, d) {
                    var e = d.input;
                    e.addClass(a.errorClass);
                    var g = e.data("msg.el");
                    g || (g = c(a.message).addClass(a.messageClass).appendTo(document.body), e.data("msg.el", g));
                    g.css({
                        visibility: "hidden"
                    }).find("p").remove();
                    c.each(d.messages, function(a, b) {
                        c("<p/>").html(b).appendTo(g)
                    });
                    g.outerWidth() == g.parent().width() && g.add(g.find("p")).css({
                        display: "inline"
                    });
                    e = i(e, g, a);
                    g.css({
                        visibility: "visible",
                        position: "absolute",
                        top: e.top,
                        left: e.left
                    }).fadeIn(a.speed)
                })
            }, function(b) {
                var a = this.getConf();
                b.removeClass(a.errorClass).each(function() {
                    var a = c(this).data("msg.el");
                    a && a.css({
                        visibility: "hidden"
                    })
                })
            }]
        };
    c.each(["email", "url", "number"], function(b, a) {
        c.expr[":"][a] = function(b) {
            return b.getAttribute("type") === a
        }
    });
    c.fn.oninvalid = function(b) {
        return this[b ? "on" : "trigger"]("OI", b)
    };
    d.fn(":email", "Please enter a valid email address", function(b, a) {
        return !a || t.test(a)
    });
    d.fn(":url", "Please enter a valid URL", function(b, a) {
        return !a || u.test(a)
    });
    d.fn(":number", "Please enter a numeric value.", function(b, a) {
        return s.test(a)
    });
    d.fn("[max]", "Please enter a value no larger than $1", function(b, a) {
        if ("" === a || m && b.is(":date")) return !0;
        var c = b.attr("max");
        return parseFloat(a) <= parseFloat(c) ? !0 : [c]
    });
    d.fn("[min]", "Please enter a value of at least $1", function(b, a) {
        if ("" === a || m && b.is(":date")) return !0;
        var c = b.attr("min");
        return parseFloat(a) >= parseFloat(c) ? !0 : [c]
    });
    d.fn("[required]", "Please complete this mandatory field.", function(b, a) {
        return b.is(":checkbox") ? b.is(":checked") : !!a
    });
    d.fn("[pattern]", function(b, a) {
        return "" === a || RegExp("^" + b.attr("pattern") + "$").test(a)
    });
    d.fn(":radio", "Please select an option.", function(b) {
        var a = !1;
        c("[name='" + b.attr("name") + "']").each(function(b, d) {
            c(d).is(":checked") && (a = !0)
        });
        return a ? !0 : !1
    });
    c.fn.validator = function(b) {
        var a = this.data("validator");
        a && (a.destroy(), this.removeData("validator"));
        b = c.extend(!0, {}, d.conf, b);
        if (this.is("form")) return this.each(function() {
            var d = c(this);
            a = new n(d.find(":input"), d, b);
            d.data("validator", a)
        });
        a = new n(this, this.eq(0).closest("form"), b);
        return this.data("validator", a)
    }
})(jQuery);
