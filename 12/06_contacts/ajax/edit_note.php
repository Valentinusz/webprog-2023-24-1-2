<?php

session_start();

require_once "../vendor/Auth.php";
require_once "../storage/ContactStorage.php";
require_once "../storage/UserStorage.php";

$auth = new Auth(new UserStorage());

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(404);
    exit();
}

if (!$auth->is_authenticated()) {
    http_response_code(401);
    exit();
}

if (!isset($_GET["id"]) && !isset($_POST['note'])) {
    http_response_code(400);
    exit();
}

$contacts = new ContactStorage();
$contactToUpdate = $contacts->findById($_GET["id"]);

if ($auth->authenticated_user()['id'] !== $contactToUpdate['user_id'] && !$auth->authorize(['admin'])) {
    http_response_code(403);
    exit();
}

$contactToUpdate['note'] = $_POST['note'];

$contacts->update($contactToUpdate['id'], $contactToUpdate);