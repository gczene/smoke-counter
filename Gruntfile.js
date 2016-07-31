module.exports = function (grunt) {
  var target = grunt.option('target') || 'develop';

  grunt.initConfig({
    browserify: {
      develop: {
        options: {
          transform: [['babelify', {presets: ['es2015', 'react']}], ['browserify-shim']]
        },
        files: {
          'dist/js/dist.js': ['app/app.js']
        }
      }
    },
    nodestatic: {
      server: {
        options: {
          port: 8080,
          base: 'dist'
        }
      }
    },
    copy: {
      main: {
        files: [{
            "src": "./app/favicon.ico",
            "dest": "./dist/favicon.ico"
          }].concat(grunt.file.readJSON('./config/grunt/copy-' + target + '.json'))
      }
    },
    clean: ['./dist'],
    watch: {
      replace: {
        files: ['./app/index.html'],
        tasks: ['replace']
      },
      browserify: {
        files: ['./app/**/*.js'],
        tasks: ['browserify']
      }
    },
    replace: {
      main: {
        options: {
          patterns: grunt.file.readJSON('./config/grunt/replace-' + target + '.json')
        },
        files: [{
          expand: false,
          src: ['./app/index.html'],
          dest: './dist/index.html'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-nodestatic');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-replace');
  grunt.registerTask('default', ['clean', 'copy', 'replace', 'browserify', 'nodestatic', 'watch']);

};
