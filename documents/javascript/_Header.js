
'use strict';

/**
 * _Header.js
 * description: 
 */

import { Page } from './Page.js';

class Header extends Page {
  constructor() {
    super();
    this.header   = document.getElementById( 'header' );
    this.menu     = document.getElementById( 'navMenu' );
    this.menuIcon = document.getElementById( 'imgMenuIcon' );
    this.scroll   = {
      beforeY:  0,
    }
    this.closedMenuHeight = '0px';
    this.openedMenuHeight = '80vh';
  }

  watchScrollDirection() {
    const currentY    = window.scrollY;
    const fluctuation = currentY - this.scroll.beforeY;
    let result = '';
    if ( fluctuation > 0 ) {
      result = 'down';
    } else if ( fluctuation < 0) {
      result = 'up';
    }
    this.scroll.beforeY  = currentY;
    return result;
  }

  prepareMenuActionScroll() {
    let menu;
    if ( this.menu instanceof HTMLElement ) {
      menu = this.menu;
    }
    let icon;
    if ( this.menuIcon instanceof HTMLImageElement ) {
      icon = this.menuIcon;
    }
    window.addEventListener( 'scroll', () => {
      if ( ( super.currentAspectRatio() < 4/3 ) && ( menu.style.height == this.openedMenuHeight ) ) {
        menu.style.height = this.closedMenuHeight;
      }
    }, false );
  }

  prepareMenuActionClick() {
    let menu;
    if ( this.menu instanceof HTMLElement ) {
      menu = this.menu;
    }
    let icon;
    if ( this.menuIcon instanceof HTMLImageElement ) {
      icon = this.menuIcon;
    }
    icon.addEventListener( 'click', () => {
      switch ( menu.style.height ) {
        case '':
        case this.closedMenuHeight:
          menu.style.height = this.openedMenuHeight;
          break;
        case this.openedMenuHeight:
          menu.style.height = this.closedMenuHeight;
          break;
      }
    }, false );
  }

  prepareHeaderActionScroll() {
    let header;
    if ( this.header instanceof HTMLElement ) {
      header = this.header;
    }
    window.addEventListener( 'scroll', () => {
      if ( super.currentAspectRatio() < 4/3 ) {
        const direction = this.watchScrollDirection();
        switch ( direction ) {
          case 'up':
            header.style.height = '4.0rem';
            setTimeout( () => {
              header.style.overflowY = 'visible';
            }, 200);
            break;
          case 'down':
            header.style.height    = '0px';
            header.style.overflowY = 'hidden';
            break;
        }
      }
    }, false );
  }

  prepareLayoutChangeResize() {
    let header;
    if ( this.header instanceof HTMLElement ) {
      header = this.header;
    }
    let menu;
    if ( this.menu instanceof HTMLElement ) {
      menu = this.menu;
    }
    let icon;
    if ( this.menuIcon instanceof HTMLImageElement ) {
      icon = this.menuIcon;
    }
    window.addEventListener( 'resize', () => {
      if ( super.currentAspectRatio() < 4/3 ) {
        header.style.height    = '4.0rem';
        header.style.overflowY = 'visible';
        menu.style.height      = this.closedMenuHeight;
      } else {
        header.style.height    = '100vh';
        header.style.overflowY = 'scroll';
        menu.style.height      = '100vh';
      }
    }, false );
  }
}

const HeaderIns = new Header();
HeaderIns.prepareHeaderActionScroll();
HeaderIns.prepareMenuActionClick();
HeaderIns.prepareMenuActionScroll();
HeaderIns.prepareLayoutChangeResize();
HeaderIns.textAssignment( 'spanAddonTitle', browser.runtime.getManifest().name );
