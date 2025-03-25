// Add event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const convertButton = document.querySelector('button') as HTMLButtonElement;
  const copyButton = document.getElementById('copy-button') as HTMLButtonElement;
  
  convertButton.addEventListener('click', convertIframe);
  copyButton.addEventListener('click', copyToClipboard);
});

function convertIframe(): void {
    const inputEl = document.getElementById('input') as HTMLTextAreaElement | null;
    const outputEl = document.getElementById('output') as HTMLPreElement | null;
    const copiedEl = document.getElementById('copied') as HTMLSpanElement | null;
  
    if (!inputEl || !outputEl || !copiedEl) return;
  
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
  
function copyToClipboard(): void {
    const outputEl = document.getElementById('output') as HTMLPreElement | null;
    const copiedEl = document.getElementById('copied') as HTMLSpanElement | null;
  
    if (!outputEl || !copiedEl) return;
  
    const text = outputEl.textContent ?? '';
  
    navigator.clipboard.writeText(text).then(() => {
      copiedEl.style.display = 'inline';
      setTimeout(() => {
        copiedEl.style.display = 'none';
      }, 2000);
    });
}