import "./howler.js";

export function turnSound() {
    let sound = new Howl({
        src: ['./media/fin.wav']
    });
    sound.play();
}