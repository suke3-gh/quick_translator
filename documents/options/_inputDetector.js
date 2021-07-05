/**
 * module file: _inputDetector.js
 * description: 
 */

import { options } from './options.js';

class inputDetector extends options {

  divNotification;
  notificationCount;

  constructor() {
    super();

    this.divNotification   = document.getElementById( 'divInputNotificationArea' );
    this.notificationCount = Number( 0 );

    this.prepareOpenMethodInput();
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
        const flag = event.target.checked ? 'Y' : 'N';
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
          this.languageCodeListSwitch( event.target.value );
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
      exceptionLog( error );
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

const inputDetectorInstance = new inputDetector();