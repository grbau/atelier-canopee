<?php
require 'connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);


  // Validate.
  /*if(trim($request->data->model) === '' || (int)$request->data->price < 1)
  {
    return http_response_code(400);
  }*/

  // Sanitize.

  $title = mysqli_real_escape_string($con, trim($request->data->title));
  $subTitle = mysqli_real_escape_string($con, trim(!empty($request->data->subTitle) ? "'$request->data->subTitle'" : 'NULL'));
  $type = mysqli_real_escape_string($con, trim($request->data->type));
  $description = mysqli_real_escape_string($con, trim(!empty($request->data->description) ? "'$request->data->description'" : 'NULL'));
  $location = mysqli_real_escape_string($con, trim($request->data->location));
  $realisationDate = mysqli_real_escape_string($con, trim(!empty($request->data->realisationDate) ? "'$request->data->realisationDate'" : 'NULL'));
  $surface = mysqli_real_escape_string($con, (int)$request->data->surface);
  $process = mysqli_real_escape_string($con, trim(!empty($request->data->process) ? "'$request->data->process'" : 'NULL'));
  $image = mysqli_real_escape_string($con, trim(!empty($request->data->image) ? "'$request->data->image'" : 'NULL'));
  $imageFormat = mysqli_real_escape_string($con, trim(!empty($request->data->imageFormat) ? "'$request->data->imageFormat'" : 'NULL'));

  // Insert project.
  $sql = "INSERT INTO `projects`(`id`, `title`, `subTitle`, `type`, `description`, `location`, `realisationDate`, `surface`, `process`, `image`, `imageFormat`) VALUES (null, '{$title}', '{$subTitle}', '{$type}', '{$description}', '{$location}', '{$realisationDate}', '{$surface}', '{$process}', '{$image}', '{$imageFormat}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $project = [
        'title' => $title,
        'subTitle' => $subTitle,
        'type' => $type,
        'description' => $description,
        'location' => $location,
        'realisationDate' => $realisationDate,
        'surface' => $surface,
        'process' => $process,
        'image' => $image,
        'imageFormat' => $imageFormat,
        'id'    => mysqli_insert_id($con)
    ];
    echo json_encode(['data'=>$project]);
  }
  else
  {
    http_response_code(422);
  }
}

?>
