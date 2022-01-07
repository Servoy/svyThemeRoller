/**
 * @properties={typeid:35,uuid:"340DA30A-6603-4DEB-8F68-7340C949AC0A",variableType:-4}
 */
var brands = ["primary", "success", "warning", "danger", "info", "tertiary", "default"];

/**
 * @properties={typeid:35,uuid:"995B0982-84F6-40BC-AB4E-878361E3ABB3",variableType:-4}
 */
var theme = {
	//clickable	shows a pointer cursor
	//clickable-hover	shows a pointer cursor with a darker background color during hover and focus
	//text-center	center the text of a label; note the label will use the entire horizontal space in responsive forms
	//text-uppercase	
	//text-lowercase	
	//text-underline	
	//font-weight-bold	
	general : ["inactive", "no-border", "border-default", "full-width"],
	label: ["text-lowercase", "text-underline", "font-weight-bold", "text-uppercase", "h", "text-brand", "bg", "bg-inverse", "bg-brand", "text-center", "clickable", "clickable-hover"],
	textbox: ["form-brand", "text-brand", "form-invalid", "border-brand"],
	/* btn-round	button with extremely rounded borders
	btn-xs,sm,md,lg	an extra small, small, medium (default) and large button
	btn-brand	use the branded color for the button background
	btn-outline-brand	use the branded color for the button foregrounds and the inverse branded color for the background
	text-uppercase	
	text-lowercase	
	text-underline	
	font-weight-bold
*/
	
	button: ["btn-brand", "btn-outline-brand", "btn-round", "btn-size", "text-uppercase", "text-lowercase", "text-underline", "font-weight-bold", "clickable", "clickable-hover"]
}

/**
 * Callback method for when solution is opened.
 * When deeplinking into solutions, the argument part of the deeplink url will be passed in as the first argument
 * All query parameters + the argument of the deeplink url will be passed in as the second argument
 * For more information on deeplinking, see the chapters on the different Clients in the Deployment Guide.
 *
 * @param {String} arg startup argument part of the deeplink url with which the Client was started
 * @param {Object<Array<String>>} queryParams all query parameters of the deeplink url with which the Client was started
 *
 * @properties={typeid:24,uuid:"84759B51-D315-4EC2-8199-9146D8D2EBE0"}
 */
function onSolutionOpen(arg, queryParams) {
	plugins.ngclientutils.setViewportMetaDefaultForMobileAwareSites();
	scopes.svyStyleGuide.loadData();
}

/**
 * @param {JSLayoutContainer} jsCol
 *
 * @properties={typeid:24,uuid:"EF231D36-2D4F-45F7-B834-D129D49273B6"}
 */
function clearContent(jsCol) {
	var rows = jsCol.getLayoutContainers()
	for (var i = 0; i < rows.length; i++) {
		rows[i].remove();
	}
}

/**
 * @param {String} formName
 * @param {String} componentType
 * @param {Array<String>} classes
 * @param {String} [defaultClass]
 * @param {Boolean} [withLabel]
 *
 * @properties={typeid:24,uuid:"CA19C7DE-57BB-4965-9FB1-231679F6EE0D"}
 */
function createForm(formName, componentType, classes, defaultClass, withLabel) {
	
	var jsForm = solutionModel.getForm(formName);
	var jsCol1 = jsForm.findLayoutContainer("col1");
	var jsCol2 = jsForm.findLayoutContainer("col2");

	var index = 1;
	
	clearContent(jsCol1);
	clearContent(jsCol2);
	
	for (var i = 0; i < classes.length; i++) {
		innerCreateLabel(classes[i]);
	}
	
	for (i = 0; i < theme.general.length; i++) {
		innerCreateLabel(theme.general[i]);
	}
	
	/**
	 * @param {String} style
	 * */
	function innerCreateLabel(style) {
		
		if (style.indexOf("-brand") > -1) {
			
			for (var b = 0; b < brands.length; b++) {
				var brandStyle = style.replace("-brand", "-" + brands[b]);
				_innerCreateComponent(brandStyle);
			}
			
		} else if (style === "h") {
			for (var h = 1; h <= 6; h++) {
				var hStyle = style + h;
				_innerCreateComponent(hStyle);
			}
		} else {
			_innerCreateComponent(style);
		}
	}
	
	/**
	 * @param {String} styleClass
	 * */
	function _innerCreateComponent(styleClass) {
		var myStyleClass = styleClass
		if (defaultClass) {
			myStyleClass = defaultClass + " " + styleClass;
		}
		var jsCol = index%2 ? jsCol1 : jsCol2;
		
		if (withLabel) {
			createWebCompoentWithLabel(jsCol, componentType, myStyleClass, styleClass, index);
		} else {
			var jsLabel = createWebComponent(jsCol, componentType, myStyleClass, index);
			jsLabel.setJSONProperty("text", styleClass);
		}
		index ++;
		return jsLabel
	}
	
}

/**
 * @private 
 * @param {JSLayoutContainer} layoutContainer
 * @param componentType
 * @param style
 * @param index
 * 
 * @return {JSWebComponent}
 *
 * @properties={typeid:24,uuid:"0493BB03-3C3A-4E17-8488-26EDC85703C9"}
 */
function createWebComponent(layoutContainer, componentType, style, index) {
	var row = scopes.ng12grid.newRow(layoutContainer, index);
	var col = scopes.ng12grid.newColumn(row, index);
	
	var jsElement = col.newWebComponent("component_" + index, componentType, index);
	jsElement.setJSONProperty("styleClass", style);
	return jsElement;
}

/**
 * @param {JSLayoutContainer} layoutContainer
 * @param componentType
 * @param style
 * @param text
 * @param index
 * 
 * @return {JSWebComponent}
 *
 * @properties={typeid:24,uuid:"B23400C4-5D02-44F2-AE33-BF3729F0EBA4"}
 */
function createWebCompoentWithLabel(layoutContainer, componentType, style, text, index) {
	var group = scopes.ng12grid.newInlineGroup(layoutContainer, index, null, null, scopes.ng12grid.INLINE_GROUP.DATA_LEFT_RIGHT_SIZE.LG);
	group.right.remove();
	
	var jsLabel = group.left.newWebComponent("label_" + index, scopes.ngBootstrapcomponents.BTS_COMPONENTS.LABEL, 1);
	jsLabel.setJSONProperty("text", text);
	
	var jsElement = group.content.newWebComponent("component_" + index, componentType, 1);
	jsElement.setJSONProperty("styleClass", style);
	jsElement.setJSONProperty("dataProvider", "dataprovider");
	
	forms[jsElement.getFormName()].createElementInstance(jsElement);
	
	return jsElement;
}

/**
 * @properties={typeid:24,uuid:"C30B54E3-BCC5-46B5-9D70-F9A98E54237B"}
 */
function createLabelStyleGuide() {
	createForm("Label", scopes.ngBootstrapcomponents.BTS_COMPONENTS.LABEL, theme.label, "default-align");
	servoyDeveloper.save("Label")
	forms.Label.controller.recreateUI()

}

/**
 * @properties={typeid:24,uuid:"4B5EDB48-1A77-449B-9271-FAE7046CC7BB"}
 */
function createButtonStyleGuide() {
	createForm("Button", scopes.ngBootstrapcomponents.BTS_COMPONENTS.BUTTON, theme.button, "btn btn-default");
	servoyDeveloper.save("Button");
	forms.Button.controller.recreateUI()
}

/**
 * @properties={typeid:24,uuid:"E5CE3C9E-013E-4C01-88D9-F01DED567E42"}
 */
function createTextboxStyleGuide() {
	var formName = forms.Textbox.controller.getName();
	createForm(formName, scopes.ngBootstrapcomponents.BTS_COMPONENTS.TEXTBOX, theme.textbox, "form-control", true);
	servoyDeveloper.save(formName);
	forms[formName].controller.recreateUI()
}

/**
 * @properties={typeid:24,uuid:"EAAA75A2-50D9-4423-8F4F-2EAD3D12B942"}
 */
function createComboboxStyleGuide() {
	var formName = forms.Combobox.controller.getName();
	createForm(formName, scopes.ngBootstrapcomponents.BTS_COMPONENTS.COMBOBOX, theme.textbox, null, true);
	servoyDeveloper.save(formName);
	forms[formName].controller.recreateUI()
}

/**
 * @properties={typeid:24,uuid:"8D65F96C-0B63-43C6-9494-F5C2FC8C62F7"}
 */
function createSelectStyleGuide() {
	var formName = forms.Select.controller.getName();
	createForm(formName, scopes.ngBootstrapcomponents.BTS_COMPONENTS.SELECT, theme.textbox, 'form-control', true);
	servoyDeveloper.save(formName);
	forms[formName].controller.recreateUI()
}

/**
 * @properties={typeid:24,uuid:"AE66EE7C-FA3E-4D3B-8997-89F290995175"}
 */
function createTypeaheadStyleGuide() {
	var formName = forms.Typeahead.controller.getName();
	createForm(formName, scopes.ngBootstrapcomponents.BTS_COMPONENTS.TYPEAHEAD, theme.textbox, 'form-control', true);
	servoyDeveloper.save(formName);
	forms[formName].controller.recreateUI()
}

/**
 * @properties={typeid:24,uuid:"98FE855C-914B-4353-9484-6926B512E998"}
 */
function createTokenizerStyleGuide() {
	var formName = forms.Tokenizer.controller.getName();
	createForm(formName, scopes.ngBootstrapcomponents.SVYEXTRA_COMPONENTS.SELECT2TOKENIZER, theme.textbox, "select2-sm", true);
	servoyDeveloper.save(formName);
	forms[formName].controller.recreateUI()
}

/**
 * @properties={typeid:24,uuid:"35FD56C9-E870-4F92-BA3E-98A6BB04CC4B"}
 */
function createTextareaStyleGuide() {
	var formName = forms.Textarea.controller.getName();
	createForm(formName, scopes.ngBootstrapcomponents.BTS_COMPONENTS.TEXTAREA, theme.textbox, "form-control", true);
	servoyDeveloper.save(formName);
	forms[formName].controller.recreateUI()
}


/**
 * @properties={typeid:24,uuid:"EB097A10-5E85-4984-91BB-4DA34A82B1CA"}
 */
function createCalendarStyleGuide() {
	var formName = forms.Calendar.controller.getName();
	createForm(formName, scopes.ngBootstrapcomponents.BTS_COMPONENTS.CALENDAR, theme.textbox, "form-control", true);
	servoyDeveloper.save(formName);
	forms[formName].controller.recreateUI()
}

/**
 * @properties={typeid:24,uuid:"838CED47-4BDF-445F-9022-FC46336D1717"}
 */
function createCheckboxStyleGuide() {
	var formName = forms.Checkbox.controller.getName();
	createForm(formName, scopes.ngBootstrapcomponents.BTS_COMPONENTS.CHECKBOX, theme.textbox, "checkbox", true);
	servoyDeveloper.save(formName);
	forms[formName].controller.recreateUI()
}

/**
 * @properties={typeid:24,uuid:"B1F05E70-010F-4299-8FAA-EEA36858A950"}
 */
function createChoicegroupStyleGuide() {
	var formName = forms.Choicegroup.controller.getName();
	createForm(formName, scopes.ngBootstrapcomponents.BTS_COMPONENTS.CHOICEGROUP, theme.textbox, "checkbox", true);
	servoyDeveloper.save(formName);
	forms[formName].controller.recreateUI()
}

/**
 * @properties={typeid:24,uuid:"CF277A73-F416-4AC3-88C2-D03784B1FF86"}
 */
function createChoicegroupRadioStyleGuide() {
	var formName = forms.ChoicegroupRadio.controller.getName();
	createForm(formName, scopes.ngBootstrapcomponents.BTS_COMPONENTS.CHOICEGROUP, theme.textbox, "checkbox", true);
	servoyDeveloper.save(formName);
	forms[formName].controller.recreateUI()
}

/**
 * @properties={typeid:24,uuid:"519C2FBC-105D-425C-8D9C-89D5BD73EF32"}
 */
function createTextboxGroupStyleGuide() {
	var formName = forms.TextboxGroup.controller.getName();
	createForm(formName, scopes.ngBootstrapcomponents.SVYEXTRA_COMPONENTS.TEXTFIELD_GROUP, theme.textbox, "form-control", true);
	servoyDeveloper.save(formName);
	forms[formName].controller.recreateUI()
}

/**
 * @properties={typeid:24,uuid:"6428CCE8-7435-487D-8CF5-A9CEE1E3720D"}
 */
function createInputGroupStyleGuide() {
	var formName = forms.InputGroup.controller.getName();
	createForm(formName, scopes.ngBootstrapcomponents.BTSEXTRA_COMPONENTS.INPUT_GROUP, theme.textbox, "form-control", true);
	servoyDeveloper.save(formName);
	forms[formName].controller.recreateUI()
}


/**
 * @properties={typeid:24,uuid:"7C9A949B-596A-46CE-AB1A-F473BDE51E7B"}
 */
function createStyleGuide() {
	createLabelStyleGuide();
	createButtonStyleGuide();
	createTextboxStyleGuide();
	createTextareaStyleGuide();
	createTypeaheadStyleGuide();
	createSelectStyleGuide();
	createTokenizerStyleGuide();
	createComboboxStyleGuide();
	createCalendarStyleGuide();
	createCheckboxStyleGuide();
	createChoicegroupStyleGuide();
	createChoicegroupRadioStyleGuide();
	createTextboxGroupStyleGuide();
	//createInputGroupStyleGuide();
}