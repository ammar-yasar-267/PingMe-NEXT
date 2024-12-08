import React from "react";

/**
 * Label Component
 * @param {Object} props
 * @param {string} props.htmlFor - The `id` of the associated input element.
 * @param {string} props.className - Additional CSS classes for styling.
 * @param {React.ReactNode} props.children - The content of the label.
 * @returns {JSX.Element} Label element.
 */
export const Label = ({ htmlFor, className, children, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};
