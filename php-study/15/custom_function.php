<?php

function canPurchase($itemName, $insertedAmount) {
    // 商品一覧を連想配列で定義
    $items = [
        'cola' => 140,
        'orange' => 150,
        'monster' => 200,
    ];

    // 商品が存在するか確認
    if (array_key_exists($itemName, $items)) {
        // 投入金額が商品価格以上であれば購入可能
        if ($insertedAmount >= $items[$itemName]) {
            return true;
        }
    }

    return false;
}

// テストケース
$itemName = 'cola';
$insertedAmount = 150;

if (canPurchase($itemName, $insertedAmount)) {
    echo "購入可能です: $itemName\n";
} else {
    echo "購入不可能です: $itemName\n";
}

$itemName = 'monster';
$insertedAmount = 150;

if (canPurchase($itemName, $insertedAmount)) {
    echo "購入可能です: $itemName\n";
} else {
    echo "購入不可能です: $itemName\n";
}
?>
