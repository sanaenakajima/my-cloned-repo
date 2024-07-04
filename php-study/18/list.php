<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>課題一覧</title>
    <!-- BootstrapのCSSを読み込み -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container">
    <h1 class="my-4">課題一覧</h1>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>課題名</th>
                <th>ファイル名</th>
            </tr>
        </thead>
        <tbody>
            <?php
            // 課題一覧を多次元配列で定義
            $tasks = [
                ['name' => '始めてのPHP', 'file' => '../02/echo.php'],
                ['name' => '変数と代入', 'file' => '../04/variable.php'],
                ['name' => '論理演算子', 'file' => '../06/logical.php'],
                ['name' => '制御構文 - 条件(if / switch)', 'file' => '../08/if.php'],
                ['name' => '制御構文 - 条件(if / switch)', 'file' => '../08/switch.php'],
                ['name' => '制御構文 - 条件(for / while)', 'file' => '../03/calendar_while.php'],
                ['name' => '制御構文 - 条件(for / while)', 'file' => '../03/calendar.php'],
                ['name' => '配列とは/一次元配列', 'file' => '../10/array.php'],
                ['name' => '多次元配列', 'file' => '../11/multi_array.php'],
                ['name' => '連想配列', 'file' => '../12/associative_array.php'],
                ['name' => '制御構文と配列', 'file' => '../13/array.php'],
                ['name' => '制御構文と配列', 'file' => '../13/multi_array.php'],
                ['name' => '連想配列の課題をforeach構文で表示', 'file' => '../13/foreach.php'],
                ['name' => '文字列を整数型に変換', 'file' => '../14/cast.php'],
                ['name' => '商品ランプを光らせる関数', 'file' => '../15/custom_function.php'],
            ];

            // 課題一覧をループで表示
            foreach ($tasks as $task) {
                echo '<tr>';
                echo '<td>' . htmlspecialchars($task['name']) . '</td>';
                echo '<td><a href="' . htmlspecialchars($task['file']) . '">' . htmlspecialchars(basename($task['file'])) . '</a></td>';
                echo '</tr>';
            }
            ?>
        </tbody>
    </table>
</div>
</body>
</html>
