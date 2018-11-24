const Mustache = require('mustache');
const fs = require('fs');

const commands = JSON.parse(
    fs.readFileSync('commandMap.json', { encoding: 'utf8' })
);

const statistics = {
    categories: 0,
    commands: 0
};

for (let categoryName in commands) {
    statistics.categories++;
    for (let commandName in commands[categoryName].commands) {
        statistics.commands++;
    }
}

fs.readdir('./templates', (err, files) => {
    for (let file of files) {
        console.log(`Formatting ${file}`);
        
        fs.writeFile(
            `./output/${file}`, 
            Mustache.render(
                fs.readFileSync(`./templates/${file}`, { encoding: 'utf8' }), {
                    statistics, commands
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
