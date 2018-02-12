// Durations
export const shortTransitionDuration = 125; // in milliseconds
export const transitionDuration = 250; // in milliseconds

// Shorter fade
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

// Layer A
// Used for the Play/Pause button
export const layerADuration = 660; // in milliseconds

export const layerADefaultStyle = {
  transition: `opacity ${transitionDuration}ms ease-in-out`,
  opacity: 0,
};

export const layerAStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 },
};

// Layer B
// Used for Top Bar / Index
export const layerBDuration = 660; // in milliseconds

export const layerBDefaultStyle = {
  transition: `opacity ${transitionDuration}ms ease-in-out, transform ${transitionDuration}ms ease-in-out`,
  opacity: 0,
};

export const layerBStyles = {
  entering: { opacity: 0, transform: 'translateY(-20px)' },
  entered: { opacity: 1, transform: 'translateY(0)' },
  exiting: { opacity: 1, transform: 'translateY(0)' },
  exited: { opacity: 0, transform: 'translateY(-20px)' },
};
