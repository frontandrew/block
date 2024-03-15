function password (string) {
    const MIN_LENGTH = 8;

    let message = '';
    let status = false;

    if (string.length < MIN_LENGTH) {
        message = message.concat(`Minimum of ${MIN_LENGTH} characters. `);
        status = true;
    }

    if ((/\s/).test(string)) {
        message = message.concat('Without whitespases. ');
        status = true;
    }

    let atLeastCheckResult = '';

    if (!(/[A-Z]/).test(string)) {
        atLeastCheckResult = atLeastCheckResult.concat(' capital letter,');
        status = true;
    }
    if (!(/\d/).test(string)) {
        atLeastCheckResult = atLeastCheckResult.concat(' digit,');
        status = true;
    }
    if (!(/[\!\@\#\№\$\%\^\&\?\*\(\)\-\_\+\=\{\}\[\]\;\:\"\'\/\\\|\,\.\<\>]/).test(string)) {
        atLeastCheckResult = atLeastCheckResult.concat(' special symbol.');
        status = true;
    }

    if (atLeastCheckResult.length > 0) {
        message = message.concat('Must contain at least one more ', atLeastCheckResult);
    }
    
    if (message.trim().endsWith(',')) message = message.slice(0, -1).concat('.');
    
    console.warn({ atLeastCheckResult, message, status, })
    return { hasError: status, textError: status ? message : '' }
}

const username = login;
function login (string) {
    const MIN_LENGTH = 3;

    let message = '';
    let status = false;

    if (string.length < MIN_LENGTH) {
        message = message.concat(`Minimum of ${MIN_LENGTH} characters.`);
        status = true;
    }

    return { hasError: status, textError: status ? message : '' }
}

export const validators = { password, login, username };