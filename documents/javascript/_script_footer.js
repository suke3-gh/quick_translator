/**
 * module file: _script_footer.js
 * description: 
 */

/** functions */
function displayAddonVersion() {
  document.getElementById( 'divAddonVersion' ).textContent
    = 'Add-on version: '+ browser.runtime.getManifest().version;
}

function displayLicenseName() {
  document.getElementById( 'divLicenseText' ).textContent
    = 'License: Apache License Version 2.0, CC BY 4.0';
}

displayAddonVersion();
displayLicenseName();