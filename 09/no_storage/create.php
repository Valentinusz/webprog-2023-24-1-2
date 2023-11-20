<?php

// validációért lásd előző gyakorlat
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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

    if(count($errors) === 0) {
        $newEntry = ['name' => $name, 'email' => $email, 'phone' => strlen($phone) === 0 ? null : $phone];
		
		
        $contacts = json_decode(file_get_contents('data.json'), true);


		// unique id egyedi azonosítót állít elő
        $contacts[uniqid()] = $newEntry;

		// file_put_contents, string beírása fájlba
        // json_encode, értéket JSON-é alakítja
        // JSON_PRETTY_PRINT embernek is olvasható formátumban
        file_put_contents('data.json', json_encode($contacts, JSON_PRETTY_PRINT));
		
		// fejléc küldése a kliensnek
        // Location átirányítja a klienst
        header('Location: index.php');
        exit(); // szkript futna tovább exit()-el tudunk kilépni
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <form method='post' action='' novalidate>
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