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
				// if (i === (self.params.key.keyRange.length - 1) ) {
				// 	return "≥ " + self.params.format(d);
				// } else if (i === 0) {
				// 	return "≤ " + self.params.format(d);
				// } else {
				// 	return self.params.format(d);
				// }
				var number = d * 100;

				return "≥ " + number.toString() + "%";
			})
			.style("border-top-color", function (d) {
				return self.params.colour(d);
			});
	  
	this.list.append("li")
		.text("Not available")
		.style("border-top-color", self.params.uiColour.noData);


};
