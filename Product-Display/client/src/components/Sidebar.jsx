import React from 'react';
import switchImg from '../../../public/images/switch.png'

const Sidebar = props => {
    return (
        <div className="display-sidebar-container">
          <button className="display-sidebar-button">
          {props.category === "Nintendo Switch" &&<img className="display-sidebar-placeholder-img" src={switchImg}></img>}
          {props.category === "PlayStation 4" && <img className="display-sidebar-placeholder-img" src={switchImg} />}
          </button>
          <div className="display-sidebar-button-place">

          </div>
        </div>
    )
}

export default Sidebar;