exports.init = function(config, mergeatron) {
   mergeatron.builds.pop(function(build, done) {
      console.log("Starting build");
      setTimeout(function() {
         console.dir(build);
         done();
      }, 5000);
   });
};
