
// Addon title text
document.getElementById( 'spanAddonTitle' ).textContent = browser.runtime.getManifest().name;

// Addon version text
document.getElementById( 'divAddonVersion' ).textContent = 'Add-on version: '+ browser.runtime.getManifest().version;
