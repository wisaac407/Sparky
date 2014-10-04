-module.exports = function(grunt) {
-
-	// To support SASS/SCSS or Stylus, just install
-	// the appropriate grunt package and it will be automatically included
-	// in the build process, Sass is included by default:
-	//
-	// * for SASS/SCSS support, run `npm install --save-dev grunt-contrib-sass`
-	// * for Stylus/Nib support, `npm install --save-dev grunt-contrib-stylus`
-
-	var npmDependencies = require('./package.json').devDependencies;
-
-	grunt.initConfig({
-
-		// Watches for changes and runs tasks
-		watch : {
-			sass : {
-				files : ['scss/**/*.scss'],
-				tasks : ['sass:dev'],
-				options : {
-					livereload : true
-				}
-			},
-			js : {
-				files : ['js/**/*.js'],
-				tasks : ['jshint'],
-				options : {
-					livereload : true
-				}
-			},
-			php : {
-				files : ['**/*.php'],
-				options : {
-					livereload : true
-				}
-			}
-		},
-
-		// JsHint your javascript
-		jshint : {
-			all : ['assets/js/dev/*.js'],
-			options : {
-				browser: true,
-				curly: false,
-				eqeqeq: false,
-				eqnull: true,
-				expr: true,
-				immed: true,
-				newcap: true,
-				noarg: true,
-				smarttabs: true,
-				sub: true,
-				undef: false
-			}
-		},
-
-		// Dev and dist build for sass
-		sass : {
-			dist : {
-				files : [
-					{
-						src : ['**/*.scss', '!**/_*.scss'],
-						cwd : 'assets/scss',
-						dest : 'assets/css',
-						ext : '.css',
-						expand : true
-					}
-				],
-				options : {
-					style : 'compressed',
-					precision: 10
-				}
-			},
-			dev : {
-				files : [
-					{
-						src : ['**/*.scss', '!**/_*.scss'],
-						cwd : 'assets/scss',
-						dest : 'assets/css',
-						ext : '.css',
-						expand : true
-					}
-				],
-				options : {
-					style : 'expanded',
-					precision: 10
-				}
-			}
-		},
-
-		// Bower task sets up require config
-		bower : {
-			all : {
-				rjsConfig : 'js/global.js'
-			}
-		},
-
-		// Require config
-		requirejs : {
-			dist : {
-				options : {
-					name : 'global',
-					baseUrl : 'assets/js/dev',
-					mainConfigFile : './assets/js/dev/global.js',
-					out : './assets/js/dist/global.js'
-				}
-			}
-		},
-
-		// Image min
-		imagemin : {
-			dist : {
-				files : [
-					{
-						expand: true,
-						cwd: 'images',
-						src: '**/*.{png,jpg,jpeg}',
-						dest: 'images'
-					}
-				]
-			}
-		},
-
-		// SVG min
-		svgmin: {
-			dist : {
-				files: [
-					{
-						expand: true,
-						cwd: 'images',
-						src: '**/*.svg',
-						dest: 'images'
-					}
-				]
-			}
-		}
-
-	});
-
-	// Default task
-	grunt.registerTask('default', ['watch']);
-
-	// Build task
-	grunt.registerTask('build', function() {
-		var arr = ['jshint'];
-
-		arr.push('sass:dist');
-
-		arr.push('imagemin:dist', 'svgmin:dist', 'requirejs:dist');
-
-		return arr;
-	});
-
-	// Template Setup Task
-	grunt.registerTask('setup', function() {
-		var arr = [];
-
-		arr.push['sass:dev'];
-
-		arr.push('bower-install');
-	});
-
-	// Load up tasks
-	grunt.loadNpmTasks('grunt-contrib-sass');
-	grunt.loadNpmTasks('grunt-contrib-jshint'); //grunt-contrib-jshint grunt-contrib-watch grunt-bower-requirejs grunt-contrib-requirejs grunt-contrib-imagemin grunt-svgmin grunt-contrib-sass 
-	grunt.loadNpmTasks('grunt-contrib-watch');
-	grunt.loadNpmTasks('grunt-bower-requirejs');
-	grunt.loadNpmTasks('grunt-contrib-requirejs');
-	grunt.loadNpmTasks('grunt-contrib-imagemin');
-	grunt.loadNpmTasks('grunt-svgmin');
-
-	// Run bower install
-	grunt.registerTask('bower-install', function() {
-		var done = this.async();
-		var bower = require('bower').commands;
-		bower.install().on('end', function(data) {
-			done();
-		}).on('data', function(data) {
-			console.log(data);
-		}).on('error', function(err) {
-			console.error(err);
-			done();
-		});
-	});
-
-};
header.php
..
10
11
12








13
14
15
..
10
11
12
13
14
15
16
17
18
19
20
21
22
23
@@ -10,6 +10,14 @@
         <title><?php wp_title( '|', true, 'right' ) ?></title>
 		<meta name="author" content="">
 		<link rel="author" href="">
+		<?php if (!WP_DEBUG):?>
+		<script type="text/javascript">
+			var libs = [];
+			var define = function(mod, deps, func){libs[mod]=(func || deps)()};
+			var require = function(mods, func){func(libs[mods[0]]);};
+			require.config = function(){};
+		</script>
+		<?php endif;?>
 		<?php wp_head() ?>
     </head>
     <body <?php body_class() ?>>
.gitignore
..
18
19
20
21

22

..
18
19
20

21
22
23
@@ -18,5 +18,6 @@ Thumbs.db
 *.css
 *.map
 
-# Ignore minifyed JavaScript files
+# Ignore minifyed and production JavaScript files
 *.min.js
+assets/js/dist
Gruntfile.js~
module.exports = function(grunt) {

	// To support SASS/SCSS or Stylus, just install
	// the appropriate grunt package and it will be automatically included
	// in the build process, Sass is included by default:
	//
	// * for SASS/SCSS support, run `npm install --save-dev grunt-contrib-sass`
	// * for Stylus/Nib support, `npm install --save-dev grunt-contrib-stylus`

	var npmDependencies = require('./package.json').devDependencies;

	grunt.initConfig({

		// Watches for changes and runs tasks
		watch : {
			sass : {
				files : ['scss/**/*.scss'],
				tasks : ['sass:dev'],
				options : {
					livereload : true
				}
			},
			js : {
				files : ['js/**/*.js'],
				tasks : ['jshint'],
				options : {
					livereload : true
				}
			},
			php : {
				files : ['**/*.php'],
				options : {
					livereload : true
				}
			}
		},

		// JsHint your javascript
		jshint : {
			all : ['assets/js/dev/*.js'],
			options : {
				browser: true,
				curly: false,
				eqeqeq: false,
				eqnull: true,
				expr: true,
				immed: true,
				newcap: true,
				noarg: true,
				smarttabs: true,
				sub: true,
				undef: false
			}
		},

		// Dev and dist build for sass
		sass : {
			dist : {
				files : [
					{
						src : ['**/*.scss', '!**/_*.scss'],
						cwd : 'assets/scss',
						dest : 'assets/css',
						ext : '.css',
						expand : true
					}
				],
				options : {
					style : 'compressed',
					precision: 10
				}
			},
			dev : {
				files : [
					{
						src : ['**/*.scss', '!**/_*.scss'],
						cwd : 'assets/scss',
						dest : 'assets/css',
						ext : '.css',
						expand : true
					}
				],
				options : {
					style : 'expanded',
					precision: 10
				}
			}
		},

		// Bower task sets up require config
		bower : {
			all : {
				rjsConfig : 'js/global.js'
			}
		},

		// Require config
		requirejs : {
			dist : {
				options : {
					name : 'global',
					baseUrl : 'assets/js/dev',
					mainConfigFile : './assets/js/dev/global.js',
					out : './assets/dist/js/global.js'
				}
			}
		},

		// Image min
		imagemin : {
			dist : {
				files : [
					{
						expand: true,
						cwd: 'images',
						src: '**/*.{png,jpg,jpeg}',
						dest: 'images'
					}
				]
			}
		},

		// SVG min
		svgmin: {
			dist : {
				files: [
					{
						expand: true,
						cwd: 'images',
						src: '**/*.svg',
						dest: 'images'
					}
				]
			}
		}

	});

	// Default task
	grunt.registerTask('default', ['watch']);

	// Build task
	grunt.registerTask('build', function() {
		var arr = ['jshint'];

		arr.push('sass:dist');

		arr.push('imagemin:dist', 'svgmin:dist', 'requirejs:dist');

		return arr;
	});

	// Template Setup Task
	grunt.registerTask('setup', function() {
		var arr = [];

		arr.push['sass:dev'];

		arr.push('bower-install');
	});

	// Load up tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint'); //grunt-contrib-jshint grunt-contrib-watch grunt-bower-requirejs grunt-contrib-requirejs grunt-contrib-imagemin grunt-svgmin grunt-contrib-sass 
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-bower-requirejs');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-svgmin');

	// Run bower install
	grunt.registerTask('bower-install', function() {
		var done = this.async();
		var bower = require('bower').commands;
		bower.install().on('end', function(data) {
			done();
		}).on('data', function(data) {
			console.log(data);
		}).on('error', function(err) {
			console.error(err);
			done();
		});
	});

};