// ==UserScript==
// @name         Gmail Insert HTML
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Adds an Insert HTML button to every Gmail compose window.
// @author       Dwait Pandhi
// @match        https://mail.google.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
  
    function addInsertButton(composeBox) {
      if (composeBox.querySelector('.insert-html-btn')) return;
  
      const toolbar = composeBox.querySelector('[aria-label="More options"]')?.parentElement;
      if (!toolbar) return;
  
      const button = document.createElement('button');
      button.className = 'insert-html-btn';
      button.innerText = 'Insert HTML';
      button.style.cssText = `
        margin-left: 8px;
        padding: 4px 10px;
        font-size: 13px;
        background: #673ab7;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      `;
  
      button.onclick = () => {
        const html = prompt('Paste your HTML code:');
        if (!html) return;
  
        const editableDiv = composeBox.querySelector('[role="textbox"][contenteditable="true"]');
        if (!editableDiv) {
          alert('Could not find message box.');
          return;
        }
  
        const temp = document.createElement('div');
        temp.innerHTML = html;
        editableDiv.appendChild(temp);
        editableDiv.focus();
      };
  
      toolbar.appendChild(button);
    }
  
    function scanForComposeWindows() {
      const composeWindows = document.querySelectorAll('div[role="dialog"]');
      composeWindows.forEach(compose => addInsertButton(compose));
    }
  
    const observer = new MutationObserver(scanForComposeWindows);
    observer.observe(document.body, { childList: true, subtree: true });
  
    // Run once at start
    scanForComposeWindows();
  })();