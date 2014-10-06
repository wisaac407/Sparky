<!DOCTYPE html>
<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7" <?php language_attributes() ?>><![endif]-->
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8" <?php language_attributes() ?>><![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9" <?php language_attributes() ?>><![endif]-->
<!--[if gt IE 8]><!--><html class="no-js" <?php language_attributes() ?>><!--<![endif]-->
    <head>
        <meta charset="<?php bloginfo( 'charset' ) ?>">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width">
        <title><?php wp_title( '|', true, 'right' ) ?></title>
		<meta name="author" content="">
		<link rel="author" href="">
		<?php if (!WP_DEBUG):?>
		<script type="text/javascript">
			var libs = [];
			var define = function(mod, deps, func){libs[mod]=(func || deps)()};
			var require = function(mods, func){func(libs[mods[0]]);};
			require.config = function(){};
		</script>
		<?php endif;?>
		<?php wp_head() ?>
    </head>
    <body <?php body_class() ?>>
		<header id="page-header">
			<div>
				<h1 id="page-logo">
					<?php if (!is_front_page()): ?>
						<a href="<?php bloginfo('url') ?>" title="<?php bloginfo('name') ?> - <?php bloginfo('description') ?>">
							<?php bloginfo('name') ?>
						</a>
					<?php else: ?>
						<span>
							<?php bloginfo('name') ?>
						</span>
					<?php endif; ?>
				</h1>
			</div>
		</header>
		<div class="navbar navbar-default navbar-fixed-bottom">
			<div class="container-fluid">
				<?php wp_nav_menu(array(
					'theme_location'  => 'main-nav',
					'container'       => 'nav'
				)) ?>
			</div>
		</div>
		<div id="content-wrap" class="container">
