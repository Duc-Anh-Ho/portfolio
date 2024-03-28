"use strict";

// --VARIABLES
// General
const cursorFollow = document.querySelector(".cursor-follow");
const randomImg = document.querySelector("#random-image");
const neon = document.querySelector(".neon");
const neonSound = document.querySelector("#neon-sound");
const switchBtn = document.querySelector(".switch");
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
const SWITCH_SOUND = "data:audio/mpeg;base64,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l66A+sBKsb3MK//SnKSoeEbwjlksu4Y6nUw8//swZPsA8awMWfghSAAAAA0gAAABCB0LYeAwQ4gAADSAAAAElUxBTUUzLjEwMFVVVVVVVVVVVVVVgRCAAnmjmEjpMKT//f6oUrbOjqnbawppb6P//2DCQVVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//swZPuA8etCV/kBHWAAAA0gAAABBxBTXeA8YoAAADSAAAAEVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sgZPyA8agY1vgLEKAAAA0gAAABBxDdV+KkToAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7IGT0gPF8JNV4BxHQAAANIAAAAQUcZVOgCSfAAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBk9wzxTDJTaCASMgAADSAAAAEDIJ9QQAh2gAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGTtjfDOL1IYARUQAAANIAAAAQC4ATIAAAAAAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZN2P8AAAf4AAAAgAAA0gAAABAAAB/gAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=";
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
        counter++; 
    }
}

// Neon Sound
const playNeonSound = () => {
    neonSound.currentTime = 0; // Reset audio to start
    neonSound.play().catch(err => {
        console.error('Neon sound play failed:', err);
    });
    if (navigator.vibrate) navigator.vibrate(800); // Sound vibration effect
}

// Switch Sound
const playSwitchSound = () => {
    neonSound.currentTime = 0; // Reset audio to start
    const sound = new Audio(SWITCH_SOUND);
    sound.play().catch(err => {
        console.error('Switch sound play failed:', err);
    });
    if (navigator.vibrate) navigator.vibrate(100); // Sound vibration effect
}

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
    // playNeonSound();
    cursorFollow.classList.add("cursor-click");
    setTimeout(() => {
        cursorFollow.classList.remove("cursor-click");
    }, 800);
}));

// Neon auto sound
neon.addEventListener("animationiteration", (e) => {
    if (e.animationName === 'blink') {
        setTimeout(() => {
            playNeonSound();
        }, 500);
    }
})

// Switch Click
switchBtn.addEventListener("click", (e) => {
    playSwitchSound();
});

// --DEBUG ONLY
// console.log("Random number: " + randomNum);
// console.log("Title: " + document.title);
// console.log("Title: " + favicon.href);