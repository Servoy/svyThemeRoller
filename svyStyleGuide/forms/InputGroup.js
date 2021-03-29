/**
 * @param {JSWebComponent} jsElement
 *
 * @properties={typeid:24,uuid:"6C907B7B-0201-45E4-8F25-378D1E8B8FC2"}
 * @override
 */
function createElementInstance(jsElement) {
	var addOns = [{
		text: 'A'
	}]
	
	var addOnButtons = [{
		text: 'B',
		imageStyleClass: 'fas fa-ellipis'
	}]
	
	jsElement.setJSONProperty("addOns",addOns);
	jsElement.setJSONProperty("addOnButtons",addOnButtons);

}
