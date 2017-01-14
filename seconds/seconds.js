var comment;
var time = -1;
var url = document.getElementById("url");
var res = document.getElementById("result");

function seconds(data) {
	var parsed = $.parseHTML(data.responseText);
	var commentTime = $(parsed).find(comment).find("time").first().attr("datetime");
	var postTime = $(parsed).find(".story__date").attr("title");
	time = commentTime - postTime;
	console.log(time);
}

function setRes(str) {
	res.innerHTML = str;
}

function out(s) {
	if (time == -1) {
		if (s == "...") s = "";
		else s += ".";
		window.setTimeout(function(){setRes("Считаем секунды"+s);out(s);}, 500);
		return;
	}
	var sec = " секунд";
	if (time % 100 < 10 || time % 100 > 20) {
		if (time % 10 == 1) sec += "a";
		else if (time % 10 < 5) sec += "ы";
	}
	setRes(time + sec);
	url.focus();
	url.select();
}

function flood() {
	res.innerHTML = "Ищем комментарий";
	window.setTimeout(function(){setRes("Ищем комментарий.");}, 500);
	window.setTimeout(function(){setRes("Ищем комментарий..");}, 1000);
	window.setTimeout(function(){setRes("Ищем комментарий...");}, 1500);
	window.setTimeout(function(){setRes("Звоним L4rever");}, 2000);
	window.setTimeout(function(){setRes("Звоним L4rever.");}, 2500);
	window.setTimeout(function(){setRes("Звоним L4rever..");}, 3000);
	window.setTimeout(function(){setRes("Звоним L4rever..."); out("");}, 3500);
}

document.forms.url.onsubmit = function() {
	var str = url.value;
	var post = str.slice(0, str.indexOf('#'));
	comment = '#'+str.slice(str.indexOf('#')+1);
	$.get(post, seconds, "html");
	flood();
	return false;
}
