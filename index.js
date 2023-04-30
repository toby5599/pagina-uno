const sliders = document.querySelector(".slider");
const logo = document.querySelector(".navbar__logo");
const menu = document.querySelector(".navbar__menu");
const navbarActivado = document.querySelector(".navbar__activado");
const bar = document.querySelector(".bar");

const slider = {
  container: document.querySelector(".slider-container"),
  items: document.querySelectorAll(".slider-item"),
  dots: document.querySelectorAll(".slider-dot"),
  activeIndex: 0,
  itemWidth: 0,
  timerId: null,
  transitioning: false,

  goToSlide(index) {
    if (this.transitioning) return;
    this.transitioning = true;

    this.items[this.activeIndex].classList.remove("active");

    if (index < 0) {
      this.activeIndex = this.items.length - 1;
    } else if (index >= this.items.length) {
      this.activeIndex = 0;
    } else {
      this.activeIndex = index;
    }

    this.items[this.activeIndex].classList.add("active");

    this.dots.forEach(dot => dot.classList.remove("active"));
    this.dots[this.activeIndex].classList.add("active");

    const translateX = -1 * this.activeIndex * this.itemWidth;
    this.container.style.transform = `translateX(${translateX}px)`;

    setTimeout(() => {
      this.transitioning = false;
    }, 500);
  },

  prevSlide() {
    clearTimeout(this.timerId);
    this.goToSlide(this.activeIndex - 1);
    this.timerId = setInterval(() => this.nextSlide(), 5000);
  },

  nextSlide() {
    clearTimeout(this.timerId);
    this.goToSlide(this.activeIndex + 1);
    this.timerId = setInterval(() => this.nextSlide(), 5000);
  },

  start() {
    this.itemWidth = this.items[0].offsetWidth;

    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        clearTimeout(this.timerId);
        this.goToSlide(index);
        this.restartTimer();
      });
    });

    this.restartTimer();
  },

  stop() {
    clearInterval(this.timerId);
  },

  restartTimer() {
    clearTimeout(this.timerId);
    this.timerId = setInterval(() => this.nextSlide(), 5000);
  },
};

const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      slider.start();
    } else {
      slider.stop();
    }
  });
};

const options = {
  root: null,
  rootMargin: "0px 0px -50px 0px",
  threshold: 0.2,
};

const observer = new IntersectionObserver(handleIntersection, options);

observer.observe(sliders);


// function iniciarMap() {
//   var coord = {lat: -34.6992252, lng: -58.5699618};
//   var map = new google.maps.Map(mapa, {
//       zoom: 18,
//       center: coord
//   });
//   var marker = new google.maps.Marker({
//       position: coord,
//       map: map
//   });
// }


menu.addEventListener("click",()=> {
  navbarActivado.classList.toggle("active");

});

menu.addEventListener("click",()=> {
  bar.classList.toggle("animate");
});

document.addEventListener('click', (event) => {

  const clicDentroDelMenu = menu.contains(event.target);
  const clicDentroDelNavbarActivado = navbarActivado.contains(event.target);
  if (!clicDentroDelMenu && !clicDentroDelNavbarActivado) {
    navbarActivado.classList.remove('active');
    bar.classList.remove("animate");
  }
});


let map = L.map('map', {scrollWheelZoom: false}).setView([-34.6992252, -58.5699618], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


let marker = L.marker([-34.6992252, -58.5699618]).addTo(map);
