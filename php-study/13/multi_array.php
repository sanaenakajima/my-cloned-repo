<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>多次元配列の表示 - for構文</title>
</head>
<body>
    <?php
    // 山手線と田園都市線の駅名を多次元配列に格納
    $stations = [
        "山手線" => ["東京", "上野", "新宿"],
        "田園都市線" => ["渋谷", "二子玉川", "溝の口"]
    ];

    // 多次元配列の値を一つずつ表示 (for構文を使用)
    $lines = array_keys($stations);
    for ($i = 0; $i < count($lines); $i++) {
        $line = $lines[$i];
        echo "<h2>$line</h2>";
        echo "<ul>";
        for ($j = 0; $j < count($stations[$line]); $j++) {
            echo "<li>" . $stations[$line][$j] . "</li>";
        }
        echo "</ul>";
    }
    ?>
</body>
</html>
