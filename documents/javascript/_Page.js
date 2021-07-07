
/**
 * module file: _Page.js
 * description: 
 */

export class Page {

  constructor() {

  }

  textAssignment( id, text ) {
    document.getElementById( id ).textContent = text;
  }

  currentAspectRatio() {
    return window.innerWidth / window.innerHeight;
  }
}