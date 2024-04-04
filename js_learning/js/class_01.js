
//'Character'クラスは、キャラクターを表すオブジェクトを作成するためのクラス 
//'constructor(name, rank)'メソッドは、キャラクターの名前とランクを受け取り、新しいキャラクターオブジェクトを作成
class Character {
    constructor(name, rank) {
        this.name = name;
        this.rank = rank;
    }
}

//'Gacha'クラスは、ガチャを表すオブジェクトを作成するためのクラス
//'constructor(characters)'メソッドは、キャラクターの配列を受け取り、新しいガチャオブジェクトを作成.drawCountを初期化
class Gacha {
    constructor(characters) {
        this.characters = characters;
        this.drawCount = 1;
    }

//'drawCharacter()'メソッドは、ガチャからキャラクターをランダムに引くメソッド
    drawCharacter() {
        const randomIndex = Math.floor(Math.random() * this.characters.length);
        const drawnCharacter = this.characters[randomIndex];
        return drawnCharacter;
    }
//'draw()'メソッドは、'drawCharacter()'を呼び出してキャラクターを引き、引いたキャラクターと引いた回数をコンソールに表示
    draw() {
        const result = this.drawCharacter();
    console.log(
        "ガチャの結果は・・・ランク" + result.rank + "の" + result.name + "が当たりました！\n" +
        "現在ガチャを" + this.drawCount + "回引きました"
    );
    this.drawCount++;
}
}

// キャラクターのリスト
const characters = [
    new Character("キャラA", getRandomRank()),
    new Character("キャラB", getRandomRank()),
    new Character("キャラC", getRandomRank())
];

// ランダムなランクを生成する関数
function getRandomRank() {
    const ranks = ['A', 'B', 'C'];
    const randomIndex = Math.floor(Math.random() * ranks.length);
    return ranks[randomIndex];
}

// ガチャのインスタンスを作成
const gacha = new Gacha(characters);

// ガチャボタンの要素を取得
const gachaButton = document.getElementById('gachaButton');

// ガチャボタンがクリックされた時の処理
gachaButton.addEventListener('click', () => {
    // ガチャを引いて結果を表示
    gacha.draw();
});
