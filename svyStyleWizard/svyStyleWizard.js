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
 * @properties={typeid:35,uuid:"C459BD6C-A414-40C0-93A6-C0917136EDF2",variableType:-4}
 */
var buttonStyles = ["btn-default", "btn-primary", "btn-warning", "btn-danger", "btn-success", "btn-info", "btn-tertiary",
	"btn-outline-default", "btn-outline-primary", "btn-outline-warning", "btn-outline-danger", "btn-outline-success", "btn-outline-info", "btn-outline-tertiary"]

/**
 * @properties={typeid:35,uuid:"B1C0C476-A7EF-449D-B895-CD0BE785104A",variableType:-4}
 */
var labelColors = ["text-default", "text-primary", "text-warning", "text-danger", "text-success", "text-info", "text-tertiary"]

/**
 * @properties={typeid:35,uuid:"D0A58202-EEAF-443E-926E-05FB0D4009F6",variableType:-4}
 */
var fontSizes = ["h1", "h2", "h3", "h4", "h5", "h6"]


/**
 * Callback method for when solution is opened.
 * When deeplinking into solutions, the argument part of the deeplink url will be passed in as the first argument
 * All query parameters + the argument of the deeplink url will be passed in as the second argument
 * For more information on deeplinking, see the chapters on the different Clients in the Deployment Guide.
 *
 * @param {String} arg startup argument part of the deeplink url with which the Client was started
 * @param {Object<Array<String>|String>} queryParams all query parameters of the deeplink url with which the Client was started, key>string if there was one value else key>Array<String>
 *
 * @properties={typeid:24,uuid:"27B3199B-2F1C-47DA-8C0A-04D821CCC875"}
 */
function onSolutionOpen(arg, queryParams) {
	
	scopes.svyStyleValuelists.setButtonStyleValuelist();
	scopes.svyStyleValuelists.setLabelColorValuelist();
	scopes.svyStyleValuelists.setFontSizeValuelist();

	try {
		if (servoyDeveloper.getExistingVariants) {
			var existingStyles = servoyDeveloper.getExistingVariants("button");
			for (var i = 0; i < existingStyles.length; i++) {
				var style = existingStyles[i];
				var classes = style.classes ? style.classes.join(" ") : "";
				scopes.entityStyles.createStyle(style.name, scopes.entityStyles.STYLE_ELEMENT_TYPES.BUTTON, classes)
			}
		}
	} catch (e) {
		application.output(e, LOGGINGLEVEL.ERROR)
	}
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

