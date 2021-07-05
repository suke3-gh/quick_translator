/**
 * module file: _settingReadouter.js
 * description: 
 */

class settingReadouter {
  formOpenMethodText;
  formOpenMethodWebpage;
  inputSpecifySizeFlag;
  inputNewWindowHeight;
  inputNewWindowWidth;

  formTranslationService;
  languageCodeList;

  formLanguageCode;

  divNotification;
  notificationCount;

  constructor() {
    this.formOpenMethodText    = document.getElementById( 'formOpenMethodText' );
    this.formOpenMethodWebpage = document.getElementById( 'formOpenMethodWebpage' );
    this.inputSpecifySizeFlag  = document.getElementById( 'inputSpecifySizeFlag' );
    this.inputNewWindowHeight  = document.getElementById( 'inputSizeOfNewWindowHeight' );
    this.inputNewWindowWidth   = document.getElementById( 'inputSizeOfNewWindowWidth' );

    this.formTranslationService = document.getElementById( 'formTranslationService' );
    this.languageCodeList = {
      google:    document.getElementById( 'languageCodeListGoogle' ),
      microsoft: document.getElementById( 'languageCodeListMicrosoft' )
    };

    this.formLanguageCode = document.getElementById( 'formLanguageCode' );
  }
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
  /*
  let input = list.querySelector( 'input[value="' + languageCode+ '"]' );
  if ( input == null ) {
    input = list.querySelector( 'input[value="auto"]' );
    console.log( 'Quick translator: A value is set as auto.' );
    browser.storage.local.set( { languageCode: 'auto' } )
      .catch( ( identifier ) => exceptionLog( identifier ) );
  }
    input.checked = true;
  */
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
    .catch( ( identifier ) => exceptionLog( identifier ) );
}


processReadout();
