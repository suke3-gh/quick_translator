
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
function addUrlForPage( settingValueObject ) {
  switch ( settingValueObject.translationService ) {
    case 'Bing':
      settingValueObject.url = 'https://www.translatetheweb.com/?from=&to='+settingValueObject.languageCode+'&a='+settingValueObject.target;
      break;
    case 'Google':
      settingValueObject.url = 'https://translate.google.com/translate?hl='+settingValueObject.languageCode+'&sl=auto&tl='+settingValueObject.languageCode+'&u='+settingValueObject.target;
      break;
  }
  return settingValueObject;
}

function addUrlForText( settingValueObject ) {
  switch ( settingValueObject.translationService ) {
    case 'Bing':
      settingValueObject.url = 'https://www.bing.com/translator?from=&to='+settingValueObject.languageCode+'&text='+settingValueObject.target;
      break;
    case 'Google':
      settingValueObject.url = 'https://translate.google.com/?sl=auto&tl='+settingValueObject.languageCode+'&text='+settingValueObject.target+'&op=translate';
      break;
  }
  return settingValueObject;
}

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

function openTranslationResult( settingValueObject ) {
  switch ( settingValueObject.openMethod ) {
    case 'tab':
      browser.tabs.create({ url: settingValueObject.url });
      break;
    case 'window':
      if ( settingValueObject.specifySize == true ) {
        browser.windows.create({ url: settingValueObject.url, width: settingValueObject.sizeWidth, height: settingValueObject.sizeHeight });
      } else {
        browser.windows.create({ url: settingValueObject.url });
      }
      break;
  }
}

function optimizeSettingValue( settingValueObject, targetString ) {
  // keys of object: languageCode, openMethod, sizeHeight, sizeWidth, specifySize, translationService,

  switch ( settingValueObject.languageCode ) {
    case 'auto':
    case undefined:
      settingValueObject.languageCode = autoSelectLanguageCode();
      break;
    default:
      break;
  }

  switch ( settingValueObject.openMethod ) {
    case undefined:
      settingValueObject.openMethod = 'tab';
      break;
  }

  settingValueObject.target = targetString
    .replace( /\%/g, '％' )
    .replace( /\&/g, '＆' );
  settingValueObject.target = htmlEscape( settingValueObject.target );

  switch ( settingValueObject.translationService ) {
    case undefined:
      settingValueObject.translationService = 'Google';
      break;
  }

  return settingValueObject;
}

/*================
  API
  ================*/
browser.menus.onClicked.addListener( ( info ) => {
  const promiseAddonSetting = browser.storage.local.get( null );
  switch ( info.menuItemId ) {
    case idClickInPage:
      promiseAddonSetting
        .then( ( resultObject1 ) => {
          // Start: Fix for open method.
          resultObject1.openMethod = resultObject1.openMethodWebsite;
          delete resultObject1.openMethodWebsite;
          // End  : Fix for ...
          return optimizeSettingValue( resultObject1, info.pageUrl );
        } )
        .then( ( resultObject2 ) => {
          return addUrlForPage( resultObject2 );
        } )
        .then( ( resultObject3 ) => {
          openTranslationResult( resultObject3 );
        } );
      break;
    case idClickOnText:
      promiseAddonSetting
        .then( ( resultObject1 ) => {
          // Start: Fix for open method.
          resultObject1.openMethod = resultObject1.openMethodText;
          delete resultObject1.openMethodText;
          // End  : Fix for ...
          return optimizeSettingValue( resultObject1, info.selectionText );
        } )
        .then( ( resultObject2 ) => {
          return addUrlForText( resultObject2 );
        } )
        .then( ( resultObject3 ) => {
          openTranslationResult( resultObject3 );
        } );
      break;
  }
} ); // end: browser.menus.onClicked.addListener()

browser.pageAction.onClicked.addListener( ( tab ) => {
  const promiseAddonSetting = browser.storage.local.get( null );
  promiseAddonSetting
    .then( ( resultObject1 ) => {
      // Start: Fix for open method.
      resultObject1.openMethod = resultObject1.openMethodWebsite;
      delete resultObject1.openMethodWebsite;
      // End  : Fix for ...
      return optimizeSettingValue( resultObject1, tab.url );
    } )
    .then( ( resultObject2 ) => {
      return addUrlForPage( resultObject2 );
    } )
    .then( ( resultObject3 ) => {
      openTranslationResult( resultObject3 );
    } );
} ); // end: browser.pageAction.onClicked.addListener()