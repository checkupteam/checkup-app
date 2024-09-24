const hideTabBar = (): void => {
    const tabBar = document.getElementById('app-tab-bar');
    if (tabBar !== null) {
        tabBar.style.display = 'none';
    }
};

const showTabBar = (): void => {
    const tabBar = document.getElementById('app-tab-bar');
    if (tabBar !== null) {
        tabBar.style.display = 'flex';
    }
};

export { hideTabBar, showTabBar };
