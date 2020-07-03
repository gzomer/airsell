import React, {Component} from 'react';

import {
	Button,
	FormField,
	Input,
	Label,
	Text,
	loadCSSFromString
} from '@airtable/blocks/ui';

import {
	globalConfig
} from '@airtable/blocks';

import Footer from './Footer'
import styles from './Ecommerce.styles.js';

loadCSSFromString(styles)

const THEMES = [
	{
		name : 'Litera'
	},
	{
		name : 'Lumen'
	},
	{
		name : 'Minty'
	},
	{
		name : 'Materia'
	},
	{
		name : 'Pulse'
	},
	{
		name : 'Sandstone'
	},
	{
		name : 'Simplex'
	},
	{
		name : 'Solar'
	},
	{
		name : 'United'
	},
	{
		name : 'Superhero'
	},
	{
		name : 'Yeti'
	},
	{
		name : 'Cerulean'
	},
	{
		name : 'Cosmo'
	},
	{
		name : 'Flatly'
	},
	{
		name : 'Journal'
	}
]

class Theme extends Component {

	render() {
		return (
			<div className="themeCard">
				<div className={'themeCardInner ' + (this.props.theme.active?'active':'')} onClick={(e) => this.props.onSelectTheme(this.props.theme)}>
					{this.props.theme.name && <img src={'https://bootswatch.com/' + this.props.theme.name.toLowerCase() + '/thumbnail.png'}/>}
					<span>{this.props.theme.name}</span>
				</div>
			</div>
		)
	}
}

class ThemeSelector extends Component {
	render() {

		let View = THEMES.map(item => {
			let theme = item
			if (this.props.theme && this.props.theme.name == item.name) {
				theme = {...item, active: true}
			}

			return <Theme key={theme.name} theme={theme} onSelectTheme={this.props.onSelectTheme}/>
		})

		return (<div className="themeWrapper">{View}</div>)
	}
}

class Ecommerce extends Component {

	state = {
		name: '',
		description: '',
		domain: '',
		theme: '',
		'homeTitle': '',
		'homeDescription': '',
		'facebook': '',
		'instagram': '',
	}

	componentDidMount() {
		this.setState({
			'name': globalConfig.get('ecommerceName') || '',
			'description': globalConfig.get('ecommerceDescription') || '',
			'domain': globalConfig.get('ecommerceDomain') || '',
			'theme': globalConfig.get('ecommerceTheme') || '',
			'homeTitle': globalConfig.get('ecommerceHomeTitle') || '',
			'homeDescription': globalConfig.get('ecommerceHomeDescription') || '',
			'facebook': globalConfig.get('ecommerceFacebook') || '',
			'instagram': globalConfig.get('ecommerceInstagram') || '',
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

	onSelectTheme(theme) {
		this.setState({
			theme: theme
		})
	}

	checkValidState() {
		let isValid = this.state.name &&
					  this.state.description &&
					  this.state.domain &&
					  this.state.theme

		if (this.props.validState != isValid) {
			this.props.onValidStepChange(isValid)
		}

		if (isValid) {
			globalConfig.setAsync('ecommerceName', this.state.name)
			globalConfig.setAsync('ecommerceDescription', this.state.description)
			globalConfig.setAsync('ecommerceDomain', this.state.domain)
			globalConfig.setAsync('ecommerceTheme', this.state.theme)
			globalConfig.setAsync('ecommerceHomeTitle', this.state.homeTitle)
			globalConfig.setAsync('ecommerceHomeDescription', this.state.homeDescription)
			globalConfig.setAsync('ecommerceFacebook', this.state.facebook)
			globalConfig.setAsync('ecommerceInstagram', this.state.instagram)
		}
	}

	render() {
		return (
			<div>
				<FormField label="Ecommerce Name">
			      <Input name="name" value={this.state.name} onChange={e => this.setInputValue(e)} />
			    </FormField>
			    <FormField label="Ecommerce Description">
			      <Input name="description" value={this.state.description} onChange={e => this.setInputValue(e)} />
			    </FormField>
			    <FormField label="Domain">
			      <Input name="domain" value={this.state.domain} onChange={e => this.setInputValue(e)} />
			    </FormField>
			    {this.state.domain && <div className="domainText">
			    	<Text>{this.state.domain}.airsell.me</Text>
			    </div>}

			    <Label>Theme</Label>
			    <ThemeSelector theme={this.state.theme} onSelectTheme={this.onSelectTheme.bind(this)}/>

				<FormField label="Home page Title">
			      <Input name="homeTitle" value={this.state.homeTitle} onChange={e => this.setInputValue(e)} />
			    </FormField>
			    <FormField label="Home page Description">
			      <Input name="homeDescription" value={this.state.homeDescription} onChange={e => this.setInputValue(e)} />
			    </FormField>

			    <FormField label="Facebook Page">
			      <Input name="facebook" value={this.state.facebook} onChange={e => this.setInputValue(e)} />
			    </FormField>
			    <FormField label="Instagram">
			      <Input name="instagram" value={this.state.instagram} onChange={e => this.setInputValue(e)} />
			    </FormField>

				<Footer
					footerConfig={this.props.footerConfig}
					publishing={this.props.publishing}
					onPublishClick={this.props.onPublishClick}
					onNextClick={this.props.onNextClick}
					onPreviousClick={this.props.onPreviousClick}
					validState={this.props.validState}
					/>

			</div>
		)
	}
}

export default Ecommerce
