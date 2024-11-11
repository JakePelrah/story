import './liveView.css'

export default function LiveView({ render }) {

    return (
        <div id="live-view">
            
            <div className="live-view-header d-flex justify-content-center
            align-items-center">{'/file/one.html'}</div>

            <div className='live-view-html'>{render}</div>
        </div>
    )
}