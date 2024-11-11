import { useEffect, useState } from "react"
import { Popover } from "bootstrap"
import { useAudioManager } from "../AudioManager"
import "./button.css"

export default function Button({ name, type }) {
    const { play } = useAudioManager()


    useEffect(() => {
       const play = document.createElement('button')
       play.innerText='play'

        const popoverTriggerEl = document.querySelector('[data-bs-toggle="popover"]')
        new Popover(popoverTriggerEl,{
            content:play,
            html:true,
            trigger:'click'
        })
    })

    function settings() {

    }


    return (
        <div className="d-flex">
            <button className={`my-1 ms-3 btn track-btn ${type}`}
                onClick={play}>
                {name}
            </button>
            <button onClick={settings} className="btn"
                data-bs-toggle="popover"
                data-bs-title="Audio Settings"
                data-bs-content="And here's some amazing content. It's very engaging. Right?">
                <i className="bi bi-gear-fill"></i>
            </button>
        </div>
    )
}