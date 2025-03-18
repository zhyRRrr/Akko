document.addEventListener('DOMContentLoaded', function () {
    // 检测窗口尺寸变化
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        const productGridContainer = document.querySelector('.product-grid-container');

        if (productGridContainer) {
            if (isMobile) {
                // 添加移动端类
                productGridContainer.classList.add('mobile-view');

                // 确保所有子元素跟随父元素缩放
                const gridItems = document.querySelectorAll('.grid-item');
                gridItems.forEach(item => {
                    item.classList.add('mobile-item');
                });

                // 计算缩放比例，保持768px的布局比例，不设置最小宽度限制
                const scale = window.innerWidth / 768;

                // 应用缩放以保持768px的布局比例
                if (window.innerWidth <= 768) {
                    // 设置固定宽度为768px，然后应用缩放
                    productGridContainer.style.width = '768px';
                    productGridContainer.style.transform = `scale(${scale})`;
                    productGridContainer.style.transformOrigin = 'top left';

                    // 调整容器高度以适应缩放
                    const gridLayout = document.querySelector('.grid-layout');
                    if (gridLayout) {
                        const originalHeight = 85.33 * 768 / 100; // 原始高度（基于768px宽度和85.33%的比例）
                        gridLayout.style.height = `${originalHeight}px`;
                        gridLayout.style.paddingBottom = '0';

                        // 设置容器高度以适应缩放后的内容
                        productGridContainer.style.height = `${originalHeight * scale}px`;
                    }

                    // 调整文字大小为calc(N * 100vw / 375)格式
                    adjustTextSizes();
                }
            } else {
                // 移除移动端类
                productGridContainer.classList.remove('mobile-view');

                // 移除移动端子元素类
                const gridItems = document.querySelectorAll('.grid-item');
                gridItems.forEach(item => {
                    item.classList.remove('mobile-item');
                });

                // 重置变换和宽度
                productGridContainer.style.transform = '';
                productGridContainer.style.transformOrigin = '';
                productGridContainer.style.width = '';
                productGridContainer.style.height = '';

                // 恢复原始高度设置
                const gridLayout = document.querySelector('.grid-layout');
                if (gridLayout) {
                    gridLayout.style.height = '';
                    gridLayout.style.paddingBottom = '';
                }

                // 重置文字大小
                resetTextSizes();
            }
        }
    }

    // 调整文字大小为calc(N * 100vw / 375)格式
    function adjustTextSizes() {
        // 设置主要区域标题
        const keyboardsTitle = document.querySelector('.keyboards.mobile-item h2');
        const mouseTitle = document.querySelector('.mouse.mobile-item h2');
        const diyKitTitle = document.querySelector('.diy-kit.mobile-item h2');

        if (keyboardsTitle) keyboardsTitle.style.fontSize = 'calc(24 * 100vw / 375)';
        if (mouseTitle) mouseTitle.style.fontSize = 'calc(24 * 100vw / 375)';
        if (diyKitTitle) diyKitTitle.style.fontSize = 'calc(24 * 100vw / 375)';

        // 设置较小区域标题
        const switchTitle = document.querySelector('.switch.mobile-item h2');
        const keycapsTitle = document.querySelector('.keycaps.mobile-item h2');

        if (switchTitle) switchTitle.style.fontSize = 'calc(21 * 100vw / 375)';
        if (keycapsTitle) keycapsTitle.style.fontSize = 'calc(21 * 100vw / 375)';

        // 设置所有移动端标题
        const allMobileTitles = document.querySelectorAll('.mobile-item h2');
        allMobileTitles.forEach(title => {
            if (!title.style.fontSize) {
                title.style.fontSize = 'calc(24 * 100vw / 375)';
            }
        });
    }

    // 重置文字大小
    function resetTextSizes() {
        const allTitles = document.querySelectorAll('.grid-item h2');
        allTitles.forEach(title => {
            title.style.fontSize = '';
        });
    }

    // 初始化时检测一次尺寸
    handleResize();

    // 监听窗口尺寸变化
    window.addEventListener('resize', handleResize);
}); 