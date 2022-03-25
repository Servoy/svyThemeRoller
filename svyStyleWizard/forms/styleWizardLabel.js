/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"09805BFA-4F81-4000-B2A2-4CA0294EBE58"}
 */
var styleExtra = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"402422DA-6E99-4F4D-9F5E-E065727CDC49"}
 */
var borderColor = "Default";

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"6A747961-72C3-46BF-88D9-375CE37AC208",variableType:4}
 */
var styleRoundedBorder = 0;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"007992FB-C0ED-40C6-ADC5-993B33463D3A"}
 */
var marginAll = '-1';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A37A647A-FA7E-4967-A27B-0DA4546EC345"}
 */
var marginTop = '-1';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"DC61122B-C450-4BAB-8CB7-FB7CDA1DE9AB"}
 */
var marginRight = '-1';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0E9BFF76-5F54-4255-B9DE-5D5AF22A8720"}
 */
var marginBottom = '-1';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"5305E260-C3B3-448C-B9D7-01404413889B"}
 */
var marginLeft = '-1';

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"73798C06-9F47-4479-A833-1D815376F2CF",variableType:4}
 */
var expandMarginSelector = 0;

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"8037F15F-B8EF-46ED-82A6-6D7F8EE17343",variableType:-4}
 */
var styleBold = false;

/**
 * @type {Boolean}
 * 
 * @properties={typeid:35,uuid:"D3CD1EC0-BFFE-4353-9AD3-88977A1311F6",variableType:-4}
 */
var styleUnderline = false;

/**
 * @properties={typeid:35,uuid:"DB9C9E94-F01B-42F7-86B3-600162EE910A",variableType:-4}
 */
var styleItalic = false;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A851DDF6-060D-4DEF-A8CC-6F6FE6187D04"}
 */
var labelColor = "";


/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"B2BA1693-DE2A-4DDE-A4AB-BC42F8C70A21"}
 */
function onShow(firstShow, event) {
	updateUI();
}

/**
 * @properties={typeid:24,uuid:"4B8E668A-EEAF-4C31-B088-B86757BFB931"}
 * @override
 */
function getElementType() {
	return scopes.entityStyles.STYLE_ELEMENT_TYPES.LABEL;
}

/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"10DD5708-01B2-46B5-AEBE-D4DC0A9CFC42"}
 */
function onActionToggleEditMargin(event, dataTarget) {
	expandMarginSelector = !expandMarginSelector
	updateUI();
}

/**
 * @properties={typeid:24,uuid:"804E7823-6B87-4FDB-8143-C60FCF008265"}
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

	if (styleBold) {
		elements.labelBold.removeStyleClass("btn-outline-default")
		elements.labelBold.addStyleClass("btn-primary")
	} else {
		elements.labelBold.addStyleClass("btn-outline-default")
		elements.labelBold.removeStyleClass("btn-primary")
	}
	
	if (styleUnderline) {
		elements.labelUnderline.removeStyleClass("btn-outline-default")
		elements.labelUnderline.addStyleClass("btn-primary")
	} else {
		elements.labelUnderline.addStyleClass("btn-outline-default")
		elements.labelUnderline.removeStyleClass("btn-primary")
	}
	
	if (styleItalic) {
		elements.labelItalic.removeStyleClass("btn-outline-default")
		elements.labelItalic.addStyleClass("btn-primary")
	} else {
		elements.labelItalic.addStyleClass("btn-outline-default")
		elements.labelItalic.removeStyleClass("btn-primary")
	}
	
	if (labelColor) {
		elements.labelColorStyleSelected.addStyleClass(labelColor);
	}
}

/**
 * @return {String}
 * @properties={typeid:24,uuid:"8A9A6B5A-E35C-4301-872D-B4B59A54A326"}
 */
function getStyleClasses() {
	var classes = 'default-align';
	
	if (labelColor) {
		classes = scopes.ngUtils.addStyleClass(classes, labelColor);
	}

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

	if (styleBold) {
		classes = scopes.ngUtils.addStyleClass(classes, "font-weight-bold");
	}
	
	if (styleUnderline) {
		classes = scopes.ngUtils.addStyleClass(classes, "text-underline");
	}
	
	if (styleItalic) {
		classes = scopes.ngUtils.addStyleClass(classes, "font-italic");
	}

	return classes
}

/**
 * @param {String} classes
 *
 * @properties={typeid:24,uuid:"8CFC6DC8-DD2D-4D9E-AE89-4ECBBF7EDD1B"}
 */
function setStyleClasses(classes) {
	
	elements.labelColorStyleSelected.removeStyleClass(labelColor);

	labelColor = "";
	marginAll = "-1";
	marginTop = "-1";
	marginRight = "-1";
	marginBottom = "-1";
	marginLeft = "-1";
	styleRoundedBorder = 0;
	styleBold = false;
	styleUnderline = false;
	styleExtra = null;

	if (!classes) {
		return;
	}

	var cls = classes.split(" ");

	var labelColors = scopes.svyStyleWizard.labelColors;
	var marginAllStyles = ["margin-10", "margin-15", "margin-20", "margin-30"];
	var marginTopStyles = ["margin-top-10", "margin-top-15", "margin-top-20", "margin-top-30"];
	var marginRightStyles = ["margin-right-10", "margin-right-15", "margin-right-20", "margin-right-30"];
	var marginBottomStyles = ["margin-bottom-10", "margin-bottom-15", "margin-bottom-20", "margin-bottom-30"];
	var marginLeftStyles = ["margin-left-10", "margin-left-15", "margin-left-20", "margin-left-30"];

	// rounderd border
	if (cls.indexOf("btn-round") > -1) {
		styleRoundedBorder = 1;
	}
	
	// Bold
	if (cls.indexOf("font-weight-bold") > -1) {
		styleBold = true;
	}
	
	// Undeline
	if (cls.indexOf("text-underline") > -1) {
		styleUnderline = true;
	}

	// button style
	var key;
	for (var i = 0; i < labelColors.length; i++) {
		key = labelColors[i]
		if (cls.indexOf(key) > -1) {
			labelColor = key
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
 * @properties={typeid:24,uuid:"946B45ED-8340-4339-B4FE-C2307516AF44"}
 * @override
 */
function updateElementStyle(classes) {
	forms.styleResultLabel.updateElementStyle(classes);
}

/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"01CBC521-CD74-43FC-88FF-BDB3C86F6126"}
 */
function onActionBack(event, dataTarget) {
	cancel();
	globals.showForm(forms.styleLabels)
}

/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"8FFB3D7F-CD52-40C4-873A-A05F479282D0"}
 */
function onActionCancel(event, dataTarget) {
	cancel();
}

/**
 * @properties={typeid:24,uuid:"F299A66B-D359-40CB-AC6D-C436F560B255"}
 */
function cancel() { }

/**

 * @protected
 *
 * @properties={typeid:24,uuid:"95543430-DC24-4D09-B2E3-37D9A0F78389"}
 */
function onActionSaveAsNew() {
	if (saveAsNew()) {
		globals.showForm(forms.styleLabels);
	}
}

/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"D61AF680-BCCC-46F2-9234-A637294FC9A1"}
 */
function onActionToggleBold(event, dataTarget) {
	styleBold = !styleBold;
	updateUI();
	updateElementStyle(getStyleClasses());
}

/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"7F70D5CD-BA76-4E19-9E0E-4E87A681968A"}
 */
function onActionToggleUnderline(event, dataTarget) {
	styleUnderline = !styleUnderline;
	updateUI();
	updateElementStyle(getStyleClasses());
}

/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"E354A578-602C-4419-BD43-E2405E39BC3C"}
 */
function onActionLabelColorDropdown(event, dataTarget) {
	  // create lookup object
	var lookupObj = scopes.svyLookup.createValueListLookup("labelColors", "Choose a style");
	lookupObj.setLookupForm(forms.svyLookupStyleWizard);
	lookupObj.getField(0).setShowAs("html");
	
	// show pop-up
	var component = elements.labelColorStyle;

	//var initialValue = application.getValueListDisplayValue(elements.productID.getValueListName());
	lookupObj.showPopUp(onSelectLabelColor, component, 400, 500, null);
	// add fields
	
//	// related data is supported
//	lookupObj.addField('products_to_categories.categoryname').setTitleText('Category');
//	lookupObj.addField('productname').setTitleText('Product');
//	lookupObj.addField('products_to_suppliers.companyname').setTitleText('Supplier');
//	
//	// Valuelists and non-searchable fields supported
//	lookupObj.addField('discontinued')
//		.setTitleText('Available')
//		.setSearchable(false)
//		.setValueListName('product_availability');
//		
//	// calculation, non-searchable fields example (if (discontinued) return 'Discontinued' else return 'Available')
//	// lookupObj.addField('isDiscontinued')
//	//	.setTitleText('Available')
//	//	.setSearchable(false)
//		
//	// formatted, non-searchable field example
//	lookupObj.addField('unitprice')
//		.setSearchable(false)
//		.setTitleText('Price')
//		.setFormat('#,###.00')
//	
//	// show pop-up
//	var component = elements.productID;
//	var initialValue = application.getValueListDisplayValue(elements.productID.getValueListName(),selectedProductID);
//	lookupObj.showPopUp(onSelect,component,null,null,initialValue);
}

/**
 * @private
 * @param {Array<JSRecord<db:/example_data/products>>} records
 * @param {Array<String|Date|Number>} values
 * @param {scopes.svyLookup.Lookup} lookup
 * @properties={typeid:24,uuid:"534BF5B3-90D2-4C11-B12C-C2B6610283A6"}
 */
function onSelectLabelColor(records, values, lookup) {
	if (values && values[0]) {
		
		elements.labelColorStyleSelected.removeStyleClass(labelColor);

		labelColor = values[0];
		updateElementStyle(getStyleClasses())
		updateUI()
	}
}

/**
 * @param {JSEvent} event
 * @param {string} dataTarget
 *
 * @private
 *
 * @properties={typeid:24,uuid:"45B87A4B-18BB-44DD-8F1B-B5B2C8CC6B71"}
 */
function onActionToggleItalic(event, dataTarget) {
	styleItalic = !styleItalic;
	updateUI();
	updateElementStyle(getStyleClasses());
}
