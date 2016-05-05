var map;
var path;
var altSum = 0;


google.load('visualization', '1', {packages: ['columnchart']});

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.960, lng: 36.079},
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.TERRAIN

    });
    var elevator = new google.maps.ElevationService;

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



    //события конца рисования полинома
    google.maps.event.addListener(drawingManager, 'polylinecomplete', function (event) {
        path = event.getPath().getArray();   //массив точек

        var pathLength = google.maps.geometry.spherical.computeLength(path).toFixed(2); //длина пути
        $('#info').append("<p>Дистанция пути = " + pathLength + "m</p>");

        //вывод координат и высоты каждой точки
        path.forEach(function(dot) {
            elevator.getElevationForLocations({
                'locations': [dot]
            }, function(results, status) {
                altSum = altSum + results[0].elevation;
                console.log(altSum);
                $('#info').append("<p>" + dot + " <br>Высота = " + results[0].elevation + "</p>");
            });

        });

        setTimeout(function() {
            $('#info').append("<p>Суммарное изменение высоты<br>(по всем перепадам)<br>" + Math.round(altSum) + "m</p><br>");
        }, 1000);

        //отрисовка графика перепада высот
        displayPathElevation(path, elevator, map);

    });
}

function displayPathElevation(path, elevator, map) {
    console.log(path);

    // отображение законченного полинома
    new google.maps.Polyline({
        path: path,
        strokeColor: '#0000CC',
        opacity: 0.4,
        map: map
    });

    elevator.getElevationAlongPath({
        'path': path,
        'samples': 50 // количество точек на оси Х
    }, plotElevation);
}

function plotElevation(elevations, status) {
    var chartDiv = document.getElementById('elevation_chart');
    if (status !== google.maps.ElevationStatus.OK) {
        // проверка на ошибки в запросе высоты
        chartDiv.innerHTML = 'Cannot show elevation: request failed because ' +
            status;
        return;
    }

    //инициализация объекта графика в диве
    var chart = new google.visualization.ColumnChart(chartDiv);

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Sample');
    data.addColumn('number', 'Elevation');
    for (var i = 0; i < elevations.length; i++) {
        data.addRow(['', elevations[i].elevation]);
    }

    // непосредственно отрисовка
    chart.draw(data, {
        height: 150,
        legend: 'none',
        titleY: 'Elevation (m)'
    });
}
