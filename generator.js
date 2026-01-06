#!/usr/bin/env node

(function () {

	var TEMPLATES_DIR = 'templates';
	var DESTINATION_DIR = 'build';
	var JSON_DIR = 'resume';

	var EXTENSION_HTML = '.html';
	var EXTENSION_JSON = '.json';
	var EXTENSION_MARKUP = '.markup';

	var fse = require( 'fs-extra' );
	var pathExt = require('path');
	var Mark = require( "markup-js" );

	function generateResumes () {
		// Read common skills file
		fse.readFile( JSON_DIR + '/skills.json', 'utf8', function ( err, skillsData ) {
			if ( err ) {
				console.log( err );
				return;
			}
			
			var commonSkills = JSON.parse( skillsData );
			
			walk( JSON_DIR, function (item, path, fullPath) {
				// Skip skills.json and non-JSON files
				if ( item === 'skills.json' || pathExt.extname(item) !== EXTENSION_JSON ) {
					return;
				}
				
				fse.readFile( fullPath, 'utf8', function ( err, data ) {
					if ( err ) {
						console.log( err );
					} else {
						var resumeData = JSON.parse( data );
						// Add common skills to resume data with new structure
						resumeData.skills = commonSkills.skills;
						
						fse.copy( TEMPLATES_DIR, DESTINATION_DIR + '/' + pathExt.basename( item, EXTENSION_JSON ), function () {
							generateResume( pathExt.basename( item, EXTENSION_JSON ), DESTINATION_DIR + '/' + pathExt.basename( item, EXTENSION_JSON ), resumeData );
						});
					}
				})
			});
		});
	}


	function generateResume ( resumeName, resumeDir, resumeData ) {
		walk( resumeDir, function(item, path, fullPath) {
			if ( pathExt.extname(item) === EXTENSION_MARKUP ) {			
				fse.readFile( fullPath, 'utf8', function ( err, template ) {
					if ( err ) {
						console.log ( err );
					} else {
						Mark.globals = resumeData.globals;

						fse.writeFile( path + '/' + pathExt.basename( item, EXTENSION_MARKUP ) + EXTENSION_HTML, Mark.up( template, resumeData ), function ( err )	{
							if ( err ) {
								console.log( err );
							} else {
								console.log( "The file " + resumeName + "  was saved in " + resumeDir );
							}
						});
					}
				});
			}
		});
	}

	fse.emptyDir( DESTINATION_DIR , generateResumes);

	function walk(path, callback) {
		fse.readdir(path, function (err, files) {

			if(err) {
				console.log(err);
			} else {
				files.forEach(function(item) {
					var filePath = path + '/' + item;
					fse.stat(filePath, function (err, stats) {

						if (stats.isDirectory()) {
							walk(filePath, callback);
						}

						if (stats.isFile()) {
							callback(item, path, filePath);
						}

					});
				});
			}
		})
	}
} ());
