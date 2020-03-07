<?php
/**
 * Returns the list of projects for HOME PAGE.
 */
require 'connect.php';

$projects = [];

$sql = "SELECT projects.id, type, title, image, imageFormat FROM projects, projects_home WHERE projects.id = projects_home.project_id ";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $projects[$cr]['id'] = $row['id'];
    $projects[$cr]['type'] = $row['type'];
    $projects[$cr]['title'] = $row['title'];
    $projects[$cr]['image'] = $row['image'];
    $projects[$cr]['imageFormat'] = $row['imageFormat'];
    $cr++;
  }

  echo json_encode(['data'=>$projects]);
}
else
{
  http_response_code(404);
}
?>
