/**
 * module file: _inputDetector.js
 * description: 
 */

import { Options } from './Options.js';

class InputDetector extends Options {
  divNotification;
  notificationCount;

  constructor() {
    super();

    this.divNotification   = document.getElementById( 'divInputNotificationArea' );
    this.notificationCount = Number( 0 );

    this.prepareOpenMethodInput('openMethodText', super.getFormOpeningMethodText());
    this.prepareSpecifySizeInput();
    this.prepareServiceInput();
    this.prepareLanguageCodeInput();
  }

  notification() {
    if ( this.notificationCount == 0 ) {
      new Promise( resolve => {
        this.divNotification.style.display = 'flex';
        setTimeout( resolve , 5000 );
      })
      .then( () => {
        this.divNotification.style.display = 'none';
        this.notificationCount             = 1;
      })
      .catch( ( error ) => {
        super.exceptionLog( error )
      });
    }
  }

  prepareOpenMethodInput( key, form ) {
    this.formOpenMethodText?.addEventListener( 'input', ( event ) => {
      if ( event.target instanceof HTMLInputElement ) {
        browser.storage.local.set({
          openMethodText: event.target.value
        })
        .then( () => {
          this.notification();
        })
        .catch( ( error ) => {
          super.exceptionLog( error );
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
          super.exceptionLog( error );
        });
      }
    }, false );
  }

  prepareSpecifySizeInput() {
    this.inputSpecifySizeFlag?.addEventListener( 'input', ( event ) => {
      if ( event.target instanceof HTMLInputElement ) {
        const flag = event.target.checked ? true : false;
        console.log( flag );
        browser.storage.local.set({
          specifySizeFlag: flag
        })
        .then( () => {
          this.notification();
        })
        .catch( ( error ) => {
          super.exceptionLog( error );
        });
      }
    });
    this.inputNewWindowHeight?.addEventListener( 'input', ( event ) => {
      if ( event.target instanceof HTMLInputElement ) {
        browser.storage.local.set({
          sizeHeight: Number( event.target.value )
        })
        .then( () => {
          this.notification();
        })
        .catch( ( error ) => {
          super.exceptionLog( error );
        });
      }
    });
    this.inputNewWindowWidth?.addEventListener( 'input', ( event ) => {
      if ( event.target instanceof HTMLInputElement ) {
        browser.storage.local.set({
          sizeWidth: Number( event.target.value )
        })
        .then( () => {
          this.notification();
        })
        .catch( ( error ) => {
          super.exceptionLog( error );
        });
      }
    });
  }

  prepareServiceInput() {
    this.formTranslationService?.addEventListener( 'input', ( event ) => {
      if ( event.target instanceof HTMLInputElement ) {
        browser.storage.local.set({
          translationService: event.target.value
        })
        .then( () => {
          super.languageCodeListSwitch( event.target.value );
          this.notification();
        })
        .catch( ( error ) => {
          super.exceptionLog( error );
        });
      }
    }, false );
  }

  prepareLanguageCodeInput() {
    this.formLanguageCode?.addEventListener( 'input', ( event ) => {
      if ( event.target instanceof HTMLInputElement ) {
        browser.storage.local.set({
          languageCode: event.target.value
        })
        .then( () => {
          this.notification();
        })
        .catch( ( error ) => {
          super.exceptionLog( error );
        });
      }
    }, false );
  }
}

const InputDetectorInstance = new InputDetector();