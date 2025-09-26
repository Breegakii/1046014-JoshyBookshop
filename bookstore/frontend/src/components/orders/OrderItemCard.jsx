import React from "react";

export default function OrderItemCard({ order }) {
  const orderStatus = {
    P: "Pending",
    C: "Complete",
    F: "Failed",
  };
  return (
    <div
      key={order.id}
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">Order #{order.id}</p>
          <p className="text-sm text-gray-500">{new Date(order.placed_at).toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="font-medium">KSH{order.total_price.toFixed(2)}</p>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              orderStatus[order.payment_status] === "Complete"
                ? "bg-green-100 text-green-800"
                : orderStatus[order.payment_status] === "Pending"
                ? "bg-blue-100 text-blue-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {orderStatus[order.payment_status]}
          </span>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          {order.items_count} item{order.items_count !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
