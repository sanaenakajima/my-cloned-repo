<?php
// 現在時刻の分を取得
$minutes = date('i');

// 文字列型の分を数値型に変換
$minutesInt = intval($minutes);

// 偶数か奇数かを判定して表示
if ($minutesInt % 2 === 0) {
    echo "現在の分は偶数です: $minutesInt 分";
} else {
    echo "現在の分は奇数です: $minutesInt 分";
}
?>
