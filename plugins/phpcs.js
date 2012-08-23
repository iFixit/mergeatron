var request = require('request');

exports.init = function(config, mergeatron) {
	mergeatron.on('artifact_found', function (build, job, artifact) {
		if (artifact['fileName'] == config.artifact) {
			processJsLint(build, job, artifact['url']);
		}
	});

	function processJsLint(build, job, artifact_url) {
		request({ url: artifact_url }, function(err, response) {
			if (err) {
				console.log(err);
				return;
			}

			// parse response.body
		});
	}
};