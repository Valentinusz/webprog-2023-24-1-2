<?php

session_start();

require_once "storage/UserStorage.php";
require_once "vendor/Auth.php";

$auth = new Auth(new UserStorage());

if ($auth->is_authenticated()) {
    header('Location: index.php');
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $errors = [];

    $username = trim($_POST["username"] ?? "");
    if (strlen($username) == 0) {
        $errors["username"] = "A felhasználónév megadása kötelező!";
    }

    $password = trim($_POST["password"] ?? "");
    if (strlen($password) == 0) {
        $errors["password"] = "A jelszó megadása kötelező!";
    }

    if (count($errors) === 0) {
        $user = $auth->authenticate($username,$password);

        if (!is_null($user)) {
            $auth->login($user);

            header("Location: login.php");
            exit();
        } else {
            $errors['invalid'] = "Hibás felhasználónév vagy jelszó!";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="hu-HU">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="resources/css/style.css">
    <title>Bejelentkezés - Névjegyek</title>
</head>
<body>
    <main>
        <h1>Bejelentkezés</h1>
        <form method="post">
            <label for="username">Név*</label>
            <input id="username" name="username" value="<?= $username ?? "" ?>">
            <?php if(isset($errors["username"])): ?><span class="error"><?= $errors["username"] ?></span><?php endif; ?>

            <label for="password">Jelszó*</label>
            <input id="password" name="password" value="<?= $password ?? "" ?>">
            <?php if(isset($errors["password"])): ?><span class="error"><?= $errors["password"] ?></span><?php endif; ?>

            <?php if (isset($errors['invalid'])): ?>
                <div class='error'>
                    <?= $errors['invalid'] ?>
                </div>
            <?php endif; ?>
            <button type="submit">Bejelentkezés</button>
        </form>
    </main>
</body>
</html>