import React, { useState, useRef, useEffect } from 'react'
import Classes from './index.module.css';

// SVG imports
import Pencil from '../../../../../images/editPencil.svg';
import Delete from '../../../../../images/delete.svg';
import Flag from '../../../../../images/reportFlag.svg';
import { ReactComponent as Edit } from '../../../../../images/edit.svg';

// ============================== HELPER =========================================
const OptionsBox = () => {
    return (
        <div className={Classes.box}>
            <div className={Classes.option}>
                <img src={Pencil} alt="Edit" draggable="false"/>
                <div className={Classes.label}>Edit</div>
            </div>
            <div className={Classes.option}>
                <img src={Delete} alt="Delete" draggable="false" />
                <div className={Classes.label}>Delete</div>
            </div>
            <div className={Classes.option}>
                <img src={Flag} alt="Report" draggable="false"/>
                <div className={Classes.label}>Report</div>
            </div>
        </div>
    )
}

// ============================== COMPONENT =====================================

function ColumnOption() {
    const [display, setDisplay] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.addEventListener('mousedown', handleClick)

        return function () {
            document.removeEventListener('mousedown', handleClick)
        }

    }, [])

    const handleClick = (event: MouseEvent) => {
        if (ref.current?.contains(event.target as Node)) return;
        else setDisplay(false)
    }

    const clickHandler = () => setDisplay(!display)

    return (
        <div className={Classes.container}>
            <Edit height="0.8rem" onClick={clickHandler} className={Classes.edit} />
            {display && <div className={Classes.boxContainer} ref={ref}>{OptionsBox()}</div>}
        </div>
    )
}

export default ColumnOption
