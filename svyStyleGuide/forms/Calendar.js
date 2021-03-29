/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"A756AB04-0106-44C8-A0B0-54E4197C4BF0",variableType:93}
 */
var dpDate = new Date();

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"8CF751DF-8FB1-4805-9CF5-161335F49FB2"}
 */
function onLoad(event) {
	dataprovider = new Date();
}

/**
 * @param jsElement
 *
 * @properties={typeid:24,uuid:"33079C07-7549-4046-B4FF-682EC829D3BA"}
 * @override
 */
function createElementInstance(jsElement) {
	jsElement.setJSONProperty("dataProvider","dpDate")
}
