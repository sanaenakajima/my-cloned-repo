<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>簡易カレンダー - while構文</title>
    <style>
        .sunday {
            color: red;
        }
        .saturday {
            color: blue;
        }
        .day {
            padding: 1rem;
            display: inline-block;
            width: 2rem;
            text-align: center;
        }
    </style>
</head>
<body>
    <?php
    $i = 1;
    echo '<div>';
    while ($i <= 31) {
        // 曜日の計算: $iが1から始まるので、($i - 1) % 7を使う
        $dayOfWeek = ($i - 1) % 7;

        // 日曜日: 0, 土曜日: 6
        if ($dayOfWeek == 0) {
            echo '<span class="day sunday">' . $i . '</span>';
        } elseif ($dayOfWeek == 6) {
            echo '<span class="day saturday">' . $i . '</span>';
        } else {
            echo '<span class="day">' . $i . '</span>';
        }

        // 1週間ごとに改行
        if ($dayOfWeek == 6) {
            echo '<br>';
        }

        $i++;
    }
    echo '</div>';
    ?>
</body>
</html>
