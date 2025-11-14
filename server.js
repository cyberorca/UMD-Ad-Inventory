const express = require('express');
const path = require('path');
const manifest = require('./dist/manifest.json');

const app = express();
const PORT = 3000;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Route for the main page
app.get('/', (req, res) => {
    const mainJs = manifest['main.js']?.path || '';
    const newstagJs = manifest['newstag.js']?.path || '';
    const skinadJs = manifest['skinad.js']?.path || '';
    const advertorialEmbedJs = manifest['advertorialEmbed.js']?.path || '';

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sample Webpage</title>
        </head>
        <body>
            <h1>Welcome to the Sample Webpage</h1>
            <p>This page dynamically loads scripts based on the manifest file.</p>

            <!-- Load main JavaScript file -->
            ${mainJs ? `<script src="${mainJs}"></script>` : ''}

            <!-- Load Newstag module -->
            ${newstagJs ? `<script src="${newstagJs}"></script>` : ''}

            <!-- Load SkinAd module -->
            ${skinadJs ? `<script src="${skinadJs}"></script>` : ''}

            <!-- Load SkinAd module -->
            ${advertorialEmbedJs ? `<script src="${advertorialEmbedJs}"></script>` : ''}

        </body>
        </html>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});