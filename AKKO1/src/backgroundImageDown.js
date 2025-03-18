document.addEventListener('DOMContentLoaded', function () {
    // 检测设备是否为移动端
    let isMobile = window.innerWidth <= 768;

    // 获取元素
    const container = document.querySelector('.background-image-down-container');
    const pcBackground = document.querySelector('.background-image-down');
    const mobileBackground = document.querySelector('.mobile-background-image-down');

    // 初始化显示
    function updateDisplay() {
        if (isMobile) {
            pcBackground.style.display = 'none';
            mobileBackground.style.display = 'block';

            // 根据屏幕宽度调整容器高度 - 保持图片比例
            // 在768px下高度为 461px * (768/375)，随着屏幕宽度变化等比例缩放
            const screenWidth = window.innerWidth;
            const baseHeight = 461 * (768 / 375); // 768px下的基准高度
            const imageHeight = baseHeight * (screenWidth / 768); // 根据当前屏幕宽度等比例缩放

            container.style.height = `${imageHeight}px`;

            // 确保使用新图片
            mobileBackground.style.backgroundImage = 'url("https://en.akkogear.com/wp-content/uploads/2025/03/KIT-Custom-Keyboard-SJ-1.jpg")';
        } else {
            pcBackground.style.display = 'block';
            mobileBackground.style.display = 'none';
            container.style.height = '1000px';
        }
    }

    // 检测设备类型变化
    function checkMobile() {
        const wasMobile = isMobile;
        isMobile = window.innerWidth <= 768;

        // 如果设备类型发生变化
        if (wasMobile !== isMobile) {
            updateDisplay();
        } else if (isMobile) {
            // 如果仍然是移动设备，更新布局
            updateDisplay();
        }
    }

    // 初始化
    updateDisplay();

    // 监听窗口大小变化
    window.addEventListener('resize', checkMobile);
}); 