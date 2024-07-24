/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"C3A1031C-1B1E-4EE3-ADB3-25D569071EA4"}
 */
function onActionResetStyle(event) {
	//restore default CSS
	scopes.svyStyleGuide.overrideCSS('');

	//clear local storage
	application.removeUserProperty('customCss');

	//reset form variables
	var columns = ["property", "value", "units", "id", "category", "name", "type", "desc"];
	var dataset = databaseManager.createEmptyDataSet(0, columns);

	var index = Object.keys(scopes.svyStyleGuide.defaultStyle);
	for (var prop in scopes.svyStyleGuide.defaultStyle) {
		dataset.addRow([prop, scopes.svyStyleGuide.defaultStyle[prop], '', (index.indexOf(prop) + 1), scopes.svyStyleGuide.objCSS[prop].category, scopes.svyStyleGuide.objCSS[prop].name, scopes.svyStyleGuide.objCSS[prop].type, scopes.svyStyleGuide.objCSS[prop].desc]);
	}

	dataset.createDataSource("cssTable");
}

/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"9A29640A-0185-4030-BEA4-BDB568E8820C"}
 */
function onActionApplyStyle(event) {
	scopes.svyStyleGuide.applyStyle();
}

/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"7FFC9617-B84D-48C6-BED3-FA6947B78283"}
 */
function onActionDownloadStyle(event) {
	var media = solutionModel.getMedia('svyStyleGuideTemplate.less');
	var mediaCssText = media.getAsString();
	var mediaCssArr = mediaCssText.split('\n');
	for (var i = 0; i < mediaCssArr.length; i++) {
		if (i == 0) {
			mediaCssArr[i] = "//import of the custom servoy theme properties that will import the hidden servoy theme, this imported file is for customizing the default servoy theme properties\n@import 'custom_servoy_theme_properties.less';";
		} else if (i > 0 && mediaCssArr[i].indexOf('@') == 0) {
			//adding the default value for the variables that has changed
			mediaCssArr[i] = mediaCssArr[i].trim() + " // default: " + scopes.svyStyleGuide.defaultStyle['' + mediaCssArr[i].split(':')[0].slice(1).split('-').join('')];
		}
	}

	if (media.getAsString().length > 0) {
		plugins.file.writeTXTFile('CustomTheme.less', mediaCssArr.join('\n'));
	} else {
		plugins.dialogs.showWarningDialog("Warning", "You cannot download the default CSS!");
	}
}

/**
 * Callback method for when form is shown.
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 * @private
 * @properties={typeid:24,uuid:"36E8977A-546E-4F67-81F8-A889E0FE7D5C"}
 */
function onShow(firstShow, event) {
	elements.collapse.show(0);
}

/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"19B69179-7AEE-4421-88F3-14E75C6128BD"}
 */
function onActionCancel(event) {
	//application.showForm(forms.styleGuide);
	plugins.window.cancelFormPopup()
}