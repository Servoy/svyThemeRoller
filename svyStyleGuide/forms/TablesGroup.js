/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"EE76344A-998C-42B4-9723-8BAF0D1167FF"}
 * @AllowToRunInFind
 */
function onShow(firstShow, event) {
	foundset.addFoundSetFilterParam('category','=','Tables','category');
	foundset.loadAllRecords();
}
