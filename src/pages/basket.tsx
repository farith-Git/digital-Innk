import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../redux/cartSlice";

function Basket() {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);

  const subTotal = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  let totalDiscount = 0;

  return (
    <div className="max-w-3xl mx-auto px-10 mt-4">
      <h1 className="text-2xl font-bold mb-6">Cart Items</h1>
      { cart.length > 0 ?
        
        <div className="bg-white shadow-md rounded p-6">

          { cart.map((item: any) => {
              let itemTotal = item.price * item.quantity;
              let savings = 0;
              if (item.offer) {
                savings = item.offer.discount * item.quantity;
              }
              totalDiscount += savings;
              return (
                <div key={item.id} className="border-b py-4">
                  
                  <div className="flex justify-between items-center">
                    <div className="flex gap-6">
                      <span>{item.name}</span>
                      <span>£ {item.price}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="border w-8 h-8 rounded" onClick={() => dispatch(decreaseQuantity(item.id))}> - </button>
                      <span>{item.quantity}</span>
                      <button className="bg-blue-500 text-white w-8 h-8 rounded" onClick={() => dispatch(increaseQuantity(item.id))}> + </button>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 mt-2">
                    Item price £{item.price} * {item.quantity} = £{itemTotal.toFixed(2)}
                  </div>

                  { savings > 0 &&
                    <div className="text-right mt-1 font-small text-danger">
                      Savings £{savings.toFixed(2)}
                    </div>
                  }

                  <div className="text-right mt-1 font-medium">
                    Item cost £{itemTotal.toFixed(2)}
                  </div>

                </div>
              );
          })}

          <div className="mt-6 text-right space-y-2">

            <div>
              <span className="font-medium">Sub Total:</span> £ {subTotal.toFixed(2)}
            </div>

            { totalDiscount > 0 &&
              <div>
                <span className="font-medium">Savings:</span> £ {totalDiscount.toFixed(2)}
              </div>
            }

            <div className="text-lg font-bold">
              Total Amount: £ {(subTotal - totalDiscount).toFixed(2)}
            </div>

          </div>

        </div> :

        <div className="bg-white shadow-md rounded p-6">
          <div className="mt-6 text-center space-y-2">
            No more cart items found.
          </div>
        </div>
      }
    </div>
  );
}

export default Basket;