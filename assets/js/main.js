// Wait for GSAP to be available (handles defer loading)
function waitForGSAP(callback) {
  if (typeof gsap !== "undefined" && typeof MotionPathPlugin !== "undefined") {
    callback();
  } else {
    setTimeout(function () {
      waitForGSAP(callback);
    }, 50);
  }
}

// --- Animation Functions ---

// Path data defined in JS to avoid Hugo minifier corruption
var BIKE_PATH_DATA =
  "M-100,600 C200,600 400,100 700,400 S900,650 1200,300 S1400,150 1500,200";

function initBackgroundAnimations() {
  // Bike Rider Path Animation (Persistent)
  var bike = document.querySelector("#bike-rider-gsap");
  var motionPath = document.querySelector("#motionPath");

  if (bike && motionPath && typeof gsap !== "undefined") {
    // Set the path data from JS (Hugo minifier corrupts SVG path d attribute)
    motionPath.setAttribute("d", BIKE_PATH_DATA);

    // Shorter durations so bike exits screen faster, then 1s delay before restart
    // Mobile has shorter path visibility, so vanishes earlier
    var isMobile = window.innerWidth < 768;
    var duration = isMobile ? 8 : 10;

    // Set initial position and flip the bike horizontally
    gsap.set(bike, { scaleX: -1 });

    gsap.to(bike, {
      duration: duration,
      repeat: -1,
      repeatDelay: 1,
      ease: "none",
      motionPath: {
        path: motionPath,
        align: motionPath,
        autoRotate: true,
        alignOrigin: [0.5, 0.85],
      },
    });

    // Dash animation using requestAnimationFrame for smooth mobile performance
    // Uses modulo to wrap continuously - no reset/jump point
    var dashOffset = 0;
    var lastTime = performance.now();
    var speed = 8; // units per second (24 units / 3 seconds)

    function animateDash(currentTime) {
      var deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      dashOffset = (dashOffset - speed * deltaTime) % 24;
      motionPath.style.strokeDashoffset = dashOffset;

      requestAnimationFrame(animateDash);
    }

    requestAnimationFrame(animateDash);
  }

  // Parallax Mouse Movement (Persistent)
  document.addEventListener("mousemove", (e) => {
    if (typeof gsap === "undefined") return;
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    document.querySelectorAll(".floating-element").forEach((el) => {
      const depth = parseFloat(el.getAttribute("data-depth") || 0);
      const moveX = (clientX - centerX) * depth;
      const moveY = (clientY - centerY) * depth;
      gsap.to(el, {
        x: moveX,
        y: moveY,
        duration: 1.2,
        ease: "power2.out",
      });
    });
  });
}

function initPageAnimations() {
  // Scroll to top
  window.scrollTo(0, 0);

  // Guard against GSAP not being loaded yet
  if (typeof gsap === "undefined") {
    updateNavState();
    return;
  }

  // Stagger items entrance
  const staggerItems = document.querySelectorAll(".stagger-item");
  if (staggerItems.length > 0) {
    gsap.from(staggerItems, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)",
    });
  }

  // Hero Title Animation (if present)
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    gsap.from(heroTitle, {
      scale: 0.8,
      opacity: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.5)",
    });
  }

  // Also animate blob images if they exist (mimic old site)
  const blobs = document.querySelectorAll(".blob");
  if (blobs.length > 0) {
    gsap.from(blobs, {
      duration: 1.5,
      scale: 0.8,
      opacity: 0,
      stagger: 0.2,
      ease: "elastic.out(1, 0.3)",
    });
  }

  // Re-run Nav Update
  updateNavState();
}

function updateNavState() {
  const currentPath = window.location.pathname.replace(/\/$/, ""); // Normalize trailing slash

  // Update Logo Color
  // Update Logo Color - REMOVED (Always static now)
  // logic removed to keep default slate color always

  // Update Nav Links
  document.querySelectorAll("nav a.nav-link").forEach((link) => {
    const href = link.getAttribute("href").replace(/\/$/, "");
    // Simple active check
    // Note: This relies on the href being relative or matching.
    // Hugo often outputs full URLs. Let's check `href.endsWith(path)`

    let isActive = false;
    // Match Home
    if (currentPath === "" && (href === "" || href === "/")) {
      isActive = true;
    }
    // Match Other Pages
    else if (currentPath !== "" && href === currentPath) {
      isActive = true;
    }
    // Fallback for partial matches if needed, but strict is better for top level items
    else if (
      currentPath !== "" &&
      href !== "" &&
      currentPath.startsWith(href) &&
      href !== "/"
    ) {
      isActive = true;
    }

    if (isActive) {
      link.classList.add("text-green-600");
      link.classList.remove("text-slate-500");
    } else {
      link.classList.remove("text-green-600");
      link.classList.add("text-slate-500");
    }
  });
}

// --- Initialization ---

var swupInstance = null;

// Wait for Swup to be available
function waitForSwup(callback) {
  if (typeof Swup !== "undefined" && typeof SwupHeadPlugin !== "undefined") {
    callback();
  } else {
    setTimeout(function () {
      waitForSwup(callback);
    }, 50);
  }
}

// Initialize everything once dependencies are loaded
function initAll() {
  // Wait for GSAP to load, then initialize animations
  waitForGSAP(function () {
    gsap.registerPlugin(MotionPathPlugin);
    initBackgroundAnimations();
    initPageAnimations();
  });

  // Wait for Swup to load, then initialize page transitions
  waitForSwup(function () {
    swupInstance = new Swup({
      containers: ["#swup"],
      plugins: [new SwupHeadPlugin()],
    });

    swupInstance.hooks.on("content:replace", function () {
      initPageAnimations();
    });
  });
}

// Start initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAll);
} else {
  initAll();
}

// 5. Manual Override for Brand Link (Prevent Flash)
// We expose this globally and call it via onclick in HTML to ensure it captures the event unconditionally.
window.handleBrandClick = function (e) {
  // Check for modifier keys - allow default behavior (new tab, etc)
  if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
    return;
  }

  // Prevent Browser Reload
  e.preventDefault();
  e.stopPropagation();

  const currentPath = window.location.pathname.replace(/\/$/, "");
  const isHome = currentPath === "" || currentPath === "/index.html";

  if (isHome) {
    // Just scroll to top if already home
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    // Navigate otherwise
    if (swupInstance) {
      swupInstance.navigate("/");
    } else {
      window.location.href = "/";
    }
  }
};
