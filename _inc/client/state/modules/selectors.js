/**
 * External dependencies
 */
import get from 'lodash/get';
import includes from 'lodash/includes';

/**
 * Returns true if currently requesting modules lists or false
 * otherwise.
 *
 * @param  {Object}  state  Global state tree
 * @return {Boolean}         Whether modules are being requested
 */
export function isFetchingModulesList( state ) {
	return state.jetpack.modules.requests.fetchingModulesList ? true : false;
}

/**
 * Returns true if we are currently making a request to activate a module
 *
 * @param  {Object}  state  Global state tree
 * @param  {String}  name module name
 * @return {Boolean}         Whether module is being activated
 */
export function isActivatingModule( state, name ) {
	return state.jetpack.modules.requests.activating[ name ] ? true : false;
}

/**
 * Returns true if we are currently making a request to deactivate a module
 *
 * @param  {Object}  state  Global state tree
 * @param  {String}  name module name
 * @return {Boolean}         Whether module is being deactivated
 */
export function isDeactivatingModule( state, name ) {
	return state.jetpack.modules.requests.deactivating[ name ] ? true : false;
}

/**
 * Returns true if we are currently making a request to update a module's option
 *
 * @param  {Object}  state  Global state tree
 * @param  {String}  module_slug slug of the module to check
 * @param  {String}  option_name option key to check if currently updating
 * @return {Boolean}         Whether option is being updated on the module
 */
export function isUpdatingModuleOption( state, module_slug, option_name ) {
	return get( state.jetpack.modules.requests.updatingOption, [ module_slug, option_name ], false );
}

export function getModuleOption( state, module_slug, option_name ) {
	return get( state.jetpack.modules.items, [ module_slug, 'options', option_name, 'current_value' ] );
}

/**
 * Return a list of key & value pairs admitted.
 *
 * @param  {Object}  state   Global state tree.
 * @param  {String}  group   Slug of the set of settings to check.
 * @param  {String}  setting Setting to check for valid values.
 * @return {Array}           The list of key => value pairs.
 */
export function getModuleOptionValidValues( state, group, setting ) {
	return get( state.jetpack.modules.items, [ group, 'options', setting, 'enum_labels' ], false );
}

/**
 * Returns an object with jetpack modules descriptions keyed by module name
 * @param  {Object} state Global state tree
 * @return {Object}       Modules keyed by module name
 */
export function getModules( state ) {
	return state.jetpack.modules.items;
}

/**
 * Returns a module object by its name as present in the state
 * @param  {Object} state Global state tree
 * @param  {String}  name module name
 * @return {Object}       Module description
 */
export function getModule( state, name ) {
	return get( state.jetpack.modules.items, name, {} );
}

/**
 * Returns an array of modules that match a given feature
 *
 * Module features are defined in the module's header comments
 *
 * @param  {Object} state   Global state tree
 * @param  {String} feature Feature to select
 * @return {Array}          Array of modules that match the feature.
 */
export function getModulesByFeature( state, feature ) {
	return Object.keys( state.jetpack.modules.items ).filter( ( name ) =>
		state.jetpack.modules.items[ name ].feature.indexOf( feature ) !== -1
	).map( ( name ) => state.jetpack.modules.items[ name ] );
}

/**
 * Returns an array of modules that require connection.
 *
 * The module's header comments indicates if it requires connection or not.
 *
 * @param  {Object} state   Global state tree
 * @return {Array}          Array of modules that require connection.
 */
export function getModulesThatRequireConnection( state ) {
	return Object.keys( state.jetpack.modules.items ).filter( ( module_slug ) =>
		state.jetpack.modules.items[ module_slug ].requires_connection
	);
}

/**
 * Returns true if the module is activated
 * @param  {Object}  state Global state tree
 * @param  {String}  name  A module's name
 * @return {Boolean}       Weather a module is activated
 */
export function isModuleActivated( state, name ) {
	return get( state.jetpack.modules.items, [ name, 'activated' ], false ) ? true : false;
}

/**
 * Returns true if the module is available.
 * @param  {Object}  state      Global state tree.
 * @param  {String}  moduleSlug The slug of a module.
 * @return {Boolean}            Whether a module is available to be displayed in the dashboard.
 */
export function isModuleAvailable( state, moduleSlug ) {
	return includes( Object.keys( state.jetpack.modules.items ), moduleSlug );
}

/**
 * Returns the module override for a given module slug.
 *
 * Expected values are false if no override, 'active' if module forced on,
 * or 'inactive' if module forced off.
 *
 * @param {Object} state Global state tree
 * @param {String} name  A module's name
 *
 * @return {Boolean|String} Whether the module is overriden, and if so, how.
 */
export function getModuleOverride( state, name ) {
	return get( state.jetpack.modules.items, [ name, 'override' ], false );
}

/**
 * Returns true if the module is forced to be active.
 * @param {Object}   state Global state tree
 * @param {String}   name  A module's name
 * @return {Boolean}       Whether the module is forced to be active.
 */
export function isModuleForcedActive( state, name ) {
	return getModuleOverride( state, name ) === 'active';
}

/**
* Returns true if the module is forced to be inactive.
* @param {Object}   state Global state tree
* @param {String}   name  A module's name
* @return {Boolean}       Whether the module is forced to be inactive.
*/
export function isModuleForcedInactive( state, name ) {
	return getModuleOverride( state, name ) === 'inactive';
}
