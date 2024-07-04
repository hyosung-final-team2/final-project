import PendingOrderTable from '../../components/PendingOrderList/PendingOrderTable/PendingOrderTable';
import { pendingOrders } from '../../components/PendingOrderList/PendingOrderListData';

const PendingOrderList = () => {
  return (
    <>
      <PendingOrderTable pendingOrders={pendingOrders} />
    </>
  );
};

export default PendingOrderList;
