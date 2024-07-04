<?php
$value = "1";

switch ($value) {
    case 1:
        echo '値は1です';
        break;
    case "1":
        echo '値は"1"です';
        break;
    default:
        echo '値はその他です';
}
?>
