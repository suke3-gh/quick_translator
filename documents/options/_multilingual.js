/**
 * module file: _multilingual.js
 * description: 
 */

class multilingual {
  behaviorWhen;
  caseOfText;
  caseOfWebpage;
  textOpenByNewTab;
  textOpenByNewWindow;
  webOpenByNewTab;
  webOpenByNewWindow;
  sizeOfNewWindow;
  specifySizeOfWindow;
  whenSetWH;

  serviceUsedFor;
  specifyService;
  dependingOnSelected;

  translatedLanguage;
  specifyLanguageCode;
  ifSetToEn;
  alphabetIn;

  constructor() {
    this.behaviorWhen        = document.getElementById( 'h2BehaviorWhen' );
    this.caseOfText          = document.getElementById( 'h3CaseOfText' ); 
    this.caseOfWebpage       = document.getElementById( 'h3CaseOfWebpage' );
    this.textOpenByNewTab    = document.getElementById( 'spanTextOpenByNewTab' );
    this.textOpenByNewWindow = document.getElementById( 'spanTextOpenByNewWindow' );
    this.webOpenByNewTab     = document.getElementById( 'spanWebpageOpenByNewTab' );
    this.webOpenByNewWindow  = document.getElementById( 'spanWebpageOpenByNewWindow' );
    this.sizeOfNewWindow     = document.getElementById( 'h3SizeOfNewWindow' );
    this.specifySizeOfWindow = document.getElementById( 'spanSpecifySizeOfWindow' );
    this.whenSetWH           = document.getElementById( 'pWhenSetWH' );

    this.serviceUsedFor      = document.getElementById( 'h2ServiceUsedFor' );
    this.specifyService      = document.getElementById( 'h3SpecifyTranslationService' );
    this.dependingOnSelected = document.getElementById( 'pDependingOnSelected' );
    
    this.translatedLanguage  = document.getElementById( 'h2TranslatedLanguage' );
    this.specifyLanguageCode = document.getElementById( 'h3SpecifyLanguageCode' );
    this.ifSetToEn           = document.getElementById( 'pIfSetToEn' );
    this.alphabetIn          = document.getElementById( 'pAlphabetIn' );

    this.sectionBehavior();
    this.sectionService();
    this.sectionlanguage();
  }

  sectionBehavior() {
    this.behaviorWhen.textContent        = browser.i18n.getMessage( 'optionPageBehaviorWhen' );
    this.caseOfText.textContent          = browser.i18n.getMessage( 'optionPageCaseOfText' ); 
    this.caseOfWebpage.textContent       = browser.i18n.getMessage( 'optionPageCaseOfWebpage' );
    this.textOpenByNewTab.textContent    = browser.i18n.getMessage( 'optionPageOpenByNewTab' );
    this.textOpenByNewWindow.textContent = browser.i18n.getMessage( 'optionPageOpenByNewWindow' );
    this.webOpenByNewTab.textContent     = browser.i18n.getMessage( 'optionPageOpenByNewTab' );
    this.webOpenByNewWindow.textContent  = browser.i18n.getMessage( 'optionPageOpenByNewWindow' );
    this.sizeOfNewWindow.textContent     = browser.i18n.getMessage( 'optionPageSizeOfNewWindow' );
    this.specifySizeOfWindow.textContent = browser.i18n.getMessage( 'optionPageSpecifySizeOfWindow' );
    this.whenSetWH.textContent           = browser.i18n.getMessage( 'optionPageWhenSetWH' );
  }

  sectionService() {
    this.serviceUsedFor.textContent      = browser.i18n.getMessage( 'optionPageServiceUsedFor' );
    this.specifyService.textContent      = browser.i18n.getMessage( 'optionPageSpecifyTranslationService' );
    this.dependingOnSelected.textContent = browser.i18n.getMessage( 'optionPageDependingOnSelected' );
  }

  sectionlanguage() {
    this.translatedLanguage.textContent  = browser.i18n.getMessage( 'optionPageTranslatedLanguage' );
    this.specifyLanguageCode.textContent = browser.i18n.getMessage( 'optionPageSpecifyLanguageCode' )
    this.ifSetToEn.textContent           = browser.i18n.getMessage( 'optionPageIfSetEn' );
    this.alphabetIn.textContent          = browser.i18n.getMessage( 'optionPageAlphabetIn' );
  }
}

const multilingualInstance = new multilingual;