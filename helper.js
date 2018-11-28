const permissions = require('./permissions.js');

/**
 * Formats the list so it will look nice when converted to markdown.
 * 
 * @param  {Array}  array
 * @param  {Object} command
 * @return {Boolean|String}
 */
module.exports.formatList = function (array, command) {
    if (array == null) {
        return false;
    }
    return array.map(line => {
        let parts = line.split('` -');
        if (parts.length <= 1) {
            return formatLine(line, command);
        }
        return formatLine(parts[0], command) + `\n\t- ${parts[1]}`;
    }).join('\n');
};

function formatLine(line, command) {
    return '\t' + line.replace(/\:command/, command.trigger)
        .replace(/`/g, '')
        .trim();
}

/**
 * Formats a list of middelwares by their group, parts,
 * and sub-parts if the middleware requires it.
 * 
 * @param  {Array}  middlewares
 * @return {String|null}
 */
module.exports.formatMiddleware = function (middlewares) {
    if (middlewares.length == 0) {
        return false;
    }

    let map = [];
    for (let middleware of middlewares) {
        let parts = middleware.split(':');
        let result = null;

        switch (parts.shift().toLowerCase()) {
            case 'require':
                result = formateRequire('and', ...parts[0].split(','));
                if (result != null) {
                    map.push(result);
                }
                break;

            case 'requireOne':
                result = formateRequire('or', ...parts[0].split(','));
                if (result != null) {
                    map.push(result);
                }
                break;
        }
    }

    return map;
}

function formateRequire(seperator, type, ...middlewares) {
    let multiple = middlewares.length > 1 ? 's' : '';

    middlewares = middlewares.filter(permission => {
        return permissions.hasOwnProperty(permission);
    }).map(permission => {
        return permissions[permission];
    }).join(`** ${seperator} **`);

    switch (type) {
        case 'user':
            return `The user needs **${middlewares}** permission${multiple} to run this command.`;

        case 'bot':
            return `The bot needs **${middlewares}** permission${multiple} to run this command.`;

        case 'all':
            return `The bot and the user needs the **${middlewares}** permission${multiple} to run this command.`;
    }
    return null;
}
