(function() {
	var init = function($)	{
		/*	Load D3 */
		var countriesURL = "http://www.nature.com/widget_assets_polopoly/v518n7538/countries.json";
		var d3URL = "http://www.nature.com/widget_assets_polopoly/v518n7538/d3.v3.min.js";
		var topojsonURL = "http://www.nature.com/widget_assets_polopoly/v518n7538/topojson.v1.min.js";

		
		$.getScript("http://www.nature.com/polopoly_static/js/d3.v3.min.js", function() {
			console.log(d3);
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