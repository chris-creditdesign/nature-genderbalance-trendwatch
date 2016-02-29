function buildParams () {
	var params = {};

	var contentWidth = jQuery("#content").width();

	params.mapScale = 100;
	params.zoomMin = 1;
	params.zoomMax = 8;
	params.ticks = 20;
	params.mapRatio = 0.5;
	params.mapBackground = "#E2EDF3";

	if ( contentWidth < 450 ) {
		params.mapScale = 50;
		params.ticks = 5;
		params.mapRatio = 0.8;
	}

	params.uiColour = {
		veryLightGrey: "#ddd",
		lightGrey: "#999",
		grey: "#666",
		darkGrey: "#333",
		noData: "#ccc",
		lineColour: "#cb181d",
		vaccinationLineColour: "#238b45"	
	};

	params.key = {
		keyRange: [0, 0.1, 0.2, 0.3],
		keyColour: ["#fed976","#fd8d3c","#f03b20","#bd0026"],
		keyHead: "Cases of measles",
	};

	/* Target ids */
	params.mapTarget = "#chart";
	params.keyTarget = "#key";

	/*	Map margin, width and height */
	params.mapMargin = {top: 0, right: 15, bottom: 0, left: 15};
	params.mapWidth = contentWidth  - params.mapMargin.left - params.mapMargin.right;
	params.mapHeight = (contentWidth * params.mapRatio) - params.mapMargin.top - params.mapMargin.bottom;
	params.center = [ params.mapWidth / 2, params.mapHeight / 2];

	/*	barChart margin, width and height */
	params.barChartMargin = {top: 10, right: 10, bottom: 20, left: 70};
	params.barChartWidth = contentWidth - params.barChartMargin.left - params.barChartMargin.right - 30;
	params.barChartHeight = 100;

	params.format = d3.format("0,000");

	params.duration = 100;

	params.colour = d3.scale.linear()
					.range(params.key.keyColour)
					.domain(params.key.keyRange);

	params.projection = d3.geo.mercator()
						.scale(params.mapScale)
						.translate([(params.mapWidth * 0.5), (params.mapHeight * 0.6)]);

	/* params.projection = d3.geo.cylindricalStereographic()
						 .translate([params.mapWidth/2, params.mapWidth/2])
						 .scale([100]); */

	params.path = d3.geo.path()
					.projection(params.projection);

	return params;
}
