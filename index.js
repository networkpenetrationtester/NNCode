let CIPHER_TO_ENGLISH_DICTIONARY = {};
let ENGLISH_TO_CIPHER_DICTIONARY = {};
let INDEX_MAPPINGS = {};
const ENGLISH_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function SanitizeCipher(cipher) {
    return cipher
        ?.toString()
        ?.toUpperCase() // consistent with dictionary
        ?.match(/[a-zA-Z0-9]/g) // only match alphanumerical values (no underscores)
        ?.join('') // turn it back into a string
        ?.substring(0, 26) // clip long ciphers to 26
        ?.padEnd(26, '#')  // pad short ciphers with # to 26
        ?? ''; // if the cipher is unusable, prevent undefined & display '<blank>'
}

function ResetDictionaries() {
    CIPHER_TO_ENGLISH_DICTIONARY = {};
    ENGLISH_TO_CIPHER_DICTIONARY = {};
    INDEX_MAPPINGS = {};
}

function CreateDictionaries(cipher) {
    ResetDictionaries();

    let CIPHERTEXT = SanitizeCipher(cipher);

    for (const english_letter of ENGLISH_ALPHABET) { // populate the default english dictionary
        ENGLISH_TO_CIPHER_DICTIONARY[english_letter] = null;
    }

    for (const cipher_letter of CIPHERTEXT) { // populate the default cipher dictionary
        CIPHER_TO_ENGLISH_DICTIONARY[cipher_letter] = null;
    }

    // let log = [];

    for (let i = 0; i < 26; i++) {
        const english_letter = ENGLISH_ALPHABET[i];
        const cipher_letter = CIPHERTEXT[i];

        if (INDEX_MAPPINGS[cipher_letter] == null) { // first occurance of the letter in the cipher.
            ENGLISH_TO_CIPHER_DICTIONARY[english_letter] = cipher_letter;
            CIPHER_TO_ENGLISH_DICTIONARY[cipher_letter] = english_letter;
            INDEX_MAPPINGS[cipher_letter] = i;
        } else { // this letter has appeared in the ciphertext before.
            const recursive_assignment = `{${INDEX_MAPPINGS[cipher_letter] + 1}}`
            ENGLISH_TO_CIPHER_DICTIONARY[english_letter] = recursive_assignment;
            CIPHER_TO_ENGLISH_DICTIONARY[recursive_assignment] = english_letter;
            INDEX_MAPPINGS[cipher_letter] = i;
        }

        // log.push(
        //     [
        //         CIPHERTEXT[i],
        //         i + 1,
        //         `${ENGLISH_ALPHABET[i]} -> ${ENGLISH_TO_CIPHER_DICTIONARY[ENGLISH_ALPHABET[i]]}`
        //     ].join(', ')
        // );
    }

    // log = log.join('\n');
    // console.log(log);
    // console.log(ENGLISH_TO_CIPHER_DICTIONARY);
    // console.log(CIPHER_TO_ENGLISH_DICTIONARY);

    TestDictionaries();
}

function TestDictionaries() {
    for (const e2c_key in ENGLISH_TO_CIPHER_DICTIONARY) {
        // e2c_key is the letter of the english alphabet
        const e2c_value = ENGLISH_TO_CIPHER_DICTIONARY[e2c_key];
        // e2c_value is the substitution for the english letter
        const c2e_value = CIPHER_TO_ENGLISH_DICTIONARY[e2c_value];
        // c2e_value is the letter of the english alphabet, and if the encoding was successful (aka the alphabets are inverses of each other), should be equal to e2c_key

        if (c2e_value !== e2c_key) {
            alert('Possible issue with cipher.');
        }
    }
}

function NNCode(message, keep_whitespace = false) {
    let ciphertext = '';
    message = message.toString().toUpperCase();

    for (const char of message) {
        ciphertext += Object.keys(ENGLISH_TO_CIPHER_DICTIONARY).includes(char) ? ENGLISH_TO_CIPHER_DICTIONARY[char] : char;
    }

    if (!keep_whitespace) ciphertext = ciphertext.replace(/\s/g, '');  // make the boundaries between words less obvious lmao

    return ciphertext;
}

function DDCode(ciphertext) {
    let message = ''
        , iterator = ciphertext.toString().toUpperCase().matchAll(/(\w|\{[0-9]+\})/g) // only match items that we can decode.
        , previous_match = {};

    for (let result = iterator.next(), i = 0; !result.done; result = iterator.next(), i++) {
        let current_match = result.value
            , cipher_char = current_match[0]
            , english_char = Object.keys(CIPHER_TO_ENGLISH_DICTIONARY).includes(cipher_char) ? CIPHER_TO_ENGLISH_DICTIONARY[cipher_char] : cipher_char;

        if (i !== 0) {
            let l = previous_match.index + previous_match[0].length;
            let r = current_match.index;

            if (l != r) {
                message += ciphertext.substring(l, r); // stuff that doesn't get decoded, i.e. whitespace/special chars
            }
        }

        message += english_char;
        previous_match = current_match;
    }

    return message;
}