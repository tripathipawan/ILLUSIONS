# ILLUSIONS — Optical Illusion Collection

A single-page interactive collection of 7 hand-crafted optical illusions built entirely with HTML, CSS, and JavaScript — no canvas, no WebGL, no external animation libraries. Every illusion is rendered using pure DOM elements animated via `requestAnimationFrame` loops and CSS transforms. Each one ships with its own dedicated set of real-time controls that let you change speed, direction, color, and pattern without reloading the page.

---

## What This Project Does

The page opens with a dark deep-space gradient body (`#0c0c1d → #1a1a2e`) and a centered `max-width: 1400px` container. A header displays the title with a three-stop gradient text (`#ff0080 → #00ffcc → #ffff00`) via `-webkit-background-clip: text`. Below the header is an instruction bar highlighting the core interaction tip: stare at the center of each illusion for maximum effect.

The seven illusion cards are arranged in a CSS Grid with `grid-template-columns: repeat(auto-fill, minmax(600px, 1fr))`, collapsing to a single column below 1300px. Each card has a dark glassmorphism background (`rgba(20,20,40,0.7)`) with a `1px solid rgba(100,100,255,0.1)` border and a `box-shadow: 0 15px 35px rgba(0,0,0,0.5)`. Cards lift `translateY(-10px)` on hover with a stronger shadow.

---

## The 7 Illusions

### 01 — Vortex Tunnel

**What you see:** 25 concentric rings that appear to spin inward like a tunnel, creating a depth illusion. Staring at the center makes stationary objects appear to move after you look away.

**How it works:** JavaScript creates 25 `<div class="vortex-ring">` elements. Each ring is given an increasing diameter (`30 + i * 15` px), decreasing z-position (`translateZ(-i * 20px)`), and an increasing opacity (`0.1 + (i/25) * 0.9`). Every `requestAnimationFrame`, each ring's `transform` is updated with `rotateX(70deg) rotateY(ring.rotation += speed * direction) rotateZ(Math.sin(Date.now()/3000) * 10deg)`. Every 7th ring has its opacity pulsed with `Math.sin(Date.now()/1000)` for a breathing effect.

**Mouse interaction:** Moving the mouse over the vortex applies a live 3D tilt — `rotateY(x * 20deg) rotateX(-y * 20deg)` based on cursor position within the element bounds. Leaving the container resets to `perspective(1000px)`.

**Controls:** Speed Up (max 16), Slow Down (min 0.5), Reverse (direction `*= -1`), Change Color (cycles through `#00ccff → #ff00cc → #00ff99 → #ffff00`, rebuilds rings).

---

### 02 — Motion Illusion Grid

**What you see:** An 8×8 checkerboard grid where the cells appear to ripple, flow, or spiral even though the grid structure is static. The motion appears to be continuous even though cells are only translating by a few pixels.

**How it works:** 64 `<div class="motion-cell">` elements fill an 8×8 CSS grid (`grid-template-columns: repeat(8, 1fr); gap: 2px`). Cells alternate between `#ffffff` and `#f0f0f0` based on a checkerboard formula. The animation is **off by default** — you must click **Start Motion** to begin. Each `requestAnimationFrame`, offset values are calculated per cell based on its `row` and `col` and the current time, then applied as `transform: translate(offsetX, offsetY)`.

Three switchable patterns:
- **Wave** — `sin(time*2 + row*0.5)` on X, `cos(time*2 + col*0.5)` on Y
- **Spiral** — offset based on distance from center `(3.5, 3.5)`, creating a ripple-from-center effect
- **Random** — non-uniform sinusoidal offsets per cell using `sin(time*3 + row + col)` and `cos(time*3 + row*col)`

**Controls:** Start Motion, Stop Motion (halts the `requestAnimationFrame` loop), Change Pattern (cycles through 3), Increase Intensity (adds 4 to max pixel offset, cap 28), Decrease Intensity (subtracts 2, floor 0.5).

---

### 03 — Spinning Dots Illusion

**What you see:** A ring of colored dots that appear to spin continuously. Due to the overlapping motion vectors from the orbit and the time-based angle offset, dots at the periphery seem to move at different speeds — some appearing to reverse direction.

**How it works:** Starts with 12 `.spinning-dot` elements arranged in a circle at radius 80px. Each dot is sized `15 + Math.sin(i * 0.5) * 5` px to vary slightly. Colors are assigned via `hsl(i*30, 100%, 60%)`, spacing them across the hue wheel. Every frame, each dot's `angle` increments by `speed * 0.02 * direction`, and position is computed as `x = cos(angle + time*0.5) * radius`, `y = sin(angle + time*0.5) * radius`. A per-dot pulse (`0.7 + sin(time*3 + index)*0.3`) modulates opacity and `box-shadow` glow radius.

**Controls:** Speed Up (max 18), Slow Down (min 0.5), Change Direction (reverses), More Dots (adds 4 per click up to 36, rebuilds dot array).

---

### 04 — Vortex 2 Tunnel

**What you see:** A second vortex variant — 20 rings with a more pronounced 3D oscillation. Where Vortex 1 rotates primarily around the Y axis at a fixed tilt, Vortex 2 oscillates its X-tilt with a sine wave, creating a wobbling tunnel effect that feels different from the first.

**How it works:** 20 `<div class="vortex-ring2">` elements with size `20 + j * 15` px. Each frame, the angle increments by `0.02 * speed * direction` and the X rotation is computed as `Math.sin(time*0.5 + index*0.2) * 20`. This makes the rings rock as they spin. Opacity pulses per ring using `0.2 + (index/20) * 0.8 * (0.5 + sin(time*2 + index) * 0.5)`.

**Mouse interaction:** Same as Vortex 1 — live `rotateY` / `rotateX` tilt on mousemove using a `perspective(800px)` parent; tilt magnitudes are `±30deg` (vs ±20deg in Vortex 1).

**Controls:** Speed Up (max 40), Slow Down (min 0.5), Reverse, Change Color (same 4-color palette, rebuilds rings).

---

### 05 — Breathing Squares

**What you see:** A 5×5 grid of 25 squares that expand and contract in patterns that create the illusion of breathing, pulsing depth, or inward/outward pressure. The illusion of movement persists even when you know the squares are simply scaling.

**How it works:** 25 `.breathing-square` elements in a `grid-template-columns: repeat(5, 1fr)` grid at 250×250px. Each frame, a `scale` value between ~0 and ~1 is computed per square based on the pattern, then applied as `transform: scale(scale)`. Opacity also tracks `0.5 + scale * 0.5`.

Three switchable breathing patterns:
- **Wave** — `0.5 + sin(time * speed + (row+col) * 0.3) * 0.5` — a diagonal ripple
- **Center-out** — `0.3 + sin(time * speed - dist * 0.5) * 0.7` — radiates from the grid center
- **Random** — `0.3 + sin(time * speed + index) * 0.7` — each square independent

**Controls:** Breathe Faster (max 10), Breathe Slower (min 0.5), Change Pattern (3 cycle), Change Color (4 colors: `#ffff00 → #00ffff → #ff00ff → #00ff00`).

---

### 06 — Hypnotic Spirals

**What you see:** Multiple radial arms that rotate outward from the center, creating a classic hypnotic spiral. The color cycling and variable arm length create an illusion of inward or outward pull depending on rotation direction.

**How it works:** Arms are thin `<div class="spiral-arm">` elements (`2px × 100px`) anchored at the center with `transform-origin: 0 0`. The count varies by spiral type: 12 (default), 8, or 16 arms. Each frame, each arm's rotation is updated as `arm.angle + time * speed * direction`. Arm length oscillates: `80 + sin(time*2 + index) * 40`. Y-scale also pulses: `scaleY(0.5 + sin(time*3 + index*0.5)*0.5)`. The hue of each arm continuously shifts: `hsl((index * 360/armCount + time*50) % 360, 100%, 60%)`, so arms cycle through colors as they spin.

**Controls:** Spin Faster (max 24), Spin Slower (min 0.5), Reverse (direction `*= -1`), Change Spiral (cycles arm count: 12 → 8 → 16, rebuilds arms).

---

### 07 — Floating Circles

**What you see:** 15 circles of varying sizes drifting freely across the display area, bouncing off the edges. Their pulsing size and overlapping paths create an illusion of depth and perceived collision or avoidance.

**How it works:** Each `.floating-circle` element gets a random starting position, random x/y velocity (`(Math.random()-0.5) * 0.5`), and a random diameter (`20 + Math.random() * 40` px). Every frame, position updates by `xSpeed * floatSpeed` and `ySpeed * floatSpeed`. On edge contact, the relevant speed component is negated. A per-circle pulse (`0.7 + sin(time*2 + index)*0.3`) scales the circle and modulates `box-shadow` glow radius: `0 0 ${15 * pulse}px color`.

**Controls:** Float Faster (max 18), Float Slower (min 0.5), More Circles (adds 5 per click, up to 40, rebuilds all circles), Change Color (4 colors: `#ff3366 → #33ff66 → #3366ff → #ffcc00`).

---

## Control Button Design

All `.control-btn` elements share a common dark glass style: `background: rgba(40,40,80,0.8)`, `border: 2px solid #6666ff`, `color: #aaccff`, with a `translateY(-3px)` hover lift. A clicked button briefly gets the `.active` class (added then removed via `setTimeout(300ms)`) which adds a `box-shadow: 0 0 15px rgba(100,100,255,0.7)` glow. Each button has a Font Awesome icon prefix followed by a descriptive label.

Control button click handling is routed through a single `querySelectorAll('.control-btn').forEach` listener using `data-illusion` (1–7) and `data-action` (string) attributes on each button, feeding into a `switch (illusionId)` → nested `switch (action)` dispatch table.

---

## Tech Stack

| Technology | Role |
|---|---|
| HTML5 | Single `index.html` with all 7 illusion cards, control buttons, and the Font Awesome icon library link |
| CSS3 | Dark glassmorphism cards, auto-fill grid layout, `backdrop-filter`-style dark panels, per-illusion element styles (vortex rings, motion grid cells, spinning dots, breathing squares, spiral arms, floating circles), hover lift transitions |
| JavaScript (Vanilla) | 7 independent `requestAnimationFrame` animation loops, DOM element creation/mutation per frame, shared event dispatch via `data-*` attributes, mouse interaction handlers for Vortex 1 and Vortex 2 |
| Font Awesome 6.4.0 (CDN) | Button icons — fast-forward, backward, retweet, palette, play, stop, random, bolt, tachometer, exchange, plus-circle, wind, wave-square, sync, compress, rocket, feather, eye |

---

## Project Structure

```
ILLUSIONS/
├── index.html     # Full page — 7 illusion cards in a CSS auto-fill grid; each card has a numbered header, a 300px illusion display area, and a control button strip with data-illusion and data-action attributes; Font Awesome CDN link; single <script> reference
├── styles.css     # Body dark gradient, max-width container, illusion-card glassmorphism (rgba(20,20,40,0.7) + border + hover translateY), card-header/controls layout, per-illusion element base styles (vortex-ring, motion-cell, spinning-dot, vortex-ring2, breathing-square, spiral-arm, floating-circle), control-btn hover + active states, footer, responsive single-column breakpoint at 1300px
└── script.js      # DOMContentLoaded wrapper; 7 independent sections each with: init function (creates DOM elements + seeds state), animate function (requestAnimationFrame loop with frame-by-frame transform updates), state variables (speed, direction, colorIndex, count, pattern); single delegated click listener routing via switch/switch; mousemove + mouseleave handlers for Vortex 1 and Vortex 2
```

---

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/tripathipawan/ILLUSIONS.git
   ```
2. Open `index.html` directly in any modern browser — no server, no npm, no build step required.
   ```bash
   open ILLUSIONS/index.html
   ```
3. All 7 illusions initialize and begin animating automatically on page load. Use the control buttons under each card to interact.

> **Tip:** For the strongest afterimage effect, stare at the center of any spinning illusion for 20–30 seconds, then look at a blank wall.

---

## Repository

[https://github.com/tripathipawan/ILLUSIONS](https://github.com/tripathipawan/ILLUSIONS)
