/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F9254269-7629-4E71-B713-16523FF52045"}
 */
var mesureUnits = 'px';

/**
 * @type {Object}
 * @properties={typeid:35,uuid:"8EBB57C0-CAA3-43A5-93BA-DA560B245CAA",variableType:-4}
 */
var defaultStyle = { }

/**
 * @type {Object}
 * @properties={typeid:35,uuid:"CB94E1CE-C93E-4807-843F-FAB7E8978F02",variableType:-4}
 */
var objNameAndCategory = {}

/**
 * @type {Object}
 * @properties={typeid:35,uuid:"44320B3D-C95C-42FD-AAC6-D673DF0217B0",variableType:-4}
 */
var styleGuideInfo = {
	maincolor:'This will affect the navbar',
	secondarycolor: 'This will affect the sideNav'
}

/**
 * @param {JSEvent} event
 *
 * @private
 *
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
	
	var index = Object.keys(defaultStyle);
	for (var prop in defaultStyle) {
		dataset.addRow([prop, defaultStyle[prop], '', (index.indexOf(prop) + 1) , objNameAndCategory[prop][0], objNameAndCategory[prop][1]]);
	}
			
	dataset.createDataSource("cssTable");
}

/**
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"9A29640A-0185-4030-BEA4-BDB568E8820C"}
 */
function onActionApplyStyle(event) {
	applyStyle({});
}

/**
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"7FFC9617-B84D-48C6-BED3-FA6947B78283"}
 */
function onActionDownloadStyle(event) {
	var media = solutionModel.getMedia('svyStyleGuideTemplate.less');
	var mediaCssText = media.getAsString();
	var mediaCssArr = mediaCssText.split('\n');
	for (var i = 0; i < mediaCssArr.length; i++) {
		if (i > 0 && mediaCssArr[i].indexOf('@') == 0) {
			//adding the default value for the variables that has changed
			mediaCssArr[i] = mediaCssArr[i].trim() + " // default: " + defaultStyle['' + mediaCssArr[i].split(':')[0].slice(1).split('-').join('')] + "\n";
		}
	}
	
	if (media.getAsString().length > 0) {
		plugins.file.writeTXTFile('CustomTheme.less', mediaCssArr.join(''));
	} else {
		plugins.dialogs.showWarningDialog("Warning","You cannot download the default CSS!");
	}
}

/**
 * TODO generated, please specify type and doc for the params
 * @param str
 *
 * @properties={typeid:24,uuid:"23AC6186-DA7D-46B1-BFA5-BED2589A138F"}
 */
 function overrideCSS(str) {
	var media = solutionModel.getMedia('svyStyleGuideTemplate.less');
	media.setAsString(str);
	
	str ? application.overrideStyle('svyStyleGuide.less', 'svyStyleGuideTemplate.less') : application.overrideStyle('svyStyleGuide.less', 'svyStyleGuide.less'); 
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"86251B0F-BF93-488F-ABA2-1B62EB985451"}
 */
function onActionResetToDefault(event) {
	var selectedCard = foundset.getSelectedRecord();
	selectedCard.value = defaultStyle[selectedCard.property];
	/*old code*/
//	/*the name of the formComponent should be the same as the defaultStyle object*/
//	var dp = elements[getComponentName(event.getElementName())].containedForm.cardInputField.getDataProviderID();
//
//	application.output(dp)
//	this[dp] = defaultStyle[getComponentName(event.getElementName())];

}
/**
 * TODO generated, please specify type and doc for the params
 * @param elementName
 *
 * @properties={typeid:24,uuid:"FB2DC6E0-0EB6-4263-A30E-81E0E8180347"}
 */
function getComponentName(elementName){
	var indexOF$ = elementName.indexOf('$');
	var name = elementName.substring(0, indexOF$);
	return name;
}
/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 *
 * @properties={typeid:24,uuid:"63611007-748C-45B3-AE12-69D7A35FCA1A"}
 */
function cardInfo(event, dataTarget) {
	var selectedCard = styleGuideInfo[foundset.getSelectedRecord().property];
	
	/*this will show the specific info based on the component name that should be set it exactly like the names of the styleGuideInfo object which also will keep the information*/
	if(selectedCard){
		plugins.dialogs.showInfoDialog('Info',selectedCard);
	}else{
		plugins.dialogs.showInfoDialog('Info','This property has no Info');
	}
	
}

/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 *
 * @properties={typeid:24,uuid:"86251B0F-BF93-488F-ABA2-1B62EB98545D"}
 */
function onActionOptions(event, dataTarget) {
	plugins.window.createFormPopup(forms.colorOptions).show();
}

/**
 * TODO generated, please specify type and doc for the params
 * @param variable
 *
 * @properties={typeid:24,uuid:"239BBE2C-CACD-402F-BF0A-60ABAEE52449"}
 */
function setColorValue(variable){
	maincolor = variable;
}
/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
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
			defaultStyle[key] = valueKey;
			objNameAndCategory[key] = [cat, mediaCssArr[i].slice(1).split(':')[0]];
		}
	}

	//get local storage
	var objStr = plugins.webstorageLocalstorage.getItem('customCss');
	objStr && (objLocal = JSON.parse(objStr));

	var index = Object.keys(defaultStyle);
	//set default values for form variables
	for (var prop in defaultStyle) {
		if (objLocal[prop]) {
			forms.ThemeConfigurator[prop] = objLocal[prop];
			dataset.addRow([prop, objLocal[prop], '', (index.indexOf(prop) + 1), objNameAndCategory[prop][0], objNameAndCategory[prop][1]]);
		} else { 
			forms.ThemeConfigurator[prop] = defaultStyle[prop];
			dataset.addRow([prop, defaultStyle[prop], '', (index.indexOf(prop) + 1), objNameAndCategory[prop][0], objNameAndCategory[prop][1]]);
		}
	}
	
	//add data in memory table
	dataset.createDataSource("cssTable");

	//restore style
	Object.keys(objLocal).length && applyStyle(objLocal);
	setPicker()
}


/**
 * TODO generated, please specify type and doc for the params
 * @param {Object} obj
 * @private
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
			if (newCssArr[i].indexOf(key) != -1 && newStyle[key] == defaultStyle[key]) {
				newCssArr[i] = '';
			}
			if (newCssArr[i].indexOf(key) != -1 || newStyle[key] != defaultStyle[key]) {
				localStorageObj[key] = newStyle[key];
			}
		}
	}

	var newCssText = newCssArr.join('\n');
	newCssText = utils.stringReplaceTags(newCssText, newStyle);

	Object.keys(localStorageObj).length && overrideCSS(newCssText);
	Object.keys(localStorageObj).length && plugins.webstorageLocalstorage.setItem('customCss', JSON.stringify(localStorageObj));
}

/**
 * @properties={typeid:24,uuid:"B34AF95C-2A08-4E12-A268-8D726D79D977"}
 */
function setPicker(){
	return;
	for(var key in cardType){
		for(var i=0; i<cardType[key].length; i++){
			if(key=='units'){
				
				
				
				application.output('units ' + cardType[key][i])
			}
			if(key=='color'){
				application.output('color ' + cardType[key][i])
			}
			
		}
		
	}
}
/**
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"19B69179-7AEE-4421-88F3-14E75C6128BD"}
 */
function onActionBack(event) {
	//application.showForm(forms.styleGuide);
	plugins.window.cancelFormPopup()
}