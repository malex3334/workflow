import React from "react";

export default function Input({
  type = "text",
  className,
  placeholder,
  value,
  children,
  onChange,
  min,
  step,
}) {
  return (
    <input
      className={className}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      value={value}
      required
      min={min}
      step={step}
    />
  );
}
