var config = require('./config').config,
   Queue = require('./lib/queue'),
	//mongo = require('mongojs').connect(config.mongo, ['builds']),
	//fs = require('fs'),
	events = require('events');

var Mergeatron = function(mongo) {
	this.mongo = mongo;
   this.builds = new Queue();
   this.completedBuild = new Queue();
};

Mergeatron.prototype = new events.EventEmitter;
mergeatron = new Mergeatron();

config.plugin_dirs.forEach(function(dir) {
	fs.readdir(dir, function(err, files) {
		if (err) {
			console.log(err);
			return;
		}

		for (var i = 0, l = files.length; i < l; i++) {
			var filename = dir + files[i],
				pluginName = files[i].split('.', 2)[0],
				conf = { enabled: true };

			if (!filename.match(/\.js$/)) {
				break;
			}

			console.log('Loading plugin: ' + pluginName);

			if (config.plugins && config.plugins[pluginName]) {
				conf = config.plugins[pluginName];
			}

			if (conf.enabled == undefined || conf.enabled) {
				require(filename).init(conf, mergeatron);
			} else {
				console.log('Not loading disabled plugin ' + pluginName);
			}
		}
	});
});
