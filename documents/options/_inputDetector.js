
'use strict';

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
  }

  async notification() {
    if ( this.notificationCount == 0 ) {
      try {
        this.divNotification.style.display = 'flex';
        await new Promise( resolve => setTimeout( resolve , 5000 ) );
        this.divNotification.style.display = 'none';
        this.notificationCount             = 1;
      } catch ( error ) {
        super.exceptionLog( error );
      }
    }
  }

  prepareCheckBoxInput( key, form ) {
    form?.addEventListener( 'input', async ( event ) => {
      if ( event.target instanceof HTMLInputElement ) {
        try {
          const flag = event.target.checked ? true : false;
          await browser.storage.local.set({ [key]: Boolean( flag ) })
          this.notification();
        } catch ( error ) {
          super.exceptionLog( error );
        }
      }
    }, false );
  }

  prepareNumberInput( key, form ) {
    form?.addEventListener( 'input', async ( event ) => {
      if ( event.target instanceof HTMLInputElement ) {
        try {
          await browser.storage.local.set({ [key]: Number( event.target.value ) })
          this.notification();
        } catch ( error ) {
          super.exceptionLog( error );
        }
      }
    }, false );
  }

  prepareRadioInput( key, form ) {
    form?.addEventListener( 'input', async ( event ) => {
      if ( event.target instanceof HTMLInputElement ) {
        try {
          await browser.storage.local.set({ [key]: event.target.value })
          this.notification();
        } catch ( error ) {
          super.exceptionLog( error );
        }
      }
    }, false );
  }
}

const InputDetectorIns = new InputDetector;
InputDetectorIns.prepareRadioInput( 'openMethodText', InputDetectorIns.getFormOpeningMethodText() );
InputDetectorIns.prepareRadioInput( 'openMethodWebpage', InputDetectorIns.getFormOpeningMethodWeb() );
InputDetectorIns.prepareCheckBoxInput( 'specifySizeFlag', InputDetectorIns.getInputSpecifySizeFlag() );
InputDetectorIns.prepareNumberInput( 'sizeWidth', InputDetectorIns.getInputNewWindowWidth() );
InputDetectorIns.prepareNumberInput( 'sizeHeight', InputDetectorIns.getInputNewWindowHeight() );
InputDetectorIns.prepareRadioInput( 'translationService', InputDetectorIns.getFormTranslationService() );
InputDetectorIns.prepareRadioInput( 'languageCode', InputDetectorIns.getFormLanguageCode() );