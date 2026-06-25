(function () {
    'use strict';

    var root = document.getElementById('hardware-demo');
    if (!root) return;

    var titleEl = document.getElementById('hw-detail-title');
    var bodyEl = document.getElementById('hw-detail-body');
    var stepEl = document.getElementById('hw-step-label');
    var tourBtn = document.getElementById('hw-tour-toggle');

    var components = [
        {
            id: 'cameras',
            title: 'Overhead IR Cameras',
            body: 'PoE-powered high-resolution IR cameras capture continuous flock behavior at barn scale, day or night.',
            duration: 3200
        },
        {
            id: 'jetson',
            title: 'Jetson Orin Nano Edge AI',
            body: 'On-prem inference classifies piling, estimates weight, and triggers intervention locally in under 500ms — no cloud round-trip required.',
            duration: 3600
        },
        {
            id: 'leds',
            title: 'Addressable LED Strips',
            body: 'Programmable LED arrays line the ceiling perimeter. Adaptive flashing patterns disperse crowded birds without habituation.',
            duration: 3200
        },
        {
            id: 'audio',
            title: 'Directional Audio Emitters',
            body: 'Speaker pairs project varying sound patterns that complement the LEDs during intervention — randomized to keep flocks responsive.',
            duration: 3200
        },
        {
            id: 'sensors',
            title: 'Environmental Sensor Array',
            body: 'Temperature, humidity, and air quality sensors at each corner stream barn conditions 24/7 into the same dashboard.',
            duration: 3200
        }
    ];

    var byId = {};
    components.forEach(function (c, i) { c.index = i; byId[c.id] = c; });

    var currentIndex = 0;
    var timer = null;
    var paused = false;
    var listButtons = root.querySelectorAll('.hw-list-btn');
    var hotspots = root.querySelectorAll('.hw-hotspot');

    function render(index) {
        var c = components[index];
        root.setAttribute('data-active', c.id);
        if (titleEl) titleEl.textContent = c.title;
        if (bodyEl) bodyEl.textContent = c.body;
        if (stepEl) stepEl.textContent = 'Step ' + (index + 1) + ' of ' + components.length;
        listButtons.forEach(function (btn) {
            btn.setAttribute('aria-selected', btn.getAttribute('data-hardware') === c.id ? 'true' : 'false');
        });
    }

    function advance() {
        currentIndex = (currentIndex + 1) % components.length;
        render(currentIndex);
        scheduleNext();
    }

    function scheduleNext() {
        clearTimeout(timer);
        if (paused) return;
        timer = setTimeout(advance, components[currentIndex].duration);
    }

    function selectById(id, opts) {
        var c = byId[id];
        if (!c) return;
        currentIndex = c.index;
        render(currentIndex);
        if (opts && opts.pause) {
            pauseTour();
        } else {
            scheduleNext();
        }
    }

    function pauseTour() {
        paused = true;
        clearTimeout(timer);
        if (tourBtn) {
            tourBtn.textContent = 'Resume tour';
            tourBtn.setAttribute('aria-pressed', 'true');
        }
    }

    function resumeTour() {
        paused = false;
        if (tourBtn) {
            tourBtn.textContent = 'Pause tour';
            tourBtn.setAttribute('aria-pressed', 'false');
        }
        scheduleNext();
    }

    hotspots.forEach(function (hot) {
        var id = hot.getAttribute('data-hardware');
        hot.addEventListener('click', function () { selectById(id, { pause: true }); });
        hot.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectById(id, { pause: true });
            }
        });
    });

    listButtons.forEach(function (btn) {
        var id = btn.getAttribute('data-hardware');
        btn.addEventListener('click', function () { selectById(id, { pause: true }); });
    });

    if (tourBtn) {
        tourBtn.addEventListener('click', function () {
            if (paused) resumeTour(); else pauseTour();
        });
    }

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReduced.matches) {
        paused = true;
        if (tourBtn) {
            tourBtn.textContent = 'Start tour';
            tourBtn.setAttribute('aria-pressed', 'true');
        }
        render(1);
        return;
    }

    render(0);
    scheduleNext();
})();
