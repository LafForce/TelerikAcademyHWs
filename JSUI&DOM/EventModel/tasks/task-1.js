/* globals $ */

/* 
Create a function that takes an id or DOM element and:
  * If an id is provided, select the element
* Finds all elements with class `button` or `content` within the provided element
  * Change the content of all `.button` elements with "hide"
* When a `.button` is clicked:
  * Find the topmost `.content` element, that is before another `.button` and:
    * If the `.content` is visible:
      * Hide the `.content`
      * Change the content of the `.button` to "show"       
    * If the `.content` is hidden:
      * Show the `.content`
      * Change the content of the `.button` to "hide"
    * If there isn't a `.content` element **after the clicked `.button`** and **before other `.button`**, do nothing
* Throws if:
  * The provided DOM element is non-existant
  * The id is either not a string or does not select any DOM element
*/

function solve() {
  return function (element) {
    var root,
      buttons,
      contents,
      i,
      lengthOfSelected;

    if (!element || element === ' ') {
      throw new Error('A param is missing');
    }

    if (typeof element === 'string') {
      root = document.getElementById(element);
      if (root === null) {
        throw new Error('The provided id does not select anything (there is no element that has such an id)');
      }
    } else if (element instanceof HTMLElement) {
      root = element;
    } else {
      throw new Error('The provided first parameter is neither string or existing DOM element');
    }

    buttons = root.getElementsByClassName('button');
    contents = root.getElementsByClassName('content');

   	for (i = 0, lengthOfSelected = buttons.length; i < lengthOfSelected; i += 1) {
      buttons[i].innerHTML = 'hide';
      buttons[i].addEventListener('click', function (ev) {
        var clickedButton = ev.target;
        var nextSibling = clickedButton.nextElementSibling;
        var firstContent,
          validFirstContent = false;

        while (nextSibling) {
          if (nextSibling.className === 'content') {
            firstContent = nextSibling;
            nextSibling = nextSibling.nextSibling;
            while (nextSibling) {
              if (nextSibling.className === 'button') {
                validFirstContent = true;
                break;
              }
              nextSibling = nextSibling.nextElementSibling;
            }
            break;
          } else {
            nextSibling = nextSibling.nextElementSibling;
          }
        }

        if (validFirstContent) {
          if (firstContent.style.display === 'none') {
            firstContent.style.display = '';
            clickedButton.innerHTML = 'hide';
          } else {
            firstContent.style.display = 'none';
            clickedButton.innerHTML = 'show';
          }
        }

      });
    }

  };
};
module.exports = solve;