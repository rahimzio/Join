<?php

########### CONFIG ###############

$redirect = 'success.html';

########### CONFIG END ###########



########### Instruction ###########
#
#   This script has been created to send an email to the specified recipient
#   
#  1) Upload this file to your FTP Server
#  2) Send a POST request to this file, including
#     [recipient] The email address of the recipient
#     [name] The name of the sender (Absender)
#     [message] Message that should be sent
#
##################################



###############################
#
#        DON'T CHANGE ANYTHING FROM HERE!
#
#        Ab hier nichts mehr ändern!
#
###############################

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $recipient = $_POST['mail'];
        $subject = "Reset your password";
        $message = "https://gruppenarbeit-551-join.developerakademie.net/JOIN/resetPassword.html";

        mail($recipient, $subject, $message);
        header("Location: " . $redirect); 

        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
?>
