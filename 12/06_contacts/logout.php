<?php

session_start();

require_once "vendor/Auth.php";
require_once "storage/UserStorage.php";

$auth = new Auth(new UserStorage());

$auth->logout();

header('Location: index.php');