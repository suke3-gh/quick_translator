
/*================
  Creating menu items
  ================*/
const idForWebpageTranslation = 'idForWebpageTranslation';
const contextMenuForPage = browser.menus.create({
  contexts: ['page'],
  id:       idForWebpageTranslation,
  title:    browser.i18n.getMessage( 'contextMenuForWebpageTranslation' )
});

const idForTextTranslation = 'idForTextTranslation';
const contextMenuForText = browser.menus.create({
  contexts: ['selection'],
  id:       idForTextTranslation,
  title:    browser.i18n.getMessage( 'contextMenuForTextTranslation' )
});

/*================
  Functions
  ================*/
function addUrlForTextTranslation( settingValueObject ) {
  switch ( settingValueObject.translationService ) {
    case 'Bing':
      settingValueObject.url = 'https://www.bing.com/translator?from=&to='+settingValueObject.languageCode+'&text='+settingValueObject.targetString;
      break;
    case 'Google':
      settingValueObject.url = 'https://translate.google.com/?sl=auto&tl='+settingValueObject.languageCode+'&text='+settingValueObject.targetString+'&op=translate';
      break;
  }
  return settingValueObject;
}

function addUrlForWebpageTranslation( settingValueObject ) {
  switch ( settingValueObject.translationService ) {
    case 'Bing':
      settingValueObject.url = 'https://www.translatetheweb.com/?from=&to='+settingValueObject.languageCode+'&a='+settingValueObject.targetString;
      break;
    case 'Google':
      settingValueObject.url = 'https://translate.google.com/translate?hl='+settingValueObject.languageCode+'&sl=auto&tl='+settingValueObject.languageCode+'&u='+settingValueObject.targetString;
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
        browser.windows.create({ url: settingValueObject.url, height: settingValueObject.sizeHeight, width: settingValueObject.sizeWidth });
      } else {
        browser.windows.create({ url: settingValueObject.url });
      }
      break;
  }
}

function optimizeSettingValue( settingValueObject ) {
  // Keys of object: languageCode, openMethod, sizeHeight, sizeWidth, specifySize, targetString, translationService,

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

  settingValueObject.targetString
    .replace( /\%/g, '％' )
    .replace( /\&/g, '＆' );
  settingValueObject.targetString = htmlEscape( settingValueObject.targetString );

  switch ( settingValueObject.translationService ) {
    case undefined:
      settingValueObject.translationService = 'Google';
      break;
  }

  return settingValueObject;
}

/*----------------
  processing of ...
  ----------------*/
function processingOfTextTranslation( targetString ) {
  browser.storage.local.get( null ) // Promise
    .then( ( resultObject1 ) => {
      resultObject1.targetString = targetString;
      // Start: Fix for open method.
      resultObject1.openMethod = resultObject1.openMethodText;
      delete resultObject1.openMethodText;
      // End  : Fix for ...
      return optimizeSettingValue( resultObject1 );
    } )
    .then( ( resultObject2 ) => {
      return addUrlForTextTranslation( resultObject2 );
    } )
    .then( ( resultObject3 ) => {
      openTranslationResult( resultObject3 );
    } );
}

function processingOfWebpageTranslation( targetString ) {
  browser.storage.local.get( null ) // Promise
    .then( ( resultObject1 ) => {
      resultObject1.targetString = targetString;
      // Start: Fix for open method.
      resultObject1.openMethod = resultObject1.openMethodWebsite;
      delete resultObject1.openMethodWebsite;
      // End  : Fix for ...
      return optimizeSettingValue( resultObject1 );
    } )
    .then( ( resultObject2 ) => {
      return addUrlForWebpageTranslation( resultObject2 );
    } )
    .then( ( resultObject3 ) => {
      openTranslationResult( resultObject3 );
    } );
}

/*================
  API
  ================*/
browser.menus.onClicked.addListener( ( info ) => {
  switch ( info.menuItemId ) {
    case idForWebpageTranslation:
      processingOfWebpageTranslation( info.pageUrl );
      break;
    case idForTextTranslation:
      processingOfTextTranslation( info.selectionText );
      break;
  }
} ); // End: browser.menus.onClicked.addListener()

browser.pageAction.onClicked.addListener( ( tab ) => {
  processingOfWebpageTranslation( tab.url );
} ); // End: browser.pageAction.onClicked.addListener()