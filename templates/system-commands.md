{{#commands.system.short}}
    - [{{{command.name}}}](#{{{commandName}}})
{{/commands.system.short}}

---

<a name="system-commands"></a>
## System Commands

> System commands can only be seen and run by bot administrators, ie, people who have their user ID in the bot admins field in the config of the bot.

All system commands uses a semicolon(;) as their prefix by default.

| Command | Short Description |
| ------- |:----------------- |
{{#commands.system.short}}
| [{{{command.trigger}}}](#{{commandName}}) | {{{command.shortDescription}}} |
{{/commands.system.short}}

{{#commands.system.full}}
{{{command}}}
{{/commands.system.full}}
