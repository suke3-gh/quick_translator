/**
 * module file: _settingReadouter.js
 * description: 
 */

import { options } from './options.js';

class settingReadouter extends options {
  constructor() {
    super();
  }

  openingMethod( key, form ) {
    browser.storage.local.get(
      key
    )
    .then( ( object ) => {
      const input   = form.querySelector( 'input[value="' + object[key] + '"]' );
      input.checked = true;
    })
    .catch( ( error ) => {
      const input   = form.querySelector( 'input[value="tab"]' );
      input.checked = true;
      super.exceptionLog( error );
    });
  }

  specifySize( flag, height, width ) {
    browser.storage.local.get([
      flag, height, width
    ])
    .then( ( object ) => {
      this.inputSpecifySizeFlag.checked = object[flag];
      if ( object[flag] == true ) {
        this.inputNewWindowHeight.value = object[height];
        this.inputNewWindowWidth.value  = object[width];
      }
    })
    .catch( ( error ) => {
      super.inputSpecifySizeFlag.checked = false;
      super.exceptionLog( error );
    });
  }

  translationService( key, form ) {
    browser.storage.local.get(
      key
    )
    .then( ( object ) => {
      const input   = form.querySelector( 'input[value="' + object[key] + '"]' );
      input.checked = true;
      super.languageCodeListSwitch( object[key] );
    })
    .catch( ( error ) => {
      const input   = form.querySelector( 'input[value="Google"]' );
      input.checked = true;
      super.languageCodeListSwitch( 'Google' );
      super.exceptionLog( error );
    });
  }
}

const settingReadouterIns = new settingReadouter();
settingReadouterIns.openingMethod( 'openMethodText', settingReadouterIns.getFormOpeningMethodText() );
settingReadouterIns.openingMethod( 'openMethodWebpage', settingReadouterIns.getFormOpeningMethodWeb() );
settingReadouterIns.specifySize( 'specifySizeFlag', 'sizeHeight', 'sizeWidth' );
settingReadouterIns.translationService( 'translationService', settingReadouterIns.getFormTranslationService() );