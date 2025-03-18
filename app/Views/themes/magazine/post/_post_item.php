<div class="post-item<?= checkPostImg($postItem, 'class'); ?>">
    <?php if (!empty($showLabel)): ?>
        <a href="<?= generateCategoryURLById($postItem->category_id, $baseCategories); ?>">
            <span class="badge badge-category" style="background-color: <?= esc($postItem->category_color); ?>"><?= esc($postItem->category_name); ?></span>
        </a>
    <?php endif;
    if (checkPostImg($postItem)): ?>
        <div class="image ratio" style=" height: 350px; ">
            <a href="<?= generatePostURL($postItem); ?>"<?php postURLNewTab($postItem); ?>>
                <img style="    object-fit: fill;" src="<?= IMG_BASE64_450x280; ?>" data-src="<?= getPostImage($postItem, 'mid'); ?>" alt="<?= esc($postItem->title); ?>" class="img-fluid lazyload" width="416" height="247.417"/>
                <?php getMediaIcon($postItem, 'media-icon'); ?>
            </a>
        </div>
    <?php endif; ?>
    <h3 class="title" style="
    text-align: center;
    font-size: 15px; margin-bottom: 0;
"><a href="<?= generatePostURL($postItem); ?>"<?php postURLNewTab($postItem); ?>><?= esc(characterLimiter($postItem->title, POST_DISPLAY_TITLE_LIMIT, '...')); ?></a></h3>
    <p class="post-meta" style=" margin: 0; "><?= loadView('post/_post_meta', ['postItem' => $postItem]); ?></p>
    <p class="description" style="     line-height: normal;text-align: center; font-size: 9px; "><?= esc(characterLimiter($postItem->summary, POST_DISPLAY_SUMMARY_LIMIT, '...')); ?></p>
</div>