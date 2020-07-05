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
    	'orders': base.getTableByIdIfExists(globalConfig.get('config-Orders-Table')),
    	'customers': base.getTableByIdIfExists(globalConfig.get('config-Customers-Table')),
    	'products': base.getTableByIdIfExists(globalConfig.get('config-Products-Table'))
    }

    if (!tables.orders || !tables.customers || !tables.products) {
        return <div>There was an error, reinstall your block.</div>
    }

    const records = {
    	'orders': useRecords(tables.orders),
    	'customers': useRecords(tables.customers),
    	'products': useRecords(tables.products),
    }

    return <div className="tableSummary">
    	{records.orders && (
        <div className="tableSummaryCol">
    		<Heading>{records.orders.length} </Heading>
    		<div>orders </div>
    	</div>
        )}
        {records.customers && (
    	<div className="tableSummaryCol">
    		<Heading>{records.customers.length} </Heading>
    		<div>customers</div>
    	</div>
        )}
        {records.products && (
    	<div className="tableSummaryCol">
    		<Heading>{records.products.length} </Heading>
    		<div>products</div>
    	</div>
        )}
    </div>
}

export default Summary