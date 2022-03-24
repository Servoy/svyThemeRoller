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
	
	fs.element_type = elementType
	fs.style_classes = styleClasses;

	if (databaseManager.saveData(fs)) {
		return true
	} else {
		databaseManager.revertEditedRecords(fs);
	}
	return false;
}
