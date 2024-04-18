class PostManager {
    constructor() {
        //現在編集中かどうかを追跡するフラグ
        this.isEditing = false;
        //現在編集中の記事のID
        this.currentEditingId = null;
        //フォームが送信されたかどうかを追跡するフラグ
        this.hasSubmitted = false;
        //初期化メソッドを呼び出す
        this.init();
    }

    //初期化メソッド
    init() {
        //フォームの記事の表示コンテナなどの要素を取得し、イベントリスナーを追加する
        this.postForm = document.getElementById('post-form');
        this.articlesContainer = document.getElementById('posted-articles-container');
        this.submitButton = this.postForm.querySelector('button[type="submit"]');
        this.addEventListeners();
        //初期表示に記事の表示を更新する
        this.updateArticlesContainer();
    }

    //イベントリスナーを追加するメソッド
    addEventListeners() {
        //フォーム送信イベントを処理する
        this.postForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        //記事のアクション（編集や削除）を処理する
        this.articlesContainer.addEventListener('click', (e) => this.handleArticleActions(e));
    }

    ///フォームの送信を処理するメソッド
async handleFormSubmit(e) {
    e.preventDefault();
    if (this.hasSubmitted) return;

    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();
    const method = this.isEditing ? 'PATCH' : 'POST';
    const postId = this.isEditing ? `/${this.currentEditingId}` : '';

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
            method,
            body: JSON.stringify({ title, content }),     
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const post = await response.json();
        this.updateDOM(post, title, content); 
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to post or update the article.');
    } finally {
        this.postForm.reset();
        this.submitButton.disabled = true;
        this.hasSubmitted = true;
    }
}

//記事の更新を行うメソッド
async performUpdate(id, title, content, article) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ title,content }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // UIを更新する部分
        article.querySelector('.posted-article__title').textContent = title;
        article.querySelector('.posted-article__content').textContent = content;
        this.resetActionButtons(article);
        this.isEditing = false;
    } catch (error) {
        console.error('Error updating post:', error);
        alert('Failed to update the post.');
    }
}

    //DOMを更新するメソッド
updateDOM(post, title, content) {
    const newPostId = this.isEditing ? this.currentEditingId : post.id;
    this.addPostToDOM(newPostId, title, content, !this.isEditing);
    this.isEditing = false;
    this.currentEditingId = null;
}

    //DOMに記事を追加するメソッド
    addPostToDOM(id, title, content, reset) {
        //記事のHTMLを制作
        const postHTML = `
            <div class="posted-article" data-id="${id}">
                <span class="posted-article__label">タイトル</span>
                <p class="posted-article__title">${title}</p>
                <span class="posted-article__label">記事内容</span>
                <p class="posted-article__content">${content}</p>
                <div class="posted-article__actions">
                    <button class="post__button post__button--edit">編集</button>
                    <button class="post__button post__button--delete">削除</button>
                </div>
            </div>
        `;
        //記事を追加または置換する
        if (reset) {
            this.articlesContainer.innerHTML = postHTML;
        } else {
            this.articlesContainer.insertAdjacentHTML('beforeend', postHTML);
        }
    }

    //記事のアクションを処理するメソッド
    handleArticleActions(e) {
        //クリックされた要素を取得
        const target = e.target;
        //編集ボタンがクリックされた場合
        if (target.classList.contains('post__button--edit')) {
            const article = target.closest('.posted-article');
            if (!this.isEditing) {
                this.isEditing = true;
                this.editArticle(article);
            }
        } else if (target.classList.contains('post__button--delete')) {
            //削除ボタンがクリックされた場合
            const article = target.closest('.posted-article');
            const postId = article.dataset.id;
            const title = article.querySelector('.posted-article__title').textContent;
            const content = article.querySelector('.posted-article__content').textContent;
            this.showModal(title, content, 'この記事を削除しますか？', () => {
                this.deletePost(postId, article);
            });
        }
    }

    //記事を削除するメソッド
async deletePost(postId, article) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 記事をDOMから削除し、記事コンテナを更新
        article.remove();
        this.updateArticlesContainer();
        // 送信ボタンを再び有効化する
        this.enableSubmitButton();
    } catch (error) {
        // エラーが発生した場合はコンソールにエラーメッセージを出力し、アラートを表示
        console.error('Error deleting post:', error);
        alert('Error deleting post');
    }
}

    //記事コンテナを更新するメソッド
    updateArticlesContainer() {
        //記事がまだ１つも投稿されていない場合
        if (!this.articlesContainer.children.length) {
            this.articlesContainer.innerHTML = `
                <div class="posted-article">
                    <span class="posted-article__label">タイトル</span>
                    <span class="posted-article__label">記事内容</span>
                    <div class="posted-article__actions">
                        <button class="post__button post__button--edit" disabled>編集</button>
                        <button class="post__button post__button--delete" disabled>削除</button>
                    </div>
                </div>
            `;
        }
    }

    //送信ボタンを有効化するメソッド
    enableSubmitButton() {
        this.submitButton.disabled = false;
        this.hasSubmitted = false;
    }

    //記事の編集を行うメソッド
    editArticle(article) {
        //記事のIDと元のタイトル・内容の取得
        const id = article.dataset.id;
        const titleElement = article.querySelector('.posted-article__title');
        const contentElement = article.querySelector('.posted-article__content');
        const originalTitle = titleElement.textContent;
        const originalContent = contentElement.textContent;
    
        //編集用の入力フィールドに変更
        titleElement.innerHTML = `<input type="text" value="${originalTitle}" class="edit-input title">`;
        contentElement.innerHTML = `<textarea class="edit-input content">${originalContent}</textarea>`;
    
        //編集用のボタンを表示
        article.querySelector('.posted-article__actions').innerHTML = `
            <button class="post__button post__button--cancel">キャンセル</button>
            <button class="post__button post__button--update">更新</button>
        `;
    
        // 更新ボタンのクリックイベントリスナーを追加
        article.querySelector('.post__button--update').addEventListener('click', () => {
            //更新されたタイトルと内容を取得し、確認モーダル表示
            const updatedTitle = titleElement.querySelector('.edit-input.title').value;
            const updatedContent = contentElement.querySelector('.edit-input.content').value;
            this.showModal(updatedTitle, updatedContent, 'この記事を更新しますか？', () => {
                //更新を確認したら更新処理を実行
                this.performUpdate(id, updatedTitle, updatedContent, article);
            });
        });
    
        //キャンセルボタンのクリックイベントリスナーを追加
        article.querySelector('.post__button--cancel').addEventListener('click', () => {
            //編集をキャンセルし、元のタイトルと内容を復元
            this.cancelEdit(article, originalTitle, originalContent);
        });
    }
    
    //編集用モーダルを表示するメソッド
    showModal(title, content, question, onConfirm) {
        //モーダル要素とその中の要素を取得
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('modal-content');
        const modalQuestion = document.getElementById('modal-question');
        //モーダルにタイトル、内容、質問を設定
        modalTitle.textContent = `タイトル: ${title}`;
        modalContent.textContent = `記事内容: ${content}`;
        modalQuestion.textContent = question;

        //モーダルを表示し、OKボタンと閉じるボタンのクリックイベントリスナーを追加
        modal.style.display = 'block';
        document.getElementById('modal-ok').onclick = () => {
            onConfirm();
            modal.style.display = 'none';
        };
        document.querySelector('.modal__close').onclick = () => {
            modal.style.display = 'none';
        };
    }

    //モーダルを閉じるメソッド
    closeModal() {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.style.display = 'none';
        } else {
            console.error('Modal element not found');
        }
    }

    //編集をキャンセルするメソッド
    cancelEdit(article, originalTitle, originalContent) {
        //元のタイトルと内容に戻し、アクションボタンをリセット
        article.querySelector('.posted-article__title').textContent = originalTitle;
        article.querySelector('.posted-article__content').textContent = originalContent;
        this.resetActionButtons(article);
        this.isEditing = false;
    }

    //アクションボタンをリセットするメソッド
    resetActionButtons(article) {
        article.querySelector('.posted-article__actions').innerHTML = `
            <button class="post__button post__button--edit">編集</button>
            <button class="post__button post__button--delete">削除</button>
        `;
    }
}

//DOMContentLoadedイベントが発生したらPostManagerのインスタンスを生成する
document.addEventListener('DOMContentLoaded', () => new PostManager());
