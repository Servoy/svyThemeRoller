/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"57506907-D2C6-4F61-9855-7B4600E8529A"}
 */
var textFontSize = '14';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"40B01B95-A466-4D97-91E2-2F42962A301D"}
 */
var h1Size = '36';



/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"8F1F4D6A-DC75-4611-9872-0137A0007A69"}
 */
var mainColor = "#E9720B";

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"54231A2E-0D13-471E-B028-8A8DA1ABAE05"}
 */
var secondaryColor = "#18222C";


/**
 * @properties={typeid:35,uuid:"7665804E-5991-4CB7-80E6-6BDB4FE2ACF8",variableType:-4}
 */
var defaults = {};

/**
 * @type {Object}
 * @properties={typeid:35,uuid:"8EBB57C0-CAA3-43A5-93BA-DA560B245CAA",variableType:-4}
 */
var defaultStyle = {
	defaultMainColor: '#E9720B',
	defaultSecondaryColor: '#18222C',
	defaultH1Size: '36',
	defaultFontSize: '14'
}

/**
 * @properties={typeid:24,uuid:"C3AD1B43-5EDE-4E16-9A94-8E973C622E8A"}
 */
function overrideStyleColors() {
	var x;
	var mediaOriginal = solutionModel.getMedia('svyStyleGuideOriginalTemplate.less');
	var cssText = mediaOriginal.getAsString();
	cssText += '\n@excludeFromFile:#ffffff;';
	
	//main
	var finalColor;
	if (mainColor != defaultStyle.defaultMainColor) {
		finalColor = mainColor;
	} else {
		x = utils.stringReplaceTags('\n@excludeFromFile:%%defaultMainColor%%;', defaultStyle);
		cssText += x;
		finalColor = '@excludeFromFile';
	}

	//secondary
	var finalSecColor;
	if (secondaryColor != defaultStyle.defaultSecondaryColor) {
		finalSecColor = secondaryColor;
	} else {
		x = utils.stringReplaceTags('\n@excludeFromFile:%%defaultSecondaryColor%%;', defaultStyle);
		cssText += x;
		finalSecColor = '@excludeFromFile';
	}

	//h1
	var finalH1Size;
	if (h1Size != defaultStyle.defaultH1Size) {
		finalH1Size = h1Size + 'px';
		//application.output(finalH1Size);
	} else {
		x = utils.stringReplaceTags('\n@excludeFromFile:%%defaultH1Size%%px;', defaultStyle);
		cssText += x;
		finalH1Size = '@excludeFromFile';
	}

	//font-size
	var finalFontSize;
	if (textFontSize != defaultStyle.defaultFontSize) {
		finalFontSize = textFontSize + 'px';
	} else {
		x = utils.stringReplaceTags('\n@excludeFromFile:%%defaultFontSize%%px;', defaultStyle);
		cssText += x;
		finalFontSize = '@excludeFromFile';
	}

	var newColorStyle = {
		'MAIN-COLOR': finalColor,
		'SECONDARY-COLOR': finalSecColor,
		'FONT-SIZE-H1': finalH1Size,
		'TEXT-FONT-SIZE': finalFontSize
	}

	// override css
	cssText = utils.stringReplaceTags(cssText, newColorStyle);

	//application.output('before removing excludeFromFilecssText')
	//application.output(cssText)
	/*
	 * filter the cssText by excluding the rows marked with '@excludeFromFile'
	 */

	var splitted = cssText.split('\n');
	//application.output(splitted)
	for (var i = 0; i < splitted.length; i++) {
		if (splitted[i].indexOf('@excludeFromFile') != -1) {
			splitted[i] = '';

		}
	}
	var textJoined = splitted.join(' ')

	//application.output('after removing excludeFromFilecssText')
	application.output(textJoined)

	var media = solutionModel.getMedia('svyStyleGuideTemplate.less');
	media.setAsString(textJoined);

	//application.output(cssText);
	//downloading file
	//plugins.file.writeTXTFile('mytheme.less',textJoined)

	application.overrideStyle('svyStyleGuide.less', 'svyStyleGuideTemplate.less');
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"73A092C4-784A-4DF2-B1C9-8C1AE81E3342"}
 */
function onActionApplyColors(event) {
//	scopes.svyProperties.setUserProperty("MAIN-COLOR", "style", primaryColor);
//	scopes.svyProperties.setUserProperty("SECONDARY-COLOR", "style", secondaryColor);
	overrideStyleColors();
	//scopes.cloudSample.overrideStyleColors(primaryColor, secondaryColor);
//	application.overrideStyle("MAIN-COLOR",primaryColor);

}

/**
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C3A1031C-1B1E-4EE3-ADB3-25D569071EA4"}
 */
function onActionResetToDefault(event) {
	mainColor = "#E9720B";

}

/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 *
 * @properties={typeid:24,uuid:"63611007-748C-45B3-AE12-69D7A35FCA1A"}
 */
function cardInfo(event, dataTarget) {
	plugins.dialogs.showInfoDialog('Main Color','Main Color will affect the navbar')

}

/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 *
 * @properties={typeid:24,uuid:"86251B0F-BF93-488F-ABA2-1B62EB98545D"}
 */
function onActionOptions(event, dataTarget) {
	// TODO Auto-generated method stub

}
