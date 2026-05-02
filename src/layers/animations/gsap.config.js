import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register all plugins once here — import this file once in main.jsx
gsap.registerPlugin(ScrollTrigger);

// Global GSAP defaults
gsap.defaults({
  ease: 'power3.out',
  duration: 0.6,
});

export { gsap, ScrollTrigger };