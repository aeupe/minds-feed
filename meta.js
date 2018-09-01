const metascraper = require('metascraper'),
	request = require('request')

module.exports = {
	apply: (param, obj, item, callback) => {
		request(item.link, (a,b,c) => {
			const opts = {html: b.body, url: item.link}
			metascraper(opts).then(res => {
				for ( key in param ) {
					const value = param[key]
        	        if ( typeof(value) == 'string' ) {
						obj.obj[key] = res[value]
					} else obj.obj[key] = value(res)
				}
				callback(null, obj)
			})
		})
	}
}
