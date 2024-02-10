import { createImageUrl } from './common.js';

let imageUrls = ['https://vega-backend-f4m6.onrender.com/service/photo/65c75d14416bdc658a963b9c',
  'https://vega-backend-f4m6.onrender.com/service/photo/65c75cf4416bdc658a963b9a',
  'https://vega-backend-f4m6.onrender.com/service/photo/65c75cc3416bdc658a963b98',
  'https://vega-backend-f4m6.onrender.com/service/photo/65c75c63416bdc658a963b96',
  'https://vega-backend-f4m6.onrender.com/service/photo/65c75c3f416bdc658a963b94',
  'https://vega-backend-f4m6.onrender.com/service/photo/65c66fb0e43257949f9d1435',];
  
function Get_data() {
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
  var bg_image = document.querySelectorAll(".bg_image");
  var dec_title = document.querySelectorAll(".dec_title");
  var dec_text = document.querySelectorAll(".dec_text");
  for (let i = 0; i < 6; i++) {
    var imageUrl = createImageUrl(data[i].photoBuffer);
    dec_title[i].innerHTML = data[i].title;
    dec_text[i].innerHTML = data[i].text;
    bg_image[i].style.backgroundImage = "url(" + imageUrl + ")";
  }
}
Get_data();