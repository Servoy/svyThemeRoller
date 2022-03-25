/**
 * @properties={typeid:24,uuid:"9E6F03F0-F42C-4478-A033-D60EBAE7AA61"}
 */
function setButtonStyleValuelist() {
	var buttonStyles = scopes.svyStyleWizard.buttonStyles;

	var dataset = databaseManager.createEmptyDataSet(0, ['displayValue', 'realValue']);

	for (var i = 0; i < buttonStyles.length; i++) {
		var buttonStyle = buttonStyles[i]
		var display = '<div class="wizard-btn-styles"><span class="wizard-btn-styles-text"> ' + buttonStyle + '</span><span class="wizard-btn-styles-icon btn-round ' + buttonStyle + '"><span class="bts-label-icon fas fa-font"></span></span>'

		dataset.addRow([display, buttonStyle]);

	}

	application.setValueListItems("buttonStyles", dataset);
}
