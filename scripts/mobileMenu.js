class MobileNavMenu {
  constructor(buttonSelector, menuSelector, listSelector) {
    this.button = document.querySelector(buttonSelector);
    this.menu = document.querySelector(menuSelector);
    this.listItems = document.querySelectorAll(listSelector);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  handleClick() {
    this.menu.classList.toggle(this.activeClass);

    if (this.menu.classList.contains(this.activeClass)) {
      document.addEventListener("click", this.handleOutsideClick);
    } else {
      document.removeEventListener("click", this.handleOutsideClick);
    }
  }

  handleOutsideClick(event) {
    const clickedInsideMenu = this.menu.contains(event.target);
    const clickedOnButton = this.button.contains(event.target);

    if (!clickedInsideMenu && !clickedOnButton) {
      this.menu.classList.remove(this.activeClass);
      document.removeEventListener("click", this.handleOutsideClick);
    }
  }

  addClickEvent() {
    this.button.addEventListener("click", this.handleClick);

    this.listItems.forEach((item) => {
      item.addEventListener("click", () => {
        this.menu.classList.remove(this.activeClass);
        document.removeEventListener("click", this.handleOutsideClick);
      });
    });
  }

  init() {
    if (this.button) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavMenu = new MobileNavMenu(
  ".mobile-menu-icon button",
  ".mobile-menu",
  ".mobile_nav_list li"
);

mobileNavMenu.init();

// Solução para sempre que a página recarregar ou o usuario ir para outra página o menu fechar
window.addEventListener("load", () => {
  document.querySelector(".mobile-menu").classList.remove("active");
});
