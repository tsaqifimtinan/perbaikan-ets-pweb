var apirequest = new XMLHttpRequest();
apirequest.open('GET', 'https://api-berita-indonesia.vercel.app/antara/politik/', true);

apirequest.onload = function() {
    if (apirequest.status === 200) {
        var data = JSON.parse(apirequest.responseText);
        console.log(data);

        const header = document.getElementById('website-header');
        const content = document.getElementById('news-content');

        if (header) {
            header.innerHTML = `
                <nav class="navbar bg-body-tertiary">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="${data.data.link}">
                            <img src="${data.data.image}" alt="Logo" width="250" height="40" class="d-inline-block align-text-top">
                        </a>
                        <h5 class="text-center">${data.data.title}</h5>
                        <span>
                            ${data.data.description}
                        </span>
                    </div>
                </nav>
            `;
        } else {
            console.error('ERROR');
        }

        if (content) {
            for (let index = 0; index < data.data.posts.length; index++) {
                const item = data.data.posts[index];

                const card = document.createElement('div');
                card.className = "col-md-4";
                card.innerHTML = `
                    <div class="card" style="width: 24rem;">
                        <img src="${item.thumbnail}" class="card-img-top" alt="${item.title}">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text">${item.description}</p>
                            <a href="${item.link}" class="btn btn-danger">Lihat Selengkapnya</a>
                        </div>
                    </div>
                `;

                content.appendChild(card);
            }
        } else {
            console.error('ERROR');
        }
    } else {
        console.error('Status:' + apirequest.status);
    }
};

apirequest.send();