function loadScript(urls, callback) {
    let scriptArr = Array.from(document.getElementsByTagName('script'), (elem) => elem.attributes.src.value);
    switch (typeof (urls)) {
        case 'undefined':
            break;
        case 'function':
            urls();
            break;
        case 'string':
            urls = [urls];
        case 'object':
            for (let url of urls) {
                if (!scriptArr.includes(url)) {
                    const element = document.createElement("script");
                    element.type = "text/javascript";
                    element.src = url;
                    document.body.appendChild(element);
                }
            }
            document.body.lastChild.onload = callback;
    }
}