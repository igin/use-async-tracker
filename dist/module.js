import {useState as $hgUW1$useState, useRef as $hgUW1$useRef, useCallback as $hgUW1$useCallback, useEffect as $hgUW1$useEffect} from "react";


let $149c1bd638913645$export$7bc76142acab2181;
(function($149c1bd638913645$export$7bc76142acab2181) {
    $149c1bd638913645$export$7bc76142acab2181[$149c1bd638913645$export$7bc76142acab2181["Idle"] = 0] = "Idle";
    $149c1bd638913645$export$7bc76142acab2181[$149c1bd638913645$export$7bc76142acab2181["InProgress"] = 1] = "InProgress";
    $149c1bd638913645$export$7bc76142acab2181[$149c1bd638913645$export$7bc76142acab2181["Failed"] = 2] = "Failed";
    $149c1bd638913645$export$7bc76142acab2181[$149c1bd638913645$export$7bc76142acab2181["Succeeded"] = 3] = "Succeeded";
})($149c1bd638913645$export$7bc76142acab2181 || ($149c1bd638913645$export$7bc76142acab2181 = {
}));
function $149c1bd638913645$export$336d34ce3c87ca03() {
    const [promiseTrackerState, setPromiseTrackerState] = $hgUW1$useState({
        status: $149c1bd638913645$export$7bc76142acab2181.Idle
    });
    const canceled = $hgUW1$useRef(false);
    const cancel = $hgUW1$useCallback(()=>{
        canceled.current = true;
    }, []);
    // By default cancel the tracking when the component is unmounted to avoid
    // setting the state of an unmounted component.
    $hgUW1$useEffect(()=>cancel
    , [
        cancel
    ]);
    const track = $hgUW1$useCallback(async (call)=>$149c1bd638913645$var$trackAsyncFunction(call, setPromiseTrackerState, canceled)
    , [
        setPromiseTrackerState
    ]);
    return {
        promiseState: promiseTrackerState,
        track: track
    };
}
/**
 * Tracks the state of the provided async function by calling
 * the provided setPromiseState function. If cancelled.current
 * is true the setPromiseState calls will be omitted.
 */ async function $149c1bd638913645$var$trackAsyncFunction(call, setPromiseState, canceled) {
    try {
        if (canceled.current) {
            console.warn("[usePromiseTracker]: tracking promise after cancel");
            return;
        }
        setPromiseState({
            status: $149c1bd638913645$export$7bc76142acab2181.Idle
        });
        const data = await call();
        if (!canceled.current) setPromiseState({
            status: $149c1bd638913645$export$7bc76142acab2181.Succeeded,
            data: data
        });
    } catch (error) {
        if (!canceled.current) setPromiseState({
            status: $149c1bd638913645$export$7bc76142acab2181.Failed,
            error: error instanceof Error ? error : new Error("[usePromiseTracker]: promise has been rejected with non error object")
        });
    }
}


export {$149c1bd638913645$export$7bc76142acab2181 as PromiseState, $149c1bd638913645$export$336d34ce3c87ca03 as usePromiseTracker};
//# sourceMappingURL=module.js.map
