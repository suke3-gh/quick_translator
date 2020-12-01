
const elementOpenMethodText        = document.getElementById( 'formOpenMethodText' );
const elementOpenMethodWebsite     = document.getElementById( 'formOpenMethodWebsite' );
const elementOpenMethodSpecifySize = document.getElementById( 'formOpenMethodSpecifySize' );
const elementSpecifySizeFlag       = elementOpenMethodSpecifySize.querySelector( '#inputSpecifySize' );
const elementSizeOfNewWindowWidth  = elementOpenMethodSpecifySize.querySelector( '#inputSizeOfNewWindowWidth' );
const elementSizeOfNewWindowHeight = elementOpenMethodSpecifySize.querySelector( '#inputSizeOfNewWindowHeight' );
const elementTranslationService    = document.getElementById( 'formTranslationService' );
const elementLanguageCode          = document.getElementById( 'formLanguageCode' );

function changeLanguageCodeList(translationService) {
  switch (translationService) {
    case 'Bing':
      elementLanguageCode.querySelector( '#languagecode-bing' ).style.display   = 'flex';
      elementLanguageCode.querySelector( '#languagecode-google' ).style.display = 'none';
      break;
    case 'Google':
      elementLanguageCode.querySelector( '#languagecode-bing' ).style.display   = 'none';
      elementLanguageCode.querySelector( '#languagecode-google' ).style.display = 'flex';
      break;
  }
}

// Initialize
browser.storage.local.get()
  .then( obj => {
    if (obj.openMethodText == undefined) {
      elementOpenMethodText.querySelector( 'input[value="tab"]' ).checked = true;
    } else {
      elementOpenMethodText.querySelector( 'input[value="'+obj.openMethodText+'"]' ).checked = true;
    }
  
    if (obj.openMethodWebsite == undefined) {
      elementOpenMethodWebsite.querySelector( 'input[value="tab"]' ).checked = true;
    } else {
      elementOpenMethodWebsite.querySelector( 'input[value="'+obj.openMethodWebsite+'"]' ).checked = true;
    }

    elementSpecifySizeFlag.checked     = obj.specifySize;
    elementSizeOfNewWindowWidth.value  = obj.sizeWidth;
    elementSizeOfNewWindowHeight.value = obj.sizeHeight;
  
    if (obj.translationService == undefined) {
      elementTranslationService.querySelector( 'input[value="Google"]' ).checked = true;
      changeLanguageCodeList(obj.translationService);
    } else {
      elementTranslationService.querySelector( 'input[value="'+obj.translationService+'"]' ).checked = true;
      changeLanguageCodeList(obj.translationService);
    }
  
    if (obj.languageCode == undefined) {
      elementLanguageCode.querySelector( 'input[value="auto"]' ).checked = true;
    } else {
      elementLanguageCode.querySelector( 'input[value="'+obj.languageCode+'"]' ).checked = true;
    }
  }, false);

// Update processing
elementOpenMethodText.addEventListener('input', (obj) => {
  const valueOpenMethodText = obj.target.value;
  browser.storage.local.set({
    openMethodText: valueOpenMethodText
  });
}, false);

elementOpenMethodWebsite.addEventListener('input', (obj) => {
  const valueOpenMethodWebsite = obj.target.value;
  browser.storage.local.set({
    openMethodWebsite: valueOpenMethodWebsite
  });
}, false);

elementOpenMethodSpecifySize.addEventListener('input', () => {
  const valueSpecifySizeFlag       = elementSpecifySizeFlag.checked;
  const valueSizeOfNewWindowWidth  = Number( encodeURI( elementSizeOfNewWindowWidth.value ) );
  const valueSizeOfNewWindowHeight = Number( encodeURI( elementSizeOfNewWindowHeight.value ) );
  browser.storage.local.set({
    specifySize: valueSpecifySizeFlag,
    sizeWidth:   valueSizeOfNewWindowWidth,
    sizeHeight:  valueSizeOfNewWindowHeight
  });
}, false);

elementTranslationService.addEventListener('input', (obj) => {
  const valueTranslationService = obj.target.value
  browser.storage.local.set({
    translationService: valueTranslationService
  });
  changeLanguageCodeList(valueTranslationService);
}, false);

elementLanguageCode.addEventListener('input', (obj) => {
  const valueLanguageCode = obj.target.value;
  browser.storage.local.set({
    languageCode: valueLanguageCode
  });
}, false);

// For multilingual
document.getElementById('h2BehaviorWhen').textContent             = browser.i18n.getMessage('optionPageBehaviorWhen');
document.getElementById('h3CaseOfText').textContent               = browser.i18n.getMessage('optionPageCaseOfText');
document.getElementById('h3CaseOfWebsite').textContent            = browser.i18n.getMessage('optionPageCaseOfWebsite');
document.getElementById('spanTextOpenByNewTab').textContent       = browser.i18n.getMessage('optionPageOpenByNewTab');
document.getElementById('spanTextOpenByNewWindow').textContent    = browser.i18n.getMessage('optionPageOpenByNewWindow');
document.getElementById('spanWebsiteOpenByNewTab').textContent    = browser.i18n.getMessage('optionPageOpenByNewTab');
document.getElementById('spanWebsiteOpenByNewWindow').textContent = browser.i18n.getMessage('optionPageOpenByNewWindow');
document.getElementById('h3SizeOfNewWindow').textContent          = browser.i18n.getMessage('optionPageSizeOfNewWindow');
document.getElementById('spanSpecifySizeOfWindow').textContent    = browser.i18n.getMessage('optionPageSpecifySizeOfWindow');
document.getElementById('pWhenSetWH').textContent                 = browser.i18n.getMessage('optionPageWhenSetWH');

document.getElementById('h2ServiceUsedFor').textContent            = browser.i18n.getMessage('optionPageServiceUsedFor');
document.getElementById('h3SpecifyTranslationService').textContent = browser.i18n.getMessage('optionPageSpecifyTranslationService');
document.getElementById('pDependingOnSelected').textContent        = browser.i18n.getMessage('optionPageDependingOnSelected');

document.getElementById('h2TranslatedLanguage').textContent   = browser.i18n.getMessage('optionPageTranslatedLanguage');
document.getElementById('h3SpecifyLanguageCode').textContent  = browser.i18n.getMessage('optionPageSpecifyLanguageCode');
document.getElementById('pIfSetToEn').textContent             = browser.i18n.getMessage('optionPageIfSetEn');
document.getElementById('pAlphabetIn').textContent            = browser.i18n.getMessage('optionPageAlphabetIn');