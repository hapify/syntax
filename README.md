# Hapify Syntax

## Pre-requisites

Before reading this, you should read the documentation about models and fields structure:
https://bitbucket.org/tractrs/hapify-web-app/src/master/README.md

## Wrappers

### Operators

Open: `<<`
Close: `>>`

Usually used for binary operations. Should be escapable:
Ignore `\<\<` (and maybe `\>\>`) and replace it by `<<`

### Raw inputs

Open: `<<<`
Close: `>>>`

Those tags are also escapable.
Between those tags you can write pure Javascript code to inject new variables and new functions to the template scope.
The output variable is named `out`.
Therefore to concatenate a string to the template output, you have to write: `<<< out += 'more content here'; >>>`.

## Syntax

```
<<@ F se*so/lb f>>
<<@>>
```

Explanations:
- `F` is the variable
- `@` is the operation
- `se*so/lb` is the condition (optional)
- `f` is the assignment variable

### Variable naming

We use lower case a dynamically defined variable.
We use upper case a pre-defined variable.

To refer to the root variable, we use `M` (model or models).
This will refer to the model in a single model template and to the models list in a multiple model template.
In the template's scope, this root variable is named `root`.
Therefore, `M` is just a shortcut to `root`.

By default, in a case of a single model template:
- `F` refers to the fields list: `root.fields.list`
- `D` refers to the models list: `root.dependencies.list`
- `R` refers to the models list: `root.referencedIn`
- `P` refers to the models primary field: `root.fileds.primary`

### Interpolation

To echo the name of a variable (model or field), we omit the operator.

Example for the root model name as upper camel:

```
<<M AA>>
```

Example for field name as hyphen:

```
<<f a-a>>
```

The values for the name are:

- `aA` for `names.lowerCamel`
- `AA` for `names.upperCamel`
- `a` for `names.wordsLower`
- `A` for `names.wordsUpper`
- `a-a` for `names.hyphen`
- `a_a` for `names.underscore`
- `aa` for `names.oneWord`
- `R` for `names.raw`

## Conditional operator

This operator can be used over an object or an array of object.
If used over an array it will test the length of the array filtered by the condition.

### Operators

We use algebra operator to represent logical operations.

- `*` is an intersection: `se*lb` => `se ∩ lb` => `se && lb`.
- `+` is an union: `se+lb` => `se ∪ lb` => `se || se`.
- `/` is an intersection with the complementary: `se/lb` => `se ∩ !lb` => `se && !lb`.
- `-` is an union with the complementary: `se-lb` => `se ∪ !lb` => `se || !lb`.

### Structure

A complete conditional writing will look like this:

```
<<?4 F ip>>
    This model has at least 4 private fields
<<??2 F lb+tB>>
    This model has at least 2 label or boolean fields
<<?? P tS>>
    The primary key of the model is a string
<<??>>
    This model has no fields
<<?>>
```

This code is equivalent to 

```javascript
if (root.fields.list.filter(f => f.isPrivate).length >= 4) {
    out += '    This model has at least 4 private fields';
}
else if (root.fields.list.filter(f => f.label || f.type === 'boolean').length >= 2) {
    out += '    This model has at least 2 label or boolean fields';
}
else if (root.fields.primary.type === 'string') {
    out += '    The primary key of the model is a string';
}
else {
     out += '    This model has no fields';
}
```

#### Analysis of `<<?4 F ip>>`

This is the if statement: `if (condition) {`.

- `<<?` is the opener.
- `4` is the minimum length of the filtered array. This value is optional and only usable if the variable is an array. If omitted, we assume the required length is 1.
- `F` is the variable to test. It can me and array or an object.
- `ip` is the condition to test the object or the items of an array.
- `>>` closes the tag

#### Analysis of `<<??2 F lb+tB>>`

This is an else if statement: `} else if (condition) {`.

It follows the same rules as an if statement, unless its opener is `<<??`.

#### Analysis of `<<??>>`

This is an else statement: `} else {`.

#### Analysis of `<<?>>`

This is the closer: `}`.

### Examples

#### Example with conditions:

This tests if the model has some searchable and sortable but not private fields

```
<<? F se*so/ip>>
    ...
<<?>>
```

Is equivalent to
```javascript
if (root.fields.list.filter(f => f.searchable && f.sortable && !f.isPrivate).length > 0) {
    out += '...';
}
```

#### Example without condition:
```
<<? F>>
    .....
<<?>>
```

Is equivalent to
```javascript
if (root.fields.list.length > 0) {
    out += '.....';
}
```

#### Example with more than 2 elements

Example to test if the model has at least two label fields

```
<<?2 F lb>>
    ...
<<?>>
```

Is equivalent to
```javascript
if (root.fields.list.filter((f) => f.label).length >= 2) {
    out += '.....';
}
```

### Loop operator

The loop operation (foreach) is `@`. It applies only to an array.

#### Usage with fields

Example:
```
<<@ F se*so/lb f>>
    .....
<<@>>
```

This is equivalent to
```javascript
for(let f of model.fields.list.filter((f) => f.searchable && f.sortable && !f.label)) {
    out += '.....';
}
```

or in short dot syntax:
```
{{~it.m.f.f((f) => f.searchable && f.sortable && !f.label))}}
    .....
{{~}}
```

##### Without conditions

Example:
```
<<@ F f>>
    .....
<<@>>
```

This will loop over all fields.

#### Usage with models

In a multiple models template, to loop over all models (root variable), the syntax will be:

```
<<@ M m>>
    .....
<<@>>
```

`m` is the assigned variable

For instance, no conditions are allowed on models. To do so, use a conditional operator.

##### Sub-models

This will loop over dependencies

```
<<@ D m>>
    .....
<<@>>
```

## Fields operators & filters

### Filter

## Examples

### Raw inputs

```
<<< const l = model.fields.length; >>>
```

```
<<<
function fieldName(f) {
    return f.names.underscore;
}
>>>
```

