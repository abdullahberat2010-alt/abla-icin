alert("JavaScript çalışıyor!");
alert(document.getElementById("slides"));
const photos = [];

for (let i = 1; i <= 7; i++) {
    photos.push(`${i}.jpeg`);
}

photos.push("11.jpg");

const slides = document.getElementById("slides");

// Fotoğrafları oluştur
photos.forEach((photo, index) => {
    const slide = document.createElement("div");
    slide.className = "slide";

    const img = document.createElement("img");
    img.src = `images/${photo}`;
    img.alt = `Anı ${index + 1}`;

    slide.appendChild(img);
    slides.appendChild(slide);
});

// Slayt gösterisi
let currentSlide = 0;
let confettiStarted = false;

const slideTimer = setInterval(() => {
    if (currentSlide >= photos.length - 1) {
        clearInterval(slideTimer);
        return;
    }

    currentSlide++;

    slides.style.transform =
        `translateX(-${currentSlide * 100}%)`;

    if (currentSlide === photos.length - 1 && !confettiStarted) {
        confettiStarted = true;
        setTimeout(launchConfetti, 700);
    }
}, 3500);

// Konfeti
function launchConfetti() {
    const colors = [
        "#ffffff", "#b9e5ff", "#6da9df",
        "#e8c5ff", "#ffe4a8", "#f5a9c5"
    ];

    const sides = [
        { x: 0, direction: 1 },
        { x: 100, direction: -1 }
    ];

    sides.forEach(side => {
        for (let i = 0; i < 60; i++) {
            const piece = document.createElement("div");
            piece.className = "confetti";

            const distance = 250 + Math.random() * 450;

            piece.style.left = side.x + "vw";
            piece.style.top = (15 + Math.random() * 70) + "vh";
            piece.style.backgroundColor =
                colors[Math.floor(Math.random() * colors.length)];

            piece.style.setProperty("--move-x", `${side.direction * distance}px`);
            piece.style.setProperty("--move-y", `${Math.random() * 500 - 250}px`);
            piece.style.setProperty("--rotation", `${Math.random() * 1080}deg`);

            piece.style.animationDelay = `${Math.random() * 0.8}s`;

            document.body.appendChild(piece);

            setTimeout(() => piece.remove(), 5000);
        }
    });
}
