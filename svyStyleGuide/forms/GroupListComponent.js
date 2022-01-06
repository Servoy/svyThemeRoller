/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 * @private
 * @properties={typeid:24,uuid:"7137FB4D-102D-4468-BA95-9DCB7F6919F6"}
 */
function onActionResetCardDefault(event, dataTarget) {
	var selectedCard = foundset.getSelectedRecord();
	selectedCard.value = forms.ThemeConfigurator.defaultStyle[selectedCard.property];
}
