
/**
 * @param {JSEvent} event
 * @param {CustomType<servoyextra-collapse.collapsible>} collapsible
 * @param {number} collapsibleIndex
 * @param {string} dataTarget
 *
 * @return {boolean}
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"25B36C93-27FC-467A-99C1-DF821592F181"}
 */
function onHeaderClicked(event, collapsible, collapsibleIndex, dataTarget) {
	if (collapsibleIndex == 4) {
		application.output("FINISH")
		return false;
	}
	return true;
}
