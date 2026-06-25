(function () {
    'use strict';

    var demo = document.getElementById('hero-demo');
    if (!demo) return;

    var birds = demo.querySelectorAll('.bird');
    var statusEl = document.getElementById('demo-status');
    var stepEl = document.getElementById('demo-step');
    var phaseLabelEl = document.getElementById('demo-phase-label');
    var tempEl = document.getElementById('demo-temp');
    var humidityEl = document.getElementById('demo-humidity');
    var apEl = document.getElementById('demo-ap');
    var latencyEl = document.getElementById('demo-latency');

    // Add aria-live for screen readers
    if (statusEl) statusEl.setAttribute('aria-live', 'polite');

    var scattered = [
        [12, 15], [28, 22], [45, 10], [62, 30], [78, 18], [88, 35],
        [15, 50], [35, 55], [50, 45], [70, 60], [85, 52],
        [20, 75], [40, 80], [55, 70], [72, 82], [90, 72],
        [8, 38], [52, 88], [30, 40], [65, 48]
    ];

    var clustered = [
        [22, 30], [26, 34], [30, 28], [24, 38], [28, 42], [32, 36],
        [20, 36], [34, 32], [26, 26], [30, 40], [22, 44],
        [28, 48], [24, 32], [32, 28], [20, 40], [34, 44],
        [26, 38], [30, 34], [22, 28], [28, 36]
    ];

    var dispersing = [
        [10, 20], [20, 12], [38, 8], [55, 22], [72, 14], [85, 28],
        [12, 48], [30, 58], [48, 42], [65, 55], [82, 48],
        [18, 72], [38, 78], [52, 65], [70, 78], [88, 68],
        [6, 35], [48, 85], [25, 45], [60, 42]
    ];

    var phases = [
        {
            name: 'monitoring',
            duration: 3000,
            positions: scattered,
            status: 'Monitoring',
            step: 'All systems nominal',
            phaseLabel: 'Step 1: Monitor',
            temp: '72°F',
            humidity: '65%',
            ap: '0.998',
            latency: '< 500ms'
        },
        {
            name: 'piling',
            duration: 2500,
            positions: clustered,
            status: 'Piling detected',
            step: 'Confidence: 0.998',
            phaseLabel: 'Step 2: Detect',
            temp: '74°F',
            humidity: '68%',
            ap: '0.998',
            latency: '47ms'
        },
        {
            name: 'classify',
            duration: 2000,
            positions: clustered,
            status: 'Classifying...',
            step: 'Edge AI processing locally',
            phaseLabel: 'Step 2: Classify',
            temp: '74°F',
            humidity: '68%',
            ap: '0.998',
            latency: '312ms'
        },
        {
            name: 'intervene',
            duration: 2500,
            positions: dispersing,
            status: 'Intervention',
            step: 'LEDs + audio active',
            phaseLabel: 'Step 3: Intervene',
            temp: '74°F',
            humidity: '67%',
            ap: '0.998',
            latency: '489ms'
        },
        {
            name: 'resolved',
            duration: 2500,
            positions: scattered,
            status: 'All clear',
            step: 'Flock dispersed — resuming monitoring',
            phaseLabel: 'Step 4: Resolved',
            temp: '73°F',
            humidity: '66%',
            ap: '0.998',
            latency: '< 500ms'
        }
    ];

    var currentPhase = 0;
    var timer = null;

    function moveBirds(positions) {
        birds.forEach(function (bird, i) {
            var pos = positions[i % positions.length];
            bird.style.setProperty('--x', pos[0] + '%');
            bird.style.setProperty('--y', pos[1] + '%');
        });
    }

    function setPhase(index) {
        var phase = phases[index];
        demo.setAttribute('data-phase', phase.name);
        moveBirds(phase.positions);
        if (statusEl) statusEl.textContent = phase.status;
        if (stepEl) stepEl.textContent = phase.step;
        if (phaseLabelEl) phaseLabelEl.textContent = phase.phaseLabel;
        if (tempEl) tempEl.textContent = phase.temp;
        if (humidityEl) humidityEl.textContent = phase.humidity;
        if (apEl) apEl.textContent = phase.ap;
        if (latencyEl) latencyEl.textContent = phase.latency;
    }

    function advance() {
        currentPhase = (currentPhase + 1) % phases.length;
        setPhase(currentPhase);
        timer = setTimeout(advance, phases[currentPhase].duration);
    }

    function start() {
        setPhase(0);
        timer = setTimeout(advance, phases[0].duration);
    }

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReduced.matches) {
        setPhase(4);
        return;
    }

    prefersReduced.addEventListener('change', function (e) {
        if (e.matches) {
            clearTimeout(timer);
            setPhase(4);
        } else {
            start();
        }
    });

    start();
})();
