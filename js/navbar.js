const toggleButton = document.getElementById("navbar-toggle");
const menu = document.getElementById("navbar-menu");

toggleButton.addEventListener("click", () => {
  menu.classList.toggle("active");
});

window.onscroll = function () {
  myFunction();
};

const navSticky = document.querySelector(".navContainer");
const sticky = navSticky.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navSticky.classList.add("sticky");
  } else {
    navSticky.classList.remove("sticky");
  }
}
