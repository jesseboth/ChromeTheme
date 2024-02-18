window.addEventListener('message', function(event) {
  // Handle the message from iframe
  window.open(event.data, "_self");
});

