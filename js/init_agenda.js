window.onload = run
function run() {
    rand_image = Math.floor(Math.random() * 60)+1
    document.querySelector('.searchTerm').addEventListener('click', clickyClick);
    document.querySelector('.searchButton').addEventListener('click', search);
    document.getElementById("pic").addEventListener("click", userToggle);

    document.getElementById("apps").addEventListener("click", appToggle);
    document.querySelectorAll('.app').forEach(item => {
        item.addEventListener('click', event => {
          app_clicked_on()
        })
      })
    document.querySelector('.searchTerm').addEventListener('keypress', clickyClick)

    updateTime();
    wind()
    cal_icon()
    start_color()
    document.getElementById("img_google").src = "../images/"+String(rand_image)+".png"
    drawthing(true)
    setInterval(updateTime, 100);
}