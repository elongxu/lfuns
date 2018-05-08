!(function() {
  function e(e) {
    e.fn.swiper = function(a) {
      var s;
      return (
        e(this).each(function() {
          var e = new t(this, a);
          s || (s = e);
        }),
        s
      );
    };
  }
  var a,
    t = function(e, r) {
      function i() {
        return "horizontal" === w.params.direction;
      }
      function n(e) {
        return Math.floor(e);
      }
      function o() {
        w.autoplayTimeoutId = setTimeout(function() {
          w.params.loop
            ? (w.fixLoop(), w._slideNext())
            : w.isEnd
              ? r.autoplayStopOnLast
                ? w.stopAutoplay()
                : w._slideTo(0)
              : w._slideNext();
        }, w.params.autoplay);
      }
      function l(e, t) {
        var s = a(e.target);
        if (!s.is(t))
          if ("string" == typeof t) s = s.parents(t);
          else if (t.nodeType) {
            var r;
            return (
              s.parents().each(function(e, a) {
                a === t && (r = t);
              }),
              r ? t : void 0
            );
          }
        return 0 === s.length ? void 0 : s[0];
      }
      function d(e, a) {
        a = a || {};
        var t = window.MutationObserver || window.WebkitMutationObserver,
          s = new t(function(e) {
            e.forEach(function(e) {
              w.onResize(!0), w.emit("onObserverUpdate", w, e);
            });
          });
        s.observe(e, {
          attributes: "undefined" == typeof a.attributes ? !0 : a.attributes,
          childList: "undefined" == typeof a.childList ? !0 : a.childList,
          characterData:
            "undefined" == typeof a.characterData ? !0 : a.characterData
        }),
          w.observers.push(s);
      }
      function p(e) {
        e.originalEvent && (e = e.originalEvent);
        var a = e.keyCode || e.charCode;
        if (
          !w.params.allowSwipeToNext &&
          ((i() && 39 === a) || (!i() && 40 === a))
        )
          return !1;
        if (
          !w.params.allowSwipeToPrev &&
          ((i() && 37 === a) || (!i() && 38 === a))
        )
          return !1;
        if (
          !(
            e.shiftKey ||
            e.altKey ||
            e.ctrlKey ||
            e.metaKey ||
            (document.activeElement &&
              document.activeElement.nodeName &&
              ("input" === document.activeElement.nodeName.toLowerCase() ||
                "textarea" === document.activeElement.nodeName.toLowerCase()))
          )
        ) {
          if (37 === a || 39 === a || 38 === a || 40 === a) {
            var t = !1;
            if (
              w.container.parents(".swiper-slide").length > 0 &&
              0 === w.container.parents(".swiper-slide-active").length
            )
              return;
            var s = { left: window.pageXOffset, top: window.pageYOffset },
              r = window.innerWidth,
              n = window.innerHeight,
              o = w.container.offset();
            w.rtl && (o.left = o.left - w.container[0].scrollLeft);
            for (
              var l = [
                  [o.left, o.top],
                  [o.left + w.width, o.top],
                  [o.left, o.top + w.height],
                  [o.left + w.width, o.top + w.height]
                ],
                d = 0;
              d < l.length;
              d++
            ) {
              var p = l[d];
              p[0] >= s.left &&
                p[0] <= s.left + r &&
                p[1] >= s.top &&
                p[1] <= s.top + n &&
                (t = !0);
            }
            if (!t) return;
          }
          i()
            ? ((37 === a || 39 === a) &&
                (e.preventDefault ? e.preventDefault() : (e.returnValue = !1)),
              ((39 === a && !w.rtl) || (37 === a && w.rtl)) && w.slideNext(),
              ((37 === a && !w.rtl) || (39 === a && w.rtl)) && w.slidePrev())
            : ((38 === a || 40 === a) &&
                (e.preventDefault ? e.preventDefault() : (e.returnValue = !1)),
              40 === a && w.slideNext(),
              38 === a && w.slidePrev());
        }
      }
      function u(e) {
        e.originalEvent && (e = e.originalEvent);
        var a = w.mousewheel.event,
          t = 0;
        if (e.detail) t = -e.detail;
        else if ("mousewheel" === a)
          if (w.params.mousewheelForceToAxis)
            if (i()) {
              if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) return;
              t = e.wheelDeltaX;
            } else {
              if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))) return;
              t = e.wheelDeltaY;
            }
          else t = e.wheelDelta;
        else if ("DOMMouseScroll" === a) t = -e.detail;
        else if ("wheel" === a)
          if (w.params.mousewheelForceToAxis)
            if (i()) {
              if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;
              t = -e.deltaX;
            } else {
              if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;
              t = -e.deltaY;
            }
          else
            t = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX : -e.deltaY;
        if ((w.params.mousewheelInvert && (t = -t), w.params.freeMode)) {
          var s = w.getWrapperTranslate() + t * w.params.mousewheelSensitivity;
          if (
            (s > 0 && (s = 0),
            s < w.maxTranslate() && (s = w.maxTranslate()),
            w.setWrapperTransition(0),
            w.setWrapperTranslate(s),
            w.updateProgress(),
            w.updateActiveIndex(),
            w.params.freeModeSticky &&
              (clearTimeout(w.mousewheel.timeout),
              (w.mousewheel.timeout = setTimeout(function() {
                w.slideReset();
              }, 300))),
            0 === s || s === w.maxTranslate())
          )
            return;
        } else {
          if (new window.Date().getTime() - w.mousewheel.lastScrollTime > 60)
            if (0 > t)
              if ((w.isEnd && !w.params.loop) || w.animating) {
                if (w.params.mousewheelReleaseOnEdges) return !0;
              } else w.slideNext();
            else if ((w.isBeginning && !w.params.loop) || w.animating) {
              if (w.params.mousewheelReleaseOnEdges) return !0;
            } else w.slidePrev();
          w.mousewheel.lastScrollTime = new window.Date().getTime();
        }
        return (
          w.params.autoplay && w.stopAutoplay(),
          e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
          !1
        );
      }
      function c(e, t) {
        e = a(e);
        var s, r, n;
        (s = e.attr("data-swiper-parallax") || "0"),
          (r = e.attr("data-swiper-parallax-x")),
          (n = e.attr("data-swiper-parallax-y")),
          r || n
            ? ((r = r || "0"), (n = n || "0"))
            : i()
              ? ((r = s), (n = "0"))
              : ((n = s), (r = "0")),
          (r = r.indexOf("%") >= 0 ? parseInt(r, 10) * t + "%" : r * t + "px"),
          (n = n.indexOf("%") >= 0 ? parseInt(n, 10) * t + "%" : n * t + "px"),
          e.transform("translate3d(" + r + ", " + n + ",0px)");
      }
      function m(e) {
        return (
          0 !== e.indexOf("on") &&
            (e =
              e[0] !== e[0].toUpperCase()
                ? "on" + e[0].toUpperCase() + e.substring(1)
                : "on" + e),
          e
        );
      }
      if (!(this instanceof t)) return new t(e, r);
      var f = {
          direction: "horizontal",
          touchEventsTarget: "container",
          initialSlide: 0,
          speed: 300,
          autoplay: !1,
          autoplayDisableOnInteraction: !0,
          iOSEdgeSwipeDetection: !1,
          iOSEdgeSwipeThreshold: 20,
          freeMode: !1,
          freeModeMomentum: !0,
          freeModeMomentumRatio: 1,
          freeModeMomentumBounce: !0,
          freeModeMomentumBounceRatio: 1,
          freeModeSticky: !1,
          setWrapperSize: !1,
          virtualTranslate: !1,
          effect: "slide",
          coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: !0
          },
          cube: {
            slideShadows: !0,
            shadow: !0,
            shadowOffset: 20,
            shadowScale: 0.94
          },
          fade: { crossFade: !1 },
          parallax: !1,
          scrollbar: null,
          scrollbarHide: !0,
          keyboardControl: !1,
          mousewheelControl: !1,
          mousewheelReleaseOnEdges: !1,
          mousewheelInvert: !1,
          mousewheelForceToAxis: !1,
          mousewheelSensitivity: 1,
          hashnav: !1,
          spaceBetween: 0,
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerColumnFill: "column",
          slidesPerGroup: 1,
          centeredSlides: !1,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
          roundLengths: !1,
          touchRatio: 1,
          touchAngle: 45,
          simulateTouch: !0,
          shortSwipes: !0,
          longSwipes: !0,
          longSwipesRatio: 0.5,
          longSwipesMs: 300,
          followFinger: !0,
          onlyExternal: !1,
          threshold: 0,
          touchMoveStopPropagation: !0,
          pagination: null,
          paginationElement: "span",
          paginationClickable: !1,
          paginationHide: !1,
          paginationBulletRender: null,
          resistance: !0,
          resistanceRatio: 0.85,
          nextButton: null,
          prevButton: null,
          watchSlidesProgress: !1,
          watchSlidesVisibility: !1,
          grabCursor: !1,
          preventClicks: !0,
          preventClicksPropagation: !0,
          slideToClickedSlide: !1,
          lazyLoading: !1,
          lazyLoadingInPrevNext: !1,
          lazyLoadingOnTransitionStart: !1,
          preloadImages: !0,
          updateOnImagesReady: !0,
          loop: !1,
          loopAdditionalSlides: 0,
          loopedSlides: null,
          control: void 0,
          controlInverse: !1,
          controlBy: "slide",
          allowSwipeToPrev: !0,
          allowSwipeToNext: !0,
          swipeHandler: null,
          noSwiping: !0,
          noSwipingClass: "swiper-no-swiping",
          slideClass: "swiper-slide",
          slideActiveClass: "swiper-slide-active",
          slideVisibleClass: "swiper-slide-visible",
          slideDuplicateClass: "swiper-slide-duplicate",
          slideNextClass: "swiper-slide-next",
          slidePrevClass: "swiper-slide-prev",
          wrapperClass: "swiper-wrapper",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
          buttonDisabledClass: "swiper-button-disabled",
          paginationHiddenClass: "swiper-pagination-hidden",
          observer: !1,
          observeParents: !1,
          a11y: !1,
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
          firstSlideMessage: "This is the first slide",
          lastSlideMessage: "This is the last slide",
          paginationBulletMessage: "Go to slide {{index}}",
          runCallbacksOnInit: !0
        },
        h = r && r.virtualTranslate;
      r = r || {};
      for (var g in f)
        if ("undefined" == typeof r[g]) r[g] = f[g];
        else if ("object" == typeof r[g])
          for (var v in f[g])
            "undefined" == typeof r[g][v] && (r[g][v] = f[g][v]);
      var w = this;
      if (
        ((w.version = "3.1.0"),
        (w.params = r),
        (w.classNames = []),
        "undefined" != typeof a && "undefined" != typeof s && (a = s),
        ("undefined" != typeof a ||
          (a =
            "undefined" == typeof s
              ? window.Dom7 || window.Zepto || window.jQuery
              : s)) &&
          ((w.$ = a), (w.container = a(e)), 0 !== w.container.length))
      ) {
        if (w.container.length > 1)
          return void w.container.each(function() {
            new t(this, r);
          });
        (w.container[0].swiper = w),
          w.container.data("swiper", w),
          w.classNames.push("swiper-container-" + w.params.direction),
          w.params.freeMode && w.classNames.push("swiper-container-free-mode"),
          w.support.flexbox ||
            (w.classNames.push("swiper-container-no-flexbox"),
            (w.params.slidesPerColumn = 1)),
          (w.params.parallax || w.params.watchSlidesVisibility) &&
            (w.params.watchSlidesProgress = !0),
          ["cube", "coverflow"].indexOf(w.params.effect) >= 0 &&
            (w.support.transforms3d
              ? ((w.params.watchSlidesProgress = !0),
                w.classNames.push("swiper-container-3d"))
              : (w.params.effect = "slide")),
          "slide" !== w.params.effect &&
            w.classNames.push("swiper-container-" + w.params.effect),
          "cube" === w.params.effect &&
            ((w.params.resistanceRatio = 0),
            (w.params.slidesPerView = 1),
            (w.params.slidesPerColumn = 1),
            (w.params.slidesPerGroup = 1),
            (w.params.centeredSlides = !1),
            (w.params.spaceBetween = 0),
            (w.params.virtualTranslate = !0),
            (w.params.setWrapperSize = !1)),
          "fade" === w.params.effect &&
            ((w.params.slidesPerView = 1),
            (w.params.slidesPerColumn = 1),
            (w.params.slidesPerGroup = 1),
            (w.params.watchSlidesProgress = !0),
            (w.params.spaceBetween = 0),
            "undefined" == typeof h && (w.params.virtualTranslate = !0)),
          w.params.grabCursor && w.support.touch && (w.params.grabCursor = !1),
          (w.wrapper = w.container.children("." + w.params.wrapperClass)),
          w.params.pagination &&
            ((w.paginationContainer = a(w.params.pagination)),
            w.params.paginationClickable &&
              w.paginationContainer.addClass("swiper-pagination-clickable")),
          (w.rtl =
            i() &&
            ("rtl" === w.container[0].dir.toLowerCase() ||
              "rtl" === w.container.css("direction"))),
          w.rtl && w.classNames.push("swiper-container-rtl"),
          w.rtl && (w.wrongRTL = "-webkit-box" === w.wrapper.css("display")),
          w.params.slidesPerColumn > 1 &&
            w.classNames.push("swiper-container-multirow"),
          w.device.android && w.classNames.push("swiper-container-android"),
          w.container.addClass(w.classNames.join(" ")),
          (w.translate = 0),
          (w.progress = 0),
          (w.velocity = 0),
          (w.lockSwipeToNext = function() {
            w.params.allowSwipeToNext = !1;
          }),
          (w.lockSwipeToPrev = function() {
            w.params.allowSwipeToPrev = !1;
          }),
          (w.lockSwipes = function() {
            w.params.allowSwipeToNext = w.params.allowSwipeToPrev = !1;
          }),
          (w.unlockSwipeToNext = function() {
            w.params.allowSwipeToNext = !0;
          }),
          (w.unlockSwipeToPrev = function() {
            w.params.allowSwipeToPrev = !0;
          }),
          (w.unlockSwipes = function() {
            w.params.allowSwipeToNext = w.params.allowSwipeToPrev = !0;
          }),
          w.params.grabCursor &&
            ((w.container[0].style.cursor = "move"),
            (w.container[0].style.cursor = "-webkit-grab"),
            (w.container[0].style.cursor = "-moz-grab"),
            (w.container[0].style.cursor = "grab")),
          (w.imagesToLoad = []),
          (w.imagesLoaded = 0),
          (w.loadImage = function(e, a, t, s) {
            function r() {
              s && s();
            }
            var i;
            e.complete && t
              ? r()
              : a
                ? ((i = new window.Image()),
                  (i.onload = r),
                  (i.onerror = r),
                  (i.src = a))
                : r();
          }),
          (w.preloadImages = function() {
            function e() {
              "undefined" != typeof w &&
                null !== w &&
                (void 0 !== w.imagesLoaded && w.imagesLoaded++,
                w.imagesLoaded === w.imagesToLoad.length &&
                  (w.params.updateOnImagesReady && w.update(),
                  w.emit("onImagesReady", w)));
            }
            w.imagesToLoad = w.container.find("img");
            for (var a = 0; a < w.imagesToLoad.length; a++)
              w.loadImage(
                w.imagesToLoad[a],
                w.imagesToLoad[a].currentSrc ||
                  w.imagesToLoad[a].getAttribute("src"),
                !0,
                e
              );
          }),
          (w.autoplayTimeoutId = void 0),
          (w.autoplaying = !1),
          (w.autoplayPaused = !1),
          (w.startAutoplay = function() {
            return "undefined" != typeof w.autoplayTimeoutId
              ? !1
              : w.params.autoplay
                ? w.autoplaying
                  ? !1
                  : ((w.autoplaying = !0),
                    w.emit("onAutoplayStart", w),
                    void o())
                : !1;
          }),
          (w.stopAutoplay = function() {
            w.autoplayTimeoutId &&
              (w.autoplayTimeoutId && clearTimeout(w.autoplayTimeoutId),
              (w.autoplaying = !1),
              (w.autoplayTimeoutId = void 0),
              w.emit("onAutoplayStop", w));
          }),
          (w.pauseAutoplay = function(e) {
            w.autoplayPaused ||
              (w.autoplayTimeoutId && clearTimeout(w.autoplayTimeoutId),
              (w.autoplayPaused = !0),
              0 === e
                ? ((w.autoplayPaused = !1), o())
                : w.wrapper.transitionEnd(function() {
                    w &&
                      ((w.autoplayPaused = !1),
                      w.autoplaying ? o() : w.stopAutoplay());
                  }));
          }),
          (w.minTranslate = function() {
            return -w.snapGrid[0];
          }),
          (w.maxTranslate = function() {
            return -w.snapGrid[w.snapGrid.length - 1];
          }),
          (w.updateContainerSize = function() {
            var e, a;
            (e =
              "undefined" != typeof w.params.width
                ? w.params.width
                : w.container[0].clientWidth),
              (a =
                "undefined" != typeof w.params.height
                  ? w.params.height
                  : w.container[0].clientHeight),
              (0 === e && i()) ||
                (0 === a && !i()) ||
                ((e =
                  e -
                  parseInt(w.container.css("padding-left"), 10) -
                  parseInt(w.container.css("padding-right"), 10)),
                (a =
                  a -
                  parseInt(w.container.css("padding-top"), 10) -
                  parseInt(w.container.css("padding-bottom"), 10)),
                (w.width = e),
                (w.height = a),
                (w.size = i() ? w.width : w.height));
          }),
          (w.updateSlidesSize = function() {
            (w.slides = w.wrapper.children("." + w.params.slideClass)),
              (w.snapGrid = []),
              (w.slidesGrid = []),
              (w.slidesSizesGrid = []);
            var e,
              a = w.params.spaceBetween,
              t = -w.params.slidesOffsetBefore,
              s = 0,
              r = 0;
            "string" == typeof a &&
              a.indexOf("%") >= 0 &&
              (a = parseFloat(a.replace("%", "")) / 100 * w.size),
              (w.virtualSize = -a),
              w.slides.css(
                w.rtl
                  ? { marginLeft: "", marginTop: "" }
                  : { marginRight: "", marginBottom: "" }
              );
            var o;
            w.params.slidesPerColumn > 1 &&
              (o =
                Math.floor(w.slides.length / w.params.slidesPerColumn) ===
                w.slides.length / w.params.slidesPerColumn
                  ? w.slides.length
                  : Math.ceil(w.slides.length / w.params.slidesPerColumn) *
                    w.params.slidesPerColumn);
            var l,
              d = w.params.slidesPerColumn,
              p = o / d,
              u = p - (w.params.slidesPerColumn * p - w.slides.length);
            for (e = 0; e < w.slides.length; e++) {
              l = 0;
              var c = w.slides.eq(e);
              if (w.params.slidesPerColumn > 1) {
                var m, f, h;
                "column" === w.params.slidesPerColumnFill
                  ? ((f = Math.floor(e / d)),
                    (h = e - f * d),
                    (f > u || (f === u && h === d - 1)) &&
                      ++h >= d &&
                      ((h = 0), f++),
                    (m = f + h * o / d),
                    c.css({
                      "-webkit-box-ordinal-group": m,
                      "-moz-box-ordinal-group": m,
                      "-ms-flex-order": m,
                      "-webkit-order": m,
                      order: m
                    }))
                  : ((h = Math.floor(e / p)), (f = e - h * p)),
                  c
                    .css({
                      "margin-top":
                        0 !== h &&
                        w.params.spaceBetween &&
                        w.params.spaceBetween + "px"
                    })
                    .attr("data-swiper-column", f)
                    .attr("data-swiper-row", h);
              }
              "none" !== c.css("display") &&
                ("auto" === w.params.slidesPerView
                  ? ((l = i() ? c.outerWidth(!0) : c.outerHeight(!0)),
                    w.params.roundLengths && (l = n(l)))
                  : ((l =
                      (w.size - (w.params.slidesPerView - 1) * a) /
                      w.params.slidesPerView),
                    w.params.roundLengths && (l = n(l)),
                    i()
                      ? (w.slides[e].style.width = l + "px")
                      : (w.slides[e].style.height = l + "px")),
                (w.slides[e].swiperSlideSize = l),
                w.slidesSizesGrid.push(l),
                w.params.centeredSlides
                  ? ((t = t + l / 2 + s / 2 + a),
                    0 === e && (t = t - w.size / 2 - a),
                    Math.abs(t) < 0.001 && (t = 0),
                    r % w.params.slidesPerGroup === 0 && w.snapGrid.push(t),
                    w.slidesGrid.push(t))
                  : (r % w.params.slidesPerGroup === 0 && w.snapGrid.push(t),
                    w.slidesGrid.push(t),
                    (t = t + l + a)),
                (w.virtualSize += l + a),
                (s = l),
                r++);
            }
            w.virtualSize =
              Math.max(w.virtualSize, w.size) + w.params.slidesOffsetAfter;
            var g;
            if (
              (w.rtl &&
                w.wrongRTL &&
                ("slide" === w.params.effect ||
                  "coverflow" === w.params.effect) &&
                w.wrapper.css({
                  width: w.virtualSize + w.params.spaceBetween + "px"
                }),
              (!w.support.flexbox || w.params.setWrapperSize) &&
                w.wrapper.css(
                  i()
                    ? { width: w.virtualSize + w.params.spaceBetween + "px" }
                    : { height: w.virtualSize + w.params.spaceBetween + "px" }
                ),
              w.params.slidesPerColumn > 1 &&
                ((w.virtualSize = (l + w.params.spaceBetween) * o),
                (w.virtualSize =
                  Math.ceil(w.virtualSize / w.params.slidesPerColumn) -
                  w.params.spaceBetween),
                w.wrapper.css({
                  width: w.virtualSize + w.params.spaceBetween + "px"
                }),
                w.params.centeredSlides))
            ) {
              for (g = [], e = 0; e < w.snapGrid.length; e++)
                w.snapGrid[e] < w.virtualSize + w.snapGrid[0] &&
                  g.push(w.snapGrid[e]);
              w.snapGrid = g;
            }
            if (!w.params.centeredSlides) {
              for (g = [], e = 0; e < w.snapGrid.length; e++)
                w.snapGrid[e] <= w.virtualSize - w.size &&
                  g.push(w.snapGrid[e]);
              (w.snapGrid = g),
                Math.floor(w.virtualSize - w.size) >
                  Math.floor(w.snapGrid[w.snapGrid.length - 1]) &&
                  w.snapGrid.push(w.virtualSize - w.size);
            }
            0 === w.snapGrid.length && (w.snapGrid = [0]),
              0 !== w.params.spaceBetween &&
                w.slides.css(
                  i()
                    ? w.rtl
                      ? { marginLeft: a + "px" }
                      : { marginRight: a + "px" }
                    : { marginBottom: a + "px" }
                ),
              w.params.watchSlidesProgress && w.updateSlidesOffset();
          }),
          (w.updateSlidesOffset = function() {
            for (var e = 0; e < w.slides.length; e++)
              w.slides[e].swiperSlideOffset = i()
                ? w.slides[e].offsetLeft
                : w.slides[e].offsetTop;
          }),
          (w.updateSlidesProgress = function(e) {
            if (
              ("undefined" == typeof e && (e = w.translate || 0),
              0 !== w.slides.length)
            ) {
              "undefined" == typeof w.slides[0].swiperSlideOffset &&
                w.updateSlidesOffset();
              var a = -e;
              w.rtl && (a = e),
                w.container[0].getBoundingClientRect(),
                i() ? "left" : "top",
                i() ? "right" : "bottom",
                w.slides.removeClass(w.params.slideVisibleClass);
              for (var t = 0; t < w.slides.length; t++) {
                var s = w.slides[t],
                  r =
                    (a - s.swiperSlideOffset) /
                    (s.swiperSlideSize + w.params.spaceBetween);
                if (w.params.watchSlidesVisibility) {
                  var n = -(a - s.swiperSlideOffset),
                    o = n + w.slidesSizesGrid[t],
                    l =
                      (n >= 0 && n < w.size) ||
                      (o > 0 && o <= w.size) ||
                      (0 >= n && o >= w.size);
                  l && w.slides.eq(t).addClass(w.params.slideVisibleClass);
                }
                s.progress = w.rtl ? -r : r;
              }
            }
          }),
          (w.updateProgress = function(e) {
            "undefined" == typeof e && (e = w.translate || 0);
            var a = w.maxTranslate() - w.minTranslate();
            0 === a
              ? ((w.progress = 0), (w.isBeginning = w.isEnd = !0))
              : ((w.progress = (e - w.minTranslate()) / a),
                (w.isBeginning = w.progress <= 0),
                (w.isEnd = w.progress >= 1)),
              w.isBeginning && w.emit("onReachBeginning", w),
              w.isEnd && w.emit("onReachEnd", w),
              w.params.watchSlidesProgress && w.updateSlidesProgress(e),
              w.emit("onProgress", w, w.progress);
          }),
          (w.updateActiveIndex = function() {
            var e,
              a,
              t,
              s = w.rtl ? w.translate : -w.translate;
            for (a = 0; a < w.slidesGrid.length; a++)
              "undefined" != typeof w.slidesGrid[a + 1]
                ? s >= w.slidesGrid[a] &&
                  s <
                    w.slidesGrid[a + 1] -
                      (w.slidesGrid[a + 1] - w.slidesGrid[a]) / 2
                  ? (e = a)
                  : s >= w.slidesGrid[a] &&
                    s < w.slidesGrid[a + 1] &&
                    (e = a + 1)
                : s >= w.slidesGrid[a] && (e = a);
            (0 > e || "undefined" == typeof e) && (e = 0),
              (t = Math.floor(e / w.params.slidesPerGroup)),
              t >= w.snapGrid.length && (t = w.snapGrid.length - 1),
              e !== w.activeIndex &&
                ((w.snapIndex = t),
                (w.previousIndex = w.activeIndex),
                (w.activeIndex = e),
                w.updateClasses());
          }),
          (w.updateClasses = function() {
            w.slides.removeClass(
              w.params.slideActiveClass +
                " " +
                w.params.slideNextClass +
                " " +
                w.params.slidePrevClass
            );
            var e = w.slides.eq(w.activeIndex);
            if (
              (e.addClass(w.params.slideActiveClass),
              e
                .next("." + w.params.slideClass)
                .addClass(w.params.slideNextClass),
              e
                .prev("." + w.params.slideClass)
                .addClass(w.params.slidePrevClass),
              w.bullets && w.bullets.length > 0)
            ) {
              w.bullets.removeClass(w.params.bulletActiveClass);
              var t;
              w.params.loop
                ? ((t =
                    Math.ceil(w.activeIndex - w.loopedSlides) /
                    w.params.slidesPerGroup),
                  t > w.slides.length - 1 - 2 * w.loopedSlides &&
                    (t -= w.slides.length - 2 * w.loopedSlides),
                  t > w.bullets.length - 1 && (t -= w.bullets.length))
                : (t =
                    "undefined" != typeof w.snapIndex
                      ? w.snapIndex
                      : w.activeIndex || 0),
                w.paginationContainer.length > 1
                  ? w.bullets.each(function() {
                      a(this).index() === t &&
                        a(this).addClass(w.params.bulletActiveClass);
                    })
                  : w.bullets.eq(t).addClass(w.params.bulletActiveClass);
            }
            w.params.loop ||
              (w.params.prevButton &&
                (w.isBeginning
                  ? (a(w.params.prevButton).addClass(
                      w.params.buttonDisabledClass
                    ),
                    w.params.a11y &&
                      w.a11y &&
                      w.a11y.disable(a(w.params.prevButton)))
                  : (a(w.params.prevButton).removeClass(
                      w.params.buttonDisabledClass
                    ),
                    w.params.a11y &&
                      w.a11y &&
                      w.a11y.enable(a(w.params.prevButton)))),
              w.params.nextButton &&
                (w.isEnd
                  ? (a(w.params.nextButton).addClass(
                      w.params.buttonDisabledClass
                    ),
                    w.params.a11y &&
                      w.a11y &&
                      w.a11y.disable(a(w.params.nextButton)))
                  : (a(w.params.nextButton).removeClass(
                      w.params.buttonDisabledClass
                    ),
                    w.params.a11y &&
                      w.a11y &&
                      w.a11y.enable(a(w.params.nextButton)))));
          }),
          (w.updatePagination = function() {
            if (
              w.params.pagination &&
              w.paginationContainer &&
              w.paginationContainer.length > 0
            ) {
              for (
                var e = "",
                  a = w.params.loop
                    ? Math.ceil(
                        (w.slides.length - 2 * w.loopedSlides) /
                          w.params.slidesPerGroup
                      )
                    : w.snapGrid.length,
                  t = 0;
                a > t;
                t++
              )
                e += w.params.paginationBulletRender
                  ? w.params.paginationBulletRender(t, w.params.bulletClass)
                  : "<" +
                    w.params.paginationElement +
                    ' class="' +
                    w.params.bulletClass +
                    '"></' +
                    w.params.paginationElement +
                    ">";
              w.paginationContainer.html(e),
                (w.bullets = w.paginationContainer.find(
                  "." + w.params.bulletClass
                )),
                w.params.paginationClickable &&
                  w.params.a11y &&
                  w.a11y &&
                  w.a11y.initPagination();
            }
          }),
          (w.update = function(e) {
            function a() {
              (s = Math.min(
                Math.max(w.translate, w.maxTranslate()),
                w.minTranslate()
              )),
                w.setWrapperTranslate(s),
                w.updateActiveIndex(),
                w.updateClasses();
            }
            if (
              (w.updateContainerSize(),
              w.updateSlidesSize(),
              w.updateProgress(),
              w.updatePagination(),
              w.updateClasses(),
              w.params.scrollbar && w.scrollbar && w.scrollbar.set(),
              e)
            ) {
              var t, s;
              w.controller &&
                w.controller.spline &&
                (w.controller.spline = void 0),
                w.params.freeMode
                  ? a()
                  : ((t =
                      ("auto" === w.params.slidesPerView ||
                        w.params.slidesPerView > 1) &&
                      w.isEnd &&
                      !w.params.centeredSlides
                        ? w.slideTo(w.slides.length - 1, 0, !1, !0)
                        : w.slideTo(w.activeIndex, 0, !1, !0)),
                    t || a());
            }
          }),
          (w.onResize = function(e) {
            var a = w.params.allowSwipeToPrev,
              t = w.params.allowSwipeToNext;
            if (
              ((w.params.allowSwipeToPrev = w.params.allowSwipeToNext = !0),
              w.updateContainerSize(),
              w.updateSlidesSize(),
              ("auto" === w.params.slidesPerView || w.params.freeMode || e) &&
                w.updatePagination(),
              w.params.scrollbar && w.scrollbar && w.scrollbar.set(),
              w.controller &&
                w.controller.spline &&
                (w.controller.spline = void 0),
              w.params.freeMode)
            ) {
              var s = Math.min(
                Math.max(w.translate, w.maxTranslate()),
                w.minTranslate()
              );
              w.setWrapperTranslate(s),
                w.updateActiveIndex(),
                w.updateClasses();
            } else
              w.updateClasses(),
                ("auto" === w.params.slidesPerView ||
                  w.params.slidesPerView > 1) &&
                w.isEnd &&
                !w.params.centeredSlides
                  ? w.slideTo(w.slides.length - 1, 0, !1, !0)
                  : w.slideTo(w.activeIndex, 0, !1, !0);
            (w.params.allowSwipeToPrev = a), (w.params.allowSwipeToNext = t);
          });
        var y = ["mousedown", "mousemove", "mouseup"];
        window.navigator.pointerEnabled
          ? (y = ["pointerdown", "pointermove", "pointerup"])
          : window.navigator.msPointerEnabled &&
            (y = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]),
          (w.touchEvents = {
            start:
              w.support.touch || !w.params.simulateTouch ? "touchstart" : y[0],
            move:
              w.support.touch || !w.params.simulateTouch ? "touchmove" : y[1],
            end: w.support.touch || !w.params.simulateTouch ? "touchend" : y[2]
          }),
          (window.navigator.pointerEnabled ||
            window.navigator.msPointerEnabled) &&
            ("container" === w.params.touchEventsTarget
              ? w.container
              : w.wrapper
            ).addClass("swiper-wp8-" + w.params.direction),
          (w.initEvents = function(e) {
            var t = e ? "off" : "on",
              s = e ? "removeEventListener" : "addEventListener",
              i =
                "container" === w.params.touchEventsTarget
                  ? w.container[0]
                  : w.wrapper[0],
              n = w.support.touch ? i : document,
              o = w.params.nested ? !0 : !1;
            w.browser.ie
              ? (i[s](w.touchEvents.start, w.onTouchStart, !1),
                n[s](w.touchEvents.move, w.onTouchMove, o),
                n[s](w.touchEvents.end, w.onTouchEnd, !1))
              : (w.support.touch &&
                  (i[s](w.touchEvents.start, w.onTouchStart, !1),
                  i[s](w.touchEvents.move, w.onTouchMove, o),
                  i[s](w.touchEvents.end, w.onTouchEnd, !1)),
                !r.simulateTouch ||
                  w.device.ios ||
                  w.device.android ||
                  (i[s]("mousedown", w.onTouchStart, !1),
                  document[s]("mousemove", w.onTouchMove, o),
                  document[s]("mouseup", w.onTouchEnd, !1))),
              window[s]("resize", w.onResize),
              w.params.nextButton &&
                (a(w.params.nextButton)[t]("click", w.onClickNext),
                w.params.a11y &&
                  w.a11y &&
                  a(w.params.nextButton)[t]("keydown", w.a11y.onEnterKey)),
              w.params.prevButton &&
                (a(w.params.prevButton)[t]("click", w.onClickPrev),
                w.params.a11y &&
                  w.a11y &&
                  a(w.params.prevButton)[t]("keydown", w.a11y.onEnterKey)),
              w.params.pagination &&
                w.params.paginationClickable &&
                (a(w.paginationContainer)[t](
                  "click",
                  "." + w.params.bulletClass,
                  w.onClickIndex
                ),
                w.params.a11y &&
                  w.a11y &&
                  a(w.paginationContainer)[t](
                    "keydown",
                    "." + w.params.bulletClass,
                    w.a11y.onEnterKey
                  )),
              (w.params.preventClicks || w.params.preventClicksPropagation) &&
                i[s]("click", w.preventClicks, !0);
          }),
          (w.attachEvents = function() {
            w.initEvents();
          }),
          (w.detachEvents = function() {
            w.initEvents(!0);
          }),
          (w.allowClick = !0),
          (w.preventClicks = function(e) {
            w.allowClick ||
              (w.params.preventClicks && e.preventDefault(),
              w.params.preventClicksPropagation &&
                w.animating &&
                (e.stopPropagation(), e.stopImmediatePropagation()));
          }),
          (w.onClickNext = function(e) {
            e.preventDefault(), (!w.isEnd || w.params.loop) && w.slideNext();
          }),
          (w.onClickPrev = function(e) {
            e.preventDefault(),
              (!w.isBeginning || w.params.loop) && w.slidePrev();
          }),
          (w.onClickIndex = function(e) {
            e.preventDefault();
            var t = a(this).index() * w.params.slidesPerGroup;
            w.params.loop && (t += w.loopedSlides), w.slideTo(t);
          }),
          (w.updateClickedSlide = function(e) {
            var t = l(e, "." + w.params.slideClass),
              s = !1;
            if (t)
              for (var r = 0; r < w.slides.length; r++)
                w.slides[r] === t && (s = !0);
            if (!t || !s)
              return (w.clickedSlide = void 0), void (w.clickedIndex = void 0);
            if (
              ((w.clickedSlide = t),
              (w.clickedIndex = a(t).index()),
              w.params.slideToClickedSlide &&
                void 0 !== w.clickedIndex &&
                w.clickedIndex !== w.activeIndex)
            ) {
              var i,
                n = w.clickedIndex;
              if (w.params.loop)
                if (
                  ((i = a(w.clickedSlide).attr("data-swiper-slide-index")),
                  n > w.slides.length - w.params.slidesPerView)
                )
                  w.fixLoop(),
                    (n = w.wrapper
                      .children(
                        "." +
                          w.params.slideClass +
                          '[data-swiper-slide-index="' +
                          i +
                          '"]'
                      )
                      .eq(0)
                      .index()),
                    setTimeout(function() {
                      w.slideTo(n);
                    }, 0);
                else if (n < w.params.slidesPerView - 1) {
                  w.fixLoop();
                  var o = w.wrapper.children(
                    "." +
                      w.params.slideClass +
                      '[data-swiper-slide-index="' +
                      i +
                      '"]'
                  );
                  (n = o.eq(o.length - 1).index()),
                    setTimeout(function() {
                      w.slideTo(n);
                    }, 0);
                } else w.slideTo(n);
              else w.slideTo(n);
            }
          });
        var b,
          x,
          T,
          S,
          C,
          M,
          E,
          P,
          z,
          I = "input, select, textarea, button",
          k = Date.now(),
          L = [];
        (w.animating = !1),
          (w.touches = {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
          });
        var D, B;
        if (
          ((w.onTouchStart = function(e) {
            if (
              (e.originalEvent && (e = e.originalEvent),
              (D = "touchstart" === e.type),
              D || !("which" in e) || 3 !== e.which)
            ) {
              if (w.params.noSwiping && l(e, "." + w.params.noSwipingClass))
                return void (w.allowClick = !0);
              if (!w.params.swipeHandler || l(e, w.params.swipeHandler)) {
                var t = (w.touches.currentX =
                    "touchstart" === e.type
                      ? e.targetTouches[0].pageX
                      : e.pageX),
                  s = (w.touches.currentY =
                    "touchstart" === e.type
                      ? e.targetTouches[0].pageY
                      : e.pageY);
                if (
                  !(
                    w.device.ios &&
                    w.params.iOSEdgeSwipeDetection &&
                    t <= w.params.iOSEdgeSwipeThreshold
                  )
                ) {
                  if (
                    ((b = !0),
                    (x = !1),
                    (S = void 0),
                    (B = void 0),
                    (w.touches.startX = t),
                    (w.touches.startY = s),
                    (T = Date.now()),
                    (w.allowClick = !0),
                    w.updateContainerSize(),
                    (w.swipeDirection = void 0),
                    w.params.threshold > 0 && (E = !1),
                    "touchstart" !== e.type)
                  ) {
                    var r = !0;
                    a(e.target).is(I) && (r = !1),
                      document.activeElement &&
                        a(document.activeElement).is(I) &&
                        document.activeElement.blur(),
                      r && e.preventDefault();
                  }
                  w.emit("onTouchStart", w, e);
                }
              }
            }
          }),
          (w.onTouchMove = function(e) {
            if (
              (e.originalEvent && (e = e.originalEvent),
              !((D && "mousemove" === e.type) || e.preventedByNestedSwiper))
            ) {
              if (w.params.onlyExternal)
                return (
                  (w.allowClick = !1),
                  void (
                    b &&
                    ((w.touches.startX = w.touches.currentX =
                      "touchmove" === e.type
                        ? e.targetTouches[0].pageX
                        : e.pageX),
                    (w.touches.startY = w.touches.currentY =
                      "touchmove" === e.type
                        ? e.targetTouches[0].pageY
                        : e.pageY),
                    (T = Date.now()))
                  )
                );
              if (
                D &&
                document.activeElement &&
                e.target === document.activeElement &&
                a(e.target).is(I)
              )
                return (x = !0), void (w.allowClick = !1);
              if (
                (w.emit("onTouchMove", w, e),
                !(e.targetTouches && e.targetTouches.length > 1))
              ) {
                if (
                  ((w.touches.currentX =
                    "touchmove" === e.type
                      ? e.targetTouches[0].pageX
                      : e.pageX),
                  (w.touches.currentY =
                    "touchmove" === e.type
                      ? e.targetTouches[0].pageY
                      : e.pageY),
                  "undefined" == typeof S)
                ) {
                  var t =
                    180 *
                    Math.atan2(
                      Math.abs(w.touches.currentY - w.touches.startY),
                      Math.abs(w.touches.currentX - w.touches.startX)
                    ) /
                    Math.PI;
                  S = i()
                    ? t > w.params.touchAngle
                    : 90 - t > w.params.touchAngle;
                }
                if (
                  (S && w.emit("onTouchMoveOpposite", w, e),
                  "undefined" == typeof B &&
                    w.browser.ieTouch &&
                    (w.touches.currentX !== w.touches.startX ||
                      w.touches.currentY !== w.touches.startY) &&
                    (B = !0),
                  b)
                ) {
                  if (S) return void (b = !1);
                  if (B || !w.browser.ieTouch) {
                    (w.allowClick = !1),
                      w.emit("onSliderMove", w, e),
                      e.preventDefault(),
                      w.params.touchMoveStopPropagation &&
                        !w.params.nested &&
                        e.stopPropagation(),
                      x ||
                        (r.loop && w.fixLoop(),
                        (M = w.getWrapperTranslate()),
                        w.setWrapperTransition(0),
                        w.animating &&
                          w.wrapper.trigger(
                            "webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"
                          ),
                        w.params.autoplay &&
                          w.autoplaying &&
                          (w.params.autoplayDisableOnInteraction
                            ? w.stopAutoplay()
                            : w.pauseAutoplay()),
                        (z = !1),
                        w.params.grabCursor &&
                          ((w.container[0].style.cursor = "move"),
                          (w.container[0].style.cursor = "-webkit-grabbing"),
                          (w.container[0].style.cursor = "-moz-grabbin"),
                          (w.container[0].style.cursor = "grabbing"))),
                      (x = !0);
                    var s = (w.touches.diff = i()
                      ? w.touches.currentX - w.touches.startX
                      : w.touches.currentY - w.touches.startY);
                    (s *= w.params.touchRatio),
                      w.rtl && (s = -s),
                      (w.swipeDirection = s > 0 ? "prev" : "next"),
                      (C = s + M);
                    var n = !0;
                    if (
                      (s > 0 && C > w.minTranslate()
                        ? ((n = !1),
                          w.params.resistance &&
                            (C =
                              w.minTranslate() -
                              1 +
                              Math.pow(
                                -w.minTranslate() + M + s,
                                w.params.resistanceRatio
                              )))
                        : 0 > s &&
                          C < w.maxTranslate() &&
                          ((n = !1),
                          w.params.resistance &&
                            (C =
                              w.maxTranslate() +
                              1 -
                              Math.pow(
                                w.maxTranslate() - M - s,
                                w.params.resistanceRatio
                              ))),
                      n && (e.preventedByNestedSwiper = !0),
                      !w.params.allowSwipeToNext &&
                        "next" === w.swipeDirection &&
                        M > C &&
                        (C = M),
                      !w.params.allowSwipeToPrev &&
                        "prev" === w.swipeDirection &&
                        C > M &&
                        (C = M),
                      w.params.followFinger)
                    ) {
                      if (w.params.threshold > 0) {
                        if (!(Math.abs(s) > w.params.threshold || E))
                          return void (C = M);
                        if (!E)
                          return (
                            (E = !0),
                            (w.touches.startX = w.touches.currentX),
                            (w.touches.startY = w.touches.currentY),
                            (C = M),
                            void (w.touches.diff = i()
                              ? w.touches.currentX - w.touches.startX
                              : w.touches.currentY - w.touches.startY)
                          );
                      }
                      (w.params.freeMode || w.params.watchSlidesProgress) &&
                        w.updateActiveIndex(),
                        w.params.freeMode &&
                          (0 === L.length &&
                            L.push({
                              position: w.touches[i() ? "startX" : "startY"],
                              time: T
                            }),
                          L.push({
                            position: w.touches[i() ? "currentX" : "currentY"],
                            time: new window.Date().getTime()
                          })),
                        w.updateProgress(C),
                        w.setWrapperTranslate(C);
                    }
                  }
                }
              }
            }
          }),
          (w.onTouchEnd = function(e) {
            if (
              (e.originalEvent && (e = e.originalEvent),
              w.emit("onTouchEnd", w, e),
              b)
            ) {
              w.params.grabCursor &&
                x &&
                b &&
                ((w.container[0].style.cursor = "move"),
                (w.container[0].style.cursor = "-webkit-grab"),
                (w.container[0].style.cursor = "-moz-grab"),
                (w.container[0].style.cursor = "grab"));
              var t = Date.now(),
                s = t - T;
              if (
                (w.allowClick &&
                  (w.updateClickedSlide(e),
                  w.emit("onTap", w, e),
                  300 > s &&
                    t - k > 300 &&
                    (P && clearTimeout(P),
                    (P = setTimeout(function() {
                      w &&
                        (w.params.paginationHide &&
                          w.paginationContainer.length > 0 &&
                          !a(e.target).hasClass(w.params.bulletClass) &&
                          w.paginationContainer.toggleClass(
                            w.params.paginationHiddenClass
                          ),
                        w.emit("onClick", w, e));
                    }, 300))),
                  300 > s &&
                    300 > t - k &&
                    (P && clearTimeout(P), w.emit("onDoubleTap", w, e))),
                (k = Date.now()),
                setTimeout(function() {
                  w && (w.allowClick = !0);
                }, 0),
                !b ||
                  !x ||
                  !w.swipeDirection ||
                  0 === w.touches.diff ||
                  C === M)
              )
                return void (b = x = !1);
              b = x = !1;
              var r;
              if (
                ((r = w.params.followFinger
                  ? w.rtl
                    ? w.translate
                    : -w.translate
                  : -C),
                w.params.freeMode)
              ) {
                if (r < -w.minTranslate()) return void w.slideTo(w.activeIndex);
                if (r > -w.maxTranslate())
                  return void w.slideTo(
                    w.slides.length < w.snapGrid.length
                      ? w.snapGrid.length - 1
                      : w.slides.length - 1
                  );
                if (w.params.freeModeMomentum) {
                  if (L.length > 1) {
                    var i = L.pop(),
                      n = L.pop(),
                      o = i.position - n.position,
                      l = i.time - n.time;
                    (w.velocity = o / l),
                      (w.velocity = w.velocity / 2),
                      Math.abs(w.velocity) < 0.02 && (w.velocity = 0),
                      (l > 150 || new window.Date().getTime() - i.time > 300) &&
                        (w.velocity = 0);
                  } else w.velocity = 0;
                  L.length = 0;
                  var d = 1e3 * w.params.freeModeMomentumRatio,
                    p = w.velocity * d,
                    u = w.translate + p;
                  w.rtl && (u = -u);
                  var c,
                    m = !1,
                    f =
                      20 *
                      Math.abs(w.velocity) *
                      w.params.freeModeMomentumBounceRatio;
                  if (u < w.maxTranslate())
                    w.params.freeModeMomentumBounce
                      ? (u + w.maxTranslate() < -f &&
                          (u = w.maxTranslate() - f),
                        (c = w.maxTranslate()),
                        (m = !0),
                        (z = !0))
                      : (u = w.maxTranslate());
                  else if (u > w.minTranslate())
                    w.params.freeModeMomentumBounce
                      ? (u - w.minTranslate() > f && (u = w.minTranslate() + f),
                        (c = w.minTranslate()),
                        (m = !0),
                        (z = !0))
                      : (u = w.minTranslate());
                  else if (w.params.freeModeSticky) {
                    var h,
                      g = 0;
                    for (g = 0; g < w.snapGrid.length; g += 1)
                      if (w.snapGrid[g] > -u) {
                        h = g;
                        break;
                      }
                    (u =
                      Math.abs(w.snapGrid[h] - u) <
                        Math.abs(w.snapGrid[h - 1] - u) ||
                      "next" === w.swipeDirection
                        ? w.snapGrid[h]
                        : w.snapGrid[h - 1]),
                      w.rtl || (u = -u);
                  }
                  if (0 !== w.velocity)
                    d = Math.abs(
                      w.rtl
                        ? (-u - w.translate) / w.velocity
                        : (u - w.translate) / w.velocity
                    );
                  else if (w.params.freeModeSticky) return void w.slideReset();
                  w.params.freeModeMomentumBounce && m
                    ? (w.updateProgress(c),
                      w.setWrapperTransition(d),
                      w.setWrapperTranslate(u),
                      w.onTransitionStart(),
                      (w.animating = !0),
                      w.wrapper.transitionEnd(function() {
                        w &&
                          z &&
                          (w.emit("onMomentumBounce", w),
                          w.setWrapperTransition(w.params.speed),
                          w.setWrapperTranslate(c),
                          w.wrapper.transitionEnd(function() {
                            w && w.onTransitionEnd();
                          }));
                      }))
                    : w.velocity
                      ? (w.updateProgress(u),
                        w.setWrapperTransition(d),
                        w.setWrapperTranslate(u),
                        w.onTransitionStart(),
                        w.animating ||
                          ((w.animating = !0),
                          w.wrapper.transitionEnd(function() {
                            w && w.onTransitionEnd();
                          })))
                      : w.updateProgress(u),
                    w.updateActiveIndex();
                }
                return void (
                  (!w.params.freeModeMomentum || s >= w.params.longSwipesMs) &&
                  (w.updateProgress(), w.updateActiveIndex())
                );
              }
              var v,
                y = 0,
                S = w.slidesSizesGrid[0];
              for (v = 0; v < w.slidesGrid.length; v += w.params.slidesPerGroup)
                "undefined" != typeof w.slidesGrid[v + w.params.slidesPerGroup]
                  ? r >= w.slidesGrid[v] &&
                    r < w.slidesGrid[v + w.params.slidesPerGroup] &&
                    ((y = v),
                    (S =
                      w.slidesGrid[v + w.params.slidesPerGroup] -
                      w.slidesGrid[v]))
                  : r >= w.slidesGrid[v] &&
                    ((y = v),
                    (S =
                      w.slidesGrid[w.slidesGrid.length - 1] -
                      w.slidesGrid[w.slidesGrid.length - 2]));
              var E = (r - w.slidesGrid[y]) / S;
              if (s > w.params.longSwipesMs) {
                if (!w.params.longSwipes) return void w.slideTo(w.activeIndex);
                "next" === w.swipeDirection &&
                  w.slideTo(
                    E >= w.params.longSwipesRatio
                      ? y + w.params.slidesPerGroup
                      : y
                  ),
                  "prev" === w.swipeDirection &&
                    w.slideTo(
                      E > 1 - w.params.longSwipesRatio
                        ? y + w.params.slidesPerGroup
                        : y
                    );
              } else {
                if (!w.params.shortSwipes) return void w.slideTo(w.activeIndex);
                "next" === w.swipeDirection &&
                  w.slideTo(y + w.params.slidesPerGroup),
                  "prev" === w.swipeDirection && w.slideTo(y);
              }
            }
          }),
          (w._slideTo = function(e, a) {
            return w.slideTo(e, a, !0, !0);
          }),
          (w.slideTo = function(e, a, t, s) {
            "undefined" == typeof t && (t = !0),
              "undefined" == typeof e && (e = 0),
              0 > e && (e = 0),
              (w.snapIndex = Math.floor(e / w.params.slidesPerGroup)),
              w.snapIndex >= w.snapGrid.length &&
                (w.snapIndex = w.snapGrid.length - 1);
            var r = -w.snapGrid[w.snapIndex];
            w.params.autoplay &&
              w.autoplaying &&
              (s || !w.params.autoplayDisableOnInteraction
                ? w.pauseAutoplay(a)
                : w.stopAutoplay()),
              w.updateProgress(r);
            for (var n = 0; n < w.slidesGrid.length; n++)
              -Math.floor(100 * r) >= Math.floor(100 * w.slidesGrid[n]) &&
                (e = n);
            return !w.params.allowSwipeToNext &&
              r < w.translate &&
              r < w.minTranslate()
              ? !1
              : !w.params.allowSwipeToPrev &&
                r > w.translate &&
                r > w.maxTranslate() &&
                (w.activeIndex || 0) !== e
                ? !1
                : ("undefined" == typeof a && (a = w.params.speed),
                  (w.previousIndex = w.activeIndex || 0),
                  (w.activeIndex = e),
                  r === w.translate
                    ? (w.updateClasses(), !1)
                    : (w.updateClasses(),
                      w.onTransitionStart(t),
                      i() ? r : 0,
                      i() ? 0 : r,
                      0 === a
                        ? (w.setWrapperTransition(0),
                          w.setWrapperTranslate(r),
                          w.onTransitionEnd(t))
                        : (w.setWrapperTransition(a),
                          w.setWrapperTranslate(r),
                          w.animating ||
                            ((w.animating = !0),
                            w.wrapper.transitionEnd(function() {
                              w && w.onTransitionEnd(t);
                            }))),
                      !0));
          }),
          (w.onTransitionStart = function(e) {
            "undefined" == typeof e && (e = !0),
              w.lazy && w.lazy.onTransitionStart(),
              e &&
                (w.emit("onTransitionStart", w),
                w.activeIndex !== w.previousIndex &&
                  w.emit("onSlideChangeStart", w));
          }),
          (w.onTransitionEnd = function(e) {
            (w.animating = !1),
              w.setWrapperTransition(0),
              "undefined" == typeof e && (e = !0),
              w.lazy && w.lazy.onTransitionEnd(),
              e &&
                (w.emit("onTransitionEnd", w),
                w.activeIndex !== w.previousIndex &&
                  w.emit("onSlideChangeEnd", w)),
              w.params.hashnav && w.hashnav && w.hashnav.setHash();
          }),
          (w.slideNext = function(e, a, t) {
            return w.params.loop
              ? w.animating
                ? !1
                : (w.fixLoop(),
                  w.container[0].clientLeft,
                  w.slideTo(w.activeIndex + w.params.slidesPerGroup, a, e, t))
              : w.slideTo(w.activeIndex + w.params.slidesPerGroup, a, e, t);
          }),
          (w._slideNext = function(e) {
            return w.slideNext(!0, e, !0);
          }),
          (w.slidePrev = function(e, a, t) {
            return w.params.loop
              ? w.animating
                ? !1
                : (w.fixLoop(),
                  w.container[0].clientLeft,
                  w.slideTo(w.activeIndex - 1, a, e, t))
              : w.slideTo(w.activeIndex - 1, a, e, t);
          }),
          (w._slidePrev = function(e) {
            return w.slidePrev(!0, e, !0);
          }),
          (w.slideReset = function(e, a) {
            return w.slideTo(w.activeIndex, a, e);
          }),
          (w.setWrapperTransition = function(e, a) {
            w.wrapper.transition(e),
              "slide" !== w.params.effect &&
                w.effects[w.params.effect] &&
                w.effects[w.params.effect].setTransition(e),
              w.params.parallax && w.parallax && w.parallax.setTransition(e),
              w.params.scrollbar && w.scrollbar && w.scrollbar.setTransition(e),
              w.params.control &&
                w.controller &&
                w.controller.setTransition(e, a),
              w.emit("onSetTransition", w, e);
          }),
          (w.setWrapperTranslate = function(e, a, t) {
            var s = 0,
              r = 0,
              n = 0;
            i() ? (s = w.rtl ? -e : e) : (r = e),
              w.params.virtualTranslate ||
                w.wrapper.transform(
                  w.support.transforms3d
                    ? "translate3d(" + s + "px, " + r + "px, " + n + "px)"
                    : "translate(" + s + "px, " + r + "px)"
                ),
              (w.translate = i() ? s : r),
              a && w.updateActiveIndex(),
              "slide" !== w.params.effect &&
                w.effects[w.params.effect] &&
                w.effects[w.params.effect].setTranslate(w.translate),
              w.params.parallax &&
                w.parallax &&
                w.parallax.setTranslate(w.translate),
              w.params.scrollbar &&
                w.scrollbar &&
                w.scrollbar.setTranslate(w.translate),
              w.params.control &&
                w.controller &&
                w.controller.setTranslate(w.translate, t),
              w.emit("onSetTranslate", w, w.translate);
          }),
          (w.getTranslate = function(e, a) {
            var t, s, r, i;
            return (
              "undefined" == typeof a && (a = "x"),
              w.params.virtualTranslate
                ? w.rtl
                  ? -w.translate
                  : w.translate
                : ((r = window.getComputedStyle(e, null)),
                  window.WebKitCSSMatrix
                    ? (i = new window.WebKitCSSMatrix(
                        "none" === r.webkitTransform ? "" : r.webkitTransform
                      ))
                    : ((i =
                        r.MozTransform ||
                        r.OTransform ||
                        r.MsTransform ||
                        r.msTransform ||
                        r.transform ||
                        r
                          .getPropertyValue("transform")
                          .replace("translate(", "matrix(1, 0, 0, 1,")),
                      (t = i.toString().split(","))),
                  "x" === a &&
                    (s = window.WebKitCSSMatrix
                      ? i.m41
                      : parseFloat(16 === t.length ? t[12] : t[4])),
                  "y" === a &&
                    (s = window.WebKitCSSMatrix
                      ? i.m42
                      : parseFloat(16 === t.length ? t[13] : t[5])),
                  w.rtl && s && (s = -s),
                  s || 0)
            );
          }),
          (w.getWrapperTranslate = function(e) {
            return (
              "undefined" == typeof e && (e = i() ? "x" : "y"),
              w.getTranslate(w.wrapper[0], e)
            );
          }),
          (w.observers = []),
          (w.initObservers = function() {
            if (w.params.observeParents)
              for (var e = w.container.parents(), a = 0; a < e.length; a++)
                d(e[a]);
            d(w.container[0], { childList: !1 }),
              d(w.wrapper[0], { attributes: !1 });
          }),
          (w.disconnectObservers = function() {
            for (var e = 0; e < w.observers.length; e++)
              w.observers[e].disconnect();
            w.observers = [];
          }),
          (w.createLoop = function() {
            w.wrapper
              .children(
                "." + w.params.slideClass + "." + w.params.slideDuplicateClass
              )
              .remove();
            var e = w.wrapper.children("." + w.params.slideClass);
            "auto" !== w.params.slidesPerView ||
              w.params.loopedSlides ||
              (w.params.loopedSlides = e.length),
              (w.loopedSlides = parseInt(
                w.params.loopedSlides || w.params.slidesPerView,
                10
              )),
              (w.loopedSlides = w.loopedSlides + w.params.loopAdditionalSlides),
              w.loopedSlides > e.length && (w.loopedSlides = e.length);
            var t,
              s = [],
              r = [];
            for (
              e.each(function(t, i) {
                var n = a(this);
                t < w.loopedSlides && r.push(i),
                  t < e.length && t >= e.length - w.loopedSlides && s.push(i),
                  n.attr("data-swiper-slide-index", t);
              }),
                t = 0;
              t < r.length;
              t++
            )
              w.wrapper.append(
                a(r[t].cloneNode(!0)).addClass(w.params.slideDuplicateClass)
              );
            for (t = s.length - 1; t >= 0; t--)
              w.wrapper.prepend(
                a(s[t].cloneNode(!0)).addClass(w.params.slideDuplicateClass)
              );
          }),
          (w.destroyLoop = function() {
            w.wrapper
              .children(
                "." + w.params.slideClass + "." + w.params.slideDuplicateClass
              )
              .remove(),
              w.slides.removeAttr("data-swiper-slide-index");
          }),
          (w.fixLoop = function() {
            var e;
            w.activeIndex < w.loopedSlides
              ? ((e = w.slides.length - 3 * w.loopedSlides + w.activeIndex),
                (e += w.loopedSlides),
                w.slideTo(e, 0, !1, !0))
              : (("auto" === w.params.slidesPerView &&
                  w.activeIndex >= 2 * w.loopedSlides) ||
                  w.activeIndex >
                    w.slides.length - 2 * w.params.slidesPerView) &&
                ((e = -w.slides.length + w.activeIndex + w.loopedSlides),
                (e += w.loopedSlides),
                w.slideTo(e, 0, !1, !0));
          }),
          (w.appendSlide = function(e) {
            if (
              (w.params.loop && w.destroyLoop(),
              "object" == typeof e && e.length)
            )
              for (var a = 0; a < e.length; a++) e[a] && w.wrapper.append(e[a]);
            else w.wrapper.append(e);
            w.params.loop && w.createLoop(),
              (w.params.observer && w.support.observer) || w.update(!0);
          }),
          (w.prependSlide = function(e) {
            w.params.loop && w.destroyLoop();
            var a = w.activeIndex + 1;
            if ("object" == typeof e && e.length) {
              for (var t = 0; t < e.length; t++)
                e[t] && w.wrapper.prepend(e[t]);
              a = w.activeIndex + e.length;
            } else w.wrapper.prepend(e);
            w.params.loop && w.createLoop(),
              (w.params.observer && w.support.observer) || w.update(!0),
              w.slideTo(a, 0, !1);
          }),
          (w.removeSlide = function(e) {
            w.params.loop &&
              (w.destroyLoop(),
              (w.slides = w.wrapper.children("." + w.params.slideClass)));
            var a,
              t = w.activeIndex;
            if ("object" == typeof e && e.length) {
              for (var s = 0; s < e.length; s++)
                (a = e[s]),
                  w.slides[a] && w.slides.eq(a).remove(),
                  t > a && t--;
              t = Math.max(t, 0);
            } else
              (a = e),
                w.slides[a] && w.slides.eq(a).remove(),
                t > a && t--,
                (t = Math.max(t, 0));
            w.params.loop && w.createLoop(),
              (w.params.observer && w.support.observer) || w.update(!0),
              w.params.loop
                ? w.slideTo(t + w.loopedSlides, 0, !1)
                : w.slideTo(t, 0, !1);
          }),
          (w.removeAllSlides = function() {
            for (var e = [], a = 0; a < w.slides.length; a++) e.push(a);
            w.removeSlide(e);
          }),
          (w.effects = {
            fade: {
              setTranslate: function() {
                for (var e = 0; e < w.slides.length; e++) {
                  var a = w.slides.eq(e),
                    t = a[0].swiperSlideOffset,
                    s = -t;
                  w.params.virtualTranslate || (s -= w.translate);
                  var r = 0;
                  i() || ((r = s), (s = 0));
                  var n = w.params.fade.crossFade
                    ? Math.max(1 - Math.abs(a[0].progress), 0)
                    : 1 + Math.min(Math.max(a[0].progress, -1), 0);
                  a
                    .css({ opacity: n })
                    .transform("translate3d(" + s + "px, " + r + "px, 0px)");
                }
              },
              setTransition: function(e) {
                if (
                  (w.slides.transition(e), w.params.virtualTranslate && 0 !== e)
                ) {
                  var a = !1;
                  w.slides.transitionEnd(function() {
                    if (!a && w) {
                      (a = !0), (w.animating = !1);
                      for (
                        var e = [
                            "webkitTransitionEnd",
                            "transitionend",
                            "oTransitionEnd",
                            "MSTransitionEnd",
                            "msTransitionEnd"
                          ],
                          t = 0;
                        t < e.length;
                        t++
                      )
                        w.wrapper.trigger(e[t]);
                    }
                  });
                }
              }
            },
            cube: {
              setTranslate: function() {
                var e,
                  t = 0;
                w.params.cube.shadow &&
                  (i()
                    ? ((e = w.wrapper.find(".swiper-cube-shadow")),
                      0 === e.length &&
                        ((e = a('<div class="swiper-cube-shadow"></div>')),
                        w.wrapper.append(e)),
                      e.css({ height: w.width + "px" }))
                    : ((e = w.container.find(".swiper-cube-shadow")),
                      0 === e.length &&
                        ((e = a('<div class="swiper-cube-shadow"></div>')),
                        w.container.append(e))));
                for (var s = 0; s < w.slides.length; s++) {
                  var r = w.slides.eq(s),
                    n = 90 * s,
                    o = Math.floor(n / 360);
                  w.rtl && ((n = -n), (o = Math.floor(-n / 360)));
                  var l = Math.max(Math.min(r[0].progress, 1), -1),
                    d = 0,
                    p = 0,
                    u = 0;
                  s % 4 === 0
                    ? ((d = 4 * -o * w.size), (u = 0))
                    : (s - 1) % 4 === 0
                      ? ((d = 0), (u = 4 * -o * w.size))
                      : (s - 2) % 4 === 0
                        ? ((d = w.size + 4 * o * w.size), (u = w.size))
                        : (s - 3) % 4 === 0 &&
                          ((d = -w.size), (u = 3 * w.size + 4 * w.size * o)),
                    w.rtl && (d = -d),
                    i() || ((p = d), (d = 0));
                  var c =
                    "rotateX(" +
                    (i() ? 0 : -n) +
                    "deg) rotateY(" +
                    (i() ? n : 0) +
                    "deg) translate3d(" +
                    d +
                    "px, " +
                    p +
                    "px, " +
                    u +
                    "px)";
                  if (
                    (1 >= l &&
                      l > -1 &&
                      ((t = 90 * s + 90 * l), w.rtl && (t = 90 * -s - 90 * l)),
                    r.transform(c),
                    w.params.cube.slideShadows)
                  ) {
                    var m = r.find(
                        i()
                          ? ".swiper-slide-shadow-left"
                          : ".swiper-slide-shadow-top"
                      ),
                      f = r.find(
                        i()
                          ? ".swiper-slide-shadow-right"
                          : ".swiper-slide-shadow-bottom"
                      );
                    0 === m.length &&
                      ((m = a(
                        '<div class="swiper-slide-shadow-' +
                          (i() ? "left" : "top") +
                          '"></div>'
                      )),
                      r.append(m)),
                      0 === f.length &&
                        ((f = a(
                          '<div class="swiper-slide-shadow-' +
                            (i() ? "right" : "bottom") +
                            '"></div>'
                        )),
                        r.append(f)),
                      r[0].progress,
                      m.length && (m[0].style.opacity = -r[0].progress),
                      f.length && (f[0].style.opacity = r[0].progress);
                  }
                }
                if (
                  (w.wrapper.css({
                    "-webkit-transform-origin": "50% 50% -" + w.size / 2 + "px",
                    "-moz-transform-origin": "50% 50% -" + w.size / 2 + "px",
                    "-ms-transform-origin": "50% 50% -" + w.size / 2 + "px",
                    "transform-origin": "50% 50% -" + w.size / 2 + "px"
                  }),
                  w.params.cube.shadow)
                )
                  if (i())
                    e.transform(
                      "translate3d(0px, " +
                        (w.width / 2 + w.params.cube.shadowOffset) +
                        "px, " +
                        -w.width / 2 +
                        "px) rotateX(90deg) rotateZ(0deg) scale(" +
                        w.params.cube.shadowScale +
                        ")"
                    );
                  else {
                    var h = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                      g =
                        1.5 -
                        (Math.sin(2 * h * Math.PI / 360) / 2 +
                          Math.cos(2 * h * Math.PI / 360) / 2),
                      v = w.params.cube.shadowScale,
                      y = w.params.cube.shadowScale / g,
                      b = w.params.cube.shadowOffset;
                    e.transform(
                      "scale3d(" +
                        v +
                        ", 1, " +
                        y +
                        ") translate3d(0px, " +
                        (w.height / 2 + b) +
                        "px, " +
                        -w.height / 2 / y +
                        "px) rotateX(-90deg)"
                    );
                  }
                var x = w.isSafari || w.isUiWebView ? -w.size / 2 : 0;
                w.wrapper.transform(
                  "translate3d(0px,0," +
                    x +
                    "px) rotateX(" +
                    (i() ? 0 : t) +
                    "deg) rotateY(" +
                    (i() ? -t : 0) +
                    "deg)"
                );
              },
              setTransition: function(e) {
                w.slides
                  .transition(e)
                  .find(
                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                  )
                  .transition(e),
                  w.params.cube.shadow &&
                    !i() &&
                    w.container.find(".swiper-cube-shadow").transition(e);
              }
            },
            coverflow: {
              setTranslate: function() {
                for (
                  var e = w.translate,
                    t = i() ? -e + w.width / 2 : -e + w.height / 2,
                    s = i()
                      ? w.params.coverflow.rotate
                      : -w.params.coverflow.rotate,
                    r = w.params.coverflow.depth,
                    n = 0,
                    o = w.slides.length;
                  o > n;
                  n++
                ) {
                  var l = w.slides.eq(n),
                    d = w.slidesSizesGrid[n],
                    p = l[0].swiperSlideOffset,
                    u = (t - p - d / 2) / d * w.params.coverflow.modifier,
                    c = i() ? s * u : 0,
                    m = i() ? 0 : s * u,
                    f = -r * Math.abs(u),
                    h = i() ? 0 : w.params.coverflow.stretch * u,
                    g = i() ? w.params.coverflow.stretch * u : 0;
                  Math.abs(g) < 0.001 && (g = 0),
                    Math.abs(h) < 0.001 && (h = 0),
                    Math.abs(f) < 0.001 && (f = 0),
                    Math.abs(c) < 0.001 && (c = 0),
                    Math.abs(m) < 0.001 && (m = 0);
                  var v =
                    "translate3d(" +
                    g +
                    "px," +
                    h +
                    "px," +
                    f +
                    "px)  rotateX(" +
                    m +
                    "deg) rotateY(" +
                    c +
                    "deg)";
                  if (
                    (l.transform(v),
                    (l[0].style.zIndex = -Math.abs(Math.round(u)) + 1),
                    w.params.coverflow.slideShadows)
                  ) {
                    var y = l.find(
                        i()
                          ? ".swiper-slide-shadow-left"
                          : ".swiper-slide-shadow-top"
                      ),
                      b = l.find(
                        i()
                          ? ".swiper-slide-shadow-right"
                          : ".swiper-slide-shadow-bottom"
                      );
                    0 === y.length &&
                      ((y = a(
                        '<div class="swiper-slide-shadow-' +
                          (i() ? "left" : "top") +
                          '"></div>'
                      )),
                      l.append(y)),
                      0 === b.length &&
                        ((b = a(
                          '<div class="swiper-slide-shadow-' +
                            (i() ? "right" : "bottom") +
                            '"></div>'
                        )),
                        l.append(b)),
                      y.length && (y[0].style.opacity = u > 0 ? u : 0),
                      b.length && (b[0].style.opacity = -u > 0 ? -u : 0);
                  }
                }
                if (w.browser.ie) {
                  var x = w.wrapper[0].style;
                  x.perspectiveOrigin = t + "px 50%";
                }
              },
              setTransition: function(e) {
                w.slides
                  .transition(e)
                  .find(
                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                  )
                  .transition(e);
              }
            }
          }),
          (w.lazy = {
            initialImageLoaded: !1,
            loadImageInSlide: function(e, t) {
              if (
                "undefined" != typeof e &&
                ("undefined" == typeof t && (t = !0), 0 !== w.slides.length)
              ) {
                var s = w.slides.eq(e),
                  r = s.find(
                    ".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)"
                  );
                !s.hasClass("swiper-lazy") ||
                  s.hasClass("swiper-lazy-loaded") ||
                  s.hasClass("swiper-lazy-loading") ||
                  r.add(s[0]),
                  0 !== r.length &&
                    r.each(function() {
                      var e = a(this);
                      e.addClass("swiper-lazy-loading");
                      var r = e.attr("data-background"),
                        i = e.attr("data-src");
                      w.loadImage(e[0], i || r, !1, function() {
                        if (
                          (r
                            ? (e.css("background-image", "url(" + r + ")"),
                              e.removeAttr("data-background"))
                            : (e.attr("src", i), e.removeAttr("data-src")),
                          e
                            .addClass("swiper-lazy-loaded")
                            .removeClass("swiper-lazy-loading"),
                          s.find(".swiper-lazy-preloader, .preloader").remove(),
                          w.params.loop && t)
                        ) {
                          var a = s.attr("data-swiper-slide-index");
                          if (s.hasClass(w.params.slideDuplicateClass)) {
                            var n = w.wrapper.children(
                              '[data-swiper-slide-index="' +
                                a +
                                '"]:not(.' +
                                w.params.slideDuplicateClass +
                                ")"
                            );
                            w.lazy.loadImageInSlide(n.index(), !1);
                          } else {
                            var o = w.wrapper.children(
                              "." +
                                w.params.slideDuplicateClass +
                                '[data-swiper-slide-index="' +
                                a +
                                '"]'
                            );
                            w.lazy.loadImageInSlide(o.index(), !1);
                          }
                        }
                        w.emit("onLazyImageReady", w, s[0], e[0]);
                      }),
                        w.emit("onLazyImageLoad", w, s[0], e[0]);
                    });
              }
            },
            load: function() {
              var e;
              if (w.params.watchSlidesVisibility)
                w.wrapper
                  .children("." + w.params.slideVisibleClass)
                  .each(function() {
                    w.lazy.loadImageInSlide(a(this).index());
                  });
              else if (w.params.slidesPerView > 1)
                for (
                  e = w.activeIndex;
                  e < w.activeIndex + w.params.slidesPerView;
                  e++
                )
                  w.slides[e] && w.lazy.loadImageInSlide(e);
              else w.lazy.loadImageInSlide(w.activeIndex);
              if (w.params.lazyLoadingInPrevNext)
                if (w.params.slidesPerView > 1) {
                  for (
                    e = w.activeIndex + w.params.slidesPerView;
                    e <
                    w.activeIndex +
                      w.params.slidesPerView +
                      w.params.slidesPerView;
                    e++
                  )
                    w.slides[e] && w.lazy.loadImageInSlide(e);
                  for (
                    e = w.activeIndex - w.params.slidesPerView;
                    e < w.activeIndex;
                    e++
                  )
                    w.slides[e] && w.lazy.loadImageInSlide(e);
                } else {
                  var t = w.wrapper.children("." + w.params.slideNextClass);
                  t.length > 0 && w.lazy.loadImageInSlide(t.index());
                  var s = w.wrapper.children("." + w.params.slidePrevClass);
                  s.length > 0 && w.lazy.loadImageInSlide(s.index());
                }
            },
            onTransitionStart: function() {
              w.params.lazyLoading &&
                (w.params.lazyLoadingOnTransitionStart ||
                  (!w.params.lazyLoadingOnTransitionStart &&
                    !w.lazy.initialImageLoaded)) &&
                w.lazy.load();
            },
            onTransitionEnd: function() {
              w.params.lazyLoading &&
                !w.params.lazyLoadingOnTransitionStart &&
                w.lazy.load();
            }
          }),
          (w.scrollbar = {
            set: function() {
              if (w.params.scrollbar) {
                var e = w.scrollbar;
                (e.track = a(w.params.scrollbar)),
                  (e.drag = e.track.find(".swiper-scrollbar-drag")),
                  0 === e.drag.length &&
                    ((e.drag = a('<div class="swiper-scrollbar-drag"></div>')),
                    e.track.append(e.drag)),
                  (e.drag[0].style.width = ""),
                  (e.drag[0].style.height = ""),
                  (e.trackSize = i()
                    ? e.track[0].offsetWidth
                    : e.track[0].offsetHeight),
                  (e.divider = w.size / w.virtualSize),
                  (e.moveDivider = e.divider * (e.trackSize / w.size)),
                  (e.dragSize = e.trackSize * e.divider),
                  i()
                    ? (e.drag[0].style.width = e.dragSize + "px")
                    : (e.drag[0].style.height = e.dragSize + "px"),
                  (e.track[0].style.display = e.divider >= 1 ? "none" : ""),
                  w.params.scrollbarHide && (e.track[0].style.opacity = 0);
              }
            },
            setTranslate: function() {
              if (w.params.scrollbar) {
                var e,
                  a = w.scrollbar,
                  t = (w.translate || 0, a.dragSize);
                (e = (a.trackSize - a.dragSize) * w.progress),
                  w.rtl && i()
                    ? ((e = -e),
                      e > 0
                        ? ((t = a.dragSize - e), (e = 0))
                        : -e + a.dragSize > a.trackSize &&
                          (t = a.trackSize + e))
                    : 0 > e
                      ? ((t = a.dragSize + e), (e = 0))
                      : e + a.dragSize > a.trackSize && (t = a.trackSize - e),
                  i()
                    ? (a.drag.transform(
                        w.support.transforms3d
                          ? "translate3d(" + e + "px, 0, 0)"
                          : "translateX(" + e + "px)"
                      ),
                      (a.drag[0].style.width = t + "px"))
                    : (a.drag.transform(
                        w.support.transforms3d
                          ? "translate3d(0px, " + e + "px, 0)"
                          : "translateY(" + e + "px)"
                      ),
                      (a.drag[0].style.height = t + "px")),
                  w.params.scrollbarHide &&
                    (clearTimeout(a.timeout),
                    (a.track[0].style.opacity = 1),
                    (a.timeout = setTimeout(function() {
                      (a.track[0].style.opacity = 0), a.track.transition(400);
                    }, 1e3)));
              }
            },
            setTransition: function(e) {
              w.params.scrollbar && w.scrollbar.drag.transition(e);
            }
          }),
          (w.controller = {
            LinearSpline: function(e, a) {
              (this.x = e), (this.y = a), (this.lastIndex = e.length - 1);
              var t, s;
              this.x.length,
                (this.interpolate = function(e) {
                  return e
                    ? ((s = r(this.x, e)),
                      (t = s - 1),
                      (e - this.x[t]) *
                        (this.y[s] - this.y[t]) /
                        (this.x[s] - this.x[t]) +
                        this.y[t])
                    : 0;
                });
              var r = (function() {
                var e, a, t;
                return function(s, r) {
                  for (a = -1, e = s.length; e - a > 1; )
                    s[(t = (e + a) >> 1)] <= r ? (a = t) : (e = t);
                  return e;
                };
              })();
            },
            getInterpolateFunction: function(e) {
              w.controller.spline ||
                (w.controller.spline = w.params.loop
                  ? new w.controller.LinearSpline(w.slidesGrid, e.slidesGrid)
                  : new w.controller.LinearSpline(w.snapGrid, e.snapGrid));
            },
            setTranslate: function(e, a) {
              function s(a) {
                (e =
                  a.rtl && "horizontal" === a.params.direction
                    ? -w.translate
                    : w.translate),
                  "slide" === w.params.controlBy &&
                    (w.controller.getInterpolateFunction(a),
                    (i = -w.controller.spline.interpolate(-e))),
                  (i && "container" !== w.params.controlBy) ||
                    ((r =
                      (a.maxTranslate() - a.minTranslate()) /
                      (w.maxTranslate() - w.minTranslate())),
                    (i = (e - w.minTranslate()) * r + a.minTranslate())),
                  w.params.controlInverse && (i = a.maxTranslate() - i),
                  a.updateProgress(i),
                  a.setWrapperTranslate(i, !1, w),
                  a.updateActiveIndex();
              }
              var r,
                i,
                n = w.params.control;
              if (w.isArray(n))
                for (var o = 0; o < n.length; o++)
                  n[o] !== a && n[o] instanceof t && s(n[o]);
              else n instanceof t && a !== n && s(n);
            },
            setTransition: function(e, a) {
              function s(a) {
                a.setWrapperTransition(e, w),
                  0 !== e &&
                    (a.onTransitionStart(),
                    a.wrapper.transitionEnd(function() {
                      i &&
                        (a.params.loop &&
                          "slide" === w.params.controlBy &&
                          a.fixLoop(),
                        a.onTransitionEnd());
                    }));
              }
              var r,
                i = w.params.control;
              if (w.isArray(i))
                for (r = 0; r < i.length; r++)
                  i[r] !== a && i[r] instanceof t && s(i[r]);
              else i instanceof t && a !== i && s(i);
            }
          }),
          (w.hashnav = {
            init: function() {
              if (w.params.hashnav) {
                w.hashnav.initialized = !0;
                var e = document.location.hash.replace("#", "");
                if (e)
                  for (var a = 0, t = 0, s = w.slides.length; s > t; t++) {
                    var r = w.slides.eq(t),
                      i = r.attr("data-hash");
                    if (i === e && !r.hasClass(w.params.slideDuplicateClass)) {
                      var n = r.index();
                      w.slideTo(n, a, w.params.runCallbacksOnInit, !0);
                    }
                  }
              }
            },
            setHash: function() {
              w.hashnav.initialized &&
                w.params.hashnav &&
                (document.location.hash =
                  w.slides.eq(w.activeIndex).attr("data-hash") || "");
            }
          }),
          (w.disableKeyboardControl = function() {
            a(document).off("keydown", p);
          }),
          (w.enableKeyboardControl = function() {
            a(document).on("keydown", p);
          }),
          (w.mousewheel = {
            event: !1,
            lastScrollTime: new window.Date().getTime()
          }),
          w.params.mousewheelControl)
        ) {
          try {
            new window.WheelEvent("wheel"), (w.mousewheel.event = "wheel");
          } catch (G) {}
          w.mousewheel.event ||
            void 0 === document.onmousewheel ||
            (w.mousewheel.event = "mousewheel"),
            w.mousewheel.event || (w.mousewheel.event = "DOMMouseScroll");
        }
        (w.disableMousewheelControl = function() {
          return w.mousewheel.event
            ? (w.container.off(w.mousewheel.event, u), !0)
            : !1;
        }),
          (w.enableMousewheelControl = function() {
            return w.mousewheel.event
              ? (w.container.on(w.mousewheel.event, u), !0)
              : !1;
          }),
          (w.parallax = {
            setTranslate: function() {
              w.container
                .children(
                  "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
                )
                .each(function() {
                  c(this, w.progress);
                }),
                w.slides.each(function() {
                  var e = a(this);
                  e
                    .find(
                      "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
                    )
                    .each(function() {
                      var a = Math.min(Math.max(e[0].progress, -1), 1);
                      c(this, a);
                    });
                });
            },
            setTransition: function(e) {
              "undefined" == typeof e && (e = w.params.speed),
                w.container
                  .find(
                    "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
                  )
                  .each(function() {
                    var t = a(this),
                      s =
                        parseInt(t.attr("data-swiper-parallax-duration"), 10) ||
                        e;
                    0 === e && (s = 0), t.transition(s);
                  });
            }
          }),
          (w._plugins = []);
        for (var O in w.plugins) {
          var A = w.plugins[O](w, w.params[O]);
          A && w._plugins.push(A);
        }
        return (
          (w.callPlugins = function(e) {
            for (var a = 0; a < w._plugins.length; a++)
              e in w._plugins[a] &&
                w._plugins[a][e](
                  arguments[1],
                  arguments[2],
                  arguments[3],
                  arguments[4],
                  arguments[5]
                );
          }),
          (w.emitterEventListeners = {}),
          (w.emit = function(e) {
            w.params[e] &&
              w.params[e](
                arguments[1],
                arguments[2],
                arguments[3],
                arguments[4],
                arguments[5]
              );
            var a;
            if (w.emitterEventListeners[e])
              for (a = 0; a < w.emitterEventListeners[e].length; a++)
                w.emitterEventListeners[e][a](
                  arguments[1],
                  arguments[2],
                  arguments[3],
                  arguments[4],
                  arguments[5]
                );
            w.callPlugins &&
              w.callPlugins(
                e,
                arguments[1],
                arguments[2],
                arguments[3],
                arguments[4],
                arguments[5]
              );
          }),
          (w.on = function(e, a) {
            return (
              (e = m(e)),
              w.emitterEventListeners[e] || (w.emitterEventListeners[e] = []),
              w.emitterEventListeners[e].push(a),
              w
            );
          }),
          (w.off = function(e, a) {
            var t;
            if (((e = m(e)), "undefined" == typeof a))
              return (w.emitterEventListeners[e] = []), w;
            if (
              w.emitterEventListeners[e] &&
              0 !== w.emitterEventListeners[e].length
            ) {
              for (t = 0; t < w.emitterEventListeners[e].length; t++)
                w.emitterEventListeners[e][t] === a &&
                  w.emitterEventListeners[e].splice(t, 1);
              return w;
            }
          }),
          (w.once = function(e, a) {
            e = m(e);
            var t = function() {
              a(
                arguments[0],
                arguments[1],
                arguments[2],
                arguments[3],
                arguments[4]
              ),
                w.off(e, t);
            };
            return w.on(e, t), w;
          }),
          (w.a11y = {
            makeFocusable: function(e) {
              return e.attr("tabIndex", "0"), e;
            },
            addRole: function(e, a) {
              return e.attr("role", a), e;
            },
            addLabel: function(e, a) {
              return e.attr("aria-label", a), e;
            },
            disable: function(e) {
              return e.attr("aria-disabled", !0), e;
            },
            enable: function(e) {
              return e.attr("aria-disabled", !1), e;
            },
            onEnterKey: function(e) {
              13 === e.keyCode &&
                (a(e.target).is(w.params.nextButton)
                  ? (w.onClickNext(e),
                    w.a11y.notify(
                      w.isEnd
                        ? w.params.lastSlideMessage
                        : w.params.nextSlideMessage
                    ))
                  : a(e.target).is(w.params.prevButton) &&
                    (w.onClickPrev(e),
                    w.a11y.notify(
                      w.isBeginning
                        ? w.params.firstSlideMessage
                        : w.params.prevSlideMessage
                    )),
                a(e.target).is("." + w.params.bulletClass) &&
                  a(e.target)[0].click());
            },
            liveRegion: a(
              '<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'
            ),
            notify: function(e) {
              var a = w.a11y.liveRegion;
              0 !== a.length && (a.html(""), a.html(e));
            },
            init: function() {
              if (w.params.nextButton) {
                var e = a(w.params.nextButton);
                w.a11y.makeFocusable(e),
                  w.a11y.addRole(e, "button"),
                  w.a11y.addLabel(e, w.params.nextSlideMessage);
              }
              if (w.params.prevButton) {
                var t = a(w.params.prevButton);
                w.a11y.makeFocusable(t),
                  w.a11y.addRole(t, "button"),
                  w.a11y.addLabel(t, w.params.prevSlideMessage);
              }
              a(w.container).append(w.a11y.liveRegion);
            },
            initPagination: function() {
              w.params.pagination &&
                w.params.paginationClickable &&
                w.bullets &&
                w.bullets.length &&
                w.bullets.each(function() {
                  var e = a(this);
                  w.a11y.makeFocusable(e),
                    w.a11y.addRole(e, "button"),
                    w.a11y.addLabel(
                      e,
                      w.params.paginationBulletMessage.replace(
                        /{{index}}/,
                        e.index() + 1
                      )
                    );
                });
            },
            destroy: function() {
              w.a11y.liveRegion &&
                w.a11y.liveRegion.length > 0 &&
                w.a11y.liveRegion.remove();
            }
          }),
          (w.init = function() {
            w.params.loop && w.createLoop(),
              w.updateContainerSize(),
              w.updateSlidesSize(),
              w.updatePagination(),
              w.params.scrollbar && w.scrollbar && w.scrollbar.set(),
              "slide" !== w.params.effect &&
                w.effects[w.params.effect] &&
                (w.params.loop || w.updateProgress(),
                w.effects[w.params.effect].setTranslate()),
              w.params.loop
                ? w.slideTo(
                    w.params.initialSlide + w.loopedSlides,
                    0,
                    w.params.runCallbacksOnInit
                  )
                : (w.slideTo(
                    w.params.initialSlide,
                    0,
                    w.params.runCallbacksOnInit
                  ),
                  0 === w.params.initialSlide &&
                    (w.parallax &&
                      w.params.parallax &&
                      w.parallax.setTranslate(),
                    w.lazy &&
                      w.params.lazyLoading &&
                      (w.lazy.load(), (w.lazy.initialImageLoaded = !0)))),
              w.attachEvents(),
              w.params.observer && w.support.observer && w.initObservers(),
              w.params.preloadImages &&
                !w.params.lazyLoading &&
                w.preloadImages(),
              w.params.autoplay && w.startAutoplay(),
              w.params.keyboardControl &&
                w.enableKeyboardControl &&
                w.enableKeyboardControl(),
              w.params.mousewheelControl &&
                w.enableMousewheelControl &&
                w.enableMousewheelControl(),
              w.params.hashnav && w.hashnav && w.hashnav.init(),
              w.params.a11y && w.a11y && w.a11y.init(),
              w.emit("onInit", w);
          }),
          (w.cleanupStyles = function() {
            w.container.removeClass(w.classNames.join(" ")).removeAttr("style"),
              w.wrapper.removeAttr("style"),
              w.slides &&
                w.slides.length &&
                w.slides
                  .removeClass(
                    [
                      w.params.slideVisibleClass,
                      w.params.slideActiveClass,
                      w.params.slideNextClass,
                      w.params.slidePrevClass
                    ].join(" ")
                  )
                  .removeAttr("style")
                  .removeAttr("data-swiper-column")
                  .removeAttr("data-swiper-row"),
              w.paginationContainer &&
                w.paginationContainer.length &&
                w.paginationContainer.removeClass(
                  w.params.paginationHiddenClass
                ),
              w.bullets &&
                w.bullets.length &&
                w.bullets.removeClass(w.params.bulletActiveClass),
              w.params.prevButton &&
                a(w.params.prevButton).removeClass(
                  w.params.buttonDisabledClass
                ),
              w.params.nextButton &&
                a(w.params.nextButton).removeClass(
                  w.params.buttonDisabledClass
                ),
              w.params.scrollbar &&
                w.scrollbar &&
                (w.scrollbar.track &&
                  w.scrollbar.track.length &&
                  w.scrollbar.track.removeAttr("style"),
                w.scrollbar.drag &&
                  w.scrollbar.drag.length &&
                  w.scrollbar.drag.removeAttr("style"));
          }),
          (w.destroy = function(e, a) {
            w.detachEvents(),
              w.stopAutoplay(),
              w.params.loop && w.destroyLoop(),
              a && w.cleanupStyles(),
              w.disconnectObservers(),
              w.params.keyboardControl &&
                w.disableKeyboardControl &&
                w.disableKeyboardControl(),
              w.params.mousewheelControl &&
                w.disableMousewheelControl &&
                w.disableMousewheelControl(),
              w.params.a11y && w.a11y && w.a11y.destroy(),
              w.emit("onDestroy"),
              e !== !1 && (w = null);
          }),
          w.init(),
          w
        );
      }
    };
  t.prototype = {
    isSafari: (function() {
      var e = navigator.userAgent.toLowerCase();
      return (
        e.indexOf("safari") >= 0 &&
        e.indexOf("chrome") < 0 &&
        e.indexOf("android") < 0
      );
    })(),
    isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      navigator.userAgent
    ),
    isArray: function(e) {
      return "[object Array]" === Object.prototype.toString.apply(e);
    },
    browser: {
      ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
      ieTouch:
        (window.navigator.msPointerEnabled &&
          window.navigator.msMaxTouchPoints > 1) ||
        (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1)
    },
    device: (function() {
      var e = navigator.userAgent,
        a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
        t = e.match(/(iPad).*OS\s([\d_]+)/),
        s = e.match(/(iPod)(.*OS\s([\d_]+))?/),
        r = !t && e.match(/(iPhone\sOS)\s([\d_]+)/);
      return { ios: t || r || s, android: a };
    })(),
    support: {
      touch:
        (window.Modernizr && Modernizr.touch === !0) ||
        (function() {
          return !!(
            "ontouchstart" in window ||
            (window.DocumentTouch && document instanceof DocumentTouch)
          );
        })(),
      transforms3d:
        (window.Modernizr && Modernizr.csstransforms3d === !0) ||
        (function() {
          var e = document.createElement("div").style;
          return (
            "webkitPerspective" in e ||
            "MozPerspective" in e ||
            "OPerspective" in e ||
            "MsPerspective" in e ||
            "perspective" in e
          );
        })(),
      flexbox: (function() {
        for (
          var e = document.createElement("div").style,
            a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(
              " "
            ),
            t = 0;
          t < a.length;
          t++
        )
          if (a[t] in e) return !0;
      })(),
      observer: (function() {
        return (
          "MutationObserver" in window || "WebkitMutationObserver" in window
        );
      })()
    },
    plugins: {}
  };
  for (
    var s = (function() {
        var e = function(e) {
            var a = this,
              t = 0;
            for (t = 0; t < e.length; t++) a[t] = e[t];
            return (a.length = e.length), this;
          },
          a = function(a, t) {
            var s = [],
              r = 0;
            if (a && !t && a instanceof e) return a;
            if (a)
              if ("string" == typeof a) {
                var i,
                  n,
                  o = a.trim();
                if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
                  var l = "div";
                  for (
                    0 === o.indexOf("<li") && (l = "ul"),
                      0 === o.indexOf("<tr") && (l = "tbody"),
                      (0 === o.indexOf("<td") || 0 === o.indexOf("<th")) &&
                        (l = "tr"),
                      0 === o.indexOf("<tbody") && (l = "table"),
                      0 === o.indexOf("<option") && (l = "select"),
                      n = document.createElement(l),
                      n.innerHTML = a,
                      r = 0;
                    r < n.childNodes.length;
                    r++
                  )
                    s.push(n.childNodes[r]);
                } else
                  for (
                    i =
                      t || "#" !== a[0] || a.match(/[ .<>:~]/)
                        ? (t || document).querySelectorAll(a)
                        : [document.getElementById(a.split("#")[1])],
                      r = 0;
                    r < i.length;
                    r++
                  )
                    i[r] && s.push(i[r]);
              } else if (a.nodeType || a === window || a === document)
                s.push(a);
              else if (a.length > 0 && a[0].nodeType)
                for (r = 0; r < a.length; r++) s.push(a[r]);
            return new e(s);
          };
        return (
          (e.prototype = {
            addClass: function(e) {
              if ("undefined" == typeof e) return this;
              for (var a = e.split(" "), t = 0; t < a.length; t++)
                for (var s = 0; s < this.length; s++)
                  this[s].classList.add(a[t]);
              return this;
            },
            removeClass: function(e) {
              for (var a = e.split(" "), t = 0; t < a.length; t++)
                for (var s = 0; s < this.length; s++)
                  this[s].classList.remove(a[t]);
              return this;
            },
            hasClass: function(e) {
              return this[0] ? this[0].classList.contains(e) : !1;
            },
            toggleClass: function(e) {
              for (var a = e.split(" "), t = 0; t < a.length; t++)
                for (var s = 0; s < this.length; s++)
                  this[s].classList.toggle(a[t]);
              return this;
            },
            attr: function(e, a) {
              if (1 === arguments.length && "string" == typeof e)
                return this[0] ? this[0].getAttribute(e) : void 0;
              for (var t = 0; t < this.length; t++)
                if (2 === arguments.length) this[t].setAttribute(e, a);
                else
                  for (var s in e)
                    (this[t][s] = e[s]), this[t].setAttribute(s, e[s]);
              return this;
            },
            removeAttr: function(e) {
              for (var a = 0; a < this.length; a++) this[a].removeAttribute(e);
              return this;
            },
            data: function(e, a) {
              if ("undefined" == typeof a) {
                if (this[0]) {
                  var t = this[0].getAttribute("data-" + e);
                  return t
                    ? t
                    : this[0].dom7ElementDataStorage &&
                      (e in this[0].dom7ElementDataStorage)
                      ? this[0].dom7ElementDataStorage[e]
                      : void 0;
                }
                return void 0;
              }
              for (var s = 0; s < this.length; s++) {
                var r = this[s];
                r.dom7ElementDataStorage || (r.dom7ElementDataStorage = {}),
                  (r.dom7ElementDataStorage[e] = a);
              }
              return this;
            },
            transform: function(e) {
              for (var a = 0; a < this.length; a++) {
                var t = this[a].style;
                t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e;
              }
              return this;
            },
            transition: function(e) {
              "string" != typeof e && (e += "ms");
              for (var a = 0; a < this.length; a++) {
                var t = this[a].style;
                t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e;
              }
              return this;
            },
            on: function(e, t, s, r) {
              function i(e) {
                var r = e.target;
                if (a(r).is(t)) s.call(r, e);
                else
                  for (var i = a(r).parents(), n = 0; n < i.length; n++)
                    a(i[n]).is(t) && s.call(i[n], e);
              }
              var n,
                o,
                l = e.split(" ");
              for (n = 0; n < this.length; n++)
                if ("function" == typeof t || t === !1)
                  for (
                    "function" == typeof t &&
                      ((s = arguments[1]), (r = arguments[2] || !1)),
                      o = 0;
                    o < l.length;
                    o++
                  )
                    this[n].addEventListener(l[o], s, r);
                else
                  for (o = 0; o < l.length; o++)
                    this[n].dom7LiveListeners ||
                      (this[n].dom7LiveListeners = []),
                      this[n].dom7LiveListeners.push({
                        listener: s,
                        liveListener: i
                      }),
                      this[n].addEventListener(l[o], i, r);
              return this;
            },
            off: function(e, a, t, s) {
              for (var r = e.split(" "), i = 0; i < r.length; i++)
                for (var n = 0; n < this.length; n++)
                  if ("function" == typeof a || a === !1)
                    "function" == typeof a &&
                      ((t = arguments[1]), (s = arguments[2] || !1)),
                      this[n].removeEventListener(r[i], t, s);
                  else if (this[n].dom7LiveListeners)
                    for (var o = 0; o < this[n].dom7LiveListeners.length; o++)
                      this[n].dom7LiveListeners[o].listener === t &&
                        this[n].removeEventListener(
                          r[i],
                          this[n].dom7LiveListeners[o].liveListener,
                          s
                        );
              return this;
            },
            once: function(e, a, t, s) {
              function r(n) {
                t(n), i.off(e, a, r, s);
              }
              var i = this;
              "function" == typeof a &&
                ((a = !1), (t = arguments[1]), (s = arguments[2])),
                i.on(e, a, r, s);
            },
            trigger: function(e, a) {
              for (var t = 0; t < this.length; t++) {
                var s;
                try {
                  s = new window.CustomEvent(e, {
                    detail: a,
                    bubbles: !0,
                    cancelable: !0
                  });
                } catch (r) {
                  (s = document.createEvent("Event")),
                    s.initEvent(e, !0, !0),
                    (s.detail = a);
                }
                this[t].dispatchEvent(s);
              }
              return this;
            },
            transitionEnd: function(e) {
              function a(i) {
                if (i.target === this)
                  for (e.call(this, i), t = 0; t < s.length; t++)
                    r.off(s[t], a);
              }
              var t,
                s = [
                  "webkitTransitionEnd",
                  "transitionend",
                  "oTransitionEnd",
                  "MSTransitionEnd",
                  "msTransitionEnd"
                ],
                r = this;
              if (e) for (t = 0; t < s.length; t++) r.on(s[t], a);
              return this;
            },
            width: function() {
              return this[0] === window
                ? window.innerWidth
                : this.length > 0
                  ? parseFloat(this.css("width"))
                  : null;
            },
            outerWidth: function(e) {
              return this.length > 0
                ? e
                  ? this[0].offsetWidth +
                    parseFloat(this.css("margin-right")) +
                    parseFloat(this.css("margin-left"))
                  : this[0].offsetWidth
                : null;
            },
            height: function() {
              return this[0] === window
                ? window.innerHeight
                : this.length > 0
                  ? parseFloat(this.css("height"))
                  : null;
            },
            outerHeight: function(e) {
              return this.length > 0
                ? e
                  ? this[0].offsetHeight +
                    parseFloat(this.css("margin-top")) +
                    parseFloat(this.css("margin-bottom"))
                  : this[0].offsetHeight
                : null;
            },
            offset: function() {
              if (this.length > 0) {
                var e = this[0],
                  a = e.getBoundingClientRect(),
                  t = document.body,
                  s = e.clientTop || t.clientTop || 0,
                  r = e.clientLeft || t.clientLeft || 0,
                  i = window.pageYOffset || e.scrollTop,
                  n = window.pageXOffset || e.scrollLeft;
                return { top: a.top + i - s, left: a.left + n - r };
              }
              return null;
            },
            css: function(e, a) {
              var t;
              if (1 === arguments.length) {
                if ("string" != typeof e) {
                  for (t = 0; t < this.length; t++)
                    for (var s in e) this[t].style[s] = e[s];
                  return this;
                }
                if (this[0])
                  return window
                    .getComputedStyle(this[0], null)
                    .getPropertyValue(e);
              }
              if (2 === arguments.length && "string" == typeof e) {
                for (t = 0; t < this.length; t++) this[t].style[e] = a;
                return this;
              }
              return this;
            },
            each: function(e) {
              for (var a = 0; a < this.length; a++) e.call(this[a], a, this[a]);
              return this;
            },
            html: function(e) {
              if ("undefined" == typeof e)
                return this[0] ? this[0].innerHTML : void 0;
              for (var a = 0; a < this.length; a++) this[a].innerHTML = e;
              return this;
            },
            is: function(t) {
              if (!this[0]) return !1;
              var s, r;
              if ("string" == typeof t) {
                var i = this[0];
                if (i === document) return t === document;
                if (i === window) return t === window;
                if (i.matches) return i.matches(t);
                if (i.webkitMatchesSelector) return i.webkitMatchesSelector(t);
                if (i.mozMatchesSelector) return i.mozMatchesSelector(t);
                if (i.msMatchesSelector) return i.msMatchesSelector(t);
                for (s = a(t), r = 0; r < s.length; r++)
                  if (s[r] === this[0]) return !0;
                return !1;
              }
              if (t === document) return this[0] === document;
              if (t === window) return this[0] === window;
              if (t.nodeType || t instanceof e) {
                for (s = t.nodeType ? [t] : t, r = 0; r < s.length; r++)
                  if (s[r] === this[0]) return !0;
                return !1;
              }
              return !1;
            },
            index: function() {
              if (this[0]) {
                for (var e = this[0], a = 0; null !== (e = e.previousSibling); )
                  1 === e.nodeType && a++;
                return a;
              }
              return void 0;
            },
            eq: function(a) {
              if ("undefined" == typeof a) return this;
              var t,
                s = this.length;
              return a > s - 1
                ? new e([])
                : 0 > a
                  ? ((t = s + a), new e(0 > t ? [] : [this[t]]))
                  : new e([this[a]]);
            },
            append: function(a) {
              var t, s;
              for (t = 0; t < this.length; t++)
                if ("string" == typeof a) {
                  var r = document.createElement("div");
                  for (r.innerHTML = a; r.firstChild; )
                    this[t].appendChild(r.firstChild);
                } else if (a instanceof e)
                  for (s = 0; s < a.length; s++) this[t].appendChild(a[s]);
                else this[t].appendChild(a);
              return this;
            },
            prepend: function(a) {
              var t, s;
              for (t = 0; t < this.length; t++)
                if ("string" == typeof a) {
                  var r = document.createElement("div");
                  for (
                    r.innerHTML = a, s = r.childNodes.length - 1;
                    s >= 0;
                    s--
                  )
                    this[t].insertBefore(
                      r.childNodes[s],
                      this[t].childNodes[0]
                    );
                } else if (a instanceof e)
                  for (s = 0; s < a.length; s++)
                    this[t].insertBefore(a[s], this[t].childNodes[0]);
                else this[t].insertBefore(a, this[t].childNodes[0]);
              return this;
            },
            insertBefore: function(e) {
              for (var t = a(e), s = 0; s < this.length; s++)
                if (1 === t.length) t[0].parentNode.insertBefore(this[s], t[0]);
                else if (t.length > 1)
                  for (var r = 0; r < t.length; r++)
                    t[r].parentNode.insertBefore(this[s].cloneNode(!0), t[r]);
            },
            insertAfter: function(e) {
              for (var t = a(e), s = 0; s < this.length; s++)
                if (1 === t.length)
                  t[0].parentNode.insertBefore(this[s], t[0].nextSibling);
                else if (t.length > 1)
                  for (var r = 0; r < t.length; r++)
                    t[r].parentNode.insertBefore(
                      this[s].cloneNode(!0),
                      t[r].nextSibling
                    );
            },
            next: function(t) {
              return new e(
                this.length > 0
                  ? t
                    ? this[0].nextElementSibling &&
                      a(this[0].nextElementSibling).is(t)
                      ? [this[0].nextElementSibling]
                      : []
                    : this[0].nextElementSibling
                      ? [this[0].nextElementSibling]
                      : []
                  : []
              );
            },
            nextAll: function(t) {
              var s = [],
                r = this[0];
              if (!r) return new e([]);
              for (; r.nextElementSibling; ) {
                var i = r.nextElementSibling;
                t ? a(i).is(t) && s.push(i) : s.push(i), (r = i);
              }
              return new e(s);
            },
            prev: function(t) {
              return new e(
                this.length > 0
                  ? t
                    ? this[0].previousElementSibling &&
                      a(this[0].previousElementSibling).is(t)
                      ? [this[0].previousElementSibling]
                      : []
                    : this[0].previousElementSibling
                      ? [this[0].previousElementSibling]
                      : []
                  : []
              );
            },
            prevAll: function(t) {
              var s = [],
                r = this[0];
              if (!r) return new e([]);
              for (; r.previousElementSibling; ) {
                var i = r.previousElementSibling;
                t ? a(i).is(t) && s.push(i) : s.push(i), (r = i);
              }
              return new e(s);
            },
            parent: function(e) {
              for (var t = [], s = 0; s < this.length; s++)
                e
                  ? a(this[s].parentNode).is(e) && t.push(this[s].parentNode)
                  : t.push(this[s].parentNode);
              return a(a.unique(t));
            },
            parents: function(e) {
              for (var t = [], s = 0; s < this.length; s++)
                for (var r = this[s].parentNode; r; )
                  e ? a(r).is(e) && t.push(r) : t.push(r), (r = r.parentNode);
              return a(a.unique(t));
            },
            find: function(a) {
              for (var t = [], s = 0; s < this.length; s++)
                for (
                  var r = this[s].querySelectorAll(a), i = 0;
                  i < r.length;
                  i++
                )
                  t.push(r[i]);
              return new e(t);
            },
            children: function(t) {
              for (var s = [], r = 0; r < this.length; r++)
                for (var i = this[r].childNodes, n = 0; n < i.length; n++)
                  t
                    ? 1 === i[n].nodeType && a(i[n]).is(t) && s.push(i[n])
                    : 1 === i[n].nodeType && s.push(i[n]);
              return new e(a.unique(s));
            },
            remove: function() {
              for (var e = 0; e < this.length; e++)
                this[e].parentNode && this[e].parentNode.removeChild(this[e]);
              return this;
            },
            add: function() {
              var e,
                t,
                s = this;
              for (e = 0; e < arguments.length; e++) {
                var r = a(arguments[e]);
                for (t = 0; t < r.length; t++) (s[s.length] = r[t]), s.length++;
              }
              return s;
            }
          }),
          (a.fn = e.prototype),
          (a.unique = function(e) {
            for (var a = [], t = 0; t < e.length; t++)
              -1 === a.indexOf(e[t]) && a.push(e[t]);
            return a;
          }),
          a
        );
      })(),
      r = ["jQuery", "Zepto", "Dom7"],
      i = 0;
    i < r.length;
    i++
  )
    window[r[i]] && e(window[r[i]]);
  var n;
  (n =
    "undefined" == typeof s ? window.Dom7 || window.Zepto || window.jQuery : s),
    n &&
      ("transitionEnd" in n.fn ||
        (n.fn.transitionEnd = function(e) {
          function a(i) {
            if (i.target === this)
              for (e.call(this, i), t = 0; t < s.length; t++) r.off(s[t], a);
          }
          var t,
            s = [
              "webkitTransitionEnd",
              "transitionend",
              "oTransitionEnd",
              "MSTransitionEnd",
              "msTransitionEnd"
            ],
            r = this;
          if (e) for (t = 0; t < s.length; t++) r.on(s[t], a);
          return this;
        }),
      "transform" in n.fn ||
        (n.fn.transform = function(e) {
          for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e;
          }
          return this;
        }),
      "transition" in n.fn ||
        (n.fn.transition = function(e) {
          "string" != typeof e && (e += "ms");
          for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e;
          }
          return this;
        })),
    (window.Swiper = t);
})(),
  "undefined" != typeof module
    ? (module.exports = window.Swiper)
    : "function" == typeof define &&
      define.amd &&
      define([], function() {
        return window.Swiper;
      });
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
    return null == e ? String(e) : X[G.call(e)] || "object";
  }
  function t(t) {
    return "function" == e(t);
  }
  function n(e) {
    return null != e && e == e.window;
  }
  function i(e) {
    return null != e && e.nodeType == e.DOCUMENT_NODE;
  }
  function o(t) {
    return "object" == e(t);
  }
  function a(e) {
    return o(e) && !n(e) && Object.getPrototypeOf(e) == Object.prototype;
  }
  function r(e) {
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
    return e in k ? k[e] : (k[e] = new RegExp("(^|\\s)" + e + "(\\s|$)"));
  }
  function p(e, t) {
    return "number" != typeof t || R[c(e)] ? t : t + "px";
  }
  function d(e) {
    var t, n;
    return (
      _[e] ||
        ((t = L.createElement(e)),
        L.body.appendChild(t),
        (n = getComputedStyle(t, "").getPropertyValue("display")),
        t.parentNode.removeChild(t),
        "none" == n && (n = "block"),
        (_[e] = n)),
      _[e]
    );
  }
  function f(e) {
    return "children" in e
      ? M.call(e.children)
      : S.map(e.childNodes, function(e) {
          return 1 == e.nodeType ? e : void 0;
        });
  }
  function h(e, t) {
    var n,
      i = e ? e.length : 0;
    for (n = 0; i > n; n++) this[n] = e[n];
    (this.length = i), (this.selector = t || "");
  }
  function m(e, t, n) {
    for (A in t)
      n && (a(t[A]) || K(t[A]))
        ? (a(t[A]) && !a(e[A]) && (e[A] = {}),
          K(t[A]) && !K(e[A]) && (e[A] = []),
          m(e[A], t[A], n))
        : t[A] !== x && (e[A] = t[A]);
  }
  function g(e, t) {
    return null == t ? S(e) : S(e).filter(t);
  }
  function y(e, n, i, o) {
    return t(n) ? n.call(e, i, o) : n;
  }
  function v(e, t, n) {
    null == n ? e.removeAttribute(t) : e.setAttribute(t, n);
  }
  function T(e, t) {
    var n = e.className || "",
      i = n && n.baseVal !== x;
    return t === x
      ? i
        ? n.baseVal
        : n
      : void (i ? (n.baseVal = t) : (e.className = t));
  }
  function I(e) {
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
    } catch (t) {
      return e;
    }
  }
  function w(e, t) {
    t(e);
    for (var n = 0, i = e.childNodes.length; i > n; n++) w(e.childNodes[n], t);
  }
  var x,
    A,
    S,
    b,
    N,
    O,
    E = [],
    P = E.concat,
    U = E.filter,
    M = E.slice,
    L = window.document,
    _ = {},
    k = {},
    R = {
      "column-count": 1,
      columns: 1,
      "font-weight": 1,
      "line-height": 1,
      opacity: 1,
      "z-index": 1,
      zoom: 1
    },
    C = /^\s*<(\w+|!)[^>]*>/,
    B = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    D = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    j = /^(?:body|html)$/i,
    H = /([A-Z])/g,
    $ = ["val", "css", "html", "text", "data", "width", "height", "offset"],
    W = ["after", "prepend", "before", "append"],
    F = L.createElement("table"),
    V = L.createElement("tr"),
    J = {
      tr: L.createElement("tbody"),
      tbody: F,
      thead: F,
      tfoot: F,
      td: V,
      th: V,
      "*": L.createElement("div")
    },
    Z = /complete|loaded|interactive/,
    Q = /^[\w-]*$/,
    X = {},
    G = X.toString,
    z = {},
    q = L.createElement("div"),
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
    (z.matches = function(e, t) {
      if (!t || !e || 1 !== e.nodeType) return !1;
      var n =
        e.webkitMatchesSelector ||
        e.mozMatchesSelector ||
        e.oMatchesSelector ||
        e.matchesSelector;
      if (n) return n.call(e, t);
      var i,
        o = e.parentNode,
        a = !o;
      return (
        a && (o = q).appendChild(e),
        (i = ~z.qsa(o, t).indexOf(e)),
        a && q.removeChild(e),
        i
      );
    }),
    (N = function(e) {
      return e.replace(/-+(.)?/g, function(e, t) {
        return t ? t.toUpperCase() : "";
      });
    }),
    (O = function(e) {
      return U.call(e, function(t, n) {
        return e.indexOf(t) == n;
      });
    }),
    (z.fragment = function(e, t, n) {
      var i, o, r;
      return (
        B.test(e) && (i = S(L.createElement(RegExp.$1))),
        i ||
          (e.replace && (e = e.replace(D, "<$1></$2>")),
          t === x && (t = C.test(e) && RegExp.$1),
          t in J || (t = "*"),
          (r = J[t]),
          (r.innerHTML = "" + e),
          (i = S.each(M.call(r.childNodes), function() {
            r.removeChild(this);
          }))),
        a(n) &&
          ((o = S(i)),
          S.each(n, function(e, t) {
            $.indexOf(e) > -1 ? o[e](t) : o.attr(e, t);
          })),
        i
      );
    }),
    (z.Z = function(e, t) {
      return new h(e, t);
    }),
    (z.isZ = function(e) {
      return e instanceof z.Z;
    }),
    (z.init = function(e, n) {
      var i;
      if (!e) return z.Z();
      if ("string" == typeof e)
        if (((e = e.trim()), "<" == e[0] && C.test(e)))
          (i = z.fragment(e, RegExp.$1, n)), (e = null);
        else {
          if (n !== x) return S(n).find(e);
          i = z.qsa(L, e);
        }
      else {
        if (t(e)) return S(L).ready(e);
        if (z.isZ(e)) return e;
        if (K(e)) i = s(e);
        else if (o(e)) (i = [e]), (e = null);
        else if (C.test(e))
          (i = z.fragment(e.trim(), RegExp.$1, n)), (e = null);
        else {
          if (n !== x) return S(n).find(e);
          i = z.qsa(L, e);
        }
      }
      return z.Z(i, e);
    }),
    (S = function(e, t) {
      return z.init(e, t);
    }),
    (S.extend = function(e) {
      var t,
        n = M.call(arguments, 1);
      return (
        "boolean" == typeof e && ((t = e), (e = n.shift())),
        n.forEach(function(n) {
          m(e, n, t);
        }),
        e
      );
    }),
    (z.qsa = function(e, t) {
      var n,
        i = "#" == t[0],
        o = !i && "." == t[0],
        a = i || o ? t.slice(1) : t,
        r = Q.test(a);
      return e.getElementById && r && i
        ? (n = e.getElementById(a))
          ? [n]
          : []
        : 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType
          ? []
          : M.call(
              r && !i && e.getElementsByClassName
                ? o
                  ? e.getElementsByClassName(a)
                  : e.getElementsByTagName(t)
                : e.querySelectorAll(t)
            );
    }),
    (S.contains = L.documentElement.contains
      ? function(e, t) {
          return e !== t && e.contains(t);
        }
      : function(e, t) {
          for (; t && (t = t.parentNode); ) if (t === e) return !0;
          return !1;
        }),
    (S.type = e),
    (S.isFunction = t),
    (S.isWindow = n),
    (S.isArray = K),
    (S.isPlainObject = a),
    (S.isEmptyObject = function(e) {
      var t;
      for (t in e) return !1;
      return !0;
    }),
    (S.inArray = function(e, t, n) {
      return E.indexOf.call(t, e, n);
    }),
    (S.camelCase = N),
    (S.trim = function(e) {
      return null == e ? "" : String.prototype.trim.call(e);
    }),
    (S.uuid = 0),
    (S.support = {}),
    (S.expr = {}),
    (S.noop = function() {}),
    (S.map = function(e, t) {
      var n,
        i,
        o,
        a = [];
      if (r(e))
        for (i = 0; i < e.length; i++) (n = t(e[i], i)), null != n && a.push(n);
      else for (o in e) (n = t(e[o], o)), null != n && a.push(n);
      return l(a);
    }),
    (S.each = function(e, t) {
      var n, i;
      if (r(e)) {
        for (n = 0; n < e.length; n++)
          if (t.call(e[n], n, e[n]) === !1) return e;
      } else for (i in e) if (t.call(e[i], i, e[i]) === !1) return e;
      return e;
    }),
    (S.grep = function(e, t) {
      return U.call(e, t);
    }),
    window.JSON && (S.parseJSON = JSON.parse),
    S.each(
      "Boolean Number String Function Array Date RegExp Object Error".split(
        " "
      ),
      function(e, t) {
        X["[object " + t + "]"] = t.toLowerCase();
      }
    ),
    (S.fn = {
      constructor: z.Z,
      length: 0,
      forEach: E.forEach,
      reduce: E.reduce,
      push: E.push,
      sort: E.sort,
      splice: E.splice,
      indexOf: E.indexOf,
      concat: function() {
        var e,
          t,
          n = [];
        for (e = 0; e < arguments.length; e++)
          (t = arguments[e]), (n[e] = z.isZ(t) ? t.toArray() : t);
        return P.apply(z.isZ(this) ? this.toArray() : this, n);
      },
      map: function(e) {
        return S(
          S.map(this, function(t, n) {
            return e.call(t, n, t);
          })
        );
      },
      slice: function() {
        return S(M.apply(this, arguments));
      },
      ready: function(e) {
        return (
          Z.test(L.readyState) && L.body
            ? e(S)
            : L.addEventListener(
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
        return e === x ? M.call(this) : this[e >= 0 ? e : e + this.length];
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
          E.every.call(this, function(t, n) {
            return e.call(t, n, t) !== !1;
          }),
          this
        );
      },
      filter: function(e) {
        return t(e)
          ? this.not(this.not(e))
          : S(
              U.call(this, function(t) {
                return z.matches(t, e);
              })
            );
      },
      add: function(e, t) {
        return S(O(this.concat(S(e, t))));
      },
      is: function(e) {
        return this.length > 0 && z.matches(this[0], e);
      },
      not: function(e) {
        var n = [];
        if (t(e) && e.call !== x)
          this.each(function(t) {
            e.call(this, t) || n.push(this);
          });
        else {
          var i =
            "string" == typeof e
              ? this.filter(e)
              : r(e) && t(e.item)
                ? M.call(e)
                : S(e);
          this.forEach(function(e) {
            i.indexOf(e) < 0 && n.push(e);
          });
        }
        return S(n);
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
        var t,
          n = this;
        return (t = e
          ? "object" == typeof e
            ? S(e).filter(function() {
                var e = this;
                return E.some.call(n, function(t) {
                  return S.contains(t, e);
                });
              })
            : 1 == this.length
              ? S(z.qsa(this[0], e))
              : this.map(function() {
                  return z.qsa(this, e);
                })
          : S());
      },
      closest: function(e, t) {
        var n = this[0],
          o = !1;
        for (
          "object" == typeof e && (o = S(e));
          n && !(o ? o.indexOf(n) >= 0 : z.matches(n, e));

        )
          n = n !== t && !i(n) && n.parentNode;
        return S(n);
      },
      parents: function(e) {
        for (var t = [], n = this; n.length > 0; )
          n = S.map(n, function(e) {
            return (e = e.parentNode) && !i(e) && t.indexOf(e) < 0
              ? (t.push(e), e)
              : void 0;
          });
        return g(t, e);
      },
      parent: function(e) {
        return g(O(this.pluck("parentNode")), e);
      },
      children: function(e) {
        return g(
          this.map(function() {
            return f(this);
          }),
          e
        );
      },
      contents: function() {
        return this.map(function() {
          return this.contentDocument || M.call(this.childNodes);
        });
      },
      siblings: function(e) {
        return g(
          this.map(function(e, t) {
            return U.call(f(t.parentNode), function(e) {
              return e !== t;
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
        return S.map(this, function(t) {
          return t[e];
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
        var n = t(e);
        if (this[0] && !n)
          var i = S(e).get(0),
            o = i.parentNode || this.length > 1;
        return this.each(function(t) {
          S(this).wrapAll(n ? e.call(this, t) : o ? i.cloneNode(!0) : i);
        });
      },
      wrapAll: function(e) {
        if (this[0]) {
          S(this[0]).before((e = S(e)));
          for (var t; (t = e.children()).length; ) e = t.first();
          S(e).append(this);
        }
        return this;
      },
      wrapInner: function(e) {
        var n = t(e);
        return this.each(function(t) {
          var i = S(this),
            o = i.contents(),
            a = n ? e.call(this, t) : e;
          o.length ? o.wrapAll(a) : i.append(a);
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
          var t = S(this);
          (e === x ? "none" == t.css("display") : e) ? t.show() : t.hide();
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
          ? this.each(function(t) {
              var n = this.innerHTML;
              S(this)
                .empty()
                .append(y(this, e, t, n));
            })
          : 0 in this
            ? this[0].innerHTML
            : null;
      },
      text: function(e) {
        return 0 in arguments
          ? this.each(function(t) {
              var n = y(this, e, t, this.textContent);
              this.textContent = null == n ? "" : "" + n;
            })
          : 0 in this
            ? this.pluck("textContent").join("")
            : null;
      },
      attr: function(e, t) {
        var n;
        return "string" != typeof e || 1 in arguments
          ? this.each(function(n) {
              if (1 === this.nodeType)
                if (o(e)) for (A in e) v(this, A, e[A]);
                else v(this, e, y(this, t, n, this.getAttribute(e)));
            })
          : this.length && 1 === this[0].nodeType
            ? !(n = this[0].getAttribute(e)) && e in this[0]
              ? this[0][e]
              : n
            : x;
      },
      removeAttr: function(e) {
        return this.each(function() {
          1 === this.nodeType &&
            e.split(" ").forEach(function(e) {
              v(this, e);
            }, this);
        });
      },
      prop: function(e, t) {
        return (
          (e = Y[e] || e),
          1 in arguments
            ? this.each(function(n) {
                this[e] = y(this, t, n, this[e]);
              })
            : this[0] && this[0][e]
        );
      },
      data: function(e, t) {
        var n = "data-" + e.replace(H, "-$1").toLowerCase(),
          i = 1 in arguments ? this.attr(n, t) : this.attr(n);
        return null !== i ? I(i) : x;
      },
      val: function(e) {
        return 0 in arguments
          ? this.each(function(t) {
              this.value = y(this, e, t, this.value);
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
          return this.each(function(t) {
            var n = S(this),
              i = y(this, e, t, n.offset()),
              o = n.offsetParent().offset(),
              a = { top: i.top - o.top, left: i.left - o.left };
            "static" == n.css("position") && (a.position = "relative"),
              n.css(a);
          });
        if (!this.length) return null;
        if (!S.contains(L.documentElement, this[0])) return { top: 0, left: 0 };
        var t = this[0].getBoundingClientRect();
        return {
          left: t.left + window.pageXOffset,
          top: t.top + window.pageYOffset,
          width: Math.round(t.width),
          height: Math.round(t.height)
        };
      },
      css: function(t, n) {
        if (arguments.length < 2) {
          var i,
            o = this[0];
          if (!o) return;
          if (((i = getComputedStyle(o, "")), "string" == typeof t))
            return o.style[N(t)] || i.getPropertyValue(t);
          if (K(t)) {
            var a = {};
            return (
              S.each(t, function(e, t) {
                a[t] = o.style[N(t)] || i.getPropertyValue(t);
              }),
              a
            );
          }
        }
        var r = "";
        if ("string" == e(t))
          n || 0 === n
            ? (r = c(t) + ":" + p(t, n))
            : this.each(function() {
                this.style.removeProperty(c(t));
              });
        else
          for (A in t)
            t[A] || 0 === t[A]
              ? (r += c(A) + ":" + p(A, t[A]) + ";")
              : this.each(function() {
                  this.style.removeProperty(c(A));
                });
        return this.each(function() {
          this.style.cssText += ";" + r;
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
          ? E.some.call(
              this,
              function(e) {
                return this.test(T(e));
              },
              u(e)
            )
          : !1;
      },
      addClass: function(e) {
        return e
          ? this.each(function(t) {
              if ("className" in this) {
                b = [];
                var n = T(this),
                  i = y(this, e, t, n);
                i.split(/\s+/g).forEach(function(e) {
                  S(this).hasClass(e) || b.push(e);
                }, this),
                  b.length && T(this, n + (n ? " " : "") + b.join(" "));
              }
            })
          : this;
      },
      removeClass: function(e) {
        return this.each(function(t) {
          if ("className" in this) {
            if (e === x) return T(this, "");
            (b = T(this)),
              y(this, e, t, b)
                .split(/\s+/g)
                .forEach(function(e) {
                  b = b.replace(u(e), " ");
                }),
              T(this, b.trim());
          }
        });
      },
      toggleClass: function(e, t) {
        return e
          ? this.each(function(n) {
              var i = S(this),
                o = y(this, e, n, T(this));
              o.split(/\s+/g).forEach(function(e) {
                (t === x
                ? !i.hasClass(e)
                : t)
                  ? i.addClass(e)
                  : i.removeClass(e);
              });
            })
          : this;
      },
      scrollTop: function(e) {
        if (this.length) {
          var t = "scrollTop" in this[0];
          return e === x
            ? t
              ? this[0].scrollTop
              : this[0].pageYOffset
            : this.each(
                t
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
          var t = "scrollLeft" in this[0];
          return e === x
            ? t
              ? this[0].scrollLeft
              : this[0].pageXOffset
            : this.each(
                t
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
            t = this.offsetParent(),
            n = this.offset(),
            i = j.test(t[0].nodeName) ? { top: 0, left: 0 } : t.offset();
          return (
            (n.top -= parseFloat(S(e).css("margin-top")) || 0),
            (n.left -= parseFloat(S(e).css("margin-left")) || 0),
            (i.top += parseFloat(S(t[0]).css("border-top-width")) || 0),
            (i.left += parseFloat(S(t[0]).css("border-left-width")) || 0),
            { top: n.top - i.top, left: n.left - i.left }
          );
        }
      },
      offsetParent: function() {
        return this.map(function() {
          for (
            var e = this.offsetParent || L.body;
            e && !j.test(e.nodeName) && "static" == S(e).css("position");

          )
            e = e.offsetParent;
          return e;
        });
      }
    }),
    (S.fn.detach = S.fn.remove),
    ["width", "height"].forEach(function(e) {
      var t = e.replace(/./, function(e) {
        return e[0].toUpperCase();
      });
      S.fn[e] = function(o) {
        var a,
          r = this[0];
        return o === x
          ? n(r)
            ? r["inner" + t]
            : i(r)
              ? r.documentElement["scroll" + t]
              : (a = this.offset()) && a[e]
          : this.each(function(t) {
              (r = S(this)), r.css(e, y(this, o, t, r[e]()));
            });
      };
    }),
    W.forEach(function(t, n) {
      var i = n % 2;
      (S.fn[t] = function() {
        var t,
          o,
          a = S.map(arguments, function(n) {
            return (
              (t = e(n)),
              "object" == t || "array" == t || null == n ? n : z.fragment(n)
            );
          }),
          r = this.length > 1;
        return a.length < 1
          ? this
          : this.each(function(e, t) {
              (o = i ? t : t.parentNode),
                (t =
                  0 == n
                    ? t.nextSibling
                    : 1 == n
                      ? t.firstChild
                      : 2 == n
                        ? t
                        : null);
              var s = S.contains(L.documentElement, o);
              a.forEach(function(e) {
                if (r) e = e.cloneNode(!0);
                else if (!o) return S(e).remove();
                o.insertBefore(e, t),
                  s &&
                    w(e, function(e) {
                      null == e.nodeName ||
                        "SCRIPT" !== e.nodeName.toUpperCase() ||
                        (e.type && "text/javascript" !== e.type) ||
                        e.src ||
                        window.eval.call(window, e.innerHTML);
                    });
              });
            });
      }),
        (S.fn[i ? t + "To" : "insert" + (n ? "Before" : "After")] = function(
          e
        ) {
          return S(e)[t](this), this;
        });
    }),
    (z.Z.prototype = h.prototype = S.fn),
    (z.uniq = O),
    (z.deserializeValue = I),
    (S.zepto = z),
    S
  );
})();
(window.Zepto = Zepto),
  void 0 === window.$ && (window.$ = Zepto),
  (function(e) {
    function t(t, n, i) {
      var o = e.Event(n);
      return e(t).trigger(o, i), !o.isDefaultPrevented();
    }
    function n(e, n, i, o) {
      return e.global ? t(n || v, i, o) : void 0;
    }
    function i(t) {
      t.global && 0 === e.active++ && n(t, null, "ajaxStart");
    }
    function o(t) {
      t.global && !--e.active && n(t, null, "ajaxStop");
    }
    function a(e, t) {
      var i = t.context;
      return t.beforeSend.call(i, e, t) === !1 ||
        n(t, i, "ajaxBeforeSend", [e, t]) === !1
        ? !1
        : void n(t, i, "ajaxSend", [e, t]);
    }
    function r(e, t, i, o) {
      var a = i.context,
        r = "success";
      i.success.call(a, e, r, t),
        o && o.resolveWith(a, [e, r, t]),
        n(i, a, "ajaxSuccess", [t, i, e]),
        l(r, t, i);
    }
    function s(e, t, i, o, a) {
      var r = o.context;
      o.error.call(r, i, t, e),
        a && a.rejectWith(r, [i, t, e]),
        n(o, r, "ajaxError", [i, o, e || t]),
        l(t, i, o);
    }
    function l(e, t, i) {
      var a = i.context;
      i.complete.call(a, t, e), n(i, a, "ajaxComplete", [t, i]), o(i);
    }
    function c() {}
    function u(e) {
      return (
        e && (e = e.split(";", 2)[0]),
        (e &&
          (e == A
            ? "html"
            : e == x
              ? "json"
              : I.test(e)
                ? "script"
                : w.test(e) && "xml")) ||
          "text"
      );
    }
    function p(e, t) {
      return "" == t ? e : (e + "&" + t).replace(/[&?]{1,2}/, "?");
    }
    function d(t) {
      t.processData &&
        t.data &&
        "string" != e.type(t.data) &&
        (t.data = e.param(t.data, t.traditional)),
        !t.data ||
          (t.type && "GET" != t.type.toUpperCase()) ||
          ((t.url = p(t.url, t.data)), (t.data = void 0));
    }
    function f(t, n, i, o) {
      return (
        e.isFunction(n) && ((o = i), (i = n), (n = void 0)),
        e.isFunction(i) || ((o = i), (i = void 0)),
        { url: t, data: n, success: i, dataType: o }
      );
    }
    function h(t, n, i, o) {
      var a,
        r = e.isArray(n),
        s = e.isPlainObject(n);
      e.each(n, function(n, l) {
        (a = e.type(l)),
          o &&
            (n = i
              ? o
              : o + "[" + (s || "object" == a || "array" == a ? n : "") + "]"),
          !o && r
            ? t.add(l.name, l.value)
            : "array" == a || (!i && "object" == a)
              ? h(t, l, i, n)
              : t.add(n, l);
      });
    }
    var m,
      g,
      y = 0,
      v = window.document,
      T = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      I = /^(?:text|application)\/javascript/i,
      w = /^(?:text|application)\/xml/i,
      x = "application/json",
      A = "text/html",
      S = /^\s*$/,
      b = v.createElement("a");
    (b.href = window.location.href),
      (e.active = 0),
      (e.ajaxJSONP = function(t, n) {
        if ("type" in t) {
          var i,
            o,
            l = t.jsonpCallback,
            c = (e.isFunction(l) ? l() : l) || "jsonp" + ++y,
            u = v.createElement("script"),
            p = window[c],
            d = function(t) {
              e(u).triggerHandler("error", t || "abort");
            },
            f = { abort: d };
          return (
            n && n.promise(f),
            e(u).on("load error", function(a, l) {
              clearTimeout(o),
                e(u)
                  .off()
                  .remove(),
                "error" != a.type && i
                  ? r(i[0], f, t, n)
                  : s(null, l || "error", f, t, n),
                (window[c] = p),
                i && e.isFunction(p) && p(i[0]),
                (p = i = void 0);
            }),
            a(f, t) === !1
              ? (d("abort"), f)
              : ((window[c] = function() {
                  i = arguments;
                }),
                (u.src = t.url.replace(/\?(.+)=\?/, "?$1=" + c)),
                v.head.appendChild(u),
                t.timeout > 0 &&
                  (o = setTimeout(function() {
                    d("timeout");
                  }, t.timeout)),
                f)
          );
        }
        return e.ajax(t);
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
          html: A,
          text: "text/plain"
        },
        crossDomain: !1,
        timeout: 0,
        processData: !0,
        cache: !0
      }),
      (e.ajax = function(t) {
        var n,
          o,
          l = e.extend({}, t || {}),
          f = e.Deferred && e.Deferred();
        for (m in e.ajaxSettings) void 0 === l[m] && (l[m] = e.ajaxSettings[m]);
        i(l),
          l.crossDomain ||
            ((n = v.createElement("a")),
            (n.href = l.url),
            (n.href = n.href),
            (l.crossDomain =
              b.protocol + "//" + b.host != n.protocol + "//" + n.host)),
          l.url || (l.url = window.location.toString()),
          (o = l.url.indexOf("#")) > -1 && (l.url = l.url.slice(0, o)),
          d(l);
        var h = l.dataType,
          y = /\?.+=\?/.test(l.url);
        if (
          (y && (h = "jsonp"),
          (l.cache !== !1 &&
            ((t && t.cache === !0) || ("script" != h && "jsonp" != h))) ||
            (l.url = p(l.url, "_=" + Date.now())),
          "jsonp" == h)
        )
          return (
            y ||
              (l.url = p(
                l.url,
                l.jsonp ? l.jsonp + "=?" : l.jsonp === !1 ? "" : "callback=?"
              )),
            e.ajaxJSONP(l, f)
          );
        var T,
          I = l.accepts[h],
          w = {},
          x = function(e, t) {
            w[e.toLowerCase()] = [e, t];
          },
          A = /^([\w-]+:)\/\//.test(l.url)
            ? RegExp.$1
            : window.location.protocol,
          N = l.xhr(),
          O = N.setRequestHeader;
        if (
          (f && f.promise(N),
          l.crossDomain || x("X-Requested-With", "XMLHttpRequest"),
          x("Accept", I || "*/*"),
          (I = l.mimeType || I) &&
            (I.indexOf(",") > -1 && (I = I.split(",", 2)[0]),
            N.overrideMimeType && N.overrideMimeType(I)),
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
          ((N.setRequestHeader = x),
          (N.onreadystatechange = function() {
            if (4 == N.readyState) {
              (N.onreadystatechange = c), clearTimeout(T);
              var t,
                n = !1;
              if (
                (N.status >= 200 && N.status < 300) ||
                304 == N.status ||
                (0 == N.status && "file:" == A)
              ) {
                if (
                  ((h =
                    h || u(l.mimeType || N.getResponseHeader("content-type"))),
                  "arraybuffer" == N.responseType || "blob" == N.responseType)
                )
                  t = N.response;
                else {
                  t = N.responseText;
                  try {
                    "script" == h
                      ? (1, eval)(t)
                      : "xml" == h
                        ? (t = N.responseXML)
                        : "json" == h &&
                          (t = S.test(t) ? null : e.parseJSON(t));
                  } catch (i) {
                    n = i;
                  }
                  if (n) return s(n, "parsererror", N, l, f);
                }
                r(t, N, l, f);
              } else
                s(N.statusText || null, N.status ? "error" : "abort", N, l, f);
            }
          }),
          a(N, l) === !1)
        )
          return N.abort(), s(null, "abort", N, l, f), N;
        if (l.xhrFields) for (g in l.xhrFields) N[g] = l.xhrFields[g];
        var E = "async" in l ? l.async : !0;
        N.open(l.type, l.url, E, l.username, l.password);
        for (g in w) O.apply(N, w[g]);
        return (
          l.timeout > 0 &&
            (T = setTimeout(function() {
              (N.onreadystatechange = c),
                N.abort(),
                s(null, "timeout", N, l, f);
            }, l.timeout)),
          N.send(l.data ? l.data : null),
          N
        );
      }),
      (e.get = function() {
        return e.ajax(f.apply(null, arguments));
      }),
      (e.post = function() {
        var t = f.apply(null, arguments);
        return (t.type = "POST"), e.ajax(t);
      }),
      (e.getJSON = function() {
        var t = f.apply(null, arguments);
        return (t.dataType = "json"), e.ajax(t);
      }),
      (e.fn.load = function(t, n, i) {
        if (!this.length) return this;
        var o,
          a = this,
          r = t.split(/\s/),
          s = f(t, n, i),
          l = s.success;
        return (
          r.length > 1 && ((s.url = r[0]), (o = r[1])),
          (s.success = function(t) {
            a.html(
              o
                ? e("<div>")
                    .html(t.replace(T, ""))
                    .find(o)
                : t
            ),
              l && l.apply(a, arguments);
          }),
          e.ajax(s),
          this
        );
      });
    var N = encodeURIComponent;
    e.param = function(t, n) {
      var i = [];
      return (
        (i.add = function(t, n) {
          e.isFunction(n) && (n = n()),
            null == n && (n = ""),
            this.push(N(t) + "=" + N(n));
        }),
        h(i, t, n),
        i.join("&").replace(/%20/g, "+")
      );
    };
  })(Zepto),
  (function(e) {
    e.Callbacks = function(t) {
      t = e.extend({}, t);
      var n,
        i,
        o,
        a,
        r,
        s,
        l = [],
        c = !t.once && [],
        u = function(e) {
          for (
            n = t.memory && e, i = !0, s = a || 0, a = 0, r = l.length, o = !0;
            l && r > s;
            ++s
          )
            if (l[s].apply(e[0], e[1]) === !1 && t.stopOnFalse) {
              n = !1;
              break;
            }
          (o = !1),
            l &&
              (c ? c.length && u(c.shift()) : n ? (l.length = 0) : p.disable());
        },
        p = {
          add: function() {
            if (l) {
              var i = l.length,
                s = function(n) {
                  e.each(n, function(e, n) {
                    "function" == typeof n
                      ? (t.unique && p.has(n)) || l.push(n)
                      : n && n.length && "string" != typeof n && s(n);
                  });
                };
              s(arguments), o ? (r = l.length) : n && ((a = i), u(n));
            }
            return this;
          },
          remove: function() {
            return (
              l &&
                e.each(arguments, function(t, n) {
                  for (var i; (i = e.inArray(n, l, i)) > -1; )
                    l.splice(i, 1), o && (r >= i && --r, s >= i && --s);
                }),
              this
            );
          },
          has: function(t) {
            return !!l && !!(t ? e.inArray(t, l) > -1 : l.length);
          },
          empty: function() {
            return (r = l.length = 0), this;
          },
          disable: function() {
            return (l = c = n = void 0), this;
          },
          disabled: function() {
            return !l;
          },
          lock: function() {
            return (c = void 0), n || p.disable(), this;
          },
          locked: function() {
            return !c;
          },
          fireWith: function(e, t) {
            return (
              !l ||
                (i && !c) ||
                ((t = t || []),
                (t = [e, t.slice ? t.slice() : t]),
                o ? c.push(t) : u(t)),
              this
            );
          },
          fire: function() {
            return p.fireWith(this, arguments);
          },
          fired: function() {
            return !!i;
          }
        };
      return p;
    };
  })(Zepto),
  (function(e) {
    function t(n) {
      var i = [
          ["resolve", "done", e.Callbacks({ once: 1, memory: 1 }), "resolved"],
          ["reject", "fail", e.Callbacks({ once: 1, memory: 1 }), "rejected"],
          ["notify", "progress", e.Callbacks({ memory: 1 })]
        ],
        o = "pending",
        a = {
          state: function() {
            return o;
          },
          always: function() {
            return r.done(arguments).fail(arguments), this;
          },
          then: function() {
            var n = arguments;
            return t(function(t) {
              e.each(i, function(i, o) {
                var s = e.isFunction(n[i]) && n[i];
                r[o[1]](function() {
                  var n = s && s.apply(this, arguments);
                  if (n && e.isFunction(n.promise))
                    n
                      .promise()
                      .done(t.resolve)
                      .fail(t.reject)
                      .progress(t.notify);
                  else {
                    var i = this === a ? t.promise() : this,
                      r = s ? [n] : arguments;
                    t[o[0] + "With"](i, r);
                  }
                });
              }),
                (n = null);
            }).promise();
          },
          promise: function(t) {
            return null != t ? e.extend(t, a) : a;
          }
        },
        r = {};
      return (
        e.each(i, function(e, t) {
          var n = t[2],
            s = t[3];
          (a[t[1]] = n.add),
            s &&
              n.add(
                function() {
                  o = s;
                },
                i[1 ^ e][2].disable,
                i[2][2].lock
              ),
            (r[t[0]] = function() {
              return r[t[0] + "With"](this === r ? a : this, arguments), this;
            }),
            (r[t[0] + "With"] = n.fireWith);
        }),
        a.promise(r),
        n && n.call(r, r),
        r
      );
    }
    var n = Array.prototype.slice;
    (e.when = function(i) {
      var o,
        a,
        r,
        s = n.call(arguments),
        l = s.length,
        c = 0,
        u = 1 !== l || (i && e.isFunction(i.promise)) ? l : 0,
        p = 1 === u ? i : t(),
        d = function(e, t, i) {
          return function(a) {
            (t[e] = this),
              (i[e] = arguments.length > 1 ? n.call(arguments) : a),
              i === o ? p.notifyWith(t, i) : --u || p.resolveWith(t, i);
          };
        };
      if (l > 1)
        for (o = new Array(l), a = new Array(l), r = new Array(l); l > c; ++c)
          s[c] && e.isFunction(s[c].promise)
            ? s[c]
                .promise()
                .done(d(c, r, s))
                .fail(p.reject)
                .progress(d(c, a, o))
            : --u;
      return u || p.resolveWith(r, s), p.promise();
    }),
      (e.Deferred = t);
  })(Zepto),
  (function(e) {
    function t(e) {
      return e._zid || (e._zid = d++);
    }
    function n(e, n, a, r) {
      if (((n = i(n)), n.ns)) var s = o(n.ns);
      return (g[t(e)] || []).filter(function(e) {
        return !(
          !e ||
          (n.e && e.e != n.e) ||
          (n.ns && !s.test(e.ns)) ||
          (a && t(e.fn) !== t(a)) ||
          (r && e.sel != r)
        );
      });
    }
    function i(e) {
      var t = ("" + e).split(".");
      return {
        e: t[0],
        ns: t
          .slice(1)
          .sort()
          .join(" ")
      };
    }
    function o(e) {
      return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)");
    }
    function a(e, t) {
      return (e.del && !v && e.e in T) || !!t;
    }
    function r(e) {
      return I[e] || (v && T[e]) || e;
    }
    function s(n, o, s, l, u, d, f) {
      var h = t(n),
        m = g[h] || (g[h] = []);
      o.split(/\s/).forEach(function(t) {
        if ("ready" == t) return e(document).ready(s);
        var o = i(t);
        (o.fn = s),
          (o.sel = u),
          o.e in I &&
            (s = function(t) {
              var n = t.relatedTarget;
              return !n || (n !== this && !e.contains(this, n))
                ? o.fn.apply(this, arguments)
                : void 0;
            }),
          (o.del = d);
        var h = d || s;
        (o.proxy = function(e) {
          if (((e = c(e)), !e.isImmediatePropagationStopped())) {
            e.data = l;
            var t = h.apply(n, e._args == p ? [e] : [e].concat(e._args));
            return t === !1 && (e.preventDefault(), e.stopPropagation()), t;
          }
        }),
          (o.i = m.length),
          m.push(o),
          "addEventListener" in n &&
            n.addEventListener(r(o.e), o.proxy, a(o, f));
      });
    }
    function l(e, i, o, s, l) {
      var c = t(e);
      (i || "").split(/\s/).forEach(function(t) {
        n(e, t, o, s).forEach(function(t) {
          delete g[c][t.i],
            "removeEventListener" in e &&
              e.removeEventListener(r(t.e), t.proxy, a(t, l));
        });
      });
    }
    function c(t, n) {
      return (
        (n || !t.isDefaultPrevented) &&
          (n || (n = t),
          e.each(S, function(e, i) {
            var o = n[e];
            (t[e] = function() {
              return (this[i] = w), o && o.apply(n, arguments);
            }),
              (t[i] = x);
          }),
          (n.defaultPrevented !== p
            ? n.defaultPrevented
            : "returnValue" in n
              ? n.returnValue === !1
              : n.getPreventDefault && n.getPreventDefault()) &&
            (t.isDefaultPrevented = w)),
        t
      );
    }
    function u(e) {
      var t,
        n = { originalEvent: e };
      for (t in e) A.test(t) || e[t] === p || (n[t] = e[t]);
      return c(n, e);
    }
    var p,
      d = 1,
      f = Array.prototype.slice,
      h = e.isFunction,
      m = function(e) {
        return "string" == typeof e;
      },
      g = {},
      y = {},
      v = "onfocusin" in window,
      T = { focus: "focusin", blur: "focusout" },
      I = { mouseenter: "mouseover", mouseleave: "mouseout" };
    (y.click = y.mousedown = y.mouseup = y.mousemove = "MouseEvents"),
      (e.event = { add: s, remove: l }),
      (e.proxy = function(n, i) {
        var o = 2 in arguments && f.call(arguments, 2);
        if (h(n)) {
          var a = function() {
            return n.apply(i, o ? o.concat(f.call(arguments)) : arguments);
          };
          return (a._zid = t(n)), a;
        }
        if (m(i))
          return o
            ? (o.unshift(n[i], n), e.proxy.apply(null, o))
            : e.proxy(n[i], n);
        throw new TypeError("expected function");
      }),
      (e.fn.bind = function(e, t, n) {
        return this.on(e, t, n);
      }),
      (e.fn.unbind = function(e, t) {
        return this.off(e, t);
      }),
      (e.fn.one = function(e, t, n, i) {
        return this.on(e, t, n, i, 1);
      });
    var w = function() {
        return !0;
      },
      x = function() {
        return !1;
      },
      A = /^([A-Z]|returnValue$|layer[XY]$)/,
      S = {
        preventDefault: "isDefaultPrevented",
        stopImmediatePropagation: "isImmediatePropagationStopped",
        stopPropagation: "isPropagationStopped"
      };
    (e.fn.delegate = function(e, t, n) {
      return this.on(t, e, n);
    }),
      (e.fn.undelegate = function(e, t, n) {
        return this.off(t, e, n);
      }),
      (e.fn.live = function(t, n) {
        return e(document.body).delegate(this.selector, t, n), this;
      }),
      (e.fn.die = function(t, n) {
        return e(document.body).undelegate(this.selector, t, n), this;
      }),
      (e.fn.on = function(t, n, i, o, a) {
        var r,
          c,
          d = this;
        return t && !m(t)
          ? (e.each(t, function(e, t) {
              d.on(e, n, i, t, a);
            }),
            d)
          : (m(n) || h(o) || o === !1 || ((o = i), (i = n), (n = p)),
            (o === p || i === !1) && ((o = i), (i = p)),
            o === !1 && (o = x),
            d.each(function(p, d) {
              a &&
                (r = function(e) {
                  return l(d, e.type, o), o.apply(this, arguments);
                }),
                n &&
                  (c = function(t) {
                    var i,
                      a = e(t.target)
                        .closest(n, d)
                        .get(0);
                    return a && a !== d
                      ? ((i = e.extend(u(t), {
                          currentTarget: a,
                          liveFired: d
                        })),
                        (r || o).apply(a, [i].concat(f.call(arguments, 1))))
                      : void 0;
                  }),
                s(d, t, o, i, n, c || r);
            }));
      }),
      (e.fn.off = function(t, n, i) {
        var o = this;
        return t && !m(t)
          ? (e.each(t, function(e, t) {
              o.off(e, n, t);
            }),
            o)
          : (m(n) || h(i) || i === !1 || ((i = n), (n = p)),
            i === !1 && (i = x),
            o.each(function() {
              l(this, t, i, n);
            }));
      }),
      (e.fn.trigger = function(t, n) {
        return (
          (t = m(t) || e.isPlainObject(t) ? e.Event(t) : c(t)),
          (t._args = n),
          this.each(function() {
            t.type in T && "function" == typeof this[t.type]
              ? this[t.type]()
              : "dispatchEvent" in this
                ? this.dispatchEvent(t)
                : e(this).triggerHandler(t, n);
          })
        );
      }),
      (e.fn.triggerHandler = function(t, i) {
        var o, a;
        return (
          this.each(function(r, s) {
            (o = u(m(t) ? e.Event(t) : t)),
              (o._args = i),
              (o.target = s),
              e.each(n(s, t.type || t), function(e, t) {
                return (
                  (a = t.proxy(o)),
                  o.isImmediatePropagationStopped() ? !1 : void 0
                );
              });
          }),
          a
        );
      }),
      "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error"
        .split(" ")
        .forEach(function(t) {
          e.fn[t] = function(e) {
            return 0 in arguments ? this.bind(t, e) : this.trigger(t);
          };
        }),
      (e.Event = function(e, t) {
        m(e) || ((t = e), (e = t.type));
        var n = document.createEvent(y[e] || "Events"),
          i = !0;
        if (t) for (var o in t) "bubbles" == o ? (i = !!t[o]) : (n[o] = t[o]);
        return n.initEvent(e, i, !0), c(n);
      });
  })(Zepto),
  (function(e, t) {
    function n(e) {
      return e.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase();
    }
    function i(e) {
      return o ? o + e : e.toLowerCase();
    }
    var o,
      a,
      r,
      s,
      l,
      c,
      u,
      p,
      d,
      f,
      h = "",
      m = { Webkit: "webkit", Moz: "", O: "o" },
      g = document.createElement("div"),
      y = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
      v = {};
    e.each(m, function(e, n) {
      return g.style[e + "TransitionProperty"] !== t
        ? ((h = "-" + e.toLowerCase() + "-"), (o = n), !1)
        : void 0;
    }),
      (a = h + "transform"),
      (v[(r = h + "transition-property")] = v[
        (s = h + "transition-duration")
      ] = v[(c = h + "transition-delay")] = v[
        (l = h + "transition-timing-function")
      ] = v[(u = h + "animation-name")] = v[(p = h + "animation-duration")] = v[
        (f = h + "animation-delay")
      ] = v[(d = h + "animation-timing-function")] = ""),
      (e.fx = {
        off: o === t && g.style.transitionProperty === t,
        speeds: { _default: 400, fast: 200, slow: 600 },
        cssPrefix: h,
        transitionEnd: i("TransitionEnd"),
        animationEnd: i("AnimationEnd")
      }),
      (e.fn.animate = function(n, i, o, a, r) {
        return (
          e.isFunction(i) && ((a = i), (o = t), (i = t)),
          e.isFunction(o) && ((a = o), (o = t)),
          e.isPlainObject(i) &&
            ((o = i.easing), (a = i.complete), (r = i.delay), (i = i.duration)),
          i &&
            (i =
              ("number" == typeof i
                ? i
                : e.fx.speeds[i] || e.fx.speeds._default) / 1e3),
          r && (r = parseFloat(r) / 1e3),
          this.anim(n, i, o, a, r)
        );
      }),
      (e.fn.anim = function(i, o, h, m, g) {
        var T,
          I,
          w,
          x = {},
          A = "",
          S = this,
          b = e.fx.transitionEnd,
          N = !1;
        if (
          (o === t && (o = e.fx.speeds._default / 1e3),
          g === t && (g = 0),
          e.fx.off && (o = 0),
          "string" == typeof i)
        )
          (x[u] = i),
            (x[p] = o + "s"),
            (x[f] = g + "s"),
            (x[d] = h || "linear"),
            (b = e.fx.animationEnd);
        else {
          I = [];
          for (T in i)
            y.test(T)
              ? (A += T + "(" + i[T] + ") ")
              : ((x[T] = i[T]), I.push(n(T)));
          A && ((x[a] = A), I.push(a)),
            o > 0 &&
              "object" == typeof i &&
              ((x[r] = I.join(", ")),
              (x[s] = o + "s"),
              (x[c] = g + "s"),
              (x[l] = h || "linear"));
        }
        return (
          (w = function(t) {
            if ("undefined" != typeof t) {
              if (t.target !== t.currentTarget) return;
              e(t.target).unbind(b, w);
            } else e(this).unbind(b, w);
            (N = !0), e(this).css(v), m && m.call(this);
          }),
          o > 0 &&
            (this.bind(b, w),
            setTimeout(function() {
              N || w.call(S);
            }, 1e3 * (o + g) + 25)),
          this.size() && this.get(0).clientLeft,
          this.css(x),
          0 >= o &&
            setTimeout(function() {
              S.each(function() {
                w.call(this);
              });
            }, 0),
          this
        );
      }),
      (g = null);
  })(Zepto),
  (function(e, t) {
    function n(n, i, o, a, r) {
      "function" != typeof i || r || ((r = i), (i = t));
      var s = { opacity: o };
      return (
        a && ((s.scale = a), n.css(e.fx.cssPrefix + "transform-origin", "0 0")),
        n.animate(s, i, null, r)
      );
    }
    function i(t, i, o, a) {
      return n(t, i, 0, o, function() {
        r.call(e(this)), a && a.call(this);
      });
    }
    var o = window.document,
      a = (o.documentElement, e.fn.show),
      r = e.fn.hide,
      s = e.fn.toggle;
    (e.fn.show = function(e, i) {
      return (
        a.call(this),
        e === t ? (e = 0) : this.css("opacity", 0),
        n(this, e, 1, "1,1", i)
      );
    }),
      (e.fn.hide = function(e, n) {
        return e === t ? r.call(this) : i(this, e, "0,0", n);
      }),
      (e.fn.toggle = function(n, i) {
        return n === t || "boolean" == typeof n
          ? s.call(this, n)
          : this.each(function() {
              var t = e(this);
              t["none" == t.css("display") ? "show" : "hide"](n, i);
            });
      }),
      (e.fn.fadeTo = function(e, t, i) {
        return n(this, e, t, null, i);
      }),
      (e.fn.fadeIn = function(e, t) {
        var n = this.css("opacity");
        return (
          n > 0 ? this.css("opacity", 0) : (n = 1), a.call(this).fadeTo(e, n, t)
        );
      }),
      (e.fn.fadeOut = function(e, t) {
        return i(this, e, null, t);
      }),
      (e.fn.fadeToggle = function(t, n) {
        return this.each(function() {
          var i = e(this);
          i[
            0 == i.css("opacity") || "none" == i.css("display")
              ? "fadeIn"
              : "fadeOut"
          ](t, n);
        });
      });
  })(Zepto),
  (function() {
    try {
      getComputedStyle(void 0);
    } catch (e) {
      var t = getComputedStyle;
      window.getComputedStyle = function(e) {
        try {
          return t(e);
        } catch (n) {
          return null;
        }
      };
    }
  })(),
  define("zepto", (function(e) {
    return function() {
      var t;
      return t || e.zepto;
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
          for (var t in e.data) e.url += "&" + t + "=" + e.data[t];
        e.alertMsg = e.alertMsg || "yes";
        var n = {
          url: e.url,
          type: e.method || "GET",
          contentType: "application/json",
          dataType: "json",
          timeout: e.timeout || 1e5,
          success: function(t) {
            return t
              ? t.success
                ? void (e.callback && e.callback(t))
                : void (t.message && "yes" === e.alertMsg
                    ? Tip.alert(t.message)
                    : e.callback && e.callback(t))
              : void 0;
          }
        };
        $.ajax(n);
      },
      saveAction: function(e) {
        (e.alertMsg = e.alertMsg || "yes"),
          e.url.indexOf("?") < 0 && (e.url += "?_dt=" + Math.random()),
          e.url.indexOf("_dt") < 0 && (e.url += "&_dt=" + Math.random());
        var t = {
          url: e.url,
          type: e.method || "POST",
          data: JSON.stringify(e.data),
          contentType: "application/json",
          dataType: "json",
          timeout: e.timeout || 1e5,
          success: function(t) {
            return t
              ? t.success
                ? void (e.callback && e.callback(t))
                : void (t.message && "yes" === e.alertMsg
                    ? Tip.alert(t.message)
                    : e.callback && e.callback(t))
              : void 0;
          }
        };
        $.ajax(t);
      },
      postAction: function(e) {
        (e.alertMsg = e.alertMsg || "yes"),
          e.url.indexOf("?") < 0 && (e.url += "?_dt=" + Math.random()),
          e.url.indexOf("_dt") < 0 && (e.url += "&_dt=" + Math.random());
        var t = {
          url: e.url,
          type: e.method || "POST",
          data: e.data,
          contentType: e.contentType || "application/x-www-form-urlencoded",
          dataType: "json",
          timeout: e.timeout || 1e5,
          success: function(t) {
            return t
              ? "0000" !== t.ret_code
                ? void (t.ret_msg && "yes" === e.alertMsg
                    ? Tip.alert(t.ret_msg)
                    : e.callback && e.callback(t))
                : void (e.callback && e.callback(t))
              : void 0;
          }
        };
        $.ajax(t);
      },
      getAction2: function(e) {
        if (
          (e.url.indexOf("?") < 0 && (e.url += "?_dt=" + Math.random()),
          e.url.indexOf("_dt") < 0 && (e.url += "&_dt=" + Math.random()),
          e.data)
        )
          for (var t in e.data) e.url += "&" + t + "=" + e.data[t];
        e.alertMsg = e.alertMsg || "yes";
        var n = {
          url: e.url,
          type: e.method || "GET",
          contentType: "application/json",
          dataType: "json",
          timeout: e.timeout || 1e5,
          success: function(t) {
            return t
              ? "0000" !== t.ret_code
                ? void (t.ret_msg && "yes" === e.alertMsg
                    ? Tip.alert(t.ret_msg)
                    : e.callback && e.callback(t))
                : void (e.callback && e.callback(t))
              : void 0;
          }
        };
        $.ajax(n);
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
  !(function(e, t) {
    "function" == typeof define && (define.amd || define.cmd)
      ? define("WxPlugin", [], function() {
          return t(e);
        })
      : t(e, !0);
  })(this, function(e, t) {
    function n(t, n, i) {
      e.WeixinJSBridge
        ? WeixinJSBridge.invoke(t, o(n), function(e) {
            s(t, e, i);
          })
        : u(t, i);
    }
    function i(t, n, i) {
      e.WeixinJSBridge
        ? WeixinJSBridge.on(t, function(e) {
            i && i.trigger && i.trigger(e), s(t, e, n);
          })
        : i
          ? u(t, i)
          : u(t, n);
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
    function a(e) {
      return {
        timeStamp: e.timestamp + "",
        nonceStr: e.nonceStr,
        package: e.package,
        paySign: e.paySign,
        signType: e.signType || "SHA1"
      };
    }
    function r(e) {
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
    function s(e, t, n) {
      "openEnterpriseChat" == e && (t.errCode = t.err_code),
        delete t.err_code,
        delete t.err_desc,
        delete t.err_detail;
      var i = t.errMsg;
      i || ((i = t.err_msg), delete t.err_msg, (i = l(e, i)), (t.errMsg = i)),
        (n = n || {})._complete && (n._complete(t), delete n._complete),
        (i = t.errMsg || ""),
        U.debug && !n.isInnerInvoke && alert(JSON.stringify(t));
      var o = i.indexOf(":");
      switch (i.substring(o + 1)) {
        case "ok":
          n.success && n.success(t);
          break;
        case "cancel":
          n.cancel && n.cancel(t);
          break;
        default:
          n.fail && n.fail(t);
      }
      n.complete && n.complete(t);
    }
    function l(e, t) {
      var n = e,
        i = y[n];
      i && (n = i);
      var o = "ok";
      if (t) {
        var a = t.indexOf(":");
        "confirm" == (o = t.substring(a + 1)) && (o = "ok"),
          "failed" == o && (o = "fail"),
          -1 != o.indexOf("failed_") && (o = o.substring(7)),
          -1 != o.indexOf("fail_") && (o = o.substring(5)),
          ("access denied" != (o = (o = o.replace(/_/g, " ")).toLowerCase()) &&
            "no permission to execute" != o) ||
            (o = "permission denied"),
          "config" == n && "function not exist" == o && (o = "ok"),
          "" == o && (o = "fail");
      }
      return (t = n + ":" + o);
    }
    function c(e) {
      if (e) {
        for (var t = 0, n = e.length; n > t; ++t) {
          var i = e[t],
            o = g[i];
          o && (e[t] = o);
        }
        return e;
      }
    }
    function u(e, t) {
      if (!(!U.debug || (t && t.isInnerInvoke))) {
        var n = y[e];
        n && (e = n),
          t && t._complete && delete t._complete,
          console.log('"' + e + '",', t || "");
      }
    }
    function p() {
      if (!(x || A || U.debug || "6.0.2" > O || P.systemType < 0)) {
        var e = new Image();
        (P.appId = U.appId),
          (P.initTime = E.initEndTime - E.initStartTime),
          (P.preVerifyTime = E.preVerifyEndTime - E.preVerifyStartTime),
          R.getNetworkType({
            isInnerInvoke: !0,
            success: function(t) {
              P.networkType = t.networkType;
              var n =
                "https://open.weixin.qq.com/sdk/report?v=" +
                P.version +
                "&o=" +
                P.isPreVerifyOk +
                "&s=" +
                P.systemType +
                "&c=" +
                P.clientVersion +
                "&a=" +
                P.appId +
                "&n=" +
                P.networkType +
                "&i=" +
                P.initTime +
                "&p=" +
                P.preVerifyTime +
                "&u=" +
                P.url;
              e.src = n;
            }
          });
      }
    }
    function d() {
      return new Date().getTime();
    }
    function f(t) {
      S &&
        (e.WeixinJSBridge
          ? "preInject" === v.__wxjsjs__isPreInject
            ? v.addEventListener &&
              v.addEventListener("WeixinJSBridgeReady", t, !1)
            : t()
          : v.addEventListener &&
            v.addEventListener("WeixinJSBridgeReady", t, !1));
    }
    function h() {
      R.invoke ||
        ((R.invoke = function(t, n, i) {
          e.WeixinJSBridge && WeixinJSBridge.invoke(t, o(n), i);
        }),
        (R.on = function(t, n) {
          e.WeixinJSBridge && WeixinJSBridge.on(t, n);
        }));
    }
    function m(e) {
      if ("string" == typeof e && e.length > 0) {
        var t = e.split("?")[0],
          n = e.split("?")[1];
        return (t += ".html"), void 0 !== n ? t + "?" + n : t;
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
        y = (function() {
          var e = {};
          for (var t in g) e[g[t]] = t;
          return e;
        })(),
        v = e.document,
        T = v.title,
        I = navigator.userAgent.toLowerCase(),
        w = navigator.platform.toLowerCase(),
        x = !!w.match("mac") || !!w.match("win"),
        A = -1 != I.indexOf("wxdebugger"),
        S = -1 != I.indexOf("micromessenger"),
        b = -1 != I.indexOf("android"),
        N = -1 != I.indexOf("iphone") || -1 != I.indexOf("ipad"),
        O = (function() {
          var e =
            I.match(/micromessenger\/(\d+\.\d+\.\d+)/) ||
            I.match(/micromessenger\/(\d+\.\d+)/);
          return e ? e[1] : "";
        })(),
        E = {
          initStartTime: d(),
          initEndTime: 0,
          preVerifyStartTime: 0,
          preVerifyEndTime: 0
        },
        P = {
          version: 1,
          appId: "",
          initTime: 0,
          preVerifyTime: 0,
          networkType: "",
          isPreVerifyOk: 1,
          systemType: N ? 1 : b ? 2 : -1,
          clientVersion: O,
          url: encodeURIComponent(location.href)
        },
        U = {},
        M = { _completes: [] },
        L = { state: 0, data: {} };
      f(function() {
        E.initEndTime = d();
      });
      var _ = !1,
        k = [],
        R = {
          config: function(e) {
            (U = e), u("config", e);
            var t = !1 !== U.check;
            f(function() {
              if (t)
                n(
                  g.config,
                  { verifyJsApiList: c(U.jsApiList) },
                  (function() {
                    (M._complete = function(e) {
                      (E.preVerifyEndTime = d()), (L.state = 1), (L.data = e);
                    }),
                      (M.success = function() {
                        P.isPreVerifyOk = 0;
                      }),
                      (M.fail = function(e) {
                        M._fail ? M._fail(e) : (L.state = -1);
                      });
                    var e = M._completes;
                    return (
                      e.push(function() {
                        p();
                      }),
                      (M.complete = function() {
                        for (var t = 0, n = e.length; n > t; ++t) e[t]();
                        M._completes = [];
                      }),
                      M
                    );
                  })()
                ),
                  (E.preVerifyStartTime = d());
              else {
                L.state = 1;
                for (var e = M._completes, i = 0, o = e.length; o > i; ++i)
                  e[i]();
                M._completes = [];
              }
            }),
              h();
          },
          ready: function(e) {
            0 != L.state ? e() : (M._completes.push(e), !S && U.debug && e());
          },
          error: function(e) {
            "6.0.2" > O || (-1 == L.state ? e(L.data) : (M._fail = e));
          },
          checkJsApi: function(e) {
            var t = function(e) {
              var t = e.checkResult;
              for (var n in t) {
                var i = y[n];
                i && ((t[i] = t[n]), delete t[n]);
              }
              return e;
            };
            n(
              "checkJsApi",
              { jsApiList: c(e.jsApiList) },
              ((e._complete = function(e) {
                if (b) {
                  var n = e.checkResult;
                  n && (e.checkResult = JSON.parse(n));
                }
                e = t(e);
              }),
              e)
            );
          },
          onMenuShareTimeline: function(e) {
            i(
              g.onMenuShareTimeline,
              {
                complete: function() {
                  n(
                    "shareTimeline",
                    {
                      title: e.title || T,
                      desc: e.title || T,
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
                complete: function(t) {
                  "favorite" === t.scene
                    ? n("sendAppMessage", {
                        title: e.title || T,
                        desc: e.desc || "",
                        link: e.link || location.href,
                        img_url: e.imgUrl || "",
                        type: e.type || "link",
                        data_url: e.dataUrl || ""
                      })
                    : n(
                        "sendAppMessage",
                        {
                          title: e.title || T,
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
                  n(
                    "shareQQ",
                    {
                      title: e.title || T,
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
                  n(
                    "shareWeiboApp",
                    {
                      title: e.title || T,
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
                  n(
                    "shareQZone",
                    {
                      title: e.title || T,
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
            n("startRecord", {}, e);
          },
          stopRecord: function(e) {
            n("stopRecord", {}, e);
          },
          onVoiceRecordEnd: function(e) {
            i("onVoiceRecordEnd", e);
          },
          playVoice: function(e) {
            n("playVoice", { localId: e.localId }, e);
          },
          pauseVoice: function(e) {
            n("pauseVoice", { localId: e.localId }, e);
          },
          stopVoice: function(e) {
            n("stopVoice", { localId: e.localId }, e);
          },
          onVoicePlayEnd: function(e) {
            i("onVoicePlayEnd", e);
          },
          uploadVoice: function(e) {
            n(
              "uploadVoice",
              {
                localId: e.localId,
                isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
              },
              e
            );
          },
          downloadVoice: function(e) {
            n(
              "downloadVoice",
              {
                serverId: e.serverId,
                isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
              },
              e
            );
          },
          translateVoice: function(e) {
            n(
              "translateVoice",
              {
                localId: e.localId,
                isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
              },
              e
            );
          },
          chooseImage: function(e) {
            n(
              "chooseImage",
              {
                scene: "1|2",
                count: e.count || 9,
                sizeType: e.sizeType || ["original", "compressed"],
                sourceType: e.sourceType || ["album", "camera"]
              },
              ((e._complete = function(e) {
                if (b) {
                  var t = e.localIds;
                  t && (e.localIds = JSON.parse(t));
                }
              }),
              e)
            );
          },
          getLocation: function() {},
          previewImage: function(e) {
            n(g.previewImage, { current: e.current, urls: e.urls }, e);
          },
          uploadImage: function(e) {
            n(
              "uploadImage",
              {
                localId: e.localId,
                isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
              },
              e
            );
          },
          downloadImage: function(e) {
            n(
              "downloadImage",
              {
                serverId: e.serverId,
                isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
              },
              e
            );
          },
          getLocalImgData: function(e) {
            !1 === _
              ? ((_ = !0),
                n(
                  "getLocalImgData",
                  { localId: e.localId },
                  ((e._complete = function() {
                    if (((_ = !1), k.length > 0)) {
                      var e = k.shift();
                      wx.getLocalImgData(e);
                    }
                  }),
                  e)
                ))
              : k.push(e);
          },
          getNetworkType: function(e) {
            var t = function(e) {
              var t = e.errMsg;
              e.errMsg = "getNetworkType:ok";
              var n = e.subtype;
              if ((delete e.subtype, n)) e.networkType = n;
              else {
                var i = t.indexOf(":"),
                  o = t.substring(i + 1);
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
            n(
              "getNetworkType",
              {},
              ((e._complete = function(e) {
                e = t(e);
              }),
              e)
            );
          },
          openLocation: function(e) {
            n(
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
              n(
                g.getLocation,
                { type: e.type || "wgs84" },
                ((e._complete = function(e) {
                  delete e.type;
                }),
                e)
              );
          },
          hideOptionMenu: function(e) {
            n("hideOptionMenu", {}, e);
          },
          showOptionMenu: function(e) {
            n("showOptionMenu", {}, e);
          },
          closeWindow: function(e) {
            n("closeWindow", {}, (e = e || {}));
          },
          hideMenuItems: function(e) {
            n("hideMenuItems", { menuList: e.menuList }, e);
          },
          showMenuItems: function(e) {
            n("showMenuItems", { menuList: e.menuList }, e);
          },
          hideAllNonBaseMenuItem: function(e) {
            n("hideAllNonBaseMenuItem", {}, e);
          },
          showAllNonBaseMenuItem: function(e) {
            n("showAllNonBaseMenuItem", {}, e);
          },
          scanQRCode: function(e) {
            n(
              "scanQRCode",
              {
                needResult: (e = e || {}).needResult || 0,
                scanType: e.scanType || ["qrCode", "barCode"]
              },
              ((e._complete = function(e) {
                if (N) {
                  var t = e.resultStr;
                  if (t) {
                    var n = JSON.parse(t);
                    e.resultStr = n && n.scan_code && n.scan_code.scan_result;
                  }
                }
              }),
              e)
            );
          },
          openAddress: function(e) {
            n(
              g.openAddress,
              {},
              ((e._complete = function(e) {
                e = r(e);
              }),
              e)
            );
          },
          openProductSpecificView: function(e) {
            n(
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
            for (var t = e.cardList, i = [], o = 0, a = t.length; a > o; ++o) {
              var r = t[o],
                s = { card_id: r.cardId, card_ext: r.cardExt };
              i.push(s);
            }
            n(
              g.addCard,
              { card_list: i },
              ((e._complete = function(e) {
                var t = e.card_list;
                if (t) {
                  for (var n = 0, i = (t = JSON.parse(t)).length; i > n; ++n) {
                    var o = t[n];
                    (o.cardId = o.card_id),
                      (o.cardExt = o.card_ext),
                      (o.isSuccess = !!o.is_succ),
                      delete o.card_id,
                      delete o.card_ext,
                      delete o.is_succ;
                  }
                  (e.cardList = t), delete e.card_list;
                }
              }),
              e)
            );
          },
          chooseCard: function(e) {
            n(
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
            for (var t = e.cardList, i = [], o = 0, a = t.length; a > o; ++o) {
              var r = t[o],
                s = { card_id: r.cardId, code: r.code };
              i.push(s);
            }
            n(g.openCard, { card_list: i }, e);
          },
          consumeAndShareCard: function(e) {
            n(
              g.consumeAndShareCard,
              { consumedCardId: e.cardId, consumedCode: e.code },
              e
            );
          },
          chooseWXPay: function(e) {
            n(g.chooseWXPay, a(e), e);
          },
          openEnterpriseRedPacket: function(e) {
            n(g.openEnterpriseRedPacket, a(e), e);
          },
          startSearchBeacons: function(e) {
            n(g.startSearchBeacons, { ticket: e.ticket }, e);
          },
          stopSearchBeacons: function(e) {
            n(g.stopSearchBeacons, {}, e);
          },
          onSearchBeacons: function(e) {
            i(g.onSearchBeacons, e);
          },
          openEnterpriseChat: function(e) {
            n(
              "openEnterpriseChat",
              { useridlist: e.userIds, chatname: e.groupName },
              e
            );
          },
          launchMiniProgram: function(e) {
            n(
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
                f(function() {
                  n(
                    "invokeMiniProgramAPI",
                    { name: "navigateBack", arg: { delta: e.delta || 1 } },
                    e
                  );
                });
            },
            navigateTo: function(e) {
              f(function() {
                n(
                  "invokeMiniProgramAPI",
                  { name: "navigateTo", arg: { url: e.url } },
                  e
                );
              });
            },
            redirectTo: function(e) {
              f(function() {
                n(
                  "invokeMiniProgramAPI",
                  { name: "redirectTo", arg: { url: e.url } },
                  e
                );
              });
            },
            switchTab: function(e) {
              f(function() {
                n(
                  "invokeMiniProgramAPI",
                  { name: "switchTab", arg: { url: e.url } },
                  e
                );
              });
            },
            reLaunch: function(e) {
              f(function() {
                n(
                  "invokeMiniProgramAPI",
                  { name: "reLaunch", arg: { url: e.url } },
                  e
                );
              });
            },
            postMessage: function(e) {
              f(function() {
                n(
                  "invokeMiniProgramAPI",
                  { name: "postMessage", arg: e.data || {} },
                  e
                );
              });
            },
            getEnv: function(t) {
              f(function() {
                t({ miniprogram: "miniprogram" === e.__wxjs_environment });
              });
            }
          }
        },
        C = 1,
        B = {};
      return (
        v.addEventListener(
          "error",
          function(e) {
            if (!b) {
              var t = e.target,
                n = t.tagName,
                i = t.src;
              if (
                ("IMG" == n || "VIDEO" == n || "AUDIO" == n || "SOURCE" == n) &&
                -1 != i.indexOf("wxlocalresource://")
              ) {
                e.preventDefault(), e.stopPropagation();
                var o = t["wx-id"];
                if ((o || ((o = C++), (t["wx-id"] = o)), B[o])) return;
                (B[o] = !0),
                  wx.ready(function() {
                    wx.getLocalImgData({
                      localId: i,
                      success: function(e) {
                        t.src = e.localData;
                      }
                    });
                  });
              }
            }
          },
          !0
        ),
        v.addEventListener(
          "load",
          function(e) {
            if (!b) {
              var t = e.target,
                n = t.tagName;
              if (
                (t.src,
                "IMG" == n || "VIDEO" == n || "AUDIO" == n || "SOURCE" == n)
              ) {
                var i = t["wx-id"];
                i && (B[i] = !1);
              }
            }
          },
          !0
        ),
        t && (e.wx = e.jWeixin = R),
        R
      );
    }
  }),
  define("WeixinTools", ["zepto", "WxPlugin"], function(e, t) {
    window.wx = t;
    var n = function(e) {
      (this.options = $.extend({}, { debug: !1 }, e)),
        this.options.signatureUrl && this.options.apis && this.init();
    };
    return (
      (n.prototype = {
        init: function() {
          var e = this;
          if (e.options.weixinpayOpenId) {
            var n = window.location.href;
            n.indexOf("?") < 0 && (n += "?_dx=1"),
              $.get(
                e.options.signatureUrl,
                { url: n, weixinpayOpenid: e.options.weixinpayOpenId },
                function(n) {
                  n.success &&
                    ((n = n.value),
                    t.config({
                      debug: e.options.debug,
                      appId: n.appId,
                      timestamp: n.timestamp,
                      nonceStr: n.noncestr,
                      signature: n.signature,
                      jsApiList: e.options.apis
                    }));
                }
              );
          } else
            $.get(
              e.options.signatureUrl,
              { url: window.location.href },
              function(n) {
                n.success &&
                  ((n = n.value),
                  t.config({
                    debug: e.options.debug,
                    appId: n.appId,
                    timestamp: n.timestamp,
                    nonceStr: n.noncestr,
                    signature: n.signature,
                    jsApiList: e.options.apis
                  }));
              }
            );
        },
        shareAppMessage: function(e) {
          t.onMenuShareAppMessage({
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
          t.onMenuShareTimeline({
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
          t.getLocation({
            type: "wgs84",
            success: function(t) {
              t.latitude, t.longitude, t.speed, t.accuracy;
              e && e({ lat: t.latitude, lon: t.longitude, success: !0 });
            }
          });
        }
      }),
      n
    );
  }),
  define("HeaderController", ["AjaxController", "WeixinTools"], function(e, t) {
    var n = avalon.define({
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
      init: function(t, i) {
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
            avalon.each(i, function(t, i) {
              switch (i) {
                case "double":
                  n.$double = calTimeByDouble(e);
                  break;
                case "three":
                  n.$three = calTimeByThree(e);
                  break;
                case "lotto":
                  n.$lotto = calTimeByLotto(e);
                  break;
                case "arrange3":
                  n.$arrange3 = calTimeByArrange3(e);
                  break;
                case "arrange5":
                  n.$arrange5 = calTimeByArrange5(e);
                  break;
                case "sevenStar":
                  n.$sevenStar = calTimeBySevenStar(e);
                  break;
                case "sevenJoy":
                  n.$sevenJoy = calTimeBySevenJoy(e);
                  break;
                case "xuan5":
                  n.$xuan5 = calTimeByArrange15(e);
                  break;
                case "football":
                  n.$football = {};
              }
            });
        }
        if (
          !UtilTool.isWeiXin() &&
          "APP" !== localStorage.getItem("ClientType") &&
          "local" !== localStorage.getItem("local")
        ) {
          var a = $(".not");
          return (
            $("body")
              .empty()
              .append(a.show())
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
                ? (n.hasLogin = !1)
                : null === i.value
                  ? (n.hasLogin = !1)
                  : "object" == typeof i.value &&
                    ((n.hasLogin = !0),
                    (i.value.IDNumber = i.value.iDNumber),
                    (i.value.balance = Math.max(0, i.value.balance)),
                    sessionStorage.setItem(
                      "user_info",
                      JSON.stringify(i.value)
                    ),
                    (n.userInfo = i.value),
                    (n.thumbUrl =
                      "url(" +
                      i.value.headimgurl +
                      ") no-repeat center center"),
                    n.userInfo.myShopId && (n.isAdmin = !0),
                    n.userInfo.myShopId === n.userInfo.shopId &&
                      (n.isThisShopAdmin = 1),
                    3 != n.userInfo.shopstate &&
                      n.userInfo.openid &&
                      13 === n.userInfo.openid.length &&
                      (i.value.subscribe = 1),
                    n.userInfo.nickname &&
                      n.userInfo.headimgurl &&
                      (i.value.subscribe = 1),
                    !n.userInfo.nickname &&
                      !n.userInfo.headimgurl &&
                      (i.value.subscribe = 0),
                    (n.subscribe = i.value.subscribe),
                    (n.setType = i.value.lotteryPushAction),
                    (n.placerLevel = UtilTool.getLevelByPoint(
                      n.userInfo.point,
                      n.userInfo.sex
                    )),
                    (n.placerLevelName = UtilTool.getLevelNameByPoint(
                      n.userInfo.point,
                      n.userInfo.sex
                    )),
                    o(i.value.currentTime - TIMEZONE),
                    e.ajaxAction({
                      api: APITool.user.userCollectedCount,
                      alertMsg: "no",
                      callback: function(e) {
                        e.success &&
                          (n.userInfo.userCollectedCount =
                            e.value.userCollectedCount);
                      }
                    })),
                t && t();
            }
          });
      },
      initCenter: function(t) {
        UtilTool && UtilTool.initSize(20);
        var i = { openid: localStorage.getItem("center_openid") || "" };
        e.ajaxAction({
          api: APITool.centerWeixin.whoAmIForCenterWeixinUser,
          data: i,
          alertMsg: "no",
          callback: function(e) {
            if (e.value === !1)
              return (
                (n.hasLogin = !1),
                void (location.href = "redirect_bind.html?back=21")
              );
            if (null === e.value)
              return (
                (n.hasLogin = !1),
                void (location.href = "redirect_bind.html?back=21")
              );
            if ("object" == typeof e.value) {
              if (!e.value.phoneMobile)
                return void (location.href = "redirect_bind.html?back=21");
              (n.hasLogin = !0),
                (n.userInfo = e.value),
                (n.thumbUrl =
                  "url(" + e.value.headimgurl + ") no-repeat center center");
            }
            t && t();
          }
        });
      },
      initAdmin: function(t) {
        UtilTool && UtilTool.initSize(20),
          (n.$three = calTimeByThree()),
          (n.$arrange3 = calTimeByArrange3()),
          e.ajaxAction({
            api: APITool.user.adminWhoAmI,
            alertMsg: "no",
            callback: function(e) {
              e.value === !1
                ? (n.hasLogin = !1)
                : null === e.value
                  ? (n.hasLogin = !1)
                  : "object" == typeof e.value &&
                    ((n.hasLogin = !0), (n.userInfo = e.value)),
                t && t();
            }
          });
      },
      initLLPay: function(t) {
        e.ajaxAction({
          api: APITool.llPay.getllUserInfo,
          data: { phoneMobile: n.userInfo.phoneMobile },
          callback: function(e) {
            e.success && t && t(e.value || {});
          }
        });
      },
      initLLUserInfo: function(t) {
        e.ajaxAction({
          api: APITool.user.getLianLianUserInfo,
          callback: function(e) {
            return e.success ? void (t && t(e.value || {})) : void (t && t({}));
          }
        });
      },
      initLLShopInfo: function(t) {
        e.ajaxAction({
          api: APITool.shop.getLLPayInfo,
          data: { id: Number(n.userInfo.shopId) },
          callback: function(e) {
            e.success && t && t(e.value || {});
          }
        });
      },
      forceInit: function(e) {
        n.init(e);
      },
      alertInit: function(t) {
        UtilTool && UtilTool.initSize(20),
          e.ajaxAction({
            api: APITool.user.whoAmI,
            alertMsg: "no",
            callback: function(e) {
              e.value === !1
                ? (n.hasLogin = !1)
                : null === e.value
                  ? (n.hasLogin = !1)
                  : "object" == typeof e.value &&
                    ((n.hasLogin = !0),
                    (e.value.IDNumber = e.value.iDNumber),
                    (e.value.balance = Math.max(0, e.value.balance)),
                    sessionStorage.setItem(
                      "user_info",
                      JSON.stringify(e.value)
                    ),
                    (n.userInfo = e.value),
                    (n.thumbUrl =
                      "url(" +
                      e.value.headimgurl +
                      ") no-repeat center center"),
                    n.userInfo.myShopId && (n.isAdmin = !0),
                    n.userInfo.myShopId === n.userInfo.shopId &&
                      (n.isThisShopAdmin = 1),
                    (n.subscribe = e.value.subscribe),
                    (n.setType = e.value.lotteryPushAction),
                    (n.placerLevel = UtilTool.getLevelByPoint(
                      n.userInfo.point,
                      n.userInfo.sex
                    )),
                    (n.placerLevelName = UtilTool.getLevelNameByPoint(
                      n.userInfo.point,
                      n.userInfo.sex
                    ))),
                t && t();
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
      wxInit: function(e, n, i) {
        if (!UtilTool || UtilTool.is_weixin()) {
          var o = !1;
          "1" == localStorage.getItem("debug_sdk") && (o = !0);
          var a = new t({
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
              e && (a.shareAppMessage(e), a.shareTimeline(e)),
              i && i();
          });
        }
      },
      wxInitCenter: function(e, n, i) {
        if (!UtilTool || UtilTool.is_weixin()) {
          var o = !1;
          "1" == localStorage.getItem("debug_sdk") && (o = !0);
          var a = new t({
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
              e && (a.shareAppMessage(e), a.shareTimeline(e)),
              i && i();
          });
        }
      },
      wxInitPos: function(e) {
        if (!UtilTool || UtilTool.is_weixin()) {
          var n = new t({
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
            wx.showOptionMenu(), n.getLocation(e);
          });
        }
      },
      wxInitPay: function(e) {
        if (!UtilTool || UtilTool.is_weixin()) {
          {
            new t({
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
            var n = (UtilTool.getQueryStringByName("weixinpayOpenid"),
            APITool.wxconfigPay);
            new t({
              debug: !1,
              signatureUrl: n,
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
        new t({
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
        new t({
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
      wxInitImageAndShare: function(e, n) {
        if (!UtilTool || UtilTool.is_weixin()) {
          var i = new t({
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
              n && (i.shareAppMessage(n), i.shareTimeline(n));
          });
        }
      },
      wxInitImageAndShare2: function(e, n) {
        if (!UtilTool || UtilTool.is_weixin()) {
          var i = new t({
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
              n && (i.shareAppMessage(n), i.shareTimeline(n));
          });
        }
      },
      wxInitPayAndShare: function() {
        if (!UtilTool || UtilTool.is_weixin()) {
          {
            new t({
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
    return n;
  }),
  define("JointOrderModel", [], function() {
    var e = {
        amount: "",
        code: "",
        createTime: "",
        id: "",
        appId: "",
        isWin: 0,
        isRun: 0,
        isYaoHao: 0,
        raiseQuota: 0,
        unitPrice: 0,
        extraBonus: 0,
        teamList: [],
        placerBuy: {},
        copy: "",
        memo: "",
        orderType: "",
        lotteryType: "",
        payedCopy: "",
        percentage: "",
        state: "",
        placerTradeStatus: "",
        tax: "",
        placeEndTime: "",
        placeStartTime: "",
        subscribeEndTime: "",
        lotteryTime: "",
        orderItemInfos: [],
        periods: "",
        patternSerial: "",
        thumbUrl: "",
        placerName: "",
        placerLevel: "",
        placerFans: "",
        levelName: "",
        placerImage: "",
        placerId: "",
        selfId: "",
        selfPhone: "",
        shopName: "",
        shopAddress: "",
        shopTel: "",
        serial: "",
        winCopy: "",
        percentageAmount: "",
        winMoney: "",
        fee: "",
        awardType: "",
        payedStatus: "",
        tradeStatus: "",
        type: "",
        winTotal: "",
        lotteryLuckyNums: [],
        lotteryNormalNums: [],
        isDouble: !1,
        placeType: "",
        nameText: "",
        nameText2: "",
        awardTypeText: "",
        payedStatusText: "",
        tradeStatusText: "",
        typeText: "",
        stateText: "",
        stateText2: "",
        periodsNum: "",
        periodsList: [],
        presentPeriods: "",
        runPeriodsNum: "",
        limitWinAmount: "",
        isRandom: ""
      },
      t = function(e) {
        (this.$raw = e), (this.simpleData = this.getSimpleData());
      };
    return (
      (t.prototype = {
        getSimpleData: function() {
          var t = this,
            n = { lastTime: "" };
          t.$raw.periodsList &&
            t.$raw.periodsList.length &&
            ((n.isAuto = 1),
            (t.$raw.isAuto = 1),
            (t.$raw.orderItemInfos = t.$raw.autoOrderItemInfos)),
            (t.$raw.placer = t.$raw.placer || {});
          for (var i in e)
            "orderItemInfos" !== i &&
              "autoOrderItemInfos" !== i &&
              e.hasOwnProperty(i) &&
              ((n[i] = t.$raw[i]),
              "shopName" === i
                ? ((n[i] = t.$raw.shop.serial || t.$raw.shop.nickName),
                  (n.shopId = t.$raw.shop.id))
                : "shopAddress" === i
                  ? (n[i] = t.$raw.shop.address)
                  : "shopTel" === i
                    ? (n[i] = t.$raw.shop.tel)
                    : "placerName" === i
                      ? (n[i] = t.$raw.placer.nickname)
                      : "placerLevel" === i
                        ? ((n[i] = UtilTool.getLevelByPoint(
                            t.$raw.placer.point,
                            t.$raw.placer.sex
                          )),
                          (n.placePoint = t.$raw.placer.point),
                          (n.placeSex = t.$raw.placer.sex))
                        : "placerFans" === i
                          ? (n[i] = t.$raw.placer.userCollectedCount)
                          : "placerImage" === i
                            ? (n[i] =
                                "url(" +
                                t.$raw.placer.headimgurl +
                                ") no-repeat")
                            : "placerId" === i
                              ? (n[i] = t.$raw.placer.id)
                              : "appId" === i
                                ? (n[i] = t.$raw.shop.appid)
                                : "teamList" === i
                                  ? (n[i] =
                                      t.$raw.periodsNum && t.$raw.periodsNum > 0
                                        ? t.$raw.autoOrderPlacerInfos
                                        : t.$raw.jointOrderPlacerInfos)
                                  : "isRandom" === i
                                    ? (n.autoRandomText = n[i]
                                        ? "随机追号"
                                        : "固定号码")
                                    : "periodsList" === i &&
                                      n[i] &&
                                      n[i].length &&
                                      (n.periodsAuto =
                                        n[i][0] + "-" + n[i][n[i].length - 1]));
          return (
            t.filterTextInfo(n),
            t.filterItemsInfo(n),
            t.filterTeamInfo(n),
            t.filterImageInfo(n),
            t.filterStateInfo(n),
            n
          );
        },
        filterItemsInfo: function(e) {
          var t = this,
            n = [];
          if (
            "SHUANGSEQIUDANTUO" == e.type ||
            "THREEDDANTUO" == e.type ||
            "THREEDNORMALFUSHI" == e.type ||
            "LOTTODANTUO" == e.type ||
            "ARRANGE3DANTUO" == e.type ||
            "ARRANGE3NORMALFUSHI" == e.type ||
            "ARRANGE5DANTUO" == e.type ||
            "ARRANGE5NORMALFUSHI" == e.type ||
            "SEVENJOYDANTUO" == e.type ||
            "SEVENSTARFUSHI" == e.type ||
            "ARRANGE5FUSHI" == e.type ||
            "FOOTBALLFOURTEEN" == e.type ||
            "FOOTBALLNINE" == e.type ||
            "XUAN5DANTUO" == e.type
          ) {
            var i = JSON.parse(t.$raw.detailNums);
            (e.orderItemInfos = [
              {
                listDanRed: i.listDanRed || [],
                listTuoRed: i.listTuoRed || [],
                listTuoBlue: i.listTuoBlue || [],
                listDanBlue: i.listDanBlue || [],
                listOther: i.listOther || [],
                listOther1: i.listOther1 || [],
                listOther2: i.listOther2 || [],
                listOther3: i.listOther3 || [],
                copy: i.copy || ""
              }
            ]),
              e.isWin || e.winType
                ? (e.winType =
                    e.isWin && !e.winType ? "已中奖" : e.winType || "")
                : ((e.winType = "未中奖"), (e.winCode = 0)),
              "DANTUODAN" === i.danType && (e.nameText = "胆拖单"),
              "DANTUOSHUANG" === i.danType && (e.nameText = "胆拖双"),
              "DANTUOQUAN" === i.danType && (e.nameText = "胆拖全"),
              "DANTUOFUSHI" === i.danType && (e.nameText = "直选复式"),
              e.type.indexOf("THREED") >= 0 && e.nameText.indexOf("福彩3D") < 0
                ? (e.nameText = "福彩3D【" + e.nameText + "】")
                : e.type.indexOf("ARRANGE3") >= 0 &&
                  e.nameText.indexOf("排列三") < 0 &&
                  (e.nameText = "排列三【" + e.nameText + "】");
          } else {
            var o = t.$raw.orderItemInfos || [];
            o.length
              ? ((e.orderItemInfos = []),
                (e.winCopy = 0),
                avalon.each(o, function(t, i) {
                  var o = {
                    copy: i.copy,
                    id: i.id,
                    isWin: i.isWin,
                    luckyNums: i.luckyNums || [],
                    normalNums: i.normalNums || [],
                    winCopy: i.winCopy,
                    winMoney: i.winMoney,
                    winTotal: i.winTotal,
                    winType: i.winType
                  };
                  i.isWin && (e.isWin = 1),
                    (e.winCopy += i.winCopy),
                    e.winType || (e.winType = ""),
                    o.winType && n.push(o.winType),
                    e.orderItemInfos.push(o);
                }),
                n.length && (e.winType = n.join(" ")),
                e.isWin || e.winType
                  ? (e.winCode = e.winTotal < 6e5 ? 1 : 2)
                  : ((e.winType = "未中奖"), (e.winCode = 0)))
              : (e.orderItemInfos = []);
          }
          t.initNameDetail(e);
        },
        filterTextInfo: function(e) {
          (e.awardTypeText = CONST_MAP_AwardType[e.awardType]),
            (e.payedStatusText = CONST_MAP_Pay[e.payedStatus]),
            (e.tradeStatusText = CONST_MAP_Trade[e.tradeStatus]),
            (e.typeText = CONST_MAP_Kind[e.type]),
            (e.nameText = CONST_MAP_Type[e.type]),
            (e.placeType = CONST_MAP_Place[e.type]),
            (e.isDouble =
              "SHUANGSEQIUFUSHI" === e.type ||
              "THREEDBAODIAN" === e.type ||
              "THREEDZULIU" === e.type ||
              "THREEDZUSAN" === e.type ||
              "SEVENJOYFUSHI" === e.type ||
              "SEVENSTARFUSHI" === e.type ||
              "XUANFUSHI" === e.type
                ? !0
                : !1);
        },
        initNameDetail: function(e) {
          var t = this;
          e.nameText2 = e.nameText;
          var n = t.$raw.orderItemInfos;
          if (
            ("SHUANGSEQIUFUSHI" === e.type || "SEVENJOYFUSHI" === e.type
              ? n.length &&
                (e.nameText2 =
                  "复式【" +
                  n[0].normalNums.length +
                  "+" +
                  n[0].luckyNums.length +
                  "】")
              : "SHUANGSEQIUNORMAL" === e.type || "SEVENJOYNORMAL" === e.type
                ? (e.nameText2 =
                    1 == n.length
                      ? "单选" + n[0].copy + "倍"
                      : n.length + "组号码")
                : ("SHUANGSEQIUDANTUO" === e.type ||
                    "SEVENJOYDANTUO" === e.type) &&
                  (e.nameText2 = "胆拖"),
            "LOTTOFUSHI" === e.type
              ? n.length &&
                (e.nameText2 =
                  "复式【" +
                  n[0].normalNums.length +
                  "+" +
                  n[0].luckyNums.length +
                  "】")
              : "LOTTONORMAL" === e.type
                ? (e.nameText2 =
                    1 == n.length
                      ? "单选" + n[0].copy + "倍"
                      : n.length + "组号码")
                : "LOTTODANTUO" === e.type && (e.nameText2 = "胆拖"),
            "THREEDNORMAL" === e.type)
          )
            e.nameText2 = "直选";
          else if ("THREEDBAODIAN" === e.type) e.nameText2 = "和值";
          else if ("THREEDZUSAN" === e.type) e.nameText2 = "组三";
          else if ("THREEDZULIU" === e.type) e.nameText2 = "组六";
          else if ("THREEDZULIUFUSHI" === e.type) e.nameText2 = "组六";
          else if ("THREEDZUSANNORMAL" === e.type) e.nameText2 = "组三";
          else if ("THREEDNORMALFUSHI" === e.type) e.nameText2 = "复式";
          else if (
            "THREEDDANTUO" === e.type &&
            ((e.nameText2 = "胆拖"), t.$raw.detailNums)
          ) {
            var i = JSON.parse(t.$raw.detailNums);
            (i.listDanRed && i.listDanRed.length) || (e.nameText2 = "直选复式");
          }
          if ("ARRANGE3NORMAL" === e.type) e.nameText2 = "直选";
          else if ("ARRANGE3BAODIAN" === e.type) e.nameText2 = "和值";
          else if ("ARRANGE3ZUSAN" === e.type) e.nameText2 = "组三";
          else if ("ARRANGE3ZULIU" === e.type) e.nameText2 = "组六";
          else if ("ARRANGE3ZULIUFUSHI" === e.type) e.nameText2 = "组六";
          else if ("ARRANGE3ZUSANNORMAL" === e.type) e.nameText2 = "组三";
          else if ("ARRANGE3NORMALFUSHI" === e.type) e.nameText2 = "复式";
          else if (
            "ARRANGE3DANTUO" === e.type &&
            ((e.nameText2 = "胆拖"), t.$raw.detailNums)
          ) {
            var i = JSON.parse(t.$raw.detailNums);
            (i.listDanRed && i.listDanRed.length) || (e.nameText2 = "直选复式");
          }
          "ARRANGE5NORMAL" === e.type
            ? (e.nameText2 = "直选")
            : "ARRANGE5NORMALFUSHI" === e.type && (e.nameText2 = "复式"),
            "XUAN5NORMAL" === e.type
              ? (e.nameText2 = "直选")
              : "XUAN5DANTUO" === e.type
                ? (e.nameText2 = "胆拖")
                : "XUAN5FUSHI" === e.type && (e.nameText2 = "复式"),
            "SEVENSTARNORMAL" === e.type
              ? (e.nameText2 = "直选")
              : "SEVENSTARFUSHI" === e.type && (e.nameText2 = "复式");
        },
        filterTeamInfo: function(e) {
          e.placerBuy = {};
          for (
            var t = e.teamList || [],
              n = [],
              i = [],
              o = [],
              a = [],
              r = [],
              s = [],
              l = 0;
            l < t.length;
            l++
          )
            e.isAuto && (t[l].placer = t[l].user),
              "PAYED" === t[l].payedStatus
                ? o.push(t[l])
                : "PAYING" === t[l].payedStatus
                  ? a.push(t[l])
                  : "REFUNDED" === t[l].payedStatus
                    ? r.push(t[l])
                    : "UNPAYED" === t[l].payedStatus && s.push(t[l]);
          e.winFee =
            e.winTotal >= 1e6 ? Number((0.003 * e.winTotal).toFixed(0)) : 0;
          for (var c = [], u = [], p = [], l = 0; l < o.length; l++) {
            for (var d = 0, f = 0; f < c.length; f++)
              (c[f].placer.id == o[l].placer.id ||
                (c[f].placer.phoneMobile &&
                  c[f].placer.phoneMobile == o[l].placer.phoneMobile)) &&
                ((c[f].amount += o[l].amount),
                (c[f].fee += o[l].fee),
                (c[f].winTotal += o[l].winTotal),
                (c[f].extraBonus += o[l].extraBonus),
                (c[f].copy += o[l].copy),
                (d = 1));
            d || c.push(o[l]);
          }
          for (var l = 0; l < a.length; l++) {
            for (var d = 0, f = 0; f < u.length; f++)
              (u[f].placer.id == a[l].placer.id ||
                (u[f].placer.phoneMobile &&
                  u[f].placer.phoneMobile == a[l].placer.phoneMobile)) &&
                ((u[f].amount += a[l].amount),
                (u[f].fee += a[l].fee),
                (u[f].winTotal += a[l].winTotal),
                (u[f].extraBonus += a[l].extraBonus),
                (u[f].copy += a[l].copy),
                (d = 1));
            d || u.push(a[l]);
          }
          for (var l = 0; l < r.length; l++) {
            for (var d = 0, f = 0; f < p.length; f++)
              (p[f].placer.id == r[l].placer.id ||
                (p[f].placer.phoneMobile &&
                  p[f].placer.phoneMobile == r[l].placer.phoneMobile)) &&
                ((p[f].amount += r[l].amount),
                (p[f].fee += r[l].fee),
                (p[f].winTotal += r[l].winTotal),
                (p[f].extraBonus += r[l].extraBonus),
                (p[f].copy += r[l].copy),
                (d = 1));
            d || p.push(r[l]);
          }
          if (
            (avalon.each(c, function(t, i) {
              (i.placer.id == e.selfId ||
                (i.placer.phoneMobile &&
                  i.placer.phoneMobile == e.selfPhone)) &&
                ((e.placerBuy = {
                  placerImage:
                    "url(" + i.placer.headimgurl + ") no-repeat center center",
                  placerName:
                    i.placer.nickname ||
                    UtilTool.hidePhone(i.placer.phoneMobile),
                  placerId: i.placer.id,
                  payedStatus: i.payedStatus,
                  amount: i.amount,
                  fee: i.fee,
                  winTotal: i.winTotal,
                  extraBonus: i.extraBonus,
                  copy: i.copy,
                  level: UtilTool.getLevelByPoint(i.placer.point, i.placer.sex)
                }),
                (e.unitPrice = i.amount / i.copy)),
                n.push({
                  placerImage: i.placer.headimgurl
                    ? "url(" + i.placer.headimgurl + ") no-repeat center center"
                    : "",
                  amount: i.amount,
                  placerName:
                    i.placer.nickname ||
                    UtilTool.hidePhone(i.placer.phoneMobile),
                  placerId: i.placer.id,
                  payedStatus: i.payedStatus,
                  fee: i.fee,
                  winTotal: i.winTotal,
                  extraBonus: i.extraBonus,
                  copy: i.copy,
                  level: UtilTool.getLevelByPoint(i.placer.point, i.placer.sex)
                }),
                (e.unitPrice = i.amount / i.copy);
            }),
            avalon.each(p, function(t, n) {
              n.placer.id == e.selfId &&
                ((e.placerRefund = {
                  placerImage:
                    "url(" + n.placer.headimgurl + ") no-repeat center center",
                  placerName:
                    n.placer.nickname ||
                    UtilTool.hidePhone(n.placer.phoneMobile),
                  placerId: n.placer.id,
                  payedStatus: n.payedStatus,
                  refundAmount: n.amount,
                  amount: 0,
                  fee: n.fee,
                  winTotal: n.winTotal,
                  extraBonus: n.extraBonus,
                  copy: n.copy,
                  level: UtilTool.getLevelByPoint(n.placer.point, n.placer.sex)
                }),
                e.placerBuy.placerId || (e.placerBuy = e.placerRefund),
                (e.unitPrice = n.amount / n.copy)),
                i.push({
                  placerImage: n.placer.headimgurl
                    ? "url(" + n.placer.headimgurl + ") no-repeat center center"
                    : "",
                  amount: n.amount,
                  placerName:
                    n.placer.nickname ||
                    UtilTool.hidePhone(n.placer.phoneMobile),
                  placerId: n.placer.id,
                  payedStatus: n.payedStatus,
                  fee: n.fee,
                  winTotal: n.winTotal,
                  extraBonus: n.extraBonus,
                  copy: n.copy,
                  level: UtilTool.getLevelByPoint(n.placer.point, n.placer.sex)
                }),
                (e.unitPrice = n.amount / n.copy);
            }),
            "REFUNDED" === e.payedStatus
              ? ((n = i),
                avalon.each(p, function(t, n) {
                  n.placer.id == e.selfId &&
                    ((e.placerBuy = e.placerBuy || {}),
                    (e.placerBuy.refundAmount = n.amount));
                }))
              : e.placerBuy.placerId
                ? (avalon.each(u, function(t, n) {
                    n.placer.id == e.selfId &&
                      (e.placerBuy.payingAmount = n.amount);
                  }),
                  avalon.each(p, function(t, n) {
                    n.placer.id == e.selfId &&
                      (e.placerBuy.refundAmount = n.amount);
                  }))
                : (avalon.each(u, function(t, n) {
                    n.placer.id == e.selfId &&
                      (e.placerBuy = {
                        placerImage:
                          "url(" +
                          n.placer.headimgurl +
                          ") no-repeat center center",
                        placerName:
                          n.placer.nickname ||
                          UtilTool.hidePhone(n.placer.phoneMobile),
                        placerId: n.placer.id,
                        payedStatus: n.payedStatus,
                        amount: 0,
                        payingAmount: n.amount,
                        fee: n.fee,
                        winTotal: n.winTotal,
                        extraBonus: n.extraBonus,
                        copy: n.copy,
                        level: UtilTool.getLevelByPoint(
                          n.placer.point,
                          n.placer.sex
                        )
                      });
                  }),
                  e.placerBuy.placerId
                    ? avalon.each(p, function(t, n) {
                        n.placer.id == e.selfId &&
                          (e.placerBuy.refundAmount = n.amount);
                      })
                    : avalon.each(p, function(t, n) {
                        n.placer.id == e.selfId &&
                          (e.placerBuy = {
                            placerImage:
                              "url(" +
                              n.placer.headimgurl +
                              ") no-repeat center center",
                            placerName:
                              n.placer.nickname ||
                              UtilTool.hidePhone(n.placer.phoneMobile),
                            placerId: n.placer.id,
                            payedStatus: n.payedStatus,
                            amount: 0,
                            refundAmount: n.amount,
                            fee: n.fee,
                            winTotal: n.winTotal,
                            extraBonus: n.extraBonus,
                            copy: n.copy,
                            level: UtilTool.getLevelByPoint(
                              n.placer.point,
                              n.placer.sex
                            )
                          });
                      })),
            s.length)
          ) {
            var h = s[0];
            (e.unPay = {
              id: h.id,
              placerImage:
                "url(" + h.placer.headimgurl + ") no-repeat center center",
              placerName: h.placer.nickname,
              placerId: h.placer.id,
              payedStatus: h.payedStatus,
              amount: h.amount,
              fee: h.fee,
              winTotal: h.winTotal,
              extraBonus: h.extraBonus,
              copy: h.copy,
              level: UtilTool.getLevelByPoint(h.placer.point, h.placer.sex)
            }),
              (e.unitPrice = h.amount / h.copy);
          }
          (e.teamList = n), e.isAuto && (e.unitPrice = e.amount / e.copy);
        },
        filterImageInfo: function(e) {
          e.patternSerial && (e.thumbUrl = APITool.thumbUrl(e.patternSerial));
        },
        filterStateInfo: function(e) {
          var t = this;
          e.isAuto && (e.isRun = t.$raw.runPeriodsNum || 0),
            "UNPAYED" === e.payedStatus &&
              0 == e.isRun &&
              ((e.stateText = "进行中"), (e.stateText2 = "进行中")),
            "PAYED" === e.payedStatus &&
              0 == e.isRun &&
              ("UNPRINT" === e.tradeStatus || "PRINTERROR" === e.tradeStatus) &&
              ((e.stateText = "等待打票"), (e.stateText2 = "等待打票")),
            0 == e.isRun &&
              "PRINTED" === e.tradeStatus &&
              ((e.stateText = "等待开奖"), (e.stateText2 = "等待开奖")),
            0 == e.isRun &&
              "PRINTCONFIRM" === e.tradeStatus &&
              ((e.stateText = "等待开奖"), (e.stateText2 = "等待开奖")),
            1 == e.isWin &&
              "WAITYIELD" === e.tradeStatus &&
              ((e.stateText = "兑奖中"), (e.stateText2 = "兑奖中")),
            1 == e.isWin &&
              ("YIELDED" === e.tradeStatus ||
                "YIELDCONFIRM" === e.tradeStatus) &&
              ((e.stateText = "已兑奖"), (e.stateText2 = "已兑奖")),
            1 == e.isRun &&
              0 == e.isWin &&
              "PAYED" === e.payedStatus &&
              ((e.stateText = "未中奖"), (e.stateText2 = "未中奖")),
            "REFUNDED" === e.payedStatus &&
              ((e.stateText = "合买失败"),
              (e.stateText2 =
                e.payedCopy >= e.copy && !e.thumbUrl
                  ? "未打票"
                  : "PRINTERROR" === e.tradeStatus
                    ? "出票错误"
                    : "未凑齐")),
            "UNPAYED" === e.payedStatus &&
              1 == e.isRun &&
              ((e.stateText = "合买失败"), (e.stateText2 = "未凑齐"));
        },
        initTimer: function(e) {
          function t(e) {
            var t = "",
              n = "",
              i = "";
            return (
              (t = Math.floor(e / 3600)),
              (n = Math.floor((e - 3600 * t) / 60)),
              (i = Math.floor(e - 3600 * t - 60 * n)),
              10 > t && (t = "0" + t),
              10 > n && (n = "0" + n),
              10 > i && (i = "0" + i),
              t + ":" + n + ":" + i
            );
          }
          e.isAuto && (e.periods = e.presentPeriods);
          var n = UtilTool.getEndTimeByLottery(e.lotteryType, e.periods);
          if (
            ("FOOTBALL" === e.lotteryType && (n = e.subscribeEndTime || 0),
            console.log(n),
            0 >= n)
          )
            return void (e.lastTime = "00:00:00");
          n -= Number(new Date());
          var i = setInterval(function() {
            (n -= 1e3),
              n > 0
                ? (e.lastTime = t(n / 1e3))
                : ((e.lastTime = "00:00:00"), clearInterval(i), (i = null));
          }, 1e3);
        }
      }),
      t
    );
  }),
  require(["HeaderController", "AjaxController", "JointOrderModel"], function(
    e,
    t,
    n
  ) {
    function i() {
      e.init(function() {
        return (
          e.hasLogin && a && e.userInfo.shopId != a && (e.hasLogin = !1),
          (o.loading = 0),
          !e.hasLogin && a
            ? ((o.phone = localStorage.getItem("phone") || ""),
              (o.shop.id = a),
              (o.shopId = a),
              o.phone && a
                ? o.loginByPhone()
                : ((o.vis2 = 1),
                  (location.href =
                    "redirect_login.html?from=" +
                    encodeURIComponent(location.href) +
                    "&sid=" +
                    a)),
              void 0)
            : ((o.vis2 = 0),
              (o.selfId = e.userInfo.shopId),
              (o.shopId = e.userInfo.shopId),
              (o.shopName = e.userInfo.shopSerial || e.userInfo.shopName),
              (o.shopType = e.userInfo.shopType),
              o.init(),
              (e.userInfo.shopAddress.indexOf("江苏省") >= 0 ||
                e.userInfo.shopAddress.indexOf("浙江省") >= 0 ||
                e.userInfo.shopAddress.indexOf("安徽省") >= 0 ||
                e.userInfo.shopAddress.indexOf("福建省") >= 0 ||
                e.userInfo.shopAddress.indexOf("江西省") >= 0 ||
                e.userInfo.shopAddress.indexOf("上海市") >= 0) &&
                (o.showXuan5 = 1),
              o.initShareHandler(),
              o.initAgent(),
              o.initRefuseInfo(),
              (o.fromUrl =
                "index2" === UtilTool.getQueryStringByName("from")
                  ? "index2.html"
                  : "BOTH" === e.userInfo.shopType
                    ? null
                    : "FUCAI" === e.userInfo.shopType
                      ? "index.html"
                      : "TICAI" === e.userInfo.shopType
                        ? "index2.html"
                        : "index.html"),
              UtilTool.initScrollEvent2(o),
              void 0)
        );
      });
    }
    var o = avalon.define({
      $id: "ShopTogetherController",
      list: [],
      page: 1,
      totalPages: 0,
      limit: 10,
      page2: 1,
      totalPages2: 0,
      limit2: 30,
      shopName: "",
      selfId: "",
      shopType: "",
      lotteryType: "",
      lotteryType2: "",
      showXuan5: 0,
      noteHandler: function() {
        location.href = "https://c42352.818tu.com/referrals/index/1475306";
      },
      initShare: 0,
      initSwiper: function() {
        new Swiper(".swiper-container", { autoplay: 4e3, speed: 500 });
      },
      appLinkHandler: function() {
        location.href = "applink.html?auth=no";
      },
      hbHandler: function() {
        location.href = "applink.html?auth=no";
      },
      listHandler: function() {
        if (2 === o.tt) return void o.listAutoHandler();
        var e = {
          start: (o.page - 1) * o.limit,
          limit: o.limit,
          shopId: o.selfId,
          state: 0
        };
        o.lotteryType && (e.lotteryType = o.lotteryType),
          ("FOOTBALLFOURTEEN" === e.lotteryType ||
            "FOOTBALLNINE" === e.lotteryType) &&
            (e.lotteryType = "FOOTBALL"),
          t.ajaxAction({
            api: APITool.jointOrder.getUnPayedList,
            data: e,
            callback: function(e) {
              if (e.list && e.list.length) {
                var t = [];
                avalon.each(e.list, function(e, i) {
                  var o = new n(i);
                  t.push(o);
                }),
                  o.list.pushArray(t),
                  avalon.each(o.list, function(e, n) {
                    e >= o.list.length - t.length &&
                      (function(e, t) {
                        e.initTimer(t);
                      })(n, n.simpleData);
                  }),
                  (o.totalPages = Math.ceil(e.total / o.limit));
              }
            }
          });
      },
      listAutoHandler: function() {
        var e = {
          start: (o.page2 - 1) * o.limit2,
          limit: o.limit2,
          shopId: o.selfId,
          state: 0
        };
        o.lotteryType2 && (e.lotteryType = o.lotteryType2),
          t.ajaxAction({
            api: APITool.autoOrder.getUnPayedList,
            data: e,
            callback: function(e) {
              if (((o.initAuto = 1), e.list && e.list.length)) {
                var t = [];
                avalon.each(e.list, function(e, i) {
                  var o = new n(i);
                  t.push(o);
                }),
                  o.list2.pushArray(t),
                  avalon.each(o.list2, function(e, n) {
                    e >= o.list.length - t.length &&
                      (function(e, t) {
                        e.initTimer(t);
                      })(n, n.simpleData);
                  }),
                  (o.totalPages2 = Math.ceil(e.total / o.limit2));
              }
            }
          });
      },
      tabHandler: function(e) {
        (o.lotteryType = e), (o.page = 1), o.list.clear(), o.listHandler();
      },
      tabHandler2: function(e) {
        (o.lotteryType2 = e),
          (o.page2 = 1),
          o.list2.clear(),
          o.listAutoHandler();
      },
      $sharePd: null,
      fromUrl: "",
      showMenu: 0,
      menuHandler: function() {
        o.showMenu = o.showMenu ? 0 : 1;
      },
      linkHandler: function(t) {
        location.href =
          "wx" == o.client
            ? SHARE_HOST_URL +
              "?id=7_" +
              t.simpleData.serial +
              "&appid=" +
              e.userInfo.appid
            : "/lottery/buy_together_detail.html?serial" +
              t.simpleData.serial +
              "&sid=" +
              o.shop.id;
      },
      init: function() {
        o.listHandler(), o.initSwiper();
      },
      initShareHandler: function() {
        t.ajaxAction({
          api: APITool.shop.getInfo,
          data: { id: Number(e.userInfo.shopId) },
          callback: function(t) {
            if (t.success) {
              if (t.value.logoImageSerial) {
                var n = APITool.thumbUrl(t.value.logoImageSerial);
                (t.value.thumbUrl = "url(" + n + ") no-repeat center center"),
                  (t.value.imgUrl = n);
              }
              var i = t.value;
              (o.shopMemoName = t.value.memoName),
                (o.shopName = t.value.nickName || o.row.serial),
                (o.shopAddress = t.value.address),
                (o.shopLogo = t.value.thumbUrl);
              var a = {
                desc:
                  "买彩票 交朋友，彩友多助您合力赢大奖!方案由" +
                  i.memoName +
                  "的【" +
                  (i.nickName || i.serial) +
                  "】站出票",
                imgUrl: APITool.thumbUrl(i.logoImageSerial),
                link: SHARE_HOST_URL + "?id=8&appid=" + e.userInfo.appid,
                title:
                  "" + i.memoName + "的【合买社区】新方案出炉了！正在抢购中..."
              };
              3 == e.userInfo.shopstate
                ? ((a.link = SHARECENTER_HOST_URL + "?state=43_" + i.id),
                  e.userInfo.shopAgentInfo &&
                    2 === e.userInfo.shopAgentInfo.state &&
                    (a.link =
                      SHARECENTER_HOST_URL4 +
                      "?state=43_" +
                      i.id +
                      "_" +
                      e.userInfo.id),
                  e.wxInitCenter(a))
                : ((a.link = SHARE_HOST_URL2 + "?state=43_" + i.id),
                  e.userInfo.shopAgentInfo &&
                    2 === e.userInfo.shopAgentInfo.state &&
                    (a.link =
                      SHARE_HOST_URL5 +
                      "?state=43_" +
                      i.id +
                      "_" +
                      e.userInfo.id),
                  e.wxInit(a)),
                (o.$sharePd = a),
                o.initMini(a);
            }
          }
        });
      },
      initMini: function(e) {
        setTimeout(function() {
          return wx && wx.miniProgram && wx.miniProgram.getEnv
            ? void wx.miniProgram.getEnv(function(t) {
                console.log(JSON.stringify(t)),
                  t.miniprogram && wx.miniProgram.postMessage({ data: e });
              })
            : void console.log("no wx.miniProgram.getEnv");
        }, 500);
      },
      indexHandler: function() {
        location.href =
          "BOTH" == e.userInfo.shopType
            ? "index.html"
            : "FUCAI" == e.userInfo.shopType
              ? "index.html"
              : "TICAI" == e.userInfo.shopType
                ? "index2.html"
                : "index.html";
      },
      vis2: 0,
      visAuth: 0,
      phone: "",
      code: "",
      codeText: "发送验证码",
      codeHandler: function() {
        var e = 59;
        if ("发送验证码" == o.codeText)
          return (
            (o.phone = UtilTool.trimBlank(o.phone)),
            UtilTool.validate("tel", o.phone)
              ? void t.ajaxAction({
                  api: APITool.mobile.getCode,
                  data: { phoneMobile: o.phone },
                  callback: function(t) {
                    if (t.success)
                      var n = setInterval(function() {
                        e
                          ? (e--, (o.codeText = "" + e + "秒"))
                          : (clearInterval(n), (o.codeText = "发送验证码"));
                      }, 1e3);
                  }
                })
              : void Tip.alert("请输入正确的手机号")
          );
      },
      bindHandler: function() {
        if (o.phone || o.code) {
          o.phone = UtilTool.trimBlank(o.phone);
          var n = APITool.app.login,
            i = { phoneMobile: o.phone, verifyCode: o.code };
          e.userInfo.openid
            ? (n = APITool.mobile.verifyCode)
            : (i.shopId = o.shopId),
            t.ajaxAction({
              api: n,
              data: i,
              callback: function(e) {
                e.success &&
                  (localStorage.setItem("phone", o.phone),
                  (window.location.href = UtilTool.updateUrl(
                    window.android || UtilTool.isAndroid()
                      ? window.location.href
                      : window.location.href
                  )));
              }
            });
        }
      },
      loginByPhone: function() {
        if (o.phone || o.shopId) {
          var e = APITool.app.loginByPhone,
            n = { phoneMobile: o.phone, verifyCode: "FUCK_CODE" };
          (n.shopId = o.shopId),
            t.ajaxAction({
              api: e,
              data: n,
              callback: function(e) {
                return e.success
                  ? (localStorage.setItem("phone", o.phone),
                    void (window.android || UtilTool.isAndroid()
                      ? (location.href = location.href + "&v=" + Math.random())
                      : (window.location.href = UtilTool.updateUrl(
                          window.location.href
                        ))))
                  : void (o.vis2 = 1);
              }
            });
        }
      },
      shop: {},
      shopId: "",
      client: "wx",
      hhbbHandler: function() {
        location.href =
          location.href.indexOf("caibao918.com") >= 0
            ? "https://qjf.caibao918.com/lotteryBonus/send.html?uid=" +
              e.userInfo.id
            : "http://www.inleyuan.xyz/lotteryBonus/send.html?uid=" +
              e.userInfo.id;
      },
      initAgent: function() {
        var n = UtilTool.getQueryStringByName("state");
        if (n && ((n = n.split("_")), 3 === n.length)) {
          if (Number(n[2]) === Number(e.userInfo.id)) return;
          t.ajaxAction({
            api: APITool.shopAgent.saveUserAgent,
            data: { agent: { id: n[2] }, weiXinUser: { id: e.userInfo.id } }
          });
        }
      },
      shopAddress: "",
      shopLogo: "",
      shopMemoName: "",
      isRefuse: 0,
      initRefuseInfo: function() {
        localStorage.getItem(
          "TRUST_" + e.userInfo.shopId + "_" + e.userInfo.id
        ) ||
          t.ajaxAction({
            api: APITool.llPay.doIPlaceInTheShop,
            data: { userId: e.userInfo.id },
            callback: function(t) {
              t.success &&
                (t.value
                  ? localStorage.setItem(
                      "TRUST_" + e.userInfo.shopId + "_" + e.userInfo.id,
                      1
                    )
                  : (o.isRefuse = 1));
            }
          });
      },
      refuseHandler: function(t) {
        return t
          ? void (UtilTool.isWeiXin()
              ? wx.miniProgram.getEnv(function(e) {
                  e.miniprogram
                    ? wx.miniProgram.navigateBack()
                    : wx.closeWindow();
                })
              : UtilTool.isAndroid()
                ? window.android.closeWindow()
                : window.webkit.messageHandlers.closeWindow.postMessage())
          : ((o.isRefuse = 0),
            void localStorage.setItem(
              "TRUST_" + e.userInfo.shopId + "_" + e.userInfo.id,
              1
            ));
      },
      tt: 1,
      initAuto: 0,
      ttHandler: function(e) {
        (o.tt = e), 2 === e && !o.initAuto && o.listAutoHandler();
      },
      list2: []
    });
    avalon.scan();
    var a = UtilTool.getQueryStringByName("sid"),
      r = UtilTool.isWeiXin() ? "" : "APP";
    "APP" === r && ((o.client = "app"), $(".app_link").remove());
    var s = UtilTool.getQueryStringByName("shopId") || "";
    s && (a = s),
      (window.fetchStarterInfo = function() {
        var e = o.$sharePd;
        return window.android && window.android.shareParam
          ? void window.android.shareParam(JSON.stringify(e))
          : e;
      }),
      i();
  }),
  define("controllers/ShopTogetherController", function() {});
