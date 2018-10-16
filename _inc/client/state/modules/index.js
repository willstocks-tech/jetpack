/**
 * Internal dependencies
 */

/* @TODO `export * from '…';` */
import * as reducer from './reducer';
import * as actions from './actions';
import * as selectors from './selectors';

export default { ...reducer, ...actions, ...selectors };
