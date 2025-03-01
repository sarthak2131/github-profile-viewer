document.addEventListener("DOMContentLoaded", function () {
    let user = document.getElementById('username')
    let profileCard = document.querySelector(".profile-card");


    async function fetchUser(username) {
        try {
            let response = await fetch(`https://api.github.com/users/${username}`);
            
            if (!response.ok) {  
                throw new Error("User not found"); 
            }
    
            let data = await response.json();
            console.log(data);
    
            profileCard.innerHTML = `
               <img id="profile-img" src="${data.avatar_url}" alt="Profile Image">
               <h2 id="profile-name">${data.login}</h2>
               <p id="bio">${data.bio || "No bio in profile"}</p>
               <div class="stats">
                   <span>Followers: <strong id="followers">${data.followers}</strong></span>
                   <span>Following: <strong id="following">${data.following}</strong></span>
                   <span>Repository: <strong id="repository">${data.public_repos}</strong></span>
               </div>
               <a id="view-profile" href="${data.html_url}" target="_blank">View Profile</a>
            `;
    
            profileCard.style.display = 'block';
    
        } catch (error) {
            console.log("Error:", error.message);
            profileCard.innerHTML = `<p style="color: red;">User not found</p>`;
            profileCard.style.display = "block";  // Make sure the error message is visible
        }
    }
    document.getElementById('search-btn').addEventListener('click',()=>{
        console.log("clicked")
        console.log(user.value)
        fetchUser(user.value)
    })
});

  