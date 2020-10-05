/**
 * Custom hooks functions
 */
import { useEffect, useState } from "react";
import { Observable } from "rxjs";

/**
 * Subscribes to use observable and calls setValue whenever it emits a new value
 */
export function useObservable<T>(
  observable: Observable<T>,
  setValue: (value: T) => void
) {
  useEffect(() => {
    const sub = observable.subscribe((value) => {
      setValue(value);
    });
    return () => {
      sub.unsubscribe();
    };
  }, [observable, setValue]);
}

/**
 * Forces component to update
 */
export function useForceUpdate() {
  const [, setValue] = useState(0);
  return () => setValue((pre) => pre + 1);
}
