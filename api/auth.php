<?php
session_start();
$_POST = json_decode(file_get_contents('php://input'), true);

if(isset($_POST) && !empty($_POST)) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if($username == 'admin' && $password =='admin') {
        $_SESSION['user'] = 'admin';
        ?>
        {
        "success": true,
        "secret": "This is the secret no one know the admin"
        }
        <?php
    } else {
        ?>
        {
        "success": false,
        "secret": "invalid auth"
        }
        <?php
    }
} else {
    //var_dump($_POST);
    ?>
    {
    "success": false,
    "message": "Only Post access accepted"
    }
    <?php
}
?>
