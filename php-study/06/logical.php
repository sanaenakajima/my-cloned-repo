<?php

$true = true; // 変数の復習のため、変数$trueに true を代入しています
$false = false;

$a = $true && $true;
$b = $true && $false;
$c = $true && $true && $true;
$d = $true && $false && $false;
$e = $true && ($true || $false);

var_dump($a);
var_dump($b);
var_dump($c);
var_dump($d);
var_dump($e);