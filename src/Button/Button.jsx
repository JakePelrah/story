import { useEffect, useState } from "react"
import { useAudioManager } from "../AudioManager"
import "./button.css"

export default function Button({ name, type }) {
    const { play } = useAudioManager()



    return (<button className={`my-1 ms-3 btn track-btn ${type}`}
        onClick={play}>
        <i class="bi bi-speaker me-2"></i>
        {name}
    </button>)
}