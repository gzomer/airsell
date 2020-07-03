import {
	useBase,
	useRecords,
	Heading,
	loadCSSFromString
} from '@airtable/blocks/ui';

import {
	globalConfig
} from '@airtable/blocks';


import React from 'react';

import summaryStyles from './Summary.styles.js';
loadCSSFromString(summaryStyles)

function Summary() {
    const base = useBase()

    const tables = {
    	'orders': base.getTableById(globalConfig.get('config-Orders-Table')),
    	'customers': base.getTableById(globalConfig.get('config-Customers-Table')),
    	'customers': base.getTableById(globalConfig.get('config-Products-Table'))
    }

    const records = {
    	'orders': useRecords(tables.orders),
    	'customers': useRecords(tables.customers),
    	'products': useRecords(tables.customers),
    }

    return <div className="tableSummary">
    	<div className="tableSummaryCol">
    		<Heading>{records.orders.length} </Heading>
    		<div>orders </div>
    	</div>
    	<div className="tableSummaryCol">
    		<Heading>{records.customers.length} </Heading>
    		<div>customers</div>
    	</div>
    	<div className="tableSummaryCol">
    		<Heading>{records.products.length} </Heading>
    		<div>products</div>
    	</div>
    </div>
}

export default Summary