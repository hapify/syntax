"use strict";

const Fs = require("fs");
const { expect } = require("code");
const Lab = require("lab");
const lab = (exports.lab = Lab.script());
const HapifySyntax = require("../src");
const ConditionalPattern = require("../src/patterns/conditional");

const Model = require("./models/video.json");
const Input = Fs.readFileSync(`${__dirname}/masks/conditional.hpf`, "utf8");
const Output = Fs.readFileSync(`${__dirname}/output/conditional.txt`, "utf8");

lab.test("run", async () => {
  //Test input validity
  expect(Input).to.be.a.string();
  expect(Output).to.be.a.string();
  expect(Model).to.be.an.object();

  expect(HapifySyntax.run(Input, Model)).to.equal(Output);
});

lab.test("unit", async () => {
  const condition = (test, length = 0) =>
    `\`;\nif ((root.fields.list.filter && root.fields.list.filter((i) => ${test}).length > ${length}) || (!(root.fields.list.filter) && ((i) => ${test})(root.fields.list))) {\nout += \``;
  const conditionElse = (test, length = 0) =>
    `\`;\n} else if ((root.fields.list.filter && root.fields.list.filter((i) => ${test}).length > ${length}) || (!(root.fields.list.filter) && ((i) => ${test})(root.fields.list))) {\nout += \``;
  const conditionModel = (test, length = 0) =>
    `\`;\nif ((root.filter && root.filter((i) => ${test}).length > ${length}) || (!(root.filter) && ((i) => ${test})(root))) {\nout += \``;
  const conditionAccesses = (test, length = 0) =>
    `\`;\nif ((root.accesses.list.filter && root.accesses.list.filter((i) => ${test}).length > ${length}) || (!(root.accesses.list.filter) && ((i) => ${test})(root.accesses.list))) {\nout += \``;
  const conditionAccessesActions = (test, action, length = 0) =>
    `\`;\nif ((root.accesses.${action}.filter && root.accesses.${action}.filter((i) => ${test}).length > ${length}) || (!(root.accesses.${action}.filter) && ((i) => ${test})(root.accesses.${action}))) {\nout += \``;

  //Start with not
  const notSe = condition("!i.searchable", 3);
  expect(ConditionalPattern.execute("<<?4 F !se>>")).to.equal(notSe);
  expect(ConditionalPattern.execute("<<?4 F -se  >>")).to.equal(notSe);
  expect(ConditionalPattern.execute("<<?4 F  /se>>")).to.equal(notSe);

  // operator
  expect(ConditionalPattern.execute("<<? F !(se+so-lb)*pr/ip>>")).to.equal(
    condition(
      "!(i.searchable || i.sortable || !i.label) && i.primary && !i.isPrivate"
    )
  );

  // properties
  expect(ConditionalPattern.execute("<<? F pr>>")).to.equal(
    condition("i.primary")
  );
  expect(ConditionalPattern.execute("<<? F un>>")).to.equal(
    condition("i.unique")
  );
  expect(ConditionalPattern.execute("<<? F lb>>")).to.equal(
    condition("i.label")
  );
  expect(ConditionalPattern.execute("<<? F nu>>")).to.equal(
    condition("i.nullable")
  );
  expect(ConditionalPattern.execute("<<? F ml>>")).to.equal(
    condition("i.multiple")
  );
  expect(ConditionalPattern.execute("<<? F im>>")).to.equal(
    condition("i.important")
  );
  expect(ConditionalPattern.execute("<<? F se>>")).to.equal(
    condition("i.searchable")
  );
  expect(ConditionalPattern.execute("<<? F so>>")).to.equal(
    condition("i.sortable")
  );
  expect(ConditionalPattern.execute("<<? F ip>>")).to.equal(
    condition("i.isPrivate")
  );
  expect(ConditionalPattern.execute("<<? F in>>")).to.equal(
    condition("i.internal")
  );
  expect(ConditionalPattern.execute("<<? F rs>>")).to.equal(
    condition("i.restricted")
  );
  expect(ConditionalPattern.execute("<<? F os>>")).to.equal(
    condition("i.ownership")
  );

  expect(ConditionalPattern.execute("<<? F tS>>")).to.equal(
    condition("(i.type === 'string')")
  );
  expect(ConditionalPattern.execute("<<? F tSe>>")).to.equal(
    condition("(i.type === 'string' && i.subtype === 'email')")
  );
  expect(ConditionalPattern.execute("<<? F tSp>>")).to.equal(
    condition("(i.type === 'string' && i.subtype === 'password')")
  );
  expect(ConditionalPattern.execute("<<? F tSt>>")).to.equal(
    condition("(i.type === 'string' && i.subtype === 'text')")
  );
  expect(ConditionalPattern.execute("<<? F tSr>>")).to.equal(
    condition("(i.type === 'string' && i.subtype === 'rich')")
  );

  expect(ConditionalPattern.execute("<<? F tN>>")).to.equal(
    condition("(i.type === 'number')")
  );
  expect(ConditionalPattern.execute("<<? F tNi>>")).to.equal(
    condition("(i.type === 'number' && i.subtype === 'integer')")
  );
  expect(ConditionalPattern.execute("<<? F tNf>>")).to.equal(
    condition("(i.type === 'number' && i.subtype === 'float')")
  );
  expect(ConditionalPattern.execute("<<? F tNt>>")).to.equal(
    condition("(i.type === 'number' && i.subtype === 'latitude')")
  );
  expect(ConditionalPattern.execute("<<? F tNg>>")).to.equal(
    condition("(i.type === 'number' && i.subtype === 'longitude')")
  );

  expect(ConditionalPattern.execute("<<? F tB>>")).to.equal(
    condition("(i.type === 'boolean')")
  );

  expect(ConditionalPattern.execute("<<? F tD>>")).to.equal(
    condition("(i.type === 'datetime')")
  );
  expect(ConditionalPattern.execute("<<? F tDd>>")).to.equal(
    condition("(i.type === 'datetime' && i.subtype === 'date')")
  );
  expect(ConditionalPattern.execute("<<? F tDt>>")).to.equal(
    condition("(i.type === 'datetime' && i.subtype === 'time')")
  );

  expect(ConditionalPattern.execute("<<? F tE>>")).to.equal(
    condition("(i.type === 'entity')")
  );

  // properties
  expect(ConditionalPattern.execute("<<? M pMPr>>")).to.equal(
    conditionModel("i.properties.mainlyPrivate")
  );
  expect(ConditionalPattern.execute("<<? M pMIn>>")).to.equal(
    conditionModel("i.properties.mainlyInternal")
  );
  expect(ConditionalPattern.execute("<<? M pGeo>>")).to.equal(
    conditionModel("i.properties.isGeolocated")
  );
  expect(ConditionalPattern.execute("<<? M pGSe>>")).to.equal(
    conditionModel("i.properties.isGeoSearchable")
  );

  // spaces
  expect(ConditionalPattern.execute("<<?   F   pr  >>")).to.equal(
    condition("i.primary")
  );

  // Else if
  expect(ConditionalPattern.execute("<<?? F pr>>")).to.equal(
    conditionElse("i.primary")
  );
  expect(ConditionalPattern.execute("<<??6 F pr>>")).to.equal(
    conditionElse("i.primary", 5)
  );

  // Else
  expect(ConditionalPattern.execute("<<??>>")).to.equal(
    "`;\n} else {\nout += `"
  );

  // Closure
  expect(ConditionalPattern.execute("<<?>>")).to.equal("`;\n}\nout += `");

  // Sub fields
  expect(ConditionalPattern.execute("<<? m.f>>")).to.equal(
    "`;\nif ((m.f.filter && m.f.filter((i) => i).length > 0) || (!(m.f.filter) && ((i) => i)(m.f))) {\nout += `"
  );

  // Accesses
  expect(ConditionalPattern.execute("<<? A ow>>")).to.equal(
    conditionAccesses("i.owner")
  );

  // Accesses actions
  expect(ConditionalPattern.execute("<<? Ac ad>>")).to.equal(
    conditionAccessesActions("i.admin", "create")
  );
  expect(ConditionalPattern.execute("<<? Ar ow>>")).to.equal(
    conditionAccessesActions("i.owner", "read")
  );
  expect(ConditionalPattern.execute("<<? Au au>>")).to.equal(
    conditionAccessesActions("i.auth", "update")
  );
  expect(ConditionalPattern.execute("<<? Ad gs>>")).to.equal(
    conditionAccessesActions("i.guest", "remove")
  );

  expect(ConditionalPattern.execute("<<? Ac [ad>>")).to.equal(
    conditionAccessesActions("i.gteAdmin", "create")
  );
  expect(ConditionalPattern.execute("<<? Ar [ow>>")).to.equal(
    conditionAccessesActions("i.gteOwner", "read")
  );
  expect(ConditionalPattern.execute("<<? Au [au>>")).to.equal(
    conditionAccessesActions("i.gteAuth", "update")
  );
  expect(ConditionalPattern.execute("<<? Ad [gs>>")).to.equal(
    conditionAccessesActions("i.gteGuest", "remove")
  );

  expect(ConditionalPattern.execute("<<? Ac ad]>>")).to.equal(
    conditionAccessesActions("i.lteAdmin", "create")
  );
  expect(ConditionalPattern.execute("<<? Ar ow]>>")).to.equal(
    conditionAccessesActions("i.lteOwner", "read")
  );
  expect(ConditionalPattern.execute("<<? Au au]>>")).to.equal(
    conditionAccessesActions("i.lteAuth", "update")
  );
  expect(ConditionalPattern.execute("<<? Ad gs]>>")).to.equal(
    conditionAccessesActions("i.lteGuest", "remove")
  );

  expect(ConditionalPattern.execute("<<? As ow>>")).to.equal(
    conditionAccessesActions("i.owner", "search")
  );
  expect(ConditionalPattern.execute("<<? An ow>>")).to.equal(
    conditionAccessesActions("i.owner", "count")
  );

  // Accesses properties
  expect(ConditionalPattern.execute("<<? M pOAd>>")).to.equal(
    conditionModel("i.accesses.properties.onlyAdmin")
  );
  expect(ConditionalPattern.execute("<<? M pOOw>>")).to.equal(
    conditionModel("i.accesses.properties.onlyOwner")
  );
  expect(ConditionalPattern.execute("<<? M pOAu>>")).to.equal(
    conditionModel("i.accesses.properties.onlyAuth")
  );
  expect(ConditionalPattern.execute("<<? M pOGs>>")).to.equal(
    conditionModel("i.accesses.properties.onlyGuest")
  );
  expect(ConditionalPattern.execute("<<? M pMAd>>")).to.equal(
    conditionModel("i.accesses.properties.maxAdmin")
  );
  expect(ConditionalPattern.execute("<<? M pMOw>>")).to.equal(
    conditionModel("i.accesses.properties.maxOwner")
  );
  expect(ConditionalPattern.execute("<<? M pMAu>>")).to.equal(
    conditionModel("i.accesses.properties.maxAuth")
  );
  expect(ConditionalPattern.execute("<<? M pMGs>>")).to.equal(
    conditionModel("i.accesses.properties.maxGuest")
  );
  expect(ConditionalPattern.execute("<<? M pNAd>>")).to.equal(
    conditionModel("i.accesses.properties.noAdmin")
  );
  expect(ConditionalPattern.execute("<<? M pNOw>>")).to.equal(
    conditionModel("i.accesses.properties.noOwner")
  );
  expect(ConditionalPattern.execute("<<? M pNAu>>")).to.equal(
    conditionModel("i.accesses.properties.noAuth")
  );
  expect(ConditionalPattern.execute("<<? M pNGs>>")).to.equal(
    conditionModel("i.accesses.properties.noGuest")
  );
});
