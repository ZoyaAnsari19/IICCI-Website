export {};

declare global {
  interface Window {
    __closeMobileMenu?: () => void;
  }
}
