!(function(e, t) {
  "object" == typeof module && "object" == typeof module.exports
    ? (module.exports = e.document
        ? t(e, !0)
        : function(e) {
            if (!e.document)
              throw new Error("Avalon requires a window with a document");
            return t(e);
          })
    : t(e);
})("undefined" != typeof window ? window : this, function(e, t) {
  function n() {
    avalon.config.debug && console.log.apply(console, arguments);
  }
  function r() {
    return Object.create(null);
  }
  function i() {}
  function o(e, t) {
    "string" == typeof e && (e = e.match(bt) || []);
    for (var n = {}, a = void 0 !== t ? t : 1, r = 0, i = e.length; i > r; r++)
      n[e[r]] = a;
    return n;
  }
  function l() {
    if (e.VBArray) {
      var t = document.documentMode;
      return t ? t : e.XMLHttpRequest ? 7 : 6;
    }
    return 0;
  }
  function s(e) {
    if (e && "object" == typeof e) {
      var t = e.length,
        n = Tt.call(e);
      if (/(Array|List|Collection|Map|Arguments)\]$/.test(n)) return !0;
      if ("[object Object]" === n && t === t >>> 0) return !0;
    }
    return !1;
  }
  function c(e, t) {
    if (e && e.childNodes)
      for (var n, a = e.childNodes, r = 0; (n = a[r++]); )
        if (n.tagName) {
          var i = ft.createElementNS(Ft, n.tagName.toLowerCase());
          kt.forEach.call(n.attributes, function(e) {
            i.setAttribute(e.name, e.value);
          }),
            c(n, i),
            t.appendChild(i);
        }
  }
  function u(e) {
    for (var t in e)
      if (Et.call(e, t)) {
        var n = e[t];
        "function" == typeof u.plugins[t]
          ? u.plugins[t](n)
          : "object" == typeof u[t]
            ? avalon.mix(u[t], n)
            : (u[t] = n);
      }
    return this;
  }
  function f(e) {
    return (e + "").replace(Yt, "\\$&");
  }
  function d(e, t, n) {
    if (Pt(t) || (t && t.nodeType)) return !1;
    if (-1 !== n.indexOf(e)) return !1;
    if (-1 !== Kt.indexOf(e)) return !1;
    var a = n.$special;
    return e && "$" === e.charAt(0) && !a[e] ? !1 : !0;
  }
  function v(e, t, n, a) {
    switch (e.type) {
      case 0:
        var r = e.get,
          i = e.set;
        if (Pt(i)) {
          var o = a.$events,
            l = o[t];
          (o[t] = []), i.call(a, n), (o[t] = l);
        }
        return r.call(a);
      case 1:
        return n;
      case 2:
        if (n !== a.$model[t]) {
          var s = (e.svmodel = m(a, t, n, e.valueType));
          n = s.$model;
          var c = en[s.$id];
          c && c();
        }
        return n;
    }
  }
  function p(e, t, n) {
    if (Array.isArray(e)) {
      var a = e.concat();
      e.length = 0;
      var o = g(e);
      return o.pushArray(a), o;
    }
    if (!e || e.nodeType > 0 || (e.$id && e.$events)) return e;
    Array.isArray(e.$skipArray) || (e.$skipArray = []),
      (e.$skipArray.$special = t || r());
    var l = {};
    n = n || {};
    var s = r(),
      c = r(),
      u = [];
    for (var f in e)
      !(function(t, a) {
        if (((n[t] = a), d(t, a, e.$skipArray))) {
          s[t] = [];
          var r = avalon.type(a),
            o = function(e) {
              var t = o._name,
                n = this,
                a = n.$model,
                r = a[t],
                i = n.$events;
              return arguments.length
                ? void (
                    yt ||
                    ((1 === o.type || ((e = v(o, t, e, n)), o.type)) &&
                      (tn(r, e) || ((a[t] = e), k(i[t]), h(n, t, e, r))))
                  )
                : 0 === o.type
                  ? ((e = o.get.call(n)),
                    r !== e && ((a[t] = e), h(n, t, e, r)),
                    e)
                  : (x(i[t]), o.svmodel || r);
            };
          "object" === r && Pt(a.get) && Object.keys(a).length <= 2
            ? ((o.set = a.set),
              (o.get = a.get),
              (o.type = 0),
              u.push(function() {
                var e = {
                  evaluator: function() {
                    (e.type = Math.random()),
                      (e.element = null),
                      (n[t] = o.get.call(l));
                  },
                  element: dt,
                  type: Math.random(),
                  handler: i,
                  args: []
                };
                (Mt[ut] = e), o.call(l), delete Mt[ut];
              }))
            : $t.test(r)
              ? ((o.type = 2),
                (o.valueType = r),
                u.push(function() {
                  var e = p(a, 0, n[t]);
                  (o.svmodel = e), (e.$events[ht] = s[t]);
                }))
              : (o.type = 1),
            (o._name = t),
            (c[t] = o);
        }
      })(f, e[f]);
    Kt.forEach(function(t) {
      delete e[t], delete n[t];
    }),
      (l = Object.defineProperties(l, nn(c), e));
    for (var m in e) c[m] || (l[m] = e[m]);
    (l.$id = jt()), (l.$model = n), (l.$events = s);
    for (f in Jt) l[f] = Jt[f];
    return (
      Object.defineProperty(l, "hasOwnProperty", {
        value: function(e) {
          return e in this.$model;
        },
        writable: !1,
        enumerable: !1,
        configurable: !0
      }),
      u.forEach(function(e) {
        e();
      }),
      l
    );
  }
  function h(e, t, n, a) {
    e.$events && Jt.$fire.call(e, t, n, a);
  }
  function m(e, t, n, a) {
    var r = e[t];
    if ("array" === a)
      return Array.isArray(n) && r !== n
        ? (r._.$unwatch(), r.clear(), r._.$watch(), r.pushArray(n.concat()), r)
        : r;
    var i = e.$events[t],
      o = r.$events.$withProxyPool;
    o && (lt(o, "with"), (r.$events.$withProxyPool = null));
    var l = p(n);
    return (
      (l.$events[ht] = i),
      (en[l.$id] = function(e) {
        for (; (e = i.shift()); )
          !(function(e) {
            avalon.nextTick(function() {
              var t = e.type;
              t && Rt[t] && (e.rollback && e.rollback(), Rt[t](e, e.vmodels));
            });
          })(e);
        delete en[l.$id];
      }),
      l
    );
  }
  function g(e) {
    var t = [];
    (t.$id = jt()),
      (t.$model = e),
      (t.$events = {}),
      (t.$events[ht] = []),
      (t._ = p({ length: e.length })),
      t._.$watch("length", function(e, n) {
        t.$fire("length", e, n);
      });
    for (var n in Jt) t[n] = Jt[n];
    return avalon.mix(t, rn), t;
  }
  function y(e, t, n, a, r, i, o) {
    for (var l = this.length, s = 2; --s; ) {
      switch (e) {
        case "add":
          var c = this.$model.slice(t, t + n).map(function(e) {
            return $t.test(avalon.type(e)) ? (e.$id ? e : p(e, 0, e)) : e;
          });
          an.apply(this, [t, 0].concat(c)), this._fire("add", t, n);
          break;
        case "del":
          var u = this._splice(t, n);
          this._fire("del", t, n);
      }
      r && ((e = r), (t = i), (n = o), (s = 2), (r = 0));
    }
    return (
      this._fire("index", a),
      this.length !== l && (this._.length = this.length),
      u
    );
  }
  function b(e, t) {
    for (var n = {}, a = 0, r = t.length; r > a; a++) {
      n[a] = e[a];
      var i = t[a];
      i in n ? ((e[a] = n[i]), delete n[i]) : (e[a] = e[i]);
    }
  }
  function $(e) {
    (Mt[ut] = e), (avalon.openComputedCollect = !0);
    var t = e.evaluator;
    if (t)
      try {
        var n = on.test(e.type) ? e : t.apply(0, e.args);
        e.handler(n, e.element, e);
      } catch (a) {
        delete e.evaluator;
        var r = e.element;
        if (3 === r.nodeType) {
          var i = r.parentNode;
          u.commentInterpolate
            ? i.replaceChild(ft.createComment(e.value), r)
            : (r.data = Vt + e.value + qt);
        }
      }
    (avalon.openComputedCollect = !1), delete Mt[ut];
  }
  function x(e) {
    var t = Mt[ut];
    e && t && avalon.Array.ensure(e, t) && t.element && w(t, e);
  }
  function w(e, t) {
    (e.$uuid = e.$uuid || jt()), (t.$uuid = t.$uuid || jt());
    var n = { data: e, list: t, $$uuid: e.$uuid + t.$uuid };
    ln[n.$$uuid] || ((ln[n.$$uuid] = 1), ln.push(n));
  }
  function C(e) {
    (e.element = null), e.rollback && e.rollback();
    for (var t in e) e[t] = null;
  }
  function E(e) {
    try {
      if (!e.parentNode) return !0;
    } catch (t) {
      return !0;
    }
    return e.msRetain
      ? 0
      : 1 === e.nodeType
        ? "number" == typeof e.sourceIndex
          ? 0 === e.sourceIndex
          : !Nt.contains(e)
        : !avalon.contains(Nt, e);
  }
  function T() {
    for (
      var e, t = ln.length, n = t, a = 0, r = [], i = {}, o = {};
      (e = ln[--t]);

    ) {
      var l = e.data,
        s = l.type;
      i[s] ? i[s]++ : ((i[s] = 1), r.push(s));
    }
    var c = !1;
    if (
      (r.forEach(function(e) {
        cn[e] !== i[e] && ((o[e] = 1), (c = !0));
      }),
      (t = n),
      c)
    )
      for (; (e = ln[--t]); )
        (l = e.data),
          void 0 !== l.element &&
            o[l.type] &&
            E(l.element) &&
            (a++,
            ln.splice(t, 1),
            delete ln[e.$$uuid],
            avalon.Array.remove(e.list, l),
            C(l),
            (e.data = e.list = null));
    (cn = i), (sn = new Date());
  }
  function k(e) {
    if (e && e.length) {
      new Date() - sn > 444 && "object" == typeof e[0] && T();
      for (var t, n = At.call(arguments, 1), a = e.length; (t = e[--a]); ) {
        var r = t.element;
        if (r && r.parentNode)
          if (t.$repeat) t.handler.apply(t, n);
          else if ("on" !== t.type) {
            var o = t.evaluator || i;
            t.handler(o.apply(0, t.args || []), r, t);
          }
      }
    }
  }
  function A(e, t, n) {
    var a = setTimeout(function() {
      var r = e.innerHTML;
      clearTimeout(a), r === n ? t() : A(e, t, r);
    });
  }
  function M(e, t) {
    var n = e.getAttribute("avalonctrl") || t.$id;
    e.setAttribute("avalonctrl", n),
      (t.$events.expr = e.tagName + '[avalonctrl="' + n + '"]');
  }
  function O(e, t) {
    for (var n, a = 0; (n = e[a++]); )
      (n.vmodels = t),
        Rt[n.type](n, t),
        n.evaluator &&
          n.element &&
          1 === n.element.nodeType &&
          n.element.removeAttribute(n.name);
    e.length = 0;
  }
  function N(e, t) {
    return e.priority - t.priority;
  }
  function L(e, t) {
    for (
      var a,
        i,
        o = e.hasAttributes() ? avalon.slice(e.attributes) : [],
        l = [],
        s = r(),
        c = 0;
      (i = o[c++]);

    )
      if (i.specified && (a = i.name.match(bn))) {
        var u = a[1],
          f = a[2] || "",
          d = i.value,
          v = i.name;
        if (
          ((s[v] = d),
          xn[u]
            ? ((f = u), (u = "on"))
            : wn[u] &&
              (n("warning!请改用ms-attr-" + u + "代替ms-" + u + "！"),
              "enabled" === u &&
                (n("warning!ms-enabled或ms-attr-enabled已经被废弃"),
                (u = "disabled"),
                (d = "!(" + d + ")")),
              (f = u),
              (u = "attr"),
              e.removeAttribute(v),
              (v = "ms-attr-" + f),
              e.setAttribute(v, d),
              (a = [v]),
              (s[v] = d)),
          "function" == typeof Rt[u])
        ) {
          var p = {
            type: u,
            param: f,
            element: e,
            name: a[0],
            value: d,
            priority: u in $n ? $n[u] : 10 * u.charCodeAt(0) + (Number(f) || 0)
          };
          if ("html" === u || "text" === u) {
            var h = P(d);
            avalon.mix(p, h),
              (p.filters = p.filters.replace(Tn, function() {
                return (p.type = "html"), (p.group = 1), "";
              }));
          }
          "ms-if-loop" === v && (p.priority += 100),
            t.length &&
              (l.push(p), "widget" === u && (e.msData = e.msData || s));
        }
      }
    var m = e.type;
    m &&
      s["ms-duplex"] &&
      (s["ms-attr-checked"] &&
        /radio|checkbox/.test(m) &&
        n("warning!" + m + "控件不能同时定义ms-attr-checked与ms-duplex"),
      s["ms-attr-value"] &&
        /text|password/.test(m) &&
        n("warning!" + m + "控件不能同时定义ms-attr-value与ms-duplex")),
      l.sort(N);
    var g = !0;
    for (c = 0; (p = l[c]); c++) {
      if (((u = p.type), Cn.test(u))) return O(l.slice(0, c + 1), t);
      g && (g = !En.test(u));
    }
    O(l, t),
      g &&
        !mn[e.tagName] &&
        Xt.test(e.innerHTML + e.textContent) &&
        (yn && yn(e), S(e, t));
  }
  function S(e, t) {
    for (var n = e.firstChild; n; ) {
      var a = n.nextSibling;
      j(n, n.nodeType, t), (n = a);
    }
  }
  function H(e, t) {
    for (var n, a = 0; (n = e[a++]); ) j(n, n.nodeType, t);
  }
  function j(e, t, n) {
    1 === t
      ? (D(e, n), e.msCallback && (e.msCallback(), (e.msCallback = void 0)))
      : 3 === t && zt.test(e.data)
        ? I(e, n)
        : u.commentInterpolate && 8 === t && !zt.test(e.nodeValue) && I(e, n);
  }
  function D(e, t, n) {
    var a = e.getAttribute("ms-skip"),
      r = e.getAttributeNode("ms-important"),
      i = e.getAttributeNode("ms-controller");
    if ("string" != typeof a) {
      if ((n = r || i)) {
        var o = avalon.vmodels[n.value];
        if (!o) return;
        (t = n === r ? [o] : [o].concat(t)),
          e.removeAttribute(n.name),
          e.classList.remove(n.name),
          M(e, o);
      }
      L(e, t);
    }
  }
  function P(e) {
    if (e.indexOf("|") > 0) {
      var t = e.replace(An, function(e) {
          return Array(e.length + 1).join("1");
        }),
        n = t.replace(kn, "ᄢ㍄").indexOf("|");
      if (n > -1)
        return { filters: e.slice(n), value: e.slice(0, n), expr: !0 };
    }
    return { value: e, filters: "", expr: !0 };
  }
  function R(e) {
    for (
      var t, n, a = [], r = 0;
      ((n = e.indexOf(Vt, r)), -1 !== n) &&
      ((t = e.slice(r, n)),
      t && a.push({ value: t, filters: "", expr: !1 }),
      (r = n + Vt.length),
      (n = e.indexOf(qt, r)),
      -1 !== n);

    )
      (t = e.slice(r, n)), t && a.push(P(t)), (r = n + qt.length);
    return (
      (t = e.slice(r)), t && a.push({ value: t, expr: !1, filters: "" }), a
    );
  }
  function I(e, t) {
    var n = [];
    if (8 === e.nodeType)
      var a = P(e.nodeValue),
        r = [a];
    else r = R(e.data);
    if (r.length) {
      for (var i = 0; (a = r[i++]); ) {
        var o = ft.createTextNode(a.value);
        a.expr &&
          ((a.type = "text"),
          (a.element = o),
          (a.filters = a.filters.replace(Tn, function() {
            return (a.type = "html"), (a.group = 1), "";
          })),
          n.push(a)),
          Lt.appendChild(o);
      }
      e.parentNode.replaceChild(Lt, e), n.length && O(n, t);
    }
  }
  function _(e) {
    return e.replace(/([a-z\d])([A-Z]+)/g, "$1-$2").toLowerCase();
  }
  function F(e) {
    return e.indexOf("-") < 0 && e.indexOf("_") < 0
      ? e
      : e.replace(/[-_][^-_]/g, function(e) {
          return e.charAt(1).toUpperCase();
        });
  }
  function B(e) {
    try {
      if ("object" == typeof e) return e;
      e =
        "true" === e
          ? !0
          : "false" === e
            ? !1
            : "null" === e
              ? null
              : +e + "" === e
                ? +e
                : Mn.test(e)
                  ? JSON.parse(e)
                  : e;
    } catch (t) {}
    return e;
  }
  function U(e) {
    return e.window && e.document ? e : 9 === e.nodeType ? e.defaultView : !1;
  }
  function V(e, t) {
    if (e.offsetWidth <= 0) {
      var n = getComputedStyle(e, null);
      if (Hn.test(n.display)) {
        var a = { node: e };
        for (var r in Sn) (a[r] = n[r]), (e.style[r] = Sn[r]);
        t.push(a);
      }
      var i = e.parentNode;
      i && 1 === i.nodeType && V(i, t);
    }
  }
  function q(e) {
    var t = e.tagName.toLowerCase();
    return "input" === t && /checkbox|radio/.test(e.type) ? "checked" : t;
  }
  function z(e, t, n, a) {
    for (var r, i = [], o = " = " + n + ".", l = e.length; (r = e[--l]); )
      t.hasOwnProperty(r) &&
        (i.push(r + o + r),
        a.vars.push(r),
        "duplex" === a.type && (e.get = n + "." + r),
        e.splice(l, 1));
    return i;
  }
  function W(e) {
    for (var t = [], n = {}, a = 0; a < e.length; a++) {
      var r = e[a],
        i = r && "string" == typeof r.$id ? r.$id : r;
      n[i] || (n[i] = t.push(r));
    }
    return t;
  }
  function X(e, t) {
    return (
      (t =
        t
          .replace(Xn, "")
          .replace(Yn, function() {
            return "],|";
          })
          .replace(Gn, function(e, t) {
            return "[" + Dn(t);
          })
          .replace(Zn, function() {
            return '"],["';
          })
          .replace(Jn, function() {
            return '",';
          }) + "]"),
      "return avalon.filters.$filter(" + e + ", " + t + ")"
    );
  }
  function Y(e, t, a) {
    var r = a.type,
      o = a.filters || "",
      l =
        t.map(function(e) {
          return String(e.$id).replace(Wn, "$1");
        }) +
        e +
        r +
        o,
      s = Vn(e).concat(),
      c = [],
      u = [],
      f = [],
      d = "";
    (t = W(t)), (a.vars = []);
    for (var v = 0, p = t.length; p > v; v++)
      if (s.length) {
        var h = "vm" + ut + "_" + v;
        u.push(h), f.push(t[v]), c.push.apply(c, z(s, t[v], h, a));
      }
    if (c.length || "duplex" !== r) {
      "duplex" !== r &&
        (e.indexOf("||") > -1 || e.indexOf("&&") > -1) &&
        a.vars.forEach(function(t) {
          var n = new RegExp("\\b" + t + "(?:\\.\\w+|\\[\\w+\\])+", "ig");
          e = e.replace(n, function(n) {
            var a = n.charAt(t.length),
              r = Dt ? e.slice(arguments[1] + n.length) : RegExp.rightContext,
              i = /^\s*\(/.test(r);
            if ("." === a || "[" === a || i) {
              var o = "var" + String(Math.random()).replace(/^0\./, "");
              if (i) {
                var l = n.split(".");
                if (l.length > 2) {
                  var s = l.pop();
                  return c.push(o + " = " + l.join(".")), o + "." + s;
                }
                return n;
              }
              return c.push(o + " = " + n), o;
            }
            return n;
          });
        }),
        (a.args = f);
      var m = qn.get(l);
      if (m) return void (a.evaluator = m);
      if (((d = c.join(", ")), d && (d = "var " + d), /\S/.test(o))) {
        if (!/text|html/.test(a.type))
          throw Error("ms-" + a.type + "不支持过滤器");
        (e = "\nvar ret" + ut + " = " + e + ";\r\n"), (e += X("ret" + ut, o));
      } else {
        if ("duplex" === r) {
          var g =
            "\nreturn function(vvv){\n	" +
            d +
            ";\n	if(!arguments.length){\n		return " +
            e +
            "\n	}\n	" +
            (zn.test(e) ? e : s.get) +
            "= vvv;\n} ";
          try {
            (m = Function.apply(i, u.concat(g))), (a.evaluator = qn.put(l, m));
          } catch (y) {
            n("debug: parse error," + y.message);
          }
          return;
        }
        if ("on" === r) {
          -1 === e.indexOf("(")
            ? (e += ".call(this, $event)")
            : (e = e.replace("(", ".call(this,")),
            u.push("$event"),
            (e = "\nreturn " + e + ";");
          var b = e.lastIndexOf("\nreturn"),
            $ = e.slice(0, b),
            x = e.slice(b);
          e = $ + "\n" + x;
        } else e = "\nreturn " + e + ";";
      }
      try {
        (m = Function.apply(i, u.concat("\n" + d + e))),
          (a.evaluator = qn.put(l, m));
      } catch (y) {
        n("debug: parse error," + y.message);
      } finally {
        s = c = u = null;
      }
    }
  }
  function G(e, t, n, a, r) {
    Array.isArray(a) &&
      (e = a
        .map(function(e) {
          return e.expr ? "(" + e.value + ")" : Dn(e.value);
        })
        .join(" + ")),
      Y(e, t, n),
      n.evaluator && !r && ((n.handler = It[n.handlerName || n.type]), $(n));
  }
  function Z(e, t, n) {
    var a = e.templateCache && e.templateCache[t];
    if (a) {
      for (var r, i = ft.createDocumentFragment(); (r = a.firstChild); )
        i.appendChild(r);
      return i;
    }
    return avalon.parseHTML(n);
  }
  function J(e) {
    return null == e ? "" : e;
  }
  function Q(e, t, n) {
    return (
      t.param.replace(/\w+/g, function(a) {
        var r = avalon.duplexHooks[a];
        r && "function" == typeof r[n] && (e = r[n](e, t));
      }),
      e
    );
  }
  function K() {
    for (var e = sa.length - 1; e >= 0; e--) {
      var t = sa[e];
      t() === !1 && sa.splice(e, 1);
    }
    sa.length || clearInterval(la);
  }
  function et(e, t, n, a) {
    var r = e.template.cloneNode(!0),
      i = avalon.slice(r.childNodes);
    n.$stamp && r.insertBefore(n.$stamp, r.firstChild), t.appendChild(r);
    var o = [n].concat(e.vmodels),
      l = { nodes: i, vmodels: o };
    a.push(l);
  }
  function tt(e, t) {
    var n = e.proxies[t];
    return n ? n.$stamp : e.element;
  }
  function nt(e, t, n) {
    for (;;) {
      var a = t.previousSibling;
      if (!a) break;
      if ((a.parentNode.removeChild(a), n && n.call(a), a === e)) break;
    }
  }
  function at(e) {
    var t = {
      $host: [],
      $outer: {},
      $stamp: 1,
      $index: 0,
      $first: !1,
      $last: !1,
      $remove: avalon.noop
    };
    t[e] = {
      get: function() {
        var t = this.$events,
          n = t.$index;
        t.$index = t[e];
        try {
          return this.$host[this.$index];
        } finally {
          t.$index = n;
        }
      },
      set: function(e) {
        this.$host.set(this.$index, e);
      }
    };
    var n = { $last: 1, $first: 1, $index: 1 },
      a = p(t, n);
    return (a.$id = jt("$proxy$each")), a;
  }
  function rt(e, t) {
    for (var n, a = t.param || "el", r = 0, i = da.length; i > r; r++) {
      var o = da[r];
      o && o.hasOwnProperty(a) && ((n = o), da.splice(r, 1));
    }
    n || (n = at(a));
    var l = t.$repeat,
      s = l.length - 1;
    return (
      (n.$index = e),
      (n.$first = 0 === e),
      (n.$last = e === s),
      (n.$host = l),
      (n.$outer = t.$outer),
      (n.$stamp = t.clone.cloneNode(!1)),
      (n.$remove = function() {
        return l.removeAt(n.$index);
      }),
      n
    );
  }
  function it() {
    var e = p(
      {
        $key: "",
        $outer: {},
        $host: {},
        $val: {
          get: function() {
            return this.$host[this.$key];
          },
          set: function(e) {
            this.$host[this.$key] = e;
          }
        }
      },
      { $val: 1 }
    );
    return (e.$id = jt("$proxy$with")), e;
  }
  function ot(e, t) {
    var n = va.pop();
    n || (n = it());
    var a = t.$repeat;
    return (
      (n.$key = e),
      (n.$host = a),
      (n.$outer = t.$outer),
      a.$events ? (n.$events.$val = a.$events[e]) : (n.$events = {}),
      n
    );
  }
  function lt(e, t) {
    var n = "each" === t ? da : va;
    avalon.each(e, function(e, t) {
      if (t.$events) {
        for (var a in t.$events)
          Array.isArray(t.$events[a]) &&
            (t.$events[a].forEach(function(e) {
              "object" == typeof e && C(e);
            }),
            (t.$events[a].length = 0));
        (t.$host = t.$outer = {}), n.unshift(t) > u.maxRepeatSize && n.pop();
      }
    }),
      "each" === t && (e.length = 0);
  }
  function st(e, t) {
    var n = "_" + e;
    if (!st[n]) {
      var a = ft.createElement(e);
      Nt.appendChild(a),
        (t = Ot ? getComputedStyle(a, null).display : a.currentStyle.display),
        Nt.removeChild(a),
        (st[n] = t);
    }
    return st[n];
  }
  function ct(e, t, n, a) {
    e = (e + "").replace(/[^0-9+\-Ee.]/g, "");
    var r = isFinite(+e) ? +e : 0,
      i = isFinite(+t) ? Math.abs(t) : 3,
      o = a || ",",
      l = n || ".",
      s = "",
      c = function(e, t) {
        var n = Math.pow(10, t);
        return "" + (Math.round(e * n) / n).toFixed(t);
      };
    return (
      (s = (i ? c(r, i) : "" + Math.round(r)).split(".")),
      s[0].length > 3 && (s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, o)),
      (s[1] || "").length < i &&
        ((s[1] = s[1] || ""),
        (s[1] += new Array(i - s[1].length + 1).join("0"))),
      s.join(l)
    );
  }
  var ut = Date.now(),
    ft = e.document,
    dt = ft.head;
  dt.insertAdjacentHTML(
    "afterBegin",
    '<avalon ms-skip class="avalonHide"><style id="avalonStyle">.avalonHide{ display: none!important }</style></avalon>'
  );
  var vt,
    pt = dt.firstChild,
    ht = "$" + ut,
    mt = e.require,
    gt = e.define,
    yt = !1,
    bt = /[^, ]+/g,
    $t = /^(?:object|array)$/,
    xt = /^\[object SVG\w*Element\]$/,
    wt = /^\[object (?:Window|DOMWindow|global)\]$/,
    Ct = Object.prototype,
    Et = Ct.hasOwnProperty,
    Tt = Ct.toString,
    kt = Array.prototype,
    At = kt.slice,
    Mt = {},
    Ot = e.dispatchEvent,
    Nt = ft.documentElement,
    Lt = ft.createDocumentFragment(),
    St = ft.createElement("div"),
    Ht = {};
  "Boolean Number String Function Array Date RegExp Object Error".replace(
    bt,
    function(e) {
      Ht["[object " + e + "]"] = e.toLowerCase();
    }
  );
  var jt = function(e) {
      return (
        (e = e || "avalon"),
        (e + Math.random() + Math.random()).replace(/0\./g, "")
      );
    },
    Dt = l();
  (avalon = function(e) {
    return new avalon.init(e);
  }),
    (avalon.nextTick = new function() {
      function t() {
        for (var e = i.length, t = 0; e > t; t++) i[t]();
        i = i.slice(e);
      }
      var n = e.setImmediate,
        a = e.MutationObserver,
        r = Ot && e.postMessage;
      if (n) return n.bind(e);
      var i = [];
      if (a) {
        var o = document.createTextNode("avalon");
        return (
          new a(t).observe(o, { characterData: !0 }),
          function(e) {
            i.push(e), (o.data = Math.random());
          }
        );
      }
      return r
        ? (e.addEventListener("message", function(n) {
            var a = n.source;
            (a !== e && null !== a) ||
              "process-tick" !== n.data ||
              (n.stopPropagation(), t());
          }),
          function(t) {
            i.push(t), e.postMessage("process-tick", "*");
          })
        : function(e) {
            setTimeout(e, 0);
          };
    }()),
    (avalon.init = function(e) {
      this[0] = this.element = e;
    }),
    (avalon.fn = avalon.prototype = avalon.init.prototype),
    (avalon.type = function(e) {
      return null == e
        ? String(e)
        : "object" == typeof e || "function" == typeof e
          ? Ht[Tt.call(e)] || "object"
          : typeof e;
    });
  var Pt = function(e) {
    return "[object Function]" === Tt.call(e);
  };
  (avalon.isFunction = Pt),
    (avalon.isWindow = function(e) {
      return wt.test(Tt.call(e));
    }),
    (avalon.isPlainObject = function(e) {
      return (
        "[object Object]" === Tt.call(e) && Object.getPrototypeOf(e) === Ct
      );
    }),
    (avalon.mix = avalon.fn.mix = function() {
      var e,
        t,
        n,
        a,
        r,
        i,
        o = arguments[0] || {},
        l = 1,
        s = arguments.length,
        c = !1;
      for (
        "boolean" == typeof o && ((c = o), (o = arguments[1] || {}), l++),
          "object" == typeof o || Pt(o) || (o = {}),
          l === s && ((o = this), l--);
        s > l;
        l++
      )
        if (null != (e = arguments[l]))
          for (t in e)
            (n = o[t]),
              (a = e[t]),
              o !== a &&
                (c && a && (avalon.isPlainObject(a) || (r = Array.isArray(a)))
                  ? (r
                      ? ((r = !1), (i = n && Array.isArray(n) ? n : []))
                      : (i = n && avalon.isPlainObject(n) ? n : {}),
                    (o[t] = avalon.mix(c, i, a)))
                  : void 0 !== a && (o[t] = a));
      return o;
    }),
    avalon.mix({
      rword: bt,
      subscribers: ht,
      version: 1.43,
      ui: {},
      log: n,
      slice: function(e, t, n) {
        return At.call(e, t, n);
      },
      noop: i,
      error: function(e, t) {
        throw new (t || Error)(e);
      },
      oneObject: o,
      range: function(e, t, n) {
        n || (n = 1), null == t && ((t = e || 0), (e = 0));
        for (
          var a = -1, r = Math.max(0, Math.ceil((t - e) / n)), i = new Array(r);
          ++a < r;

        )
          (i[a] = e), (e += n);
        return i;
      },
      eventHooks: {},
      bind: function(e, t, n, a) {
        var r = avalon.eventHooks,
          i = r[t];
        return (
          "object" == typeof i &&
            ((t = i.type), i.deel && (n = i.deel(e, t, n, a))),
          n.unbind || e.addEventListener(t, n, !!a),
          n
        );
      },
      unbind: function(e, t, n, a) {
        var r = avalon.eventHooks,
          o = r[t],
          l = n || i;
        "object" == typeof o &&
          ((t = o.type), o.deel && (n = o.deel(e, t, n, !1))),
          e.removeEventListener(t, l, !!a);
      },
      css: function(e, t, n) {
        e instanceof avalon && (e = e[0]);
        var a,
          r = /[_-]/.test(t) ? F(t) : t;
        if (
          ((t = avalon.cssName(r) || r), void 0 === n || "boolean" == typeof n)
        ) {
          (a = On[r + ":get"] || On["@:get"]),
            "background" === t && (t = "backgroundColor");
          var i = a(e, t);
          return n === !0 ? parseFloat(i) || 0 : i;
        }
        if ("" === n) e.style[t] = "";
        else {
          if (null == n || n !== n) return;
          isFinite(n) && !avalon.cssNumber[r] && (n += "px"),
            (a = On[r + ":set"] || On["@:set"])(e, t, n);
        }
      },
      each: function(e, t) {
        if (e) {
          var n = 0;
          if (s(e)) for (var a = e.length; a > n && t(n, e[n]) !== !1; n++);
          else for (n in e) if (e.hasOwnProperty(n) && t(n, e[n]) === !1) break;
        }
      },
      getWidgetData: function(e, t) {
        var n = avalon(e).data(),
          a = {};
        for (var r in n)
          0 === r.indexOf(t) &&
            (a[
              r.replace(t, "").replace(/\w/, function(e) {
                return e.toLowerCase();
              })
            ] =
              n[r]);
        return a;
      },
      Array: {
        ensure: function(e, t) {
          return -1 === e.indexOf(t) ? e.push(t) : void 0;
        },
        removeAt: function(e, t) {
          return !!e.splice(t, 1).length;
        },
        remove: function(e, t) {
          var n = e.indexOf(t);
          return ~n ? avalon.Array.removeAt(e, n) : !1;
        }
      }
    });
  var Rt = (avalon.bindingHandlers = {}),
    It = (avalon.bindingExecutors = {}),
    _t = new function() {
      function e(e) {
        (this.size = 0),
          (this.limit = e),
          (this.head = this.tail = void 0),
          (this._keymap = {});
      }
      var t = e.prototype;
      return (
        (t.put = function(e, t) {
          var n = { key: e, value: t };
          return (
            (this._keymap[e] = n),
            this.tail
              ? ((this.tail.newer = n), (n.older = this.tail))
              : (this.head = n),
            (this.tail = n),
            this.size === this.limit ? this.shift() : this.size++,
            t
          );
        }),
        (t.shift = function() {
          var e = this.head;
          e &&
            ((this.head = this.head.newer),
            (this.head.older = e.newer = e.older = this._keymap[
              e.key
            ] = void 0));
        }),
        (t.get = function(e) {
          var t = this._keymap[e];
          return void 0 !== t
            ? t === this.tail
              ? t.value
              : (t.newer &&
                  (t === this.head && (this.head = t.newer),
                  (t.newer.older = t.older)),
                t.older && (t.older.newer = t.newer),
                (t.newer = void 0),
                (t.older = this.tail),
                this.tail && (this.tail.newer = t),
                (this.tail = t),
                t.value)
            : void 0;
        }),
        e
      );
    }();
  if (
    (ft.contains ||
      (Node.prototype.contains = function(e) {
        return !!(16 & this.compareDocumentPosition(e));
      }),
    (avalon.contains = function(e, t) {
      try {
        for (; (t = t.parentNode); ) if (t === e) return !0;
        return !1;
      } catch (n) {
        return !1;
      }
    }),
    e.SVGElement)
  ) {
    var Ft = "http://www.w3.org/2000/svg",
      Bt = ft.createElementNS(Ft, "svg");
    (Bt.innerHTML = '<circle cx="50" cy="50" r="40" fill="red" />'),
      xt.test(Bt.firstChild) ||
        Object.defineProperties(SVGElement.prototype, {
          outerHTML: {
            enumerable: !0,
            configurable: !0,
            get: function() {
              return new XMLSerializer().serializeToString(this);
            },
            set: function(e) {
              var t = this.tagName.toLowerCase(),
                n = this.parentNode,
                a = avalon.parseHTML(e);
              if ("svg" === t) n.insertBefore(a, this);
              else {
                var r = ft.createDocumentFragment();
                c(a, r), n.insertBefore(r, this);
              }
              n.removeChild(this);
            }
          },
          innerHTML: {
            enumerable: !0,
            configurable: !0,
            get: function() {
              var e = this.outerHTML,
                t = new RegExp(
                  "<" + this.nodeName + '\\b(?:(["\'])[^"]*?(\\1)|[^>])*>',
                  "i"
                ),
                n = new RegExp("</" + this.nodeName + ">$", "i");
              return e.replace(t, "").replace(n, "");
            },
            set: function(e) {
              if (avalon.clearHTML) {
                avalon.clearHTML(this);
                var t = avalon.parseHTML(e);
                c(t, this);
              }
            }
          }
        });
  }
  var Ut = avalon.eventHooks;
  "onmouseenter" in Nt ||
    avalon.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function(
      e,
      t
    ) {
      Ut[e] = {
        type: t,
        deel: function(t, n, a) {
          return function(n) {
            var r = n.relatedTarget;
            return r && (r === t || 16 & t.compareDocumentPosition(r))
              ? void 0
              : (delete n.type, (n.type = e), a.call(t, n));
          };
        }
      };
    }),
    avalon.each(
      {
        AnimationEvent: "animationend",
        WebKitAnimationEvent: "webkitAnimationEnd"
      },
      function(t, n) {
        e[t] && !Ut.animationend && (Ut.animationend = { type: n });
      }
    ),
    void 0 === ft.onmousewheel &&
      (Ut.mousewheel = {
        type: "wheel",
        deel: function(e, t, n) {
          return function(t) {
            (t.wheelDeltaY = t.wheelDelta = t.deltaY > 0 ? -120 : 120),
              (t.wheelDeltaX = 0),
              Object.defineProperty(t, "type", { value: "mousewheel" }),
              n.call(e, t);
          };
        }
      });
  var Vt,
    qt,
    zt,
    Wt,
    Xt,
    Yt = /[-.*+?^${}()|[\]\/\\]/g,
    Gt = {
      loader: function(t) {
        var n = vt && t;
        (e.require = n ? vt : mt), (e.define = n ? vt.define : gt);
      },
      interpolate: function(e) {
        if (((Vt = e[0]), (qt = e[1]), Vt === qt))
          throw new SyntaxError("openTag!==closeTag");
        if (e + "" == "<!--,-->") u.commentInterpolate = !0;
        else {
          var t = Vt + "test" + qt;
          if (
            ((St.innerHTML = t),
            St.innerHTML !== t && St.innerHTML.indexOf("&lt;") > -1)
          )
            throw new SyntaxError("此定界符不合法");
          St.innerHTML = "";
        }
        var n = f(Vt),
          a = f(qt);
        (zt = new RegExp(n + "(.*?)" + a)),
          (Wt = new RegExp(n + "(.*?)" + a, "g")),
          (Xt = new RegExp(n + ".*?" + a + "|\\sms-"));
      }
    };
  (u.debug = !0),
    (u.plugins = Gt),
    u.plugins.interpolate(["{{", "}}"]),
    (u.paths = {}),
    (u.shim = {}),
    (u.maxRepeatSize = 100),
    (avalon.config = u);
  var Zt = function(e) {
      return ft.querySelectorAll(e);
    },
    Jt = {
      $watch: function(e, t) {
        if ("function" == typeof t) {
          var n = this.$events[e];
          n ? n.push(t) : (this.$events[e] = [t]);
        } else this.$events = this.$watch.backup;
        return this;
      },
      $unwatch: function(e, t) {
        var n = arguments.length;
        if (0 === n) (this.$watch.backup = this.$events), (this.$events = {});
        else if (1 === n) this.$events[e] = [];
        else
          for (var a = this.$events[e] || [], r = a.length; ~--r < 0; )
            if (a[r] === t) return a.splice(r, 1);
        return this;
      },
      $fire: function(e) {
        var t, n, a, r;
        /^(\w+)!(\S+)$/.test(e) && ((t = RegExp.$1), (e = RegExp.$2));
        var i = this.$events;
        if (i) {
          var o = At.call(arguments, 1),
            l = [e].concat(o);
          if ("all" === t)
            for (n in avalon.vmodels)
              (a = avalon.vmodels[n]), a !== this && a.$fire.apply(a, l);
          else if ("up" === t || "down" === t) {
            var s = i.expr ? Zt(i.expr) : [];
            if (0 === s.length) return;
            for (n in avalon.vmodels)
              if (((a = avalon.vmodels[n]), a !== this && a.$events.expr)) {
                var c = Zt(a.$events.expr);
                if (0 === c.length) continue;
                Array.prototype.forEach.call(c, function(e) {
                  Array.prototype.forEach.call(s, function(n) {
                    var r = "down" === t ? n.contains(e) : e.contains(n);
                    r && (e._avalon = a);
                  });
                });
              }
            var u = ft.getElementsByTagName("*"),
              f = [];
            for (
              Array.prototype.forEach.call(u, function(e) {
                e._avalon &&
                  (f.push(e._avalon),
                  (e._avalon = ""),
                  e.removeAttribute("_avalon"));
              }),
                "up" === t && f.reverse(),
                n = 0;
              (r = f[n++]) && r.$fire.apply(r, l) !== !1;

            );
          } else {
            var d = i[e] || [],
              v = i.$all || [];
            for (n = 0; (r = d[n++]); ) Pt(r) && r.apply(this, o);
            for (n = 0; (r = v[n++]); ) Pt(r) && r.apply(this, arguments);
          }
        }
      }
    },
    Qt = (avalon.vmodels = r());
  avalon.define = function(e, t) {
    var a = e.$id || e;
    if (
      (a || n("warning: vm必须指定$id"),
      Qt[a] && n("warning: " + a + " 已经存在于avalon.vmodels中"),
      "object" == typeof e)
    )
      var r = p(e);
    else {
      var o = { $watch: i };
      t(o), (r = p(o)), (yt = !0), t(r), (yt = !1);
    }
    return (r.$id = a), (Qt[a] = r);
  };
  var Kt = String("$id,$watch,$unwatch,$fire,$events,$model,$skipArray").match(
      bt
    ),
    en = r(),
    tn =
      Object.is ||
      function(e, t) {
        return 0 === e && 0 === t
          ? 1 / e === 1 / t
          : e !== e
            ? t !== t
            : e === t;
      },
    nn = function(e) {
      var t = r();
      for (var n in e)
        t[n] = { get: e[n], set: e[n], enumerable: !0, configurable: !0 };
      return t;
    },
    an = kt.splice,
    rn = {
      _splice: an,
      _fire: function(e, t, n) {
        k(this.$events[ht], e, t, n);
      },
      size: function() {
        return this._.length;
      },
      pushArray: function(e) {
        var t = e.length,
          n = this.length;
        return (
          t &&
            (kt.push.apply(this.$model, e),
            y.call(this, "add", n, t, Math.max(0, n - 1))),
          t + n
        );
      },
      push: function() {
        var e,
          t = [],
          n = arguments.length;
        for (e = 0; n > e; e++) t[e] = arguments[e];
        return this.pushArray(t);
      },
      unshift: function() {
        var e = arguments.length,
          t = this.length;
        return (
          e &&
            (kt.unshift.apply(this.$model, arguments),
            y.call(this, "add", 0, e, 0)),
          e + t
        );
      },
      shift: function() {
        if (this.length) {
          var e = this.$model.shift();
          return y.call(this, "del", 0, 1, 0), e;
        }
      },
      pop: function() {
        var e = this.length;
        if (e) {
          var t = this.$model.pop();
          return y.call(this, "del", e - 1, 1, Math.max(0, e - 2)), t;
        }
      },
      splice: function(e) {
        var t,
          n = arguments.length,
          a = [],
          r = an.apply(this.$model, arguments);
        return (
          r.length && (a.push("del", e, r.length, 0), (t = !0)),
          n > 2 &&
            (t
              ? a.splice(3, 1, 0, "add", e, n - 2)
              : a.push("add", e, n - 2, 0),
            (t = !0)),
          t ? y.apply(this, a) : []
        );
      },
      contains: function(e) {
        return -1 !== this.indexOf(e);
      },
      remove: function(e) {
        return this.removeAt(this.indexOf(e));
      },
      removeAt: function(e) {
        return e >= 0
          ? (this.$model.splice(e, 1), y.call(this, "del", e, 1, 0))
          : [];
      },
      clear: function() {
        return (
          (this.$model.length = this.length = this._.length = 0),
          this._fire("clear", 0),
          this
        );
      },
      removeAll: function(e) {
        if (Array.isArray(e))
          e.forEach(function(e) {
            this.remove(e);
          }, this);
        else if ("function" == typeof e)
          for (var t = this.length - 1; t >= 0; t--) {
            var n = this[t];
            e(n, t) && this.removeAt(t);
          }
        else this.clear();
      },
      ensure: function(e) {
        return this.contains(e) || this.push(e), this;
      },
      set: function(e, t) {
        if (e >= 0) {
          var n = avalon.type(t);
          t && t.$model && (t = t.$model);
          var a = this[e];
          if ("object" === n)
            for (var r in t) a.hasOwnProperty(r) && (a[r] = t[r]);
          else
            "array" === n
              ? a.clear().push.apply(a, t)
              : a !== t &&
                ((this[e] = t), (this.$model[e] = t), this._fire("set", e, t));
        }
        return this;
      }
    };
  "sort,reverse".replace(bt, function(e) {
    rn[e] = function() {
      var t,
        n = this.$model,
        a = n.concat(),
        r = Math.random(),
        i = [];
      kt[e].apply(n, arguments);
      for (var o = 0, l = a.length; l > o; o++) {
        var s = n[o],
          c = a[o];
        if (tn(s, c)) i.push(o);
        else {
          var u = a.indexOf(s);
          i.push(u), (a[u] = r), (t = !0);
        }
      }
      return (
        t && (b(this, i), this._fire("move", i), this._fire("index", 0)), this
      );
    };
  });
  var on = /^(duplex|on)$/,
    ln = (avalon.$$subscribers = []),
    sn = new Date(),
    cn = {},
    un = new function() {
      avalon.mix(this, {
        option: ft.createElement("select"),
        thead: ft.createElement("table"),
        td: ft.createElement("tr"),
        area: ft.createElement("map"),
        tr: ft.createElement("tbody"),
        col: ft.createElement("colgroup"),
        legend: ft.createElement("fieldset"),
        _default: ft.createElement("div"),
        g: ft.createElementNS("http://www.w3.org/2000/svg", "svg")
      }),
        (this.optgroup = this.option),
        (this.tbody = this.tfoot = this.colgroup = this.caption = this.thead),
        (this.th = this.td);
    }();
  String(
    "circle,defs,ellipse,image,line,path,polygon,polyline,rect,symbol,text,use"
  ).replace(bt, function(e) {
    un[e] = un.g;
  });
  var fn = /<([\w:]+)/,
    dn = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    vn = o([
      "",
      "text/javascript",
      "text/ecmascript",
      "application/ecmascript",
      "application/javascript"
    ]),
    pn = ft.createElement("script"),
    hn = /<|&#?\w+;/;
  (avalon.parseHTML = function(e) {
    var t = Lt.cloneNode(!1);
    if ("string" != typeof e) return t;
    if (!hn.test(e)) return t.appendChild(ft.createTextNode(e)), t;
    e = e.replace(dn, "<$1></$2>").trim();
    var n,
      a = (fn.exec(e) || ["", ""])[1].toLowerCase(),
      r = un[a] || un._default;
    r.innerHTML = e;
    var i = r.getElementsByTagName("script");
    if (i.length)
      for (var o, l = 0; (o = i[l++]); )
        if (vn[o.type]) {
          var s = pn.cloneNode(!1);
          kt.forEach.call(o.attributes, function(e) {
            s.setAttribute(e.name, e.value);
          }),
            (s.text = o.text),
            o.parentNode.replaceChild(s, o);
        }
    for (; (n = r.firstChild); ) t.appendChild(n);
    return t;
  }),
    (avalon.innerHTML = function(e, t) {
      var n = this.parseHTML(t);
      this.clearHTML(e).appendChild(n);
    }),
    (avalon.clearHTML = function(e) {
      for (e.textContent = ""; e.firstChild; ) e.removeChild(e.firstChild);
      return e;
    }),
    (avalon.scan = function(e, t) {
      e = e || Nt;
      var n = t ? [].concat(t) : [];
      D(e, n);
    });
  var mn = o(
      "area,base,basefont,br,col,command,embed,hr,img,input,link,meta,param,source,track,wbr,noscript,script,style,textarea".toUpperCase()
    ),
    gn = function(e, t, n) {
      var a = e.getAttribute(t);
      if (a)
        for (var r, i = 0; (r = n[i++]); )
          if (r.hasOwnProperty(a) && "function" == typeof r[a]) return r[a];
    },
    yn =
      Dt && e.MutationObserver
        ? function(e) {
            for (var t, n = e.firstChild; n; ) {
              var a = n.nextSibling;
              3 === n.nodeType
                ? t
                  ? ((t.nodeValue += n.nodeValue), e.removeChild(n))
                  : (t = n)
                : (t = null),
                (n = a);
            }
          }
        : 0,
    bn = /ms-(\w+)-?(.*)/,
    $n = {
      if: 10,
      repeat: 90,
      data: 100,
      widget: 110,
      each: 1400,
      with: 1500,
      duplex: 2e3,
      on: 3e3
    },
    xn = o(
      "animationend,blur,change,input,click,dblclick,focus,keydown,keypress,keyup,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,scan,scroll,submit"
    ),
    wn = o("value,title,alt,checked,selected,disabled,readonly,enabled"),
    Cn = /^if|widget|repeat$/,
    En = /^each|with|html|include$/,
    Tn = /\|\s*html\s*/,
    kn = /\|\|/g,
    An = /(['"])(\\\1|.)+?\1/g;
  "add,remove".replace(bt, function(e) {
    avalon.fn[e + "Class"] = function(t) {
      var n = this[0];
      return (
        t &&
          "string" == typeof t &&
          n &&
          1 === n.nodeType &&
          t.replace(/\S+/g, function(t) {
            n.classList[e](t);
          }),
        this
      );
    };
  }),
    avalon.fn.mix({
      hasClass: function(e) {
        var t = this[0] || {};
        return 1 === t.nodeType && t.classList.contains(e);
      },
      toggleClass: function(e, t) {
        for (
          var n, a = 0, r = String(e).split(/\s+/), i = "boolean" == typeof t;
          (n = r[a++]);

        ) {
          var o = i ? t : !this.hasClass(n);
          this[o ? "addClass" : "removeClass"](n);
        }
        return this;
      },
      attr: function(e, t) {
        return 2 === arguments.length
          ? (this[0].setAttribute(e, t), this)
          : this[0].getAttribute(e);
      },
      data: function(e, t) {
        switch (((e = "data-" + _(e || "")), arguments.length)) {
          case 2:
            return this.attr(e, t), this;
          case 1:
            var n = this.attr(e);
            return B(n);
          case 0:
            var a = {};
            return (
              kt.forEach.call(this[0].attributes, function(t) {
                t &&
                  ((e = t.name),
                  e.indexOf("data-") ||
                    ((e = F(e.slice(5))), (a[e] = B(t.value))));
              }),
              a
            );
        }
      },
      removeData: function(e) {
        return (e = "data-" + _(e)), this[0].removeAttribute(e), this;
      },
      css: function(e, t) {
        if (avalon.isPlainObject(e)) for (var n in e) avalon.css(this, n, e[n]);
        else var a = avalon.css(this, e, t);
        return void 0 !== a ? a : this;
      },
      position: function() {
        var e,
          t,
          n = this[0],
          a = { top: 0, left: 0 };
        return n
          ? ("fixed" === this.css("position")
              ? (t = n.getBoundingClientRect())
              : ((e = this.offsetParent()),
                (t = this.offset()),
                "HTML" !== e[0].tagName && (a = e.offset()),
                (a.top += avalon.css(e[0], "borderTopWidth", !0)),
                (a.left += avalon.css(e[0], "borderLeftWidth", !0)),
                (a.top -= e.scrollTop()),
                (a.left -= e.scrollLeft())),
            {
              top: t.top - a.top - avalon.css(n, "marginTop", !0),
              left: t.left - a.left - avalon.css(n, "marginLeft", !0)
            })
          : void 0;
      },
      offsetParent: function() {
        for (
          var e = this[0].offsetParent;
          e && "static" === avalon.css(e, "position");

        )
          e = e.offsetParent;
        return avalon(e || Nt);
      },
      bind: function(e, t, n) {
        return this[0] ? avalon.bind(this[0], e, t, n) : void 0;
      },
      unbind: function(e, t, n) {
        return this[0] && avalon.unbind(this[0], e, t, n), this;
      },
      val: function(e) {
        var t = this[0];
        if (t && 1 === t.nodeType) {
          var n = 0 === arguments.length,
            a = n ? ":get" : ":set",
            r = jn[q(t) + a];
          if (r) var i = r(t, e);
          else {
            if (n) return (t.value || "").replace(/\r/g, "");
            t.value = e;
          }
        }
        return n ? i : this;
      }
    }),
    Nt.dataset &&
      (avalon.fn.data = function(e, t) {
        e = e && F(e);
        var n = this[0].dataset;
        switch (arguments.length) {
          case 2:
            return (n[e] = t), this;
          case 1:
            return (t = n[e]), B(t);
          case 0:
            var a = r();
            for (e in n) a[e] = B(n[e]);
            return a;
        }
      });
  var Mn = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/;
  (avalon.parseJSON = JSON.parse),
    avalon.each(
      { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
      function(e, t) {
        avalon.fn[e] = function(n) {
          var a = this[0] || {},
            r = U(a),
            i = "scrollTop" === e;
          return arguments.length
            ? void (r ? r.scrollTo(i ? r[t] : n, i ? n : r[t]) : (a[e] = n))
            : r
              ? r[t]
              : a[e];
        };
      }
    );
  var On = (avalon.cssHooks = r()),
    Nn = ["", "-webkit-", "-moz-", "-ms-"],
    Ln = { float: "cssFloat" };
  (avalon.cssNumber = o(
    "columnCount,order,fillOpacity,fontWeight,lineHeight,opacity,orphans,widows,zIndex,zoom"
  )),
    (avalon.cssName = function(e, t, n) {
      if (Ln[e]) return Ln[e];
      t = t || Nt.style;
      for (var a = 0, r = Nn.length; r > a; a++)
        if (((n = F(Nn[a] + e)), n in t)) return (Ln[e] = n);
      return null;
    }),
    (On["@:set"] = function(e, t, n) {
      e.style[t] = n;
    }),
    (On["@:get"] = function(e, t) {
      if (!e || !e.style)
        throw new Error("getComputedStyle要求传入一个节点 " + e);
      var n,
        a = getComputedStyle(e);
      return (
        a &&
          ((n = "filter" === t ? a.getPropertyValue(t) : a[t]),
          "" === n && (n = e.style[t])),
        n
      );
    }),
    (On["opacity:get"] = function(e) {
      var t = On["@:get"](e, "opacity");
      return "" === t ? "1" : t;
    }),
    "top,left".replace(bt, function(e) {
      On[e + ":get"] = function(t) {
        var n = On["@:get"](t, e);
        return /px$/.test(n) ? n : avalon(t).position()[e] + "px";
      };
    });
  var Sn = { position: "absolute", visibility: "hidden", display: "block" },
    Hn = /^(none|table(?!-c[ea]).+)/;
  "Width,Height".replace(bt, function(e) {
    var t = e.toLowerCase(),
      n = "client" + e,
      a = "scroll" + e,
      r = "offset" + e;
    (On[t + ":get"] = function(t, n, a) {
      var i = -4;
      "number" == typeof a && (i = a),
        (n = "Width" === e ? ["Left", "Right"] : ["Top", "Bottom"]);
      var o = t[r];
      return 2 === i
        ? o +
            avalon.css(t, "margin" + n[0], !0) +
            avalon.css(t, "margin" + n[1], !0)
        : (0 > i &&
            (o =
              o -
              avalon.css(t, "border" + n[0] + "Width", !0) -
              avalon.css(t, "border" + n[1] + "Width", !0)),
          -4 === i &&
            (o =
              o -
              avalon.css(t, "padding" + n[0], !0) -
              avalon.css(t, "padding" + n[1], !0)),
          o);
    }),
      (On[t + "&get"] = function(e) {
        var n = [];
        V(e, n);
        for (var a, r = On[t + ":get"](e), i = 0; (a = n[i++]); ) {
          e = a.node;
          for (var o in a) "string" == typeof a[o] && (e.style[o] = a[o]);
        }
        return r;
      }),
      (avalon.fn[t] = function(i) {
        var o = this[0];
        if (0 === arguments.length) {
          if (o.setTimeout) return o["inner" + e];
          if (9 === o.nodeType) {
            var l = o.documentElement;
            return Math.max(o.body[a], l[a], o.body[r], l[r], l[n]);
          }
          return On[t + "&get"](o);
        }
        return this.css(t, i);
      }),
      (avalon.fn["inner" + e] = function() {
        return On[t + ":get"](this[0], void 0, -2);
      }),
      (avalon.fn["outer" + e] = function(e) {
        return On[t + ":get"](this[0], void 0, e === !0 ? 2 : 0);
      });
  }),
    (avalon.fn.offset = function() {
      var e = this[0];
      try {
        var t = e.getBoundingClientRect();
        if (t.width || t.height || e.getClientRects().length) {
          var n = e.ownerDocument,
            a = n.documentElement,
            r = n.defaultView;
          return {
            top: t.top + r.pageYOffset - a.clientTop,
            left: t.left + r.pageXOffset - a.clientLeft
          };
        }
      } catch (i) {
        return { left: 0, top: 0 };
      }
    });
  var jn = {
      "select:get": function(e, t) {
        for (
          var n,
            a = e.options,
            r = e.selectedIndex,
            i = "select-one" === e.type || 0 > r,
            o = i ? null : [],
            l = i ? r + 1 : a.length,
            s = 0 > r ? l : i ? r : 0;
          l > s;
          s++
        )
          if (((n = a[s]), (n.selected || s === r) && !n.disabled)) {
            if (((t = n.value), i)) return t;
            o.push(t);
          }
        return o;
      },
      "select:set": function(e, t, n) {
        t = [].concat(t);
        for (var a, r = 0; (a = e.options[r++]); )
          (a.selected = t.indexOf(a.value) > -1) && (n = !0);
        n || (e.selectedIndex = -1);
      }
    },
    Dn = JSON.stringify,
    Pn = [
      "break,case,catch,continue,debugger,default,delete,do,else,false",
      "finally,for,function,if,in,instanceof,new,null,return,switch,this",
      "throw,true,try,typeof,var,void,while,with",
      "abstract,boolean,byte,char,class,const,double,enum,export,extends",
      "final,float,goto,implements,import,int,interface,long,native",
      "package,private,protected,public,short,static,super,synchronized",
      "throws,transient,volatile",
      "arguments,let,yield,undefined"
    ].join(","),
    Rn = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g,
    In = /[^\w$]+/g,
    _n = new RegExp(
      ["\\b" + Pn.replace(/,/g, "\\b|\\b") + "\\b"].join("|"),
      "g"
    ),
    Fn = /\b\d[^,]*/g,
    Bn = /^,+|,+$/g,
    Un = new _t(512),
    Vn = function(e) {
      var t = "," + e.trim(),
        n = Un.get(t);
      if (n) return n;
      var a = e
        .replace(Rn, "")
        .replace(In, ",")
        .replace(_n, "")
        .replace(Fn, "")
        .replace(Bn, "")
        .split(/^$|,+/);
      return Un.put(t, W(a));
    },
    qn = new _t(128),
    zn = /\w\[.*\]|\w\.\w/,
    Wn = /(\$proxy\$[a-z]+)\d+$/,
    Xn = /\)\s*$/,
    Yn = /\)\s*\|/g,
    Gn = /\|\s*([$\w]+)/g,
    Zn = /"\s*\["/g,
    Jn = /"\s*\(/g;
  avalon.parseExprProxy = G;
  var Qn = [
      "autofocus,autoplay,async,allowTransparency,checked,controls",
      "declare,disabled,defer,defaultChecked,defaultSelected",
      "contentEditable,isMap,loop,multiple,noHref,noResize,noShade",
      "open,readOnly,selected"
    ].join(","),
    Kn = {};
  Qn.replace(bt, function(e) {
    Kn[e.toLowerCase()] = e;
  });
  var ea = {
      "accept-charset": "acceptCharset",
      char: "ch",
      charoff: "chOff",
      class: "className",
      for: "htmlFor",
      "http-equiv": "httpEquiv"
    },
    ta = [
      "accessKey,bgColor,cellPadding,cellSpacing,codeBase,codeType,colSpan",
      "dateTime,defaultValue,frameBorder,longDesc,maxLength,marginWidth,marginHeight",
      "rowSpan,tabIndex,useMap,vSpace,valueType,vAlign"
    ].join(",");
  ta.replace(bt, function(e) {
    ea[e.toLowerCase()] = e;
  });
  var na = /<noscript.*?>(?:[\s\S]+?)<\/noscript>/gim,
    aa = /<noscript.*?>([\s\S]+?)<\/noscript>/im,
    ra = function() {
      return new (e.XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP");
    },
    ia = (avalon.templateCache = {});
  (Rt.attr = function(e, t) {
    var n = e.value.trim(),
      a = !0;
    if (
      (n.indexOf(Vt) > -1 &&
        n.indexOf(qt) > 2 &&
        ((a = !1),
        zt.test(n) &&
          "" === RegExp.rightContext &&
          "" === RegExp.leftContext &&
          ((a = !0), (n = RegExp.$1))),
      "include" === e.type)
    ) {
      var r = e.element;
      (e.includeRendered = gn(r, "data-include-rendered", t)),
        (e.includeLoaded = gn(r, "data-include-loaded", t));
      var i = (e.includeReplace = !!avalon(r).data("includeReplace"));
      avalon(r).data("includeCache") && (e.templateCache = {}),
        (e.startInclude = ft.createComment("ms-include")),
        (e.endInclude = ft.createComment("ms-include-end")),
        i
          ? ((e.element = e.startInclude),
            r.parentNode.insertBefore(e.startInclude, r),
            r.parentNode.insertBefore(e.endInclude, r.nextSibling))
          : (r.insertBefore(e.startInclude, r.firstChild),
            r.appendChild(e.endInclude));
    }
    (e.handlerName = "attr"), G(n, t, e, a ? 0 : R(e.value));
  }),
    (It.attr = function(t, n, a) {
      var r = a.type,
        i = a.param;
      if ("css" === r) avalon(n).css(i, t);
      else if ("attr" === r) {
        var o = t === !1 || null === t || void 0 === t;
        !Ot && ea[i] && (i = ea[i]);
        var l = Kn[i];
        if (("boolean" == typeof n[l] && ((n[l] = !!t), t || (o = !0)), o))
          return n.removeAttribute(i);
        var s = xt.test(n)
          ? !1
          : ft.namespaces && isVML(n)
            ? !0
            : i in n.cloneNode(!1);
        s ? (n[i] = t) : n.setAttribute(i, t);
      } else if ("include" === r && t) {
        var c = a.vmodels,
          u = a.includeRendered,
          f = a.includeLoaded,
          d = a.includeReplace,
          v = d ? n.parentNode : n,
          p = function(e) {
            if (f) {
              var n = f.apply(v, [e].concat(c));
              "string" == typeof n && (e = n);
            }
            u &&
              A(
                v,
                function() {
                  u.call(v);
                },
                0 / 0
              );
            var r = a.includeLastID;
            if (a.templateCache && r && r !== t) {
              var i = a.templateCache[r];
              i ||
                ((i = a.templateCache[r] = ft.createElement("div")),
                pt.appendChild(i));
            }
            for (a.includeLastID = t; ; ) {
              var o = a.startInclude.nextSibling;
              if (!o || o === a.endInclude) break;
              v.removeChild(o), i && i.appendChild(o);
            }
            var l = Z(a, t, e),
              s = avalon.slice(l.childNodes);
            v.insertBefore(l, a.endInclude), H(s, c);
          };
        if ("src" === a.param)
          if ("string" == typeof ia[t])
            avalon.nextTick(function() {
              p(ia[t]);
            });
          else if (Array.isArray(ia[t])) ia[t].push(p);
          else {
            var h = ra();
            (h.onreadystatechange = function() {
              if (4 === h.readyState) {
                var e = h.status;
                if ((e >= 200 && 300 > e) || 304 === e || 1223 === e) {
                  for (var n, a = h.responseText, r = 0; (n = ia[t][r++]); )
                    n(a);
                  ia[t] = a;
                }
              }
            }),
              (ia[t] = [p]),
              h.open("GET", t, !0),
              "withCredentials" in h && (h.withCredentials = !0),
              h.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
              h.send(null);
          }
        else {
          var m = t && 1 === t.nodeType ? t : ft.getElementById(t);
          if (m) {
            if ("NOSCRIPT" === m.tagName && !m.innerHTML && !m.fixIE78) {
              (h = ra()), h.open("GET", location, !1), h.send(null);
              for (
                var g = ft.getElementsByTagName("noscript"),
                  y = (h.responseText || "").match(na) || [],
                  b = y.length,
                  $ = 0;
                b > $;
                $++
              ) {
                var x = g[$];
                x &&
                  ((x.style.display = "none"),
                  (x.fixIE78 = (y[$].match(aa) || ["", "&nbsp;"])[1]));
              }
            }
            avalon.nextTick(function() {
              p(m.fixIE78 || m.value || m.innerText || m.innerHTML);
            });
          }
        }
      } else if (
        (Nt.hasAttribute ||
          "string" != typeof t ||
          ("src" !== r && "href" !== r) ||
          (t = t.replace(/&amp;/g, "&")),
        (n[r] = t),
        e.chrome && "EMBED" === n.tagName)
      ) {
        var w = n.parentNode,
          C = document.createComment("ms-src");
        w.replaceChild(C, n), w.replaceChild(n, C);
      }
    }),
    "title,alt,src,value,css,include,href".replace(bt, function(e) {
      Rt[e] = Rt.attr;
    }),
    (Rt["class"] = function(e, t) {
      var a,
        r = e.param,
        i = e.value;
      if (((e.handlerName = "class"), !r || isFinite(r))) {
        e.param = "";
        var o = i.replace(Wt, function(e) {
            return e.replace(/./g, "0");
          }),
          l = o.indexOf(":");
        if (-1 === l) var s = i;
        else {
          if (
            ((s = i.slice(0, l)),
            (a = i.slice(l + 1)),
            Y(a, t, e),
            !e.evaluator)
          )
            return (
              n("debug: ms-class '" + (a || "").trim() + "' 不存在于VM中"), !1
            );
          (e._evaluator = e.evaluator), (e._args = e.args);
        }
        var c = zt.test(s);
        c || (e.immobileClass = s), G("", t, e, c ? R(s) : 0);
      } else (e.immobileClass = e.oldStyle = e.param), G(i, t, e);
    }),
    (It["class"] = function(e, t, n) {
      var a = avalon(t),
        r = n.type;
      if ("class" === r && n.oldStyle) a.toggleClass(n.oldStyle, !!e);
      else
        switch (
          ((n.toggleClass = n._evaluator
            ? !!n._evaluator.apply(t, n._args)
            : !0),
          (n.newClass = n.immobileClass || e),
          n.oldClass && n.newClass !== n.oldClass && a.removeClass(n.oldClass),
          (n.oldClass = n.newClass),
          r)
        ) {
          case "class":
            a.toggleClass(n.newClass, n.toggleClass);
            break;
          case "hover":
          case "active":
            if (!n.hasBindEvent) {
              var i = "mouseenter",
                o = "mouseleave";
              if ("active" === r) {
                (t.tabIndex = t.tabIndex || -1),
                  (i = "mousedown"),
                  (o = "mouseup");
                var l = a.bind("mouseleave", function() {
                  n.toggleClass && a.removeClass(n.newClass);
                });
              }
              var s = a.bind(i, function() {
                  n.toggleClass && a.addClass(n.newClass);
                }),
                c = a.bind(o, function() {
                  n.toggleClass && a.removeClass(n.newClass);
                });
              (n.rollback = function() {
                a.unbind("mouseleave", l), a.unbind(i, s), a.unbind(o, c);
              }),
                (n.hasBindEvent = !0);
            }
        }
    }),
    "hover,active".replace(bt, function(e) {
      Rt[e] = Rt["class"];
    }),
    (It.data = function(e, t, n) {
      var a = "data-" + n.param;
      e && "object" == typeof e ? (t[a] = e) : t.setAttribute(a, String(e));
    });
  var oa = (Rt.duplex = function(e, t) {
    var a,
      r = e.element;
    if (
      (G(e.value, t, e, 0, 1),
      (e.changed = gn(r, "data-duplex-changed", t) || i),
      e.evaluator && e.args)
    ) {
      var l = [],
        s = o("string,number,boolean,checked");
      "radio" === r.type && "" === e.param && (e.param = "checked"),
        r.msData && (r.msData["ms-duplex"] = e.value),
        e.param.replace(/\w+/g, function(t) {
          /^(checkbox|radio)$/.test(r.type) &&
            /^(radio|checked)$/.test(t) &&
            ("radio" === t && n("ms-duplex-radio已经更名为ms-duplex-checked"),
            (t = "checked"),
            (e.isChecked = !0)),
            "bool" === t
              ? ((t = "boolean"),
                n("ms-duplex-bool已经更名为ms-duplex-boolean"))
              : "text" === t &&
                ((t = "string"), n("ms-duplex-text已经更名为ms-duplex-string")),
            s[t] && (a = !0),
            avalon.Array.ensure(l, t);
        }),
        a || l.push("string"),
        (e.param = l.join("-")),
        (e.bound = function(t, n) {
          r.addEventListener
            ? r.addEventListener(t, n, !1)
            : r.attachEvent("on" + t, n);
          var a = e.rollback;
          e.rollback = function() {
            (r.avalonSetter = null), avalon.unbind(r, t, n), a && a();
          };
        });
      for (var c in avalon.vmodels) {
        var u = avalon.vmodels[c];
        u.$fire("avalon-ms-duplex-init", e);
      }
      var f = e.pipe || (e.pipe = Q);
      f(null, e, "init");
      var d = r.tagName;
      oa[d] && oa[d](r, e.evaluator.apply(null, e.args), e);
    }
  });
  avalon.duplexHooks = {
    checked: {
      get: function(e, t) {
        return !t.element.oldValue;
      }
    },
    string: {
      get: function(e) {
        return e;
      },
      set: J
    },
    boolean: {
      get: function(e) {
        return "true" === e;
      },
      set: J
    },
    number: {
      get: function(e, t) {
        var n = parseFloat(e);
        if (-e === -n) return n;
        var a = /strong|medium|weak/.exec(
          t.element.getAttribute("data-duplex-number")
        ) || ["medium"];
        switch (a[0]) {
          case "strong":
            return 0;
          case "medium":
            return "" === e ? "" : 0;
          case "weak":
            return e;
        }
      },
      set: J
    }
  };
  var la,
    sa = [];
  avalon.tick = function(e) {
    1 === sa.push(e) && (la = setInterval(K, 60));
  };
  var ca = i,
    ua = /text|password|hidden/;
  !new function() {
    function e(e) {
      if (avalon.contains(Nt, this)) {
        if ((t[this.tagName].call(this, e), !ua.test(this.type))) return;
        !this.msFocus && this.avalonSetter && this.avalonSetter();
      }
    }
    try {
      var t = {},
        n = HTMLInputElement.prototype,
        a = HTMLTextAreaElement.prototype,
        r = HTMLInputElement.prototype;
      Object.getOwnPropertyNames(r),
        (t.INPUT = Object.getOwnPropertyDescriptor(n, "value").set),
        Object.defineProperty(n, "value", { set: e }),
        (t.TEXTAREA = Object.getOwnPropertyDescriptor(a, "value").set),
        Object.defineProperty(a, "value", { set: e });
    } catch (i) {
      ca = avalon.tick;
    }
  }(),
    (oa.INPUT = function(e, t, a) {
      function r(e) {
        a.changed.call(this, e, a);
      }
      function i() {
        u = !0;
      }
      function o() {
        u = !1;
      }
      var l = e.type,
        s = a.bound,
        c = avalon(e),
        u = !1,
        f = function() {
          if (!u) {
            var n = (e.oldValue = e.value),
              i = a.pipe(n, a, "get");
            c.data("duplexObserve") !== !1 &&
              (t(i),
              r.call(e, i),
              c.data("duplex-focus") &&
                avalon.nextTick(function() {
                  e.focus();
                }));
          }
        };
      if (
        ((a.handler = function() {
          var n = a.pipe(t(), a, "set") + "";
          n !== e.oldValue && (e.value = n);
        }),
        a.isChecked || "radio" === l)
      )
        (f = function() {
          if (c.data("duplexObserve") !== !1) {
            var n = a.pipe(e.value, a, "get");
            t(n), r.call(e, n);
          }
        }),
          (a.handler = function() {
            var n = t(),
              r = a.isChecked ? !!n : n + "" === e.value;
            e.checked = e.oldValue = r;
          }),
          s("click", f);
      else if ("checkbox" === l)
        (f = function() {
          if (c.data("duplexObserve") !== !1) {
            var i = e.checked ? "ensure" : "remove",
              o = t();
            Array.isArray(o) ||
              (n("ms-duplex应用于checkbox上要对应一个数组"), (o = [o])),
              avalon.Array[i](o, a.pipe(e.value, a, "get")),
              r.call(e, o);
          }
        }),
          (a.handler = function() {
            var n = [].concat(t());
            e.checked = n.indexOf(a.pipe(e.value, a, "get")) > -1;
          }),
          s("change", f);
      else {
        var d = e.getAttribute("data-duplex-event") || "input";
        e.attributes["data-event"] &&
          n("data-event指令已经废弃，请改用data-duplex-event"),
          d.replace(bt, function(e) {
            switch (e) {
              case "input":
                s("input", f),
                  s("DOMAutoComplete", f),
                  Dt || (s("compositionstart", i), s("compositionend", o));
                break;
              default:
                s(e, f);
            }
          }),
          s("focus", function() {
            e.msFocus = !0;
          }),
          s("blur", function() {
            e.msFocus = !1;
          }),
          ua.test(l) &&
            ca(function() {
              if (Nt.contains(e)) e.msFocus || e.oldValue === e.value || f();
              else if (!e.msRetain) return !1;
            }),
          (e.avalonSetter = f);
      }
      (e.oldValue = e.value), $(a), r.call(e, e.value);
    }),
    (oa.TEXTAREA = oa.INPUT),
    (oa.SELECT = function(e, t, a) {
      function r() {
        if (i.data("duplexObserve") !== !1) {
          var n = i.val();
          (n = Array.isArray(n)
            ? n.map(function(e) {
                return a.pipe(e, a, "get");
              })
            : a.pipe(n, a, "get")),
            n + "" !== e.oldValue && t(n),
            a.changed.call(e, n, a);
        }
      }
      var i = avalon(e);
      (a.handler = function() {
        var a = t();
        (a = (a && a.$model) || a),
          Array.isArray(a)
            ? e.multiple ||
              n("ms-duplex在<select multiple=true>上要求对应一个数组")
            : e.multiple &&
              n("ms-duplex在<select multiple=false>不能对应一个数组"),
          (a = Array.isArray(a) ? a.map(String) : a + ""),
          a + "" !== e.oldValue && (i.val(a), (e.oldValue = a + ""));
      }),
        a.bound("change", r),
        (e.msCallback = function() {
          $(a), a.changed.call(e, t(), a);
        });
    }),
    (It.html = function(e, t, n) {
      e = null == e ? "" : e;
      var a = "group" in n,
        r = a ? t.parentNode : t;
      if (r) {
        if ("string" == typeof e) var i = avalon.parseHTML(e);
        else if (11 === e.nodeType) i = e;
        else if (1 === e.nodeType || e.item) {
          var o = 1 === e.nodeType ? e.childNodes : e.item;
          for (i = Lt.cloneNode(!0); o[0]; ) i.appendChild(o[0]);
        }
        if (
          (i.firstChild || i.appendChild(ft.createComment("ms-html")),
          (o = avalon.slice(i.childNodes)),
          a)
        ) {
          var l = n.group,
            s = 1;
          for (n.group = o.length, n.element = o[0]; l > s; ) {
            var c = t.nextSibling;
            c && (r.removeChild(c), s++);
          }
          r.replaceChild(i, t);
        } else avalon.clearHTML(r).appendChild(i);
        H(o, n.vmodels);
      }
    }),
    (Rt["if"] = Rt.data = Rt.text = Rt.html = function(e, t) {
      G(e.value, t, e);
    }),
    (It["if"] = function(e, t, n) {
      if (e)
        8 === t.nodeType &&
          (t.parentNode.replaceChild(n.template, t),
          (t = n.element = n.template)),
          t.getAttribute(n.name) &&
            (t.removeAttribute(n.name), L(t, n.vmodels)),
          (n.rollback = null);
      else if (1 === t.nodeType) {
        var a = (n.element = ft.createComment("ms-if"));
        t.parentNode.replaceChild(a, t),
          (n.template = t),
          pt.appendChild(t),
          (n.rollback = function() {
            t.parentNode === pt && pt.removeChild(t);
          });
      }
    });
  var fa = /\(([^)]*)\)/;
  (Rt.on = function(e, t) {
    var n = e.value;
    e.type = "on";
    var a = e.param.replace(/-\d+$/, "");
    if (
      ("function" == typeof Rt.on[a + "Hook"] && Rt.on[a + "Hook"](e),
      n.indexOf("(") > 0 && n.indexOf(")") > -1)
    ) {
      var r = (n.match(fa) || ["", ""])[1].trim();
      ("" === r || "$event" === r) && (n = n.replace(fa, ""));
    }
    G(n, t, e);
  }),
    (It.on = function(e, t, n) {
      e = function(e) {
        var t = n.evaluator || i;
        return t.apply(this, n.args.concat(e));
      };
      var a = n.param.replace(/-\d+$/, "");
      if ("scan" === a) e.call(t, { type: a });
      else if ("function" == typeof n.specialBind) n.specialBind(t, e);
      else var r = avalon.bind(t, a, e);
      n.rollback = function() {
        "function" == typeof n.specialUnbind
          ? n.specialUnbind()
          : avalon.unbind(t, a, r);
      };
    }),
    (Rt.repeat = function(e, t) {
      var n = e.type;
      G(e.value, t, e, 0, 1), (e.proxies = []);
      var a = !1;
      try {
        var r = (e.$repeat = e.evaluator.apply(0, e.args || [])),
          i = avalon.type(r);
        "object" !== i &&
          "array" !== i &&
          ((a = !0), avalon.log("warning:" + e.value + "只能是对象或数组"));
      } catch (o) {
        a = !0;
      }
      var l = e.value.split(".") || [];
      if (l.length > 1) {
        l.pop();
        for (var s, c = l[0], u = 0; (s = t[u++]); )
          if (s && s.hasOwnProperty(c)) {
            var f = s[c].$events || {};
            (f[ht] = f[ht] || []), f[ht].push(e);
            break;
          }
      }
      var d = e.element;
      d.removeAttribute(e.name),
        (e.sortedCallback = gn(d, "data-with-sorted", t)),
        (e.renderedCallback = gn(d, "data-" + n + "-rendered", t));
      var v = jt(n),
        p = (e.element = ft.createComment(v + ":end"));
      if (
        ((e.clone = ft.createComment(v)),
        Lt.appendChild(p),
        "each" === n || "with" === n
          ? ((e.template = d.innerHTML.trim()),
            avalon.clearHTML(d).appendChild(p))
          : ((e.template = d.outerHTML.trim()),
            d.parentNode.replaceChild(p, d)),
        (e.template = avalon.parseHTML(e.template)),
        (e.rollback = function() {
          var t = e.element;
          if (t) {
            It.repeat.call(e, "clear");
            var n = t.parentNode,
              a = e.template,
              r = a.firstChild;
            n.replaceChild(a, t);
            var i = e.$stamp;
            i && i.parentNode && i.parentNode.removeChild(i),
              (r = e.element = "repeat" === e.type ? r : n);
          }
        }),
        !a)
      ) {
        (e.handler = It.repeat), (e.$outer = {});
        var h = "$key",
          m = "$val";
        for (
          Array.isArray(r) && ((h = "$first"), (m = "$last")), u = 0;
          (s = t[u++]);

        )
          if (s.hasOwnProperty(h) && s.hasOwnProperty(m)) {
            e.$outer = s;
            break;
          }
        var g = r.$events,
          y = (g || {})[ht];
        if ((y && avalon.Array.ensure(y, e) && w(e, y), "object" === i)) {
          e.$with = !0;
          var b = g ? g.$withProxyPool || (g.$withProxyPool = {}) : {};
          e.handler("append", r, b);
        } else r.length && e.handler("add", 0, r.length);
      }
    }),
    (It.repeat = function(e, t, n) {
      if (e) {
        var a = this,
          r = a.element,
          o = r.parentNode,
          l = a.proxies,
          s = Lt.cloneNode(!1);
        switch (e) {
          case "add":
            for (
              var c,
                u = t + n,
                f = a.$repeat,
                d = f.length - 1,
                v = [],
                p = tt(a, t),
                h = t;
              u > h;
              h++
            ) {
              var m = rt(h, a);
              l.splice(h, 0, m), et(a, s, m, v);
            }
            for (o.insertBefore(s, p), h = 0; (c = v[h++]); )
              H(c.nodes, c.vmodels), (c.nodes = c.vmodels = null);
            break;
          case "del":
            (p = l[t].$stamp), (r = tt(a, t + n)), nt(p, r);
            var g = l.splice(t, n);
            lt(g, "each");
            break;
          case "clear":
            var y = a.$stamp || l[0];
            y && ((p = y.$stamp || y), nt(p, r)), lt(l, "each");
            break;
          case "move":
            p = l[0].$stamp;
            var $,
              x = p.nodeValue,
              w = [],
              C = [];
            for (
              nt(p, r, function() {
                C.unshift(this),
                  this.nodeValue === x && (w.unshift(C), (C = []));
              }),
                b(l, t),
                b(w, t);
              (C = w.shift());

            )
              for (; ($ = C.shift()); ) s.appendChild($);
            o.insertBefore(s, r);
            break;
          case "index":
            for (d = l.length - 1; (n = l[t]); t++)
              (n.$index = t), (n.$first = 0 === t), (n.$last = t === d);
            return;
          case "set":
            return (m = l[t]), void (m && k(m.$events[a.param || "el"]));
          case "append":
            var E = n,
              T = [];
            v = [];
            for (var M in t)
              t.hasOwnProperty(M) && "hasOwnProperty" !== M && T.push(M);
            if (a.sortedCallback) {
              var O = a.sortedCallback.call(o, T);
              O && Array.isArray(O) && O.length && (T = O);
            }
            for (h = 0; (M = T[h++]); )
              "hasOwnProperty" !== M &&
                (E[M] || (E[M] = ot(M, a)), et(a, s, E[M], v));
            var N = (a.$stamp = a.clone);
            for (
              o.insertBefore(N, r), o.insertBefore(s, r), h = 0;
              (c = v[h++]);

            )
              H(c.nodes, c.vmodels), (c.nodes = c.vmodels = null);
        }
        "clear" === e && (e = "del");
        var L = a.renderedCallback || i,
          S = arguments;
        A(
          o,
          function() {
            L.apply(o, S),
              o.oldValue &&
                "SELECT" === o.tagName &&
                avalon(o).val(o.oldValue.split(","));
          },
          0 / 0
        );
      }
    }),
    "with,each".replace(bt, function(e) {
      Rt[e] = Rt.repeat;
    });
  var da = [],
    va = [];
  (It.text = function(e, t) {
    if (((e = null == e ? "" : e), 3 === t.nodeType))
      try {
        t.data = e;
      } catch (n) {}
    else t.textContent = e;
  }),
    (avalon.parseDisplay = st),
    (Rt.visible = function(e, t) {
      var n = avalon(e.element),
        a = n.css("display");
      if ("none" === a) {
        var r = n[0].style,
          i = /visibility/i.test(r.cssText),
          o = n.css("visibility");
        (r.display = ""),
          (r.visibility = "hidden"),
          (a = n.css("display")),
          "none" === a && (a = st(n[0].nodeName)),
          (r.visibility = i ? o : "");
      }
      (e.display = a), G(e.value, t, e);
    }),
    (It.visible = function(e, t, n) {
      t.style.display = e ? n.display : "none";
    }),
    (Rt.widget = function(t, a) {
      var r = t.value.match(bt),
        o = t.element,
        l = r[0],
        s = r[1];
      (s && "$" !== s) || (s = jt(l));
      var c = r[2] || l,
        u = avalon.ui[l];
      if ("function" == typeof u) {
        a = o.vmodels || a;
        for (var f, d = 0; (f = a[d++]); )
          if (f.hasOwnProperty(c) && "object" == typeof f[c]) {
            var v = f[c];
            v = v.$model || v;
            break;
          }
        if (v) {
          var p = v[l + "Id"];
          "string" == typeof p && (n("warning!不再支持" + l + "Id"), (s = p));
        }
        var h = avalon.getWidgetData(o, l);
        (t.value = [l, s, c].join(",")),
          (t[l + "Id"] = s),
          (t.evaluator = i),
          (o.msData["ms-widget-id"] = s);
        var m = (t[l + "Options"] = avalon.mix({}, u.defaults, v || {}, h));
        o.removeAttribute("ms-widget");
        var g = u(o, t, a) || {};
        if (g.$id) {
          (avalon.vmodels[s] = g), M(o, g);
          try {
            g.$init(function() {
              avalon.scan(o, [g].concat(a)),
                "function" == typeof m.onInit && m.onInit.call(o, g, m, a);
            });
          } catch (y) {}
          (t.rollback = function() {
            try {
              (g.widgetElement = null), g.$remove();
            } catch (e) {}
            (o.msData = {}), delete avalon.vmodels[g.$id];
          }),
            w(t, pa),
            e.chrome &&
              o.addEventListener("DOMNodeRemovedFromDocument", function() {
                setTimeout(T);
              });
        } else avalon.scan(o, a);
      } else a.length && (o.vmodels = a);
    });
  var pa = [],
    ha = /<script[^>]*>([\S\s]*?)<\/script\s*>/gim,
    ma = /\s+(on[^=\s]+)(?:=("[^"]*"|'[^']*'|[^\s>]+))?/g,
    ga = /<\w+\b(?:(["'])[^"]*?(\1)|[^>])*>/gi,
    ya = {
      a: /\b(href)\=("javascript[^"]*"|'javascript[^']*')/gi,
      img: /\b(src)\=("javascript[^"]*"|'javascript[^']*')/gi,
      form: /\b(action)\=("javascript[^"]*"|'javascript[^']*')/gi
    },
    ba = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
    $a = /([^\#-~| |!])/g,
    xa = (avalon.filters = {
      uppercase: function(e) {
        return e.toUpperCase();
      },
      lowercase: function(e) {
        return e.toLowerCase();
      },
      truncate: function(e, t, n) {
        return (
          (t = t || 30),
          (n = void 0 === n ? "..." : n),
          e.length > t ? e.slice(0, t - n.length) + n : String(e)
        );
      },
      $filter: function(e) {
        for (var t = 1, n = arguments.length; n > t; t++) {
          var a = arguments[t],
            r = avalon.filters[a.shift()];
          if ("function" == typeof r) {
            var i = [e].concat(a);
            e = r.apply(null, i);
          }
        }
        return e;
      },
      camelize: F,
      sanitize: function(e) {
        return e.replace(ha, "").replace(ga, function(e) {
          var t = e.toLowerCase().match(/<(\w+)\s/);
          if (t) {
            var n = ya[t[1]];
            n &&
              (e = e.replace(n, function(e, t, n) {
                var a = n.charAt(0);
                return t + "=" + a + "javascript:void(0)" + a;
              }));
          }
          return e.replace(ma, " ").replace(/\s+/g, " ");
        });
      },
      escape: function(e) {
        return String(e)
          .replace(/&/g, "&amp;")
          .replace(ba, function(e) {
            var t = e.charCodeAt(0),
              n = e.charCodeAt(1);
            return "&#" + (1024 * (t - 55296) + (n - 56320) + 65536) + ";";
          })
          .replace($a, function(e) {
            return "&#" + e.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      },
      currency: function(e, t, n) {
        return (t || "￥") + ct(e, isFinite(n) ? n : 2);
      },
      number: ct
    });
  !new function() {
    function e(e) {
      return parseInt(e, 10) || 0;
    }
    function t(e, t, n) {
      var a = "";
      for (0 > e && ((a = "-"), (e = -e)), e = "" + e; e.length < t; )
        e = "0" + e;
      return n && (e = e.substr(e.length - t)), a + e;
    }
    function n(e, n, a, r) {
      return function(i) {
        var o = i["get" + e]();
        return (
          (a > 0 || o > -a) && (o += a),
          0 === o && -12 === a && (o = 12),
          t(o, n, r)
        );
      };
    }
    function a(e, t) {
      return function(n, a) {
        var r = n["get" + e](),
          i = (t ? "SHORT" + e : e).toUpperCase();
        return a[i][r];
      };
    }
    function r(e) {
      var n = -1 * e.getTimezoneOffset(),
        a = n >= 0 ? "+" : "";
      return (a +=
        t(Math[n > 0 ? "floor" : "ceil"](n / 60), 2) + t(Math.abs(n % 60), 2));
    }
    function i(e, t) {
      return e.getHours() < 12 ? t.AMPMS[0] : t.AMPMS[1];
    }
    var o = {
        yyyy: n("FullYear", 4),
        yy: n("FullYear", 2, 0, !0),
        y: n("FullYear", 1),
        MMMM: a("Month"),
        MMM: a("Month", !0),
        MM: n("Month", 2, 1),
        M: n("Month", 1, 1),
        dd: n("Date", 2),
        d: n("Date", 1),
        HH: n("Hours", 2),
        H: n("Hours", 1),
        hh: n("Hours", 2, -12),
        h: n("Hours", 1, -12),
        mm: n("Minutes", 2),
        m: n("Minutes", 1),
        ss: n("Seconds", 2),
        s: n("Seconds", 1),
        sss: n("Milliseconds", 3),
        EEEE: a("Day"),
        EEE: a("Day", !0),
        a: i,
        Z: r
      },
      l = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,
      s = /^\/Date\((\d+)\)\/$/;
    xa.date = function(t, n) {
      var a,
        r,
        i = xa.date.locate,
        c = "",
        u = [];
      if (((n = n || "mediumDate"), (n = i[n] || n), "string" == typeof t))
        if (/^\d+$/.test(t)) t = e(t);
        else if (s.test(t)) t = +RegExp.$1;
        else {
          var f = t.trim(),
            d = [0, 0, 0, 0, 0, 0, 0],
            v = new Date(0);
          f = f.replace(/^(\d+)\D(\d+)\D(\d+)/, function(t, n, a, r) {
            var i = 4 === r.length ? [r, n, a] : [n, a, r];
            return (d[0] = e(i[0])), (d[1] = e(i[1]) - 1), (d[2] = e(i[2])), "";
          });
          var p = v.setFullYear,
            h = v.setHours;
          f = f.replace(/[T\s](\d+):(\d+):?(\d+)?\.?(\d)?/, function(
            t,
            n,
            a,
            r,
            i
          ) {
            return (
              (d[3] = e(n)),
              (d[4] = e(a)),
              (d[5] = e(r)),
              i && (d[6] = Math.round(1e3 * parseFloat("0." + i))),
              ""
            );
          });
          var m = 0,
            g = 0;
          (f = f.replace(/Z|([+-])(\d\d):?(\d\d)/, function(t, n, a, r) {
            return (
              (p = v.setUTCFullYear),
              (h = v.setUTCHours),
              n && ((m = e(n + a)), (g = e(n + r))),
              ""
            );
          })),
            (d[3] -= m),
            (d[4] -= g),
            p.apply(v, d.slice(0, 3)),
            h.apply(v, d.slice(3)),
            (t = v);
        }
      if (
        ("number" == typeof t && (t = new Date(t)), "date" === avalon.type(t))
      ) {
        for (; n; )
          (r = l.exec(n)),
            r
              ? ((u = u.concat(r.slice(1))), (n = u.pop()))
              : (u.push(n), (n = null));
        return (
          u.forEach(function(e) {
            (a = o[e]),
              (c += a
                ? a(t, i)
                : e.replace(/(^'|'$)/g, "").replace(/''/g, "'"));
          }),
          c
        );
      }
    };
    var c = {
      AMPMS: { 0: "上午", 1: "下午" },
      DAY: {
        0: "星期日",
        1: "星期一",
        2: "星期二",
        3: "星期三",
        4: "星期四",
        5: "星期五",
        6: "星期六"
      },
      MONTH: {
        0: "1月",
        1: "2月",
        2: "3月",
        3: "4月",
        4: "5月",
        5: "6月",
        6: "7月",
        7: "8月",
        8: "9月",
        9: "10月",
        10: "11月",
        11: "12月"
      },
      SHORTDAY: {
        0: "周日",
        1: "周一",
        2: "周二",
        3: "周三",
        4: "周四",
        5: "周五",
        6: "周六"
      },
      fullDate: "y年M月d日EEEE",
      longDate: "y年M月d日",
      medium: "yyyy-M-d H:mm:ss",
      mediumDate: "yyyy-M-d",
      mediumTime: "H:mm:ss",
      short: "yy-M-d ah:mm",
      shortDate: "yy-M-d",
      shortTime: "ah:mm"
    };
    (c.SHORTMONTH = c.MONTH), (xa.date.locate = c);
  }();
  var wa = (avalon.modules = {
    "domReady!": { exports: avalon, state: 3 },
    avalon: { exports: avalon, state: 4 }
  });
  (wa.exports = wa.avalon),
    new function() {
      function t(e, t) {
        var a = "js";
        (e = e.replace(/^(\w+)\!/, function(e, t) {
          return (a = t), "";
        })),
          "ready" === a &&
            (n("debug: ready!已经被废弃，请使用domReady!"), (a = "domReady"));
        var r = "";
        e = e.replace(D, function(e) {
          return (r = e), "";
        });
        var i = "." + a,
          o = /js|css/.test(i) ? i : "";
        e = e.replace(/\.[a-z0-9]+$/g, function(e) {
          return e === i ? ((o = e), "") : e;
        });
        var l = avalon.mix({ query: r, ext: o, res: a, name: e, toUrl: m }, t);
        return l.toUrl(e), l;
      }
      function o(e) {
        var t = e.name,
          n = e.res,
          a = wa[t],
          r = t && e.urlNoQuery;
        if (a && a.state >= 1) return t;
        if (((a = wa[r]), a && a.state >= 3))
          return vt(a.deps || [], a.factory, r), r;
        if (t && !a) {
          a = wa[r] = { id: r, state: 1 };
          var i = function(r) {
            (j[n] = r),
              r.load(t, e, function(e) {
                arguments.length && void 0 !== e && (a.exports = e),
                  (a.state = 4),
                  c();
              });
          };
          j[n] ? i(j[n]) : vt([n], i);
        }
        return t ? r : n + "!";
      }
      function l(e, t) {
        for (var n, a = 0; (n = e[a++]); )
          if (4 !== wa[n].state && (n === t || l(wa[n].deps, t))) return !0;
      }
      function s(e, t) {
        var a = d(e.src);
        return (
          (e.onload = e.onerror = null),
          t
            ? (setTimeout(function() {
                dt.removeChild(e), (e = null);
              }),
              void n("debug: 加载 " + a + " 失败" + t + " " + !wa[a].state))
            : !0
        );
      }
      function c() {
        e: for (var e, t = T.length; (e = T[--t]); ) {
          var n = wa[e],
            a = n.deps;
          if (a) {
            for (var r, i = 0; (r = a[i]); i++)
              if (4 !== Object(wa[r]).state) continue e;
            4 !== n.state && (T.splice(t, 1), h(n.id, n.deps, n.factory), c());
          }
        }
      }
      function f(e, t, a) {
        var r = ft.createElement("script");
        (r.className = ht),
          (r.onload = function() {
            var r = k.pop();
            r && r.require(t),
              a && a(),
              n("debug: 已成功加载 " + e),
              t && T.push(t),
              c();
          }),
          (r.onerror = function() {
            s(r, !0);
          }),
          dt.insertBefore(r, dt.firstChild),
          (r.src = e),
          n("debug: 正准备加载 " + e);
      }
      function d(e) {
        return (e || "").replace(D, "");
      }
      function v(e) {
        return /^(?:[a-z]+:)?\/\//i.test(String(e));
      }
      function p() {
        var e;
        try {
          a.b.c();
        } catch (t) {
          e = t.stack;
        }
        if (e)
          return (
            (e = e.split(/[@ ]/g).pop()),
            (e = "(" === e[0] ? e.slice(1, -1) : e.replace(/\s/, "")),
            d(e.replace(/(:\d+)?:\d+$/i, ""))
          );
        for (
          var n, r = dt.getElementsByTagName("script"), i = r.length;
          (n = r[--i]);

        )
          if (n.className === ht && "interactive" === n.readyState) {
            var o = n.src;
            return (n.className = d(o));
          }
      }
      function h(t, a, i) {
        var o = Object(wa[t]);
        o.state = 4;
        for (var l, s = 0, c = []; (l = a[s++]); )
          if ("exports" === l) {
            var u = o.exports || (o.exports = r());
            c.push(u);
          } else c.push(wa[l].exports);
        try {
          var f = i.apply(e, c);
        } catch (d) {
          n("执行[" + t + "]模块的factory抛错： " + d);
        }
        return (
          void 0 !== f && (o.exports = f),
          P.test(t) && delete wa[t],
          delete o.factory,
          f
        );
      }
      function m(e) {
        0 === e.indexOf(this.res + "!") && (e = e.slice(this.res.length + 1));
        var t = e,
          n = 0,
          a = this.baseUrl,
          r = this.parentUrl || a;
        x(e, u.paths, function(e, a) {
          (t = t.replace(a, e)), (n = 1);
        }),
          n ||
            x(e, u.packages, function(e, n, a) {
              t = t.replace(a.name, a.location);
            }),
          this.mapUrl &&
            x(this.mapUrl, u.map, function(e) {
              x(t, e, function(e, n) {
                (t = t.replace(n, e)), (r = a);
              });
            });
        var i = this.ext;
        i && n && t.slice(-i.length) === i && (t = t.slice(0, -i.length)),
          v(t) || ((r = this.built || /^\w/.test(t) ? a : r), (t = C(r, t)));
        var o = t + i;
        return (
          (t = o + this.query),
          x(e, u.urlArgs, function(e) {
            t += (-1 === t.indexOf("?") ? "?" : "&") + e;
          }),
          (this.url = t),
          (this.urlNoQuery = o)
        );
      }
      function g(e, t, n) {
        var a = $(e, t, n);
        return a.sort(w), a;
      }
      function y(e) {
        return new RegExp("^" + e + "(/|$)");
      }
      function b(t) {
        return function() {
          var n;
          return (
            t.init && (n = t.init.apply(e, arguments)),
            n || (t.exports && E(t.exports))
          );
        };
      }
      function $(e, t, n) {
        var a = [];
        for (var r in e) {
          var i = { name: r, val: e[r] };
          a.push(i),
            (i.reg = "*" === r && t ? /^/ : y(r)),
            n &&
              "*" !== r &&
              (i.reg = new RegExp("/" + r.replace(/^\//, "") + "(/|$)"));
        }
        return a;
      }
      function x(e, t, n) {
        t = t || [];
        for (var a, r = 0; (a = t[r++]); )
          if (a.reg.test(e)) return n(a.val, a.name, a), !1;
      }
      function w(e, t) {
        var n = e.name,
          a = t.name;
        return "*" === a ? -1 : "*" === n ? 1 : a.length - n.length;
      }
      function C(e, t) {
        if (
          ("/" !== e.charAt(e.length - 1) && (e += "/"), "./" === t.slice(0, 2))
        )
          return e + t.slice(2);
        if (".." === t.slice(0, 2)) {
          for (e += t; R.test(e); ) e = e.replace(R, "");
          return e;
        }
        return "/" === t.slice(0, 1) ? e + t.slice(1) : e + t;
      }
      function E(t) {
        if (!t) return t;
        var n = e;
        return (
          t.split(".").forEach(function(e) {
            n = n[e];
          }),
          n
        );
      }
      var T = [],
        k = [],
        A = /\.js$/i,
        M = [],
        O = !1;
      (vt = avalon.require = function(e, n, a, l) {
        if (O) {
          Array.isArray(e) ||
            avalon.error("require方法的第一个参数应为数组 " + e);
          var s = [],
            f = r(),
            d = a || "callback" + setTimeout("1");
          (l = l || r()), (l.baseUrl = u.baseUrl);
          var v = !!l.built;
          if (
            (a &&
              ((l.parentUrl = a.substr(0, a.lastIndexOf("/"))),
              (l.mapUrl = a.replace(A, ""))),
            v)
          ) {
            var p = t(l.defineName, l);
            d = p.urlNoQuery;
          } else
            e.forEach(function(e) {
              var n = t(e, l),
                a = o(n);
              a && (f[a] || (s.push(a), (f[a] = "司徒正美")));
            });
          var h = wa[d];
          (h && 4 === h.state) ||
            (wa[d] = {
              id: d,
              deps: v ? e.concat() : s,
              factory: n || i,
              state: 3
            }),
            h || T.push(d),
            c();
        } else if ((M.push(avalon.slice(arguments)), arguments.length <= 2)) {
          O = !0;
          for (var m, g = M.splice(0, M.length); (m = g.shift()); )
            vt.apply(null, m);
        }
      }),
        (vt.define = function(e, t, n) {
          "string" != typeof e && ((n = t), (t = e), (e = "anonymous")),
            Array.isArray(t) || ((n = t), (t = []));
          var a = { built: !O, defineName: e },
            r = [t, n, a];
          n.require = function(e) {
            if ((r.splice(2, 0, e), wa[e])) {
              wa[e].state = 3;
              var t = !1;
              try {
                t = l(wa[e].deps, e);
              } catch (a) {}
              t &&
                avalon.error(
                  e +
                    "模块与之前的模块存在循环依赖，请不要直接用script标签引入" +
                    e +
                    "模块"
                );
            }
            delete n.require, vt.apply(null, r);
          };
          var i = a.built ? "unknown" : p();
          if (i) {
            var o = wa[i];
            o && (o.state = 2), n.require(i);
          } else k.push(n);
        }),
        (vt.config = u),
        (vt.define.amd = wa);
      var N = (u["orig.paths"] = r()),
        L = (u["orig.map"] = r()),
        S = (u.packages = []),
        H = (u["orig.args"] = r());
      avalon.mix(Gt, {
        paths: function(e) {
          avalon.mix(N, e), (u.paths = g(N));
        },
        map: function(e) {
          avalon.mix(L, e);
          var t = g(L, 1, 1);
          avalon.each(t, function(e, t) {
            t.val = g(t.val);
          }),
            (u.map = t);
        },
        packages: function(e) {
          e = e.concat(S);
          for (var t, n = r(), a = [], i = 0; (t = e[i++]); ) {
            t = "string" == typeof t ? { name: t } : t;
            var o = t.name;
            if (!n[o]) {
              var l = C(t.location || o, t.main || "main");
              (l = l.replace(A, "")),
                a.push(t),
                (n[o] = t.location = l),
                (t.reg = y(o));
            }
          }
          u.packages = a.sort();
        },
        urlArgs: function(e) {
          "string" == typeof e && (e = { "*": e }),
            avalon.mix(H, e),
            (u.urlArgs = g(H, 1));
        },
        baseUrl: function(e) {
          if (!v(e)) {
            var t = dt.getElementsByTagName("base")[0];
            t && dt.removeChild(t);
            var n = ft.createElement("a");
            (n.href = e), (e = n.href), t && dt.insertBefore(t, dt.firstChild);
          }
          e.length > 3 && (u.baseUrl = e);
        },
        shim: function(e) {
          for (var t in e) {
            var n = e[t];
            Array.isArray(n) && (n = e[t] = { deps: n }),
              n.exportsFn || (!n.exports && !n.init) || (n.exportsFn = b(n));
          }
          u.shim = e;
        }
      });
      var j = (vt.plugins = {
        ready: { load: i },
        js: {
          load: function(e, t, n) {
            var a = t.url,
              r = t.urlNoQuery,
              i = u.shim[e.replace(A, "")];
            i
              ? vt(i.deps || [], function() {
                  var e = avalon.slice(arguments);
                  f(a, r, function() {
                    n(i.exportsFn ? i.exportsFn.apply(0, e) : void 0);
                  });
                })
              : f(a, r);
          }
        },
        css: {
          load: function(e, t, a) {
            var r = t.url;
            dt.insertAdjacentHTML(
              "afterBegin",
              '<link rel="stylesheet" href="' + r + '">'
            ),
              n("debug: 已成功加载 " + r),
              a();
          }
        },
        text: {
          load: function(e, t, a) {
            var r = t.url,
              i = ra();
            (i.onload = function() {
              var e = i.status;
              e > 399 && 600 > e
                ? avalon.error(r + " 对应资源不存在或没有开启 CORS")
                : (n("debug: 已成功加载 " + r), a(i.responseText));
            }),
              i.open("GET", r, !0),
              "withCredentials" in i && (i.withCredentials = !0),
              i.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
              i.send(),
              n("debug: 正准备加载 " + r);
          }
        }
      });
      vt.checkDeps = c;
      var D = /(\?[^#]*)$/,
        P = /^callback\d+$/,
        R = /\/\w+\/\.\./,
        I = ft.scripts[ft.scripts.length - 1],
        _ = I.getAttribute("data-main");
      if (_) {
        Gt.baseUrl(_);
        var F = u.baseUrl;
        (u.baseUrl = F.slice(0, F.lastIndexOf("/") + 1)),
          f(F.replace(A, "") + ".js");
      } else {
        var B = d(I.src);
        u.baseUrl = B.slice(0, B.lastIndexOf("/") + 1);
      }
    }();
  var Ca,
    Ea = [],
    Ta = function(e) {
      for (
        Ca = !0, vt && ((wa["domReady!"].state = 4), vt.checkDeps());
        (e = Ea.shift());

      )
        e(avalon);
    };
  "complete" === ft.readyState
    ? setTimeout(Ta)
    : ft.addEventListener("DOMContentLoaded", Ta),
    e.addEventListener("load", Ta),
    (avalon.ready = function(e) {
      Ca ? e(avalon) : Ea.push(e);
    }),
    avalon.config({ loader: !0 }),
    avalon.ready(function() {
      avalon.scan(ft.body);
    }),
    new function() {
      function t(e) {
        return (
          ("touch" === e.pointerType ||
            e.pointerType === e.MSPOINTER_TYPE_TOUCH) &&
          e.isPrimary
        );
      }
      function n(e, t) {
        return (
          e.type === "pointer" + t || e.type.toLowerCase() === "mspointer" + t
        );
      }
      function a(e, t, n, a) {
        return Math.abs(e - t) >= Math.abs(n - a)
          ? e - t > 0
            ? "left"
            : "right"
          : n - a > 0
            ? "up"
            : "down";
      }
      function r(e) {
        var t = e.touches && e.touches.length ? e.touches : [e],
          n = e.changedTouches ? e.changedTouches[0] : t[0];
        return { x: n.clientX, y: n.clientY };
      }
      function i(e, t, n) {
        var a = document.createEvent("Events");
        a.initEvent(t, !0, !0),
          (a.fireByAvalon = !0),
          n && (a.detail = n),
          e.dispatchEvent(a);
      }
      function o(e) {
        return e.fireByAvalon
          ? !0
          : void (
              h.element &&
              "select" !== e.target.tagName.toLowerCase() &&
              (e.stopImmediatePropagation
                ? e.stopImmediatePropagation()
                : (e.propagationStopped = !0),
              e.stopPropagation(),
              e.preventDefault(),
              "click" === e.type && (h.element = null))
            );
      }
      function l() {
        x && clearTimeout(x), (x = null);
      }
      function s(e) {
        var a = n(e, "down"),
          o = a ? e : (e.touches && e.touches[0]) || e,
          l = "tagName" in o.target ? o.target : o.target.parentNode,
          s = Date.now(),
          c = s - (h.last || s);
        return !a || t(e)
          ? (avalon.mix(h, r(e)),
            (h.mx = 0),
            (h.my = 0),
            c > 0 && 250 >= c && (h.isDoubleTap = !0),
            (h.last = s),
            (h.element = l),
            avalon(l).addClass(w.activeClass),
            (x = setTimeout(function() {
              (x = null),
                i(l, "hold"),
                i(l, "longtap"),
                (h = {}),
                avalon(l).removeClass(w.activeClass);
            }, w.clickDuration)),
            !0)
          : void 0;
      }
      function c(e) {
        var a = n(e, "down"),
          i = r(e);
        d && Math.abs(h.x - i.x) > 10 && e.preventDefault(),
          (!a || t(e)) &&
            (l(), (h.mx += Math.abs(h.x - i.x)), (h.my += Math.abs(h.y - i.y)));
      }
      function u(e) {
        var o = n(e, "down");
        if (((element = h.element), (!o || t(e)) && element)) {
          l();
          var s = r(e),
            c = Math.abs(h.x - s.x),
            u = Math.abs(h.y - s.y);
          if (c > 30 || u > 30) {
            var f = a(h.x, s.x, h.y, s.y),
              d = { direction: f };
            i(element, "swipe", d),
              i(element, "swipe" + f, d),
              avalon(element).removeClass(w.activeClass),
              (h = {}),
              (h.element = element);
          } else if (
            w.canClick(element) &&
            h.mx < w.dragDistance &&
            h.my < w.dragDistance
          ) {
            document.activeElement &&
              document.activeElement !== element &&
              document.activeElement.blur();
            var v;
            "label" === element.tagName.toLowerCase() &&
              (v = element.htmlFor
                ? document.getElementById(element.htmlFor)
                : null),
              w.focus(v ? v : element),
              "select" !== e.target.tagName.toLowerCase() && e.preventDefault(),
              i(element, "tap"),
              avalon.fastclick.fireEvent(element, "click", e),
              avalon(element).removeClass(w.activeClass),
              h.isDoubleTap
                ? (i(element, "doubletap"),
                  avalon.fastclick.fireEvent(element, "dblclick", e),
                  (h = {}),
                  avalon(element).removeClass(w.activeClass),
                  (h.element = element))
                : ($ = setTimeout(function() {
                    clearTimeout($),
                      ($ = null),
                      (h = {}),
                      avalon(element).removeClass(w.activeClass),
                      (h.element = element);
                  }, 250));
          }
        }
      }
      var f = navigator.userAgent,
        d = f.indexOf("Android") > 0,
        v = /iP(ad|hone|od)/.test(f),
        p = Rt.on,
        h = {},
        m = navigator.pointerEnabled,
        g = navigator.msPointerEnabled,
        y = (function() {
          var e = v || !1;
          try {
            var t = document.createElement("div");
            t.ontouchstart = function() {
              e = !0;
            };
            var n = document.createEvent("TouchEvent");
            n.initUIEvent("touchstart", !0, !0), t.dispatchEvent(n);
          } catch (a) {}
          return (t = t.ontouchstart = null), e;
        })(),
        b = ["mousedown", "mousemove", "mouseup", ""];
      y
        ? (b = ["touchstart", "touchmove", "touchend", "touchcancel"])
        : m
          ? (b = ["pointerdown", "pointermove", "pointerup", "pointercancel"])
          : g &&
            (b = [
              "MSPointerDown",
              "MSPointerMove",
              "MSPointerUp",
              "MSPointerCancel"
            ]);
      var $, x;
      document.addEventListener("mousedown", o, !0),
        document.addEventListener("click", o, !0),
        document.addEventListener(b[0], s),
        document.addEventListener(b[1], c),
        document.addEventListener(b[2], u),
        b[3] &&
          document.addEventListener(b[3], function() {
            x && clearTimeout(x),
              $ && clearTimeout($),
              (x = $ = null),
              (h = {});
          });
      var w = (avalon.fastclick = {
        activeClass: "ms-click-active",
        clickDuration: 750,
        dragDistance: 30,
        fireEvent: function(t, n, a) {
          var r = document.createEvent("MouseEvents");
          r.initMouseEvent(
            n,
            !0,
            !0,
            e,
            1,
            a.screenX,
            a.screenY,
            a.clientX,
            a.clientY,
            !1,
            !1,
            !1,
            !1,
            0,
            null
          ),
            Object.defineProperty(r, "fireByAvalon", { value: !0 }),
            t.dispatchEvent(r);
        },
        focus: function(e) {
          if (this.canFocus(e)) {
            var t = e.value;
            if (
              ((e.value = t),
              v &&
                e.setSelectionRange &&
                0 !== e.type.indexOf("date") &&
                "time" !== e.type)
            ) {
              var n = t.length;
              e.setSelectionRange(n, n);
            } else e.focus();
          }
        },
        canClick: function(e) {
          switch (e.nodeName.toLowerCase()) {
            case "textarea":
            case "select":
            case "input":
              return !e.disabled;
            default:
              return !0;
          }
        },
        canFocus: function(e) {
          switch (e.nodeName.toLowerCase()) {
            case "textarea":
              return !0;
            case "select":
              return !d;
            case "input":
              switch (e.type) {
                case "button":
                case "checkbox":
                case "file":
                case "image":
                case "radio":
                case "submit":
                  return !1;
              }
              return !e.disabled && !e.readOnly;
            default:
              return !1;
          }
        }
      });
      [
        "swipe",
        "swipeleft",
        "swiperight",
        "swipeup",
        "swipedown",
        "doubletap",
        "tap",
        "dblclick",
        "longtap",
        "hold"
      ].forEach(function(e) {
        p[e + "Hook"] = p.clickHook;
      });
    }(),
    "function" == typeof define &&
      define.amd &&
      define("avalon", [], function() {
        return avalon;
      });
  var ka = e.avalon;
  return (
    (avalon.noConflict = function(t) {
      return t && e.avalon === avalon && (e.avalon = ka), avalon;
    }),
    void 0 === t && (e.avalon = avalon),
    avalon
  );
});
function createTimeDouble() {
  var e = [],
    t = {
      issue_code: 2018021,
      open_time: "2018/02/25 21:15:00",
      end_time: "2018/02/25 20:30:00",
      stop_time: "2018/02/25 19:20:00"
    };
  (t.open_time = Number(new Date(t.open_time)) + TIMEZONE),
    (t.end_time = Number(new Date(t.end_time)) + TIMEZONE),
    (t.stop_time = Number(new Date(t.stop_time)) + TIMEZONE),
    e.push(t);
  for (var o = 0, r = 2018021; 2018153 >= r; r++) {
    var n = (new Date(t.open_time).getDay(), {});
    0 === o || 2 === o
      ? ((n = {
          issue_code: t.issue_code + 1,
          open_time: t.open_time + 1728e5,
          stop_time: t.stop_time + 1728e5,
          end_time: t.end_time + 1728e5
        }),
        (o = (o + 2) % 7))
      : 4 === o &&
        ((n = {
          issue_code: t.issue_code + 1,
          open_time: t.open_time + 2592e5,
          stop_time: t.stop_time + 2592e5,
          end_time: t.end_time + 2592e5
        }),
        (o = (o + 3) % 7)),
      (t = avalon.mix(!0, {}, n)),
      e.push(n);
  }
  return e;
}
function createTimeLotto() {
  var e = [],
    t = {
      issue_code: 18022,
      open_time: "2018/02/26 20:30:00",
      end_time: "2018/02/26 20:30:00",
      stop_time: "2018/02/26 19:20:00"
    };
  (t.open_time = Number(new Date(t.open_time)) + TIMEZONE),
    (t.end_time = Number(new Date(t.end_time)) + TIMEZONE),
    (t.stop_time = Number(new Date(t.stop_time)) + TIMEZONE),
    e.push(t);
  for (var o = 1, r = 18022; 18153 >= r; r++) {
    var n = (new Date(t.open_time).getDay(), {});
    1 === o || 6 === o
      ? ((n = {
          issue_code: t.issue_code + 1,
          open_time: t.open_time + 1728e5,
          end_time: t.end_time + 1728e5,
          stop_time: t.stop_time + 1728e5
        }),
        (o = (o + 2) % 7))
      : 3 === o &&
        ((n = {
          issue_code: t.issue_code + 1,
          open_time: t.open_time + 2592e5,
          end_time: t.end_time + 2592e5,
          stop_time: t.stop_time + 2592e5
        }),
        (o = (o + 3) % 7)),
      (t = avalon.mix(!0, {}, n)),
      e.push(n);
  }
  return e;
}
function createTimeThree() {
  var e = [],
    t = {
      issue_code: 2018050,
      open_time: "2018/02/26 21:15:00",
      end_time: "2018/02/26 20:00:00",
      stop_time: "2018/02/26 19:50:00"
    };
  (t.open_time = Number(new Date(t.open_time)) + TIMEZONE),
    (t.end_time = Number(new Date(t.end_time)) + TIMEZONE),
    (t.stop_time = Number(new Date(t.stop_time)) + TIMEZONE),
    e.push(t);
  for (var o = 2018050; 2018358 >= o; o++) {
    var r = (new Date(t.open_time).getDay(), {});
    (r = {
      issue_code: t.issue_code + 1,
      open_time: t.open_time + 864e5,
      end_time: t.end_time + 864e5,
      stop_time: t.stop_time + 864e5
    }),
      (t = avalon.mix(!0, {}, r)),
      e.push(r);
  }
  return e;
}
function createTimeArrange3() {
  var e = [],
    t = {
      issue_code: 18050,
      open_time: "2018/02/26 20:30:00",
      end_time: "2018/02/26 20:30:00",
      stop_time: "2018/02/26 19:20:00"
    };
  (t.open_time = Number(new Date(t.open_time)) + TIMEZONE),
    (t.end_time = Number(new Date(t.end_time)) + TIMEZONE),
    (t.stop_time = Number(new Date(t.stop_time)) + TIMEZONE),
    e.push(t);
  for (var o = 18050; 18358 >= o; o++) {
    var r = (new Date(t.open_time).getDay(), {});
    (r = {
      issue_code: t.issue_code + 1,
      open_time: t.open_time + 864e5,
      end_time: t.end_time + 864e5,
      stop_time: t.stop_time + 864e5
    }),
      (t = avalon.mix(!0, {}, r)),
      e.push(r);
  }
  return e;
}
function createTimeArrange15() {
  var e = [],
    t = {
      issue_code: 2018050,
      open_time: "2018/02/26 19:35:00",
      end_time: "2018/02/26 18:00:00",
      stop_time: "2018/02/26 18:10:00"
    };
  (t.open_time = Number(new Date(t.open_time)) + TIMEZONE),
    (t.end_time = Number(new Date(t.end_time)) + TIMEZONE),
    (t.stop_time = Number(new Date(t.stop_time)) + TIMEZONE),
    e.push(t);
  for (var o = 2018050; 2018358 >= o; o++) {
    var r = (new Date(t.open_time).getDay(), {});
    (r = {
      issue_code: t.issue_code + 1,
      open_time: t.open_time + 864e5,
      end_time: t.end_time + 864e5,
      stop_time: t.stop_time + 864e5
    }),
      (t = avalon.mix(!0, {}, r)),
      e.push(r);
  }
  return e;
}
function createTimeSevenStar() {
  var e = [],
    t = {
      issue_code: 18021,
      open_time: "2018/02/25 20:30:00",
      end_time: "2018/02/25 20:30:00",
      stop_time: "2018/02/25 19:20:00"
    };
  (t.open_time = Number(new Date(t.open_time)) + TIMEZONE),
    (t.end_time = Number(new Date(t.end_time)) + TIMEZONE),
    (t.stop_time = Number(new Date(t.stop_time)) + TIMEZONE),
    e.push(t);
  for (var o = 0, r = 18021; 18153 >= r; r++) {
    var n = (new Date(t.open_time).getDay(), {});
    0 === o || 5 === o
      ? ((n = {
          issue_code: t.issue_code + 1,
          open_time: t.open_time + 1728e5,
          end_time: t.end_time + 1728e5,
          stop_time: t.stop_time + 1728e5
        }),
        (o = (o + 2) % 7))
      : 2 === o &&
        ((n = {
          issue_code: t.issue_code + 1,
          open_time: t.open_time + 2592e5,
          end_time: t.end_time + 2592e5,
          stop_time: t.stop_time + 2592e5
        }),
        (o = (o + 3) % 7)),
      (t = avalon.mix(!0, {}, n)),
      e.push(n);
  }
  return e;
}
function createTimeSevenJoy() {
  var e = [],
    t = {
      issue_code: 2018022,
      open_time: "2018/02/26 21:15:00",
      end_time: "2018/02/26 20:30:00",
      stop_time: "2018/02/26 19:20:00"
    };
  (t.open_time = Number(new Date(t.open_time)) + TIMEZONE),
    (t.end_time = Number(new Date(t.end_time)) + TIMEZONE),
    (t.stop_time = Number(new Date(t.stop_time)) + TIMEZONE),
    e.push(t);
  for (var o = 1, r = 2018022; 2018153 >= r; r++) {
    var n = (new Date(t.open_time).getDay(), {});
    1 === o || 3 === o
      ? ((n = {
          issue_code: t.issue_code + 1,
          open_time: t.open_time + 1728e5,
          end_time: t.end_time + 1728e5,
          stop_time: t.stop_time + 1728e5
        }),
        (o = (o + 2) % 7))
      : 5 === o &&
        ((n = {
          issue_code: t.issue_code + 1,
          open_time: t.open_time + 2592e5,
          end_time: t.end_time + 2592e5,
          stop_time: t.stop_time + 2592e5
        }),
        (o = (o + 3) % 7)),
      (t = avalon.mix(!0, {}, n)),
      e.push(n);
  }
  return e;
}
function getNowTime(e) {
  var t = Number(new Date()) + TIMEZONE;
  return e && (t = Number(new Date(e)) + TIMEZONE), t;
}
function calTimeByDouble(e) {
  for (
    var t,
      o = createTimeDouble(),
      r = getNowTime(e),
      n = 0,
      a = 0,
      i = o.length;
    i > a;
    a++
  ) {
    var l = o[a];
    if (r < l.open_time) {
      (n = a - 1), (t = a), r >= l.end_time && (t = a + 1);
      break;
    }
  }
  return { cur: o[n], next: o[t], list: o };
}
function calTimeByLotto(e) {
  for (
    var t, o = createTimeLotto(), r = getNowTime(e), n = 0, a = 0, i = o.length;
    i > a;
    a++
  ) {
    var l = o[a];
    if (r < l.open_time) {
      (n = a - 1), (t = a), r >= l.end_time && (t = a + 1);
      break;
    }
  }
  return { cur: o[n], next: o[t], list: o };
}
function calTimeByThree(e) {
  for (
    var t, o = createTimeThree(), r = getNowTime(e), n = 0, a = 0, i = o.length;
    i > a;
    a++
  ) {
    var l = o[a];
    if (r < l.open_time) {
      (n = a - 1), (t = a), r >= l.end_time && (t = a + 1);
      break;
    }
  }
  return { cur: o[n], next: o[t], list: o };
}
function calTimeByArrange3(e) {
  for (
    var t,
      o = createTimeArrange3(),
      r = getNowTime(e),
      n = 0,
      a = 0,
      i = o.length;
    i > a;
    a++
  ) {
    var l = o[a];
    if (r < l.open_time) {
      (n = a - 1), (t = a), r >= l.end_time && (t = a + 1);
      break;
    }
  }
  return { cur: o[n], next: o[t], list: o };
}
function calTimeByArrange5(e) {
  for (
    var t,
      o = createTimeArrange3(),
      r = getNowTime(e),
      n = 0,
      a = 0,
      i = o.length;
    i > a;
    a++
  ) {
    var l = o[a];
    if (r < l.open_time) {
      (n = a - 1), (t = a), r >= l.end_time && (t = a + 1);
      break;
    }
  }
  return { cur: o[n], next: o[t], list: o };
}
function calTimeByArrange15(e) {
  for (
    var t,
      o = createTimeArrange15(),
      r = getNowTime(e),
      n = 0,
      a = 0,
      i = o.length;
    i > a;
    a++
  ) {
    var l = o[a];
    if (r < l.open_time) {
      (n = a - 1), (t = a), r >= l.end_time && (t = a + 1);
      break;
    }
  }
  return { cur: o[n], next: o[t], list: o };
}
function calTimeBySevenStar(e) {
  for (
    var t,
      o = createTimeSevenStar(),
      r = getNowTime(e),
      n = 0,
      a = 0,
      i = o.length;
    i > a;
    a++
  ) {
    var l = o[a];
    if (r < l.open_time) {
      (n = a - 1), (t = a), r >= l.end_time && (t = a + 1);
      break;
    }
  }
  return { cur: o[n], next: o[t], list: o };
}
function calTimeBySevenJoy(e) {
  for (
    var t,
      o = createTimeSevenJoy(),
      r = getNowTime(e),
      n = 0,
      a = 0,
      i = o.length;
    i > a;
    a++
  ) {
    var l = o[a];
    if (r < l.open_time) {
      (n = a - 1), (t = a), r >= l.end_time && (t = a + 1);
      break;
    }
  }
  return { cur: o[n], next: o[t], list: o };
}
define("common", function() {}),
  "https:" !== location.protocol &&
    (location.href.indexOf("/caibao918.com/") >= 0 ||
      location.href.indexOf("/zgwhq8.com/") >= 0) &&
    (location.href = location.href.replace("http", "https")),
  (HOST_URL = window.location.protocol + "//" + window.location.host + "/r/"),
  (HOST_URL_R3 =
    window.location.protocol + "//" + window.location.host + "/r3/"),
  (HOST_URL_3 =
    window.location.protocol + "//" + window.location.host + "/r2/"),
  (HOST_URL_LL =
    window.location.protocol + "//" + window.location.host + "/dr2/"),
  (HOST_URL_MES1 =
    window.location.protocol + "//" + window.location.host + "/dr2/"),
  (HOST_URL_MES2 =
    window.location.protocol + "//" + window.location.host + "/mr/"),
  (BASE_HOST_URL = window.location.protocol + "//" + window.location.host),
  (PAY_HOST_URL =
    window.location.protocol +
    "//" +
    window.location.host +
    "/r/lianlianpay/urlRedirect"),
  (WIDTHDRAW_HOST_URL =
    window.location.protocol +
    "//" +
    window.location.host +
    "/r/weixin/withdrawCash/urlRedirect"),
  (LLWIDTHDRAW_HOST_URL =
    window.location.protocol +
    "//" +
    window.location.host +
    "/r/lianLian/withdrawCash/urlRedirect"),
  (SHARE_HOST_URL =
    window.location.protocol +
    "//" +
    window.location.host +
    "/r/weixin/urlRedirect"),
  (SHARE_HOST_URL2 =
    window.location.protocol +
    "//" +
    window.location.host +
    "/r/weixin/urlRedirect2"),
  (SHARE_HOST_URL3 =
    window.location.protocol +
    "//" +
    window.location.host +
    "/r/weixin/urlRedirect3"),
  (SHARE_HOST_URL5 =
    window.location.protocol +
    "//" +
    window.location.host +
    "/r/weixin/urlRedirect5"),
  (SHARECENTER_HOST_URL =
    window.location.protocol +
    "//" +
    window.location.host +
    "/r/centerWeixin/urlRedirect"),
  (SHARECENTER_HOST_URL2 =
    window.location.protocol +
    "//" +
    window.location.host +
    "/r/centerWeixin/urlRedirect2"),
  (SHARECENTER_HOST_URL4 =
    window.location.protocol +
    "//" +
    window.location.host +
    "/r/centerWeixin/urlRedirect4"),
  (PAYOTHER_HOST_URL = PAY_HOST_URL),
  (BACKURL =
    window.location.protocol + "//" + window.location.host + "/lottery/");
var base = location.protocol + "//" + location.host + "/";
(HOST_URL_RELINK = !1),
  (location.href.indexOf("zgwhq8.com") >= 0 ||
    location.href.indexOf("zjinly.com") >= 0 ||
    location.href.indexOf("localhost") >= 0) &&
    ((HOST_URL =
      window.location.protocol + "//" + window.location.host + "/r/"),
    (PAY_HOST_URL =
      window.location.protocol +
      "//" +
      window.location.host +
      "/r/lianlianpay/urlRedirect"),
    (SHARE_HOST_URL =
      window.location.protocol +
      "//" +
      window.location.host +
      "/r/weixin/urlRedirect"),
    (SHARE_HOST_URL2 =
      window.location.protocol +
      "//" +
      window.location.host +
      "/r/weixin/urlRedirect2"),
    (SHARE_HOST_URL3 =
      window.location.protocol +
      "//" +
      window.location.host +
      "/r/weixin/urlRedirect3"),
    (PAYOTHER_HOST_URL = PAY_HOST_URL),
    (HOST_URL_LL =
      window.location.protocol + "//" + window.location.host + "/dr/"),
    (HOST_URL_MES1 =
      window.location.protocol + "//" + window.location.host + "/dr/"),
    (HOST_URL_R3 = HOST_URL)),
  location.href.indexOf("caibao918.com") >= 0 && (HOST_URL_RELINK = !0),
  window.console || ((window.console = {}), (console.log = function() {})),
  (base +=
    location.href.indexOf("/lottery-dev/") >= 0
      ? "lottery-dev/"
      : location.href.indexOf("/lottery/") >= 0
        ? "lottery/"
        : location.href.indexOf("/web/") >= 0
          ? "web/"
          : "");
var base_head_img = base + "resource/images/head.png",
  TIMEZONE = (function() {
    var e = new Date().getTimezoneOffset() + 480;
    return (e = 60 * e * 1e3), -e;
  })(),
  DEBUG = { debug: !1, openid: "" };
localStorage.getItem("debug_openid"),
  localStorage.getItem("debug") && (DEBUG.debug = !0);
var FREE_PWD_MONEEY = 3e3;
(avalon.config = { debug: !1 }), (window.global_vmodels = {});
var CONST_BD = {
    0: 2,
    1: 6,
    2: 12,
    3: 20,
    4: 30,
    5: 42,
    6: 56,
    7: 72,
    8: 90,
    9: 110,
    10: 126,
    11: 138,
    12: 146,
    13: 150,
    14: 150,
    15: 146,
    16: 138,
    17: 126,
    18: 110,
    19: 90,
    20: 72,
    21: 56,
    22: 42,
    23: 30,
    24: 20,
    25: 12,
    26: 6,
    27: 2
  },
  CONST_MAP = { SHUANGSEQIU: "双色球", THREEDNORMAL: "福彩3D" },
  CONST_MAP_WinType = { MULTIPLE: "多类别", THREEDNORMAL: "福彩3D" },
  CONST_Win_MAP = { AWARDED: "中奖", UNAWARD: "未中奖" },
  CONST_MAP_AwardType = { ENTRUST: "委托兑奖", UNENTRUST: "未中奖" },
  CONST_MAP_Pay = { CANCEL: "取消", PAYED: "已支付", UNPAYED: "未支付" },
  CONST_MAP_Trade = {
    CONFIRM: "确认取票",
    PRINTED: "已出票",
    PRINTERROR: "出票错误",
    TOOK: "已取票",
    UNPRINT: "未出票",
    FINISH: "已完成",
    WINSTOP: "中奖停止",
    RUNNING: "进行中"
  },
  CONST_MAP_Kind = {
    SHUANGSEQIUFUSHI: "双色球",
    SHUANGSEQIUNORMAL: "双色球",
    SHUANGSEQIUDANTUO: "双色球",
    LOTTOFUSHI: "大乐透",
    LOTTONORMAL: "大乐透",
    LOTTODANTUO: "大乐透",
    THREEDNORMAL: "福彩3D",
    THREEDBAODIAN: "福彩3D",
    THREEDZULIU: "福彩3D",
    THREEDDANTUO: "福彩3D",
    THREEDZUSAN: "福彩3D",
    THREEDNORMALFUSHI: "福彩3D",
    THREEDZUSANNORMAL: "福彩3D",
    THREEDZULIUFUSHI: "福彩3D",
    ARRANGE3NORMAL: "排列三",
    ARRANGE3BAODIAN: "排列三",
    ARRANGE3ZULIU: "排列三",
    ARRANGE3DANTUO: "排列三",
    ARRANGE3ZUSAN: "排列三",
    ARRANGE3NORMALFUSHI: "排列三",
    ARRANGE3ZUSANNORMAL: "排列三",
    ARRANGE3ZULIUFUSHI: "排列三",
    ARRANGE5NORMAL: "排列五",
    ARRANGE5BAODIAN: "排列五",
    ARRANGE5ZULIU: "排列五",
    ARRANGE5DANTUO: "排列五",
    ARRANGE5ZUSAN: "排列五",
    ARRANGE5NORMALFUSHI: "排列五",
    ARRANGE5ZUSANNORMAL: "排列五",
    ARRANGE5ZULIUFUSHI: "排列五",
    ARRANGE5FUSHI: "排列五",
    SEVENJOYNORMAL: "七乐彩",
    SEVENJOYFUSHI: "七乐彩",
    SEVENJOYDANTUO: "七乐彩",
    XUAN5NORMAL: "15选5",
    XUAN5FUSHI: "15选5",
    XUAN5DANTUO: "15选5",
    FOOTBALLFOURTEEN: "胜负彩",
    FOOTBALLNINE: "任选九",
    SEVENSTARNORMAL: "七星彩",
    SEVENSTARFUSHI: "七星彩"
  },
  CONST_MAP_Lottery = {
    SHUANGSEQIU: "双色球",
    THREED: "福彩3D",
    LOTTO: "大乐透",
    ARRANGE3: "排列三",
    ARRANGE5: "排列五",
    SEVENSTAR: "七星彩",
    SEVENJOY: "七乐彩",
    FOOTBALL: "传统足球",
    XUAN5: "15选5",
    double: "双色球",
    three: "福彩3D",
    arrange3: "排列三",
    arrange5: "排列三",
    lotto: "大乐透",
    sevenStar: "七星彩",
    sevenJoy: "七乐彩",
    football: "传统足球"
  },
  CONST_MAP_Type = {
    SHUANGSEQIUFUSHI: "双色球【复式】",
    SHUANGSEQIUNORMAL: "双色球【普通】",
    SHUANGSEQIUDANTUO: "双色球【胆拖】",
    LOTTOFUSHI: "大乐透【复式】",
    LOTTONORMAL: "大乐透【普通】",
    LOTTODANTUO: "大乐透【胆拖】",
    THREEDNORMAL: "福彩3D【直选】",
    THREEDBAODIAN: "福彩3D【和值】",
    THREEDZULIU: "福彩3D【组六】",
    THREEDZUSAN: "福彩3D【组三】",
    THREEDDANTUO: "福彩3D【胆拖】",
    THREEDNORMALFUSHI: "福彩3D【定位复式】",
    THREEDZUSANNORMAL: "福彩3D【组三】",
    THREEDZULIUFUSHI: "福彩3D【组六】",
    ARRANGE3NORMAL: "排列三【直选】",
    ARRANGE3BAODIAN: "排列三【和值】",
    ARRANGE3ZULIU: "排列三【组六】",
    ARRANGE3DANTUO: "排列三【胆拖】",
    ARRANGE3ZUSAN: "排列三【组三】",
    ARRANGE3NORMALFUSHI: "排列三【定位复式】",
    ARRANGE3ZUSANNORMAL: "排列三【组三】",
    ARRANGE3ZULIUFUSHI: "排列三【组六】",
    ARRANGE5NORMAL: "排列五【直选】",
    ARRANGE5NORMALFUSHI: "排列五【定位复式】",
    ARRANGE5FUSHI: "排列五【直选复式】",
    ARRANGE5BAODIAN: "排列五【和值】",
    ARRANGE5ZULIU: "排列五【组六】",
    ARRANGE5DANTUO: "排列五【组三】",
    ARRANGE5ZUSAN: "排列五【胆拖】",
    ARRANGE5ZUSANNORMAL: "排列五【组三】",
    ARRANGE5ZULIUFUSHI: "排列五【组六】",
    SEVENJOYNORMAL: "七乐彩【普通】",
    SEVENJOYFUSHI: "七乐彩【复式】",
    SEVENJOYDANTUO: "七乐彩【胆拖】",
    SEVENSTARNORMAL: "七星彩【直选】",
    SEVENSTARFUSHI: "七星彩【复式】",
    XUAN5NORMAL: "15选5【普通】",
    XUAN5FUSHI: "15选5【复式】",
    XUAN5DANTUO: "15选5【胆拖】",
    FOOTBALLFOURTEEN: "胜负彩",
    FOOTBALLNINE: "任选九"
  },
  CONST_MAP_Place = {
    SHUANGSEQIUNORMAL: 0,
    SHUANGSEQIUFUSHI: 1,
    THREEDNORMAL: 2,
    THREEDZUSAN: 3,
    THREEDZULIU: 4,
    THREEDBAODIAN: 5,
    SHUANGSEQIUDANTUO: 6,
    THREEDDANTUO: 7,
    THREEDNORMALFUSHI: 8,
    THREEDZUSANNORMAL: 9,
    THREEDZULIUFUSHI: 10,
    LOTTONORMAL: 11,
    LOTTOFUSHI: 12,
    LOTTODANTUO: 13,
    ARRANGE3NORMAL: 14,
    ARRANGE3ZUSAN: 15,
    ARRANGE3ZULIU: 16,
    ARRANGE3BAODIAN: 17,
    ARRANGE3DANTUO: 18,
    ARRANGE3NORMALFUSHI: 19,
    ARRANGE3ZUSANNORMAL: 20,
    ARRANGE3ZULIUFUSHI: 21,
    ARRANGE5NORMAL: 22,
    ARRANGE5NORMALFUSHI: 23,
    ARRANGE5FUSHI: 29,
    SEVENJOYNORMAL: 24,
    SEVENJOYFUSHI: 25,
    SEVENJOYDANTUO: 26,
    SEVENSTARNORMAL: 27,
    SEVENSTARFUSHI: 28,
    XUAN5NORMAL: 32,
    XUAN5FUSHI: 33,
    XUAN5DANTUO: 34,
    FOOTBALLFOURTEEN: 30,
    FOOTBALLNINE: 31
  },
  CONST_MAP_PlACE_TYPE = {
    0: "SHUANGSEQIUNORMAL",
    1: "SHUANGSEQIUFUSHI",
    2: "THREEDNORMAL",
    3: "THREEDZUSAN",
    4: "THREEDZULIU",
    5: "THREEDBAODIAN",
    6: "SHUANGSEQIUDANTUO",
    7: "THREEDDANTUO",
    8: "THREEDNORMALFUSHI",
    9: "THREEDZUSANNORMAL",
    10: "THREEDZULIUFUSHI",
    11: "LOTTONORMAL",
    12: "LOTTOFUSHI",
    13: "LOTTODANTUO",
    14: "ARRANGE3NORMAL",
    15: "ARRANGE3ZUSAN",
    16: "ARRANGE3ZULIU",
    17: "ARRANGE3BAODIAN",
    18: "ARRANGE3DANTUO",
    19: "ARRANGE3NORMALFUSHI",
    20: "ARRANGE3ZUSANNORMAL",
    21: "ARRANGE3ZULIUFUSHI",
    22: "ARRANGE5NORMAL",
    23: "ARRANGE5NORMALFUSHI",
    24: "SEVENJOYNORMAL",
    25: "SEVENJOYFUSHI",
    26: "SEVENJOYDANTUO",
    27: "SEVENSTARNORMAL",
    28: "SEVENSTARFUSHI",
    29: "ARRANGE5FUSHI",
    30: "FOOTBALLFOURTEEN",
    31: "FOOTBALLNINE",
    32: "XUAN5NORMAL",
    33: "XUAN5FUSHI",
    34: "XUAN5DANTUO"
  },
  CONST_MAP_Bill = {
    PLACE: "下单",
    DEDUCT: "退款",
    WIN: "奖金",
    RELEASE: "退款",
    RECHARGE: "充值",
    AGENTRECHARGE: "客服代充",
    FEE: "服务费",
    WITHDRAWALS: "提现",
    WITHDRAWALSBACK: "提现退回",
    ENTRUSTAWARD: "兑奖",
    PEEK: "查看号码",
    LOOK: "预测付费",
    AWARD: "预测打赏",
    REBATE: "返点",
    CASHBRIBERYMONEY: "现金红包",
    HONGBAO_EXPEND: "红包支出",
    HONGBAO_INCOME: "红包收入",
    HONGBAO_BACK: "红包退回",
    ORDERAWARD: "订单打赏",
    SIGNGAMEAWARD: "签到奖励",
    CAIKA_INCOME: "彩咖打赏收入",
    AGENT: "助理佣金",
    ENTRUSTRECHARGE: "兑奖金额预充",
    AUTOORDERSTOP: "定投截止退款"
  },
  CONST_MAP_Bill2 = {
    AWARD_ADD: "预测打赏收入",
    AWARD_SUB: "预测打赏支付",
    CASHBRIBERYMONEY: "现金红包",
    COMBINE: "账目合并",
    DEDUCT: "合买违约扣款",
    ENTRUSTAWARD: "兑奖",
    LOOK_ADD: "查看预测收入",
    LOOK_SUB: "查看预测支付",
    PEEK_ADD: "看号收入",
    PEEK_SUB: "看号支付",
    PLACE_ADD: "销量",
    PLACE_SUB: "下单",
    RECHARGE: "充值",
    RELEASE: "订单失败退款",
    WIN: "奖金",
    WITHDRAWALS: "提现",
    WITHDRAWALSBACK: "提现失败返还",
    AWARD: "预测打赏支付",
    LOOK: "查看预测支付",
    PEEK: "看号支付",
    PLACE: "下单",
    REBATE: "返点",
    WITHDRAWALS_WEIXIN: "提现-微信",
    WITHDRAWALS_NORMAL: "提现-普通",
    WITHDRAWALS_QUICK: "提现-快速",
    HONGBAO_EXPEND: "红包支出",
    HONGBAO_INCOME: "红包收入",
    HONGBAO_BACK: "红包退回",
    ORDERAWARD: "订单打赏",
    SIGNGAMEAWARD: "签到奖励",
    CAIKA_INCOME: "彩咖打赏收入",
    CAIKA_EXPEND: "彩咖打赏支出",
    LOTTERYRED_EXPEND: "彩票红包",
    LOTTERYRED_RELEASE: "彩票红包退款",
    AGENT: "助理佣金",
    ENTRUSTRECHARGE: "兑奖金额预充",
    AUTOORDERSTOP: "定投截止退款"
  },
  CONST_MAP_Bill3 = { WEIXIN: "微信", BANK: "银行卡", BALANCE: "钱包" },
  CONST_FOOTBALL_TYPE = { BENQI: "本期", YUSHOU: "预售" },
  CONST_MAP_LEVEL = {
    1: "新兵",
    2: "老兵",
    3: "班长",
    4: "排长",
    5: "连长",
    6: "营长",
    7: "团长",
    8: "旅长",
    9: "师长",
    10: "军长",
    11: "司令",
    12: "战神"
  },
  CONST_MAP_LEVEL_S = {
    1: "民女",
    2: "宫女",
    3: "秀女",
    4: "御女",
    5: "才人",
    6: "贵人",
    7: "贵妃",
    8: "皇妃",
    9: "皇后",
    10: "女王",
    11: "女皇",
    12: "女神"
  },
  CONST_MAP_LEVEL_MONEY = {
    1: 0,
    2: 0.2,
    3: 0.4,
    4: 0.6,
    5: 0.8,
    6: 1,
    7: 2.5,
    8: 3,
    9: 4,
    10: 5,
    11: 6,
    12: 8
  };
(window.callTel = function(e) {
  console.log(1),
    UtilTool.isWeiXin() ||
      (UtilTool.isAndroid()
        ? window.android.callPhone(e)
        : UtilTool.is_ios() &&
          window.webkit.messageHandlers.callPhone.postMessage(e));
}),
  define("config/base_config", function() {}),
  (function() {
    require.config({
      paths: {
        zepto: base + "libs/zepto.min.js",
        WxPlugin: base + "libs/wx/jweixin-1.3.2.js",
        WeixinTools: base + "libs/wx/wxTool.js",
        SMPlugin: base + "libs/sm/sm.js",
        SMCityPlugin: base + "libs/sm/sm-city-picker.js",
        DragPlugin: base + "libs/drag.js",
        AvalonGetModel: base + "libs/avalon/avalon.getModel.js",
        LLPayComponent: base + "libs/component/llpay",
        AjaxController: base + "controllers/AjaxController.js",
        HeaderController: base + "controllers/HeaderController.js",
        SelectPlaceController: base + "controllers/SelectPlaceController.js",
        OrderModel: base + "models/OrderModel.js",
        JointOrderModel: base + "models/JointOrderModel.js"
      },
      shim: {
        zepto: { exports: "zepto" },
        WxPlugin: { exports: "WxPlugin" },
        DragPlugin: { exports: "zepto" },
        SMPlugin: { deps: ["zepto"], exports: "SMPlugin" },
        SMCityPlugin: { deps: ["SMPlugin"], exports: "SMCityPlugin" }
      }
    });
  })(),
  define("config/require_config", function() {});
var APITool = {};
(APITool = {
  upload: HOST_URL + "image/upload",
  uploadMediaImageToOss: HOST_URL + "image/uploadMediaImageToOss",
  thumbUrl: function(e) {
    return e.indexOf("PT") >= 0 && 15 === e.length
      ? HOST_URL + "image/getImage?serial=" + e
      : e;
  },
  wxconfig: HOST_URL + "weixin/wxconfig",
  wxconfigCenter: HOST_URL + "centerWeixin/wxconfig",
  wxconfigPay: HOST_URL + "weixin/wxconfigForOthers",
  wxpayconfig: HOST_URL + "weixinpay/wxconfig"
}),
  (APITool.image = {
    uploadMediaImage: {
      url: HOST_URL + "image/uploadMediaImage",
      method: "GET"
    },
    uploadMediaImageToOss: {
      url: HOST_URL + "image/uploadMediaImageToOss",
      method: "GET"
    },
    llUpload: { url: HOST_URL_LL + "image/uploadToPattern", method: "POST" },
    getLLImage: { url: HOST_URL_LL + "image/getImageByFileId", method: "GET" },
    confirm: { url: HOST_URL + "image/upload/confirm", method: "GET" },
    getImage: { url: HOST_URL + "image/getImage", method: "GET" },
    getHeadImage: function(e) {
      return HOST_URL + "image/getHeadImage?openid=" + e;
    }
  }),
  (APITool.user = {
    whoAmI: {
      url: HOST_URL + "user/whoAmIForMobile",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    lotteryPushAction: {
      url: HOST_URL + "user/whoAmIForMobile/lotteryPushAction",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    isShopManager: {
      url: HOST_URL + "app/user/isShopManager",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    userCollectedCount: {
      url: HOST_URL + "user/whoAmIForMobile/userCollectedCount",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    statisticsInfo: {
      url: HOST_URL + "user/whoAmIForMobile/statisticsInfo",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    login: { url: HOST_URL + "user/login", method: "POST" },
    adminWhoAmI: { url: HOST_URL + "user/whoAmI", method: "GET" },
    adminRecharge: { url: HOST_URL + "manualRecharge/save", method: "POST" },
    adminRechargeList: { url: HOST_URL + "manualRecharge/list", method: "GET" },
    getHasPayed: { url: HOST_URL + "user/getHasPayed", method: "GET" },
    getHasPayedShareOrder: {
      url: HOST_URL + "user/getHasPayedShareOrder",
      method: "GET"
    },
    logout: { url: HOST_URL + "user/logout", method: "GET" },
    getUserByOpenId: { url: HOST_URL + "user/getUserByOpenId", method: "GET" },
    getBalanceDetail: {
      url: HOST_URL + "user/getBalanceDetail",
      method: "GET"
    },
    withdrawCash: { url: HOST_URL + "user/withdrawCash", method: "GET" },
    recharge: { url: HOST_URL + "user/getJsWXPay", method: "GET" },
    setting: { url: HOST_URL + "user/setLotteryPushAction", method: "GET" },
    collected: { url: HOST_URL + "user/collected", method: "GET" },
    cancelCollected: { url: HOST_URL + "user/cancelCollected", method: "GET" },
    update: { url: HOST_URL + "user/update", method: "GET" },
    refresh: { url: HOST_URL + "user/reload", method: "GET" },
    refreshCenter: {
      url: HOST_URL + "user/reloadCenterWeiXinUser",
      method: "GET"
    },
    getInfoByUserId: {
      url: HOST_URL + "user/getInfoByUserId",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    setMessageAction: {
      url: HOST_URL + "user/setMessageAction",
      method: "GET"
    },
    getLianLianPayLoad: {
      url: HOST_URL + "user/getLianLianPayLoad",
      method: "GET"
    },
    getLianLianBalanceDetail: {
      url: HOST_URL + "user/getLianLianBalanceDetail",
      method: "GET"
    },
    getLianLianUserInfo: {
      url: HOST_URL + "user/getLianLianUserInfo",
      method: "GET"
    },
    lianLianWithdrawCash: {
      url: HOST_URL + "user/lianLianWithdrawCash",
      method: "GET"
    },
    userCollectedCountByPhoneMobile: {
      url: HOST_URL + "user/whoAmIForMobile/userCollectedCountByPhoneMobile",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    getLianLianUserInfoByPhoneMobile: {
      url: HOST_URL + "user/getLianLianUserInfoByPhoneMobile",
      method: "GET"
    }
  }),
  (APITool.centerWeixin = {
    bindPhoneMobile: {
      url: HOST_URL + "centerWeixin/bindPhoneMobile",
      method: "GET"
    },
    getSubscribeList: {
      url: HOST_URL + "shop/getSubscribeList",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    whoAmIForCenterWeixinUser: {
      url: HOST_URL + "user/whoAmIForMobile/centerWeixinUser",
      method: "GET"
    }
  }),
  (APITool.shop = {
    getBalanceDetail: {
      url: HOST_URL + "shop/getBalanceDetail",
      method: "GET"
    },
    entrustByShopEntrustAmount: {
      url: HOST_URL + "shop/entrustByShopEntrustAmount",
      method: "GET"
    },
    updateManagerCode: {
      url: HOST_URL + "shop/updateManagerCode",
      method: "GET"
    },
    getPublicPlatLotteryInfos: {
      url: HOST_URL + "shop/getPublicPlatLotteryInfos",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    getUnPrintCounts: {
      url: HOST_URL + "shop/getUnPrintCounts",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    getEntrustStatistic: {
      url: HOST_URL + "shop/getEntrustStatictisInfo",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    getEntrustHisStatistic: {
      url: HOST_URL + "shop/getEntrustStatictisInfo",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    getInfo: {
      url: HOST_URL + "shop/getInfo",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    getLLPayInfo: { url: HOST_URL + "shop/getLianLianUserInfo", method: "GET" },
    getOtherInfo: { url: HOST_URL + "shop/getOthersInfo", method: "GET" },
    confirm: { url: HOST_URL + "shop/getTicket/confirm", method: "PUT" },
    getTodayTasks: {
      url: HOST_URL + "shop/getTodayTasks",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    payMoney: { url: HOST_URL + "shop/payMoney", method: "GET" },
    withdrawCash: { url: HOST_URL + "shop/withdrawCash", method: "GET" },
    getLotteryInfos: {
      url: HOST_URL + "shop/getLotteryInfos",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    getJsWXPay: { url: HOST_URL + "shop/getJsWXPay", method: "GET" },
    getShopReferenceList: {
      url: HOST_URL + "shop/getShopReferenceList",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    updateReference: { url: HOST_URL + "shop/updateReference", method: "POST" },
    drawLotteries: { url: HOST_URL + "shop/drawLotteries", method: "POST" },
    detail: { url: HOST_URL + "publicPlatLottery/getFullInfo", method: "GET" },
    shopWithdrawCash: {
      url: HOST_URL + "withdrawCash/shopWithdrawCash",
      method: "GET"
    },
    getShopPeriodsSaleInfos: {
      url: HOST_URL + "shop/getShopPeriodsSaleInfos",
      method: "GET"
    },
    exportExcel: { url: HOST_URL + "shop/export", method: "GET" },
    entrustByShopBalance: {
      url: HOST_URL + "shop/entrustByShopBalance",
      method: "GET"
    },
    getLianLianBalancePay: {
      url: HOST_URL + "shop/getLianLianBalancePay",
      method: "GET"
    },
    getLianLianBankPay: {
      url: HOST_URL + "shop/getLianLianBankPay",
      method: "GET"
    },
    getLianLianPayLoad: {
      url: HOST_URL + "shop/getLianLianPayLoad",
      method: "GET"
    },
    getShopInfoByPhoneMobile: {
      url: HOST_URL + "app/user/getShopInfoByPhoneMobile",
      method: "GET"
    }
  }),
  (APITool.order = {
    directPlace: { url: HOST_URL + "order/directPlace", method: "POST" },
    query: {
      url: HOST_URL + "order/query",
      relink: HOST_URL_RELINK,
      method: "POST"
    },
    myOrders: { url: HOST_URL + "order/myOrders", method: "POST" },
    myOrdersNew: {
      url: HOST_URL + "order/myOrders/new",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    getFullOrder: { url: HOST_URL + "order/getFullOrder", method: "GET" },
    setAwardType: { url: HOST_URL + "order/setAwardType", method: "PUT" },
    confirm: { url: HOST_URL + "order/confirm", method: "GET" },
    getCodeURL: { url: HOST_URL + "order/getCodeURL", method: "GET" },
    payByBalance: { url: HOST_URL + "order/payByBalance", method: "GET" },
    payByPurchaseMoney: {
      url: HOST_URL + "order/payByPurchaseMoney",
      method: "GET"
    },
    getJsWXPay: { url: HOST_URL + "order/getJsWXPay", method: "GET" },
    payAuth: { url: HOST_URL + "weixinpay/urlRedirect", method: "GET" },
    addExtraBonus: { url: HOST_URL + "order/addExtraBonus", method: "GET" },
    getOrderItems: { url: HOST_URL + "order/getOrderItemInfos", method: "GET" },
    getUserOrders: {
      url: HOST_URL + "order/getUserOrders",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    getLianLianBalancePay: {
      url: HOST_URL + "order/getLianLianBalancePay",
      method: "GET"
    },
    getLianLianBankPay: {
      url: HOST_URL + "order/getLianLianBankPay",
      method: "GET"
    },
    getLianLianPayLoad: {
      url: HOST_URL + "order/getLianLianPayLoad",
      method: "GET"
    },
    updateManagerConfirm: {
      url: HOST_URL + "order/updateManagerConfirm",
      method: "GET"
    }
  }),
  (APITool.orderExtra = {
    browse: { url: HOST_URL + "orderExtra/browse", method: "GET" },
    getOrderBrowseCount: {
      url: HOST_URL + "orderExtra/getOrderBrowseCount",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    getJointOrderAwardList: {
      url: HOST_URL + "orderExtra/getJointOrderAwardList",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    awardJointOrder: {
      url: HOST_URL + "orderExtra/awardJointOrder",
      method: "GET"
    },
    getLianLianPayLoad: {
      url: HOST_URL + "orderExtra/payAwardOrder/getLianLianPayLoad",
      method: "GET"
    },
    getLianLianBalancePay: {
      url: HOST_URL + "orderExtra/payAwardOrder/getLianLianBalancePay",
      method: "GET"
    },
    getLianLianBankPay: {
      url: HOST_URL + "orderExtra/payAwardOrder/getLianLianBankPay",
      method: "GET"
    },
    byTranBalance: {
      url: HOST_URL + "orderExtra/payAwardOrder/byTranBalance",
      method: "GET"
    }
  }),
  (APITool.peekOrder = {
    directPlace: { url: HOST_URL + "peekOrder/directPlace", method: "POST" },
    getJsWXPay: { url: HOST_URL + "peekOrder/getJsWXPay", method: "GET" },
    hasPayed: {
      url: HOST_URL + "peekOrder/hasPayed",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    payByBalance: { url: HOST_URL + "peekOrder/payByBalance", method: "GET" },
    getLianLianBalancePay: {
      url: HOST_URL + "peekOrder/getLianLianBalancePay",
      method: "GET"
    },
    getLianLianBankPay: {
      url: HOST_URL + "peekOrder/getLianLianBankPay",
      method: "GET"
    },
    getLianLianPayLoad: {
      url: HOST_URL + "peekOrder/getLianLianPayLoad",
      method: "GET"
    }
  }),
  (APITool.jointOrder = {
    goPay: { url: HOST_URL + "jointOrder/goPay", method: "GET" },
    directPlace: { url: HOST_URL + "jointOrder/directPlace", method: "POST" },
    query: {
      url: HOST_URL + "jointOrder/query",
      relink: HOST_URL_RELINK,
      method: "POST"
    },
    getUnPayedList: {
      url: HOST_URL + "jointOrder/getUnPayedList",
      method: "GET"
    },
    myOrders: { url: HOST_URL + "jointOrder/myOrders", method: "POST" },
    getFullOrder: { url: HOST_URL + "jointOrder/getFullOrder", method: "GET" },
    getFullOrderForWeixin: {
      url: HOST_URL + "jointOrder/getFullOrderForWeixin",
      method: "GET"
    },
    myFullOrder: { url: HOST_URL + "jointOrder/myFullOrder", method: "GET" },
    subscribe: { url: HOST_URL + "jointOrder/subscribe", method: "POST" },
    setAwardType: { url: HOST_URL + "jointOrder/setAwardType", method: "PUT" },
    confirm: { url: HOST_URL + "jointOrder/confirm", method: "GET" },
    getCodeURL: { url: HOST_URL + "jointOrder/getCodeURL", method: "GET" },
    payByBalance: { url: HOST_URL + "jointOrder/payByBalance", method: "GET" },
    payByPurchaseMoney: {
      url: HOST_URL_R3 + "jointOrder/payByPurchaseMoney",
      method: "GET"
    },
    getJsWXPay: { url: HOST_URL + "jointOrder/getJsWXPay", method: "GET" },
    payAuth: { url: HOST_URL + "weixinpay/urlRedirect", method: "GET" },
    getCollectedUsers: {
      url: HOST_URL + "jointOrder/getCollectedUsers",
      method: "GET"
    },
    collected: { url: HOST_URL + "jointOrder/collected", method: "GET" },
    hasCollected: { url: HOST_URL + "jointOrder/hasCollected", method: "GET" },
    getUnPayInfo: { url: HOST_URL + "jointOrder/getUnPayInfo", method: "GET" },
    delete: { url: HOST_URL + "jointOrder/delete", method: "DELETE" },
    getUnSubscribeShopIds: {
      url: HOST_URL + "user/getUnSubscribeShopIds",
      method: "GET"
    },
    getLianLianBalancePay: {
      url: HOST_URL + "jointOrder/getLianLianBalancePay",
      method: "GET"
    },
    getLianLianBankPay: {
      url: HOST_URL + "jointOrder/getLianLianBankPay",
      method: "GET"
    },
    getLianLianPayLoad: {
      url: HOST_URL + "jointOrder/getLianLianPayLoad",
      method: "GET"
    }
  }),
  (APITool.card = {
    save: { url: HOST_URL + "creditCard/save", method: "POST" },
    myCards: { url: HOST_URL + "creditCard/myCards", method: "GET" }
  }),
  (APITool.mobile = {
    getCode: { url: HOST_URL + "mobileVerify/getCode", method: "GET" },
    verifyCode: { url: HOST_URL + "mobileVerify/verifyCode", method: "GET" },
    onlyVerifyCode: {
      url: HOST_URL + "mobileVerify/onlyVerifyCode",
      method: "GET"
    }
  }),
  (APITool.feedback = {
    save: { url: HOST_URL + "feedback/save", method: "POST" },
    verifyCode: { url: HOST_URL + "mobileVerify/verifyCode", method: "GET" }
  }),
  (APITool.aliPay = {
    recharge: { url: HOST_URL + "aliPay/recharge", method: "GET" },
    goEntrust: { url: HOST_URL + "aliPay/goEntrust", method: "GET" }
  }),
  (APITool.bankPay = {
    goPay: { url: HOST_URL + "bankPay/goPay", method: "GET" }
  }),
  (APITool.genius = {
    list: {
      url: HOST_URL + "genius/list",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    getRanking: {
      url: HOST_URL + "genius/getRanking",
      relink: HOST_URL_RELINK,
      method: "GET"
    }
  }),
  (APITool.point = { save: { url: HOST_URL + "point/save", method: "POST" } }),
  (APITool.shake = {
    save: { url: HOST_URL + "luckyNumber/save", method: "POST" },
    saveRules: { url: HOST_URL + "luckyNumber/saveRules", method: "POST" },
    getRules: {
      url: HOST_URL + "luckyNumber/getRules",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    getBatch: {
      url: HOST_URL + "luckyNumber/getBatch",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    getNumbers: {
      url: HOST_URL + "luckyNumber/getNumbers",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    getWinOrders: {
      url: HOST_URL + "luckyNumber/getWinOrders",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    payByBalance: { url: HOST_URL + "luckyNumber/payByBalance", method: "GET" },
    getJsWXPay: { url: HOST_URL + "luckyNumber/getJsWXPay", method: "GET" },
    award: { url: HOST_URL + "luckyNumber/award", method: "GET" },
    directPlace: { url: HOST_URL + "luckyNumber/award", method: "GET" },
    getLianLianBalancePay: {
      url: HOST_URL + "luckyNumber/getLianLianBalancePay",
      method: "GET"
    },
    getLianLianBankPay: {
      url: HOST_URL + "luckyNumber/getLianLianBankPay",
      method: "GET"
    },
    getLianLianPayLoad: {
      url: HOST_URL + "luckyNumber/getLianLianPayLoad",
      method: "GET"
    }
  }),
  (APITool.app = {
    login: { url: HOST_URL + "app/user/userLogin", method: "POST" },
    loginByPhone: { url: HOST_URL + "app/user/userLogin", method: "POST" },
    loginById: { url: HOST_URL + "app/user/managerLoginById", method: "GET" },
    loginByUserId: {
      url: HOST_URL + "app/user/managerLoginById",
      method: "GET"
    }
  }),
  (APITool.shareOrder = {
    del: { url: HOST_URL + "shareOrder/delete", method: "DELETE" },
    goPay: { url: HOST_URL + "shareOrder/goPay", method: "GET" },
    getPlaceInfo: { url: HOST_URL + "shareOrder/getPlaceInfo", method: "GET" },
    todayPlaceCount: {
      url: HOST_URL + "shareOrder/todayPlaceCount",
      method: "GET"
    },
    query: {
      url: HOST_URL + "shareOrder/query",
      relink: HOST_URL_RELINK,
      method: "POST"
    },
    getUnPayInfo: { url: HOST_URL + "shareOrder/getUnPayInfo", method: "GET" },
    myOrders: {
      url: HOST_URL + "shareOrder/myOrders",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    getFullOrder: { url: HOST_URL + "shareOrder/getFullOrder", method: "GET" },
    getJsWXPay: { url: HOST_URL + "shareOrder/getJsWXPay", method: "GET" },
    payByBalance: { url: HOST_URL + "shareOrder/payByBalance", method: "GET" },
    updatePatterns: {
      url: HOST_URL + "shareOrder/updatePatterns",
      method: "POST"
    },
    updateWinInfo: {
      url: HOST_URL + "shareOrder/updateWinInfo",
      method: "POST"
    },
    entrust: { url: HOST_URL + "shareOrder/entrust", method: "GET" },
    entrustOffline: {
      url: HOST_URL + "shareOrder/entrust/offline",
      method: "GET"
    },
    subscribe: { url: HOST_URL + "shareOrder/subscribe", method: "POST" },
    directPlace: { url: HOST_URL + "shareOrder/directPlace", method: "POST" },
    update: { url: HOST_URL + "shareOrder/updateMemo", method: "POST" },
    getFollowInfo: { url: HOST_URL + "user/getInfoByUserId", method: "GET" },
    entrustByShopBalance: {
      url: HOST_URL + "shareOrder/entrustByShopBalance",
      method: "GET"
    },
    hasUnEntrustInfo: {
      url: HOST_URL + "shareOrder/hasUnEntrustInfo",
      method: "GET"
    },
    cancelFollow: { url: HOST_URL + "user/cancelCollected", method: "GET" },
    follow: { url: HOST_URL + "user/collected", method: "GET" },
    getLianLianBalancePay: {
      url: HOST_URL + "shareOrder/getLianLianBalancePay",
      method: "GET"
    },
    getLianLianBankPay: {
      url: HOST_URL + "shareOrder/getLianLianBankPay",
      method: "GET"
    },
    getLianLianPayLoad: {
      url: HOST_URL + "shareOrder/getLianLianPayLoad",
      method: "GET"
    },
    entrustByLianLianPay: {
      url: HOST_URL + "shareOrder/entrust/byLianLianPay",
      method: "GET"
    },
    entrustByLianLianBalancePay: {
      url: HOST_URL + "shareOrder/entrust/byLianLianBalancePay",
      method: "GET"
    },
    entrustByLianLianBankPay: {
      url: HOST_URL + "shareOrder/entrust/byLianLianBankPay",
      method: "GET"
    },
    entrustByShopEntrustAmount: {
      url: HOST_URL + "shareOrder/entrust/byShopEntrustAmount",
      method: "GET"
    },
    manualFinish: { url: HOST_URL + "shareOrder/manualFinish", method: "GET" }
  }),
  (APITool.expert = {
    getPredictor: {
      url: HOST_URL + "predictor/getFullInfo",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    myPredictionHistory: {
      url: HOST_URL + "prediction/myPredictionHistory",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    collectedPrediction: {
      url: HOST_URL + "prediction/collected",
      method: "GET"
    },
    cancelSubscribe: {
      url: HOST_URL + "predictor/subscribe/cancel",
      method: "GET"
    },
    cancelCollectedPrediction: {
      url: HOST_URL + "prediction/collected/cancel",
      method: "GET"
    },
    directPlace: { url: HOST_URL + "prediction/directPlace", method: "GET" },
    getCollectedUsers: {
      url: HOST_URL + "prediction/getCollectedUsers",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    getCommentInfos: {
      url: HOST_URL + "prediction/getCommentInfos",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    getFullInfo: {
      url: HOST_URL + "prediction/getFullInfo",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    getJsWXPay: { url: HOST_URL + "prediction/getJsWXPay", method: "GET" },
    getSubscribeInfo: {
      url: HOST_URL + "predictor/getSubscribeInfo",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    hasCollectedPrediction: {
      url: HOST_URL + "prediction/hasCollected",
      method: "GET"
    },
    hasPayed: { url: HOST_URL + "prediction/hasPayed", method: "GET" },
    payByBalance: { url: HOST_URL + "prediction/payByBalance", method: "GET" },
    save: { url: HOST_URL + "predictor/save", method: "POST" },
    saveComment: { url: HOST_URL + "prediction/saveComment", method: "POST" },
    deleteComment: {
      url: HOST_URL + "prediction/deleteComment",
      method: "DELETE"
    },
    savePrediction: { url: HOST_URL + "prediction/save", method: "POST" },
    subscribe: { url: HOST_URL + "predictor/subscribe", method: "GET" },
    update: { url: HOST_URL + "predictor/update", method: "POST" },
    getLianLianPayLoad: {
      url: HOST_URL + "prediction/getLianLianPayLoad",
      method: "GET"
    },
    getLianLianBankPay: {
      url: HOST_URL + "prediction/getLianLianBankPay",
      method: "GET"
    },
    getLianLianBalancePay: {
      url: HOST_URL + "prediction/getLianLianBalancePay",
      method: "GET"
    },
    queryPrediction: { url: HOST_URL + "prediction/query", method: "POST" }
  }),
  (APITool.systemPara = {
    getTime: { url: HOST_URL + "systemPara/getTime", method: "GET" }
  }),
  (APITool.llPay = {
    directOpenUser: {
      url: HOST_URL_LL + "llPay/directOpenUser",
      method: "POST"
    },
    defaultPayPwdModify: {
      url: HOST_URL_LL + "llPay/defaultPayPwdModify",
      method: "POST"
    },
    payPwdModify: { url: HOST_URL_LL + "llPay/payPwdModify", method: "POST" },
    bankPayPwdSet: { url: HOST_URL_LL + "llPay/bankPayPwdSet", method: "POST" },
    payPwdVerify: { url: HOST_URL_LL + "llPay/payPwdVerify", method: "POST" },
    payPwdSet: { url: HOST_URL_LL + "llPay/payPwdSet", method: "POST" },
    pwdAuth: { url: HOST_URL_LL + "llPay/pwdAuth", method: "POST" },
    modifyUserInfo: {
      url: HOST_URL_LL + "llPay/modifyUserInfo",
      method: "POST"
    },
    modifyBaseUserInfo: {
      url: HOST_URL_LL + "llPay/modifyBaseUserInfo",
      method: "POST"
    },
    uploadCardPhoto: {
      url: HOST_URL_LL + "llPay/wxUploadCardPhoto",
      method: "POST"
    },
    getUserBaseInfo: {
      url: HOST_URL_LL + "llPay/getUserBaseInfo",
      method: "GET"
    },
    queryBankCard: { url: HOST_URL_LL + "llPay/queryBankCard", method: "GET" },
    queryBindCard: { url: HOST_URL_LL + "llPay/queryBindCard", method: "GET" },
    bankCardOpenAuth: {
      url: HOST_URL_LL + "llPay/bankCardOpenAuth",
      method: "POST"
    },
    bankCardAuthVerify: {
      url: HOST_URL_LL + "llPay/bankCardAuthVerify",
      method: "POST"
    },
    bankCardUnbind: {
      url: HOST_URL_LL + "llPay/bankCardUnbind",
      method: "POST"
    },
    bankCardRecharge: {
      url: HOST_URL_LL + "llPay/bankCardRecharge",
      method: "POST"
    },
    bankCardPay: { url: HOST_URL_LL + "llPay/bankCardPay", method: "POST" },
    bankCardAuthPay: {
      url: HOST_URL_LL + "llPay/bankCardAuthPay",
      method: "POST"
    },
    cashOutCombineApply: {
      url: HOST_URL_LL + "llPay/cashOutCombineApply",
      method: "POST"
    },
    updateIsFreePwd: {
      url: HOST_URL_LL + "llPay/updateIsFreePwd",
      method: "GET"
    },
    getllUserInfo: { url: HOST_URL_LL + "llPay/getllUserInfo", method: "GET" },
    modifyMobAuth: { url: HOST_URL_LL + "llPay/modifyMobAuth", method: "GET" },
    checkOldMobileVerified: {
      url: HOST_URL_LL + "llPay/checkOldMobileVerified",
      method: "GET"
    },
    getNewMobCode: { url: HOST_URL_LL + "llPay/getNewMobCode", method: "GET" },
    checkNewMobileVerified: {
      url: HOST_URL_LL + "llPay/checkNewMobileVerified",
      method: "GET"
    },
    openUserWithPersonalInfo: {
      url: HOST_URL_LL + "llPay/openUserWithPersonalInfo",
      method: "POST"
    },
    entrustBalanceRecharge: {
      url: HOST_URL_LL + "lianlianPay/entrustBalanceRecharge",
      method: "POST"
    },
    smsValidate: {
      url: HOST_URL_LL + "lianlianPay/entrustBalanceRecharge/smsValidate",
      method: "POST"
    },
    getEntrustBalancePayment: {
      url: HOST_URL_LL + "statistics/getEntrustBalancePayment",
      method: "GET"
    },
    doIPlaceInTheShop: {
      url: HOST_URL_LL + "app/doIPlaceInTheShop",
      method: "GET"
    }
  }),
  (APITool.lianLianPay = {
    balancePayVerify: {
      url: HOST_URL + "lianLianPay/balancePayVerify",
      method: "GET"
    },
    bankPayVerify: {
      url: HOST_URL + "lianLianPay/bankPayVerify",
      method: "GET"
    },
    bankCertifiedPayVerify: {
      url: HOST_URL + "lianLianPay/bankCertifiedPayVerify",
      method: "GET"
    }
  }),
  (APITool.tranAmount = {
    tranAmountWithdrawCash: {
      url: HOST_URL + "user/tranAmountWithdrawCash",
      method: "GET"
    },
    payByTranBalanceForJoint: {
      url: HOST_URL_R3 + "jointOrder/payByTranBalance",
      method: "GET"
    },
    payByTranBalanceForLuckyNumber: {
      url: HOST_URL + "luckyNumber/payByTranBalance",
      method: "GET"
    },
    payByTranBalanceForOrder: {
      url: HOST_URL + "order/payByTranBalance",
      method: "GET"
    },
    payByTranBalanceForPrediction: {
      url: HOST_URL + "prediction/payByTranBalance",
      method: "GET"
    },
    payByTranBalanceForShare: {
      url: HOST_URL_R3 + "shareOrder/payByTranBalance",
      method: "GET"
    },
    payByTranBalanceForPeek: {
      url: HOST_URL + "peekOrder/payByTranBalance",
      method: "GET"
    }
  }),
  (APITool.hongbao = {
    canOpen: { url: HOST_URL + "briberyMoney/canOpen", method: "GET" },
    doRun: { url: HOST_URL + "briberyMoney/doRun", method: "GET" },
    getRankingList: {
      url: HOST_URL + "briberyMoney/getRankingList",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    myRankingInfo: {
      url: HOST_URL + "briberyMoney/myRankingInfo",
      method: "GET"
    },
    selfHongBao: { url: HOST_URL + "briberyMoney/test", method: "GET" }
  }),
  (APITool.bill = {
    getPaymentList: {
      url: HOST_URL_LL + "statistics/getPaymentList",
      method: "GET"
    },
    getSalesStatisticsList: {
      url: HOST_URL_LL + "statistics/getSalesStatisticsList",
      method: "GET"
    }
  }),
  (APITool.football = {
    queryRule: { url: HOST_URL + "football/queryRule", method: "POST" }
  }),
  (APITool.log = {
    actionLog: {
      url: HOST_URL + "user/whoAmIForMobile/actionLog",
      method: "GET"
    }
  }),
  (APITool.pic = {
    pic: { url: HOST_URL_3 + "pic/joinPic", method: "GET" },
    psnPic: { url: HOST_URL_3 + "pic/psnPic", method: "GET" },
    ticketPic: { url: HOST_URL_3 + "pic/ticketPic", method: "GET" },
    autoOrderPic: { url: HOST_URL_3 + "pic/autoOrderPic", method: "GET" },
    proxyPic: { url: HOST_URL_3 + "pic/proxyPic", method: "GET" }
  }),
  (APITool.mes = {
    createAppUser: { url: HOST_URL_MES1 + "app/createAppUser", method: "GET" },
    queryRecentMsg: {
      url: HOST_URL_MES2 + "push/queryRecentMsg",
      method: "GET"
    }
  }),
  (APITool.briberyMoneyOrder = {
    canOpen: { url: HOST_URL + "briberyMoneyOrder/canOpen", method: "GET" },
    doRun: { url: HOST_URL + "briberyMoneyOrder/doRun", method: "GET" },
    getPaymentById: {
      url: HOST_URL + "briberyMoneyOrder/getPaymentById",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    myPaymentById: {
      url: HOST_URL + "briberyMoneyOrder/myPaymentById",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    myPayments: {
      url: HOST_URL + "briberyMoneyOrder/myPayments",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    getLianLianPayLoad: {
      url: HOST_URL + "briberyMoneyOrder/getLianLianPayLoad",
      method: "GET"
    },
    getLianLianBankPay: {
      url: HOST_URL + "briberyMoneyOrder/getLianLianBankPay",
      method: "GET"
    },
    getLianLianBalancePay: {
      url: HOST_URL + "briberyMoneyOrder/getLianLianBalancePay",
      method: "GET"
    },
    withdrawCash: {
      url: HOST_URL + "briberyMoneyOrder/withdrawCash",
      method: "GET"
    },
    getInfoByOrderId: {
      url: HOST_URL + "briberyMoneyOrder/getInfoByOrderId",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    directPlace: {
      url: HOST_URL_R3 + "briberyMoneyOrder/directPlace",
      method: "POST"
    },
    myBriberyMoney: {
      url: HOST_URL + "briberyMoneyOrder/myBriberyMoney",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    query: {
      url: HOST_URL + "briberyMoneyOrder/query",
      relink: HOST_URL_RELINK,
      method: "POST"
    }
  }),
  (APITool.articleOrder = {
    getLianLianPayLoad: {
      url: HOST_URL + "article/getLianLianPayLoad",
      method: "GET"
    }
  }),
  (APITool.orderBriberyMoney = {
    canOpen: { url: HOST_URL + "orderBriberyMoney/canOpen", method: "GET" },
    doRun: { url: HOST_URL + "orderBriberyMoney/doRun", method: "GET" }
  }),
  (APITool.winOrderBriberyMoney = {
    canOpen: { url: HOST_URL + "winOrderBriberyMoney/canOpen", method: "GET" },
    doRun: { url: HOST_URL + "winOrderBriberyMoney/doRun", method: "GET" }
  }),
  (APITool.shopAgent = {
    query: { url: HOST_URL + "shopAgent/query", method: "POST" },
    getFullInfo: { url: HOST_URL + "shopAgent/getFullInfo", method: "GET" },
    getShopAgentCount: {
      url: HOST_URL + "shopAgent/getShopAgentCount",
      method: "GET"
    },
    validate: { url: HOST_URL + "shopAgent/validate", method: "GET" },
    save: { url: HOST_URL + "shopAgent/save", method: "POST" },
    myAgentInfo: { url: HOST_URL + "shopAgent/myAgentInfo", method: "POST" },
    update: { url: HOST_URL + "shopAgent/update", method: "POST" },
    saveUserAgent: {
      url: HOST_URL + "shopAgent/saveUserAgent",
      method: "POST"
    },
    getAmountCommission: {
      url: HOST_URL + "shopAgent/getAmountCommission",
      method: "GET"
    },
    getFullAmountCommission: {
      url: HOST_URL + "shopAgent/getFullAmountCommission",
      method: "GET"
    },
    getAgentDailyOverview: {
      url: HOST_URL + "shopAgent/getAgentDailyOverview",
      method: "GET"
    },
    getAgentPlacerOverviews: {
      url: HOST_URL + "shopAgent/getAgentPlacerOverviews",
      method: "GET"
    },
    getAgentPersonAccount: {
      url: HOST_URL + "shopAgent/getAgentPersonAccount",
      method: "GET"
    },
    queryUserAgent: {
      url: HOST_URL + "shopAgent/queryUserAgent",
      method: "POST"
    },
    queryHelpList: { url: HOST_URL_LL + "helpCenter/list", method: "POST" }
  }),
  (APITool.lotteryRed = {
    getLianLianPayLoad: {
      url: HOST_URL + "lotteryRed/getLianLianPayLoad",
      method: "GET"
    }
  }),
  (APITool.statistics = {
    getOthersInfo: {
      url: HOST_URL + "statistics/getOthersInfo",
      relink: HOST_URL_RELINK,
      method: "GET"
    },
    getStoreData: {
      url: HOST_URL_LL + "statistics/getShopDailyDate",
      method: "GET"
    },
    getSalesStatisticsDetail: {
      url: HOST_URL_LL + "statistics/getSalesStatisticsDetail",
      method: "GET"
    }
  }),
  (APITool.autoOrder = {
    directPlace: { url: HOST_URL + "autoOrder/directPlace", method: "POST" },
    getLianLianPayLoadOfPlace: {
      url: HOST_URL + "autoOrder/getLianLianPayLoadOfPlace",
      method: "GET"
    },
    getLianLianBankPayOfPlace: {
      url: HOST_URL + "autoOrder/getLianLianBankPayOfPlace",
      method: "GET"
    },
    getLianLianBalancePayOfPlace: {
      url: HOST_URL + "autoOrder/getLianLianBalancePayOfPlace",
      method: "GET"
    },
    payByTranBalanceOfPlace: {
      url: HOST_URL + "autoOrder/payByTranBalanceOfPlace",
      method: "GET"
    },
    directPlaceOfJoint: {
      url: HOST_URL + "autoOrder/directPlaceOfJoint",
      method: "POST"
    },
    getLianLianPayLoadOfJoint: {
      url: HOST_URL + "autoOrder/getLianLianPayLoadOfJoint",
      method: "GET"
    },
    getLianLianBankPayOfJoint: {
      url: HOST_URL + "autoOrder/getLianLianBankPayOfJoint",
      method: "GET"
    },
    getLianLianBalancePayOfJoint: {
      url: HOST_URL + "autoOrder/getLianLianBalancePayOfJoint",
      method: "GET"
    },
    payByTranBalanceOfJoint: {
      url: HOST_URL + "autoOrder/payByTranBalanceOfJoint",
      method: "GET"
    },
    subscribe: { url: HOST_URL + "autoOrder/subscribe", method: "POST" },
    myOrders: { url: HOST_URL + "autoOrder/myOrders", method: "GET" },
    myOrdersWithoutItem: {
      url: HOST_URL + "autoOrder/myOrdersWithoutItem",
      method: "GET"
    },
    query: { url: HOST_URL + "autoOrder/query", method: "POST" },
    queryWithoutItem: {
      url: HOST_URL + "autoOrder/queryWithoutItem",
      method: "POST"
    },
    queryJoint: { url: HOST_URL + "autoOrder/queryJoint", method: "POST" },
    queryJointWithoutItem: {
      url: HOST_URL + "autoOrder/queryJointWithoutItem",
      method: "POST"
    },
    theOrdersWithoutItem: {
      url: HOST_URL + "autoOrder/theOrdersWithoutItem",
      method: "GET"
    },
    getDetailWithOrders: {
      url: HOST_URL + "autoOrder/getDetailWithOrders",
      method: "GET"
    },
    getJointDetailWithOrders: {
      url: HOST_URL + "autoOrder/getJointDetailWithOrders",
      method: "GET"
    },
    getUnPayedList: {
      url: HOST_URL + "autoOrder/getUnPayedList",
      method: "GET"
    },
    getJointOrderDetailForWeixin: {
      url: HOST_URL + "autoOrder/getJointOrderDetailForWeixin",
      method: "GET"
    },
    getJointOrderDetail: {
      url: HOST_URL + "autoOrder/getJointOrderDetail",
      method: "GET"
    },
    getOrderDetail: {
      url: HOST_URL + "autoOrder/getOrderDetail",
      method: "GET"
    },
    collected: { url: HOST_URL + "autoOrder/collected", method: "GET" },
    getBrowseUserNum: {
      url: HOST_URL + "autoOrder/getBrowseUserNum",
      method: "GET"
    },
    getCollectedUserNum: {
      url: HOST_URL + "autoOrder/getCollectedUserNum",
      method: "GET"
    },
    getCollectedUsers: {
      url: HOST_URL + "autoOrder/getCollectedUsers",
      method: "GET"
    },
    myFullJointOrder: {
      url: HOST_URL + "autoOrder/myFullJointOrder",
      method: "GET"
    }
  }),
  (APITool.peekAutoOrder = {
    directPlace: {
      url: HOST_URL + "peekAutoOrder/directPlace",
      method: "POST"
    },
    getLianLianPayLoad: {
      url: HOST_URL + "peekAutoOrder/getLianLianPayLoad",
      method: "GET"
    },
    getLianLianBankPay: {
      url: HOST_URL + "peekAutoOrder/getLianLianBankPay",
      method: "GET"
    },
    getLianLianBalancePay: {
      url: HOST_URL + "peekAutoOrder/getLianLianBalancePay",
      method: "GET"
    },
    payByTranBalance: {
      url: HOST_URL + "peekAutoOrder/payByTranBalance",
      method: "GET"
    },
    hasPayed: { url: HOST_URL + "peekAutoOrder/hasPayed", method: "GET" }
  }),
  define("config/api_config", function() {}),
  (Tip = {
    alert: function(e, t, o) {
      (o = o || 2e3), clearTimeout(window.tipsTimer);
      var r = $('<div class="db-tip">' + e + "</div>");
      $("body").append(r),
        (window.tipsTimer = setTimeout(function() {
          $(".db-tip").remove(), t && t();
        }, o));
    },
    confirm: function(e) {
      (e.title = e.title || ""),
        (e.content = e.content || ""),
        (e.cancel = e.cancel || "取消"),
        (e.ok = e.ok || "确认"),
        (e.success = e.success || function() {}),
        (e.cancelFunc = e.cancelFunc || function() {});
      var t = $(
        '<div class="weui_dialog_confirm"><div class="weui_mask"></div><div class="weui_dialog"><div class="weui_dialog_hd"><strong class="weui_dialog_title">' +
          e.title +
          '</strong></div><div class="weui_dialog_hd" style="font-size: 14px;">' +
          e.content +
          '</div><div class="weui_dialog_ft"><a href="javascript:;" class="weui_btn_dialog default close">' +
          e.cancel +
          '</a><a href="javascript:;" class="weui_btn_dialog primary ok">' +
          e.ok +
          "</a></div></div></div>"
      );
      $("body").append(t),
        t.find(".weui_btn_dialog.close").on("click", function() {
          t.remove(),
            e.cancelFunc && "function" == typeof e.cancelFunc && e.cancelFunc();
        }),
        t.find(".weui_btn_dialog.ok").on("click", function() {
          e.success && "function" == typeof e.success && e.success(t);
        });
    },
    msg: function() {}
  }),
  (UtilTool = {
    updateUrl: function(e, t) {
      var t = (t || "t") + "=",
        o = new RegExp(t + "\\d+"),
        r = +new Date();
      if (e.indexOf(t) > -1) return e.replace(o, t + r);
      if (e.indexOf("?") > -1) {
        var n = e.split("?");
        return n[1] ? n[0] + "?" + t + r + "&" + n[1] : n[0] + "?" + t + r;
      }
      return e.indexOf("#") > -1
        ? e.split("#")[0] + "?" + t + r + location.hash
        : e + "?" + t + r;
    },
    initScrollEvent: function(e) {
      $(window).on("scroll", function() {
        var t = document.documentElement.scrollTop || document.body.scrollTop,
          o = document.documentElement.clientHeight,
          r = document.documentElement.offsetHeight;
        if (150 > r - (t + o)) {
          if (e.page >= e.totalPages && e.totalPages >= 1) return;
          e.doLoading ||
            (e.page++, $(".preloader").show(), e.listHandler(e.page));
        }
      });
    },
    initScrollEvent2: function(e) {
      $(window).on("scroll", function() {
        var t = document.documentElement.scrollTop || document.body.scrollTop,
          o = document.documentElement.clientHeight,
          r = document.documentElement.offsetHeight;
        if (150 > r - (t + o))
          if (1 === e.tt) {
            if (e.page >= e.totalPages && e.totalPages >= 1) return;
            e.doLoading ||
              (e.page++, $(".preloader").show(), e.listHandler(e.page));
          } else if (2 === e.tt) {
            if (e.page2 >= e.totalPages2 && e.totalPages2 >= 1) return;
            e.doLoading ||
              (e.page2++, $(".preloader").show(), e.listAutoHandler(e.page2));
          }
      });
    },
    initScrollFooterAnimate: function() {
      (window.isMenuAnimate = !1),
        (window.scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop),
        $(window).on("scroll", function() {
          if (!isMenuAnimate) {
            var e =
              document.documentElement.scrollTop || document.body.scrollTop;
            if (e >= 0) {
              var t = e - window.scrollTop;
              (t > 40 || -20 > t) &&
                ((window.isMenuAnimate = !0),
                $(".mainMenu").animate(
                  { height: t > 0 ? "0px" : "56px" },
                  60,
                  function() {
                    t > 0
                      ? $(this).css("display", "none")
                      : $(this).css("display", "block"),
                      (window.isMenuAnimate = !1);
                  }
                ),
                (window.scrollTop = e));
            }
          }
        });
    },
    initSize: function(e) {
      (e = e || 20),
        (function(t, o) {
          var r = t.documentElement,
            n = "orientationchange" in window ? "orientationchange" : "resize",
            a = function() {
              var t = r.clientWidth;
              t && (r.style.fontSize = e * (t / 320) + "px");
            };
          a(),
            t.addEventListener &&
              (o.addEventListener(n, a, !1),
              t.addEventListener("DOMContentLoaded", a, !1));
        })(document, window);
    },
    isWeiXin: function() {
      var e = window.navigator.userAgent.toLowerCase();
      return (
        console.log(e), "micromessenger" == e.match(/MicroMessenger/i) ? !0 : !1
      );
    },
    isAndroid: function() {
      var e = navigator.userAgent,
        t = e.indexOf("Android") > -1 || e.indexOf("Adr") > -1;
      return t || window.android ? 1 : 0;
    },
    initFootWrap: function() {
      function e() {
        var e = window.navigator.userAgent.toLowerCase();
        return (
          console.log(e),
          "micromessenger" == e.match(/MicroMessenger/i) ? !0 : !1
        );
      }
      var t = $(".footer-wrap"),
        o = $(".footer-wrap222");
      if (e()) t && t.addClass("show"), o && o.addClass("show");
      else {
        t && t.hide(), o && o.hide();
        var r = $(".method.weixin");
        r && r.hide();
      }
    },
    enableMethodForWeiXin: function() {
      if (!UtilTool.isWeiXin()) return !1;
      {
        var e = new Date(),
          t = e.getHours(),
          o = e.getMinutes();
        e.getDay();
      }
      return (t >= 1 && 6 > t) || (6 === t && 30 > o) ? !1 : !0;
    },
    getLevelValueByPoint: function(e) {
      e = Number(e) || 0;
      var t = 1;
      return (t =
        19 >= e
          ? 1
          : 99 >= e
            ? 2
            : 499 >= e
              ? 3
              : 999 >= e
                ? 4
                : 4999 >= e
                  ? 5
                  : 24999 >= e
                    ? 6
                    : 99999 >= e
                      ? 7
                      : 249999 >= e
                        ? 8
                        : 999999 >= e
                          ? 9
                          : 2499999 >= e
                            ? 10
                            : 24999999 >= e
                              ? 11
                              : 12);
    },
    getLevelByPoint: function(e, t) {
      var o = UtilTool.getLevelValueByPoint(e);
      return (
        (t = Number(t) || 1),
        1 == t
          ? "url(images/v4/level_" + o + ".jpg) no-repeat center center"
          : "url(images/v4/llv_" + o + ".jpg) no-repeat center center"
      );
    },
    getLevelNameByPoint: function(e, t) {
      var o = UtilTool.getLevelValueByPoint(e);
      return (
        (t = Number(t) || 1), 1 == t ? CONST_MAP_LEVEL[o] : CONST_MAP_LEVEL_S[o]
      );
    },
    wptConfirm: function(e, t) {
      function o(e) {
        $.os &&
          $.os.android &&
          null == pushState &&
          ((pushState = { backevent: e }),
          history.pushState(
            pushState,
            document.title,
            "?backevent=" + pushState.backevent.replace(/#/g, "")
          ));
      }
      var r = !1;
      $(".wptConfirm .tip-wpt .msg").html(e),
        "undefined" != typeof t &&
          (t.text && $(".wptConfirm .btns-wpt .sure").text(t.text),
          t.text &&
            $(".wptConfirm .btns-wpt .btn-cancel").text(t.cancelText || "取消"),
          t.class && $(".wptConfirm .btns-wpt .sure").addClass(t.class),
          t.msgClass && $(".wptConfirm .tip-wpt .msg").addClass(t.msgClass)),
        $(".wptConfirm").show(),
        $(".wptConfirm .wptMask").animate({ opacity: "0.4" }, 100),
        $(".wptConfirm .dialog").animate({ bottom: "0px" }, 100),
        o("wptConfirm_view:hide"),
        $(document)
          .off("wptConfirm_view:hide")
          .one("wptConfirm_view:hide", function() {
            (r = !0), $(".wptConfirm .wptMask").animate({ opacity: "0" }, 100);
            var e = "-" + $(".wptConfirm .dialog").height() + "px";
            $(".wptConfirm .dialog").animate({ bottom: e }, 100, function() {
              $(".wptConfirm").hide();
            });
          }),
        $(".wptConfirm .btn-cancel, .wptConfirm .btn-confirm")
          .off("touchend")
          .one("touchend", function(e) {
            e.preventDefault(),
              $(document.body).trigger("wptConfirm_view:hide"),
              $(e.target).hasClass("sure")
                ? ($(document.body).trigger("wptConfirm_view:sure"),
                  "undefined" != typeof t && t.yesAction && t.yesAction())
                : $(e.target).hasClass("cancel") &&
                  ($(document.body).trigger("wptConfirm_view:hide"),
                  "undefined" != typeof t && t.noAction && t.noAction());
          });
    },
    wxUpload: function(e, t, o) {
      function r(l) {
        wx.uploadImage({
          localId: l,
          isShowProgressTips: 1,
          success: function(l) {
            i.push(l.serverId),
              n < e.length
                ? r(e[n++])
                : t.ajaxAction({
                    api: APITool.image.uploadMediaImage,
                    data: { mediaIds: i },
                    callback: function(e) {
                      avalon.each(e.list, function(e, t) {
                        a.push({ serialNo: t });
                      }),
                        o(a);
                    }
                  });
          },
          fail: function() {}
        });
      }
      var n = 0,
        a = [],
        i = [];
      if (e && e.length) {
        r(e[n++]);
      }
    },
    wxUploadOss: function(e, t, o) {
      function r(d) {
        wx.uploadImage({
          localId: d,
          isShowProgressTips: 1,
          success: function(d) {
            l.push(d.serverId),
              a < e.length
                ? r(e[a++])
                : t.ajaxAction({
                    api: APITool.image.uploadMediaImageToOss,
                    data: { mediaIds: l },
                    callback: function(e) {
                      avalon.each(e.list, function(e, t) {
                        i.push({ serialNo: t + n, thumbUrl: t + n });
                      }),
                        o(i);
                    }
                  });
          },
          fail: function() {}
        });
      }
      var n = "?x-oss-process=image/resize,m_lfit,h_800,w_800",
        a = 0,
        i = [],
        l = [];
      e && e.length && r(e[a++]);
    },
    llUpload: function(e, t, o) {
      function r(d) {
        wx.uploadImage({
          localId: d,
          isShowProgressTips: 1,
          success: function(d) {
            l.push(d.serverId),
              a < e.length
                ? r(e[a++])
                : t.ajaxAction({
                    api: APITool.image.llUpload,
                    data: { mediaIds: l },
                    callback: function(e) {
                      avalon.each(e.list, function(e, t) {
                        i.push({ serialNo: t + n, thumbUrl: t + n });
                      }),
                        o(i);
                    }
                  });
          },
          fail: function() {}
        });
      }
      var n = "?x-oss-process=image/resize,m_lfit,h_800,w_800",
        a = 0,
        i = [],
        l = [];
      e && e.length && r(e[a++]);
    },
    getQueryString: function() {
      for (
        var e = {},
          t = window.location.search.substring(1),
          o = t.split("&"),
          r = 0;
        r < o.length;
        r++
      ) {
        var n = o[r].split("=");
        if ("undefined" == typeof e[n[0]]) e[n[0]] = n[1];
        else if ("string" == typeof e[n[0]]) {
          var a = [e[n[0]], n[1]];
          e[n[0]] = a;
        } else e[n[0]].push(n[1]);
      }
      return e;
    },
    getQueryStringByName: function(e) {
      var t = location.search.match(new RegExp("[?&]" + e + "=([^&]+)", "i"));
      return null == t || t.length < 1 ? "" : t[1];
    },
    getHashString: function() {
      for (
        var e = {},
          t = window.location.hash.substring(1),
          o = t.split("&"),
          r = 0;
        r < o.length;
        r++
      ) {
        var n = o[r].split("=");
        if ("undefined" == typeof e[n[0]]) e[n[0]] = n[1];
        else if ("string" == typeof e[n[0]]) {
          var a = [e[n[0]], n[1]];
          e[n[0]] = a;
        } else e[n[0]].push(n[1]);
      }
      return e;
    },
    setCookie: function(e, t, o, r, n, a) {
      var i = new Date(),
        o = arguments[2] ? arguments[2] : 604800;
      i.setTime(i.getTime() + 1e3 * o),
        (document.cookie =
          escape(e) +
          "=" +
          escape(t) +
          (i ? ";expires=" + i.toGMTString() : "") +
          (r ? ";path=" + r : "/") +
          (n ? ";domain=" + n : "") +
          (a ? ";secure" : ""));
    },
    getCookie: function(e) {
      var t = document.cookie.indexOf(e),
        o = document.cookie.indexOf(";", t);
      return -1 == t
        ? ""
        : unescape(
            document.cookie.substring(
              t + e.length + 1,
              o > t ? o : document.cookie.length
            )
          );
    },
    delCookie: function(e, t) {
      var t = arguments[1] ? arguments[1] : null,
        o = new Date();
      o.setTime(o.getTime() - 1);
      var r = this.getCookie(e);
      null != r &&
        (document.cookie = e + "=" + t + ";expires=" + o.toGMTString());
    },
    preventDefault: function(e) {
      e && (e.preventDefault ? e.preventDefault() : (e.returnValue = !1));
    },
    stopPropagation: function(e) {
      e && (e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0));
    },
    validate: function(e, t) {
      function o(e) {
        return e.replace(/(^\s*)|(\s*$)/g, "");
      }
      var r = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/,
        n = /^0?(11[0-9]|12[0-9]|13[0-9]|14[0-9]||15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/,
        a = /^\d*\.?\d{0,2}$/,
        i = /(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
      return "tel" == e
        ? ((t = o(t)), n.test(t))
        : "email" == e
          ? r.test(t)
          : "money" == e
            ? a.test(t)
            : "number" == e
              ? i.test(t)
              : void 0;
    },
    is_weixin: function() {
      var e = navigator.userAgent.toLowerCase();
      return "micromessenger" == e.match(/MicroMessenger/i) ? !0 : !1;
    },
    hidePhone: function(e) {
      if (!e) return "";
      var t = e.substr(3, 4);
      return e.replace(t, "****");
    },
    is_ios: function() {
      return navigator.userAgent.indexOf("iPhone") >= 0 ? !0 : !1;
    },
    is_android: function() {
      return navigator.userAgent.indexOf("Android") >= 0 ? !0 : !1;
    },
    trimBlank: function(e) {
      var t,
        o = "g";
      return (
        (t = e.replace(/(^\s+)|(\s+$)/g, "")),
        "g" == o.toLowerCase() && (t = t.replace(/\s/g, "")),
        t
      );
    },
    initApiUrl: function(e) {
      return UtilTool.is_weixin() && !DEBUG.debug
        ? e
        : (e.indexOf("?") < 0 && (e += "?_dt=" + Math.random()),
          DEBUG.debug,
          e);
    },
    unique: function(e) {
      for (var t = [], o = 0, r = e.length; r > o; o++) {
        for (
          var n = e[o], a = 0, i = t.length;
          i > a && Number(t[a]) !== Number(n);
          a++
        );
        a === i && t.push(n);
      }
      return t;
    },
    getRandom: function(e, t, o) {
      for (var r = [], n = o ? 0 : 1; t >= n; n++) r.push(n);
      for (var a = e, i = [], n = 0; a > n; n++) {
        var l = Math.floor(Math.random() * (r.length - n));
        (i[n] = r[l]), (r[l] = r[r.length - n - 1]);
      }
      return (
        i.sort(function(e, t) {
          return e - t;
        }),
        i
      );
    },
    initPeriodsByDouble: function() {
      for (
        var e,
          t = createTimeDouble(),
          o = Number(new Date()),
          r = 0,
          n = 0,
          a = t.length;
        a > n;
        n++
      ) {
        var i = t[n];
        if (o < i.open_time) {
          (r = n - 1), (e = n);
          break;
        }
      }
      for (
        var l = t[e].issue_code, d = Math.floor(l / 1e3), u = [], n = l;
        n >= 1e3 * d + 1;
        n--
      )
        u.push({ name: n, value: n });
      return u;
    },
    initPeriodsByThree: function() {
      for (
        var e,
          t = createTimeThree(),
          o = Number(new Date()),
          r = 0,
          n = 0,
          a = t.length;
        a > n;
        n++
      ) {
        var i = t[n];
        if (o < i.open_time) {
          (r = n - 1), (e = n);
          break;
        }
      }
      for (
        var l = t[e].issue_code, d = Math.floor(l / 1e3), u = [], n = l;
        n >= 1e3 * d + 1;
        n--
      )
        u.push({ name: n, value: n });
      return u;
    },
    initPeriodsByLotto: function() {
      for (
        var e,
          t = createTimeLotto(),
          o = Number(new Date()),
          r = 0,
          n = 0,
          a = t.length;
        a > n;
        n++
      ) {
        var i = t[n];
        if (o < i.open_time) {
          (r = n - 1), (e = n);
          break;
        }
      }
      for (
        var l = t[e].issue_code, d = Math.floor(l / 1e3), u = [], n = l;
        n >= 1e3 * d + 1;
        n--
      )
        u.push({ name: n, value: n });
      return u;
    },
    initPeriodsByArrange3: function() {
      for (
        var e,
          t = createTimeArrange3(),
          o = Number(new Date()),
          r = 0,
          n = 0,
          a = t.length;
        a > n;
        n++
      ) {
        var i = t[n];
        if (o < i.open_time) {
          (r = n - 1), (e = n);
          break;
        }
      }
      for (
        var l = t[e].issue_code, d = Math.floor(l / 1e3), u = [], n = l;
        n >= 1e3 * d + 1;
        n--
      )
        u.push({ name: n, value: n });
      return u;
    },
    initPeriodsBySevenStar: function() {
      for (
        var e,
          t = createTimeSevenStar(),
          o = Number(new Date()),
          r = 0,
          n = 0,
          a = t.length;
        a > n;
        n++
      ) {
        var i = t[n];
        if (o < i.open_time) {
          (r = n - 1), (e = n);
          break;
        }
      }
      for (
        var l = t[e].issue_code, d = Math.floor(l / 1e3), u = [], n = l;
        n >= 1e3 * d + 1;
        n--
      )
        u.push({ name: n, value: n });
      return u;
    },
    initPeriodsBySevenJoy: function() {
      for (
        var e,
          t = createTimeSevenJoy(),
          o = Number(new Date()),
          r = 0,
          n = 0,
          a = t.length;
        a > n;
        n++
      ) {
        var i = t[n];
        if (o < i.open_time) {
          (r = n - 1), (e = n);
          break;
        }
      }
      for (
        var l = t[e].issue_code, d = Math.floor(l / 1e3), u = [], n = l;
        n >= 1e3 * d + 1;
        n--
      )
        u.push({ name: n, value: n });
      return u;
    },
    getOpenTime: function(e, t) {
      var o = [];
      "SHUANGSEQIU" === e
        ? (o = createTimeDouble())
        : "THREED" === e
          ? (o = createTimeThree())
          : "LOTTO" === e
            ? (o = createTimeLotto())
            : "ARRANGE3" === e
              ? (o = createTimeArrange3())
              : "ARRANGE5" === e
                ? (o = createTimeArrange3())
                : "SEVENSTAR" === e
                  ? (o = createTimeSevenStar())
                  : "SEVENJOY" === e && (o = createTimeSevenJoy());
      var r = null;
      if (
        (avalon.each(o, function(e, o) {
          o.issue_code == t && (r = o);
        }),
        !r)
      )
        return null;
      var n = avalon.filters.date(new Date(r.open_time), "yyyy-MM-dd"),
        a = new Date(r.open_time).getDay(),
        i = { 0: "日", 1: "一", 2: "二", 3: "三", 4: "四", 5: "五", 6: "六" };
      return (n += "周" + i[a]);
    },
    startUploading: function(e) {
      var t = document.querySelector("#fileId").files;
      if (t.length) {
        var o = new FormData(document.getElementById("upload_form")),
          r = new XMLHttpRequest();
        r.upload.addEventListener("progress", function() {}, !1),
          r.addEventListener(
            "load",
            function(t) {
              var o = JSON.parse(t.currentTarget.responseText);
              e && e(o);
            },
            !1
          ),
          r.addEventListener("error", function() {}, !1),
          r.open("POST", "/r/image/upload", !0),
          r.send(o);
      }
    },
    enableXuan5Handler: function(e) {
      return e.indexOf("江苏省") >= 0 ||
        e.indexOf("浙江省") >= 0 ||
        e.indexOf("安徽省") >= 0 ||
        e.indexOf("福建省") >= 0 ||
        e.indexOf("江西省") >= 0 ||
        e.indexOf("上海市") >= 0 ||
        e.indexOf("江 苏省") >= 0 ||
        e.indexOf("浙 江省") >= 0 ||
        e.indexOf("安 徽省") >= 0 ||
        e.indexOf("福 建省") >= 0 ||
        e.indexOf("江 西省") >= 0 ||
        e.indexOf("上 海市") >= 0
        ? 1
        : 0;
    },
    getEndTimeByLottery: function(e, t) {
      var o = {
          SHUANGSEQIU: "$double",
          THREED: "$three",
          ARRANGE3: "$arrange3",
          ARRANGE5: "$arrange5",
          LOTTO: "$lotto",
          SEVENSTAR: "$sevenStar",
          SEVENJOY: "$sevenJoy",
          XUAN5: "$xuan5"
        },
        r = avalon.vmodels.HeaderController[o[e]];
      return r && r.next.issue_code == t ? r.next.stop_time : 0;
    },
    timeClose: function(e, t) {
      if (!t) return 0;
      var o = new Date(t),
        r = o.getHours(),
        n = o.getMinutes(),
        a = o.getDay();
      if ((r >= 1 && 6 > r) || (6 === r && 30 > n)) return 0;
      if (((e = e || ""), e.indexOf("THREED") >= 0))
        return e.indexOf("JOINT") >= 0
          ? (19 === r && n >= 50) || (r > 19 && 21 > r)
            ? 3
            : 0
          : (19 === r && n >= 30) || (r > 19 && 21 > r)
            ? 3
            : 0;
      if (e.indexOf("ARRANGE3") >= 0)
        return e.indexOf("JOINT") >= 0
          ? (19 === r && n >= 22) || (r > 19 && 21 > r)
            ? 3
            : 0
          : r >= 19 && 21 > r
            ? 3
            : 0;
      if (e.indexOf("ARRANGE5") >= 0)
        return e.indexOf("JOINT") >= 0
          ? (19 === r && n >= 22) || (r > 19 && 21 > r)
            ? 3
            : 0
          : r >= 19 && 21 > r
            ? 3
            : 0;
      if (e.indexOf("XUAN5") >= 0)
        return e.indexOf("JOINT") >= 0
          ? 18 === r || 19 === r || (20 === r && 30 >= n)
            ? 31
            : 0
          : 18 === r || 19 === r || (20 === r && 30 >= n)
            ? 31
            : 0;
      if (e.indexOf("SHUANGSEQIU") >= 0) {
        if (e.indexOf("JOINT") >= 0) {
          if ((19 === r && n >= 22) || (r > 19 && 21 > r))
            return 0 === a || 2 === a || 4 === a ? 1 : 0;
        } else if (r >= 19 && 21 > r)
          return 0 === a || 2 === a || 4 === a ? 1 : 0;
      } else if (e.indexOf("LOTTO") >= 0) {
        if (e.indexOf("JOINT") >= 0) {
          if ((19 === r && n >= 22) || (r > 19 && 21 > r))
            return 1 === a || 3 === a || 6 === a ? 1 : 0;
        } else if (r >= 19 && 21 > r)
          return 1 === a || 3 === a || 6 === a ? 1 : 0;
      } else if (e.indexOf("SEVENSTAR") >= 0) {
        if (e.indexOf("JOINT") >= 0) {
          if ((19 === r && n >= 22) || (r > 19 && 21 > r))
            return 2 === a || 5 === a || 0 === a ? 1 : 0;
        } else if (r >= 19 && 21 > r)
          return 2 === a || 5 === a || 0 === a ? 1 : 0;
      } else if (e.indexOf("SEVENJOY") >= 0)
        if (e.indexOf("JOINT") >= 0) {
          if ((19 === r && n >= 22) || (r > 19 && 21 > r))
            return 1 === a || 3 === a || 5 === a ? 1 : 0;
        } else if (r >= 19 && 21 > r)
          return 1 === a || 3 === a || 5 === a ? 1 : 0;
      return 0;
    },
    fetchAutoPeriods: function(e, t, o) {
      var r = [];
      switch (e) {
        case "SHUANGSEQIU":
          r = avalon.vmodels.HeaderController.$double.list;
          break;
        case "THREED":
          r = avalon.vmodels.HeaderController.$three.list;
          break;
        case "LOTTO":
          r = avalon.vmodels.HeaderController.$lotto.list;
          break;
        case "ARRANGE3":
          r = avalon.vmodels.HeaderController.$arrange3.list;
          break;
        case "ARRANGE5":
          r = avalon.vmodels.HeaderController.$arrange5.list;
          break;
        case "SEVENSTAR":
          r = avalon.vmodels.HeaderController.$sevenStar.list;
          break;
        case "SEVENJOY":
          r = avalon.vmodels.HeaderController.$sevenJoy.list;
          break;
        case "XUAN5":
          r = avalon.vmodels.HeaderController.$xuan5.list;
          break;
        case "FOOTBALL":
          r = [];
      }
      for (var n = [t], a = 0; a < r.length; a++)
        if (Number(r[a].issue_code) === Number(t)) {
          for (var i = a + 1; o + a > i; i++) n.push(Number(r[i].issue_code));
          break;
        }
      return n;
    }
  }),
  define("config/tool_config", function() {});
var Zepto = (function() {
  function e(e) {
    return null == e ? String(e) : X[q.call(e)] || "object";
  }
  function n(n) {
    return "function" == e(n);
  }
  function t(e) {
    return null != e && e == e.window;
  }
  function i(e) {
    return null != e && e.nodeType == e.DOCUMENT_NODE;
  }
  function o(n) {
    return "object" == e(n);
  }
  function r(e) {
    return o(e) && !t(e) && Object.getPrototypeOf(e) == Object.prototype;
  }
  function a(e) {
    return "number" == typeof e.length;
  }
  function s(e) {
    return U.call(e, function(e) {
      return null != e;
    });
  }
  function l(e) {
    return e.length > 0 ? S.fn.concat.apply([], e) : e;
  }
  function c(e) {
    return e
      .replace(/::/g, "/")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
      .replace(/([a-z\d])([A-Z])/g, "$1_$2")
      .replace(/_/g, "-")
      .toLowerCase();
  }
  function u(e) {
    return e in C ? C[e] : (C[e] = new RegExp("(^|\\s)" + e + "(\\s|$)"));
  }
  function f(e, n) {
    return "number" != typeof n || j[c(e)] ? n : n + "px";
  }
  function d(e) {
    var n, t;
    return (
      L[e] ||
        ((n = E.createElement(e)),
        E.body.appendChild(n),
        (t = getComputedStyle(n, "").getPropertyValue("display")),
        n.parentNode.removeChild(n),
        "none" == t && (t = "block"),
        (L[e] = t)),
      L[e]
    );
  }
  function p(e) {
    return "children" in e
      ? O.call(e.children)
      : S.map(e.childNodes, function(e) {
          return 1 == e.nodeType ? e : void 0;
        });
  }
  function h(e, n) {
    var t,
      i = e ? e.length : 0;
    for (t = 0; i > t; t++) this[t] = e[t];
    (this.length = i), (this.selector = n || "");
  }
  function m(e, n, t) {
    for (b in n)
      t && (r(n[b]) || K(n[b]))
        ? (r(n[b]) && !r(e[b]) && (e[b] = {}),
          K(n[b]) && !K(e[b]) && (e[b] = []),
          m(e[b], n[b], t))
        : n[b] !== x && (e[b] = n[b]);
  }
  function g(e, n) {
    return null == n ? S(e) : S(e).filter(n);
  }
  function v(e, t, i, o) {
    return n(t) ? t.call(e, i, o) : t;
  }
  function y(e, n, t) {
    null == t ? e.removeAttribute(n) : e.setAttribute(n, t);
  }
  function I(e, n) {
    var t = e.className || "",
      i = t && t.baseVal !== x;
    return n === x
      ? i
        ? t.baseVal
        : t
      : void (i ? (t.baseVal = n) : (e.className = n));
  }
  function w(e) {
    try {
      return e
        ? "true" == e ||
            ("false" == e
              ? !1
              : "null" == e
                ? null
                : +e + "" == e
                  ? +e
                  : /^[\[\{]/.test(e)
                    ? S.parseJSON(e)
                    : e)
        : e;
    } catch (n) {
      return e;
    }
  }
  function T(e, n) {
    n(e);
    for (var t = 0, i = e.childNodes.length; i > t; t++) T(e.childNodes[t], n);
  }
  var x,
    b,
    S,
    A,
    _,
    M,
    P = [],
    k = P.concat,
    U = P.filter,
    O = P.slice,
    E = window.document,
    L = {},
    C = {},
    j = {
      "column-count": 1,
      columns: 1,
      "font-weight": 1,
      "line-height": 1,
      opacity: 1,
      "z-index": 1,
      zoom: 1
    },
    N = /^\s*<(\w+|!)[^>]*>/,
    B = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    R = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    W = /^(?:body|html)$/i,
    $ = /([A-Z])/g,
    H = ["val", "css", "html", "text", "data", "width", "height", "offset"],
    V = ["after", "prepend", "before", "append"],
    D = E.createElement("table"),
    F = E.createElement("tr"),
    J = {
      tr: E.createElement("tbody"),
      tbody: D,
      thead: D,
      tfoot: D,
      td: F,
      th: F,
      "*": E.createElement("div")
    },
    Z = /complete|loaded|interactive/,
    z = /^[\w-]*$/,
    X = {},
    q = X.toString,
    Q = {},
    G = E.createElement("div"),
    Y = {
      tabindex: "tabIndex",
      readonly: "readOnly",
      for: "htmlFor",
      class: "className",
      maxlength: "maxLength",
      cellspacing: "cellSpacing",
      cellpadding: "cellPadding",
      rowspan: "rowSpan",
      colspan: "colSpan",
      usemap: "useMap",
      frameborder: "frameBorder",
      contenteditable: "contentEditable"
    },
    K =
      Array.isArray ||
      function(e) {
        return e instanceof Array;
      };
  return (
    (Q.matches = function(e, n) {
      if (!n || !e || 1 !== e.nodeType) return !1;
      var t =
        e.webkitMatchesSelector ||
        e.mozMatchesSelector ||
        e.oMatchesSelector ||
        e.matchesSelector;
      if (t) return t.call(e, n);
      var i,
        o = e.parentNode,
        r = !o;
      return (
        r && (o = G).appendChild(e),
        (i = ~Q.qsa(o, n).indexOf(e)),
        r && G.removeChild(e),
        i
      );
    }),
    (_ = function(e) {
      return e.replace(/-+(.)?/g, function(e, n) {
        return n ? n.toUpperCase() : "";
      });
    }),
    (M = function(e) {
      return U.call(e, function(n, t) {
        return e.indexOf(n) == t;
      });
    }),
    (Q.fragment = function(e, n, t) {
      var i, o, a;
      return (
        B.test(e) && (i = S(E.createElement(RegExp.$1))),
        i ||
          (e.replace && (e = e.replace(R, "<$1></$2>")),
          n === x && (n = N.test(e) && RegExp.$1),
          n in J || (n = "*"),
          (a = J[n]),
          (a.innerHTML = "" + e),
          (i = S.each(O.call(a.childNodes), function() {
            a.removeChild(this);
          }))),
        r(t) &&
          ((o = S(i)),
          S.each(t, function(e, n) {
            H.indexOf(e) > -1 ? o[e](n) : o.attr(e, n);
          })),
        i
      );
    }),
    (Q.Z = function(e, n) {
      return new h(e, n);
    }),
    (Q.isZ = function(e) {
      return e instanceof Q.Z;
    }),
    (Q.init = function(e, t) {
      var i;
      if (!e) return Q.Z();
      if ("string" == typeof e)
        if (((e = e.trim()), "<" == e[0] && N.test(e)))
          (i = Q.fragment(e, RegExp.$1, t)), (e = null);
        else {
          if (t !== x) return S(t).find(e);
          i = Q.qsa(E, e);
        }
      else {
        if (n(e)) return S(E).ready(e);
        if (Q.isZ(e)) return e;
        if (K(e)) i = s(e);
        else if (o(e)) (i = [e]), (e = null);
        else if (N.test(e))
          (i = Q.fragment(e.trim(), RegExp.$1, t)), (e = null);
        else {
          if (t !== x) return S(t).find(e);
          i = Q.qsa(E, e);
        }
      }
      return Q.Z(i, e);
    }),
    (S = function(e, n) {
      return Q.init(e, n);
    }),
    (S.extend = function(e) {
      var n,
        t = O.call(arguments, 1);
      return (
        "boolean" == typeof e && ((n = e), (e = t.shift())),
        t.forEach(function(t) {
          m(e, t, n);
        }),
        e
      );
    }),
    (Q.qsa = function(e, n) {
      var t,
        i = "#" == n[0],
        o = !i && "." == n[0],
        r = i || o ? n.slice(1) : n,
        a = z.test(r);
      return e.getElementById && a && i
        ? (t = e.getElementById(r))
          ? [t]
          : []
        : 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType
          ? []
          : O.call(
              a && !i && e.getElementsByClassName
                ? o
                  ? e.getElementsByClassName(r)
                  : e.getElementsByTagName(n)
                : e.querySelectorAll(n)
            );
    }),
    (S.contains = E.documentElement.contains
      ? function(e, n) {
          return e !== n && e.contains(n);
        }
      : function(e, n) {
          for (; n && (n = n.parentNode); ) if (n === e) return !0;
          return !1;
        }),
    (S.type = e),
    (S.isFunction = n),
    (S.isWindow = t),
    (S.isArray = K),
    (S.isPlainObject = r),
    (S.isEmptyObject = function(e) {
      var n;
      for (n in e) return !1;
      return !0;
    }),
    (S.inArray = function(e, n, t) {
      return P.indexOf.call(n, e, t);
    }),
    (S.camelCase = _),
    (S.trim = function(e) {
      return null == e ? "" : String.prototype.trim.call(e);
    }),
    (S.uuid = 0),
    (S.support = {}),
    (S.expr = {}),
    (S.noop = function() {}),
    (S.map = function(e, n) {
      var t,
        i,
        o,
        r = [];
      if (a(e))
        for (i = 0; i < e.length; i++) (t = n(e[i], i)), null != t && r.push(t);
      else for (o in e) (t = n(e[o], o)), null != t && r.push(t);
      return l(r);
    }),
    (S.each = function(e, n) {
      var t, i;
      if (a(e)) {
        for (t = 0; t < e.length; t++)
          if (n.call(e[t], t, e[t]) === !1) return e;
      } else for (i in e) if (n.call(e[i], i, e[i]) === !1) return e;
      return e;
    }),
    (S.grep = function(e, n) {
      return U.call(e, n);
    }),
    window.JSON && (S.parseJSON = JSON.parse),
    S.each(
      "Boolean Number String Function Array Date RegExp Object Error".split(
        " "
      ),
      function(e, n) {
        X["[object " + n + "]"] = n.toLowerCase();
      }
    ),
    (S.fn = {
      constructor: Q.Z,
      length: 0,
      forEach: P.forEach,
      reduce: P.reduce,
      push: P.push,
      sort: P.sort,
      splice: P.splice,
      indexOf: P.indexOf,
      concat: function() {
        var e,
          n,
          t = [];
        for (e = 0; e < arguments.length; e++)
          (n = arguments[e]), (t[e] = Q.isZ(n) ? n.toArray() : n);
        return k.apply(Q.isZ(this) ? this.toArray() : this, t);
      },
      map: function(e) {
        return S(
          S.map(this, function(n, t) {
            return e.call(n, t, n);
          })
        );
      },
      slice: function() {
        return S(O.apply(this, arguments));
      },
      ready: function(e) {
        return (
          Z.test(E.readyState) && E.body
            ? e(S)
            : E.addEventListener(
                "DOMContentLoaded",
                function() {
                  e(S);
                },
                !1
              ),
          this
        );
      },
      get: function(e) {
        return e === x ? O.call(this) : this[e >= 0 ? e : e + this.length];
      },
      toArray: function() {
        return this.get();
      },
      size: function() {
        return this.length;
      },
      remove: function() {
        return this.each(function() {
          null != this.parentNode && this.parentNode.removeChild(this);
        });
      },
      each: function(e) {
        return (
          P.every.call(this, function(n, t) {
            return e.call(n, t, n) !== !1;
          }),
          this
        );
      },
      filter: function(e) {
        return n(e)
          ? this.not(this.not(e))
          : S(
              U.call(this, function(n) {
                return Q.matches(n, e);
              })
            );
      },
      add: function(e, n) {
        return S(M(this.concat(S(e, n))));
      },
      is: function(e) {
        return this.length > 0 && Q.matches(this[0], e);
      },
      not: function(e) {
        var t = [];
        if (n(e) && e.call !== x)
          this.each(function(n) {
            e.call(this, n) || t.push(this);
          });
        else {
          var i =
            "string" == typeof e
              ? this.filter(e)
              : a(e) && n(e.item)
                ? O.call(e)
                : S(e);
          this.forEach(function(e) {
            i.indexOf(e) < 0 && t.push(e);
          });
        }
        return S(t);
      },
      has: function(e) {
        return this.filter(function() {
          return o(e)
            ? S.contains(this, e)
            : S(this)
                .find(e)
                .size();
        });
      },
      eq: function(e) {
        return -1 === e ? this.slice(e) : this.slice(e, +e + 1);
      },
      first: function() {
        var e = this[0];
        return e && !o(e) ? e : S(e);
      },
      last: function() {
        var e = this[this.length - 1];
        return e && !o(e) ? e : S(e);
      },
      find: function(e) {
        var n,
          t = this;
        return (n = e
          ? "object" == typeof e
            ? S(e).filter(function() {
                var e = this;
                return P.some.call(t, function(n) {
                  return S.contains(n, e);
                });
              })
            : 1 == this.length
              ? S(Q.qsa(this[0], e))
              : this.map(function() {
                  return Q.qsa(this, e);
                })
          : S());
      },
      closest: function(e, n) {
        var t = this[0],
          o = !1;
        for (
          "object" == typeof e && (o = S(e));
          t && !(o ? o.indexOf(t) >= 0 : Q.matches(t, e));

        )
          t = t !== n && !i(t) && t.parentNode;
        return S(t);
      },
      parents: function(e) {
        for (var n = [], t = this; t.length > 0; )
          t = S.map(t, function(e) {
            return (e = e.parentNode) && !i(e) && n.indexOf(e) < 0
              ? (n.push(e), e)
              : void 0;
          });
        return g(n, e);
      },
      parent: function(e) {
        return g(M(this.pluck("parentNode")), e);
      },
      children: function(e) {
        return g(
          this.map(function() {
            return p(this);
          }),
          e
        );
      },
      contents: function() {
        return this.map(function() {
          return this.contentDocument || O.call(this.childNodes);
        });
      },
      siblings: function(e) {
        return g(
          this.map(function(e, n) {
            return U.call(p(n.parentNode), function(e) {
              return e !== n;
            });
          }),
          e
        );
      },
      empty: function() {
        return this.each(function() {
          this.innerHTML = "";
        });
      },
      pluck: function(e) {
        return S.map(this, function(n) {
          return n[e];
        });
      },
      show: function() {
        return this.each(function() {
          "none" == this.style.display && (this.style.display = ""),
            "none" == getComputedStyle(this, "").getPropertyValue("display") &&
              (this.style.display = d(this.nodeName));
        });
      },
      replaceWith: function(e) {
        return this.before(e).remove();
      },
      wrap: function(e) {
        var t = n(e);
        if (this[0] && !t)
          var i = S(e).get(0),
            o = i.parentNode || this.length > 1;
        return this.each(function(n) {
          S(this).wrapAll(t ? e.call(this, n) : o ? i.cloneNode(!0) : i);
        });
      },
      wrapAll: function(e) {
        if (this[0]) {
          S(this[0]).before((e = S(e)));
          for (var n; (n = e.children()).length; ) e = n.first();
          S(e).append(this);
        }
        return this;
      },
      wrapInner: function(e) {
        var t = n(e);
        return this.each(function(n) {
          var i = S(this),
            o = i.contents(),
            r = t ? e.call(this, n) : e;
          o.length ? o.wrapAll(r) : i.append(r);
        });
      },
      unwrap: function() {
        return (
          this.parent().each(function() {
            S(this).replaceWith(S(this).children());
          }),
          this
        );
      },
      clone: function() {
        return this.map(function() {
          return this.cloneNode(!0);
        });
      },
      hide: function() {
        return this.css("display", "none");
      },
      toggle: function(e) {
        return this.each(function() {
          var n = S(this);
          (e === x ? "none" == n.css("display") : e) ? n.show() : n.hide();
        });
      },
      prev: function(e) {
        return S(this.pluck("previousElementSibling")).filter(e || "*");
      },
      next: function(e) {
        return S(this.pluck("nextElementSibling")).filter(e || "*");
      },
      html: function(e) {
        return 0 in arguments
          ? this.each(function(n) {
              var t = this.innerHTML;
              S(this)
                .empty()
                .append(v(this, e, n, t));
            })
          : 0 in this
            ? this[0].innerHTML
            : null;
      },
      text: function(e) {
        return 0 in arguments
          ? this.each(function(n) {
              var t = v(this, e, n, this.textContent);
              this.textContent = null == t ? "" : "" + t;
            })
          : 0 in this
            ? this.pluck("textContent").join("")
            : null;
      },
      attr: function(e, n) {
        var t;
        return "string" != typeof e || 1 in arguments
          ? this.each(function(t) {
              if (1 === this.nodeType)
                if (o(e)) for (b in e) y(this, b, e[b]);
                else y(this, e, v(this, n, t, this.getAttribute(e)));
            })
          : this.length && 1 === this[0].nodeType
            ? !(t = this[0].getAttribute(e)) && e in this[0]
              ? this[0][e]
              : t
            : x;
      },
      removeAttr: function(e) {
        return this.each(function() {
          1 === this.nodeType &&
            e.split(" ").forEach(function(e) {
              y(this, e);
            }, this);
        });
      },
      prop: function(e, n) {
        return (
          (e = Y[e] || e),
          1 in arguments
            ? this.each(function(t) {
                this[e] = v(this, n, t, this[e]);
              })
            : this[0] && this[0][e]
        );
      },
      data: function(e, n) {
        var t = "data-" + e.replace($, "-$1").toLowerCase(),
          i = 1 in arguments ? this.attr(t, n) : this.attr(t);
        return null !== i ? w(i) : x;
      },
      val: function(e) {
        return 0 in arguments
          ? this.each(function(n) {
              this.value = v(this, e, n, this.value);
            })
          : this[0] &&
              (this[0].multiple
                ? S(this[0])
                    .find("option")
                    .filter(function() {
                      return this.selected;
                    })
                    .pluck("value")
                : this[0].value);
      },
      offset: function(e) {
        if (e)
          return this.each(function(n) {
            var t = S(this),
              i = v(this, e, n, t.offset()),
              o = t.offsetParent().offset(),
              r = { top: i.top - o.top, left: i.left - o.left };
            "static" == t.css("position") && (r.position = "relative"),
              t.css(r);
          });
        if (!this.length) return null;
        if (!S.contains(E.documentElement, this[0])) return { top: 0, left: 0 };
        var n = this[0].getBoundingClientRect();
        return {
          left: n.left + window.pageXOffset,
          top: n.top + window.pageYOffset,
          width: Math.round(n.width),
          height: Math.round(n.height)
        };
      },
      css: function(n, t) {
        if (arguments.length < 2) {
          var i,
            o = this[0];
          if (!o) return;
          if (((i = getComputedStyle(o, "")), "string" == typeof n))
            return o.style[_(n)] || i.getPropertyValue(n);
          if (K(n)) {
            var r = {};
            return (
              S.each(n, function(e, n) {
                r[n] = o.style[_(n)] || i.getPropertyValue(n);
              }),
              r
            );
          }
        }
        var a = "";
        if ("string" == e(n))
          t || 0 === t
            ? (a = c(n) + ":" + f(n, t))
            : this.each(function() {
                this.style.removeProperty(c(n));
              });
        else
          for (b in n)
            n[b] || 0 === n[b]
              ? (a += c(b) + ":" + f(b, n[b]) + ";")
              : this.each(function() {
                  this.style.removeProperty(c(b));
                });
        return this.each(function() {
          this.style.cssText += ";" + a;
        });
      },
      index: function(e) {
        return e
          ? this.indexOf(S(e)[0])
          : this.parent()
              .children()
              .indexOf(this[0]);
      },
      hasClass: function(e) {
        return e
          ? P.some.call(
              this,
              function(e) {
                return this.test(I(e));
              },
              u(e)
            )
          : !1;
      },
      addClass: function(e) {
        return e
          ? this.each(function(n) {
              if ("className" in this) {
                A = [];
                var t = I(this),
                  i = v(this, e, n, t);
                i.split(/\s+/g).forEach(function(e) {
                  S(this).hasClass(e) || A.push(e);
                }, this),
                  A.length && I(this, t + (t ? " " : "") + A.join(" "));
              }
            })
          : this;
      },
      removeClass: function(e) {
        return this.each(function(n) {
          if ("className" in this) {
            if (e === x) return I(this, "");
            (A = I(this)),
              v(this, e, n, A)
                .split(/\s+/g)
                .forEach(function(e) {
                  A = A.replace(u(e), " ");
                }),
              I(this, A.trim());
          }
        });
      },
      toggleClass: function(e, n) {
        return e
          ? this.each(function(t) {
              var i = S(this),
                o = v(this, e, t, I(this));
              o.split(/\s+/g).forEach(function(e) {
                (n === x
                ? !i.hasClass(e)
                : n)
                  ? i.addClass(e)
                  : i.removeClass(e);
              });
            })
          : this;
      },
      scrollTop: function(e) {
        if (this.length) {
          var n = "scrollTop" in this[0];
          return e === x
            ? n
              ? this[0].scrollTop
              : this[0].pageYOffset
            : this.each(
                n
                  ? function() {
                      this.scrollTop = e;
                    }
                  : function() {
                      this.scrollTo(this.scrollX, e);
                    }
              );
        }
      },
      scrollLeft: function(e) {
        if (this.length) {
          var n = "scrollLeft" in this[0];
          return e === x
            ? n
              ? this[0].scrollLeft
              : this[0].pageXOffset
            : this.each(
                n
                  ? function() {
                      this.scrollLeft = e;
                    }
                  : function() {
                      this.scrollTo(e, this.scrollY);
                    }
              );
        }
      },
      position: function() {
        if (this.length) {
          var e = this[0],
            n = this.offsetParent(),
            t = this.offset(),
            i = W.test(n[0].nodeName) ? { top: 0, left: 0 } : n.offset();
          return (
            (t.top -= parseFloat(S(e).css("margin-top")) || 0),
            (t.left -= parseFloat(S(e).css("margin-left")) || 0),
            (i.top += parseFloat(S(n[0]).css("border-top-width")) || 0),
            (i.left += parseFloat(S(n[0]).css("border-left-width")) || 0),
            { top: t.top - i.top, left: t.left - i.left }
          );
        }
      },
      offsetParent: function() {
        return this.map(function() {
          for (
            var e = this.offsetParent || E.body;
            e && !W.test(e.nodeName) && "static" == S(e).css("position");

          )
            e = e.offsetParent;
          return e;
        });
      }
    }),
    (S.fn.detach = S.fn.remove),
    ["width", "height"].forEach(function(e) {
      var n = e.replace(/./, function(e) {
        return e[0].toUpperCase();
      });
      S.fn[e] = function(o) {
        var r,
          a = this[0];
        return o === x
          ? t(a)
            ? a["inner" + n]
            : i(a)
              ? a.documentElement["scroll" + n]
              : (r = this.offset()) && r[e]
          : this.each(function(n) {
              (a = S(this)), a.css(e, v(this, o, n, a[e]()));
            });
      };
    }),
    V.forEach(function(n, t) {
      var i = t % 2;
      (S.fn[n] = function() {
        var n,
          o,
          r = S.map(arguments, function(t) {
            return (
              (n = e(t)),
              "object" == n || "array" == n || null == t ? t : Q.fragment(t)
            );
          }),
          a = this.length > 1;
        return r.length < 1
          ? this
          : this.each(function(e, n) {
              (o = i ? n : n.parentNode),
                (n =
                  0 == t
                    ? n.nextSibling
                    : 1 == t
                      ? n.firstChild
                      : 2 == t
                        ? n
                        : null);
              var s = S.contains(E.documentElement, o);
              r.forEach(function(e) {
                if (a) e = e.cloneNode(!0);
                else if (!o) return S(e).remove();
                o.insertBefore(e, n),
                  s &&
                    T(e, function(e) {
                      null == e.nodeName ||
                        "SCRIPT" !== e.nodeName.toUpperCase() ||
                        (e.type && "text/javascript" !== e.type) ||
                        e.src ||
                        window.eval.call(window, e.innerHTML);
                    });
              });
            });
      }),
        (S.fn[i ? n + "To" : "insert" + (t ? "Before" : "After")] = function(
          e
        ) {
          return S(e)[n](this), this;
        });
    }),
    (Q.Z.prototype = h.prototype = S.fn),
    (Q.uniq = M),
    (Q.deserializeValue = w),
    (S.zepto = Q),
    S
  );
})();
(window.Zepto = Zepto),
  void 0 === window.$ && (window.$ = Zepto),
  (function(e) {
    function n(n, t, i) {
      var o = e.Event(t);
      return e(n).trigger(o, i), !o.isDefaultPrevented();
    }
    function t(e, t, i, o) {
      return e.global ? n(t || y, i, o) : void 0;
    }
    function i(n) {
      n.global && 0 === e.active++ && t(n, null, "ajaxStart");
    }
    function o(n) {
      n.global && !--e.active && t(n, null, "ajaxStop");
    }
    function r(e, n) {
      var i = n.context;
      return n.beforeSend.call(i, e, n) === !1 ||
        t(n, i, "ajaxBeforeSend", [e, n]) === !1
        ? !1
        : void t(n, i, "ajaxSend", [e, n]);
    }
    function a(e, n, i, o) {
      var r = i.context,
        a = "success";
      i.success.call(r, e, a, n),
        o && o.resolveWith(r, [e, a, n]),
        t(i, r, "ajaxSuccess", [n, i, e]),
        l(a, n, i);
    }
    function s(e, n, i, o, r) {
      var a = o.context;
      o.error.call(a, i, n, e),
        r && r.rejectWith(a, [i, n, e]),
        t(o, a, "ajaxError", [i, o, e || n]),
        l(n, i, o);
    }
    function l(e, n, i) {
      var r = i.context;
      i.complete.call(r, n, e), t(i, r, "ajaxComplete", [n, i]), o(i);
    }
    function c() {}
    function u(e) {
      return (
        e && (e = e.split(";", 2)[0]),
        (e &&
          (e == b
            ? "html"
            : e == x
              ? "json"
              : w.test(e)
                ? "script"
                : T.test(e) && "xml")) ||
          "text"
      );
    }
    function f(e, n) {
      return "" == n ? e : (e + "&" + n).replace(/[&?]{1,2}/, "?");
    }
    function d(n) {
      n.processData &&
        n.data &&
        "string" != e.type(n.data) &&
        (n.data = e.param(n.data, n.traditional)),
        !n.data ||
          (n.type && "GET" != n.type.toUpperCase()) ||
          ((n.url = f(n.url, n.data)), (n.data = void 0));
    }
    function p(n, t, i, o) {
      return (
        e.isFunction(t) && ((o = i), (i = t), (t = void 0)),
        e.isFunction(i) || ((o = i), (i = void 0)),
        { url: n, data: t, success: i, dataType: o }
      );
    }
    function h(n, t, i, o) {
      var r,
        a = e.isArray(t),
        s = e.isPlainObject(t);
      e.each(t, function(t, l) {
        (r = e.type(l)),
          o &&
            (t = i
              ? o
              : o + "[" + (s || "object" == r || "array" == r ? t : "") + "]"),
          !o && a
            ? n.add(l.name, l.value)
            : "array" == r || (!i && "object" == r)
              ? h(n, l, i, t)
              : n.add(t, l);
      });
    }
    var m,
      g,
      v = 0,
      y = window.document,
      I = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      w = /^(?:text|application)\/javascript/i,
      T = /^(?:text|application)\/xml/i,
      x = "application/json",
      b = "text/html",
      S = /^\s*$/,
      A = y.createElement("a");
    (A.href = window.location.href),
      (e.active = 0),
      (e.ajaxJSONP = function(n, t) {
        if ("type" in n) {
          var i,
            o,
            l = n.jsonpCallback,
            c = (e.isFunction(l) ? l() : l) || "jsonp" + ++v,
            u = y.createElement("script"),
            f = window[c],
            d = function(n) {
              e(u).triggerHandler("error", n || "abort");
            },
            p = { abort: d };
          return (
            t && t.promise(p),
            e(u).on("load error", function(r, l) {
              clearTimeout(o),
                e(u)
                  .off()
                  .remove(),
                "error" != r.type && i
                  ? a(i[0], p, n, t)
                  : s(null, l || "error", p, n, t),
                (window[c] = f),
                i && e.isFunction(f) && f(i[0]),
                (f = i = void 0);
            }),
            r(p, n) === !1
              ? (d("abort"), p)
              : ((window[c] = function() {
                  i = arguments;
                }),
                (u.src = n.url.replace(/\?(.+)=\?/, "?$1=" + c)),
                y.head.appendChild(u),
                n.timeout > 0 &&
                  (o = setTimeout(function() {
                    d("timeout");
                  }, n.timeout)),
                p)
          );
        }
        return e.ajax(n);
      }),
      (e.ajaxSettings = {
        type: "GET",
        beforeSend: c,
        success: c,
        error: c,
        complete: c,
        context: null,
        global: !0,
        xhr: function() {
          return new window.XMLHttpRequest();
        },
        accepts: {
          script:
            "text/javascript, application/javascript, application/x-javascript",
          json: x,
          xml: "application/xml, text/xml",
          html: b,
          text: "text/plain"
        },
        crossDomain: !1,
        timeout: 0,
        processData: !0,
        cache: !0
      }),
      (e.ajax = function(n) {
        var t,
          o,
          l = e.extend({}, n || {}),
          p = e.Deferred && e.Deferred();
        for (m in e.ajaxSettings) void 0 === l[m] && (l[m] = e.ajaxSettings[m]);
        i(l),
          l.crossDomain ||
            ((t = y.createElement("a")),
            (t.href = l.url),
            (t.href = t.href),
            (l.crossDomain =
              A.protocol + "//" + A.host != t.protocol + "//" + t.host)),
          l.url || (l.url = window.location.toString()),
          (o = l.url.indexOf("#")) > -1 && (l.url = l.url.slice(0, o)),
          d(l);
        var h = l.dataType,
          v = /\?.+=\?/.test(l.url);
        if (
          (v && (h = "jsonp"),
          (l.cache !== !1 &&
            ((n && n.cache === !0) || ("script" != h && "jsonp" != h))) ||
            (l.url = f(l.url, "_=" + Date.now())),
          "jsonp" == h)
        )
          return (
            v ||
              (l.url = f(
                l.url,
                l.jsonp ? l.jsonp + "=?" : l.jsonp === !1 ? "" : "callback=?"
              )),
            e.ajaxJSONP(l, p)
          );
        var I,
          w = l.accepts[h],
          T = {},
          x = function(e, n) {
            T[e.toLowerCase()] = [e, n];
          },
          b = /^([\w-]+:)\/\//.test(l.url)
            ? RegExp.$1
            : window.location.protocol,
          _ = l.xhr(),
          M = _.setRequestHeader;
        if (
          (p && p.promise(_),
          l.crossDomain || x("X-Requested-With", "XMLHttpRequest"),
          x("Accept", w || "*/*"),
          (w = l.mimeType || w) &&
            (w.indexOf(",") > -1 && (w = w.split(",", 2)[0]),
            _.overrideMimeType && _.overrideMimeType(w)),
          (l.contentType ||
            (l.contentType !== !1 &&
              l.data &&
              "GET" != l.type.toUpperCase())) &&
            x(
              "Content-Type",
              l.contentType || "application/x-www-form-urlencoded"
            ),
          l.headers)
        )
          for (g in l.headers) x(g, l.headers[g]);
        if (
          ((_.setRequestHeader = x),
          (_.onreadystatechange = function() {
            if (4 == _.readyState) {
              (_.onreadystatechange = c), clearTimeout(I);
              var n,
                t = !1;
              if (
                (_.status >= 200 && _.status < 300) ||
                304 == _.status ||
                (0 == _.status && "file:" == b)
              ) {
                if (
                  ((h =
                    h || u(l.mimeType || _.getResponseHeader("content-type"))),
                  "arraybuffer" == _.responseType || "blob" == _.responseType)
                )
                  n = _.response;
                else {
                  n = _.responseText;
                  try {
                    "script" == h
                      ? (1, eval)(n)
                      : "xml" == h
                        ? (n = _.responseXML)
                        : "json" == h &&
                          (n = S.test(n) ? null : e.parseJSON(n));
                  } catch (i) {
                    t = i;
                  }
                  if (t) return s(t, "parsererror", _, l, p);
                }
                a(n, _, l, p);
              } else
                s(_.statusText || null, _.status ? "error" : "abort", _, l, p);
            }
          }),
          r(_, l) === !1)
        )
          return _.abort(), s(null, "abort", _, l, p), _;
        if (l.xhrFields) for (g in l.xhrFields) _[g] = l.xhrFields[g];
        var P = "async" in l ? l.async : !0;
        _.open(l.type, l.url, P, l.username, l.password);
        for (g in T) M.apply(_, T[g]);
        return (
          l.timeout > 0 &&
            (I = setTimeout(function() {
              (_.onreadystatechange = c),
                _.abort(),
                s(null, "timeout", _, l, p);
            }, l.timeout)),
          _.send(l.data ? l.data : null),
          _
        );
      }),
      (e.get = function() {
        return e.ajax(p.apply(null, arguments));
      }),
      (e.post = function() {
        var n = p.apply(null, arguments);
        return (n.type = "POST"), e.ajax(n);
      }),
      (e.getJSON = function() {
        var n = p.apply(null, arguments);
        return (n.dataType = "json"), e.ajax(n);
      }),
      (e.fn.load = function(n, t, i) {
        if (!this.length) return this;
        var o,
          r = this,
          a = n.split(/\s/),
          s = p(n, t, i),
          l = s.success;
        return (
          a.length > 1 && ((s.url = a[0]), (o = a[1])),
          (s.success = function(n) {
            r.html(
              o
                ? e("<div>")
                    .html(n.replace(I, ""))
                    .find(o)
                : n
            ),
              l && l.apply(r, arguments);
          }),
          e.ajax(s),
          this
        );
      });
    var _ = encodeURIComponent;
    e.param = function(n, t) {
      var i = [];
      return (
        (i.add = function(n, t) {
          e.isFunction(t) && (t = t()),
            null == t && (t = ""),
            this.push(_(n) + "=" + _(t));
        }),
        h(i, n, t),
        i.join("&").replace(/%20/g, "+")
      );
    };
  })(Zepto),
  (function(e) {
    e.Callbacks = function(n) {
      n = e.extend({}, n);
      var t,
        i,
        o,
        r,
        a,
        s,
        l = [],
        c = !n.once && [],
        u = function(e) {
          for (
            t = n.memory && e, i = !0, s = r || 0, r = 0, a = l.length, o = !0;
            l && a > s;
            ++s
          )
            if (l[s].apply(e[0], e[1]) === !1 && n.stopOnFalse) {
              t = !1;
              break;
            }
          (o = !1),
            l &&
              (c ? c.length && u(c.shift()) : t ? (l.length = 0) : f.disable());
        },
        f = {
          add: function() {
            if (l) {
              var i = l.length,
                s = function(t) {
                  e.each(t, function(e, t) {
                    "function" == typeof t
                      ? (n.unique && f.has(t)) || l.push(t)
                      : t && t.length && "string" != typeof t && s(t);
                  });
                };
              s(arguments), o ? (a = l.length) : t && ((r = i), u(t));
            }
            return this;
          },
          remove: function() {
            return (
              l &&
                e.each(arguments, function(n, t) {
                  for (var i; (i = e.inArray(t, l, i)) > -1; )
                    l.splice(i, 1), o && (a >= i && --a, s >= i && --s);
                }),
              this
            );
          },
          has: function(n) {
            return !!l && !!(n ? e.inArray(n, l) > -1 : l.length);
          },
          empty: function() {
            return (a = l.length = 0), this;
          },
          disable: function() {
            return (l = c = t = void 0), this;
          },
          disabled: function() {
            return !l;
          },
          lock: function() {
            return (c = void 0), t || f.disable(), this;
          },
          locked: function() {
            return !c;
          },
          fireWith: function(e, n) {
            return (
              !l ||
                (i && !c) ||
                ((n = n || []),
                (n = [e, n.slice ? n.slice() : n]),
                o ? c.push(n) : u(n)),
              this
            );
          },
          fire: function() {
            return f.fireWith(this, arguments);
          },
          fired: function() {
            return !!i;
          }
        };
      return f;
    };
  })(Zepto),
  (function(e) {
    function n(t) {
      var i = [
          ["resolve", "done", e.Callbacks({ once: 1, memory: 1 }), "resolved"],
          ["reject", "fail", e.Callbacks({ once: 1, memory: 1 }), "rejected"],
          ["notify", "progress", e.Callbacks({ memory: 1 })]
        ],
        o = "pending",
        r = {
          state: function() {
            return o;
          },
          always: function() {
            return a.done(arguments).fail(arguments), this;
          },
          then: function() {
            var t = arguments;
            return n(function(n) {
              e.each(i, function(i, o) {
                var s = e.isFunction(t[i]) && t[i];
                a[o[1]](function() {
                  var t = s && s.apply(this, arguments);
                  if (t && e.isFunction(t.promise))
                    t
                      .promise()
                      .done(n.resolve)
                      .fail(n.reject)
                      .progress(n.notify);
                  else {
                    var i = this === r ? n.promise() : this,
                      a = s ? [t] : arguments;
                    n[o[0] + "With"](i, a);
                  }
                });
              }),
                (t = null);
            }).promise();
          },
          promise: function(n) {
            return null != n ? e.extend(n, r) : r;
          }
        },
        a = {};
      return (
        e.each(i, function(e, n) {
          var t = n[2],
            s = n[3];
          (r[n[1]] = t.add),
            s &&
              t.add(
                function() {
                  o = s;
                },
                i[1 ^ e][2].disable,
                i[2][2].lock
              ),
            (a[n[0]] = function() {
              return a[n[0] + "With"](this === a ? r : this, arguments), this;
            }),
            (a[n[0] + "With"] = t.fireWith);
        }),
        r.promise(a),
        t && t.call(a, a),
        a
      );
    }
    var t = Array.prototype.slice;
    (e.when = function(i) {
      var o,
        r,
        a,
        s = t.call(arguments),
        l = s.length,
        c = 0,
        u = 1 !== l || (i && e.isFunction(i.promise)) ? l : 0,
        f = 1 === u ? i : n(),
        d = function(e, n, i) {
          return function(r) {
            (n[e] = this),
              (i[e] = arguments.length > 1 ? t.call(arguments) : r),
              i === o ? f.notifyWith(n, i) : --u || f.resolveWith(n, i);
          };
        };
      if (l > 1)
        for (o = new Array(l), r = new Array(l), a = new Array(l); l > c; ++c)
          s[c] && e.isFunction(s[c].promise)
            ? s[c]
                .promise()
                .done(d(c, a, s))
                .fail(f.reject)
                .progress(d(c, r, o))
            : --u;
      return u || f.resolveWith(a, s), f.promise();
    }),
      (e.Deferred = n);
  })(Zepto),
  (function(e) {
    function n(e) {
      return e._zid || (e._zid = d++);
    }
    function t(e, t, r, a) {
      if (((t = i(t)), t.ns)) var s = o(t.ns);
      return (g[n(e)] || []).filter(function(e) {
        return !(
          !e ||
          (t.e && e.e != t.e) ||
          (t.ns && !s.test(e.ns)) ||
          (r && n(e.fn) !== n(r)) ||
          (a && e.sel != a)
        );
      });
    }
    function i(e) {
      var n = ("" + e).split(".");
      return {
        e: n[0],
        ns: n
          .slice(1)
          .sort()
          .join(" ")
      };
    }
    function o(e) {
      return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)");
    }
    function r(e, n) {
      return (e.del && !y && e.e in I) || !!n;
    }
    function a(e) {
      return w[e] || (y && I[e]) || e;
    }
    function s(t, o, s, l, u, d, p) {
      var h = n(t),
        m = g[h] || (g[h] = []);
      o.split(/\s/).forEach(function(n) {
        if ("ready" == n) return e(document).ready(s);
        var o = i(n);
        (o.fn = s),
          (o.sel = u),
          o.e in w &&
            (s = function(n) {
              var t = n.relatedTarget;
              return !t || (t !== this && !e.contains(this, t))
                ? o.fn.apply(this, arguments)
                : void 0;
            }),
          (o.del = d);
        var h = d || s;
        (o.proxy = function(e) {
          if (((e = c(e)), !e.isImmediatePropagationStopped())) {
            e.data = l;
            var n = h.apply(t, e._args == f ? [e] : [e].concat(e._args));
            return n === !1 && (e.preventDefault(), e.stopPropagation()), n;
          }
        }),
          (o.i = m.length),
          m.push(o),
          "addEventListener" in t &&
            t.addEventListener(a(o.e), o.proxy, r(o, p));
      });
    }
    function l(e, i, o, s, l) {
      var c = n(e);
      (i || "").split(/\s/).forEach(function(n) {
        t(e, n, o, s).forEach(function(n) {
          delete g[c][n.i],
            "removeEventListener" in e &&
              e.removeEventListener(a(n.e), n.proxy, r(n, l));
        });
      });
    }
    function c(n, t) {
      return (
        (t || !n.isDefaultPrevented) &&
          (t || (t = n),
          e.each(S, function(e, i) {
            var o = t[e];
            (n[e] = function() {
              return (this[i] = T), o && o.apply(t, arguments);
            }),
              (n[i] = x);
          }),
          (t.defaultPrevented !== f
            ? t.defaultPrevented
            : "returnValue" in t
              ? t.returnValue === !1
              : t.getPreventDefault && t.getPreventDefault()) &&
            (n.isDefaultPrevented = T)),
        n
      );
    }
    function u(e) {
      var n,
        t = { originalEvent: e };
      for (n in e) b.test(n) || e[n] === f || (t[n] = e[n]);
      return c(t, e);
    }
    var f,
      d = 1,
      p = Array.prototype.slice,
      h = e.isFunction,
      m = function(e) {
        return "string" == typeof e;
      },
      g = {},
      v = {},
      y = "onfocusin" in window,
      I = { focus: "focusin", blur: "focusout" },
      w = { mouseenter: "mouseover", mouseleave: "mouseout" };
    (v.click = v.mousedown = v.mouseup = v.mousemove = "MouseEvents"),
      (e.event = { add: s, remove: l }),
      (e.proxy = function(t, i) {
        var o = 2 in arguments && p.call(arguments, 2);
        if (h(t)) {
          var r = function() {
            return t.apply(i, o ? o.concat(p.call(arguments)) : arguments);
          };
          return (r._zid = n(t)), r;
        }
        if (m(i))
          return o
            ? (o.unshift(t[i], t), e.proxy.apply(null, o))
            : e.proxy(t[i], t);
        throw new TypeError("expected function");
      }),
      (e.fn.bind = function(e, n, t) {
        return this.on(e, n, t);
      }),
      (e.fn.unbind = function(e, n) {
        return this.off(e, n);
      }),
      (e.fn.one = function(e, n, t, i) {
        return this.on(e, n, t, i, 1);
      });
    var T = function() {
        return !0;
      },
      x = function() {
        return !1;
      },
      b = /^([A-Z]|returnValue$|layer[XY]$)/,
      S = {
        preventDefault: "isDefaultPrevented",
        stopImmediatePropagation: "isImmediatePropagationStopped",
        stopPropagation: "isPropagationStopped"
      };
    (e.fn.delegate = function(e, n, t) {
      return this.on(n, e, t);
    }),
      (e.fn.undelegate = function(e, n, t) {
        return this.off(n, e, t);
      }),
      (e.fn.live = function(n, t) {
        return e(document.body).delegate(this.selector, n, t), this;
      }),
      (e.fn.die = function(n, t) {
        return e(document.body).undelegate(this.selector, n, t), this;
      }),
      (e.fn.on = function(n, t, i, o, r) {
        var a,
          c,
          d = this;
        return n && !m(n)
          ? (e.each(n, function(e, n) {
              d.on(e, t, i, n, r);
            }),
            d)
          : (m(t) || h(o) || o === !1 || ((o = i), (i = t), (t = f)),
            (o === f || i === !1) && ((o = i), (i = f)),
            o === !1 && (o = x),
            d.each(function(f, d) {
              r &&
                (a = function(e) {
                  return l(d, e.type, o), o.apply(this, arguments);
                }),
                t &&
                  (c = function(n) {
                    var i,
                      r = e(n.target)
                        .closest(t, d)
                        .get(0);
                    return r && r !== d
                      ? ((i = e.extend(u(n), {
                          currentTarget: r,
                          liveFired: d
                        })),
                        (a || o).apply(r, [i].concat(p.call(arguments, 1))))
                      : void 0;
                  }),
                s(d, n, o, i, t, c || a);
            }));
      }),
      (e.fn.off = function(n, t, i) {
        var o = this;
        return n && !m(n)
          ? (e.each(n, function(e, n) {
              o.off(e, t, n);
            }),
            o)
          : (m(t) || h(i) || i === !1 || ((i = t), (t = f)),
            i === !1 && (i = x),
            o.each(function() {
              l(this, n, i, t);
            }));
      }),
      (e.fn.trigger = function(n, t) {
        return (
          (n = m(n) || e.isPlainObject(n) ? e.Event(n) : c(n)),
          (n._args = t),
          this.each(function() {
            n.type in I && "function" == typeof this[n.type]
              ? this[n.type]()
              : "dispatchEvent" in this
                ? this.dispatchEvent(n)
                : e(this).triggerHandler(n, t);
          })
        );
      }),
      (e.fn.triggerHandler = function(n, i) {
        var o, r;
        return (
          this.each(function(a, s) {
            (o = u(m(n) ? e.Event(n) : n)),
              (o._args = i),
              (o.target = s),
              e.each(t(s, n.type || n), function(e, n) {
                return (
                  (r = n.proxy(o)),
                  o.isImmediatePropagationStopped() ? !1 : void 0
                );
              });
          }),
          r
        );
      }),
      "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error"
        .split(" ")
        .forEach(function(n) {
          e.fn[n] = function(e) {
            return 0 in arguments ? this.bind(n, e) : this.trigger(n);
          };
        }),
      (e.Event = function(e, n) {
        m(e) || ((n = e), (e = n.type));
        var t = document.createEvent(v[e] || "Events"),
          i = !0;
        if (n) for (var o in n) "bubbles" == o ? (i = !!n[o]) : (t[o] = n[o]);
        return t.initEvent(e, i, !0), c(t);
      });
  })(Zepto),
  (function(e, n) {
    function t(e) {
      return e.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase();
    }
    function i(e) {
      return o ? o + e : e.toLowerCase();
    }
    var o,
      r,
      a,
      s,
      l,
      c,
      u,
      f,
      d,
      p,
      h = "",
      m = { Webkit: "webkit", Moz: "", O: "o" },
      g = document.createElement("div"),
      v = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
      y = {};
    e.each(m, function(e, t) {
      return g.style[e + "TransitionProperty"] !== n
        ? ((h = "-" + e.toLowerCase() + "-"), (o = t), !1)
        : void 0;
    }),
      (r = h + "transform"),
      (y[(a = h + "transition-property")] = y[
        (s = h + "transition-duration")
      ] = y[(c = h + "transition-delay")] = y[
        (l = h + "transition-timing-function")
      ] = y[(u = h + "animation-name")] = y[(f = h + "animation-duration")] = y[
        (p = h + "animation-delay")
      ] = y[(d = h + "animation-timing-function")] = ""),
      (e.fx = {
        off: o === n && g.style.transitionProperty === n,
        speeds: { _default: 400, fast: 200, slow: 600 },
        cssPrefix: h,
        transitionEnd: i("TransitionEnd"),
        animationEnd: i("AnimationEnd")
      }),
      (e.fn.animate = function(t, i, o, r, a) {
        return (
          e.isFunction(i) && ((r = i), (o = n), (i = n)),
          e.isFunction(o) && ((r = o), (o = n)),
          e.isPlainObject(i) &&
            ((o = i.easing), (r = i.complete), (a = i.delay), (i = i.duration)),
          i &&
            (i =
              ("number" == typeof i
                ? i
                : e.fx.speeds[i] || e.fx.speeds._default) / 1e3),
          a && (a = parseFloat(a) / 1e3),
          this.anim(t, i, o, r, a)
        );
      }),
      (e.fn.anim = function(i, o, h, m, g) {
        var I,
          w,
          T,
          x = {},
          b = "",
          S = this,
          A = e.fx.transitionEnd,
          _ = !1;
        if (
          (o === n && (o = e.fx.speeds._default / 1e3),
          g === n && (g = 0),
          e.fx.off && (o = 0),
          "string" == typeof i)
        )
          (x[u] = i),
            (x[f] = o + "s"),
            (x[p] = g + "s"),
            (x[d] = h || "linear"),
            (A = e.fx.animationEnd);
        else {
          w = [];
          for (I in i)
            v.test(I)
              ? (b += I + "(" + i[I] + ") ")
              : ((x[I] = i[I]), w.push(t(I)));
          b && ((x[r] = b), w.push(r)),
            o > 0 &&
              "object" == typeof i &&
              ((x[a] = w.join(", ")),
              (x[s] = o + "s"),
              (x[c] = g + "s"),
              (x[l] = h || "linear"));
        }
        return (
          (T = function(n) {
            if ("undefined" != typeof n) {
              if (n.target !== n.currentTarget) return;
              e(n.target).unbind(A, T);
            } else e(this).unbind(A, T);
            (_ = !0), e(this).css(y), m && m.call(this);
          }),
          o > 0 &&
            (this.bind(A, T),
            setTimeout(function() {
              _ || T.call(S);
            }, 1e3 * (o + g) + 25)),
          this.size() && this.get(0).clientLeft,
          this.css(x),
          0 >= o &&
            setTimeout(function() {
              S.each(function() {
                T.call(this);
              });
            }, 0),
          this
        );
      }),
      (g = null);
  })(Zepto),
  (function(e, n) {
    function t(t, i, o, r, a) {
      "function" != typeof i || a || ((a = i), (i = n));
      var s = { opacity: o };
      return (
        r && ((s.scale = r), t.css(e.fx.cssPrefix + "transform-origin", "0 0")),
        t.animate(s, i, null, a)
      );
    }
    function i(n, i, o, r) {
      return t(n, i, 0, o, function() {
        a.call(e(this)), r && r.call(this);
      });
    }
    var o = window.document,
      r = (o.documentElement, e.fn.show),
      a = e.fn.hide,
      s = e.fn.toggle;
    (e.fn.show = function(e, i) {
      return (
        r.call(this),
        e === n ? (e = 0) : this.css("opacity", 0),
        t(this, e, 1, "1,1", i)
      );
    }),
      (e.fn.hide = function(e, t) {
        return e === n ? a.call(this) : i(this, e, "0,0", t);
      }),
      (e.fn.toggle = function(t, i) {
        return t === n || "boolean" == typeof t
          ? s.call(this, t)
          : this.each(function() {
              var n = e(this);
              n["none" == n.css("display") ? "show" : "hide"](t, i);
            });
      }),
      (e.fn.fadeTo = function(e, n, i) {
        return t(this, e, n, null, i);
      }),
      (e.fn.fadeIn = function(e, n) {
        var t = this.css("opacity");
        return (
          t > 0 ? this.css("opacity", 0) : (t = 1), r.call(this).fadeTo(e, t, n)
        );
      }),
      (e.fn.fadeOut = function(e, n) {
        return i(this, e, null, n);
      }),
      (e.fn.fadeToggle = function(n, t) {
        return this.each(function() {
          var i = e(this);
          i[
            0 == i.css("opacity") || "none" == i.css("display")
              ? "fadeIn"
              : "fadeOut"
          ](n, t);
        });
      });
  })(Zepto),
  (function() {
    try {
      getComputedStyle(void 0);
    } catch (e) {
      var n = getComputedStyle;
      window.getComputedStyle = function(e) {
        try {
          return n(e);
        } catch (t) {
          return null;
        }
      };
    }
  })(),
  define("zepto", (function(e) {
    return function() {
      var n;
      return n || e.zepto;
    };
  })(this)),
  define("AjaxController", ["zepto"], function() {
    var e = {
      getAction: function(e) {
        if (
          (e.url.indexOf("?") < 0 && (e.url += "?_dt=" + Math.random()),
          e.url.indexOf("_dt") < 0 && (e.url += "&_dt=" + Math.random()),
          e.data)
        )
          for (var n in e.data) e.url += "&" + n + "=" + e.data[n];
        e.alertMsg = e.alertMsg || "yes";
        var t = {
          url: e.url,
          type: e.method || "GET",
          contentType: "application/json",
          dataType: "json",
          timeout: e.timeout || 1e5,
          success: function(n) {
            return n
              ? n.success
                ? void (e.callback && e.callback(n))
                : void (n.message && "yes" === e.alertMsg
                    ? Tip.alert(n.message)
                    : e.callback && e.callback(n))
              : void 0;
          }
        };
        $.ajax(t);
      },
      saveAction: function(e) {
        (e.alertMsg = e.alertMsg || "yes"),
          e.url.indexOf("?") < 0 && (e.url += "?_dt=" + Math.random()),
          e.url.indexOf("_dt") < 0 && (e.url += "&_dt=" + Math.random());
        var n = {
          url: e.url,
          type: e.method || "POST",
          data: JSON.stringify(e.data),
          contentType: "application/json",
          dataType: "json",
          timeout: e.timeout || 1e5,
          success: function(n) {
            return n
              ? n.success
                ? void (e.callback && e.callback(n))
                : void (n.message && "yes" === e.alertMsg
                    ? Tip.alert(n.message)
                    : e.callback && e.callback(n))
              : void 0;
          }
        };
        $.ajax(n);
      },
      postAction: function(e) {
        (e.alertMsg = e.alertMsg || "yes"),
          e.url.indexOf("?") < 0 && (e.url += "?_dt=" + Math.random()),
          e.url.indexOf("_dt") < 0 && (e.url += "&_dt=" + Math.random());
        var n = {
          url: e.url,
          type: e.method || "POST",
          data: e.data,
          contentType: e.contentType || "application/x-www-form-urlencoded",
          dataType: "json",
          timeout: e.timeout || 1e5,
          success: function(n) {
            return n
              ? "0000" !== n.ret_code
                ? void (n.ret_msg && "yes" === e.alertMsg
                    ? Tip.alert(n.ret_msg)
                    : e.callback && e.callback(n))
                : void (e.callback && e.callback(n))
              : void 0;
          }
        };
        $.ajax(n);
      },
      getAction2: function(e) {
        if (
          (e.url.indexOf("?") < 0 && (e.url += "?_dt=" + Math.random()),
          e.url.indexOf("_dt") < 0 && (e.url += "&_dt=" + Math.random()),
          e.data)
        )
          for (var n in e.data) e.url += "&" + n + "=" + e.data[n];
        e.alertMsg = e.alertMsg || "yes";
        var t = {
          url: e.url,
          type: e.method || "GET",
          contentType: "application/json",
          dataType: "json",
          timeout: e.timeout || 1e5,
          success: function(n) {
            return n
              ? "0000" !== n.ret_code
                ? void (n.ret_msg && "yes" === e.alertMsg
                    ? Tip.alert(n.ret_msg)
                    : e.callback && e.callback(n))
                : void (e.callback && e.callback(n))
              : void 0;
          }
        };
        $.ajax(t);
      },
      ajaxAction: function(e) {
        e.api && ((e.method = e.api.method), (e.url = e.api.url)),
          e.data && e.data.openid
            ? (e.url += "?_dt=" + Math.random())
            : (e.url = UtilTool.initApiUrl(e.url)),
          e.api.relink && (e.url = e.url.replace("/r/", "/ir/")),
          "reset" === localStorage.getItem("HOST_URL_RELINK") &&
            (e.url = e.url.replace("/ir/", "/r/")),
          "GET" == e.method || "get" == e.method || "DELETE" == e.method
            ? this.getAction(e)
            : this.saveAction(e);
      },
      ajaxAction2: function(e) {
        e.api && ((e.method = e.api.method), (e.url = e.api.url)),
          e.data && e.data.openid
            ? (e.url += "?_dt=" + Math.random())
            : (e.url = UtilTool.initApiUrl(e.url)),
          e.api.relink && (e.url = e.url.replace("/r/", "/ir/")),
          "reset" === localStorage.getItem("HOST_URL_RELINK") &&
            (e.url = e.url.replace("/ir/", "/r/")),
          "GET" == e.method || "get" == e.method || "DELETE" == e.method
            ? this.getAction2(e)
            : this.postAction(e);
      }
    };
    return e;
  }),
  !(function(e, n) {
    "function" == typeof define && (define.amd || define.cmd)
      ? define("WxPlugin", [], function() {
          return n(e);
        })
      : n(e, !0);
  })(this, function(e, n) {
    function t(n, t, i) {
      e.WeixinJSBridge
        ? WeixinJSBridge.invoke(n, o(t), function(e) {
            s(n, e, i);
          })
        : u(n, i);
    }
    function i(n, t, i) {
      e.WeixinJSBridge
        ? WeixinJSBridge.on(n, function(e) {
            i && i.trigger && i.trigger(e), s(n, e, t);
          })
        : i
          ? u(n, i)
          : u(n, t);
    }
    function o(e) {
      return (
        (e = e || {}),
        (e.appId = U.appId),
        (e.verifyAppId = U.appId),
        (e.verifySignType = "sha1"),
        (e.verifyTimestamp = U.timestamp + ""),
        (e.verifyNonceStr = U.nonceStr),
        (e.verifySignature = U.signature),
        e
      );
    }
    function r(e) {
      return {
        timeStamp: e.timestamp + "",
        nonceStr: e.nonceStr,
        package: e.package,
        paySign: e.paySign,
        signType: e.signType || "SHA1"
      };
    }
    function a(e) {
      return (
        (e.postalCode = e.addressPostalCode),
        delete e.addressPostalCode,
        (e.provinceName = e.proviceFirstStageName),
        delete e.proviceFirstStageName,
        (e.cityName = e.addressCitySecondStageName),
        delete e.addressCitySecondStageName,
        (e.countryName = e.addressCountiesThirdStageName),
        delete e.addressCountiesThirdStageName,
        (e.detailInfo = e.addressDetailInfo),
        delete e.addressDetailInfo,
        e
      );
    }
    function s(e, n, t) {
      "openEnterpriseChat" == e && (n.errCode = n.err_code),
        delete n.err_code,
        delete n.err_desc,
        delete n.err_detail;
      var i = n.errMsg;
      i || ((i = n.err_msg), delete n.err_msg, (i = l(e, i)), (n.errMsg = i)),
        (t = t || {})._complete && (t._complete(n), delete t._complete),
        (i = n.errMsg || ""),
        U.debug && !t.isInnerInvoke && alert(JSON.stringify(n));
      var o = i.indexOf(":");
      switch (i.substring(o + 1)) {
        case "ok":
          t.success && t.success(n);
          break;
        case "cancel":
          t.cancel && t.cancel(n);
          break;
        default:
          t.fail && t.fail(n);
      }
      t.complete && t.complete(n);
    }
    function l(e, n) {
      var t = e,
        i = v[t];
      i && (t = i);
      var o = "ok";
      if (n) {
        var r = n.indexOf(":");
        "confirm" == (o = n.substring(r + 1)) && (o = "ok"),
          "failed" == o && (o = "fail"),
          -1 != o.indexOf("failed_") && (o = o.substring(7)),
          -1 != o.indexOf("fail_") && (o = o.substring(5)),
          ("access denied" != (o = (o = o.replace(/_/g, " ")).toLowerCase()) &&
            "no permission to execute" != o) ||
            (o = "permission denied"),
          "config" == t && "function not exist" == o && (o = "ok"),
          "" == o && (o = "fail");
      }
      return (n = t + ":" + o);
    }
    function c(e) {
      if (e) {
        for (var n = 0, t = e.length; t > n; ++n) {
          var i = e[n],
            o = g[i];
          o && (e[n] = o);
        }
        return e;
      }
    }
    function u(e, n) {
      if (!(!U.debug || (n && n.isInnerInvoke))) {
        var t = v[e];
        t && (e = t),
          n && n._complete && delete n._complete,
          console.log('"' + e + '",', n || "");
      }
    }
    function f() {
      if (!(x || b || U.debug || "6.0.2" > M || k.systemType < 0)) {
        var e = new Image();
        (k.appId = U.appId),
          (k.initTime = P.initEndTime - P.initStartTime),
          (k.preVerifyTime = P.preVerifyEndTime - P.preVerifyStartTime),
          j.getNetworkType({
            isInnerInvoke: !0,
            success: function(n) {
              k.networkType = n.networkType;
              var t =
                "https://open.weixin.qq.com/sdk/report?v=" +
                k.version +
                "&o=" +
                k.isPreVerifyOk +
                "&s=" +
                k.systemType +
                "&c=" +
                k.clientVersion +
                "&a=" +
                k.appId +
                "&n=" +
                k.networkType +
                "&i=" +
                k.initTime +
                "&p=" +
                k.preVerifyTime +
                "&u=" +
                k.url;
              e.src = t;
            }
          });
      }
    }
    function d() {
      return new Date().getTime();
    }
    function p(n) {
      S &&
        (e.WeixinJSBridge
          ? "preInject" === y.__wxjsjs__isPreInject
            ? y.addEventListener &&
              y.addEventListener("WeixinJSBridgeReady", n, !1)
            : n()
          : y.addEventListener &&
            y.addEventListener("WeixinJSBridgeReady", n, !1));
    }
    function h() {
      j.invoke ||
        ((j.invoke = function(n, t, i) {
          e.WeixinJSBridge && WeixinJSBridge.invoke(n, o(t), i);
        }),
        (j.on = function(n, t) {
          e.WeixinJSBridge && WeixinJSBridge.on(n, t);
        }));
    }
    function m(e) {
      if ("string" == typeof e && e.length > 0) {
        var n = e.split("?")[0],
          t = e.split("?")[1];
        return (n += ".html"), void 0 !== t ? n + "?" + t : n;
      }
    }
    if (!e.jWeixin) {
      var g = {
          config: "preVerifyJSAPI",
          onMenuShareTimeline: "menu:share:timeline",
          onMenuShareAppMessage: "menu:share:appmessage",
          onMenuShareQQ: "menu:share:qq",
          onMenuShareWeibo: "menu:share:weiboApp",
          onMenuShareQZone: "menu:share:QZone",
          previewImage: "imagePreview",
          getLocation: "geoLocation",
          openProductSpecificView: "openProductViewWithPid",
          addCard: "batchAddCard",
          openCard: "batchViewCard",
          chooseWXPay: "getBrandWCPayRequest",
          openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
          startSearchBeacons: "startMonitoringBeacons",
          stopSearchBeacons: "stopMonitoringBeacons",
          onSearchBeacons: "onBeaconsInRange",
          consumeAndShareCard: "consumedShareCard",
          openAddress: "editAddress"
        },
        v = (function() {
          var e = {};
          for (var n in g) e[g[n]] = n;
          return e;
        })(),
        y = e.document,
        I = y.title,
        w = navigator.userAgent.toLowerCase(),
        T = navigator.platform.toLowerCase(),
        x = !!T.match("mac") || !!T.match("win"),
        b = -1 != w.indexOf("wxdebugger"),
        S = -1 != w.indexOf("micromessenger"),
        A = -1 != w.indexOf("android"),
        _ = -1 != w.indexOf("iphone") || -1 != w.indexOf("ipad"),
        M = (function() {
          var e =
            w.match(/micromessenger\/(\d+\.\d+\.\d+)/) ||
            w.match(/micromessenger\/(\d+\.\d+)/);
          return e ? e[1] : "";
        })(),
        P = {
          initStartTime: d(),
          initEndTime: 0,
          preVerifyStartTime: 0,
          preVerifyEndTime: 0
        },
        k = {
          version: 1,
          appId: "",
          initTime: 0,
          preVerifyTime: 0,
          networkType: "",
          isPreVerifyOk: 1,
          systemType: _ ? 1 : A ? 2 : -1,
          clientVersion: M,
          url: encodeURIComponent(location.href)
        },
        U = {},
        O = { _completes: [] },
        E = { state: 0, data: {} };
      p(function() {
        P.initEndTime = d();
      });
      var L = !1,
        C = [],
        j = {
          config: function(e) {
            (U = e), u("config", e);
            var n = !1 !== U.check;
            p(function() {
              if (n)
                t(
                  g.config,
                  { verifyJsApiList: c(U.jsApiList) },
                  (function() {
                    (O._complete = function(e) {
                      (P.preVerifyEndTime = d()), (E.state = 1), (E.data = e);
                    }),
                      (O.success = function() {
                        k.isPreVerifyOk = 0;
                      }),
                      (O.fail = function(e) {
                        O._fail ? O._fail(e) : (E.state = -1);
                      });
                    var e = O._completes;
                    return (
                      e.push(function() {
                        f();
                      }),
                      (O.complete = function() {
                        for (var n = 0, t = e.length; t > n; ++n) e[n]();
                        O._completes = [];
                      }),
                      O
                    );
                  })()
                ),
                  (P.preVerifyStartTime = d());
              else {
                E.state = 1;
                for (var e = O._completes, i = 0, o = e.length; o > i; ++i)
                  e[i]();
                O._completes = [];
              }
            }),
              h();
          },
          ready: function(e) {
            0 != E.state ? e() : (O._completes.push(e), !S && U.debug && e());
          },
          error: function(e) {
            "6.0.2" > M || (-1 == E.state ? e(E.data) : (O._fail = e));
          },
          checkJsApi: function(e) {
            var n = function(e) {
              var n = e.checkResult;
              for (var t in n) {
                var i = v[t];
                i && ((n[i] = n[t]), delete n[t]);
              }
              return e;
            };
            t(
              "checkJsApi",
              { jsApiList: c(e.jsApiList) },
              ((e._complete = function(e) {
                if (A) {
                  var t = e.checkResult;
                  t && (e.checkResult = JSON.parse(t));
                }
                e = n(e);
              }),
              e)
            );
          },
          onMenuShareTimeline: function(e) {
            i(
              g.onMenuShareTimeline,
              {
                complete: function() {
                  t(
                    "shareTimeline",
                    {
                      title: e.title || I,
                      desc: e.title || I,
                      img_url: e.imgUrl || "",
                      link: e.link || location.href,
                      type: e.type || "link",
                      data_url: e.dataUrl || ""
                    },
                    e
                  );
                }
              },
              e
            );
          },
          onMenuShareAppMessage: function(e) {
            i(
              g.onMenuShareAppMessage,
              {
                complete: function(n) {
                  "favorite" === n.scene
                    ? t("sendAppMessage", {
                        title: e.title || I,
                        desc: e.desc || "",
                        link: e.link || location.href,
                        img_url: e.imgUrl || "",
                        type: e.type || "link",
                        data_url: e.dataUrl || ""
                      })
                    : t(
                        "sendAppMessage",
                        {
                          title: e.title || I,
                          desc: e.desc || "",
                          link: e.link || location.href,
                          img_url: e.imgUrl || "",
                          type: e.type || "link",
                          data_url: e.dataUrl || ""
                        },
                        e
                      );
                }
              },
              e
            );
          },
          onMenuShareQQ: function(e) {
            i(
              g.onMenuShareQQ,
              {
                complete: function() {
                  t(
                    "shareQQ",
                    {
                      title: e.title || I,
                      desc: e.desc || "",
                      img_url: e.imgUrl || "",
                      link: e.link || location.href
                    },
                    e
                  );
                }
              },
              e
            );
          },
          onMenuShareWeibo: function(e) {
            i(
              g.onMenuShareWeibo,
              {
                complete: function() {
                  t(
                    "shareWeiboApp",
                    {
                      title: e.title || I,
                      desc: e.desc || "",
                      img_url: e.imgUrl || "",
                      link: e.link || location.href
                    },
                    e
                  );
                }
              },
              e
            );
          },
          onMenuShareQZone: function(e) {
            i(
              g.onMenuShareQZone,
              {
                complete: function() {
                  t(
                    "shareQZone",
                    {
                      title: e.title || I,
                      desc: e.desc || "",
                      img_url: e.imgUrl || "",
                      link: e.link || location.href
                    },
                    e
                  );
                }
              },
              e
            );
          },
          startRecord: function(e) {
            t("startRecord", {}, e);
          },
          stopRecord: function(e) {
            t("stopRecord", {}, e);
          },
          onVoiceRecordEnd: function(e) {
            i("onVoiceRecordEnd", e);
          },
          playVoice: function(e) {
            t("playVoice", { localId: e.localId }, e);
          },
          pauseVoice: function(e) {
            t("pauseVoice", { localId: e.localId }, e);
          },
          stopVoice: function(e) {
            t("stopVoice", { localId: e.localId }, e);
          },
          onVoicePlayEnd: function(e) {
            i("onVoicePlayEnd", e);
          },
          uploadVoice: function(e) {
            t(
              "uploadVoice",
              {
                localId: e.localId,
                isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
              },
              e
            );
          },
          downloadVoice: function(e) {
            t(
              "downloadVoice",
              {
                serverId: e.serverId,
                isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
              },
              e
            );
          },
          translateVoice: function(e) {
            t(
              "translateVoice",
              {
                localId: e.localId,
                isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
              },
              e
            );
          },
          chooseImage: function(e) {
            t(
              "chooseImage",
              {
                scene: "1|2",
                count: e.count || 9,
                sizeType: e.sizeType || ["original", "compressed"],
                sourceType: e.sourceType || ["album", "camera"]
              },
              ((e._complete = function(e) {
                if (A) {
                  var n = e.localIds;
                  n && (e.localIds = JSON.parse(n));
                }
              }),
              e)
            );
          },
          getLocation: function() {},
          previewImage: function(e) {
            t(g.previewImage, { current: e.current, urls: e.urls }, e);
          },
          uploadImage: function(e) {
            t(
              "uploadImage",
              {
                localId: e.localId,
                isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
              },
              e
            );
          },
          downloadImage: function(e) {
            t(
              "downloadImage",
              {
                serverId: e.serverId,
                isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
              },
              e
            );
          },
          getLocalImgData: function(e) {
            !1 === L
              ? ((L = !0),
                t(
                  "getLocalImgData",
                  { localId: e.localId },
                  ((e._complete = function() {
                    if (((L = !1), C.length > 0)) {
                      var e = C.shift();
                      wx.getLocalImgData(e);
                    }
                  }),
                  e)
                ))
              : C.push(e);
          },
          getNetworkType: function(e) {
            var n = function(e) {
              var n = e.errMsg;
              e.errMsg = "getNetworkType:ok";
              var t = e.subtype;
              if ((delete e.subtype, t)) e.networkType = t;
              else {
                var i = n.indexOf(":"),
                  o = n.substring(i + 1);
                switch (o) {
                  case "wifi":
                  case "edge":
                  case "wwan":
                    e.networkType = o;
                    break;
                  default:
                    e.errMsg = "getNetworkType:fail";
                }
              }
              return e;
            };
            t(
              "getNetworkType",
              {},
              ((e._complete = function(e) {
                e = n(e);
              }),
              e)
            );
          },
          openLocation: function(e) {
            t(
              "openLocation",
              {
                latitude: e.latitude,
                longitude: e.longitude,
                name: e.name || "",
                address: e.address || "",
                scale: e.scale || 28,
                infoUrl: e.infoUrl || ""
              },
              e
            );
          },
          getLocation: function(e) {
            (e = e || {}),
              t(
                g.getLocation,
                { type: e.type || "wgs84" },
                ((e._complete = function(e) {
                  delete e.type;
                }),
                e)
              );
          },
          hideOptionMenu: function(e) {
            t("hideOptionMenu", {}, e);
          },
          showOptionMenu: function(e) {
            t("showOptionMenu", {}, e);
          },
          closeWindow: function(e) {
            t("closeWindow", {}, (e = e || {}));
          },
          hideMenuItems: function(e) {
            t("hideMenuItems", { menuList: e.menuList }, e);
          },
          showMenuItems: function(e) {
            t("showMenuItems", { menuList: e.menuList }, e);
          },
          hideAllNonBaseMenuItem: function(e) {
            t("hideAllNonBaseMenuItem", {}, e);
          },
          showAllNonBaseMenuItem: function(e) {
            t("showAllNonBaseMenuItem", {}, e);
          },
          scanQRCode: function(e) {
            t(
              "scanQRCode",
              {
                needResult: (e = e || {}).needResult || 0,
                scanType: e.scanType || ["qrCode", "barCode"]
              },
              ((e._complete = function(e) {
                if (_) {
                  var n = e.resultStr;
                  if (n) {
                    var t = JSON.parse(n);
                    e.resultStr = t && t.scan_code && t.scan_code.scan_result;
                  }
                }
              }),
              e)
            );
          },
          openAddress: function(e) {
            t(
              g.openAddress,
              {},
              ((e._complete = function(e) {
                e = a(e);
              }),
              e)
            );
          },
          openProductSpecificView: function(e) {
            t(
              g.openProductSpecificView,
              {
                pid: e.productId,
                view_type: e.viewType || 0,
                ext_info: e.extInfo
              },
              e
            );
          },
          addCard: function(e) {
            for (var n = e.cardList, i = [], o = 0, r = n.length; r > o; ++o) {
              var a = n[o],
                s = { card_id: a.cardId, card_ext: a.cardExt };
              i.push(s);
            }
            t(
              g.addCard,
              { card_list: i },
              ((e._complete = function(e) {
                var n = e.card_list;
                if (n) {
                  for (var t = 0, i = (n = JSON.parse(n)).length; i > t; ++t) {
                    var o = n[t];
                    (o.cardId = o.card_id),
                      (o.cardExt = o.card_ext),
                      (o.isSuccess = !!o.is_succ),
                      delete o.card_id,
                      delete o.card_ext,
                      delete o.is_succ;
                  }
                  (e.cardList = n), delete e.card_list;
                }
              }),
              e)
            );
          },
          chooseCard: function(e) {
            t(
              "chooseCard",
              {
                app_id: U.appId,
                location_id: e.shopId || "",
                sign_type: e.signType || "SHA1",
                card_id: e.cardId || "",
                card_type: e.cardType || "",
                card_sign: e.cardSign,
                time_stamp: e.timestamp + "",
                nonce_str: e.nonceStr
              },
              ((e._complete = function(e) {
                (e.cardList = e.choose_card_info), delete e.choose_card_info;
              }),
              e)
            );
          },
          openCard: function(e) {
            for (var n = e.cardList, i = [], o = 0, r = n.length; r > o; ++o) {
              var a = n[o],
                s = { card_id: a.cardId, code: a.code };
              i.push(s);
            }
            t(g.openCard, { card_list: i }, e);
          },
          consumeAndShareCard: function(e) {
            t(
              g.consumeAndShareCard,
              { consumedCardId: e.cardId, consumedCode: e.code },
              e
            );
          },
          chooseWXPay: function(e) {
            t(g.chooseWXPay, r(e), e);
          },
          openEnterpriseRedPacket: function(e) {
            t(g.openEnterpriseRedPacket, r(e), e);
          },
          startSearchBeacons: function(e) {
            t(g.startSearchBeacons, { ticket: e.ticket }, e);
          },
          stopSearchBeacons: function(e) {
            t(g.stopSearchBeacons, {}, e);
          },
          onSearchBeacons: function(e) {
            i(g.onSearchBeacons, e);
          },
          openEnterpriseChat: function(e) {
            t(
              "openEnterpriseChat",
              { useridlist: e.userIds, chatname: e.groupName },
              e
            );
          },
          launchMiniProgram: function(e) {
            t(
              "launchMiniProgram",
              {
                targetAppId: e.targetAppId,
                path: m(e.path),
                envVersion: e.envVersion
              },
              e
            );
          },
          miniProgram: {
            navigateBack: function(e) {
              (e = e || {}),
                p(function() {
                  t(
                    "invokeMiniProgramAPI",
                    { name: "navigateBack", arg: { delta: e.delta || 1 } },
                    e
                  );
                });
            },
            navigateTo: function(e) {
              p(function() {
                t(
                  "invokeMiniProgramAPI",
                  { name: "navigateTo", arg: { url: e.url } },
                  e
                );
              });
            },
            redirectTo: function(e) {
              p(function() {
                t(
                  "invokeMiniProgramAPI",
                  { name: "redirectTo", arg: { url: e.url } },
                  e
                );
              });
            },
            switchTab: function(e) {
              p(function() {
                t(
                  "invokeMiniProgramAPI",
                  { name: "switchTab", arg: { url: e.url } },
                  e
                );
              });
            },
            reLaunch: function(e) {
              p(function() {
                t(
                  "invokeMiniProgramAPI",
                  { name: "reLaunch", arg: { url: e.url } },
                  e
                );
              });
            },
            postMessage: function(e) {
              p(function() {
                t(
                  "invokeMiniProgramAPI",
                  { name: "postMessage", arg: e.data || {} },
                  e
                );
              });
            },
            getEnv: function(n) {
              p(function() {
                n({ miniprogram: "miniprogram" === e.__wxjs_environment });
              });
            }
          }
        },
        N = 1,
        B = {};
      return (
        y.addEventListener(
          "error",
          function(e) {
            if (!A) {
              var n = e.target,
                t = n.tagName,
                i = n.src;
              if (
                ("IMG" == t || "VIDEO" == t || "AUDIO" == t || "SOURCE" == t) &&
                -1 != i.indexOf("wxlocalresource://")
              ) {
                e.preventDefault(), e.stopPropagation();
                var o = n["wx-id"];
                if ((o || ((o = N++), (n["wx-id"] = o)), B[o])) return;
                (B[o] = !0),
                  wx.ready(function() {
                    wx.getLocalImgData({
                      localId: i,
                      success: function(e) {
                        n.src = e.localData;
                      }
                    });
                  });
              }
            }
          },
          !0
        ),
        y.addEventListener(
          "load",
          function(e) {
            if (!A) {
              var n = e.target,
                t = n.tagName;
              if (
                (n.src,
                "IMG" == t || "VIDEO" == t || "AUDIO" == t || "SOURCE" == t)
              ) {
                var i = n["wx-id"];
                i && (B[i] = !1);
              }
            }
          },
          !0
        ),
        n && (e.wx = e.jWeixin = j),
        j
      );
    }
  }),
  define("WeixinTools", ["zepto", "WxPlugin"], function(e, n) {
    window.wx = n;
    var t = function(e) {
      (this.options = $.extend({}, { debug: !1 }, e)),
        this.options.signatureUrl && this.options.apis && this.init();
    };
    return (
      (t.prototype = {
        init: function() {
          var e = this;
          if (e.options.weixinpayOpenId) {
            var t = window.location.href;
            t.indexOf("?") < 0 && (t += "?_dx=1"),
              $.get(
                e.options.signatureUrl,
                { url: t, weixinpayOpenid: e.options.weixinpayOpenId },
                function(t) {
                  t.success &&
                    ((t = t.value),
                    n.config({
                      debug: e.options.debug,
                      appId: t.appId,
                      timestamp: t.timestamp,
                      nonceStr: t.noncestr,
                      signature: t.signature,
                      jsApiList: e.options.apis
                    }));
                }
              );
          } else
            $.get(
              e.options.signatureUrl,
              { url: window.location.href },
              function(t) {
                t.success &&
                  ((t = t.value),
                  n.config({
                    debug: e.options.debug,
                    appId: t.appId,
                    timestamp: t.timestamp,
                    nonceStr: t.noncestr,
                    signature: t.signature,
                    jsApiList: e.options.apis
                  }));
              }
            );
        },
        shareAppMessage: function(e) {
          n.onMenuShareAppMessage({
            title: e.title,
            desc: e.desc,
            link: e.link,
            imgUrl: e.imgUrl,
            cancel: function() {
              e.cancelFn && e.cancelFn();
            },
            success: function() {
              e.successFn && e.successFn();
            }
          });
        },
        shareTimeline: function(e) {
          n.onMenuShareTimeline({
            title: e.title,
            link: e.link,
            imgUrl: e.imgUrl,
            success: function() {
              e.successFn && e.successFn();
            },
            cancel: function() {
              e.cancelFn && e.cancelFn();
            }
          });
        },
        getLocation: function(e) {
          n.getLocation({
            type: "wgs84",
            success: function(n) {
              n.latitude, n.longitude, n.speed, n.accuracy;
              e && e({ lat: n.latitude, lon: n.longitude, success: !0 });
            }
          });
        }
      }),
      t
    );
  }),
  define("HeaderController", ["AjaxController", "WeixinTools"], function(e, n) {
    var t = avalon.define({
      $id: "HeaderController",
      mobile: "",
      hasLogin: !1,
      userName: "",
      balance: "",
      isThisShopAdmin: 0,
      userInfo: {
        id: "",
        headimgurl: "",
        balance: 0,
        shopBalance: 0,
        myShopId: "",
        appid: "",
        waitReceivedAmount: "",
        point: "",
        shopId: "",
        shopType: "",
        nickname: "",
        currentTime: "",
        openid: "",
        sex: "",
        subscribe: 0,
        unionid: ""
      },
      thumbUrl: "",
      subscribe: 0,
      setType: 0,
      placerLevel: "",
      placerLevelName: "",
      $double: {},
      $three: {},
      $lotto: {},
      $arrange3: {},
      $arrange5: {},
      $sevenStar: {},
      $sevenJoy: {},
      $xuan5: {},
      $football: {},
      isAdmin: !1,
      init: function(n, i) {
        function o(e) {
          (i = [
            "double",
            "three",
            "lotto",
            "arrange3",
            "arrange5",
            "sevenStar",
            "sevenJoy",
            "football",
            "xuan5"
          ]),
            avalon.each(i, function(n, i) {
              switch (i) {
                case "double":
                  t.$double = calTimeByDouble(e);
                  break;
                case "three":
                  t.$three = calTimeByThree(e);
                  break;
                case "lotto":
                  t.$lotto = calTimeByLotto(e);
                  break;
                case "arrange3":
                  t.$arrange3 = calTimeByArrange3(e);
                  break;
                case "arrange5":
                  t.$arrange5 = calTimeByArrange5(e);
                  break;
                case "sevenStar":
                  t.$sevenStar = calTimeBySevenStar(e);
                  break;
                case "sevenJoy":
                  t.$sevenJoy = calTimeBySevenJoy(e);
                  break;
                case "xuan5":
                  t.$xuan5 = calTimeByArrange15(e);
                  break;
                case "football":
                  t.$football = {};
              }
            });
        }
        if (
          !UtilTool.isWeiXin() &&
          "APP" !== localStorage.getItem("ClientType") &&
          "local" !== localStorage.getItem("local")
        ) {
          var r = $(".not");
          return (
            $("body")
              .empty()
              .append(r.show())
              .css({ background: "#fff" }),
            void $("title").text("404 Not Found")
          );
        }
        UtilTool && UtilTool.initSize(20),
          e.ajaxAction({
            api: APITool.user.whoAmI,
            alertMsg: "no",
            callback: function(i) {
              i.value === !1
                ? (t.hasLogin = !1)
                : null === i.value
                  ? (t.hasLogin = !1)
                  : "object" == typeof i.value &&
                    ((t.hasLogin = !0),
                    (i.value.IDNumber = i.value.iDNumber),
                    (i.value.balance = Math.max(0, i.value.balance)),
                    sessionStorage.setItem(
                      "user_info",
                      JSON.stringify(i.value)
                    ),
                    (t.userInfo = i.value),
                    (t.thumbUrl =
                      "url(" +
                      i.value.headimgurl +
                      ") no-repeat center center"),
                    t.userInfo.myShopId && (t.isAdmin = !0),
                    t.userInfo.myShopId === t.userInfo.shopId &&
                      (t.isThisShopAdmin = 1),
                    3 != t.userInfo.shopstate &&
                      t.userInfo.openid &&
                      13 === t.userInfo.openid.length &&
                      (i.value.subscribe = 1),
                    t.userInfo.nickname &&
                      t.userInfo.headimgurl &&
                      (i.value.subscribe = 1),
                    !t.userInfo.nickname &&
                      !t.userInfo.headimgurl &&
                      (i.value.subscribe = 0),
                    (t.subscribe = i.value.subscribe),
                    (t.setType = i.value.lotteryPushAction),
                    (t.placerLevel = UtilTool.getLevelByPoint(
                      t.userInfo.point,
                      t.userInfo.sex
                    )),
                    (t.placerLevelName = UtilTool.getLevelNameByPoint(
                      t.userInfo.point,
                      t.userInfo.sex
                    )),
                    o(i.value.currentTime - TIMEZONE),
                    e.ajaxAction({
                      api: APITool.user.userCollectedCount,
                      alertMsg: "no",
                      callback: function(e) {
                        e.success &&
                          (t.userInfo.userCollectedCount =
                            e.value.userCollectedCount);
                      }
                    })),
                n && n();
            }
          });
      },
      initCenter: function(n) {
        UtilTool && UtilTool.initSize(20);
        var i = { openid: localStorage.getItem("center_openid") || "" };
        e.ajaxAction({
          api: APITool.centerWeixin.whoAmIForCenterWeixinUser,
          data: i,
          alertMsg: "no",
          callback: function(e) {
            if (e.value === !1)
              return (
                (t.hasLogin = !1),
                void (location.href = "redirect_bind.html?back=21")
              );
            if (null === e.value)
              return (
                (t.hasLogin = !1),
                void (location.href = "redirect_bind.html?back=21")
              );
            if ("object" == typeof e.value) {
              if (!e.value.phoneMobile)
                return void (location.href = "redirect_bind.html?back=21");
              (t.hasLogin = !0),
                (t.userInfo = e.value),
                (t.thumbUrl =
                  "url(" + e.value.headimgurl + ") no-repeat center center");
            }
            n && n();
          }
        });
      },
      initAdmin: function(n) {
        UtilTool && UtilTool.initSize(20),
          (t.$three = calTimeByThree()),
          (t.$arrange3 = calTimeByArrange3()),
          e.ajaxAction({
            api: APITool.user.adminWhoAmI,
            alertMsg: "no",
            callback: function(e) {
              e.value === !1
                ? (t.hasLogin = !1)
                : null === e.value
                  ? (t.hasLogin = !1)
                  : "object" == typeof e.value &&
                    ((t.hasLogin = !0), (t.userInfo = e.value)),
                n && n();
            }
          });
      },
      initLLPay: function(n) {
        e.ajaxAction({
          api: APITool.llPay.getllUserInfo,
          data: { phoneMobile: t.userInfo.phoneMobile },
          callback: function(e) {
            e.success && n && n(e.value || {});
          }
        });
      },
      initLLUserInfo: function(n) {
        e.ajaxAction({
          api: APITool.user.getLianLianUserInfo,
          callback: function(e) {
            return e.success ? void (n && n(e.value || {})) : void (n && n({}));
          }
        });
      },
      initLLShopInfo: function(n) {
        e.ajaxAction({
          api: APITool.shop.getLLPayInfo,
          data: { id: Number(t.userInfo.shopId) },
          callback: function(e) {
            e.success && n && n(e.value || {});
          }
        });
      },
      forceInit: function(e) {
        t.init(e);
      },
      alertInit: function(n) {
        UtilTool && UtilTool.initSize(20),
          e.ajaxAction({
            api: APITool.user.whoAmI,
            alertMsg: "no",
            callback: function(e) {
              e.value === !1
                ? (t.hasLogin = !1)
                : null === e.value
                  ? (t.hasLogin = !1)
                  : "object" == typeof e.value &&
                    ((t.hasLogin = !0),
                    (e.value.IDNumber = e.value.iDNumber),
                    (e.value.balance = Math.max(0, e.value.balance)),
                    sessionStorage.setItem(
                      "user_info",
                      JSON.stringify(e.value)
                    ),
                    (t.userInfo = e.value),
                    (t.thumbUrl =
                      "url(" +
                      e.value.headimgurl +
                      ") no-repeat center center"),
                    t.userInfo.myShopId && (t.isAdmin = !0),
                    t.userInfo.myShopId === t.userInfo.shopId &&
                      (t.isThisShopAdmin = 1),
                    (t.subscribe = e.value.subscribe),
                    (t.setType = e.value.lotteryPushAction),
                    (t.placerLevel = UtilTool.getLevelByPoint(
                      t.userInfo.point,
                      t.userInfo.sex
                    )),
                    (t.placerLevelName = UtilTool.getLevelNameByPoint(
                      t.userInfo.point,
                      t.userInfo.sex
                    ))),
                n && n();
            }
          });
      },
      logoutHandler: function() {
        e.ajaxAction({
          api: APITool.login.logout,
          callback: function() {
            location.href = base + "index.html";
          }
        });
      },
      lat: "",
      lon: "",
      wxInit: function(e, t, i) {
        if (!UtilTool || UtilTool.is_weixin()) {
          var o = !1;
          "1" == localStorage.getItem("debug_sdk") && (o = !0);
          var r = new n({
            debug: o,
            signatureUrl: APITool.wxconfig,
            apis: [
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "onMenuShareQQ",
              "hideOptionMenu",
              "showOptionMenu",
              "closeWindow",
              "chooseWXPay",
              "chooseImage",
              "uploadImage",
              "downloadImage",
              "previewImage",
              "openLocation",
              "getLocation"
            ]
          });
          wx.ready(function() {
            wx.showOptionMenu(),
              e && (r.shareAppMessage(e), r.shareTimeline(e)),
              i && i();
          });
        }
      },
      wxInitCenter: function(e, t, i) {
        if (!UtilTool || UtilTool.is_weixin()) {
          var o = !1;
          "1" == localStorage.getItem("debug_sdk") && (o = !0);
          var r = new n({
            debug: o,
            signatureUrl: APITool.wxconfigCenter,
            apis: [
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "onMenuShareQQ",
              "hideOptionMenu",
              "showOptionMenu",
              "closeWindow",
              "chooseWXPay",
              "chooseImage",
              "uploadImage",
              "downloadImage",
              "previewImage",
              "openLocation",
              "getLocation"
            ]
          });
          wx.ready(function() {
            wx.showOptionMenu(),
              e && (r.shareAppMessage(e), r.shareTimeline(e)),
              i && i();
          });
        }
      },
      wxInitPos: function(e) {
        if (!UtilTool || UtilTool.is_weixin()) {
          var t = new n({
            debug: !1,
            signatureUrl: APITool.wxconfig,
            apis: [
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "onMenuShareQQ",
              "hideOptionMenu",
              "showOptionMenu",
              "closeWindow",
              "chooseImage",
              "uploadImage",
              "downloadImage",
              "previewImage",
              "openLocation",
              "getLocation"
            ]
          });
          wx.ready(function() {
            wx.showOptionMenu(), t.getLocation(e);
          });
        }
      },
      wxInitPay: function(e) {
        if (!UtilTool || UtilTool.is_weixin()) {
          {
            new n({
              debug: !1,
              signatureUrl: APITool.wxconfig,
              apis: [
                "hideOptionMenu",
                "showOptionMenu",
                "chooseImage",
                "uploadImage",
                "downloadImage",
                "previewImage",
                "chooseWXPay"
              ]
            });
          }
          wx.ready(function() {
            wx.hideOptionMenu(), e && e();
          });
        }
      },
      wxInitPayConfig: function(e) {
        if (!UtilTool || UtilTool.is_weixin()) {
          {
            var t = (UtilTool.getQueryStringByName("weixinpayOpenid"),
            APITool.wxconfigPay);
            new n({
              debug: !1,
              signatureUrl: t,
              apis: [
                "hideOptionMenu",
                "showOptionMenu",
                "chooseImage",
                "uploadImage",
                "downloadImage",
                "previewImage",
                "chooseWXPay"
              ]
            });
          }
          wx.ready(function() {
            wx.hideOptionMenu(), e && e();
          });
        }
      },
      wxInitImage: function(e) {
        if (UtilTool && !UtilTool.is_weixin()) return void (e && e());
        new n({
          debug: !1,
          signatureUrl: APITool.wxconfig,
          apis: [
            "hideOptionMenu",
            "showOptionMenu",
            "chooseImage",
            "uploadImage",
            "downloadImage",
            "previewImage",
            "chooseWXPay"
          ]
        });
        wx.ready(function() {
          wx.hideOptionMenu(), e && e();
        });
      },
      wxInitImage2: function(e) {
        if (UtilTool && !UtilTool.is_weixin()) return void (e && e());
        new n({
          debug: !1,
          signatureUrl: APITool.wxconfigCenter,
          apis: [
            "hideOptionMenu",
            "showOptionMenu",
            "chooseImage",
            "uploadImage",
            "downloadImage",
            "previewImage",
            "chooseWXPay"
          ]
        });
        wx.ready(function() {
          wx.hideOptionMenu(), e && e();
        });
      },
      wxInitImageAndShare: function(e, t) {
        if (!UtilTool || UtilTool.is_weixin()) {
          var i = new n({
            debug: !1,
            signatureUrl: APITool.wxconfig,
            apis: [
              "hideOptionMenu",
              "showOptionMenu",
              "chooseImage",
              "uploadImage",
              "downloadImage",
              "previewImage",
              "chooseWXPay"
            ]
          });
          wx.ready(function() {
            wx.showOptionMenu(),
              e && e(),
              t && (i.shareAppMessage(t), i.shareTimeline(t));
          });
        }
      },
      wxInitImageAndShare2: function(e, t) {
        if (!UtilTool || UtilTool.is_weixin()) {
          var i = new n({
            debug: !1,
            signatureUrl: APITool.wxconfigCenter,
            apis: [
              "hideOptionMenu",
              "showOptionMenu",
              "chooseImage",
              "uploadImage",
              "downloadImage",
              "previewImage",
              "chooseWXPay"
            ]
          });
          wx.ready(function() {
            wx.showOptionMenu(),
              e && e(),
              t && (i.shareAppMessage(t), i.shareTimeline(t));
          });
        }
      },
      wxInitPayAndShare: function() {
        if (!UtilTool || UtilTool.is_weixin()) {
          {
            new n({
              debug: !1,
              signatureUrl: APITool.wxconfig,
              apis: [
                "hideOptionMenu",
                "showOptionMenu",
                "chooseImage",
                "uploadImage",
                "downloadImage",
                "previewImage",
                "chooseWXPay"
              ]
            });
          }
          wx.ready(function() {
            wx.showOptionMenu();
          });
        }
      }
    });
    return t;
  }),
  require(["HeaderController", "AjaxController"], function(e, n) {
    var t = avalon.define({
      $id: "SelfController",
      payHandler: function(n) {
        var i;
        if (e.userInfo.myShopId)
          return void Tip.alert("店主不支持在买家端提现");
        i = encodeURIComponent(
          "ll_withdraw.html" === n
            ? e.isThisShopAdmin
              ? base + "ll_withdraw.html?userId=" + t.llUserId
              : base + "ll_withdraw.html"
            : base + "ll_withdraw_un.html"
        );
        var o = UtilTool.isWeiXin() ? "" : "APP";
        return "APP" === o
          ? void (location.href = decodeURIComponent(i))
          : void (location.href = LLWIDTHDRAW_HOST_URL + "?url=" + i);
      },
      rechargeHandler: function() {
        var e = encodeURIComponent(
          "http://" + location.host + "/lottery/recharge.html?v=1"
        );
        location.href = PAYOTHER_HOST_URL + "?url=" + e;
      },
      placerLevel: " ",
      vis2: 0,
      visAuth: 0,
      phone: "",
      code: "",
      codeText: "发送验证码",
      codeHandler: function() {
        var e = 59;
        if ("发送验证码" == t.codeText)
          return (
            (t.phone = $("#tel").val()),
            (t.phone = UtilTool.trimBlank(t.phone)),
            11 !== t.phone.length
              ? void Tip.alert("请输入11位的手机号")
              : void n.ajaxAction({
                  api: APITool.mobile.getCode,
                  data: { phoneMobile: t.phone },
                  callback: function(n) {
                    if (n.success)
                      var i = setInterval(function() {
                        e
                          ? (e--, (t.codeText = "" + e + "秒"))
                          : (clearInterval(i), (t.codeText = "发送验证码"));
                      }, 1e3);
                  }
                })
          );
      },
      bindHandler: function() {
        if (t.phone || t.code) {
          var i = APITool.app.login,
            o = { phoneMobile: t.phone, verifyCode: t.code };
          e.userInfo.openid
            ? (i = APITool.mobile.verifyCode)
            : (o.shopId = t.shopId),
            n.ajaxAction({
              api: i,
              data: o,
              callback: function(e) {
                e.success &&
                  (localStorage.setItem("phone", t.phone), location.reload());
              }
            });
        }
      },
      shopAgentInfoState: -1,
      shopAgentInfoId: -1,
      linkToAgent: function() {
        0 === t.shopAgentInfoState
          ? (location.href = "agent_my_tel.html?id=" + t.shopAgentInfoId)
          : 1 === t.shopAgentInfoState
            ? (location.href = "agent_my.html")
            : 2 === t.shopAgentInfoState
              ? (location.href = "agent_my_info.html?id=" + t.shopAgentInfoId)
              : 3 === t.shopAgentInfoState
                ? (location.href =
                    "agent_my_stop.html?agentId=" + t.shopAgentInfoId)
                : Tip.alert("您不是该店助理");
      },
      fromUrl: "",
      showMenu: 0,
      menuHandler: function() {
        t.showMenu = t.showMenu ? 0 : 1;
      },
      recharge2Handler: function() {
        var e = encodeURIComponent(
          "http://" + location.host + "/lottery/recharge2.html"
        );
        location.href = PAYOTHER_HOST_URL + "?url=" + e;
      },
      predictHandler: function() {
        n.ajaxAction({
          api: APITool.expert.getPredictor,
          data: { unionid: e.userInfo.unionid },
          alertMsg: "no",
          callback: function(e) {
            e.success &&
              (location.href = e.value
                ? "expert_predict.html"
                : "expert_notice.html");
          }
        });
      },
      llUserInfo: { phoneMobile: "", userState: "", balance: "" },
      verifyHandler: function() {},
      linkLLHandler: function(n) {
        return !t.llUserInfo ||
          !t.llUserInfo.id ||
          !t.llUserInfo.phoneMobile ||
          t.llUserInfo.userState < 1
          ? "ll_withdraw.html" === n
            ? e.userInfo.myShopId
              ? void Tip.alert("店主不支持在买家端提现")
              : t.llUserInfo.balanceTotal > 5e3
                ? void (
                    confirm("为确保资金安全,请先进行实名认证") &&
                    (location.href = "ll_auth.html")
                  )
                : void t.payHandler("ll_withdraw_un.html")
            : void Tip.alert("请先实名认证", function() {
                location.href = "ll_auth.html";
              })
          : void (t.llUserInfo.payPwd
              ? "ll_recharge.html" === n
                ? (location.href = "ll_recharge.html")
                : e.userInfo.myShopId
                  ? Tip.alert("店主不支持在买家端提现", function() {})
                  : t.payHandler("ll_withdraw.html")
              : Tip.alert("请先设置支付密码", function() {
                  location.href = "ll_pwd.html";
                }));
      },
      oldBalance: 0,
      shopId: "",
      llUserId: "",
      showBank: !1,
      linkBank: function() {
        return !t.llUserInfo ||
          !t.llUserInfo.id ||
          !t.llUserInfo.phoneMobile ||
          t.llUserInfo.userState < 1
          ? void Tip.alert("请先实名认证", function() {
              location.href = "ll_auth.html";
            })
          : void (t.llUserInfo.payPwd
              ? t.showBank && (location.href = "ll_bank_new.html")
              : Tip.alert("请先设置支付密码", function() {
                  location.href = "ll_pwd.html";
                }));
      },
      listBankHandler: function(e) {
        var i = { phoneMobile: e, start: 0, limit: 10 };
        n.ajaxAction({
          api: APITool.llPay.queryBindCard,
          data: i,
          callback: function(e) {
            return e.value && e.value.length
              ? void (t.showBank = !1)
              : void (t.showBank = !0);
          }
        });
      },
      $sharePd: {},
      initShare: function() {
        var n = {
          desc: "想查看店铺个人订单、游戏规则、充值提现，就戳这里哦~",
          imgUrl: base + "images/p3_17.png",
          link: "",
          title:
            "您在【" +
            (e.userInfo.shopSerial || e.userInfo.shopName) +
            "】的个人中心"
        };
        e.userInfo.shopLogoImageSerial &&
          (n.imgUrl = APITool.thumbUrl(e.userInfo.shopLogoImageSerial)),
          (t.$sharePd = n),
          (n.link =
            3 != e.userInfo.shopstate
              ? SHARE_HOST_URL2 +
                "?state=46_" +
                e.userInfo.shopId +
                "&appid=" +
                e.userInfo.appid
              : SHARECENTER_HOST_URL + "?state=46_" + e.userInfo.shopId),
          e.userInfo.shopAgentInfo &&
            2 === e.userInfo.shopAgentInfo.state &&
            (n.link =
              3 != e.userInfo.shopstate
                ? SHARE_HOST_URL5 +
                  "?state=46_" +
                  e.userInfo.shopId +
                  "_" +
                  e.userInfo.id +
                  "&appid=" +
                  e.userInfo.appid
                : SHARECENTER_HOST_URL4 +
                  "?state=46_" +
                  e.userInfo.shopId +
                  "_" +
                  e.userInfo.id),
          3 == e.userInfo.shopstate ? e.wxInitCenter(n) : e.wxInit(n);
      },
      hhbbHandler: function() {
        location.href =
          location.href.indexOf("caibao918.com") >= 0
            ? "https://qjf.caibao918.com/lotteryBonus/list.html?uid=" +
              e.userInfo.id
            : "http://www.inleyuan.xyz/lotteryBonus/list.html?uid=" +
              e.userInfo.id;
      },
      initAgent: function() {
        var t = UtilTool.getQueryStringByName("state");
        if (t && ((t = t.split("_")), 3 === t.length)) {
          if (Number(t[2]) === Number(e.userInfo.id)) return;
          n.ajaxAction({
            api: APITool.shopAgent.saveUserAgent,
            data: { agent: { id: t[2] }, weiXinUser: { id: e.userInfo.id } }
          });
        }
      },
      shopMemoName: "",
      shopName: "",
      shopAddress: "",
      shopLogo: "",
      isRefuse: 0,
      initRefuseInfo: function() {
        localStorage.getItem(
          "TRUST_" + e.userInfo.shopId + "_" + e.userInfo.id
        ) ||
          n.ajaxAction({
            api: APITool.shop.getInfo,
            data: { id: Number(e.userInfo.shopId) },
            callback: function(i) {
              if (i.success) {
                if (i.value.logoImageSerial) {
                  var o = APITool.thumbUrl(i.value.logoImageSerial);
                  (i.value.thumbUrl = "url(" + o + ") no-repeat center center"),
                    (i.value.imgUrl = o);
                }
                (t.shopMemoName = i.value.memoName),
                  (t.shopName = i.value.nickName || t.row.serial),
                  (t.shopAddress = i.value.address),
                  (t.shopLogo = i.value.thumbUrl),
                  n.ajaxAction({
                    api: APITool.llPay.doIPlaceInTheShop,
                    data: { userId: e.userInfo.id },
                    callback: function(n) {
                      n.success &&
                        (n.value
                          ? localStorage.setItem(
                              "TRUST_" +
                                e.userInfo.shopId +
                                "_" +
                                e.userInfo.id,
                              1
                            )
                          : (t.isRefuse = 1));
                    }
                  });
              }
            }
          });
      },
      refuseHandler: function(n) {
        return n
          ? void (UtilTool.isWeiXin()
              ? wx.miniProgram.getEnv(function(e) {
                  e.miniprogram
                    ? wx.miniProgram.navigateBack()
                    : wx.closeWindow();
                })
              : UtilTool.isAndroid()
                ? window.android.closeWindow()
                : window.webkit.messageHandlers.closeWindow.postMessage())
          : ((t.isRefuse = 0),
            void localStorage.setItem(
              "TRUST_" + e.userInfo.shopId + "_" + e.userInfo.id,
              1
            ));
      },
      isShopAdmin: null,
      isThisShopAdmin: null,
      initShopAdminByPhone: function() {
        (e.isThisShopAdmin = 0),
          n.ajaxAction({
            api: APITool.shop.getShopInfoByPhoneMobile,
            data: { phoneMobile: t.phone },
            alertMsg: "no",
            callback: function(n) {
              n.success &&
                n.value &&
                ((e.userInfo.myShopId = n.value.id),
                (t.isShopAdmin = n.value.id),
                (e.isThisShopAdmin =
                  t.isShopAdmin === e.userInfo.shopId ? 1 : 0),
                (t.isThisShopAdmin = e.isThisShopAdmin));
            }
          });
      }
    });
    (window.fetchStarterInfo = function() {
      var e = t.$sharePd;
      return window.android && window.android.shareParam
        ? void window.android.shareParam(JSON.stringify(e))
        : e;
    }),
      avalon.scan(),
      e.forceInit(function() {
        return (
          (t.phone = e.userInfo.phoneMobile),
          (t.shopId = e.userInfo.shopId),
          (t.oldBalance = e.userInfo.balance),
          t.phone
            ? (t.initShopAdminByPhone(),
              (t.placerLevel = UtilTool.getLevelByPoint(
                e.userInfo.point,
                e.userInfo.sex
              )),
              (t.fromUrl =
                "index2" === UtilTool.getQueryStringByName("from")
                  ? "index2.html"
                  : "BOTH" === e.userInfo.shopType
                    ? null
                    : "FUCAI" === e.userInfo.shopType
                      ? "index.html"
                      : "TICAI" === e.userInfo.shopType
                        ? "index2.html"
                        : "index.html"),
              t.initShare(),
              t.initAgent(),
              t.initRefuseInfo(),
              e.userInfo.shopAgentInfo &&
                e.userInfo.shopAgentInfo.id &&
                ((t.shopAgentInfoState = e.userInfo.shopAgentInfo.state),
                (t.shopAgentInfoId = e.userInfo.shopAgentInfo.id),
                4 === t.shopAgentInfoState &&
                  ((t.shopAgentInfoState = -1), (t.shopAgentInfoId = -1))),
              e.initLLUserInfo(function(n) {
                (n.balanceTotal =
                  (Number(n.balance) || 0) +
                  (Number(e.userInfo.tranAmount) || 0)),
                  (t.llUserInfo = n),
                  (t.llUserId = n.userId),
                  (n && n.phoneMobile) || (t.visAuth = 1),
                  !t.llUserInfo ||
                  !t.llUserInfo.id ||
                  !t.llUserInfo.phoneMobile ||
                  t.llUserInfo.userState < 1
                    ? (t.showBank = !0)
                    : t.llUserInfo.payPwd
                      ? t.listBankHandler(t.llUserInfo.userId)
                      : (t.showBank = !0);
              }),
              void 0)
            : void (location.href =
                "redirect_login.html?from=" +
                encodeURIComponent(location.href) +
                "&sid=" +
                t.shopId)
        );
      });
  }),
  define("controllers/SelfController", function() {});
