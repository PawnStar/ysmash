module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
    copy: {
      public: {
        expand: true,
        cwd: 'src/public/',
        src: '**',
        dest: 'docs/',
      },
    },
    clean: {
      docs: 'docs/*'
    },
    execute: {
      build_stats: {
        src: ['build-stats.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-execute');

  grunt.registerTask('default', ['clean', 'copy', 'uglify','pug','less', 'execute']);
};
