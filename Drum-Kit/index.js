const keys = ['w', 'a', 's', 'd', 'j', 'k', 'l'];
const soundSrcs = [
    './sounds/tom-1.mp3', 
    './sounds/tom-2.mp3', 
    './sounds/tom-3.mp3', 
    './sounds/tom-4.mp3',
    './sounds/snare.mp3',
    './sounds/crash.mp3',
    './sounds/kick-bass.mp3'
]

const addAllListeners = () => {
    for (const [index, kBtn] of keys.entries()) {
        const sound = new Audio(soundSrcs[index]);
        document.addEventListener('keydown', e => {
            if (e.key === kBtn) {
                sound.play();
            }
        })
        document.querySelector(`.${kBtn}`).addEventListener('click', () => {
            sound.play()
        })
    }
}

addAllListeners(); 