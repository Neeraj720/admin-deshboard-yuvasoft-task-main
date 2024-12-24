import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { updateUser } from "../../Redux/Auth/AuthSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

function UserUpdate() {
  const { id } = useParams();
  const { allUserData, isSuccess, isError, isLoading, message, updateStatus } =
    useSelector((state) => state.auth);
  const user = allUserData.find((user) => user.id === id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: user.name || "",
      email: user.email || "",
      password: "123456",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("User  name is required"),
      email: Yup.string()
        .email("Enter valid email")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password should be of minimum 6 characters length")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      const data = {
        values: values,
        id: user.id,
      };
      dispatch(updateUser(data)).then((payload) => {
        payload.message == "User updated successfully";
        toast.success(payload.message);
        navigate("/user/deshboard");
      });
    },
  });
  return (
    <>
      <div className="page-content">
        <div className="page-header no-margin-bottom">
          <div className="container-fluid">
            <h2 className="h5 no-margin-bottom">Basic forms</h2>
          </div>
        </div>
        <div className="container-fluid">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/user/deshboard">Home</Link>
            </li>
            <li className="breadcrumb-item active">User Update form</li>
          </ul>
        </div>
        <section className="no-padding-top">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="block">
                  <div className="title">
                    <strong className="d-block">Update Form</strong>
                  </div>
                  <div className="block-body">
                    <form onSubmit={formik.handleSubmit}>
                      <div className="form-group">
                        <label className="form-control-label">Name</label>
                        <input
                          type="text"
                          placeholder="User  Name"
                          className="form-control"
                          name="name"
                          onChange={formik.handleChange}
                          value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name && (
                          <div style={{ color: "red" }}>
                            {formik.errors.name}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-control-label">Email</label>
                        <input
                          type="email"
                          placeholder="Email Address"
                          className="form-control"
                          name="email"
                          onChange={formik.handleChange}
                          value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email && (
                          <div style={{ color: "red" }}>
                            {formik.errors.email}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <button className="btn btn-primary" type="submit">
                          {isLoading ? "Loading..." : "Update"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default UserUpdate;
