
const button = document.getElementById("button");
const num = document.getElementById("num");
const hantei = document.getElementById("hantei");

button.addEventListener("click",function() {

  if(num.value > 89 && num.value <= 100) {
    console.log(hantei.textContent="「あなたの成績は秀です」");
  
  } else if (num.value > 79 && num.value < 90) {
    console.log(hantei.textContent="「あなたの成績は優です」");
  
  } else if (num.value >69 && num.value < 80) {
    console.log(hantei.textContent="「あなたの成績は良です」");
  
  } else if (num.value > 59 && num.value < 70) {
    console.log(hantei.textContent="「あなたの成績は可です」");
  
  } else if (num.value < 60) {
    console.log(hantei.textContent="「あなたの成績は不可です」");
  };
});