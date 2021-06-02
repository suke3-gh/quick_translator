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
                .then(function (settings) { selectLanguageCode(languageCodeListMicrosoft, settings.languageCode); })["catch"](function (id) { return exceptionLog(id); });
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
    if (paramFlag == 'Y') {
        windowFlag.checked = true;
    }
    else {
        windowFlag.checked = false;
    }
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
function selectLanguageCode(list, languageCode) {
    var input = list.querySelector('input[value="' + languageCode + '"]');
    if (input == null) {
        input = list.querySelector('input[value="auto"]');
        console.log('Quick translator: A value is set as auto.');
        browser.storage.local.set({ languageCode: 'auto' })["catch"](function (id) { return exceptionLog(id); });
    }
    input.checked = true;
}
function exceptionLog(id) {
    console.log(id.name + ': ' + id.message);
}
/** main process */
function processReadout() {
    browser.storage.local.get()
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
    var _a, _b, _c, _d, _e, _f, _g;
    (_a = document.getElementById('formOpenMethodText')) === null || _a === void 0 ? void 0 : _a.addEventListener('input', function (event) {
        if (event.target instanceof HTMLInputElement) {
            var openMethod = event.target.value;
            browser.storage.local.set({ openMethodText: openMethod })["catch"](function (id) { return exceptionLog(id); });
        }
    }, false);
    (_b = document.getElementById('formOpenMethodWebpage')) === null || _b === void 0 ? void 0 : _b.addEventListener('input', function (event) {
        if (event.target instanceof HTMLInputElement) {
            var openMethod = event.target.value;
            browser.storage.local.set({ openMethodWebpage: openMethod })["catch"](function (id) { return exceptionLog(id); });
        }
    }, false);
    (_c = document.getElementById('inputSpecifySizeFlag')) === null || _c === void 0 ? void 0 : _c.addEventListener('input', function (event) {
        if (event.target instanceof HTMLInputElement) {
            var flag = '';
            if (event.target.checked == true) {
                flag = 'Y';
            }
            else {
                flag = 'N';
            }
            browser.storage.local.set({ specifySizeFlag: flag })["catch"](function (id) { return exceptionLog(id); });
        }
    });
    (_d = document.getElementById('inputSizeOfNewWindowHeight')) === null || _d === void 0 ? void 0 : _d.addEventListener('input', function (event) {
        if (event.target instanceof HTMLInputElement) {
            var height = Number(event.target.value);
            browser.storage.local.set({ sizeHeight: height })["catch"](function (id) { return exceptionLog(id); });
        }
    });
    (_e = document.getElementById('inputSizeOfNewWindowWidth')) === null || _e === void 0 ? void 0 : _e.addEventListener('input', function (event) {
        if (event.target instanceof HTMLInputElement) {
            var width = Number(event.target.value);
            browser.storage.local.set({ sizeWidth: width })["catch"](function (id) { return exceptionLog(id); });
        }
    });
    (_f = document.getElementById('formTranslationService')) === null || _f === void 0 ? void 0 : _f.addEventListener('input', function (event) {
        if (event.target instanceof HTMLInputElement) {
            browser.storage.local.set({ translationService: event.target.value })["catch"](function (id) { return exceptionLog(id); });
            changeLanguageCodeList(event.target.value);
        }
    }, false);
    (_g = document.getElementById('formLanguageCode')) === null || _g === void 0 ? void 0 : _g.addEventListener('input', function (event) {
        if (event.target instanceof HTMLInputElement) {
            browser.storage.local.set({ languageCode: event.target.value })["catch"](function (id) { return exceptionLog(id); });
        }
    }, false);
}
processReadout();
processSupportMultilingual();
processUpdate();
