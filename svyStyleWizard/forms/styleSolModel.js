/**
 * @properties={typeid:24,uuid:"6357835D-48C4-4C7D-A702-B124E13D25A1"}
 */
function getElementType() {
	throw 'implement get elementType'
}

/**
 * @properties={typeid:24,uuid:"B5B32B04-AF06-4510-9DF2-29229F342C85"}
 */
function getStyleElementType() {
	throw 'implement get elementType'
}

/**
 * @properties={typeid:24,uuid:"9D45757B-8148-40DB-B007-432DFFA2B6E8"}
 */
function revertList() {
	//	var jsform = solutionModel.getForm(controller.getName());
	//	solutionModel.removeForm(controller.getName());
	//	solutionModel.revertForm(controller.getName());
}

/**
 * @param {JSFoundSet<mem:styles>} fs
 *
 * @properties={typeid:24,uuid:"C24768D0-6938-4526-B087-3AAF81DA1FF0"}
 */
function createList(fs) {
	var jsform = solutionModel.getForm(controller.getName());

	var jsdiv = jsform.getLayoutContainer("container");
	var components = jsdiv.getWebComponents();
	for (var i = 0; i < components.length; i++) {
		jsdiv.removeWebComponent(components[i].name)
	}

	//var jsform = solutionModel.getForm(controller.getName());

	for (i = 1; i <= fs.getSize(); i++) {
		var record = fs.getRecord(i);
		createRow(jsform, record, 1)
	}

	controller.recreateUI();
}

/**
 * @param {JSForm} jsform
 * @param {JSRecord<mem:styles>} record
 * @param {Number} idx
 *
 * @properties={typeid:24,uuid:"2273EF59-636B-445A-9079-7A6F277DAF42"}
 */
function createRow(jsform, record, idx) {

	var jsdiv = jsform.getLayoutContainer("container");
	var jscomponent = jsdiv.newWebComponent(record.style_name, 'servoycore-formcomponent', idx);
	jscomponent.setJSONProperty("containedForm", getStyleFormComponent());

	jscomponent.setJSONProperty("containedForm.button.styleClass", record.style_classes);
	jscomponent.setJSONProperty("containedForm.button.text", record.style_name);
}

/**
 * @properties={typeid:24,uuid:"3FD760DB-364C-4312-B8B0-0C705E58E5C7"}
 */
function getStyleFormComponent() {
	return "styleButton";
}
