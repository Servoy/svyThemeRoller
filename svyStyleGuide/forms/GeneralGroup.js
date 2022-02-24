/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"449BD6C0-B9A3-4800-B29B-1962D187A970"}
 * @AllowToRunInFind
 */
function onShow(firstShow, event) {
	foundset.addFoundSetFilterParam('category','=','General','category');
	foundset.loadAllRecords();
}
