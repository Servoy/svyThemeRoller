
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
	//popup.height(application.getWindow().getHeight()-100);
	popup.width(application.getWindow().getWidth()-1);
	popup.x(1);
	popup.y(1);
	popup.showBackdrop(true);
	popup.show();
}
