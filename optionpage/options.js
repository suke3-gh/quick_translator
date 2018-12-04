
function init(obj) {
  const init_openMethod_text    = document.querySelector('#form_openMethod_text input[value="'+obj.openMethod_text+'"]');
  const init_openMethod_website = document.querySelector('#form_openMethod_website input[value="'+obj.openMethod_website+'"]');
  const init_languageCode       = document.querySelector('option[value="'+obj.languageCode+'"]');

  init_openMethod_text.checked    = true;
  init_openMethod_website.checked = true;
  init_languageCode.selected      = true;

  document.getElementById('input_specifySize').checked          = obj.specifySize;
  document.getElementById('input_sizeOfNewWindow_width').value  = obj.sizeWidth;
  document.getElementById('input_sizeOfNewWindow_height').value = obj.sizeHeight;
}

function save_openMethod_text() {
  const value_openMethod_text = document.querySelector('input[name="name_translateText"]:checked').value;
  browser.storage.local.set({ openMethod_text: value_openMethod_text });
}

function save_openMethod_website() {
  const value_openMethod_website = document.querySelector('input[name="name_translateWebsite"]:checked').value;
  browser.storage.local.set({ openMethod_website: value_openMethod_website });
}

function save_openMethod_specifySize() {
  const value_openMethod_specifySize = document.getElementById('input_specifySize').checked;
  const value_openMethod_sizeWidth   = Number( document.getElementById('input_sizeOfNewWindow_width').value );
  const value_openMethod_sizeHeight  = Number( document.getElementById('input_sizeOfNewWindow_height').value );
  browser.storage.local.set({ specifySize: value_openMethod_specifySize, sizeWidth: value_openMethod_sizeWidth, sizeHeight: value_openMethod_sizeHeight });
}

function save_languageCode() {
  const value_languageCode = document.querySelector('#select_languageCode').value;
  browser.storage.local.set({ languageCode: value_languageCode });
}

const initSetting = browser.storage.local.get(['openMethod_text', 'openMethod_website', 'specifySize', 'sizeWidth', 'sizeHeight', 'shortcutInAddressbar', 'languageCode'])
  .then(init);

// Update processing
document.getElementById('form_openMethod_text').addEventListener('input', save_openMethod_text);
document.getElementById('form_openMethod_website').addEventListener('input', save_openMethod_website);
document.getElementById('form_openMethod_specifySize').addEventListener('input', save_openMethod_specifySize);
document.getElementById('form_languageCode').addEventListener('input', save_languageCode);

// For multilingual
document.getElementById('div_behaviorWhen').textContent              = browser.i18n.getMessage('optionpageBehaviorWhen');
document.getElementById('strong_caseOfText').textContent             = browser.i18n.getMessage('optionpageCaseOfText');
document.getElementById('strong_caseOfWebsite').textContent          = browser.i18n.getMessage('optionpageCaseOfWebsite');
document.getElementById('label_text_openByNewTab').textContent       = browser.i18n.getMessage('optionpageOpenByNewTab');
document.getElementById('label_text_openByNewWindow').textContent    = browser.i18n.getMessage('optionpageOpenByNewWindow');
document.getElementById('label_website_openByNewTab').textContent    = browser.i18n.getMessage('optionpageOpenByNewTab');
document.getElementById('label_website_openByNewWindow').textContent = browser.i18n.getMessage('optionpageOpenByNewWindow');
document.getElementById('strong_sizeOfNewWindow').textContent        = browser.i18n.getMessage('optionpageSizeOfNewWindow');
document.getElementById('label_specifySize').textContent             = browser.i18n.getMessage('optionpageSpecifySize');
document.getElementById('p_whenSetWH').textContent                   = browser.i18n.getMessage('optionpageWhenSetWH');

document.getElementById('div_languageOf').textContent = browser.i18n.getMessage('optionpageLanguageOf');
document.getElementById('p_ifSetToEn').textContent    = browser.i18n.getMessage('optionpageIfSetEn');
