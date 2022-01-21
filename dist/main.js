var $8zHUo$react = require("react");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "PromiseState", () => $882b6d93070905b3$export$7bc76142acab2181);
$parcel$export(module.exports, "usePromiseTracker", () => $882b6d93070905b3$export$336d34ce3c87ca03);

let $882b6d93070905b3$export$7bc76142acab2181;
(function($882b6d93070905b3$export$7bc76142acab2181) {
    $882b6d93070905b3$export$7bc76142acab2181[$882b6d93070905b3$export$7bc76142acab2181["Idle"] = 0] = "Idle";
    $882b6d93070905b3$export$7bc76142acab2181[$882b6d93070905b3$export$7bc76142acab2181["InProgress"] = 1] = "InProgress";
    $882b6d93070905b3$export$7bc76142acab2181[$882b6d93070905b3$export$7bc76142acab2181["Failed"] = 2] = "Failed";
    $882b6d93070905b3$export$7bc76142acab2181[$882b6d93070905b3$export$7bc76142acab2181["Succeeded"] = 3] = "Succeeded";
})($882b6d93070905b3$export$7bc76142acab2181 || ($882b6d93070905b3$export$7bc76142acab2181 = {
}));
function $882b6d93070905b3$export$336d34ce3c87ca03() {
    const [promiseTrackerState, setPromiseTrackerState] = $8zHUo$react.useState({
        status: $882b6d93070905b3$export$7bc76142acab2181.Idle
    });
    const canceled = $8zHUo$react.useRef(false);
    const cancel = $8zHUo$react.useCallback(()=>{
        canceled.current = true;
    }, []);
    // By default cancel the tracking when the component is unmounted to avoid
    // setting the state of an unmounted component.
    $8zHUo$react.useEffect(()=>cancel
    , [
        cancel
    ]);
    const track = $8zHUo$react.useCallback(async (call)=>$882b6d93070905b3$var$trackAsyncFunction(call, setPromiseTrackerState, canceled)
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
 */ async function $882b6d93070905b3$var$trackAsyncFunction(call, setPromiseState, canceled) {
    try {
        if (canceled.current) {
            console.warn("[usePromiseTracker]: tracking promise after cancel");
            return;
        }
        setPromiseState({
            status: $882b6d93070905b3$export$7bc76142acab2181.Idle
        });
        const data = await call();
        if (!canceled.current) setPromiseState({
            status: $882b6d93070905b3$export$7bc76142acab2181.Succeeded,
            data: data
        });
    } catch (error) {
        if (!canceled.current) setPromiseState({
            status: $882b6d93070905b3$export$7bc76142acab2181.Failed,
            error: error instanceof Error ? error : new Error("[usePromiseTracker]: promise has been rejected with non error object")
        });
    }
}


//# sourceMappingURL=main.js.map
