<a name="{{commandName}}"></a>
### {{{command.name}}}

{{{command.description}}}

{{#command.middlewares}}
- {{{middleware}}}
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
