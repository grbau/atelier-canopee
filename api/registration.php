<?php
require 'connect.php';
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata))
{
  $password = mysqli_real_escape_string($mysqli, (int)$request->password);
  $email = mysqli_real_escape_string($mysqli, trim($request->email));
  $sql = "INSERT INTO users(password,email) VALUES ('{$pwd}','{$email}')";
  // echo $sql;
  if ($mysqli->query($sql) === TRUE) {


    $authdata = [
        'password' => '',
        'email' => $email,
        'id'    => mysqli_insert_id($mysqli)
    ];
    echo json_encode($authdata);

  }
}
?>
