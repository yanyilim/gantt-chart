import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import loginWallpaper from 'assets/images/rrLoginWallppr.jpg';
import logo from 'assets/images/rrLogo.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormError from 'utilities/Form/FormError';
import UserService from 'services/UserService';
import { showErrorToast, showSuccessToast } from 'utilities/Function/CustomToast';
import { ToastContainer } from 'react-toastify';
import { callApi } from '../../utilities/Function/CallAPI';
import { getToken } from '../../utilities/Function/GetLocalStorage';
import { AuthenticationWallpaper } from 'utilities/Template/AuthenticationWallpaper';
import { AuthenticationLogo } from 'utilities/Template/AuthenticationLogo';
import { AuthenticationFooter } from 'utilities/Template/AuthenticationFooter';
import { DOCUMENT_TITLE } from 'utilities/Constant/DocumentTitleName';

export const ForgetPassword = (props: any) => {
    document.title = DOCUMENT_TITLE.Forget_Password;

    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const userService = new UserService();

    const formikForgetPassword = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Required').email()
        }),
        onSubmit: (values: any) => {
            let apiFunc = userService.forgetPassword;

            callApi({ apiFunc, setLoading }, { email: values.email }).then((res: any) => {
                if (res.status) {
                    showSuccessToast(res.message);
                    setTimeout(() => navigate('/login'), 3000);
                } else {
                    showErrorToast(res.message);
                }
            });
            return;
        }
    });

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            setLoading(true);
            if (getToken() !== null) {
                navigate('/');
            } else {
                setLoading(false);
            }
        }

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="login-body">
            <ToastContainer />
            <AuthenticationWallpaper />
            
            <div className="login-panel p-fluid">
                <div className="flex flex-column">
                    <AuthenticationLogo />

                    <form className="text-left" onSubmit={formikForgetPassword.handleSubmit}>
                        <label>Please key in your email to reset password</label>
                        <div className="form-container mt-2">
                            <div className="mb-3">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-envelope"></i>
                                    <InputText
                                        id="email"
                                        name="email"
                                        type="text"
                                        placeholder="Email"
                                        onChange={formikForgetPassword.handleChange}
                                        onBlur={formikForgetPassword.handleBlur}
                                        value={formikForgetPassword.values.email}
                                        disabled={loading}
                                    />
                                </span>
                                <FormError touched={formikForgetPassword.touched.email} errors={formikForgetPassword.errors.email} />
                            </div>

                            <button className="flex p-link" disabled={loading}>
                                {loading ? <p>Would like to sign in?</p> : <Link to="/login">Would like to sign in?</Link>}
                            </button>
                        </div>
                        <div className="button-container">
                            <Button type="submit" label="Submit" loading={loading}></Button>
                        </div>
                    </form>
                </div>

                <AuthenticationFooter/>
            </div>
        </div>
    );
};
