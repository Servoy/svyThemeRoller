/**
 * @type {String}
 * @properties={typeid:35,uuid:"5B3D775B-F87D-4610-897A-82E360B03956"}
 */
var styleClasses = 'default-align';

/**
 * @properties={typeid:24,uuid:"CA0A2C40-9325-4279-A848-CBAB2C57DD94"}
 */
function updateElementStyle(classes) {
	
	
	var oldClasses = styleClasses ? styleClasses.split(' ') : [];
	for (var i = 0; i < oldClasses.length; i++) {
		elements.label.removeStyleClass(oldClasses[i]);
	}
	
	styleClasses = classes;
	elements.label.addStyleClass(styleClasses);
	
}
