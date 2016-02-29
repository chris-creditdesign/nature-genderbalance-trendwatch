BuildWidget.prototype.buildTooltip = function () {
	var self = this;

	function formatPercent(num) {
		if (num === 0) {
			return "Data not available";
		} else {
			var precent = num * 100;
			return Math.round(precent) + "%";
		}
	}

	this.countriesSvg.selectAll("path")
		.on("mouseover", function (d) {			

			if (d.data) {
				var myCountry = d3.select(this);
				myCountry.attr("stroke-width", 0.5);

				var tooltipWidth = parseInt(d3.select("#widget-tooltip").style("padding-left"),10) + parseInt(d3.select("#widget-tooltip").style("width"),10) + parseInt(d3.select("#widget-tooltip").style("padding-right"),10);

				var coordinates = d3.mouse(self.svg[0][0]);

				var top = coordinates[1];
				var left = coordinates[0];

				if ( coordinates[0] > (self.params.mapWidth * 0.75) ) {
					left -= tooltipWidth;
				}

				d3.select("#widget-tooltip")
					.style("top",  top + "px")
					.style("left", left + "px")
					.classed("widget-tooltip-hidden", false);
				
				d3.select("#country").text(d.data.country);
				d3.select("#academy").text(d.data.academy);
				d3.select("#women-members").text( formatPercent(d.data["women-members"]) + " (2013)" );
				d3.select("#women-researchers").text( formatPercent(d.data["women-researchers"]) );
				d3.select("#year-researchers").text(d.data["year-researchers"] === 0 ? "" : "(" + d.data["year-researchers"] + ")");
				d3.select("#women-professors").text( formatPercent(d.data["women-professors"]) );
				d3.select("#year-professors").text(d.data["year-professors"] === 0 ? "" : "(" + d.data["year-professors"] + ")");
			}

		}).on("mouseout", function () {
			d3.select(this).attr("stroke-width", 0);
			self.hideTooltip();
		});
};

BuildWidget.prototype.hideTooltip = function () {
	d3.select("#widget-tooltip").classed("widget-tooltip-hidden", true);
};
