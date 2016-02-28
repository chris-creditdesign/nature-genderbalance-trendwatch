BuildWidget.prototype.buildMap = function() {
	var self = this;

	this.svg = d3.select(this.params.mapTarget).append("svg")
					.attr("width", this.params.mapWidth)
					.attr("height", this.params.mapHeight);

	this.svgBG = this.svg.append("rect")
						.attr("x", 0)
						.attr("y", 0)
						.attr("width", this.params.mapWidth)
						.attr("height", this.params.mapHeight)
						.attr("fill", this.params.mapBackground);
				  
	this.defs = this.svg.append("defs").append("svg:clipPath")
					.attr("id", "clip")
				  .append("svg:rect")
					.attr("x", 0)
					.attr("y", 0)
					.attr("width", this.params.mapWidth)
					.attr("height", this.params.mapHeight);

	this.clipGroupSvg = this.svg.append("g").attr("clip-path", "url(#clip)");

	this.countriesSvg = this.clipGroupSvg.append("g").attr("class","country");
	this.bordersSvg = this.clipGroupSvg.append("g");

	this.zoom = d3.behavior.zoom()
					.translate([0, 0])
					.scale(1)
					.scaleExtent([this.params.zoomMin, this.params.zoomMax])
					.on("zoom", zoomed);

	this.svg.call(this.zoom);

	this.countriesSvg.selectAll("path")
		.data(this.features)
		.enter().append("path")
		.attr("d", this.params.path)
		.attr("id", function (d) {
			return d.id;
		})
		.attr("stroke-width", 0)
		.attr("stroke", "#666")
		.attr("fill", function (d) {
			if ( d.data ) {
					if ( d.data["women-members"] === 0) {
						return self.params.uiColour.noData;
					} else {
						return self.params.colour(d.data["women-members"]);
					}		

			} else {
				return self.params.uiColour.noData;
			}
		});

	this.bordersSvg.append("path")
		.datum(topojson.mesh(self.world, self.world.objects.units, function(a, b) { return a !== b; }))
		.attr("d", this.params.path)
		.attr("class", "subunit-boundary")
		.attr("fill", "none")
		.attr("stroke", "#666")
		.attr("stroke-width", "0.1px");
	
	function zoomed() {
		self.hideTooltip();
		self.countriesSvg.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
		self.bordersSvg.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
	}

};
