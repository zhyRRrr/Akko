document.addEventListener('DOMContentLoaded', function () {
    // 检测设备是否为移动端
    let isMobile = window.innerWidth <= 768;

    // IP合作部分元素
    const ipCollaborationContainer = document.querySelector('.ip-collaboration-container');
    const mobileTextContainer = document.querySelector('.mobile-text-container');
    const textContainer = document.querySelector('.text-container');

    // 检测设备类型变化并应用相应样式
    function checkMobile() {
        isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // 确保移动端显示正确
            textContainer.style.display = 'none';
            mobileTextContainer.style.display = 'flex';

            // 应用移动端自适应样式
            ipCollaborationContainer.style.height = 'calc(195* 100vw / 375)';
            ipCollaborationContainer.style.maxWidth = '100%';
        } else {
            // PC端显示
            textContainer.style.display = 'flex';
            mobileTextContainer.style.display = 'none';

            // 恢复PC端样式
            ipCollaborationContainer.style.height = '300px';
            ipCollaborationContainer.style.maxWidth = '1920px';
        }
    }

    // 初始化
    checkMobile();

    // 监听窗口大小变化
    window.addEventListener('resize', checkMobile);
}); 