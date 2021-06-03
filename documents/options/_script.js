/**
 * module file: _script.js
 * description: 
 */

/** functions */
function changeLanguageCodeList( translationService ) {
  const languageCodeListGoogle    = document.getElementById( 'languageCodeListGoogle' );
  const languageCodeListMicrosoft = document.getElementById( 'languageCodeListMicrosoft' );
  let list = 'list';
  switch ( translationService ) {
    case 'Google':
      languageCodeListGoogle.style.display    = 'flex';
      languageCodeListMicrosoft.style.display = 'none';
      list = languageCodeListGoogle;
    break;
    case 'Microsoft':
      languageCodeListGoogle.style.display    = 'none';
      languageCodeListMicrosoft.style.display = 'flex';
      list = languageCodeListMicrosoft;
  }
  browser.storage.local.get( 'languageCode' )
    .then( ( obj ) => { selectLanguageCode( list, obj.languageCode ); })
    .catch( ( id ) => exceptionLog( id ) );
}

function exceptionLog( id ) {
  console.log( id.name + ': ' + id.message );
}

/** functions: readout~ */
function readoutLanguageCode( languageCode, translationService ) {
  const languageCodeListGoogle    = document.getElementById( 'languageCodeListGoogle' );
  const languageCodeListMicrosoft = document.getElementById( 'languageCodeListMicrosoft' );
  switch ( translationService ) {
    case 'Google':
      selectLanguageCode( languageCodeListGoogle, languageCode );
      break;
    case 'Microsoft':
      selectLanguageCode( languageCodeListMicrosoft, languageCode );
      break;
    default:
      selectLanguageCode( languageCodeListGoogle, languageCode );
      break;
  }
}

function readoutOpenMethodText( openMethod ) {
  const form = document.getElementById( 'formOpenMethodText' );
  let selector = 'selector';
  switch ( openMethod ) {
    case null:
    case undefined:
      selector = 'input[value="tab"]';
      break;
    default:
      selector = 'input[value="'+ openMethod + '"]';
      break;
  }
  const input = form.querySelector( selector );
  input.checked = true;
}

function readoutOpenMethodWebpage( openMethod ) {
  const form = document.getElementById( 'formOpenMethodWebpage' );
  let selector = 'selector';
  switch ( openMethod ) {
    case null:
    case undefined:
      selector = 'input[value="tab"]';
      break;
    default:
      selector = 'input[value="' + openMethod + '"]';
      break;
  }
  const input = form.querySelector( selector );
  input.checked = true;
}

function readoutSpecifySize( paramFlag, paramWidth, paramHeight ) {
  const form = document.getElementById( 'formOpenMethodSpecifySize' );

  const windowFlag   = form.querySelector( '#inputSpecifySizeFlag' );
  const windowHeight = form.querySelector( '#inputSizeOfNewWindowHeight' );
  const windowWidth  = form.querySelector( '#inputSizeOfNewWindowWidth' );

  if ( paramFlag == 'Y' ) {
    windowFlag.checked = true;
  } else {
    windowFlag.checked = false;
  }
  windowHeight.value = String( paramHeight );
  windowWidth.value  = String( paramWidth );
}

function readoutTranslationService( translationService ) {
  let selector = '';
  switch ( translationService ) {
    case null:
    case undefined:
      selector           = 'input[value="Google"]';
      translationService = 'Google';
      break;
    default:
      selector = 'input[value="' + translationService + '"]';
      break;
  }
  const form  = document.getElementById( 'formTranslationService' );
  const input = form.querySelector( selector );
  input.checked = true;
  changeLanguageCodeList( translationService );
}

function selectLanguageCode( list, languageCode ) {
  let input = list.querySelector( 'input[value="' + languageCode+ '"]' );
  if ( input == null ) {
    input = list.querySelector( 'input[value="auto"]' );
    console.log( 'Quick translator: A value is set as auto.' );
    browser.storage.local.set( { languageCode: 'auto' } )
      .catch( ( id ) => exceptionLog( id ) );
  }
    input.checked = true;
}

/** main process */
function processReadout() {
  browser.storage.local.get()
    .then( ( obj ) => {
      readoutOpenMethodText( obj.openMethodText );
      readoutOpenMethodWebpage( obj.openMethodWebpage );
      readoutSpecifySize( obj.specifySizeFlag, obj.sizeWidth, obj.sizeHeight );
      readoutTranslationService( obj.translationService );
      readoutLanguageCode( obj.languageCode, obj.translationService );
    })
    .catch( ( id ) => exceptionLog( id ) );
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
  document.getElementById( 'formOpenMethodText' )?.addEventListener( 'input', ( event ) => {
    if ( event.target instanceof HTMLInputElement ) {
      const openMethod = event.target.value;
      browser.storage.local.set({ openMethodText: openMethod })
        .catch( ( id ) => exceptionLog( id ) );
    }
  }, false );
  
  document.getElementById( 'formOpenMethodWebpage' )?.addEventListener( 'input', ( event ) => {
    if ( event.target instanceof HTMLInputElement ) {
      const openMethod = event.target.value;
      browser.storage.local.set({ openMethodWebpage: openMethod })
        .catch( ( id ) => exceptionLog( id ) );
    }
  }, false );

  document.getElementById( 'inputSpecifySizeFlag' )?.addEventListener( 'input', ( event ) => {
    if ( event.target instanceof HTMLInputElement ) {
      let flag = 'flag';
      if ( event.target.checked == true ) {
        flag = 'Y';
      } else {
        flag = 'N';
      }
      browser.storage.local.set({ specifySizeFlag: flag })
        .catch( ( id ) => exceptionLog( id ) );
    }
  });

  document.getElementById( 'inputSizeOfNewWindowHeight' )?.addEventListener( 'input', ( event ) => {
    if ( event.target instanceof HTMLInputElement ) {
      const height = Number( event.target.value );
      browser.storage.local.set({ sizeHeight: height })
        .catch( ( id ) => exceptionLog( id ) );
    }
  });

  document.getElementById( 'inputSizeOfNewWindowWidth' )?.addEventListener( 'input', ( event ) => {
    if ( event.target instanceof HTMLInputElement ) {
      const width = Number( event.target.value );
      browser.storage.local.set({ sizeWidth: width })
        .catch( ( id ) => exceptionLog( id ) );
    }
  });
  
  document.getElementById( 'formTranslationService' )?.addEventListener( 'input', ( event ) => {
    if ( event.target instanceof HTMLInputElement ) {
      browser.storage.local.set( { translationService: event.target.value } )
        .catch( ( id ) => exceptionLog( id ) );
        changeLanguageCodeList( event.target.value );
    }
  }, false );
  
  document.getElementById( 'formLanguageCode' )?.addEventListener( 'input', ( event ) => {
    if ( event.target instanceof HTMLInputElement ) {
      browser.storage.local.set( { languageCode: event.target.value } )
        .catch( ( id ) => exceptionLog( id ) );
    }
  }, false );
}

processReadout();
processSupportMultilingual();
processUpdate();