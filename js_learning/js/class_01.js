class Character {
    constructor(name, rank) {
        this.name = name;
        this.rank = rank;
    }
}

class Gacha {
    constructor(characters) {
        this.characters = characters;
        this.drawCount = 0;
    }

    drawCharacter() {
        const randomIndex = Math.floor(Math.random() * this.characters.length);
        const drawnCharacter = this.characters[randomIndex];
        return drawnCharacter;
    }

    draw() {
        const result = this.drawCharacter();
        console.log("引いたキャラ:", result);
        this.drawCount++;
        console.log("引いた回数:", this.drawCount);
    }
}

// キャラクターのリスト
const characters = [
    new Character("キャラA", "A"),
    new Character("キャラB", "B"),
    new Character("キャラC", "C")
];

// ガチャのインスタンスを作成
const gacha = new Gacha(characters);

// ガチャボタンの要素を取得
const gachaButton = document.getElementById('gachaButton');

// ガチャボタンがクリックされた時の処理
gachaButton.addEventListener('click', () => {
    // ガチャを引いて結果を表示
    gacha.draw();
});
