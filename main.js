/* utils */
let scrollPosition = 0;
const $body = document.querySelector('body');

const utility = {
    setVH: function() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    },
    debounce: function(callback, wait, immediate) {
        let timeout;
        return function() {
            let context = this;
            let args = arguments;
            let later = function() {
                timeout = null;
                if (!immediate) {
                    callback.apply(context, args);
                }
            };
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                callback.apply(context, args);
            }
        }
    },
    throttle: function(callback, limit) {
        let wait = false;
        return function() {
            if (!wait) {
                callback.apply(null, arguments);
                wait = true;
                setTimeout(function(){
                    wait = false;
                }, limit);
            }
        }
    },
    enableScroll: function() {
        $body.style.removeProperty('overflow');
        $body.style.removeProperty('position');
        $body.style.removeProperty('top');
        $body.style.removeProperty('width');
        $body.classList.remove('page--fixed');
        window.scrollTo(0, scrollPosition);
    },
    disableScroll: function() {
        scrollPosition = window.pageYOffset;
        $body.style.overflow = 'hidden';
        $body.style.position = 'fixed';
        $body.style.top = `-${scrollPosition}px`;
        $body.style.width = '100%';
        $body.classList.add('page--fixed');
    },
    lerp: function(a, b, n) {
        return (1 - n) * a + n * b;
    },
    lineEq: function(y2, y1, x2, x1, currentVal) {
        var m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
        return m * currentVal + b;
    },
    isTouchDevice: function() {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    },
    getRandomNumber: function(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
};

/* grid */
(() => {
    let gridItems;

    document.addEventListener('DOMContentLoaded', () => {
        gridItems = [...document.querySelectorAll('.js-grid-item')];

        resetGridItemHeight();        
        setGridItemHeight();

        window.addEventListener('resize', utility.debounce(() => {
            resetGridItemHeight();
            setGridItemHeight();
        }, 250));
    });

    function resetGridItemHeight() {
        gridItems.forEach(gridItem => {
            gridItem.style = "";
        });
    }

    function setGridItemHeight() {
        gridItems.forEach(gridItem => {
            let itemRect = gridItem.getBoundingClientRect();
            gridItem.style.height = `${Math.ceil(itemRect.height)}px`;
        });
    }
})();