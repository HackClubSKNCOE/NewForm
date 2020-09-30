"use strict";

var pathEls = document.querySelectorAll("path");
for (var i = 0; i < pathEls.length; i++) {
  var pathEl = pathEls[i];
  var offset = anime.setDashoffset(pathEl);
  pathEl.setAttribute("stroke-dashoffset", offset);
  anime({
    targets: pathEl,
    strokeDashoffset: [offset, 0],
    duration: anime.random(1000, 3000),
    delay: anime.random(0, 2000),
    loop: true,
    direction: "alternate",
    easing: "easeInOutSine",
    autoplay: true,
  });
}

function scrollToSection(id) {
  var ele = document.getElementById(id);
  ele.scrollIntoView(true);
}

function scrollToPage(id) {
  window.location.href = "/#team";
  var ele = document.getElementById(id);
  ele.scrollIntoView(true);
}

//AIRTABLE FORM

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  let x = document.querySelector("form").elements;

  fetch("/api/airtable", {
    method: "POST",

    // Adding body or contents to send
    body: JSON.stringify({
      name: x["fullname"].value,
      rollno: x["Roll"].value,
      division: x["Division"].value,
      year: x["year"].value,
      branch: x["branch"].value,
    }),

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    // Converting to JSON
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })

    // Displaying results to console
    .then((json) => {
      document.querySelector("form").classList.add("is-hidden");
      document.querySelector("#success").classList.remove("is-hidden");
      //DO ERROR HANDLING HERE
    })
    .catch((error) => {
      document.querySelector("form").classList.add("is-hidden");
      document.querySelector("#unsuccess").classList.remove("is-hidden");
    });
});
