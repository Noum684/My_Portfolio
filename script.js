(function () {
    var root = document.documentElement; root.classList.add('js');
    document.getElementById('theme').addEventListener('click', function () {
        var dark = root.getAttribute('data-theme') === 'dark' || (!root.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
        root.setAttribute('data-theme', dark ? 'light' : 'dark');
    });
    var fb = document.querySelectorAll('.filters button'), items = document.querySelectorAll('#list li');
    fb.forEach(function (b) {
        b.addEventListener('click', function () {
            fb.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false') });
            items.forEach(function (li) { li.hidden = !(b.dataset.f === 'all' || li.dataset.t === b.dataset.f) });
        })
    });
    var els = document.querySelectorAll('.rv');
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }) }, { threshold: .08 });
        els.forEach(function (el) { io.observe(el) });
    } else { els.forEach(function (el) { el.classList.add('in') }) }
    var copy = document.getElementById('copy'), mail = document.getElementById('mail');
    function sel() { var r = document.createRange(); r.selectNodeContents(mail); var s = getSelection(); s.removeAllRanges(); s.addRange(r) }
    copy.addEventListener('click', function () {
        function done(t) { copy.textContent = t; setTimeout(function () { copy.textContent = "Copier l'adresse" }, 1800) }
        try { navigator.clipboard.writeText(mail.textContent).then(function () { done('Adresse copiée') }, function () { sel(); done('Adresse sélectionnée') }) } catch (e) { sel(); done('Adresse sélectionnée') }
    });
})();