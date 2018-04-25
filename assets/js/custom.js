(function($) {
	
	// step navigation
	var target = $('.step-indicator-wrap ul li');
	target.first().addClass('active');
	$('.step-form-container .steps-holder:nth-of-type(1)').fadeIn('slow');
	target.click(function() {
		$(this).addClass('active').siblings('li.active').addClass('complete');
		var getStep = $(this).data('target');
		$('.steps-holder.' + getStep).fadeIn().siblings('.steps-holder').fadeOut('fast');
		// $("html, body").animate({ scrollTop: 0 }, "200");
	});

})(jQuery);

// Leaflet

var countriesLayer;

function hightlightFeature(e){
	var layer = e.target;
	layer.setStyle(
	  {
	    weight: 2,
	    fillColor: '#f06600',
	    color: '#0b3a8c'
	  }
	);

	if(!L.Browser.ie && !L.Browser.opera){
	  layer.bringToFront();
	}
}

function resetHighlight(e){
	countriesLayer.resetStyle(e.target);
}

function zoomToFeature(e){
	//map.fitBounds(e.target.getBounds());
	var popLocation= e.latlng;
	var regionName = e.target.feature.properties.nom;
	    var popup = L.popup({closeButton: false})
	    .setLatLng(popLocation)
	    .setContent(regionName)
	    .openOn(map);     
}


function countriesOnEachFeature(feature, layer){
	layer.on(
	  {
	    mouseover: hightlightFeature,
	    mouseout: resetHighlight,
	    click: zoomToFeature
	  }
	);
}


function countriesStyle(feature){
  return{
    fillColor: '#1260e9',
    weight: 2,
    opacity: 1,
    color: '#0b3b8e',
    fillOpacity: 1
  }
}

var map = L.map('map', {
    	zoomControl:false
	}
).setView([148.86, 52.35], 50);

map.scrollWheelZoom.disable();
map.dragging.disable();
map.doubleClickZoom.disable();


countriesLayer = L.geoJson(
  countries,
    {
      style : countriesStyle,
      onEachFeature: countriesOnEachFeature

    }
  ).addTo(map);
map.fitBounds(countriesLayer.getBounds());