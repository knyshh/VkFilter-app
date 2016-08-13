(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

let searchField = document.getElementById('searchInput'),
    searchFieldinFilter = document.getElementById('searchInputInFilter'),
    frindslist = document.getElementById('results'),
    filteredList = document.getElementById('filteredList'),
    workArea = document.querySelector('.filter__list-wrap');

function deleteFromList(role, uid){ //удалить наш список фильтра

}

function addToList(role, uid){ //обновить в  наш список в фильтр

}
let drag;
var dragSrcEl = null;
function handledragEnd(e) {
    drag = e.target.closest('.filter__item');
    console.log('dragend');
    drag.style.opacity = 1;
}
function handledragStart(e) {
    console.log('dragstart');
    dragSrcEl = this;
    drag = e.target.closest('.filter__item');
    drag.style.opacity = .5;
    drag.classList.add('move');

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.drag);

    return true;
}
function handleDragEnter(e) {
    // this / e.target is the current hover target.
    this.classList.add('over');
}
function handleDragLeave(e) {
    this.classList.remove('over');  // this / e.target is previous target element.
}
function handledragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    console.log('dragover');
    return false;
}

function handleDrop(e) {
    let filterContainer = document.getElementById('filteredList'); //cоседний контейнер куда вставляем  елемент
    let filterContainer2 = document.querySelector('#friendsList');
    let btn = drag.querySelector('.filter__addfriend');

        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');

    if(e.target.className == "filter__list-container--filterred"){
        toogleBtn(btn);
        filterContainer.appendChild(drag);
    }
    else if(e.target.className == "filter__row"){
        console.log('className'+e.target.className);
        toogleBtn(btn);
        filterContainer2.insertBefore(drag, filterContainer2.firstChild);
    };
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


function check2(e,value){
   /* let  newarr = value.filter(function(a) {
        if ((a.first_name.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1) ||  (a.last_name.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1)) {
            return  true;
        }
        else {
            return false;
        }
    })*/

    let filteredItmes = document.querySelectorAll('#filteredList .filter__row');
    let valuetarget = e.target.value;

    filteredItmes.forEach(item => {
        let fullname = item.querySelector('.filter__name').textContent;
        if(!fullname.toLowerCase().includes(valuetarget.toLowerCase())){
            item.classList.add('hidden');
        }else if(item.classList.contains('hidden')){
            item.classList.remove('hidden');
        }
});

}

function check(e,value){
   let  newarr = value.filter(function(a) {

        if ((a.first_name.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1) ||  (a.last_name.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1)) {
            return  true;
        }
        else {
            return false;
       }
    });

    let source =  friendsItem.innerHTML;
    let templateFn = Handlebars.compile(source);
    let template = templateFn({list: newarr});
    results.innerHTML = template;
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

                //поиск
                searchField.addEventListener('keyup', function(e){check(e,serverAnswer.response.items)} );
                searchFieldinFilter.addEventListener('keyup', function(e){check2(e)} );

                //gперенос удаление из списка
                frindslist.addEventListener('click', function(e){moveToFilter(e)} );
                filteredList.addEventListener('click', function(e){removeFromFilter(e)} );

                workArea.addEventListener('dragstart', function(e){handledragStart(e)},false);
                workArea.addEventListener('dragend', function(e){handledragEnd(e)});
                workArea.addEventListener('dragover', function(e){handledragOver(e)});
                workArea.addEventListener('dragenter', handleDragEnter, false)
                workArea.addEventListener('dragleave', handleDragLeave, false);
                workArea.addEventListener('drop', function(e){handleDrop(e)});

                resolve();
            }
        });
    });
}).catch(function(e) {
    alert(`Ошибка: ${e.message}`);
});



},{}]},{},[1])