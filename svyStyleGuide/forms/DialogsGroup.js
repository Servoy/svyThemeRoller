/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"E604366B-4109-4665-8AD3-2DA63D767275"}
 * @AllowToRunInFind
 */
function onShow(firstShow, event) {
	foundset.addFoundSetFilterParam('category','=','Dialogs','category');
	foundset.loadAllRecords();
}
