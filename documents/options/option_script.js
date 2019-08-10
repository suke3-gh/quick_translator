
// Initialize
browser.storage.local.get(['openMethod_text', 'openMethod_website', 'specifySize', 'sizeWidth', 'sizeHeight', 'shortcutInAddressbar', 'languageCode'])
  .then( (obj) => {
    if (obj.openMethod_text != undefined) {
      document.querySelector('#form_openMethod_text input[value="'+obj.openMethod_text+'"]').checked = true;
    }

    if (obj.openMethod_website != undefined) {
      document.querySelector('#form_openMethod_website input[value="'+obj.openMethod_website+'"]').checked = true;
    }

    if (obj.languageCode != undefined) {
      document.querySelector('option[value="'+obj.languageCode+'"]').selected = true;
    }

    document.getElementById('input_specifySize').checked          = obj.specifySize;
    document.getElementById('input_sizeOfNewWindow_width').value  = obj.sizeWidth;
    document.getElementById('input_sizeOfNewWindow_height').value = obj.sizeHeight;
  });

// Update processing
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
  const value_openMethod_sizeWidth   = Number( document.getElementById('input_sizeOfNewWindow_width').value );
  const value_openMethod_sizeHeight  = Number( document.getElementById('input_sizeOfNewWindow_height').value );
  browser.storage.local.set({ specifySize: value_openMethod_specifySize, sizeWidth: value_openMethod_sizeWidth, sizeHeight: value_openMethod_sizeHeight });
}, false);

document.getElementById('form_languageCode').addEventListener('input', () => {
  const value_languageCode = document.getElementById('select_languageCode').value;
  browser.storage.local.set({ languageCode: value_languageCode });
}, false);

// For multilingual
document.getElementById('div_behaviorWhen').textContent              = browser.i18n.getMessage('optionUiBehaviorWhen');
document.getElementById('strong_caseOfText').textContent             = browser.i18n.getMessage('optionUiCaseOfText');
document.getElementById('strong_caseOfWebsite').textContent          = browser.i18n.getMessage('optionUiCaseOfWebsite');
document.getElementById('label_text_openByNewTab').textContent       = browser.i18n.getMessage('optionUiOpenByNewTab');
document.getElementById('label_text_openByNewWindow').textContent    = browser.i18n.getMessage('optionUiOpenByNewWindow');
document.getElementById('label_website_openByNewTab').textContent    = browser.i18n.getMessage('optionUiOpenByNewTab');
document.getElementById('label_website_openByNewWindow').textContent = browser.i18n.getMessage('optionUiOpenByNewWindow');
document.getElementById('strong_sizeOfNewWindow').textContent        = browser.i18n.getMessage('optionUiSizeOfNewWindow');
document.getElementById('label_specifySizeOfWindow').textContent     = browser.i18n.getMessage('optionUiSpecifySizeOfWindow');
document.getElementById('p_whenSetWH').textContent                   = browser.i18n.getMessage('optionUiWhenSetWH');

document.getElementById('div_languageOf').textContent             = browser.i18n.getMessage('optionUiLanguageOf');
document.getElementById('strong_specifyLanguageCode').textContent = browser.i18n.getMessage('optionUiSpecifyLanguageCode');
document.getElementById('p_ifSetToEn').textContent                = browser.i18n.getMessage('optionUiIfSetEn');

document.getElementById('p_describesBasicThing').textContent = browser.i18n.getMessage('optionUiDescribesBasicThing');