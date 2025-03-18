<img src="<?=base_url()?>/assets/bg.jpg" alt="">

<?php $limit = 15;
$categoryPosts = getPostsByCategoryId($category->id, $baseCategories, $baseLatestCategoryPosts); ?>



<section class="section section-videos" >
    <div class="container-xl">
        <div class="section-title">
            <h3 class="title"><?= esc($category->name); ?></h3>
        </div>
        <div class="row gx-1 gy-1">
        <div class="section-content category-slider-container" <?= $rtl == true ? 'dir="rtl"' : ''; ?>>
            <div id="category_slider_<?= $category->id; ?>" class="row slider-row">
                <?php if (!empty($categoryPosts)):
                    $i = 0;
                    foreach ($categoryPosts as $item): ?>
                        <div class="col-lg-3 slider-col">
                            <div class="post-item">
                                <a href="<?= generateCategoryURLById($item->category_id, $baseCategories); ?>">
                                    <span class="badge badge-category" style="background-color: <?= esc($item->category_color); ?>"><?= esc($item->category_name); ?></span>
                                </a>
                                <?php if (checkPostImg($item)): ?>
                                    <div class="image ratio img-slider-ratio">
                                        <a href="<?= generatePostURL($item); ?>" class="img-link"<?php postURLNewTab($item); ?>>
                                            <img src="<?= getPostImage($item, 'slider'); ?>" alt="<?= esc($item->title); ?>" class="img-fluid" width="306" height="234"/>
                                            <?php getMediaIcon($item, 'media-icon'); ?>
                                        </a>
                                    </div>
                                <?php endif; ?>
                                <h3 class="title">
                                    <a href="<?= generatePostURL($item); ?>" class="img-link"<?php postURLNewTab($item); ?>>
                                        <?= esc(characterLimiter($item->title, POST_DISPLAY_TITLE_LIMIT, '...')); ?>
                                    </a>
                                </h3>
                                <p class="small-post-meta">
                                    <?= loadView('post/_post_meta', ['postItem' => $item]); ?>
                                </p>
                            </div>
                        </div>
                        <?php $i++;
                    endforeach;
                endif; ?>
            </div>
        </div>
        </div>
    </div>
</section>