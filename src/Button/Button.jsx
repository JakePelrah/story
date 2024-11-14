import { useAudioManager } from "../AudioManager"
import "./button.css"

export default function Button({id, name}) {
    const { play, toggleSettings } = useAudioManager()

    return (
        <div className="d-flex">
            <button className='my-1 ms-3 btn track-btn'
                onClick={()=>play(id, name)}>
                {name}
            </button>
            <button onClick={() => toggleSettings({ id, name })}
                className="btn">
                <i className="bi bi-gear-fill"></i>
            </button>
        </div>
    )
}

