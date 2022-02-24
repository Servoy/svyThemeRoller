/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"781DB85C-5053-4B57-B4B2-0916DA3D8DB1"}
 * @AllowToRunInFind
 */
function onShow(firstShow, event) {
	foundset.addFoundSetFilterParam('category','=','Validations','category');
	foundset.loadAllRecords();
}
