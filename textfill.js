/*
*   textFill.js
*   Buza Péter
*
*   How it works:
*
*   <div class="element-to-textfill"> <- Call function to this element
*       <div class="first-div">Text in this div must wrap here</div>
*   </div>
*
*   | Text in this |
*   | div must     |
*   | wrap here    |
*
*/
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
    if (containerElements.length !== 'undefined') {
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

    if (options.debug == true) {
        console.log('TextFill JS: Run textfill');
    }

    // Get first element in container
    var textDiv = containerElement.querySelector(options.firstElement);

    if (!textDiv) {
        if (options.debug == true) {
            console.log('TextFill JS:', options.firstElement, 'element not found inside container', containerElement);
        }
        return;
    }

    // Set max font size and decrease while its not in the box
    var fontSize = parseInt(options.maxFontSize);
    var textWidth;
    var textHeight;
    var containerWidth = containerElement.offsetWidth;
    var containerHeight = containerElement.offsetHeight;

    // Word wrap
    if (options.disableWordWrap == true) {
        containerElement.style.whiteSpace = 'nowrap';
    }

    do {
        textWidth = textDiv.offsetWidth;
        textHeight = textDiv.offsetHeight;

        // Increase font size
        fontSize = fontSize - 1;

        // Log status
        if (options.debug == true) {
            console.log(
                'TextFill JS:',
                'Container Width is ', containerWidth, 'and text width is', textWidth, 'and container width is larger than text width: ', containerWidth > textWidth, 
                'Container Height is ', containerHeight, 'and text height is', textHeight, 'and container height is larger than text height:', containerHeight > textHeight,
                'Fons size decreased to: ', fontSize,
                'Text is: ', textDiv.innerText,
                'Line height gap is: ', options.lineHeightGap
            );
        }

        // Set font size
        textDiv.style.display = 'inline';
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