
/**
 * Creating menu items
 */
const idForWebpageTranslation = 'idForWebpageTranslation';
browser.menus.create({
  contexts: ['page'],
  id:       idForWebpageTranslation,
  title:    browser.i18n.getMessage( 'contextMenuForWebpageTranslation' )
});

const idForTextTranslation = 'idForTextTranslation';
browser.menus.create({
  contexts: ['selection'],
  id:       idForTextTranslation,
  title:    browser.i18n.getMessage( 'contextMenuForTextTranslation' )
});

/**
 * Functions
 */
function addUrlPropertyForTextTranslation( object ) {
  switch ( object.translationService ) {
    case 'Microsoft':
      object.url = 'https://www.bing.com/translator?from=&to='+object.languageCode+'&text='+object.targetString;
      break;
    case 'Google':
      object.url = 'https://translate.google.com/?sl=auto&tl='+object.languageCode+'&text='+object.targetString+'&op=translate';
      break;
  }
  return object;
}

function addUrlPropertyForWebpageTranslation( object ) {
  switch ( object.translationService ) {
    case 'Microsoft':
      object.url = 'https://www.translatetheweb.com/?from=&to='+object.languageCode+'&a='+object.targetString;
      break;
    case 'Google':
      object.url = 'https://translate.google.com/translate?hl='+object.languageCode+'&sl=auto&tl='+object.languageCode+'&u='+object.targetString;
      break;
  }
  return object;
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

function openTranslationResult( settingsObject ) {
  switch ( settingsObject.openMethod ) {
    case 'tab':
      browser.tabs.create({ url: settingsObject.url });
      break;
    case 'window':
      if ( settingsObject.specifySizeFlag == true ) {
        browser.windows.create({ url: settingsObject.url, height: settingsObject.sizeHeight, width: settingsObject.sizeWidth });
      } else {
        browser.windows.create({ url: settingsObject.url });
      }
      break;
  }
}

/**
 * Functions: optimize...
 */
function optimizeLanguageCodeProperty( object ) {
  switch ( object.languageCode ) {
    case 'auto':
    case undefined:
      object.languageCode = autoSelectLanguageCode();
      break;
  }
  return object;
}

function optimizeOpenMethodProperty( object ) {
  switch ( object.openMethod ) {
    case undefined:
      object.openMethod = 'tab';
      break;
  }
  return object;
}

function optimizeTargetStringProperty( object, targetString ) {
  object.targetString = targetString
    .replace( /\%/g, '％' )
    .replace( /\&/g, '＆' )
  object.targetString = htmlEscape( object.targetString );
  return object;
}

function optimizeTranslationServiceProperty( object ) {
  switch ( object.translationService ) {
    case undefined:
      object.translationService = 'Google';
      break;
  }
  return object;
}

/**
 * Functions: processingOf...
 */
function processingOfTextTranslation( targetString ) {
  browser.storage.local.get( null ) // Promise
    .then( ( settingsObject1 ) => {
      // Keys of object: languageCode, openMethod, sizeHeight, sizeWidth, specifySize, targetString, translationService
      settingsObject1.openMethod = settingsObject1.openMethodText;
      delete settingsObject1.openMethodText;
      return optimizeOpenMethodProperty( settingsObject1 );
    } )
    .then( ( settingsObject2 ) => {
      return optimizeTranslationServiceProperty( settingsObject2 );
    } )
    .then( ( settingsObject3 ) => {
      return optimizeLanguageCodeProperty( settingsObject3 );
    } )
    .then( ( settingsObject4 ) => {
      return optimizeTargetStringProperty( settingsObject4, targetString );
    } )
    .then( ( settingsObject5 ) => {
      return addUrlPropertyForTextTranslation( settingsObject5 );
    } )
    .then( ( settingsObject6 ) => {
      openTranslationResult( settingsObject6 );
    } );
}

function processingOfWebpageTranslation( targetString ) {
  browser.storage.local.get( null ) // Promise
    .then( ( settingsObject1 ) => {
      // Keys of object: languageCode, openMethod, sizeHeight, sizeWidth, specifySize, targetString, translationService
      settingsObject1.openMethod = settingsObject1.openMethodWebpage;
      delete settingsObject1.openMethodWebpage;
      return optimizeOpenMethodProperty( settingsObject1 );
    } )
    .then( ( settingsObject2 ) => {
      return optimizeTranslationServiceProperty( settingsObject2 );
    } )
    .then( ( settingsObject3 ) => {
      return optimizeLanguageCodeProperty( settingsObject3 );
    } )
    .then( ( settingsObject4 ) => {
      return optimizeTargetStringProperty( settingsObject4, targetString );
    } )
    .then( ( settingsObject5 ) => {
      return addUrlPropertyForWebpageTranslation( settingsObject5 );
    } )
    .then( ( settingsObject6 ) => {
      openTranslationResult( settingsObject6 );
    } );
}

/**
 * API
 */
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
