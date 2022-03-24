/**
 * @public
 * @properties={typeid:35,uuid:"2794ECBB-AE70-487C-910E-E80328177879",variableType:-4}
 */
var STYLE_ELEMENT_TYPES = {
	BUTTON: 1,
	LABEL: 2,
	INPUT: 3
}

/**
 * @public
 * @param name
 * @param elementType
 * @param styleClasses
 *
 * @return {JSRecord<mem:styles>}
 *
 * @properties={typeid:24,uuid:"A0BB5CF7-0C6E-4521-ABD8-CE06FCE0C8CE"}
 */
function createStyle(name, elementType, styleClasses) {

	var fs = datasources.mem.styles.getFoundSet();
	fs.newRecord();
	fs.element_type = elementType
	fs.style_name = name;
	fs.style_classes = styleClasses;

	if (databaseManager.saveData(fs)) {
		return fs.getSelectedRecord();
	} else {
		databaseManager.revertEditedRecords(fs);
	}
	return null;
}

/**
 * @public
 * @param styleUUID
 * @param styleClasses
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"3C277DB0-5D68-4F3A-AF91-889606F8DBF2"}
 */
function updateStyle(styleUUID, styleClasses) {

	var fs = datasources.mem.styles.getFoundSet();
	fs.loadRecords(styleUUID);
	if (!fs.getSize()) {
		return false;
	}

	fs.style_classes = styleClasses;

	if (databaseManager.saveData(fs)) {
		return true
	} else {
		databaseManager.revertEditedRecords(fs);
	}
	return false;
}

/**
 * @param styleName
 * @param elementType
 *
 * @return {JSRecord<mem:styles>}
 *
 * @properties={typeid:24,uuid:"1F8D3733-A5C0-4E32-9BD0-FBA238F7EED0"}
 */
function getStyleRecord(styleName, elementType) {

	var q = datasources.mem.styles.createSelect();
	q.where.add(q.columns.style_name.eq(styleName));
	q.where.add(q.columns.element_type.eq(elementType));

	var fs = datasources.mem.styles.getFoundSet();
	fs.loadRecords(q);
	if (!fs.getSize()) {
		return null;
	}

	return fs.getSelectedRecord();
}

/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 *
 * @properties={typeid:24,uuid:"A5901506-1957-4D77-9D55-A2353A5E565C"}
 */
function onActionEdit(event, dataTarget) {
	/** @type {RuntimeForm<styleSolModel>} */
	var form = forms[event.getFormName()];
	var elementType = form.getStyleElementType();
	var styleName = event.getElementName().split("$")[0];

	/** @type {JSRecord<mem:styles>} */
	var record = getStyleRecord(styleName, elementType)

	/** @type {RuntimeForm<styleWizardBase>} */
	var formWizard;
	switch (record.element_type) {
	case STYLE_ELEMENT_TYPES.BUTTON:
		formWizard = forms.styleWizardButton
		break;
	case STYLE_ELEMENT_TYPES.LABEL:
		throw "to be done"
		break;
	case STYLE_ELEMENT_TYPES.INPUT:
		throw "to be done"

		break;
	default:
		break;
	}

	formWizard.setStyle(record);
	globals.showForm(formWizard);
}

