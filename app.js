var map;
var path;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.960, lng: 36.079},
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.TERRAIN

    });
    var elevator = new google.maps.ElevationService;

/*    google.maps.event.addListener(map, "rightclick", function(event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        // populate yor box/field with lat, lng
        console.log("Lat=" + lat + "; Lng=" + lng);
    });*/

    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
                google.maps.drawing.OverlayType.POLYLINE
            ]
        },
        circleOptions: {
            fillColor: '#ffff00',
            fillOpacity: 1,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            zIndex: 1
        }
    });
    drawingManager.setMap(map);



    google.maps.event.addListener(drawingManager, 'polylinecomplete', function (event) {
        path = event.getPath().getArray();   //массив точек

        var pathLength = google.maps.geometry.spherical.computeLength(path).toFixed(2); //длина пути
        $('#info').append("<p>pathLength = " + pathLength + "m</p><br>");

        //вывод координат и высоты каждой точки
        path.forEach(function(dot) {
            elevator.getElevationForLocations({
                'locations': [dot]
            }, function(results, status) {
                $('#info').append("<p>" + dot + " alt.= " + results[0].elevation + "</p><br>");
            });
        });
    });
}