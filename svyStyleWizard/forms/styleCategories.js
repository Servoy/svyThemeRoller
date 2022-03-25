
/**
 * @param {JSEvent} event
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"983EFE70-E3F5-4615-AE10-A2B9E3642BA9"}
 */
function onActionOpenButton(event) {
	globals.showForm(forms.styleButtons);
}

/**
 * @param {JSEvent} event
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"8CCC19A2-D019-46A7-91EB-212DFF645C6F"}
 */
function onActionOpenLabel(event) {
	globals.showForm(forms.styleLabels)
}

/**
 * @param {JSEvent} event
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"0BF30D2B-3186-4B30-A966-0DD7770DD54E"}
 */
function onActionOpenInput(event) {
	// TODO Auto-generated method stub
}

/**
 * @param {JSEvent} event
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"969A3F21-C2A3-4284-97D0-808AD7E09A54"}
 */
function onActionOpenTheme(event) {
	application.showURL("https://theme-dev.demo.servoy-cloud.eu");
}
