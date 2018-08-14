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

## Syntax

```
<<@ F se*so/lb f>>
<<@>>
```

Explanations:
- `@` is the operation
- `F` is the variable
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
- `D` refers to the models list: `root.dependencies`
- `R` refers to the models list: `root.referencedIn`
- `P` refers to the models primary field: `root.fileds.primary`

## Conditional operator

This operator can be used over an object or an array of object.
If used over an array it will test the length of the array filtered by the condition.

As an array, it can be used over any object containing a method `filter` that receives a callback returning a boolean.
In the model structure, `root.dependencies` is an object that contains a `filter` method.
Then, this operator can test if a model has dependencies that has fields with specific conditions.

### Syntax

```
<<? F tE*ml>>
<<?>>
```

This will test if the model has at least one multiple entity.

### Operators

We use algebra operator to represent logical operations.

- `*` is an intersection: `se*lb` => `se ∩ lb` => `se && lb`.
- `+` is an union: `se+lb` => `se ∪ lb` => `se || se`.
- `/` is an intersection with the complementary: `se/lb` => `se ∩ !lb` => `se && !lb`.
- `-` is an union with the complementary: `se-lb` => `se ∪ !lb` => `se || !lb`.

If the condition starts with `-` or `/` it will be assimilated to `!`.
Therefore, `-se*so` and `/se*so` are equivalent to `!se*so`.

### Properties short-codes

For filtering an array or testing a field by its properties, we use short-codes.
To read more about fields and models properties, please refer to https://bitbucket.org/tractrs/hapify-web-app/src/master/README.md.

Here is the list of short-codes available for a field:

- `pr` for the boolean property `primary`
- `un` for the boolean property `unique`
- `lb` for the boolean property `label`
- `nu` for the boolean property `nullable`
- `ml` for the boolean property `multiple`
- `se` for the boolean property `searchable`
- `so` for the boolean property `sortable`
- `ip` for the boolean property `isPrivate`
- `in` for the boolean property `internal`
- `tS` to test if property `type` is `string`
    - `tSe` to test if properties `type` is `string` and `subtype` is `email`
    - `tSp` to test if properties `type` is `string` and `subtype` is `password`
    - `tSt` to test if properties `type` is `string` and `subtype` is `text`
- `tN` to test if property `type` is `number`
    - `tNi` to test if properties `type` is `number` and `subtype` is `integer`
    - `tNf` to test if properties `type` is `number` and `subtype` is `float`
    - `tNt` to test if properties `type` is `number` and `subtype` is `latitude`
    - `tNg` to test if properties `type` is `number` and `subtype` is `longitude`
- `tB` to test if property `type` is `boolean`
- `tD` to test if property `type` is `datetime`
    - `tDd` to test if properties `type` is `datetime` and `subtype` is `date`
    - `tDt` to test if properties `type` is `datetime` and `subtype` is `time`
- `tE` to test if property `type` is `entity`

And this is the list of short-codes available for a model:

- `pMPr` for the boolean property `mainlyPrivate`
- `pMIn` for the boolean property `mainlyInternal`
- `pGeo` for the boolean property `isGeolocated`

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
    Something else
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
     out += '    Something else';
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

## Iteration operator

The loop operation (foreach) is `@`. It applies only to an array.
It use the same conditions processing as the conditional operator.
Actually it inherits from the conditional operator.

### Syntax

```
<<@ F tE*ml f>>
<<@>>
```

The operators and the properties used in the condition are the same as for the conditional operator.

This will loop over all fields of type entity and multiple and assign the current field to the variable `f`.

### Structure

A complete conditional writing will look like this:

```
<<@4 F ip f>>
    Do something
<<@>>
```

This code is equivalent to 

```javascript
for(let f of root.fields.list.filter((f) => f.isPrivate).slice(0, 4)) {
    out += '    Do something';
}
```

#### Analysis of `<<@4 F ip>>`

This is the if statement: `for (condition + assigment) {`.

- `<<@` is the opener.
- `4` is the maximum length of the filtered array. This value is optional. If omitted, we do not slice the filtered array.
- `F` is the variable to filter and to loop. It must be iterable.
- `ip` is the condition to test the items of the array.
- `f` is the assignment variable. This variable will be available inside the loop's scope.
- `>>` closes the tag.

#### Analysis of `<<@>>`

This is the closer: `}`.

### Examples

#### Example with conditions over fields:

To loop over model's searchable entity fields

```
<<@ F se*tE f>>
    ...
<<@>>
```

Is equivalent to
```javascript
for(let f of root.fields.list.filter((f) => f.searchable && f.type === 'entity')) {
    out += '...';
}
```

#### Example with conditions over models:

In the context of a multi-models template, this loops over all models that are geo-located.

```
<<@ M pGeo m>>
    .....
<<@>>
```

Is equivalent to
```javascript
for(let m of root.filter((i) => i.properties.isGeolocated)) {
    out += '.....';
}
```

#### Example with 2 elements

This example will loop over the two first dependency models that have sortable fields.

```
<<@2 D so d>>
    ...
<<@>>
```

Is equivalent to
```javascript
for(let d of root.dependencies.filter((f) => f.sortable).slice(0, 2)) {
    out += '...';
}
```

#### Example without conditions

This will loop over all fields.

```
<<@ F f>>
    .....
<<@>>
```

Is equivalent to
```javascript
for(let f of root.fields.list) {
    out += '.....';
}
```

## Names interpolation

To print the name of a variable (model or field), we omit the operator.

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

## Raw inputs

This operator allows you to write pure Javascript.

### Syntax

Opener: `<<<`
Closer: `>>>`

Those tags are also escapable.
Between those tags you can write pure Javascript code to inject new variables and new functions to the template scope.

### Output

The output variable is named `out`.
Therefore to concatenate a string to the template output, you have to write: `<<< out += 'more content here'; >>>`.

### Examples

Insert a custom variable:
```
<<< const l = model.fields.length; >>>
```

Declare a processing function:
```
<<<
function fieldName(f) {
    return f.names.underscore.toUpperCase();
}
>>>
```

## Interpolation

This operator prints the content of a variable.
It is useful to print the result of a custom function or the value of a custom variable.

### Syntax

`<<= myFunction() >>` or `<<=customVariable>>`

This is equivalent to write `<<< out += myFunction(); >>>`.

### Error

Do not write this: `<<= JSON.stringify(root) >>`.
The `root` object has recessive properties. Therefore this command will enter an infinite loop.

## Comments

This operator writes a comment in the template without any output to the generated file.

```
<<# This is just a comment>>
```
