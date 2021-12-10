//profile information
const overview = document.querySelector(".overview")
const username = "gwolf97"
const repoList = document.querySelector(".repo-list")
const repoListSection = document.querySelector(".repos")
const repoData = document.querySelector(".repo-data")

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

repoList.addEventListener("click", function(e){
    if (e.target.matches("h3")){
        const repoName = e.target.innerText
        getRepoInfo(repoName)
    }
})

const getRepoInfo = async function(repoName){
    const fetchRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`)
    const repoInfo = await fetchRepoInfo.json()
    console.log(repoInfo)
    const fetchLanguages = await fetch(repoInfo.languages_url)
    const languageData = await fetchLanguages.json()
    //console.log(languageData)
    const languages = []
    for(let key in languageData){
        languages.push(key)
    }
    //console.log(languages)
    displayRepoInfo(repoInfo, languages)
}

const displayRepoInfo = function(repoInfo,languages){
    repoData.innerHTML = ""
    const div = document.createElement("div")
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `
    repoData.append(div)
    repoData.classList.remove("hide")
    repoListSection.classList.add("hide")

}