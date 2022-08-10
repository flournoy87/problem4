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
                <p>Author: ${posts.userId}</p>
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


fetchData();