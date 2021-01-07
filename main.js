
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

function optimizeSettingValue(object, targetString) {
  // keys of object: languageCode, openMethod, sizeHeight, sizeWidth, specifySize, translationService,

  switch (object.languageCode) {
    case 'auto':
    case undefined:
      object.languageCode = autoSelectLanguageCode();
      break;
    default:
      break;
  }

  switch (object.openMethod) {
    case undefined:
      object.openMethod = 'tab';
      break;
  }

  switch (object.translationService) {
    case undefined:
      object.translationService = 'Google';
      break;
  }

  object.target = targetString
    .replace( /\%/g, '％' )
    .replace( /\&/g, '＆' );
  object.target = htmlEscape( object.target );

  return object;
}

function addUrlForText(object) {
  switch ( object.translationService ) {
    case 'Bing':
      object.url = 'https://www.bing.com/translator?from=&to='+object.languageCode+'&text='+object.target;
      break;
    case 'Google':
      object.url = 'https://translate.google.com/?sl=auto&tl='+object.languageCode+'&text='+object.target+'&op=translate';
      break;
  }
  return object;
}

function openTranslationResult(setting) {
  switch ( setting.openMethod ) {
    case 'tab':
      browser.tabs.create({ url: setting.url });
      break;
    case 'window':
      if (setting.specifySize == true) {
        browser.windows.create({ url: setting.url, width: setting.sizeWidth, height: setting.sizeHeight });
      } else {
        browser.windows.create({ url: setting.url });
      }
      break;
  }
}

/*================
  API
  ================*/
browser.menus.onClicked.addListener( ( info ) => {
  let url = null;
  const promiseAddonSetting = browser.storage.local.get( null );
  switch ( info.menuItemId ) {
    case idClickInPage:
      promiseAddonSetting
        .then( ( object ) => {
          const setting = optimizeSettingValue(object.languageCode, object.openMethod, object.translationService, info.pageUrl);
            // keys: languageCode, openMethod, translationService, target
          switch ( setting.translationService ) {
            case 'Bing':
              url = 'https://www.translatetheweb.com/?from=&to='+setting.languageCode+'&a='+setting.target;
              break;
            case 'Google':
              url = 'https://translate.google.com/translate?hl='+setting.languageCode+'&sl=auto&tl='+setting.languageCode+'&u='+setting.target;
              break;
          }
          switch ( setting.openMethod ) {
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
      promiseAddonSetting
        .then( ( resultObject1 ) => {
          // start: Fix for ...
          resultObject1.openMethod = resultObject1.openMethodText;
          delete resultObject1.openMethodText;
          // end: Fix for ...
          return optimizeSettingValue( resultObject1, info.selectionText );
        } )
        .then( ( resultObject2 ) => {
          return addUrlForText( resultObject2 );
        } )
        .then( ( resultObject3 ) => {
          openTranslationResult( resultObject3 );
        } )
      break;
  } // end: switch ( info.menuItemId )
}); // end: browser.menus.onClicked.addListener()

browser.pageAction.onClicked.addListener( ( tab ) => {
  browser.storage.local.get(null).then( ( obj ) => {
    let url = null;
    const translationService = checkTranslationService( obj.translationService );
    const setting      = initForPage( obj.openMethodText, obj.languageCode, tab.url );
      // keys: openMethod, languageCode, targetUrl
    switch ( translationService ) {
      case 'Bing':
        url = 'https://www.translatetheweb.com/?from=&to='+setting.languageCode+'&a='+setting.targetUrl;
        break;
      case 'Google':
        url = 'https://translate.google.com/translate?hl='+setting.languageCode+'&sl=auto&tl='+setting.languageCode+'&u='+setting.targetUrl;
        break;
    }
    switch ( setting.openMethod ) {
      case 'tab':
        openByNewTab( url );
        break;
      case 'window':
        openByNewWindow( url, obj.specifySize, obj.sizeWidth, obj.sizeHeight );
        break;
    }
  });
}); // end: browser.pageAction.onClicked.addListener()