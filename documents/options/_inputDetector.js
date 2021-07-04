/**
 * module file: _inputDetector.js
 * description: 
 */

class inputDetector {
  formOpenMethodText;
  formOpenMethodWebpage;
  inputSpecifySizeFlag;
  inputNewWindowHeight;
  inputNewWindowWidth;

  formTranslationService;

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

    this.formLanguageCode = document.getElementById( 'formLanguageCode' );

    this.divNotification   = document.getElementById( 'divInputNotificationArea' );
    this.notificationCount = Number( 0 );

    this.prepareOpenMethodInput();
  }

  exceptionLog( error ) {
    console.log( 'Catched an exception: ' + error.message );
  }

  async notification() {
    if ( this.notificationCount == 0 ) {
      await new Promise( resolve => {
        this.divNotification.style.display = 'flex';
        setTimeout( resolve , 5000 );
      })
      .then( () => {
        this.divNotification.style.display = 'none';
        this.notificationCount             = 1;
      })
      .catch( ( identifier ) => {
        exceptionLog( identifier )
      });
    }
  }

  prepareOpenMethodInput() {
    this.formOpenMethodText?.addEventListener( 'input', ( event ) => {
      if ( event.target instanceof HTMLInputElement ) {
        browser.storage.local.set({
          openMethodText: event.target.value
        })
        .then( () => {
          this.notification();
        })
        .catch( ( error ) => {
          this.exceptionLog( error );
        });
      }
    }, false );
    this.formOpenMethodWebpage?.addEventListener( 'input', ( event ) => {
      if ( event.target instanceof HTMLInputElement ) {
        browser.storage.local.set({
          openMethodWebpage: event.target.value
        })
        .then( () => {
          this.notification();
        })
        .catch( ( error ) => {
          exceptionLog( error );
        });
      }
    }, false );
  }
}

const inputDetectorInstance = new inputDetector();