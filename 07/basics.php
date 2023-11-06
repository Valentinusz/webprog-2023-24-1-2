<?php

# komment
// komment
/* többsoros */

$valtozo = "asd";

// típusok

$intVal = 1_000_000;
$floatVal = 3.14;

$str = '$valtozo';
$strSub = "{$valtozo}dsdas";

// `` nem string -> ne használjuk

$trueval = true;
$falseval = false;

$nullval = null;

// array
// asszociatív

$array = [
    3 => "asdasdasd",
    'elso' => "asd", // = >
    1 => "asd"
];

$array['harmadik'] = "asdasdsd";
$array[] = 'asdasdasd';

// debug

var_dump($array);

echo '<pre>';
print_r($array);
echo '</pre>';

var_export($array);


abstract class Obj {
    public int $asd;
    private $sadasda;
    protected $asdasd;

    public function __construct(int $asd) {
    }
}


function asd(int $a): int {
    return $a + 1;
}

$asd2 = function(int $a) {
    return $a + 1;
};

$asd3 = fn(int $a) => $a + 1;


$b = 5;

function a(int $a): int {
    global $b;
    return $a + $b;
}

$a2 = function(int $a) use ($b) {
    return $a + 1;
};

$asd3 = fn(int $a) => $a + 1;

function modify_array(array &$arr, mixed $key, mixed $value) {
    $arr[$key] = $value;
}

$arr2 = [1, 2, 3];
$arr3 = &$arr2;

echo '</br>';

var_dump($arr2);

modify_array($arr3, 2, 4);

echo '</br>';

var_dump($arr2);

