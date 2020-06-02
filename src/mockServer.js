
export const synthesizeText = (oldWord, newWord) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve("audio/vocals30.mp3");
            // resolve(`https://ssl.gstatic.com/dictionary/static/sounds/oxford/${newWord}--_us_1.mp3`)
            const url = `audio/words/${newWord.word}.mp3`
            console.log(url);
            // promises.access(url).then(() => resolve(url)).catch(err => reject(err));
            resolve(url)
        }, 1000);
    });
}