function password (string) {
    let message = '';
    let status = false;

    if (string.length < 8) {
        message = 'Minimum of 8 characters. '
        status = true;
    }

    if (!string.search(/\s/)) {
        massge.concat('Without whitespases. ')
        status = true;
    }

    const atLeastCheckResult = '';

    if (!(/[A-Z]/).test(string)) {
        atLeastCheckResult.concat(' capital letter,')
        status = true;
    }
    if (!(/\d/).test(string)) {
        atLeastCheckResult.concat(' digit,')
        status = true;
    }
    if (!(/\!\@\#\№\$\%\^\&\?\*\(\)\-\_\+\=\{\}\[\]\;\:\"\'\/\\\|\,\.\<\>/).test(string)) {
        atLeastCheckResult.concat(' special symbol.')
        status = true;
    }

    if (atLeastCheckResult.length > 0) {
        message.concat('Must contain at least one ').concat(atLeastCheckResult)
    }

    if (message.trim().endsWith(',')) message.slice(0, -1).concat('.')

    return { hasError: status, textError: status ? message : '' }
}

export const validators = { password };