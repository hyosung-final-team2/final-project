import { Table } from 'flowbite-react';
import {useEffect, useState} from 'react';
import {columnMapping} from "./tableIndex.js";
import useMemberTableStore from "../../../store/MemberTable/memberTableStore.js";

const TableHeadCell = ({ colunmName, handleSort }) => {
  const [isDesc, setIsDesc] = useState(null);

  const sortToggle = () => {
    const columnName = columnMapping[colunmName];
    const sortType = isDesc ? 'DESC' : 'ASC';
    handleSort(columnName, sortType);
  }

    useEffect(() => {
        if (isDesc === null) {
            return
        }
        sortToggle()
    }, [isDesc]);


    const { sort ,isReset} = useMemberTableStore()
    useEffect(() => {
        setIsDesc(null)
    }, [isReset]);

    useEffect(() => {
        const columnName = columnMapping[colunmName];
        const sortItem = sort.find(item => item.startsWith(`${columnName},`));
        if (sortItem) {
            setIsDesc(sortItem.endsWith('DESC'));
        } else {
            setIsDesc(null);
        }
    }, [sort, colunmName]);

  return (
    <Table.HeadCell className='bg-gray-100 text-main text-sm' onClick={() => setIsDesc(!isDesc)}>
      <div className='flex items-center gap-2'>
        {colunmName}
        {isDesc === null ? (
        <svg
            width='12px'
            height='12px'
            viewBox='0 0 512 512'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            fill='#000000'
            transform='rotate(180)'
        >
            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
            <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
            <g id='SVGRepo_iconCarrier'>
                {' '}
                <title>triangle-filled</title>{' '}
                <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                    {' '}
                    <g id='drop' fill='#000000' transform='translate(32.000000, 42.666667)'>
                        {' '}
                        <path
                            d='M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z'
                            id='Combined-Shape'
                        >
                            {' '}
                        </path>{' '}
                    </g>{' '}
                </g>{' '}
            </g>
        </svg>)  : (isDesc ? (
          <svg
            width='12px'
            height='12px'
            viewBox='0 0 512 512'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            fill='#E64952'
            transform='rotate(180)'
          >
            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
            <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
            <g id='SVGRepo_iconCarrier'>
              {' '}
              <title>triangle-filled</title>{' '}
              <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                {' '}
                <g id='drop' fill='#E64952' transform='translate(32.000000, 42.666667)'>
                  {' '}
                  <path
                    d='M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z'
                    id='Combined-Shape'
                  >
                    {' '}
                  </path>{' '}
                </g>{' '}
              </g>{' '}
            </g>
          </svg>
        ) : (
          <svg
            width='12px'
            height='12px'
            viewBox='0 0 512 512'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            fill='#0068F7'
          >
            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
            <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
            <g id='SVGRepo_iconCarrier'>
              {' '}
              <title>triangle-filled</title>{' '}
              <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                {' '}
                <g id='drop' fill='#0068F7' transform='translate(32.000000, 42.666667)'>
                  {' '}
                  <path
                    d='M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z'
                    id='Combined-Shape'
                  >
                    {' '}
                  </path>{' '}
                </g>{' '}
              </g>{' '}
            </g>
          </svg>
        ))}
      </div>
    </Table.HeadCell>
  );
};
export default TableHeadCell;
