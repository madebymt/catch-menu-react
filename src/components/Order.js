import React from 'react'
import {formatPrice} from '../helpers'
import CSStransitionGroup from 'react-addons-css-transition-group'
// import './css/_animations'

class Order extends React.Component {
  constructor(){
    super();
    this.renderOrder = this.renderOrder.bind(this)
  }
  renderOrder(key){
    const fish= this.props.fishes[key]
    const count= this.props.order[key]
    const removeButton = <button onClick={()=> this.props.removeFromOrder(key)}>&times;</button>

    if(!fish || fish.status === 'unavailable'){
      return <li key={key}> sorry, {fish ? fish.name : fish} is not longer available!
      {removeButton}</li>
    }

    return (
      <li key={key}>
        <span> {count}lbs {fish.name} {removeButton}</span>
        <span className='price'>{formatPrice(count * fish.price)}
        </span>
      </li>
    )
  }
  render(){
    const orderId = Object.keys(this.props.order)
    const total = orderId .reduce((prevTotal,key)=>{
      const fish = this.props.fishes[key]
      const count = this.props.order[key]
      const isavaiable = fish && fish.status === 'available'
      if(isavaiable){
        return prevTotal + (count * fish.price || 0)
      }
        return prevTotal;

    },0  )
    return(
        <div className='order-wrap'>
          <h2>Your order</h2>

          <CSStransitionGroup className="order"
            component ='ul'
            transitionName='order'
            transitionEnterTimeout={5000}
            transitionLeaveTimeout={5000}
            >

              {orderId.map(this.renderOrder)}
            <li className="total">
              <strong>Total:</strong>
              {formatPrice(total)}
          </li>
        </ CSStransitionGroup>

        </div>

    )
  }
}

export default Order
