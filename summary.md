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

### 7. GSAP with Lag Smoothing & Infinite Scroll (Current Solution)

Replaced manual loop with GSAP, leveraging `lagSmoothing`:

```javascript
gsap.ticker.lagSmoothing(100, 16); // Critical Fix

gsap.to(motionPath, {
  strokeDashoffset: -100000, // Move indefinitely (no loop reset)
  duration: 12500, // Maintain 8px/s speed
  ease: "none",
  repeat: -1,
});
```

**Why this works:**

1.  **Lag Smoothing**: The `lagSmoothing(100, 16)` setting tells GSAP: "If more than 100ms passed since the last frame, pretend only 16ms passed." This forces the animation to **pause** during throttle/sleep and **resume smoothly** from where it left off, rather than jumping to catch up to wall-clock time.
2.  **No Loop Point**: By animating to a massive number (-100,000) over 3.5 hours, we avoid any visual glitch that might occur at the wrapped loop point (0 to -24).

**Why this should work:**

- **Monotonic time**: `performance.now()` always increases, so dashOffset can ONLY become more negative (move forward), NEVER backward
- **No accumulation**: Each frame independently calculates the correct offset from elapsed time - no frame-to-frame dependencies
- **No modulo/wrap**: Offset decreases forever (large negatives are fine for browsers)
- When resuming from throttle, animation "catches up" (jumps forward), which is natural behavior

Also added `will-change: stroke-dashoffset` to CSS to help Safari's compositor.

## Root Cause

Mobile browsers aggressively throttle animations to save battery. When animation resumes after throttling, any loop-based animation (CSS `infinite`, GSAP `repeat: -1`, or JS modulo wrapping) can produce a visible "jump" as it catches up or wraps around.
