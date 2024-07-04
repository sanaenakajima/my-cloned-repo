<?php
// 関数ファイルのインクルード
include 'prime_functions.php';

// 素数の目標数値
$maxNumber = 100;
$primes = get_primes_up_to($maxNumber);
?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>素数一覧</title>
</head>
<body>
    <h1>指定した数までの素数一覧</h1>
    <p>目標の数: <?php echo $maxNumber; ?></p>
    <ul>
        <?php foreach ($primes as $prime) {
            echo "<li>{$prime}</li>";
        } ?>
    </ul>
</body>
</html>
