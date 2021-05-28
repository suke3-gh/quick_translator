
/**
 * Functions
 */
function autoSelectLanguageCode() {
  let tempLanguageCode = browser.i18n.getUILanguage();

  /** Fix for German */
  if (tempLanguageCode.indexOf( 'de' ) != -1) {
    tempLanguageCode = 'de';
    return tempLanguageCode;
  }
  /** Fix for English */
  if (tempLanguageCode.indexOf( 'en' ) != -1) {
    tempLanguageCode = 'en';
    return tempLanguageCode;
  }
  /** Fix for Spnish */ 
  if (tempLanguageCode.indexOf( 'es' ) != -1) {
    tempLanguageCode = 'es';
    return tempLanguageCode;
  }
  /** Fix for Portuguese */
  if (tempLanguageCode.indexOf( 'pt' ) != -1) {
    tempLanguageCode = 'pt';
    return tempLanguageCode;
  }
  return tempLanguageCode;
}

function buildUrlTranslateText( settings ) {
  switch ( settings.translationService ) {
    case 'Microsoft':
      settings.url = 'https://www.bing.com/translator?from=&to='+settings.languageCode+'&text='+settings.targetString;
      break;
    case 'Google':
      settings.url = 'https://translate.google.com/?sl=auto&tl='+settings.languageCode+'&text='+settings.targetString+'&op=translate';
      break;
  }
  return settings;
}

function buildUrlTranslateWebpage( settings ) {
  switch ( settings.translationService ) {
    case 'Microsoft':
      settings.url = 'https://www.translatetheweb.com/?from=&to='+settings.languageCode+'&a='+settings.targetString;
      break;
    case 'Google':
      settings.url = 'https://translate.google.com/translate?hl='+settings.languageCode+'&sl=auto&tl='+settings.languageCode+'&u='+settings.targetString;
      break;
  }
  return settings;
}

function openTranslationResult( settings ) {
  switch ( settings.openMethod ) {
    case 'tab':
      browser.tabs.create({ url: settings.url });
      break;
    case 'window':
      if ( settings.specifySizeFlag == true ) {
        browser.windows.create({ url: settings.url, height: settings.sizeHeight, width: settings.sizeWidth });
      } else {
        browser.windows.create({ url: settings.url });
      }
      break;
  }
}

/**
 * Functions: optimize...
 */
function optimiseLanguageCode( settings ) {
  switch ( settings.languageCode ) {
    case 'auto':
    case undefined:
      settings.languageCode = autoSelectLanguageCode();
      break;
  }
  return settings;
}

function optimizeOpenMethod( settings ) {
  switch ( settings.openMethod ) {
    case undefined:
      settings.openMethod = 'tab';
      break;
  }
  return settings;
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

function optimizeTranslationService( settings ) {
  switch ( settings.translationService ) {
    case undefined:
      settings.translationService = 'Google';
      break;
  }
  return settings;
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
