
/*================
  Creating menu items
  ================*/
const itemIdForPage = 'clickPage';
const contextMenuForPage = browser.menus.create({
  contexts: ['page'],
  id:       itemIdForPage,
  title:    browser.i18n.getMessage( 'contextMenuForPage' )
});

const itemIdForText = 'selectText';
const contextMenuForText = browser.menus.create({
  contexts: ['selection'],
  id:       itemIdForText,
  title:    browser.i18n.getMessage( 'contextMenuForText' )
});

/*================
  Functions
  ================*/
function autoSelectLanguageCode() {
  let tempLanguageCode = browser.i18n.getUILanguage();

  // Fix for German 
  if (tempLanguageCode.indexOf( 'de' ) != -1) {
    tempLanguageCode = 'de';
    return tempLanguageCode;
  }
  // Fix for English
  if (tempLanguageCode.indexOf( 'en' ) != -1) {
    tempLanguageCode = 'en';
    return tempLanguageCode;
  }
  // Fix for Spnish
  if (tempLanguageCode.indexOf( 'es' ) != -1) {
    tempLanguageCode = 'es';
    return tempLanguageCode;
  }
  // Fix for Portuguese
  if (tempLanguageCode.indexOf( 'pt' ) != -1) {
    tempLanguageCode = 'pt';
    return tempLanguageCode;
  }
  return tempLanguageCode;
}

function htmlEscape( string ) {
  return string
    .replace( /\"/g, '%22' )
    .replace( /\'/g, '%27' )
    .replace( /\//g, '%2F' )
    .replace( /\;/g, '%3B' )
    .replace( /\</g, '%3C' )
    .replace( /\>/g, '%3E' )
    .replace( /\|/g, '%7C' );
}

function openByNewTab( url ) {
  browser.tabs.create({ url: url });
}

function openByNewWindow( url, specifySize, sizeWidth, sizeHeight ) {
  if (specifySize == true) {
    browser.windows.create({ url: url, width: sizeWidth, height: sizeHeight });
  } else {
    browser.windows.create({ url: url });
  }
}

function initForPage( initOpenMethod, initLanguageCode, initTargetUrl ) {
  if ( initOpenMethod == undefined ) {
    initOpenMethod = 'tab';
  }
  if ( ( initLanguageCode == undefined ) || ( initLanguageCode == 'auto' ) ) {
    initLanguageCode = autoSelectLanguageCode();
  }
  const object = {
    openMethod:   initOpenMethod,
    languageCode: initLanguageCode,
    targetUrl:    htmlEscape( initTargetUrl )
  }

  return object;
}

function initForText( initOpenMethod, initLanguageCode, info ) {
  if ( initOpenMethod == undefined ) {
    initOpenMethod = 'tab';
  }
  if ( ( initLanguageCode == undefined ) || ( initLanguageCode == 'auto' ) ) {
    initLanguageCode = autoSelectLanguageCode();
  }
  const initTargetText = info.selectionText
    .replace( /\%/g, '％' )
    .replace( /\&/g, '＆' );
  const object = {
    openMethod:   initOpenMethod,
    languageCode: initLanguageCode,
    targetText:   htmlEscape( initTargetText )
  }

  return object;
}

/*================
  API
  ================*/
browser.menus.onClicked.addListener( ( info ) => {
  browser.storage.local.get()
    .then( ( obj ) => {
      if ( obj.translationService == undefined ) {
        obj.translationService = 'Google';
      }
      let url = null;
      const translationService = obj.translationService;
      switch ( info.menuItemId ) {
        case itemIdForPage:
          const objectForPage = initForPage( obj.openMethodWebsite, obj.languageCode, info.pageUrl );
            // keys: openmethod, languageCode, targetUrl
          switch ( translationService ) {
            case 'Bing':
              url = 'https://www.translatetheweb.com/?from=&to='+objectForPage.languageCode+'&a='+objectForPage.targetUrl;
              break;
            case 'Google':
              url = 'https://translate.google.com/translate?hl='+objectForPage.languageCode+'&sl=auto&tl='+objectForPage.languageCode+'&u='+objectForPage.targetUrl;
              break;
          }
          switch ( objectForPage.openMethod ) {
            case 'tab':
              openByNewTab( url );
              break;
            case 'window':
              openByNewWindow( url, obj.specifySize, obj.sizeWidth, obj.sizeHeight );
              break;
          }
          break;
        case itemIdForText:
          const objectForText = initForText( obj.openMethodText, obj.languageCode, info );
            // keys: openMethod, languageCode, targeText
          switch ( translationService ) {
            case 'Bing':
              url = 'https://www.bing.com/translator?from=&to='+objectForText.languageCode+'&text='+objectForText.targetText;
              break;
            case 'Google':
              url = 'https://translate.google.com/?sl=auto&tl='+objectForText.languageCode+'&text='+objectForText.targetText+'&op=translate';
              break;
          }
          switch ( objectForText.openMethod ) {
            case 'tab':
              openByNewTab( url );
              break;
            case 'window':
              openByNewWindow( url, obj.specifySize, obj.sizeWidth, obj.sizeHeight );
              break;
          }
          break;
      } // end: switch ( info.menuItemId )
  });
}); // end: browser.menus.onClicked.addListener()

browser.pageAction.onClicked.addListener( ( tab ) => {
  browser.storage.local.get()
    .then( ( obj ) => {
      if ( obj.translationService == undefined ) {
        obj.translationService = 'Google';
      }
      let url = null;
      const translationService = obj.translationService;
      const objectForPage      = initForPage( obj.openMethodText, obj.languageCode, tab.url );
        // keys: openMethod, languageCode, targetUrl
      switch ( translationService ) {
        case 'Bing':
          url = 'https://www.translatetheweb.com/?from=&to='+objectForPage.languageCode+'&a='+objectForPage.targetUrl;
          break;
        case 'Google':
          url = 'https://translate.google.com/translate?hl='+objectForPage.languageCode+'&sl=auto&tl='+objectForPage.languageCode+'&u='+objectForPage.targetUrl;
          break;
      }
      switch ( objectForPage.openMethod ) {
        case 'tab':
          openByNewTab( url );
          break;
        case 'window':
          openByNewWindow( url, obj.specifySize, obj.sizeWidth, obj.sizeHeight );
          break;
      }
  });
}); // end: browser.pageAction.onClicked.addListener()