//svyProperties.js
/**
 * @private
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"88422A3E-9AAB-4F75-9708-A2C8F6AB612A",variableType:8}
 */
var MAX_TENANTNAME_LENGTH = 50;

/**
 * @private
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"DFDAACE7-8438-4E5D-A0F7-808ACA8399C7",variableType:8}
 */
var MAX_USERNAME_LENGTH = 254;

/**
 * @private
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"9A26EF01-0D5B-4B32-AEF2-16EF4C6A3D0E",variableType:8}
 */
var MAX_NAMESPACE_LENGTH = 500;

/**
 * @private
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"0B21EF99-E2A4-40F3-BC77-CF3F7308C365",variableType:8}
 */
var MAX_TYPE_LENGTH = 50;

/**
 * @private
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"431AB7F0-2AF2-4591-B169-4963FF8386E4",variableType:8}
 */
var MAX_VALUE_LENGTH = 50000000;

/**
 * @private
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"7C71BADA-61FB-4166-915C-D9812A956939",variableType:8}
 */
var MAX_DISPLAYNAME_LENGTH = 500;

/**
 * @private 
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6F4AB270-5A52-4442-B32F-8DB2E15C1CC1"}
 */
var IGNORE_PARAMETER = 'ignore-query-parameter';

/**
 * @private
 * @properties={typeid:35,uuid:"72D265B5-BDC1-498D-9E5F-8E77C491AFF5",variableType:-4}
 */
var log = scopes.svyLogManager.getLogger("com.servoy.svyproperties");

/**
 * @type {String}
 * @private 
 *
 * @properties={typeid:35,uuid:"9C968B18-E9D4-4C66-BF8C-1AE045B1EF9B"}
 */
var activeUserName;

/**
 * @type {String}
 * @private 
 *
 * @properties={typeid:35,uuid:"BD6DF837-297D-4335-A35E-8E7F8FFF3DDF"}
 */
var activeTenantName;

/**
 * If false then when saving or deleting security-related records
 * if an external DB transaction is detected the operation will fail.
 * If true then when saving or deleting security-related records the
 * module will start/commit a DB transaction only if an external DB transaction
 * is not detected. On exceptions any DB transaction will be rolled back
 * regardless if it is started internally or externally (exceptions will be propagated
 * to the external transaction so callers will be able to react on them accordingly)
 *
 * @private
 *
 * @properties={typeid:35,uuid:"91B8EA9C-7998-4D88-9C62-D79C6994C92E",variableType:-4}
 */
var supportExternalDBTransaction = false;

/**
 * Use this method to change the behavior of the svyProperties module with respect
 * to DB transactions.
 *
 * If the flag is set to false (default) then when saving or deleting security-related records
 * if an external DB transaction is detected the operation will fail.
 * If the flag is set to true then when saving or deleting security-related records the
 * module will start/commit a DB transaction only if an external DB transaction
 * is not detected. On exceptions any DB transaction will be rolled back
 * regardless if it is started internally or externally (exceptions will be propagated
 * to the external transaction so callers will be able to react on them accordingly)
 *
 * @note If using external DB transactions then callers are responsible for refreshing
 * the state of security-related objects upon transaction rollbacks which occur after
 * successful calls to the svyProperties API.
 *
 * @public 
 * @param {Boolean} mustSupportExternalTransactions The value for the supportExternalDBTransaction flag to set.
 *
 *
 * @properties={typeid:24,uuid:"0CD15A10-E9AB-4B82-BDA7-F4ECB9538E13"}
 */
function changeExternalDBTransactionSupportFlag(mustSupportExternalTransactions) {
	supportExternalDBTransaction = mustSupportExternalTransactions;
}

/**
 * @protected
 * @param {JSRecord<db:/svy_security/svy_properties>} record
 * @constructor
 * @properties={typeid:24,uuid:"F474AE15-FE8F-4020-943D-1818931058B4"}
 * @AllowToRunInFind
 */
function Property(record) {
	if (!record) {
		throw new Error('Property record is not specified');
	}
	
	/** 
	 * @protected 
	 * @type {JSRecord<db:/svy_security/svy_properties>} 
	 * */
	this.record = record;

}

/**
 * @constructor 
 * @private 
 * @properties={typeid:24,uuid:"EE917AAD-950D-420E-A7D9-93119B54E4AF"}
 */
function initProperty() {
	Property.prototype = Object.create(Property.prototype);
	Property.prototype.constructor = Property;
	
    /**
     * Gets the property uuid for this property.
     *
     * @public
     * @return {UUID} The property uuid of this property.
     * @this {Property}
     */
	Property.prototype.getPropertyUUID = function() {
        return this.record.property_uuid;
    }
	
    /**
     * Gets the display name for this property.
     *
     * @public
     * @return {String} The property value of this property. Can be null if a display name is not set.
     * @this {Property}
     */
    Property.prototype.getDisplayName = function() {
        return this.record.display_name;
    }
    
    /**
     * Sets the property display name for this property.
     *
     * @public
     * @return {Property} The property uuid of this property.
     * @this {Property}
     */
    Property.prototype.setDisplayName = function(displayName) {
    	if (!textLengthIsValid(displayName, MAX_DISPLAYNAME_LENGTH)) {
    		throw new Error(utils.stringFormat('DisplayName must be between 1 and %1$s characters long.', [MAX_DISPLAYNAME_LENGTH]));
    	}
    	this.record.display_name = displayName;
        saveRecord(this.record);
        return this;
    }
	
    /**
     * Gets the property value for this property.
     *
     * @public
     * @return {String} The property value of this property. Can be null if a property value is not set.
     * @this {Property}
     */
    Property.prototype.getPropertyValue = function() {
        return this.record.property_value;
    }

    /**
     * Sets the property value for this property.
     * 
     * @public
     * @param {String} propertyValue 
     * @return {Property} This property for call-chaining support.
     * @this {Property}
     */
    Property.prototype.setPropertyValue = function(propertyValue) {
    	if (!textLengthIsValid(propertyValue, MAX_VALUE_LENGTH)) {
    		throw new Error(utils.stringFormat('PropertyValue must be between 0 and %1$s characters long.', [MAX_VALUE_LENGTH]));
    	}
    	
    	this.record.property_value = propertyValue;
        saveRecord(this.record);
        return this;
    }
    
    /**
     * Gets the tenant name for this property.
     *
     * @public
     * @return {String} The property value of this property. Can be null if a display name is not set.
     * @this {Property}
     */
    Property.prototype.getTenantName = function() {
        return this.record.tenant_name;
    }
    
    /**
     * Gets the user name for this property.
     *
     * @public
     * @return {String} The property value of this property. Can be null if a display name is not set.
     * @this {Property}
     */
    Property.prototype.getUserName = function() {
        return this.record.user_name;
    }    
    
    /**
     * Immediately and permanently deletes this property.
     * @note USE WITH CAUTION! There is no undo for this operation.
     * 
     * @public 
     * @return {Boolean} true if property could be deleted
     * @this {Property}
     */
    Property.prototype.deleteProperty = function() {
    	try {
	    	return deleteRecord(this.record);
        } catch (e) {
        	log.error(utils.stringFormat('Could not delete property %1$. Unknown error: %2$. Check log.', [this.getPropertyUUID(), e.message]));
            throw e;
        }
    }
}

/**
 * Sets the user and tenant name for the logged in user<br>
 * Both are used in all convenience methods to get or set properties for the user or the tenant<br>
 * When svySecurity is used, this is called automatically after login
 * 
 * @param {String} userName the name of the active user for which user related properties are stored
 * @param {String} [tenantName] the name of the tenant of the active user
 * 
 * @public 
 * 
 * @example 
 * <pre>
 * function onSolutionOpen(arg, queryParams) {
 *   // don't set the tenant if the solution doesn't support multi-tenancy
 *   // scopes.svyProperties.setUserName(loggedUserName);
 * 
 *   scopes.svyProperties.setUserName(loggedUniqueUserName, loggedUniqueTenantName);
 * }
 * </pre>
 * @properties={typeid:24,uuid:"B7E8B099-D036-4157-8C32-98196238C2BC"}
 */
function setUserName(userName, tenantName) {
	activeUserName = userName;
	activeTenantName = tenantName;
}

/**
 * Returns the property with the given key and type for the user set via <code>setUserName()</code>
 * 
 * @param {String} propertyKey the identifier for the property
 * @param {String} propertyType the type of property (typically an enum value)
 * 
 * @return {Property} the property found or null if not found
 * 
 * @public 
 * 
 * @example
 * <pre>
 * function onShow(firstShow, event) {
 * 	var propertyKey = application.getSolutionName() + "-" + controller.getName() + "-" + elements.table.getName();
 *	var columnState = scopes.svyProperties.getUserProperty(propertyKey, 'table-state');
 *	
 *	// restore the ng-grid state 
 *	if (columnState) elements.table.restoreColumnState(columnState.getPropertyValue());
 * }
 * </pre>
 *
 * @properties={typeid:24,uuid:"0880C37E-B254-44F5-90E5-7AC3D553C71D"}
 */
function getUserProperty(propertyKey, propertyType) {
	if (!activeUserName) {
		throw new Error('No user name set in svyProperties. Make sure a user name is set by calling setUserName().');
	}
	return getProperty(propertyKey, propertyType, activeTenantName, activeUserName);
}

/**
 * Returns the value of the property with the given key and type for the user set via <code>setUserName()</code>
 * 
 * @param {String} propertyKey the identifier for the property
 * @param {String} propertyType the type of property (typically an enum value)
 * 
 * @return {String} the value of the property found or null if not found
 * 
 * @public 
 * 
 * @example
 * <pre>
 * function onShow(firstShow, event) {
 * 	var propertyKey = application.getSolutionName() + "-" + controller.getName() + "-" + elements.table.getName();
 *	var columnState = scopes.svyProperties.getUserPropertyValue(propertyKey, 'table-state');
 *	
 *	// restore the ng-grid state 
 *	if (columnState) elements.table.restoreColumnState(columnState);
 * }
 * </pre>
 *
 * @properties={typeid:24,uuid:"76BD726E-EE08-46D9-80CF-3BBAB8BAC776"}
 */
function getUserPropertyValue(propertyKey, propertyType) {
	if (!activeUserName) {
		throw new Error('No user name set in svyProperties. Make sure a user name is set by calling setUserName().');
	}
	var property = getProperty(propertyKey, propertyType, activeTenantName, activeUserName);
	if (property) {
		return property.getPropertyValue();
	} else {
		return null;
	}
}

/**
 * Returns the tenant wide property with the given key and type for the tenant set via <code>setUserName()</code><br>
 * Tenant wide properties are properties where the user name is not set
 * 
 * @param {String} propertyKey the identifier for the property
 * @param {String} propertyType the type of property (typically an enum value)
 * 
 * @return {Property} the property found or null if not found
 * 
 * @public 
 *
 * @properties={typeid:24,uuid:"411A588C-7C9B-4283-AE76-07470315E182"}
 */
function getTenantProperty(propertyKey, propertyType) {
	if (!activeTenantName) {
		throw new Error('No tenant name set in svyProperties. Make sure a tenant name is set by calling setUserName().');
	}
	return getProperty(propertyKey, propertyType, activeTenantName, null);
}

/**
 * Returns the value of the tenant wide property with the given key and type for the tenant set via <code>setUserName()</code><br>
 * Tenant wide properties are properties where the user name is not set
 * 
 * @param {String} propertyKey the identifier for the property
 * @param {String} propertyType the type of property (typically an enum value)
 * 
 * @return {String} the value of the property found or null if not found
 * 
 * @public 
 *
 * @properties={typeid:24,uuid:"30406A3D-C5B1-481F-B8CE-B0B5173CB406"}
 */
function getTenantPropertyValue(propertyKey, propertyType) {
	if (!activeTenantName) {
		throw new Error('No tenant name set in svyProperties. Make sure a tenant name is set by calling setUserName().');
	}
	var property = getProperty(propertyKey, propertyType, activeTenantName, null);
	if (property) {
		return property.getPropertyValue();
	} else {
		return null;
	}
}

/**
 * Returns the global property with the given key and type<br>
 * Global properties are properties where the tenant and user name is not set
 * 
 * @param {String} propertyKey the identifier for the property
 * @param {String} propertyType the type of property (typically an enum value)
 * 
 * @return {Property} the property found or null if not found
 * 
 * @public 
 *
 * @properties={typeid:24,uuid:"543A3697-B48C-47E9-9109-2F0B9BAE3EA6"}
 */
function getGlobalProperty(propertyKey, propertyType) {
	return getProperty(propertyKey, propertyType, null, null);
}

/**
 * Returns the value of the global property with the given key and type<br>
 * Global properties are properties where the tenant and user name is not set
 * 
 * @param {String} propertyKey the identifier for the property
 * @param {String} propertyType the type of property (typically an enum value)
 * 
 * @return {String} the value of the property found or null if not found
 * 
 * @public 
 *
 * @properties={typeid:24,uuid:"BF488CC0-9EC1-46DC-BD86-ED0A83249408"}
 */
function getGlobalPropertyValue(propertyKey, propertyType) {
	var property = getProperty(propertyKey, propertyType, null, null);
	if (property) {
		return property.getPropertyValue();
	} else {
		return null;
	}
}

/**
 * Returns the property with the given key and type or null if not found<br>
 * All parameters given need to match exactly
 * 
 * @param {String} propertyKey the identifier for the property
 * @param {String} propertyType the type of property (typically an enum value)
 * @param {String} [tenantName] the tenant name for which this property is stored
 * @param {String} [userName] the user name for which this property is stored
 * 
 * @return {Property} the property found or null if not found
 * 
 * @public 
 *
 * @properties={typeid:24,uuid:"E0D00933-7F83-4B65-A445-F07E2EC9ADA2"}
 */
function getProperty(propertyKey, propertyType, tenantName, userName) {
	if (!propertyKey || !propertyType) {
		if (!propertyKey) {
			throw new Error('No propertyKey provided');
		}
		if (!propertyType) {
			throw new Error('No propertyType provided');
		}
	}
	var query = datasources.db.svy_security.svy_properties.createSelect();
	query.result.addPk();
	query.where.add(query.columns.property_namespace.eq(propertyKey));
	query.where.add(query.columns.property_type.eq(propertyType));
	if (userName) {
		query.where.add(query.columns.user_name.eq(userName));
	} else {
		query.where.add(query.columns.user_name.isNull);		
	}
	if (tenantName) {
		query.where.add(query.columns.tenant_name.eq(tenantName));
	} else {
		query.where.add(query.columns.tenant_name.isNull);		
	}
	var fs = datasources.db.svy_security.svy_properties.getFoundSet();
	fs.loadRecords(query);
	
	if (utils.hasRecords(fs)) {
		if (fs.getSize() > 1) {
			log.warn('More than one property found for propertyKey "{}", propertyType "{}", tenantName "{}" and userName "{}"', propertyKey, propertyType, tenantName, userName);
		}
		return new Property(fs.getRecord(1));
	} else {
		return null;
	}
}

/**
 * Sets the given value to the user property with the given key and type or creates a new property if not found
 * 
 * @param {String} propertyKey the identifier for the property
 * @param {String} propertyType the type of property (typically an enum value)
 * @param {String} value the string value of the property
 * 
 * @return {Property}
 * 
 * @public 
 * 
 * @example
 * <pre>
 * //persist the state of the NG Grid as user property  
 * function onColumnStateChanged(columnState) {
 *	 var propertyNameSpace = application.getSolutionName() + "-" + controller.getName() + "." + elements.table.getName();	
 *	 scopes.svyProperties.setUserProperty(propertyNameSpace, 'table-state', columnState);
 * }
 * </pre>
 *
 * @properties={typeid:24,uuid:"9D0EB628-D482-4953-BC52-1F30601E590C"}
 */
function setUserProperty(propertyKey, propertyType, value) {
	if (!activeUserName) {
		throw new Error('No user name set in svyProperties. Make sure a user name is set by calling setUserName().');
	}
	return setProperty(propertyKey, propertyType, value, activeUserName, activeTenantName);
}

/**
 * Sets the given value to the tenant wide property with the given key and type or creates a new property if not found<br>
 * Tenant wide properties are properties where the user name is not set
 * 
 * @param {String} propertyKey the identifier for the property
 * @param {String} propertyType the type of property (typically an enum value)
 * @param {String} value the string value of the property
 * 
 * @return {Property}
 * 
 * @public 
 *
 * @properties={typeid:24,uuid:"CF6163EC-661F-4BE3-B7E6-8477D14D98AC"}
 */
function setTenantProperty(propertyKey, propertyType, value) {
	if (!activeTenantName) {
		throw new Error('No tenant name set in svyProperties. Make sure a tenant name is set by calling setUserName().');
	}
	return setProperty(propertyKey, propertyType, value, null, activeTenantName);
}

/**
 * Sets the given value to the global property with the given key and type or creates a new property if not found<br>
 * Global properties are properties where the tenant and user name is not set
 * 
 * @param {String} propertyKey the identifier for the property
 * @param {String} propertyType the type of property (typically an enum value)
 * @param {String} value the string value of the property
 * 
 * @return {Property}
 * 
 * @public 
 *
 * @properties={typeid:24,uuid:"DB44CA4A-8DE4-46E4-9035-035AD28FC1EE"}
 */
function setGlobalProperty(propertyKey, propertyType, value) {
	return setProperty(propertyKey, propertyType, value, null, null);
}

/**
 * Sets the given value to the property with the given key and type or creates a new property if not found
 * 
 * @param {String} propertyKey the identifier for the property
 * @param {String} propertyType the type of property (typically an enum value)
 * @param {String} value the string value of the property
 * @param {String} userName the user name for which this property is stored
 * @param {String} tenantName the tenant name for which this property is stored
 * 
 * @return {Property}
 * 
 * @public 
 *
 * @properties={typeid:24,uuid:"C5BA30F7-8828-40BD-AB30-1295EBECE731"}
 */
function setProperty(propertyKey, propertyType, value, userName, tenantName) {
	var property = getOrCreateProperty(propertyKey, propertyType, tenantName, userName, value);
	return property.setPropertyValue(value);
}

/**
 * Creates a new property for with the given name space
 * 
 * @param {String} propertyKey
 * @param {String} propertyType
 * @param {String} propertyValue
 * @param {String} [tenantName]
 * @param {String} [userName]
 * 
 * @return {Property}
 * @private  
 * 
 * @throws {Error, scopes.svyDataUtils.ValueNotUniqueException}
 *
 * @properties={typeid:24,uuid:"7829E4E0-D48E-4B5D-A931-B4DA6D03960F"}
 */
function createProperty(propertyKey, propertyType, propertyValue, tenantName, userName) {
	if (!propertyKey) {
		throw new Error('propertyKey cannot be null or empty');
	}
	if (!propertyType) {
		throw new Error('propertyType cannot be null or empty');
	}

	if (!textLengthIsValid(propertyKey, MAX_NAMESPACE_LENGTH)) {
		throw new Error(utils.stringFormat('PropertyKey must be between 0 and %1$s characters long.', [MAX_NAMESPACE_LENGTH]));
	}

	if (!textLengthIsValid(propertyValue, MAX_VALUE_LENGTH)) {
		throw new Error(utils.stringFormat('PropertyValue must be between 0 and %1$s characters long.', [MAX_VALUE_LENGTH]));
	}

	if (!textLengthIsValid(propertyType, MAX_TYPE_LENGTH)) {
		throw new Error(utils.stringFormat('PropertyType must be between 1 and %1$s characters long.', [MAX_TYPE_LENGTH]));
	}

	if (!textLengthIsValid(tenantName, MAX_TENANTNAME_LENGTH)) {
		throw new Error(utils.stringFormat('TenantName must be between 1 and %1$s characters long.', [MAX_TENANTNAME_LENGTH]));
	}

	if (!textLengthIsValid(userName, MAX_USERNAME_LENGTH)) {
		throw new Error(utils.stringFormat('UserName must be between 1 and %1$s characters long.', [MAX_USERNAME_LENGTH]));
	}

	var fs = datasources.db.svy_security.svy_properties.getFoundSet();

	// Check if value is unique values
	var fsExists = scopes.svyDataUtils.getFoundSetWithExactValues(fs.getDataSource(), ["property_namespace", "property_type", "tenant_name", "user_name"], [propertyKey, propertyType, tenantName, userName]);
	if (fsExists.getSize()) {
		// return the exception here !?
		throw new scopes.svyDataUtils.ValueNotUniqueException("There is already a property for values", fsExists);
	}

	var rec = fs.getRecord(fs.newRecord(false, false));
	rec.property_namespace = propertyKey;
	rec.property_type = propertyType;
	rec.property_value = propertyValue;
	rec.tenant_name = tenantName;
	rec.user_name = userName;

	saveRecord(rec);
	
	return new Property(rec);
}

/**
 * Gets the property with the given name space or creates one if not found
 * 
 * @param propertyKey
 * @param propertyType
 * @param [tenantName]
 * @param [userName]
 * @param [propertyValue]
 * 
 * @return {Property}
 * @private  
 * 
 * throws an exception if multiple properties are found matching parameters values
 *
 * @properties={typeid:24,uuid:"37C0EC09-FE30-4001-9CBB-5B7CBFBD098F"}
 */
function getOrCreateProperty(propertyKey, propertyType, tenantName, userName, propertyValue) {
	var property = getProperty(propertyKey, propertyType, tenantName, userName);
	if (!property) {
		return createProperty(propertyKey, propertyType, propertyValue, tenantName, userName);
	} else {
		return property;
	}
}

/**
 * Returns the Property with the given property UUID
 * @param {UUID|String} propertyId the UUID of the property (as UUID or as a UUIDString)
 * 
 * @return {Property}
 * @private  
 *
 * @properties={typeid:24,uuid:"1E71BDE6-EFD8-408D-B5B4-356164D3471E"}
 */
function getPropertyById(propertyId) {
    if (propertyId instanceof String) {
        /** @type {String} */
        var propertyString = propertyId;
        propertyId = application.getUUID(propertyString);
    }
    
    var fs = datasources.db.svy_security.svy_properties.getFoundSet();
    fs.loadRecords(propertyId);
    
    if (utils.hasRecords(fs)) {
    	return new Property(fs.getSelectedRecord());
    } else {
    	return null;
    }
}

/**
 * Returns all properties with the given key and type, optional tenant and user name<br>
 * 
 * If tenantName is not provided, it will not be queried; if a null value is provided, only global properties are returned<br>
 * If userName is not provided, it will not be queried; if a null value is provided, only tenant wide properties are returned<br>
 * 
 * @param {String} propertyKey can contain % placeholders for like searches
 * @param {String} [propertyType] has to match exactly
 * @param {String} [tenantName] has to match exactly
 * @param {String} [userName] has to match exactly
 * 
 * @return {Array<Property>}
 * @public 
 *
 * @properties={typeid:24,uuid:"FE508EF4-0698-4A4A-AB65-3042528E217A"}
 */
function getProperties(propertyKey, propertyType, tenantName, userName) {
	if ((propertyKey == null || propertyKey == undefined)) {
		throw new Error("propertyKey required");
	}
	
	if (arguments.length <= 2) {
		//tenant not given - will be ignored
		tenantName = IGNORE_PARAMETER;
	}
	if (arguments.length <= 3) {
		//user not given - will be ignored
		userName = IGNORE_PARAMETER;
	}
	
	return loadProperties(propertyKey, propertyType, tenantName, userName);
}

/**
 * Returns all properties of the given type, optional tenant and user name<br>
 * 
 * If tenantName is not provided, it will not be queried; if a null value is provided, only global properties are returned<br>
 * If userName is not provided, it will not be queried; if a null value is provided, only tenant wide properties are returned<br>
 * 
 * @param {String} propertyType has to match exactly
 * @param {String} [tenantName] has to match exactly
 * @param {String} [userName] has to match exactly
 * 
 * @return {Array<Property>}
 * @public 
 *
 * @properties={typeid:24,uuid:"F31D0294-8EC9-4946-A519-01E583E84BE9"}
 */
function getPropertiesByType(propertyType, tenantName, userName) {
	if ((propertyType == null || propertyType == undefined)) {
		throw new Error("propertyType required");
	}
	
	if (arguments.length <= 1) {
		//tenant not given - will be ignored
		tenantName = IGNORE_PARAMETER;
	}
	if (arguments.length <= 2) {
		//user not given - will be ignored
		userName = IGNORE_PARAMETER;
	}
	
	return loadProperties(null, propertyType, tenantName, userName);
}

/**
 * @param {String} propertyKey
 * @param {String} propertyType
 * @param {String} tenantName will not be queried if IGNORE_PARAMETER, else will ask for exact match or is null
 * @param {String} userName will not be queried if IGNORE_PARAMETER, else will ask for exact match or is null
 * 
 * @return {Array<Property>}
 * 
 * @private 
 *
 * @properties={typeid:24,uuid:"32274E41-68EF-40A5-8DC9-1473D0088BE6"}
 */
function loadProperties(propertyKey, propertyType, tenantName, userName) {
	var query = datasources.db.svy_security.svy_properties.createSelect();
	query.result.addPk();
	
	if (propertyKey) {
		if (propertyKey.indexOf("%") > -1) {
			query.where.add(query.columns.property_namespace.like(propertyKey));
		} else {
			query.where.add(query.columns.property_namespace.eq(propertyKey));
		}
	}
	
	if (propertyType) {
		query.where.add(query.columns.property_type.eq(propertyType));
	}
	
	if (tenantName !== IGNORE_PARAMETER) {
		if (!tenantName) {
			query.where.add(query.columns.tenant_name.isNull);
		} else {
			query.where.add(query.columns.tenant_name.eq(tenantName));			
		}
	}
	
	if (userName !== IGNORE_PARAMETER) {
		if (!userName) {
			query.where.add(query.columns.user_name.isNull);
		} else {
			query.where.add(query.columns.user_name.eq(userName));			
		}
	}
	
	var fsProperties = datasources.db.svy_security.svy_properties.getFoundSet();
	fsProperties.loadRecords(query);
	var result = [];
	
	for (var i = 1; i <= fsProperties.getSize(); i++) {
		var record = fsProperties.getRecord(i);
		result.push(new Property(record));
	}
	
	return result;
}

/**
 * Immediately and permanently deletes the specified property.
 * @note USE WITH CAUTION! There is no undo for this operation.
 *
 * @public
 * @param {Property|UUID|String} property The property object or the UUID (UUID or UUID as String) of the property to delete.
 * @return {Boolean} False if property could not be deleted.
 * @properties={typeid:24,uuid:"6AEB1E3A-0CC8-4F3C-99FC-4EF99EBB9824"}
 * @AllowToRunInFind
 */
function deleteProperty(property) {
    if (!property) {
        throw 'Property cannot be null';
    }
    
    /** @type {Property} */
    var prop;
    if (property instanceof String) {
        /** @type {String} */
        var propertyString = property;
        prop = getPropertyById(application.getUUID(propertyString));
    } else if (property instanceof UUID) {
        /** @type {UUID} */
        var propertyUUID = property;
        prop = getPropertyById(propertyUUID);
    } else {
    	prop = property;
    }

    if (!prop) {
        log.error('Could not delete property because it could not be found.');
        return false;
    }

    try {
        return prop.deleteProperty();
    } catch (e) {
    	log.error(utils.stringFormat('Could not delete property. Unkown error: %2$. Check log.', [e.message]));
        throw e;
    }
}

/**
 * @private
 * @param {String} text the text to validate
 * @param {Number} maxLength the max length allowed for the name; default=50
 * @return {Boolean}
 * @properties={typeid:24,uuid:"59EE6281-B847-4312-9213-DB1ADD5247E4"}
 */
function textLengthIsValid(text, maxLength) {
	if (!maxLength) {
		maxLength = 50;
	}
	if (!text) {
		return true;
	}
	if (text && text.length <= maxLength) {
		return true;
	}
	return false;
}

/**
 * Gets the version of this module
 * @public 
 * @return {String} the version of the module using the format Major.Minor.Revision
 * @properties={typeid:24,uuid:"01949BC8-4989-4944-8E38-C2BB52834C37"}
 */
function getVersion() {
    return application.getVersionInfo()['svyProperties'];
}

/**
 * TODO can i move these in a common module !?
 * Utility to save record with error thrown
 * @private
 * @param {JSRecord} record
 *
 * @properties={typeid:24,uuid:"6032CDBC-7D00-4285-BD9D-76E4240331CD"}
 */
function saveRecord(record) {
	var startedLocalTransaction = false;

	if (databaseManager.hasTransaction()) {
		if (!supportExternalDBTransaction) {
			throw new Error('External database transactions are not allowed.');
		}
	} else {
		startedLocalTransaction = true;
		databaseManager.startTransaction();
	}

	try {
		if (!databaseManager.saveData(record)) {
			throw new Error('Failed to save record ' + record.exception);
		}
		if (startedLocalTransaction) {
			if (!databaseManager.commitTransaction(false, false)) {
				throw new Error('Failed to commit database transaction.');
			}
		}
	} catch (e) {
		log.error('Record could not be saved due to the following: "{}" Rolling back database transaction.', e.message);
		databaseManager.rollbackTransaction();
		record.revertChanges();
		throw e;
	}
}

/**
 * Utility to delete record with errors thrown
 * @private
 * @param {JSRecord} record
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"934ACF3F-138B-40A9-8709-6AF205623E1C"}
 */
function deleteRecord(record) {
    var startedLocalTransaction = false;

    if (databaseManager.hasTransaction()) {
        if (!supportExternalDBTransaction) {
            throw new Error('External database transactions are not allowed.');
        }
    } else {
        startedLocalTransaction = true;
        databaseManager.startTransaction();
    }

    try {
        if (!record.foundset.deleteRecord(record)) {
            throw new Error('Failed to delete record.');
        }
        if (startedLocalTransaction) {
            if (!databaseManager.commitTransaction(true, true)) {
                throw new Error('Failed to commit database transaction.');
            }
        }
    } catch (e) {
    	log.error('Record could not be deleted due to the following: {} Rolling back database transaction.', e.message);
        databaseManager.rollbackTransaction();
        throw e;
    }
    
    return true;
}

/**
 * Initializes the scope.
 * NOTE: This var must remain at the BOTTOM of the file.
 * @private
 * @SuppressWarnings (unused)
 * @properties={typeid:35,uuid:"F5BDD4B1-5B67-4A41-9D9A-C674E563672E",variableType:-4}
 */
var init = (function() {
	var propertiesTable = datasources.db.svy_security.svy_properties.getTable();
	
	// set MAX values based on column length
	MAX_TENANTNAME_LENGTH = propertiesTable.getColumn('tenant_name').getLength();
	MAX_USERNAME_LENGTH = propertiesTable.getColumn('user_name').getLength();
	MAX_NAMESPACE_LENGTH = propertiesTable.getColumn('property_namespace').getLength();
	MAX_TYPE_LENGTH = propertiesTable.getColumn('property_type').getLength();
	MAX_VALUE_LENGTH = propertiesTable.getColumn('property_value').getLength();
	MAX_DISPLAYNAME_LENGTH = propertiesTable.getColumn('display_name').getLength();
	
	initProperty();
})();