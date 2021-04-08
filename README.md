# SS Style Guides

Here we have all the CORE, COMPONENTS, COMPOUND, SECTIONS and TEMPLATE scss-code organized in the same way as is done on the Shopify repo.

In addition to the SCSS we also save the HTML for each of them.

Development of a new CORE, COMPONENTS, COMPOUND, SECTIONS and TEMPLATE must always start from here.

Once the HTML and SCSS is fine a works well, code is integrate in Shopify repo with liquid.

URL for viewing HTML in browser: https://supernovabrands.github.io/sandandsky-styleguides/

## Setup
1. Run `npm install` to install dependencies
2. Run `npm start` to start gulp server and watch files

## Images
Can use https://placeholder.com/ for placeholder images. i.e:
- 150x150: `https://via.placeholder.com/150`
- 375x223 jpg: `https://via.placeholder.com/375x223.jpg`
- 30x30 png: `https://via.placeholder.com/30.png`

## Font Icon
1. Optimize SVG using this online tool: https://jakearchibald.github.io/svgomg/
2. Put Optimizes SVG in `fonts/svgs`
3. Run `npm run buildfont` to build the font icon
