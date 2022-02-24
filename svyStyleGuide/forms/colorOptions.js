/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"B6A99409-3585-4CD4-834C-1B8F3DD6ACEC"}
 */
var colorPicked = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F5FD962D-3172-4E19-BA36-B58AB8C0D4CE"}
 */
var colorVariable = null;

/**
 * TODO generated, please specify type and doc for the param
 * @return
 * @properties={typeid:24,uuid:"D401DCF8-3E2D-46D0-B3A5-2A1A97C583C4"}
 */
function sendValues(){
	var variable;
	if(colorPicked){
		variable = colorPicked;
	}else{
		variable = colorVariable;
	}
	
	return variable;
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"D8C61B35-06B0-4A43-BE97-EF8442D2E19D"}
 */
function onHide(event) {
	forms.ThemeConfigurator.setColorValue(sendValues());
	colorPicked = null;
	colorVariable = null;
	return true
}
