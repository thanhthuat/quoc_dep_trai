/********************************
 * @providesModule EncryptUtils *
 * @created_by Kds              *
 ********************************/

import CryptoJS from 'crypto-js';

const KEY_SIZE = 128 / 32;
const INTERACTION_COUNT = 10000;
const SALT = '88b1e2071884c5622dedb5ef5b2c6c9575d4109c2c2e3762';
const IV = 'F27D5C9927726BCEFE7510B1BDD3D137';

function generateKey(salt, passPhrase) {
    let key = CryptoJS.PBKDF2(
        passPhrase,
        CryptoJS.enc.Hex.parse(salt),
        { keySize: KEY_SIZE, iterations: INTERACTION_COUNT },
    );
    return key;
}

export function encryptAES(passPhrase, plainText) {
    let encrypted = CryptoJS.AES.encrypt(
        plainText,
        generateKey(SALT, passPhrase),
        { iv: CryptoJS.enc.Hex.parse(IV) },
    );
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

export function decryptAES(passPhrase, cipherText) {
    let cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(cipherText)
    });
    let decrypted = CryptoJS.AES.decrypt(
        cipherParams,
        generateKey(SALT, passPhrase),
        { iv: CryptoJS.enc.Hex.parse(IV) },
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
}