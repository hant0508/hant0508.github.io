function inIframe()
{
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

alert("I'm alive!")
if (inIframe()) alert("VK DERECTED");
else alert("hmmmm");
