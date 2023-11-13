<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    var_dump($_POST);

    $errors = [];

    $name = trim($_POST['name'] ?? '');
    if (strlen($name) === 0) {
        $errors['name'] = 'A név megadása kötelező';
    } else {
        if (strlen($name) > 32) {
            $errors['name'] = 'A név hossza maximálisan 32 karakter lehet.';
        }
    }

    $email = trim($_POST['email'] ?? '');
    if (strlen($email) === 0) {
        $errors['email'] = 'Az email megadása kötelező';
    } else {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Az email formátuma nem megfelelő.';
        }
    }

    $phone = trim($_POST['phone'] ?? '');
    if (strlen($phone) !== 0) {
        $format = "/^\+?\d{2} ?\d{2} ?\d{3} ?\d{4}$/";

        if (!filter_var($phone, FILTER_VALIDATE_REGEXP, ['options' => ['regexp' => $format]])) {
            $errors['phone'] = 'Az telefonszám formátuma nem megfelelő.';
        }
    }

    var_dump($errors);
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <?php if(isset($errors) && count($errors) === 0): ?>
        <table>
            <thead>
            <tr>
                <th>Név</th>
                <th>Email</th>
                <th>Telefonszám</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td><?= $name ?></td>
                    <td><?= $email ?></td>
                    <td><?= $phone ?></td>
                </tr>
            </tbody>
        </table>
    <?php endif; ?>
    <form method='post' novalidate>
        <label for='name'>Név*</label>
        <input id='name' name='name' value='<?= $name ?? '' ?>' required>
        <?php if(isset($errors['name'])): ?><span><?= $errors['name'] ?></span><?php endif; ?>

        <br>

        <label for='email'>Email*</label>
        <input id='email' name='email' value='<?= $email ?? '' ?>'>
        <?php if(isset($errors['email'])): ?><span><?= $errors['email'] ?></span><?php endif; ?>

        <br>

        <label for='phone'>Telefonszám</label>
        <input id='phone' name='phone' value='<?= $phone ?? '' ?>'>
        <?php if(isset($errors['phone'])): ?><span><?= $errors['phone'] ?></span><?php endif; ?>

        <br>

        <button>Küldés</button>
    </form>
</body>
</html>