import React from 'react';
import alsoboughtswitch from '../../../public/images/alsobought-switch.png'

const Bought = props => {
    return (
        <div className="display-bought-shop-product-carousel">
            <div className="display-bought-shop-product-carousel-mini">
                <button className="display-bought-shop-product-button">
                    {props.category === "Nintendo Switch" && <img className="display-bought-shop-product-image" src={alsoboughtswitch} />}
                    {props.category === "PlayStation 4" && <img className="display-bought-shop-product-image" src={alsoboughtswitch} />}
                </button>
            </div>
        </div>
    )
}

export default Bought;
