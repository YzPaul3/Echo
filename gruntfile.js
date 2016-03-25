module.exports = function(grunt){

  grunt.initConfig({
    watch: {
      jade: {
        files
      },
      js: {

      }
    },
    nodemon: {

    },
    concurrent: {

    }








  })



  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');


  grunt.option('force', true);
  grunt.registerTask('default', ['concurrent']);
}