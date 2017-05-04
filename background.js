/*
 * gmail-launcher
 * Copyright (C) 2017 Reggie Zhang <reggy.zhang@gmail.com>
 * Licensed under the terms of The GNU Lesser General Public License (LGPLv3):
 * http://www.opensource.org/licenses/lgpl-3.0.html
 * 
 */
function getGmailUrl() {
  return "https://mail.google.com";
}

function isGmailUrl(url) {
  // Return whether the URL starts with the Gmail prefix.
  return url.startsWith(getGmailUrl());
}
function gotoInbox() {
  console.log('Going to inbox...');
  chrome.tabs.getAllInWindow(undefined, function(tabs) {
    for (var i = 0, tab; tab = tabs[i]; i++) {
      if (tab.url && isGmailUrl(tab.url)) {
        console.log('Found Gmail tab: ' + tab.url);
        chrome.tabs.update(tab.id, {active: true, pinned: true});
        return;
      }
    }
    console.log('Could not find Gmail tab. Creating one...');
    chrome.tabs.create({url: getGmailUrl(), pinned: true});
  });
}

chrome.browserAction.onClicked.addListener(gotoInbox);