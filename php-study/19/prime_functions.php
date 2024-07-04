<?php
// 素数をチェックする関数
function is_prime($num) {
    if ($num < 2) return false;
    for ($i = 2; $i <= sqrt($num); $i++) {
        if ($num % $i == 0) return false;
    }
    return true;
}

// 指定した数値までの素数を取得する関数
function get_primes_up_to($max) {
    $primes = [];
    for ($i = 2; $i <= $max; $i++) {
        if (is_prime($i)) {
            $primes[] = $i;
        }
    }
    return $primes;
}
?>
