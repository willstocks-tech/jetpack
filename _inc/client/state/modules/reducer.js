/**
 * External dependencies
 */
import { combineReducers } from 'redux';
import assign from 'lodash/assign';

/**
 * Internal dependencies
 */
import {
	JETPACK_SET_INITIAL_STATE,
	JETPACK_MODULES_LIST_FETCH,
	JETPACK_MODULES_LIST_FETCH_FAIL,
	JETPACK_MODULES_LIST_RECEIVE,
	JETPACK_MODULE_ACTIVATE,
	JETPACK_MODULE_ACTIVATE_FAIL,
	JETPACK_MODULE_ACTIVATE_SUCCESS,
	JETPACK_MODULE_DEACTIVATE,
	JETPACK_MODULE_DEACTIVATE_FAIL,
	JETPACK_MODULE_DEACTIVATE_SUCCESS,
	JETPACK_MODULE_UPDATE_OPTIONS,
	JETPACK_MODULE_UPDATE_OPTIONS_FAIL,
	JETPACK_MODULE_UPDATE_OPTIONS_SUCCESS
} from 'state/action-types';

export const items = ( state = {}, action ) => {
	switch ( action.type ) {
		case JETPACK_SET_INITIAL_STATE:
			return assign( {}, action.initialState.getModules );
		case JETPACK_MODULES_LIST_RECEIVE:
			return assign( {}, state, action.modules );
		case JETPACK_MODULE_ACTIVATE_SUCCESS:
			return assign( {}, state, {
				[ action.module ]: assign( {}, state[ action.module ], { activated: true } )
			} );
		case JETPACK_MODULE_DEACTIVATE_SUCCESS:
			return assign( {}, state, {
				[ action.module ]: assign( {}, state[ action.module ], { activated: false } )
			} );
		case JETPACK_MODULE_UPDATE_OPTIONS_SUCCESS:
			const updatedModule = assign( {}, state[ action.module ] );
			Object.keys( action.newOptionValues ).forEach( key => {
				updatedModule.options[ key ].current_value = action.newOptionValues[ key ];
			} );
			return assign( {}, state, {
				[ action.module ]: updatedModule
			} );
		default:
			return state;
	}
};

export const initialRequestsState = {
	fetchingModulesList: false,
	activating: {},
	deactivating: {},
	updatingOption: {}
};

export const requests = ( state = initialRequestsState, action ) => {
	switch ( action.type ) {
		case JETPACK_MODULES_LIST_FETCH:
			return assign( {}, state, { fetchingModulesList: true } );
		case JETPACK_MODULES_LIST_FETCH_FAIL:
		case JETPACK_MODULES_LIST_RECEIVE:
			return assign( {}, state, { fetchingModulesList: false } );
		case JETPACK_MODULE_ACTIVATE:
			return assign( {}, state, {
				activating: assign( {}, state.activating, {
					[ action.module ]: true
				}
			) } );
		case JETPACK_MODULE_ACTIVATE_FAIL:
		case JETPACK_MODULE_ACTIVATE_SUCCESS:
			return assign( {}, state, {
				activating: assign( {}, state.activating, {
					[ action.module ]: false
				}
			) } );
		case JETPACK_MODULE_DEACTIVATE:
			return assign( {}, state, {
				deactivating: assign( {}, state.deactivating, {
					[ action.module ]: true
				}
			) } );
		case JETPACK_MODULE_DEACTIVATE_FAIL:
		case JETPACK_MODULE_DEACTIVATE_SUCCESS:
			return assign( {}, state, {
				deactivating: assign( {}, state.deactivating, {
					[ action.module ]: false
				}
			) } );
		case JETPACK_MODULE_UPDATE_OPTIONS:
			const updatingOption = assign( {}, state.updatingOption );
			updatingOption[ action.module ] = assign( {}, updatingOption[ action.module ] );
			Object.keys( action.newOptionValues ).forEach( ( key ) => {
				updatingOption[ action.module ][ key ] = true;
			} );
			return assign( {}, state, {
				updatingOption: assign( {}, state.updatingOption, updatingOption
			) } );
		case JETPACK_MODULE_UPDATE_OPTIONS_FAIL:
		case JETPACK_MODULE_UPDATE_OPTIONS_SUCCESS:
			const _updatingOption = assign( {}, state.updatingOption );
			_updatingOption[ action.module ] = assign( {}, _updatingOption[ action.module ] );
			Object.keys( action.newOptionValues ).forEach( ( key ) => {
				_updatingOption[ action.module ][ key ] = false;
			} );
			return assign( {}, state, {
				updatingOption: assign( {}, state.updatingOption, _updatingOption
			) } );
		default:
			return state;
	}
};

export const reducer = combineReducers( {
	items,
	requests
} );
