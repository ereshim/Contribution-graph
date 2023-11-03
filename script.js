//создание календаря

// 1) создание дат
function generateDates(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
const dates = [];
const startDate = new Date("2022-10-24");
const endDate = new Date("2023-10-29");
const datesArray = generateDates(startDate, endDate);

datesArray.forEach((date) => {
  dates.push(date.toISOString().slice(0, 10));
});

generateDates();
//получение элемента (графа)
const graph = document.getElementById("graph");

let start = 0;
let length = 6;
// 2) создание элементов календаря (неделя , дни )

for (let i = 0; i < 53; i++) {
  const week = document.createElement("div");
  week.classList.add("week");

  for (let j = start; j <= length; j++) {
    const data = document.createElement("div");
    data.classList.add("data");
    data.id = dates[j];
    const popup = `<div class="popup hidden"> 
    <h6> No contributions</h6>
    <p>${formatDate(data.id)}</p> 
    <img src="./corner.png" alt="">
 </div>`;
    data.innerHTML = popup;
    week.appendChild(data);
  }

  start = length + 1;
  length += 7;
  graph.appendChild(week);
}
const week = document.querySelectorAll(".week");

//форматирование даты в буквенное выражение

function formatDate(dateString) {
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const daysOfWeek = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

  const date = new Date(dateString);
  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${dayOfWeek}, ${month} ${day}, ${year}`;
}

//   3)запрос на сервер

document.addEventListener("DOMContentLoaded", () => {
  async function fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  }

  fetchData("https://dpg.gg/test/calendar.json")
    .then((data) => {
      const contributions = document.querySelectorAll(".data");
      const keys = Object.entries(data);
      // 4) Добавление контрибуций
      keys.map((key) => {
        for (item of contributions) {
          if (key[0] === item.id) {
            contColor(key[1]);
            const popup = `<div class="popup hidden"> 
                              <h6>${key[1]} contributions</h6>
                              <p>${formatDate(item.id)}</p>
                              <img src="./corner.png" alt="">
                           </div>`;
            item.innerHTML = popup;
            return;
          }
        }
      });
      // логика вызова всплывающего элемента (удаление и добавление стилей)
      function remuveStyle() {
        const popups = document.querySelectorAll(".popup");
        for (item of popups) {
          item.classList = "popup hidden";
        }
      }

      contributions.forEach((item) => {
        item.addEventListener("click", (event) => {
          remuveStyle();
          event.target.children[0].classList = "popup";
        });
      });
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
});

//добавление визуальных стилей для контрибций
function contColor(cont) {
  if (cont <= 9) {
    item.classList.add("v2");
  } else if (cont <= 19) {
    item.classList.add("v3");
  } else if (cont <= 29) {
    item.classList.add("v4");
  } else if (cont > 30) {
    item.classList.add("v5");
  }
}
