//profile information
const overview = document.querySelector(".overview")
const username = "gwolf97"
const repoList = document.querySelector(".repo-list")

const gitHubProfileInfo = async function(){
    const getInfo = await fetch(`https://api.github.com/users/${username}`)
    const profile = await getInfo.json()
    //console.log(profile)
    displayUserInfo(profile)
}

gitHubProfileInfo()

const displayUserInfo = function(profile){
    const userInfo = document.createElement("div")
    userInfo.classList.add("user-info")
    userInfo.innerHTML = `
    <figure>
    <img alt= "user avatar" src=${profile.avatar_url} />
    </figure>
    <div>
        <p><strong>Name: </strong>${profile.name}</p>
        <p><strong>Bio: </strong>${profile.bio}</p>
        <p><strong>Location: </strong>${profile.location}</p>
        <p><strong>Number of public repos: </strong> ${profile.public_repos}</p>
    </div>`
    overview.append(userInfo)
}

const fetchRepos = async function(){
    const getRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
    const repos = await getRepos.json()
    //console.log(repos)
    displayRepos(repos)
}

fetchRepos()

const displayRepos = function(repository){
    for(let repo of repository){
        const li = document.createElement("li")
        li.classList.add("repo")
        li.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(li)
    }
}

