document.addEventListener('DOMContentLoaded', function () {
    // 检测设备是否为移动端
    let isMobile = window.innerWidth <= 768;
    let swiperInstance = null;

    // 初始化Swiper
    function initSwiper() {
        if (isMobile) {
            swiperInstance = new Swiper('.mobile-background-swiper', {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                loopAdditionalSlides: 2,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                updateOnWindowResize: true, // 窗口大小变化时更新
                observer: true, // 监视DOM变化
                observeParents: true, // 监视父元素变化
                autoHeight: true, // 允许自动高度
            });

            // 确保图片加载后更新Swiper
            const images = document.querySelectorAll('.mobile-background-image img');
            images.forEach(img => {
                img.onload = function () {
                    if (swiperInstance) {
                        swiperInstance.update();
                    }
                };
            });
        }
    }

    // 检测设备类型变化
    function checkMobile() {
        const wasMobile = isMobile;
        isMobile = window.innerWidth <= 768;

        // 如果设备类型发生变化
        if (wasMobile !== isMobile) {
            if (isMobile) {
                initSwiper();
            } else if (swiperInstance) {
                swiperInstance.destroy();
                swiperInstance = null;
            }
        } else if (isMobile && swiperInstance) {
            // 如果仍然是移动设备，更新Swiper
            swiperInstance.update();
        }
    }

    // 初始化
    initSwiper();

    // 监听窗口大小变化
    window.addEventListener('resize', checkMobile);
}); 