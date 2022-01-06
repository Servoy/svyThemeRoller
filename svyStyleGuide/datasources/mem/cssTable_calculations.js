/**
 * @properties={type:12,typeid:36,uuid:"5E904837-4D8F-4D94-956C-BA1E3DEEB9CF"}
 */
function cardChangeStatus()
{

	if(true){
		return 'cardChangeSignal';
	}
	return '';
}

/**
 * @properties={type:12,typeid:36,uuid:"95CB8083-70C9-4F96-9CF3-66E04A0AA9D8"}
 */
function cardTypeStyleClass()
{
	if (scopes.svyStyleGuide.variablesType.units.indexOf('@'+name) > -1) {
		return 'card-unit';
	} else if (scopes.svyStyleGuide.variablesType.color.indexOf('@'+name) > -1) {
		return 'card-color';
	}
	
	return '';
}
