<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>一次元配列の表示 - for構文</title>
</head>
<body>
    <?php
    // 好きな食べ物の配列を作成
    $favoriteFoods = ["寿司", "ラーメン", "カレーライス", "ピザ", "ステーキ"];

    // 配列の値を一つずつ表示 (for構文を使用)
    for ($i = 0; $i < count($favoriteFoods); $i++) {
        echo '<p>' . $favoriteFoods[$i] . '</p>';
    }
    ?>
</body>
</html>
