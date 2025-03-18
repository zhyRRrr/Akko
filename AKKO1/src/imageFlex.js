document.addEventListener('DOMContentLoaded', function () {
    // 获取DOM元素
    const wrapper = document.querySelector('.image-flex-wrapper');
    const cards = document.querySelectorAll('.image-card');
    let isMobile = false;

    // 检测设备是否为移动端
    function checkMobile() {
        isMobile = window.innerWidth <= 375;
        updateLayout();
    }

    // 更新布局
    function updateLayout() {
        if (isMobile) {
            wrapper.classList.add('mobile-layout');
            cards.forEach(card => card.classList.add('mobile-card'));
        } else {
            wrapper.classList.remove('mobile-layout');
            cards.forEach(card => card.classList.remove('mobile-card'));
        }
    }

    // 初始化
    checkMobile();

    // 监听窗口大小变化
    window.addEventListener('resize', checkMobile);
}); 