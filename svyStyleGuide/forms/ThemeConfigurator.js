/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"129BA819-746F-4C8F-81FC-C1834726F914"}
 */
var h1Size = null;

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
var secondaryColor = "#ffffff";


/**
 * @properties={typeid:35,uuid:"7665804E-5991-4CB7-80E6-6BDB4FE2ACF8",variableType:-4}
 */
var defaults = {};

/**
 * @properties={typeid:24,uuid:"C3AD1B43-5EDE-4E16-9A94-8E973C622E8A"}
 */
function overrideStyleColors() {
	
	var defaultStyle = {
		defaultMainColor: '#E9720B',
		defaultSecondaryColor: '#FFF',
		defaultH1Size:'36'
		}
	var mediaOriginal = solutionModel.getMedia('svyStyleGuideOriginalTemplate.less');
	var cssText = mediaOriginal.getAsString();
	
	cssText += '\n@excludeFromFile:#ffffff;';
	//main
	if(mainColor != defaultStyle.defaultMainColor){
		var finalColor = mainColor;
	}else{
		var x = utils.stringReplaceTags('\n@excludeFromFile:%%defaultMainColor%%;', defaultStyle);
		cssText += x;
		var finalColor = '@excludeFromFile';
	}
	
	//secondary
	if(secondaryColor != defaultStyle.defaultSecondaryColor){
		var finalSecColor = secondaryColor;
	}else{
		var x = utils.stringReplaceTags('\n@excludeFromFile:%%defaultSecondaryColor%%;', defaultStyle);
		cssText += x;
		var finalSecColor = '@excludeFromFile';
	}
	application.output(h1Size);
	//h1
//	if(h1Size != defaultStyle.defaultH1Size){
//		var finalH1Size = h1Size +'px';
//		application.output(finalH1Size);
//	}else{
//		var x = utils.stringReplaceTags('\n@excludeFromFile:%%defaultH1Size%%px;', defaultStyle);
//		cssText += x;
//		var finalH1Size = '@excludeFromFile';
//	}
	


	
	var newColorStyle = {
		'MAIN-COLOR': finalColor,
		'SECONDARY-COLOR': finalSecColor,
		//'FONT-SIZE-H1': finalH1Size
	}
	
	// override css
	cssText = utils.stringReplaceTags(cssText, newColorStyle);
//	application.output('before removing excludeFromFilecssText')
//		application.output(cssText)
	/*
	 * filter the cssText by excluding the rows marked with '@excludeFromFile'
	 */
	var splitted = cssText.split('\n');
	//application.output(splitted)
	for(var i=0; i<splitted.length;i++){
		if(splitted[i].indexOf('@excludeFromFile')!=-1){
			splitted[i]='';
			
		}
	}
	var textJoined = splitted.join(' ')
//	application.output('after removing excludeFromFilecssText')
//	application.output(textJoined)

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