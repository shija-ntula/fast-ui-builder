import { defineComponent as lt, ref as z, watch as ht, createBlock as S, openBlock as O, resolveDynamicComponent as M, normalizeClass as R, withCtx as F, createElementBlock as q, createCommentVNode as ne, renderSlot as X, createTextVNode as W, toDisplayString as Z, Fragment as oe, renderList as ce, createElementVNode as ue, reactive as nt, onMounted as Qt } from "vue";
var rt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, it = {};
/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var st;
function qt() {
  if (st) return it;
  st = 1;
  var t;
  return function(e) {
    (function(n) {
      var r = typeof globalThis == "object" ? globalThis : typeof rt == "object" ? rt : typeof self == "object" ? self : typeof this == "object" ? this : I(), i = s(e);
      typeof r.Reflect < "u" && (i = s(r.Reflect, i)), n(i, r), typeof r.Reflect > "u" && (r.Reflect = e);
      function s(C, w) {
        return function(P, k) {
          Object.defineProperty(C, P, { configurable: !0, writable: !0, value: k }), w && w(P, k);
        };
      }
      function l() {
        try {
          return Function("return this;")();
        } catch {
        }
      }
      function y() {
        try {
          return (0, eval)("(function() { return this; })()");
        } catch {
        }
      }
      function I() {
        return l() || y();
      }
    })(function(n, r) {
      var i = Object.prototype.hasOwnProperty, s = typeof Symbol == "function", l = s && typeof Symbol.toPrimitive < "u" ? Symbol.toPrimitive : "@@toPrimitive", y = s && typeof Symbol.iterator < "u" ? Symbol.iterator : "@@iterator", I = typeof Object.create == "function", C = { __proto__: [] } instanceof Array, w = !I && !C, P = {
        // create an object in dictionary mode (a.k.a. "slow" mode in v8)
        create: I ? function() {
          return Ce(/* @__PURE__ */ Object.create(null));
        } : C ? function() {
          return Ce({ __proto__: null });
        } : function() {
          return Ce({});
        },
        has: w ? function(a, o) {
          return i.call(a, o);
        } : function(a, o) {
          return o in a;
        },
        get: w ? function(a, o) {
          return i.call(a, o) ? a[o] : void 0;
        } : function(a, o) {
          return a[o];
        }
      }, k = Object.getPrototypeOf(Function), G = typeof Map == "function" && typeof Map.prototype.entries == "function" ? Map : Gt(), _ = typeof Set == "function" && typeof Set.prototype.entries == "function" ? Set : Yt(), $ = typeof WeakMap == "function" ? WeakMap : zt(), Q = s ? Symbol.for("@reflect-metadata:registry") : void 0, ee = Bt(), T = jt(ee);
      function H(a, o, c, h) {
        if (g(c)) {
          if (!Qe(a))
            throw new TypeError();
          if (!qe(o))
            throw new TypeError();
          return xt(a, o);
        } else {
          if (!Qe(a))
            throw new TypeError();
          if (!U(o))
            throw new TypeError();
          if (!U(h) && !g(h) && !te(h))
            throw new TypeError();
          return te(h) && (h = void 0), c = J(c), Mt(a, o, c, h);
        }
      }
      n("decorate", H);
      function Ie(a, o) {
        function c(h, E) {
          if (!U(h))
            throw new TypeError();
          if (!g(E) && !Ut(E))
            throw new TypeError();
          Ge(a, o, h, E);
        }
        return c;
      }
      n("metadata", Ie);
      function Oe(a, o, c, h) {
        if (!U(c))
          throw new TypeError();
        return g(h) || (h = J(h)), Ge(a, o, c, h);
      }
      n("defineMetadata", Oe);
      function wt(a, o, c) {
        if (!U(o))
          throw new TypeError();
        return g(c) || (c = J(c)), Be(a, o, c);
      }
      n("hasMetadata", wt);
      function _t(a, o, c) {
        if (!U(o))
          throw new TypeError();
        return g(c) || (c = J(c)), we(a, o, c);
      }
      n("hasOwnMetadata", _t);
      function At(a, o, c) {
        if (!U(o))
          throw new TypeError();
        return g(c) || (c = J(c)), je(a, o, c);
      }
      n("getMetadata", At);
      function Ct(a, o, c) {
        if (!U(o))
          throw new TypeError();
        return g(c) || (c = J(c)), $e(a, o, c);
      }
      n("getOwnMetadata", Ct);
      function kt(a, o) {
        if (!U(a))
          throw new TypeError();
        return g(o) || (o = J(o)), Ye(a, o);
      }
      n("getMetadataKeys", kt);
      function St(a, o) {
        if (!U(a))
          throw new TypeError();
        return g(o) || (o = J(o)), ze(a, o);
      }
      n("getOwnMetadataKeys", St);
      function Dt(a, o, c) {
        if (!U(o))
          throw new TypeError();
        if (g(c) || (c = J(c)), !U(o))
          throw new TypeError();
        g(c) || (c = J(c));
        var h = ae(
          o,
          c,
          /*Create*/
          !1
        );
        return g(h) ? !1 : h.OrdinaryDeleteMetadata(a, o, c);
      }
      n("deleteMetadata", Dt);
      function xt(a, o) {
        for (var c = a.length - 1; c >= 0; --c) {
          var h = a[c], E = h(o);
          if (!g(E) && !te(E)) {
            if (!qe(E))
              throw new TypeError();
            o = E;
          }
        }
        return o;
      }
      function Mt(a, o, c, h) {
        for (var E = a.length - 1; E >= 0; --E) {
          var D = a[E], V = D(o, c, h);
          if (!g(V) && !te(V)) {
            if (!U(V))
              throw new TypeError();
            h = V;
          }
        }
        return h;
      }
      function Be(a, o, c) {
        var h = we(a, o, c);
        if (h)
          return !0;
        var E = Ae(o);
        return te(E) ? !1 : Be(a, E, c);
      }
      function we(a, o, c) {
        var h = ae(
          o,
          c,
          /*Create*/
          !1
        );
        return g(h) ? !1 : We(h.OrdinaryHasOwnMetadata(a, o, c));
      }
      function je(a, o, c) {
        var h = we(a, o, c);
        if (h)
          return $e(a, o, c);
        var E = Ae(o);
        if (!te(E))
          return je(a, E, c);
      }
      function $e(a, o, c) {
        var h = ae(
          o,
          c,
          /*Create*/
          !1
        );
        if (!g(h))
          return h.OrdinaryGetOwnMetadata(a, o, c);
      }
      function Ge(a, o, c, h) {
        var E = ae(
          c,
          h,
          /*Create*/
          !0
        );
        E.OrdinaryDefineOwnMetadata(a, o, c, h);
      }
      function Ye(a, o) {
        var c = ze(a, o), h = Ae(a);
        if (h === null)
          return c;
        var E = Ye(h, o);
        if (E.length <= 0)
          return c;
        if (c.length <= 0)
          return E;
        for (var D = new _(), V = [], N = 0, d = c; N < d.length; N++) {
          var f = d[N], p = D.has(f);
          p || (D.add(f), V.push(f));
        }
        for (var m = 0, b = E; m < b.length; m++) {
          var f = b[m], p = D.has(f);
          p || (D.add(f), V.push(f));
        }
        return V;
      }
      function ze(a, o) {
        var c = ae(
          a,
          o,
          /*create*/
          !1
        );
        return c ? c.OrdinaryOwnMetadataKeys(a, o) : [];
      }
      function Je(a) {
        if (a === null)
          return 1;
        switch (typeof a) {
          case "undefined":
            return 0;
          case "boolean":
            return 2;
          case "string":
            return 3;
          case "symbol":
            return 4;
          case "number":
            return 5;
          case "object":
            return a === null ? 1 : 6;
          default:
            return 6;
        }
      }
      function g(a) {
        return a === void 0;
      }
      function te(a) {
        return a === null;
      }
      function Rt(a) {
        return typeof a == "symbol";
      }
      function U(a) {
        return typeof a == "object" ? a !== null : typeof a == "function";
      }
      function Ft(a, o) {
        switch (Je(a)) {
          case 0:
            return a;
          case 1:
            return a;
          case 2:
            return a;
          case 3:
            return a;
          case 4:
            return a;
          case 5:
            return a;
        }
        var c = "string", h = He(a, l);
        if (h !== void 0) {
          var E = h.call(a, c);
          if (U(E))
            throw new TypeError();
          return E;
        }
        return Lt(a);
      }
      function Lt(a, o) {
        var c, h, E;
        {
          var D = a.toString;
          if (fe(D)) {
            var h = D.call(a);
            if (!U(h))
              return h;
          }
          var c = a.valueOf;
          if (fe(c)) {
            var h = c.call(a);
            if (!U(h))
              return h;
          }
        }
        throw new TypeError();
      }
      function We(a) {
        return !!a;
      }
      function Pt(a) {
        return "" + a;
      }
      function J(a) {
        var o = Ft(a);
        return Rt(o) ? o : Pt(o);
      }
      function Qe(a) {
        return Array.isArray ? Array.isArray(a) : a instanceof Object ? a instanceof Array : Object.prototype.toString.call(a) === "[object Array]";
      }
      function fe(a) {
        return typeof a == "function";
      }
      function qe(a) {
        return typeof a == "function";
      }
      function Ut(a) {
        switch (Je(a)) {
          case 3:
            return !0;
          case 4:
            return !0;
          default:
            return !1;
        }
      }
      function _e(a, o) {
        return a === o || a !== a && o !== o;
      }
      function He(a, o) {
        var c = a[o];
        if (c != null) {
          if (!fe(c))
            throw new TypeError();
          return c;
        }
      }
      function Xe(a) {
        var o = He(a, y);
        if (!fe(o))
          throw new TypeError();
        var c = o.call(a);
        if (!U(c))
          throw new TypeError();
        return c;
      }
      function Ze(a) {
        return a.value;
      }
      function Ke(a) {
        var o = a.next();
        return o.done ? !1 : o;
      }
      function et(a) {
        var o = a.return;
        o && o.call(a);
      }
      function Ae(a) {
        var o = Object.getPrototypeOf(a);
        if (typeof a != "function" || a === k || o !== k)
          return o;
        var c = a.prototype, h = c && Object.getPrototypeOf(c);
        if (h == null || h === Object.prototype)
          return o;
        var E = h.constructor;
        return typeof E != "function" || E === a ? o : E;
      }
      function Vt() {
        var a;
        !g(Q) && typeof r.Reflect < "u" && !(Q in r.Reflect) && typeof r.Reflect.defineMetadata == "function" && (a = $t(r.Reflect));
        var o, c, h, E = new $(), D = {
          registerProvider: V,
          getProvider: d,
          setProvider: p
        };
        return D;
        function V(m) {
          if (!Object.isExtensible(D))
            throw new Error("Cannot add provider to a frozen registry.");
          switch (!0) {
            case a === m:
              break;
            case g(o):
              o = m;
              break;
            case o === m:
              break;
            case g(c):
              c = m;
              break;
            case c === m:
              break;
            default:
              h === void 0 && (h = new _()), h.add(m);
              break;
          }
        }
        function N(m, b) {
          if (!g(o)) {
            if (o.isProviderFor(m, b))
              return o;
            if (!g(c)) {
              if (c.isProviderFor(m, b))
                return o;
              if (!g(h))
                for (var A = Xe(h); ; ) {
                  var x = Ke(A);
                  if (!x)
                    return;
                  var Y = Ze(x);
                  if (Y.isProviderFor(m, b))
                    return et(A), Y;
                }
            }
          }
          if (!g(a) && a.isProviderFor(m, b))
            return a;
        }
        function d(m, b) {
          var A = E.get(m), x;
          return g(A) || (x = A.get(b)), g(x) && (x = N(m, b), g(x) || (g(A) && (A = new G(), E.set(m, A)), A.set(b, x))), x;
        }
        function f(m) {
          if (g(m))
            throw new TypeError();
          return o === m || c === m || !g(h) && h.has(m);
        }
        function p(m, b, A) {
          if (!f(A))
            throw new Error("Metadata provider not registered.");
          var x = d(m, b);
          if (x !== A) {
            if (!g(x))
              return !1;
            var Y = E.get(m);
            g(Y) && (Y = new G(), E.set(m, Y)), Y.set(b, A);
          }
          return !0;
        }
      }
      function Bt() {
        var a;
        return !g(Q) && U(r.Reflect) && Object.isExtensible(r.Reflect) && (a = r.Reflect[Q]), g(a) && (a = Vt()), !g(Q) && U(r.Reflect) && Object.isExtensible(r.Reflect) && Object.defineProperty(r.Reflect, Q, {
          enumerable: !1,
          configurable: !1,
          writable: !1,
          value: a
        }), a;
      }
      function jt(a) {
        var o = new $(), c = {
          isProviderFor: function(f, p) {
            var m = o.get(f);
            return g(m) ? !1 : m.has(p);
          },
          OrdinaryDefineOwnMetadata: V,
          OrdinaryHasOwnMetadata: E,
          OrdinaryGetOwnMetadata: D,
          OrdinaryOwnMetadataKeys: N,
          OrdinaryDeleteMetadata: d
        };
        return ee.registerProvider(c), c;
        function h(f, p, m) {
          var b = o.get(f), A = !1;
          if (g(b)) {
            if (!m)
              return;
            b = new G(), o.set(f, b), A = !0;
          }
          var x = b.get(p);
          if (g(x)) {
            if (!m)
              return;
            if (x = new G(), b.set(p, x), !a.setProvider(f, p, c))
              throw b.delete(p), A && o.delete(f), new Error("Wrong provider for target.");
          }
          return x;
        }
        function E(f, p, m) {
          var b = h(
            p,
            m,
            /*Create*/
            !1
          );
          return g(b) ? !1 : We(b.has(f));
        }
        function D(f, p, m) {
          var b = h(
            p,
            m,
            /*Create*/
            !1
          );
          if (!g(b))
            return b.get(f);
        }
        function V(f, p, m, b) {
          var A = h(
            m,
            b,
            /*Create*/
            !0
          );
          A.set(f, p);
        }
        function N(f, p) {
          var m = [], b = h(
            f,
            p,
            /*Create*/
            !1
          );
          if (g(b))
            return m;
          for (var A = b.keys(), x = Xe(A), Y = 0; ; ) {
            var tt = Ke(x);
            if (!tt)
              return m.length = Y, m;
            var Jt = Ze(tt);
            try {
              m[Y] = Jt;
            } catch (Wt) {
              try {
                et(x);
              } finally {
                throw Wt;
              }
            }
            Y++;
          }
        }
        function d(f, p, m) {
          var b = h(
            p,
            m,
            /*Create*/
            !1
          );
          if (g(b) || !b.delete(f))
            return !1;
          if (b.size === 0) {
            var A = o.get(p);
            g(A) || (A.delete(m), A.size === 0 && o.delete(A));
          }
          return !0;
        }
      }
      function $t(a) {
        var o = a.defineMetadata, c = a.hasOwnMetadata, h = a.getOwnMetadata, E = a.getOwnMetadataKeys, D = a.deleteMetadata, V = new $(), N = {
          isProviderFor: function(d, f) {
            var p = V.get(d);
            return !g(p) && p.has(f) ? !0 : E(d, f).length ? (g(p) && (p = new _(), V.set(d, p)), p.add(f), !0) : !1;
          },
          OrdinaryDefineOwnMetadata: o,
          OrdinaryHasOwnMetadata: c,
          OrdinaryGetOwnMetadata: h,
          OrdinaryOwnMetadataKeys: E,
          OrdinaryDeleteMetadata: D
        };
        return N;
      }
      function ae(a, o, c) {
        var h = ee.getProvider(a, o);
        if (!g(h))
          return h;
        if (c) {
          if (ee.setProvider(a, o, T))
            return T;
          throw new Error("Illegal state.");
        }
      }
      function Gt() {
        var a = {}, o = [], c = (
          /** @class */
          function() {
            function N(d, f, p) {
              this._index = 0, this._keys = d, this._values = f, this._selector = p;
            }
            return N.prototype["@@iterator"] = function() {
              return this;
            }, N.prototype[y] = function() {
              return this;
            }, N.prototype.next = function() {
              var d = this._index;
              if (d >= 0 && d < this._keys.length) {
                var f = this._selector(this._keys[d], this._values[d]);
                return d + 1 >= this._keys.length ? (this._index = -1, this._keys = o, this._values = o) : this._index++, { value: f, done: !1 };
              }
              return { value: void 0, done: !0 };
            }, N.prototype.throw = function(d) {
              throw this._index >= 0 && (this._index = -1, this._keys = o, this._values = o), d;
            }, N.prototype.return = function(d) {
              return this._index >= 0 && (this._index = -1, this._keys = o, this._values = o), { value: d, done: !0 };
            }, N;
          }()
        ), h = (
          /** @class */
          function() {
            function N() {
              this._keys = [], this._values = [], this._cacheKey = a, this._cacheIndex = -2;
            }
            return Object.defineProperty(N.prototype, "size", {
              get: function() {
                return this._keys.length;
              },
              enumerable: !0,
              configurable: !0
            }), N.prototype.has = function(d) {
              return this._find(
                d,
                /*insert*/
                !1
              ) >= 0;
            }, N.prototype.get = function(d) {
              var f = this._find(
                d,
                /*insert*/
                !1
              );
              return f >= 0 ? this._values[f] : void 0;
            }, N.prototype.set = function(d, f) {
              var p = this._find(
                d,
                /*insert*/
                !0
              );
              return this._values[p] = f, this;
            }, N.prototype.delete = function(d) {
              var f = this._find(
                d,
                /*insert*/
                !1
              );
              if (f >= 0) {
                for (var p = this._keys.length, m = f + 1; m < p; m++)
                  this._keys[m - 1] = this._keys[m], this._values[m - 1] = this._values[m];
                return this._keys.length--, this._values.length--, _e(d, this._cacheKey) && (this._cacheKey = a, this._cacheIndex = -2), !0;
              }
              return !1;
            }, N.prototype.clear = function() {
              this._keys.length = 0, this._values.length = 0, this._cacheKey = a, this._cacheIndex = -2;
            }, N.prototype.keys = function() {
              return new c(this._keys, this._values, E);
            }, N.prototype.values = function() {
              return new c(this._keys, this._values, D);
            }, N.prototype.entries = function() {
              return new c(this._keys, this._values, V);
            }, N.prototype["@@iterator"] = function() {
              return this.entries();
            }, N.prototype[y] = function() {
              return this.entries();
            }, N.prototype._find = function(d, f) {
              if (!_e(this._cacheKey, d)) {
                this._cacheIndex = -1;
                for (var p = 0; p < this._keys.length; p++)
                  if (_e(this._keys[p], d)) {
                    this._cacheIndex = p;
                    break;
                  }
              }
              return this._cacheIndex < 0 && f && (this._cacheIndex = this._keys.length, this._keys.push(d), this._values.push(void 0)), this._cacheIndex;
            }, N;
          }()
        );
        return h;
        function E(N, d) {
          return N;
        }
        function D(N, d) {
          return d;
        }
        function V(N, d) {
          return [N, d];
        }
      }
      function Yt() {
        var a = (
          /** @class */
          function() {
            function o() {
              this._map = new G();
            }
            return Object.defineProperty(o.prototype, "size", {
              get: function() {
                return this._map.size;
              },
              enumerable: !0,
              configurable: !0
            }), o.prototype.has = function(c) {
              return this._map.has(c);
            }, o.prototype.add = function(c) {
              return this._map.set(c, c), this;
            }, o.prototype.delete = function(c) {
              return this._map.delete(c);
            }, o.prototype.clear = function() {
              this._map.clear();
            }, o.prototype.keys = function() {
              return this._map.keys();
            }, o.prototype.values = function() {
              return this._map.keys();
            }, o.prototype.entries = function() {
              return this._map.entries();
            }, o.prototype["@@iterator"] = function() {
              return this.keys();
            }, o.prototype[y] = function() {
              return this.keys();
            }, o;
          }()
        );
        return a;
      }
      function zt() {
        var a = 16, o = P.create(), c = h();
        return (
          /** @class */
          function() {
            function d() {
              this._key = h();
            }
            return d.prototype.has = function(f) {
              var p = E(
                f,
                /*create*/
                !1
              );
              return p !== void 0 ? P.has(p, this._key) : !1;
            }, d.prototype.get = function(f) {
              var p = E(
                f,
                /*create*/
                !1
              );
              return p !== void 0 ? P.get(p, this._key) : void 0;
            }, d.prototype.set = function(f, p) {
              var m = E(
                f,
                /*create*/
                !0
              );
              return m[this._key] = p, this;
            }, d.prototype.delete = function(f) {
              var p = E(
                f,
                /*create*/
                !1
              );
              return p !== void 0 ? delete p[this._key] : !1;
            }, d.prototype.clear = function() {
              this._key = h();
            }, d;
          }()
        );
        function h() {
          var d;
          do
            d = "@@WeakMap@@" + N();
          while (P.has(o, d));
          return o[d] = !0, d;
        }
        function E(d, f) {
          if (!i.call(d, c)) {
            if (!f)
              return;
            Object.defineProperty(d, c, { value: P.create() });
          }
          return d[c];
        }
        function D(d, f) {
          for (var p = 0; p < f; ++p)
            d[p] = Math.random() * 255 | 0;
          return d;
        }
        function V(d) {
          if (typeof Uint8Array == "function") {
            var f = new Uint8Array(d);
            return typeof crypto < "u" ? crypto.getRandomValues(f) : typeof msCrypto < "u" ? msCrypto.getRandomValues(f) : D(f, d), f;
          }
          return D(new Array(d), d);
        }
        function N() {
          var d = V(a);
          d[6] = d[6] & 79 | 64, d[8] = d[8] & 191 | 128;
          for (var f = "", p = 0; p < a; ++p) {
            var m = d[p];
            (p === 4 || p === 6 || p === 8) && (f += "-"), m < 16 && (f += "0"), f += m.toString(16).toLowerCase();
          }
          return f;
        }
      }
      function Ce(a) {
        return a.__ = void 0, delete a.__, a;
      }
    });
  }(t || (t = {})), it;
}
qt();
const Xn = Symbol("column_metadata"), De = (t) => `column_metadata_${t}`;
function Le(t = {}) {
  return function(e, n) {
    const r = e.constructor, i = Reflect.getMetadata(De(r.name), r) || {};
    i[n] = { field: n, ...t }, Reflect.defineMetadata(De(r.name), i, r);
  };
}
function pe(t) {
  return Reflect.getMetadata(De(t.name), t) || {};
}
const at = (t) => t.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase().replace(/\b\w/g, (e) => e.toUpperCase());
function ke(t, e) {
  if (!!!t)
    throw new Error(e);
}
function Ht(t) {
  return typeof t == "object" && t !== null;
}
function Xt(t, e) {
  if (!!!t)
    throw new Error(
      "Unexpected invariant triggered."
    );
}
const Zt = /\r\n|[\n\r]/g;
function xe(t, e) {
  let n = 0, r = 1;
  for (const i of t.body.matchAll(Zt)) {
    if (typeof i.index == "number" || Xt(!1), i.index >= e)
      break;
    n = i.index + i[0].length, r += 1;
  }
  return {
    line: r,
    column: e + 1 - n
  };
}
function Kt(t) {
  return dt(
    t.source,
    xe(t.source, t.start)
  );
}
function dt(t, e) {
  const n = t.locationOffset.column - 1, r = "".padStart(n) + t.body, i = e.line - 1, s = t.locationOffset.line - 1, l = e.line + s, y = e.line === 1 ? n : 0, I = e.column + y, C = `${t.name}:${l}:${I}
`, w = r.split(/\r\n|[\n\r]/g), P = w[i];
  if (P.length > 120) {
    const k = Math.floor(I / 80), G = I % 80, _ = [];
    for (let $ = 0; $ < P.length; $ += 80)
      _.push(P.slice($, $ + 80));
    return C + ot([
      [`${l} |`, _[0]],
      ..._.slice(1, k + 1).map(($) => ["|", $]),
      ["|", "^".padStart(G)],
      ["|", _[k + 1]]
    ]);
  }
  return C + ot([
    // Lines specified like this: ["prefix", "string"],
    [`${l - 1} |`, w[i - 1]],
    [`${l} |`, P],
    ["|", "^".padStart(I)],
    [`${l + 1} |`, w[i + 1]]
  ]);
}
function ot(t) {
  const e = t.filter(([r, i]) => i !== void 0), n = Math.max(...e.map(([r]) => r.length));
  return e.map(([r, i]) => r.padStart(n) + (i ? " " + i : "")).join(`
`);
}
function en(t) {
  const e = t[0];
  return e == null || "kind" in e || "length" in e ? {
    nodes: e,
    source: t[1],
    positions: t[2],
    path: t[3],
    originalError: t[4],
    extensions: t[5]
  } : e;
}
class Pe extends Error {
  /**
   * An array of `{ line, column }` locations within the source GraphQL document
   * which correspond to this error.
   *
   * Errors during validation often contain multiple locations, for example to
   * point out two things with the same name. Errors during execution include a
   * single location, the field which produced the error.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */
  /**
   * An array describing the JSON-path into the execution response which
   * corresponds to this error. Only included for errors during execution.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */
  /**
   * An array of GraphQL AST Nodes corresponding to this error.
   */
  /**
   * The source GraphQL document for the first location of this error.
   *
   * Note that if this Error represents more than one node, the source may not
   * represent nodes after the first node.
   */
  /**
   * An array of character offsets within the source GraphQL document
   * which correspond to this error.
   */
  /**
   * The original error thrown from a field resolver during execution.
   */
  /**
   * Extension fields to add to the formatted error.
   */
  /**
   * @deprecated Please use the `GraphQLErrorOptions` constructor overload instead.
   */
  constructor(e, ...n) {
    var r, i, s;
    const { nodes: l, source: y, positions: I, path: C, originalError: w, extensions: P } = en(n);
    super(e), this.name = "GraphQLError", this.path = C ?? void 0, this.originalError = w ?? void 0, this.nodes = ct(
      Array.isArray(l) ? l : l ? [l] : void 0
    );
    const k = ct(
      (r = this.nodes) === null || r === void 0 ? void 0 : r.map((_) => _.loc).filter((_) => _ != null)
    );
    this.source = y ?? (k == null || (i = k[0]) === null || i === void 0 ? void 0 : i.source), this.positions = I ?? k?.map((_) => _.start), this.locations = I && y ? I.map((_) => xe(y, _)) : k?.map((_) => xe(_.source, _.start));
    const G = Ht(
      w?.extensions
    ) ? w?.extensions : void 0;
    this.extensions = (s = P ?? G) !== null && s !== void 0 ? s : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
      message: {
        writable: !0,
        enumerable: !0
      },
      name: {
        enumerable: !1
      },
      nodes: {
        enumerable: !1
      },
      source: {
        enumerable: !1
      },
      positions: {
        enumerable: !1
      },
      originalError: {
        enumerable: !1
      }
    }), w != null && w.stack ? Object.defineProperty(this, "stack", {
      value: w.stack,
      writable: !0,
      configurable: !0
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, Pe) : Object.defineProperty(this, "stack", {
      value: Error().stack,
      writable: !0,
      configurable: !0
    });
  }
  get [Symbol.toStringTag]() {
    return "GraphQLError";
  }
  toString() {
    let e = this.message;
    if (this.nodes)
      for (const n of this.nodes)
        n.loc && (e += `

` + Kt(n.loc));
    else if (this.source && this.locations)
      for (const n of this.locations)
        e += `

` + dt(this.source, n);
    return e;
  }
  toJSON() {
    const e = {
      message: this.message
    };
    return this.locations != null && (e.locations = this.locations), this.path != null && (e.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (e.extensions = this.extensions), e;
  }
}
function ct(t) {
  return t === void 0 || t.length === 0 ? void 0 : t;
}
function j(t, e, n) {
  return new Pe(`Syntax Error: ${n}`, {
    source: t,
    positions: [e]
  });
}
class tn {
  /**
   * The character offset at which this Node begins.
   */
  /**
   * The character offset at which this Node ends.
   */
  /**
   * The Token at which this Node begins.
   */
  /**
   * The Token at which this Node ends.
   */
  /**
   * The Source document the AST represents.
   */
  constructor(e, n, r) {
    this.start = e.start, this.end = n.end, this.startToken = e, this.endToken = n, this.source = r;
  }
  get [Symbol.toStringTag]() {
    return "Location";
  }
  toJSON() {
    return {
      start: this.start,
      end: this.end
    };
  }
}
class ft {
  /**
   * The kind of Token.
   */
  /**
   * The character offset at which this Node begins.
   */
  /**
   * The character offset at which this Node ends.
   */
  /**
   * The 1-indexed line number on which this Token appears.
   */
  /**
   * The 1-indexed column number at which this Token begins.
   */
  /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   *
   * Note: is undefined for punctuation tokens, but typed as string for
   * convenience in the parser.
   */
  /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */
  constructor(e, n, r, i, s, l) {
    this.kind = e, this.start = n, this.end = r, this.line = i, this.column = s, this.value = l, this.prev = null, this.next = null;
  }
  get [Symbol.toStringTag]() {
    return "Token";
  }
  toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column
    };
  }
}
const nn = {
  Name: [],
  Document: ["definitions"],
  OperationDefinition: [
    "name",
    "variableDefinitions",
    "directives",
    "selectionSet"
  ],
  VariableDefinition: ["variable", "type", "defaultValue", "directives"],
  Variable: ["name"],
  SelectionSet: ["selections"],
  Field: ["alias", "name", "arguments", "directives", "selectionSet"],
  Argument: ["name", "value"],
  FragmentSpread: ["name", "directives"],
  InlineFragment: ["typeCondition", "directives", "selectionSet"],
  FragmentDefinition: [
    "name",
    // Note: fragment variable definitions are deprecated and will removed in v17.0.0
    "variableDefinitions",
    "typeCondition",
    "directives",
    "selectionSet"
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ["values"],
  ObjectValue: ["fields"],
  ObjectField: ["name", "value"],
  Directive: ["name", "arguments"],
  NamedType: ["name"],
  ListType: ["type"],
  NonNullType: ["type"],
  SchemaDefinition: ["description", "directives", "operationTypes"],
  OperationTypeDefinition: ["type"],
  ScalarTypeDefinition: ["description", "name", "directives"],
  ObjectTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  FieldDefinition: ["description", "name", "arguments", "type", "directives"],
  InputValueDefinition: [
    "description",
    "name",
    "type",
    "defaultValue",
    "directives"
  ],
  InterfaceTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  UnionTypeDefinition: ["description", "name", "directives", "types"],
  EnumTypeDefinition: ["description", "name", "directives", "values"],
  EnumValueDefinition: ["description", "name", "directives"],
  InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
  DirectiveDefinition: ["description", "name", "arguments", "locations"],
  SchemaExtension: ["directives", "operationTypes"],
  ScalarTypeExtension: ["name", "directives"],
  ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
  InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
  UnionTypeExtension: ["name", "directives", "types"],
  EnumTypeExtension: ["name", "directives", "values"],
  InputObjectTypeExtension: ["name", "directives", "fields"]
};
new Set(Object.keys(nn));
var re;
(function(t) {
  t.QUERY = "query", t.MUTATION = "mutation", t.SUBSCRIPTION = "subscription";
})(re || (re = {}));
var Me;
(function(t) {
  t.QUERY = "QUERY", t.MUTATION = "MUTATION", t.SUBSCRIPTION = "SUBSCRIPTION", t.FIELD = "FIELD", t.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", t.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", t.INLINE_FRAGMENT = "INLINE_FRAGMENT", t.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", t.SCHEMA = "SCHEMA", t.SCALAR = "SCALAR", t.OBJECT = "OBJECT", t.FIELD_DEFINITION = "FIELD_DEFINITION", t.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", t.INTERFACE = "INTERFACE", t.UNION = "UNION", t.ENUM = "ENUM", t.ENUM_VALUE = "ENUM_VALUE", t.INPUT_OBJECT = "INPUT_OBJECT", t.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(Me || (Me = {}));
var v;
(function(t) {
  t.NAME = "Name", t.DOCUMENT = "Document", t.OPERATION_DEFINITION = "OperationDefinition", t.VARIABLE_DEFINITION = "VariableDefinition", t.SELECTION_SET = "SelectionSet", t.FIELD = "Field", t.ARGUMENT = "Argument", t.FRAGMENT_SPREAD = "FragmentSpread", t.INLINE_FRAGMENT = "InlineFragment", t.FRAGMENT_DEFINITION = "FragmentDefinition", t.VARIABLE = "Variable", t.INT = "IntValue", t.FLOAT = "FloatValue", t.STRING = "StringValue", t.BOOLEAN = "BooleanValue", t.NULL = "NullValue", t.ENUM = "EnumValue", t.LIST = "ListValue", t.OBJECT = "ObjectValue", t.OBJECT_FIELD = "ObjectField", t.DIRECTIVE = "Directive", t.NAMED_TYPE = "NamedType", t.LIST_TYPE = "ListType", t.NON_NULL_TYPE = "NonNullType", t.SCHEMA_DEFINITION = "SchemaDefinition", t.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", t.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", t.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", t.FIELD_DEFINITION = "FieldDefinition", t.INPUT_VALUE_DEFINITION = "InputValueDefinition", t.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", t.UNION_TYPE_DEFINITION = "UnionTypeDefinition", t.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", t.ENUM_VALUE_DEFINITION = "EnumValueDefinition", t.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", t.DIRECTIVE_DEFINITION = "DirectiveDefinition", t.SCHEMA_EXTENSION = "SchemaExtension", t.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", t.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", t.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", t.UNION_TYPE_EXTENSION = "UnionTypeExtension", t.ENUM_TYPE_EXTENSION = "EnumTypeExtension", t.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(v || (v = {}));
function rn(t) {
  return t === 9 || t === 32;
}
function de(t) {
  return t >= 48 && t <= 57;
}
function pt(t) {
  return t >= 97 && t <= 122 || // A-Z
  t >= 65 && t <= 90;
}
function mt(t) {
  return pt(t) || t === 95;
}
function sn(t) {
  return pt(t) || de(t) || t === 95;
}
function an(t) {
  var e;
  let n = Number.MAX_SAFE_INTEGER, r = null, i = -1;
  for (let l = 0; l < t.length; ++l) {
    var s;
    const y = t[l], I = on(y);
    I !== y.length && (r = (s = r) !== null && s !== void 0 ? s : l, i = l, l !== 0 && I < n && (n = I));
  }
  return t.map((l, y) => y === 0 ? l : l.slice(n)).slice(
    (e = r) !== null && e !== void 0 ? e : 0,
    i + 1
  );
}
function on(t) {
  let e = 0;
  for (; e < t.length && rn(t.charCodeAt(e)); )
    ++e;
  return e;
}
var u;
(function(t) {
  t.SOF = "<SOF>", t.EOF = "<EOF>", t.BANG = "!", t.DOLLAR = "$", t.AMP = "&", t.PAREN_L = "(", t.PAREN_R = ")", t.SPREAD = "...", t.COLON = ":", t.EQUALS = "=", t.AT = "@", t.BRACKET_L = "[", t.BRACKET_R = "]", t.BRACE_L = "{", t.PIPE = "|", t.BRACE_R = "}", t.NAME = "Name", t.INT = "Int", t.FLOAT = "Float", t.STRING = "String", t.BLOCK_STRING = "BlockString", t.COMMENT = "Comment";
})(u || (u = {}));
class cn {
  /**
   * The previously focused non-ignored token.
   */
  /**
   * The currently focused non-ignored token.
   */
  /**
   * The (1-indexed) line containing the current token.
   */
  /**
   * The character offset at which the current line begins.
   */
  constructor(e) {
    const n = new ft(u.SOF, 0, 0, 0, 0);
    this.source = e, this.lastToken = n, this.token = n, this.line = 1, this.lineStart = 0;
  }
  get [Symbol.toStringTag]() {
    return "Lexer";
  }
  /**
   * Advances the token stream to the next non-ignored token.
   */
  advance() {
    return this.lastToken = this.token, this.token = this.lookahead();
  }
  /**
   * Looks ahead and returns the next non-ignored token, but does not change
   * the state of Lexer.
   */
  lookahead() {
    let e = this.token;
    if (e.kind !== u.EOF)
      do
        if (e.next)
          e = e.next;
        else {
          const n = ln(this, e.end);
          e.next = n, n.prev = e, e = n;
        }
      while (e.kind === u.COMMENT);
    return e;
  }
}
function un(t) {
  return t === u.BANG || t === u.DOLLAR || t === u.AMP || t === u.PAREN_L || t === u.PAREN_R || t === u.SPREAD || t === u.COLON || t === u.EQUALS || t === u.AT || t === u.BRACKET_L || t === u.BRACKET_R || t === u.BRACE_L || t === u.PIPE || t === u.BRACE_R;
}
function se(t) {
  return t >= 0 && t <= 55295 || t >= 57344 && t <= 1114111;
}
function Te(t, e) {
  return yt(t.charCodeAt(e)) && Et(t.charCodeAt(e + 1));
}
function yt(t) {
  return t >= 55296 && t <= 56319;
}
function Et(t) {
  return t >= 56320 && t <= 57343;
}
function K(t, e) {
  const n = t.source.body.codePointAt(e);
  if (n === void 0)
    return u.EOF;
  if (n >= 32 && n <= 126) {
    const r = String.fromCodePoint(n);
    return r === '"' ? `'"'` : `"${r}"`;
  }
  return "U+" + n.toString(16).toUpperCase().padStart(4, "0");
}
function L(t, e, n, r, i) {
  const s = t.line, l = 1 + n - t.lineStart;
  return new ft(e, n, r, s, l, i);
}
function ln(t, e) {
  const n = t.source.body, r = n.length;
  let i = e;
  for (; i < r; ) {
    const s = n.charCodeAt(i);
    switch (s) {
      // Ignored ::
      //   - UnicodeBOM
      //   - WhiteSpace
      //   - LineTerminator
      //   - Comment
      //   - Comma
      //
      // UnicodeBOM :: "Byte Order Mark (U+FEFF)"
      //
      // WhiteSpace ::
      //   - "Horizontal Tab (U+0009)"
      //   - "Space (U+0020)"
      //
      // Comma :: ,
      case 65279:
      // <BOM>
      case 9:
      // \t
      case 32:
      // <space>
      case 44:
        ++i;
        continue;
      // LineTerminator ::
      //   - "New Line (U+000A)"
      //   - "Carriage Return (U+000D)" [lookahead != "New Line (U+000A)"]
      //   - "Carriage Return (U+000D)" "New Line (U+000A)"
      case 10:
        ++i, ++t.line, t.lineStart = i;
        continue;
      case 13:
        n.charCodeAt(i + 1) === 10 ? i += 2 : ++i, ++t.line, t.lineStart = i;
        continue;
      // Comment
      case 35:
        return hn(t, i);
      // Token ::
      //   - Punctuator
      //   - Name
      //   - IntValue
      //   - FloatValue
      //   - StringValue
      //
      // Punctuator :: one of ! $ & ( ) ... : = @ [ ] { | }
      case 33:
        return L(t, u.BANG, i, i + 1);
      case 36:
        return L(t, u.DOLLAR, i, i + 1);
      case 38:
        return L(t, u.AMP, i, i + 1);
      case 40:
        return L(t, u.PAREN_L, i, i + 1);
      case 41:
        return L(t, u.PAREN_R, i, i + 1);
      case 46:
        if (n.charCodeAt(i + 1) === 46 && n.charCodeAt(i + 2) === 46)
          return L(t, u.SPREAD, i, i + 3);
        break;
      case 58:
        return L(t, u.COLON, i, i + 1);
      case 61:
        return L(t, u.EQUALS, i, i + 1);
      case 64:
        return L(t, u.AT, i, i + 1);
      case 91:
        return L(t, u.BRACKET_L, i, i + 1);
      case 93:
        return L(t, u.BRACKET_R, i, i + 1);
      case 123:
        return L(t, u.BRACE_L, i, i + 1);
      case 124:
        return L(t, u.PIPE, i, i + 1);
      case 125:
        return L(t, u.BRACE_R, i, i + 1);
      // StringValue
      case 34:
        return n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34 ? En(t, i) : fn(t, i);
    }
    if (de(s) || s === 45)
      return dn(t, i, s);
    if (mt(s))
      return vn(t, i);
    throw j(
      t.source,
      i,
      s === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : se(s) || Te(n, i) ? `Unexpected character: ${K(t, i)}.` : `Invalid character: ${K(t, i)}.`
    );
  }
  return L(t, u.EOF, r, r);
}
function hn(t, e) {
  const n = t.source.body, r = n.length;
  let i = e + 1;
  for (; i < r; ) {
    const s = n.charCodeAt(i);
    if (s === 10 || s === 13)
      break;
    if (se(s))
      ++i;
    else if (Te(n, i))
      i += 2;
    else
      break;
  }
  return L(
    t,
    u.COMMENT,
    e,
    i,
    n.slice(e + 1, i)
  );
}
function dn(t, e, n) {
  const r = t.source.body;
  let i = e, s = n, l = !1;
  if (s === 45 && (s = r.charCodeAt(++i)), s === 48) {
    if (s = r.charCodeAt(++i), de(s))
      throw j(
        t.source,
        i,
        `Invalid number, unexpected digit after 0: ${K(
          t,
          i
        )}.`
      );
  } else
    i = Se(t, i, s), s = r.charCodeAt(i);
  if (s === 46 && (l = !0, s = r.charCodeAt(++i), i = Se(t, i, s), s = r.charCodeAt(i)), (s === 69 || s === 101) && (l = !0, s = r.charCodeAt(++i), (s === 43 || s === 45) && (s = r.charCodeAt(++i)), i = Se(t, i, s), s = r.charCodeAt(i)), s === 46 || mt(s))
    throw j(
      t.source,
      i,
      `Invalid number, expected digit but got: ${K(
        t,
        i
      )}.`
    );
  return L(
    t,
    l ? u.FLOAT : u.INT,
    e,
    i,
    r.slice(e, i)
  );
}
function Se(t, e, n) {
  if (!de(n))
    throw j(
      t.source,
      e,
      `Invalid number, expected digit but got: ${K(
        t,
        e
      )}.`
    );
  const r = t.source.body;
  let i = e + 1;
  for (; de(r.charCodeAt(i)); )
    ++i;
  return i;
}
function fn(t, e) {
  const n = t.source.body, r = n.length;
  let i = e + 1, s = i, l = "";
  for (; i < r; ) {
    const y = n.charCodeAt(i);
    if (y === 34)
      return l += n.slice(s, i), L(t, u.STRING, e, i + 1, l);
    if (y === 92) {
      l += n.slice(s, i);
      const I = n.charCodeAt(i + 1) === 117 ? n.charCodeAt(i + 2) === 123 ? pn(t, i) : mn(t, i) : yn(t, i);
      l += I.value, i += I.size, s = i;
      continue;
    }
    if (y === 10 || y === 13)
      break;
    if (se(y))
      ++i;
    else if (Te(n, i))
      i += 2;
    else
      throw j(
        t.source,
        i,
        `Invalid character within String: ${K(
          t,
          i
        )}.`
      );
  }
  throw j(t.source, i, "Unterminated string.");
}
function pn(t, e) {
  const n = t.source.body;
  let r = 0, i = 3;
  for (; i < 12; ) {
    const s = n.charCodeAt(e + i++);
    if (s === 125) {
      if (i < 5 || !se(r))
        break;
      return {
        value: String.fromCodePoint(r),
        size: i
      };
    }
    if (r = r << 4 | he(s), r < 0)
      break;
  }
  throw j(
    t.source,
    e,
    `Invalid Unicode escape sequence: "${n.slice(
      e,
      e + i
    )}".`
  );
}
function mn(t, e) {
  const n = t.source.body, r = ut(n, e + 2);
  if (se(r))
    return {
      value: String.fromCodePoint(r),
      size: 6
    };
  if (yt(r) && n.charCodeAt(e + 6) === 92 && n.charCodeAt(e + 7) === 117) {
    const i = ut(n, e + 8);
    if (Et(i))
      return {
        value: String.fromCodePoint(r, i),
        size: 12
      };
  }
  throw j(
    t.source,
    e,
    `Invalid Unicode escape sequence: "${n.slice(e, e + 6)}".`
  );
}
function ut(t, e) {
  return he(t.charCodeAt(e)) << 12 | he(t.charCodeAt(e + 1)) << 8 | he(t.charCodeAt(e + 2)) << 4 | he(t.charCodeAt(e + 3));
}
function he(t) {
  return t >= 48 && t <= 57 ? t - 48 : t >= 65 && t <= 70 ? t - 55 : t >= 97 && t <= 102 ? t - 87 : -1;
}
function yn(t, e) {
  const n = t.source.body;
  switch (n.charCodeAt(e + 1)) {
    case 34:
      return {
        value: '"',
        size: 2
      };
    case 92:
      return {
        value: "\\",
        size: 2
      };
    case 47:
      return {
        value: "/",
        size: 2
      };
    case 98:
      return {
        value: "\b",
        size: 2
      };
    case 102:
      return {
        value: "\f",
        size: 2
      };
    case 110:
      return {
        value: `
`,
        size: 2
      };
    case 114:
      return {
        value: "\r",
        size: 2
      };
    case 116:
      return {
        value: "	",
        size: 2
      };
  }
  throw j(
    t.source,
    e,
    `Invalid character escape sequence: "${n.slice(
      e,
      e + 2
    )}".`
  );
}
function En(t, e) {
  const n = t.source.body, r = n.length;
  let i = t.lineStart, s = e + 3, l = s, y = "";
  const I = [];
  for (; s < r; ) {
    const C = n.charCodeAt(s);
    if (C === 34 && n.charCodeAt(s + 1) === 34 && n.charCodeAt(s + 2) === 34) {
      y += n.slice(l, s), I.push(y);
      const w = L(
        t,
        u.BLOCK_STRING,
        e,
        s + 3,
        // Return a string of the lines joined with U+000A.
        an(I).join(`
`)
      );
      return t.line += I.length - 1, t.lineStart = i, w;
    }
    if (C === 92 && n.charCodeAt(s + 1) === 34 && n.charCodeAt(s + 2) === 34 && n.charCodeAt(s + 3) === 34) {
      y += n.slice(l, s), l = s + 1, s += 4;
      continue;
    }
    if (C === 10 || C === 13) {
      y += n.slice(l, s), I.push(y), C === 13 && n.charCodeAt(s + 1) === 10 ? s += 2 : ++s, y = "", l = s, i = s;
      continue;
    }
    if (se(C))
      ++s;
    else if (Te(n, s))
      s += 2;
    else
      throw j(
        t.source,
        s,
        `Invalid character within String: ${K(
          t,
          s
        )}.`
      );
  }
  throw j(t.source, s, "Unterminated string.");
}
function vn(t, e) {
  const n = t.source.body, r = n.length;
  let i = e + 1;
  for (; i < r; ) {
    const s = n.charCodeAt(i);
    if (sn(s))
      ++i;
    else
      break;
  }
  return L(
    t,
    u.NAME,
    e,
    i,
    n.slice(e, i)
  );
}
const gn = 10, vt = 2;
function gt(t) {
  return Ne(t, []);
}
function Ne(t, e) {
  switch (typeof t) {
    case "string":
      return JSON.stringify(t);
    case "function":
      return t.name ? `[function ${t.name}]` : "[function]";
    case "object":
      return Tn(t, e);
    default:
      return String(t);
  }
}
function Tn(t, e) {
  if (t === null)
    return "null";
  if (e.includes(t))
    return "[Circular]";
  const n = [...e, t];
  if (Nn(t)) {
    const r = t.toJSON();
    if (r !== t)
      return typeof r == "string" ? r : Ne(r, n);
  } else if (Array.isArray(t))
    return In(t, n);
  return bn(t, n);
}
function Nn(t) {
  return typeof t.toJSON == "function";
}
function bn(t, e) {
  const n = Object.entries(t);
  return n.length === 0 ? "{}" : e.length > vt ? "[" + On(t) + "]" : "{ " + n.map(
    ([i, s]) => i + ": " + Ne(s, e)
  ).join(", ") + " }";
}
function In(t, e) {
  if (t.length === 0)
    return "[]";
  if (e.length > vt)
    return "[Array]";
  const n = Math.min(gn, t.length), r = t.length - n, i = [];
  for (let s = 0; s < n; ++s)
    i.push(Ne(t[s], e));
  return r === 1 ? i.push("... 1 more item") : r > 1 && i.push(`... ${r} more items`), "[" + i.join(", ") + "]";
}
function On(t) {
  const e = Object.prototype.toString.call(t).replace(/^\[object /, "").replace(/]$/, "");
  if (e === "Object" && typeof t.constructor == "function") {
    const n = t.constructor.name;
    if (typeof n == "string" && n !== "")
      return n;
  }
  return e;
}
const wn = globalThis.process && // eslint-disable-next-line no-undef
process.env.NODE_ENV === "production", _n = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  wn ? function(e, n) {
    return e instanceof n;
  } : function(e, n) {
    if (e instanceof n)
      return !0;
    if (typeof e == "object" && e !== null) {
      var r;
      const i = n.prototype[Symbol.toStringTag], s = (
        // We still need to support constructor's name to detect conflicts with older versions of this library.
        Symbol.toStringTag in e ? e[Symbol.toStringTag] : (r = e.constructor) === null || r === void 0 ? void 0 : r.name
      );
      if (i === s) {
        const l = gt(e);
        throw new Error(`Cannot use ${i} "${l}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
      }
    }
    return !1;
  }
);
class Tt {
  constructor(e, n = "GraphQL request", r = {
    line: 1,
    column: 1
  }) {
    typeof e == "string" || ke(!1, `Body must be a string. Received: ${gt(e)}.`), this.body = e, this.name = n, this.locationOffset = r, this.locationOffset.line > 0 || ke(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || ke(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function An(t) {
  return _n(t, Tt);
}
function Cn(t, e) {
  const n = new kn(t, e), r = n.parseDocument();
  return Object.defineProperty(r, "tokenCount", {
    enumerable: !1,
    value: n.tokenCount
  }), r;
}
class kn {
  constructor(e, n = {}) {
    const r = An(e) ? e : new Tt(e);
    this._lexer = new cn(r), this._options = n, this._tokenCounter = 0;
  }
  get tokenCount() {
    return this._tokenCounter;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const e = this.expectToken(u.NAME);
    return this.node(e, {
      kind: v.NAME,
      value: e.value
    });
  }
  // Implements the parsing rules in the Document section.
  /**
   * Document : Definition+
   */
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: v.DOCUMENT,
      definitions: this.many(
        u.SOF,
        this.parseDefinition,
        u.EOF
      )
    });
  }
  /**
   * Definition :
   *   - ExecutableDefinition
   *   - TypeSystemDefinition
   *   - TypeSystemExtension
   *
   * ExecutableDefinition :
   *   - OperationDefinition
   *   - FragmentDefinition
   *
   * TypeSystemDefinition :
   *   - SchemaDefinition
   *   - TypeDefinition
   *   - DirectiveDefinition
   *
   * TypeDefinition :
   *   - ScalarTypeDefinition
   *   - ObjectTypeDefinition
   *   - InterfaceTypeDefinition
   *   - UnionTypeDefinition
   *   - EnumTypeDefinition
   *   - InputObjectTypeDefinition
   */
  parseDefinition() {
    if (this.peek(u.BRACE_L))
      return this.parseOperationDefinition();
    const e = this.peekDescription(), n = e ? this._lexer.lookahead() : this._lexer.token;
    if (n.kind === u.NAME) {
      switch (n.value) {
        case "schema":
          return this.parseSchemaDefinition();
        case "scalar":
          return this.parseScalarTypeDefinition();
        case "type":
          return this.parseObjectTypeDefinition();
        case "interface":
          return this.parseInterfaceTypeDefinition();
        case "union":
          return this.parseUnionTypeDefinition();
        case "enum":
          return this.parseEnumTypeDefinition();
        case "input":
          return this.parseInputObjectTypeDefinition();
        case "directive":
          return this.parseDirectiveDefinition();
      }
      if (e)
        throw j(
          this._lexer.source,
          this._lexer.token.start,
          "Unexpected description, descriptions are supported only on type definitions."
        );
      switch (n.value) {
        case "query":
        case "mutation":
        case "subscription":
          return this.parseOperationDefinition();
        case "fragment":
          return this.parseFragmentDefinition();
        case "extend":
          return this.parseTypeSystemExtension();
      }
    }
    throw this.unexpected(n);
  }
  // Implements the parsing rules in the Operations section.
  /**
   * OperationDefinition :
   *  - SelectionSet
   *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
   */
  parseOperationDefinition() {
    const e = this._lexer.token;
    if (this.peek(u.BRACE_L))
      return this.node(e, {
        kind: v.OPERATION_DEFINITION,
        operation: re.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const n = this.parseOperationType();
    let r;
    return this.peek(u.NAME) && (r = this.parseName()), this.node(e, {
      kind: v.OPERATION_DEFINITION,
      operation: n,
      name: r,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * OperationType : one of query mutation subscription
   */
  parseOperationType() {
    const e = this.expectToken(u.NAME);
    switch (e.value) {
      case "query":
        return re.QUERY;
      case "mutation":
        return re.MUTATION;
      case "subscription":
        return re.SUBSCRIPTION;
    }
    throw this.unexpected(e);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  parseVariableDefinitions() {
    return this.optionalMany(
      u.PAREN_L,
      this.parseVariableDefinition,
      u.PAREN_R
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: v.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(u.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(u.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const e = this._lexer.token;
    return this.expectToken(u.DOLLAR), this.node(e, {
      kind: v.VARIABLE,
      name: this.parseName()
    });
  }
  /**
   * ```
   * SelectionSet : { Selection+ }
   * ```
   */
  parseSelectionSet() {
    return this.node(this._lexer.token, {
      kind: v.SELECTION_SET,
      selections: this.many(
        u.BRACE_L,
        this.parseSelection,
        u.BRACE_R
      )
    });
  }
  /**
   * Selection :
   *   - Field
   *   - FragmentSpread
   *   - InlineFragment
   */
  parseSelection() {
    return this.peek(u.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const e = this._lexer.token, n = this.parseName();
    let r, i;
    return this.expectOptionalToken(u.COLON) ? (r = n, i = this.parseName()) : i = n, this.node(e, {
      kind: v.FIELD,
      alias: r,
      name: i,
      arguments: this.parseArguments(!1),
      directives: this.parseDirectives(!1),
      selectionSet: this.peek(u.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(e) {
    const n = e ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(u.PAREN_L, n, u.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(e = !1) {
    const n = this._lexer.token, r = this.parseName();
    return this.expectToken(u.COLON), this.node(n, {
      kind: v.ARGUMENT,
      name: r,
      value: this.parseValueLiteral(e)
    });
  }
  parseConstArgument() {
    return this.parseArgument(!0);
  }
  // Implements the parsing rules in the Fragments section.
  /**
   * Corresponds to both FragmentSpread and InlineFragment in the spec.
   *
   * FragmentSpread : ... FragmentName Directives?
   *
   * InlineFragment : ... TypeCondition? Directives? SelectionSet
   */
  parseFragment() {
    const e = this._lexer.token;
    this.expectToken(u.SPREAD);
    const n = this.expectOptionalKeyword("on");
    return !n && this.peek(u.NAME) ? this.node(e, {
      kind: v.FRAGMENT_SPREAD,
      name: this.parseFragmentName(),
      directives: this.parseDirectives(!1)
    }) : this.node(e, {
      kind: v.INLINE_FRAGMENT,
      typeCondition: n ? this.parseNamedType() : void 0,
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * FragmentDefinition :
   *   - fragment FragmentName on TypeCondition Directives? SelectionSet
   *
   * TypeCondition : NamedType
   */
  parseFragmentDefinition() {
    const e = this._lexer.token;
    return this.expectKeyword("fragment"), this._options.allowLegacyFragmentVariables === !0 ? this.node(e, {
      kind: v.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      variableDefinitions: this.parseVariableDefinitions(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    }) : this.node(e, {
      kind: v.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * FragmentName : Name but not `on`
   */
  parseFragmentName() {
    if (this._lexer.token.value === "on")
      throw this.unexpected();
    return this.parseName();
  }
  // Implements the parsing rules in the Values section.
  /**
   * Value[Const] :
   *   - [~Const] Variable
   *   - IntValue
   *   - FloatValue
   *   - StringValue
   *   - BooleanValue
   *   - NullValue
   *   - EnumValue
   *   - ListValue[?Const]
   *   - ObjectValue[?Const]
   *
   * BooleanValue : one of `true` `false`
   *
   * NullValue : `null`
   *
   * EnumValue : Name but not `true`, `false` or `null`
   */
  parseValueLiteral(e) {
    const n = this._lexer.token;
    switch (n.kind) {
      case u.BRACKET_L:
        return this.parseList(e);
      case u.BRACE_L:
        return this.parseObject(e);
      case u.INT:
        return this.advanceLexer(), this.node(n, {
          kind: v.INT,
          value: n.value
        });
      case u.FLOAT:
        return this.advanceLexer(), this.node(n, {
          kind: v.FLOAT,
          value: n.value
        });
      case u.STRING:
      case u.BLOCK_STRING:
        return this.parseStringLiteral();
      case u.NAME:
        switch (this.advanceLexer(), n.value) {
          case "true":
            return this.node(n, {
              kind: v.BOOLEAN,
              value: !0
            });
          case "false":
            return this.node(n, {
              kind: v.BOOLEAN,
              value: !1
            });
          case "null":
            return this.node(n, {
              kind: v.NULL
            });
          default:
            return this.node(n, {
              kind: v.ENUM,
              value: n.value
            });
        }
      case u.DOLLAR:
        if (e)
          if (this.expectToken(u.DOLLAR), this._lexer.token.kind === u.NAME) {
            const r = this._lexer.token.value;
            throw j(
              this._lexer.source,
              n.start,
              `Unexpected variable "$${r}" in constant value.`
            );
          } else
            throw this.unexpected(n);
        return this.parseVariable();
      default:
        throw this.unexpected();
    }
  }
  parseConstValueLiteral() {
    return this.parseValueLiteral(!0);
  }
  parseStringLiteral() {
    const e = this._lexer.token;
    return this.advanceLexer(), this.node(e, {
      kind: v.STRING,
      value: e.value,
      block: e.kind === u.BLOCK_STRING
    });
  }
  /**
   * ListValue[Const] :
   *   - [ ]
   *   - [ Value[?Const]+ ]
   */
  parseList(e) {
    const n = () => this.parseValueLiteral(e);
    return this.node(this._lexer.token, {
      kind: v.LIST,
      values: this.any(u.BRACKET_L, n, u.BRACKET_R)
    });
  }
  /**
   * ```
   * ObjectValue[Const] :
   *   - { }
   *   - { ObjectField[?Const]+ }
   * ```
   */
  parseObject(e) {
    const n = () => this.parseObjectField(e);
    return this.node(this._lexer.token, {
      kind: v.OBJECT,
      fields: this.any(u.BRACE_L, n, u.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(e) {
    const n = this._lexer.token, r = this.parseName();
    return this.expectToken(u.COLON), this.node(n, {
      kind: v.OBJECT_FIELD,
      name: r,
      value: this.parseValueLiteral(e)
    });
  }
  // Implements the parsing rules in the Directives section.
  /**
   * Directives[Const] : Directive[?Const]+
   */
  parseDirectives(e) {
    const n = [];
    for (; this.peek(u.AT); )
      n.push(this.parseDirective(e));
    return n;
  }
  parseConstDirectives() {
    return this.parseDirectives(!0);
  }
  /**
   * ```
   * Directive[Const] : @ Name Arguments[?Const]?
   * ```
   */
  parseDirective(e) {
    const n = this._lexer.token;
    return this.expectToken(u.AT), this.node(n, {
      kind: v.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(e)
    });
  }
  // Implements the parsing rules in the Types section.
  /**
   * Type :
   *   - NamedType
   *   - ListType
   *   - NonNullType
   */
  parseTypeReference() {
    const e = this._lexer.token;
    let n;
    if (this.expectOptionalToken(u.BRACKET_L)) {
      const r = this.parseTypeReference();
      this.expectToken(u.BRACKET_R), n = this.node(e, {
        kind: v.LIST_TYPE,
        type: r
      });
    } else
      n = this.parseNamedType();
    return this.expectOptionalToken(u.BANG) ? this.node(e, {
      kind: v.NON_NULL_TYPE,
      type: n
    }) : n;
  }
  /**
   * NamedType : Name
   */
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: v.NAMED_TYPE,
      name: this.parseName()
    });
  }
  // Implements the parsing rules in the Type Definition section.
  peekDescription() {
    return this.peek(u.STRING) || this.peek(u.BLOCK_STRING);
  }
  /**
   * Description : StringValue
   */
  parseDescription() {
    if (this.peekDescription())
      return this.parseStringLiteral();
  }
  /**
   * ```
   * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
   * ```
   */
  parseSchemaDefinition() {
    const e = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("schema");
    const r = this.parseConstDirectives(), i = this.many(
      u.BRACE_L,
      this.parseOperationTypeDefinition,
      u.BRACE_R
    );
    return this.node(e, {
      kind: v.SCHEMA_DEFINITION,
      description: n,
      directives: r,
      operationTypes: i
    });
  }
  /**
   * OperationTypeDefinition : OperationType : NamedType
   */
  parseOperationTypeDefinition() {
    const e = this._lexer.token, n = this.parseOperationType();
    this.expectToken(u.COLON);
    const r = this.parseNamedType();
    return this.node(e, {
      kind: v.OPERATION_TYPE_DEFINITION,
      operation: n,
      type: r
    });
  }
  /**
   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
   */
  parseScalarTypeDefinition() {
    const e = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("scalar");
    const r = this.parseName(), i = this.parseConstDirectives();
    return this.node(e, {
      kind: v.SCALAR_TYPE_DEFINITION,
      description: n,
      name: r,
      directives: i
    });
  }
  /**
   * ObjectTypeDefinition :
   *   Description?
   *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
   */
  parseObjectTypeDefinition() {
    const e = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("type");
    const r = this.parseName(), i = this.parseImplementsInterfaces(), s = this.parseConstDirectives(), l = this.parseFieldsDefinition();
    return this.node(e, {
      kind: v.OBJECT_TYPE_DEFINITION,
      description: n,
      name: r,
      interfaces: i,
      directives: s,
      fields: l
    });
  }
  /**
   * ImplementsInterfaces :
   *   - implements `&`? NamedType
   *   - ImplementsInterfaces & NamedType
   */
  parseImplementsInterfaces() {
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(u.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      u.BRACE_L,
      this.parseFieldDefinition,
      u.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const e = this._lexer.token, n = this.parseDescription(), r = this.parseName(), i = this.parseArgumentDefs();
    this.expectToken(u.COLON);
    const s = this.parseTypeReference(), l = this.parseConstDirectives();
    return this.node(e, {
      kind: v.FIELD_DEFINITION,
      description: n,
      name: r,
      arguments: i,
      type: s,
      directives: l
    });
  }
  /**
   * ArgumentsDefinition : ( InputValueDefinition+ )
   */
  parseArgumentDefs() {
    return this.optionalMany(
      u.PAREN_L,
      this.parseInputValueDef,
      u.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const e = this._lexer.token, n = this.parseDescription(), r = this.parseName();
    this.expectToken(u.COLON);
    const i = this.parseTypeReference();
    let s;
    this.expectOptionalToken(u.EQUALS) && (s = this.parseConstValueLiteral());
    const l = this.parseConstDirectives();
    return this.node(e, {
      kind: v.INPUT_VALUE_DEFINITION,
      description: n,
      name: r,
      type: i,
      defaultValue: s,
      directives: l
    });
  }
  /**
   * InterfaceTypeDefinition :
   *   - Description? interface Name Directives[Const]? FieldsDefinition?
   */
  parseInterfaceTypeDefinition() {
    const e = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("interface");
    const r = this.parseName(), i = this.parseImplementsInterfaces(), s = this.parseConstDirectives(), l = this.parseFieldsDefinition();
    return this.node(e, {
      kind: v.INTERFACE_TYPE_DEFINITION,
      description: n,
      name: r,
      interfaces: i,
      directives: s,
      fields: l
    });
  }
  /**
   * UnionTypeDefinition :
   *   - Description? union Name Directives[Const]? UnionMemberTypes?
   */
  parseUnionTypeDefinition() {
    const e = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("union");
    const r = this.parseName(), i = this.parseConstDirectives(), s = this.parseUnionMemberTypes();
    return this.node(e, {
      kind: v.UNION_TYPE_DEFINITION,
      description: n,
      name: r,
      directives: i,
      types: s
    });
  }
  /**
   * UnionMemberTypes :
   *   - = `|`? NamedType
   *   - UnionMemberTypes | NamedType
   */
  parseUnionMemberTypes() {
    return this.expectOptionalToken(u.EQUALS) ? this.delimitedMany(u.PIPE, this.parseNamedType) : [];
  }
  /**
   * EnumTypeDefinition :
   *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
   */
  parseEnumTypeDefinition() {
    const e = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("enum");
    const r = this.parseName(), i = this.parseConstDirectives(), s = this.parseEnumValuesDefinition();
    return this.node(e, {
      kind: v.ENUM_TYPE_DEFINITION,
      description: n,
      name: r,
      directives: i,
      values: s
    });
  }
  /**
   * ```
   * EnumValuesDefinition : { EnumValueDefinition+ }
   * ```
   */
  parseEnumValuesDefinition() {
    return this.optionalMany(
      u.BRACE_L,
      this.parseEnumValueDefinition,
      u.BRACE_R
    );
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   */
  parseEnumValueDefinition() {
    const e = this._lexer.token, n = this.parseDescription(), r = this.parseEnumValueName(), i = this.parseConstDirectives();
    return this.node(e, {
      kind: v.ENUM_VALUE_DEFINITION,
      description: n,
      name: r,
      directives: i
    });
  }
  /**
   * EnumValue : Name but not `true`, `false` or `null`
   */
  parseEnumValueName() {
    if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null")
      throw j(
        this._lexer.source,
        this._lexer.token.start,
        `${me(
          this._lexer.token
        )} is reserved and cannot be used for an enum value.`
      );
    return this.parseName();
  }
  /**
   * InputObjectTypeDefinition :
   *   - Description? input Name Directives[Const]? InputFieldsDefinition?
   */
  parseInputObjectTypeDefinition() {
    const e = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("input");
    const r = this.parseName(), i = this.parseConstDirectives(), s = this.parseInputFieldsDefinition();
    return this.node(e, {
      kind: v.INPUT_OBJECT_TYPE_DEFINITION,
      description: n,
      name: r,
      directives: i,
      fields: s
    });
  }
  /**
   * ```
   * InputFieldsDefinition : { InputValueDefinition+ }
   * ```
   */
  parseInputFieldsDefinition() {
    return this.optionalMany(
      u.BRACE_L,
      this.parseInputValueDef,
      u.BRACE_R
    );
  }
  /**
   * TypeSystemExtension :
   *   - SchemaExtension
   *   - TypeExtension
   *
   * TypeExtension :
   *   - ScalarTypeExtension
   *   - ObjectTypeExtension
   *   - InterfaceTypeExtension
   *   - UnionTypeExtension
   *   - EnumTypeExtension
   *   - InputObjectTypeDefinition
   */
  parseTypeSystemExtension() {
    const e = this._lexer.lookahead();
    if (e.kind === u.NAME)
      switch (e.value) {
        case "schema":
          return this.parseSchemaExtension();
        case "scalar":
          return this.parseScalarTypeExtension();
        case "type":
          return this.parseObjectTypeExtension();
        case "interface":
          return this.parseInterfaceTypeExtension();
        case "union":
          return this.parseUnionTypeExtension();
        case "enum":
          return this.parseEnumTypeExtension();
        case "input":
          return this.parseInputObjectTypeExtension();
      }
    throw this.unexpected(e);
  }
  /**
   * ```
   * SchemaExtension :
   *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
   *  - extend schema Directives[Const]
   * ```
   */
  parseSchemaExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("schema");
    const n = this.parseConstDirectives(), r = this.optionalMany(
      u.BRACE_L,
      this.parseOperationTypeDefinition,
      u.BRACE_R
    );
    if (n.length === 0 && r.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: v.SCHEMA_EXTENSION,
      directives: n,
      operationTypes: r
    });
  }
  /**
   * ScalarTypeExtension :
   *   - extend scalar Name Directives[Const]
   */
  parseScalarTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("scalar");
    const n = this.parseName(), r = this.parseConstDirectives();
    if (r.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: v.SCALAR_TYPE_EXTENSION,
      name: n,
      directives: r
    });
  }
  /**
   * ObjectTypeExtension :
   *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend type Name ImplementsInterfaces? Directives[Const]
   *  - extend type Name ImplementsInterfaces
   */
  parseObjectTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("type");
    const n = this.parseName(), r = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), s = this.parseFieldsDefinition();
    if (r.length === 0 && i.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: v.OBJECT_TYPE_EXTENSION,
      name: n,
      interfaces: r,
      directives: i,
      fields: s
    });
  }
  /**
   * InterfaceTypeExtension :
   *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend interface Name ImplementsInterfaces? Directives[Const]
   *  - extend interface Name ImplementsInterfaces
   */
  parseInterfaceTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("interface");
    const n = this.parseName(), r = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), s = this.parseFieldsDefinition();
    if (r.length === 0 && i.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: v.INTERFACE_TYPE_EXTENSION,
      name: n,
      interfaces: r,
      directives: i,
      fields: s
    });
  }
  /**
   * UnionTypeExtension :
   *   - extend union Name Directives[Const]? UnionMemberTypes
   *   - extend union Name Directives[Const]
   */
  parseUnionTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("union");
    const n = this.parseName(), r = this.parseConstDirectives(), i = this.parseUnionMemberTypes();
    if (r.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: v.UNION_TYPE_EXTENSION,
      name: n,
      directives: r,
      types: i
    });
  }
  /**
   * EnumTypeExtension :
   *   - extend enum Name Directives[Const]? EnumValuesDefinition
   *   - extend enum Name Directives[Const]
   */
  parseEnumTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("enum");
    const n = this.parseName(), r = this.parseConstDirectives(), i = this.parseEnumValuesDefinition();
    if (r.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: v.ENUM_TYPE_EXTENSION,
      name: n,
      directives: r,
      values: i
    });
  }
  /**
   * InputObjectTypeExtension :
   *   - extend input Name Directives[Const]? InputFieldsDefinition
   *   - extend input Name Directives[Const]
   */
  parseInputObjectTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("input");
    const n = this.parseName(), r = this.parseConstDirectives(), i = this.parseInputFieldsDefinition();
    if (r.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: v.INPUT_OBJECT_TYPE_EXTENSION,
      name: n,
      directives: r,
      fields: i
    });
  }
  /**
   * ```
   * DirectiveDefinition :
   *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
   * ```
   */
  parseDirectiveDefinition() {
    const e = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("directive"), this.expectToken(u.AT);
    const r = this.parseName(), i = this.parseArgumentDefs(), s = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    const l = this.parseDirectiveLocations();
    return this.node(e, {
      kind: v.DIRECTIVE_DEFINITION,
      description: n,
      name: r,
      arguments: i,
      repeatable: s,
      locations: l
    });
  }
  /**
   * DirectiveLocations :
   *   - `|`? DirectiveLocation
   *   - DirectiveLocations | DirectiveLocation
   */
  parseDirectiveLocations() {
    return this.delimitedMany(u.PIPE, this.parseDirectiveLocation);
  }
  /*
   * DirectiveLocation :
   *   - ExecutableDirectiveLocation
   *   - TypeSystemDirectiveLocation
   *
   * ExecutableDirectiveLocation : one of
   *   `QUERY`
   *   `MUTATION`
   *   `SUBSCRIPTION`
   *   `FIELD`
   *   `FRAGMENT_DEFINITION`
   *   `FRAGMENT_SPREAD`
   *   `INLINE_FRAGMENT`
   *
   * TypeSystemDirectiveLocation : one of
   *   `SCHEMA`
   *   `SCALAR`
   *   `OBJECT`
   *   `FIELD_DEFINITION`
   *   `ARGUMENT_DEFINITION`
   *   `INTERFACE`
   *   `UNION`
   *   `ENUM`
   *   `ENUM_VALUE`
   *   `INPUT_OBJECT`
   *   `INPUT_FIELD_DEFINITION`
   */
  parseDirectiveLocation() {
    const e = this._lexer.token, n = this.parseName();
    if (Object.prototype.hasOwnProperty.call(Me, n.value))
      return n;
    throw this.unexpected(e);
  }
  // Core parsing utility functions
  /**
   * Returns a node that, if configured to do so, sets a "loc" field as a
   * location object, used to identify the place in the source that created a
   * given parsed object.
   */
  node(e, n) {
    return this._options.noLocation !== !0 && (n.loc = new tn(
      e,
      this._lexer.lastToken,
      this._lexer.source
    )), n;
  }
  /**
   * Determines if the next token is of a given kind
   */
  peek(e) {
    return this._lexer.token.kind === e;
  }
  /**
   * If the next token is of the given kind, return that token after advancing the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectToken(e) {
    const n = this._lexer.token;
    if (n.kind === e)
      return this.advanceLexer(), n;
    throw j(
      this._lexer.source,
      n.start,
      `Expected ${Nt(e)}, found ${me(n)}.`
    );
  }
  /**
   * If the next token is of the given kind, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalToken(e) {
    return this._lexer.token.kind === e ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * If the next token is a given keyword, advance the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectKeyword(e) {
    const n = this._lexer.token;
    if (n.kind === u.NAME && n.value === e)
      this.advanceLexer();
    else
      throw j(
        this._lexer.source,
        n.start,
        `Expected "${e}", found ${me(n)}.`
      );
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(e) {
    const n = this._lexer.token;
    return n.kind === u.NAME && n.value === e ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(e) {
    const n = e ?? this._lexer.token;
    return j(
      this._lexer.source,
      n.start,
      `Unexpected ${me(n)}.`
    );
  }
  /**
   * Returns a possibly empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  any(e, n, r) {
    this.expectToken(e);
    const i = [];
    for (; !this.expectOptionalToken(r); )
      i.push(n.call(this));
    return i;
  }
  /**
   * Returns a list of parse nodes, determined by the parseFn.
   * It can be empty only if open token is missing otherwise it will always return non-empty list
   * that begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  optionalMany(e, n, r) {
    if (this.expectOptionalToken(e)) {
      const i = [];
      do
        i.push(n.call(this));
      while (!this.expectOptionalToken(r));
      return i;
    }
    return [];
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  many(e, n, r) {
    this.expectToken(e);
    const i = [];
    do
      i.push(n.call(this));
    while (!this.expectOptionalToken(r));
    return i;
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
   * Advances the parser to the next lex token after last item in the list.
   */
  delimitedMany(e, n) {
    this.expectOptionalToken(e);
    const r = [];
    do
      r.push(n.call(this));
    while (this.expectOptionalToken(e));
    return r;
  }
  advanceLexer() {
    const { maxTokens: e } = this._options, n = this._lexer.advance();
    if (n.kind !== u.EOF && (++this._tokenCounter, e !== void 0 && this._tokenCounter > e))
      throw j(
        this._lexer.source,
        n.start,
        `Document contains more that ${e} tokens. Parsing aborted.`
      );
  }
}
function me(t) {
  const e = t.value;
  return Nt(t.kind) + (e != null ? ` "${e}"` : "");
}
function Nt(t) {
  return un(t) ? `"${t}"` : t;
}
var Ee = function() {
  return Ee = Object.assign || function(e) {
    for (var n, r = 1, i = arguments.length; r < i; r++) {
      n = arguments[r];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s]);
    }
    return e;
  }, Ee.apply(this, arguments);
};
var ye = /* @__PURE__ */ new Map(), Re = /* @__PURE__ */ new Map(), bt = !0, ve = !1;
function It(t) {
  return t.replace(/[\s,]+/g, " ").trim();
}
function Sn(t) {
  return It(t.source.body.substring(t.start, t.end));
}
function Dn(t) {
  var e = /* @__PURE__ */ new Set(), n = [];
  return t.definitions.forEach(function(r) {
    if (r.kind === "FragmentDefinition") {
      var i = r.name.value, s = Sn(r.loc), l = Re.get(i);
      l && !l.has(s) ? bt && console.warn("Warning: fragment with name " + i + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : l || Re.set(i, l = /* @__PURE__ */ new Set()), l.add(s), e.has(s) || (e.add(s), n.push(r));
    } else
      n.push(r);
  }), Ee(Ee({}, t), { definitions: n });
}
function xn(t) {
  var e = new Set(t.definitions);
  e.forEach(function(r) {
    r.loc && delete r.loc, Object.keys(r).forEach(function(i) {
      var s = r[i];
      s && typeof s == "object" && e.add(s);
    });
  });
  var n = t.loc;
  return n && (delete n.startToken, delete n.endToken), t;
}
function Mn(t) {
  var e = It(t);
  if (!ye.has(e)) {
    var n = Cn(t, {
      experimentalFragmentVariables: ve,
      allowLegacyFragmentVariables: ve
    });
    if (!n || n.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    ye.set(e, xn(Dn(n)));
  }
  return ye.get(e);
}
function ie(t) {
  for (var e = [], n = 1; n < arguments.length; n++)
    e[n - 1] = arguments[n];
  typeof t == "string" && (t = [t]);
  var r = t[0];
  return e.forEach(function(i, s) {
    i && i.kind === "Document" ? r += i.loc.source.body : r += i, r += t[s + 1];
  }), Mn(r);
}
function Rn() {
  ye.clear(), Re.clear();
}
function Fn() {
  bt = !1;
}
function Ln() {
  ve = !0;
}
function Pn() {
  ve = !1;
}
var le = {
  gql: ie,
  resetCaches: Rn,
  disableFragmentWarnings: Fn,
  enableExperimentalFragmentVariables: Ln,
  disableExperimentalFragmentVariables: Pn
};
(function(t) {
  t.gql = le.gql, t.resetCaches = le.resetCaches, t.disableFragmentWarnings = le.disableFragmentWarnings, t.enableExperimentalFragmentVariables = le.enableExperimentalFragmentVariables, t.disableExperimentalFragmentVariables = le.disableExperimentalFragmentVariables;
})(ie || (ie = {}));
ie.default = ie;
function Un(t, e) {
  return ie`
      query ${t}(
        $filters: [String!],
        $page: Int!,
        $pageSize: Int!,
        $searchColumns: [String!],
        $searchQuery: String,
        $sortBy: String,
        $sortOrder: String
      ) {
        ${t}(
          filters: $filters,
          page: $page,
          pageSize: $pageSize,
          searchColumns: $searchColumns,
          searchQuery: $searchQuery,
          sortBy: $sortBy,
          sortOrder: $sortOrder
        ) {
          data {
            itemCount
            items {
              ${e}
            }
          }
          code
          message
          status
        }
      }
    `;
}
function Vn(t) {
  const e = {};
  t.forEach(({ field: r }) => {
    const i = r.split(".");
    let s = e;
    for (let l = 0; l < i.length; l++) {
      const y = i[l];
      s[y] || (s[y] = l === i.length - 1 ? !0 : {}), s = s[y];
    }
  });
  function n(r) {
    return Object.entries(r).map(
      ([i, s]) => s === !0 ? i : `${i} { ${n(s)} }`
    ).join(" ");
  }
  return `${n(e)}`;
}
var Bn = Object.defineProperty, Ue = (t, e, n, r) => {
  for (var i = void 0, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (i = l(e, n, i) || i);
  return i && Bn(e, n, i), i;
};
class be {
  id;
  createdAt;
  updatedAt;
  // Serialize decorated fields
  toJson() {
    const e = pe(this.constructor), n = {};
    for (const [r, i] of Object.entries(e))
      i.hidden || (n[r] = this[r]);
    return n;
  }
  // Create graphql schema
  getGraphqlFields() {
    const e = pe(this.constructor), n = [];
    for (const [r, i] of Object.entries(e))
      i.hidden || n.push({ field: this[r] });
    return Vn(n);
  }
  // Deserialize and return a new instance
  static fromJson(e) {
    const n = new this(), r = pe(this);
    for (const [i, s] of Object.entries(r))
      !s.hidden && i in e && (n[i] = e[i]);
    return n;
  }
  // Return class name as snake_case
  getEndpoint() {
    return "/" + this.constructor.name.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();
  }
  static getModelTitle() {
    return at(this.name);
  }
  static getModelTitlePlural() {
    return `${this.getModelTitle()}s`;
  }
  static getColumns() {
    return Object.entries(pe(this)).filter(([e, n]) => !n.hidden).sort(([, e], [, n]) => {
      const r = typeof e.order == "number" ? e.order : Number.POSITIVE_INFINITY, i = typeof n.order == "number" ? n.order : Number.POSITIVE_INFINITY;
      return r === i ? 0 : r - i;
    }).sort(([e, n], [r, i]) => {
      const s = typeof n.order == "number" ? n.order : Number.POSITIVE_INFINITY, l = typeof i.order == "number" ? i.order : Number.POSITIVE_INFINITY;
      return s === l ? e.localeCompare(r) : 0;
    }).map(([e, n]) => ({
      field: e,
      header: n.header || at(e),
      hidden: n.hidden,
      order: n.order,
      headerClass: n.headerClass,
      rowClass: n.rowClass,
      format: n.format
    }));
  }
}
Ue([
  Le({ hidden: !0 })
], be.prototype, "id");
Ue([
  Le({ order: 99 })
], be.prototype, "createdAt");
Ue([
  Le({ hidden: !0 })
], be.prototype, "updatedAt");
class jn {
  constructor(e, n, r) {
    this.endpoint = e, this.Model = n, this.api = r;
  }
  async list(e) {
    return (await this.api.get(this.endpoint, e)).map((r) => this.Model.fromJson(r));
  }
  async get(e) {
    const n = await this.api.get(`${this.endpoint}/${e}`);
    return this.Model.fromJson(n);
  }
  async create(e) {
    const n = await this.api.post(this.endpoint, e);
    return this.Model.fromJson(n);
  }
  async update(e) {
    const n = await this.api.put(`${this.endpoint}`, e);
    return this.Model.fromJson(n);
  }
  async delete(e) {
    return await this.api.delete(this.endpoint, e), !0;
  }
}
class Fe extends be {
  static features = {
    create: !0,
    search: !0,
    filter: !0,
    sort: !0,
    view: !0,
    update: !0,
    delete: !0,
    bulk: !0,
    export: !0
  };
  service;
  api;
  constructor(e, n) {
    super(), this.api = e || ge, this.service = new jn(
      n || this.getEndpoint(),
      this.constructor,
      e || ge
    );
  }
  async fetchAll(e = Ve, n) {
    return this.api instanceof Yn ? await this.api.query(
      `getAll${Fe.getModelTitlePlural()}`,
      Un(
        `getAll${Fe.getModelTitlePlural()}`,
        this.getGraphqlFields()
      ),
      e,
      n
    ) : (this.api instanceof Gn && await this.api.get(e), []);
  }
  async create(e) {
    return await this.service.create(e);
  }
  async update(e) {
    return await this.service.update(e);
  }
  async delete(e) {
    return await this.service.delete(e);
  }
}
class $n {
  page = 1;
  pageSize = 10;
  sortBy;
  sortOrder;
  search;
  filters;
  constructor(e) {
    Object.assign(this, e);
  }
}
const Ve = new $n();
class Zn {
  // or 'graphql'
  constructor(e) {
    this.endpoint = e;
  }
  static apiType = "rest";
  async getAll() {
  }
  async create(e) {
  }
  // add more CRUD as needed
}
class Kn {
  // or 'graphql'
  constructor(e) {
    this.endpoint = e;
  }
  static apiType = "rest";
  async getAll() {
  }
  async create(e) {
  }
  // add more CRUD as needed
}
class Gn {
  constructor(e) {
    this.baseUrl = e;
  }
  async create(e) {
    return (await fetch(`${this.baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    })).json();
  }
}
class Yn {
  constructor(e) {
    this.client = e;
  }
  async mutate(e, n, r, i) {
    try {
      const { data: s } = await this.client.mutate({
        mutation: n,
        variables: { inputData: r },
        context: {
          ...i
        }
      });
      return s[e];
    } catch (s) {
      throw console.error("GraphQL error:", s), s;
    }
  }
  async query(e, n, r = Ve, i = {}) {
    try {
      const { data: s } = await this.client.query({
        query: n,
        variables: { ...r },
        context: {
          ...i
        }
      });
      return s[e];
    } catch (s) {
      throw console.error("GraphQL error:", s), s;
    }
  }
}
var B = /* @__PURE__ */ ((t) => (t.Create = "create", t.Update = "update", t.Delete = "delete", t.Export = "export", t))(B || {});
let ge;
function er(t) {
  ge = t;
}
function tr() {
  return ge;
}
const zn = ["value"], Jn = /* @__PURE__ */ lt({
  __name: "DataTable",
  props: {
    theme: {},
    title: {},
    searchPlaceholder: {},
    onSearch: { type: Function },
    onFilter: { type: Function },
    tableActions: {},
    rowActions: {},
    columns: {},
    rows: {},
    showCount: { type: Boolean },
    pagination: {}
  },
  setup(t) {
    const e = t, n = z("");
    return ht(n, (r) => {
      e.onSearch?.(r);
    }), z([]), z(!1), z(""), z(null), z({ top: "0px", left: "0px" }), (r, i) => (O(), S(M(r.theme?.components?.wrapper || "div"), {
      class: R(r.theme?.classes?.wrapper || "datatable-wrapper")
    }, {
      default: F(() => [
        r.title ? (O(), q("div", {
          key: 0,
          class: R(r.theme?.classes?.title || "datatable-title")
        }, [
          X(r.$slots, "title", {}, () => [
            W(Z(r.title), 1)
          ], !0)
        ], 2)) : ne("", !0),
        (O(), S(M(r.theme?.components?.headerWrapper || "div"), {
          class: R(r.theme?.classes?.headerWrapper || "")
        }, {
          default: F(() => [
            r.onSearch ? (O(), S(M(r.theme?.components?.searchWrapper || "div"), {
              key: 0,
              class: R(r.theme?.classes?.searchWrapper || "datatable-search-wrapper")
            }, {
              default: F(() => [
                X(r.$slots, "search", {}, () => [
                  (O(), S(M(r.theme?.components?.searchInput || "input"), {
                    modelValue: n.value,
                    "onUpdate:modelValue": i[0] || (i[0] = (s) => n.value = s),
                    type: "text",
                    placeholder: r.searchPlaceholder || "Search...",
                    class: R(r.theme?.classes?.searchInput || "datatable-search")
                  }, null, 8, ["modelValue", "placeholder", "class"]))
                ], !0)
              ]),
              _: 3
            }, 8, ["class"])) : ne("", !0),
            r.tableActions?.length ? (O(), S(M(r.theme?.components?.actionsWrapper || "div"), {
              key: 1,
              class: R(r.theme?.classes?.actionsWrapper || "datatable-actions")
            }, {
              default: F(() => [
                X(r.$slots, "tableActions", { actions: r.tableActions }, () => [
                  (O(!0), q(oe, null, ce(r.tableActions, (s, l) => (O(), S(M(r.theme?.components?.button || "button"), {
                    key: l,
                    class: R(s.class || r.theme?.classes?.button || "datatable-action-btn"),
                    onClick: s.onClick
                  }, {
                    default: F(() => [
                      W(Z(s.label), 1)
                    ]),
                    _: 2
                  }, 1032, ["class", "onClick"]))), 128))
                ], !0)
              ]),
              _: 3
            }, 8, ["class"])) : ne("", !0)
          ]),
          _: 3
        }, 8, ["class"])),
        (O(), S(M(r.theme?.components?.table || "table"), {
          class: R(r.theme?.classes?.table || "datatable-table")
        }, {
          default: F(() => [
            (O(), S(M(r.theme?.components?.thead || "thead"), {
              class: R(r.theme?.classes?.thead)
            }, {
              default: F(() => [
                (O(), S(M(r.theme?.components?.headerRow || "tr"), {
                  class: R(r.theme?.classes?.headerRow || "datatable-header-row")
                }, {
                  default: F(() => [
                    r.showCount ? (O(), S(M(r.theme?.components?.headerCell || "th"), {
                      key: 0,
                      class: R(r.theme?.classes?.headerCell || "datatable-header-cell")
                    }, {
                      default: F(() => i[4] || (i[4] = [
                        W(" S/N ", -1)
                      ])),
                      _: 1,
                      __: [4]
                    }, 8, ["class"])) : ne("", !0),
                    (O(!0), q(oe, null, ce(r.columns, (s, l) => (O(), S(M(r.theme?.components?.headerCell || "th"), {
                      key: l,
                      class: R(typeof s == "string" ? r.theme?.classes?.headerCell || "datatable-header-cell" : s.headerClass || r.theme?.classes?.headerCell || "datatable-header-cell")
                    }, {
                      default: F(() => [
                        X(r.$slots, `header.${typeof s == "string" ? s : s.field}`, { col: s }, () => [
                          W(Z(typeof s == "string" ? s : s.header || s.field), 1)
                        ], !0)
                      ]),
                      _: 2
                    }, 1032, ["class"]))), 128)),
                    r.rowActions?.length ? (O(), S(M(r.theme?.components?.headerCell || "th"), {
                      key: 1,
                      class: R(r.theme?.classes?.headerCell || "datatable-header-cell")
                    }, {
                      default: F(() => i[5] || (i[5] = [
                        W(" Actions ", -1)
                      ])),
                      _: 1,
                      __: [5]
                    }, 8, ["class"])) : ne("", !0)
                  ]),
                  _: 3
                }, 8, ["class"]))
              ]),
              _: 3
            }, 8, ["class"])),
            (O(), S(M(r.theme?.components?.tbody || "tbody"), {
              class: R(r.theme?.classes?.tbody)
            }, {
              default: F(() => [
                r.rows?.length > 0 ? (O(!0), q(oe, { key: 0 }, ce(r.rows, (s, l) => (O(), S(M(r.theme?.components?.row || "tr"), {
                  key: l,
                  class: R(r.theme?.classes?.row || "datatable-body-row")
                }, {
                  default: F(() => [
                    (O(!0), q(oe, null, ce(r.columns, (y, I) => (O(), S(M(r.theme?.components?.cell || "td"), {
                      key: I,
                      class: R(typeof y == "string" ? r.theme?.classes?.cell || "datatable-body-cell" : y.rowClass || r.theme?.classes?.cell || "datatable-body-cell")
                    }, {
                      default: F(() => [
                        X(r.$slots, `cell.${typeof y == "string" ? y : y.field}`, { row: s }, () => [
                          W(Z(typeof y == "string" ? s[y] : y.format ? y.format(s[y.field]) : s[y.field]), 1)
                        ], !0)
                      ]),
                      _: 2
                    }, 1032, ["class"]))), 128))
                  ]),
                  _: 2
                }, 1032, ["class"]))), 128)) : (O(), S(M(r.theme?.components?.row || "tr"), { key: 1 }, {
                  default: F(() => [
                    (O(), S(M(r.theme?.components?.cell || "td"), {
                      colspan: r.columns.length + Number(r.showCount) + Number(r.rowActions?.length),
                      class: "text-center"
                    }, {
                      default: F(() => [
                        X(r.$slots, "empty", {}, () => [
                          i[6] || (i[6] = W("No Data", -1))
                        ], !0)
                      ]),
                      _: 3
                    }, 8, ["colspan"]))
                  ]),
                  _: 3
                }))
              ]),
              _: 3
            }, 8, ["class"]))
          ]),
          _: 3
        }, 8, ["class"])),
        r.pagination ? (O(), S(M(r.theme?.components?.paginationWrapper || "div"), {
          key: 1,
          class: R(r.theme?.classes?.paginationWrapper || "datatable-pagination")
        }, {
          default: F(() => [
            X(r.$slots, "pagination", { pagination: r.pagination }, () => [
              ue("div", {
                class: R(r.theme?.classes?.pageSize || "datatable-page-size")
              }, [
                i[7] || (i[7] = ue("label", null, "Rows per page: ", -1)),
                (O(), S(M(r.theme?.components?.select || "select"), {
                  value: r.pagination.pageSize,
                  onChange: i[1] || (i[1] = (s) => r.pagination.onPageSizeChange?.(parseInt(s.target.value))),
                  class: R(r.theme?.classes?.select)
                }, {
                  default: F(() => [
                    (O(), q(oe, null, ce([5, 10, 20, 50, 100], (s) => ue("option", {
                      key: s,
                      value: s
                    }, Z(s), 9, zn)), 64))
                  ]),
                  _: 1
                }, 40, ["value", "class"]))
              ], 2),
              ue("div", {
                class: R(r.theme?.classes?.pageControls || "datatable-page-controls")
              }, [
                (O(), S(M(r.theme?.components?.button || "button"), {
                  disabled: r.pagination.page === 1,
                  onClick: i[2] || (i[2] = (s) => r.pagination.onPageChange?.(r.pagination.page - 1))
                }, {
                  default: F(() => i[8] || (i[8] = [
                    W(" Prev ", -1)
                  ])),
                  _: 1,
                  __: [8]
                }, 8, ["disabled"])),
                ue("span", null, "Page " + Z(r.pagination.page) + " of " + Z(Math.ceil(r.pagination.total / r.pagination.pageSize)), 1),
                (O(), S(M(r.theme?.components?.button || "button"), {
                  disabled: r.pagination.page >= Math.ceil(r.pagination.total / r.pagination.pageSize),
                  onClick: i[3] || (i[3] = (s) => r.pagination.onPageChange?.(r.pagination.page + 1))
                }, {
                  default: F(() => i[9] || (i[9] = [
                    W(" Next ", -1)
                  ])),
                  _: 1,
                  __: [9]
                }, 8, ["disabled"]))
              ], 2)
            ], !0)
          ]),
          _: 3
        }, 8, ["class"])) : ne("", !0)
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), Ot = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, i] of e)
    n[r] = i;
  return n;
}, Wn = /* @__PURE__ */ Ot(Jn, [["__scopeId", "data-v-74a25cb2"]]), Qn = {
  key: 0,
  class: "datatable-loading"
}, qn = /* @__PURE__ */ lt({
  __name: "CRUDTable",
  props: {
    theme: {},
    resource: {},
    title: {},
    searchPlaceholder: {},
    onSearch: { type: Function },
    onFilter: { type: Function },
    tableActions: {},
    rowActions: {},
    columns: {},
    showCount: { type: Boolean }
  },
  setup(t) {
    const e = t, n = () => {
      alert("Create");
    }, r = (T) => {
      alert("Update");
    }, i = (T) => {
      alert("Delete");
    }, s = {
      [B.Create]: n,
      [B.Update]: r,
      [B.Delete]: i
    }, l = () => {
      const T = [];
      return e.resource.features.import && (T.push({ label: "Template", action: B.Create }), T.push({ label: "Import", action: B.Create })), e.resource.features.export && (T.push({ label: "Export PDF", action: B.Create }), T.push({ label: "Export CSV", action: B.Create }), T.push({ label: "Export XLS", action: B.Create })), e.resource.features.attachment && T.push({ label: "Attachments", action: B.Create }), e.resource.features.workflow && T.push({ label: "Workflow", action: B.Create }), e.resource.features.create && T.push({ label: "Create", action: B.Create }), T;
    }, y = () => {
      const T = [];
      return e.resource.features.update && T.push({ label: "Update", action: B.Update }), e.resource.features.delete && T.push({ label: "Delete", action: B.Delete }), e.resource.features.attachment && T.push({ label: "Attach", action: B.Create }, { label: "Attachments", action: B.Create }), e.resource.features.workflow && T.push({ label: "Submit", action: B.Create }, { label: "Track", action: B.Create }), T;
    }, I = z([]), C = z(e.columns || e.resource.getColumns()), w = z(
      [
        ...l(),
        ...e.tableActions || []
      ].map((T) => ({ label: T.label, onClick: () => s[T.action]() }))
    ), P = z(
      [
        ...y(),
        ...e.rowActions || []
      ].map((T) => ({ label: T.label, onClick: () => s[T.action]() }))
    ), k = z(!0), G = nt({
      page: 1,
      pageSize: 10,
      total: 0,
      onPageChange(T) {
        alert(T), G.page = T, _.page = T, $();
      },
      onPageSizeChange(T) {
        G.pageSize = T, _.pageSize = T, $();
      }
    }), _ = nt({
      ...Ve,
      page: G.page,
      pageSize: G.pageSize
    });
    async function $() {
      if (e.resource) {
        k.value = !0;
        try {
          const T = new e.resource(), { items: H, totalItems: Ie } = await T.fetchAll(_);
          H.value = H, G.total = Ie, (!e.columns || e.columns.length === 0) && H.value.length > 0 && (C.value = Object.keys(H.value[0]).map((Oe) => Oe));
        } finally {
          k.value = !1;
        }
      }
    }
    const Q = (T) => {
      _.search = {
        field: "name",
        value: T
      }, $();
    }, ee = (T) => {
      _.filters = T, $();
    };
    return Qt($), ht(() => e.resource, $), (T, H) => (O(), q("div", null, [
      k.value ? (O(), q("div", Qn, "Loading...")) : (O(), S(Wn, {
        key: 1,
        theme: e.theme,
        title: e.title || `${e.resource.getModelTitle()} List`,
        searchPlaceholder: e.searchPlaceholder,
        onSearch: e.resource.features.search ? e.onSearch || Q : void 0,
        onFilter: e.resource.features.filter ? e.onFilter || ee : void 0,
        tableActions: w.value,
        rowActions: P.value,
        columns: C.value,
        pagination: G,
        "show-count": e.showCount === void 0 ? !0 : e.showCount,
        rows: I.value
      }, null, 8, ["theme", "title", "searchPlaceholder", "onSearch", "onFilter", "tableActions", "rowActions", "columns", "pagination", "show-count", "rows"]))
    ]));
  }
}), nr = /* @__PURE__ */ Ot(qn, [["__scopeId", "data-v-b3b9b2c7"]]);
export {
  Zn as Attachable,
  B as BuiltInAction,
  Xn as COLUMN_METADATA_KEY,
  Fe as CRUDModel,
  nr as CRUDTable,
  be as DataModel,
  Le as FieldProps,
  Yn as GraphQLApi,
  $n as PaginationParams,
  Gn as RestApi,
  Kn as Workfloable,
  ge as activeApi,
  Ve as defaultParams,
  tr as getApi,
  pe as getFieldMetadata,
  er as setApi
};
