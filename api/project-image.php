<?php
/**
 * Returns the list image of projects for slideshow.
 */
require 'connect.php';

$images = [];

$sql = "SELECT url, title, format, projectId FROM projects_images";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $images[$cr]['url'] = $row['url'];
    $images[$cr]['title'] = $row['title'];
    $images[$cr]['format'] = $row['format'];
    $images[$cr]['projectId'] = $row['projectId'];
    $cr++;
  }

  echo json_encode(['data'=>$images]);
}
else
{
  http_response_code(404);
}
?>
