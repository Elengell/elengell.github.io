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
        } else {
            die('Пароли должны совпадать');
        }
    }
?>

<form method="post" action="register.php">
    <input type="text" placeholder="Имя" name="username" required /> <br>
    <input type="text" placeholder="Логин" name="login" required /> <br>
    <input type="text" placeholder="Пароль" name="password" required /> <br>
    <input type="text" placeholder="Повторите пароль" name="r_password" required /> <br>
    <input type="submit" name="submit" value="Регистрация"/>
</form>


