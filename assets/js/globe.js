(() => {
  'use strict';
  const image = document.querySelector('.brand-panel .globe');
  if (!image) return;
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 400 400');
  svg.setAttribute('class', 'globe rotating-globe');
  svg.setAttribute('role', 'img');
  svg.setAttribute('tabindex', '0');
  svg.setAttribute('aria-label', document.documentElement.lang === 'es'
    ? 'Globo de puntos en 3D. Arrastra o usa las flechas para girarlo.'
    : '3D dotted globe. Drag or use the arrow keys to rotate it.');
  const points = [];
  const colors = ['#ff5656', '#48bfff', '#52e58c', '#ffe35b'];
  function dot(lat, lon, marker = false) {
    const phi = lat * Math.PI / 180, theta = lon * Math.PI / 180;
    const element = document.createElementNS(ns, 'circle');
    element.setAttribute('fill', '#ffffff');
    svg.append(element);
    const pulse = marker ? {duration: 8 + Math.random() * 4, phase: 0,
      color: Math.floor(Math.random() * colors.length)} : null;
    if (pulse) pulse.phase = Math.random() * pulse.duration;
    points.push({x: Math.cos(phi) * Math.sin(theta), y: Math.sin(phi),
      z: Math.cos(phi) * Math.cos(theta), marker, pulse, element});
  }
  for (let lat = -84; lat <= 84; lat += 8) {
    const count = Math.max(8, Math.round(56 * Math.cos(lat * Math.PI / 180)));
    for (let i = 0; i < count; i++) dot(lat, i * 360 / count);
  }
  dot(25, -28, true); dot(-30, 35, true); dot(5, 68, true);
  dot(40, 145, true); dot(-20, 205, true); dot(0, 265, true);
  image.replaceWith(svg);
  let angle = 0, tilt = -0.12, dragging = false, lastX = 0, lastY = 0;
  let lastTime = 0, frame = 0;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  function render() {
    const cos = Math.cos(angle), sin = Math.sin(angle);
    const ct = Math.cos(tilt), st = Math.sin(tilt);
    for (const point of points) {
      const x = point.x * cos + point.z * sin;
      const z = point.z * cos - point.x * sin;
      const y = point.y * ct - z * st, depth = point.y * st + z * ct;
      const perspective = 3.8 / (3.8 - depth * 0.18);
      point.element.setAttribute('cx', (200 + 168 * x * perspective).toFixed(2));
      point.element.setAttribute('cy', (200 + 168 * y * perspective).toFixed(2));
      point.element.setAttribute('r', ((point.marker ? 7 : 2.1) * perspective).toFixed(2));
      point.element.setAttribute('visibility', depth < 0 ? 'hidden' : 'visible');
      if (point.pulse) {
        point.element.setAttribute('fill', colors[point.pulse.color]);
        const opacity = motion.matches ? 1
          : Math.sin(Math.PI * point.pulse.phase / point.pulse.duration) ** 2;
        point.element.setAttribute('opacity', opacity.toFixed(3));
      }
    }
  }
  function tick(time) {
    frame = 0;
    if (document.hidden || motion.matches) return;
    const elapsed = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
    lastTime = time;
    if (!dragging) angle += elapsed * 0.12;
    for (const point of points) {
      if (!point.pulse) continue;
      point.pulse.phase += elapsed;
      if (point.pulse.phase >= point.pulse.duration) {
        point.pulse.phase %= point.pulse.duration;
        // Pick a different color while the marker is fully faded out.
        point.pulse.color = (point.pulse.color + 1 + Math.floor(Math.random() * 3)) % colors.length;
      }
    }
    render();
    frame = requestAnimationFrame(tick);
  }
  function resume() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0; lastTime = 0;
    if (!document.hidden && !motion.matches) frame = requestAnimationFrame(tick);
    else render();
  }
  svg.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    dragging = true; lastX = event.clientX; lastY = event.clientY;
    svg.setPointerCapture(event.pointerId);
  });
  svg.addEventListener('pointermove', event => {
    if (!dragging) return;
    angle += (event.clientX - lastX) * 0.007;
    tilt = Math.max(-0.65, Math.min(0.65, tilt + (event.clientY - lastY) * 0.004));
    lastX = event.clientX; lastY = event.clientY; render();
  });
  svg.addEventListener('lostpointercapture', () => { dragging = false; });
  svg.addEventListener('pointerup', () => { dragging = false; });
  svg.addEventListener('pointercancel', () => { dragging = false; });
  svg.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'ArrowLeft') angle -= 0.12;
    if (event.key === 'ArrowRight') angle += 0.12;
    if (event.key === 'ArrowUp') tilt = Math.max(-0.65, tilt - 0.08);
    if (event.key === 'ArrowDown') tilt = Math.min(0.65, tilt + 0.08);
    render();
  });
  document.addEventListener('visibilitychange', resume);
  motion.addEventListener('change', resume);
  render(); resume();
})();

