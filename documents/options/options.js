
export class Options {
  formOpenMethodText;
  formOpenMethodWebpage;
  inputSpecifySizeFlag;
  inputNewWindowHeight;
  inputNewWindowWidth;

  formTranslationService;
  languageCodeList;

  formLanguageCode;

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

  exceptionLog( error ) {
    console.log( 'Catched an exception: ' + error.message );
  }

  getFormOpeningMethodText() {
    return this.formOpenMethodText;
  }

  getFormOpeningMethodWeb() {
    return this.formOpenMethodWebpage;
  }

  getFormTranslationService() {
    return this.formTranslationService;
  }

  languageCodeListSwitch( service ) {
    let targetList;
    switch ( service ) {
      case 'Google':
        this.languageCodeList.google.style.display    = 'flex';
        this.languageCodeList.microsoft.style.display = 'none';
        targetList = this.languageCodeList.google;
        break;
      case 'Microsoft':
        this.languageCodeList.google.style.display    = 'none';
        this.languageCodeList.microsoft.style.display = 'flex';
        targetList = this.languageCodeList.microsoft;
        break;
    }
    browser.storage.local.get(
      'languageCode'
    )
    .then( ( object ) => {
      const input = targetList.querySelector( 'input[value="' + object.languageCode+ '"]' );
      input.checked = true;
    })
    .catch( ( error ) => {
      this.exceptionLog( error );
      const input = targetList.querySelector( 'input[value="auto"]' );
      input.checked = true;
      browser.storage.local.set({
        languageCode: 'auto'
      })
      .catch( ( error2 ) => {
        super.exceptionLog( error2 );
      });
    })
  }
}
