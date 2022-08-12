/*Promise.all([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(id =>
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method:'PATCH',
        body: JSON.stringify({
            name: "CS Lewis",
    }),
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
})
        .then((response) => response.json())))
        .then((json) => console.log(json));


function fetchData() {
    
    fetch('https://jsonplaceholder.typicode.com/posts/').then(response => {
        if (!response.ok) {
            throw Error('ERROR');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const html = data.map(posts => {
            return `
            <div class="post">    
                <p>Title: ${posts.title}</p>
                <p>Author: ${posts.name}</p>
                <p>Body: ${posts.body}</p>
            </div>`
        }).join(' ');
        console.log(html);
        document.querySelector('#content').insertAdjacentHTML('beforeend', html);
    })
    .catch(error => {
        console.log(error);
    })
}   
fetchData();*/

Promise.all([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(id =>
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method:'PATCH',
        body: JSON.stringify({
            name: "CS Lewis",
    }),
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
})
        .then((response) => response.json())))
            .then(data => {
        console.log(data);
        const html = data.map(posts => {
            return `
            <div class="post">    
                <p>Title: ${posts.title}</p>
                <p>Author: ${posts.name}</p>
                <p>Body: ${posts.body}</p>
            </div>`
        }).join(' ');
        console.log(html);
        document.querySelector('#content').insertAdjacentHTML('beforeend', html);
    })
;

 
    