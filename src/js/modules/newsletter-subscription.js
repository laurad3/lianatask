export default function NewsletterSubscription() {
    const instance = {};

    const config = {
        classes: {
            newsletterForm: '.js-newsletter-form',
            nav: '.js-nav',
            pageMessages: '.js-page-messages',
        }
    };

    const submitForm = e => {
        e.preventDefault();
        const email = instance.newsletterForm.querySelector('.input-text[name="email"]');

        if (email) {
            const navHeight = instance.nav.offsetHeight;
            const pageMessagesHeight = instance.pageMessages.offsetHeight;
            instance.nav.style.transform = `translateY(-${navHeight}px)`;
            instance.pageMessages.style.top = 0;
            

            setTimeout(() => {
                instance.pageMessages.style.top = `-${pageMessagesHeight}px`;
                instance.nav.style.transform = 'translateY(0)';
            }, 3000);
        }
    };

    const init = () => {
        instance.newsletterForm = document.querySelector(config.classes.newsletterForm);
        instance.nav = document.querySelector(config.classes.nav);
        instance.pageMessages = document.querySelector(config.classes.pageMessages);
    
        instance.newsletterForm.addEventListener('submit', submitForm);
    };

    init();
};