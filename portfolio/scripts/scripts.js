"use strict";

// --VARIABLES
// General
const cursorFollow = document.querySelector(".cursor-follow");
const randomImg = document.querySelector("#random-image");
const neon = document.querySelector(".neon");
const neonSound = document.querySelector("#neon-sound");
const randomNum = Math.floor(Math.random() * 5); // Random 0 - 4
const SRC = `./img/avatar-art-${randomNum}.png`; // Random Image
const ALT = `avatar-art-${randomNum}.png`; // Random Image
const SPACE_UNICOD = "\u205f";
const TITLE_DASH = "|█|";
const TITLE_ICON = "⭐";
const CURSOR_OFFSET = 15;
// const TITLE_TEXT = "𝓓𝓤𝓒" + SPACE_UNICOD + "𝓐𝓝𝓗" + SPACE_UNICOD + "➖" + SPACE_UNICOD + "𝓟𝓸𝓻𝓽𝓯𝓸𝓵𝓲𝓸 " + TITLE_ICON;
const TITLE_TEXT = "𝓓.𝓐𝓝𝓗" + SPACE_UNICOD + "➖" + SPACE_UNICOD + "𝓟𝓸𝓻𝓽𝓯𝓸𝓵𝓲𝓸 " + TITLE_ICON;
const MAX_TYPING = 5; // Limit typing loop
const MAX_FAVICON_CHANGE = 10;
const favicon = document.querySelector("link[rel~='icon']");
const faviconImages = [
    "./img/Bulb_icon_0.png",
    "./img/Bulb_icon_1.png",
    "./img/Bulb_icon_2.png",
    "./img/Bulb_icon_3.png"
];
// --FUNCTIONS

// Delay / Sleep
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Debounce
const debounce = (callback, delayMs) => {
    delayMs = delayMs || 10; // Default
    let timer = null;
    return (...args) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            callback(...args);
        }, delayMs);
    };
};

// Typing Tittle
async function typingTitle() {
    let counter = 0
    while (counter < MAX_TYPING) {
        document.title = TITLE_ICON;
        for (var i = 0; i < TITLE_TEXT.length; i++) {
            await blinkDash(2, 50);
            document.title = document.title.replace(TITLE_DASH, TITLE_TEXT.charAt(i));
            // console.log("Title: " + document.title);
        }
        await delay(5000); // Stop 3 secs
        counter++;
    }
}

async function blinkDash(times, delayMs) {
    for (var i = 0; i < times; i++) {
        document.title = document.title.replace(TITLE_DASH, "");
        await delay(delayMs);
        document.title += TITLE_DASH;
        await delay(delayMs);
    }
}

async function faviconChange(delayMs) {
    let counter = 0;
    while (counter < MAX_FAVICON_CHANGE) {
        for (let i = 0; i < faviconImages.length; i++) {
            favicon.href = faviconImages[i];
            await delay(delayMs);
        }
        await delay(delayMs * 2);
        connter++; 
    }
}

// Neon Sound
const playNeonSound = () => {
    neonSound.currentTime = 0; // Reset audio to start
    neonSound.play().catch(err => {
        console.error('Neon sound play failed:', err);
    });
}

// Neon Sound

// --MAIN
// Random Image
randomImg.src = SRC;
randomImg.alt = ALT;
// Typing Tittle
typingTitle();
faviconChange(800);
// Favicon Light Up
if (!favicon) {
    favicon = document.createElement("link");
    favicon.rel = "icon";
    document.head.appendChild(favicon);
}

// Follow cursor
document.addEventListener("mousemove", debounce((e) => {
    cursorFollow.style.top = (e.clientY - CURSOR_OFFSET) + "px";
    cursorFollow.style.left = (e.clientX - CURSOR_OFFSET) + "px";
}),30); 

// Click cursor
document.addEventListener("click", debounce((e) => {
    playNeonSound();
    cursorFollow.classList.add("cursor-click");
    setTimeout(() => {
        cursorFollow.classList.remove("cursor-click");
    }, 800);
}));

// Neon sound
neon.addEventListener("animationiteration", (e) => {
    if (e.animationName === 'blink') {
        setTimeout(() => {
            playNeonSound();
        }, 200);
    }
})


// --DEBUG ONLY
// console.log("Random number: " + randomNum);
// console.log("Title: " + document.title);
// console.log("Title: " + favicon.href);