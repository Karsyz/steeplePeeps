const menu = document.querySelector("#menu");
const navCont = document.querySelector("#navCont");
const menuClose = document.querySelector("#menuClose");
const addUserModalCont = document.querySelector("#addUserModalCont");
const openAddUserButton = document.querySelector("#openAddUserButton");
const closeAddUserButton = document.querySelector("#closeAddUserButton");
const mainInner = document.querySelector("#mainInner");

// activate
menu.addEventListener("click", () => {
  mainInner.classList.toggle("w-[calc(100%_+_72px)]");
  mainInner.classList.toggle("w-full");
});

function deactivateMenu() {
  navCont.classList.remove("translate-x-0");
  navCont.classList.add("translate-x-full");
}

if (openAddUserButton) {
  openAddUserButton.addEventListener("click", () => {
    addUserModalCont.classList.remove("-translate-y-full");
    addUserModalCont.classList.add("translate-y-0");
  });
}

if (closeAddUserButton) {
  closeAddUserButton.addEventListener("click", () => {
    addUserModalCont.classList.remove("translate-y-0");
    addUserModalCont.classList.add("-translate-y-full");
  });
}

// close menu if clicked outside nav container
window.addEventListener("click", function (e) {
  if (!navCont.contains(e.target) && !menu.contains(e.target)) {
    mainInner.classList.add("w-[calc(100%_+_72px)]");
    mainInner.classList.remove("w-full");
  }
});
