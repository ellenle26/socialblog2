import React, { useState } from "react";
import Pagination from "react-js-pagination";
import "App.css";

const PaginationBar = ({ totalPageNum, activePage, setActivePage }) => {
  return (
    <Pagination
      itemClass="pageItem"
      linkClass="pageLink"
      activePage={activePage}
      itemsCountPerPage={10}
      totalItemsCount={totalPageNum * 10}
      pageRangeDisplayed={5}
      onChange={(clickedPage) => setActivePage(clickedPage)}
    />
  );
};

export default PaginationBar;
