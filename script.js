document.addEventListener('DOMContentLoaded', function () {
  // ============================================
  // ILLUSION 1: Vortex Tunnel
  // ============================================
  const vortex1 = document.getElementById('vortex1');
  let vortexRings = [];
  let vortexSpeed = 1;
  let vortexDirection = 1;
  let vortexColorIndex = 0;
  const vortexColors = ['#00ccff', '#ff00cc', '#00ff99', '#ffff00'];

  function createVortex() {
    vortex1.innerHTML = '';
    vortexRings = [];

    for (let i = 0; i < 25; i++) {
      const ring = document.createElement('div');
      ring.className = 'vortex-ring';

      const size = 30 + i * 15;
      const opacity = 0.1 + (i / 25) * 0.9;
      const zIndex = -i * 20;

      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
      ring.style.borderColor = vortexColors[vortexColorIndex];
      ring.style.borderLeftColor = 'transparent';
      ring.style.borderRightColor = 'transparent';
      ring.style.opacity = opacity;
      ring.style.transform = `translate(-50%, -50%) translateZ(${zIndex}px)`;
      ring.style.boxShadow = `0 0 ${10 + i}px ${vortexColors[vortexColorIndex]}`;

      vortex1.appendChild(ring);
      vortexRings.push({
        element: ring,
        rotation: i * 10,
        index: i
      });
    }
  }

  function animateVortex() {
    vortexRings.forEach(ring => {
      const rotationSpeed = (ring.index / 25) * vortexSpeed * vortexDirection * 2;
      ring.rotation += rotationSpeed;

      ring.element.style.transform = `
                        translate(-50%, -50%) 
                        translateZ(${-ring.index * 20}px)
                        rotateX(70deg)
                        rotateY(${ring.rotation}deg)
                        rotateZ(${Math.sin(Date.now() / 3000 + ring.index) * 10}deg)
                    `;

      // Pulsing effect
      if (ring.index % 7 === 0) {
        const pulse = 0.7 + Math.sin(Date.now() / 1000 + ring.index) * 0.3;
        ring.element.style.opacity = (0.1 + (ring.index / 25) * 0.9) * pulse;
      }
    });

    requestAnimationFrame(animateVortex);
  }

  // ============================================
  // ILLUSION 2: Motion Grid
  // ============================================
  const motionGrid = document.getElementById('motionGrid');
  let motionCells = [];
  let motionActive = false;
  let motionPattern = 0;
  let motionIntensity = 3;

  function createMotionGrid() {
    motionGrid.innerHTML = '';
    motionCells = [];

    for (let i = 0; i < 64; i++) {
      const cell = document.createElement('div');
      cell.className = 'motion-cell';

      // Alternate colors for checkerboard pattern
      if (Math.floor(i / 8) % 2 === i % 2) {
        cell.style.backgroundColor = '#ffffff';
      } else {
        cell.style.backgroundColor = '#f0f0f0';
      }

      motionGrid.appendChild(cell);
      motionCells.push(cell);
    }
  }

  function animateMotionGrid() {
    if (!motionActive) return;

    const time = Date.now() / 1000;

    motionCells.forEach((cell, index) => {
      const row = Math.floor(index / 8);
      const col = index % 8;

      let offsetX = 0;
      let offsetY = 0;

      if (motionPattern === 0) {
        // Wave pattern
        offsetX = Math.sin(time * 2 + row * 0.5) * motionIntensity;
        offsetY = Math.cos(time * 2 + col * 0.5) * motionIntensity;
      } else if (motionPattern === 1) {
        // Spiral pattern
        const dist = Math.sqrt((row - 3.5) * (row - 3.5) + (col - 3.5) * (col - 3.5));
        offsetX = Math.sin(time * 2 + dist) * motionIntensity;
        offsetY = Math.cos(time * 2 + dist) * motionIntensity;
      } else {
        // Random pattern
        offsetX = Math.sin(time * 3 + row + col) * motionIntensity;
        offsetY = Math.cos(time * 3 + row * col) * motionIntensity;
      }

      cell.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });

    requestAnimationFrame(animateMotionGrid);
  }

  // ============================================
  // ILLUSION 3: Spinning Dots
  // ============================================
  const spinningDots = document.getElementById('spinningDots');
  let dots = [];
  let dotSpeed = 2;
  let dotDirection = 1;
  let dotCount = 12;

  function createSpinningDots() {
    spinningDots.innerHTML = '';
    dots = [];

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('div');
      dot.className = 'spinning-dot';

      const angle = (i / dotCount) * Math.PI * 2;
      const radius = 80;
      const size = 15 + Math.sin(i * 0.5) * 5;

      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.backgroundColor = `hsl(${i * 30}, 100%, 60%)`;

      spinningDots.appendChild(dot);
      dots.push({
        element: dot,
        angle: angle,
        radius: radius,
        index: i
      });
    }
  }

  function animateSpinningDots() {
    const time = Date.now() / 1000;

    dots.forEach(dot => {
      // Update angle
      dot.angle += dotSpeed * 0.02 * dotDirection;

      // Calculate position
      const x = Math.cos(dot.angle + time * 0.5) * dot.radius;
      const y = Math.sin(dot.angle + time * 0.5) * dot.radius;

      // Apply transformation
      dot.element.style.left = `calc(50% + ${x}px)`;
      dot.element.style.top = `calc(50% + ${y}px)`;
      dot.element.style.transform = `translate(-50%, -50%)`;

      // Pulsing effect
      const pulse = 0.7 + Math.sin(time * 3 + dot.index) * 0.3;
      dot.element.style.opacity = pulse;
      dot.element.style.boxShadow = `0 0 ${10 + pulse * 10}px hsl(${dot.index * 30}, 100%, 60%)`;
    });

    requestAnimationFrame(animateSpinningDots);
  }

  // ============================================
  // ILLUSION 4: Vortex Tunne2
  // ============================================

  const vortex2 = document.getElementById('vortex2');
  let vortexRings2 = [];
  let vortexSpeed2 = 1;
  let vortexDirection2 = 1;
  let vortexColorIndex2 = 0;
  const vortexColors2 = ['#00ccff', '#ff00cc', '#00ff99', '#ffff00'];

  function createVortex2() {
    vortex2.innerHTML = '';
    vortexRings2 = [];

    // Create 20 rings
    for (let j = 0; j < 20; j++) {
      const ring2 = document.createElement('div');
      ring2.className = 'vortex-ring2';

      // Size increases with each ring
      const size2 = 20 + j * 15;
      const color2 = vortexColors2[vortexColorIndex2];

      ring2.style.width = `${size2}px`;
      ring2.style.height = `${size2}px`;
      ring2.style.borderColor = color2;
      ring2.style.transform = `translate(-50%, -50%) translateZ(${-j * 10}px)`;
      ring2.style.boxShadow = `0 0 10px ${color2}`;

      vortex2.appendChild(ring2);
      vortexRings2.push({
        element: ring2,
        angle: j * 0.3,
        radius: size2 / 2,
        index: j
      });
    }
  }

  
  function animateVortex2() {
    const time2 = Date.now() / 1000;

    vortexRings2.forEach(ring2 => {
      // Rotate each ring
      ring2.angle += 0.02 * vortexSpeed2 * vortexDirection2;

      // Apply rotation with some 3D effect
      const rotateX = Math.sin(time2 * 0.5 + ring2.index * 0.2) * 20;
      const rotateY = ring2.angle * 30;

      ring2.element.style.transform = `
                        translate(-50%, -50%) 
                        translateZ(${-ring2.index * 10}px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                    `;

      // Pulsing opacity
      const pulse2 = 0.5 + Math.sin(time2 * 2 + ring2.index) * 0.5;
      ring2.element.style.opacity = 0.2 + (ring2.index / 20) * 0.8 * pulse2;
    });

    requestAnimationFrame(animateVortex2);
  }

  // ============================================
  // ILLUSION 5: Breathing Squares
  // ============================================
  const breathingSquares = document.getElementById('breathingSquares');
  let squares = [];
  let breathSpeed = 1;
  let breathPattern = 0;
  let breathColorIndex = 0;
  const breathColors = ['#ffff00', '#00ffff', '#ff00ff', '#00ff00'];

  function createBreathingSquares() {
    breathingSquares.innerHTML = '';
    squares = [];

    for (let i = 0; i < 25; i++) {
      const square = document.createElement('div');
      square.className = 'breathing-square';

      square.style.backgroundColor = breathColors[breathColorIndex];

      breathingSquares.appendChild(square);
      squares.push(square);
    }
  }

  function animateBreathingSquares() {
    const time = Date.now() / 1000;

    squares.forEach((square, index) => {
      const row = Math.floor(index / 5);
      const col = index % 5;

      let scale = 1;

      if (breathPattern === 0) {
        // Wave pattern
        const delay = (row + col) * 0.3;
        scale = 0.5 + Math.sin(time * breathSpeed + delay) * 0.5;
      } else if (breathPattern === 1) {
        // Center-out pattern
        const centerDist = Math.sqrt((row - 2) * (row - 2) + (col - 2) * (col - 2));
        scale = 0.3 + Math.sin(time * breathSpeed - centerDist * 0.5) * 0.7;
      } else {
        // Random pattern
        scale = 0.3 + Math.sin(time * breathSpeed + index) * 0.7;
      }

      square.style.transform = `scale(${scale})`;
      square.style.backgroundColor = breathColors[breathColorIndex];
      square.style.opacity = 0.5 + scale * 0.5;
    });

    requestAnimationFrame(animateBreathingSquares);
  }

  // ============================================
  // ILLUSION 6: Hypnotic Spirals
  // ============================================
  const hypnoticSpiral = document.getElementById('hypnoticSpiral');
  let spiralArms = [];
  let spiralSpeed = 1;
  let spiralDirection = 1;
  let spiralType = 0;

  function createHypnoticSpiral() {
    hypnoticSpiral.innerHTML = '';
    spiralArms = [];

    const armCount = spiralType === 0 ? 12 : spiralType === 1 ? 8 : 16;

    for (let i = 0; i < armCount; i++) {
      const arm = document.createElement('div');
      arm.className = 'spiral-arm';

      const angle = (i / armCount) * Math.PI * 2;
      const length = 100;

      arm.style.transform = `rotate(${angle}rad) translateY(-${length}px)`;
      arm.style.backgroundColor = `hsl(${i * 360 / armCount}, 100%, 60%)`;

      hypnoticSpiral.appendChild(arm);
      spiralArms.push({
        element: arm,
        angle: angle,
        index: i
      });
    }
  }

  function animateHypnoticSpiral() {
    const time = Date.now() / 1000;

    spiralArms.forEach(arm => {
      const rotation = arm.angle + time * spiralSpeed * spiralDirection;
      const length = 80 + Math.sin(time * 2 + arm.index) * 40;

      arm.element.style.transform = `
                        rotate(${rotation}rad) 
                        translateY(-${length}px)
                        scaleY(${0.5 + Math.sin(time * 3 + arm.index * 0.5) * 0.5})
                    `;

      // Color cycling
      const hue = (arm.index * 360 / spiralArms.length + time * 50) % 360;
      arm.element.style.backgroundColor = `hsl(${hue}, 100%, 60%)`;
      arm.element.style.boxShadow = `0 0 10px hsl(${hue}, 100%, 60%)`;
    });

    requestAnimationFrame(animateHypnoticSpiral);
  }

  // ============================================
  // ILLUSION 7: Floating Circles
  // ============================================
  const floatingCircles = document.getElementById('floatingCircles');
  let circles = [];
  let floatSpeed = 1;
  let circleCount = 15;
  let circleColorIndex = 0;
  const circleColors = ['#ff3366', '#33ff66', '#3366ff', '#ffcc00'];

  function createFloatingCircles() {
    floatingCircles.innerHTML = '';
    circles = [];

    for (let i = 0; i < circleCount; i++) {
      const circle = document.createElement('div');
      circle.className = 'floating-circle';

      const size = 20 + Math.random() * 40;

      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
      circle.style.borderColor = circleColors[circleColorIndex];
      circle.style.color = circleColors[circleColorIndex];

      // Random starting position
      circle.style.left = `${Math.random() * 100}%`;
      circle.style.top = `${Math.random() * 100}%`;

      floatingCircles.appendChild(circle);
      circles.push({
        element: circle,
        x: Math.random() * 100,
        y: Math.random() * 100,
        xSpeed: (Math.random() - 0.5) * 0.5,
        ySpeed: (Math.random() - 0.5) * 0.5,
        size: size,
        index: i
      });
    }
  }

  function animateFloatingCircles() {
    const time = Date.now() / 1000;

    circles.forEach(circle => {
      // Update position
      circle.x += circle.xSpeed * floatSpeed;
      circle.y += circle.ySpeed * floatSpeed;

      // Bounce off edges
      if (circle.x < 0 || circle.x > 100) circle.xSpeed *= -1;
      if (circle.y < 0 || circle.y > 100) circle.ySpeed *= -1;

      // Keep within bounds
      circle.x = Math.max(0, Math.min(100, circle.x));
      circle.y = Math.max(0, Math.min(100, circle.y));

      // Apply position
      circle.element.style.left = `${circle.x}%`;
      circle.element.style.top = `${circle.y}%`;

      // Pulsing size
      const pulse = 0.7 + Math.sin(time * 2 + circle.index) * 0.3;
      circle.element.style.transform = `translate(-50%, -50%) scale(${pulse})`;

      // Update color
      circle.element.style.borderColor = circleColors[circleColorIndex];
      circle.element.style.color = circleColors[circleColorIndex];
      circle.element.style.boxShadow = `0 0 ${15 * pulse}px ${circleColors[circleColorIndex]}`;
    });

    requestAnimationFrame(animateFloatingCircles);
  }

  // ============================================
  // Initialize all illusions
  // ============================================
  function initIllusions() {
    // Illusion 1
    createVortex();
    animateVortex();

    // Illusion 2
    createMotionGrid();

    // Illusion 3
    createSpinningDots();
    animateSpinningDots();

    // Illusion 4
    createVortex2();
    animateVortex2();

    // Illusion 5
    createBreathingSquares();
    animateBreathingSquares();

    // Illusion 6
    createHypnoticSpiral();
    animateHypnoticSpiral();

    // Illusion 7
    createFloatingCircles();
    animateFloatingCircles();
  }

  // ============================================
  // Event Listeners for Controls
  // ============================================
  document.querySelectorAll('.control-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const illusionId = parseInt(this.getAttribute('data-illusion'));
      const action = this.getAttribute('data-action');

      // Add active class temporarily
      this.classList.add('active');
      setTimeout(() => this.classList.remove('active'), 300);

      // Handle actions based on illusion
      switch (illusionId) {
        case 1: // Vortex
          switch (action) {
            case 'speedUp': vortexSpeed = Math.min(vortexSpeed + 4, 16); break;
            case 'speedDown': vortexSpeed = Math.max(vortexSpeed - 2, 0.5); break;
            case 'reverse': vortexDirection *= -1; break;
            case 'color':
              vortexColorIndex = (vortexColorIndex + 1) % vortexColors.length;
              createVortex();
              break;
          }
          break;

        case 2: // Motion Grid
          switch (action) {
            case 'start':
              motionActive = true;
              animateMotionGrid();
              break;
            case 'stop': motionActive = false; break;
            case 'pattern':
              motionPattern = (motionPattern + 1) % 3;
              break;
            case 'intensity':
              motionIntensity = Math.min(motionIntensity + 4, 28);
              break;
            case 'Low_intensity':
              motionIntensity = Math.max(motionIntensity - 2, 0.5);
              break;
          }
          break;

        case 3: // Spinning Dots
          switch (action) {
            case 'speedUp': dotSpeed = Math.min(dotSpeed + 3, 18); break;
            case 'speedDown': dotSpeed = Math.max(dotSpeed - 2, 0.5); break;
            case 'direction': dotDirection *= -1; break;
            case 'count':
              dotCount = Math.min(dotCount + 4, 36);
              createSpinningDots();
              break;
          }
          break;

        case 4: // Vortex2
          switch (action) {
            case 'speedUp':
              vortexSpeed2 = Math.min(vortexSpeed2 + 5, 40);
              break;
            case 'speedDown':
              vortexSpeed2 = Math.max(vortexSpeed2 - 5, 0.5);
              break;
            case 'reverse':
              vortexDirection2 *= -1;
              break;
            case 'color':
              vortexColorIndex2 = (vortexColorIndex2 + 1) % vortexColors2.length;
              createVortex2();
              break;
          }
          break;

        case 5: // Breathing Squares
          switch (action) {
            case 'speedUp': breathSpeed = Math.min(breathSpeed + 2, 10); break;
            case 'speedDown': breathSpeed = Math.max(breathSpeed - 2, 0.5); break;
            case 'pattern':
              breathPattern = (breathPattern + 1) % 3;
              break;
            case 'color':
              breathColorIndex = (breathColorIndex + 1) % breathColors.length;
              break;
          }
          break;

        case 6: // Hypnotic Spirals
          switch (action) {
            case 'speedUp': spiralSpeed = Math.min(spiralSpeed + 4, 24); break;
            case 'speedDown': spiralSpeed = Math.max(spiralSpeed - 2, 0.5); break;
            case 'direction': spiralDirection *= -1; break;
            case 'spiralType':
              spiralType = (spiralType + 1) % 3;
              createHypnoticSpiral();
              break;
          }
          break;

        case 7: // Floating Circles
          switch (action) {
            case 'speedUp': floatSpeed = Math.min(floatSpeed + 2, 18); break;
            case 'speedDown': floatSpeed = Math.max(floatSpeed - 2, 0.5); break;
            case 'count':
              circleCount = Math.min(circleCount + 5, 40);
              createFloatingCircles();
              break;
            case 'color':
              circleColorIndex = (circleColorIndex + 1) % circleColors.length;
              break;
          }
          break;
      }
    });
  });

  // Initialize everything
  initIllusions();

  // Add mouse interactivity to vortex
  vortex1.addEventListener('mousemove', (e) => {
    const rect = vortex1.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    vortex1.style.transform = `perspective(1000px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`;
  });

  vortex1.addEventListener('mouseleave', () => {
    vortex1.style.transform = 'perspective(1000px)';
  });
});

  vortex2.addEventListener('mousemove', (e) => {
    const rect2 = vortex2.getBoundingClientRect();
    const x = (e.clientX - rect2.left) / rect2.width - 0.5;
    const y = (e.clientY - rect2.top) / rect2.height - 0.5;

    vortex2.style.transform = `perspective(800px) rotateY(${x * 30}deg) rotateX(${-y * 30}deg)`;
  });

  vortex2.addEventListener('mouseleave', () => {
    vortex2.style.transform = 'perspective(800px)';
  });