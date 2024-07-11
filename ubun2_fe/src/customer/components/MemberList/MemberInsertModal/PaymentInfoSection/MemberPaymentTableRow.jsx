import { Table } from 'flowbite-react';
import PaymentMethodBadge from "../../../common/Badge/PaymentMethodBadge.jsx";
import {CreditCardIcon, CurrencyDollarIcon} from "@heroicons/react/16/solid/index.js";
const MemberPaymentTableRow = ({ paymentMethodId, number, paymentMethodType, paymentInstitution,paymentNumber }) => {
  return (
    <>
      <Table.Row className='bg-white'>
        <Table.Cell>{number}</Table.Cell>
        <Table.Cell> {paymentMethodType === 'CARD' ? (
            <PaymentMethodBadge icon={CreditCardIcon} paymentText='카드' />
        ) : (
            <PaymentMethodBadge icon={CurrencyDollarIcon} paymentText='계좌' />
        )}</Table.Cell>
        <Table.Cell>{paymentInstitution}</Table.Cell>
        <Table.Cell>{paymentNumber}</Table.Cell>
      </Table.Row>
    </>
  );
};

export default MemberPaymentTableRow;
