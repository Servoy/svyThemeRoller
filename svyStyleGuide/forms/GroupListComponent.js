
/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
 *
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {boolean}
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"D4959C14-677A-4480-9485-8138F603A512"}
 */
function onDataChange(oldValue, newValue, event) {
	application.output(newValue);
	return true
}
