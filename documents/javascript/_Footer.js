
'use strict';

/**
 * module file: _script_footer.js
 * description: 
 */

 import { Page } from './Page.js';

class Footer extends Page {

  constructor() {
    super();
  }
}

const FooterIns = new Footer;
FooterIns.textAssignment( 'divAddonVersion', 'Add-on version: '+ browser.runtime.getManifest().version );
FooterIns.textAssignment( 'divLicenseText', 'License: Apache License Version 2.0, CC BY 4.0' );