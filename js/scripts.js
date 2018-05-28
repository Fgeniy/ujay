//Создаем ф-цию для получения данных локально
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//используем ф-цию
readTextFile("data.json", function(text) {
    var data = JSON.parse(text);

    for (var i in data.events) {
        var nums = i;

        //Создаем карточки городов и назначаем им css-классы
        var card = document.createElement('div');
        var id = document.createElement('p');
        var region = document.createElement('p');
        var city = document.createElement('p');
        var category = document.createElement('p');

        card.classList.add('card');
        id.classList.add('id');
        region.classList.add('region');
        city.classList.add('city');
        category.classList.add('category');
        //Наполняем карточки данными из JSON-a
        id.innerHTML = "ID:" + nums;
        region.innerHTML = "Область: " + data.events[i].region;
        city.innerHTML = "Город: " + data.events[i].city;
        category.innerHTML = "Категория: " + data.events[i].category;
        //Вставляем данные в карточку
        card.appendChild(id);
        card.appendChild(region);
        card.appendChild(city);
        card.appendChild(category);


        // Вставляем карточки с данными в HTML
        document.querySelector('.cards').appendChild(card);
        // Фильтрация карточек по выбору пользователя
        if (document.querySelectorAll(".region_select option").value == "all_regions")
            console.log(document.querySelectorAll(".card p.region"))
    }
})

var elem = document.querySelector(".region_select");

elem.addEventListener('select', function() {
    alert('Selection changed!');
}, false);