function loadScript(urls, callback) {
    const scriptArr = Array.from(document.getElementsByTagName('script'), (elem) => elem.attributes.src.value);
    const promises = [];
    switch (typeof (urls)) {
        case 'undefined':
            console.error("data type error");
            break;
        case 'function':
            urls();
            break;
        case 'string':
            urls = [urls];
        case 'object':
            if (!Array.isArray(urls)) {
                console.error("data type error");
                break;
            }
            for (let url of urls) {
                if (!scriptArr.includes(url)) {
                    const element = document.createElement("script");
                    element.type = "text/javascript";
                    element.src = url;
                    promises.push(new Promise(resolve => {
                        element.onload = resolve;
                    }));
                    document.body.appendChild(element);
                }
            }
            Promise.all(promises).then(callback);
    }
}