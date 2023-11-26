<?php

require_once 'StudentStorage.php';

$students = new StudentStorage();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $errors = [];
    
    $name = trim($_POST['name'] ?? '');

    if (strlen($name) === 0) {
        $errors['name'] = 'A név megadása kötelező.';
    }

    $age = trim($_POST['age'] ?? '');

    if (strlen($age) === 0) {
        $errors['age'] = 'A kor megadása kötelező.';
    } else {
        $parsedAge = filter_var($age, FILTER_VALIDATE_INT);

        if ($parsedAge === false) {
            $errors['age'] = 'A kornak egész számnak kell lennie.';
        } else {
            $age = $parsedAge;
        }
    }

    if (count($errors) === 0) {
        $students->add(['name' => $name, 'age' => $age]);
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Diák mentése</h1>
    <?php if(isset($errors) && count($errors) !== 0): ?>
        <ol>
        <?php foreach($errors as $error): ?>
            <li><?= $error ?></li>
        <?php endforeach; ?>
        </ol>
    <?php endif; ?>
    <form method="post">
    Név: <input type="text" name="name" /> <br>
    Kor: <input type="text" name="age" /> <br>
    <button type="submit">Diák mentése</button>
    </form>
    <ul>
        <?php foreach($students->findAll() as $student): ?>
            <li><?= "{$student['name']} ({$student['age']})" ?></li>
        <?php endforeach; ?>
    </ul>
</body>
</html>