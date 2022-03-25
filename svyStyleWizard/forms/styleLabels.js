/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"44FFFB14-4033-4DB8-A62F-9FDBBB45D350"}
 */
function onLoad(event) {
	foundset.addFoundSetFilterParam("element_type", "=", scopes.entityStyles.STYLE_ELEMENT_TYPES.LABEL)
}

/**
 * @properties={typeid:24,uuid:"AD18A59F-F85B-4865-B709-884ACBC08FAB"}
 * @override
 */
function  getWizardForm() {
	return forms.styleWizardLabel;
}
