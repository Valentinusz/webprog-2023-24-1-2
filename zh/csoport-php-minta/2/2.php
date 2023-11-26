<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $errors = [];

    var_dump($_POST);

    $name = trim($_POST['tanulo'] ?? '');

    if (strlen($name) === 0) {
        $errors['tanulo'] = 'A név kötelező.';
    } else {
        $splitName = explode(' ', $name);

        if (count($splitName) < 2) {
            $errors['tanulo'] = 'A névnek legalább két tagból kell állnia.';
        }
    }

    $szazalek = trim($_POST['szazalek'] ?? '');

    if (strlen($szazalek) === 0) {
        $errors['szazalek'] = 'Az eredmény megadása kötelező.';
    } else {
        $parsedSzazalek = filter_var($szazalek, FILTER_VALIDATE_INT);

        if ($parsedSzazalek === false) {
            $errors['szazalek'] = 'A százaléknak egész számnak kell lennie.';
        } else {
            $szazalek = $parsedSzazalek;

            $checked = $_POST['szobeli'] ?? '';

            if (12 < $szazalek && $szazalek < 25 && $checked !== 'on') {
                $errors['szobeli'] = 'A szobeli vizsgára jelentezkés kötelező.';
            }
        }
    }


}

?>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>PHP ZH - 2. feladat</title>
</head>
<body>
    <h1>ÉRETTSÉGI VIZSGA MATEMATIKÁBÓL</h1> 
    <h2>2. feladat: űrlapfeldolgozás</h2>
    <form action="2.php" method="POST" novalidate>
        <label for="tanulo">Tanuló neve:</label>
        <input type="text" name="tanulo" id="tanulo" value="<?= $name ?? '' ?>">
        <?php if(isset($errors['tanulo'])): ?> <span><?= $errors['tanulo'] ?></span><?php endif; ?>
        <br>
        <label for="szazalek">Eredmény (%):</label>
        <input type="text" name="szazalek" id="szazalek" value="<?= $szazalek ?? '' ?>">
        <?php if(isset($errors['szazalek'])): ?> <span><?= $errors['szazalek'] ?></span><?php endif; ?>
        <br>
        <input type="checkbox" name="szobeli" id="szobeli" <?= isset($_POST['szobeli']) && $_POST['szobeli'] === 'on' ? 'checked' : '' ?>>
        <label for="szobeli">Szóbeli időpont szükséges</label>
        <?php if(isset($errors['szobeli'])): ?> <span><?= $errors['szobeli'] ?></span><?php endif; ?>
        <br>
        <button type="submit">Küldés</button>
    </form>
</body>
</html>