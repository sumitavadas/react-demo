import { useState } from "react";

const EMPTY_FORM = { name: "", email: "", role: "Viewer", dept: "", status: "Active" };

function validate(form) {
  const errors = {};
  if (!form.name.trim())  errors.name  = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Invalid email format";
  if (!form.dept.trim())  errors.dept  = "Department is required";
  return errors;
}

export function useUserForm(initialUser = null) {
  const [form, setForm]     = useState(initialUser ? { ...EMPTY_FORM, ...initialUser } : EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: undefined }));
  };

  const handleChange = (e) => setField(e.target.name, e.target.value);

  const validateForm = () => {
    const errs = validate(form);
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const reset = () => {
    setForm(EMPTY_FORM);
    setErrors({});
  };

  return { form, errors, setField, handleChange, validateForm, reset };
}
