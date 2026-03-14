import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { db } from "../config/firebase";
import { increaseQuantity, decreaseQuantity, removeQuantity, clearCart } from "../redux/cartSlice";

function Basket() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state: any) => state.cart);

  const subTotal = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  const removeCart = (id:any) => {
    dispatch(removeQuantity(id));
  }

  function getTempOrderId(): string {
    const existingId = localStorage.getItem("tempOrderId");
    if (existingId) return existingId;
    const newId = `TEMP-${Date.now()}`;
    localStorage.setItem("tempOrderId", newId);
    return newId;
  }

  // function calculateSavingsOld(item: any): number {
  //   if (!item.offer) return 0;
  //   let savings = 0;
  //   if (item.offer && item.offer.discount > 0) {
  //     if (item.offer.type === "flat") {
  //       savings = item.offer.discount * item.quantity;
  //     } else if (item.offer.type === "percentage") {
  //       savings = (item.price * item.offer.discount) / 100 * item.quantity;
  //     }
  //   }
  //   return savings;
  // }


  function calculateSavings(item: any): number {
    if (!item.specialOffer) return 0;
    let savings = 0;
    if (item.specialOffer.type === "buy_one_get_one") {
      const freeQty = Math.floor(item.quantity / 2);
      savings = freeQty * item.price;
    }

    if (item.specialOffer.type === "third_off") {
      savings = item.quantity * item.price * (1 / 3);
    }

    if (item.specialOffer.type === "half_price") {
      const soupItem = cart.find((c:any) => c.name.toLowerCase() === "soup");
      if (soupItem) {
        const eligibleBread = Math.min(soupItem.quantity, item.quantity);
        savings = eligibleBread * item.price * 0.5;
      }
    }
    return savings;
  }


  

  const handleCheckout = async (subTotal:number, totalDiscount:number) => {
    
    if (cart.length === 0) return alert("Cart is empty!");

    const tempOrderId = getTempOrderId();

    const orderData = {
      id: tempOrderId,
      items: cart.map((item: any) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        offer: item.specialOffer || null,
        savingAmount: calculateSavings(item),
      })),
      subTotal: Number(subTotal.toFixed(2)),
      totalDiscount: Number(totalDiscount.toFixed(2)),
      totalAmount: Number((subTotal - totalDiscount).toFixed(2)),
      createdAt: serverTimestamp(),
      status: "pending",
    }
    try {
      console.log(orderData, '====');
      await addDoc(collection(db, "orders"), orderData);
      dispatch(clearCart());
      toast.success(`Order placed successfully`);
      navigate("/orders");
    } catch(e) {
      console.log(e, '=====');
      alert("Failed to place order. Please try again.");
    }
  }
  
  let totalDiscount = 0;

  return (
    <div className="max-w-3xl mx-auto px-10 mt-4">
      <h1 className="text-2xl font-bold mb-6">Cart Items</h1>
      { cart.length > 0 ?
        
        <div className="bg-white shadow-md rounded p-6">

          { cart.map((item: any) => {
              let itemTotal = item.price * item.quantity;
              
              let savings = 0;
              // if (item.offer && item.offer.discount > 0) {
              //   if (item.offer.type === "flat") {
              //     savings = item.offer.discount * item.quantity;
              //   } else if (item.offer.type === "percentage") {
              //     savings = (item.price * item.offer.discount) / 100 * item.quantity;
              //   }
              // }

              if (item.specialOffer) {
                savings = calculateSavings(item);
              }

              totalDiscount += savings;
              let itemCost = itemTotal - savings;
              return (
                <div key={item.id} className="border-b py-4">
                  
                  <div className="flex justify-between items-center">
                    <div className="flex gap-6">
                      <span><FaTrash className="inline-block align-middle mr-1 mb-1 text-red-800" size={12} onClick={()=>removeCart(item.id)}/></span> <span>{item.name}</span>
                      <span>£ {item.price.toFixed(2)}</span>
                      { item?.offer?.description &&
                        <span className="text-sm text-green-500 font-bold">({item?.offer?.description})</span>
                      }
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
                    <div className="text-right mt-1 text-sm text-red-500">
                      Savings £{savings.toFixed(2)}
                    </div>
                  }

                  <div className="text-right mt-1 font-medium">
                    Item cost £{itemCost.toFixed(2)}
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

          <div className="mt-6 text-right space-y-2">
            <button onClick={()=>handleCheckout(subTotal, totalDiscount)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"> Checkout </button>
          </div> 

        </div> 
        
            
        :

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