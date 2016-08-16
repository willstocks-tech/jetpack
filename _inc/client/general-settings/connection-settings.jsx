/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { translate as __ } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { isCurrentUserLinked, isDevMode } from 'state/connection';
import {
	userCanDisconnectSite as _userCanDisconnectSite,
	userIsMaster as _userIsMaster,
	getUserWpComLogin as _getUserWpComLogin,
	getUserWpComEmail as _getUserWpComEmail,
	getUsername as _getUsername
} from 'state/initial-state';
import QueryUserConnectionData from 'components/data/query-user-connection';
import ConnectButton from 'components/connect-button';

const ConnectionSettings = React.createClass( {
	renderContent: function() {
		const maybeShowDisconnectBtn = this.props.userCanDisconnectSite
			? <ConnectButton />
			: null;

		const maybeShowLinkUnlinkBtn = this.props.userIsMaster
			? null
			: <ConnectButton connectUser={ true } />;

		return isDevMode( this.props ) ?
			(
				<div>
					{
						__( 'The site is in Development Mode, so you can not connect to WordPress.com.' )
					}
				</div>
			)	:
			<div>
				<div className="jp-connection-settings">
					<div className="gravatar-goes-here jp-connection-settings__gravatar"></div>
					<div className="jp-connection-settings__headline">{ __( 'You are connected as ' ) }<span className="jp-connection-settings__username">{ this.props.userWpComLogin }</span></div>
					<div className="jp-connection-settings__email">{ this.props.userWpComEmail }</div>
					<div className="jp-connection-settings__actions">
						{ maybeShowDisconnectBtn }
						{ maybeShowLinkUnlinkBtn }
					</div>
				</div>

				<div className="jp-connection-settings">
					<div className="jp-connection-settings__headline">{ __( 'Link your account to WordPress.com to get the most out of Jetpack.' ) }</div>
					<div className="jp-connection-settings__actions">
						{ maybeShowDisconnectBtn }
						{ maybeShowLinkUnlinkBtn }
					</div>
				</div>

				<br />
				{
					this.props.isLinked( this.props ) ?
						__( 'You are linked to WordPress.com account %(userLogin)s / %(userEmail)s.', {
							args: {
								userLogin: this.props.userWpComLogin,
								userEmail: this.props.userWpComEmail
							}
						} ) :
						__( 'You, %(userName)s, are not connected to WordPress.com.', {
							args: {
								userName: this.props.username
							}
						} )
				}
			</div>
			;
	},

	render() {
		return(
			<div>
				{ this.renderContent() }
				<QueryUserConnectionData />
			</div>
		)
	}
} );

export default connect(
	( state ) => {
		return {
			userCanDisconnectSite: _userCanDisconnectSite( state ),
			userIsMaster: _userIsMaster( state ),
			userWpComLogin: _getUserWpComLogin( state ),
			userWpComEmail: _getUserWpComEmail( state ),
			username: _getUsername( state ),
			isLinked: () => isCurrentUserLinked( state )
		}
	}
)( ConnectionSettings );
