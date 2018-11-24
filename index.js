const Mustache = require('mustache');
const fs = require('fs');

const commandMap = JSON.parse(
    fs.readFileSync('commandMap.json', { encoding: 'utf8' })
);

const statistics = {
    categories: 0,
    commands: 0
};

// const templates = {
    // commandFull: fs.readFileSync(`./templates/_command-full.md`, { encoding: 'utf8' })
// }

const commands = {};
const categories = [];
for (let categoryName in commandMap) {
    statistics.categories++;

    let categoryCommandsShort = []; 
    let categoryPrefix = commandMap[categoryName].prefix;
    for (let commandName in commandMap[categoryName].commands) {
        statistics.commands++;

        let command = commandMap[categoryName].commands[commandName];
        command.trigger = categoryPrefix + command.triggers[0];
        command.shortDescription = command.description.split('\n')[0];

        categoryCommandsShort.push({ command });
    }

    commands[categoryName.toLowerCase()] = {
        short: categoryCommandsShort,
        full: null,
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
