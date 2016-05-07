<?php
session_start();

if(!$_SESSION['name']) {
    header('location:login.php');
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
    <a href="logout.php" id="logout">Logout</a>
    <div id="map"></div>
    <div id="info"></div>

    <script type="text/javascript" src="jquery-2.2.3.min.js"></script>
    <script type="text/javascript" src="app.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAbzqu1Nsgrm7uGvmpbsHQWW0-APwQWXdk
    &callback=initMap&libraries=drawing"
            async defer></script>
    </body>
</html>