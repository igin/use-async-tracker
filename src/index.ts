import { useCallback, useEffect, useRef, useState } from "react";

export enum PromiseState {
  Idle,
  InProgress,
  Failed,
  Succeeded,
}

type PromiseTrackerState<ResponseType> =
  | {
      status: PromiseState.Idle;
    }
  | {
      status: PromiseState.InProgress;
    }
  | {
      status: PromiseState.Failed;
      error: Error;
    }
  | {
      status: PromiseState.Succeeded;
      data: ResponseType;
    };

interface UsePromiseTrackerReturnType<ResponseType> {
  promiseState: PromiseTrackerState<ResponseType>,
  track: (call: () => Promise<ResponseType>) => void
}

export function usePromiseTracker<ResponseType>(): UsePromiseTrackerReturnType<ResponseType> {
  const [promiseTrackerState, setPromiseTrackerState] = useState<
    PromiseTrackerState<ResponseType>
  >({ status: PromiseState.Idle });
  const canceled = useRef(false);

  const cancel = useCallback(() => {
    canceled.current = true;
  }, []);

  // By default cancel the tracking when the component is unmounted to avoid
  // setting the state of an unmounted component.
  useEffect(() => cancel, [cancel]);

  const track = useCallback(
    async (call: () => Promise<ResponseType>) =>
      trackAsyncFunction(call, setPromiseTrackerState, canceled),
    [setPromiseTrackerState]
  );

  return {
    promiseState: promiseTrackerState,
    track,
  };
}

/**
 * Tracks the state of the provided async function by calling
 * the provided setPromiseState function. If cancelled.current
 * is true the setPromiseState calls will be omitted.
 */
async function trackAsyncFunction<ResponseType>(
  call: () => Promise<ResponseType>,
  setPromiseState: (state: PromiseTrackerState<ResponseType>) => void,
  canceled: { current: boolean }
) {
  try {
    if (canceled.current) {
      console.warn("[usePromiseTracker]: tracking promise after cancel");
      return;
    }

    setPromiseState({
        status: PromiseState.Idle,
    });

    const data = await call();

    if (!canceled.current) {
      setPromiseState({
        status: PromiseState.Succeeded,
        data,
      });
    }
  } catch (error) {
    if (!canceled.current) {
      setPromiseState({
        status: PromiseState.Failed,
        error:
          error instanceof Error
            ? error
            : new Error(
                "[usePromiseTracker]: promise has been rejected with non error object"
              ),
      });
    }
  }
}
