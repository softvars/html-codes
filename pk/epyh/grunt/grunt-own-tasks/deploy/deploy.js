/**
 * Created by CON817 on 15/06/2015.
 */

'use strict';

module.exports = function (grunt) {
    var deployOptions = {
        debug: grunt.option('dev'),
        staging: grunt.option('stage'),
        production: grunt.option('pro')
    };

    var addDeployTask = function (tasks, target) {

        if (target.length > 0) {
            if (target.indexOf('android') > -1 || target.indexOf('ios') > -1) {
                targets.push('copy' + ':' + target);
            } else {
                grunt.log.warn('Invalid target. The generated dist won\'t be copied in the final destination');
            }
        } else {
            grunt.log.warn('Missing target. The generated dist won\'t be copied in the final destination');
        }

        return tasks;
    };

    grunt.registerTask('deploy', function () {

        var tasks = [];

        if (deployOptions.debug) {

            tasks.push('dist-debug');

            tasks = addDeployTask(tasks, deployOptions.debug);
        } else if (deployOptions.staging) {
            tasks.push('dist');

            tasks = addDeployTask(tasks, deployOptions.staging);
        } else if (deployOptions.production) {
            tasks.push('dist');

            tasks = addDeployTask(tasks, deployOptions.production);

            tasks.push('copy' + ':www_dist');
        } else {
            grunt.fail.fatal('One of those parameters must be specified: "--dev, --stage, --pro".');
        }

        grunt.task.run(tasks);
    });
};
