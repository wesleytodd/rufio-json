// Requirements
var path = require('path');

module.exports = function(rufio) {

	rufio.config.validate('types', function(val, done) {
		// Check that each type has a json permalink structure
		for (var i in val) {
			if (typeof val[i].jsonPermalink !== 'string') {
				done('The json plugin requires each type to define a json permalink structure. ' + i + ' does not have one defined.');
				return;
			}
		}
		// No errors
		done();
	});

	rufio.hooks.on('afterWriteItem', function(item, done) {
		// Check environmant to see if we should write this data type
		if (this.config.get('ENVIRONMENT') == 'dev' || item.meta('status') == 'Published') {

			// The file we are going to write
			var permalink = this.filters.apply('template', item.type.config.jsonPermalink, item.export());
			var writePath = path.join(this.config.get('BUILD_DIR'), permalink);

			// Export the item
			var me = item.export();

			// Export plain date by format
			if (me.meta.date) {
				me.meta.date = me.meta.date.format(rufio.config.get('dateFormat'));
			}

			// Parse template and write to file
			this.util.writeFile(writePath, this.filters.apply('json', me), function(err) {
				// Exit on error
				if (err) {
					this.logger.error('Error writing json file: ' + writePath);
					return done(err);
				}

				// All good...
				done();

			}.bind(this));

		} else {
			// Dont write
			done();
		}
	});

};
