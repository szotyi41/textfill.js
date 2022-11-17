function textFillListener(containerElements, options)
{
    var containerElement;

    // If you got more elements, set event listener for every element
    if (containerElements.length !== 'undefined') {
        for (var i = 0; i < containerElements.length; i++) {

            // Set container element
            containerElement = containerElements[i];

            // Add event listener for the container element
            containerElement.addEventListener('DOMSubtreeModified', function() {
                textFill(this, options);
            });
        }

        // Get back all elements
        return containerElements;
    }

    // Set container element
    var containerElement = containerElements;

    // Set event listener for one element
    containerElement.addEventListener('DOMSubtreeModified', function() {
        textFill(this, options);
    });

    // Get back one element
    return containerElement;
}

function textFillForElements(containerElements, options) {

    var containerElement;


    // If you got more elements, set textFill for every element
    if (containerElements.length) {
        for (var i = 0; i < containerElements.length; i++) {
            var containerElement = containerElements[i];
            textFill(containerElement, options);
        }
        return containerElements;
    }

    containerElement = containerElements;

    // If you get one element
    return textFill(containerElement, options);
}

function textFill(containerElement, options) {

    options = (typeof options == 'undefined') ? {} : options;

    // If some options set use that, else default
    options = { 
        minFontSize:     (typeof options.minFontSize != 'undefined') ? options.minFontSize : 8, 
        maxFontSize:     (typeof options.maxFontSize != 'undefined') ? options.maxFontSize : 30, 
        lineHeightGap:   (typeof options.lineHeightGap != 'undefined') ? options.lineHeightGap : null, 
        disableWordWrap: (typeof options.disableWordWrap != 'undefined') ? options.disableWordWrap : false, 
        debug:           (typeof options.debug != 'undefined') ? options.debug : false, 
        firstElement:    (typeof options.firstElement != 'undefined') ? options.firstElement : 'div' 
    };

    // Get first element in container
    var textDiv = containerElement.querySelector(options.firstElement);


    if (!textDiv) {
        if (options.debug == true) {
            console.log('TextFill:', options.firstElement, 'element not found inside container', containerElement);
        }
        return;
    }

    // Set max font size and decrease while its not in the box
    var fontSize = parseInt(options.maxFontSize);
    var textWidth;
    var textHeight;
    var containerWidth = parseInt(containerElement.getBoundingClientRect().width);
    var containerHeight = parseInt(containerElement.getBoundingClientRect().height);

    // Word wrap
    if (options.disableWordWrap == true) {
        containerElement.style.whiteSpace = 'nowrap';
    }

    do {
        textDiv.style.fontSize = fontSize + 'px';
        textDiv.style.margin = 0;
        textDiv.style.padding = 0;

        textWidth = parseInt(textDiv.getBoundingClientRect().width);
        textHeight = parseInt(textDiv.getBoundingClientRect().height);

        // Increase font size
        fontSize = fontSize - 1;

        // Log status
        if (options.debug == true) {
            console.table({
                'Text': textDiv.innerText,
                'Container Width': containerWidth, 
                'Text Width': textWidth + ((containerWidth > textWidth) ? ' ✅' : ' 😡'),
                'Container Height': containerHeight, 
                'Text Height': textHeight + ((containerHeight > textHeight) ? ' ✅' : ' 😡'),
                'Font size decreased to': fontSize + ' ⬇️'
            }); 
        }

        // Set font size
        textDiv.style.fontSize = fontSize + 'px';

        // Set line height too
        if (options.lineHeightGap != null) {
            containerElement.style.lineHeight = (fontSize + options.lineHeightGap) + 'px';
        }
        

    } while (

        // Fill to container horizontally
        ((textWidth >= containerWidth) || (textHeight >= containerHeight)) &&
        
        // Minimum font size
        (fontSize > options.minFontSize) && 

        // Maximum font size
        (fontSize < options.maxFontSize)
    );
}
