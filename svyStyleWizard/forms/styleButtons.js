/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"265B5075-754B-42E5-9939-C03498781658"}
 */
function onLoad(event) {
	databaseManager.addTableFilterParam(foundset.getDataSource(), "element_type", "=", scopes.entityStyles.STYLE_ELEMENT_TYPES.BUTTON)
}
