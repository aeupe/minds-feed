module.exports = {
	STARTED: dry => `Started${dry ? ' (dry)' : ''}.`,
	INTERVAL: interval => `Interval: ${interval/1000} seconds.`,
	LOGGING_IN: 'Logging in...',
	LOGGED_IN: 'Logged in',
	CHECKING: 'Checking for new content...',
	UP_TO_DATE: 'Up to date.',
	NEW_CONTENT: name => `New content was found in "${name}".`,
	WRITING_TO: name => `Writing to "${name}"...`,
	WRITTEN_TO: name => `Written to "${name}".`,
	NOTHING_NEW: name => `Nothing new in "${name}".`,
	ERR: 'Error.',
	LOG: s => `${new Date()} :: ${s}`
}
