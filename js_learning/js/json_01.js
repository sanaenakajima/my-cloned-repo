// DogAPIクラスの定義
class DogAPI {
  // getDogImageメソッド: Dog APIからランダムな犬の画像URLを取得する
  async getDogImage() {
      // fetch()メソッドを使用してDog APIからデータを取得する
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      // fetch()メソッドが返すPromiseが解決されると、レスポンスのJSONデータを取得する
      const data = await response.json();
      // 取得したJSONデータから画像のURLを抽出して返す
      return data.message;
  }
}

// DogAPIクラスのインスタンスを生成する
const dogApi = new DogAPI();

// HTML要素からボタンと画像コンテナを取得する
const getDogImageButton = document.getElementById('getDogImageButton');
const dogImageContainer = document.getElementById('dogImageContainer');

// handleGetDogImage関数: ボタンクリック時に実行されるイベントハンドラ
async function handleGetDogImage() {
  // DogAPIから画像のURLを取得する
  const imageUrl = await dogApi.getDogImage();
  // 新しいimg要素を作成し、取得した画像のURLを設定する
  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;
  // 既存の画像を削除してから、新しい画像を画像コンテナに追加する
  dogImageContainer.innerHTML = ''; // 既存の画像を削除
  dogImageContainer.appendChild(imageElement);
}

// ボタンにclickイベントリスナーを追加し、ボタンがクリックされた時にhandleGetDogImage関数を実行する
getDogImageButton.addEventListener('click', handleGetDogImage);

