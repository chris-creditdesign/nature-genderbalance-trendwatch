(function() {
	var init = function($)	{
		/*	Load D3 */
		var countriesURL = "//www.nature.com/widget_assets_polopoly/v518n7538/countries.json";
		var d3URL = "//www.nature.com/widget_assets_polopoly/v518n7538/d3.v3.min.js";
		var topojsonURL = "//www.nature.com/widget_assets_polopoly/v518n7538/topojson.v1.min.js";
		
		/* Testing urls */
		/* var countriesURL = "data/countries.json";
		var d3URL = "data/d3.v3.min.js";
		var topojsonURL = "data/topojson.v1.min.js"; */

		var gallUrl = "data/d3.geo.projection.v0.min.js";

		$.when( $.getScript(d3URL), $.getScript(topojsonURL))
			.then(function () {
				var worldData;
				var width = $(window).width();
				var didResize;

				d3.json(countriesURL, function (error, world) {
					if (error) {
						$(".widget-error-message").css("display", "block");
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
							}
						}
					}

					var map = new BuildWidget(params, features, worldData);

					/*	Call functions to bulid the map */
					map.buildMap();
					map.buildKey();
					map.buildTooltip();

					if ( $("#content").width() >= 350 ) {
						map.buildZoom();
					}

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

									if ( $("#content").width() >= 350 ) {
										map.buildZoom();
									}
									
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