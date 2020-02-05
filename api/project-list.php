<?php
/**
 * Returns the list of cars.
 */
require 'connect.php';
    
$projects = [];
$sql = "SELECT id, title, type, description, location, realisationDate, surface, image FROM projects";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $projects[$cr]['id']    = $row['id'];
    $projects[$cr]['title'] = $row['title'];
    $projects[$cr]['type'] = $row['type'];
    $projects[$cr]['description'] = $row['description'];
    $projects[$cr]['location'] = $row['location'];
    $projects[$cr]['realisationDate'] = $row['realisationDate'];
    $projects[$cr]['surface'] = $row['surface'];
    $projects[$cr]['image'] = $row['image'];
    $cr++;
  }
    
  echo json_encode(['data'=>$projects]);
}
else
{
  http_response_code(404);
}
?>
