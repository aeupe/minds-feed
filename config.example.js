const safename = require('safename')
	def_message = item => {
		let msg = ''
		if ( item.categories ) {
			item.categories.forEach(cat => {
				if ( msg.length ) msg += ' '
				msg += '#' + safename(cat.toLowerCase())
			})
		}
		return msg
	},
	def_id = (item, hash) => hash(item.link),
	def_exists = (state, id) => state == id,
	def_save_state = (state, id) => id

module.exports =  {
	"interval": 5 * 60 * 1000,	// In milliseconds
	"credentials": {
		"username": "",
		"password": ""
	},
	"modules": {
		"meta": "./meta"
	},
	"feeds": [
		{
			"name": "BBC News - US & Canada",
			"uri": "https://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml",
			"container": "569573984593522688",
				// https://www.minds.com/groups/profile/569573984593522688
			"id": def_id,
			"map": {
				"title": "title",
				"description": "content",
				"url": "link",
				"message": def_message
			},
			"meta": {
				"thumbnail": "image"
			},
			"exists": def_exists,
			"save_state": def_save_state
		}
	]
}