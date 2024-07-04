<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>連想配列の表示 - foreach構文</title>
</head>
<body>
    <?php
    // 保有スキルを連想配列に格納
    $skills = [
        "プログラミング言語" => "PHP, JavaScript, TypeScript",
        "フレームワーク" => "Laravel, React",
        "データベース" => "MySQL, PostgreSQL",
        "その他のスキル" => "普通運転免許, 飲酒, プレゼンテーション"
    ];

    // 連想配列の値を一つずつ表示 (foreach構文を使用)
    foreach ($skills as $category => $skill) {
        echo "<p><strong>$category:</strong> $skill</p>";
    }
    ?>
</body>
</html>
