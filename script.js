function inIframe()
{
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function f()
{
	if (inFrame()) alert('VK DERECTED');
}
