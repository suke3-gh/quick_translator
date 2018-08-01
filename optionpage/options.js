
function init(obj) {
  const initOM_text    = document.querySelector('#formOM_text input[value="'+obj.openMethod_text+'"]');
  const initOM_website = document.querySelector('#formOM_website input[value="'+obj.openMethod_website+'"]');
  const initLC         = document.querySelector('option[value="'+obj.languageCode+'"]');

  initOM_text.checked    = true;
  initOM_website.checked = true;
  initLC.selected        = true;

  document.getElementById('HTO_specifySize').checked = obj.specifySize;
  document.getElementById('SOW_width').value         = obj.sizeWidth;
  document.getElementById('SOW_height').value        = obj.sizeHeight;
}

function saveOM_text() {
  const valueOM_text = document.querySelector('input[name="howToOpenText"]:checked').value;
  browser.storage.local.set({ openMethod_text: valueOM_text });
}

function saveOM_website() {
  const valueOM_website = document.querySelector('input[name="howToOpenWebsite"]:checked').value;
  browser.storage.local.set({ openMethod_website: valueOM_website });
}

function saveOM_specifySize() {
  const valueOM_specifySize = document.getElementById('HTO_specifySize').checked;
  const valueOM_sizeWidth   = Number( document.getElementById('SOW_width').value );
  const valueOM_sizeHeight  = Number( document.getElementById('SOW_height').value );
  browser.storage.local.set({
    specifySize: valueOM_specifySize, sizeWidth: valueOM_sizeWidth, sizeHeight: valueOM_sizeHeight
  });
}

function saveLC() {
  const valueLC = document.querySelector('#languageCode').value;
  browser.storage.local.set({ languageCode: valueLC });
}

const initSetting = browser.storage.local.get([
  'openMethod_text', 'openMethod_website', 'specifySize', 'sizeWidth', 'sizeHeight', 'languageCode'
])
  .then(init);

// Update processing
document.getElementById('formOM_text').addEventListener('input', saveOM_text);
document.getElementById('formOM_website').addEventListener('input', saveOM_website);
document.getElementById('formOM_specifySize').addEventListener('input', saveOM_specifySize);
document.getElementById('formLC').addEventListener('input', saveLC);

// For multilingual
document.getElementById('divBehaviorWhen').textContent        = browser.i18n.getMessage('optionpageBehaviorWhen');
document.getElementById('strongCaseOfText').textContent       = browser.i18n.getMessage('optionpageCaseOfText');
document.getElementById('strongCaseOfWebsite').textContent    = browser.i18n.getMessage('optionpageCaseOfWebsite');
document.getElementById('labelOpenByNewTab_A').textContent    = browser.i18n.getMessage('optionpageOpenByNewTab');
document.getElementById('labelOpenByNewWindow_A').textContent = browser.i18n.getMessage('optionpageOpenByNewWindow');
document.getElementById('labelOpenByNewTab_B').textContent    = browser.i18n.getMessage('optionpageOpenByNewTab');
document.getElementById('labelOpenByNewWindow_B').textContent = browser.i18n.getMessage('optionpageOpenByNewWindow');
document.getElementById('strongSizeOfNewWindow').textContent  = browser.i18n.getMessage('optionpageSizeOfNewWindow');
document.getElementById('labelSpecifySize').textContent       = browser.i18n.getMessage('optionpageSpecifySize');
document.getElementById('pWhenSetWH').textContent             = browser.i18n.getMessage('optionpageWhenSetWH');

document.getElementById('divLanguageOf').textContent   = browser.i18n.getMessage('optionpageLanguageOf');
document.getElementById('pIfSetToEn').textContent      = browser.i18n.getMessage('optionpageIfSetEn');
