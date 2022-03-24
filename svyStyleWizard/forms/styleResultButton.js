/**
 * @type {String}
 * @properties={typeid:35,uuid:"4EBAB626-1FE5-47F3-99A2-A6596A407387"}
 */
var styleClasses = 'btn btn-default';

/**
 * @properties={typeid:24,uuid:"24EF33EA-AC49-41C8-908B-116466BA5127"}
 */
function updateElementStyle(classes) {
	
	
	var oldClasses = styleClasses ? styleClasses.split(' ') : [];
	for (var i = 0; i < oldClasses.length; i++) {
		elements.button.removeStyleClass(oldClasses[i]);
	}
	
	styleClasses = classes;
	elements.button.addStyleClass(styleClasses);
	
}