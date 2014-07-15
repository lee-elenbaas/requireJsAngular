(function (define, require) {
	function generateRequireDependancies(initialDependancies, angularDependancies) {
		var requireDependancies = initialDependancies.concate();

		angularDependancies.forEach(function (lib) {
			switch (lib) {
				case 'auto':
				case 'ng':
					// angular defined modules - no need for more dependencies
					break;
				default:
					requireDependancies.push(lib);
					break;
			}
		});

		return requireDependancies;
	}

	function angularModule(dependancies, factory) {
		var requireDependancies = generateRequireDependancies(
				[
					'module',
					'angular'
				],
				dependancies
			);

		define(requireDependancies, function (amdModule, angular) {
			var angularModule = angular.module(amdModule.id, dependancies);

			factory(angularModule);

			return angularModule;
		});
	}

	//define.angularSpec = angularSpec;
	define.angular = angularModule;

	// Read app name from the script tag like in https://stackoverflow.com/questions/11674824/how-to-use-requirejs-build-profile-r-js-in-a-multi-page-project
	// Script tag format to be used: <script src="require.js" data-main="config.js" data-app="app"></script>
	require(['require', 'jquery'], function (require) {
		var $ = require('jquery');

		var appName = $('script[data-main][data-app]').attr('data-app');
		var testName = $('script[data-main][data-spec]').attr('data-spec');

		if (appName && testName) {
			throw new Error("Attempt to run both angular app and jasmine spec");
		}

		if (!appName && !testName) {
			throw new Error("Missing what to run angular app or jasmine spec");
		}

		if (appName) {
			require(['angular', appName], function (angular) {
				angular.bootstrap(document, [appName]); // bootstrap the angular app on the entire document
			});
		}

		if (testName) {
			require(['jquery', testName], function ($) {
				$('.alert').empty();

				var env = jasmine.getEnv();

				env.execute();
			});
		}
	});
}(define, require));
