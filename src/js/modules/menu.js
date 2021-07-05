export default function Menu() {
    const instance = {};

    const config = {
        selectors: {
            menuIcon: '.js-menu-icon',
            navMenu: '.js-nav-menu',
            mainContent: '.js-main-content',
            nav: '.js-nav',
        },
        classes: {
            isOpen: 'is-open',
            isSticky: 'is-sticky',
            isActive: 'is-active',
        }
    };

    const toggleClass = () => {
        const navMenuScrollHeight = instance.navMenu.scrollHeight;

        if (!instance.navMenu.classList.contains(config.classes.isOpen)) {
            instance.navMenu.classList.add(config.classes.isOpen);
            instance.navMenu.style.height = `${navMenuScrollHeight}px`;
            instance.menuIcon.classList.add(config.classes.isActive);
        } else {
            instance.navMenu.classList.remove(config.classes.isOpen);
            instance.navMenu.style.height = '0';
            instance.menuIcon.classList.remove(config.classes.isActive);
        }
    };

    const toggleStickyNav = () => {
        const myScroll = window.pageYOffset;

        if (myScroll >= instance.initialNavTopPosition) {
            instance.nav.classList.add(config.classes.isSticky);
            instance.mainContent.style.marginTop = `${instance.nav.clientHeight}px`;
        } else if (myScroll <= instance.initialNavTopPosition) {
            instance.nav.classList.remove(config.classes.isSticky);
            instance.mainContent.style.marginTop = '0';
        }
    };

    const init = () => {
        instance.menuIcon = document.querySelector(config.selectors.menuIcon);
        instance.navMenu = document.querySelector(config.selectors.navMenu);
        instance.mainContent = document.querySelector(config.selectors.mainContent);
        instance.nav = document.querySelector(config.selectors.nav);
        instance.initialNavTopPosition = instance.nav.offsetTop;

        instance.menuIcon.addEventListener('click', toggleClass);
        document.addEventListener('scroll', toggleStickyNav);
    }

    init();
};
