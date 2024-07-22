import { Table } from 'flowbite-react';
import MemberPaymentTableHead from './MemberPaymentTableHead';
import MemberPaymentTableBody from './MemberPaymentTableBody';
import TablePagination from '../../../common/Pagination/TablePagination';
import {useEffect, useState} from "react";

const MemberPaymentTable = ({memberPaymentMethods}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedData, setPaginatedData] = useState([]);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(memberPaymentMethods.length / itemsPerPage);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentData = memberPaymentMethods.slice(startIndex, endIndex).map((item, index) => {
            const paymentMethodType = item.bankName ? 'ACCOUNT' : 'CARD';
            const paymentInstitution = item.bankName ? item.bankName : item.cardCompanyName;
            const paymentNumber = item.bankName ? item.accountNumber : item.cardNumber;

            return {
                paymentMethodId: item.paymentMethodId,
                number: startIndex + index + 1,
                paymentMethodType,
                paymentInstitution,
                paymentNumber,
            };
        });
        setPaginatedData(currentData);
    }, [currentPage, memberPaymentMethods]);

    return (
    <div className='p-3'>
      <h2 className='text-xl font-bold mb-3 text-main'>결제수단</h2>
      <Table striped>
        <MemberPaymentTableHead />
        <MemberPaymentTableBody paymentMethods={paginatedData}/>
      </Table>
      {totalPages < 1 ? null : <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
    </div>
  );
};

export default MemberPaymentTable;
