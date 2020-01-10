import defaults from './defaults';
import { getFontSize, getRootElement, basicCompose, pxToRem } from './helpers';

// https://github.com/ehtb/onFrame
function debounce(func, frameLength = 10) {
    let called = 0;
    let frame;

    const reset = function() {
        called = 0;
        frame = null;
    };

    const cancel = function() {
        cancelAnimationFrame(frame);
        reset();
    };

    const run = function(...args) {
        const context = this;

        if (frame != null) {
            cancelAnimationFrame(frame);
            reset();
        }

        frame = requestAnimationFrame(function tick() {
            if (++called === frameLength) {
                reset();

                func.apply(context, args);
            } else {
                frame = requestAnimationFrame(tick);
            }
        });
    };

    run.cancel = cancel;

    return run;
};

const delay = (callback, duration) => {
    var startTime = 0,
        terminate = false;

    function loop(timestamp) {
        if (!startTime) {
            startTime = timestamp;
        }

        if (timestamp > startTime + duration && !terminate) {
            if (callback) callback();
            terminate = true;
        } else {
            requestAnimationFrame(loop);
        }
    }

    requestAnimationFrame(loop);
}

export default (config) => {
    const windowRef = window;
    const documentRef = document;

    const rootSelector = config.rootSelector || defaults.rootSelector;
    const rootElement = getRootElement(rootSelector);
    const getFontSizeRem = basicCompose(
        pxToRem,
        getFontSize
    );
    const rootFontSize = getFontSizeRem(document);

    const resize = () => {
        const mobileWidth = !window.matchMedia(`(min-width: 80em)`).matches;
        if (mobileWidth) {
        	rootElement.removeAttribute('style');
            return;
        }
        // Real time DOM measurments.
        const innerWidth = windowRef.innerWidth;
        const outerWidth = windowRef.outerWidth;
        const clientWidth = documentRef.documentElement.clientWidth;
        const DPR = windowRef.devicePixelRatio;

        // Ratio between the outer and client width.
        const outerClientRatio = outerWidth / clientWidth;

        // A calulated DPR within the proximity of 0.05. for devices (eg.safari)
        // that have a fixed DPR.
        // @TODO check on large display devices with DPRs greater than 1.
        const OCRProximity = outerClientRatio < 1.05 && outerClientRatio > 0.95 ?
            1 : outerClientRatio;

        // A calculated DPR safe for safari browsers.
        const safariSafeDPR = Number((OCRProximity).toFixed(5));

        // Legacy internet explorer devicePixelRatio.
        const IEDPR = Number(windowRef.screen.deviceXDPI / windowRef.screen.logicalXDPI);

        // The devicePixelRatio with polyfilled support.
        const alt = DPR === 1 ? safariSafeDPR : DPR;
        const calculatedDPR = Math.abs(IEDPR || alt);

        // The real viewport width.
        const viewportWidth = parseInt(clientWidth * calculatedDPR, 10);

        // The default device pixel ratio.
        const defaultDPR = Math.round(clientWidth * (calculatedDPR / outerWidth));


        // Calculates the devicePixelRatio as if the default was 1.
        const normalizedDPR = (1 / defaultDPR) * calculatedDPR;

        // The preserved or non-preserved DPR via API settings.
        const preserveDevicePixelRatio = false;

        const evalDPR = preserveDevicePixelRatio ? calculatedDPR : normalizedDPR;
        /**
         * The window width compared to the design width.
         */
        const relativeDesignWidth = 1280;
        const designWidthRatio = innerWidth / relativeDesignWidth;

        const scaledFontSize = (rootFontSize * designWidthRatio * evalDPR) + 'rem';
        rootElement.style.fontSize = scaledFontSize;
    }

    const debounceResize = debounce(() => {
    	window.requestAnimationFrame(resize);
        console.log('debounced resize')
    }, 20);

    window.addEventListener('resize', () => {
        window.requestAnimationFrame(resize);
        // delay(resize,500);
        debounceResize();
    });
    window.requestAnimationFrame(resize);
}

/**

Edge 18+ 
Chrome 70 
Firefox 63 

**/