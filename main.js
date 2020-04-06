
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
          if ( (obj.openMethodText == null) || (obj.languageCode == null) ) {
            notificationNotSetup();
            obj.openMethodText = 'tab';
            obj.languageCode   = 'en';
          }
          const targetText = info.selectionText
            .replace(/\%/g, '％')
            .replace(/\&/g, '%26')
            .replace(/\//g, '%2F')
            .replace(/\|/g, '%7C');
          let urlTranslateText = obj.languageCode+'&text='+targetText;
          switch (obj.translationService) {
            case "Google":
              urlTranslateText = 'https://translate.google.com/#view=home&op=translate&sl=auto&tl='+urlTranslateText;
              break;
            case "Bing":
              urlTranslateText = 'https://www.bing.com/translator?from=&to='+urlTranslateText;
              break;
          } /* End: switch (obj.translationService) */
          switch (obj.openMethodText) {
            case 'window':
              openByNewWindow(urlTranslateText, obj.specifySize, obj.sizeWidth, obj.sizeHeight);
              break;
            case 'tab':
              openByNewTab(urlTranslateText);
              break;
          } /* End: switch (obj.openMethodText) */
          break; /* End: case ID01 */
        case ID02:
          if ( (obj.openMethodWebsite == null) || (obj.languageCode == null) ) {
            notificationNotSetup();
            obj.openMethodWebsite = 'tab';
            obj.languageCode      = 'en';
          }
          let urlTranslateWebsite = info.pageUrl;
          switch (obj.translationService) {
            case "Google":
              urlTranslateWebsite = 'https://translate.google.com/translate?hl='+obj.languageCode+'&sl=auto&tl='+obj.languageCode+'&u='+urlTranslateWebsite;
              break;
            case "Bing":
              urlTranslateWebsite = 'https://www.translatetheweb.com/?from=&to='+obj.languageCode+'&a='+urlTranslateWebsite;
              break;
          } /* End: switch (obj.translationService) */
          switch (obj.openMethodWebsite) {
            case 'window':
              openByNewWindow(urlTranslateWebsite, obj.specifySize, obj.sizeWidth, obj.sizeHeight);
              break;
            case 'tab':
              openByNewTab(urlTranslateWebsite);
              break;
          } /* End: switch (obj.openMethodWebsite) */
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
      if ( (obj.openMethodWebsite == null) || (obj.languageCode == null) ) {
        notificationNotSetup();
        obj.openMethodWebsite = 'tab';
        obj.languageCode       = 'en';
      }
      let barUrl = tab.url;
      switch (obj.translationService) {
        case "Google":
          barUrl = 'https://translate.google.com/translate?hl='+obj.languageCode+'&sl=auto&tl='+obj.languageCode+'&u='+barUrl;
          break;
        case "Bing":
          barUrl = 'https://www.translatetheweb.com/?from=&to='+obj.languageCode+'&a='+barUrl;
          break;
      } /* End: switch (obj.translationService) */
      switch (obj.openMethodWebsite) {
        case 'window':
          openByNewWindow(barUrl, obj.specifySize, obj.sizeWidth, obj.sizeHeight);
          break;
        case 'tab':
          openByNewTab(barUrl);
          break;
      } /* End: switch (obj.openMethodWebsite) */
    }); /* End: browser.storage.local.get().then */
}); /* End: browser.pageAction.onClicked.addListener */
