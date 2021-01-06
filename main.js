
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

function optimizeSettingValue(paraLanguageCode, paraOpenMethod, paraTranslationService , paraTarget) {
  let values = new Object();

  console.log('values.languageCode: '+values.languageCode);
  switch (paraLanguageCode) {
    case 'auto':
    case undefined:
      values.languageCode = autoSelectLanguageCode();
      break;
    default:
      values.languageCode = paraLanguageCode;
      break;
  }
  console.log('values.languageCode: '+values.languageCode);

  console.log('values.openMethod: '+values.openMethod);
  switch (paraOpenMethod) {
    case undefined:
      values.openMethod = 'tab';
      break;
    default:
      values.openMethod = paraOpenMethod;
      break;
  }
  console.log('values.openMethod: '+values.openMethod);

  console.log('values.translationService: '+values.translationService);
  switch (paraTranslationService) {
    case undefined:
      values.translationService = 'Google';
      break;
    default:
      values.translationService = paraTranslationService;
      break;
  }
  console.log('values.translationService: '+values.translationService);

  values.target = paraTarget
    .replace( /\%/g, '％' )
    .replace( /\&/g, '＆' );
  values.target = htmlEscape( values.target );

  return values;
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
            // keys: languageCode, openMethod, translationService,target
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
        .then( ( object ) => {
          const translationService = checkTranslationService( object.translationService );
          const objectForText      = initForText( object.openMethodText, object.languageCode, info );
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