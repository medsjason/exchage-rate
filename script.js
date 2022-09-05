const input = document.getElementById("input");
const search_btn = document.getElementById("search_btn")
const apiKey = "9d0f6f47-1dc0-4b68-854c-d85b80d64594";
const not_found = document.querySelector('.not_found')
const definition_box1 = document.querySelector('.def')
// const definition_box2 = document.querySelector('show2')
const audio_box = document.querySelector('.audio')

search_btn.addEventListener('click', e => {
    e.preventDefault();

    const word = input.value;
    if (word == "") {
        alert('please type a request');
        return;
    }

    dataGet(word);

    audio_box.innerHTML = "";
    not_found.innerHTML = "";
    definition_box.innerHTML = "";

})

async function dataGet(word){
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/sd4/json/${word}?key=${apiKey}`);
    const data = await response.json();
    console.log(data);

    // if(!data.lenght) {
    //     not_found.innerText = "No result found";
    //     return;
    // }

    if(typeof data[3] === 'string') {
        let heading = document.createElement('h3');
        heading.innerHTML = "Did you mean?";
        not_found.appendChild(heading);

        data.forEach(element => {
            let suggestion = document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            not_found.appendChild(suggestion);
        });
        return;
    }
    let definition1 = data[0].shortdef[0];
    let definition2 = data[0].shortdef[1];
    let definition3 = data[0].shortdef[2];
    definition_box1.innerHTML = definition1 + " " + definition2 + " " + definition3;

    // let show_2 = data[0].shortdef[0];
    // definition_box2.innerHTML = show_2;

    let sound_name = data[0].hwi.prs[0].sound.audio;
    if (sound_name){
        soundRender(sound_name);
    }
}

function soundRender(sound_name){
    let sub_folder = sound_name.charAt(0);
    sound_src = `https://media.merriam-webster.com/soundc11/${sub_folder}/${sound_name}.wav?key=${apiKey}`;

    let aud = document.createElement('audio');
    aud.src = sound_src;
    aud.controls = true;
    audio_box.appendChild(aud) 
}