import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
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

export const Login = (props: any) => {
    document.title = DOCUMENT_TITLE.Login
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const userService = new UserService();

    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Required').email(),
            password: Yup.string().required('Required')
        }),
        onSubmit: (values: any) => {
            const data = {
                email: values.email,
                password: values.password
            };

            let apiFunc = userService.login;

            callApi({ apiFunc, setLoading }, data).then((res: any) => {
                if (res.status) {
                    localStorage.setItem('rr_token', res.data.token + '@' + res.data.id);
                    localStorage.setItem('rr_username', res.data.username);
                    showSuccessToast(res.message + '.', () => {
                        navigate('/');
                    });
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
                    <form onSubmit={formikLogin.handleSubmit}>
                        <div className="form-container text-left">
                            <div className="mb-3">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-envelope"></i>
                                    <InputText id="email" name="email" type="text" placeholder="Email" onChange={formikLogin.handleChange} onBlur={formikLogin.handleBlur} value={formikLogin.values.email} />
                                </span>
                                <FormError touched={formikLogin.touched.email} errors={formikLogin.errors.email} />
                            </div>

                            <div className="mb-3">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-key"></i>
                                    <InputText id="password" name="password" type="password" placeholder="Password" onChange={formikLogin.handleChange} onBlur={formikLogin.handleBlur} value={formikLogin.values.password} />
                                </span>
                                <FormError touched={formikLogin.touched.password} errors={formikLogin.errors.password} />
                            </div>

                            <button className="flex p-link">
                                <Link to="/forgetPassword">Forgot your password?</Link>
                            </button>
                        </div>
                        <div className="button-container">
                            <Button type="submit" label="Login" loading={loading}></Button>
                        </div>
                    </form>
                </div>

                <AuthenticationFooter />
            </div>
        </div>
    );
};
