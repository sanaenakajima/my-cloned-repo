class DogAPI {
  async getDogImage() {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      return data.message;
  }
}

const dogApi = new DogAPI();
const getDogImageButton = document.getElementById('getDogImageButton');
const dogImageContainer = document.getElementById('dogImageContainer');

async function handleGetDogImage() {
  const imageUrl = await dogApi.getDogImage();
  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;
  dogImageContainer.innerHTML = ''; // 既存の画像を削除
  dogImageContainer.appendChild(imageElement);
}

getDogImageButton.addEventListener('click', handleGetDogImage);
