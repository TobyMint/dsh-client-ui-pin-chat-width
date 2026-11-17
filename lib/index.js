//#region lib/index.js
/**
 * Pin-chat-width plugin, node half. The empty apply gives Loader a host-side
 * row while the browser half (a single CSS rule) ships through `exports["./client"]`.
 */
/** Host plugin body — this package contributes browser presentation only. */
function apply() {}
//#endregion
export { apply };
