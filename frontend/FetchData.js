import {
	base,
	globalConfig
} from '@airtable/blocks';

class FetchData {


	slugify(str) {
		if (str == null) {
			return null
		}

	    str = str.replace(/^\s+|\s+$/g, ''); // trim
	    str = str.toLowerCase();

	    // remove accents, swap ñ for n, etc
	    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
	    var to   = "aaaaeeeeiiiioooouuuunc------";
	    for (var i=0, l=from.length ; i<l ; i++) {
	        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	    }

	    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
	        .replace(/\s+/g, '-') // collapse whitespace and replace by -
	        .replace(/-+/g, '-'); // collapse dashes

	    return str;
	}


	getFieldMapping(tableName, fields) {
		let mapping = {}
		fields.map(function(field){
			let fieldId = globalConfig.get('config-' + tableName + '-' + field.field + '-Field')
			if (fieldId) {

				const table = base.getTableByIdIfExists(globalConfig.get('config-' + tableName + '-Table'))

				if (!table) {
					return
				}

				const tableField = table.getFieldById(fieldId);

				mapping[field.field] = {
					fieldId: fieldId,
					name: tableField.name,
					options: tableField.options
				}
			}
		})

		return mapping
	}

	getAllFieldMapping(config) {
		let mappings = {}
		for (let i = 0; i < config.length; i++) {
			let tableConfig = config[i]
			let mapping = this.getFieldMapping(tableConfig.table, tableConfig.fields)

			mappings[tableConfig.table] = {
				table: globalConfig.get('config-' + tableConfig.table + '-Table'),
				fields: mapping
			}
		}

		return mappings
	}

	async fetchAllRecordsFromTable(tableName, fields) {

		const table = base.getTableByIdIfExists(globalConfig.get('config-' + tableName + '-Table'))

	    const queryResult = table.selectRecords()

	    await queryResult.loadDataAsync()

	    let results = []

	    queryResult.records.map(function(record) {

	    	let row = {}
	    	fields.map(function(field){
	    		let fieldId = globalConfig.get('config-' + tableName + '-' + field.field + '-Field')
	    		if (!fieldId) {
	    			return
	    		}
	    		row['ID'] = record.id

	    		if (field.field == 'Name') {
	    			row['Slug'] = this.slugify(record.getCellValue(fieldId))
	    		}
	    		row[field.field] = record.getCellValue(fieldId)
	    	}.bind(this))

	    	results.push(row)
	    }.bind(this))

	    queryResult.unloadData()

	    return results
	}

	async fetchAll(config) {
		let results = {}
		for (let i = 0; i < config.length; i++) {
			let tableConfig = config[i]

			let data = await this.fetchAllRecordsFromTable(tableConfig.table, tableConfig.fields)

			results[tableConfig.table] = data
		}

		return results
	}
}

export default FetchData