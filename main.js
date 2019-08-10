
// ID
const ID01    = 'selectText';
const title01 = browser.i18n.getMessage('menuTextTitle01');

const ID02    = 'clickPage';
const title02 = browser.i18n.getMessage('menuTextTitle02');

// Menu
const menu01 = browser.menus.create({
  id: ID01, title: title01, contexts: ['selection']
});

const menu02 = browser.menus.create({
  id: ID02, title: title02, contexts: ['page']
});

// Behavior
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

// Behavior clicked menu button
browser.menus.onClicked.addListener( (info) => {
  browser.storage.local.get(['openMethod_text', 'openMethod_website', 'specifySize', 'sizeWidth', 'sizeHeight', 'languageCode'])
    .then( (obj) => {
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
          const URL_translateText = 'https://translate.google.com/#view=home&op=translate&sl=auto&tl='+obj.languageCode+'&text='+targetText;
          switch (obj.openMethod_text) {
            case 'window':
              openByNewWindow(URL_translateText, obj.specifySize, obj.sizeWidth, obj.sizeHeight);
              break;
            case 'tab':
              openByNewTab(URL_translateText);
              break;
          }
          break;

        case ID02:
          if ( (obj.openMethod_website == null) || (obj.languageCode == null) ) {
            notificationNotSetup();
            obj.openMethod_website = 'tab';
            obj.languageCode       = 'en';
          }
          const URL_translateWebsite = 'https://translate.google.com/translate?&sl=auto&tl='+obj.languageCode+'&u='+info.pageUrl;
          switch (obj.openMethod_website) {
            case 'window':
              openByNewWindow(URL_translateWebsite, obj.specifySize, obj.sizeWidth, obj.sizeHeight);
              break;
            case 'tab':
              openByNewTab(URL_translateWebsite);
              break;
          }
          break;
      }
    });
});

// Add an action button to toolbar
browser.pageAction.onClicked.addListener( (tab) => {
  browser.storage.local.get(['openMethod_website', 'specifySize', 'sizeWidth', 'sizeHeight', 'languageCode'])
    .then( (obj) => {
      if ( (obj.openMethod_website == null) || (obj.languageCode == null) ) {
        obj.openMethod_website = 'tab';
        obj.languageCode       = 'en';
        notificationNotSetup();
      }
      const barURL = 'https://translate.google.com/translate?hl='+obj.languageCode+'&sl=auto&tl='
                   +obj.languageCode+'&u='+tab.url;
      switch (obj.openMethod_website) {
        case 'window':
          openByNewWindow(barURL, obj.specifySize, obj.sizeWidth, obj.sizeHeight);
          break;
        case 'tab':
          openByNewTab(barURL);
          break;
      }
    });
});
