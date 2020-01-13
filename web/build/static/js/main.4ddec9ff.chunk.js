(this.webpackJsonpundefined = this.webpackJsonpundefined || []).push([
  [0],
  {
    236: function(e, n, t) {
      e.exports = t(409);
    },
    409: function(e, n, t) {
      'use strict';
      t.r(n);
      var a = t(24),
        r = t(0),
        l = t.n(r),
        i = t(80),
        c = t.n(i),
        o = t(72),
        u = t(228),
        s = t(227),
        d = t(231),
        m = t(39),
        f = t(59);
      Boolean(
        'localhost' === window.location.hostname ||
          '[::1]' === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
          ),
      );
      var b,
        p,
        g = t(226),
        h = t(60),
        E = t(12),
        v = t(64),
        O = t(23),
        j = t(1),
        k = t(32),
        w = t.n(k),
        y = t(15),
        x = t(16),
        I = t.n(x),
        C = t(432),
        S = t(217),
        L = t(10),
        A = t(214),
        M = t(204),
        $ = l.a.createContext({}),
        F = function(e) {
          var n = e.children,
            t = e.items,
            a = e.initialSelectedMap,
            i = void 0 === a ? new Map() : a,
            c = e.getId,
            o =
              void 0 === c
                ? function(e) {
                    return e.id;
                  }
                : c,
            u = Object(r.useState)(i),
            s = Object(j.a)(u, 2),
            d = s[0],
            m = s[1],
            f = function(e) {
              return m(new Map(e.entries()));
            },
            b = function(e) {
              var n = o(e);
              return d.has(n);
            },
            p = function(e) {
              var n = o(e);
              d.set(n, e), f(d);
            },
            g = function(e) {
              var n = o(e);
              d.delete(n), f(d);
            },
            h = function(e) {
              b(e) ? g(e) : p(e);
            };
          return l.a.createElement(
            $.Provider,
            {
              value: {
                selectedMap: d,
                isItemSelected: b,
                selectItem: p,
                deselectItem: g,
                toggleItem: h,
                onToggleThunk: function(e) {
                  return function() {
                    return h(e);
                  };
                },
                onSelectRangeThunk: function(e) {
                  return function() {
                    return (function(e) {
                      if (t) {
                        var n = Array.from(d.values())[d.size - 1],
                          a = t.findIndex(function(e) {
                            return o(e) === o(n);
                          }),
                          r = t.findIndex(function(n) {
                            return o(n) === o(e);
                          }),
                          l = a > r ? [r, a] : [a, r],
                          i = Object(j.a)(l, 2),
                          c = i[0],
                          u = i[1];
                        [e]
                          .concat(Object(O.a)(t.slice(c, u)))
                          .forEach(function(e) {
                            var n = o(e);
                            d.set(n, e);
                          }),
                          f(d);
                      }
                    })(e);
                  };
                },
                onResetAndSelectThunk: function(e) {
                  return function() {
                    return b(e)
                      ? f(new Map())
                      : (function(e) {
                          var n = new Map(),
                            t = o(e);
                          n.set(t, e), f(n);
                        })(e);
                  };
                },
              },
            },
            n,
          );
        },
        R = t(47),
        _ = t(234),
        D = t(13),
        T = t(7),
        U = t.n(T),
        z = t(230),
        N = t(416),
        P = t(157),
        W = t(44),
        q = t(431),
        V = t(417),
        B = t(126),
        G = function(e) {
          var n = e.onPaste,
            t = Object(r.useRef)(function(e) {
              n && n(e);
            });
          Object(r.useEffect)(function() {
            return (
              document
                .getElementsByTagName('body')[0]
                .addEventListener('paste', t.current),
              function() {
                document
                  .getElementsByTagName('body')[0]
                  .removeEventListener('paste', t.current);
              }
            );
          }, []);
        },
        K = function() {
          return (
            Math.random()
              .toString(36)
              .substring(2, 15) +
            Math.random()
              .toString(36)
              .substring(2, 15)
          );
        },
        J = function(e) {
          var n = e.search,
            t = e.labels,
            a = e.type,
            r = {};
          return (
            w.a.set(r, 'search', n),
            w.a.set(r, 'type', 'all' !== a ? a : null),
            w.a.set(
              r,
              'where.labels.'.concat(t.length ? 'some' : 'none', '.id.in'),
              t.map(function(e) {
                return e.id;
              }),
            ),
            r
          );
        };
      !(function(e) {
        (e[(e.CREATE_FILES_MODAL = 0)] = 'CREATE_FILES_MODAL'),
          (e[(e.CREATE_LINK_MODAL = 1)] = 'CREATE_LINK_MODAL'),
          (e[(e.CREATE_NOTE_MODAL = 2)] = 'CREATE_NOTE_MODAL'),
          (e[(e.FILTER_FEED_MODAL = 3)] = 'FILTER_FEED_MODAL'),
          (e[(e.VIEW_FILE_MODAL = 4)] = 'VIEW_FILE_MODAL');
      })(p || (p = {}));
      var Q = l.a.createContext({}),
        H =
          ((b = {}),
          Object(D.a)(b, p.CREATE_FILES_MODAL, !1),
          Object(D.a)(b, p.CREATE_LINK_MODAL, !1),
          Object(D.a)(b, p.CREATE_NOTE_MODAL, !1),
          Object(D.a)(b, p.FILTER_FEED_MODAL, !1),
          Object(D.a)(b, p.VIEW_FILE_MODAL, !1),
          b),
        X = function(e) {
          var n = l.a.useContext(Q),
            t = n.openModal,
            a = n.closeModal,
            r = n.toggleModal,
            i = n.globalModalState;
          return {
            closeAll: n.closeAll,
            openModal: function() {
              return t(e);
            },
            closeModal: function() {
              return a(e);
            },
            toggleModal: function() {
              return r(e);
            },
            isModalOpen: i[e],
          };
        },
        Y = t(151),
        Z = t.n(Y),
        ee = function(e) {
          var n = Object(r.useRef)();
          return (
            Object(r.useEffect)(function() {
              n.current = e;
            }),
            n.current
          );
        },
        ne = {},
        te = function(e, n) {
          var t =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {},
            a = t.isGlobal,
            i = void 0 !== a && a,
            c = t.shouldBind,
            o = void 0 === c || c;
          t.ref;
          Object(r.useEffect)(function() {
            (function(e) {
              var n = e.prototype.stopCallback;
              (e.prototype.stopCallback = function(e, t, a, r) {
                return (
                  !!this.paused || (!ne[a] && !ne[r] && n.call(this, e, t, a))
                );
              }),
                (e.prototype.bindGlobal = function(e, n, t) {
                  if ((this.bind(e, n, t), e instanceof Array))
                    for (var a = 0; a < e.length; a++) ne[e[a]] = !0;
                  else ne[e] = !0;
                }),
                e.init();
            })(Z.a);
          }, []);
          var u = l.a.useCallback(
              function(e) {
                e.preventDefault && e.preventDefault(), n();
              },
              [n],
            ),
            s = l.a.useRef(Z.a),
            d = s.current,
            m = ee(o),
            f = function() {
              d[i ? 'bindGlobal' : 'bind'](e, u);
            },
            b = function() {
              d.unbind(e);
            };
          Object(r.useEffect)(function() {
            return function() {
              b();
            };
          }, []),
            Object(r.useEffect)(
              function() {
                o ? f() : !o && m && b();
              },
              [o],
            );
        };
      function ae() {
        var e = Object(E.a)([
          '\n  mutation generateSignedUrls($signedURLArgs: [SignedURLArgs!]) {\n    generateSignedUrls(signedURLArgs: $signedURLArgs) {\n      signedUrls\n      uploadGroup {\n        id\n      }\n    }\n  }\n',
        ]);
        return (
          (ae = function() {
            return e;
          }),
          e
        );
      }
      function re() {
        var e = Object(E.a)([
          '\n  mutation processFiles($uploadGroupId: String) {\n    processFiles(uploadGroupId: $uploadGroupId) {\n      id\n      squareUrl\n      fullUrl\n    }\n  }\n',
        ]);
        return (
          (re = function() {
            return e;
          }),
          e
        );
      }
      var le = I()(re()),
        ie = I()(ae()),
        ce = function() {
          var e = Object(r.useState)({}),
            n = Object(j.a)(e, 2),
            t = n[0],
            i = n[1],
            c = Object(r.useState)(!1),
            o = Object(j.a)(c, 2),
            u = o[0],
            s = o[1],
            d = X(p.CREATE_FILES_MODAL),
            m = d.isModalOpen,
            f = d.openModal,
            b = d.toggleModal,
            g = d.closeModal;
          te('c f', b);
          var h = Object.keys(t).length,
            E = Object.values(t),
            v = Object.entries(t),
            O = Object(y.b)(le, { refetchQueries: ['feed'] }),
            k = Object(j.a)(O, 2),
            w = k[0],
            x = k[1].loading,
            I = u || x,
            C = Object(y.b)(ie),
            S = Object(j.a)(C, 1)[0];
          Object(r.useEffect)(
            function() {
              !(function() {
                var e, n, t, a, r;
                U.a.async(
                  function(l) {
                    for (;;)
                      switch ((l.prev = l.next)) {
                        case 0:
                          if (!u) {
                            l.next = 21;
                            break;
                          }
                          return (
                            (e = E.map(function(e) {
                              return 'temp/'.concat(e.id, '-').concat(e.name);
                            })),
                            (l.prev = 2),
                            (l.next = 5),
                            U.a.awrap(
                              S({
                                variables: {
                                  signedURLArgs: E.map(function(n, t) {
                                    var a = n.type;
                                    return { name: n.name, key: e[t], type: a };
                                  }),
                                },
                              }),
                            )
                          );
                        case 5:
                          return (
                            (n = l.sent),
                            (t = n.data.generateSignedUrls),
                            (a = t.signedUrls),
                            (r = t.uploadGroup),
                            (l.next = 11),
                            U.a.awrap(
                              Promise.all(
                                a.map(function(n, t) {
                                  var a, r;
                                  return U.a.async(function(l) {
                                    for (;;)
                                      switch ((l.prev = l.next)) {
                                        case 0:
                                          return (
                                            (a = E[t]),
                                            (r = e[t]),
                                            (l.next = 4),
                                            U.a.awrap(
                                              fetch(n, {
                                                method: 'PUT',
                                                body: a,
                                                headers: {
                                                  'Access-Control-Allow-Headers':
                                                    'Content-Type',
                                                  'Content-Type': a.type,
                                                },
                                              }),
                                            )
                                          );
                                        case 4:
                                          return l.abrupt('return', {
                                            tempKey: r,
                                            originalFilename: a.name,
                                          });
                                        case 5:
                                        case 'end':
                                          return l.stop();
                                      }
                                  });
                                }),
                              ),
                            )
                          );
                        case 11:
                          return (
                            s(!1),
                            g(),
                            i({}),
                            (l.next = 16),
                            U.a.awrap(w({ variables: { uploadGroupId: r.id } }))
                          );
                        case 16:
                          l.next = 21;
                          break;
                        case 18:
                          (l.prev = 18), (l.t0 = l.catch(2)), s(!1);
                        case 21:
                        case 'end':
                          return l.stop();
                      }
                  },
                  null,
                  null,
                  [[2, 18]],
                );
              })();
            },
            [u],
          ),
            Object(r.useEffect)(
              function() {
                var e = function(e) {
                  e.preventDefault(), (e.returnValue = '');
                };
                return (
                  I
                    ? window.addEventListener('beforeunload', e)
                    : window.removeEventListener('beforeunload', e),
                  function() {
                    window.removeEventListener('beforeunload', e);
                  }
                );
              },
              [I],
            );
          var A = Object(r.useCallback)(
            function(e) {
              i(
                Object(a.a)(
                  {},
                  t,
                  {},
                  e.reduce(function(e, n) {
                    var t = K();
                    return (
                      (n.id = t), Object(a.a)({}, e, Object(D.a)({}, t, n))
                    );
                  }, {}),
                ),
              );
            },
            [t],
          );
          G({
            onPaste: function(e) {
              var n, r, l, c, o;
              return U.a.async(function(u) {
                for (;;)
                  switch ((u.prev = u.next)) {
                    case 0:
                      for (n = e.clipboardData.items, r = 0; r < n.length; r++)
                        (l = e.clipboardData.items[r]),
                          (c = l.getAsFile()) &&
                            ((o = K()),
                            (c.id = o),
                            i(Object(a.a)({}, t, Object(D.a)({}, o, c))));
                    case 2:
                    case 'end':
                      return u.stop();
                  }
              });
            },
          });
          var M = Object(z.a)({ onDrop: A }),
            $ = M.getRootProps,
            F = M.getInputProps;
          return l.a.createElement(
            l.a.Fragment,
            null,
            l.a.createElement(
              N.a,
              {
                hasArrow: !0,
                placement: 'bottom',
                label: 'or press c + f',
                'aria-label': 'Add file(s)',
              },
              l.a.createElement(
                P.a,
                { cursor: 'pointer', variant: 'solid', onClick: f },
                l.a.createElement(W.a, { name: 'attachment' }),
              ),
            ),
            l.a.createElement(
              q.a,
              {
                closeOnEsc: !1,
                size: '600px',
                isOpen: m,
                scrollBehavior: 'inside',
                onClose: function() {
                  g(), i({});
                },
              },
              l.a.createElement(q.g, null),
              l.a.createElement(
                q.d,
                { height: '80%' },
                l.a.createElement(q.f, null, 'Upload files'),
                l.a.createElement(q.c, null),
                l.a.createElement(
                  q.b,
                  $(),
                  l.a.createElement('input', F()),
                  !!h &&
                    l.a.createElement(
                      L.a,
                      { d: 'block' },
                      v.map(function(e) {
                        var n = Object(j.a)(e, 2),
                          a = n[0],
                          r = n[1];
                        return l.a.createElement(
                          L.a,
                          {
                            key: a,
                            width: '100%',
                            d: 'flex',
                            mb: 15,
                            justifyContent: 'space-between',
                          },
                          l.a.createElement(
                            L.a,
                            { d: 'flex', alignItems: 'center', width: '50%' },
                            l.a.createElement(V.a, {
                              key: r.path,
                              src:
                                'https://react.semantic-ui.com/images/wireframe/image.png',
                              objectFit: 'cover',
                              size: '40px',
                              mr: '15px',
                              rounded: 'lg',
                            }),
                            l.a.createElement(B.a, null, r.name),
                          ),
                          l.a.createElement(
                            L.a,
                            { d: 'flex', verticalAlign: 'middle' },
                            !I &&
                              l.a.createElement(
                                P.a,
                                {
                                  onClick: function(e) {
                                    e.preventDefault(), e.stopPropagation();
                                    var n = r.id,
                                      a = (t[n], Object(R.a)(t, [n].map(_.a)));
                                    i(a);
                                  },
                                },
                                'Remove',
                              ),
                          ),
                        );
                      }),
                    ),
                  !h &&
                    l.a.createElement(
                      L.a,
                      null,
                      l.a.createElement(
                        B.a,
                        null,
                        'Click, drag, or paste here',
                      ),
                    ),
                ),
                l.a.createElement(
                  q.e,
                  null,
                  l.a.createElement(
                    P.a,
                    {
                      isLoading: I,
                      isDisabled: !h,
                      onClick: function() {
                        return U.a.async(function(e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                s(!0);
                              case 1:
                              case 'end':
                                return e.stop();
                            }
                        });
                      },
                      color: h ? 'green' : 'yellow',
                    },
                    l.a.createElement(
                      L.a,
                      { alignItems: 'center' },
                      l.a.createElement(W.a, { name: 'add' }),
                      ' ',
                      h ? 'Add' : 'Waiting for images...',
                    ),
                  ),
                ),
              ),
            ),
          );
        },
        oe = t(68),
        ue = t(93);
      function se() {
        var e = Object(E.a)([
          '\n  mutation createLink($href: String!) {\n    createLink(href: $href) {\n      id\n      href\n    }\n  }\n',
        ]);
        return (
          (se = function() {
            return e;
          }),
          e
        );
      }
      var de = ue.object().shape({
          href: ue
            .string()
            .url('Invalid URL')
            .required('Required'),
        }),
        me = I()(se()),
        fe = function() {
          var e = Object(oe.a)({ validationSchema: de, mode: 'onBlur' }),
            n = e.getValues,
            t = e.setValue,
            a = e.handleSubmit,
            r = e.watch,
            i = e.register,
            c = e.errors;
          r('href');
          var o = n().href,
            u = X(p.CREATE_LINK_MODAL),
            s = u.isModalOpen,
            d = u.openModal,
            m = u.toggleModal,
            f = u.closeModal;
          te('c l', m);
          var b = Object(y.b)(me, {
              variables: { href: o },
              refetchQueries: ['feed'],
              onCompleted: function() {
                return v();
              },
            }),
            g = Object(j.a)(b, 2),
            h = g[0],
            E = g[1].loading;
          G({
            onPaste: function(e) {
              var n = (e.originalEvent || e).clipboardData.getData(
                'text/plain',
              );
              n && t('href', n);
            },
          });
          var v = function() {
            f(), t('href', '');
          };
          return l.a.createElement(
            l.a.Fragment,
            null,
            l.a.createElement(
              N.a,
              {
                hasArrow: !0,
                placement: 'bottom',
                label: 'or press c + l',
                'aria-label': 'Add link',
              },
              l.a.createElement(
                P.a,
                { cursor: 'pointer', variant: 'solid', onClick: d },
                l.a.createElement(W.a, { name: 'link' }),
              ),
            ),
            l.a.createElement(
              q.a,
              {
                onClose: v,
                scrollBehavior: 'inside',
                closeOnEsc: !1,
                isOpen: s,
              },
              l.a.createElement(q.g, null),
              l.a.createElement(
                q.d,
                { height: '250px' },
                l.a.createElement(q.f, null, 'Paste link'),
                l.a.createElement(q.c, null),
                l.a.createElement(
                  q.b,
                  null,
                  l.a.createElement(
                    'form',
                    {
                      onSubmit: a(function() {
                        return U.a.async(function(e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (e.next = 2), U.a.awrap(h());
                              case 2:
                              case 'end':
                                return e.stop();
                            }
                        });
                      }),
                    },
                    l.a.createElement(
                      L.a,
                      { display: 'none' },
                      l.a.createElement('input', {
                        name: 'href',
                        defaultValue: '',
                        ref: i,
                      }),
                      c.href &&
                        l.a.createElement(
                          B.a,
                          { color: 'red' },
                          null === c || void 0 === c ? void 0 : c.href,
                        ),
                    ),
                    o &&
                      l.a.createElement(
                        L.a,
                        { width: '100%' },
                        l.a.createElement(
                          'a',
                          { href: o, target: '_blank' },
                          o,
                        ),
                      ),
                  ),
                ),
                l.a.createElement(
                  q.e,
                  null,
                  l.a.createElement(
                    P.a,
                    {
                      isLoading: E,
                      isDisabled: !o,
                      onClick: function() {
                        return U.a.async(function(e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (E) {
                                  e.next = 3;
                                  break;
                                }
                                return (e.next = 3), U.a.awrap(h());
                              case 3:
                              case 'end':
                                return e.stop();
                            }
                        });
                      },
                      color: o ? 'green' : 'yellow',
                    },
                    l.a.createElement(
                      L.a,
                      { alignItems: 'center' },
                      l.a.createElement(W.a, { name: 'add' }),
                      ' ',
                      o ? 'Add' : 'Waiting for link...',
                    ),
                  ),
                ),
              ),
            ),
          );
        };
      function be() {
        var e = Object(E.a)([
          '\n  query getAuthUser {\n    me {\n      id\n      fullName\n      email\n\n      labels {\n        id\n        name\n      }\n    }\n  }\n',
        ]);
        return (
          (be = function() {
            return e;
          }),
          e
        );
      }
      var pe = I()(be()),
        ge = l.a.createContext({}),
        he = localStorage.getItem('user'),
        Ee = function() {
          return Object(r.useContext)(ge);
        },
        ve = function() {
          var e = Ee();
          return l.a.createElement(
            P.a,
            {
              cursor: 'pointer',
              onClick: function() {
                e.signOut && e.signOut();
              },
            },
            'Sign out',
          );
        };
      function Oe() {
        var e = Object(E.a)([
          '\n  query getUploadGroups {\n    uploadGroups {\n      id\n      isComplete\n\n      files {\n        id\n        name\n        extension\n        isUploaded\n      }\n    }\n  }\n',
        ]);
        return (
          (Oe = function() {
            return e;
          }),
          e
        );
      }
      I()(Oe());
      var je = function() {
          return null;
        },
        ke = t(69),
        we = t(421),
        ye = t(92),
        xe = t(422),
        Ie = t(430),
        Ce = t(229),
        Se = t(210),
        Le = t(418),
        Ae = t(419),
        Me = t(420),
        $e = t(153),
        Fe = t(433);
      function Re() {
        var e = Object(E.a)([
          '\n  mutation createLabel($name: String!) {\n    createLabel(name: $name) {\n      # user\n      id\n\n      labels {\n        id\n        name\n      }\n    }\n  }\n',
        ]);
        return (
          (Re = function() {
            return e;
          }),
          e
        );
      }
      function _e() {
        var e = Object(E.a)([
          '\n  mutation disconnectLabelFromItem($labelId: String!, $itemId: String!) {\n    disconnectLabelFromItem(labelId: $labelId, itemId: $itemId) {\n      ...ItemLabelResponseFragment\n    }\n  }\n\n  ',
          '\n',
        ]);
        return (
          (_e = function() {
            return e;
          }),
          e
        );
      }
      function De() {
        var e = Object(E.a)([
          '\n  mutation connectLabelToItem($name: String!, $itemId: String!) {\n    connectLabelToItem(name: $name, itemId: $itemId) {\n      ...ItemLabelResponseFragment\n    }\n  }\n\n  ',
          '\n',
        ]);
        return (
          (De = function() {
            return e;
          }),
          e
        );
      }
      function Te() {
        var e = Object(E.a)([
          '\n  fragment ItemLabelResponseFragment on Item {\n    id\n\n    labels {\n      id\n      name\n    }\n  }\n',
        ]);
        return (
          (Te = function() {
            return e;
          }),
          e
        );
      }
      var Ue = I()(Te()),
        ze = I()(De(), Ue),
        Ne = I()(_e(), Ue),
        Pe = I()(Re()),
        We = function(e) {
          var n = e.item,
            t = void 0 === n ? null : n,
            a = e.canAddLabels,
            i = void 0 === a || a,
            c = e.selectedLabels,
            o = e.onSelectedLabelChange,
            u = Object(r.useState)(0),
            s = Object(j.a)(u, 2),
            d = s[0],
            m = s[1],
            f = Object(r.useState)([]),
            b = Object(j.a)(f, 2),
            p = b[0],
            g = b[1],
            h = Object(r.useState)(!1),
            E = Object(j.a)(h, 2),
            v = E[0],
            k = E[1],
            x = Object(r.useRef)(null),
            I = Object(Se.a)(),
            C = I.isOpen,
            S = I.onOpen,
            L = I.onClose,
            A = Ee(),
            M = A.user,
            $ = A.refetchUser,
            F = !t;
          Object(r.useEffect)(function() {
            c && g(c);
          }, []),
            Object(r.useEffect)(
              function() {
                o && p !== c && o(p);
              },
              [p && p.length],
            );
          var R = Object(oe.a)({ defaultValues: { search: '' } }),
            _ = R.getValues,
            D = R.setValue,
            T = R.register,
            z = R.watch,
            N = Object(y.b)(ze, {
              onCompleted: function() {
                return U.a.async(function(e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (!$) {
                          e.next = 3;
                          break;
                        }
                        return (e.next = 3), U.a.awrap($());
                      case 3:
                        D('search', '');
                      case 4:
                      case 'end':
                        return e.stop();
                    }
                });
              },
            }),
            q = Object(j.a)(N, 2),
            V = q[0],
            B = q[1].loading,
            G = Object(y.b)(Ne),
            K = Object(j.a)(G, 1)[0],
            J = Object(y.b)(Pe),
            Q = Object(j.a)(J, 1)[0],
            H = _().search,
            X = F ? p : t.labels,
            Y = w.a.take(
              M.labels.filter(function(e) {
                var n = e.name;
                return (
                  !X.find(function(e) {
                    return e.name === n;
                  }) && n.toLowerCase().includes(H.toLowerCase())
                );
              }),
              4,
            );
          z('search'),
            Object(r.useEffect)(
              function() {
                m(0);
              },
              [H],
            ),
            Object(r.useEffect)(
              function() {
                d > Y.length - 1 && m(Y.length - 1);
              },
              [B],
            ),
            Object(r.useEffect)(
              function() {
                C && !v ? k(!0) : !C && v && k(!1);
              },
              [C],
            );
          var Z = function(e) {
            var n, a, r;
            return U.a.async(function(l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if (!F) {
                      l.next = 12;
                      break;
                    }
                    if (
                      (n = M.labels.find(function(n) {
                        return n.name === e;
                      }))
                    ) {
                      l.next = 8;
                      break;
                    }
                    return (
                      (l.next = 5), U.a.awrap(Q({ variables: { name: e } }))
                    );
                  case 5:
                    (a = l.sent),
                      (r = a.data),
                      (n = r.createLabel.labels.find(function(n) {
                        return n.name === e;
                      }));
                  case 8:
                    g([].concat(Object(O.a)(p), [n])),
                      D('search', ''),
                      (l.next = 13);
                    break;
                  case 12:
                    V({ variables: { name: e, itemId: t.id } });
                  case 13:
                  case 'end':
                    return l.stop();
                }
            });
          };
          return l.a.createElement(
            Le.a,
            {
              d: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              alignContent: 'flex-start',
              flexWrap: 'wrap',
            },
            l.a.createElement(
              Ae.a,
              {
                placement: 'bottom',
                isOpen: C,
                initialFocusRef: x,
                onOpen: S,
                onClose: function() {
                  D('search', ''), m(0), L && L();
                },
              },
              i &&
                l.a.createElement(
                  Ae.d,
                  null,
                  l.a.createElement(
                    P.a,
                    {
                      size: 'xs',
                      height: '25px',
                      onClick: S,
                      'aria-label': 'add labels',
                      variant: 'outline',
                      mr: 2,
                      cursor: 'pointer',
                    },
                    l.a.createElement(W.a, { size: '10px', name: 'add' }),
                  ),
                ),
              l.a.createElement(
                Ae.c,
                { zIndex: 4, p: 5 },
                l.a.createElement(
                  Ce.a,
                  { returnFocus: !0, persistentFocus: !1 },
                  l.a.createElement(Ae.b, { bg: 'white' }),
                  l.a.createElement(
                    Le.a,
                    {
                      spacing: 4,
                      shouldWrapChildren: !0,
                      onKeyDown: function(e) {
                        e.metaKey && 'Enter' === e.key && H
                          ? Z(H)
                          : 'Enter' === e.key && Y[d] && Z(Y[d].name);
                      },
                      onKeyUp: function(e) {
                        38 === e.keyCode
                          ? m(d > 0 ? d - 1 : Y.length - 1)
                          : 40 === e.keyCode &&
                            (d < Y.length - 1 ? m(d + 1) : m(0));
                      },
                    },
                    l.a.createElement(
                      ke.a,
                      null,
                      l.a.createElement(
                        Me.a,
                        { size: 'md' },
                        l.a.createElement(ye.a, {
                          pr: '4.5rem',
                          placeholder: 'Label',
                          name: 'search',
                          ref: T,
                        }),
                        l.a.createElement(
                          $e.b,
                          { width: '4.5rem' },
                          l.a.createElement(
                            P.a,
                            {
                              size: 'sm',
                              h: '1.75rem',
                              isLoading: B,
                              onClick: function() {
                                return !B && Z(H);
                              },
                            },
                            'Add',
                          ),
                        ),
                      ),
                    ),
                    !!Y.length &&
                      l.a.createElement(
                        Le.a,
                        { spacing: 2 },
                        Y.map(function(e, n) {
                          var t = e.name;
                          return l.a.createElement(
                            Fe.c,
                            {
                              size: 'md',
                              key: t,
                              cursor: 'pointer',
                              variantColor: n === d ? 'cyan' : 'gray',
                              onMouseOver: function() {
                                return m(n);
                              },
                              onClick: function(e) {
                                e.preventDefault(), e.stopPropagation(), Z(t);
                              },
                            },
                            l.a.createElement(Fe.a, {
                              icon: 'add',
                              size: '6px',
                            }),
                            l.a.createElement(Fe.b, null, t),
                          );
                        }),
                      ),
                  ),
                ),
              ),
            ),
            X.map(function(e) {
              var n = e.id,
                a = e.name;
              return l.a.createElement(
                Fe.c,
                {
                  size: 'md',
                  key: a,
                  mr: 2,
                  mb: 5,
                  cursor: 'pointer',
                  onClick: function() {
                    return (function(e) {
                      var n = e.id,
                        a = e.name;
                      if (F) {
                        var r = p.findIndex(function(e) {
                          return e.name === a;
                        });
                        g(
                          [].concat(
                            Object(O.a)(p.slice(0, r)),
                            Object(O.a)(p.slice(r + 1)),
                          ),
                        );
                      } else K({ variables: { labelId: n, itemId: t.id } });
                    })({ id: n, name: a });
                  },
                },
                l.a.createElement(Fe.a, { size: '12px', icon: 'delete' }),
                l.a.createElement(Fe.b, null, a),
              );
            }),
          );
        },
        qe = { search: '', labels: [], type: 'all' },
        Ve = function(e) {
          var n = e.filter,
            t = e.variables,
            i = Object(r.useState)(qe),
            c = Object(j.a)(i, 2),
            o = c[0],
            u = c[1],
            s = Ee().user,
            d = X(p.FILTER_FEED_MODAL),
            m = d.isModalOpen,
            f = d.openModal,
            b = d.closeModal,
            g = d.toggleModal;
          te('command command', g, { isGlobal: !0 });
          var h = (function(e, n) {
              var t = w.a.get(e, 'where.labels.some.id.in', []);
              return {
                search: e.search,
                type: e.type || 'all',
                labels: t.map(function(e) {
                  return n.labels.find(function(n) {
                    return n.id === e;
                  });
                }),
              };
            })(t, s),
            E = o.search,
            v = o.labels,
            O = o.type;
          return (
            Object(r.useEffect)(
              function() {
                m && u(h);
              },
              [m],
            ),
            l.a.createElement(
              l.a.Fragment,
              null,
              l.a.createElement(
                N.a,
                {
                  hasArrow: !0,
                  placement: 'bottom',
                  label: 'or press \u2318 + \u2318',
                  'aria-label': 'Filter feed',
                },
                l.a.createElement(
                  P.a,
                  {
                    cursor: 'pointer',
                    leftIcon: 'search',
                    variant: 'outline',
                    onClick: f,
                  },
                  'Filter',
                ),
              ),
              l.a.createElement(
                q.a,
                {
                  isCentered: !0,
                  isOpen: m,
                  onClose: b,
                  closeOnEsc: !0,
                  closeOnOverlayClick: !0,
                },
                l.a.createElement(q.g, null),
                l.a.createElement(
                  q.d,
                  { rounded: 'lg' },
                  l.a.createElement(
                    q.b,
                    null,
                    l.a.createElement(
                      L.a,
                      { p: 5 },
                      l.a.createElement(
                        ke.a,
                        { mb: 5 },
                        l.a.createElement(we.a, null, 'Search'),
                        l.a.createElement(ye.a, {
                          name: 'search',
                          defaultValue: '',
                          value: o.search,
                          onChange: function(e) {
                            u(Object(a.a)({}, o, { search: e.target.value }));
                          },
                        }),
                        l.a.createElement(
                          xe.a,
                          { id: 'email-helper-text' },
                          'Note content, file name, URL domain, etc.',
                        ),
                      ),
                      l.a.createElement(
                        ke.a,
                        { mb: 5 },
                        l.a.createElement(we.a, null, 'Type'),
                        l.a.createElement(
                          Ie.a,
                          {
                            placeholder: 'Select type',
                            value: o.type,
                            onChange: function(e) {
                              u(Object(a.a)({}, o, { type: e.target.value }));
                            },
                          },
                          [
                            ['all', 'All'],
                            ['link', 'Links'],
                            ['file', 'Files'],
                            ['note', 'Notes'],
                          ].map(function(e) {
                            var n = Object(j.a)(e, 2),
                              t = n[0],
                              a = n[1];
                            return l.a.createElement('option', { value: t }, a);
                          }),
                        ),
                        l.a.createElement(
                          xe.a,
                          { id: 'email-helper-text' },
                          'File, link, note',
                        ),
                      ),
                      l.a.createElement(
                        ke.a,
                        null,
                        l.a.createElement(we.a, null, 'Labels'),
                        l.a.createElement(We, {
                          selectedLabels: h.labels,
                          onSelectedLabelChange: function(e) {
                            u(Object(a.a)({}, o, { labels: e }));
                          },
                        }),
                      ),
                    ),
                  ),
                  l.a.createElement(
                    q.e,
                    null,
                    l.a.createElement(
                      P.a,
                      {
                        variant: 'outline',
                        color: 'green',
                        cursor: 'pointer',
                        mr: 3,
                        onClick: function() {
                          return U.a.async(function(e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (e.next = 2), U.a.awrap(n(J(qe)));
                                case 2:
                                  b();
                                case 3:
                                case 'end':
                                  return e.stop();
                              }
                          });
                        },
                      },
                      'Reset',
                    ),
                    l.a.createElement(
                      P.a,
                      {
                        color: 'green',
                        cursor: 'pointer',
                        onClick: function() {
                          return U.a.async(function(e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (
                                    (e.next = 2),
                                    U.a.awrap(
                                      n(J({ labels: v, search: E, type: O })),
                                    )
                                  );
                                case 2:
                                  b();
                                case 3:
                                case 'end':
                                  return e.stop();
                              }
                          });
                        },
                      },
                      'Apply',
                    ),
                  ),
                ),
              ),
            )
          );
        };
      function Be() {
        var e = Object(E.a)([
          '\n  mutation updateNote($noteId: String!, $raw: String!, $text: String!) {\n    updateNote(noteId: $noteId, raw: $raw, text: $text) {\n      ...NoteFull\n    }\n  }\n\n  ',
          '\n',
        ]);
        return (
          (Be = function() {
            return e;
          }),
          e
        );
      }
      function Ge() {
        var e = Object(E.a)([
          '\n  mutation createNote($raw: String!, $text: String!) {\n    createNote(raw: $raw, text: $text) {\n      ...NoteFull\n    }\n  }\n\n  ',
          '\n',
        ]);
        return (
          (Ge = function() {
            return e;
          }),
          e
        );
      }
      function Ke() {
        var e = Object(E.a)([
          '\n  fragment NoteFull on Note {\n    id\n\n    raw\n    text\n\n    createdAt\n    updatedAt\n\n    item {\n      id\n      type\n\n      labels {\n        id\n        name\n      }\n    }\n  }\n',
        ]);
        return (
          (Ke = function() {
            return e;
          }),
          e
        );
      }
      var Je = I()(Ke()),
        Qe = I()(Ge(), Je),
        He = I()(Be(), Je),
        Xe = t(3),
        Ye = t(218),
        Ze = t.n(Ye),
        en = t(36),
        nn = t.n(en),
        tn = t(104),
        an = t(232);
      function rn() {
        var e = Object(E.a)([
          '\n      font-family: monospace;\n      background-color: #eee;\n      padding: 3px;\n    ',
        ]);
        return (
          (rn = function() {
            return e;
          }),
          e
        );
      }
      function ln() {
        var e = Object(E.a)([
          '\n      display: inline-block;\n      border-left: 2px solid #ddd;\n      padding-left: 10px;\n      color: #aaa;\n      font-style: italic;\n    ',
        ]);
        return (
          (ln = function() {
            return e;
          }),
          e
        );
      }
      function cn() {
        var e = Object(E.a)([
          '\n      display: block;\n      text-align: center;\n      border-bottom: 2px solid #ddd;\n    ',
        ]);
        return (
          (cn = function() {
            return e;
          }),
          e
        );
      }
      function on() {
        var e = Object(E.a)([
          '\n      padding-left: 10px;\n      font-size: 20px;\n      line-height: 10px;\n    ',
        ]);
        return (
          (on = function() {
            return e;
          }),
          e
        );
      }
      function un() {
        var e = Object(E.a)([
          '\n      display: inline-block;\n      font-weight: bold;\n      font-size: 20px;\n      margin: 20px 0 10px 0;\n    ',
        ]);
        return (
          (un = function() {
            return e;
          }),
          e
        );
      }
      function sn() {
        var e = Object(E.a)([
          '\n  font-size: 16px;\n  font-weight: ',
          ';\n  font-style: ',
          ';\n  text-decoration: ',
          ';\n  ',
          '\n  ',
          '\n  ',
          '\n  ',
          '\n  ',
          '\n',
        ]);
        return (
          (sn = function() {
            return e;
          }),
          e
        );
      }
      (nn.a.languages.markdown = nn.a.languages.extend('markup', {})),
        nn.a.languages.insertBefore('markdown', 'prolog', {
          blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: 'punctuation' },
          code: [
            { pattern: /^(?: {4}|\t).+/m, alias: 'keyword' },
            { pattern: /``.+?``|`[^`\n]+`/, alias: 'keyword' },
          ],
          title: [
            {
              pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
              alias: 'important',
              inside: { punctuation: /==+$|--+$/ },
            },
            {
              pattern: /(^\s*)#+.+/m,
              lookbehind: !0,
              alias: 'important',
              inside: { punctuation: /^#+|#+$/ },
            },
          ],
          hr: {
            pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,
            lookbehind: !0,
            alias: 'punctuation',
          },
          list: {
            pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
            lookbehind: !0,
            alias: 'punctuation',
          },
          'url-reference': {
            pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
            inside: {
              variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
              string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
              punctuation: /^[\[\]!:]|[<>]/,
            },
            alias: 'url',
          },
          bold: {
            pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
            lookbehind: !0,
            inside: { punctuation: /^\*\*|^__|\*\*$|__$/ },
          },
          italic: {
            pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
            lookbehind: !0,
            inside: { punctuation: /^[*_]|[*_]$/ },
          },
          url: {
            pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
            inside: {
              variable: { pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
              string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ },
            },
          },
        }),
        (nn.a.languages.markdown.bold.inside.url = nn.a.util.clone(
          nn.a.languages.markdown.url,
        )),
        (nn.a.languages.markdown.italic.inside.url = nn.a.util.clone(
          nn.a.languages.markdown.url,
        )),
        (nn.a.languages.markdown.bold.inside.italic = nn.a.util.clone(
          nn.a.languages.markdown.italic,
        )),
        (nn.a.languages.markdown.italic.inside.bold = nn.a.util.clone(
          nn.a.languages.markdown.bold,
        ));
      var dn = [
          {
            children: [
              {
                text:
                  'Slate is flexible enough to add **decorations** that can format text based on its content. For example, this editor has **Markdown** preview decorations on it, to make it _dead_ simple to make an editor with built-in Markdown previewing.',
              },
            ],
          },
          { children: [{ text: '## Try it out!' }] },
          { children: [{ text: 'Try it out for yourself!' }] },
        ],
        mn = v.b.span(
          sn(),
          function(e) {
            return e.leaf.bold && 'bold';
          },
          function(e) {
            return e.leaf.italic && 'italic';
          },
          function(e) {
            return e.leaf.underlined && 'underline';
          },
          function(e) {
            return e.leaf.title && Object(v.a)(un());
          },
          function(e) {
            return e.leaf.list && Object(v.a)(on());
          },
          function(e) {
            return e.leaf.hr && Object(v.a)(cn());
          },
          function(e) {
            return e.leaf.blockquote && Object(v.a)(ln());
          },
          function(e) {
            return e.leaf.code && Object(v.a)(rn());
          },
        ),
        fn = function(e) {
          var n = e.attributes,
            t = e.children,
            a = e.leaf;
          return l.a.createElement(mn, Object.assign({}, n, { leaf: a }), t);
        },
        bn = l.a.memo(function(e) {
          var n = e.value,
            t = void 0 === n ? dn : n,
            a = e.onChange,
            i = Object(r.useMemo)(function() {
              return Object(an.a)(Object(tn.d)(Object(Xe.i)()));
            }, []),
            c =
              (l.a.useRef(null),
              Object(r.useCallback)(function(e) {
                return l.a.createElement(fn, e);
              }, [])),
            o = Object(r.useCallback)(function(e) {
              var n = Object(j.a)(e, 2),
                t = n[0],
                a = n[1],
                r = [];
              if (!Xe.g.isText(t)) return r;
              var l = function e(n) {
                  return 'string' === typeof n
                    ? n.length
                    : 'string' === typeof n.content
                    ? n.content.length
                    : n.content.reduce(function(n, t) {
                        return n + e(t);
                      }, 0);
                },
                i = nn.a.tokenize(t.text, nn.a.languages.markdown),
                c = 0,
                o = !0,
                u = !1,
                s = void 0;
              try {
                for (
                  var d, m = i[Symbol.iterator]();
                  !(o = (d = m.next()).done);
                  o = !0
                ) {
                  var f,
                    b = d.value,
                    p = c + l(b);
                  if ('string' !== typeof b)
                    r.push(
                      ((f = {}),
                      Object(D.a)(f, b.type, !0),
                      Object(D.a)(f, 'anchor', { path: a, offset: c }),
                      Object(D.a)(f, 'focus', { path: a, offset: p }),
                      f),
                    );
                  c = p;
                }
              } catch (g) {
                (u = !0), (s = g);
              } finally {
                try {
                  o || null == m.return || m.return();
                } finally {
                  if (u) throw s;
                }
              }
              return r;
            }, []);
          return (
            Object(r.useEffect)(function() {
              tn.b.focus(i);
            }, []),
            l.a.createElement(
              L.a,
              null,
              l.a.createElement(
                tn.c,
                { autoFocus: !0, editor: i, value: t, onChange: a },
                l.a.createElement(tn.a, {
                  decorate: o,
                  renderLeaf: c,
                  placeholder: 'Write a note...',
                }),
              ),
            )
          );
        });
      function pn() {
        var e = Object(E.a)([
          '\n  mutation refreshLinkMeta($linkId: String!, $href: String!) {\n    refreshLinkMeta(linkId: $linkId, href: $href) {\n      ...LinkFull\n    }\n  }\n\n  ',
          '\n',
        ]);
        return (
          (pn = function() {
            return e;
          }),
          e
        );
      }
      function gn() {
        var e = Object(E.a)([
          '\n  mutation updateLink(\n    $linkId: String!\n    $href: String!\n    $title: String!\n    $description: String\n  ) {\n    updateLink(\n      linkId: $linkId\n      href: $href\n      title: $title\n      description: $description\n    ) {\n      ...LinkFull\n    }\n  }\n\n  ',
          '\n',
        ]);
        return (
          (gn = function() {
            return e;
          }),
          e
        );
      }
      function hn() {
        var e = Object(E.a)([
          '\n  fragment LinkFull on Link {\n    id\n\n    href\n    notes\n\n    createdAt\n    updatedAt\n\n    image\n    favicon\n    title\n    description\n\n    item {\n      id\n      type\n\n      labels {\n        id\n        name\n      }\n    }\n  }\n',
        ]);
        return (
          (hn = function() {
            return e;
          }),
          e
        );
      }
      var En = I()(hn()),
        vn = I()(gn(), En),
        On = I()(pn(), En);
      function jn() {
        var e = Object(E.a)([
          '\n  mutation deleteItem($itemId: String!) {\n    deleteItem(itemId: $itemId) {\n      # user\n      id\n    }\n  }\n',
        ]);
        return (
          (jn = function() {
            return e;
          }),
          e
        );
      }
      function kn() {
        var e = Object(E.a)([
          '\n  fragment ItemWithLabels on Item {\n    id\n    type\n\n    labels {\n      id\n      name\n    }\n  }\n',
        ]);
        return (
          (kn = function() {
            return e;
          }),
          e
        );
      }
      function wn() {
        var e = Object(E.a)([
          '\n  fragment ItemFull on Item {\n    id\n    type\n\n    createdAt\n    updatedAt\n\n    labels {\n      id\n      name\n    }\n\n    link {\n      ...LinkFull\n    }\n\n    file {\n      id\n      name\n      extension\n      isUploaded\n      fullUrl\n      squareUrl\n\n      createdAt\n      updatedAt\n    }\n\n    note {\n      ...NoteFull\n    }\n  }\n\n  ',
          '\n  ',
          '\n',
        ]);
        return (
          (wn = function() {
            return e;
          }),
          e
        );
      }
      var yn = I()(wn(), En, Je),
        xn = (I()(kn()), I()(jn())),
        In = function(e) {
          return Object(y.b)(xn, {
            variables: { itemId: e.id },
            optimisticResponse: {
              __typename: 'Mutation',
              deleteItem: { id: '1234', __typename: 'Item' },
            },
            update: function(n) {
              var t, a;
              return U.a.async(function(r) {
                for (;;)
                  switch ((r.prev = r.next)) {
                    case 0:
                      return (
                        (t = n.readQuery({ query: et })),
                        (a = t.items.filter(function(n) {
                          return n.id !== e.id;
                        })),
                        (r.next = 4),
                        U.a.awrap(
                          n.writeQuery({ query: et, data: { items: a } }),
                        )
                      );
                    case 4:
                    case 'end':
                      return r.stop();
                  }
              });
            },
          });
        },
        Cn = function(e) {
          var n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 500,
            t = Object(r.useRef)(w.a.debounce(e, n)),
            a = t.current;
          return a;
        },
        Sn = function(e) {
          return e
            .map(function(e) {
              return Xe.c.string(e);
            })
            .join('\n');
        },
        Ln = [{ children: [{ text: '', marks: [] }] }],
        An =
          (Sn(Ln),
          function(e) {
            var n = e.note,
              t = Object(oe.a)({ defaultValues: { value: JSON.parse(n.raw) } }),
              a = t.getValues,
              i = t.watch,
              c = t.setValue,
              o = t.register,
              u = a().value,
              s = Object(r.useRef)(Sn(u)),
              d = Object(y.b)(He, {
                variables: {
                  noteId: n.id,
                  raw: JSON.stringify(u),
                  text: Ze()(s.current),
                },
              }),
              m = Object(j.a)(d, 1)[0],
              f = Cn(m),
              b = In(n.item),
              p = Object(j.a)(b, 1)[0];
            return (
              i('value'),
              Object(r.useEffect)(
                function() {
                  o({ name: 'value' });
                },
                [o],
              ),
              Object(r.useEffect)(
                function() {
                  var e = Sn(u);
                  e !== s.current && f(u), (s.current = e);
                },
                [u],
              ),
              Object(r.useEffect)(function() {
                return function() {
                  f.cancel(), s.current || p();
                };
              }, []),
              l.a.createElement(bn, {
                value: u,
                onChange: function(e) {
                  c('value', e);
                },
              })
            );
          }),
        Mn = function(e) {
          var n = e.item,
            t = e.children,
            a = Object(r.useState)(!1),
            i = Object(j.a)(a, 2),
            c = i[0],
            o = i[1],
            u = function() {
              return o(!0);
            },
            s = function() {
              return o(!1);
            },
            d = Object(y.a)();
          te('c n', function() {
            g || o(!0);
          });
          var m = Object(y.b)(Qe, {
              variables: { raw: JSON.stringify(Ln), text: Sn(Ln) },
              refetchQueries: ['feed'],
            }),
            f = Object(j.a)(m, 2),
            b = f[0],
            p = f[1].data;
          Object(r.useEffect)(
            function() {
              c && !n && b();
            },
            [c],
          );
          var g =
            n && n.note
              ? n.note
              : p && d.readFragment({ id: p.createNote.id, fragment: Je });
          return l.a.createElement(
            l.a.Fragment,
            null,
            t
              ? t({ isOpen: c, open: u, close: s })
              : l.a.createElement(
                  N.a,
                  {
                    hasArrow: !0,
                    placement: 'bottom',
                    label: 'or press c + n',
                    'aria-label': 'Add note',
                  },
                  l.a.createElement(
                    P.a,
                    { variant: 'solid', cursor: 'pointer', onClick: u },
                    l.a.createElement(W.a, { name: 'plus-square' }),
                  ),
                ),
            l.a.createElement(
              q.a,
              {
                size: 'full',
                scrollBehavior: 'inside',
                isOpen: c,
                onClose: s,
                closeOnEsc: !1,
              },
              l.a.createElement(q.g, null),
              l.a.createElement(
                q.d,
                { height: 700, width: 700 },
                l.a.createElement(q.f, null),
                l.a.createElement(q.c, null),
                l.a.createElement(
                  q.b,
                  null,
                  l.a.createElement(
                    L.a,
                    { p: 5, height: '100%' },
                    g
                      ? l.a.createElement(An, { note: g })
                      : l.a.createElement(
                          L.a,
                          { d: 'flex', justifyContent: 'center' },
                          l.a.createElement(A.a, null),
                        ),
                  ),
                ),
                g &&
                  l.a.createElement(
                    q.e,
                    { justifyContent: 'flex-start' },
                    l.a.createElement(
                      L.a,
                      { mt: 5 },
                      l.a.createElement(We, { item: g.item }),
                    ),
                  ),
              ),
            ),
          );
        },
        $n = t(429),
        Fn = t(427),
        Rn = function(e) {
          var n = e.src,
            t = e.isReady,
            i = void 0 === t || t,
            c = e.showSpinner,
            o = void 0 === c || c,
            u = e.loadingContainerProps,
            s = e.placeholderIcon,
            d = void 0 === s ? 'view-off' : s,
            m =
              (e.fit,
              Object(R.a)(e, [
                'src',
                'isReady',
                'showSpinner',
                'loadingContainerProps',
                'placeholderIcon',
                'fit',
              ])),
            f = Object(r.useState)(null),
            b = Object(j.a)(f, 2),
            p = b[0],
            g = b[1],
            h = Object(r.useState)(!1),
            E = Object(j.a)(h, 2),
            v = E[0],
            O = E[1],
            k = Object(r.useState)({ width: 0, height: 0 }),
            w = Object(j.a)(k, 2),
            y = (w[0], w[1]);
          Object(r.useEffect)(
            function() {
              if (i) {
                var e = new Image();
                (e.src = n),
                  (e.onload = function() {
                    return g(e.src);
                  }),
                  (e.onerror = function() {
                    return O(!0);
                  }),
                  y({ width: e.width, height: e.height });
              }
            },
            [i],
          );
          var x = Object(a.a)({ rounded: 'lg' }, m);
          return !i || !p || !n || v
            ? l.a.createElement(
                L.a,
                Object.assign(
                  {
                    d: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    rounded: 'lg',
                  },
                  x,
                  u,
                ),
                n && o
                  ? l.a.createElement(A.a, { size: 'xl' })
                  : l.a.createElement(W.a, {
                      size: '50px',
                      name: v ? 'warning' : d,
                    }),
              )
            : l.a.createElement(V.a, Object.assign({ src: n }, x));
        },
        _n = function(e) {
          var n = Object(r.useRef)(
              Object(k.debounce)(function() {
                e.onSingleClick && e.onSingleClick();
              }, 200),
            ),
            t = !!(
              e.onSingleClick ||
              e.onDoubleClick ||
              e.onMetaClick ||
              e.onShiftClick
            );
          return e.children(
            Object(a.a)({}, t ? { cursor: 'pointer' } : {}, {
              onClick: function(t) {
                t.preventDefault(),
                  e.onMetaClick && t.metaKey
                    ? e.onMetaClick()
                    : e.onShiftClick && t.shiftKey
                    ? e.onShiftClick()
                    : n.current();
              },
              onDoubleClick: function() {
                n.current.cancel(), e.onDoubleClick && e.onDoubleClick();
              },
            }),
          );
        },
        Dn = function(e) {
          var n = e.item,
            t = e.children,
            a = Object(R.a)(e, ['item', 'children']),
            i = Object(r.useContext)($),
            c = i.onToggleThunk,
            o = i.onSelectRangeThunk;
          i.onResetAndSelectThunk;
          return l.a.createElement(
            _n,
            Object.assign({ onMetaClick: c(n), onShiftClick: o(n) }, a),
            t,
          );
        },
        Tn = function(e) {
          var n = e.item,
            t = e.children,
            a = Object(Se.a)(),
            r = a.isOpen,
            i = a.onOpen,
            c = a.onClose,
            o = n.file;
          return l.a.createElement(
            l.a.Fragment,
            null,
            t && t({ isOpen: r, onOpen: i, onClose: c }),
            l.a.createElement(
              q.a,
              {
                size: 'full',
                scrollBehavior: 'inside',
                isOpen: r,
                onClose: c,
                closeOnEsc: !1,
              },
              l.a.createElement(q.g, null),
              l.a.createElement(
                q.d,
                { maxWidth: 1200 },
                l.a.createElement(q.f, null),
                l.a.createElement(q.c, null),
                l.a.createElement(
                  q.b,
                  { d: 'flex', justifyContent: 'center' },
                  l.a.createElement(Rn, {
                    rounded: !0,
                    isReady: !!o.isUploaded,
                    src: o.fullUrl,
                    maxWidth: '100%',
                    objectFit: 'scale-down',
                    pt: 5,
                    pb: 5,
                  }),
                ),
                l.a.createElement(
                  q.e,
                  { justifyContent: 'flex-start' },
                  l.a.createElement(
                    L.a,
                    { mt: 5 },
                    l.a.createElement(We, { item: n }),
                  ),
                ),
              ),
            ),
          );
        },
        Un = function(e) {
          var n = e.item,
            t = n.file;
          return l.a.createElement(Tn, { item: n }, function(e) {
            var a = e.onOpen;
            return l.a.createElement(
              Xn,
              { item: n, tooltip: 'Open file' },
              l.a.createElement(Dn, { onSingleClick: a, item: n }, function(e) {
                return l.a.createElement(
                  Rn,
                  Object.assign(
                    {
                      width: Kn,
                      height: '200px',
                      objectFit: 'cover',
                      isReady: t.isUploaded,
                      src: t.isUploaded ? t.squareUrl : null,
                    },
                    e,
                  ),
                );
              }),
              l.a.createElement(
                Hn,
                { item: n, onSingleClick: a },
                t.name,
                '.',
                t.extension,
              ),
            );
          });
        },
        zn = t(423),
        Nn = t(424),
        Pn = t(425),
        Wn = ue.object().shape({
          href: ue
            .string()
            .url('Invalid URL')
            .required('Required'),
        }),
        qn = function(e) {
          var n,
            t,
            i,
            c = e.item,
            o = e.children,
            u = Object(Se.a)(),
            s = u.isOpen,
            d = u.onOpen,
            m = u.onClose,
            f = c.link,
            b = Object(oe.a)({ validationSchema: Wn, mode: 'onBlur' }),
            p = b.getValues,
            g = b.setValue,
            h = b.watch,
            E = b.errors,
            v = b.register;
          h();
          var O = p(),
            k = Object(y.b)(vn, {
              variables: Object(a.a)({ linkId: f.id }, O),
            }),
            x = Object(j.a)(k, 2),
            I = x[0],
            C = x[1].loading,
            S = Object(y.b)(On, {
              variables: { linkId: f.id, href: O.href },
              onError: console.log,
              onCompleted: function(e) {
                console.log(e),
                  g('href', e.refreshLinkMeta.href),
                  g('title', e.refreshLinkMeta.title),
                  g('description', e.refreshLinkMeta.title);
              },
            }),
            M = Object(j.a)(S, 2),
            $ = M[0],
            F = M[1].loading,
            R = Cn(I),
            _ = Object(r.useRef)(O);
          Object(r.useEffect)(
            function() {
              s &&
                (g('href', f.href),
                g('title', f.title),
                g('description', f.title));
            },
            [s],
          ),
            Object(r.useEffect)(
              function() {
                s &&
                  (!w.a.isEqual(_.current, O) && O.href && O.title && R(),
                  (_.current = O));
              },
              [O],
            ),
            Object(r.useEffect)(function() {
              return function() {
                R.cancel();
              };
            }, []);
          var D = F || C;
          return l.a.createElement(
            l.a.Fragment,
            null,
            o && o({ isOpen: s, onOpen: d, onClose: m }),
            l.a.createElement(
              q.a,
              {
                size: 'full',
                scrollBehavior: 'inside',
                isOpen: s,
                onClose: m,
                closeOnEsc: !1,
              },
              l.a.createElement(q.g, null),
              l.a.createElement(
                q.d,
                { maxWidth: 500, maxHeight: 700 },
                l.a.createElement(q.f, null),
                l.a.createElement(q.c, null),
                l.a.createElement(
                  q.b,
                  null,
                  l.a.createElement(
                    Le.a,
                    { spacing: 5 },
                    f.image &&
                      l.a.createElement(Rn, {
                        rounded: !0,
                        src: f.image,
                        height: '200px',
                        objectFit: 'cover',
                        pt: 5,
                        pb: 5,
                      }),
                    l.a.createElement(
                      ke.a,
                      null,
                      l.a.createElement(we.a, { htmlFor: 'href' }, 'URL'),
                      l.a.createElement(
                        Me.a,
                        { size: 'md' },
                        l.a.createElement(
                          zn.a,
                          {
                            as: P.a,
                            cursor: 'pointer',
                            verticalAlign: 'middle',
                            variant: 'outline',
                            isDisabled: F,
                            isLoading: F,
                            onClick: function() {
                              return $();
                            },
                            roundedLeft: '0',
                          },
                          'Autofill',
                        ),
                        l.a.createElement(ye.a, {
                          name: 'href',
                          id: 'href',
                          rounded: '0',
                          defaultValue: f.href,
                          ref: v,
                        }),
                        l.a.createElement(
                          zn.b,
                          {
                            as: P.a,
                            cursor: 'pointer',
                            verticalAlign: 'middle',
                            variant: 'outline',
                            onClick: function() {
                              return window.open(f.href, '_blank');
                            },
                            roundedRight: '0',
                          },
                          'Go',
                        ),
                      ),
                      l.a.createElement(
                        Nn.a,
                        null,
                        null === E || void 0 === E
                          ? void 0
                          : null === (n = E.href) || void 0 === n
                          ? void 0
                          : n.message,
                      ),
                    ),
                    l.a.createElement(
                      ke.a,
                      null,
                      l.a.createElement(we.a, { htmlFor: 'href' }, 'Title'),
                      l.a.createElement(ye.a, {
                        name: 'title',
                        id: 'title',
                        defaultValue: f.title || '',
                        ref: v,
                      }),
                      l.a.createElement(
                        Nn.a,
                        null,
                        null === E || void 0 === E
                          ? void 0
                          : null === (t = E.title) || void 0 === t
                          ? void 0
                          : t.message,
                      ),
                    ),
                    l.a.createElement(
                      ke.a,
                      null,
                      l.a.createElement(
                        we.a,
                        { htmlFor: 'href' },
                        'Description',
                      ),
                      l.a.createElement(Pn.a, {
                        name: 'description',
                        id: 'description',
                        size: 'md',
                        defaultValue: f.description || '',
                        ref: v,
                      }),
                      l.a.createElement(
                        Nn.a,
                        null,
                        null === E || void 0 === E
                          ? void 0
                          : null === (i = E.description) || void 0 === i
                          ? void 0
                          : i.message,
                      ),
                    ),
                  ),
                ),
                l.a.createElement(
                  q.e,
                  { justifyContent: 'space-between', pt: 5 },
                  l.a.createElement(We, { item: c }),
                  l.a.createElement(
                    L.a,
                    null,
                    D ? l.a.createElement(A.a, { size: 'sm' }) : 'Up to date',
                    ' ',
                  ),
                ),
              ),
            ),
          );
        },
        Vn = function(e) {
          var n = e.item,
            t = n.link;
          return l.a.createElement(qn, { item: n }, function(e) {
            var a = e.onOpen;
            return l.a.createElement(
              l.a.Fragment,
              null,
              l.a.createElement(
                Xn,
                { item: n, tooltip: 'Open (\u2318 + click to go to url)' },
                l.a.createElement(
                  Dn,
                  {
                    onSingleClick: a,
                    onMetaClick: function() {
                      return window.open(t.href, '_blank');
                    },
                    item: n,
                  },
                  function(e) {
                    return l.a.createElement(
                      Rn,
                      Object.assign(
                        {
                          src: t.image,
                          width: Kn,
                          height: '200px',
                          objectFit: 'cover',
                          placeholderIcon: 'external-link',
                        },
                        e,
                      ),
                    );
                  },
                ),
              ),
              l.a.createElement(
                Hn,
                {
                  item: n,
                  onSingleClick: function() {
                    return window.open(t.href, '_blank');
                  },
                },
                l.a.createElement(W.a, { name: 'link', fontSize: 's', mr: 2 }),
                ' ',
                t.title || t.href,
              ),
            );
          });
        },
        Bn = t(426),
        Gn = function(e) {
          var n = e.item,
            t = n.note;
          return l.a.createElement(Mn, { item: n }, function(e) {
            var a = e.open;
            return l.a.createElement(
              Dn,
              { onSingleClick: a, item: n },
              function(e) {
                return l.a.createElement(
                  l.a.Fragment,
                  null,
                  l.a.createElement(
                    Xn,
                    Object.assign(
                      {
                        border: '1px solid black',
                        rounded: 'lg',
                        p: 5,
                        overflow: 'hidden',
                        tooltip: 'Open note',
                        item: n,
                      },
                      e,
                    ),
                    l.a.createElement(B.a, { fontSize: 'xs' }, t.text),
                  ),
                  l.a.createElement(Hn, { item: n }, t.text),
                );
              },
            );
          });
        },
        Kn = 270,
        Jn = Kn + 5,
        Qn = function(e) {
          var n = e.item,
            t = null,
            a = Object(r.useContext)($).isItemSelected;
          switch (n.type) {
            case 'file':
              t = n.file ? l.a.createElement(Un, { item: n }) : null;
              break;
            case 'note':
              t =
                n.note && n.note.text
                  ? l.a.createElement(Gn, { item: n })
                  : null;
              break;
            case 'link':
              t = n.link ? l.a.createElement(Vn, { item: n }) : null;
              break;
            default:
              t = null;
          }
          return t
            ? l.a.createElement(
                L.a,
                {
                  d: 'flex',
                  justifyContent: 'center',
                  margin: 0,
                  width: Kn,
                  maxWidth: Kn,
                  height: 315,
                  padding: ''.concat(5, 'px'),
                },
                l.a.createElement(
                  Le.a,
                  { p: '4' },
                  l.a.createElement(L.a, null, a(n) && !1, t),
                ),
              )
            : null;
        },
        Hn = function(e) {
          var n = e.children,
            t = e.item,
            a = Object(R.a)(e, ['children', 'item']);
          return l.a.createElement(_n, a, function(e) {
            return l.a.createElement(
              L.a,
              Object.assign({}, e, { mt: 4, ml: 1 }),
              l.a.createElement(
                B.a,
                {
                  maxWidth: Kn,
                  fontSize: 'lg',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  style: { textOverflow: 'ellipsis' },
                  mb: 3,
                },
                n,
              ),
              l.a.createElement(
                B.a,
                null,
                Object(Fn.a)(new Date(t.createdAt), new Date()),
              ),
            );
          });
        },
        Xn = function(e) {
          var n = e.children,
            t = e.tooltip,
            a = e.item,
            r = Object(R.a)(e, ['children', 'tooltip', 'item']),
            i = Object(Se.a)(),
            c = Object(Se.a)(),
            o = l.a.useRef(null),
            u = In(a),
            s = Object(j.a)(u, 1)[0];
          return (
            te(
              'd',
              function() {
                i.isOpen && s();
              },
              { ref: o.current, shouldBind: i.isOpen },
            ),
            l.a.createElement(
              N.a,
              {
                hasArrow: !0,
                label: t,
                'aria-label': t,
                placement: 'top',
                maxWidth: 200,
                isOpen: i.isOpen && !c.isOpen,
                onOpen: i.onOpen,
              },
              l.a.createElement(
                L.a,
                {
                  onMouseEnter: i.onOpen,
                  onMouseLeave: i.onClose,
                  position: 'relative',
                },
                i.isOpen &&
                  l.a.createElement(
                    L.a,
                    {
                      d: 'flex',
                      justifyContent: 'flex-end',
                      p: 2,
                      alignItems: 'center',
                      roundedBottomRight: 'lg',
                      roundedBottomLeft: 'lg',
                      position: 'absolute',
                      bottom: 0,
                      height: 10,
                      width: Kn,
                      zIndex: 10,
                      backgroundColor: 'lightgrey',
                      background: 'rgb(211,211,211, 0.8);',
                      opacity: 9,
                      onMouseOver: c.onOpen,
                      onMouseLeave: c.onClose,
                    },
                    l.a.createElement(
                      N.a,
                      {
                        hasArrow: !0,
                        label: 'press d while hovering over the item',
                        'aria-label': 'delete item',
                        placement: 'bottom',
                      },
                      l.a.createElement(Bn.a, {
                        size: 'sm',
                        icon: 'delete',
                        cursor: 'pointer',
                        'aria-label': 'delete item',
                        onClick: function() {
                          return s();
                        },
                      }),
                    ),
                  ),
                l.a.createElement(
                  L.a,
                  Object.assign({ width: Kn, height: 200, ref: o }, r),
                  n,
                ),
              ),
            )
          );
        },
        Yn = function(e) {
          var n = e.query,
            t = (e.nextPage, n.data);
          return l.a.createElement(
            $n.a,
            { minChildWidth: Jn, spacing: 10 },
            ((null === t || void 0 === t ? void 0 : t.items) || []).map(
              function(e) {
                return l.a.createElement(Qn, { item: e, key: e.id });
              },
            ),
          );
        };
      function Zn() {
        var e = Object(E.a)([
          '\n  query feed(\n    $first: Int\n    $skip: Int\n    $search: String\n    $type: ItemType\n    $where: ItemWhereInput\n  ) {\n    items(\n      first: $first\n      skip: $skip\n      where: $where\n      search: $search\n      type: $type\n      orderBy: { createdAt: desc }\n    ) @connection(key: "feed_connection") {\n      ...ItemFull\n    }\n  }\n\n  ',
          '\n',
        ]);
        return (
          (Zn = function() {
            return e;
          }),
          e
        );
      }
      var et = I()(Zn(), yn),
        nt = l.a.createContext({}),
        tt = function() {
          var e = Object(C.a)('feed-mode', 'grid'),
            n = Object(j.a)(e, 2),
            t = n[0],
            i = (n[1], Object(r.useState)(!1)),
            c = Object(j.a)(i, 2),
            o = c[0],
            u = c[1],
            s = Object(r.useState)(null),
            d = Object(j.a)(s, 2),
            m = d[0],
            f = d[1],
            b = Object(r.useState)(1),
            p = Object(j.a)(b, 2),
            g = p[0],
            h = p[1],
            E = (function() {
              var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : { pageLength: 20 },
                n = e.pageLength,
                t = Object(r.useState)(0),
                a = Object(j.a)(t, 2),
                l = a[0],
                i = a[1];
              return {
                paginationVariables: { skip: l * n, first: n },
                setPageNum: i,
                nextPage: function() {
                  return i(l + 1);
                },
                prevPage: function() {
                  return i(l - 1);
                },
              };
            })({ pageLength: 30 }).paginationVariables,
            v = Object(y.c)(et, {
              variables: E,
              notifyOnNetworkStatusChange: !0,
            }),
            k = v.loading,
            x = v.data,
            I = v.networkStatus,
            $ = v.refetch,
            R = v.fetchMore,
            _ = v.variables,
            D = Object(S.a)(v);
          Object(r.useEffect)(
            function() {
              var e, n;
              x &&
                D.data &&
                ((null === (e = w.a.last(x.items)) || void 0 === e
                  ? void 0
                  : e.id) ===
                (null === (n = w.a.last(D.data.items)) || void 0 === n
                  ? void 0
                  : n.id)
                  ? u(!0)
                  : 0 === g && u(!1),
                x.items.length > D.data.items.length
                  ? h(g + 1)
                  : x.items.length < D.data.items.length && 0 !== g && h(0));
            },
            [x],
          );
          var T = k && !x,
            U = function() {
              return R({
                variables: Object(a.a)({}, _, { skip: 30 * g }),
                updateQuery: function(e, n) {
                  var t = n.fetchMoreResult;
                  return t
                    ? Object(a.a)({}, e, {
                        items: [].concat(
                          Object(O.a)(e.items || []),
                          Object(O.a)(t.items || []),
                        ),
                      })
                    : e;
                },
              });
            };
          return l.a.createElement(
            nt.Provider,
            {
              value: {
                mode: t,
                nextPage: U,
                isLastItem: function(e) {
                  var n = e.id,
                    t = w.a.last(
                      (null === x || void 0 === x ? void 0 : x.items) || [],
                    );
                  return t && t.id === n;
                },
                activeItemId: m,
                setActiveItemId: f,
              },
            },
            l.a.createElement(je, null),
            l.a.createElement(
              F,
              { items: (null === x || void 0 === x ? void 0 : x.items) || [] },
              l.a.createElement(
                L.a,
                { d: 'flex', justifyContent: 'center' },
                l.a.createElement(
                  L.a,
                  { padding: 50, width: ['100%', '100%', '90%'] },
                  l.a.createElement(
                    L.a,
                    {
                      height: 80,
                      d: 'flex',
                      minWidth: '100%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    },
                    l.a.createElement(
                      L.a,
                      {
                        d: 'flex',
                        width: '150px',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      },
                      l.a.createElement(ce, null),
                      l.a.createElement(fe, null),
                      l.a.createElement(Mn, null),
                    ),
                    l.a.createElement(Ve, {
                      filter: function(e) {
                        return $(Object(a.a)({}, E, {}, e));
                      },
                      variables: _,
                    }),
                    l.a.createElement(ve, null),
                  ),
                  l.a.createElement('br', null),
                  T
                    ? l.a.createElement(
                        L.a,
                        {
                          d: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          width: '100%',
                        },
                        l.a.createElement(A.a, { size: 'xl' }),
                      )
                    : l.a.createElement(Yn, { query: v, nextPage: U }),
                  7 === I &&
                    !k &&
                    !o &&
                    l.a.createElement(M.a, { bottomOffset: -400, onEnter: U }),
                ),
              ),
            ),
          );
        };
      function at() {
        var e = Object(E.a)(['\n  height: 100vh;\n']);
        return (
          (at = function() {
            return e;
          }),
          e
        );
      }
      var rt = v.b.div(at()),
        lt = function() {
          return l.a.createElement(rt, null, l.a.createElement(tt, null));
        };
      function it() {
        var e = Object(E.a)([
          '\n  query mostRecentItem($type: String) {\n    mostRecentItem(type: $type) {\n      id\n      type\n\n      labels {\n        id\n        name\n      }\n\n      link {\n        id\n        href\n        notes\n\n        image\n        favicon\n        title\n        description\n      }\n\n      file {\n        id\n        name\n        extension\n        isUploaded\n        fullUrl\n        squareUrl\n      }\n    }\n  }\n',
        ]);
        return (
          (it = function() {
            return e;
          }),
          e
        );
      }
      var ct = I()(it()),
        ot = function() {
          (function() {
            var e = Object(y.c)(ct, {
                variables: { type: 'link' },
                notifyOnNetworkStatusChange: !0,
              }),
              n = e.loading,
              t = e.data;
            return {
              loading: n,
              data: t,
              item: !n && t ? t.mostRecentItem : null,
            };
          })().item;
          return l.a.createElement(
            L.a,
            { display: 'flex', justifyContent: 'center', alignItems: 'center' },
            l.a.createElement(
              L.a,
              {
                d: 'flex',
                margin: 20,
                padding: 20,
                size: 400,
                width: 600,
                rounded: 'lg',
                justifyContent: 'center',
              },
              l.a.createElement(We, null),
            ),
          );
        },
        ut = t(224),
        st = t.n(ut);
      function dt() {
        var e = Object(E.a)([
          '\n  mutation googleSignIn($code: String!) {\n    googleSignIn(code: $code) {\n      token\n    }\n  }\n',
        ]);
        return (
          (dt = function() {
            return e;
          }),
          e
        );
      }
      var mt = I()(dt()),
        ft = function(e) {
          var n = e.location,
            t = e.devMode,
            a = void 0 === t || t,
            i = Ee(),
            c = i.setToken,
            o = i.user,
            u = st.a.parse(n.search),
            s = Object(y.b)(mt, {
              variables: { code: u.code },
              onCompleted: function(e) {
                e && e.googleSignIn.token && c && c(e.googleSignIn.token);
              },
              onError: function(e) {
                console.log('error!', e);
              },
            }),
            d = Object(j.a)(s, 1)[0];
          return (
            Object(r.useEffect)(function() {
              a && d();
            }, []),
            o ? l.a.createElement(h.a, { to: '/' }) : null
          );
        };
      function bt() {
        var e = Object(E.a)(['\n  query getGoogleUrl {\n    googleURL\n  }\n']);
        return (
          (bt = function() {
            return e;
          }),
          e
        );
      }
      var pt = I()(bt()),
        gt = function() {
          var e = Object(y.c)(pt).data;
          return (
            Object(r.useEffect)(
              function() {
                e && window.location.replace(e.googleURL);
              },
              [e],
            ),
            l.a.createElement(
              L.a,
              {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
              },
              l.a.createElement(A.a, { size: 'xl' }),
            )
          );
        },
        ht = t(428),
        Et = Object(a.a)({}, ht.a, {
          colors: Object(a.a)({}, ht.a.colors, { lightgrey: '#f6f8fa' }),
        }),
        vt = Object(s.a)(function(e, n) {
          var t = n.headers,
            r = localStorage.getItem('token');
          return {
            headers: Object(a.a)({}, t, {
              authorization: r ? 'JWT '.concat(r) : '',
            }),
          };
        }),
        Ot = new d.a({
          dataIdFromObject: function(e) {
            return e.id;
          },
        }),
        jt = vt.concat(Object(u.createUploadLink)({ uri: '/graphql' })),
        kt = new o.a({ link: jt, cache: Ot }),
        wt = l.a.createElement(
          m.a,
          { client: kt },
          l.a.createElement(
            function(e) {
              var n = e.children,
                t = Object(y.c)(pe, { fetchPolicy: 'network-only' }),
                a = t.data,
                i = t.loading,
                c = t.refetch,
                o = Object(r.useState)(localStorage.getItem('token')),
                u = Object(j.a)(o, 2),
                s = u[0],
                d = u[1];
              return (
                Object(r.useEffect)(
                  function() {
                    s
                      ? (localStorage.setItem('token', s), (a && !a.me) || c())
                      : i || localStorage.removeItem('token');
                  },
                  [s],
                ),
                Object(r.useEffect)(
                  function() {
                    a && a.me
                      ? localStorage.setItem('user', JSON.stringify(a.me))
                      : i ||
                        (localStorage.removeItem('user'),
                        localStorage.removeItem('token'));
                  },
                  [i],
                ),
                l.a.createElement(
                  ge.Provider,
                  {
                    value: {
                      user: a ? a.me : he ? JSON.parse(he) : null,
                      token: s,
                      setToken: d,
                      refetchUser: c,
                      signOut: function() {
                        localStorage.removeItem('user'),
                          localStorage.removeItem('token'),
                          window.location.replace('/');
                      },
                    },
                  },
                  n,
                )
              );
            },
            null,
            l.a.createElement(
              function(e) {
                var n = e.children,
                  t = l.a.useState(H),
                  r = Object(j.a)(t, 2),
                  i = r[0],
                  c = r[1],
                  o = function(e, n) {
                    return c(Object(a.a)({}, H, Object(D.a)({}, e, n)));
                  };
                return l.a.createElement(
                  Q.Provider,
                  {
                    value: {
                      globalModalState: i,
                      openModal: function(e) {
                        return o(e, !0);
                      },
                      closeModal: function(e) {
                        return o(e, !1);
                      },
                      toggleModal: function(e) {
                        return c(function(n) {
                          return Object(a.a)({}, H, Object(D.a)({}, e, !n[e]));
                        });
                      },
                      closeAll: function() {
                        return c(
                          Object.keys(i).reduce(function(e, n) {
                            return Object(a.a)({}, e, Object(D.a)({}, n, !1));
                          }, {}),
                        );
                      },
                    },
                  },
                  n,
                );
              },
              null,
              l.a.createElement(
                f.a,
                { theme: Et },
                l.a.createElement(function() {
                  var e = Ee().user ? lt : gt;
                  return l.a.createElement(
                    g.a,
                    null,
                    l.a.createElement(
                      h.d,
                      null,
                      l.a.createElement(h.b, {
                        path: '/',
                        exact: !0,
                        component: e,
                      }),
                      l.a.createElement(h.b, {
                        path: '/note/:id',
                        exact: !0,
                        component: An,
                      }),
                      l.a.createElement(h.b, {
                        path: '/google/redirect',
                        exact: !0,
                        component: ft,
                      }),
                      l.a.createElement(h.b, {
                        path: '/playground',
                        exact: !0,
                        component: ot,
                      }),
                    ),
                  );
                }, null),
              ),
            ),
          ),
        );
      c.a.render(wt, document.getElementById('root')),
        'serviceWorker' in navigator &&
          navigator.serviceWorker.ready.then(function(e) {
            e.unregister();
          });
    },
  },
  [[236, 1, 2]],
]);
//# sourceMappingURL=main.4ddec9ff.chunk.js.map
