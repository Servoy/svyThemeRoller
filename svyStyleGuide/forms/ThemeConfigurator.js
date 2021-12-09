/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"8F1F4D6A-DC75-4611-9872-0137A0007A69"}
 */
var primaryColor = "#4880FF";

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"54231A2E-0D13-471E-B028-8A8DA1ABAE05"}
 */
var secondaryColor = "#FFFFFF";
/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"73A092C4-784A-4DF2-B1C9-8C1AE81E3342"}
 */
function onActionApplyColors(event) {
//	scopes.svyProperties.setUserProperty("MAIN-COLOR", "style", primaryColor);
//	scopes.svyProperties.setUserProperty("SECONDARY-COLOR", "style", secondaryColor);
//	
	scopes.cloudSample.overrideStyleColors(primaryColor, secondaryColor);
//	application.overrideStyle("MAIN-COLOR",primaryColor);

}
