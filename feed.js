const request = require('request'),
	config = require('./config'),
	md5 = require('md5'),
	fs = require('fs'),
	async = require('async'),
	Parser = require('rss-parser'),
	parser = new Parser()

module.exports = {
	get: (task, callback) => {
		const state_file = 'state/'  + md5(task.uri)
		parser.parseURL(task.uri, (err, feed) => {
			let obj = {
				task: task,
				obj: null
			}
			if ( err || !feed.items.length ) callback(null, obj)
			else {
				const item = feed.items[0],
					id = task.id(item, md5),
					state_exists = fs.existsSync(state_file),
					state = state_exists ? fs.readFileSync(state_file).toString() : ''
	  	 		if ( !state_exists || !task.exists(state, id) ) {
					if ( !fs.existsSync('state') ) {
						fs.mkdirSync('state');
					}
					fs.writeFileSync(
						state_file,
						task.save_state(state, id)
					)
					obj.obj = {}
					for ( key in task.map ) {
						const value = task.map[key]
						if ( typeof(value) == 'string' ) {
							obj.obj[key] = item[value]
						} else obj.obj[key] = value(item)
					}
					const mod_tasks = Object.keys(config.modules)
						.filter(mod => task[mod])
						.map(mod => async.apply(
							require(config.modules[mod]).apply,
							task[mod], obj, item
						))
					async.series(mod_tasks, ()=>{
						callback(null, obj)
					})
				} else callback(null, obj)
			}
		})
	}
}
