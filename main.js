
/* ID */
const ID01    = 'selectText';
const title01 = browser.i18n.getMessage('menuTextTitle01');

const ID02    = 'clickPage';
const title02 = browser.i18n.getMessage('menuTextTitle02');

/* Menu */
const menu01 = browser.menus.create({
  id: ID01, title: title01, contexts: ['selection']
});

const menu02 = browser.menus.create({
  id: ID02, title: title02, contexts: ['page']
});

/* Behavior */
function openByNewWindow(URL, specifySize, sizeWidth, sizeHeight) {
  if (specifySize == true) {
    browser.windows.create({ url: URL, width: sizeWidth, height: sizeHeight });
  } else {
    browser.windows.create({ url: URL });
  }
}

function openByNewTab(URL) {
  browser.tabs.create({ url: URL });
}

function notificationNotSetup() {
  browser.notifications.create('notificationNS', {
    'type'   : 'basic',
    'title'  : 'Notification from add-on \"Quick translate\"',
    'message': browser.i18n.getMessage('notificationTextNotSetup')
  });
  setTimeout( () => { browser.notifications.clear('notificationNS'); }, 5000);
}

browser.menus.onClicked.addListener( (info) => {
  browser.storage.local.get()
    .then( (obj) => {
      if (obj.translationService == null) {
        obj.translationService = "Google";
      }
      switch (info.menuItemId) {
        case ID01:
          if ( (obj.openMethod_text == null) || (obj.languageCode == null) ) {
            notificationNotSetup();
            obj.openMethod_text = 'tab';
            obj.languageCode    = 'en';
          }
          const targetText = info.selectionText
            .replace(/\%/g, '％')
            .replace(/\&/g, '%26')
            .replace(/\//g, '%2F')
            .replace(/\|/g, '%7C');
          let URL_translateText = obj.languageCode+'&text='+targetText;
          switch (obj.translationService) {
            case "Google":
              URL_translateText = 'https://translate.google.com/#view=home&op=translate&sl=auto&tl='+URL_translateText;
              break;
            case "Bing":
              URL_translateText = 'https://www.bing.com/translator?from=&to='+URL_translateText;
              break;
          } /* End: switch (obj.translationService) */
          switch (obj.openMethod_text) {
            case 'window':
              openByNewWindow(URL_translateText, obj.specifySize, obj.sizeWidth, obj.sizeHeight);
              break;
            case 'tab':
              openByNewTab(URL_translateText);
              break;
          } /* End: switch (obj.openMethod_text) */
          break; /* End: case ID01 */
        case ID02:
          if ( (obj.openMethod_website == null) || (obj.languageCode == null) ) {
            notificationNotSetup();
            obj.openMethod_website = 'tab';
            obj.languageCode       = 'en';
          }
          let URL_translateWebsite = info.pageUrl;
          switch (obj.translationService) {
            case "Google":
              URL_translateWebsite = 'https://translate.google.com/translate?hl='+obj.languageCode+'&sl=auto&tl='+obj.languageCode+'&u='+URL_translateWebsite;
              break;
            case "Bing":
              URL_translateWebsite = 'https://www.translatetheweb.com/?from=&to='+obj.languageCode+'&a='+URL_translateWebsite;
              break;
          } /* End: switch (obj.translationService) */
          switch (obj.openMethod_website) {
            case 'window':
              openByNewWindow(URL_translateWebsite, obj.specifySize, obj.sizeWidth, obj.sizeHeight);
              break;
            case 'tab':
              openByNewTab(URL_translateWebsite);
              break;
          } /* End: switch (obj.openMethod_website) */
          break; /* End: case ID02 */
      } /* End: switch (info.menuItemId) */
    }); /* End: browser.storage.local.get().then */
}); /* End: browser.menus.onClicked.addListener */

browser.pageAction.onClicked.addListener( (tab) => {
  browser.storage.local.get()
    .then( (obj) => {
      if (obj.translationService == null) {
        obj.translationService = "Google";
      }
      if ( (obj.openMethod_website == null) || (obj.languageCode == null) ) {
        notificationNotSetup();
        obj.openMethod_website = 'tab';
        obj.languageCode       = 'en';
      }
      let barURL = tab.url;
      switch (obj.translationService) {
        case "Google":
          barURL = 'https://translate.google.com/translate?hl='+obj.languageCode+'&sl=auto&tl='+obj.languageCode+'&u='+barURL;
          break;
        case "Bing":
          barURL = 'https://www.translatetheweb.com/?from=&to='+obj.languageCode+'&a='+barURL;
          break;
      } /* End: switch (obj.translationService) */
      switch (obj.openMethod_website) {
        case 'window':
          openByNewWindow(barURL, obj.specifySize, obj.sizeWidth, obj.sizeHeight);
          break;
        case 'tab':
          openByNewTab(barURL);
          break;
      } /* End: switch (obj.openMethod_website) */
    }); /* End: browser.storage.local.get().then */
}); /* End: browser.pageAction.onClicked.addListener */
