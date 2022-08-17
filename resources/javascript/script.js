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

document.getElementById("search-button").addEventListener("click",function(){
    const filterText = document.getElementById("search-input").value;
    let filtered_post_data = post_data.filter(post => {
      username = post.userName.toLowerCase();
      return (username.includes(filterText.toLowerCase()) || post.userId == filterText);
    });
    post_data.forEach(function(post) {
      let post_html = document.getElementById(`post_${post.id}`);
      post_html.style.display = 'none';
    });
    filtered_post_data.forEach(function(post) {
      let post_html = document.getElementById(`post_${post.id}`);
      post_html.style.display = 'inline';
    });
    
  });

 