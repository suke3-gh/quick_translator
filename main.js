
// ID
const ID01    = 'selectText';
const title01 = browser.i18n.getMessage('menuTextTitle01');

const ID02    = 'clickPage';
const title02 = browser.i18n.getMessage('menuTextTitle02');

// menu
const menu01 = browser.menus.create({
  id: ID01, title: title01, contexts: ['selection']
});

const menu02 = browser.menus.create({
  id: ID02, title: title02, contexts: ['page']
});

// behavior
function openByNewWindow(URL, specifySize, sizeWidth, sizeHeight) {
  if (specifySize) {
    browser.windows.create({ url: URL, width: sizeWidth, height: sizeHeight });
  } else {
    browser.windows.create({ url: URL });
  }
}

function openByNewTab(URL) {
  browser.tabs.create({ url: URL });
}

function notificationNotSet() {
  browser.notifications.create('notificationNS', {
    'type'   : 'basic',
    'title'  : 'Notification: \"Quick translate from context menu\"',
    'message': browser.i18n.getMessage('notificationTextNotSet')
  });
  setTimeout(function(){ browser.notifications.clear('notificationNS'); }, 6000);
}

browser.menus.onClicked.addListener((info) => {
  function menuBehavior(obj) {
    switch (info.menuItemId) {
      // transrate a text
      case ID01:
        if ( (obj.openMethod_text == null) || (obj.languageCode == null) ) {
          notificationNotSet();
        }
        const URL01 = 'https://translate.google.com/#auto/'+obj.languageCode+'/'+info.selectionText
                     .replace(/\%/g, '%25').replace(/\//g, '%2F').replace(/\|/g, '%7C');
        switch (obj.openMethod_text) {
          case 'window':
            openByNewWindow(URL01, obj.specifySize, obj.sizeWidth, obj.sizeHeight);
            break;
          case 'tab':
            openByNewTab(URL01);
            break;
        }
        break;
      // transrate a web site
      case ID02:
        if ( (obj.openMethod_website == null) || (obj.languageCode == null) ) {
          notificationNotSet();
        }
        const URL02 = 'https://translate.google.com/translate?hl='+obj.languageCode+'&sl=auto&tl='
                     +obj.languageCode+'&u='+info.pageUrl;
        switch (obj.openMethod_website) {
          case 'window':
            openByNewWindow(URL02, obj.specifySize, obj.sizeWidth, obj.sizeHeight);
            break;
          case 'tab':
            openByNewTab(URL02);
            break;
        }
        break;
    }
  }

  browser.storage.local.get(['openMethod_text', 'openMethod_website', 'specifySize', 'sizeWidth', 'sizeHeight', 'languageCode'])
    .then(menuBehavior);
});

browser.pageAction.onClicked.addListener((tab) => {
  function addressbarBehavior(obj) {
    if ( (obj.openMethod_website == null) || (obj.languageCode == null) ) {
      notificationNotSet();
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
  }

  browser.storage.local.get(['openMethod_website', 'specifySize', 'sizeWidth', 'sizeHeight', 'languageCode'])
    .then(addressbarBehavior);
});
