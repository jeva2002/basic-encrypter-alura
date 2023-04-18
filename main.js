const keys = [
  ['a', 'ai'],
  ['e', 'enter'],
  ['i', 'imes'],
  ['o', 'ober'],
  ['u', 'ufat'],
];

let currentMessage = '';
let firstTime = true;

const encrypt = (text) => {
  const onlyLowerCaseRegex = /^[a-z0-9 ]+$/;
  if (onlyLowerCaseRegex.test(text)) {
    return text
      .split('')
      .map((char) => {
        let indexKey = keys.findIndex((key) => key[0] === char);
        if (indexKey >= 0) return keys[indexKey][1];
        return char;
      })
      .join('');
  } else {
    throw new Error('Solo letras minúsculas y sin acentos');
  }
};

const decrypt = (encryptedText) => {
  let decryptedText = encryptedText;
  keys.forEach((key, i) => {
    decryptedText = decryptedText.split(key[1]).join(key[0]);
  });
  return decryptedText;
};

const input = document.querySelector('.main-input');
const aside = document.querySelector('.aside');
const noMessage = document.getElementById('no-messages-container');

const createCurrentMessageNode = () => {
  const newDiv = document.createElement('div');
  newDiv.className = 'current-message-container';
  const paragraph = document.createElement('p');
  paragraph.className = 'current-message';
  paragraph.innerText = currentMessage;
  const copyButton = document.createElement('button');
  copyButton.className = 'copy';
  copyButton.innerText = 'Copiar';
  newDiv.appendChild(paragraph);
  newDiv.appendChild(copyButton);

  copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(currentMessage);
  })

  return newDiv;
};

const encryptButton = document
  .querySelector('.encrypt')
  .addEventListener('click', () => {
    currentMessage = encrypt(input.value);
    if (firstTime) {
      aside.removeChild(noMessage);
      aside.appendChild(createCurrentMessageNode());
      firstTime = false;
    } else {
      aside.replaceChildren(createCurrentMessageNode());
    }
  });

const decryptButton = document
  .querySelector('.decrypt')
  .addEventListener('click', () => {
    if (!!currentMessage) {
      currentMessage = decrypt(input.value);
      aside.replaceChildren(createCurrentMessageNode());
    }
  });
