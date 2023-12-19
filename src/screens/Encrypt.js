function encryptMessage(message) {
    let encryptedMessage = '';
    for (let i = 0; i < message.length; i++) {
      const charCode = message.charCodeAt(i);
      const encryptedChar = (charCode ^ 0xF).toString(16).padStart(2, '0');
      encryptedMessage += encryptedChar;
    }
    return encryptedMessage;
  }
  
  function decryptMessage(encryptedMessage) {
    let decryptedMessage = '';
    for (let i = 0; i < encryptedMessage.length; i += 2) {
      const encryptedChar = encryptedMessage.substr(i, 2);
      const charCode = parseInt(encryptedChar, 16) ^ 0xF;
      decryptedMessage += String.fromCharCode(charCode);
    }
    return decryptedMessage;
  }
  
  export { encryptMessage, decryptMessage };
  