import React from 'react';
import fullStar from '../../../public/images/fullstar.png';
import geekLogo from '../../../public/images/geeklogo.png';

const Geek = (props) => {

    return (
     <div>
         <div className="display-geek-badge-container">
             <div className="display-geek-badge-image">
                 <img src="display-geek-badd-image-img" src={geekLogo} height="20"/>
             </div>
             <div className="display-geek-badge-header">
                <div className="display-geek-badge-header-text">
                    Protect your product
                </div>
                <div className="display-geek-ratings-container">
                    <div className="display-geek-header-stars">
                        <img src={fullStar} height="17"/>
                        <img src={fullStar} height="17"/>
                        <img src={fullStar} height="17"/>
                        <img src={fullStar} height="17"/>
                    </div>
                    <div className="display-geek-header-review-count">(378)</div>
                </div>
             </div>
         </div>
     </div>
    )
}

export default Geek;