var cards = document.querySelector('.cards')

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
    // Фильтрация карточек по выбору пользователя
    var region_select = document.querySelector('.region_select');
    var card_region = document.querySelectorAll('p.region');
    var select_value;

    region_select.onchange = function(e) {
        select_value = e.target.value;
        renderFromJSON(select_value);
    }

    var renderFromJSON = function(select_value) {

        if (select_value === "1") {
            data = _.filter(data.events, function(o) {
                return o.region == 'Днепропетровск';

            })
        }

    };


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

        cards.appendChild(card);


    }

})