<?php
    $connect = mysql_connect('localhost', 'root','') or die(mysql_error());
    mysql_select_db('path_finder');
    if (isset($_POST['submit'])) {
        $username = $_POST['username'];
        $login = $_POST['login'];
        $password = $_POST['password'];
        $r_password = $_POST['r_password'];
        if ($password == $r_password) {
            $password = md5($password);
            $query = mysql_query("INSERT INTO users VALUES ('', '$username', '$login', '$password')") or die(mysql_error());
            header('location:login.php');
        } else {
            die('Пароли должны совпадать');
        }
    }


session_start();
if (isset($_SESSION['name'])) {
    header('location:index.php');
} else {
    echo '
    <div style="width: 100%;
                padding-top: 10%;
                text-align: center;">
                Регистрация нового пользователя<br><br>
                Если вы уже зарегистрированы - <a href="login.php">войдите в систему</a><br><br>
        <form method="post">
            <input type="text" placeholder="Имя" name="username" required /> <br><br>
            <input type="text" placeholder="Логин" name="login" required /> <br><br>
            <input type="text" placeholder="Пароль" name="password" required /> <br><br>
            <input type="text" placeholder="Повторите пароль" name="r_password" required /> <br><br>
            <input type="submit" name="submit" value="Регистрация"/>
        </form>
    </div>
        ';
}


?>
