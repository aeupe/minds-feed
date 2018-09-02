const config = require('./config'),
	request = require('request'),
	jar = request.jar()

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
	article: (container, obj) => Object.assign(
		{"container_guid": container}, config.def_article, obj
	)
}
