const API_KEY = "AIzaSyC8Dzw21aEngLuQpr13nOPli0w02TcqBl8";
const openMenu = document.querySelector("#show-menu");
const hideMenu = document.querySelector("#hide-menu");
const sideMenu = document.querySelector("#nav-menu");
openMenu.addEventListener('click', function () {
    sideMenu.classList.add('active')
})
hideMenu.addEventListener('click', function () {
    sideMenu.classList.remove('active');
})

let q = "";
let search = async () => {
    let query = document.getElementById("query").value;
    let data = await getData(query)
    q = query;
    append(data)
}
// let query = document.getElementById("query").value;
let getData = async (query) => {
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${API_KEY}`;
    let res = await fetch(url);
    data = await res.json();
    console.log(data.items);
    return data.items;
}
let append =(data)=>{
    let container = document.getElementById("container");
    container.innerHTML = null;
    data.forEach((el) => {
        let div = document.createElement('div');
        div.setAttribute("class", "video");
        div.onclick = () => {
            saveVideo(el);
        }
        let img = document.createElement('img');
        img.src = el.snippet.thumbnails.medium.url;
        let title = document.createElement('h3');
        title.innerText = el.snippet.title;
        div.append(img, title);
        container.append(div);
    })
}
let saveVideo = (data) => {
    localStorage.setItem("video", JSON.stringify(data));
    window.location.href="video.html"
}
const videoCardContainer = document.querySelector('#container');

let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";


fetch(video_http + new URLSearchParams({
    key: API_KEY,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 20,
    regionCode: 'IN'
}))
    .then(res => res.json())
    .then(data => {
        data.items.forEach(item => {
            getChannelIcon(item);
        })
    })
    .catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: API_KEY,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
        .then(res => res.json())
        .then(data => {
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            makeVideoCard(video_data);
        })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
              <h4 class="title">${data.snippet.title}</h4>
       </div>
    `
}

