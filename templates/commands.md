# Commands

- [Help Command](#help)
- [Administration](#administration)
- [Fun](#fun)
- [Music](#music)
- [Search](#search)
- [Utility](#utility)

<a name="introduction"></a>
## Introduction

This is the command reference for AvaIre. You can find more elaboration on each of the commands currently implemented here.

If you need for any further info, you can use the [help command](#help) for the bot to get info about command throttling limits, permission requirements and so forth. Got any questions? Check out #support in [AvaIre Central](#).

All commands uses the exclamation mark(!) as their prefix by default, you can change the prefix for all commands categories, or each category individually using the [!prefix](#ChangePrefixCommand) command.

<a name="HelpCommand"></a>
## Help Command

Displays a list of available command categories, commands in a given category, or information about a specific command.

#### Listing all categories

Using the help command with no additional arguments will display a list of all the categories.

    !help

#### Listing commands in category

Listing all commands in a category can be done by using the help command followed by the name of the category.

    !help <category>

> {tip} It is not required to type out the full name of the category, just typing a few characters will still list the commands in the category that starts with the given characters.<br>For example listing all the commands in the `Administration` category can be done by doing `!help a` for short.

#### Listing command information

Displaying a given command's information can be done by using `help` followed by the command you want to get information about.

    !help <command>

> {tip} Command aliases can be used as well, for example `!help sid` will display help for the `!serverid` command.

<a name="administration"></a>
## Administration

{{#commands.administration.full}}
{{{command}}}
{{/commands.administration.full}}

<a name="administration"></a>
## Administration

{{#commands.administration.full}}
{{{command}}}
{{/commands.administration.full}}

<a name="fun"></a>
## Fun

{{#commands.fun.full}}
{{{command}}}
{{/commands.fun.full}}

<a name="music"></a>
## Music

{{#commands.music.full}}
{{{command}}}
{{/commands.music.full}}

<a name="search"></a>
## Search

{{#commands.search.full}}
{{{command}}}
{{/commands.search.full}}

<a name="utility"></a>
## Utility

{{#commands.utility.full}}
{{{command}}}
{{/commands.utility.full}}
