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
