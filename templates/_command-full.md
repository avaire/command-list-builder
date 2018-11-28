<a name="{{commandName}}"></a>
### {{{command.name}}}

{{{command.description}}}

{{#command.middlewares}}
{{{command.middlewares}}}
{{/command.middlewares}}

{{#commandRelationships}}
 - [{{{name}}}](#{{{command}}})
{{/commandRelationships}}

{{#commandUsage}}
#### Usage

{{{commandUsage}}}
{{/commandUsage}}

{{#commandExample}}
#### Example

{{{commandExample}}}
{{/commandExample}}
