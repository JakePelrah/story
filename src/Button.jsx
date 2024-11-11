import { useEffect, useState } from "react"
import { useAudioManager } from "./AudioManager"

export default function Button({ name }) {
    const { play } = useAudioManager()


    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }, [])

    return (<button className="btn track-btn"
        onClick={play} data-name={name}
        data-bs-toggle="tooltip"
         data-bs-placement="bottom"
        data-bs-custom-class="custom-tooltip"
        data-bs-title={name} >
        <img src="play-fill.svg"></img>
    </button>)
}