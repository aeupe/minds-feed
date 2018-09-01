const ogs = require('open-graph-scraper'),
	request = require('request')

module.exports = {
	apply: (param, obj, item, callback) => {
		request(item.link, (a,b,c) => {
			const opts = {html: b.body}
			ogs(opts).then(res => {
				for ( key in param ) {
					const value = param[key]
					if ( typeof(value) == 'string' ) {
						obj.obj[key] = res.data[value]
					} else obj.obj[key] = value(res.data)
				}
				callback(null, obj)
			})
		})
	}
}
