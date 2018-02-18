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
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

// Medium fade styles
export const mediumFadeStyles = {
  default: {
    transition: `opacity ${durations.medium}ms ease-in-out`,
    opacity: 0,
  },
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

// Long Fade styles
export const longFadeStyles = {
  default: {
    transition: `opacity ${durations.long}ms ease-in-out`,
    opacity: 0,
  },
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};
