function updateTime() {
  var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ];
  var week = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ];
  var datetime = new Date();

  var month_num = datetime.getMonth();
  var hour = datetime.getHours();
  var minutes = add_zero(datetime.getMinutes());
  var current_time = get_12_hour(hour, minutes, true);
  var time_24 = hour.toString() + minutes.toString();
  var month = months[month_num];
  var day = datetime.getDate();
  var year = datetime.getFullYear();
  var day_of_week = week[datetime.getDay()];
  var date = day_of_week + ", " + month + " " + day;
  key = add_zero(month_num + 1) + "/" + add_zero(day) + "/" + year.toString();
  var seconds = datetime.getSeconds();

  document.getElementById("time").innerHTML = current_time;
  document.getElementById("month").innerHTML = date;
}

function get_12_hour(hour, minutes, check) {
  var new_hour = 0;
  var am_pm = "";
  if (parseInt(hour) > 12) {
    if (parseInt(hour) === 24) {
      new_hour = parse(hour) - 12;
      am_pm = " AM";
    } else {
      new_hour = parseInt(hour) - 12;
      am_pm = " PM";
    }
  } else {
    if (parseInt(hour) === 12) {
      new_hour = parseInt(hour);
      am_pm = " PM";
    } else {
      if (parseInt(hour) === 0) {
        new_hour = 12;
        am_pm = " AM";
      } else {
        new_hour = parseInt(hour);
        am_pm = " AM";
      }
    }
  }
  if (check) {
    am_pm = "";
  }
  return new_hour + ":" + minutes + am_pm;
}

function get_12_hour_int(time_24) {
  var str = add_zero(time_24);
  if (time_24 < 100) {
    str = add_zero_24(time_24);
  }
  time = get_12_hour(str[0] + str[1], str[2] + str[3]);
  return time;
}

function add_zero(i) {
  if (i >= 100) {
    return add_zero_24(i);
  } else if (i < 10) {
    return "0" + i.toString();
  } else {
    return i.toString();
  }
}

function add_zero_24(i) {
  if (i < 10) {
    return "000" + i.toString();
  }
  if (i < 100) {
    return "00" + i.toString();
  } else if (i < 1000) {
    return "0" + i.toString();
  } else {
    return i.toString();
  }
}