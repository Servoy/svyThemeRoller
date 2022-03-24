
/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"E4A44159-BD91-44F6-BA83-8FA67E21022A"}
 */
function onActionCancel(event, dataTarget) {
	scopes.svyNavigationHistory.back();
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