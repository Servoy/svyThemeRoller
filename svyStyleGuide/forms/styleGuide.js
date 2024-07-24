/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"0FDBC4C6-C0AF-4D5C-A49D-2B95EE81D088"}
 */
function onLoad(event) {

	var navbarItem = createMenuItem('Navbar', 'home');
	navbarItem.position = 'LEFT'
	elements.navbar.addMenuItem(navbarItem);
	elements.navbar.addMenuItem(createMenuItem('Label & Buttons', 'label'));

	var menuItem = createMenuItem('Fields', 'menu-fields');
	var subMenuItems = [];
	subMenuItems.push(createSubMenuItem('TextBox', 'textbox'));
	subMenuItems.push(createSubMenuItem('Calendar', 'calendar'));
	subMenuItems.push(createSubMenuItem('Select', 'select'));
	subMenuItems.push(createSubMenuItem('Typeahead', 'typeahead'));
	subMenuItems.push(createSubMenuItem('TextArea', 'textarea'));
	subMenuItems.push(createSubMenuItem('CheckBox', 'checkbox'));
	menuItem.subMenuItems = subMenuItems;
	elements.navbar.addMenuItem(menuItem);

	elements.navbar.addMenuItem(createMenuItem('Tab Panel', 'tabpanel'));
	elements.navbar.addMenuItem(createMenuItem('Grids', 'grids'));
	elements.navbar.addMenuItem(createMenuItem('Sidenav', 'sidenav'));
	elements.navbar.addMenuItem(createMenuItem('Breadcrumb', 'sidenav'));



	menuItem = createMenuItem('Windows', 'windows');
	subMenuItems = [];
	subMenuItems.push(createSubMenuItem('Window', 'window'));
	subMenuItems.push(createSubMenuItem('Dialog', 'dialog'));
	subMenuItems.push(createSubMenuItem('Input Dialog', 'dialog-input'));
	subMenuItems.push(createSubMenuItem('Popup Menu', 'popup'));
	menuItem.subMenuItems = subMenuItems;
	elements.navbar.addMenuItem(menuItem);

	/**
	 * @return {CustomType<bootstrapextracomponents-navbar.menuItem>}
	 * */
	function createMenuItem(text, id) {
		var item = elements.navbar.createMenuItem(text, id);
		item.position = 'RIGHT'
		item.displayType = 'MENU_ITEM'
		item.styleClass = 'h4 margin-right-15 margin-left-15'
		return item
	}

	/**
	 * @return {CustomType<bootstrapextracomponents-navbar.menuItem>}
	 * */
	function createSubMenuItem(text, id) {
		var item = elements.navbar.createMenuItem(text, id);
		return item
	}
}

/**
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"180A20C1-AE37-4809-A193-CAB215097221"}
 */
function onActionThemeConfig(event) {
	//application.showForm(forms.ThemeConfigurator);
	var popup = plugins.window.createFormPopup(forms.ThemeConfigurator);
	popup.width(application.getWindow().getWidth() - 350);
	popup.height(application.getWindow().getHeight() - 1);

	popup.x(1);
	popup.y(1);
	popup.showBackdrop(true);
	popup.show();
}

/**
 * Called whenever a menu item is clicked or a submenu item is selected with the JSEvent and the menuItem object clicked on.
 *
 * @param {JSEvent} event
 * @param {CustomType<bootstrapextracomponents-navbar.menuItem>} menuItem
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"11D7410D-01C2-413C-AFF5-1BA95CA6E59B"}
 */
function onMenuItemClicked(event, menuItem) {

	switch (menuItem.itemId) {
	case 'window':
		var win = application.createWindow('window', JSWindow.MODAL_DIALOG);
		win.show(forms.WindowForm);
		break;
	case 'dialog':
		plugins.dialogs.showInfoDialog('Dialog', 'This is a dialog', 'Ok', 'Cancel')
		break;
	case 'dialog-input':
		plugins.dialogs.showInputDialog('Input Dialog', 'Enter a value')
		break;
	case 'popup':
		var menu = plugins.window.createPopupMenu();
		var submenu0 = menu.addMenu(0);
		submenu0.text = "submenu 0";
		submenu0.addMenuItem("sub item 0 - 1");
		
		// add a first submenu
		var submenu1 = menu.addMenu("submenu 1");
		submenu1.addMenuItem("sub item 1 - 1");
		// add a submenu as child of the first submenu
		var submenu1_2 = submenu1.addMenu("submenu 1 - 2");
		submenu1_2.addMenuItem("sub item 1 - 2 - 1");
		// add another submenu as a child of the first submenu
		var submenu1_3 = submenu1.addMenu("submenu 1 - 3");
		submenu1_3.addMenuItem("sub item 1 - 3 - 1");
		// add a submenu to the second submenu of the first submenu
		//var submenu1_3_2 = submenu1_2.addMenu("submenu 1 - 2 - 2");
		//submenu1_3_2.addMenuItem("sub item 1 - 2 - 2 - 1");
		// add a submenu directly to the menu, at the first position
		menu.show(event.getX(), event.getY())
		break;
	default:
		plugins.ngclientutils.scrollIntoView('#' + menuItem.itemId)
		break;
	}

}
