var draw_customers = (function(my_map) {					//sets JSON array of obs
	var customers = [
		{id: 15, name: "bob", coords: [53, -6]},
		{id: 22, name: "john", coords: [53, -7]},
		{id: 48, name: "henry", coords: [53.5, -6]},
		{id: 98, name: "charles", coords: [53.5, -7]}
	];
	

for(var i in customers){									//loops for the index of customers
	var customer = customers[i];
	var marker_options = {
			position: new google.maps.LatLng(
			customer.coords[0],
			customer.coords[1]
),
icon: {														//icon definition
	path: google.maps.SymbolPath.CIRCLE,
          fillColor: "#ff0000",
          fillOpacity: 0.3,
          strokeColor: "#ff0000",
          strokeWeight: 1.5,
          scale: 20
},
	map: my_map
};

var marker = new google.maps.Marker(marker_options);
}		
});

var draw_marker = (function(my_map, position) {				//defines a marker
var marker_options = {
		position: new google.maps.LatLng(
		position.coords.latitude,
		position.coords.longitude
),
icon: {
	path: google.maps.SymbolPath.CIRCLE,
          fillColor: "#ff0000",
          fillOpacity: 0.3,
          strokeColor: "#ff0000",
          strokeWeight: 1.5,
          scale: 20
},
	map: my_map
};

var marker = new google.maps.Marker(marker_options);
google.maps.event.addListener(
		marker, 
		"click", 
		function() {
		//this.setMap(null);

			var icon = this.getIcon();
			switch(icon.strokeColor) {
				case "#ff0000":
					icon.strokeColor = "#00ff00";
					icon.fillColor = "#00ff00";
			break;
			case "#00ff00":
					icon.strokeColor = "#0000ff";
					icon.fillColor = "#0000ff";
			break;
			case "#0000ff":
					icon.strokeColor = "#ff0000";
					icon.fillColor = "#ff0000";
			break;
			}
		this.setIcon(icon);

	}
);																//closes event add listener
});																//closes draw marker

var draw_map = (function(position) {
	var map_options = {
		center: new google.maps.LatLng(
		position.coords.latitude,
		position.coords.longitude
		),
		zoom: 7,
		mapTypeId: google.maps.MapTypeId.ROADMAP	
	};															//closes map_options JSON

	var my_map = new google.maps.Map(
		document.getElementById("my_google_map"),					//targets div ID
		map_options
	);															//closes my_map

	draw_marker(my_map, position);								//displays draw_marker for map and pos
	draw_customers(my_map);										//displays my_map for customers
});																//closes draw_map 


$(document).on("ready", function() {
navigator.geolocation.getCurrentPosition(draw_map);
});

