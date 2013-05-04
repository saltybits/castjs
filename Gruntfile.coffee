module.exports = (grunt) ->
  "use strict"

  # gzip = require("gzip-js")
  moment = require('moment')

  # Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    qunit: {
      files: ["test/index.html"]
    },
    build: {
      all: {
        dest: "dist/cast.js",
        src: "src/cast.js"
      }
    },
    coffee: {
      compile: {
        options: {
          bare: false
        },
        files: {
          "src/cast.js": ["src/cast.coffee", "src/types/*.coffee"]
        }
      }
    },
    uglify: {
      all: {
        files: {
          "dist/cast.min.js": [ "dist/cast.js" ]
        },
        options: {
          compress: { evaluate: false },
          banner: "/*! CastJS v<%= pkg.version %> | (c) 2013 Kumu Systems LLC | All rights reserved */",
          sourceMap: "dist/cast.min.map",
          beautify: {
            ascii_only: true
          }
        }
      }
    },
    jasmine: {
      cast: {
        src: ['lib/dependencies/*.js', 'dist/cast.js'],
        options: {
          specs: 'spec/**/*Spec.js',
          helpers: 'spec/helpers/*Helper.js'
        }
      }
    },
    watch: {}
  });

  grunt.registerMultiTask(
    "build",
    "Build cast.js to the dist directory. Embed date/version.",
    ->
      # Embed version and date
      src = grunt.file.read(@data.src)
        .replace(/@VERSION/g, grunt.config('pkg.version'))
        .replace(/@DATE/g, -> moment().format('YYYY-MM-DD'))

      # Write source to file
      grunt.file.write(@data.dest, src)
  )

  # Load grunt tasks from NPM packages
  grunt.loadNpmTasks("grunt-contrib-coffee");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jasmine");
  grunt.loadNpmTasks("grunt-git-authors");

  # Default task
  grunt.registerTask( "default", [ "coffee", "build", "uglify", "jasmine"] ); # , "dist" ] ); # jasmine?
