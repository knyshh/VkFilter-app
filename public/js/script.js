(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

let searchField = document.getElementById('searchInput'),
    searchFieldinFilter = document.getElementById('searchInputInFilter'),
    frindslist = document.getElementById('results'),
    filteredList = document.getElementById('results2'),
    saveBtn = document.querySelector('.filter-save-js'),
    workArea = document.querySelector('.filter__list-wrap');

    let inList = JSON.parse(localStorage.getItem('inList')) || [];  //
    let outList = JSON.parse(localStorage.getItem('outList'));


/*------ drag n drop functions ---------*/
    let drag;
    let dragSrcEl = null;
    function handledragEnd(e) {
        drag = e.target.closest('.filter__item');
        drag.style.opacity = 1;
        drag.dataset.list = 'filter';
    }
    function handledragStart(e) {
        dragSrcEl = this;
        drag = e.target.closest('.filter__item');
        drag.style.opacity = .5;
        drag.classList.add('move');

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.drag);

        return true;
    }
    function handleDragEnter(e) {
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
        return false;
    }

    function handleDrop(e) {
        let filterContainer = document.getElementById('filteredList'),
            filterContainer2 = document.getElementById('friendsList'),
            btn = drag.querySelector('.filter__addfriend'),
            id = drag.dataset.id, //id пользователя которого переносим
            itemOut = outList.findIndex(item => item == id),
            itemOutList = drag.dataset.id, //id пользователя которого удаляем
            itemInList = inList.findIndex(item => item == itemOutList);

            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');

        if(drag.dataset.list == "main"){
            toogleBtn(btn);
            filterContainer.appendChild(drag);

            //update data for localstorage
            inList.push(id);
            outList.splice(itemOut, 1);

            /*console.log('id delete from main list - dragtoFilter'+id);
            console.log('index from array-dragtoFilter'+itemOut);
            console.log('inlist-dragtoFilter'+inList);
            console.log('outlist-dragtoFilter'+outList);*/
        }
        else if(drag.dataset.list == "filter"){
            toogleBtn(btn);
            filterContainer2.insertBefore(drag, filterContainer2.firstChild);

            //update data for localstorage
            outList.push(itemOutList);
            inList.splice(itemInList,1);

            /*console.log('id пользователя которого удаляем from filter -dragtoMain'+id);
            console.log('indexBack-dragtoMain'+itemOut);
            console.log('inlist-dragtoMain'+inList);
            console.log('inlist-dragtoFMain'+outList);*/
        }

    }
/*------ /end drag n drop functions ---------*/

//toogle class,data attr and icon
    function toogleBtn(el){
        if (el.dataset.btn == 'addtolist' ){
            el.classList.remove('fa-plus');
            el.classList.add('fa-close');
            el.dataset.btn = 'delete';
            el.closest('.filter__item').dataset.list ='filter';
        }
        else if (el.dataset.btn == 'delete') {
            el.classList.remove('fa-close');
            el.classList.add('fa-plus');
            el.dataset.btn = 'addtolist';
            el.closest('.filter__item').dataset.list ='main';
        }
    }

//search function in list with  filtered friends
    function search2(e,value){
        let filteredItmes = document.querySelectorAll('#filteredList .filter__row'),
            valuetarget = e.target.value;

        filteredItmes.forEach(item => {
            let fullname = item.querySelector('.filter__name').textContent;
            if(!fullname.toLowerCase().includes(valuetarget.toLowerCase())){
                item.classList.add('hidden');
            }else if(item.classList.contains('hidden')){
                item.classList.remove('hidden');
            }
        });
    }

//search function in list with all friends
    function search(e,value){
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

//function moving to filter items with friends
    function moveToFilter(e, tagret , responsearray){
        let item = e.target.closest('.filter__item'), //container текущего пользователя
            id = e.target.closest('.filter__item').dataset.id, //id пользователя которого добавляем
            itemOut = outList.findIndex(item => item == id),
            filterContainer = document.getElementById('filteredList'); //cоседний контейнер куда вставляем  елемент

        if(e.target.dataset.btn == 'addtolist') {
            toogleBtn(e.target);
            filterContainer.appendChild(item);

            //update data for localstorage
            inList.push(id);
            outList.splice(itemOut, 1);
        }
    }

//function removing to filter items with filtered frinds to the list  woth all frinds
    function removeFromFilter(e){
        let item = e.target.closest('.filter__item'); //container current friends
        let filterContainer = document.querySelector('#friendsList'); // container which is inserted element

        let itemOutList = e.target.closest('.filter__item').dataset.id; //id пользователя которого удаляем
        let itemInList = inList.findIndex(item => item == itemOutList);

        if(e.target.dataset.btn == 'delete') {
            toogleBtn(e.target);
            filterContainer.insertBefore(item, filterContainer.firstChild);

            //update data for localstorage
            outList.push(itemOutList);
            inList.splice(itemInList,1);

        }
    }

//save data
    function saveData(e){
        localStorage.setItem('inList', JSON.stringify(inList));
        localStorage.setItem('outList', JSON.stringify(outList));
        //localStorage.clear();
    }

//function for displaying lists
    function displayList(container,templateHtml,outList) {
        let source = templateHtml.innerHTML;
        let compileTemplate = Handlebars.compile(source);
        let template = compileTemplate({ list:  outList })
        container.innerHTML = template;
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
        VK.api('friends.get', {v: '5.53',fields: 'id,photo_50,first_name,last_name,bdate',name_case: 'nom'}, function(serverAnswer) {

            if (serverAnswer.error) {
                reject(new Error(serverAnswer.error.error_msg));
            } else {

                let newarr= [];
                let arrayId =  serverAnswer.response.items.filter(function(item,i,arr) {
                    newarr.push(item.id);
                    return true;
                });
                outList = JSON.parse(localStorage.getItem('outList')) ||  newarr;

                console.log('outList-start'+outList);
                console.log('intList-syart'+inList);
                console.log('len outList'+outList.length);

                let setFilterList = serverAnswer.response.items.filter(function(item,i) {
                    for(let i = 0; i< inList.length; i++) {
                        if(item.id == inList[i]){
                            return true;
                        }
                    }
                });

                let setFilterAll = serverAnswer.response.items.filter(function(item,i) {
                    for(let j = 0; j < outList.length; j++) {
                        if(item.id == outList[j]){
                            return true;
                        }
                    }
                });

                //set lists
                displayList(results, friendsItem, setFilterAll); //set list friends
                displayList(filteredList, filteredListTemplate, setFilterList); //set list friends in filter

                //search
                searchField.addEventListener('keyup', function(e){search(e,setFilterAll)} );
                searchFieldinFilter.addEventListener('keyup', function(e){search2(e)} );

                //move of remove from the list
                frindslist.addEventListener('click', function(e){moveToFilter(e)} );
                filteredList.addEventListener('click', function(e){removeFromFilter(e)} );

                //work with events drag'n'drop
                workArea.addEventListener('dragstart', function(e){handledragStart(e)},false);
                workArea.addEventListener('dragend', function(e){handledragEnd(e)});
                workArea.addEventListener('dragover', function(e){handledragOver(e)});
                workArea.addEventListener('dragenter', handleDragEnter, false)
                workArea.addEventListener('dragleave', handleDragLeave, false);
                workArea.addEventListener('drop', function(e){handleDrop(e)});

                //сохранить оба списка
                saveBtn.addEventListener('click',  function(e){saveData(e)});

                resolve();
            }
        });
    });
}).catch(function(e) {
    alert(`Ошибка: ${e.message}`);
});



},{}]},{},[1])