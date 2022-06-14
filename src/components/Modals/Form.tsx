import React, { forwardRef } from 'react'
import Modal from '../Common/Modal'

import * as Yup from "yup";
import { Formik } from "formik";

const fData = {
  email: "",
  name: "",
  phoneNumber: "",
  dateOfBirth: "",
  dateOfEmployment: "",
  homeAddress: {
    city: "",
    zipCode:"",
    addressLine1:"",
    addressLine2:""
  }
}

const Form = ({onConfirm,onReject,formData}:any,ref: any) => {
  const {homeAddress:{city,zipCode,addressLine1,addressLine2},...others} = formData ?? fData;
  return (
    <Modal ref={ref}>
        <div>
          <Formik
            initialValues={{ city,zipCode,addressLine1,addressLine2,...others }}
            onSubmit={values => {
              const {city,zipCode,addressLine2,addressLine1,...basic} = values;
              const data = {
                ...basic,
                homeAddress: {
                  city,
                  zipCode,
                  addressLine1,
                  addressLine2
                }
              }
              onConfirm(data)
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email().required("Required"),
              name: Yup.string().min(3,"too short"),
              phoneNumber: Yup.string().matches(/^\+977(-)?\d{10}$/,"not correct format"),

            }
            )}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" style={{ display: "block" }}>
                      Name
                    </label>
                    <input
                      id="name"
                      placeholder="Name"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.name && touched.name
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.name && touched.name && (
                      // @ts-ignore
                      <div className="input-feedback">{errors.name}</div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" style={{ display: "block" }}>
                      Email
                    </label>
                    <input
                      id="email"
                      placeholder="Enter your email"
                      type="text"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.email && touched.email
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.email && touched.email && (
                      // @ts-ignore
                      <div className="input-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" style={{ display: "block" }}>
                      Phone
                    </label>
                    <input
                      id="phoneNumber"
                      placeholder="Enter your phone..."
                      type="text"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.phoneNumber && touched.phoneNumber
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.phoneNumber && touched.phoneNumber && (
                      // @ts-ignore
                      <div className="input-feedback">{errors.phoneNumber}</div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="dateOfBirth" style={{ display: "block" }}>
                      Date of Birth
                    </label>
                    <input
                      id="dateOfBirth"
                      placeholder="Enter your phone..."
                      type={'date'}
                      value={values.dateOfBirth}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.dateOfBirth && touched.dateOfBirth
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.dateOfBirth && touched.dateOfBirth && (
                      // @ts-ignore
                      <div className="input-feedback">{errors.dateOfBirth}</div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="dateOfEmployment" style={{ display: "block" }}>
                      Date Of Employment
                    </label>
                    <input
                      id="dateOfEmployment"
                      placeholder="Enter your phone..."
                      type={'date'}
                      value={values.dateOfEmployment}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.dateOfEmployment && touched.dateOfEmployment
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.dateOfEmployment && touched.dateOfEmployment && (
                      // @ts-ignore
                      <div className="input-feedback">{errors.dateOfEmployment}</div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="city" style={{ display: "block" }}>
                      City
                    </label>
                    <input
                      id="city"
                      placeholder="Enter your city..."
                      type={'text'}
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.city && touched.city
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.city && touched.city && (
                      // @ts-ignore
                      <div className="input-feedback">{errors.city}</div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="zipCode" style={{ display: "block" }}>
                      Zip Code
                    </label>
                    <input
                      id="zipCode"
                      placeholder="Enter your zip code..."
                      type={'text'}
                      value={values.zipCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.zipCode && touched.zipCode
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.zipCode && touched.zipCode && (
                      // @ts-ignore
                      <div className="input-feedback">{errors.zipCode}</div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="addressLine1" style={{ display: "block" }}>
                      Address 1
                    </label>
                    <input
                      id="addressLine1"
                      placeholder="address..."
                      type={'text'}
                      value={values.addressLine1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.addressLine1 && touched.addressLine1
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.addressLine1 && touched.addressLine1 && (
                      // @ts-ignore
                      <div className="input-feedback">{errors.addressLine1}</div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="addressLine2" style={{ display: "block" }}>
                      Address 2
                    </label>
                    <input
                      id="addressLine2"
                      placeholder="address..."
                      type={'text'}
                      value={values.addressLine2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.addressLine2 && touched.addressLine2
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.addressLine2 && touched.addressLine2 && (
                      // @ts-ignore
                      <div className="input-feedback">{errors.addressLine2}</div>
                    )}
                  </div>

                  <button
                    type="button"
                    className="outline"
                    onClick={onReject}
                    disabled={!dirty || isSubmitting}
                  >
                    Reset
                  </button>
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>

                </form>
              );
            }}
          </Formik>
        </div>
    </Modal>
  )
}

export default forwardRef(Form)