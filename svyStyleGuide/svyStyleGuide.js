/**
 * @properties={typeid:35,uuid:"863CE8A3-4E65-4A38-884C-AF70761954BB",variableType:-4}
 */
var cardType = {
	units:['fontsizeh1','fontsizeh2','fontsizeh3','fontsizeh4','fontsizeh5'],
	color:['maincolor','secondarycolor']
}

/**
 * @properties={typeid:35,uuid:"FC5ED59B-13E0-47CF-AD68-08DD418B2C45",variableType:-4}
 */
var variablesType = {
	units:['@font-size-h1','@font-size-h2','@font-size-h3','@font-size-h4','@font-size-h5','@font-size-h6'],
	color:['@main-color','@main-color-inverse','@main-color-light','@main-color-dark','@secondary-color','@secondary-color-inverse','@secondary-color-light','@secondary-color-dark','@scrollbar-bg']
}

/**
 * @properties={typeid:24,uuid:"9B8F432F-25E4-4746-BAD0-E23E2C6E2B28"}
 */
function sortVariablesType(){
	var media = solutionModel.getMedia('svySyleGuideOriginalTemplate.less');
	var mediaCssText = media.getAsString();
	var mediaCssArr = mediaCssText.split('\n');
	var variableName = '';
	for (var i = 0; i < mediaCssArr.length; i++) {
		variableName = '';
		if (mediaCssArr[i][0] == '@') {
			/*extract the variable name*/
			variableName = mediaCssArr[i].slice(0, mediaCssArr[i].indexOf(':') + 1);
			if(variableName.indexOf('color') > -1 || variableName.indexOf('bg') > -1){
				variablesType.color.push(variableName);
			}else{
				variablesType.units.push(variableName);
			}
		}
		
	}
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
	if(record && record.cardTypeStyleClass == 'card-color'){
		Arr = scopes.svyStyleGuide.variablesType.color;
		
	}else if (record) {
		Arr = scopes.svyStyleGuide.variablesType.units;
	}
	
	
	
	/** @type  {JSDataSet} */
	var result = null;
	
	if (displayValue == null && realValue == null) {
		// TODO think about caching this result. can be called often!
		
		// return the complete list
		
		
		result = databaseManager.convertToDataSet(Arr);
		if (Arr.indexOf(displayValue) == -1) {
			result.addRow([displayValue])
		}
	} else if (displayValue != null) {
		// TYPE_AHEAD filter call, return a filtered list
		

		result = databaseManager.convertToDataSet(Arr);
		if (Arr.indexOf(displayValue) == -1) {
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
