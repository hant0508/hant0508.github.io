var comment;
var time;
var diff;
var url = document.getElementById('url');
var res = document.getElementById('result');

function isInt(n) {
  var x = parseFloat(n);
  return !isNaN(n) && (x | 0) === x;
}

function setRes(str, add) {
    if (add == 'add')
        res.innerHTML += str;
    else 
        res.innerHTML = str;

    console.log(res.innerHTML);
}

function fail(code) {
	switch(code) {
		case 1:
			setRes('Мы перерыли все комменты за последние 8 лет, наняли частного детектива и даже изучили архивы Пентагона, но так и не смогли найти нужный комментарий. Вы уверены, что он существует и не спрятан под кнопкой \'показать ещё\'? Тогда напишите об этом на <a href=\'mailto:hant0508@gmail.com?subject=GitHub issue | /seconds\'>hant0508@gmail.com</a>.');
			break;
		case 2:
			setRes('С этим комментом что-то не так. <br /> Ссылка должна иметь вид <i>http://pikabu.ru/story/story_title#comment_12345678</i>');
			break;
		case 3:
			break;
	}

	url.focus();
	url.select();
	document.forms.url.button.disabled = false;
}

function format(sec, gone, t) {
	if (t % 100 < 10 || t % 100 > 20) {
		if (t % 10 == 1) {
            sec += 'a';
            gone += 'a ';
        }
		else if (t % 10 < 5 && t % 10) {
            sec += 'ы';
            gone += 'и ';
        }
        else gone += 'o ';
	}
    else gone += 'о ';

    return {sec:sec, gone:gone};
}

function success() {
    var words = format (' секунд', 'прошл', time);
	setRes('C момента публикации поста ' + words.gone + time + words.sec);

    if (isInt(diff))
    {
        words = format (' секунд', 'прошл', diff);
        setRes('<br /> Ответ был оставлен за ' + diff + words.sec, 'add');
    }

	url.focus();
	url.select();
	document.forms.url.button.disabled = false;
}

function out(dots, counter) {
	if (time == -1 || counter < 3) {
		if (dots == '...') dots = '';
		else dots += '.';
		window.setTimeout(function(){setRes('Считаем секунды'+dots);out(dots, ++counter);}, 400);
		return;
	}

	if (time == -2) fail(1);
	else success();
}

function flood() {
    setRes('Ищем комментарий');
    for (var i = 1; i < 8; ++i) {
        if (i == 4) setTimeout(function(){setRes('Звоним L4rever');}, i*400);
        else setTimeout(function(){setRes('.', 'add');}, i*400);
    }
    window.setTimeout(function(){out('', 0);}, 2800);
}

function seconds(data) {
	var parsed = $.parseHTML(data.responseText);
	var postTime = $(parsed).find('.story__date').attr('title');
	var commentBody = $(parsed).find(comment)[0];
    var commentTime = commentBody.getElementsByTagName('time')[0].getAttribute('datetime');

    var replyBody = commentBody.parentElement.parentElement;
    var replyTime;
    if (replyBody.getAttribute('class') == 'b-comment')
        replyTime = replyBody.getElementsByTagName('time')[0].getAttribute('datetime');

	if (isInt(commentTime) && isInt(postTime)) time = commentTime - postTime;
	else time = -2;
	if (isInt(replyTime)) diff = commentTime - replyTime;

	console.log(commentTime, postTime, replyTime);
	console.log(time, diff);
}

document.forms.url.onsubmit = function() {
	this.button.disabled = true;
	time = -1;
    diff = '';
	var str = url.value;
	var post = str.slice(0, str.indexOf('#'));
	comment = '#'+str.slice(str.indexOf('#')+1);

	if (url.value.match(/^\s*$/)) {
		fail(3);
		return false;
	}

	else if (!comment.match(/#comment_\d/) || !str.match(/https?:\/\/(www\.)?(m\.)?pikabu\.ru\/story/)) {
		fail(2);
		return false;
	}

	if (post.match(/https?:\/\/(www\.)?m\.pikabu\.ru\/story/))
		post = post.replace('m.pikabu', 'pikabu');

	$.get(post, seconds, 'html');
	flood();
	return false;
}
