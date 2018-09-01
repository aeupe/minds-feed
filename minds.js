
const request = require('request')
const jar = request.jar()

function getXSRF(){
	const key = 'XSRF-TOKEN=',
		cookies = jar.getCookieString('https://www.minds.com'),
  		xsrf = cookies.substring(cookies.indexOf(key)+key.length).split(';')[0]
	return xsrf
}

module.exports = {
	login: (credentials, callback) => {
		request({
			method: 'GET',
			url: 'https://www.minds.com',
			jar: jar
		}, (a,b,c) => {
	  		request({
	   			method: 'POST',
   				url: 'https://www.minds.com/api/v1/authenticate',
   				form: credentials,
				headers: {'X-XSRF-TOKEN': getXSRF()},
				jar: jar
	  		}, callback)
		})
	},
	write: (payload, callback) => {
		request({
			method: 'POST',
			url: 'https://www.minds.com/api/v1/newsfeed',
			form: payload,
			headers: {'X-XSRF-TOKEN': getXSRF()},
			jar: jar
		}, callback)
	},
	article: (container, obj) => ({
		access_id: 2,
		attachment_guid: null,
		container_guid: container,
		description: obj.description,
		is_rich: 0,
		mature: 0,
		message: obj.message,
		thumbnail: obj.thumbnail,
		title: obj.title,
		url: obj.url,
		wire_threshold: null
	})
}
