/**
 * @type {Object}
 * @properties={typeid:35,uuid:"8EBB57C0-CAA3-43A5-93BA-DA560B245CAA",variableType:-4}
 */
var defaultStyle = {
	mainColor: '#E9720B',
	secondaryColor: '#18222C',
	fontSizeH1: '36px',
	textFontSize: '@font-size-h5'
}

/**
 * @type {Object}
 * @properties={typeid:35,uuid:"44320B3D-C95C-42FD-AAC6-D673DF0217B0",variableType:-4}
 */
var styleGuideInfo = {
	mainColor:'This will affect the navbar',
	secondaryColor: 'This will affect the sideNav'
}

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"57506907-D2C6-4F61-9855-7B4600E8529A"}
 */
var textFontSize = defaultStyle.textFontSize;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"40B01B95-A466-4D97-91E2-2F42962A301D"}
 */
var fontSizeH1 = defaultStyle.fontSizeH1;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"8F1F4D6A-DC75-4611-9872-0137A0007A69"}
 */
var mainColor = defaultStyle.mainColor;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"54231A2E-0D13-471E-B028-8A8DA1ABAE05"}
 */
var secondaryColor = defaultStyle.secondaryColor;

/**
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C3A1031C-1B1E-4EE3-ADB3-25D569071EA4"}
 */
function onActionResetStyle(event) {
	overrideCSS('');
	
	//reset form variables
	textFontSize = defaultStyle.textFontSize;
	fontSizeH1 = defaultStyle.fontSizeH1;
	mainColor = defaultStyle.mainColor;
	secondaryColor = defaultStyle.secondaryColor;
}

/**
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"9A29640A-0185-4030-BEA4-BDB568E8820C"}
 */
function onActionApplyStyle(event) {
	var count = 0;
	var newStyle = {
		mainColor: mainColor,
		secondaryColor: secondaryColor,
		fontSizeH1: fontSizeH1,
		textFontSize: textFontSize
	}
	
	var mediaOriginal = solutionModel.getMedia('svyStyleGuideOriginalTemplate.less');
	var defaultCssText = mediaOriginal.getAsString();
	
	var newCssArr = defaultCssText.split('\n');
	for (var i = 0; i < newCssArr.length; i++) {
		for (var key in newStyle) {
			  if (newCssArr[i].indexOf(key) != -1 && newStyle[key] == defaultStyle[key]){
				  newCssArr[i] = '';
				  count++;
			  }
		}
	}
	
	var newCssText = newCssArr.join('');
	newCssText = utils.stringReplaceTags(newCssText, newStyle);
	
	if (count != Object.keys(newStyle).length) {
		overrideCSS(newCssText);
	}
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
	if (media.getAsString().length > 0) {
		plugins.file.writeTXTFile('CustomTheme.less', media.getAsString());
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

	if (str) {
		application.overrideStyle('svyStyleGuide.less', 'svyStyleGuideTemplate.less');
	} else {
		application.overrideStyle('svyStyleGuide.less', 'svyStyleGuide.less');
	}
	
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"86251B0F-BF93-488F-ABA2-1B62EB985451"}
 */
function onActionResetToDefault(event) {
	/*the name of the formComponent should be the same as the defaultStyle object*/
	var dp = elements[getComponentName(event.getElementName())].containedForm.cardInputField.getDataProviderID();

	application.output(dp)
	this[dp] = defaultStyle[getComponentName(event.getElementName())];

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
	/*this will show the specific info based on the component name that should be set it exactly like the names of the styleGuideInfo object which also will keep the information*/
	plugins.dialogs.showInfoDialog(' ',styleGuideInfo[getComponentName(event.getElementName())]);
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
	mainColor = variable;
}