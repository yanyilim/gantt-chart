import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { onGlobalFilterChange } from 'utilities/Function/DataTableKeywordSearch';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import * as Yup from 'yup';
import FormError from 'utilities/Form/FormError';
import { useFormik } from 'formik';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';

const ProjectListing = () => {
    const [data, setData] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [openAddNewDlg, setOpenAddNewDlg] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false);
    const initialValues = {
        asm_cost: 0,
        eng_cost: 0,
        revenue: 0,
        mat_cost: 0,
        fab_cost: 0,
        mat_subcon_GP: 0,
        direct_labour_BU: 0,
        direct_labour_BU_share: 0,
        direct_labour_asm: 0,
        direct_labour_cnc: 0,
        direct_labour_metalwork: 0,
        direct_labour_costing: 0,
        direct_labour_BU_hour: 0,
        direct_labour_BU_share_hour: 0,
        direct_labour_asm_hour: 0,
        direct_labour_cnc_hour: 0,
        direct_labour_metalwork_hour: 0,
        direct_labour_costing_hour: 0,
        overhead_travel: 0,
        overhead_freight: 0,
        overhead_packing: 0,
        overhead_warranty: 0,
        overhead_direct_BU: 0,
        overhead_general: 0,
        total_overhead: 0,
        gp_after_dl_overhead: 0,
        other_income: 0,
        admin_salary: 0,
        other_admin_finance: 0,
        direct_admin: 0,
        pbt: 0,
        tax: 0,
        pat: 0
    };

    const validationSchema = Yup.object({
        asm_cost: Yup.number().required('Assembly average cost per hour is required'),
        eng_cost: Yup.number().required('Engineering average cost per hour is required'),
        revenue: Yup.number().required('Revenue is required'),
        mat_cost: Yup.number().required('Material cost is required'),
        fab_cost: Yup.number().required('Fab cost is required'),
        direct_labour_BU: Yup.number().required('Direct BU (RM) is required'),
        direct_labour_BU_share: Yup.number().required('BU share (RM) is required'),
        direct_labour_asm: Yup.number().required('Assembly (RM) is required'),
        direct_labour_cnc: Yup.number().required('CNC (RM) is required'),
        direct_labour_metalwork: Yup.number().required('Metalwork (RM) is required'),
        direct_labour_costing: Yup.number().required('Costing, PM, QA, Others (RM) is required'),
        direct_labour_BU_hour: Yup.number().required('Direct BU (Hour) is required'),
        direct_labour_BU_share_hour: Yup.number().required('BU share (Hour) is required'),
        direct_labour_asm_hour: Yup.number().required('Assembly (Hour) is required'),
        direct_labour_cnc_hour: Yup.number().required('CNC (Hour) is required'),
        direct_labour_metalwork_hour: Yup.number().required('Metalwork (Hour) is required'),
        direct_labour_costing_hour: Yup.number().required('Costing, PM, QA, Others (Hour) is required'),
        overhead_travel: Yup.number().required('Travelling (RM) is required'),
        overhead_freight: Yup.number().required('Freight (RM) is required'),
        overhead_packing: Yup.number().required('Packing (RM) is required'),
        overhead_warranty: Yup.number().required('Warranty (RM) is required'),
        overhead_direct_BU: Yup.number().required('Direct BU (RM) is required'),
        overhead_general: Yup.number().required('General (RM) is required'),
        other_income: Yup.number().required('Other income (RM) is required'),
        admin_salary: Yup.number().required('Admin Salary (RM) is required'),
        other_admin_finance: Yup.number().required('Other Admin & Finance (RM) is required'),
        direct_admin: Yup.number().required('Direct Admin (RM) is required'),
        tax: Yup.number().required('Tax (RM) is required')
    });

    const renderHeader = (
        <div className="p-input-icon-left w-full md:w-20rem">
            <i className="pi pi-search " />
            <InputText className="w-full" value={globalFilterValue} onChange={(e) => onGlobalFilterChange(e, filters, setFilters, setGlobalFilterValue)} placeholder="Keyword Search" disabled={loading} type="search" />
        </div>
    );

    const onSubmit = () => {};

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema,
        onSubmit
    });
    return (
        <div className="grid">
            <Dialog
                className="w-full md:w-10 lg:w-6"
                header="Add New Project"
                visible={openAddNewDlg}
                onHide={() => {
                    if (!openAddNewDlg) return;
                    setOpenAddNewDlg(false);
                }}
            >
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid p-fluid">
                        <div className="col-12">
                            <div className="card shadow-2 mt-1">
                                <h5>Average Hourly Salary</h5>
                                <div className="grid">
                                    <div className="col-12 sm:col-12 md:col-6">
                                        <label>Assembly Avg. Hourly Salary (Inc. Bonus) (RM)</label>

                                        <InputNumber
                                            id="asm_cost"
                                            name="asm_cost"
                                            value={formik.values.asm_cost}
                                            onValueChange={(e) => formik.setFieldValue('asm_cost', e.value)}
                                            onBlur={formik.handleBlur}
                                            mode="currency"
                                            currency="USD"
                                            locale="en-US"
                                            placeholder="Assembly Avg. Hourly Salary (Inc. Bonus) (RM)"
                                            disabled={loading}
                                            min={0}
                                        />

                                        <FormError touched={formik.touched.asm_cost} errors={formik.errors.asm_cost} />
                                    </div>

                                    <div className="col-12 sm:col-12 md:col-6">
                                        <label>Engineering Avg. Hourly Salary (Inc. Bonus) (RM)</label>

                                        <InputNumber
                                            id="eng_cost"
                                            name="eng_cost"
                                            value={formik.values.eng_cost}
                                            onValueChange={(e) => formik.setFieldValue('eng_cost', e.value)}
                                            onBlur={formik.handleBlur}
                                            mode="currency"
                                            currency="USD"
                                            locale="en-US"
                                            placeholder="Engineering Avg. Hourly Salary (Inc. Bonus) (RM)"
                                            disabled={loading}
                                            min={0}
                                        />

                                        <FormError touched={formik.touched.eng_cost} errors={formik.errors.eng_cost} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="card shadow-2">
                                <h5>Revenue</h5>
                                <div className="grid">
                                    <div className="col-12 sm:col-12 md:col-6">
                                        <label>Revenue (RM)</label>
                                        <InputNumber
                                            id="revenue"
                                            name="revenue"
                                            value={formik.values.revenue}
                                            onValueChange={(e) => {
                                                formik.setFieldValue('revenue', e.value);
                                                if (e?.value) {
                                                    formik.setFieldValue('mat_subcon_GP', e.value - formik.values.mat_cost - formik.values.fab_cost);
                                                }
                                            }}
                                            onBlur={formik.handleBlur}
                                            mode="currency"
                                            currency="USD"
                                            locale="en-US"
                                            placeholder="Revenue (RM)"
                                            disabled={loading}
                                            min={0}
                                        />
                                        <FormError touched={formik.touched.revenue} errors={formik.errors.revenue} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="card shadow-2">
                                <h5>COGS</h5>

                                <div className="grid">
                                    <div className="col-12">
                                        <div className="card shadow-2">
                                            <h5>Material</h5>
                                            <div className="grid">
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>Material (Mech, Elec & Vision) (RM)</label>
                                                    <div className="flex">
                                                        <InputNumber
                                                            id="mat_cost"
                                                            name="mat_cost"
                                                            value={formik.values.mat_cost}
                                                            onValueChange={(e) => {
                                                                formik.setFieldValue('mat_cost', e.value);
                                                                if (e?.value) {
                                                                    formik.setFieldValue('mat_subcon_GP', formik.values.revenue - e.value - formik.values.fab_cost);
                                                                }
                                                            }}
                                                            onBlur={formik.handleBlur}
                                                            mode="currency"
                                                            currency="USD"
                                                            locale="en-US"
                                                            placeholder="Material (Mech, Elec & Vision) (RM)"
                                                            disabled={loading}
                                                            min={0}
                                                        />
                                                        &nbsp;
                                                        <div className="font-bold text-lg mt-2 text-red-500">
                                                            {formik.values.revenue === 0 || formik.values.mat_cost === 0 ? 0 : -((formik.values.mat_cost / formik.values.revenue) * 100).toFixed(2)}%
                                                        </div>
                                                    </div>

                                                    <FormError touched={formik.touched.mat_cost} errors={formik.errors.mat_cost} />
                                                </div>
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>Fab (RM)</label>
                                                    <div className="flex">
                                                        <InputNumber
                                                            id="fab_cost"
                                                            name="fab_cost"
                                                            value={formik.values.fab_cost}
                                                            onValueChange={(e) => {
                                                                formik.setFieldValue('fab_cost', e.value);
                                                                if (e?.value) {
                                                                    formik.setFieldValue('mat_subcon_GP', formik.values.revenue - e.value - formik.values.mat_cost);
                                                                }
                                                            }}
                                                            onBlur={formik.handleBlur}
                                                            mode="currency"
                                                            currency="USD"
                                                            locale="en-US"
                                                            placeholder="Fab (RM)"
                                                            disabled={loading}
                                                            min={0}
                                                        />
                                                        &nbsp;
                                                        <div className="font-bold text-lg mt-2  text-red-500">
                                                            {formik.values.revenue === 0 || formik.values.fab_cost === 0 ? 0 : -((formik.values.fab_cost / formik.values.revenue) * 100).toFixed(2)}%
                                                        </div>
                                                    </div>

                                                    <FormError touched={formik.touched.fab_cost} errors={formik.errors.fab_cost} />
                                                </div>
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>GP on Material Subcon (RM)</label>
                                                    <div className="flex">
                                                        <InputNumber
                                                            id="mat_subcon_GP"
                                                            name="mat_subcon_GP"
                                                            value={formik.values.mat_subcon_GP}
                                                            onValueChange={(e) => formik.setFieldValue('mat_subcon_GP', e.value)}
                                                            onBlur={formik.handleBlur}
                                                            mode="currency"
                                                            currency="USD"
                                                            locale="en-US"
                                                            placeholder="GP on Material Subcon (RM)"
                                                            disabled
                                                            min={0}
                                                        />
                                                        &nbsp;
                                                        <div className="font-bold text-lg mt-2 text-green-500">
                                                            {formik.values.revenue === 0 || formik.values.mat_subcon_GP === 0 ? 0 : ((formik.values.mat_subcon_GP / formik.values.revenue) * 100).toFixed(2)}%
                                                        </div>
                                                    </div>
                                                    <FormError touched={formik.touched.mat_subcon_GP} errors={formik.errors.mat_subcon_GP} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="card shadow-2">
                                            <h5>Direct Labour</h5>
                                            <div className="flex">
                                                <h6 className="flex">
                                                    Direct BU &nbsp;<div className="font-bold  text-green-500"> (0%)</div>
                                                </h6>
                                            </div>

                                            <div className="grid">
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>Direct BU (Hour)</label>

                                                    <InputNumber
                                                        id="direct_labour_BU_hour"
                                                        name="direct_labour_BU_hour"
                                                        value={formik.values.direct_labour_BU}
                                                        onValueChange={(e) => formik.setFieldValue('direct_labour_BU_hour', e.value)}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="Direct BU (Hour)"
                                                        min={0}
                                                    />

                                                    <FormError touched={formik.touched.direct_labour_BU_hour} errors={formik.errors.direct_labour_BU_hour} />
                                                </div>
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>Direct BU (RM)</label>
                                                    <InputNumber
                                                        id="direct_labour_BU"
                                                        name="direct_labour_BU"
                                                        value={formik.values.direct_labour_BU_hour}
                                                        onValueChange={(e) => formik.setFieldValue('direct_labour_BU', e.value)}
                                                        onBlur={formik.handleBlur}
                                                        mode="currency"
                                                        currency="USD"
                                                        locale="en-US"
                                                        placeholder="Direct BU (RM)"
                                                        min={0}
                                                    />
                                                    <FormError touched={formik.touched.direct_labour_BU} errors={formik.errors.direct_labour_BU} />
                                                </div>
                                            </div>
                                            <h6 className="flex">
                                                BU Share &nbsp;<div className="font-bold  text-green-500"> (0%)</div>
                                            </h6>
                                            <div className="grid">
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>BU Share (Hour)</label>
                                                    <InputNumber
                                                        id="direct_labour_BU_share_hour"
                                                        name="direct_labour_BU_share_hour"
                                                        value={formik.values.direct_labour_BU}
                                                        onValueChange={(e) => formik.setFieldValue('direct_labour_BU_share_hour', e.value)}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="BU Share (Hour)"
                                                        min={0}
                                                    />
                                                    <FormError touched={formik.touched.direct_labour_BU_share_hour} errors={formik.errors.direct_labour_BU_share_hour} />
                                                </div>
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>BU Share (RM)</label>
                                                    <InputNumber
                                                        id="direct_labour_BU_share"
                                                        name="direct_labour_BU_share"
                                                        value={formik.values.direct_labour_BU_share}
                                                        onValueChange={(e) => formik.setFieldValue('direct_labour_BU_share', e.value)}
                                                        onBlur={formik.handleBlur}
                                                        mode="currency"
                                                        currency="USD"
                                                        locale="en-US"
                                                        placeholder="BU Share (RM)"
                                                        min={0}
                                                    />
                                                    <FormError touched={formik.touched.direct_labour_BU_share} errors={formik.errors.direct_labour_BU_share} />
                                                </div>
                                            </div>
                                            <h6 className="flex">
                                                Assembly &nbsp;<div className="font-bold  text-green-500"> (0%)</div>
                                            </h6>
                                            <div className="grid">
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>Assembly (Hour)</label>
                                                    <InputNumber
                                                        id="direct_labour_asm_hour"
                                                        name="direct_labour_asm_hour"
                                                        value={formik.values.direct_labour_asm_hour}
                                                        onValueChange={(e) => formik.setFieldValue('direct_labour_asm_hour', e.value)}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="Assembly (Hour)"
                                                        min={0}
                                                    />
                                                    <FormError touched={formik.touched.direct_labour_asm_hour} errors={formik.errors.direct_labour_asm_hour} />
                                                </div>
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>Assembly (RM)</label>
                                                    <InputNumber
                                                        id="direct_labour_asm"
                                                        name="direct_labour_asm"
                                                        value={formik.values.direct_labour_asm}
                                                        onValueChange={(e) => formik.setFieldValue('direct_labour_asm', e.value)}
                                                        onBlur={formik.handleBlur}
                                                        mode="currency"
                                                        currency="USD"
                                                        locale="en-US"
                                                        placeholder="Assembly (RM)"
                                                        min={0}
                                                    />
                                                    <FormError touched={formik.touched.direct_labour_asm} errors={formik.errors.direct_labour_asm} />
                                                </div>
                                            </div>
                                            <h6 className="flex">
                                                CNC &nbsp;<div className="font-bold  text-green-500"> (0%)</div>
                                            </h6>
                                            <div className="grid">
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>CNC (Hour)</label>
                                                    <InputNumber
                                                        id="direct_labour_cnc_hour"
                                                        name="direct_labour_cnc_hour"
                                                        value={formik.values.direct_labour_cnc_hour}
                                                        onValueChange={(e) => formik.setFieldValue('direct_labour_cnc_hour', e.value)}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="CNC (Hour)"
                                                        min={0}
                                                    />
                                                    <FormError touched={formik.touched.direct_labour_cnc_hour} errors={formik.errors.direct_labour_cnc_hour} />
                                                </div>
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>CNC (RM)</label>
                                                    <InputNumber
                                                        id="direct_labour_cnc"
                                                        name="direct_labour_cnc"
                                                        value={formik.values.direct_labour_cnc}
                                                        onValueChange={(e) => formik.setFieldValue('direct_labour_cnc', e.value)}
                                                        onBlur={formik.handleBlur}
                                                        mode="currency"
                                                        currency="USD"
                                                        locale="en-US"
                                                        placeholder="CNC (RM)"
                                                        min={0}
                                                    />
                                                    <FormError touched={formik.touched.direct_labour_cnc} errors={formik.errors.direct_labour_cnc} />
                                                </div>
                                            </div>
                                            <h6 className="flex">
                                                Metalwork &nbsp;<div className="font-bold  text-green-500"> (0%)</div>
                                            </h6>
                                            <div className="grid">
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>Metalwork (Hour)</label>
                                                    <InputNumber
                                                        id="direct_labour_metalwork_hour"
                                                        name="direct_labour_metalwork_hour"
                                                        value={formik.values.direct_labour_metalwork_hour}
                                                        onValueChange={(e) => formik.setFieldValue('direct_labour_metalwork_hour', e.value)}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="Metalwork (Hour)"
                                                        min={0}
                                                    />
                                                    <FormError touched={formik.touched.direct_labour_metalwork_hour} errors={formik.errors.direct_labour_metalwork_hour} />
                                                </div>
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>Metalwork (RM)</label>
                                                    <InputNumber
                                                        id="direct_labour_metalwork"
                                                        name="direct_labour_metalwork"
                                                        value={formik.values.direct_labour_metalwork}
                                                        onValueChange={(e) => formik.setFieldValue('direct_labour_metalwork', e.value)}
                                                        onBlur={formik.handleBlur}
                                                        mode="currency"
                                                        currency="USD"
                                                        locale="en-US"
                                                        placeholder="Metalwork (RM)"
                                                        min={0}
                                                    />
                                                    <FormError touched={formik.touched.direct_labour_metalwork} errors={formik.errors.direct_labour_metalwork} />
                                                </div>
                                            </div>
                                            <h6 className="flex">
                                                Costing, PM, QA or Others &nbsp;<div className="font-bold  text-green-500"> (0%)</div>
                                            </h6>
                                            <div className="grid">
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>Costing, PM, QA or Others (Hour)</label>
                                                    <InputNumber
                                                        id="direct_labour_costing_hour"
                                                        name="direct_labour_costing_hour"
                                                        value={formik.values.direct_labour_costing_hour}
                                                        onValueChange={(e) => formik.setFieldValue('direct_labour_costing_hour', e.value)}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="Costing, PM, QA or Others (Hour)"
                                                        min={0}
                                                    />
                                                    <FormError touched={formik.touched.direct_labour_costing_hour} errors={formik.errors.direct_labour_costing_hour} />
                                                </div>
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>Costing, PM, QA or Others (RM)</label>
                                                    <InputNumber
                                                        id="direct_labour_costing"
                                                        name="direct_labour_costing"
                                                        value={formik.values.direct_labour_costing}
                                                        onValueChange={(e) => formik.setFieldValue('direct_labour_costing', e.value)}
                                                        onBlur={formik.handleBlur}
                                                        mode="currency"
                                                        currency="USD"
                                                        locale="en-US"
                                                        placeholder="Costing, PM, QA or Others (RM)"
                                                        min={0}
                                                    />
                                                    <FormError touched={formik.touched.direct_labour_costing} errors={formik.errors.direct_labour_costing} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="card shadow-2">
                                            <h5>Overhead</h5>
                                            <div className="grid">
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>Travelling (RM)</label>
                                                    <div className="flex">
                                                        <InputNumber
                                                            id="overhead_travel"
                                                            name="overhead_travel"
                                                            value={formik.values.overhead_travel}
                                                            onValueChange={(e) => formik.setFieldValue('overhead_travel', e.value)}
                                                            onBlur={formik.handleBlur}
                                                            mode="currency"
                                                            currency="USD"
                                                            locale="en-US"
                                                            placeholder="Travelling (RM)"
                                                            min={0}
                                                        />
                                                        &nbsp;
                                                        <div className="font-bold text-lg mt-2 text-green-500">
                                                            {formik.values.revenue === 0 || formik.values.overhead_travel === 0 ? 0 : ((formik.values.overhead_travel / formik.values.revenue) * 100).toFixed(2)}%
                                                        </div>
                                                    </div>

                                                    <FormError touched={formik.touched.overhead_travel} errors={formik.errors.overhead_travel} />
                                                </div>
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>Freight (RM)</label>
                                                    <div className="flex">
                                                        <InputNumber
                                                            id="overhead_freight"
                                                            name="overhead_freight"
                                                            value={formik.values.overhead_freight}
                                                            onValueChange={(e) => formik.setFieldValue('overhead_freight', e.value)}
                                                            onBlur={formik.handleBlur}
                                                            mode="currency"
                                                            currency="USD"
                                                            locale="en-US"
                                                            placeholder="Freight (RM)"
                                                            min={0}
                                                        />
                                                        &nbsp;
                                                        <div className="font-bold text-lg mt-2 text-green-500">0%</div>
                                                    </div>

                                                    <FormError touched={formik.touched.overhead_freight} errors={formik.errors.overhead_freight} />
                                                </div>
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>Packing (RM)</label>
                                                    <div className="flex">
                                                        <InputNumber
                                                            id="overhead_packing"
                                                            name="overhead_packing"
                                                            value={formik.values.overhead_packing}
                                                            onValueChange={(e) => formik.setFieldValue('overhead_packing', e.value)}
                                                            onBlur={formik.handleBlur}
                                                            mode="currency"
                                                            currency="USD"
                                                            locale="en-US"
                                                            placeholder="Packing (RM)"
                                                            min={0}
                                                        />
                                                        &nbsp;
                                                        <div className="font-bold text-lg mt-2 text-green-500">0%</div>
                                                    </div>

                                                    <FormError touched={formik.touched.overhead_packing} errors={formik.errors.overhead_packing} />
                                                </div>
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>Warranty (RM)</label>
                                                    <div className="flex">
                                                        <InputNumber
                                                            id="overhead_warranty"
                                                            name="overhead_warranty"
                                                            value={formik.values.overhead_warranty}
                                                            onValueChange={(e) => formik.setFieldValue('overhead_warranty', e.value)}
                                                            onBlur={formik.handleBlur}
                                                            mode="currency"
                                                            currency="USD"
                                                            locale="en-US"
                                                            placeholder="Warranty (RM)"
                                                            min={0}
                                                        />
                                                        &nbsp;
                                                        <div className="font-bold text-lg mt-2 text-green-500">0%</div>
                                                    </div>

                                                    <FormError touched={formik.touched.overhead_warranty} errors={formik.errors.overhead_warranty} />
                                                </div>
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>Direct BU (RM)</label>
                                                    <div className="flex">
                                                        <InputNumber
                                                            id="overhead_direct_BU"
                                                            name="overhead_direct_BU"
                                                            value={formik.values.overhead_direct_BU}
                                                            onValueChange={(e) => formik.setFieldValue('overhead_direct_BU', e.value)}
                                                            onBlur={formik.handleBlur}
                                                            mode="currency"
                                                            currency="USD"
                                                            locale="en-US"
                                                            placeholder="Direct BU (RM)"
                                                            min={0}
                                                        />
                                                        &nbsp;
                                                        <div className="font-bold text-lg mt-2 text-green-500">0%</div>
                                                    </div>

                                                    <FormError touched={formik.touched.overhead_direct_BU} errors={formik.errors.overhead_direct_BU} />
                                                </div>
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>General (RM)</label>
                                                    <div className="flex">
                                                        <InputNumber
                                                            id="overhead_general"
                                                            name="overhead_general"
                                                            value={formik.values.overhead_general}
                                                            onValueChange={(e) => formik.setFieldValue('overhead_general', e.value)}
                                                            onBlur={formik.handleBlur}
                                                            mode="currency"
                                                            currency="USD"
                                                            locale="en-US"
                                                            placeholder="General (RM)"
                                                            min={0}
                                                        />
                                                        &nbsp;
                                                        <div className="font-bold text-lg mt-2 text-green-500">0%</div>
                                                    </div>

                                                    <FormError touched={formik.touched.overhead_general} errors={formik.errors.overhead_general} />
                                                </div>
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>Total Overhead (RM)</label>
                                                    <InputNumber
                                                        id="total_overhead"
                                                        name="total_overhead"
                                                        value={formik.values.total_overhead}
                                                        onValueChange={(e) => formik.setFieldValue('total_overhead', e.value)}
                                                        onBlur={formik.handleBlur}
                                                        mode="currency"
                                                        currency="USD"
                                                        locale="en-US"
                                                        placeholder="Total Overhead"
                                                        disabled
                                                        min={0}
                                                    />
                                                    <FormError touched={formik.touched.total_overhead} errors={formik.errors.total_overhead} />
                                                </div>
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>GP after DL and Overhead (RM)</label>
                                                    <InputNumber
                                                        id="gp_after_dl_overhead"
                                                        name="gp_after_dl_overhead"
                                                        value={formik.values.gp_after_dl_overhead}
                                                        onValueChange={(e) => formik.setFieldValue('gp_after_dl_overhead', e.value)}
                                                        onBlur={formik.handleBlur}
                                                        mode="currency"
                                                        currency="USD"
                                                        locale="en-US"
                                                        placeholder="Total Overhead"
                                                        disabled
                                                        min={0}
                                                    />
                                                    <FormError touched={formik.touched.gp_after_dl_overhead} errors={formik.errors.gp_after_dl_overhead} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="card shadow-2">
                                            <h5>Other</h5>
                                            <div className="grid">
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>Other Income (RM)</label>
                                                    <div className="flex">
                                                        <InputNumber
                                                            id="other_income"
                                                            name="other_income"
                                                            value={formik.values.other_income}
                                                            onValueChange={(e) => formik.setFieldValue('other_income', e.value)}
                                                            onBlur={formik.handleBlur}
                                                            mode="currency"
                                                            currency="USD"
                                                            locale="en-US"
                                                            placeholder="Other Income (RM)"
                                                            min={0}
                                                        />
                                                        &nbsp;
                                                        <div className="font-bold text-lg mt-2 text-green-500">
                                                            {formik.values.revenue === 0 || formik.values.other_income === 0 ? 0 : ((formik.values.other_income / formik.values.revenue) * 100).toFixed(2)}%
                                                        </div>
                                                    </div>

                                                    <FormError touched={formik.touched.other_income} errors={formik.errors.other_income} />
                                                </div>
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>Admin Salary (RM)</label>
                                                    <div className="flex">
                                                        <InputNumber
                                                            id="admin_salary"
                                                            name="admin_salary"
                                                            value={formik.values.admin_salary}
                                                            onValueChange={(e) => formik.setFieldValue('admin_salary', e.value)}
                                                            onBlur={formik.handleBlur}
                                                            mode="currency"
                                                            currency="USD"
                                                            locale="en-US"
                                                            placeholder="Admin Salary (RM)"
                                                            min={0}
                                                        />
                                                        &nbsp;
                                                        <div className="font-bold text-lg mt-2 text-green-500">
                                                            {formik.values.revenue === 0 || formik.values.admin_salary === 0 ? 0 : ((formik.values.admin_salary / formik.values.revenue) * 100).toFixed(2)}%
                                                        </div>
                                                    </div>

                                                    <FormError touched={formik.touched.admin_salary} errors={formik.errors.admin_salary} />
                                                </div>
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>Other Admin & Finance (RM)</label>
                                                    <div className="flex">
                                                        <InputNumber
                                                            id="other_admin_finance"
                                                            name="other_admin_finance"
                                                            value={formik.values.other_admin_finance}
                                                            onValueChange={(e) => formik.setFieldValue('other_admin_finance', e.value)}
                                                            onBlur={formik.handleBlur}
                                                            mode="currency"
                                                            currency="USD"
                                                            locale="en-US"
                                                            placeholder="Other Admin & Finance (RM)"
                                                            min={0}
                                                        />
                                                        &nbsp;
                                                        <div className="font-bold text-lg mt-2 text-red-500">
                                                            {formik.values.revenue === 0 || formik.values.other_admin_finance === 0 ? 0 : -((formik.values.other_admin_finance / formik.values.revenue) * 100).toFixed(2)}%
                                                        </div>
                                                    </div>

                                                    <FormError touched={formik.touched.other_admin_finance} errors={formik.errors.other_admin_finance} />
                                                </div>
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>Direct Admin (RM)</label>
                                                    <div className="flex">
                                                        <InputNumber
                                                            id="direct_admin"
                                                            name="direct_admin"
                                                            value={formik.values.direct_admin}
                                                            onValueChange={(e) => formik.setFieldValue('direct_admin', e.value)}
                                                            onBlur={formik.handleBlur}
                                                            mode="currency"
                                                            currency="USD"
                                                            locale="en-US"
                                                            placeholder="Direct Admin (RM)"
                                                            min={0}
                                                        />
                                                        &nbsp;
                                                        <div className="font-bold text-lg mt-2 text-green-500">
                                                            {formik.values.revenue === 0 || formik.values.direct_admin === 0 ? 0 : ((formik.values.direct_admin / formik.values.revenue) * 100).toFixed(2)}%
                                                        </div>
                                                    </div>

                                                    <FormError touched={formik.touched.direct_admin} errors={formik.errors.direct_admin} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="card shadow-2">
                                            <h5>Tax</h5>
                                            <div className="grid">
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>PBT (RM)</label>
                                                    <div className="flex">
                                                        <InputNumber
                                                            id="pbt"
                                                            name="pbt"
                                                            value={formik.values.pbt}
                                                            onValueChange={(e) => formik.setFieldValue('pbt', e.value)}
                                                            onBlur={formik.handleBlur}
                                                            mode="currency"
                                                            currency="USD"
                                                            locale="en-US"
                                                            placeholder="PBT (RM)"
                                                            disabled
                                                            min={0}
                                                        />
                                                        &nbsp;
                                                        <div className="font-bold text-lg mt-2 text-green-500">0%</div>
                                                    </div>

                                                    <FormError touched={formik.touched.pbt} errors={formik.errors.pbt} />
                                                </div>
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>Tax (RM)</label>
                                                    <div className="flex">
                                                        <InputNumber
                                                            id="tax"
                                                            name="tax"
                                                            value={formik.values.tax}
                                                            onValueChange={(e) => formik.setFieldValue('tax', e.value)}
                                                            onBlur={formik.handleBlur}
                                                            mode="currency"
                                                            currency="USD"
                                                            locale="en-US"
                                                            placeholder="Tax (RM)"
                                                            min={0}
                                                        />
                                                        &nbsp;
                                                        <div className="font-bold text-lg mt-2 text-green-500">0%</div>
                                                    </div>

                                                    <FormError touched={formik.touched.tax} errors={formik.errors.tax} />
                                                </div>
                                                <div className="col-12 sm:col-12 md:col-6">
                                                    <label>PAT (RM)</label>
                                                    <div className="flex">
                                                        <InputNumber
                                                            id="pat"
                                                            name="pat"
                                                            value={formik.values.pat}
                                                            onValueChange={(e) => formik.setFieldValue('pat', e.value)}
                                                            onBlur={formik.handleBlur}
                                                            mode="currency"
                                                            currency="USD"
                                                            locale="en-US"
                                                            placeholder="PAT (RM)"
                                                            disabled
                                                            min={0}
                                                        />
                                                        &nbsp;
                                                        <div className="font-bold text-lg mt-2 text-green-500">0%</div>
                                                    </div>

                                                    <FormError touched={formik.touched.pat} errors={formik.errors.pat} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 flex border-bottom-1 border-300">
                            <Checkbox onChange={(e: any) => setChecked && setChecked(e?.checked)} checked={checked ?? false} />
                            &nbsp; <div className="ml-2">Add More</div>
                        </div>

                        <div className="col-12 flex justify-content-between mt-1">
                            <Button className="w-4 md:w-3 bg-green-500 border-green-500" label="Save Draft" icon="pi pi-pencil" />
                            <Button className="w-4 md:w-3" label="Save" icon="pi pi-check" />
                        </div>
                    </div>
                </form>
            </Dialog>
            <div className="col-12">
                <Button label="Add New Project" icon="pi pi-plus" onClick={() => setOpenAddNewDlg(true)} />
            </div>
            <div className="col-6">
                <div className="card">
                    <h5>Approved & Rejected Projects</h5>
                    <DataTable
                        header={renderHeader}
                        paginator
                        rows={10}
                        selectionMode="single"
                        filters={filters}
                        onFilter={(e: any) => setFilters(e.filters)}
                        value={data}
                        globalFilterFields={['workweek']}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} results"
                        emptyMessage="No result found."
                        sortField="user.name"
                    ></DataTable>
                </div>
            </div>
            <div className="col-6">
                <div className="card">
                    <h5>Pending Approval Projects</h5>
                    <DataTable
                        header={renderHeader}
                        paginator
                        rows={10}
                        selectionMode="single"
                        filters={filters}
                        onFilter={(e: any) => setFilters(e.filters)}
                        value={data}
                        globalFilterFields={['workweek']}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} results"
                        emptyMessage="No result found."
                        sortField="user.name"
                    ></DataTable>
                </div>
            </div>
        </div>
    );
};

export default ProjectListing;
