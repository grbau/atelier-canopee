<?php
require 'connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  // Validate.
  if ((int)$request->data->id < 1) {
    return http_response_code(400);
  }

  // Sanitize.
  $id    = mysqli_real_escape_string($con, (int)$request->data->id);
  $title = mysqli_real_escape_string($con, trim($request->data->title));
  $subTitle = mysqli_real_escape_string($con, trim($request->data->subTitle));
  $type = mysqli_real_escape_string($con, trim($request->data->type));
  $description = mysqli_real_escape_string($con, trim($request->data->description));
  $location = mysqli_real_escape_string($con, trim($request->data->location));
  $realisationDate = mysqli_real_escape_string($con, trim($request->data->realisationDate));
  $surface = mysqli_real_escape_string($con, (int)$request->data->surface);
  $process = mysqli_real_escape_string($con, trim($request->data->process));
  $image = mysqli_real_escape_string($con, trim($request->data->image));
  $imageFormat = mysqli_real_escape_string($con, trim($request->data->imageFormat));

  // Update.
  $sql = "UPDATE `projects` SET `title`='$title', `subTitle`='$subTitle',`type`='$type', `description`='$description', `location`='$location',
 `realisationDate`='$realisationDate', `surface`='$surface', `process`='$process', `image`='$image', `imageFormat`='$imageFormat' WHERE `id` = '{$id}' LIMIT 1";

  if(mysqli_query($con, $sql))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  }
}
?>
