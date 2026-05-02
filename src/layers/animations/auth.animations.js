import { gsap } from './gsap.config';

// ── Animates the left brand panel on AuthLayout mount
export const animatePanelEntry = (panelRef) => {
  const tl = gsap.timeline();

  tl.fromTo(
    panelRef.current.querySelector('.auth-layout__brand'),
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.5 }
  )
  .fromTo(
    panelRef.current.querySelector('.auth-layout__tag'),
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 0.45 },
    '-=0.2'
  )
  .fromTo(
    panelRef.current.querySelector('.auth-layout__headline'),
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6 },
    '-=0.2'
  )
  .fromTo(
    panelRef.current.querySelector('.auth-layout__subtext'),
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5 },
    '-=0.3'
  )
  .fromTo(
    panelRef.current.querySelector('.auth-layout__stats'),
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5 },
    '-=0.2'
  )
  .fromTo(
    panelRef.current.querySelector('.auth-layout__chat-preview'),
    { opacity: 0, y: 30, scale: 0.97 },
    { opacity: 1, y: 0, scale: 1, duration: 0.6 },
    '-=0.2'
  );

  return tl;
};

// ── Animates the chat bubbles sequentially
export const animateChatBubbles = (panelRef) => {
  const bubbles = panelRef.current.querySelectorAll('.auth-layout__chat-bubble');

  gsap.fromTo(
    bubbles,
    { opacity: 0, y: 16, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.45,
      stagger: 0.18,
      delay: 1.2, // starts after panel entry finishes
    }
  );
};

// ── Animates the form card sliding in from the right
export const animateFormEntry = (formRef) => {
  gsap.fromTo(
    formRef.current,
    { opacity: 0, x: 40 },
    { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out' }
  );
};

// ── Staggered field reveal inside login/register form
export const animateFormFields = (containerRef) => {
  const fields = containerRef.current.querySelectorAll(
    '.login-page__field, .login-page__header, .login-page__btn, .login-page__divider, .login-page__sso-btn, .login-page__register-prompt,' +
    '.register-page__field, .register-page__row, .register-page__header, .register-page__btn, .register-page__login-prompt'
  );

  gsap.fromTo(
    fields,
    { opacity: 0, y: 18 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.07,
      ease: 'power2.out',
      delay: 0.2,
    }
  );
};

// ── Button hover pulse (attach to button element directly)
export const animateBtnHover = (btnElement) => {
  gsap.to(btnElement, {
    scale: 1.025,
    duration: 0.2,
    ease: 'power1.out',
  });
};

export const animateBtnLeave = (btnElement) => {
  gsap.to(btnElement, {
    scale: 1,
    duration: 0.2,
    ease: 'power1.out',
  });
};