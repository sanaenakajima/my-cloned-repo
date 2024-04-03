const participants = [
    { name: 'taro', age: 20 },
    { name: 'hanako', age: 15 },
    { name: 'john', age: 25 }
  ];
  
  for (let i = 0; i < participants.length; i++) {
    const participant = participants[i];
    if (participant.age >= 18) {
      console.log(`${participant.name}さんは18歳以上のため参加可能です`);
    } else {
      console.log(`${participant.name}さんは18歳未満のため参加できません`);
    }
  }