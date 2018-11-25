
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
            return format(line, command);
        }
        return format(parts[0], command) + `\n\t- ${parts[1]}`;
    }).join('\n');
};

function format(line, command) {
    return '\t' + line.replace(/\:command/, command.trigger)
        .replace(/`/g, '')
        .trim();
}
