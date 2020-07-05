import React, {Component} from 'react';

import {
	Button,
	Text,

	loadCSSFromString
} from '@airtable/blocks/ui';


import {
	globalConfig,
} from '@airtable/blocks'

import footerStyles from './Footer.styles.js';
loadCSSFromString(footerStyles)

class Footer extends Component {

	state = {
		publishVisible: false,
		canEdit: null,
		cannotEditMessage: ''
	}

	componentDidMount() {
		this.checkPermission()
		if (globalConfig.get('ecommercePublished')) {
			this.setState({
				'publishVisible' : true
			})
		}
	}

	componentDidUpdate() {
		this.checkPermission()
	}

	checkPermission() {
		const permissionGlobalConfig = globalConfig.checkPermissionsForSet()
		if (this.state && this.state.canEdit != permissionGlobalConfig.hasPermission) {
			this.setState({
				canEdit: permissionGlobalConfig.hasPermission,
				cannotEditMessage: permissionGlobalConfig.reasonDisplayString
			})
		}
	}

	render() {
		return (
			<div className="footer">
				{this.state && this.state.canEdit && <div>
					{this.props.footerConfig.previous && <Button className="prevButton" onClick={this.props.onPreviousClick}> Previous </Button>}
					{this.state.publishVisible && <Button
														disabled={!this.props.validState || this.props.publishing}
														className="publishButton"
														variant="primary"
														onClick={this.props.onPublishClick}>
															{this.props.publishing && 'Publishing...'}
															{!this.props.publishing && 'Publish'}
													</Button>}
					{this.props.footerConfig.next && <Button disabled={!this.props.validState || !this.state.canEdit} className="nextButton" onClick={this.props.onNextClick}> Next </Button>}
				</div>
				}
				{this.state && !this.state.canEdit && (<div className="no-permission"><Text>{this.state.cannotEditMessage}</Text></div>)}
			</div>
		)
	}
}

export default Footer