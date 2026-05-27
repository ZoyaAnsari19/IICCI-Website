export {};

declare global {
  interface Window {
    __closeMobileMenu?: () => void;
    __iicciLenis?: {
      stop: () => void;
      start: () => void;
    };
  }
}
