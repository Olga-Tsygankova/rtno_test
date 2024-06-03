import {Attach, Best, Calendar, Call, EveryWhere, Quickly} from "../../icons/Icons";
import './SideBar.css'

export const SideBar = () => {
    return (
        <div className="side-bar">
            <a href='#'>
                <Attach/>
            </a>
            <a href='#'>
                <Best/>
            </a>
            <a href='#'>
                <Calendar/>
            </a>
            <a href='#'>
                <Call/>
            </a>
            <a href='#'>
                <EveryWhere/>
            </a>
            <a href='#'>
                <Quickly/>
            </a>
        </div>
    )
}