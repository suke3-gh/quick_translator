
export class Options {
  formOpeningMethodText;
  formOpeningMethodWeb;
  inputSpecifySizeFlag;
  inputNewWindowHeight;
  inputNewWindowWidth;

  formTranslationService;
  languageCodeList;

  formLanguageCode;

  constructor() {
    this.formOpeningMethodText    = document.getElementById( 'formOpenMethodText' );
    this.formOpeningMethodWeb = document.getElementById( 'formOpenMethodWebpage' );
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
    console.log( 'Catched an exception > ' + error.id + ':' + error.message );
  }

  getFormOpeningMethodText() {
    return this.formOpeningMethodText;
  }

  getFormOpeningMethodWeb() {
    return this.formOpeningMethodWeb;
  }

  getFormTranslationService() {
    return this.formTranslationService;
  }

  async languageCodeListSwitch( service ) {
    try {
      switch ( service ) {
        case 'google':
          this.languageCodeList['google'].style.display    = 'flex';
          this.languageCodeList['microsoft'].style.display = 'none';
          break;
        case 'microsoft':
          this.languageCodeList['google'].style.display    = 'none';
          this.languageCodeList['microsoft'].style.display = 'flex';
          break;
      }
      const object  = await browser.storage.local.get( 'languageCode' );
      const input   = this.languageCodeList[service].querySelector( 'input[value="' + object.languageCode+ '"]' );
      input.checked = true;
      return true;
    } catch ( error ) {
      this.exceptionLog( error );
      const input   = this.languageCodeList[service].querySelector( 'input[value="auto"]' );
      input.checked = true;
      await browser.storage.local.set({ languageCode: 'auto' })
      .catch( ( error2 ) => super.exceptionLog( error2 ) );
      return false;
    }
  }
}
