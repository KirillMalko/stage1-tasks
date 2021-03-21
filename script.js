const btns = document.querySelectorAll('.btn');
let keys = document.querySelectorAll('.piano-key');
let piano = document.querySelectorAll('.piano');
let isMouseDown;
window.addEventListener('keydown', playSound);
document.querySelector('.fullscreen').addEventListener('click', toggleScreen);
keys.forEach(key => {
    key.addEventListener('mouseover', playNoteForMouseOver);
    key.addEventListener('click', playNote);
    key.addEventListener('mousedown', onMouseDown);
    // key.addEventListener('mouseup', onMouseUp);
    key.addEventListener('transitionend', removeTransition);

});

window.addEventListener('mouseup', onMouseUp);


function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const letter = e.code.replace('Key', '');
    const key = document.querySelector(`div[data-letter="${letter}"]`);
    if (!audio) return;
    key.classList.add('piano-key-active');
    key.classList.add('piano-key-active-pseudo');
    audio.currentTime = 0;
    audio.play();
    audio.addEventListener('ended', () => {
        key.classList.remove('piano-key-active');
        key.classList.remove('piano-key-pseudo');
    });
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('active');
}

function keyup(e){

}


function toggleScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.fullscreenEnabled) {
            document.exitFullscreen();
        }
    }
}



function btnSwitch(e) {
    if (e.target.classList.contains('btn-letters')) {
        keys.forEach((e) => {
            e.classList.add('piano-key-letter');
            btns.forEach((e) => {
                e.classList.toggle('btn-active')
            })
        })
    } else {
        keys.forEach((e) => {
            e.classList.remove('piano-key-letter');
            btns.forEach((e) => {
                e.classList.toggle('btn-active');
            })
        })
    }
}

btns.forEach((e) => {
    e.addEventListener('click', btnSwitch);
})


document.querySelector('.btn-letters').onclick = function () {
    document.querySelector('.btn-notes').classList.remove('btn-active');
    document.querySelector('.btn-letters').classList.add('btn-active');
}

document.querySelector('.btn-notes').onclick = function () {
    document.querySelector('.btn-letters').classList.remove('btn-active')
    document.querySelector('.btn-notes').classList.add('btn-active');
}

function onMouseDown(e) {
    isMouseDown = true;
}

function onMouseUp(e) {
    isMouseDown = false;

}

function playNoteForMouseOver(e) {
    if (isMouseDown) {// need add event
        playNote(e);
        e.target.style.transform = 'scale(1)';
        // add reset event
    }
}

function playNote(e) {
    let key = e.target;
    let note = document.getElementById(key.dataset.note);
    key.classList.add('active');
    note.currentTime = 0;
    note.play();
    note.addEventListener('ended', () => {
        key.classList.remove('active');
    });

}