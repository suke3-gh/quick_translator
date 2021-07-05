class options {
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
}

export { options };
