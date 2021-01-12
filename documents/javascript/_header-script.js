
const elementdivOperationButtonLeft = document.getElementById( 'divOperationButtonLeft' );
const elementImgMenuIcon            = document.getElementById( 'imgMenuIcon' );
const elementNavMenuArea            = document.getElementById( 'navMenuArea' );
let openFlagOfMenu = 'close';
let tempSrcProperty  = 'temp';

elementdivOperationButtonLeft.addEventListener( 'click', () => {
  switch ( openFlagOfMenu ) {
    case 'close':
      openFlagOfMenu = 'open';
      tempSrcProperty = elementImgMenuIcon.src;
      elementImgMenuIcon.src = tempSrcProperty.replace('menu-icon', 'close-icon');
      elementNavMenuArea.style.maxHeight = '80vw';
      break;
    case 'open':
      openFlagOfMenu = 'close';
      tempSrcProperty = elementImgMenuIcon.src;
      elementImgMenuIcon.src = tempSrcProperty.replace('close-icon', 'menu-icon');
      elementNavMenuArea.style.maxHeight = '0vw';
      break;
  }
}, false );

document.addEventListener( 'scroll', () => {
  if ( openFlagOfMenu == 'open' ) {
    openFlagOfMenu = 'close';
    tempSrcProperty = elementImgMenuIcon.src;
    elementImgMenuIcon.src = tempSrcProperty.replace('close-icon', 'menu-icon');
    elementNavMenuArea.style.maxHeight = '0vw';
  }
}, false );
