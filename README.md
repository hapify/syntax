# Hapify Syntax

## Description

This package parses templates written with the Hapify Syntax.

[![Build Status](https://travis-ci.org/hapify/syntax.svg?branch=master)](https://travis-ci.org/hapify/syntax) [![codecov](https://codecov.io/gh/hapify/syntax/branch/master/graph/badge.svg)](https://codecov.io/gh/hapify/syntax)

## Pre-requisites

Before reading this article, we recommend that you read the documentation about [models and fields structure](https://www.hapify.io/documentation/templating-javascript).

## Wrappers

Opening tag: `<<`.

Closing tag: `>>`.

Usually used for binary operations. Should be escapable:
Escaped tags `\<\<` (and `\>\>`) are replaced by `<<` (and `>>`) in the generated content.

## Syntax

Hapify templates can be written with a long or short syntax.

Both have advantages:
 - Short syntax does not interfere with the target code when reading the template, due to a shorter meta code.
 - Long syntax is explicit and can be read naturally.

In a template, you can mix both syntax.

**A loop with long syntax**

```
<<for Fields searchable and sortable and not label f>>
<<@>>
```

**Same loop with short syntax**

```
<<@ F se*so/lb f>>
<<@>>
```

Explanations:

-   `for` (alias `@`) is the operation
-   `Fields` (alias `F`) is the variable
-   `searchable and sortable and not label` (short syntax: `se*so/lb`) is the condition (optional)
-   `f` is the assignment variable

### Variable naming

As a convention, we use lower case to name dynamically defined variables (user variables) and upper case for pre-defined variables (system variables).
An user variable cannot use system reserved words. To see the complete list of reserved words, please refer to the end of this file.

To refer to the root variable, we use `Model` or `Models` (short: `M`).
It refers to the model in a single model template and to the models list in a multiple models template.

In the template's scope, this root variable is named `root`.
Therefore, `Model` or `Models` is just a shortcut to `root`.

By default, in a case of a single model template:

-   `Fields` (short: `F`) refers to the fields list: `root.fields.list`
-   `Dependencies` (short: `D`) refers to the models list: `root.dependencies`
-   `ReferencedIn` (alias: `RefModels`, short: `R`) refers to the models list: `root.referencedIn`
-   `PrimaryField` (short: `P`) refers to the models primary field: `root.fileds.primary`
-   `Accesses` (short: `A`) refers to the action's accesses list: `root.accesses.list`
-   `CreateAccess` (short: `Ac`) refers to the create action's access: `root.accesses.create`
-   `ReadAccess` (short: `Ar`) refers to the read action's access: `root.accesses.read`
-   `UpdateAccess` (short: `Au`) refers to the update action's access: `root.accesses.update`
-   `RemoveAccess` (short: `Ad`) refers to the delete (remove) action's access: `root.accesses.remove`
-   `SearchAccess` (short: `As`) refers to the search action's access: `root.accesses.search`
-   `CountAccess` (short: `An`) refers to the count action's access: `root.accesses.count`

## Conditional operator

This operator can be used over an object or an array of objects.
If used over an array, it will test the length of the array filtered by the condition.

As an array, it can be used over any object containing a method `filter` that receives a callback returning a boolean.
In the model structure, `root.dependencies` is an object that contains a `filter` method.
Then, this operator can test if a model has dependencies that has fields with a specific condition.

### Syntax

**Long syntax**

```
<<if Fields entity and multiple>>
<<endif>>
```


**Short syntax**

```
<<? F tE*ml>>
<<?>>
```

Tests if the model has at least one multiple entity.

### Operators

Operators can be written as words or as algebra operators.

-   `and` is an intersection. It can also be written `*` or `&&`. For example `sortable and searchable` equals `sortable * searchable` equals `sortable && searchable`.
-   `or` is an union. It can also be written `+` or `||`. For example `sortable or searchable` equals `sortable + searchable` equals `sortable || searchable`.
-   `and not` is an intersection with the complementary. It can also be written `andNot`, `/` or `&& !`. For example `sortable andNot searchable` equals `sortable and not searchable` equals `sortable * searchable` equals `sortable && !searchable`.
-   `or not` is an union with the complementary. It can also be written `orNot`, `-` or `|| !`. For example `sortable orNot searchable` equals `sortable or not searchable` equals `sortable - searchable` equals `sortable || !searchable`.

If the condition starts with `andNot`, `orNot`, `-` or `/` it will be converted to `!`.
Therefore, `-searchable*sortable` and `andNot searchable and sortable` are equivalent to `not searchable and sortable`.

**Example**

```
<<if Fields not nullable andNot (number or not date)>>
    ...
<<endfor>>
```

### Properties short-codes

You can filter an array or to test a field by its properties.

Available properties for a field:

-   `primary` (short: `pr`) for boolean `primary`
-   `unique` (short: `un`) for boolean `unique`
-   `label` (short: `lb`) for boolean `label`
-   `nullable` (short: `nu`) for boolean `nullable`
-   `multiple` (short: `ml`) for boolean `multiple`
-   `embedded` (short: `em`) for boolean `embedded`
-   `searchable` (short: `se`) for boolean `searchable`
-   `sortable` (short: `so`) for boolean `sortable`
-   `hidden` (short: `hd`) for boolean `hidden`
-   `internal` (short: `in`) for boolean `internal`
-   `restricted` (short: `rs`) for boolean `restricted`
-   `ownership` (short: `os`) for boolean `ownership`
-   `string` (short: `tS`) for type `string`
    -   `email` (short: `tSe`) for type `string` and subtype `email`
    -   `password` (short: `tSp`) for type `string` and subtype `password`
    -   `url` (short: `tSu`) for type `string` and subtype `url`
    -   `text` (short: `tSt`) for type `string` and subtype `text`
    -   `richText` (alias: `rich`, short: `tSr`) for type `string` and subtype `rich`
-   `number` (short: `tN`) for type `number`
    -   `integer` (short: `tNi`) for type `number` and subtype `integer`
    -   `float` (short: `tNf`) for type `number` and subtype `float`
    -   `latitude` (short: `tNt`) for type `number` and subtype `latitude`
    -   `longitude` (short: `tNg`) for type `number` and subtype `longitude`
-   `boolean` (short: `tB`) for type `boolean`
-   `datetime` (short: `tD`) for type `datetime`
    -   `date` (short: `tDd`) for type `datetime` and subtype `date`
    -   `time` (short: `tDt`) for type `datetime` and subtype `time`
-   `entity` (short: `tE`) for type `entity`
-   `object` (short: `tO`) for type `object`
-   `file` (short: `tF`) for type `file`
    -   `image` (short: `tFi`) for type `file` and subtype `image`
    -   `video` (short: `tFv`) for type `file` and subtype `video`
    -   `audio` (short: `tFa`) for type `file` and subtype `audio`
    -   `document` (short: `tFd`) for type `file` and subtype `document`

**Example**

```
<<if Fields (restricted or internal) and not number>>
    Current model has at least one field matching to the condition. Do some stuff...
<<endfor>>
```

You can also test a model or filter a list of models by its pre-computed properties:

-   `mainlyHidden` (short: `pMHd`) for boolean `mainlyHidden`
-   `mainlyInternal` (short: `pMIn`) for boolean `mainlyInternal`
-   `isGeolocated` (short: `pGeo`) for boolean `isGeolocated`
-   `isGeoSearchable` (short: `pGSe`) for boolean `isGeoSearchable`

**Example**

```
<<for Models isGeolocated model>>
    For each model matching the condition, do some stuff
<<endfor>>
```

#### Access controls

You can filter an array of actions or to test an action by its access properties:

-   `admin` (short: `ad`) for boolean `admin`
-   `owner` (short: `ow`) for boolean `owner`
-   `auth` (short: `au`) for boolean `auth`
-   `guest` (short: `gs`) for boolean `guest`
-   `gteAdmin` (short: `[ad`) for boolean `gteAdmin`
-   `gteOwner` (short: `[ow`) for boolean `gteOwner`
-   `gteAuth` (short: `[au`) for boolean `gteAuth`
-   `gteGuest` (short: `[gs`) for boolean `gteGuest`
-   `lteAdmin` (short: `ad]`) for boolean `lteAdmin`
-   `lteOwner` (short: `ow]`) for boolean `lteOwner`
-   `lteAuth` (short: `au]`) for boolean `lteAuth`
-   `lteGuest` (short: `gs]`) for boolean `lteGuest`

**Examples**

```
<<for Accesses gteAuth action>>
    For each action of the current model that requires auth or admin accees
<<endfor>>
```

```
<<if ReadAccess guest>>
    Read this model is public
<<endfor>>
```

Words available for the access' properties of a model:

-   `onlyAdmin` (short: `pOAd`) for boolean `onlyAdmin`
-   `onlyOwner` (short: `pOOw`) for boolean `onlyOwner`
-   `onlyAuth` (short: `pOAu`) for boolean `onlyAuth`
-   `onlyGuest` (short: `pOGs`) for boolean `onlyGuest`
-   `maxAdmin` (short: `pMAd`) for boolean `maxAdmin`
-   `maxOwner` (short: `pMOw`) for boolean `maxOwner`
-   `maxAuth` (short: `pMAu`) for boolean `maxAuth`
-   `maxGuest` (short: `pMGs`) for boolean `maxGuest`
-   `noAdmin` (short: `pNAd`) for boolean `noAdmin`
-   `noOwner` (short: `pNOw`) for boolean `noOwner`
-   `noAuth` (short: `pNAu`) for boolean `noAuth`
-   `noGuest` (short: `pNGs`) for boolean `noGuest`

**Example**

```
<<if Accesses onlyAdmin>>
    All acrions on this model are reserved to admins
<<endfor>>
```

### Structure

A complete conditional writing will look like this:

```
<<if4 Fields hidden>>
    This model has at least 4 hidden fields
<<elseif2 Fields label or boolean>>
    This model has at least 2 label or boolean fields
<<elseif PrimaryField string>>
    The primary key of the model is a string
<<else>>
    Something else
<<endif>>
```

Is equivalent to:

```javascript
if (root.fields.list.filter(f => f.hidden).length >= 4) {
	out += '    This model has at least 4 hidden fields';
} else if (
	root.fields.list.filter(f => f.label || f.type === 'boolean').length >= 2
) {
	out += '    This model has at least 2 label or boolean fields';
} else if (root.fields.primary.type === 'string') {
	out += '    The primary key of the model is a string';
} else {
	out += '    Something else';
}
```

### Statements analysis

#### if

`<<if4 Fields hidden>>` is equivalent to: `if (condition) {`.

-   `<<if` is the opening tag.
-   `4` is the minimum length of the filtered array. This value is optional and only usable if the variable is an array. If omitted, we assume the required length is 1.
-   `Fields` is the variable to test. It can be and array or an object.
-   `hidden` is the condition to test the object or the items of an array.
-   `>>` closes the tag

#### else if

`<<elseif2 Fields label or boolean>>` Js equivalent would be: `} else if (condition) {`.
It follows the same rules as an **if** statement, unless its opening tag is `<<elseif`.

#### else

`<<else>>` is equivalent to: `} else {`.

#### ending

`<<endif>>` is equivalent to: `}`.


### Examples

#### Example with conditions:

This tests if the model has some searchable and sortable but not hidden fields

**Long syntax**

```
<<if Fields searchable and sortable and not hidden>>
    ...
<<endif>>
```

**Short syntax**

```
<<? F se*so/hd>>
    ...
<<?>>
```

Is equivalent to:

```javascript
if (root.fields.list.filter(f => f.searchable && f.sortable && !f.hidden).length > 0) {
	out += '...';
}
```

#### Example without condition:

**Long syntax**

```
<<if Fields>>
    .....
<<endif>>
```

**Short syntax**

```
<<? F>>
    .....
<<?>>
```

Is equivalent to:

```javascript
if (root.fields.list.length > 0) {
	out += '.....';
}
```

#### Example with more than 2 elements

Example to test if the model has at least two label fields

**Long syntax**

```
<<if2 Fields label>>
    .....
<<endif>>
```

**Short syntax**

```
<<?2 F lb>>
    ...
<<?>>
```

Is equivalent to:

```javascript
if (root.fields.list.filter(f => f.label).length >= 2) {
	out += '.....';
}
```

#### Example for a specific action's access

Example to test if the update action is restricted to admin or owner

**Long syntax**

```
<<if UpdateAccess admin or owner>>
    .....
<<endif>>
```

**Short syntax**

```
<<? Au ad+ow>>
    .....
<<?>>
```

Is equivalent to:

```javascript
if (root.accesses.update.admin || root.accesses.update.owner) {
	out += '.....';
}
```

#### Example for many action's accesses

Example to test if at least one action is restricted to authenticated user or less

**Long syntax**

```
<<if Accesses lteAuth>>
    .....
<<endif>>
```

**Short syntax**

```
<<? A au]>>
    .....
<<?>>
```

Is equivalent to:

```javascript
if (root.accesses.filter(a => a.lteAuth).length > 0) {
	out += '.....';
}
```

## Iteration operator

The loop operation (foreach) is `for` (short: `@`).

It applies only to an array.
It uses the same conditions syntax as the conditional operator.

Actually, it inherits from the conditional operator.

### Syntax

**Long syntax**

```
<<for Fields entity and multiple f>>
<<endfor>>
```

**Short syntax**

```
<<@ F tE*ml f>>
<<@>>
```

The operators and the properties used in the condition are the same as for the conditional operator.
This will loop over all fields of type entity and multiple and assign the current field to the variable `f`.

### Structure

A complete iteration will look like this:

**Long syntax**

```
<<for4 Fields hidden f>>
    Do something
<<endfor>>
```

**Short syntax**

```
<<@4 F hd f>>
    Do something
<<@>>
```

Is equivalent to:

```javascript
for (let f of root.fields.list.filter(f => f.hidden).slice(0, 4)) {
	out += '    Do something';
}
```

### Analysis

#### loop

`<<for4 Fields hidden f>>` is equivalent to: `for (assigment + condition) {`.

-   `<<for` is the opening tag.
-   `4` is the maximum length of the filtered array. This value is optional. If omitted, we do not slice the filtered array.
-   `Fields` is the variable to filter and to loop on. It must be iterable.
-   `hidden` is the condition to test the items of the array.
-   `f` is the assignment variable. This variable will be available inside the loop's scope.
-   `>>` closes the tag.

#### ending 

`<<endfor>>` is equivalent to: `}`.


### Examples

#### Example with conditions over fields:

To loop over model's searchable entity fields

**Long syntax**

```
<<for Fields searchable and entity f>>
    ...
<<endfor>>
```

**Short syntax**

```
<<@ F se*tE f>>
    ...
<<@>>
```

Is equivalent to

```javascript
for (let f of root.fields.list.filter(f => f.searchable && f.type === 'entity')) {
	out += '...';
}
```

#### Example with conditions over models:

In the context of a multiple models template, this loops over all models that are geo-located.

**Long syntax**

```
<<for Models isGeolocated m>>
    .....
<<endfor>>
```

**Short syntax**

```
<<@ M pGeo m>>
    .....
<<@>>
```

Is equivalent to:

```javascript
for (let m of root.filter(i => i.properties.isGeolocated)) {
	out += '.....';
}
```

#### Example with 2 elements

This example will loop over the two first dependency models that have sortable fields.

**Long syntax**

```
<<for2 Dependencies sortable d>>
    ...
<<endfor>>
```

**Short syntax**

```
<<@2 D so d>>
    ...
<<@>>
```

Is equivalent to:

```javascript
for (let d of root.dependencies.filter(f => f.sortable).slice(0, 2)) {
	out += '...';
}
```

#### Example without conditions

This will loop over all fields.

**Long syntax**

```
<<for Fields f>>
    .....
<<endfor>>
```

**Short syntax**

```
<<@ F f>>
    .....
<<@>>
```

Is equivalent to:

```javascript
for (let f of root.fields.list) {
	out += '.....';
}
```

#### Example with accesses

This will loop over all actions restricted to admin or owner.

**Long syntax**

```
<<for Accesses admin or owner>>
    .....
<<endfor>>
```

**Short syntax**

```
<<@ A ad+ow>>
    .....
<<@>>
```

Is equivalent to:

```javascript
for (let f of root.accesses.list.filter(a => a.admin || a.owner)) {
	out += '...';
}
```

## Name interpolation

Name interpolation is the default operation.
To print the name of a variable (model or field), we omit the operation.

Example for the root model's name as upper camel:

**Long syntax**

```
<<Model pascal>>
```

**Short syntax**

```
<<M AA>>
```

Example for field's name as kebab:

**Long syntax**

```
<<f kebab>>
```

**Short syntax**

```
<<f a-a>>
```

The values for the name are:

-   `camel` (short: `aA`) for `names.camel`
-   `pascal` (short: `AA`) for `names.pascal`
-   `lower` (short: `a`) for `names.lower`
-   `capital` (short: `A`) for `names.capital`
-   `kebab` (short: `a-a`) for `names.kebab`
-   `header` (short: `A-A`) for `names.header`
-   `snake` (short: `a_a`) for `names.snake`
-   `constant` (short: `A_A`) for `names.constant`
-   `compact` (short: `aa`) for `names.compact`
-   `raw` (short: `R`) for `names.raw`

## Raw inputs

This operator allows you to write pure Javascript.

### Syntax

-   Opening tag: `<<<`
-   Closing tag: `>>>`

Those tags are also escapable.

Between those tags you can write pure Javascript code to inject new variables and new functions into the template scope.

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
    return f.names.snake.toUpperCase();
}
>>>
```

## Interpolation

This operator prints the content of a variable.
It is useful to print the result of a custom function or the value of a custom variable.

### Syntax

`<<= myFunction() >>` or `<<=customVariable>>`

This is equivalent to `<<< out += myFunction(); >>>`.

### Error

Do not write this: `<<= JSON.stringify(root) >>`.
The `root` object has recursive properties. Therefore this command will enter an infinite loop.

## Comments

This operator writes a comment in the template without any output to the generated file.

```
<<# This is just a comment>>
```

## Reserved words

The following list of words cannot be used for naming variables.

`A`, `Ac`, `Accesses`, `ad`, `Ad`, `admin`, `An`, `and`, `andNot`, `Ar`, `As`, `au`, `Au`, `audio`, `auth`, `boolean`, `CountAccess`, `CreateAccess`, `D`, `date`, `datetime`, `Dependencies`, `document`, `else`, `elseif`, `em`, `email`, `embedded`, `endfor`, `endif`, `entity`, `F`, `Fields`, `file`, `float`, `for`, `gs`, `gteAdmin`, `gteAuth`, `gteGuest`, `gteOwner`, `guest`, `hd`, `hidden`, `if`, `image`, `in`, `integer`, `internal`, `isGeolocated`, `isGeoSearchable`, `label`, `latitude`, `lb`, `longitude`, `lteAdmin`, `lteAuth`, `lteGuest`, `lteOwner`, `M`, `mainlyHidden`, `mainlyInternal`, `maxAdmin`, `maxAuth`, `maxGuest`, `maxOwner`, `ml`, `Model`, `Models`, `multiple`, `noAdmin`, `noAuth`, `noGuest`, `noOwner`, `not`, `nu`, `nullable`, `number`, `object`, `onlyAdmin`, `onlyAuth`, `onlyGuest`, `onlyOwner`, `or`, `orNot`, `os`, `out`, `ow`, `owner`, `ownership`, `P`, `password`, `pGeo`, `pGSe`, `pMAd`, `pMAu`, `pMGs`, `pMHd`, `pMIn`, `pMOw`, `pNAd`, `pNAu`, `pNGs`, `pNOw`, `pOAd`, `pOAu`, `pOGs`, `pOOw`, `pr`, `primary`, `PrimaryField`, `R`, `ReadAccess`, `ReferencedIn`, `RefModels`, `RemoveAccess`, `restricted`, `rich`, `richText`, `root`, `rs`, `se`, `searchable`, `SearchAccess`, `so`, `sortable`, `string`, `tB`, `tD`, `tDd`, `tDt`, `tE`, `text`, `tF`, `tFa`, `tFd`, `tFi`, `tFv`, `time`, `tN`, `tNf`, `tNg`, `tNi`, `tNt`, `tO`, `tS`, `tSe`, `tSp`, `tSr`, `tSt`, `tSu`, `un`, `unique`, `UpdateAccess`, `url`, `video`.
