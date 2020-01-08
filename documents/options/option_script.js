
/* Initialize */
browser.storage.local.get()
  .then( (obj) => {
    if (obj.openMethod_text != null) {
      document.querySelector('#form_openMethod_text input[value="'+obj.openMethod_text+'"]').checked = true;
    }

    if (obj.openMethod_website != null) {
      document.querySelector('#form_openMethod_website input[value="'+obj.openMethod_website+'"]').checked = true;
    }

    if (obj.translationService != null) {
      document.querySelector('option[value="'+obj.translationService+'"]').selected = true;
    }

    if (obj.languageCode != null) {
      document.querySelector('option[value="'+obj.languageCode+'"]').selected = true;
    }

    document.getElementById('input_specifySize').checked          = obj.specifySize;
    document.getElementById('input_sizeOfNewWindow_width').value  = obj.sizeWidth;
    document.getElementById('input_sizeOfNewWindow_height').value = obj.sizeHeight;
  });

/* Update processing */
document.getElementById('form_openMethod_text').addEventListener('input', () => {
  const value_openMethod_text = document.querySelector('input[name="name_translateText"]:checked').value;
  browser.storage.local.set({ openMethod_text: value_openMethod_text });
}, false);

document.getElementById('form_openMethod_website').addEventListener('input', () => {
  const value_openMethod_website = document.querySelector('input[name="name_translateWebsite"]:checked').value;
  browser.storage.local.set({ openMethod_website: value_openMethod_website });
}, false);

document.getElementById('form_openMethod_specifySize').addEventListener('input', () => {
  const value_openMethod_specifySize = document.getElementById('input_specifySize').checked;
  const temp_sizeWidth  = encodeURI( document.getElementById('input_sizeOfNewWindow_width').value );
  const temp_sizeHeight = encodeURI( document.getElementById('input_sizeOfNewWindow_height').value );
  const value_openMethod_sizeWidth  = Number( temp_sizeWidth );
  const value_openMethod_sizeHeight = Number( temp_sizeHeight );
  browser.storage.local.set({ specifySize: value_openMethod_specifySize, sizeWidth: value_openMethod_sizeWidth, sizeHeight: value_openMethod_sizeHeight });
}, false);

document.getElementById('form_translationService').addEventListener('input', () => {
  const value_translationService = document.getElementById('select_translationService').value;
  browser.storage.local.set({ translationService: value_translationService });
}, false);

document.getElementById('form_languageCode').addEventListener('input', () => {
  const value_languageCode = document.getElementById('select_languageCode').value;
  browser.storage.local.set({ languageCode: value_languageCode });
}, false);

/* For multilingual */
document.getElementById('div_behaviorWhen').textContent              = browser.i18n.getMessage('optionPageBehaviorWhen');
document.getElementById('b_caseOfText').textContent                  = browser.i18n.getMessage('optionPageCaseOfText');
document.getElementById('b_caseOfWebsite').textContent               = browser.i18n.getMessage('optionPageCaseOfWebsite');
document.getElementById('label_text_openByNewTab').textContent       = browser.i18n.getMessage('optionPageOpenByNewTab');
document.getElementById('label_text_openByNewWindow').textContent    = browser.i18n.getMessage('optionPageOpenByNewWindow');
document.getElementById('label_website_openByNewTab').textContent    = browser.i18n.getMessage('optionPageOpenByNewTab');
document.getElementById('label_website_openByNewWindow').textContent = browser.i18n.getMessage('optionPageOpenByNewWindow');
document.getElementById('b_sizeOfNewWindow').textContent             = browser.i18n.getMessage('optionPageSizeOfNewWindow');
document.getElementById('label_specifySizeOfWindow').textContent     = browser.i18n.getMessage('optionPageSpecifySizeOfWindow');
document.getElementById('p_whenSetWH').textContent                   = browser.i18n.getMessage('optionPageWhenSetWH');

document.getElementById('div_translatedLanguage').textContent = browser.i18n.getMessage('optionPageTranslatedLanguage');
document.getElementById('b_specifyLanguageCode').textContent  = browser.i18n.getMessage('optionPageSpecifyLanguageCode');
document.getElementById('p_ifSetToEn').textContent            = browser.i18n.getMessage('optionPageIfSetEn');

document.getElementById('div_serviceUsedFor').textContent          = browser.i18n.getMessage('optionPageServiceUsedFor');
document.getElementById('b_specifyTranslationService').textContent = browser.i18n.getMessage('optionPageSpecifyTranslationService');
document.getElementById('p_whenBingIsSelected').textContent        = browser.i18n.getMessage('optionPageWhenBingIsSelected');

document.getElementById('p_linkToGithub').textContent = browser.i18n.getMessage('optionPageLinkToGithub');