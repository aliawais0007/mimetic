` IN PRODUCTION, USE AT OWN RISK `

[![npm version](https://badge.fury.io/js/mimetic.svg)](https://badge.fury.io/js/mimetic) [![Build Status](https://travis-ci.org/julienetie/mimetic.svg?branch=master)](https://travis-ci.org/julienetie/mimetic)
<img src="http://oi67.tinypic.com/1z4a421.jpg">


### Browser Support
- MIMETIC supports **IE9+**, **Safari 6.2+**, Chrome, Firefox, Edge, Opera, etc. Will be depreciating support for  IE9 + IE10 in releases beyond v0.7.3.
- MIMETIC does not use user-agent detection nor does it modify element styles.

# MIMETIC

## Scalable Fonts & Zoom Detection

<img src="https://raw.githubusercontent.com/julienetie/img/master/1_DQD6cIuZ82YzLI9GoHFcqA.gif">

## The sincerest form of flattery
_"Mimetic" - relating to, constituting, or habitually practising mimesis (T1000 Mimetic polyalloy)_ 
<img src="https://media.giphy.com/media/13NkUb5hwB1afK/giphy.gif">

MIMETIC is a JavaScript _viewport engine_, that quantifies relative units in accordance to the viewport and _devicePixelRatio_ conditionally. Which means **text can scale to the viewport's dimensions without breaking the browser’s ability to zoom**.

### Myth Busting In Advance

- **Bad for accessibility**: MIMETIC doesn't interfere with accessibility.
- **Breaks site if JavaScript is disabled**: If JavaScript is disabled, the page will function as expected.
- **Zoom is too proportional**: You can customise how zoom behaves better than the original.
- **Prevents responsiveness**: Choose when MIMETIC kicks in.
- **What if the web breaks**: If a vendor changes and MIMETIC breaks, whilst MIMETIC is included separate from the rest of the application code base, your website will not scale (as standard) and will operate the rest of your code as normal. 
- **Vendor Lock-In**: Remove it to revert.



### WHY?

It enables developers to:
- Design fluid website with fonts that scale to the viewport width.
- Reduces/ eliminates maintainability for retina and high resolutions displays.
- Normalise the perceived _devicePixelRatio_ for high resolution tablet devices (optional). 
- Detect the zoom level on all modern desktop browsers IE9+
- Improve and fine-tune accessibility when the user utilities zoom.
- Control when and when not to scale via media queries.
- Take an existing Responsive Website and convert it instantly to a **Scalable Website**.
- Less screen resolutions to consider for improved work flows.
- Design more aesthetically pleasing websites.
- Future proof designs from MIMETIC sized rem units to future relative-percentile units by simply changing the unit and root font-size. 

### An alternative?
Alternatives seem to have some combination of the below issues:

Inconsistent browser compatibility, difficult to no ability to zoom thus breaking accessibility, doesn't scale padding/ margin/ line-height and other relative dimensions, doesn’t respect the style attributes on elements. Must always specify relative dimensions (padding/ margin)(More maintenance), you can’t specify relative dimensions, scales to a container only, jQuery dependent, does exactly what vw, vh, vmin, vmax does on mobile, fonts blur, no longer being maintained.

### What do I need to know?
There’s a few simple concepts you need to understand to create _Scalable Web Design_ via MIMETIC.
-  You must use relative units to keep in proportion (EM & REM units)
- MIMETIC "can" scales all quantities not just font-size margins/ padding, width, height etc.
- Avoid pixel units. 
- Your website should be usable and functional with mimetic included and when left out.

### Install
`npm i mimetic` 

or 

`yarn add mimetic`

### First Meaningful Paint
Ideally MIMETIC should execute before other scripts that directly alter or affect the DOM.
But it does require the DOM to load first.

### Usage
```javascript
Mimetic();
```

### Standalone zoom detection
```javascript
Mimetic({
  scale: false,
  onZoom: (a,b,c,d) => console.log(a,b,c,d);
});
```

### Size
MIMETIC has a **2.5kb gzip size** and will not exceed a 3.5kb gzip size. 

### Options
Below is the list of config options passed as an object:

| Property  | Value  | Description | Default |  
|---|---|---|---|
| cutOffWidth | String - CSS units  | The minimal width to disable scaling | 0 |    
| enableScale | Booolean  | Enables scaling of relative units | true |  
| loadEvent | String - LoadEvent type  | native load event to use before auctioning | "DOMContentLoaded" | 
| mobileWidth | String - CSS units | The minimal width to disable scaling for mobile devices  | "40em" |
| onResize | ({viewportWidth, innerWidth, evalDPR, calculatedDPR, normalizedDPR}) => {} | Callback on scale and or zoom | undefined |   
| onScale | ({viewportWidth, innerWidth, evalDPR, calculatedDPR, normalizedDPR}) => {} | Callback on resize only | undefined |  
| onZoom | ({viewportWidth, innerWidth, evalDPR, calculatedDPR, normalizedDPR}) => {} | Callback on zoom only | undefined |
| preserveDevicePixelRatio | Boolean | Normalises the device pixel ratio for high ratio devices | false |
| relativeDesignWidth | String - CSS units  | The width relative to the font size | "1024px" |
| scaleDelay | Number - Milliseconds | The debounced delay to call on resize | 16  |


Big thanks to [BrowserStack](https://www.browserstack.com) for sponsoring the cross browser & device testing of this project.

MIT (c) 2017 Julien Etienne.
