/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"42C39647-79DA-486A-8554-5A34797BC30F"}
 */
var styleExtra = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0D38CE9D-AC47-4696-A7B2-A9A0E036C51D"}
 */
var buttonStyle = "btn-default";

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
 * @properties={typeid:24,uuid:"758C9E6F-6271-4846-BA0D-269C6A0F871B"}
 * @override
 */
function getElementType() {
	return scopes.entityStyles.STYLE_ELEMENT_TYPES.BUTTON;
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
 * @param {String} classes
 *
 * @properties={typeid:24,uuid:"BF6198A0-339F-4779-B87F-CE5D315F82D9"}
 */
function setStyleClasses(classes) {
	buttonStyle = "btn-default";
	marginAll = "-1";
	marginTop = "-1";
	marginRight = "-1";
	marginBottom = "-1";
	marginLeft = "-1";
	styleRoundedBorder = 0;
	styleExtra = null;

	if (!classes) {
		return;
	}

	var cls = classes.split(" ");

	var buttonStyles = ["btn-default", "btn-primary", "btn-warning"]
	var marginAllStyles = ["margin-10", "margin-15", "margin-20", "margin-30"];
	var marginTopStyles = ["margin-top-10", "margin-top-15", "margin-top-20", "margin-top-30"];
	var marginRightStyles = ["margin-right-10", "margin-right-15", "margin-right-20", "margin-right-30"];
	var marginBottomStyles = ["margin-bottom-10", "margin-bottom-15", "margin-bottom-20", "margin-bottom-30"];
	var marginLeftStyles = ["margin-left-10", "margin-left-15", "margin-left-20", "margin-left-30"];

	// rounderd border
	if (cls.indexOf("btn-round") > -1) {
		styleRoundedBorder = 1;
	}

	// button style
	var key;
	for (var i = 0; i < buttonStyles.length; i++) {
		key = buttonStyles[i]
		if (cls.indexOf(key) > -1) {
			buttonStyle = key
			break;
		}
	}

	// margin all
	for (i = 0; i < marginAllStyles.length; i++) {
		key = marginAllStyles[i];
		if (cls.indexOf(key) > -1) {
			marginAll = key.substring(key.length - 2);
			expandMarginSelector = 0;
			break;
		}
	}
	
	// margin top
	for (i = 0; i < marginTopStyles.length; i++) {
		key = marginTopStyles[i];
		if (cls.indexOf(key) > -1) {
			marginTop = key.substring(key.length - 2);
			expandMarginSelector = 1;
			break;
		}
	}

	// margin right
	for (i = 0; i < marginRightStyles.length; i++) {
		key = marginRightStyles[i];
		if (cls.indexOf(key) > -1) {
			marginRight = key.substring(key.length - 2);
			expandMarginSelector = 1;
			break;
		}
	}
	
	// margin bottom
	for (i = 0; i < marginBottomStyles.length; i++) {
		key = marginBottomStyles[i];
		if (cls.indexOf(key) > -1) {
			marginBottom = key.substring(key.length - 2);
			expandMarginSelector = 1;
			break;
		}
	}
	
	// margin left
	for (i = 0; i < marginLeftStyles.length; i++) {
		key = marginLeftStyles[i];
		if (cls.indexOf(key) > -1) {
			marginLeft = key.substring(key.length - 2);
			expandMarginSelector = 1;
			break;
		}
	}
}

/**
 * @properties={typeid:24,uuid:"6D38F8F1-0197-44E7-8868-E3A9487E1378"}
 * @override
 */
function updateElementStyle(classes) {
	forms.styleResultButton.updateElementStyle(classes);
}

/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"2394B9B0-EDBF-4944-8BBB-986CAE7A843C"}
 */
function onActionBack(event, dataTarget) {
	cancel();
	globals.showForm(forms.styleButtons)
}

/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"99811D79-8606-4739-8D39-241037DA9C41"}
 */
function onActionCancel(event, dataTarget) {
	cancel();
}

/**
 * @properties={typeid:24,uuid:"07A8AAA2-E8BA-4AC7-A53A-F333FE617473"}
 */
function cancel() { }

/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"D95B71EB-8346-455A-95BC-8689F63B4CBF"}
 */
function onActionButtonStyleDropdown(event, dataTarget) {
	// TODO Auto-generated method stub
}

/**

 * @protected
 *
 * @properties={typeid:24,uuid:"E090656E-B120-4416-AA88-47FD8721F322"}
 */
function onActionSaveAsNew() {
	if (saveAsNew()) {
		globals.showForm(forms.styleButtons);
	}
}
