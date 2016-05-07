<?php
$connect = mysql_connect('localhost', 'root','') or die(mysql_error());
mysql_select_db('path_finder');


if (isset($_SESSION['name'])) {
    echo "Вы уже вошли";
} else {
    echo '
        <form method="post">
            <input type="text" placeholder="Логин" name="e_login" required /> <br>
            <input type="text" placeholder="Пароль" name="e_password" required /> <br>
            <input type="submit" name="enter" value="Войти"/>
        </form>
        ';
}



if (isset($_POST['enter'])) {
    $e_login = $_POST['e_login'];
    $e_password = md5($_POST['e_password']);
    $query = mysql_query("SELECT * FROM users WHERE login = '$e_login'") or die(mysql_error());
    $user_data = mysql_fetch_array($query);

    if ($user_data['password'] == $e_password) {
        session_start();
        $_SESSION['name']= $e_login;
        header('location:index.php');
    } else {
        echo "Неверный логин или пароль";
    }
}