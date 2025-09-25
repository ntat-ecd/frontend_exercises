const videoOverlay = document.querySelector('.videoOverlay');
const trailerBtn = document.querySelector('.trailerBtn');
const trailerVideo = document.querySelector('.trailerVideo');

trailerBtn.addEventListener('click', () => {
  videoOverlay.classList.remove('hidden');
  trailerVideo.setAttribute('src', 'https://www.youtube.com/embed/xD_qGFNpTnw?list=PLa1P6wuPAF7AltPmjUEhk69aTbFCeMUqJ');
});
videoOverlay.addEventListener('click', () => {
  videoOverlay.classList.add('hidden');
  trailerVideo.setAttribute('src', '');
});

const mainBanner = document.querySelector('.mainBanner');
const otherImages = document.querySelectorAll('.otherImages img');
const images = ['/img/bd1.webp', '/img/bd2.webp', '/img/bd3.webp', '/img/bd4.webp', '/img/bd5.webp', '/img/bd6.webp'];
let timer;
let index = 0;

const setMainBanner = (i) => {
  index = i;
  mainBanner.classList.add('fade-out');
  setTimeout(() => {
    mainBanner.setAttribute('src', images[i]);
    mainBanner.classList.remove('fade-out');
  }, 600);
};

const presentImages = () => {
  timer = setInterval(() => {
    index = (index + 1) % images.length;
    setMainBanner(index);
  }, 5000);
};

const setClickToOtherImages = () => {
  otherImages.forEach((img, i) => {
    img.addEventListener('click', () => {
      clearInterval(timer);
      setMainBanner(i);
      presentImages();
    });
  });
};

setClickToOtherImages();
presentImages();

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toPrecision(7);
        const lgn = pos.coords.longitude.toPrecision(7);
        const mapUrl = `https://www.google.com/maps?q=${lat},${lgn}&z=15&output=embed`;
        document.querySelector('.iframeMap').setAttribute('src', mapUrl);
      },
      () => {
        const mapUrl = `https://www.google.com/maps?q=${10.8231},${106.6297}&z=15&output=embed`;
        document.querySelector('.iframeMap').setAttribute('src', mapUrl);
      },
    );
  } else {
    const lat = 10.8231;
    const lgn = 106.6297;
    const mapUrl = `https://www.google.com/maps?q=${lat},${lgn}&z=15&output=embed`;
    document.querySelector('.iframeMap').setAttribute('src', mapUrl);
  }
};

getLocation();
