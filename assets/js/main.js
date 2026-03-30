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
var BIKE_PATH_DATA = "M-100,600 C200,600 400,100 700,400 S900,650 1200,300 S1400,150 1500,200";

function initBackgroundAnimations() {
  // Bike Rider Path Animation (Persistent)
  var bike = document.querySelector("#bike-rider-gsap");
  var motionPath = document.querySelector("#motionPath");

  if (bike && motionPath && typeof gsap !== "undefined") {
    // Set the path data from JS (Hugo minifier corrupts SVG path d attribute)
    motionPath.setAttribute("d", BIKE_PATH_DATA);

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

    // Bike dash animation
    gsap.ticker.lagSmoothing(100, 16);
    motionPath.style.strokeDasharray = "12, 12";
    gsap.fromTo(
      motionPath,
      { strokeDashoffset: 0 },
      {
        strokeDashoffset: -24,
        duration: 3,
        ease: "none",
        repeat: -1,
      },
    );
  }
}

function updateNavState() {
  const currentPath = window.location.pathname.replace(/\/$/, "");

  document.querySelectorAll("nav a.nav-link").forEach((link) => {
    const href = link.getAttribute("href").replace(/\/$/, "");

    let isActive = false;
    if (currentPath === "" && (href === "" || href === "/")) {
      isActive = true;
    } else if (currentPath !== "" && href === currentPath) {
      isActive = true;
    } else if (
      currentPath !== "" &&
      href !== "" &&
      href !== "/" &&
      currentPath.startsWith(href + "/")
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

function initAll() {
  updateNavState();

  waitForGSAP(function () {
    gsap.registerPlugin(MotionPathPlugin);
    initBackgroundAnimations();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAll);
} else {
  initAll();
}

// Manual Override for Brand Link
window.handleBrandClick = function (e) {
  if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
    return;
  }

  e.preventDefault();
  e.stopPropagation();

  const currentPath = window.location.pathname.replace(/\/$/, "");
  const isHome = currentPath === "" || currentPath === "/index.html";

  if (isHome) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    window.location.href = "/";
  }
};
