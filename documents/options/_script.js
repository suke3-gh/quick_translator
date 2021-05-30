/**
 * module file: _script.js
 * description: 
 */

/** functions */
function changeLanguageCodeList( translationService ) {
  const eleLangCodeListGoogle    = document.getElementById( 'languageCodeListGoogle' );
  const eleLangCodeListMicrosoft = document.getElementById( 'languageCodeListMicrosoft' );
  switch ( translationService ) {
    case 'Google':
      eleLangCodeListMicrosoft.style.display = 'none';
      eleLangCodeListGoogle.style.display    = 'flex';
      /** fix for check of radio button. */
      browser.storage.local.get( 'languageCode' )
        .then( ( settings ) => { selectLanguageCode( eleLangCodeListGoogle, settings.languageCode ); })
        .catch( e => {
          console.log( e.name + ': ' + e.message );
        });
    break;
    case 'Microsoft':
      eleLangCodeListMicrosoft.style.display = 'flex';
      eleLangCodeListGoogle.style.display    = 'none';
      /** fix for check of radio button. */
      browser.storage.local.get( 'languageCode' )
        .then( ( settings ) => { selectLanguageCode( eleLangCodeListMicrosoft, settings.languageCode ); })
        .catch( e => {
          console.log( e.name + ': ' + e.message );
        });
      break;
  }
}

/** functions: readout~ */
function readoutLanguageCode( languageCode, translationService ) {
  const eleLangCodeListGoogle    = document.getElementById( 'languageCodeListGoogle' );
  const eleLangCodeListMicrosoft = document.getElementById( 'languageCodeListMicrosoft' );
  switch ( translationService ) {
    case 'Google':
      selectLanguageCode( eleLangCodeListGoogle, languageCode );
      break;
    case 'Microsoft':
      selectLanguageCode( eleLangCodeListMicrosoft, languageCode );
      break;
    default:
      selectLanguageCode( eleLangCodeListGoogle, languageCode );
      break;
  }
}

function readoutOpenMethodText( openMethod ) {
  const element = document.getElementById( 'formOpenMethodText' )
  switch ( openMethod ) {
    case null:
    case undefined:
      element.querySelector( 'input[value="tab"]' ).checked = true;
      break;
    default:
      element.querySelector( 'input[value="'+openMethod+'"]' ).checked = true;
      break;
  }
}

function readoutOpenMethodWebpage( openMethod ) {
  const element = document.getElementById( 'formOpenMethodWebpage' );
  switch ( openMethod ) {
    case null:
    case undefined:
      element.querySelector( 'input[value="tab"]' ).checked = true;
      break;
    default:
      element.querySelector( 'input[value="'+openMethod+'"]' ).checked = true;
      break;
  }
}

function readoutSpecifySize( paramFlag, paramWidth, paramHeight ) {
  const element = document.getElementById( 'formOpenMethodSpecifySize' );
  const specifySize = {
    windowFlag:   element.querySelector( '#inputSpecifySizeFlag' ),
    windowHeight: element.querySelector( '#inputSizeOfNewWindowWidth' ),
    windowWidth:  element.querySelector( '#inputSizeOfNewWindowHeight' )
  }
  specifySize.windowFlag.checked = paramFlag;
  specifySize.windowHeight.value = paramWidth;
  specifySize.windowWidth.value  = paramHeight;
}

function readoutTranslationService( translationService ) {
  const element = document.getElementById( 'formTranslationService' );
  switch ( translationService ) {
    case null:
    case undefined:
      element.querySelector( 'input[value="Google"]' ).checked = true;
      changeLanguageCodeList( 'Google' );
      break;
    default:
      element.querySelector( 'input[value="'+translationService+'"]' ).checked = true;
      changeLanguageCodeList( translationService );
      break;
  }
}

function selectLanguageCode( element, languageCode ) {
  try {
    element.querySelector( 'input[value="'+languageCode+'"]' ).checked = true;
  } catch ( e ) {
    element.querySelector( 'input[value="auto"]' ).checked = true;
    browser.storage.local.set( { languageCode: 'auto' } );
    console.log( e.name + ': ' + e.message );
    console.log( 'Therefor a value is set as auto.' );
  }
}

/** main process */
function processReadout() {
  browser.storage.local.get( null )
    .then( ( settings ) => {
      readoutOpenMethodText( settings.openMethodText );
      readoutOpenMethodWebpage( settings.openMethodWebpage );
      readoutSpecifySize( settings.specifySizeFlag, settings.sizeWidth, settings.sizeHeight );
      readoutTranslationService( settings.translationService );
      readoutLanguageCode( settings.languageCode, settings.translationService );
    })
    .catch( e => {
      console.log( e.name + ': ' + e.message );
    });
}

function processSupportMultilingual() {
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
}

function processUpdate() {
  document.getElementById( 'formOpenMethodText' ).addEventListener( 'input', ( element ) => {
    browser.storage.local.set( { openMethodText: element.target.value } )
      .catch( e => {
        console.log( e.name + ': ' + e.message );
      });
  }, false );
  
  document.getElementById( 'formOpenMethodWebpage' ).addEventListener( 'input', ( element ) => {
    browser.storage.local.set( { openMethodWebpage: element.target.value } )
      .catch( e => {
        console.log( e.name + ': ' + e.message );
      });
  }, false );
  
  document.getElementById( 'formOpenMethodSpecifySize' ).addEventListener( 'input', ( element ) => {
    const specifySize = {
      windowFlag:   element.currentTarget.querySelector( '#inputSpecifySizeFlag' ),
      windowHeight: element.currentTarget.querySelector( '#inputSizeOfNewWindowHeight' ),
      windowWidth:  element.currentTarget.querySelector( '#inputSizeOfNewWindowWidth' )
    }
    console.log( specifySize.windowWidth.value );
    browser.storage.local.set( {
      specifySizeFlag: specifySize.windowFlag.checked,
      sizeHeight:      Number( specifySize.windowHeight.value ),
      sizeWidth:       Number( specifySize.windowWidth.value )
    })
      .catch( e => {
        console.log( e.name + ': ' + e.message );
      });
  }, false );
  
  document.getElementById( 'formTranslationService' ).addEventListener( 'input', ( element ) => {
    browser.storage.local.set( { translationService: element.target.value } )
      .catch( e => {
        console.log( e.name + ': ' + e.message );
      });
    changeLanguageCodeList( element.target.value );
  }, false );
  
  document.getElementById( 'formLanguageCode' ).addEventListener( 'input', ( element ) => {
    browser.storage.local.set( { languageCode: element.target.value } )
      .catch( e => {
        console.log( e.name + ': ' + e.message );
      });
  }, false );
}

processReadout();
processSupportMultilingual();
processUpdate();
