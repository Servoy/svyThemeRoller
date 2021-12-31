/**
 * @properties={type:12,typeid:36,uuid:"95CB8083-70C9-4F96-9CF3-66E04A0AA9D8"}
 */
function cardTypeStyleClass()
{
	if (scopes.svyStyleGuide.cardType.units.indexOf(property) > -1) {
		return 'card-unit';
	} else if (scopes.svyStyleGuide.cardType.color.indexOf(property) > -1) {
		return 'card-color';
	}
	
	return '';
}