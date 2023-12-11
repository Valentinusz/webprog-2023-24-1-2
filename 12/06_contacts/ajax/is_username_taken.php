<?php

require_once "../storage/UserStorage.php";
require_once "../vendor/Auth.php";

$auth = new Auth(new UserStorage());

$username = $_GET['username'] ?? '';

$response = [
    'in_use' => $auth->user_exists($username)
];

echo json_encode($response, JSON_PRETTY_PRINT);