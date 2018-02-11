// Durations
export const transitionDuration = 250; // in milliseconds

// Generic "fade"
export const fadeDefaultStyle = {
  transition: `opacity ${transitionDuration}ms ease-in-out`,
  opacity: 0,
};

export const fadeTransitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 },
};

// Fade and Slide Down
export const fadeSlideDownDefaultStyle = {
  transition: `opacity ${transitionDuration}ms ease-in-out, transform ${transitionDuration}ms ease-in-out`,
  opacity: 0,
};

export const fadeSlideDownStyles = {
  entering: { opacity: 0, transform: 'translateY(100%)' },
  entered: { opacity: 1, transform: 'translateY(0)' },
  exiting: { opacity: 1, transform: 'translateY(0)' },
  exited: { opacity: 0, transform: 'translateY(100%)' },
};

// Fade and Slide Up
export const fadeSlideUpDefaultStyle = {
  transition: `opacity ${transitionDuration}ms ease-in-out, transform ${transitionDuration}ms ease-in-out`,
  opacity: 0,
};

export const fadeSlideUpStyles = {
  entering: { opacity: 0, transform: 'translateY(-100%)' },
  entered: { opacity: 1, transform: 'translateY(0)' },
  exiting: { opacity: 1, transform: 'translateY(0)' },
  exited: { opacity: 0, transform: 'translateY(-100%)' },
};
