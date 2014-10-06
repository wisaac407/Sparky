<?php global $p; ?>
<div class="project thumbnail small <?php echo $p; ?>" id="project-<?php echo $post->ID; ?>">
	<a href="<?php the_permalink(); ?>" rel="bookmark" >	
		<?php the_post_thumbnail("ttrust_project_thumb", array('class' => 'fade', 'alt' => ''.get_the_title().'', 'title' => ''.get_the_title().'')); ?>
		<div class="title fade"><h4><?php the_title(); ?></h4></div>
	</a>
</div>