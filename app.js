var map,  //объект карты
    path,  //массив точек
    altSum = 0,  //суммарный перепад высот
    altArray = [],  //высота на каждой выбранных точек маршрута
    pathJson,  //массив точек для хранения в базе
    pathLength,  //дистанция маршрута
    polyline,  //объект полинома на карте
    lines = [];  //массив полиномов (для зачистки карты)

google.load('visualization', '1', {packages: ['columnchart']});

function initMap(pathFowShow) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.960, lng: 36.079},
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    });

    if (pathFowShow) {
        var lat_min = Number.POSITIVE_INFINITY;
        var lat_max = Number.NEGATIVE_INFINITY;
        var tmp;
        for (var i=pathFowShow.length-1; i>=0; i--) {
            tmp = pathFowShow[i].lat;
            if (tmp < lat_min) lat_min = tmp;
            if (tmp > lat_max) lat_max = tmp;
        }

        var lng_min = Number.POSITIVE_INFINITY;
        var lng_max = Number.NEGATIVE_INFINITY;
        for (var j=pathFowShow.length-1; j>=0; j--) {
            tmp = pathFowShow[j].lng;
            if (tmp < lng_min) lng_min = tmp;
            if (tmp > lng_max) lng_max = tmp;
        }

        map.setCenter(new google.maps.LatLng(
            ((lat_max + lat_min) / 2.0),
            ((lng_max + lng_min) / 2.0)
        ));
        map.fitBounds(new google.maps.LatLngBounds(
            //bottom left
            new google.maps.LatLng(lat_min, lng_min),
            //top right
            new google.maps.LatLng(lat_max, lng_max)
        ));
    }

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
        if (polyline) {
            for (var i=0; i<lines.length; i++) {
                lines[i].setMap(null); //or line[i].setVisible(false);
            }
        }

        path = event.getPath().getArray();   //массив точек
        pathJson = JSON.stringify(path);
        console.log(path);

        pathLength = google.maps.geometry.spherical.computeLength(path).toFixed(2); //длина пути

        //вывод координат и высоты каждой точки
        path.forEach(function(dot) {
            elevator.getElevationForLocations({
                'locations': [dot]
            }, function(results, status) {
/*
                $('#info').append("<p>" + dot + " <br>Высота = " + results[0].elevation + "</p>");
*/
            });

        });
        //отрисовка графика перепада высот
        displayPathElevation(path, elevator, map);
    });
}

function displayPathElevation(path, elevator, map) {
    // отображение законченного полинома
    polyline = new google.maps.Polyline({
        path: path,
        strokeColor: '#0000CC',
        opacity: 0.4,
        map: map
    });
    lines.push(polyline);

    elevator.getElevationAlongPath({
        'path': path,
        'samples': 250 // количество точек на оси Х
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
        altArray.push(elevations[i].elevation);
    }

    //перебираем массив высот, для определения суммарного перепада
    altArray.forEach(function(el, index, arr) {
        if (index != arr.length-1) {
            altSum += Math.abs(arr[index+1]-arr[index]);
        }
    });

    //добавление формы сохранения в дом-дерево
    $('#info').find(".saveFormCol").remove();
    $('#info').prepend("<div class='saveFormCol'><p>Дистанция пути = " + pathLength + "m</p>" +
        "<p>Суммарное изменение высоты<br>(по всем перепадам)<br>" + Math.round(altSum) + "m</p><br></div>" +
        "<div class='saveFormCol'><input class='save_path_input' id='path_name_visible' type='text' placeholder='Имя маршрута'>" +
        "<textarea class='save_path_input' id='comment_visible' cols='40' rows='5' placeholder='Комментарий'></textarea>" +
        "<div id='saver' onclick='savePath()'>Сохранить путь</div></div>");

    // непосредственно отрисовка графика
    chart.draw(data, {
        height: 150,
        legend: 'none',
        titleY: 'Elevation (m)'
    });
}


//механизм сохранения маршрута в базу
function savePath() {
    if ($('#path_name_visible').val() != '') {
        $('#path_name').val($('#path_name_visible').val());
        $('#path').val(pathJson);
        $('#comment').val($('#comment_visible').val());
        $('#saveToBase').click();
    }
}

//механизм удаления маршрута из базы
$(document).ready(function() {
    $('tr:first').append("<td></td>");
    $('tr:not(:first)').append("<td class='removeBtn' onclick='deletePath($(this).parent())'>Delete</td>");
});
function deletePath(el) {
    $('#pathId').val(el.find('.path_id').text());
    $('#deletePath').click();
    el.remove();
}


// механизм отрисовки пути из таблицы
$('.table_tr').click(function() {
    altArray = [];
    altSum = 0;
    pathLength = 0;
    var elevator = new google.maps.ElevationService;

    path = JSON.parse($(this).find('.path').text());   //массив точек

    //немного итераций для центрови карты и автомасштабирования
    var lat_min = Number.POSITIVE_INFINITY;
    var lat_max = Number.NEGATIVE_INFINITY;
    var tmp;
    for (var i=path.length-1; i>=0; i--) {
        tmp = path[i].lat;
        if (tmp < lat_min) lat_min = tmp;
        if (tmp > lat_max) lat_max = tmp;
    }

    var lng_min = Number.POSITIVE_INFINITY;
    var lng_max = Number.NEGATIVE_INFINITY;
    for (var j=path.length-1; j>=0; j--) {
        tmp = path[j].lng;
        if (tmp < lng_min) lng_min = tmp;
        if (tmp > lng_max) lng_max = tmp;
    }

    initMap(path);

    //отрисовка графика перепада высот
    drawLineFromBase(path, elevator, map);

});
function drawLineFromBase(path, elevator, map) {
    // отображаем выбранную
    polyline = new google.maps.Polyline({
        path: path,
        strokeColor: '#0000CC',
        opacity: 0.4,
        map: map
    });
    lines.push(polyline);

    var newPath = polyline.getPath().getArray();   //массив точек
    pathLength = google.maps.geometry.spherical.computeLength(newPath).toFixed(2); //длина пути

    elevator.getElevationAlongPath({
        'path': path,
        'samples': 250 // количество точек на оси Х
    }, drowChartFromBase);
}

function drowChartFromBase(elevations, status) {
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
        altArray.push(elevations[i].elevation);
    }

    //перебираем массив высот, для определения суммарного перепада
    altArray.forEach(function(el, index, arr) {
        if (index != arr.length-1) {
            altSum += Math.abs(arr[index+1]-arr[index]);
        }
    });


    //параметры пути
    $('#info').find(".saveFormCol").remove();
    $('#info').prepend("<div class='saveFormCol'><p>Дистанция пути = " + pathLength + "m</p>" +
        "<p>Суммарное изменение высоты<br>(по всем перепадам)<br>" + Math.round(altSum) + "m</p><br></div>");


    // непосредственно отрисовка графика
    chart.draw(data, {
        height: 150,
        legend: 'none',
        titleY: 'Elevation (m)'
    });
}