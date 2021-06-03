/**
 * module file: _script_header.js
 * description: 
 */

/** functions */
function clickCloseMenu( imgMenuIcon, navMenuArea ) {
  imgMenuIcon.src          = imgMenuIcon.src.replace( 'menu-up', 'menu' );
  navMenuArea.style.height = '0px';
}

function clickOpenMenu( imgMenuIcon, navMenuArea ) {
  imgMenuIcon.src          = imgMenuIcon.src.replace( 'menu', 'menu-up' );
  navMenuArea.style.height = '70vh';
}

function clickMenuBehavior( flag ) {
  const imgMenuIcon = document.getElementById( 'imgMenuIcon' );
  const navMenuArea = document.getElementById( 'navMenu' );
  switch ( flag ) {
    case 'N':
      clickOpenMenu( imgMenuIcon, navMenuArea );
      break;
    case 'Y':
      clickCloseMenu( imgMenuIcon, navMenuArea );
      break;
  }
}

function exceptionLog( id ) {
  console.log( id.name + ': ' + id.message );
}

function getAspectRatio() {
  return Number( window.innerWidth / window.innerHeight );
}

function getFlagOpenNavMenu() {
  let result = 'result';
  const element = document.getElementById( 'navMenu' );
  const style   = window.getComputedStyle( element );
  if ( style.height == '0px' ) {
    result = 'N';
  } else {
    result = 'Y';
  }
  return result;
}

function judgeScrollDirection( beforeY, currentY ) {
  let result      = 'result';
  let fluctuation = currentY - beforeY;
  if ( fluctuation > 0) {
    result = 'down';
    scrollHideHeader();
  } else {
    result = 'up';
    scrollShowHeader();
  }
  return result;
}

function resetViewToLandscape( header, imgMenuIcon, navMenuArea ) {
  header.style.height      = '100vh';  
  header.style.overflowY   = 'scroll';
  imgMenuIcon.src          = imgMenuIcon.src.replace( 'menu-up', 'menu' );
  navMenuArea.style.height = '100vh';
}

function resetViewToPortrait( header, imgMenuIcon, navMenuArea ) {
  header.style.height      = '4.0rem';
  header.style.overflowY   = 'visible';
  imgMenuIcon.src          = imgMenuIcon.src.replace( 'menu-up', 'menu' );
  navMenuArea.style.height = '0px';
}

async function scrollShowHeader() {
  const element = document.getElementById( 'header' );
  element.style.height = '4.0rem';
  await new Promise( resolve => setTimeout( resolve, 200 ) )
    .catch( ( identifier ) => exceptionLog( identifier ) );
  element.style.overflowY = 'visible';
}
    
async function scrollHideHeader() {
  const element = document.getElementById( 'header' );
  element.style.height    = '0';
  element.style.overflowY = 'hidden';
}

/** process for event */
function processClickEvent() {
  document.getElementById( 'divOperationButtonLeft' ).addEventListener( 'click', () => {
    const aspectRatio = getAspectRatio();
    const flag        = getFlagOpenNavMenu();
    if ( aspectRatio < 4/3 ) {
      clickMenuBehavior( flag );
    }
  }, false );
}

function processResizeEvents() { /** reset layout depend on aspect ratio. */
  window.addEventListener( 'resize', () => {
    const aspectRatio = getAspectRatio();
    const header      = document.getElementById( 'header' );
    const imgMenuIcon = document.getElementById( 'imgMenuIcon' );
    const navMenuArea = document.getElementById( 'navMenu' );
    if ( aspectRatio < 4/3 ) {
      resetViewToPortrait( header, imgMenuIcon, navMenuArea );
    } else {
      resetViewToLandscape( header, imgMenuIcon, navMenuArea );
    }
  }, false );
}

function processScrollEvents() { /** show and hide the header. */
  window.addEventListener( 'scroll', () => {
    const aspectRatio = getAspectRatio();
    if ( aspectRatio < 4/3 ) {
      const imgMenuIcon = document.getElementById( 'imgMenuIcon' );
      const navMenuArea = document.getElementById( 'navMenu' );
      clickCloseMenu( imgMenuIcon, navMenuArea );
    }
  }, false );
  
  const obj = { beforeY: 0, currentY: window.scrollY };
  window.addEventListener( 'scroll', () => {
    const aspectRatio = getAspectRatio();
    if ( aspectRatio < 4/3 ) {
      obj.currentY = window.scrollY;    
      judgeScrollDirection( obj.beforeY, obj.currentY );
      obj.beforeY  = obj.currentY;
  
      if ( obj.currentY == 0 ) {
        scrollShowHeader();
      }
    }
  }, false );
}

processClickEvent();
processResizeEvents();
processScrollEvents();

/**
 * Addon title text
 */
 document.getElementById( 'spanAddonTitle' ).textContent = browser.runtime.getManifest().name;