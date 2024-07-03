import OrderTable from '../../components/OrderList/OrderTable/OrderTable';
import { orders } from '../../components/OrderList/OrderListData';

const OrderList = () => {
  return (
    <>
      <OrderTable orders={orders} />
    </>
  );
};

export default OrderList;
