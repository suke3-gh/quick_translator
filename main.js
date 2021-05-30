/**
 * background script for add-on
 */

/** functions */
function autoSelectLanguageCode() {
  let tempLanguageCode = browser.i18n.getUILanguage();

  /** fix for German */
  if ( tempLanguageCode.indexOf( 'de' ) != -1 ) {
    tempLanguageCode = 'de';
    return tempLanguageCode;
  }
  /** fix for English */
  if ( tempLanguageCode.indexOf( 'en' ) != -1 ) {
    tempLanguageCode = 'en';
    return tempLanguageCode;
  }
  /** fix for Spnish */ 
  if ( tempLanguageCode.indexOf( 'es' ) != -1 ) {
    tempLanguageCode = 'es';
    return tempLanguageCode;
  }
  /** fix for Portuguese */
  if ( tempLanguageCode.indexOf( 'pt' ) != -1 ) {
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

/** functions: optimize~ */
function optimiseLanguageCode( languageCode ) {
  switch ( languageCode ) {
    case 'auto':
    case undefined:
      languageCode = autoSelectLanguageCode();
      break;
  }
  return languageCode;
}

function optimizeOpenMethod( openMethod ) {
  switch ( openMethod ) {
    case undefined:
      openMethod = 'tab';
      break;
  }
  return openMethod;
}

function optimizeTargetText( targetText ) {
  targetText
    .replace( /\%/g, '％' )
    .replace( /\"/g, '%22' )
    .replace( /\&/g, '%26' )
    .replace( /\'/g, '%27' )
    .replace( /\</g, '%3C' )
    .replace( /\>/g, '%3E' );
  return targetText;
}

function optimizeTargetUrl( targetUrl ) {
  targetUrl
    .replace( /\"/g, '%22' )
    .replace( /\</g, '%3C' )
    .replace( /\>/g, '%3E' );
  return targetUrl;
}

function optimizeTranslationService( translationService ) {
  switch ( translationService ) {
    case undefined:
      translationService = 'Google';
      break;
  }
  return translationService;
}

/**
 * functions         : processTranslate~
 * keys of "settings": languageCode, openMethodText / openMethodWebpage, 
 *                     sizeHeight, sizeWidth, specifySize, targetString, translationService
 */
function processTranslateText( targetText ) {
  browser.storage.local.get( null )
    .then( settings => {
      settings.languageCode       = optimiseLanguageCode( settings.languageCode );
      settings.openMethod         = optimizeOpenMethod( settings.openMethodText );
      settings.targetString       = optimizeTargetText( targetText );
      settings.translationService = optimizeTranslationService( settings.translationService );
      delete settings.openMethodText;
      return settings;
    })
    .then( settings => { return buildUrlTranslateText( settings ); })
    .then( settings => { return openTranslationResult( settings ); })
    .catch( e => {
      console.log( e.name + ': ' + e.message );
    });
}

function processTranslateWebpage( targetUrl ) {
  browser.storage.local.get( null )
    .then( settings => {
      settings.languageCode       = optimiseLanguageCode( settings.languageCode );
      settings.openMethod         = optimizeOpenMethod( settings.openMethodWebpage );
      settings.targetString       = optimizeTargetUrl( targetUrl );
      settings.translationService = optimizeTranslationService( settings.translationService );
      delete settings.openMethodWebpage;
      return settings;
    })
    .then( settings => { return buildUrlTranslateWebpage( settings ); })
    .then( settings => { return openTranslationResult( settings ); })
    .catch( e => {
      console.log( e.name + ': ' + e.message );
    });
}

/** setup */
function initialProcess() {
  const id1 = 'idTranslateText';
  const id2 = 'idTranslateWebpage';

  browser.menus.create({
    contexts: ['selection'],
    id:       id1,
    title:    browser.i18n.getMessage( 'contextMenuForTextTranslation' )
  });

  browser.menus.create({
    contexts: ['page'],
    id:       id2,
    title:    browser.i18n.getMessage( 'contextMenuForWebpageTranslation' )
  });
  
  browser.menus.onClicked.addListener( ( info ) => {
    switch ( info.menuItemId ) {
      case id1:
        processTranslateText( info.selectionText );
        break;
      case id2:
        processTranslateWebpage( info.pageUrl );
        break;
    }
  });

  browser.browserAction.onClicked.addListener( ( tab ) => {
    processTranslateWebpage( tab.url );
  });
}

initialProcess();
