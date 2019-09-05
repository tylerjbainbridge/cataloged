import { useState } from 'react';

export const usePagination = ({ pageLength } = { pageLength: 20 }) => {
  const [pageNum, setPageNum] = useState(0);

  return {
    paginationVariables: { skip: pageNum * pageLength, first: pageLength },
    setPageNum,
    nextPage: () => setPageNum(pageNum + 1),
    prevPage: () => setPageNum(pageNum - 1),
  };
};

// export const useFilers = () => {
//   const [] = useState();
// };
