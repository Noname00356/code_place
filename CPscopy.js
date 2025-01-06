"use strict";

let number=0;
const cp = document.querySelector('#cp');
document.querySelector('#post').addEventListener('click', () => {
    const radio1 = document.querySelector('input[name="radio"]:checked').value;
    const code = document.querySelector('#code').value;
    const date = document.querySelector('#date').value;
    const name = document.querySelector('#name').value;
    const comment = document.querySelector('#comment').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'radio1='+radio1+'&date='+date+'&code='+code+'&name='+name+'&comment='+comment,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#comment').value = "";
    });
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
        if( number != value ) {
            const params = {
                method: "POST",
                body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.comments.length;
                for( let com of response.comments ) {
                    console.log( com );  // 表示する投稿
                    let cover = document.createElement('div');
                    cover.className = 'cover';
                    let type_area = document.createElement('span');
                    type_area.className = 'type';
                    type_area.innerText = com.type;
                    let code_area = document.createElement('p');
                    code_area.className = 'code';
                    code_area.innerText = com.code;
                    let date_area = document.createElement('span');
                    date_area.className = 'date';
                    date_area.innerText = com.date;
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = com.name;
                    let com_area = document.createElement('span');
                    com_area.className = 'mes';
                    com_area.innerText = com.comment;
                    cover.appendChild( type_area );
                    cover.appendChild( code_area );
                    cover.appendChild( date_area );
                    cover.appendChild( name_area );
                    cover.appendChild( com_area );

                    cp.appendChild( cover );
                }
            })
        }
    });
});