function manipulateData(data, searched) {
  var hbsObject = {
    gifts: data
  };
  let titleArry = [];
  let searchedArry = [];
  for (i = 0; i < hbsObject.gifts.length; i++) {
    let currentTitle = hbsObject.gifts[i].title;
    titleArry.push(currentTitle);
  }

  for (u = 0; u < titleArry.length; u++) {
    var x = titleArry.indexOf(searched);
    if (x !== -1) {
      var removed = titleArry.splice(x, 1)[0];
      searchedArry.push(removed);
    }
  }

  let finalArry = [...searchedArry, ...titleArry];
  console.log(finalArry);

  return finalArry;
}

module.exports = manipulateData;
