<?php

$shapes = [
    [
      'type'    => 'rect',
      'params'  => [
        'x' => 0,
        'y' => 0,
        'width' => 50,
        'height' => 50,
        'rx' => 10,
      ]
    ],
    [
      'type'    => 'line',
      'params'  => [
        'x1' => 60,
        'y1' => 100,
        'x2' => 80,
        'y2' => 120,
        'stroke' => 'red',
      ]
    ],
    [
      'type'    => 'line',
      'params'  => [
        'x1' => 80,
        'y1' => 120,
        'x2' => 150,
        'y2' => 50,
        'stroke' => 'red',
      ]
    ],
    [
      'type'    => 'circle',
      'params'  => [
        'cx' => 150,
        'cy' => 100,
        'r' => 20,
      ]
    ],
  ];

function makeShape(array $shape): string {
    $params = "";

    foreach($shape['params'] as $key => $value) {
        $params .= "$key='$value'";
    }

    return "<{$shape['type']} $params></{$shape['type']}>";
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
    <h1>1. feladat</h1>
    <svg>
        <?php foreach($shapes as $shape): ?>
            <<?= $shape['type'] ?><?php foreach($shape['params'] as $key => $value): ?> <?= "$key='$value'" ?> <?php endforeach; ?>></<?= $shape['type'] ?>>
        <?php endforeach; ?>
    </svg>
    <svg>
        <?php foreach($shapes as $shape): ?>
            <?= makeShape($shape) ?>
        <?php endforeach; ?>
    </svg>
</body>
</html>