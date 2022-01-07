/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 * @private
 * @properties={typeid:24,uuid:"7137FB4D-102D-4468-BA95-9DCB7F6919F6"}
 */
function onActionResetCardDefault(event, dataTarget) {
	var selectedCard = foundset.getSelectedRecord();
	selectedCard.value = scopes.svyStyleGuide.defaultStyle[selectedCard.property];

	scopes.svyStyleGuide.applyStyle();
}

/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 *
 * @private
 *
 * @properties={typeid:24,uuid:"E525F980-C6C7-4ECA-9F34-9C9343020B8B"}
 */
function onActionInfo(event, dataTarget) {
	var selectedCard = foundset.getSelectedRecord();

	/*this will show the specific info based on the component name that should be set it exactly like the names of the styleGuideInfo object which also will keep the information*/
	if (selectedCard.desc) {
		plugins.dialogs.showInfoDialog('Info', selectedCard.desc);
	} else {
		plugins.dialogs.showInfoDialog('Info', 'This property has no Info');
	}
}
/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
 *
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C31561B4-6DA3-4F74-B7F9-EBD37B0FB4FA"}
 */
function onDataChangeUnits(oldValue, newValue, event) {
	var selectedCard = foundset.getSelectedRecord();
	selectedCard.value = parseInt(selectedCard.value) + selectedCard.units;
	selectedCard.units = null;
	
	return true;
}
