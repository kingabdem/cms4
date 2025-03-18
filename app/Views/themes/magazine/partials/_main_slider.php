<div style="top: -146px; height: 100vh; overflow: hidden; margin-bottom: -120px;" id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">

    <div style="background-color: #5b57573d; width: 100%; height: 100%; z-index: 55555;">
    </div>

    <?php 
    $count = 0;
    foreach ($sliderPosts as $item){
        if ($count < SLIDER_POSTS_LIMIT){ ?>
            <div class="carousel-item <?php if($count==0) echo "active"; ?>" data-bs-interval="10000">
                <img src="<?= getPostImage($item, 'slider'); ?>" alt="<?= esc($item->title); ?>" class="d-block w-100" />
                <div style="left: 65px;" class="carousel-caption d-none d-md-block">
                    <h2 class="title" style="color: white; text-align: left; font-size: 25px;">
                        <?= esc(characterLimiter($item->title, 120, '...')); ?>
                    </h2>
                </div>
            </div>
        <?php };
        $count++;
    } ?>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

<!-- Add custom CSS for black shadow -->
<style>
  .carousel-item {
    position: relative;
  }

  .carousel-item img {
    width: 100%;
    height: auto;
  }

  /* Add the black shadow effect */
  .carousel-item::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.5));
    z-index: 1;
  }

  .carousel-caption {
    position: relative;
    z-index: 2;
  }
</style>



<!-- 

<section class="section section-featured">
    <div class="container">
        <div class="row">
            <div class="col-md-12 col-lg-12 col-featured-left">
                <div class="main-slider-container">
                    <div class="main-slider" id="main-slider">
                        <?php $count = 0;
                        foreach ($sliderPosts as $item):
                            if ($count < SLIDER_POSTS_LIMIT):?>
                                <div class="main-slider-item">
                                    <a href="<?= generatePostURL($item); ?>" class="img-link"<?php postURLNewTab($item); ?> aria-label="post">
                                        <img src="<?= IMG_BASE64_1x1; ?>" data-lazy="<?= getPostImage($item, 'slider'); ?>" alt="<?= esc($item->title); ?>" class="img-cover" width="687" height="526"/>
                                        <?php getMediaIcon($item, 'media-icon-lg'); ?>
                                    </a>
                                    <div class="caption">
                                        <a href="<?= generateCategoryURLById($item->category_id, $baseCategories); ?>">
                                            <span class="badge badge-category" style="background-color: <?= esc($item->category_color); ?>"><?= esc($item->category_name); ?></span>
                                        </a>
                                        <?php if ($count < 2): ?>
                                            <h2 class="title"><?= esc(characterLimiter($item->title, 120, '...')); ?></h2>
                                        <?php else: ?>
                                            <h3 class="title"><?= esc(characterLimiter($item->title, 120, '...')); ?></h3>
                                        <?php endif; ?>
                                        <p class="post-meta">
                                            <?= loadView('post/_post_meta', ['postItem' => $item]); ?>
                                        </p>
                                    </div>
                                </div>
                            <?php endif;
                            $count++;
                        endforeach; ?>
                    </div>
                    <div id="main-slider-nav" class="main-slider-nav">
                        <button class="prev" aria-label="prev">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 404.258 404.258">
                                <polygon points="289.927,18 265.927,0 114.331,202.129 265.927,404.258 289.927,386.258 151.831,202.129 "/>
                            </svg>
                        </button>
                        <button class="next" aria-label="next">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 404.258 404.258">
                                <polygon points="138.331,0 114.331,18 252.427,202.129 114.331,386.258 138.331,404.258 289.927,202.129 "/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section> -->