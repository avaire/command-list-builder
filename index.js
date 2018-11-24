const Mustache = require('mustache');
const fs = require('fs');

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

const commands = {};
const categories = [];
for (let categoryName in commandMap) {
    statistics.categories++;

    let categoryCommandsFull = [];
    let categoryCommandsShort = [];
    let categoryPrefix = commandMap[categoryName].prefix;
    for (let commandName in commandMap[categoryName].commands) {
        statistics.commands++;

        let command = commandMap[categoryName].commands[commandName];
        command.trigger = categoryPrefix + command.triggers[0];
        command.shortDescription = command.description.split('\n')[0];

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

        categoryCommandsShort.push({ command });
        categoryCommandsFull.push({
            command: Mustache.render(templates.commandFull, {
                commandUsage: command.usage === null ? false : command.usage.map(line => {
                    return '\t' + line.replace(/\:command/, command.trigger).replace(/`/g, '');
                }).join('\n'),
                commandExample: command.example === null ? false : command.example.map(line => {
                    return '\t' + line.replace(/\:command/, command.trigger).replace(/`/g, '');
                }).join('\n'),
                commandRelationships,
                commandName,
                command,
            })
        });
    }

    commands[categoryName.toLowerCase()] = {
        short: categoryCommandsShort,
        full: categoryCommandsFull,
    };
}

fs.readdir('./templates', (err, files) => {
    for (let file of files) {
        if (file.substr(0, 1) == '_') {
            continue;
        }

        console.log(`Formatting ${file}`);
        
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
