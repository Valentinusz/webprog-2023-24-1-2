<?php

session_start();

require_once "../vendor/Auth.php";
require_once "../storage/ContactStorage.php";
require_once "../storage/UserStorage.php";

$auth = new Auth(new UserStorage());

$contactName = $_GET['name'] ?? '';

$contactStorage = new ContactStorage();
$contacts = $contactStorage->findAll(['user_id' => $auth->authenticated_user()['id']]);
$contacts = array_filter($contacts, fn($contact) => str_contains($contact['name'], $contactName));

require_once '../resources/views/_contacts_table.php';