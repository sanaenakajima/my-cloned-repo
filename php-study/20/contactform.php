<?php
session_start();
$mode = 'input';
$errmessage = array();

$admin_email = 'admin@example.com'; // 管理者のメールアドレス

if (isset($_POST['back']) && $_POST['back']) {
    // 何もしない
} else if (isset($_POST['confirm']) && $_POST['confirm']) {
    // 確認画面
    if (!$_POST['fullname']) {
        $errmessage['fullname'] = "名前を入力してください";
    } else if (mb_strlen($_POST['fullname']) > 100) {
        $errmessage['fullname'] = "名前は100文字以内にしてください";
    }
    $_SESSION['fullname'] = htmlspecialchars($_POST['fullname'], ENT_QUOTES);

    if (!$_POST['email']) {
        $errmessage['email'] = "Eメールを入力してください";
    } else if (mb_strlen($_POST['email']) > 200) {
        $errmessage['email'] = "Eメールは200文字以内にしてください";
    } else if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $errmessage['email'] = "メールアドレスが不正です";
    }
    $_SESSION['email'] = htmlspecialchars($_POST['email'], ENT_QUOTES);

    if (!$_POST['message']) {
        $errmessage['message'] = "お問い合わせ内容を入力してください";
    } else if (mb_strlen($_POST['message']) > 500) {
        $errmessage['message'] = "お問い合わせ内容は500文字以内にしてください";
    }
    $_SESSION['message'] = htmlspecialchars($_POST['message'], ENT_QUOTES);

    if ($errmessage) {
        $mode = 'input';
    } else {
        $mode = 'confirm';
    }
} else if (isset($_POST['send']) && $_POST['send']) {
    // 送信ボタンを押したとき
    $message = "お問い合わせを受け付けました \r\n"
        . "名前: " . $_SESSION['fullname'] . "\r\n"
        . "email: " . $_SESSION['email'] . "\r\n"
        . "お問い合わせ内容:\r\n"
        . preg_replace("/\r\n|\r|\n/", "\r\n", $_SESSION['message']);

    // メール設定をini_setで設定する（MailDevの設定）
    ini_set('SMTP', 'localhost'); // MailDevが動作しているローカルホストを指定
    ini_set('smtp_port', '1025'); // MailDevのポートを指定

    // メール送信
    $headers = "From: " . $_SESSION['email'] . "\r\n";
    $headers .= "Reply-To: " . $_SESSION['email'] . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $mail_sent = mail($admin_email, 'お問い合わせがありました', $message, $headers);

    if ($mail_sent) {
        echo 'メッセージは正常に送信されました';
    } else {
        echo 'メッセージの送信に失敗しました';
    }

    $_SESSION = array();
    $mode = 'send';
} else {
    $_SESSION['fullname'] = "";
    $_SESSION['email'] = "";
    $_SESSION['message'] = "";
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>お問い合わせフォーム</title>
    <style>
        .error {
            color: red;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>お問い合わせフォーム</h1>
        <?php if ($mode == 'input') { ?>
            <!-- 入力画面 -->
            <form action="./contactform.php" method="post">
                <div class="form-group">
                    <label for="fullname">名前（必須、100文字以内）:</label>
                    <input type="text" id="fullname" name="fullname" maxlength="100" value="<?php echo $_SESSION['fullname']; ?>">
                    <?php if (isset($errmessage['fullname'])) { ?>
                        <span class="error"><?php echo $errmessage['fullname']; ?></span>
                    <?php } ?>
                </div>
                <div class="form-group">
                    <label for="email">Eメール（必須、200文字以内）:</label>
                    <input type="email" id="email" name="email" maxlength="200" value="<?php echo $_SESSION['email']; ?>">
                    <?php if (isset($errmessage['email'])) { ?>
                        <span class="error"><?php echo $errmessage['email']; ?></span>
                    <?php } ?>
                </div>
                <div class="form-group">
                    <label for="message">お問い合わせ内容（必須、500文字以内）:</label>
                    <textarea id="message" name="message" cols="40" rows="8"><?php echo $_SESSION['message']; ?></textarea>
                    <?php if (isset($errmessage['message'])) { ?>
                        <span class="error"><?php echo $errmessage['message']; ?></span>
                    <?php } ?>
                </div>
                <input type="submit" name="confirm" value="確認" />
            </form>
        <?php } else if ($mode == 'confirm') { ?>
            <!-- 確認画面 -->
            <form action="./contactform.php" method="post">
                名前: <?php echo $_SESSION['fullname'] ?><br>
                Eメール: <?php echo $_SESSION['email'] ?><br>
                お問い合わせ内容:<br>
                <?php echo nl2br($_SESSION['message']) ?><br>
                <input type="submit" name="back" value="戻る" />
                <input type="submit" name="send" value="送信" />
            </form>
        <?php } else { ?>
            <!-- 完了画面 -->
            <h1>送信完了</h1>
            <p>送信しました。お問い合わせありがとうございました。</p>
        <?php } ?>
    </div>
</body>
</html>
