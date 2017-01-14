var comment;
var time;
var url = document.getElementById("url");
var res = document.getElementById("result");

function isInt(n) {
  var x = parseFloat(n);
  return !isNaN(n) && (x | 0) === x;
}

function setRes(str) {
	res.innerHTML = str;
}

function fail(code) {
	switch(code) {
		case 1:
			setRes("Мы перерыли все комменты за последние 8 лет, наняли частного детектива и даже изучили архивы Пентагона, но так и не смоги найти нужный коммент. <br /> Вы уверены, что он существует и не спрятан под кнопкой \"показать ещё n комментариев\"? Тогда напишите об этом на <a href=\"mailto:hant0508@gmail.com?subject=GitHub issue | /seconds\">hant0508@gmail.com</a>.");
			break;
		case 2:
			setRes("С этим комментом что-то не так. <br /> Ссылка должна иметь вид http://pikabu.ru/story/story_title#comment_12345678");
	}

	url.focus();
	url.select();
	document.forms.url.button.disabled = false;
}

function success(){
	var sec = " секунд";
	if (time % 100 < 10 || time % 100 > 20) {
		if (time % 10 == 1) sec += "a";
		else if (time % 10 < 5) sec += "ы";
	}

	setRes(time + sec);
	url.focus();
	url.select();
	document.forms.url.button.disabled = false;
}

function out(dots, counter) {
	if (time == -1 || counter < 3) {
		if (dots == "...") dots = "";
		else dots += ".";
		window.setTimeout(function(){setRes("Считаем секунды"+dots);out(dots, ++counter);}, 500);
		return;
	}

	if (time == -2) fail(1);
	else success();
}

function flood() {
	res.innerHTML = "Ищем комментарий";
	window.setTimeout(function(){setRes("Ищем комментарий.");}, 500);
	window.setTimeout(function(){setRes("Ищем комментарий..");}, 1000);
	window.setTimeout(function(){setRes("Ищем комментарий...");}, 1500);
	window.setTimeout(function(){setRes("Звоним L4rever");}, 2000);
	window.setTimeout(function(){setRes("Звоним L4rever.");}, 2500);
	window.setTimeout(function(){setRes("Звоним L4rever..");}, 3000);
	window.setTimeout(function(){setRes("Звоним L4rever..."); out("", 0);}, 3500);
}

function seconds(data) {
	var parsed = $.parseHTML(data.responseText);
	var commentTime = $(parsed).find(comment).find("time").first().attr("datetime");
	var postTime = $(parsed).find(".story__date").attr("title");

	if (isInt(commentTime) && isInt(postTime)) time = commentTime - postTime;
	else time = -2;

	console.log(commentTime, postTime);
	console.log(time);
}

document.forms.url.onsubmit = function() {
	this.button.disabled = true;
	time = -1;
	var str = url.value;
	var post = str.slice(0, str.indexOf('#'));
	comment = '#'+str.slice(str.indexOf('#')+1);

	if (!comment.match(/#comment_\d/) || !str.match(/https?:\/\/(www\.)?pikabu\.ru\/story/)) {
		fail(2);
		return false;
	}

	$.get(post, seconds, "html");
	flood();
	return false;
}
