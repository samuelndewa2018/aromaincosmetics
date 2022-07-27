import MetaData from "../more/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import { DELETE_NEWPRODUCT_RESET } from "../../constans/NewProductConstans";
import {
  clearErrors,
  deleteNewProduct,
  getAdminNewProduct,
} from "../../actions/NewProductActions";
import "./AllProducts.css";

const AllNewProducts = ({ history }) => {
  const dispatch = useDispatch();
  const { error, newproducts } = useSelector((state) => state.newproducts);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.newdeleteProduct
  );
  const deleteProductHandler = (id) => {
    dispatch(deleteNewProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Product Deleted Successfully");
      history.push("/dashboard");
      dispatch({ type: DELETE_NEWPRODUCT_RESET });
    }
    dispatch(getAdminNewProduct());
  }, [dispatch, alert, error, history]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 50,
      flex: 0.3,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 50,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 70,
      flex: 0.3,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 50,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/edit/new/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  newproducts &&
    newproducts.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            disableSelectionOnClick
            className="productListTable"
          />
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
};

export default AllNewProducts;
