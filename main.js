
'use strict';

class Background {
  menuItems;
  languageCode;
  openingMethod;
  targetText;
  service;
  windowFlag;
  windowHeight;
  windowWidth;
  url;

  constructor() {
    this.languageCode = 'en';
    this.openingMethod = 'tab';
    this.targetText = '';
    this.service = 'Google';
    this.flagKey = false;
    this.windowWidth = '0';
    this.windowHeight = '0';
    this.url = '';

    this.menuItems = {
      text: 'idTranslateText',
      web:  'idTranslateWebpage'
    }
  }

  exceptionLog( error ) {
    console.log( 'Catched an exception: ' + error.message );
  }

  getMenuItems() {
    return this.menuItems;
  }

  menuItem( contextType, itemId, title ) {
    browser.menus.create({
      contexts: [contextType],
      id:       itemId,
      title:    browser.i18n.getMessage( title )
    });
  }

  prepareOnclickedEvent() {
    browser.menus.onClicked.addListener( async ( info ) => {
      switch ( info.menuItemId ) {
        case this.menuItems.text:
          await Promise.all([
            this.languageCodeSetup( 'languageCode' ),
            this.openingMethodSetup( 'openMethodText' ),
            this.targetTextSetup( info.selectionText ),
            this.serviceSetup( 'translationService' ),
            this.windowSizeSetup( 'specifySizeFlag', 'sizeWidth', 'sizeHeight' )
          ])
          .catch( ( error ) => this.exceptionLog( error ) );
          await this.urlAssemblingText()
          .catch( ( error ) => this.exceptionLog( error ) );
          this.urlOpen();
          break;
        /*case this.menuItems.web:
          // processTranslateWebpage( info.pageUrl );
          await Promise.all([
            this.languageCodeSetup( 'languageCode' ),
            this.openingMethodSetup( 'openMethodWebpage' ),
            this.targetTextSetup( info.pageUrl ),
            this.serviceSetup( 'translationService' ),
            this.windowSizeSetup( 'specifySizeFlag', 'sizeWidth', 'sizeHeight' )
          ])
          .catch( ( error ) => this.exceptionLog( error ) );
          break;*/
      }
    });
  }

  async languageCodeSetup( key ) {
    try {
      const object = await browser.storage.local.get( key );
      object[key] = 'auto' ? browser.i18n.getUILanguage() : object[key];
      const fixCodes = [ 'de', 'en', 'es', 'pt' ];
      fixCodes.forEach( code => {
        object[key] = ( object[key].indexOf( code ) != -1 ) ? code : object[key];
      });
      this.languageCode = object[key];
      return true;
    } catch ( error ) {
      this.exceptionLog( error );
      return false;
    }
  }

  async openingMethodSetup( key ) {
    try {
      const object       = await browser.storage.local.get( key );
      this.openingMethod = object[key] ?? 'tab';
      return true;
    } catch ( error ) {
      this.exceptionLog( error );
      return false;
    }
  }

  async targetTextSetup( text ) {
    try {
      text.replaceAll( /\%/g, '％' )
        .replaceAll( /\"/g, '%22' )
          .replaceAll( /\&/g, '%26' )
            .replaceAll( /\'/g, '%27' )
              .replaceAll( /\</g, '%3C' )
                .replaceAll( /\>/g, '%3E' );
      this.targetText = text;
      return true;
    } catch ( error ) {
      this.exceptionLog( error );
      return false;
    }
  }

  async serviceSetup( key ) {
    try {
      const object = await browser.storage.local.get( key );
      this.service = object[key] ?? 'Google';
      return true;
    } catch ( error ) {
      this.exceptionLog( error );
      return false;
    }
  }

  async windowSizeSetup( flagKey, widthKey, heightKey ) {
    try {
      const object      = await browser.storage.local.get([ flagKey, widthKey, heightKey ]);
      this.windowFlag   = object[flagKey]   ?? false;
      this.windowWidth  = object[widthKey]  ?? 800;
      this.windowHeight = object[heightKey] ?? 720;
      return true;
    } catch ( error ) {
      this.exceptionLog( error );
      return false;
    }
  }

  async urlAssemblingWeb() {
    try {
      switch ( this.service ) {
        case 'Google':
          this.url = 'https://translate.google.com/translate?hl='+this.languageCode+'&sl=auto&tl='+this.languageCode+'&u='+obj.targetPage;
          break;
        case 'Microsoft':
          this.url = 'https://www.translatetheweb.com/?from=&to='+this.languageCode+'&a='+this.targetPage;
          break;
      }
      return true;
    } catch ( error ) {
      this.exceptionLog( error );
      return false;
    }
  }

  async urlAssemblingText() {
    try {
      switch ( this.service ) {
        case 'Microsoft':
          this.url = 'https://www.bing.com/translator?from=&to='+this.languageCode+'&text='+this.targetText;
          break;
        case 'Google':
          this.url = 'https://translate.google.com/?sl=auto&tl='+this.languageCode+'&text='+this.targetText+'&op=translate';
          break;
      }
      return true;
    } catch ( error ) {
      this.exceptionLog( error );
      return false; 
    }
  }

  urlOpen() {
    try {
      switch ( this.openingMethod ) {
        case 'tab':
          browser.tabs.create({
            url: this.url
          });
          break;
        case 'window':
          if ( this.windowFlag == true ) {
            browser.windows.create({
              url: this.url, width: this.windowWidth, height: this.windowHeight
            });
          } else {
            browser.windows.create({
              url: this.url
            });
          }
          break;
      }
      return true;
    } catch ( error ) {
      this.exceptionLog( error );
      return false;
    }
  }
}

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

function exceptionLog( id ) {
  console.log( id.name + ': ' + id.message );
}
  
function openTranslationResult( obj ) {
  switch ( obj.openMethod ) {
    case 'tab':
      browser.tabs.create({ url: obj.url });
      break;
    case 'window':
      if ( obj.specifySizeFlag == true ) {
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

function optimizeWindowSizeValue( size ) {
  switch ( size ) {
    case null:
    case undefined:
      size = 0;
      break;
  }
  return size;
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
      obj.sizeHeight         = optimizeWindowSizeValue( obj.sizeHeight );
      obj.sizeWidth          = optimizeWindowSizeValue( obj.sizeWidth );
      return obj;
    })
    .then( ( obj ) => { return buildUrlTranslateText( obj ); })
    .then( ( obj ) => { openTranslationResult( obj ); })
    .catch( ( id ) => exceptionLog( id ) );
}
  
function processTranslateWebpage( targetUrl ) {
  browser.storage.local.get()
    .then( ( obj ) => {
      obj.languageCode       = optimiseLanguageCode( obj.languageCode );
      obj.openMethod         = optimizeOpenMethod( obj.openMethodWebpage );
      obj.targetString       = optimizeTargetUrl( targetUrl );
      obj.translationService = optimizeTranslationService( obj.translationService );
      obj.sizeHeight         = optimizeWindowSizeValue( obj.sizeHeight );
      obj.sizeWidth          = optimizeWindowSizeValue( obj.sizeWidth );
      return obj;
    })
    .then( ( obj ) => { return buildUrlTranslateWebpage( obj ); })
    .then( ( obj ) => { openTranslationResult( obj ); })
    .catch( ( id ) => exceptionLog( id ) );
}
  


const BackgroundIns = new Background();
BackgroundIns.menuItem( 'selection', BackgroundIns.getMenuItems().text, 'contextMenuForTextTranslation' );
BackgroundIns.menuItem( 'page', BackgroundIns.getMenuItems().web, 'contextMenuForWebpageTranslation' );
BackgroundIns.prepareOnclickedEvent();

