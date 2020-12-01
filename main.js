
// Create menu items
const itemIdForText = 'selectText';
const contextMenuForText = browser.menus.create({
  contexts: ['selection'],
  id:       itemIdForText,
  title:    browser.i18n.getMessage( 'contextMenuForText' )
});

const itemIdForPage = 'clickPage';
const contextMenuForPage = browser.menus.create({
  contexts: ['page'],
  id:       itemIdForPage,
  title:    browser.i18n.getMessage( 'contextMenuForPage' )
});

// Functions
function htmlEscape(string) {
  return string
    .replace(/\"/g, '%22')
    .replace(/\'/g, '%27')
    .replace(/\//g, '%2F')
    .replace(/\;/g, '%3B')
    .replace(/\</g, '%3C')
    .replace(/\>/g, '%3E')
    .replace(/\|/g, '%7C');
}

function autoSelectLanguageCode() {
  let tempLanguageCode = browser.i18n.getUILanguage();

  // Fix for German 
  if (tempLanguageCode.indexOf('de') != -1) {
    tempLanguageCode = 'de';
    return tempLanguageCode;
  }
  // Fix for English
  if (tempLanguageCode.indexOf('en') != -1) {
    tempLanguageCode = 'en';
    return tempLanguageCode;
  }
  // Fix for Spnish
  if (tempLanguageCode.indexOf('es') != -1) {
    tempLanguageCode = 'es';
    return tempLanguageCode;
  }
  // Fix for Portuguese
  if (tempLanguageCode.indexOf('pt') != -1) {
    tempLanguageCode = 'pt';
    return tempLanguageCode;
  }
  return tempLanguageCode;
}

function openByNewWindow(url, specifySize, sizeWidth, sizeHeight) {
  if (specifySize == true) {
    browser.windows.create({ url: url, width: sizeWidth, height: sizeHeight });
  } else {
    browser.windows.create({ url: url });
  }
}

function openByNewTab(url) {
  browser.tabs.create({ url: url });
}

function initForText(value1, value2, info) {
  if (value1 == undefined) {
    value1 = 'tab';
  }
  if ( (value2 == undefined) || (value2 == 'auto') ) {
    value2 = autoSelectLanguageCode();
  }
  const value3 = info.selectionText
    .replace(/\%/g, '％')
    .replace(/\&/g, '＆');
  const object = {
    openMethod:   value1,
    languageCode: value2,
    targetText:   htmlEscape(value3)
  }

  return object;
}

function initForPage(value1, value2, value3) {
  if (value1 == undefined) {
    value1 = 'tab';
  }
  if ( (value2 == undefined) || (value2 == 'auto') ) {
    value2 = autoSelectLanguageCode();
  }
  const object = {
    openMethod:   value1,
    languageCode: value2,
    targetUrl:    htmlEscape(value3)
  }

  return object;
}

browser.menus.onClicked.addListener( (info) => {
  browser.storage.local.get()
    .then( (obj) => {
      let url = null;
      
      if (obj.translationService == undefined) {
        obj.translationService = "Google";
      }
      const translationService = obj.translationService;
      switch (info.menuItemId) {
        case itemIdForText:
          const objectForText = initForText(obj.openMethodText, obj.languageCode, info);
            // keys: openMethod, languageCode, targeText
          switch (translationService) {
            case "Google":
              url = 'https://translate.google.com/#view=home&op=translate&sl=auto&tl='+objectForText.languageCode+'&text='+objectForText.targetText;
              break;
            case "Bing":
              url = 'https://www.bing.com/translator?from=&to='+objectForText.languageCode+'&text='+objectForText.targetText;
              break;
          }
          switch (objectForText.openMethod) {
            case 'window':
              openByNewWindow(url, obj.specifySize, obj.sizeWidth, obj.sizeHeight);
              break;
            case 'tab':
              openByNewTab(url);
              break;
          }
          break;
        case itemIdForPage:
          const objectForPage = initForPage(obj.openMethodWebsite, obj.languageCode, info.pageUrl);
            // keys: openmethod, languageCode, targetUrl
          switch (translationService) {
            case "Google":
              url = 'https://translate.google.com/translate?hl='+objectForPage.languageCode+'&sl=auto&tl='+objectForPage.languageCode+'&u='+objectForPage.targetUrl;
              break;
            case "Bing":
              url = 'https://www.translatetheweb.com/?from=&to='+objectForPage.languageCode+'&a='+objectForPage.targetUrl;
              break;
          }
          switch (objectForPage.openMethod) {
            case 'window':
              openByNewWindow(url, obj.specifySize, obj.sizeWidth, obj.sizeHeight);
              break;
            case 'tab':
              openByNewTab(url);
              break;
          }
          break;
      } // end: switch (info.menuItemId)
  });
}); // end: browser.menus.onClicked.addListener

browser.pageAction.onClicked.addListener( (tab) => {
  browser.storage.local.get()
    .then( (obj) => {
      let url = null;

      if (obj.translationService == undefined) {
        obj.translationService = "Google";
      }
      const translationService = obj.translationService;
      const objectForPage      = initForPage(obj.openMethodText, obj.languageCode, tab.url);
        // keys: openMethod, languageCode, targetUrl
      switch (translationService) {
        case "Google":
          url = 'https://translate.google.com/translate?hl='+objectForPage.languageCode+'&sl=auto&tl='+objectForPage.languageCode+'&u='+objectForPage.targetUrl;
          break;
        case "Bing":
          url = 'https://www.translatetheweb.com/?from=&to='+objectForPage.languageCode+'&a='+objectForPage.targetUrl;
          break;
      }
      switch (objectForPage.openMethod) {
        case 'window':
          openByNewWindow(url, obj.specifySize, obj.sizeWidth, obj.sizeHeight);
          break;
        case 'tab':
          openByNewTab(url);
          break;
      }
  });
}); // end: browser.pageAction.onClicked.addListener
