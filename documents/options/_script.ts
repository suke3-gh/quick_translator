/**
 * module file: _script.js
 * description: 
 */

/** functions */
function changeLanguageCodeList( translationService:string ):void {
  const languageCodeListGoogle:HTMLElement    = document.getElementById( 'languageCodeListGoogle' );
  const languageCodeListMicrosoft:HTMLElement = document.getElementById( 'languageCodeListMicrosoft' );
  switch ( translationService ) {
    case 'Google':
      languageCodeListGoogle.style.display    = 'flex';
      languageCodeListMicrosoft.style.display = 'none';
      /** fix for check of radio button. */
      browser.storage.local.get( 'languageCode' )
        .then( ( settings ) => { selectLanguageCode( languageCodeListGoogle, settings.languageCode ); })
        .catch( ( id:exception ) => exceptionLog( id ) );
    break;
    case 'Microsoft':
      languageCodeListGoogle.style.display    = 'none';
      languageCodeListMicrosoft.style.display = 'flex';
      /** fix for check of radio button. */
      browser.storage.local.get( 'languageCode' )
        .then( ( settings ) => { selectLanguageCode( languageCodeListGoogle, settings.languageCode ); })
        .catch( ( id:exception ) => exceptionLog( id ) );
      break;
  }
}

/** functions: readout~ */
function readoutLanguageCode( languageCode:string, translationService:string ):void {
  const languageCodeListGoogle:HTMLElement    = document.getElementById( 'languageCodeListGoogle' );
  const languageCodeListMicrosoft:HTMLElement = document.getElementById( 'languageCodeListMicrosoft' );
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

function readoutOpenMethodText( openMethod:string ):void {
  const form:HTMLElement = document.getElementById( 'formOpenMethodText' )
  let selector:string = '';
  switch ( openMethod ) {
    case null:
    case undefined:
      selector = 'input[value="tab"]';
      break;
    default:
      selector = 'input[value="'+ openMethod + '"]';
      break;
  }
  const input:HTMLInputElement = form.querySelector( selector );
  input.checked = true;
}

function readoutOpenMethodWebpage( openMethod:string ):void {
  const form:HTMLElement = document.getElementById( 'formOpenMethodWebpage' );
  let selector:string = '';
  switch ( openMethod ) {
    case null:
    case undefined:
      selector = 'input[value="tab"]';
      break;
    default:
      selector = 'input[value="' + openMethod + '"]';
      break;
  }
  const input:HTMLInputElement = form.querySelector( selector );
  input.checked = true;
}

function readoutSpecifySize( paramFlag:boolean, paramWidth:number, paramHeight:number ):void {
  const form:HTMLElement = document.getElementById( 'formOpenMethodSpecifySize' );

  const windowFlag:HTMLInputElement   = form.querySelector( '#inputSpecifySizeFlag' );
  const windowHeight:HTMLInputElement = form.querySelector( '#inputSizeOfNewWindowHeight' );
  const windowWidth:HTMLInputElement  = form.querySelector( '#inputSizeOfNewWindowWidth' );

  windowFlag.checked = paramFlag;
  windowHeight.value = String( paramHeight );
  windowWidth.value  = String( paramWidth );
}

function readoutTranslationService( translationService:string ):void {
  let selector:string = '';
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
  const form:HTMLElement       = document.getElementById( 'formTranslationService' );
  const input:HTMLInputElement = form.querySelector( selector );
  input.checked = true;
  changeLanguageCodeList( translationService );
}

function selectLanguageCode( form:HTMLElement, languageCode:string ) {
  try {
    const input:HTMLInputElement = form.querySelector( 'input[value="'+languageCode+'"]' );
    input.checked = true;
  } catch ( e:unknown ) {
    const input:HTMLInputElement = form.querySelector( 'input[value="auto"]' );
    input.checked = true;
    console.log( 'A value is set as auto.' );
    browser.storage.local.set( { languageCode: 'auto' } )
      .catch( ( id:exception ) => exceptionLog( id ) );
  }
}

function exceptionLog( id:exception ):void {
  console.log( id.name + ': ' + id.message );
}

/** main process */
function processReadout() {
  browser.storage.local.get( null )
    .then( ( obj:settings ) => {
      readoutOpenMethodText( obj.openMethodText );
      readoutOpenMethodWebpage( obj.openMethodWebpage );
      readoutSpecifySize( obj.specifySizeFlag, obj.sizeWidth, obj.sizeHeight );
      readoutTranslationService( obj.translationService );
      readoutLanguageCode( obj.languageCode, obj.translationService );
    })
    .catch( ( id:exception ) => exceptionLog( id ) );
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
  document.getElementById( 'formOpenMethodText' ).addEventListener( 'input', ( event:Event ) => {
    if ( event.target instanceof HTMLInputElement ) {
      const openMethod:string = event.target.value;
      browser.storage.local.set({ openMethodText: openMethod })
        .catch( ( id:exception ) => exceptionLog( id ) );
    }
  }, false );
  
  document.getElementById( 'formOpenMethodWebpage' ).addEventListener( 'input', ( event:Event ) => {
    if ( event.target instanceof HTMLInputElement ) {
      const openMethod:string = event.target.value;
      browser.storage.local.set({ openMethodWebpage: openMethod })
        .catch( ( id:exception ) => exceptionLog( id ) );
    }
  }, false );

  document.getElementById( 'inputSpecifySizeFlag' ).addEventListener( 'input', ( event:Event ) => {
    if ( event.target instanceof HTMLInputElement ) {
      const flag:boolean = event.target.checked;
      browser.storage.local.set({ specifySizeFlag: flag })
        .catch( ( id:exception ) => exceptionLog( id ) );
    }
  });

  document.getElementById( 'inputSizeOfNewWindowHeight' ).addEventListener( 'input', ( event:Event ) => {
    if ( event.target instanceof HTMLInputElement ) {
      const height:number = Number( event.target.value );
      browser.storage.local.set({ sizeHeight: height })
        .catch( ( id:exception ) => exceptionLog( id ) );
    }
  });

  document.getElementById( 'inputSizeOfNewWindowWidth' ).addEventListener( 'input', ( event:Event ) => {
    if ( event.target instanceof HTMLInputElement ) {
      const width:number = Number( event.target.value );
      browser.storage.local.set({ sizeWidth: width })
        .catch( ( id:exception ) => exceptionLog( id ) );
    }
  });
  
  document.getElementById( 'formTranslationService' ).addEventListener( 'input', ( event:Event ) => {
    if ( event.target instanceof HTMLInputElement ) {
      browser.storage.local.set( { translationService: event.target.value } )
        .catch( ( id:exception ) => exceptionLog( id ) );
        changeLanguageCodeList( event.target.value );
    }
  }, false );
  
  document.getElementById( 'formLanguageCode' ).addEventListener( 'input', ( event:Event ) => {
    if ( event.target instanceof HTMLInputElement ) {
      browser.storage.local.set( { languageCode: event.target.value } )
        .catch( ( id:exception ) => exceptionLog( id ) );
    }
  }, false );
}

processReadout();
processSupportMultilingual();
processUpdate();