import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';

const Meme = () => {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/3si4.jpg"
    })

    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function getMemesData() {
        const memesArrays = allMemes
        const randomNumber = Math.floor(Math.random() * memesArrays.length)
        const url = memesArrays[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(meme);
    }

    return (
        <main>
            <form onSubmit={handleSubmit} className="meme-div">
                <div className="inputs-div">
                    <TextField
                        className="input"
                        id="outlined-multiline-flexible"
                        label="Top Text"
                        multiline maxRows={4}
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                    <TextField
                        className="input"
                        id="outlined-multiline-flexible"
                        label="Bottom Text"
                        multiline maxRows={4}
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                    />
                </div>
                <button onClick={getMemesData} className="button">Get a new meme image 🎫</button>
                <div className="meme">
                    <img src={meme.randomImage} className="meme-img" alt="meme" />
                    <h2 className="meme--text top">{meme.topText}</h2>
                    <h2 className="meme--text bottom">{meme.bottomText}</h2>
                </div>
            </form>
        </main>
    );
}

export default Meme;
