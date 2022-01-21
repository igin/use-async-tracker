export enum PromiseState {
    Idle = 0,
    InProgress = 1,
    Failed = 2,
    Succeeded = 3
}
type PromiseTrackerState<ResponseType> = {
    status: PromiseState.Idle;
} | {
    status: PromiseState.InProgress;
} | {
    status: PromiseState.Failed;
    error: Error;
} | {
    status: PromiseState.Succeeded;
    data: ResponseType;
};
interface UsePromiseTrackerReturnType<ResponseType> {
    promiseState: PromiseTrackerState<ResponseType>;
    track: (call: () => Promise<ResponseType>) => void;
}
export function usePromiseTracker<ResponseType>(): UsePromiseTrackerReturnType<ResponseType>;

//# sourceMappingURL=types.d.ts.map
