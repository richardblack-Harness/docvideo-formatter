"use strict";
// Add event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const convertButton = document.querySelector('button');
    const copyButton = document.getElementById('copy-button');
    convertButton.addEventListener('click', convertIframe);
    copyButton.addEventListener('click', copyToClipboard);
});
function convertIframe() {
    const inputEl = document.getElementById('input');
    const outputEl = document.getElementById('output');
    const copiedEl = document.getElementById('copied');
    if (!inputEl || !outputEl || !copiedEl)
        return;
    const input = inputEl.value;
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, 'text/html');
    const iframe = doc.querySelector('iframe');
    if (!iframe) {
        outputEl.textContent = 'No iframe found.';
        return;
    }
    const src = iframe.getAttribute('src');
    const title = iframe.getAttribute('title');
    if (!src || !title) {
        outputEl.textContent = 'Missing src or title attribute.';
        return;
    }
    const output = `<DocVideo src="${src}" title="${title}" />`;
    outputEl.textContent = output;
    copiedEl.style.display = 'none';
}
function copyToClipboard() {
    var _a;
    const outputEl = document.getElementById('output');
    const copiedEl = document.getElementById('copied');
    if (!outputEl || !copiedEl)
        return;
    const text = (_a = outputEl.textContent) !== null && _a !== void 0 ? _a : '';
    navigator.clipboard.writeText(text).then(() => {
        copiedEl.style.display = 'inline';
        setTimeout(() => {
            copiedEl.style.display = 'none';
        }, 2000);
    });
}
