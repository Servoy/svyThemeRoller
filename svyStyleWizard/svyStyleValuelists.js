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

/**
 * @properties={typeid:24,uuid:"43259D4F-A1BA-410C-B9B7-D07E871F4ACB"}
 */
function setLabelColorValuelist() {
	var labelColors = scopes.svyStyleWizard.labelColors;

	var dataset = databaseManager.createEmptyDataSet(0, ['displayValue', 'realValue']);

	for (var i = 0; i < labelColors.length; i++) {
		var labelColor = labelColors[i]
		var display = '<div class="wizard-btn-styles"><span class="wizard-btn-styles-text"> ' + labelColor + '</span><span class="wizard-btn-styles-icon btn-round ' + labelColor + '"><span class="bts-label-icon fas fa-font"></span></span>'
		dataset.addRow([display, labelColor]);
	}

	application.setValueListItems("labelColors", dataset);
}