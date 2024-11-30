import { useState } from 'react';

const useUpdateOrder = () => {
    const [orders, setOrders] = useState([]);

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    return {
        orders,
        setOrders,
        updateOrderStatus,
    };
};

export default useUpdateOrder;