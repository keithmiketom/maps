//////////////////////////////////////////////////////////////////////////////////////////
/*					Google Maps Integrations with jQuery								*/
//////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////////////////
/*					customers loops														*/
//////////////////////////////////////////////////////////////////////////////////////////

var draw_customers = (function(my_map) {
	var customers = [
		{id: 15, name: "bob", coords: [52.5, -6]},
		{id: 22, name: "john", coords: [54.4, -7]},
		{id: 48, name: "henry", coords: [54.25, -8]},
		{id: 98, name: "charles", coords: [52.5, -4]}
	];

	
for(var i in customers){										//creates a loop targeting the index of customers
	var customer = customers[i];								//new var - hitting the elemrts of i
	var marker_options = {										//sets options
			position: new google.maps.LatLng(						//aims for latlong
			customer.coords[0],											//co-ords x where [x, y]
			customer.coords[1]											//co-ords y where [x, y]
		),															//closes LatLng
icon: {															//Json array args
	path: google.maps.SymbolPath.CIRCLE,
          fillColor: "#ff0000",
          fillOpacity: 0.3,
          strokeColor: "#ff0000",
          strokeWeight: 1.5,
          scale: 20
		},
	map: my_map												//map targets my_map
};

		var marker = new google.maps.Marker(marker_options);
}		

	
});




var draw_map = (function(position) { 						//sets a variable to draw a map //remove position for set latlng
	var map_options = {										//sets where your options will be in JSON Object, min spec is:
		center: new google.maps.LatLng(							//open arg
		position.coords.latitude,							//find your lat
		position.coords.longitude							//find your long
		),														//close arg
		//center: new google.maps.LatLng(53.3, -6.3), 		//centers on lat - long
		zoom: 15,											//zooms size, 15 quite close in
		mapTypeId: google.maps.MapTypeId.ROADMAP			//choose your map type
	};														//end of map_options JSON Objects
	
	
	var my_map = new google.maps.Map(						//to set your new map
		document.getElementById("my_google_map"),			//target the div holder in your HTML
		map_options											//Load Map options variable
	);														//Close the map variable

	var marker_options ={									//Marker Options
		position: new google.maps.LatLng(						//open
			position.coords.latitude,						//Find lat
			position.coords.longitude						//find long
		),														//close arg
			
/*icon: "http://25.media.tumblr.com/tumblr_ma78upOSrI1qzbbtto1_500.gif",*/ //use an image as an icon
			
			
			icon: {												//open icon JSON options
				path: google.maps.SymbolPath.CIRCLE,		//choose circle marker
				fillColor:"#ff0000",						//set fill colour
				fillOpacity: 0.3,							//set image opacity
				strokeColor:"#ff0000",						//set stroke colour
				strokeWeight: 1.5,							//set stroke weight
				scale: 5									//scale of the image
				},												//close icon JSON
			
			
			map: my_map,									//call the my_map variable
			
	};
	var marker = new google.maps.Marker(marker_options);		//sets a marker var, pulls in marker options
//////////////////////////////////////////////////////////////////////////////////////////
/*					Add event listening													*/
//////////////////////////////////////////////////////////////////////////////////////////	
google.maps.event.addListener(marker,								//sets event listener
 
			"click", 
			function()	{
/*				this.setMap(null);								//removes dot */
				var icon = this.getIcon();					//gets the info for Icon
					switch(icon.strokeColor){				//sets a switcher
					
				case "#ff0000":								//if its red
				icon.strokeColor = "#00ff00";				//change it to green
				icon.fillColor = "#00ff00";
				icon.scale = 80;							//change scale to 80
					break;										//stop cold block here
				case "#00ff00":								//if it is green
				icon.strokeColor = "#0000ff";				//change to blue
				icon.fillColor = "#0000ff";
				icon.scale = 80;
					break;	
				case "#0000ff":								//if it is blue
				icon.strokeColor = "#ff0000";				//change to red
				icon.fillColor = "#ff0000";
				icon.scale = 80;
					break;
				}
				this.setIcon(icon);							//now set this as the icon color
/*					}
					icon.strokeColor = "#00ff00";			//changes stroke colour to green
					icon.scale = 80;
					this.setIcon(icon);						//sets the value to green*/
/*				alert("me julie");							//alerts when you click on the dot */
	}
	);
});																//close draw map function

$(document).on("ready", function(){
	navigator.geolocation.getCurrentPosition(draw_map);		//gets current location -->remove the function-draw map
	});														//In jQuery, call the map when doc is loaded


