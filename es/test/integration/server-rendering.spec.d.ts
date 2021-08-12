/**
 * @jest-environment node
 *
 * Set this so that `window` is undefined to correctly mimic a Node SSR scenario.
 * That allows connectAdvanced to fall back to `useEffect` instead of `useLayoutEffect`
 * to avoid ugly console warnings when used with SSR.
 */
export {};
