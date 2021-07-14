/**
 * module file: _settingReadouter.js
 * description: 
 */

import { Options } from './Options.js';

class SettingReadouter extends Options {
  constructor() {
    super();
  }

  async openingMethod( key, form ) {
    try {
      const object  = await browser.storage.local.get( key );
      const input   = form.querySelector( 'input[value="' + object[key] + '"]' );
      input.checked = true;
      return true;
    } catch ( error ) {
      const input   = form.querySelector( 'input[value="tab"]' );
      input.checked = true;
      super.exceptionLog( error );
      return false;
    }
  }

  async specifySize( flag, height, width ) {
    try {
      const object = await browser.storage.local.get([ flag, height, width ]);
      this.inputSpecifySizeFlag.checked = object[flag];
      this.inputNewWindowHeight.value   = object[height];
      this.inputNewWindowWidth.value    = object[width];
      return true;
    } catch ( error ) {
      super.inputSpecifySizeFlag.checked = false;
      super.exceptionLog( error );
      return false;
    }
  }

  async translationService( key, form ) {
    try {
      const object  = await browser.storage.local.get( key );
      const input   = form.querySelector( 'input[value="' + object[key] + '"]' );
      input.checked = true;
      super.languageCodeListSwitch( object[key] );
      return true;
    } catch ( error ) {
      const input   = form.querySelector( 'input[value="google"]' );
      input.checked = true;
      super.languageCodeListSwitch( 'google' );
      super.exceptionLog( error );
      return false;
    }
  }
}

const SettingReadouterIns = new SettingReadouter();
SettingReadouterIns.openingMethod( 'openMethodText', SettingReadouterIns.getFormOpeningMethodText() );
SettingReadouterIns.openingMethod( 'openMethodWebpage', SettingReadouterIns.getFormOpeningMethodWeb() );
SettingReadouterIns.specifySize( 'specifySizeFlag', 'sizeHeight', 'sizeWidth' );
SettingReadouterIns.translationService( 'translationService', SettingReadouterIns.getFormTranslationService() );