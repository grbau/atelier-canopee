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
        $name = mysqli_real_escape_string($con, trim($request->data->name));
        $email = mysqli_real_escape_string($con, trim($request->data->email));
        $phone = mysqli_real_escape_string($con, trim($request->data->phone));
        $message = mysqli_real_escape_string($con, trim($request->data->message));

        // Insert contact.
        $sql = "INSERT INTO `contact`(`id`,`name`, `email`, `phone`, `message`) VALUES (null, '{$name}', '{$email}', '{$phone}', '{$message}')";

        if(mysqli_query($con,$sql))
        {
                http_response_code(201);
                $contact = [
                    'name' => $name,
                    'email' => $email,
                    'phone' => $phone,
                    'message' => $message,
                    'id'    => mysqli_insert_id($con)
                ];
                $to = "gregory.baudic@hotmail.fr";
                $subject = "Nouveau contact";

                $content = '<p>Bonjour Serge <br />Vous avez reçu un nouveau message du formulaire de contact</p>';
                $content .= '<p><strong>Nom: </strong>'.$name.'</p>';
                $content .= '<p><strong>Email: </strong>'.$email.'</p>';
                $content .= '<p><strong>Téléphone: </strong>'.$phone.'</p>';
                $content .= '<p><strong>Message: </strong>'.$message.'</p>';

                // Always set content-type when sending HTML email
                $headers = "MIME-Version: 1.0" . "\r\n";
                $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

                // More headers
                $headers .= 'From: <gregory.baudic@hotmail.fr>' . "\r\n";

                mail($to,$subject,$content,$headers);

                $this->output
                    ->set_content_type('application/json')
                    ->set_output(json_encode($response));

                echo json_encode(['data'=>$contact]);
        }
        else
        {
                http_response_code(422);
        }
}

?>
