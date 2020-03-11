gT Photo Viewer is a lightweight image-viewing web app that runs in a browser.

Here is how it works: the core of the app is a Node.js Express server ("server.js). When run, server.js sends three files (HTML, CSS, and a vanilla-JavaScript file named index.js) as static assets to the browser, which are rendered to the DOM in the usual fashion. Immediately therafter, an event listener fires in index.js to make a GET request back to server.js, which queries the database (in this case, the "database" is a PasteBin URL) for a string containing the list of image URLs to be displayed. Server.js then parses the string to JSON format and sends it back to index.js as a response object. Index.js iterates through the response object and adds the URLs to the appropriate HTML elements.

If you'd like to try this app out, here is what to do:

1. Clone this repository to your computer (the directory will be named gT-Image-Viewer-200308).
2. Using the command line, navigate to the top level of the gT-Image-Viewer-200308 directory.
3. Type npm i - this will install the required dependencies (listed in package.json)
4. Type npm start - this will launch server.js. As this app its still in development, it uses Nodemon to automatically restart the server any time changes are made to the source code. The command line should display "App listening on port 3000".
5. Navigate in the browser to http://localhost:3000/ . The interface (a grid of thumbnails and a large selected image) should display in the browser window.

Once the app is running:

- Clicking an image thumbnail will display the full image at the top of the window.
- Clicking the words "Display in Greyscale: OFF" will toggle all the images to display in greyscale mode. Clicking the words again will toggle all the images back to RGB.
- Clicking the words "Displaying ALL Images" will toggle the display to show _only_ those images whose full size is greater than 100 pixels x 100 pixels. Clicking the words again will display _all_ the images, regardless of size.

*FEATURES I SURELY WOULD'VE IMPLEMENTED, HAD THERE ONLY BEEN ENOUGH TIME:*

- Cache the image data so that index.js only needs to make ONE request to the backend. Right now index.js makes a GET request to the backend everytime the "grayscale" and "filter by size" functions are called.  If the images were sorted by size and cached the first time they came in, the backend would *only* need to be called the first time the page loads. That occurred to me about fifteen minutes ago. :P
- Build out the "filter by size" functionality so users can specify more precisely the size in pixels of the images they want displayed. This would entail building some kind of modal or pull-down form to input the numbers, and I just didn't have the time to do that.
- Get the "big" image to display in correct proportion (right now it's always coerced into a square format).  Again, I just ran short of time.
- Display the thumbnails in a paginated or "carousel" format.  This is, I think, probably the easiest of my proposed changes...but again, no time.

Anyway, it was great to have the opportunity to make this...and it was fun to work on. Hope you enjoy it/find it useful!

JG



