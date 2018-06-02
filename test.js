let out = `Conditional testing.

`; if ((root.fields.list instanceof Array && root.fields.list.filter((i) => i.primary && i.internal).length > 0) || (!(root.fields.list instanceof Array) && ((i) => i.primary && i.internal)(root.fields.list)) { out += `
This model has a primary internal field
`; } out += `

`; if ((root.fields.list instanceof Array && root.fields.list.filter((i) => !(i.isPrivate || i.nullable)).length > 0) || (!(root.fields.list instanceof Array) && ((i) => !(i.isPrivate || i.nullable))(root.fields.list)) { out += `
This model has no private or nullable fields
`; } out += `

`; if ((root.fields.list instanceof Array && root.fields.list.filter((i) => i.searchable && i.sortable).length > 1) || (!(root.fields.list instanceof Array) && ((i) => i.searchable && i.sortable)(root.fields.list)) { out += `
This model has at least one searchable and sortable field
`; } out += `

`; if ((root.fields.list instanceof Array && root.fields.list.filter((i) => i.unique).length > 0) || (!(root.fields.list instanceof Array) && ((i) => i.unique)(root.fields.list)) { out += `
This model has a unique field
`; } out += `

`; if ((root.fields.list instanceof Array && root.fields.list.filter((i) => i).length > 0) || (!(root.fields.list instanceof Array) && ((i) => i)(root.fields.list)) { out += `
This model has some fields
`; } out += `

End`; module.exports = out;