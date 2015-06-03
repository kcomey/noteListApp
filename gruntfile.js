module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

grunt.initConfig({
  karma: {
    unit: {
      configFile: 'karma.conf.js'
    }
  },

  jshint: {
    all: {
      src: ['Gruntfile.js', 'public/**/*.js', 'spec/**/*.js'],
      options: {
        node: true,
        mocha: true,
        expr: true
      }
    }
  },

  simplemocha: {
     src: ['spec/**/*.js']
  },

  jscs: {
      src: 'public/**/*.js',
      options: {
          config: ".jscsrc"
      }
  }
});
  grunt.registerTask('test', ['karma']);
  grunt.registerTask('default', ['jshint', 'test']);
};
