import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Shared application error boundary (Phase 6). Catches render-time errors anywhere in
 * the subtree and shows a graceful fallback instead of a blank screen. When `resetKey`
 * changes (e.g. the route path), the boundary clears its error so navigating away from
 * a broken page recovers automatically.
 *
 * This is a class component because React only supports error boundaries via classes.
 */
interface Props {
  children: ReactNode;
  resetKey?: string;
  /** Compact fallback (keeps surrounding chrome) vs. full-screen fallback. */
  compact?: boolean;
}
interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surface the error for debugging; production monitoring can hook in here later.
    console.error("Uncaught UI error:", error, info.componentStack);
  }

  componentDidUpdate(prev: Props) {
    if (this.state.error && prev.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  reset = () => this.setState({ error: null });

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className={this.props.compact ? "py-10" : "min-h-dvh grid place-items-center p-6"}>
        <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl border border-destructive/30 bg-destructive/5 px-6 py-12 text-center">
          <div className="rounded-2xl bg-destructive/10 p-4 mb-4">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <h3 className="text-lg font-semibold">Something went wrong</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            An unexpected error occurred while rendering this view. You can try again or reload the app.
          </p>
          <div className="mt-6 flex gap-3">
            <Button variant="outline" onClick={this.reset} className="rounded-full">Try again</Button>
            <Button onClick={() => window.location.reload()} className="rounded-full gradient-primary text-primary-foreground">
              Reload app
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
