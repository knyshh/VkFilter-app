(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

let searchField = document.getElementById('searchInput'),
    frindslist = document.getElementById('results'),
    filteredList = document.getElementById('filteredList'),
    workArea = document.querySelector('.filter__list-wrap');

function deleteFromList(role, uid){ //удалить наш список фильтра

}

function addToList(role, uid){ //обновить в  наш список в фильтр

}

function toogleBtn(el){
    if (el.dataset.btn == 'addtolist' ){
        el.classList.remove('fa-plus');
        el.classList.add('fa-minus');
        el.dataset.btn = 'delete';
    }
    else if (el.dataset.btn == 'delete') {
        el.classList.remove('fa-minus');
        el.classList.add('fa-plus');
        el.dataset.btn = 'addtolist';
    }
}

function filter(e) {//search
    let value = e.target.value;
    let name = item.querySelector('.filter__name');


    //let  searchList = serverAnswer.response.filter(item.first_name => item.first_name.indexOf(e.target.value) != -1); //есть  подстрока
    //serverAnswer.response.response[0].first_name
    /*  let source = document.querySelector('#searchInput').innerHTML;
     let templateFn = Handlebars.compile(source);
     let template = templateFn({list: searchList});
     results.innerHTML = template;*/
}

function check(e,value){
    let newarr = [];
    newarr = value.filter(function(a) {
        console.log(a.first_name);
        console.log(e.target.value);
        if (a.first_name.indexOf(e.target.value) != -1) {
            if(e.target.value.length > 0 ) {

                let source =  friendsItem.innerHTML;
                let templateFn = Handlebars.compile(source);
                let template = templateFn({list: newarr});
                results.innerHTML = template
            }
        }
        else {
            console.log('ffff');
        }
    });
}

function moveToFilter(e, tagret){
        let item = e.target.closest('.filter__item'); //container текущего пользователя
        let filterContainer = document.getElementById('filteredList'); //cоседний контейнер куда вставляем  елемент
    if(e.target.dataset.btn == 'addtolist') {
        toogleBtn(e.target);
        filterContainer.appendChild(item);  //перенести в дом в фильтр
    }
}

function removeFromFilter(e, tagret){
    let item = e.target.closest('.filter__item'); //container текущего пользователя
    let filterContainer = document.querySelector('#friendsList'); // контейнер куда вставляем  елемент

    if(e.target.dataset.btn == 'delete') {
        toogleBtn(e.target);
        filterContainer.insertBefore(item, filterContainer.firstChild);
    }
}

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
        VK.api('friends.get', {v: '5.53',fields: 'photo_50,first_name,last_name,bdate',name_case: 'nom'}, function(serverAnswer) {

            if (serverAnswer.error) {
                reject(new Error(serverAnswer.error.error_msg));
            } else {
                let source = friendsItem.innerHTML;
                let templateFn = Handlebars.compile(source);
                let template = templateFn({ list:  serverAnswer.response.items });
                results.innerHTML = template;
                
                searchField.addEventListener('keyup', function(e){check(e,arr)} );

               /* document.querySelectorAll('.filter-input').forEach(el => {
                    el.addEventListener('keyup', e => this.filterList(e));
                });*/

                frindslist.addEventListener('click', function(e){moveToFilter(e)} );
                filteredList.addEventListener('click', function(e){removeFromFilter(e)} );

                //workArea.addEventListener('dragstart', function(e){dragStart(e)});
                //workArea.addEventListener('dragover', function(e){dragOver(e)});
                //workArea.addEventListener('drop', function(e){drop(e)});

                resolve();
            }
        });
    });
}).catch(function(e) {
    alert(`Ошибка: ${e.message}`);
});



},{}]},{},[1])