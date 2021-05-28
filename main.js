
/**
 * Functions
 */
function buildUrlTranslateText( object ) {
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

function buildUrlTranslateWebpage( object ) {
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
    .replace( /\&/g, '%26' )
    .replace( /\'/g, '%27' )
    .replace( /\</g, '%3C' )
    .replace( /\>/g, '%3E' );
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
function optimiseLanguageCode( object ) {
  switch ( object.languageCode ) {
    case 'auto':
    case undefined:
      object.languageCode = autoSelectLanguageCode();
      break;
  }
  return object;
}

function optimizeOpenMethod( object ) {
  switch ( object.openMethod ) {
    case undefined:
      object.openMethod = 'tab';
      break;
  }
  return object;
}

function optimizeTargetText( settings, targetText ) {
  settings.targetString = targetText;
  settings.targetString
    .replace( /\%/g, '％' )
    .replace( /\"/g, '%22' )
    .replace( /\&/g, '%26' )
    .replace( /\'/g, '%27' )
    .replace( /\</g, '%3C' )
    .replace( /\>/g, '%3E' );
  return settings;
}

function optimizeTargetUrl( settings, targetUrl ) {
  settings.targetString = targetUrl;
  settings.targetString
    .replace( /\"/g, '%22' )
    .replace( /\</g, '%3C' )
    .replace( /\>/g, '%3E' );
  return settings;
}

function optimizeTranslationService( object ) {
  switch ( object.translationService ) {
    case undefined:
      object.translationService = 'Google';
      break;
  }
  return object;
}

/**
 * functions         : processTranslate...
 * keys of "settings": languageCode, openMethodText / openMethodWebpage, 
 *                     sizeHeight, sizeWidth, specifySize, targetString, translationService
 */
function processTranslateText( targetText ) {
  browser.storage.local.get()
    .then( settings => {
      settings.openMethod = settings.openMethodText;
      delete settings.openMethodText;
      return optimizeOpenMethod( settings );
    })
    .then( settings => { return optimizeTranslationService( settings ); })
    .then( settings => { return optimiseLanguageCode( settings ); })
    .then( settings => { return optimizeTargetText( settings, targetText ); })
    .then( settings => { return buildUrlTranslateText( settings ); })
    .then( settings => { return openTranslationResult( settings ); });
}

function processTranslateWebpage( targetUrl ) {
  browser.storage.local.get()
    .then( settings => {
      settings.openMethod = settings.openMethodWebpage;
      delete settings.openMethodWebpage;
      return optimizeOpenMethod( settings );
    })
    .then( settings => { return optimizeTranslationService( settings ); })
    .then( settings => { return optimiseLanguageCode( settings ); })
    .then( settings => { return optimizeTargetUrl( settings, targetUrl ); })
    .then( settings => { return buildUrlTranslateWebpage( settings ); })
    .then( settings => { return openTranslationResult( settings ); });
}

/**
 * API
 */
 browser.menus.create({
  contexts: ['page'],
  id:       'idTranslateWebpage',
  title:    browser.i18n.getMessage( 'contextMenuForWebpageTranslation' )
});

browser.menus.create({
  contexts: ['selection'],
  id:       'idTranslateText',
  title:    browser.i18n.getMessage( 'contextMenuForTextTranslation' )
});

browser.menus.onClicked.addListener( ( info ) => {
  switch ( info.menuItemId ) {
    case 'idTranslateWebpage':
      processTranslateWebpage( info.pageUrl );
      break;
    case 'idTranslateText':
      processTranslateText( info.selectionText );
      break;
  }
}); // End: browser.menus.onClicked.addListener()

browser.pageAction.onClicked.addListener( ( tab ) => {
  processTranslateWebpage( tab.url );
}); // End: browser.pageAction.onClicked.addListener()
