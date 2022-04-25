import moment from "moment";

export const currencyFormat = (num)=> {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
      });
    return formatter.format(num); 
}

export const formatTimestampDate = (timestamp)=>{
  return  moment(timestamp.toDate()).format('MMMM Do YYYY');
}

export const mapCartItems = (arr)=>{
    return [...new Set(arr.map(({storeID})=>storeID))].map(storeID=>{
      return {
        storeID,
        cartItems: arr.filter((prod)=>prod.storeID===storeID)
      }
    })
}
