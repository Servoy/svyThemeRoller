
/**
 * Foundset load trigger, make sure a for inmem JSDataSet.createDataSource(inMemName) is called or that a ViewFoundSet is registered (datasources.view.xxx.getViewFoundset(select).
 *
 * @param {String} memOrViewName The in memory or view foundset table name that is touched.
 *
 * @private
 *
 * @properties={typeid:24,uuid:"51552610-DFE1-4F87-99B4-BBD2D86E9809"}
 */
function onFoundSetLoad(memOrViewName) {
	
	var dataset = databaseManager.createEmptyDataSet();
	dataset.addColumn("id");
	dataset.addColumn("mycol1")
	dataset.addColumn("mycol2")

	
	dataset.addRow([1, "One", "One"])
	dataset.addRow([2, "Two", "Two"])
	
//	dataset.createDataSource(memOrViewName);
	
}
