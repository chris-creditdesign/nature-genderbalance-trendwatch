BuildWidget.prototype.buildTooltip = function () {
	var self = this;

	function formatPercent(num) {
		if (num === 0) {
			return "Not available";
		} else {
			return Math.floor((num * 100)) + "%";
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
				d3.select("#women-members").text( formatPercent(d.data["women-members"]) );
				d3.select("#women-professors").text( formatPercent(d.data["women-professors"]) );
				d3.select("#year").text(d.data.year === 0 ? "Not available" : d.data.year);
			}

		}).on("mouseout", function () {
			d3.select(this).attr("stroke-width", 0);
			self.hideTooltip();
		});
};

BuildWidget.prototype.hideTooltip = function () {
	d3.select("#widget-tooltip").classed("widget-tooltip-hidden", true);
};
