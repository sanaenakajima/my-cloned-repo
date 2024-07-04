<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>二次元配列の表示</title>
</head>
<body>
    <?php
    // 山手線と田園都市線の駅名を二次元配列に格納
    $stations = [
        "山手線" => ["東京", "上野", "新宿"],
        "田園都市線" => ["渋谷", "二子玉川", "溝の口"]
    ];

    // 二次元配列の値を一つずつ表示
    foreach ($stations as $line => $lineStations) {
        echo "<h2>$line</h2>";
        echo "<ul>";
        foreach ($lineStations as $station) {
            echo "<li>$station</li>";
        }
        echo "</ul>";
    }
    ?>
</body>
</html>
