import React, {Component} from 'react';

import {
	Button,
} from '@airtable/blocks/ui';

import {
	globalConfig
} from '@airtable/blocks';

import Footer from './Footer'

class Intro extends Component {


	componentDidMount(){
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
				<p>It's super easy to create your ecommerce website.</p>
				<p>
					You will need four different tables in your base, namely:
				</p>
				<ul>
					<li>Products</li>
					<li>Customers</li>
					<li>Orders</li>
					<li>Order Products</li>
				</ul>
				<p>Just click <b>Next</b> and we will guide you through the configuration of each table.</p>
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

export default Intro
