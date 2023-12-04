<?php

session_start();

require_once "vendor/Auth.php";
require_once "storage/ContactStorage.php";
require_once "storage/UserStorage.php";

$auth = new Auth(new UserStorage());

if (!$auth->is_authenticated()) {
    header('Location: login.php');
    exit();
}


if ($_SERVER["REQUEST_METHOD"] !== "POST" || !isset($_GET["id"])) {
    header("Location: index.php");
    exit();
}
    
$contacts = new ContactStorage();   
$contactToDelete = $contacts->findById($_GET["id"]);

if ($auth->authenticated_user()['id'] === $contactToDelete['user_id'] || $auth->authorize(['admin'])) {
    $contacts->delete($contactToDelete["id"]);

}

header("Location: index.php");
exit();

