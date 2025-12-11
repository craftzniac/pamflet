# Pamflet

An interactive flashcard app

It comes with a custom markup language (pamflet-dsl) for authoring the content of flashcards. 

## Pamflet DSL Documentation

### Design philosophy
1. I wanted to make the dsl as mobile friendly as possible and in my mind, that translated to minimizing the use of characters that go beyond those on the default layout on a typical gboard keyboard
2. I wanted the dsl syntax to be almost invisible, so that the user focus more on writing the content rather than writing boiler plate code

### Elements
Pamflet-dsl supports a handful of elements which can be composed to create the front/back of the flashcards. They include;

##### 1. Text
```
Something lives in the water
But yet again, it is not here
.color: green
.fontSize: lg
.textAlign: center
```

##### 2. List
```
- this is the first note
- this is another note
.color: gray
.fontSize: lg
```

##### 3. Multichoice
###### Single select
```
- Hello again
- Say your name -or say nothing
- Don’t stop now, you’ll get better
.color: gray
.fontSize: lg
.colorCorrect: #234900
.colorWrong: red
.correct: 0
```

###### Multiselect
```
- Hello again
- Say your name -or say nothing
- Don’t stop now, you’ll get better
.color: gray
.fontSize: lg
.colorCorrect: #234900
.colorWrong: red
.correct: 0, 1
```

##### 4. Link
```
Lnk "https://example.com/helloworld" Hello world 
.color: blue
.fontSize: 20px
```

##### 5. Audio
```
Aud "sample audio.mp3"
.noControls
.autoplay
```

##### 6. Image
```
Img "dog.png"
Img "https://example.com/user-profile.png"
Img "https://example.com/user-profile.png" This is the alt text
```

##### 7. comment
```
// this is a comment
```
