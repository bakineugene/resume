#!/usr/bin/env node

(async function () {
	const fse = require('fs-extra');
	const pathExt = require('path');
	const Mark = require('markup-js');

	const RESULT_FILE = 'index.html';
	const MARKUP_FILE = 'index.markup';
  const DATA_FILE = 'data.json';

	await fse.remove(RESULT_FILE);

  const data = await fse.readFile(DATA_FILE, 'utf8');
  const resumeData = JSON.parse(data);

  const template = await fse.readFile(MARKUP_FILE, 'utf8');
  Mark.globals = resumeData.globals;

  await fse.writeFile(
    RESULT_FILE,
    Mark.up(template, resumeData)
  );

  console.log( "The result file was saved as " + RESULT_FILE );
} ());
