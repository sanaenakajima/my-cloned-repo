const participant = [
    { name: 'taro', age: 20 },
    { name: 'hanako', age: 15 },
    { name: 'john', age: 25 }
  ];
  
  for (let i = 0; i < participant.length; i++) {
    if (participant[i].age >= 18) {
      console.log(`${participant[i].name}さんは18歳以上のため参加可能です`);
    } else {
      console.log(`${participant[i].name}さんは18歳未満のため参加できません`);
    }
  }
  