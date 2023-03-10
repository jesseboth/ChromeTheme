/*calendar*/
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

function clickyClick() {
  var keycode = event.keyCode ? event.keyCode : event.which;
  if (keycode == 13) {
    if(document.getElementById("comment").value.startsWith("http")){
      chrome.tabs.update({active: true, url: document.getElementById("comment").value})
    }
    else if (document.getElementById("comment").value !== "") {
      url =
        "http://google.com/search?q=" +
        document.getElementById("comment").value;
      window.open(url, "_self");
    }
  }
}


function search() {
  if(document.getElementById("comment").value.startsWith("http")){
    chrome.tabs.update({active: true, url: document.getElementById("comment").value})
  }
  else if (document.getElementById("comment").value !== "") {
    url =
      "http://google.com/search?q=" + document.getElementById("comment").value;
    window.open(url, "_self");
  }
}

var user = false;
var user_clicked = false;

function userToggle() {
  var x = document.getElementById("logins");
  if (x.style.visibility === "hidden") {
    if (app === true) {
      undo_appToggle();
    }
    user = true;
    user_clicked = true;
    document.getElementById("pic").style.height = "34.5px";
    document.getElementById("pic").style.width = "34.5px";

    sleep(50).then(() => {
      x.style.visibility = "visible";
      document.getElementById("pic").style.height = "36px";
      document.getElementById("pic").style.width = "36px";
    });
  } else {
    document.getElementById("pic").style.height = "34.5px";
    document.getElementById("pic").style.width = "34.5px";
    sleep(50).then(() => {
      x.style.visibility = "hidden";
      document.getElementById("pic").style.height = "36px";
      document.getElementById("pic").style.width = "36px";
    });
    user = false;
  }
}
function user_clicked_on() {
  user_clicked = true;
}

function undo_userToggle() {
  var x = document.getElementById("logins");
  if (x.style.visibility === "visible") {
    x.style.visibility = "hidden";
    app = false;
  }
}

var app = false;
var app_clicked;
var desc_clicked = false;

function appToggle() {
  var x = document.getElementsByClassName("active")[0];
  // var x = document.getElementById("Mydiv");
  if (x.style.display === "none") {
    x.style.display = "grid";
    if (user === true) {
      undo_userToggle();
    }
    app = true;
    app_clicked;
    document.getElementById("apps").style.height = "30.5px";
    document.getElementById("apps").style.width = "30.5px";

    sleep(50).then(() => {
      x.style.display = "grid";
      document.getElementById("apps").style.height = "33px";
      document.getElementById("apps").style.width = "33px";
    });
  } else {
    document.getElementById("apps").style.height = "30.5px";
    document.getElementById("apps").style.width = "30.5px";
    sleep(50).then(() => {
      x.style.display = "none";
      document.getElementById("apps").style.height = "33px";
      document.getElementById("apps").style.width = "33px";
    });
    app = false;
  }
}

function undo_appToggle() {
  var x = document.getElementsByClassName("active")[0];
  if (x.style.display === "grid") {
    x.style.display = "none";
    user = false;
  }
}

function app_clicked_on() {
  app_clicked = true;
}
function description_clicked_on() {
  desc_clicked = true;
}
document.addEventListener("click", back_clicked);
function back_clicked() {
  if (user_clicked) {
    user_clicked = false;
  } else {
    undo_userToggle();
  }
  if (app_clicked) {
    app_clicked = false;
  } else {
    undo_appToggle();
  }

  if (desc_clicked) {
    desc_clicked = false;
  } else {
    document.getElementById("description_container").style.visibility =
      "hidden";
  }
}

function wind() {
  if (window.innerHeight <= 584 && window.innerWidth <= 1080) {
    document.getElementById("l").style.visibility = "hidden";
  } else {
    if (window.innerHeight <= 455) {
      document.getElementById("l").style.visibility = "hidden";
    } else {
      document.getElementById("l").style.visibility = "visible";
    }
  }
  sleep(1).then(() => {
    //update every 5 seconds
    wind();
  });
}

function cal_icon() {
  if(window.navigator.onLine){
    let date = new Date().getDate();
    if (date < 10) {
      string_date = "0" + date.toString();
    } else {
      string_date = date.toString();
    }
    document.getElementsByClassName("calendarimg")[0].src =
    "https://ssl.gstatic.com/calendar/images/dynamiclogo/2x/cal_" +
    string_date +
    "_v1.png";
    document.getElementsByClassName("calendarimg")[1].src =
    "https://ssl.gstatic.com/calendar/images/dynamiclogo/lUkwQcfJg4wWmQhhAFLWO0z3HjG6yOs9/calendar_" +
    date.toString() +
    "_2x.png";
    document.getElementsByClassName("calendarimg")[2].src =
    "https://ssl.gstatic.com/calendar/images/dynamiclogo/lUkwQcfJg4wWmQhhAFLWO0z3HjG6yOs9/calendar_" +
    date.toString() +
    "_2x.png";
  }
}
color = "#7300ff";

function start_color() {
  /*date/time*/
  document.getElementById("time").style.color = color;
  document.getElementById("month").style.color = color;
}

profiles = ["../images/anon.png"];
profile_info = {
  "../images/anon.png":
    "<img id='img_user2' src='../images/anon.png' width='36' height='36'/>",
};

var interval_set = false;
function drawthing(check) {
  if (check) {
    interval_set = true;
    document.getElementById("c").style.visibility = "visible";

    // geting canvas by id c
    var c = document.getElementById("c");
    var ctx = c.getContext("2d");

    //making the canvas full screen
    c.height = window.innerHeight * 2;
    c.width = window.innerWidth * 2;

    //chinese characters - taken from the unicode charset
    // var matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    var matrix = "01";
    //converting the string into an array of single characters
    matrix = matrix.split("");

    var font_size = 10;
    var columns = c.width / font_size; //number of columns for the rain
    //an array of drops - one per column
    var drops = [];
    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for (var x = 0; x < columns; x++) drops[x] = 1;

    //drawing the characters
    function draw() {
      //Black BG for the canvas
      //translucent BG to show trail
      ctx.fillStyle = "rgba(5, 5, 5, .06)";
      // ctx.fillStyle = "rgba(0,0,0,.06)";
      ctx.fillRect(0, 0, c.width, c.height);

      ctx.fillStyle = color; 
      ctx.font = font_size + "px arial";
      //looping over drops
      for (var i = 0; i < drops.length; i++) {
        //a random chinese character to print
        var text = matrix[Math.floor(Math.random() * matrix.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * font_size > c.height && Math.random() > 0.975)
          drops[i] = 0;

        //incrementing Y coordinate
        drops[i]++;
      }
    }

    d = setInterval(draw, 35);

    function size() {
      if (c.height < window.innerHeight*2) {
        c.height = window.innerHeight*4;
      }
      if (c.width < window.innerWidth*2) {
        c.width = window.innerWidth*4;
        columns = c.width / font_size;
        for (var x = 0; x < columns; x++) drops[x] = 1;
      }
    }
    s = setInterval(size, 100);
  } else {
    c = document.getElementById("c");
    if (interval_set) {
      clearInterval(d);
      clearInterval(s);
      const context = c.getContext("2d");
      context.clearRect(0, 0, c.width, c.height);
      c.style.visibility = "hidden";
    }
  }
}