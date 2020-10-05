import { SnackbarOrigin, SnackbarProps } from "@material-ui/core";
import { useObservable } from "core/services/hooks";
import { Slide } from "transitions";
import { BehaviorSubject } from "rxjs";
import { useState } from "react";

type Severity = "info" | "success" | "warning" | "error";
type CloseSnackbar = () => void;
type Snackbar = SnackbarProps & { severity?: Severity };

const defaultConfig = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  } as SnackbarOrigin,
  autoHideDuration: 5000,
  severity: "info",
  TransitionComponent: Slide,
};

const store$ = new BehaviorSubject<Snackbar | null>(null);

const service = {
  snackbar$: store$.asObservable(),
  get snackbar() {
    return store$.value;
  },
  show(message: string, config?: Snackbar) {
    const snackbar = Object.assign({}, defaultConfig, { message }, config);
    store$.next(snackbar);
  },
  hide() {
    store$.next(null);
  },
};

export { service as snackbar };
export function useSnackbar(): [Snackbar | null, CloseSnackbar] {
  const [snackbar, setSnackbar] = useState<Snackbar | null>(service.snackbar);
  useObservable(service.snackbar$, setSnackbar);
  return [snackbar, service.hide];
}
