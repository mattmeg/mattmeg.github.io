module.exports = function (grunt) {

  grunt.initConfig({
    assemble: {
      options: {
        layoutdir: 'src/layouts',
        partials: 'src/partials/**/*.hbs',
        permalinks: {
          preset: 'pretty'
        },
        plugins: 'assemble-contrib-permalinks'
      },
      pages: {
        options: {
          layout: 'pages.hbs'
        },
        files: [{
          cwd: 'src',
          dest: 'build',
          expand: true,
          src: ['**/*.hbs', '!layouts/**', '!partials/**']
        }]
      },
      posts: {
        options: {
          layout: 'posts.hbs'
        },
        files: [{
          cwd: 'src',
          dest: 'build',
          expand: true,
          src: '**/*.md'
        }]
      }
    },
    connect: {
      task: {
        options: {
          base: 'build',
          port: 2012
        }
      }
    },
    copy: {
      task: {
        files: [
          {
            dest: 'build',
            expand: true,
            src: [
              'LICENSE',
              'README.md'
            ]
          },
          {
            dest: 'build/writes/github-markdown.css',
            src: 'node_modules/github-markdown-css/github-markdown.css'
          }
        ]
      }
    },
    watch: {
      assemble: {
        options: {
          livereload: true,
          spawn: false
        },
        files: ['src/**/*.hbs', 'src/**/*.md'],
        tasks: ['assemble']
      }
    },
    'gh-pages': {
      options: {
        base: 'build',
        branch: 'master'
      },
      src: '**/*'
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('build', [
    'assemble',
    'copy'
  ]);
  grunt.registerTask('deploy', [
    'build',
    'gh-pages'
  ]);
  grunt.registerTask('default', [
    'build',
    'connect',
    'watch'
  ]);

};