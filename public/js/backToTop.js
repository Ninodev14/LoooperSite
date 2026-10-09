(function () {
  function noAnimation() {
    var chk = document.getElementById('chkNoAnimation');
    return (
      document.body.classList.contains('no-animation') ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !!(chk && chk.checked)
    );
  }

  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn || btn.dataset.ready) return;
    btn.dataset.ready = '1';

    var SHOW_AFTER = 400;
    var scroller = null;

    function getY() {
      return Math.max(
        window.scrollY,
        document.documentElement.scrollTop,
        document.body.scrollTop,
        scroller ? scroller.scrollTop : 0
      );
    }

    function update() {
      btn.classList.toggle('is-visible', getY() > SHOW_AFTER);
    }

    document.addEventListener(
      'scroll',
      function (e) {
        var t = e.target;
        if (
          t instanceof Element &&
          !t.closest('.modal') &&
          t.clientHeight >= window.innerHeight * 0.9
        ) {
          scroller = t;
        }
        update();
      },
      { passive: true, capture: true }
    );

    window.addEventListener('resize', update);
    update();

    btn.addEventListener('click', function () {
      var opts = { top: 0, behavior: noAnimation() ? 'auto' : 'smooth' };

      window.scrollTo(opts);
      if (document.documentElement.scrollTo) document.documentElement.scrollTo(opts);
      if (document.body.scrollTo) document.body.scrollTo(opts);
      if (scroller && scroller.scrollTo) scroller.scrollTo(opts);
    });
  }

  initBackToTop();
  document.addEventListener('astro:page-load', initBackToTop);
})();