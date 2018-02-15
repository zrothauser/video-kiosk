// Misc durations (in milliseconds)
export const durations = {
  shortest: 125,
  short: 250,
  medium: 660,
  long: 1000,
};

// Misc transitions
export const shortFadeStyles = {
  default: {
    transition: `opacity ${durations.shortest}ms ease-in-out`,
    opacity: 0,
  },
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 },
};

// Layer A
// Used for the Play/Pause button
export const layerAStyles = {
  default: {
    transition: `opacity ${durations.medium}ms ease-in-out`,
    transitionDelay: `z-index ${durations.medium}ms`,
    opacity: 0,
  },
  entering: {
    opacity: 0,
    zIndex: -1,
  },
  entered: {
    opacity: 1,
    zIndex: 1,
  },
  exiting: {
    opacity: 1,
    zIndex: 1,
  },
  exited: {
    opacity: 0,
    zIndex: -1,
  },
};

// Layer B
// Used for Top Bar / Index
export const layerBStyles = {
  default: {
    transition: `opacity ${durations.medium}ms ease-in-out, transform ${durations.medium}ms ease-in-out`,
    opacity: 0,
  },
  entering: {
    opacity: 0,
  },
  entered: {
    opacity: 1,
  },
  exiting: {
    opacity: 1,
  },
  exited: {
    opacity: 0,
  },
};

// Layer C
// Used for Controls
export const layerCStyles = {
  default: {
    transition: `opacity ${durations.long}ms ease-in-out, transform ${durations.long}ms ease-in-out`,
    opacity: 0,
  },
  entering: {
    opacity: 0,
  },
  entered: {
    opacity: 1,
  },
  exiting: {
    opacity: 1,
  },
  exited: {
    opacity: 0,
  },
};

// Layer D
// Used for Type
export const layerDStyles = {
  default: {
    transition: `opacity ${durations.long}ms ease-in-out, transform ${durations.long}ms ease-in-out`,
    opacity: 0,
  },
  entering: {
    opacity: 0,
    transform: 'translateY(40px)',
  },
  entered: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  exiting: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  exited: {
    opacity: 0,
    transform: 'translateY(40px)',
  },
};

// Layer F
// Used for Thumbnails
export const layerFStyles = {
  default: {
    transition: `opacity ${durations.long}ms ease-in-out, transform ${durations.long}ms ease-in-out`,
    opacity: 0,
  },
  entering: {
    opacity: 0,
    transform: 'translateY(50px)',
  },
  entered: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  exiting: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  exited: {
    opacity: 0,
    transform: 'translateY(50px)',
  },
};

// Layer G
// Used for Background Video
export const layerGStyles = {
  default: {
    transition: `opacity ${durations.medium}ms ease-in-out`,
    opacity: 0,
  },
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 },
};
