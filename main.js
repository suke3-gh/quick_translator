
/** functions */
function autoSelectLanguageCode() {
  let languageCode = browser.i18n.getUILanguage();
  
  /** fix for German */
  if ( languageCode.indexOf( 'de' ) != -1 ) {
    languageCode = 'de';
    return languageCode;
  }
  /** fix for English */
  if ( languageCode.indexOf( 'en' ) != -1 ) {
    languageCode = 'en';
    return languageCode;
  }
  /** fix for Spnish */ 
  if ( languageCode.indexOf( 'es' ) != -1 ) {
    languageCode = 'es';
    return languageCode;
  }
  /** fix for Portuguese */
  if ( languageCode.indexOf( 'pt' ) != -1 ) {
    languageCode = 'pt';
    return languageCode;
  }
  return languageCode;
}
  
function buildUrlTranslateText( obj ) {
  switch ( obj.translationService ) {
    case 'Microsoft':
      obj.url = 'https://www.bing.com/translator?from=&to='+obj.languageCode+'&text='+obj.targetString;
      break;
    case 'Google':
      obj.url = 'https://translate.google.com/?sl=auto&tl='+obj.languageCode+'&text='+obj.targetString+'&op=translate';
      break;
  }
  return obj;
}
  
function buildUrlTranslateWebpage( obj ) {
  switch ( obj.translationService ) {
    case 'Microsoft':
      obj.url = 'https://www.translatetheweb.com/?from=&to='+obj.languageCode+'&a='+obj.targetString;
      break;
    case 'Google':
      obj.url = 'https://translate.google.com/translate?hl='+obj.languageCode+'&sl=auto&tl='+obj.languageCode+'&u='+obj.targetString;
      break;
  }
  return obj;
}
  
function openTranslationResult( obj ) {
  switch ( obj.openMethod ) {
    case 'tab':
      browser.tabs.create({ url: obj.url });
      break;
    case 'window':
      if ( obj.specifySizeFlag == 'Y' ) {
        browser.windows.create({ url: obj.url, height: Number( obj.sizeHeight ), width: Number( obj.sizeWidth ) });
      } else {
        browser.windows.create({ url: obj.url });
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
  browser.storage.local.get()
    .then( ( obj ) => {
      obj.languageCode       = optimiseLanguageCode( obj.languageCode );
      obj.openMethod         = optimizeOpenMethod( obj.openMethodText );
      obj.targetString       = optimizeTargetText( targetText );
      obj.translationService = optimizeTranslationService( obj.translationService );
      return obj;
    })
    .then( ( obj ) => { return buildUrlTranslateText( obj ); })
    .then( ( obj ) => { openTranslationResult( obj ); })
    .catch( ( id ) => {
      console.log( id.name + ': ' + id.message );
  });
}
  
function processTranslateWebpage( targetUrl ) {
  browser.storage.local.get()
    .then( ( obj ) => {
      obj.languageCode       = optimiseLanguageCode( obj.languageCode );
      obj.openMethod         = optimizeOpenMethod( obj.openMethodWebpage );
      obj.targetString       = optimizeTargetUrl( targetUrl );
      obj.translationService = optimizeTranslationService( obj.translationService );
      return obj;
    })
    .then( ( obj ) => { return buildUrlTranslateWebpage( obj ); })
    .then( ( obj ) => { openTranslationResult( obj ); })
    .catch( ( id ) => {
      console.log( id.name + ': ' + id.message );
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
}
  
initialProcess();
