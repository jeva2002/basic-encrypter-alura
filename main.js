const keys = [
  ['a', 'ai'],
  ['e', 'enter'],
  ['i', 'imes'],
  ['o', 'ober'],
  ['u', 'ufat'],
];

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



//regular expression to deny special characters
