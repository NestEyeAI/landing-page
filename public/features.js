(function () {
    'use strict';

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function moveDots(dots, positions) {
        dots.forEach(function (dot, i) {
            var pos = positions[i % positions.length];
            dot.style.setProperty('--x', pos[0] + '%');
            dot.style.setProperty('--y', pos[1] + '%');
        });
    }

    /* ---------------------------------------------------------------
       01 — Piling Detection
       Dots drift scattered, then converge into a cluster in the
       upper-right where the detection box appears (.is-piling).
       --------------------------------------------------------------- */
    (function setupDetection() {
        var vis = document.querySelector('.fvis-piling');
        if (!vis) return;
        var dots = vis.querySelectorAll('.fbird');
        if (!dots.length) return;

        // Spread across the whole floor
        var scattered = [
            [10, 24], [24, 18], [40, 12], [16, 56], [30, 48],
            [46, 40], [22, 78], [38, 72], [54, 64], [12, 40],
            [60, 22], [70, 78]
        ];
        // Bunched inside the detection-box zone (x 54-96%, y 7-56%)
        var clustered = [
            [58, 18], [66, 16], [74, 20], [82, 24],
            [60, 30], [68, 28], [76, 32], [84, 36],
            [62, 42], [70, 40], [78, 44], [64, 50]
        ];

        if (prefersReduced) {
            moveDots(dots, clustered);
            vis.classList.add('is-detected');
            return;
        }

        moveDots(dots, scattered);
        var piling = false;
        function loop() {
            piling = !piling;
            if (piling) {
                // Birds pile up first...
                moveDots(dots, clustered);
                // ...then ~1.5s later the system flags it (red box).
                setTimeout(function () {
                    if (piling) vis.classList.add('is-detected');
                }, 1500);
                setTimeout(loop, 3600);
            } else {
                // Clear the alert, then birds scatter again.
                vis.classList.remove('is-detected');
                moveDots(dots, scattered);
                setTimeout(loop, 3200);
            }
        }
        setTimeout(loop, 2200);
    })();

    /* ---------------------------------------------------------------
       02 — Piling Prevention
       Dots clustered in the center. On .is-dispersing the LED strip
       waves, the speakers ring, and dots scatter to the edges.
       --------------------------------------------------------------- */
    (function setupPrevention() {
        var vis = document.querySelector('.fvis-prevention');
        if (!vis) return;
        var dots = vis.querySelectorAll('.fbird');
        if (!dots.length) return;

        // Tight pile in the center
        var clustered = [
            [44, 42], [50, 38], [54, 44], [46, 50], [52, 52],
            [48, 46], [56, 48], [42, 48], [50, 56], [46, 40]
        ];
        // Dispersed to the edges/corners
        var dispersed = [
            [12, 22], [88, 20], [14, 80], [86, 82], [28, 16],
            [74, 16], [22, 88], [80, 88], [38, 86], [64, 90]
        ];

        if (prefersReduced) {
            moveDots(dots, clustered);
            return;
        }

        moveDots(dots, clustered);
        var dispersing = false;
        function loop() {
            dispersing = !dispersing;
            if (dispersing) {
                // Fire the LED strips + speakers first, then scatter the
                // birds ~650ms later so the cause/effect reads clearly.
                vis.classList.add('is-dispersing');
                setTimeout(function () {
                    if (dispersing) moveDots(dots, dispersed);
                }, 650);
                setTimeout(loop, 3200);
            } else {
                // Birds settle back, then the mechanism powers down.
                moveDots(dots, clustered);
                setTimeout(function () {
                    if (!dispersing) vis.classList.remove('is-dispersing');
                }, 400);
                setTimeout(loop, 2800);
            }
        }
        setTimeout(loop, 2600);
    })();
})();
