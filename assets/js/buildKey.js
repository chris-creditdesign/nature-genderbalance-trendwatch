BuildWidget.prototype.buildKey = function() {
	var self = this;

	if ( !this.key ) {
		this.key = d3.select(this.params.keyTarget);
	}

	this.list = this.key.append("ul");

	this.list.selectAll("li")
			.data(this.params.key.keyRange)
			.enter()
		  .append("li")
			.text(function (d,i) {
				var number = d * 100;
				return number.toString() + "%";
			})
			.style("border-top-color", function (d) {
				return self.params.colour(d);
			});
	  
	this.list.append("li")
		.text("Data not available")
		.style("border-top-color", self.params.uiColour.noData);


};
