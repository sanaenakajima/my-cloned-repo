// DogAPIクラスの定義
class DogAPI {
    // constructorメソッド: APIのベースURLを設定する
    constructor() {
        this.baseUrl = 'https://dog.ceo/api/';
    }

    // getRandomDogImagesメソッド: 指定された枚数のランダムな犬の画像URLを取得する
    getRandomDogImages = async (count) => {
        try {
            const response = await fetch(`${this.baseUrl}breeds/image/random/${count}`);
            const data = await response.json();
            console.log('API Response:', data); // APIのレスポンスをコンソールに出力
            return data.message; // 画像URLの配列を返す
        } catch (error) {
            console.error('Error fetching dog images:', error); // エラーログをコンソールに出力
            return [];
        }
    }
}

// DogAPIクラスのインスタンスを生成する
const dogApi = new DogAPI();

// HTML要素からボタンと画像コンテナを取得する
const getDogImagesButton = document.getElementById('getDogImagesButton');
const dogImagesContainer = document.getElementById('dogImagesContainer');

// handleGetDogImages関数: ボタンクリック時に実行されるイベントハンドラ
const handleGetDogImages = async () => {
    const count = parseInt(document.getElementById('imageCountInput').value); // 入力された枚数を取得
    const imageUrls = await dogApi.getRandomDogImages(count); // 指定された枚数の犬の画像URLを取得
    displayDogImages(imageUrls); // 画像を表示する
}

// displayDogImages関数: 取得した犬の画像URLをHTML上に表示する
const displayDogImages = (imageUrls) => {
    dogImagesContainer.innerHTML = ''; // 既存の画像を削除
    imageUrls.forEach(imageUrl => {
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        dogImagesContainer.appendChild(imageElement); // 画像を画像コンテナに追加
    });
}

// ボタンにclickイベントリスナーを追加し、ボタンがクリックされた時にhandleGetDogImages関数を実行する
getDogImagesButton.addEventListener('click', handleGetDogImages);
