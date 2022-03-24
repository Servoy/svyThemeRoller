/**
 * @properties={typeid:35,uuid:"8ED1055B-4783-459A-8E4D-055E1951C41F",variableType:-4}
 */
var showMargin = false;

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"1C87F463-A807-4E0C-8414-A4D898C6280E"}
 */
function onShow(firstShow, event) {
	foundset.loadAllRecords();
	
	/** @type {RuntimeForm<styleSolModel>} */
	var form = forms[elements.formcontainer.containedForm];
	form.createList(foundset);
	
	updateUI();
	
}

/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"E4A44159-BD91-44F6-BA83-8FA67E21022A"}
 */
function onActionCancel(event, dataTarget) {
	globals.showForm(forms.styleCategories);
}

/**
 * @return {RuntimeForm<styleWizardBase>}
 * @properties={typeid:24,uuid:"CC137D78-B6C6-40D4-BC32-7CB9DAB18F65"}
 */
function getWizardForm() {
	throw "Need to implement getWizardForm"
}

/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"7D42B206-440C-4A05-B1D1-3F3F7DA04233"}
 */
function onActionNew(event, dataTarget) {
	var form = getWizardForm();
	form.setStyle();
	globals.showForm(form);
}

/**
 * @properties={typeid:24,uuid:"5979E94F-DC0A-41B0-A88C-D49562AC0050"}
 */
function onActionEdit() {
	var form = getWizardForm();
	form.setStyle(foundset.getSelectedRecord());
	globals.showForm(form);
}


/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"BC0A9B06-8372-4BF1-AAA7-49719C1A8830"}
 */
function onHide(event) {
	/** @type {RuntimeForm<styleSolModel>} */
	var form = forms[elements.formcontainer.containedForm];
	form.revertList();
	return true;
}

/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"42D7E70A-8F85-4E99-B978-018C16A5EECF"}
 */
function onActionToggleShowMargin(event, dataTarget) {
	// TODO Auto-generated method stub

	showMargin = !showMargin;
	updateUI();
}

/**
 * @properties={typeid:24,uuid:"FD7D2BD3-2044-4BCA-8DB3-5D43B070E12D"}
 */
function updateUI() {
	if (showMargin) {
		elements.formcontainer.addStyleClass("show-margin-enabled")
		elements.labelShowMargin.text = "Hide margins"
	} else {
		elements.formcontainer.removeStyleClass("show-margin-enabled")
		elements.labelShowMargin.text = "Show margins"
	}
}
