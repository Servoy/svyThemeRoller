/**
 * @param {RuntimeForm|String} form
 *
 * @properties={typeid:24,uuid:"8CD3ADBF-B427-43E2-9C60-1FE3980B00DA"}
 */
function showForm(form) {
	/** @type {String} */
	var formName
	if (form instanceof RuntimeForm) {
		formName = form.controller.getName();
	} else {
		formName = form;
	}
	
	var navItem = scopes.svyNavigation.createNavigationItem(formName)
	scopes.svyNavigation.open(navItem);
}