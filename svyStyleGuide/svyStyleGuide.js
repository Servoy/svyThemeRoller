/**
 * @type {Object}
 * @properties={typeid:35,uuid:"7BCD9714-3FB6-481D-9535-4183C6BC19B7",variableType:-4}
 */
var defaultStyle = { }

/**
 * @type {Object}
 * @properties={typeid:35,uuid:"078F04F5-297D-48B7-A92E-8F46C10D656A",variableType:-4}
 */
var objCSS = { }

/**
 * @type {Object}
 * @properties={typeid:35,uuid:"FC5ED59B-13E0-47CF-AD68-08DD418B2C45",variableType:-4}
 */
var variablesType = {
	units: [],
	color: []
}

/**
 * The global method of the valuelist is called to fill in or adjust the values of the valuelist.
 * The method returns a dataset with one or two columns, first column is the display value, second column is real value(if present). The valuelist will be filled in with the dataset data.
 * If second column is not present real value and display value will be the same.
 * The method has to handle three different scenarios:
 * 1. 'displayValue' parameter is not null, this parameter should be used to filter the list of values(in a typeahead fashion)
 * 2. 'realValue' parameter is specified, that means value was not found in current list, so must be specified manually.
 *  In this case method should return only one row in the dataset, with the missing value, that will be added to the valuelist
 * 3. 'realValue' and 'displayValue' are both null , in this case the complete list of values should be returned.
 * Scenario 1 and 3 will completely replace any older results in the valuelist while scenario 2 will append results.
 *
 * @public 
 * @param {String} displayValue The filter string that a user types in a typeahead. Used to filter the valuelist.
 * @param realValue A real value missing from valuelist that needs to be displayed. Method should provide the display value for it.
 * @param {JSRecord<mem:cssTable>} record The current record for the valuelist. (This is the FindRecord in find mode, which is like JSRecord has all the columns/dataproviders, but doesn't have its methods)
 * @param {String} valueListName The valuelist name that triggers the method.
 * @param {Boolean} findMode True if foundset of this record is in find mode
 * @param {Boolean} rawDisplayValue The raw displayValue without being converted to lower case
 *
 * @return {JSDataSet} A dataset with 1 or 2 columns display[,real]. The values will fill in or append the valuelist.
 *
 * @properties={typeid:24,uuid:"7D75E8FA-4D2A-4C7E-ABB8-F8FFF76A8944"}
 */
function getDataSetForValueListVariables(displayValue, realValue, record, valueListName, findMode, rawDisplayValue) {
	var Arr = [realValue];
	if (record && record.cardTypeStyleClass == 'card-color') {
		Arr = scopes.svyStyleGuide.variablesType.color;
	} else if (record && record.cardTypeStyleClass == 'card-unit') {
		Arr = scopes.svyStyleGuide.variablesType.units;
	}
	
	/** @type  {JSDataSet} */
	var result = null;

	if (displayValue == null && realValue == null) {
		// TODO think about caching this result. can be called often!
		// return the complete list
		result = databaseManager.convertToDataSet(Arr);
		if (Arr.indexOf(displayValue) == -1) {
			result.addRow(1, [displayValue])
		}
	} else if (displayValue != null) {
		// TYPE_AHEAD filter call, return a filtered list
		if (Arr.length > 1) {
			var values = Arr.filter(function(e) {
				if (e.indexOf(displayValue) > -1) {
					return true
				}
				return false
			});
			
			result = databaseManager.convertToDataSet(values);
			
			if (Arr.indexOf(displayValue) == -1) {
				result.addRow(1, [displayValue])
			}
		} else {
			result = databaseManager.convertToDataSet(Arr);
			result.addRow([displayValue])
		}
	} else if (realValue != null) {
		// TODO think about caching this result. can be called often!
		// real object not found in the current list, return 1 row with display,realvalue that will be added to the current list
		// dont return a complete list in this mode because that will be added to the list that is already there
		result = databaseManager.convertToDataSet([realValue]);
	}



	return result;
}


/**
 * @public
 * @properties={typeid:24,uuid:"BCDAE60C-629C-4A91-8EBB-0D9BEDC80349"}
 */
function loadData() {
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
				if (scopes.svyStyleGuide.objCSS[key].type == "color") {
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
}

/**
 * @public
 * @properties={typeid:24,uuid:"94232FFF-CFF0-458A-B17F-8513987E6A79"}
 */
function applyStyle() {
	var newStyle = {}
	
	var categories = ['General', 'Sidenav', 'Navbar', 'Tabs', 'Windows', 'Dialogs', 'Tables', 'Breadcrumb specific style', 'Brand colors', 'Validations', 'Margins and Padding'];

	var fs = datasources.mem.cssTable.getFoundSet();
	fs.loadAllRecords();
	for (var j = 1; j <= fs.getSize(); j++) {
		newStyle[fs.getRecord(j).property] = fs.getRecord(j).value;
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
 * @param {String} str
 * @public
 * @properties={typeid:24,uuid:"6A6E04D4-69B7-4A41-9207-EC505A106021"}
 */
function overrideCSS(str) {
	var media = solutionModel.getMedia('svyStyleGuideTemplate.less');
	media.setAsString(str);

	str ? application.overrideStyle('svyStyleGuide.less', 'svyStyleGuideTemplate.less') : application.overrideStyle('svyStyleGuide.less', 'svyStyleGuide.less');
}