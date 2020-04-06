
/* Initialize */
browser.storage.local.get()
  .then( (obj) => {
    if (obj.openMethodText != null) {
      document.querySelector('#formOpenMethodText input[value="'+obj.openMethodText+'"]').checked = true;
    }

    if (obj.openMethodWebsite != null) {
      document.querySelector('#formOpenMethodWebsite input[value="'+obj.openMethodWebsite+'"]').checked = true;
    }

    if (obj.translationService != null) {
      document.querySelector('option[value="'+obj.translationService+'"]').selected = true;
    }

    if (obj.languageCode != null) {
      document.querySelector('option[value="'+obj.languageCode+'"]').selected = true;
    }

    document.getElementById('inputSpecifySize').checked          = obj.specifySize;
    document.getElementById('inputSizeOfNewWindowWidth').value  = obj.sizeWidth;
    document.getElementById('inputSizeOfNewWindowHeight').value = obj.sizeHeight;
  });

/* Update processing */
document.getElementById('formOpenMethodText').addEventListener('input', () => {
  const valueOpenMethodText = document.querySelector('input[name="nameTranslateText"]:checked').value;
  browser.storage.local.set({ openMethodText: valueOpenMethodText });
}, false);

document.getElementById('formOpenMethodWebsite').addEventListener('input', () => {
  const valueOpenMethodWebsite = document.querySelector('input[name="nameTranslateWebsite"]:checked').value;
  browser.storage.local.set({ openMethodWebsite: valueOpenMethodWebsite });
}, false);

document.getElementById('formOpenMethodSpecifySize').addEventListener('input', () => {
  const valueOpenMethodSpecifySize = document.getElementById('inputSpecifySize').checked;
  const tempSizeWidth  = encodeURI( document.getElementById('inputSizeOfNewWindowWidth').value );
  const tempSizeHeight = encodeURI( document.getElementById('inputSizeOfNewWindowHeight').value );
  const valueOpenMethodSizeWidth  = Number( tempSizeWidth );
  const valueOpenMethodSizeHeight = Number( tempSizeHeight );
  browser.storage.local.set({ specifySize: valueOpenMethodSpecifySize, sizeWidth: valueOpenMethodSizeWidth, sizeHeight: valueOpenMethodSizeHeight });
}, false);

document.getElementById('formTranslationService').addEventListener('input', () => {
  const valueTranslationService = document.getElementById('selectTranslationService').value;
  browser.storage.local.set({ translationService: valueTranslationService });
}, false);

document.getElementById('formLanguageCode').addEventListener('input', () => {
  const valueLanguageCode = document.getElementById('selectLanguageCode').value;
  browser.storage.local.set({ languageCode: valueLanguageCode });
}, false);

/* For multilingual */
document.getElementById('divBehaviorWhen').textContent             = browser.i18n.getMessage('optionPageBehaviorWhen');
document.getElementById('bCaseOfText').textContent                 = browser.i18n.getMessage('optionPageCaseOfText');
document.getElementById('bCaseOfWebsite').textContent              = browser.i18n.getMessage('optionPageCaseOfWebsite');
document.getElementById('labelTextOpenByNewTab').textContent       = browser.i18n.getMessage('optionPageOpenByNewTab');
document.getElementById('labelTextOpenByNewWindow').textContent    = browser.i18n.getMessage('optionPageOpenByNewWindow');
document.getElementById('labelWebsiteOpenByNewTab').textContent    = browser.i18n.getMessage('optionPageOpenByNewTab');
document.getElementById('labelWebsiteOpenByNewWindow').textContent = browser.i18n.getMessage('optionPageOpenByNewWindow');
document.getElementById('bSizeOfNewWindow').textContent            = browser.i18n.getMessage('optionPageSizeOfNewWindow');
document.getElementById('labelSpecifySizeOfWindow').textContent    = browser.i18n.getMessage('optionPageSpecifySizeOfWindow');
document.getElementById('pWhenSetWH').textContent                  = browser.i18n.getMessage('optionPageWhenSetWH');

document.getElementById('divTranslatedLanguage').textContent = browser.i18n.getMessage('optionPageTranslatedLanguage');
document.getElementById('bSpecifyLanguageCode').textContent  = browser.i18n.getMessage('optionPageSpecifyLanguageCode');
document.getElementById('pIfSetToEn').textContent            = browser.i18n.getMessage('optionPageIfSetEn');

document.getElementById('divServiceUsedFor').textContent          = browser.i18n.getMessage('optionPageServiceUsedFor');
document.getElementById('bSpecifyTranslationService').textContent = browser.i18n.getMessage('optionPageSpecifyTranslationService');
document.getElementById('pWhenBingIsSelected').textContent        = browser.i18n.getMessage('optionPageWhenBingIsSelected');