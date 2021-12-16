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
			  }
		}
	}

	var newCssText = newCssArr.join('');
	newCssText = utils.stringReplaceTags(newCssText, newStyle);
	
	overrideCSS(newCssText);
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
	if (media.getAsString().length>0) {
		plugins.file.writeTXTFile('CustomTheme.less',media.getAsString());
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
