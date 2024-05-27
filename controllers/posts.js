const path = require('path');
let posts = require('../db.js')

const index = (req, res) => {
    res.format({
        html: () => {
            let html = '<main>';
            posts.forEach((post) => {
                html += `
                <article>
                    <a href="/posts/${post.slug}"><h2>${post.title}</h2></a>
                    <img width="500" src="imgs/posts/${post.image}" alt="${post.title}">
                    <p>${post.content}</p>
                    <h4>Tags:</h4>
                    <ul>`;
                post.tags.forEach(tag => {
                    html += `<li>${tag}</li>`;
                    // <span class="tag">#${tag.toLowerCase().replaceAll(' ', '-')}</span>`).join(' ')}
                });
                html += `</ul>
                </article>
                </a>
                <hr>`;
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

const show = (req, res) => {
    const slugPost = req.params.slug;
    const postRichiesto = posts.find(post => post.slug === slugPost);

    if (postRichiesto) {
        res.json({
            ...postRichiesto,
            description: 'Post richiesto',
            image_url: `http://${req.headers.host}/imgs/posts/${postRichiesto.image}`,
            image_download_url: `http://${req.headers.host}/posts/${postRichiesto.slug}/download`
        });
    } else {
        res.status(404).json({
            error: 'Post non trovato'
        });
    }
}

const create = (req, res) => {
    res.format({
        html: () => {
            res.send('<h1>Creazione nuovo post</h1>');
        },
        default: () => {
            res.status(406).send('Errore, impossibile creare nuovo post');
        }
    });
}

const download = (req, res) => {
    const slugPost = req.params.slug;
    const postRichiesto = posts.find(post => post.slug === slugPost);
    const filePath = path.join(__dirname, `../public/imgs/posts/${postRichiesto.image}`);
    res.download(filePath);
}


module.exports = {
    index,
    show,
    create,
    download
}