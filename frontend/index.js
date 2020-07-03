import {
	initializeBlock,
	Heading
} from '@airtable/blocks/ui';

import {
	globalConfig
} from '@airtable/blocks';

import React, {Component} from 'react';

import Wizard from './Wizard'

const tableConfigs = [
	{
		"title" : "Configuring your Ecommerce",
		"type": "ecommerce",
	},
	{
		"type": "table",
		"title" : "Configure Products table",
		"subtitle" : "Put your products attributes (size, color, etc) in the attributes' fields",
		"table" : "Products",
		"fields" : [
			{ "field": "Name" },
			{ "field": "Description" },
			{ "field": "Images" },
			{ "field": "Price" },
			{ "field": "Category" },
			{ "field": "Attribute1", "optional":true, description:"Configure all attributes' fields as multiple selects"},
			{ "field": "Attribute2", "optional":true},
			{ "field": "Attribute3", "optional":true},
			{ "field": "Attribute4", "optional":true},
			{ "field": "Attribute5", "optional":true},
		]
	},
	{
		"type": "table",
		"title" : "Configure Customers table",
		"subtitle" : "",
		"table" : "Customers",
		"fields" : [
			{ "field": "Name" },
			{ "field": "Email" },
		]
	},
	{
		"type": "table",
		"title" : "Configure Orders table",
		"subtitle" : "",
		"table" : "Orders",
		"fields" : [
			{ "field": "Order ID" , description:"It should be a auto-number field"},
			{ "field": "Customer" },
			{ "field": "Price", description:"It should be a currency field"},
			{ "field": "City" },
			{ "field": "Country" },
			{ "field": "Address Line1" },
			{ "field": "Address Line2" },
			{ "field": "Postal Code" },
		]
	},
	{
		"type": "table",
		"title" : "Configure Order Products table",
		"subtitle" : "Put your products attributes (size, color, etc) in the attributes' fields",
		"table" : "Order Products",
		"fields" : [
			{ "field": "Order" },
			{ "field": "Product" },
			{ "field": "Quantity" },
			{ "field": "Price" },
			{ "field": "Attribute1", "optional":true, description:"All attributes fields should match the same values from the Products table"},
			{ "field": "Attribute2", "optional":true},
			{ "field": "Attribute3", "optional":true},
			{ "field": "Attribute4", "optional":true},
			{ "field": "Attribute5", "optional":true},
		]
	},
	{
		"type" : "stripe",
		"title" : "Stripe API Key",
		"subtitle" : "We need your Stripe API Keys to allow customers to purchase your products"
	},
	{
		"type" : "apikey",
		"title" : "Airtable API Key",
		"subtitle" : "We need your API Key to allow customers to send orders"
	}
]

const wizardConfigIntro = {
	"steps" : [
		{
			"title" : "Let's create your Ecommerce",
			"type": "intro",
		},
		...tableConfigs,
		{
			"type": "publish",
			"title" : "Review and Publish",
			"subtitle" : ""
		}
	]
}

const wizardConfigHome = {
	"steps" : [
		{
			"title" : "Welcome",
			"type": "home",
		},
		...tableConfigs
	]
}

class App extends Component {

	state = {
		wizardConfig : wizardConfigIntro
	}

	componentDidMount() {
		//globalConfig.setAsync('ecommercePublished', false)
		this.updateWizard()
	}

	updateWizard() {
		if (globalConfig.get('ecommercePublished')) {
			let newConfig = {...wizardConfigHome}
			newConfig.steps[0].title = 'Welcome, ' + globalConfig.get('ecommerceName')

			this.setState({
				'wizardConfig': newConfig
			})
		} else {
			this.setState({
				'wizardConfig': wizardConfigIntro
			})
		}
	}

	onFinishPublishing() {
		this.updateWizard()
	}

	render() {
		return <Wizard onFinishPublishing={this.onFinishPublishing.bind(this)} config={this.state.wizardConfig} />
	}
}

initializeBlock(() => <App/>);
