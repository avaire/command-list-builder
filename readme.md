Command List Builder
====================

Command List Builder is a small Node application that is used to convert [Avas](https://github.com/avaire/avaire) JSON command map to the [commands.md](https://github.com/avaire/docs/blob/master/commands.md) and [command-list.md](https://github.com/avaire/docs/blob/master/command-list.md) markdown pages, the application uses [Mustache](https://mustache.github.io/) to build the markdown files from the templates.

# Running Command List Builder

> Command List Builder utilizes [Node](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/) for managing the dependencies, so make sure both are installed before attempting to run the application.

The first step is to get the JSON command map, this can be done by running Ava with your user ID in the bot access field which will allow you to run System commands within Ava, then running the `;jsoncmdmap` command to make Ava build the JSON file, the file will be generated in the same location the jar file is placed.

> For more information about self-hosting Ava, check out the self-hosting guides on [avairebot.com](https://avairebot.com/docs/master/linux-guide), or join the [#self-hosting](https://avairebot.com/support) Discord channel on the support server for questions.

Once the file has been created you can move it to the root of the Command List Builder project, next we'll need to make sure that all of our dependencies are installed, this can be done by using [Yarn](https://yarnpkg.com/en/).

    yarn

And we're now ready to run the application!

    yarn start

This should load the templates from the `templates` directory to produce the markdown files and output them in the `output` directory.

# License

Command List Builder is open-sourced software licensed under the [MIT License](https://opensource.org/licenses/MIT).
