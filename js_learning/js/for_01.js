function printMultiplesOfThree() {
    for (let i = 0; i <= 100; i++) {
      if (i !== 0 && i % 3 === 0) {
        console.log(`${i}: 3の倍数です`);
      } else {
        console.log(i);
      }
    }
  }
  
  printMultiplesOfThree();