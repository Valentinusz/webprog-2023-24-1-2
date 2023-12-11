<?php

session_start();

require_once "vendor/Auth.php";
require_once "storage/ContactStorage.php";
require_once "storage/UserStorage.php";

$auth = new Auth(new UserStorage())

?>

<!DOCTYPE html>
<html lang="hu-HU">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="resources/css/style.css">
    <title>Főoldal - Névjegyek</title>
</head>
<body>
    <?php require_once 'resources/views/_nav.php' ?>
    <header role="banner">
        <h1>Névjegyek</h1>
    </header>
    <main>
        <h2>Névjegyeim</h2>
        <?php if($auth->is_authenticated()):
            $contactStorage = new ContactStorage();
            $contacts = $contactStorage->findAll(['user_id' => $auth->authenticated_user()['id']]);
            ?>
        <form>
            <input id='filter'>
            <button type='submit'>Szűrés</button>
        </form>
        <form>
            <button id='delete-selected' class='delete'>Törlés</button>
        </form>
        <div>
            <a href="create.php">Új névjegy</a>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Név</th>
                    <th>Email</th>
                    <th>Telefonszám</th>
                    <th>Megjegyzés</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <?php require_once 'resources/views/_contacts_table.php' ?>
            </tbody>
        </table>
        </div>
        <?php else: ?>
        <p>A névjegyek csak hitelesített felhasználók számára érhetőek el.</p>
        <?php endif; ?>
    </main>
    <script src='resources/js/index.js'></script>
</body>

</html>