import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import loginWallpaper from '../../assets/images/rrLoginWallppr.jpg';
import logo from '../../assets/images/rrLogo.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormError from '../../utilities/Form/FormError';
import UserService from '../../services/UserService';
import { showErrorToast, showSuccessToast } from '../../utilities/Function/CustomToast';
import { ToastContainer } from 'react-toastify';
import { callApi } from '../../utilities/Function/CallAPI';
import { getToken } from '../../utilities/Function/GetLocalStorage';
import { AuthenticationFooter } from 'utilities/Template/AuthenticationFooter';
import { AuthenticationLogo } from 'utilities/Template/AuthenticationLogo';
import { AuthenticationWallpaper } from 'utilities/Template/AuthenticationWallpaper';
import { DOCUMENT_TITLE } from 'utilities/Constant/DocumentTitleName';

export const ResetPassword = (props: any) => {
    document.title = DOCUMENT_TITLE.Reset_Password;

    const paramsData = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const userService = new UserService();

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            localStorage.clear();
        }

        return () => {
            isMounted = false;
        };
    }, []);

    const formikResetPassword = useFormik({
        initialValues: {
            new_password: '',
            confirm_password: ''
        },
        validationSchema: Yup.object({
            new_password: Yup.string().required('Required'),
            confirm_password: Yup.string().required('Required')
        }),
        onSubmit: (values: any) => {
            if (values?.new_password !== values?.confirm_password) {
                showErrorToast('"New Password" and "Confirm Password" do not match.');
            } else {
                setLoading(true);
                const data = {
                    token: paramsData.token,
                    id: paramsData.user_id,
                    password: values?.confirm_password
                };

                let apiFunc = userService.resetPassword;

                callApi({ apiFunc, setLoading }, data).then((res: any) => {
                    if (res.status) {
                        showSuccessToast(res.message + '.', () => {
                            navigate('/login');
                        });
                    } else {
                        showErrorToast(res.message);
                    }
                });
            }

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

                    <form className="text-left" onSubmit={formikResetPassword.handleSubmit}>
                        <label>Please key in your new password</label>
                        <div className="form-container mt-2">
                            <div className="mb-3">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-envelope"></i>
                                    <InputText
                                        id="new_password"
                                        name="new_password"
                                        type="password"
                                        placeholder="New Password"
                                        onChange={formikResetPassword.handleChange}
                                        onBlur={formikResetPassword.handleBlur}
                                        value={formikResetPassword.values.new_password}
                                        disabled={loading}
                                    />
                                </span>
                                <FormError touched={formikResetPassword.touched.new_password} errors={formikResetPassword.errors.new_password} />
                            </div>

                            <div className="mb-3">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-key"></i>
                                    <InputText
                                        id="confirm_password"
                                        name="confirm_password"
                                        type="password"
                                        placeholder="Confirm Password"
                                        onChange={formikResetPassword.handleChange}
                                        onBlur={formikResetPassword.handleBlur}
                                        value={formikResetPassword.values.confirm_password}
                                        disabled={loading}
                                    />
                                </span>
                                <FormError touched={formikResetPassword.touched.confirm_password} errors={formikResetPassword.errors.confirm_password} />
                            </div>
                        </div>
                        <div className="button-container">
                            <Button type="submit" label="Submit" loading={loading}></Button>
                        </div>
                    </form>
                </div>

                <AuthenticationFooter />
            </div>
        </div>
    );
};
