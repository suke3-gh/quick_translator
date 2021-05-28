
/**
 * addon version text
 */
document.getElementById( 'divAddonVersion' ).textContent = 'Add-on version: '+ browser.runtime.getManifest().version;

/**
 * license text
 */
 document.getElementById( 'divLicenseText' ).textContent = 'License: Apache License Version 2.0, CC BY 4.0';
