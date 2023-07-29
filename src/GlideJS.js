import Glide from "@glidejs/glide";

class GlideJS {
  constructor() {
    const allSlideshows = document.querySelectorAll(".hero-slider");
    allSlideshows.forEach(function (currentSlideshow) {
        const type = currentSlideshow.getAttribute("data-type");
        const startAtValue = currentSlideshow.getAttribute("data-startAtValue");
        const perViewValue = currentSlideshow.getAttribute("data-perViewValue");
        const focusAtCentered = currentSlideshow.getAttribute("data-focusAtCentered");
        const focusAtValue = currentSlideshow.getAttribute("data-focusAtValue");
        const gap = currentSlideshow.getAttribute("data-gap");  
        const autoplay = currentSlideshow.getAttribute("data-autoplay");
        const hoverpause = currentSlideshow.getAttribute("data-hoverpause");
        const keyboard = currentSlideshow.getAttribute("data-keyboard");
        const bound = currentSlideshow.getAttribute("data-bound");
        const swipeThreshold = currentSlideshow.getAttribute("data-swipeThreshold");
        const dragThreshold = currentSlideshow.getAttribute("data-dragThreshold");
        const perTouch = currentSlideshow.getAttribute("data-perTouch");
        const touchRatio = currentSlideshow.getAttribute("data-touchRatio");
        const touchAngle = currentSlideshow.getAttribute("data-touchAngle");
        const animationDuration = currentSlideshow.getAttribute("data-animationDuration");
        const rewind = currentSlideshow.getAttribute("data-rewind");
        const rewindDuration = currentSlideshow.getAttribute("data-rewindDuration");
        const animationTimingFunc = currentSlideshow.getAttribute("data-animationTimingFunc");
        const direction = currentSlideshow.getAttribute("data-direction");
        const peekBefore = currentSlideshow.getAttribute("data-peekBefore");
        const peekAfter = currentSlideshow.getAttribute("data-peekAfter");
        const throttle = currentSlideshow.getAttribute("data-throttle");

      const dotCount = currentSlideshow.querySelectorAll(
        ".hero-slider__slide"
      ).length;
      // Generate the HTML for the navigation dots
      let dotHTML = "";
      for (let i = 0; i < dotCount; i++) {
        dotHTML += `<button class="slider__bullet glide__bullet" data-glide-dir="=${i}"></button>`;
      }
      // Add the dots HTML to the DOM
      currentSlideshow
        .querySelector(".glide__bullets")
        .insertAdjacentHTML("beforeend", dotHTML);
      // Actually initialize the glide / slider script
      var glide = new Glide(currentSlideshow, {
        type: type || "carousel",
        perView: perViewValue || 1,
        startAt: (startAtValue - 1)|| 0,
        focusAt: focusAtCentered ? "center" : focusAtValue || 0,
        gap: gap || 10,
        autoplay: autoplay || false,
        hoverpause: hoverpause === "true",
        keyboard: keyboard === "true",
        bound: bound === "true",
        swipeThreshold: swipeThreshold || 80,
        dragThreshold: dragThreshold || 120,
        perTouch: perTouch === "true",
        touchRatio: touchRatio || 0.5,
        touchAngle: touchAngle || 45,
        animationDuration: animationDuration || 400,
        rewind: rewind === "true",
        rewindDuration: rewindDuration || 800,
        animationTimingFunc: animationTimingFunc || "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
        direction: direction || "ltr",
        peek: {
          before: peekBefore || 100,
          after: peekAfter || 50
        },
        throttle: throttle || 25
      });
      
      glide.mount();
    });
  }
}

const glidejs = new GlideJS();
