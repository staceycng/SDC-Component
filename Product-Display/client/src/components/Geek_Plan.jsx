import React from 'react';
import checkbox from '../../../public/images/checkbox.png';

class Geek_Plan extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
       changeWhite: false,
       toggleYes: true
      }
    this.changeBoxColorWhite = this.changeBoxColorWhite.bind(this);
    this.changeBoxColorGrey = this.changeBoxColorGrey.bind(this);
    this.toggleBox = this.toggleBox.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    }

    changeBoxColorWhite() {
      this.setState({
        changeWhite: true
      })
    }

    changeBoxColorGrey() {
      this.setState({
         changeWhite: false
      })
    }

    toggleBox(){
    let answer = this.state.toggleYes ? false : true;
      this.setState({
         toggleYes: answer
      })
    }

    toggleCheckbox() {
     if (!this.state.toggleYes) {
        return (
         <div>
             <i className="display-geekplan-check ion-checkmark" ></i>
         </div>
        )
     }
    }

    render() {
      var price = this.props.geek_squad_price;
      var payment = null;

      if(price.length > 0){
        console.log('price--->', price);
        price = price.substring(1);
        payment = (Number(price) / 12).toFixed(2);
      }
      
      console.log('payment--->', payment);
        return (
            <div>
              <div className="display-geekplan-container">
                <div className="display-geekplan-box" onMouseOver={this.changeBoxColorWhite} onMouseLeave={this.changeBoxColorGrey} onClick={this.toggleBox}>
                     <div className="display-geekplan-image">
                      {this.toggleCheckbox()}
                        {/* <img src={this.state.changeWhite ? "https://bb-clone.s3-us-west-1.amazonaws.com/general/geek_greybox.png" : "https://bb-clone.s3-us-west-1.amazonaws.com/general/geek_whitebox.png"} height="20" />   */}
                        <img src={checkbox} height="20px"></img>
                     </div>
                  
                       <div className="display-geekplan-text">2-Year Geek Squad Product Replacement</div></div>
                  
                    <div className="display-geekplan-subcontainer">
                     <div className="display-geekplan-text-price">{price}</div>
                     <div className="display-geekplan-text-price-monthly">About ${payment}/mo.</div>
                  </div>
            </div>
            <div className="display-geekplan-text-learnmore">Learn more</div>
        </div>
        )

    }

}


export default Geek_Plan;