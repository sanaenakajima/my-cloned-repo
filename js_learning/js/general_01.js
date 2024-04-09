document.addEventListener("DOMContentLoaded", function() {
  const postForm = document.getElementById('post-form');
  const postList = document.getElementById('post-list');
  const modal = document.getElementById('modal');
  const confirmDeleteButton = document.getElementById('confirm-delete');
  const closeModalButtons = document.querySelectorAll('.close-modal');

  // JSONPlaceholder APIのベースURL
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  // 投稿一覧を取得する関数
  async function fetchPosts() {
      try {
          const response = await fetch(apiUrl);
          const posts = await response.json();
          displayPosts(posts);
      } catch (error) {
          console.error('Error fetching posts:', error);
      }
  }

  // 投稿一覧を表示する関数
  function displayPosts(posts) {
      postList.innerHTML = '';
      posts.forEach(post => {
          // ダミーの記事（IDが100未満）は表示しない
          if (post.id >= 100) {
              const postItem = document.createElement('div');
              postItem.classList.add('post-item');
              postItem.innerHTML = `
                  <h3>${post.title}</h3>
                  <p>${post.body}</p>
                  <div class="edit-delete-buttons">
                      <button class="edit-button" data-id="${post.id}">編集</button>
                      <button class="delete-button" data-id="${post.id}">削除</button>
                  </div>
              `;
              postList.appendChild(postItem);
          }
      });
  }

  // ページ読み込み時に投稿一覧を取得
  fetchPosts();

  // モーダルを閉じる関数
  function closeModal() {
      modal.style.display = 'none';
  }

  // 削除ボタンがクリックされた時の処理
  function handleDeleteButtonClick(event) {
      const postId = event.target.dataset.id;
      showModal(postId);
  }

  // 削除確認モーダルを表示する関数
  function showModal(postId) {
      modal.style.display = 'block';
      confirmDeleteButton.dataset.id = postId;
  }

  // キャンセルボタンがクリックされた時の処理
  function handleCloseModalButtonClick(event) {
      closeModal();
  }

  // 削除確認モーダルで削除ボタンがクリックされた時の処理
  async function handleConfirmDeleteButtonClick(event) {
      const postId = event.target.dataset.id;
      try {
          const response = await fetch(`${apiUrl}/${postId}`, {
              method: 'DELETE'
          });
          if (!response.ok) {
              throw new Error('削除に失敗しました。');
          }
          closeModal();
          fetchPosts();
      } catch (error) {
          console.error('Error deleting post:', error);
      }
  }

  // 削除ボタンがクリックされた時のイベントリスナーを設定
  postList.addEventListener('click', function(event) {
      if (event.target.classList.contains('delete-button')) {
          handleDeleteButtonClick(event);
      }
  });

  // キャンセルボタンがクリックされた時のイベントリスナーを設定
  closeModalButtons.forEach(button => {
      button.addEventListener('click', handleCloseModalButtonClick);
  });

  // 削除確認モーダルで削除ボタンがクリックされた時のイベントリスナーを設定
  confirmDeleteButton.addEventListener('click', handleConfirmDeleteButtonClick);

  // 投稿フォームが送信された時の処理
  postForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
      
      // バリデーション
      if (!title || !content) {
          alert('タイトルと内容は必須項目です。');
          return;
      }
      
      try {
          const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  title,
                  body: content,
                  userId: 1
              })
          });
          if (!response.ok) {
              throw new Error('投稿に失敗しました。');
          }
          fetchPosts();
      } catch (error) {
          console.error('Error posting:', error);
      }
      // 投稿後にフォームをクリアする
      postForm.reset();
  });

});
