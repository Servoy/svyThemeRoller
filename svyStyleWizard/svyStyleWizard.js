/**
 * @enum
 * @public
 * @properties={typeid:35,uuid:"AAB77EBE-0B5F-477D-9284-524C7E5BF4E4",variableType:-4}
 */
var SIDES = {
	TOP: 'top',
	RIGHT: 'right',
	BOTTOM: 'bottom',
	LEFT: 'left'
}

/**
 * @param {String} realValue
 * @param [side]
 * @return {String}
 * @properties={typeid:24,uuid:"9956A894-3425-43E6-A9A4-246695E2FBC8"}
 */
function getMarginStyleClass(realValue, side) {
	var marginStyleClass = 'margin-';

	if (side) {
		marginStyleClass += side + '-'
	}

	switch (realValue) {
	case '0':
		marginStyleClass = 'no-margin';
		if (side) marginStyleClass += '-' + side;
		break;
	case '10':
		marginStyleClass += '10 ';
		break;
	case '15':
		marginStyleClass += '15 ';
		break;
	case '20':
		marginStyleClass += '20 ';
		break;
	case '30':
		marginStyleClass += '30 ';
		break;
	case '-1':
	default:
		marginStyleClass = '';
		break;
	}

	return marginStyleClass;
}
