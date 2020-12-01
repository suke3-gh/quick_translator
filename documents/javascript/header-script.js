
let openFlag = 'close';

const clicledMenuIcon = document.getElementById( 'menuIcon' )
  .addEventListener('click', () => {
    switch (openFlag) {
      case 'close':
        document.getElementById( 'navi-menu' ).style.maxHeight = '80vw';
        openFlag = 'open';
        break;
      case 'open':
        document.getElementById( 'navi-menu' ).style.maxHeight = '0vw';
        openFlag = 'close';
        break;
    }
  }
);
