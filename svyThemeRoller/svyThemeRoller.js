/**
 * @private 
 * @properties={typeid:35,uuid:"1F1839DE-8013-47E4-A3DA-444978D4FA63",variableType:-4}
 */
var log = scopes.svyLogManager.getLogger('com.servoy.bap.theme.roller');

/**
 * Init Less.js for direct usage of .less files from the Browser. Less.js supports all modern browsers (recent versions of Chrome, Firefox, Safari, IE11+, and Edge). 
 * 
 * Make sure to initLessJS only after you have added al your LESS dependancies;
 * <br/>
 * <br/>
 * <b>WARNING</b>: While it is possible to use Less on the client side in production, please be aware that there are performance implications for doing so. 
 * Also, sometimes cosmetic issues can occur if a JavaScript error occurs. This is a trade off of flexibility vs. speed. 
 * For the fastest performance possible for a static web site, we recommend compiling Less on the server side.
 * 
 * @param {Boolean} [useInProduction] set to true to use less.js in production. Will be used in a development environment only otherwise. Default false;
 * 
 * @return {Boolean}
 * 
 * @example <pre>
 * scopes.svyThemeRoller.addLESSFileDependancy("themes/theme-servoy.less");
 * scopes.svyThemeRoller.initLessJS();
 * </pre>
 * 
 * @public
 * @properties={typeid:24,uuid:"801DBE04-316B-42CE-8880-B43531E1881F"}
 */
function initLessJS (useInProduction) {
	if (!scopes.svySystem.isNGClient()) {
		log.error("This feature can be used in NGClient only");
		return false;
	}
	
	if (!useInProduction && !application.isInDeveloper()) {
		log.error("On a production environment is discouraged to compile your .less file directly from the Browser since it may reduce the startup time of your solution.\
				   For a production environment you may consider to compile your .less files into CSS files and reference them from your solution media as standard styleSheet.");
		return false;
	} else {
		log.info("Init less.js");
	}
	
	var lessJSTag = {
		tagName: "script",
		attrs: [
//		{
//			name: "data-poll",
//			value: "1000"
//		},{
//			name: "data-relative-urls",
//			value: "false"
//		},
		{
			name: "src",
			value: "resources/fs/" + application.getSolutionName() + "/less.js"
		},{
			name: "type",
			value: "text/javascript"
		}]
	};
	
	plugins.ngclientutils.contributedTags.push(lessJSTag);
	return true;
}

/**
 * Add a .less file dependancy to the Browser.
 * 
 * Call initLessJS after you have added all your LESS dependancies.
 * 
 * 
 * @public 
 * @param {String} mediaFileName
 * 
 * @return {Boolean}
 * 
 * @example <pre>
 * scopes.svyThemeRoller.addLESSFileDependancy("themes/theme-servoy.less");
 * scopes.svyThemeRoller.initLessJS();
 * </pre>
 *
 * @properties={typeid:24,uuid:"91B60CD1-61DA-489F-923A-D1F0D908B334"}
 */
function addLESSFileDependancy(mediaFileName) {
	if (!scopes.svySystem.isNGClient()) {
		log.error("This feature can be used in NGClient only");
		return false;
	}
	
	if (!solutionModel.getMedia(mediaFileName)) {
		log.error("Cannot find the .less file " + mediaFileName);
		return false;
	}
	
	var lessJSTag = {
		tagName: "link",
		attrs: [{
			name: "href",
			value: "resources/fs/" + application.getSolutionName() + "/" + mediaFileName + "?t=" + new Date().getTime()
		},{
			name: "rel",
			value: "stylesheet/less"
		},{
			name: "type",
			value: "text/css"
		}]
	};
	plugins.ngclientutils.contributedTags.push(lessJSTag);
	return true;
}


/**
 * Add a CSS file reference to the NGClient
 * 
 * @public 
 * @param {String} mediaFileName
 * 
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"15F7945D-D06E-4531-9E30-658D2BF52BCF"}
 */
function addCSSFileDependancy(mediaFileName) {
	if (!scopes.svySystem.isNGClient()) {
		log.error("This feature can be used in NGClient only");
		return false;
	}
	
	if (!solutionModel.getMedia(mediaFileName)) {
		log.error("Cannot find the .css file " + mediaFileName);
		return false;
	}
	
	var lessCSSTag = {
		tagName: "link",
		attrs: [
		{
			name: "rel",
			value: "stylesheet"
		},
		{
			name: "href",
			value: "resources/fs/" + application.getSolutionName() + "/" + mediaFileName + "?t=" + new Date().getTime()
		},{
			name: "type",
			value: "text/css"
		}]
	};
	plugins.ngclientutils.contributedTags.push(lessCSSTag);
	return true;
}

/**
 * Add a JS file reference to the NGClient
 * 
 * @public 
 * @param {String} mediaFileName
 * 
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"3F437617-48FE-4799-95E1-D66BD5224F9B"}
 */
function addJSFileDependancy(mediaFileName) {
	if (!scopes.svySystem.isNGClient()) {
		log.error("This feature can be used in NGClient only");
		return false;
	}
	
	if (!solutionModel.getMedia(mediaFileName)) {
		log.error("Cannot find the .js file " + mediaFileName);
		return false;
	}
	
	var lessCSSTag = {
		tagName: "script",
		attrs: [{
			name: "src",
			value: "resources/fs/" + application.getSolutionName() + "/" + mediaFileName + "?t=" + new Date().getTime()
		}]
	};
	plugins.ngclientutils.contributedTags.push(lessCSSTag);
	return true;
}