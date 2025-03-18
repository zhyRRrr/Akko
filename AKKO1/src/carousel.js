document.addEventListener('DOMContentLoaded', function () {
    // 定义轮播图数据
    const items = [
        {
            image: "./src/assets/slide1.jpg",
            title: "MOD007v3",
            subtitle: "The Year Of Dragon",
            description: "8k Polling Rate | 3-Tone Anodized | Hall Effect",
        },
        {
            image: "./src/assets/slide1.jpg",
            title: "MOD007v3",
            subtitle: "The Year Of Dragon",
            description: "8k Polling Rate | 3-Tone Anodized | Hall Effect",
        },
        {
            image: "./src/assets/slide1.jpg",
            title: "MOD007v3",
            subtitle: "The Year Of Dragon",
            description: "8k Polling Rate | 3-Tone Anodized | Hall Effect",
        },
    ];

    // 初始化变量
    let currentIndex = 0;
    let progressBars = [0, 0, 0];
    const intervalTime = 5000;
    let progressInterval;
    let swiper;
    let autoplayPaused = false;
    let isMobile = window.innerWidth <= 768; // 添加移动设备检测

    // 检测屏幕大小变化
    window.addEventListener('resize', function () {
        const wasMobile = isMobile;
        isMobile = window.innerWidth <= 768;

        // 只有在移动状态变更时才重新初始化
        if (wasMobile !== isMobile) {
            if (swiper) {
                swiper.destroy(true, true);
            }
            initSwiper();
        }
    });

    // 初始化Swiper
    function initSwiper() {
        swiper = new Swiper('.carousel', {
            slidesPerView: 1,
            loop: true,
            speed: 500,
            allowTouchMove: true,
            autoplay: {
                delay: intervalTime,
                disableOnInteraction: false,
                reverseDirection: true
            },
            effect: 'fade',
            on: {
                init: function () {
                    currentIndex = this.realIndex;
                    startProgress();
                },
                slideChange: function () {
                    currentIndex = this.realIndex;
                    resetAndStartProgress();
                },
                touchStart: function () {
                    // 触摸开始时暂停自动轮播
                    pauseAutoplay();
                },
                touchEnd: function () {
                    // 触摸结束后恢复自动轮播
                    resumeAutoplay();
                }
            }
        });
    }

    // 开始进度条逻辑
    function startProgress() {
        clearInterval(progressInterval); // 清除之前的定时器

        // 确保所有进度条归零
        resetProgressBars();

        progressInterval = setInterval(() => {
            if (!autoplayPaused) {
                updateProgress();
            }
        }, 100);
    }

    // 重置并重新开始进度
    function resetAndStartProgress() {
        clearInterval(progressInterval);
        resetProgressBars();
        startProgress();
    }

    // 重置所有进度条
    function resetProgressBars() {
        progressBars = progressBars.map(() => 0);
        updateProgressBars();
    }

    // 更新进度
    function updateProgress() {
        const increment = 100 / (intervalTime / 100);
        progressBars[currentIndex] += increment;

        if (progressBars[currentIndex] >= 100) {
            // 自动向右滑动
            prevSlide();
        } else {
            // 更新DOM中的进度条
            updateProgressBars();
        }
    }

    // 更新DOM中的进度条
    function updateProgressBars() {
        const progressBarElements = document.querySelectorAll('.progress-bar');
        progressBars.forEach((progress, index) => {
            progressBarElements[index].style.width = `${progress}%`;
        });
    }

    // 暂停自动轮播
    function pauseAutoplay() {
        autoplayPaused = true;
        if (swiper && swiper.autoplay) {
            swiper.autoplay.stop();
        }
    }

    // 恢复自动轮播
    function resumeAutoplay() {
        autoplayPaused = false;
        if (swiper && swiper.autoplay) {
            swiper.autoplay.start();
            resetAndStartProgress();
        }
    }

    // 上一张（实际是向右）
    function prevSlide() {
        if (swiper) {
            swiper.slideNext();
        }
    }

    // 下一张（实际是向左）
    function nextSlide() {
        if (swiper) {
            swiper.slidePrev();
        }
    }

    // 初始化轮播图HTML结构
    function initCarouselHTML() {
        const carouselContainer = document.querySelector('.carousel-container');

        // 创建Swiper容器
        const swiperElement = document.createElement('div');
        swiperElement.className = 'swiper carousel';

        // 创建Swiper包装器
        const swiperWrapper = document.createElement('div');
        swiperWrapper.className = 'swiper-wrapper';

        // 添加轮播项
        items.forEach((item, index) => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide carousel-item';

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.title;

            const caption = document.createElement('div');
            caption.className = 'carousel-caption';

            const captionContent = document.createElement('div');
            captionContent.className = 'caption-content';
            captionContent.style.maxWidth = '1280px';
            captionContent.style.width = '100%';
            captionContent.style.margin = '0 auto';

            const h2 = document.createElement('h2');
            h2.textContent = item.title;

            const h3 = document.createElement('h3');
            h3.textContent = item.subtitle;

            const p = document.createElement('p');
            p.textContent = item.description;

            captionContent.appendChild(h2);
            captionContent.appendChild(h3);
            captionContent.appendChild(p);
            caption.appendChild(captionContent);

            slide.appendChild(img);
            slide.appendChild(caption);

            swiperWrapper.appendChild(slide);
        });

        swiperElement.appendChild(swiperWrapper);
        carouselContainer.appendChild(swiperElement);

        // 创建自定义进度指示器
        const progressIndicators = document.createElement('div');
        progressIndicators.className = 'progress-indicators';

        items.forEach((_, index) => {
            const progressBarContainer = document.createElement('div');
            progressBarContainer.className = 'progress-bar-container';

            // 添加点击事件处理器
            progressBarContainer.addEventListener('click', function () {
                pauseAutoplay();
                goToSlide(index);

                // 短暂延迟后恢复自动轮播
                setTimeout(resumeAutoplay, 100);
            });

            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.style.width = '0%';

            progressBarContainer.appendChild(progressBar);
            progressIndicators.appendChild(progressBarContainer);
        });

        carouselContainer.appendChild(progressIndicators);
    }

    // 跳转到指定幻灯片
    function goToSlide(index) {
        if (swiper) {
            swiper.slideToLoop(index);
        }
    }

    // 初始化
    initCarouselHTML();

    // 等待一小段时间确保DOM已完全渲染
    setTimeout(() => {
        initSwiper();
    }, 100);

    // 清理资源
    window.addEventListener('beforeunload', function () {
        clearInterval(progressInterval);
        if (swiper && swiper.destroy) {
            swiper.destroy();
        }
    });
}); 