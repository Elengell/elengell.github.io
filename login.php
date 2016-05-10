<?php
$connect = mysql_connect('localhost', 'root','') or die(mysql_error());
mysql_select_db('path_finder');

session_start();
if (isset($_SESSION['name'])) {
    header('location:index.php');
} else {
    echo '
    <div style="width: 100%;
                padding-top: 10%;
                text-align: center;">
        <form method="post" style="vertical-align: middle">
        Войдите в систему или <a href="register.php">зарегистрируйтесь</a><br><br>
            <input type="text" placeholder="Логин" name="e_login" required /> <br><br>
            <input type="text" placeholder="Пароль" name="e_password" required /> <br><br>
            <input type="submit" name="enter" value="Войти"/>
        </form>
    </div>
        ';
}



if (isset($_POST['enter'])) {
    $e_login = $_POST['e_login'];
    $e_password = md5($_POST['e_password']);
    $query = mysql_query("SELECT * FROM users WHERE login = '$e_login'") or die(mysql_error());
    $user_data = mysql_fetch_array($query);
    echo $user_data;

    if ($user_data['password'] == $e_password) {
        session_start();
        $_SESSION['id'] = $user_data['id'];
        $_SESSION['name']= $user_data['username'];
        header('location:index.php');
    } else {
        echo "Неверный логин или пароль";
    }
}


