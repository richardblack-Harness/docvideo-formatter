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
    // Set default message when app starts
    if (!outputEl.textContent) {
        outputEl.textContent = 'Paste an iframe embed code and click Convert to generate a DocVideo component.';
    }
    const input = inputEl.value.trim();
    if (!input) {
        outputEl.textContent = 'Please paste an iframe embed code first.';
        return;
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, 'text/html');
    const iframe = doc.querySelector('iframe');
    if (!iframe) {
        outputEl.textContent = 'No valid iframe found. Please check your input and try again.';
        return;
    }
    const src = iframe.getAttribute('src');
    const title = iframe.getAttribute('title');
    if (!src || !title) {
        outputEl.textContent = 'The iframe is missing required src or title attributes. Please check your input and try again.';
        return;
    }
    // Check if "Hide Tango details" checkbox is checked
    const hideDetailsCheckbox = document.getElementById('hide-details');
    const hideDetails = hideDetailsCheckbox ? hideDetailsCheckbox.checked : true;
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
    if (hideDetails) {
        // Add the Tango parameters to hide details
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
    }
    else {
        // Remove any Tango parameters that match our required ones
        // Create a new URL to manipulate the parameters
        const cleanUrlObj = new URL(src);
        // Remove each of our defined parameters if they exist
        for (const param of Object.keys(requiredParamsObj)) {
            if (cleanUrlObj.searchParams.has(param)) {
                cleanUrlObj.searchParams.delete(param);
            }
        }
        // Update the source with cleaned parameters
        newSrc = cleanUrlObj.toString();
    }
    const output = `<DocVideo src="${newSrc}" title="${title}" />`;
    outputEl.textContent = output;
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
