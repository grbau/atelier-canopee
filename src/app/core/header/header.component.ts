import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  toggleMenu() {
    const OPEN_HEADER_NAV_CLASS = 'page-header__nav--open'
    const OPEN_BTN_BURGER_MENU_CLASS = 'page-header__burger--open'
    const btnBurgerMenu = document.querySelector('.page-header__burger')
    const headerNav = document.querySelector('.page-header__nav')
    if (headerNav.classList.contains(OPEN_HEADER_NAV_CLASS)) {
      document.body.style.overflow = ''
      btnBurgerMenu.classList.remove(OPEN_BTN_BURGER_MENU_CLASS)
      headerNav.classList.remove(OPEN_HEADER_NAV_CLASS);
    } else {
      document.body.style.overflow = 'hidden'
      btnBurgerMenu.classList.add(OPEN_BTN_BURGER_MENU_CLASS)
      headerNav.classList.add(OPEN_HEADER_NAV_CLASS);
    }
  }
  ngOnInit(): void {
    Array.from(document.querySelectorAll('.page-header__nav .page-header__btn')).forEach(nav => {
      nav.addEventListener('click', () => {
        document.body.style.overflow = '';
        nav.closest('.page-header__nav').classList.remove('page-header__nav--open');
        document.querySelector('.page-header__burger').classList.remove('page-header__burger--open');
      });
    });
  }

}
