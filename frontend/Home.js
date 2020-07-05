import React, {Component} from 'react';

import {
	Button,
	Text,
	Link,
	loadCSSFromString
} from '@airtable/blocks/ui';

import {
	globalConfig
} from '@airtable/blocks';

import homeStyles from './Home.styles.js';
loadCSSFromString(homeStyles)

import Summary from './Summary'

class Footer extends Component {

	render() {
		return (
			<div className="footer">
				<Button disabled={!this.props.canEdit} className="prevButton" onClick={this.props.onNextClick}> Edit </Button>
				<Button
						disabled={!this.props.validState || this.props.publishing || !this.props.canEdit}
						className="publishButton"
						variant="primary"
						onClick={this.props.onPublishClick}>
							{this.props.publishing && 'Publishing...'}
							{!this.props.publishing && 'Publish'}
					</Button>
			</div>
		)
	}
}

class Home extends Component {

	state = {
		canEdit : false
	}

	componentDidMount(){
		const permissionGlobalConfig = globalConfig.checkPermissionsForSet()
		this.checkValidState()
		this.setState({
			'canEdit' : permissionGlobalConfig.hasPermission,
			'name': globalConfig.get('ecommerceName') || '',
			'description': globalConfig.get('ecommerceDescription') || '',
			'domain': globalConfig.get('ecommerceDomain') || '',
			'theme': globalConfig.get('ecommerceTheme') || ''
		})
	}

	componentDidUpdate(){
		this.checkValidState()
	}

	checkValidState() {
		if (!this.props.validState) {
			this.props.onValidStepChange(true)
		}
	}

	render() {
		return (
			<div>
				<Summary />
				<div className="linkWrapper">
					<Link
					    href={'https://'+this.state.domain + ".airsell.me"}
					    target="_blank"
					  >
					    {'https://'+this.state.domain + ".airsell.me"}
					  </Link>
				</div>
				<div className="infoChange">
					<Text textColor="light" alignContent="center">Don't forget to click Publish when you finish editing</Text>
				</div>
				<Footer
					canEdit={this.state.canEdit}
					footerConfig={this.props.footerConfig}
					publishing={this.props.publishing}
					onPublishClick={this.props.onPublishClick}
					onNextClick={this.props.onNextClick}
					validState={this.props.validState}
					/>
			</div>
		)
	}
}

export default Home
