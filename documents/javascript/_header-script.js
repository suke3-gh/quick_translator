
const elementNavMenuArea = document.getElementById( 'navMenuArea' );
const elementImgMenuIcon = document.getElementById( 'imgMenuIcon' );
let openFlag = 'close';
let tempSrc  = 'temp';

const clickedMenuIcon = elementImgMenuIcon
  .addEventListener('click', () => {
    switch (openFlag) {
      case 'close':
        openFlag = 'open';
        tempSrc = elementImgMenuIcon.src;
        elementImgMenuIcon.src = tempSrc.replace('menu-icon', 'close-icon');
        elementNavMenuArea.style.maxHeight = '80vw';
        break;
      case 'open':
        openFlag = 'close';
        tempSrc = elementImgMenuIcon.src;
        elementImgMenuIcon.src = tempSrc.replace('close-icon', 'menu-icon');
        elementNavMenuArea.style.maxHeight = '0vw';
        break;
    }
    
  }
);

const closeNavByScroll = document
  .addEventListener('scroll', () => {
    if (openFlag == 'open') {
      openFlag = 'close';
      tempSrc = elementImgMenuIcon.src;
      elementImgMenuIcon.src = tempSrc.replace('close-icon', 'menu-icon');
      elementNavMenuArea.style.maxHeight = '0vw';
    }
  }
);
