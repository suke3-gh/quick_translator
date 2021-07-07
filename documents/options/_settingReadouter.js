/**
 * module file: _settingReadouter.js
 * description: 
 */

import { Options } from './Options.js';

class SettingReadouter extends Options {
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

const SettingReadouterIns = new SettingReadouter();
SettingReadouterIns.openingMethod( 'openMethodText', SettingReadouterIns.getFormOpeningMethodText() );
SettingReadouterIns.openingMethod( 'openMethodWebpage', SettingReadouterIns.getFormOpeningMethodWeb() );
SettingReadouterIns.specifySize( 'specifySizeFlag', 'sizeHeight', 'sizeWidth' );
SettingReadouterIns.translationService( 'translationService', SettingReadouterIns.getFormTranslationService() );