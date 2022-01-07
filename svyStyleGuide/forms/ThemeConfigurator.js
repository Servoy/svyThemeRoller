/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"C3A1031C-1B1E-4EE3-ADB3-25D569071EA4"}
 */
function onActionResetStyle(event) {
	//restore default CSS
	overrideCSS('');

	//clear local storage
	plugins.webstorageLocalstorage.removeItem('customCss');

	//reset form variables
	foundset.deleteAllRecords();
	var dataset = databaseManager.createEmptyDataSet();
	var columns = ["property", "value", "units", "id", "category", "name", "type", "desc"];
	columns.forEach(function(itm) {
		dataset.addColumn(itm);
	});

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
	applyStyle();
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
		if (i > 0 && mediaCssArr[i].indexOf('@') == 0) {
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
 * @param str
 * @private 
 * @properties={typeid:24,uuid:"23AC6186-DA7D-46B1-BFA5-BED2589A138F"}
 */
function overrideCSS(str) {
	var media = solutionModel.getMedia('svyStyleGuideTemplate.less');
	media.setAsString(str);

	str ? application.overrideStyle('svyStyleGuide.less', 'svyStyleGuideTemplate.less') : application.overrideStyle('svyStyleGuide.less', 'svyStyleGuide.less');
}

/**
 * Callback method for when form is shown.
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 * @private
 * @properties={typeid:24,uuid:"36E8977A-546E-4F67-81F8-A889E0FE7D5C"}
 */
function onShow(firstShow, event) {
	var key, valueKey, objLocal = { };
	var dataset = databaseManager.createEmptyDataSet();
	var columns = ["property", "value", "units", "id", "category", "name", "type", "desc"];
	columns.forEach(function(itm) {
		dataset.addColumn(itm);
	});

	//parsing theme-servoy.less file
	var media = solutionModel.getMedia('theme-servoy.less');
	var mediaCssText = media.getAsString();
	var mediaCssArr = mediaCssText.split('\n');
	for (var i = 0; i < mediaCssArr.length; i++) {
		if (mediaCssArr[i][0] == '@' && mediaCssArr[i].indexOf('@media') == -1) {
			//get metadata for each element
			var objData = JSON.parse(""+mediaCssArr[i].split(';')[1].split('/* ')[1].split(' */')[0]);
			//get variable(that start with '@' and is not a media element) name(key) and value(valueKey)
			key = mediaCssArr[i].slice(1).split(':')[0].split('-').join('').replace(' ', '');
			valueKey = mediaCssArr[i].slice(1).split(':')[1].split(';')[0].slice(1);
			//add default values
			scopes.svyStyleGuide.defaultStyle[key] = valueKey;
			//add metadata
			if (Object.keys(objData).length) {
				scopes.svyStyleGuide.objCSS[key] = objData;
				scopes.svyStyleGuide.objCSS[key].prop = mediaCssArr[i].split(':')[0].replace(' ', '');
				//create list
				if (objData.type == "color") {
					scopes.svyStyleGuide.variablesType.color.push(mediaCssArr[i].split(':')[0].replace(' ', ''));
				} else {
					scopes.svyStyleGuide.variablesType.units.push(mediaCssArr[i].split(':')[0].replace(' ', ''));
				}
			}
		}
	}

	//get local storage
	var objStr = plugins.webstorageLocalstorage.getItem('customCss');
	objStr && (objLocal = JSON.parse(objStr));

	var index = Object.keys(scopes.svyStyleGuide.defaultStyle);
	//set default values for form variables
	for (var prop in scopes.svyStyleGuide.defaultStyle) {
		if (objLocal[prop]) {
			dataset.addRow([prop, objLocal[prop], '', (index.indexOf(prop) + 1), scopes.svyStyleGuide.objCSS[prop].category, scopes.svyStyleGuide.objCSS[prop].name, scopes.svyStyleGuide.objCSS[prop].type, scopes.svyStyleGuide.objCSS[prop].desc]);
		} else {
			dataset.addRow([prop, scopes.svyStyleGuide.defaultStyle[prop], '', (index.indexOf(prop) + 1), scopes.svyStyleGuide.objCSS[prop].category, scopes.svyStyleGuide.objCSS[prop].name, scopes.svyStyleGuide.objCSS[prop].type, scopes.svyStyleGuide.objCSS[prop].desc]);
		}
	}

	//add data in memory table
	dataset.createDataSource("cssTable");

	//restore style
	Object.keys(objLocal).length && applyStyle();

	elements.collapse.show(0);
}

/**
 * @public
 * @properties={typeid:24,uuid:"CB83CB4B-BFAA-4631-876C-56499A711F47"}
 */
function applyStyle() {
	var newStyle = {}
	
	
	var categories = ['General', 'Sidenav', 'Navbar', 'Tabs', 'Windows', 'Dialogs', 'Tables', 'Breadcrumb specific style', 'Brand colors', 'Validations', 'Margins and Padding'];

	for (var j = 1; j <= foundset.getSize(); j++) {
		newStyle[foundset.getRecord(j).property] = foundset.getRecord(j).value;
	}

	var mediaOriginal = solutionModel.getMedia('svyStyleGuideOriginalTemplate.less');
	var defaultCssText = mediaOriginal.getAsString();
	var newCssText = defaultCssText + "\n";
	var localStorageObj = { }
	categories.forEach(function(itm) {
		newCssText += "\n/* START " + itm + " */\n\n";
		for (var key in newStyle) {
			if (newStyle[key] != scopes.svyStyleGuide.defaultStyle[key] && scopes.svyStyleGuide.objCSS[key].category == itm) {
				newCssText += scopes.svyStyleGuide.objCSS[key].prop + ": " + newStyle[key] + ";\n";
				localStorageObj[key] = newStyle[key];
			}
		}
	});
	
	Object.keys(localStorageObj).length && overrideCSS(newCssText);
	!Object.keys(localStorageObj).length && overrideCSS('');
	Object.keys(localStorageObj).length && plugins.webstorageLocalstorage.setItem('customCss', JSON.stringify(localStorageObj));
	!Object.keys(localStorageObj).length && plugins.webstorageLocalstorage.removeItem('customCss');
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