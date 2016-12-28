VK.init(function(){}, function(){}, 5.60);
VK.callMethod("showSettingsBox", 0);

// узнаём flashVars, переданные приложению GET запросом. Сохраняем их в переменную flashVars
var parts=document.location.search.substr(1).split("&");
var flashVars={}, curr;
for (i=0; i<parts.length; i++)
{
	curr = parts[i].split('=');
	// записываем в массив flashVars значения. Например: flashVars['viewer_id'] = 1;
	flashVars[curr[0]] = curr[1];
}

// получаем viewer_id из полученных переменных
var viewer_id = flashVars['viewer_id'];

// выполняем запрос получения профиля
VK.api("getProfiles", {uids:viewer_id,fields:"photo_big"}, function(data) {
	// обрабатываем полученные данные
	// выводим имя и фамилию в блок user_info
	document.getElementById('user_info').innerHTML = data.response[0].first_name + ' ' + data.response[0].last_name + '<br />';
	// создаем img, для отображения аватарки
	var image=document.createElement('img');
	// из полученных данных берем ссылку на фото
	image.src=data.response[0].photo_big;
	// добавляем img в блок user_info
	user_info.appendChild(image);
});
