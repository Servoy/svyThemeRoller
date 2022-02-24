/**
 * @properties={type:12,typeid:36,uuid:"95CB8083-70C9-4F96-9CF3-66E04A0AA9D8"}
 */
function cardTypeStyleClass() {
	var className = '';

	if (type == 'unit') {

		className = 'card-unit';

	} else if (type == 'color') {

		className = 'card-color';

	} else if (type == 'custom') {
		className = 'card-empty';
	}

	if (value != scopes.svyStyleGuide.defaultStyle[property]) {
		className += ' cardChangeSignal';
	}
	
	if ((type == 'unit' && !(parseInt(value) > 0))) {
		className += ' units-disable';
	}

	return className ? className : '';
}