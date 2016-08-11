(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
new Promise(function(resolve) {
    if (document.readyState === 'complete') {
        resolve();
    } else {
        window.onload = resolve;
    }
}).then(function() {
    return new Promise(function(resolve, reject) {
        VK.init({
            apiId: 5582787
        });

        VK.Auth.login(function(response) {
            if (response.session) {
                resolve(response);
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, 2);
    });
}).then(function() {
    return new Promise(function(resolve, reject) {
        VK.api('friends.get', {v: '5.53',fields: 'photo_100,first_name,last_name,bdate',name_case: 'nom'}, function(serverAnswer) {

            if (serverAnswer.error) {
                reject(new Error(serverAnswer.error.error_msg));
            } else {
                let source = friendsItem.innerHTML;
                let templateFn = Handlebars.compile(source);
                let template = templateFn({ list:  serverAnswer.response.items });

                results.innerHTML = template;

                resolve();
            }
        });
    });
}).catch(function(e) {
    alert(`Ошибка: ${e.message}`);
});
},{}]},{},[1])