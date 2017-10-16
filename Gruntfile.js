module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect:{
      server:{
        options:{
          port: 8080,
          base: {
            path: 'docs',
            options:{
              extensions:['html']
            }
          }
        }
      }
    },
    uglify: {
      options: {
        banner:'/* YSmash */\n/* a site by Cole Erickson, for YSmash */\n/* Built on <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'docs/ysmash.min.js': ['src/javascript/jquery-3.1.1.min.js', 'src/javascript/Chart.bundle.js', 'src/javascript/rechart.js']
        }
      }
    },
    pug: {
      compile: {
        options: {
          data: {
            debug: false
          },
          pretty:true
        },
        files: {
          'docs/index.html': 'src/index.pug'
        }
      }
    },
    less: {
      production: {
        options: {
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
            new (require('less-plugin-clean-css'))({})
          ]
        },
        files: {
          'docs/style.css': 'src/stylesheets/style.less'
        }
      }
    },
    watch: {
      js:{
        files: ['src/javascript/*.js'],
        tasks: ['build-js']
      },
      html:{
        files: ['src/*.pug'],
        tasks: ['build-html']
      },
      json:{
        files: ['seasons[]/*.json,'],
        tasks: ['build-json']
      },
      css:{
        files: ['src/stylesheets/*.less'],
        tasks: ['build-css']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-concat-json');

  grunt.registerTask('build', ['uglify','concat-json','pug','less']);
  grunt.registerTask('build-js', ['uglify']);
  grunt.registerTask('build-json', ['concat-json']);
  grunt.registerTask('build-html', ['pug']);
  grunt.registerTask('build-css', ['less']);
  grunt.registerTask('default',['build','connect:server','watch']);
};
