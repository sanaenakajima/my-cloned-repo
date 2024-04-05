/**
 * fetch()を利用した画像取得処理
 * fetch()は仕様上、APIを叩いた際エラーとなってもreject(エラー判定)してくれない
 * よってresponse.ok()で成功しているかを判定し、問題なければjsonを返す。問題があれば例外でエラーを発生させる。
 *
 * https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch#checking_that_the_fetch_was_successful
 */
const getRandomDog = async () => {
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    if(!res.ok){
      throw new Error('非同期処理に失敗しました。');
    }
    const resData = await res.json();
    return resData;
  };
  
  getRandomDog().then((resData) => {
        console.log(resData);
      })
      .catch((e) => alert(e));