# Fixing the Dotted Green Hill Line Animation on Mobile

## The Problem

The dashed line animation appeared to "jump back" or reset on mobile (DuckDuckGo/Safari on iPhone). The dashes would move forward, then suddenly skip backward.

## Files Involved

- `assets/css/main.css` - CSS styling and animation
- `assets/js/main.js` - JavaScript animation logic
- `layouts/_default/baseof.html` - SVG markup

## Approaches Tried

### 1. GSAP with Long Duration (Failed)

Replaced `gsap.fromTo()` with `repeat: -1` with a single `gsap.to()` animating to `-240000` over `30000s`. Theory: avoid the repeat jump entirely.

**Why it failed:** Still had issues on mobile.

### 2. CSS Animation on All Devices (Failed)

Removed the `@media (min-width: 768px)` wrapper so CSS animation runs on mobile too.

**Why it failed:** CSS `animation: dash 3s linear infinite` still has a loop point where it jumps from `-24` back to `0`.

### 3. CSS Animation with Long Duration (Failed)

Changed to `animation: dash 3000s linear infinite` with offset going to `-24000`.

**Why it failed:** Same underlying issue - still loops eventually, and may have precision issues.

### 4. requestAnimationFrame with Modulo (Failed)

Used `requestAnimationFrame` to manually animate, with `dashOffset = (dashOffset - speed * deltaTime) % 24` for seamless wrapping.

**Why it failed:** When mobile browser throttles animation (battery saving), `deltaTime` becomes large on resume. The modulo wrap then causes a visible backward jump (e.g., offset goes from `-10` to `-50`, wraps to `-2`, looks like it jumped backward).

### 5. requestAnimationFrame with Capped deltaTime (Failed)

```javascript
var deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
dashOffset -= speed * deltaTime;
```

**Why it failed:** Still had issues - the accumulation approach is fragile when browser throttles frames in unexpected ways.

### 6. Time-Based Calculation (Failed)

```javascript
/* Replaced Code */
```

**Why it failed:** While monotonic time prevents backward movement calculation errors, it causes a "visual teleport" on resume. If the browser sleeps for 5 seconds, the animation jumps 5 seconds forward instantly. Since the dash pattern is periodic, this large jump disorients the user (aliasing/wagon-wheel effect).

### 7. GSAP Infinite Scroll (Failed)

**Why it likely failed:** Using extremely large values (`-100,000`) for `stroke-dashoffset` may have hit floating-point precision limits on mobile GPUs, causing jitter. Alternatively, the "resume jump" might have been a red herring for a **layout shift** issue.

### 8. Standard Loop + Lag Smoothing + 100lvh (Current Solution)

Implemented a hybrid fix attacking three angles:

1.  **Small Numbers:** Switched back to a standard `0` to `-24` loop. We explictly set `stroke-dasharray="12, 12"` in JS to ensure the period aligns perfectly.
2.  **Lag Smoothing:** Kept `gsap.ticker.lagSmoothing(100, 16)` to prevents resume jumps.
3.  **Layout Stability (Critical):** Changed the SVG container from `inset-0` (which resizes when mobile URL bars collapse) to `h-[100lvh]` (Large Viewport Height).
    - **The Theory:** On mobile, scrolling causes the viewport to resize. If the SVG `viewBox` tries to maintain aspect ratio (`xMidYMid slice`), the zooming of the SVG background would cause the dashed line to seemingly "jump" or wobble in size/position. Locking height prevents this.

```javascript
/* main.js */
gsap.fromTo(
  motionPath,
  { strokeDashoffset: 0 },
  {
    strokeDashoffset: -24,
    duration: 3,
    repeat: -1,
    ease: "none",
  },
);
```

```html
<!-- baseof.html -->
<div class="fixed top-0 left-0 w-full h-[100lvh] ..."></div>
```

**Why this should work:**

- **Monotonic time**: `performance.now()` always increases, so dashOffset can ONLY become more negative (move forward), NEVER backward
- **No accumulation**: Each frame independently calculates the correct offset from elapsed time - no frame-to-frame dependencies
- **No modulo/wrap**: Offset decreases forever (large negatives are fine for browsers)
- When resuming from throttle, animation "catches up" (jumps forward), which is natural behavior

Also added `will-change: stroke-dashoffset` to CSS to help Safari's compositor.

## Root Cause

Mobile browsers aggressively throttle animations to save battery. When animation resumes after throttling, any loop-based animation (CSS `infinite`, GSAP `repeat: -1`, or JS modulo wrapping) can produce a visible "jump" as it catches up or wraps around.
