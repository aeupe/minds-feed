const config = require('./config'),
	minds = require('./minds'),
	feed = require('./feed'),
	request = require('request'),
	str = require('./str'),
	async = require('async')

/*
	Dry run means a single run that
	updates the state without posting
	to Minds.com.
*/
const dry = process.argv.indexOf('-dry') >= 2

log(str.STARTED(dry))
if ( !dry ) {
	log(str.INTERVAL(config.interval))
	setInterval(run, config.interval)
}
run()

function run() {
	log(str.CHECKING)
	const tasks = config.feeds.map(
		task => async.apply(feed.get, task)
	)
	async.parallel(tasks, (err, res) => {
		if ( err ) log(str.ERR)
		else {
			const objs = res.filter(obj=>obj.obj)
			if ( objs.length ) {
				log(str.LOGGING_IN)
				minds.login(config.credentials, () => {
					log(str.LOGGED_IN)
					objs.forEach(obj => {
						log(str.WRITING_TO(obj.task.name))
						const article = minds.article(
							obj.task.container,
							obj.obj
						)
						if ( !dry ) {
							minds.write(
								article,
								() => log(str.WRITTEN_TO(obj.task.name))
							)
						} else log(JSON.stringify(article))
					})
				})
			} else log(str.UP_TO_DATE)
		}
	})
}

function log(s){
	console.log(str.LOG(s))
}
