import React, {Component} from 'react';

import {
	Button,
	Text,
	FormField,
	Input,
	Link,
	Heading,
	loadCSSFromString
} from '@airtable/blocks/ui';

import {
	globalConfig,
} from '@airtable/blocks';

import Footer from './Footer'

import askKeyStyles from './AskKey.styles.js';
loadCSSFromString(askKeyStyles)

class AskKey extends Component {

	state = {
		airtableApiKey : ''
	}

	componentDidMount(){
		this.setState({
			'airtableApiKey': globalConfig.get('airtableApiKey') || ''
		})
		this.checkValidState()
	}

	componentDidUpdate() {
		this.checkValidState()
	}

	setInputValue(e) {
		let input = {}
		input[e.target.name] = e.target.value

		this.setState(input)
	}

	checkValidState() {
		let isValid = this.state.airtableApiKey

		if (this.props.validState != isValid) {
			this.props.onValidStepChange(isValid)

			if (isValid) {
				globalConfig.setAsync('airtableApiKey', this.state.airtableApiKey)
			}
		}
	}

	render() {
		return (
			<div>
				<ol className="askKey">
					<li>
						<Heading size="xsmall">Go to your Airtable account </Heading>
						<Text>Click <Link
						    href="https://airtable.com/account"
						    target="_blank">here</Link> to open your Airtable account page
						</Text>
					</li>
					<li>
						<Heading size="xsmall">Copy your API Key</Heading>
						<Text>You can find it under the API section</Text>
					</li>
					<li>
						<Heading size="xsmall">Paste your API Key here</Heading>
					    <Input autoComplete="off" name="airtableApiKey" value={this.state.airtableApiKey} onChange={e => this.setInputValue(e)} />
					    <Text size="small" textColor="light">Note: the API token will be visible to all collaborators.</Text>
					</li>
				</ol>
				<Footer
					footerConfig={this.props.footerConfig}
					onPublishClick={this.props.onPublishClick}
					onNextClick={this.props.onNextClick}
					onPreviousClick={this.props.onPreviousClick}
					validState={this.props.validState}
					/>
			</div>
		)
	}
}

export default AskKey
