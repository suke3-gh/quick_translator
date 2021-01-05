
/*================
  Creating menu items
  ================*/
const idClickInPage = 'clickInPage';
const contextMenuForPage = browser.menus.create({
  contexts: ['page'],
  id:       idClickInPage,
  title:    browser.i18n.getMessage( 'contextMenuForPage' )
});

const idClickOnText = 'clickOnText';
const contextMenuForText = browser.menus.create({
  contexts: ['selection'],
  id:       idClickOnText,
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

function checkTranslationService( service ) {
  if ( service == undefined ) {
    service = 'Google';
  }
  return service;
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
  let url = null;
  const promiseAddonsetting = browser.storage.local.get( null );
  switch ( info.menuItemId ) {
    case idClickInPage:
      promiseAddonsetting
        .then( ( setting ) => {
          const translationService = checkTranslationService( setting.translationService );
          const objectForPage      = initForPage( setting.openMethodWebsite, setting.languageCode, info.pageUrl );
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
        })
      break;
    case idClickOnText:
      promiseAddonsetting
        .then( ( setting ) => {
          const translationService = checkTranslationService( setting.translationService );
          const objectForText      = initForText( setting.openMethodText, setting.languageCode, info );
            // keys: openMethod, languageCode, targetText
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
        } )
      break;
  } // end: switch ( info.menuItemId )
}); // end: browser.menus.onClicked.addListener()

browser.pageAction.onClicked.addListener( ( tab ) => {
  browser.storage.local.get(null).then( ( obj ) => {
    let url = null;
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