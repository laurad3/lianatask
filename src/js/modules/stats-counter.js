export default function StatsCounter() {
    const instance = {};

    const config = {
        selectors: {
            stats: '.js-stats',
            statCounter: '.js-stat-counter',
        },
        options: {
            threshold: 0,
            rootMargin: '0px 0px -100px 0px',
        },
        speed: 150,
    };

    const startCounters = (target) => {
        const counters = target.querySelectorAll(config.selectors.statCounter);

        if (!counters) {
            return;
        }

        counters.forEach(counter => {
            const target = Number(counter.getAttribute('data-count-target'));
            const inc = Math.round(target / config.speed);

            const updateCount = () => {
                const count = Number(counter.innerText);

                if (count < target) {
                    counter.innerText = count + inc;
    
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    };

    const init = () => {
        instance.stats = document.querySelector(config.selectors.stats);

        if (!instance.stats) {
            return;
        }

        const countObserver = new IntersectionObserver((entries, countObserver) => {
            entries.forEach((entry, index) => {
                if (!entry.isIntersecting) {
                    return;
                }

                startCounters(entry.target);
                countObserver.unobserve(entry.target);
            });
        }, config.options);

        countObserver.observe(instance.stats);
    }

    init();
};
