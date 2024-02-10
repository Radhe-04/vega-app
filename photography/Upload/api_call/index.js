import { createImageUrl } from './common.js';
let imageUrls = ['https://vega-backend-f4m6.onrender.com/photo/65be85f8b91e609d991c9fc6',
  'https://vega-backend-f4m6.onrender.com/photo/65be8615b91e609d991c9fc8',
  'https://vega-backend-f4m6.onrender.com/photo/65be8626b91e609d991c9fca',
  'https://vega-backend-f4m6.onrender.com/photo/65be8662b91e609d991c9fcc',
  'https://vega-backend-f4m6.onrender.com/photo/65be88cf7e1d8ade2ee9914a'];
  
function Get_image() {
    const promises = []
    imageUrls.forEach(url => {
    promises.push(fetch(url).then(res => res.json()))
  })
  Promise.all(promises).then(dataArray =>{
    updateHtmlWithData(dataArray);
  }).catch(error =>{
    console.error(error);
  })
}

function updateHtmlWithData(data) {
  var front_elements = document.querySelectorAll("#font_image");
  var back_elements = document.querySelectorAll("#background-image");
  var leftSilder_elements = document.querySelectorAll("#leftSilder_image");
  var rightSilder_elements = document.querySelectorAll("#rightSilder_image");
  var silderText = document.querySelectorAll("#silder_text");
  for (let i = 0; i < 5; i++) {
    var imageUrl = createImageUrl(data[i].photoBuffer);
    silderText[i].innerHTML = data[i].text;
    front_elements[i].style.backgroundImage = "url(" + imageUrl + ")";
    back_elements[i].style.backgroundImage = "url(" + imageUrl + ")";
    leftSilder_elements[i].style.backgroundImage = "url(" + imageUrl + ")";
    rightSilder_elements[i].style.backgroundImage = "url(" + imageUrl + ")";
  }
}
Get_image();
