const Mustache = require('mustache');
const fs = require('fs');
const {
    formatList,
    formatMiddleware,
} = require('./helper.js');

const commandMap = JSON.parse(
    fs.readFileSync('commandMap.json', { encoding: 'utf8' })
);

const statistics = {
    categories: 0,
    commands: 0
};

const templates = {
    commandFull: fs.readFileSync(`./templates/_command-full.md`, { encoding: 'utf8' })
}

// Sets up the the commands and categories variables, each variable will eventually hold
// all the formatted command or category data, the command map wil be sorted into
// "short" and "full" types for generating different types of command outputs.
const commands = {};
const categories = [];
for (let categoryName in commandMap) {
    statistics.categories++;

    // Creates the command "short" and "full" arrays that
    // should be stored in the commands map.
    let categoryCommandsFull = [];
    let categoryCommandsShort = [];

    // Stores the default prefix for the command category, this
    // will be used later when creating command triggers.
    let categoryPrefix = commandMap[categoryName].prefix;
    for (let commandName in commandMap[categoryName].commands) {
        statistics.commands++;

        // Creates the command variable used for the templates
        let command = commandMap[categoryName].commands[commandName];

        // If the command priority is hidden we'll skip it here as
        // well to prevent creating it in the markdown later.
        if (command.priority === 'HIDDEN') {
            continue;
        }

        // Sets up some generated data from the command, to
        // make generating the templates a bit easier.
        command.trigger = categoryPrefix + command.triggers[0];
        command.shortDescription = command.description.split('\n')[0];
        command.middlewares = formatMiddleware(command.middlewares);

        // Creates the command relationships, setting them to false by default, otherwise
        // storing them as a list of objects with the "name" and "command" keys.
        let commandRelationships = false;
        if (command.relationships != null) {
            commandRelationships = [];
            for (let commandRelationship of command.relationships) {
                let parts = commandRelationship.split('::');
                if (parts.length === 2) {
                    commandRelationships.push({
                        name: commandMap[parts[0]].commands[parts[1]].name,
                        command: parts[1]
                    });
                }
            }
        }

        // Stores the command in its short and full versions.
        categoryCommandsShort.push({ commandName, command });
        categoryCommandsFull.push({
            command: Mustache.render(templates.commandFull, {
                commandUsage: formatList(command.usage, command),
                commandExample: formatList(command.example, command),
                commandRelationships,
                commandName,
                command,
            })
        });
    }

    // Stors the "short" and "full" version of the commands under the current category.
    commands[categoryName.toLowerCase()] = {
        short: categoryCommandsShort,
        full: categoryCommandsFull,
    };
}

/**
 * Generates the output based of the created data and the templates.
 */
fs.readdir('./templates', (err, files) => {
    for (let file of files) {
        if (file.substr(0, 1) == '_') {
            continue;
        }

        console.log(`Formatting ${file}`);
        
        // Writes the generated ouput to a file with the same name as
        // the template, storing it in the "output" directory.
        fs.writeFile(
            `./output/${file}`, 
            Mustache.render(
                fs.readFileSync(`./templates/${file}`, { encoding: 'utf8' }), {
                    version: '{{version}}',
                    statistics,
                    commands,
                }
            ),
            err => {
                if (err) {
                    return console.error(`Failed to save ${file}`, err);
                }
            }
        );
    }
});
