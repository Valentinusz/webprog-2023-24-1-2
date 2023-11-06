<?php
$errors = ['A', 'B', 'C', 'D', 'E'];
$categories = [5 => "Akció", 4 => "Dráma", 8 => "Vígjáték"];
$products = [23 => "Pendrive", 15 => "HDD", 12 => "SSD", 9 => "RAM"];

class Question {
}

$questions = [
//        5 => new Question('Első kérdés szövege.', ['A', 'B', 'C'], [2]),
//        6 => new Question('Második kérdés szövege.', ['A', 'B', 'C', 'D'], [0, 1])
];

$students = [
    ["name" => "Peter Kovacs", "neptun" => "ABC123", "birth_year" => 1990, "gender" => "Male"],
    ["name" => "Anna Toth", "neptun" => "DEF456", "birth_year" => 1985, "gender" => "Female"],
    ["name" => "Gabor Nagy", "neptun" => "GHI789", "birth_year" => 1972, "gender" => "Male"],
    ["name" => "Emese Kiss", "neptun" => "JKL012", "birth_year" => 1995, "gender" => "Female"],
    ["name" => "Adam Szabo", "neptun" => "MNO345", "birth_year" => 1998, "gender" => "Male"],
];

$nev = "Bálint";

function factorial(int $n): int {
    if ($n < 2) {
        return 1;
    }

    return $n * factorial($n - 1);
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>7. gyakorlat</h1>
<div>
    <h2>1.</h2>
    <?php echo '<h3>Címsor</h3>' ?>
    <?= '<h3>Címsor</h3>' ?>
    <h3>Címsor</h3>
    <h3>Helló <?= $nev ?>!</h3>
</div>
<div><?= date("Y-m-d H:i:s"); ?></div>
<div>
    <?php $nums = [1, 2, 3, 4, 5] ?>
    <?php foreach ($nums as $num): ?>
        <div><?= factorial($num) ?></div>
    <?php endforeach; ?>
</div>
<div>
    <?php for ($i = 0; $i < 10; $i++): ?>
        <h3 style='font-size: <?= 1 + $i * 0.25 ?>rem'>Helló világ!</h3>
    <?php endfor; ?>
</div>
<div>
    <ol>
        <?php foreach ($errors as $error): ?>
            <li><?= $error ?></li>
        <?php endforeach; ?>
    </ol>
</div>
<div>
    <select>
        <?php foreach ($categories as $id => $name): ?>
            <option value='<?= $id ?>'><?= $name ?></option>
        <?php endforeach; ?>
    </select>
</div>

<div>
    <?php if (count($students) == 0): ?>
        <div>Nincs tanuló!</div>
    <?php else: ?>
        <table>
            <thead>
            <tr>
                <th>Név</th>
                <th>Neptun</th>
                <th>Születés</th>
                <th>Nem</th>
            </tr>
            </thead>
            <tbody>
                <?php foreach ($students as $student): ?>
                    <tr>
                        <td><?= $student['name'] ?></td>
                        <td><?= $student['neptun'] ?></td>
                        <td><?= $student['birth_year']  ?></td>
                        <td><?= $student['gender'] ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>
</div>
</body>
</html>