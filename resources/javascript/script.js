//const randomName = Math.random().toString(36).slice(2, 7);

/*const searchInput = document.querySelector("[data-search]")

let html = []

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    html.forEach(post => {
      const isVisible =
        posts.userId.toLowerCase().includes(value)
      posts.element.classList.toggle("hide", !isVisible)
    })
  })*/

  

/*Promise.all([1, 22, 33, 44, 55, 66, 77, 88, 95, 99].map(id =>
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method:'PATCH',
        body: JSON.stringify({
            name: "John Doe",
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
            <div id="post">    
                <p id="title">${posts.title}</p>
                <p id="author">Written by ${posts.name}</p>
                <p id="body">${posts.body}</p>
            </div>`
        }).join(' ');
        console.log(html);
        document.querySelector('#content').insertAdjacentHTML('beforeend', html);
    })
 ;
*/

var post_data = [];

 fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method:'GET',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
})
   .then((response) => response.json())
   .then(data => { 
        let fetches = []
        data.forEach(function(post) {
          fetches.push(
            fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
              },
            })           
            .then((response) => response.json())
            .then(user => {
              post["userName"] = user.name;
              post_data.push(post);  
            })
          );

        });
        Promise.all(fetches).then(function() {
          const html = data.map(post => {
            return `
            <div class="post" id="post_${post.id}">    
                <p id="title">${post.title}</p>
                <p id="author">Written by ${post.userName}</p>
                <p id="body">${post.body}</p>
            </div>`
        }).join(' ');
        document.querySelector('#content').insertAdjacentHTML('beforeend', html);
        });
    });
;

//Now, we want to filter our blog posts by author.Since you have provided a button, i'll assume we only want to filter results as soon as the button is pressed:
document.getElementById("search-button").addEventListener("click",function(){
    //First, we want to get the text in the input field:
    const filterText = document.getElementById("search-input").value;
    //Secondly, we want to find the posts that have a user matching that name, or that id.
    //We convert all to lower case to ease searching.
    let filtered_post_data = post_data.filter(post => {
      username = post.userName.toLowerCase();
      return (username.includes(filterText.toLowerCase()) || post.id == filterText);
    });
    //now we have the filtered data, it is time to hide all data:
    post_data.forEach(function(post) {
      let post_html = document.getElementById(`post_${post.id}`);
      post_html.style.display = 'none';
    });
    //And afterwards, show all filtered data:
    filtered_post_data.forEach(function(post) {
      let post_html = document.getElementById(`post_${post.id}`);
      post_html.style.display = 'inline';
    });
    
  });

 