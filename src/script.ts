// Add event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const convertButton = document.getElementById('convert-button') as HTMLButtonElement;
  const copyButton = document.getElementById('copy-button') as HTMLButtonElement;
  
  convertButton.addEventListener('click', convertIframe);
  copyButton.addEventListener('click', copyToClipboard);
});

function convertIframe(): void {
  const inputEl = document.getElementById('input') as HTMLTextAreaElement | null;
  const outputEl = document.getElementById('output') as HTMLPreElement | null;
  const outputContainer = document.getElementById('output-container') as HTMLDivElement | null;
  const copiedEl = document.getElementById('copied') as HTMLSpanElement | null;

  if (!inputEl || !outputEl || !outputContainer || !copiedEl) return;

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

  const output = `<DocVideo src="${src}" title="${title}" />`;
  outputEl.textContent = output;
  outputContainer.style.display = 'block';
  copiedEl.classList.remove('visible');
}

function copyToClipboard(): void {
  const outputEl = document.getElementById('output') as HTMLPreElement | null;
  const copiedEl = document.getElementById('copied') as HTMLSpanElement | null;

  if (!outputEl || !copiedEl) return;

  const text = outputEl.textContent ?? '';

  navigator.clipboard.writeText(text).then(() => {
    copiedEl.classList.add('visible');
    setTimeout(() => {
      copiedEl.classList.remove('visible');
    }, 2000);
  });
}