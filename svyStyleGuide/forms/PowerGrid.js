
/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"F7804423-85D6-490E-AD65-06D39533AF59"}
 */
function onShow(firstShow, event) {
	var q = datasources.db.example_data.customers.createSelect();
	q.result.add(q.columns.companyname);
	q.result.add(q.columns.contactname);
	q.result.add(q.columns.country);
	q.result.add(q.columns.city);
	q.result.addValue(0,'check')
	
	var ds = databaseManager.getDataSetByQuery(q,-1);
	elements.datasettable.renderData(ds);
}


/**
 * @param rowIndex
 * @param rowData
 * @param field
 * @param columnData
 * @param event
 * 
 * @return {String}
 *
 * @properties={typeid:24,uuid:"416C5E18-B330-4FCF-BF0A-B58AF9D0B29F"}
 */
function cellStyleClassFuncStatusColor(rowIndex, rowData, field, columnData, event) {
	   if (!columnData) {
	      return "";
	   }
	   if (columnData) {
	      switch (columnData) {
	      case "New Order":
	         return "label-tag text-info";
	         break;
	      case "Completed":
	         return "label-tag text-success";
	         break;
	      case "Planned":
	         return "label-tag text-info";
	         break;
	      default:
	         break;
	      }
	   }
	   return "label-tag text-info";
}