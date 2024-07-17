function calculate() {
  const types = [1, 2, 3, 4];
  let totalSmallBoxes = 0;
  let totalLargeBoxes = 0;
  let resultText = '';

  const mushroomCounts = {};

  types.forEach(type => {
      const mushroomTypeElement = document.getElementById(`mushroom-type-${type}`);
      const mushroomType = mushroomTypeElement.selectedOptions[0].text.split(' ')[0]; // 取出蘑菇名稱
      const boxCount = parseFloat(document.getElementById(`box-count-${type}`).value);
      const smallBoxesPerLargeBox = parseInt(mushroomTypeElement.value);

      if (!mushroomCounts[mushroomType]) {
          mushroomCounts[mushroomType] = 0;
      }

      mushroomCounts[mushroomType] += boxCount;
      totalLargeBoxes += boxCount;
      totalSmallBoxes += smallBoxesPerLargeBox * boxCount;
  });

  resultText += `Total: ${totalLargeBoxes} trays\n`;
  for (const [mushroom, count] of Object.entries(mushroomCounts)) {
      if (count > 0) {
          resultText += `${mushroom}: ${count} trays\n`;
      }
  }

  const peopleCount = parseFloat(document.getElementById('people-count').value);
  const hours = parseFloat(document.getElementById('hours').value);
  const smallBoxesPerPersonPerHour = (totalSmallBoxes / peopleCount / hours).toFixed(2);

  resultText += `${totalSmallBoxes} punnets\n`;
  resultText += `${peopleCount} packer\n`;
  resultText += `${hours} hours\n`;
  resultText += `${smallBoxesPerPersonPerHour} punnets/hr/person`;

  document.getElementById('result').innerText = resultText;

  // 複製到剪貼簿
  navigator.clipboard.writeText(resultText).then(() => {
      showCopyNotification();
  }).catch(err => {
      alert('複製失敗');
  });
}

function showCopyNotification() {
  const notification = document.getElementById('copy-notification');
  notification.style.display = 'block';
  setTimeout(() => {
      notification.style.display = 'none';
  }, 1000);
}
