<?php

$torzslapok = json_decode(file_get_contents('vizsgazok.json'), true);

if (array_key_exists($_GET['id'], $torzslapok)) {
    $torzslapok[$_GET['id']] = true;

    file_put_contents('vizsgazok.json', json_encode($torzslapok, JSON_PRETTY_PRINT));
}

$elkonyvelt = array_filter($torzslapok, fn($elkonyvelt) => $elkonyvelt);
$nemelk = array_diff($torzslapok, $elkonyvelt);

file_put_contents('statisztika.txt', round(count($elkonyvelt) / count($torzslapok) * 100, 2) . '%')

?>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>PHP ZH - 3. feladat</title>
</head>
<body>
    <h1>ÉRETTSÉGI VIZSGA MATEMATIKÁBÓL</h1>
    <h2>3. feladat: adattárolás</h2>
    <h3>Könyvelt törzslapok</h3>

    <ul>
    <?php foreach($elkonyvelt as $lap => $el): ?>
        <li><?= $lap ?></li>
    <?php endforeach; ?>
    </ul>

    <h3>Hiányos törzslapok</h3>
    

    <ul>
    <?php foreach($nemelk as $lap => $el): ?>
        <li><a href="?id=<?= $lap ?>"><?= $lap ?></a></li>
    <?php endforeach; ?>
    </ul>
    
</body>
</html>