/**
 * module file: _script.js
 * description:
 */
/** functions */
function changeLanguageCodeList(translationService) {
    var languageCodeListGoogle = document.getElementById('languageCodeListGoogle');
    var languageCodeListMicrosoft = document.getElementById('languageCodeListMicrosoft');
    switch (translationService) {
        case 'Google':
            languageCodeListGoogle.style.display = 'flex';
            languageCodeListMicrosoft.style.display = 'none';
            /** fix for check of radio button. */
            browser.storage.local.get('languageCode')
                .then(function (settings) { selectLanguageCode(languageCodeListGoogle, settings.languageCode); })["catch"](function (id) { return exceptionLog(id); });
            break;
        case 'Microsoft':
            languageCodeListGoogle.style.display = 'none';
            languageCodeListMicrosoft.style.display = 'flex';
            /** fix for check of radio button. */
            browser.storage.local.get('languageCode')
                .then(function (settings) { selectLanguageCode(languageCodeListGoogle, settings.languageCode); })["catch"](function (id) { return exceptionLog(id); });
            break;
    }
}
/** functions: readout~ */
function readoutLanguageCode(languageCode, translationService) {
    var languageCodeListGoogle = document.getElementById('languageCodeListGoogle');
    var languageCodeListMicrosoft = document.getElementById('languageCodeListMicrosoft');
    switch (translationService) {
        case 'Google':
            selectLanguageCode(languageCodeListGoogle, languageCode);
            break;
        case 'Microsoft':
            selectLanguageCode(languageCodeListMicrosoft, languageCode);
            break;
        default:
            selectLanguageCode(languageCodeListGoogle, languageCode);
            break;
    }
}
function readoutOpenMethodText(openMethod) {
    var form = document.getElementById('formOpenMethodText');
    var selector = '';
    switch (openMethod) {
        case null:
        case undefined:
            selector = 'input[value="tab"]';
            break;
        default:
            selector = 'input[value="' + openMethod + '"]';
            break;
    }
    var input = form.querySelector(selector);
    input.checked = true;
}
function readoutOpenMethodWebpage(openMethod) {
    var form = document.getElementById('formOpenMethodWebpage');
    var selector = '';
    switch (openMethod) {
        case null:
        case undefined:
            selector = 'input[value="tab"]';
            break;
        default:
            selector = 'input[value="' + openMethod + '"]';
            break;
    }
    var input = form.querySelector(selector);
    input.checked = true;
}
function readoutSpecifySize(paramFlag, paramWidth, paramHeight) {
    var form = document.getElementById('formOpenMethodSpecifySize');
    var windowFlag = form.querySelector('#inputSpecifySizeFlag');
    var windowHeight = form.querySelector('#inputSizeOfNewWindowHeight');
    var windowWidth = form.querySelector('#inputSizeOfNewWindowWidth');
    windowFlag.checked = paramFlag;
    windowHeight.value = String(paramHeight);
    windowWidth.value = String(paramWidth);
}
function readoutTranslationService(translationService) {
    var selector = '';
    switch (translationService) {
        case null:
        case undefined:
            selector = 'input[value="Google"]';
            translationService = 'Google';
            break;
        default:
            selector = 'input[value="' + translationService + '"]';
            break;
    }
    var form = document.getElementById('formTranslationService');
    var input = form.querySelector(selector);
    input.checked = true;
    changeLanguageCodeList(translationService);
}
function selectLanguageCode(form, languageCode) {
    try {
        var input = form.querySelector('input[value="' + languageCode + '"]');
        input.checked = true;
    }
    catch (e) {
        var input = form.querySelector('input[value="auto"]');
        input.checked = true;
        console.log('A value is set as auto.');
        browser.storage.local.set({ languageCode: 'auto' })["catch"](function (id) { return exceptionLog(id); });
    }
}
function exceptionLog(id) {
    console.log(id.name + ': ' + id.message);
}
/** main process */
function processReadout() {
    browser.storage.local.get(null)
        .then(function (obj) {
        readoutOpenMethodText(obj.openMethodText);
        readoutOpenMethodWebpage(obj.openMethodWebpage);
        readoutSpecifySize(obj.specifySizeFlag, obj.sizeWidth, obj.sizeHeight);
        readoutTranslationService(obj.translationService);
        readoutLanguageCode(obj.languageCode, obj.translationService);
    })["catch"](function (id) { return exceptionLog(id); });
}
function processSupportMultilingual() {
    document.getElementById('h2BehaviorWhen').textContent = browser.i18n.getMessage('optionPageBehaviorWhen');
    document.getElementById('h3CaseOfText').textContent = browser.i18n.getMessage('optionPageCaseOfText');
    document.getElementById('h3CaseOfWebpage').textContent = browser.i18n.getMessage('optionPageCaseOfWebpage');
    document.getElementById('spanTextOpenByNewTab').textContent = browser.i18n.getMessage('optionPageOpenByNewTab');
    document.getElementById('spanTextOpenByNewWindow').textContent = browser.i18n.getMessage('optionPageOpenByNewWindow');
    document.getElementById('spanWebpageOpenByNewTab').textContent = browser.i18n.getMessage('optionPageOpenByNewTab');
    document.getElementById('spanWebpageOpenByNewWindow').textContent = browser.i18n.getMessage('optionPageOpenByNewWindow');
    document.getElementById('h3SizeOfNewWindow').textContent = browser.i18n.getMessage('optionPageSizeOfNewWindow');
    document.getElementById('spanSpecifySizeOfWindow').textContent = browser.i18n.getMessage('optionPageSpecifySizeOfWindow');
    document.getElementById('pWhenSetWH').textContent = browser.i18n.getMessage('optionPageWhenSetWH');
    document.getElementById('h2ServiceUsedFor').textContent = browser.i18n.getMessage('optionPageServiceUsedFor');
    document.getElementById('h3SpecifyTranslationService').textContent = browser.i18n.getMessage('optionPageSpecifyTranslationService');
    document.getElementById('pDependingOnSelected').textContent = browser.i18n.getMessage('optionPageDependingOnSelected');
    document.getElementById('h2TranslatedLanguage').textContent = browser.i18n.getMessage('optionPageTranslatedLanguage');
    document.getElementById('h3SpecifyLanguageCode').textContent = browser.i18n.getMessage('optionPageSpecifyLanguageCode');
    document.getElementById('pIfSetToEn').textContent = browser.i18n.getMessage('optionPageIfSetEn');
    document.getElementById('pAlphabetIn').textContent = browser.i18n.getMessage('optionPageAlphabetIn');
}
function processUpdate() {
    document.getElementById('formOpenMethodText').addEventListener('input', function (event) {
        if (event.target instanceof HTMLInputElement) {
            var openMethod = event.target.value;
            browser.storage.local.set({ openMethodText: openMethod })["catch"](function (id) { return exceptionLog(id); });
        }
    }, false);
    document.getElementById('formOpenMethodWebpage').addEventListener('input', function (event) {
        if (event.target instanceof HTMLInputElement) {
            var openMethod = event.target.value;
            browser.storage.local.set({ openMethodWebpage: openMethod })["catch"](function (id) { return exceptionLog(id); });
        }
    }, false);
    document.getElementById('inputSpecifySizeFlag').addEventListener('input', function (event) {
        if (event.target instanceof HTMLInputElement) {
            var flag = event.target.checked;
            browser.storage.local.set({ specifySizeFlag: flag })["catch"](function (id) { return exceptionLog(id); });
        }
    });
    document.getElementById('inputSizeOfNewWindowHeight').addEventListener('input', function (event) {
        if (event.target instanceof HTMLInputElement) {
            var height = Number(event.target.value);
            browser.storage.local.set({ sizeHeight: height })["catch"](function (id) { return exceptionLog(id); });
        }
    });
    document.getElementById('inputSizeOfNewWindowWidth').addEventListener('input', function (event) {
        if (event.target instanceof HTMLInputElement) {
            var width = Number(event.target.value);
            browser.storage.local.set({ sizeWidth: width })["catch"](function (id) { return exceptionLog(id); });
        }
    });
    document.getElementById('formTranslationService').addEventListener('input', function (event) {
        if (event.target instanceof HTMLInputElement) {
            browser.storage.local.set({ translationService: event.target.value })["catch"](function (id) { return exceptionLog(id); });
            changeLanguageCodeList(event.target.value);
        }
    }, false);
    document.getElementById('formLanguageCode').addEventListener('input', function (event) {
        if (event.target instanceof HTMLInputElement) {
            browser.storage.local.set({ languageCode: event.target.value })["catch"](function (id) { return exceptionLog(id); });
        }
    }, false);
}
processReadout();
processSupportMultilingual();
processUpdate();
