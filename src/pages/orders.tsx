import { useEffect, useState } from "react";
import moment from "moment";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";

function orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const tempOrderId = localStorage.getItem("tempOrderId");
  useEffect(() => {
    const fetchOrders = async () => {
        const ordersRef = collection(db, "orders");
        const q = tempOrderId
        ? query(ordersRef, where("id", "==", tempOrderId), orderBy("createdAt", "desc"))
        : query(ordersRef, orderBy("createdAt", "desc"));
        const response = await getDocs(q);

        const list: any[] = [];
        response.forEach((doc) => {
            list.push({
            id: doc.id,
            ...doc.data(),
            });
        });
        setOrders(list);
    };
    
    if(tempOrderId) {
        fetchOrders();
    }

}, [tempOrderId]);



  return (
    <>
      <div className="w-full px-10 mt-4">
        <h1 className="text-2xl font-bold mb-6"> Orders </h1>
       
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
       <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Order Id</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Product</th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Price</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Quantity</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Offer</th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">SubTotal</th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Savings</th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Total</th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Dated On</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) =>
              order.items.map((item: any, idx: number) => (
                <tr key={idx}>
                    <td className="px-4 py-2 text-left">{order.id}</td>
                    <td className="px-4 py-2 text-left">{item.name}</td>
                    <td className="px-4 py-2 text-right">£{item.price.toFixed(2)}</td>
                    <td className="px-4 py-2 text-center">{item.quantity}</td>
                    <td className="px-4 py-2 text-left">{item.offer ? item.offer.description : "-"}</td>
                    <td className="px-4 py-2 text-right">£{(item.price * item.quantity).toFixed(2)}</td>
                    <td className="px-4 py-2 text-right">£{item.savingAmount?.toFixed(2) || 0}</td>
                    <td className="px-4 py-2 text-right">£{(item.price * item.quantity - (item.savingAmount || 0)).toFixed(2)}</td>
                    <td className="px-4 py-2 text-right">{order?.createdAt ? moment(order.createdAt.seconds * 1000).format("DD-MM-YYYY HH:mm:ss") : "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
}

export default orders;