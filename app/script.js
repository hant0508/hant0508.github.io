VK.init(function(){}, function(){}, 5.60);
//VK.callMethod("showSettingsBox", 0);

VK.loadParams(document.location.href);
var viewer_id = VK.params.viewer_id;

// выполняем запрос получения профиля
VK.api("get_friends", {}, function(data) {
	// обрабатываем полученные данные
	// выводим имя и фамилию в блок user_info
	document.getElementById('user_info').innerHTML = data.response[0].id + '<br />';
});
