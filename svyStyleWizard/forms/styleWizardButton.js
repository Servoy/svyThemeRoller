/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"42C39647-79DA-486A-8554-5A34797BC30F"}
 */
var styleExtra = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"3C2D5AEB-6C2E-4BFA-BE51-010D94E0F87D",variableType:4}
 */
var styleRoundedBorder = 0;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D5074F0F-8D7E-44B2-AAF3-2FE30FF031C8"}
 */
var marginAll = '-1';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"B9575332-7B24-4EC1-9F73-FE8A3107D584"}
 */
var marginTop = '-1';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A9B2089A-8FAA-4CA7-8DDD-D32DC5E9DD08"}
 */
var marginRight = '-1';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0081596A-8B8B-4835-9BAB-ADBF5D6A1D18"}
 */
var marginBottom = '-1';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6F7863FB-2FF9-485F-9FA5-050C6A9E67B8"}
 */
var marginLeft = '-1';

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"5992D782-E772-4436-8025-E7EAE4ACE982",variableType:4}
 */
var expandMarginSelector = 0;

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"B30B1E96-6DE8-4821-86EB-2EFAC962998A"}
 */
function onShow(firstShow, event) {
	updateUI();
}

/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"8C80327B-7B90-4410-AAFE-15BE41CD65DF"}
 */
function onActionToggleEditMargin(event, dataTarget) {
	expandMarginSelector = !expandMarginSelector
	updateUI();
}

/**
 * @properties={typeid:24,uuid:"3222A93C-2F09-4034-8518-BE825F0416A8"}
 */
function updateUI() {

	var showAllMaginSelectors = expandMarginSelector ? true : false;

	elements.fcMarginMain.visible = !showAllMaginSelectors;
	elements.fcMarginTop.visible = showAllMaginSelectors;
	elements.fcMarginRight.visible = showAllMaginSelectors;
	elements.fcMarginBottom.visible = showAllMaginSelectors;
	elements.fcMarginLeft.visible = showAllMaginSelectors;
	elements.labelMarginAll.visible = !showAllMaginSelectors;
	elements.labelMarginEqual.visible = showAllMaginSelectors;
}

/**
 * @return {String}
 * @properties={typeid:24,uuid:"B797E876-1EAB-455D-B69C-6EEF16BC9E89"}
 */
function getStyleClasses() {
	var classes = 'btn';

	if (styleRoundedBorder) {
		classes = scopes.ngUtils.addStyleClass(classes, 'btn-round');
	}
	
	if (!expandMarginSelector) {
		classes = scopes.ngUtils.addStyleClass(classes, scopes.svyStyleWizard.getMarginStyleClass(marginAll))
	} else {
		classes = scopes.ngUtils.addStyleClass(classes, scopes.svyStyleWizard.getMarginStyleClass(marginTop, scopes.svyStyleWizard.SIDES.TOP));
		classes = scopes.ngUtils.addStyleClass(classes, scopes.svyStyleWizard.getMarginStyleClass(marginRight, scopes.svyStyleWizard.SIDES.RIGHT));
		classes = scopes.ngUtils.addStyleClass(classes, scopes.svyStyleWizard.getMarginStyleClass(marginBottom, scopes.svyStyleWizard.SIDES.BOTTOM));
		classes = scopes.ngUtils.addStyleClass(classes, scopes.svyStyleWizard.getMarginStyleClass(marginLeft, scopes.svyStyleWizard.SIDES.LEFT));
	}
	
	return classes
}


/**
 * @properties={typeid:24,uuid:"6D38F8F1-0197-44E7-8868-E3A9487E1378"}
 * @override
 */
function updateElementStyle(classes) {
	forms.styleResultButton.updateElementStyle(classes);
}