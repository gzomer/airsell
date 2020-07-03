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

class Stripe extends Component {

	state = {
		stripeApiKey : ''
	}

	componentDidMount(){
		this.setState({
			'stripePublicKey': globalConfig.get('stripePublicKey') || '',
			'stripeSecretKey': globalConfig.get('stripeSecretKey') || ''
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
		let isValid = this.state.stripePublicKey && this.state.stripeSecretKey

		if (this.props.validState != isValid) {
			this.props.onValidStepChange(isValid)

			if (isValid) {
				globalConfig.setAsync('stripePublicKey', this.state.stripePublicKey)
				globalConfig.setAsync('stripeSecretKey', this.state.stripeSecretKey)
			}
		}
	}

	render() {
		return (
			<div>
				<ol>
					<li>
						<Heading size="xsmall">Go to your Stripe dashboard </Heading>
						<Text>Click <Link
						    href="https://dashboard.stripe.com/dashboard"
						    target="_blank">here</Link> to open your Stripe dashboard page. You can register if you don't have an account yet.
						</Text>
					</li>
					<li>
						<Heading size="xsmall">Copy your API Keys</Heading>
						<Text>You can find it under the Get your API keys section</Text>
					</li>
					<li>
						<Heading size="xsmall">Paste your Publishable key here</Heading>
					    <Input name="stripePublicKey" value={this.state.stripePublicKey} onChange={e => this.setInputValue(e)} />
					    <Text size="small" textColor="light">Note: the API key will be visible to all collaborators.</Text>
					</li>
					<li>
						<Heading size="xsmall">Paste your Secret key here</Heading>
					    <Input name="stripeSecretKey" value={this.state.stripeSecretKey} onChange={e => this.setInputValue(e)} />
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

export default Stripe