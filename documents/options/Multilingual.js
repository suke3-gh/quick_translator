
'use strict';

/**
 * Multilingual.js
 * description: 
 */

class multilingual {
  constructor() {
    this.behaviorKeys = [
      'h2BehaviorWhen',
      'h3CaseOfText',
      'h3CaseOfWebpage',
      'spanOpenByNewTabText',
      'spanOpenByNewWindowText',
      'spanOpenByNewTabWeb',
      'spanOpenByNewWindowWeb',
      'h3SizeOfNewWindow',
      'spanSpecifySizeOfWindow',
      'pSizeOfNewWindowBecome'
    ];
    this.serviceKeys = [
      'h2ServiceUsedFor',
      'h3SpecifyTranslationService',
      'pSomeLanguagesAreNot'
    ];
    this.languageKeys = [
      'h2TranslatedLanguage',
      'h3SpecifyLanguageCode',
      'pTextAndWebpageWill'
    ];
  }

  i18n( array ) {
    array.forEach( ( key ) => {
      document.getElementById( key ).textContent = browser.i18n.getMessage( key );
      
    });
  }

  getBehaviorKeys() {
    return this.behaviorKeys;
  }

  getServiceKeys() {
    return this.serviceKeys;
  }

  getLanguageKeys() {
    return this.languageKeys;
  }
}

const multilingualIns = new multilingual;
multilingualIns.i18n( multilingualIns.getBehaviorKeys() );
multilingualIns.i18n( multilingualIns.getServiceKeys() );
multilingualIns.i18n( multilingualIns.getLanguageKeys() );