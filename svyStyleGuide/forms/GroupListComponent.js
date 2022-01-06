/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 * @private
 * @properties={typeid:24,uuid:"7137FB4D-102D-4468-BA95-9DCB7F6919F6"}
 */
function onActionResetCardDefault(event, dataTarget) {
	var selectedCard = foundset.getSelectedRecord();
	selectedCard.value = scopes.svyStyleGuide.defaultStyle[selectedCard.property];

	forms.ThemeConfigurator.applyStyle({ });
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
	var selectedCard = scopes.svyStyleGuide.styleGuideInfo[foundset.getSelectedRecord().property];

	/*this will show the specific info based on the component name that should be set it exactly like the names of the styleGuideInfo object which also will keep the information*/
	if (selectedCard) {
		plugins.dialogs.showInfoDialog('Info', selectedCard);
	} else {
		plugins.dialogs.showInfoDialog('Info', 'This property has no Info');
	}
}