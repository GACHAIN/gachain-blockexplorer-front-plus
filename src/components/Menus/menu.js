export default [
	{
		'icon': 'dashboard',
		'FormattedMessage': 'DASHBOARD',
		'to': '/dashboard'
	},
	{
		'icon': 'block',
		'FormattedMessage': 'BLOCK',
		'to': '/block'
	},
	{
		'icon': 'share-alt',
		'FormattedMessage': 'NODE',
		'to': '/node'
	},
    
	{
		'icon': 'file-text',
		'FormattedMessage': 'TRANSACTION',
		'children': [
			{
				'icon': 'file-done',
				'FormattedMessage': 'TRANSACTION',
				'to': '/transaction'
			},
			{
				'icon': 'file-sync',
				'FormattedMessage': 'TRANSACTIONSTATUS',
				'to': '/transaction/transaction_status'
			},
		]
	},
    
	{
		'icon': 'global',
		'FormattedMessage': 'ECOSYSTEM',
		'to': '/ecosystem'
	},
	{
		'icon': 'profile',
		'FormattedMessage': 'SYSTEMPARAM',
		'to': '/system_param'
	},
	// {
	//     "icon": "database",
	//     "FormattedMessage": "DATABASE",
	//     "to": "/database"
	// },
];