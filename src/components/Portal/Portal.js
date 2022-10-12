import { useEffect, useState } from "react";
import ReactDOM from 'react-dom'

function Portal({containerId,children}) {
    const [wrapper,setWrapper] = useState(document.createElement('div'))
    useEffect(()=> {
        let container = document.createElement('div')

        setWrapper(container)
        document.body.appendChild(container)
        if (containerId) {
            container = document.querySelector(`#${containerId}`)
            setWrapper(container)
        }

        return ()=> {
            if(!containerId){
                document.body.removeChild(container)
            }
        }
    },[])

    return ( ReactDOM.createPortal(children,wrapper) );
}

export default Portal;