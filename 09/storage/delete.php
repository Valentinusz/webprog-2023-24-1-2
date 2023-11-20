<?php

require_once 'ContactStorage.php';

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_GET['id'])) {
        header('Location: index.php');
        exit();
    }

    $contacts = new ContactStorage();
    $contacts->delete($_GET['id']);
}

header('Location: index.php');
