import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}

/**
 * Catches runtime failures inside the 3D canvas (context creation refused,
 * driver crash, chunk load failure) and hands over to the static showcase so a
 * broken GPU never takes the page down with it.
 */
export class ViewerBoundary extends Component<Props, { failed: boolean }> {
  override state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn(
      "3D viewer unavailable, using static fallback:",
      error.message,
      info.componentStack,
    );
  }

  override render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
