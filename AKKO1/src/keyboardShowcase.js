document.addEventListener('DOMContentLoaded', function () {
    // 获取DOM元素
    const showcaseRef = document.querySelector('.keyboard-showcase');
    const keyboardMask = document.querySelector('.keyboard-mask');
    let lastX = null;
    let velocity = 0;
    const dampingFactor = 0; // 阻尼系数设为0，让滑动更直接
    const sensitivityFactor = 2.5; // 增加灵敏度系数
    let currentScrollPosition = 0;
    let isMobile = window.innerWidth <= 768;
    let currentMobilePage = 0;
    let swiperInstance = null;
    let autoplayInterval = null;

    // 设置初始滚动位置
    const initialScrollPosition = 500;

    // 检测设备是否为移动端
    function checkMobile() {
        isMobile = window.innerWidth <= 768;
        toggleView();
        adjustMobileCardHeight();
    }

    // 调整移动端卡片高度
    function adjustMobileCardHeight() {
        if (isMobile) {
            const mobileCards = document.querySelectorAll('.mobile-keyboard-card');
            mobileCards.forEach(card => {
                card.style.height = `calc(416 * 100vw / 375)`;
            });

            const cardLabels = document.querySelectorAll('.mobile-keyboard-card .card-label');
            cardLabels.forEach(label => {
                label.style.fontSize = `calc(14 * 100vw / 375)`;
            });
        }
    }

    // 切换PC/移动端视图
    function toggleView() {
        const container = document.querySelector('.container');
        const mobileContainer = document.querySelector('.mobile-showcase-container');

        if (isMobile) {
            container.style.display = 'none';
            mobileContainer.style.display = 'block';
            initMobileSwiper();
        } else {
            container.style.display = 'block';
            mobileContainer.style.display = 'none';
            if (swiperInstance) {
                swiperInstance.destroy();
                swiperInstance = null;
            }
        }
    }

    // 计算遮罩透明度
    function updateMaskOpacity() {
        if (!showcaseRef) return;

        const maxScroll = showcaseRef.scrollWidth - showcaseRef.clientWidth;
        const progress = currentScrollPosition / maxScroll;

        if (progress >= 0.95) {
            keyboardMask.style.opacity = 0;
        } else if (progress <= 0.05) {
            keyboardMask.style.opacity = 0.8;
        } else {
            keyboardMask.style.opacity = 0.8 * (1 - progress);
        }
    }

    // 监听滚动事件
    function handleScroll() {
        if (showcaseRef) {
            currentScrollPosition = showcaseRef.scrollLeft;
            updateMaskOpacity();
        }
    }

    // 处理拖拽
    function onDrag(e) {
        e.preventDefault();
        const currentX = e.pageX;

        if (lastX === null) {
            lastX = currentX;
            return;
        }

        const deltaX = (currentX - lastX) * sensitivityFactor;
        velocity = deltaX * dampingFactor;

        if (showcaseRef) {
            showcaseRef.scrollLeft -= deltaX;
            currentScrollPosition = showcaseRef.scrollLeft;
            updateMaskOpacity();
        }

        lastX = currentX;
    }

    function endDrag() {
        lastX = null;
        velocity = 0;
    }

    // 初始化移动端Swiper
    function initMobileSwiper() {
        if (swiperInstance) {
            swiperInstance.destroy();
        }

        swiperInstance = new Swiper('.mobile-showcase-swiper', {
            slidesPerView: 1,
            spaceBetween: 0,
            centeredSlides: true,
            loop: true,
            loopAdditionalSlides: 2,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            on: {
                slideChange: function () {
                    updateMobileIndicators(this.realIndex);
                },
                init: function () {
                    adjustMobileCardHeight();
                }
            }
        });
    }

    // 更新移动端指示器
    function updateMobileIndicators(activeIndex) {
        const indicators = document.querySelectorAll('.mobile-showcase-container .mobile-indicator');
        indicators.forEach((indicator, index) => {
            if (index === activeIndex) {
                indicator.classList.add('mobile-indicator-active');
            } else {
                indicator.classList.remove('mobile-indicator-active');
            }
        });
    }

    // 添加事件监听
    if (showcaseRef) {
        showcaseRef.addEventListener('mousemove', onDrag);
        showcaseRef.addEventListener('mouseleave', endDrag);
        showcaseRef.addEventListener('scroll', handleScroll);

        // 设置初始滚动位置
        showcaseRef.scrollLeft = initialScrollPosition;
        currentScrollPosition = initialScrollPosition;
        updateMaskOpacity();
    }

    // 添加移动端指示器点击事件
    const indicators = document.querySelectorAll('.mobile-showcase-container .mobile-indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (swiperInstance) {
                swiperInstance.slideToLoop(index);
            }
        });
    });

    // 初始化
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // 监听窗口大小变化时调整高度
    window.addEventListener('resize', adjustMobileCardHeight);
}); 
