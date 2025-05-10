
// This file allows TypeScript to recognize the global google namespace
/// <reference types="google.maps" />

// Extend the Window interface to include google property
interface Window {
  google: typeof google;
}
