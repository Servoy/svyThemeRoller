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
	dataset.addColumn("property");
	dataset.addColumn("value");
	dataset.addColumn("units");
	dataset.addColumn("id");
	dataset.addColumn("category");
	dataset.addColumn("name");

	var index = Object.keys(scopes.svyStyleGuide.defaultStyle);
	for (var prop in scopes.svyStyleGuide.defaultStyle) {
		dataset.addRow([prop, scopes.svyStyleGuide.defaultStyle[prop], '', (index.indexOf(prop) + 1), scopes.svyStyleGuide.objNameAndCategory[prop][0], scopes.svyStyleGuide.objNameAndCategory[prop][1]]);
	}

	dataset.createDataSource("cssTable");
}

/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"9A29640A-0185-4030-BEA4-BDB568E8820C"}
 */
function onActionApplyStyle(event) {
	applyStyle({ });
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
			mediaCssArr[i] = mediaCssArr[i].trim() + " // default: " + scopes.svyStyleGuide.defaultStyle['' + mediaCssArr[i].split(':')[0].slice(1).split('-').join('')] + "\n";
		}
	}

	if (media.getAsString().length > 0) {
		plugins.file.writeTXTFile('CustomTheme.less', mediaCssArr.join(''));
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
	dataset.addColumn("property");
	dataset.addColumn("value");
	dataset.addColumn("units");
	dataset.addColumn("id");
	dataset.addColumn("category");
	dataset.addColumn("name");

	var cat = '';
	//parsing theme-servoy.less file
	var media = solutionModel.getMedia('theme-servoy.less');
	var mediaCssText = media.getAsString();
	var mediaCssArr = mediaCssText.split('\n');
	for (var i = 0; i < mediaCssArr.length; i++) {
		if (mediaCssArr[i].indexOf('START') > -1) {
			cat = mediaCssArr[i].split('START ')[1].split(' */')[0];
		}
		if (mediaCssArr[i][0] == '@' && mediaCssArr[i].indexOf('@media') == -1) {
			//get variable(that start with '@' and is not a media) name(key) and value(valueKey)
			key = mediaCssArr[i].slice(1).split(':')[0].split('-').join('').replace(' ', '');
			valueKey = mediaCssArr[i].slice(1).split(':')[1].split(';')[0].slice(1);
			//add item to the object
			scopes.svyStyleGuide.defaultStyle[key] = valueKey;
			scopes.svyStyleGuide.objNameAndCategory[key] = [cat, mediaCssArr[i].slice(1).split(':')[0].replace(' ', '')];
		}
	}

	//get local storage
	var objStr = plugins.webstorageLocalstorage.getItem('customCss');
	objStr && (objLocal = JSON.parse(objStr));

	var index = Object.keys(scopes.svyStyleGuide.defaultStyle);
	//set default values for form variables
	for (var prop in scopes.svyStyleGuide.defaultStyle) {
		if (objLocal[prop]) {
			dataset.addRow([prop, objLocal[prop], '', (index.indexOf(prop) + 1), scopes.svyStyleGuide.objNameAndCategory[prop][0], scopes.svyStyleGuide.objNameAndCategory[prop][1]]);
		} else {
			dataset.addRow([prop, scopes.svyStyleGuide.defaultStyle[prop], '', (index.indexOf(prop) + 1), scopes.svyStyleGuide.objNameAndCategory[prop][0], scopes.svyStyleGuide.objNameAndCategory[prop][1]]);
		}
	}

	//add data in memory table
	dataset.createDataSource("cssTable");

	//restore style
	Object.keys(objLocal).length && applyStyle(objLocal);

	//sorts the variables based on type
	sortVariablesType();

	elements.collapse.show(0);
}

/**
 * @param {Object} obj
 * @public
 * @properties={typeid:24,uuid:"CB83CB4B-BFAA-4631-876C-56499A711F47"}
 */
function applyStyle(obj) {
	var newStyle = obj

	for (var j = 1; j <= foundset.getSize(); j++) {
		newStyle[foundset.getRecord(j).property] = foundset.getRecord(j).value;
	}

	var mediaOriginal = solutionModel.getMedia('svyStyleGuideOriginalTemplate.less');
	var defaultCssText = mediaOriginal.getAsString();
	var localStorageObj = { }
	var newCssArr = defaultCssText.split('\n');
	for (var i = 0; i < newCssArr.length; i++) {
		for (var key in newStyle) {
			if (newCssArr[i].indexOf(key) != -1 && newStyle[key] == scopes.svyStyleGuide.defaultStyle[key]) {
				newCssArr[i] = '';
			}
			if (newCssArr[i].indexOf(key) != -1 || newStyle[key] != scopes.svyStyleGuide.defaultStyle[key]) {
				localStorageObj[key] = newStyle[key];
			}
		}
	}

	var newCssText = newCssArr.join('\n');
	newCssText = utils.stringReplaceTags(newCssText, newStyle);

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

/**
 * @private
 * @properties={typeid:24,uuid:"E7FF152D-A664-4D90-820E-A2BC61546FDD"}
 */
function sortVariablesType() {
	var media = solutionModel.getMedia('svyStyleGuideOriginalTemplate.less');
	var mediaCssText = media.getAsString();
	var mediaCssArr = mediaCssText.split('\n');
	var variableName = '';
	for (var i = 0; i < mediaCssArr.length; i++) {
		variableName = '';
		if (mediaCssArr[i][0] == '@' && mediaCssArr[i].indexOf('@import') == -1) {
			/*extract the variable name*/
			variableName = mediaCssArr[i].split(':')[0];
			/*sort the variables*/
			if (variableName.indexOf('color') > -1 || variableName.indexOf('bg') > -1) {
				scopes.svyStyleGuide.variablesType.color.push(variableName);
			} else {
				scopes.svyStyleGuide.variablesType.units.push(variableName);
			}
		}
	}
}