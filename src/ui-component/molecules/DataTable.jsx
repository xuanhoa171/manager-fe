import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';

/* 
  Note: Các thuộc tính thường dùng trong columns của DataGrid để custom data hiển thị ra ngoài: 

  field: Xác định tên trường dữ liệu tương ứng trong mảng rows.

  headerName: Xác định tiêu đề của cột.

  width: Xác định chiều rộng của cột.

  align: Xác định căn chỉnh nội dung trong cột. Các giá trị có thể là "left", "center" hoặc "right".

  renderCell: Cho phép bạn tùy chỉnh nội dung hiển thị của ô (cell) trong cột. Bạn có thể sử dụng hàm này để thêm các thành phần React hoặc tùy chỉnh nội dung theo ý muốn.

  sortable: Cho phép cột có khả năng được sắp xếp. Khi đặt giá trị là true, người dùng có thể nhấp vào tiêu đề cột để sắp xếp các hàng theo cột đó.

  filterable: Cho phép cột có khả năng lọc dữ liệu. Khi đặt giá trị là true, một ô lọc sẽ được tạo ra cho cột đó, cho phép người dùng lọc các giá trị trong cột.

  editable: Cho phép cột có khả năng chỉnh sửa dữ liệu. Khi đặt giá trị là true, người dùng có thể chỉnh sửa nội dung của ô trong cột.

  valueGetter: Cho phép bạn định nghĩa một hàm để lấy giá trị của ô từ một trường dữ liệu phức tạp hoặc tính toán.

  cellClassName: Xác định lớp CSS được áp dụng cho ô trong cột.

  headerClassName: Xác định lớp CSS được áp dụng cho tiêu đề cột
*/
export default function DataTable({ columns, rows, style, tableStyle, checkboxSelection, ...restProps }) {
  return (
    <DataTableWrapper style={style}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[50]}
        disableRowSelectionOnClick={!checkboxSelection}
        disableColumnMenu={true}
        checkboxSelection={checkboxSelection}
        hideFooter={true}
        style={tableStyle}
        {...restProps}
      />
    </DataTableWrapper>
  );
}

const DataTableWrapper = styled.div`
  overflow: hidden;
  height: 100%;
  width: 100%;

  .MuiDataGrid-columnHeader:focus,
  .MuiDataGrid-columnHeader:focus-within {
    outline: none !important;
  }

  .MuiDataGrid-cell:focus,
  .MuiDataGrid-cell:focus-within {
    outline: none !important;
  }
`;
