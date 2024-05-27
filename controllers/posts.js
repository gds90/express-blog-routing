const posts = require('../db.js')
const { writeJSON, readJSON } = require("../functions.js");

const index = (req, res) => {
    res.format({
        html: () => {
            let html = '<main>';
            posts.forEach((post) => {
                html += `
                <article>
                    <h2>${post.title}</h2>
                    <img width="500" src="imgs/posts/${post.image}" alt="${post.title}">
                    <p>${post.content}</p>
                    <h4>Tags:</h4>
                    <ul>`;
                post.tags.forEach(tag => {
                    html += `<li>${tag}</li><br>`;
                    // <span class="tag">#${tag.toLowerCase().replaceAll(' ', '-')}</span>`).join(' ')}
                });
                html += `</ul>
                </article>`;
            });
            html += '</main>';
            res.send(html);
        },
        json: () => {
            res.json({
                data: posts,
                count: posts.length,
                description: 'Lista dei post'
            });
        }
    })
}

const create = (req, res) => {
    const posts = readJSON('posts');
    writeJSON('posts', [...posts, req.body]);
    res.send('Post aggiunto al file JSON');
}

module.exports = {
    index,
    create
}