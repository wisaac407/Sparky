<?php

add_action('wp_enqueue_scripts', 'theme_enqueue_scripts');
function theme_enqueue_scripts(){
	
	if ( WP_DEBUG ) {
		wp_register_script('require', get_bloginfo('template_url') . '/lib/bower_components/requirejs/require.js', array(), false, true);
		wp_enqueue_script('require');
		
		wp_register_script('global', get_bloginfo('template_url') . '/assets/js/dev/global.js', array('require'), false, true);
		wp_enqueue_script('global');
		
		wp_register_script('livereload', 'http://localhost:35729/livereload.js?snipver=1', null, false, true);
		wp_enqueue_script('livereload');
	} else {
		//wp_register_script('require', get_bloginfo('template_url') . '/lib/bower_components/requirejs/require.js', array(), false, true);
		//wp_enqueue_script('require');
		
		wp_register_script('global', get_bloginfo('template_url') . '/assets/js/dist/global.js', null, false, true);
		wp_enqueue_script('global');
	}
	//wp_register_script('modernizr', get_bloginfo('template_url') . '/js/modernizr.js');
	//wp_enqueue_script('modernizr');

	wp_enqueue_style('global', get_bloginfo('template_url') . '/assets/css/global.css');
}

//Add Featured Image Support
add_theme_support('post-thumbnails');

// Add Browser to body class
add_filter('body_class','browser_body_class');
function browser_body_class($classes) {
	global $is_lynx, $is_gecko, $is_IE, $is_opera, $is_NS4, $is_safari, $is_chrome, $is_iphone;
	if($is_lynx) $classes[] = 'lynx';
	elseif($is_gecko) $classes[] = 'gecko';
	elseif($is_opera) $classes[] = 'opera';
	elseif($is_NS4) $classes[] = 'ns4';
	elseif($is_safari) $classes[] = 'safari';
	elseif($is_chrome) $classes[] = 'chrome';
	elseif($is_IE) $classes[] = 'ie';
	else $classes[] = 'unknown';
	if($is_iphone) $classes[] = 'iphone';
	return $classes;
}

// Clean up the <head>
function removeHeadLinks() {
	remove_action('wp_head', 'rsd_link');
	remove_action('wp_head', 'wlwmanifest_link');
}
add_action('init', 'removeHeadLinks');
remove_action('wp_head', 'wp_generator');

function register_menus() {
	register_nav_menus(
		array(
			'main-nav' => 'Main Navigation',
			'secondary-nav' => 'Secondary Navigation',
			'sidebar-menu' => 'Sidebar Menu'
		)
	);
}
add_action( 'init', 'register_menus' );

function register_widgets(){

	register_sidebar( array(
		'name' => __( 'Sidebar' ),
		'id' => 'main-sidebar',
		'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
		'after_widget' => '</li>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );

}//end register_widgets()
add_action( 'widgets_init', 'register_widgets' );

//////////////////////////////////////////////////////////////
// Custom Post Types
/////////////////////////////////////////////////////////////

//Projects
function register_projects() {

	$labels = array(
			'name' => __( 'Projects' ),
			'singular_name' => __( 'Project' ),
			'add_new' => __( 'Add New' ),
			'add_new_item' => __( 'Add New Project' ),
			'edit' => __( 'Edit' ),
			'edit_item' => __( 'Edit Project' ),
			'new_item' => __( 'New Project' ),
			'view' => __( 'View Project' ),
			'view_item' => __( 'View Project' ),
			'search_items' => __( 'Search Projects' ),
			'not_found' => __( 'No projects found' ),
			'not_found_in_trash' => __( 'No projects found in Trash' ),
			'parent' => __( 'Parent Project' ),
	);

	$args = array(
			'labels' => $labels,
			'public' => true,
			'publicly_queryable' => true,
			'show_ui' => true,
			'menu_icon' => get_template_directory_uri(). '/assets/images/blue-folder-stand.png',
			'query_var' => true,
			'rewrite' => array( 'slug' => 'project', 'hierarchical' => true, 'with_front' => false ),
			'capability_type' => 'post',
			'hierarchical' => false,
			'menu_position' => null,
			'supports' => array('title', 'editor', 'thumbnail', 'comments', 'revisions', 'excerpt')
	);

	register_post_type( 'project' , $args );
}
add_action( 'init', 'register_projects' );

//Skills
function register_skills() {
	$labels = array(
			'name' => __( 'Skills' ),
			'singular_name' => __( 'Skill' ),
			'search_items' =>  __( 'Search Skills' ),
			'all_items' => __( 'All Skills' ),
			'parent_item' => __( 'Parent Skill' ),
			'parent_item_colon' => __( 'Parent Skill:' ),
			'edit_item' => __( 'Edit Skill' ),
			'update_item' => __( 'Update Skill' ),
			'add_new_item' => __( 'Add New Skill' ),
			'new_item_name' => __( 'New Skill Name' )
	);

	register_taxonomy('skill','project',array(
	'hierarchical' => false,
	'labels' => $labels
	));
}
add_action( 'init', 'register_skills' );