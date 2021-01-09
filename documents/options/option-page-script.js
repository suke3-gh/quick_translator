
const elementOpenMethodText         = document.getElementById( 'formOpenMethodText' );
const elementOpenMethodWebpage      = document.getElementById( 'formOpenMethodWebpage' );
const elementOpenMethodSpecifySize  = document.getElementById( 'formOpenMethodSpecifySize' );
const elementSpecifySizeFlag        = elementOpenMethodSpecifySize.querySelector( '#inputSpecifySize' );
const elementSizeOfNewWindowWidth   = elementOpenMethodSpecifySize.querySelector( '#inputSizeOfNewWindowWidth' );
const elementSizeOfNewWindowHeight  = elementOpenMethodSpecifySize.querySelector( '#inputSizeOfNewWindowHeight' );
const elementTranslationService     = document.getElementById( 'formTranslationService' );
const elementLanguageCode           = document.getElementById( 'formLanguageCode' );
const elementLanguageCodeListBing   = document.getElementById( 'languageCodeListBing' );
const elementLanguageCodeListGoogle = document.getElementById( 'languageCodeListGoogle' );

/*================
  Functions
  ================*/
function changeLanguageCodeList( translationService ) {
  switch ( translationService ) {
    case 'Bing':
      elementLanguageCodeListBing.style.display   = 'flex';
      elementLanguageCodeListGoogle.style.display = 'none';
      break;
    case 'Google':
      elementLanguageCodeListBing.style.display   = 'none';
      elementLanguageCodeListGoogle.style.display = 'flex';
      break;
  }
}

function readoutLanguageCode( settingValueObject ) {
  if ( settingValueObject.languageCode == undefined ) {
    switch ( settingValueObject.translationService ) {
      case 'Bing':
        elementLanguageCodeListBing.querySelector( 'input[value="auto"]' ).checked = true;
        break;
      case 'Google':
      default:
        elementLanguageCodeListGoogle.querySelector( 'input[value="auto"]' ).checked = true;
        break;
    }
  } else {
    switch ( settingValueObject.translationService ) {
      case 'Bing':
        // Checking unsupported language
        try {
          elementLanguageCodeListBing.querySelector( 'input[value="'+settingValueObject.languageCode+'"]' ).checked = true;
        } catch ( error)  {
          elementLanguageCodeListBing.querySelector( 'input[value="auto"]' ).checked = true;
        }
        break;
      case 'Google':
      default:
        // Checking unsupported language
        try {
          elementLanguageCodeListGoogle.querySelector( 'input[value="'+settingValueObject.languageCode+'"]' ).checked = true;
        } catch ( error ) {
          elementLanguageCodeListGoogle.querySelector( 'input[value="auto"]' ).checked = true;
        }
        break;
    }
  }
}

function readoutOpenMethodText( openMethod ) {
  switch ( openMethod ) {
    case null:
    case undefined:
      elementOpenMethodText.querySelector( 'input[value="tab"]' ).checked = true;
      break;
    default:
      elementOpenMethodText.querySelector( 'input[value="'+openMethod+'"]' ).checked = true;
      break;
  }
}

function readoutOpenMethodWebpage( openMethod ) {
  switch ( openMethod ) {
    case null:
    case undefined:
      elementOpenMethodWebpage.querySelector( 'input[value="tab"]' ).checked = true;
      break;
    default:
      elementOpenMethodWebpage.querySelector( 'input[value="'+openMethod+'"]' ).checked = true;
      break;
  }
}

function readoutSpecifySize( settingValueObject ) {
  elementSpecifySizeFlag.checked     = settingValueObject.specifySize;
  elementSizeOfNewWindowWidth.value  = settingValueObject.sizeWidth;
  elementSizeOfNewWindowHeight.value = settingValueObject.sizeHeight;
}

function readoutTranslationService( translationService ) {
  switch ( translationService ) {
    case null:
    case undefined:
      elementTranslationService.querySelector( 'input[value="Google"]' ).checked = true;
      changeLanguageCodeList( 'Google' );
      break;
    default:
      elementTranslationService.querySelector( 'input[value="'+translationService+'"]' ).checked = true;
      changeLanguageCodeList( translationService );
      break;
  }
}

/*================
  Read out setting value
  ================*/
browser.storage.local.get( null )
  .then( ( settingValueObject1 ) => {
    readoutOpenMethodText( settingValueObject1.openMethodText );
    return settingValueObject1;
  } )
  .then( ( settingValueObject2 ) => {
    readoutOpenMethodWebpage( settingValueObject2.openMethodWebpage );
    return settingValueObject2;
  } )
  .then( ( settingValueObject3 ) => {
    readoutSpecifySize( settingValueObject3 );
    return settingValueObject3;
  } )
  .then( ( settingValueObject4 ) => {
    readoutTranslationService( settingValueObject4.translationService );
    return settingValueObject4;
  } )
  .then( ( settingValueObject5 ) => {
    readoutLanguageCode( settingValueObject5 );
  } );

/*================
  Update processing
  ================*/
elementOpenMethodText.addEventListener( 'input', ( obj ) => {
  const valueOpenMethodText = obj.target.value;
  browser.storage.local.set({
    openMethodText: valueOpenMethodText
  });
}, false );

elementOpenMethodWebpage.addEventListener( 'input', ( obj ) => {
  const valueOpenMethodWebpage = obj.target.value;
  browser.storage.local.set({
    openMethodWebpage: valueOpenMethodWebpage
  });
}, false );

elementOpenMethodSpecifySize.addEventListener( 'input', () => {
  const valueSpecifySizeFlag       = elementSpecifySizeFlag.checked;
  const valueSizeOfNewWindowWidth  = Number( encodeURI( elementSizeOfNewWindowWidth.value ) );
  const valueSizeOfNewWindowHeight = Number( encodeURI( elementSizeOfNewWindowHeight.value ) );
  browser.storage.local.set({
    specifySize: valueSpecifySizeFlag,
    sizeWidth:   valueSizeOfNewWindowWidth,
    sizeHeight:  valueSizeOfNewWindowHeight
  });
}, false );

elementTranslationService.addEventListener( 'input', ( obj ) => {
  const valueTranslationService = obj.target.value
  browser.storage.local.set({
    translationService: valueTranslationService
  });
  changeLanguageCodeList(valueTranslationService);
}, false );

elementLanguageCode.addEventListener( 'input', ( obj ) => {
  const valueLanguageCode = obj.target.value;
  browser.storage.local.set({
    languageCode: valueLanguageCode
  });
}, false );

/*================
  Multilingual support
  ================*/
document.getElementById( 'h2BehaviorWhen' ).textContent             = browser.i18n.getMessage( 'optionPageBehaviorWhen' );
document.getElementById( 'h3CaseOfText' ).textContent               = browser.i18n.getMessage( 'optionPageCaseOfText' );
document.getElementById( 'h3CaseOfWebpage' ).textContent            = browser.i18n.getMessage( 'optionPageCaseOfWebpage' );
document.getElementById( 'spanTextOpenByNewTab' ).textContent       = browser.i18n.getMessage( 'optionPageOpenByNewTab' );
document.getElementById( 'spanTextOpenByNewWindow' ).textContent    = browser.i18n.getMessage( 'optionPageOpenByNewWindow' );
document.getElementById( 'spanWebpageOpenByNewTab' ).textContent    = browser.i18n.getMessage( 'optionPageOpenByNewTab' );
document.getElementById( 'spanWebpageOpenByNewWindow' ).textContent = browser.i18n.getMessage( 'optionPageOpenByNewWindow' );
document.getElementById( 'h3SizeOfNewWindow' ).textContent          = browser.i18n.getMessage( 'optionPageSizeOfNewWindow' );
document.getElementById( 'spanSpecifySizeOfWindow' ).textContent    = browser.i18n.getMessage( 'optionPageSpecifySizeOfWindow' );
document.getElementById( 'pWhenSetWH' ).textContent                 = browser.i18n.getMessage( 'optionPageWhenSetWH' );

document.getElementById( 'h2ServiceUsedFor' ).textContent            = browser.i18n.getMessage( 'optionPageServiceUsedFor' );
document.getElementById( 'h3SpecifyTranslationService' ).textContent = browser.i18n.getMessage( 'optionPageSpecifyTranslationService' );
document.getElementById( 'pDependingOnSelected' ).textContent        = browser.i18n.getMessage( 'optionPageDependingOnSelected' );

document.getElementById( 'h2TranslatedLanguage' ).textContent   = browser.i18n.getMessage( 'optionPageTranslatedLanguage' );
document.getElementById( 'h3SpecifyLanguageCode' ).textContent  = browser.i18n.getMessage( 'optionPageSpecifyLanguageCode' );
document.getElementById( 'pIfSetToEn' ).textContent             = browser.i18n.getMessage( 'optionPageIfSetEn' );
document.getElementById( 'pAlphabetIn' ).textContent            = browser.i18n.getMessage( 'optionPageAlphabetIn' );
