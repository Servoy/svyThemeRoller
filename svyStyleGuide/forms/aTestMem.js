
/**
 * @param {JSEvent} event
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"A4805A0D-0CBF-470F-94DA-6DEB755CB921"}
 */
function onAction(event) {

	
	var dataset = databaseManager.createEmptyDataSet();
	dataset.addColumn("id");
	dataset.addColumn("mycol1")
	dataset.addColumn("mycol2")

	
	dataset.addRow([1, "One x", "One x"])
	dataset.addRow([2, "Two x", "Two x"])
	
	dataset.createDataSource("mytable");
}
