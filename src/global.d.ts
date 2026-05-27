export {};

declare global {
  interface Window {
    __closeMobileMenu?: () => void;
    __iicciOpenAI?: () => void;
    __iicciCloseAI?: () => void;
    __iicciToggleAI?: () => void;
    __iicciLenis?: {
      stop: () => void;
      start: () => void;
    };
  }
}
