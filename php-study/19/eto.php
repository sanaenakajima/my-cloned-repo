<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>1990年から今年までの干支一覧</title>
</head>
<body>
    <table border="1">
        <thead>
            <tr>
                <th>西暦</th>
                <th>干支</th>
            </tr>
        </thead>
        <tbody>
            <?php
                $zodiac = ["子（ねずみ）", "丑（うし）", "寅（とら）", "卯（うさぎ）", "辰（たつ）", "巳（へび）", "午（うま）", "未（ひつじ）", "申（さる）", "酉（とり）", "戌（いぬ）", "亥（いのしし）"];
                $startYear = 1990;
                $currentYear = date("Y");

                for ($year = $startYear; $year <= $currentYear; $year++) {
                    $index = ($year - 1990 + 6) % 12;  // 1990年の干支が午（うま）なので、干支の配列に6を足して調整する
                    echo "<tr>";
                    echo "<td>{$year}</td>";
                    echo "<td>{$zodiac[$index]}</td>";
                    echo "</tr>";
                }
            ?>
        </tbody>
    </table>
</body>
</html>
