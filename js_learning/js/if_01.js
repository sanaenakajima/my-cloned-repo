
const button = document.getElementById("button");
const num = document.getElementById("num");
const judgement = document.getElementById("judgement");

button.addEventListener("click",function() {

  if(num.value >= 90 && num.value <= 100) {
    console.log(judgement.textContent="「あなたの成績は秀です」");
  
  } else if (num.value >= 80 && num.value <= 89) {
    console.log(judgement.textContent="「あなたの成績は優です」");
  
  } else if (num.value >= 70 && num.value <= 79) {
    console.log(judgement.textContent="「あなたの成績は良です」");
  
  } else if (num.value >= 60 && num.value <= 69) {
    console.log(judgement.textContent="「あなたの成績は可です」");
  
  } else if (num.value <= 59) {
    console.log(judgement.textContent="「あなたの成績は不可です」");
  };
});