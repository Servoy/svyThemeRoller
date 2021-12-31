/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"99B93EAF-9743-4FB8-9048-AF5155B575AB"}
 * @AllowToRunInFind
 */
function onShow(firstShow, event) {
	foundset.addFoundSetFilterParam('category','=','Margins and Padding','category');
	foundset.loadAllRecords();
}
