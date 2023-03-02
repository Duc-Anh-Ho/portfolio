"use strict";

// --VARIABLES
// General
const cardBtn = document.getElementsByClassName("card_button");
// Random Image
const randomImg = document.getElementById("randomImage");
const randomNum = Math.floor(Math.random() * 5); // Random 0 - 4
const scr = `./img/avatar-art-${randomNum}.png`;
const alt = `avatar-art-${randomNum}.png`;
const spaceUnicod = "\u205f";
const titleDash = "|█|";
const titleText = "𝓓𝓤𝓒" + spaceUnicod + "𝓐𝓝𝓗" + spaceUnicod + "➖" + spaceUnicod + "𝓟𝓸𝓻𝓽𝓯𝓸𝓵𝓲𝓸 ⭐";
const favicon = document.querySelector("link[rel~='icon']");
const faviconImg0 = "./img/Bulb_icon_0.png";
const faviconImg1 = "./img/Bulb_icon_1.png";
const faviconImg2 = "./img/Bulb_icon_2.png";
const faviconImg3 = "./img/Bulb_icon_3.png";

// --FUNCTIONS
// Old - remove cause using changing background
// function hoverOn(img) {
//   img.style.opacity = "1";
//   img.src = ".\\img\\avatar-5x7.jpg";
//   img.alt = "avatar-5x7.jpg";
// }
// function hoverOut(img) {
//   img.style.opacity = "1";
//   img.src = ".\\img\\avatar-art-2.png";
//   img.alt = "avatar-art-2.png";
// }

// Delay / Sleep
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Typing Tittle
async function typingTitle(){
  while(true){
    document.title = "⭐";
    for (var i = 0; i < titleText.length; i++) {
      await blinkDash(2,100);
      document.title = document.title.replace(titleDash,  titleText.charAt(i));
      // console.log("Title: " + document.title); 
    }
    await delay(3000); // Stop 3 secs
  }
}

async function blinkDash(times,delayMs){
  for (var i = 0; i < times; i++){
    document.title = document.title.replace(titleDash,"");
    await delay(delayMs);
    document.title += titleDash;
    await delay(delayMs);
  }
}

async function faviconChange(delayMs){
  while(true){
  favicon.href = faviconImg0;
  await delay(delayMs);
  favicon.href = faviconImg1;
  await delay(delayMs);
  favicon.href = faviconImg2;
  await delay(delayMs);
  favicon.href = faviconImg3;
  await delay(delayMs * 3);
  }
}

// --MAIN
// Random Image
randomImg.src = scr;
randomImg.alt = alt;
// Typing Tittle
typingTitle();
// Favicon Light Up
if (!favicon) {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    document.head.appendChild(favicon);
}
faviconChange(1000);

// --DEBUG ONLY
console.log("Random number: " + randomNum);
console.log("Title: " + document.title); 
console.log("Title: " + favicon.href); 
