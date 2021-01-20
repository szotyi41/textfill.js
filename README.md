# textfill.js
My own textfill js code. If you have a &lt;div> and you want to see text inside with the largest font size and wrapping or nowrap. You have to set the max font size, then the code increase text until its not fill the div.

How it works:
```
| Text in this |
| div must     |
| wrap here    |
```

```html
<div class="headline-container" id="headline-container"> <- Call function to this element
  <div class="headline-element">Text in this div must wrap here</div>
</div>
```

```js
var elements = document.querySelectorAll('.headline-container');
var options = {
  minFontSize: 14,
  maxFontSize: 22,
  disableWordWrap: false,
  debug: true,
  firstElement: 'div'
};

// Create event listener for something changed in the container innerHTML
// E.g: When you change content in inspector it is update font size automatically
textFillListener(elements, options);

// Textfill enable for more elements at the same time
textFillForElements(elements, options);

// Textfill
var element = document.querySelector('#headline-container');
textFill(element, options);
```

| Option  | Description | Example value |
| ------------- | ------------- | ---- |
| minFontSize  | Minimum font size in pixels  | (int) 16 | 
| maxFontSize  | Maximum font size in pixels (decreasing starts from here, must be larger than the minimum)  | (int) 32 |
| lineHeightGap  | Gap between two lines if its wrapped | (int) 4px |
| disableWordWrap | Disable word wrap | (bool) false |
| debug | Enable debug mode. Every font size decreasing get console message | (bool) false |
| firstElement | Tag name of first element inside the container. (The text element) | (string) div |
