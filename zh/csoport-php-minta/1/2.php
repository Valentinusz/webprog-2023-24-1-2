<?php

$students = [
    ['name' => 'Student1', 'age' => 20],
    ['name' => 'Student2', 'age' => 10],
    ['name' => 'Student3', 'age' => 30],
    ['name' => 'Student4', 'age' => 20],
    ['name' => 'Student5', 'age' => 10],
];


if (isset($_GET['age']) && filter_var($_GET['age'], FILTER_VALIDATE_INT)) {
    $age = intval($_GET['age']);
    $students = array_filter($students, fn($student) => $student['age'] === $age);
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
    <ul>
        <?php foreach($students as $student): ?>
            <li><?= "{$student['name']} ({$student['age']})" ?></li>
        <?php endforeach; ?>
    </ul>
</body>
</html>