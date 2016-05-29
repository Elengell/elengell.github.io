<?php
$connect = mysql_connect('localhost', 'root','') or die(mysql_error());
mysql_select_db('path_finder');
session_start();

if(!$_SESSION['name']) {
    header('location:login.php');
}
$user_id = $_SESSION['id'];
$user_name = $_SESSION['name'];

//механизм сохранения маршрута в базу
if (isset($_POST['savePath'])) {
    $pathJson = $_POST['path'];
    $comment = $_POST['comment'];
    $path_name = $_POST['path_name'];
    $query = mysql_query("INSERT INTO routes VALUES ('$user_id', '', '$path_name','$pathJson', '$comment')") or die(mysql_error());
    header('location:index.php');
}

//механизм удаления маршрута
if (isset($_POST['deletePath'])) {
    $pathDelId = $_POST['pathDelId'];
    $query = mysql_query("DELETE FROM `path_finder`.`routes` WHERE `routes`.`path_id` = $pathDelId") or die(mysql_error());
}

//запрос юзерских маршрутов
$users_routes_arr = array();
$query_routes = mysql_query("SELECT `path_id`,`path_name`,`path`,`comment` FROM `routes` WHERE `id`=$user_id") or die(mysql_error());
while ($users_routes = mysql_fetch_assoc($query_routes)) {
    array_push($users_routes_arr, $users_routes);
}


//конструктор таблицы
function build_table($array){
    // start table
    $html = '<table id="userRoutes">';
    // header row
    $html .= '<thead>';
    foreach($array[0] as $key=>$value){
       if ($key == "path_name") {
           $key = "Название маршрута";
       } elseif ($key == "comment") {
           $key = "Комментарий";
       };
            $html .= '<th class="' . $key . '">' . $key . '</th>';
    }
    $html .= '</thead>';

    // data rows
    foreach( $array as $key=>$value){
        $html .= '<tr class="table_tr">';
        foreach($value as $key2=>$value2){
                $html .= '<td class="' . $key2 . '">' . $value2 . '</td>';
        }
        $html .= '</tr>';

    }


    // finish table and return it

    $html .= '</table>';
    return $html;
}

?>

<html>
<head>
    <title>Path Finder</title>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    <link rel="stylesheet" href="style.css">
</head>
    <body>
    <div id="logout">
        <div id="username"><?php echo $user_name?> -</div>
        <a href="logout.php">Выход</a>
    </div>

    <div id="map"></div>
    <div id="info">
        <?php
        if (!empty($users_routes_arr)) echo build_table($users_routes_arr) ?>
    </div>

    <div id="elevation_chart"></div>

    <form method="post" id="saveForm">
        <input id="path" type="text" name="path" /> <br>
        <input id="path_name" type="text" name="path_name" /> <br>
        <input id="comment" type="text" name="comment" /> <br>
        <input id="saveToBase" type="submit" name="savePath"/>
    </form>

    <form method="post" id="deleteForm">
        <input id="pathId" type="text" name="pathDelId" /> <br>
        <input id="deletePath" type="submit" name="deletePath"/>
    </form>

    <script type="text/javascript" src="jquery-2.2.3.min.js"></script>
    <script src="https://www.google.com/jsapi"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAbzqu1Nsgrm7uGvmpbsHQWW0-APwQWXdk
&callback=initMap&libraries=drawing,geometry"
            async defer></script>

    <script type="text/javascript" src="app.js"></script>
    </body>
</html>