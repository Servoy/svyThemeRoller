/**
 * @properties={typeid:24,uuid:"DFC096AA-D023-407F-8550-97294DD969FB"}
 */
function getStyleClasses() {
	
}
/**
 * Handle changed data, return false if the value should not be accepted. In NGClient you can return also a (i18n) string, instead of false, which will be shown as a tooltip.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"BBEDBC6B-0003-499C-81E2-B286FB8A0B88"}
 */
function onElementDataChange(oldValue, newValue, event) {
	updateElementStyle(getStyleClasses());
	return true
}


/**
 * @param {String} classes
 * @properties={typeid:24,uuid:"A3E78B8D-34C5-4009-94CF-4884BD217A4C"}
 */
function updateElementStyle(classes) {
}