"use strict";
// Add event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const convertButton = document.getElementById('convert-button');
    const copyButton = document.getElementById('copy-button');
    convertButton.addEventListener('click', convertIframe);
    copyButton.addEventListener('click', copyToClipboard);
});
function convertIframe() {
    const inputEl = document.getElementById('input');
    const outputEl = document.getElementById('output');
    const outputContainer = document.getElementById('output-container');
    const copiedEl = document.getElementById('copied');
    if (!inputEl || !outputEl || !outputContainer || !copiedEl)
        return;
    const input = inputEl.value.trim();
    if (!input) {
        outputEl.textContent = 'Please paste an iframe embed code first.';
        outputContainer.style.display = 'block';
        return;
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, 'text/html');
    const iframe = doc.querySelector('iframe');
    if (!iframe) {
        outputEl.textContent = 'No valid iframe found. Please check your input and try again.';
        outputContainer.style.display = 'block';
        return;
    }
    const src = iframe.getAttribute('src');
    const title = iframe.getAttribute('title');
    if (!src || !title) {
        outputEl.textContent = 'The iframe is missing required src or title attributes. Please check your input and try again.';
        outputContainer.style.display = 'block';
        return;
    }
    // Define the required parameters as an object for easier manipulation
    const requiredParamsObj = {
        'skipCover': 'false',
        'defaultListView': 'false',
        'skipBranding': 'false',
        'makeViewOnly': 'false',
        'hideAuthorAndDetails': 'true'
    };
    // Start with the original source URL
    let newSrc = src;
    const urlObj = new URL(src);
    let paramsToAdd = [];
    // Check each required parameter and only add it if it doesn't exist
    for (const [param, value] of Object.entries(requiredParamsObj)) {
        if (!urlObj.searchParams.has(param)) {
            paramsToAdd.push(`${param}=${value}`);
        }
    }
    // Add any missing parameters to the URL
    if (paramsToAdd.length > 0) {
        const separator = urlObj.search ? '&' : '?';
        newSrc = src + separator + paramsToAdd.join('&');
    }
    const output = `<DocVideo src="${newSrc}" title="${title}" />`;
    outputEl.textContent = output;
    outputContainer.style.display = 'block';
    copiedEl.classList.remove('visible');
}
function copyToClipboard() {
    var _a;
    const outputEl = document.getElementById('output');
    const copiedEl = document.getElementById('copied');
    if (!outputEl || !copiedEl)
        return;
    const text = (_a = outputEl.textContent) !== null && _a !== void 0 ? _a : '';
    navigator.clipboard.writeText(text).then(() => {
        copiedEl.classList.add('visible');
        setTimeout(() => {
            copiedEl.classList.remove('visible');
        }, 2000);
    });
}
