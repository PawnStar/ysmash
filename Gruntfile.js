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
          'docs/ysmash.min.js': ['src/javascript/jquery-3.1.1.min.js', 'src/javascript/Chart.bundle.js', 'src/javascript/rechart.js', 'src/javascript/startGraph.js']
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
      files: ['src/javascript/*.js', 'src/stylesheets/*.less', 'src/*.pug'],
      tasks: ['build']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('build', ['uglify','pug','less']);
  grunt.registerTask('default',['build','connect:server','watch']);
};
