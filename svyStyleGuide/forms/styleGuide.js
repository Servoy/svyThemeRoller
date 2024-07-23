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
	elements.navbar.addMenuItem(createMenuItem('Label & Buttons', 'label'));
	elements.navbar.addMenuItem(createMenuItem('Fields', 'fields'));
	elements.navbar.addMenuItem(createMenuItem('Tab Panel', 'tabpanel'));
	elements.navbar.addMenuItem(createMenuItem('Grids', 'grids'));

	function createMenuItem(text, id) {
		var item = elements.navbar.createMenuItem(text, id);
		item.position = 'RIGHT'
		item.displayType = 'MENU_ITEM'
		item.styleClass = 'h4 margin-right-15 margin-left-15'
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
	popup.width(application.getWindow().getWidth() - 1);
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

	plugins.ngclientutils.scrollIntoView('#' + menuItem.itemId)

}
