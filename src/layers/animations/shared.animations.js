import { gsap } from './gsap.config';

// ── Fade in any element
export const fadeIn = (el, delay = 0) => {
  gsap.fromTo(
    el,
    { opacity: 0 },
    { opacity: 1, duration: 0.5, delay }
  );
};

// ── Slide up and fade in (for cards, modals, panels)
export const slideUpFadeIn = (el, delay = 0) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.55, delay, ease: 'power3.out' }
  );
};

// ── Page exit animation (before route change)
export const pageExit = (el, onComplete) => {
  gsap.to(el, {
    opacity: 0,
    y: -15,
    duration: 0.3,
    ease: 'power2.in',
    onComplete,
  });
};