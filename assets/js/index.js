(function() {
	var init = function($)	{
		/*	Load D3 */
		// var countriesURL = "http://www.nature.com/widget_assets_polopoly/v518n7538/countries.json";
		var countriesURL = "data/countries.json";
		// var d3URL = "http://www.nature.com/widget_assets_polopoly/v518n7538/d3.v3.min.js";
		var d3URL = "data/d3.v3.min.js";
		// var topojsonURL = "http://www.nature.com/widget_assets_polopoly/v518n7538/topojson.v1.min.js";
		var topojsonURL = "data/topojson.v1.min.js";

		$.when( $.getScript(d3URL), $.getScript(topojsonURL))
			.then(function () {
				var worldData;
				var width = $(window).width();

				d3.json(countriesURL, function (error, world) {
					if (error) {
						$(".widget-error-message").css("display", "block");
						console.log(error);
					} else {
						worldData = world;
						buildGraphic();
					}
				});

				function buildGraphic() {
					$(".outerwrapper").css("display","block");

					var features = topojson.feature(worldData, worldData.objects.units).features;
					var params = buildParams();

					for (var i = 0; i < features.length; i++) {

						for (var j = 0; j < data.length; j++) {
							if (data[j].code === features[i].id) {
								features[i].data = data[j];
								// need to work out what to do with Switzerland
							}
						}
					}

					var map = new BuildWidget(params, features, worldData);

					/*	Call functions to bulid the map */
					map.buildMap();
					map.buildKey();
					map.buildTooltip();

					$( window ).resize(function() {
						if($(window).width() != width){ 
							width = $(window).width();
							didResize = true;

							/* Throttle the resize */
							setTimeout(function () {
								if (didResize) {
									map.destroyMap();
									map.params = buildParams();
									map.buildMap();
									map.buildTooltip();
									
									didResize = false;
								}
							}, 60);

						}
					});
				}

			}, function () {
				$(".widget-error-message").css("display","block");
		});
	};

	setTimeout(function() {
		if (typeof jQuery !== 'undefined'){
			init(jQuery);
		} else {
			setTimeout(arguments.callee, 60);
		}
	}, 60);
})();