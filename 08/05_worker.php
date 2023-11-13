<?php

var_dump($_GET);

$workers = [
    ['name' => 'KING', 'job' => 'PRESIDENT', 'salary' => 5000],
    ['name' => 'BLAKE', 'job' => 'MANAGER', 'salary' => 2850],
    ['name' => 'CLARK', 'job' => 'MANAGER', 'salary' => 2450],
    ['name' => 'JONES', 'job' => 'MANAGER', 'salary' => 2975],
    ['name' => 'MARTIN', 'job' => 'SALESMAN', 'salary' => 1250],
    ['name' => 'ALLEN', 'job' => 'SALESMAN', 'salary' => 1600],
    ['name' => 'TURNER', 'job' => 'SALESMAN', 'salary' => 1500],
    ['name' => 'JAMES', 'job' => 'CLERK', 'salary' => 950],
    ['name' => 'WARD', 'job' => 'SALESMAN', 'salary' => 1250],
    ['name' => 'FORD', 'job' => 'ANALYST', 'salary' => 3000]
];

$filtered_workers =  isset($_GET['emp_name'])
    ? array_filter($workers, fn($w) => str_contains($w['name'], trim($_GET['emp_name'])))
    : $workers;

$jobs = array_unique(array_map(fn($w) => $w['job'], $workers));

$filtered_workers =  isset($_GET['job']) && strlen($_GET['job']) !== 0
    ? array_filter($filtered_workers, fn($w) => $w['job'] === $_GET['job'])
    : $filtered_workers;

$max = max(...array_map(fn($w) => $w['salary'] , $workers));
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form action='' method='get'>
    <label for='name'>Név</label>
    <input id='name' name='emp_name' value='<?= $_GET['emp_name'] ?? '' ?>'>

    <label for='job'>Foglalkozás</label>
    <select id='job' name='job'>
        <option></option>
        <?php foreach ($jobs as $job): ?>
            <option <?php if(isset($_GET['job']) && $_GET['job'] == $job): ?> selected <?php endif; ?>><?= $job ?></option>
        <?php endforeach; ?>
    </select>
    <button>Szűrés</button>
</form>
<table>
    <thead>
    <tr>
        <th>Név</th>
        <th>Foglalkozás</th>
        <th>Fizetés</th>
    </tr>
    </thead>
    <tbody>
        <?php foreach ($filtered_workers as $worker): ?>
            <tr <?php if($worker['salary'] === $max): ?> style='background-color: orange' <?php endif; ?>>
                <td><?= $worker['name'] ?></td>
                <td><?= $worker['job'] ?></td>
                <td><?= $worker['salary'] ?></td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>
</body>
</html>
