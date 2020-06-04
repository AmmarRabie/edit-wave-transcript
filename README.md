# edit-wave-transcript
react component for transcription editing with ability to edit wave-forms also. synchronization is done between words and wave-forms.

## Demo
here is a [video](https://youtu.be/YDfl3NOOUc8) for the first demo. I am also running on live demo website. <br>
[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/YDfl3NOOUc8/0.jpg)](http://www.youtube.com/watch?v=YDfl3NOOUc8)

## Use Cases
- Speech synthesis over original sound. This is the basic use case that inspired me to build this component. The project enables users to edit(insert/delete/replace) existing or new text and sync is done over the sound file.
- ... (tell me about your use case for better development of the component)

## Before you continue
Please note the following before you continue using the component. This might save you some time.
* Currently, most of the UI is built with [antd](https://ant.design/) library. You almost have to use it. (I will consider use my own styles later).
* This is just a react component for the user interface only. We don't synthesis new words or do any backend stuff.
* If you just want a transcription editing functionality without sound changing; I don't know, but almost you can find other ones fitting your own use case. I will be happy if you prefer mine :) ❤
* For any bugs, any questions, or if you want any explanations, the github issues are yours.

## What is different
I searched a lot for transcription editing component that enables me to edit the waveform but I didn't find flexible one that I can extend to my own use case. <br>
The main difference here in the component is that it is supplied with custom wave editing; you can insert new word in any position you want.

## Usage
### Installation
`npm install edit-wave-transcript` <br>
### Basic usage
```js
import React from 'react';
import { WaveWords } from 'edit-wave-transcript'

function YourAwesomeApp() {
  const props = {
    src: "you-voice-url" // the original sound file
    alignments: [{
        id: "this is important, this will be the key in the rendered list.",
        word: "the text that will be layed in input field",
        startText: "the original text of this field. keep it as word if they are same so that component know it is not edited"
        start: 0.521, // start time of word in seconds
        end: 1.54 // end time of word in seconds
    },] // the original alignments
    synthesisText: (oldWord, newWord) => { // get the correct sound from the old and new words
        // returns promise of new src

        // this is just a demo, instead get it from the server
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const url = `audio/words/${newWord.word}.mp3`
                resolve(url)
            }, 1000);
        });
        // as an example of the server implementation
        /**
            return axios.post("http://backend/synthesis", text: newWord }).then(res => "http://backend-storage/res.data.fileLocation")`
        **/
    },
  }
  return (
      <WaveWords {...props} />
  );
}
```
### API Reference
In progress. In next patch release

## Contribution
I encourage anyone that wants to add features in the context of the component to contribute. <br>
1. Check the wishlist status down first. And double check that no one working in the same feature or bug [here](https://github.com/AmmarRabie/edit-wave-transcript/labels/contribution)
2. Create a new issue and label it with 'Contribution'. please describe your feautre that you want to add.
3. [Fork it!](https://github.com/AmmarRabie/edit-wave-transcript/fork)
4. Create your feature branch: `git checkout -b my-new-feature`. I prefer to be in the wishlist 
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin my-new-feature`
7. Submit a pull request
8. I will review it as soon as possible, and add it in the next release

### wishlist
- [x] <del>done. will be added in the next release</del>
- [x] on development. 
- [ ] need some awesome one to work on :)

<br>I will try to list most important items first
- [ ] remove restriction of antd design component.
- [ ] build a better reduced size package with webpack or rollup. currently we use only babel to compile
- [x] write the API reference
- [x] publish the demo live example using gh-pages
- [ ] enable the user to customize the rendering of the wave
