export default function Menu() {
    const instance = {};

    const config = {
        selectors: {
            dropdown: '.js-dropdown',
            dropdownLabel: '.dropdown__label',
            dropdownOptions: '.dropdown__options',
        },
        classes: {
            isOpen: 'is-open',
        }
    };

    const toggleDropdown = () => {
        if (!instance.dropdownLabel.classList.contains(config.classes.isOpen)) {
            instance.dropdownLabel.classList.add(config.classes.isOpen);
            instance.dropdownOptions.classList.add(config.classes.isOpen);
        } else {
            instance.dropdownLabel.classList.remove(config.classes.isOpen);
            instance.dropdownOptions.classList.remove(config.classes.isOpen);
        }
    };

    const init = () => {
        instance.dropdown = document.querySelector(config.selectors.dropdown);

        if (instance.dropdown) {
            instance.dropdownLabel = instance.dropdown.querySelector(config.selectors.dropdownLabel);
            instance.dropdownOptions = instance.dropdown.querySelector(config.selectors.dropdownOptions);

            instance.dropdownLabel.addEventListener('click', toggleDropdown);
        }
    }

    init();
};
