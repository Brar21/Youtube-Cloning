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

let video = JSON.parse(localStorage.getItem("video"));
let detail = video.snippet.title;
let play = () => {

    console.log(video);
    let id = video.id.videoId;
    let playVideo = document.getElementById("playVideo");
    playVideo.src = `https://www.youtube.com/embed/${id}`

    let data = document.getElementById('data');
    let div = document.createElement('div');
    let h2 = document.createElement('h2')
    h2.innerText = video.snippet.title;
    let p = document.createElement('p');
    p.innerText = video.snippet.channelTitle;
    let date = document.createElement('p');
    date.setAttribute('id', 'time')
    date.innerText = video.snippet.publishTime;
    let div2 = document.createElement('div');
    let hr = document.createElement('hr');
    hr.setAttribute('id', 'hrt');
    let h = document.createElement('hr')
    div2.setAttribute('id', 'inner');
    let logo = document.createElement('img');
    logo.src = `https://i.pinimg.com/originals/7d/c9/93/7dc993c70d4adba215b87cafdc59d82d.png`;
    div2.append(logo, p)
    div.append(h2, date, hr, div2, h);
    data.append(div)
}
let q = ""
let search = async () => {
    let query = detail;
    let ata = await getdata(query)
    q = query
    append(ata)
};
let getdata = async (query) => {
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${API_KEY}`;
    let res = await fetch(url);
    let ata = await res.json();
    console.log(ata)
    return ata.items;
}
search()
let append = (ata) => {
    let container = document.getElementById("container2");
    container.innerHTML = null;
    ata.forEach((el) => {
        let main = document.createElement("div");

        let img = document.createElement('img');
        img.src = el.snippet.thumbnails.medium.url;
        let imge = document.createElement('div');
        let h3 = document.createElement('h4');
        h3.innerText = el.snippet.title;
        let p = document.createElement('p');
        p.innerText = el.snippet.channelTitle;
        console.log(h3)
        let div = document.createElement("div");
        main.onclick = () => {
            saveVideo(el)
        }
        div.setAttribute("class", "video");
        imge.append(img);
        div.append(h3, p);
        div.setAttribute('id', 'sidedata')
        main.append(imge, div)

        main.setAttribute('id', 'main')
        container.append(main);

    });
};
saveVideo = (el) => {
    localStorage.setItem("video", JSON.stringify(el));
    window.location.reload();
}




