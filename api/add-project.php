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
  $type = mysqli_real_escape_string($con, trim($request->data->type));
  $description = mysqli_real_escape_string($con, trim($request->data->description));
  $location = mysqli_real_escape_string($con, trim($request->data->location));
  $realisationDate = mysqli_real_escape_string($con, trim($request->data->realisationDate));
  $surface = mysqli_real_escape_string($con, (int)$request->data->surface);
  $image = mysqli_real_escape_string($con, trim($request->data->image));
    
  // Insert project.
  $sql = "INSERT INTO `projects`(`id`,`title`, `type`, `description`, `location`, `realisationDate`, `surface`, `image`) VALUES (null,'{$title}','{$type}', '{$description}', '{$location}', '{$realisationDate}', '{$surface}', '{$image}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $project = [
      'title' => $title,
      'type' => $type,
      'description' => $description,
      'location' => $location,
      'realisationDate' => $realisationDate,
      'surface' => $surface,
      'image' => $image,
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
