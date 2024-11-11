import { useState } from 'react'
import './sidebar.css'

export default function Sidebar() {

    return (<div id="sidebar" class="d-flex flex-column  text-white bg-dark">

        <TopMenu />

        <Directory name="Audio" />

        <div class="collapse dir-collapse" id="collapseExample">
            <File />
        </div>

    </div>)
}


function Directory({ name }) {
    const [open, setOpen] = useState(false)

    return (<a onClick={() => setOpen(!open)}
        className={`directory show-all-toggle d-flex align-items-center ${open ? 'opened' : null}`}
        data-bs-toggle="collapse" href="#collapseExample"
        role="button" aria-expanded="false"
        aria-controls="collapseExample">
        {name}
    </a>)
}

function File({ name }) {
    return (<div className='file'>New File</div>)
}

function TopMenu() {

    function newFile() {
        alert('new file')
    }

    function newFolder() {
        alert('new folder')
    }


    return (<div className='top-menu d-flex justify-content-end pe-2 gap-2'>
        <div onClick={newFile}><i class="bi bi-file-earmark-plus"></i></div>
        <div onClick={newFolder}><i class="bi bi-folder-plus"></i></div>
    </div>)
}