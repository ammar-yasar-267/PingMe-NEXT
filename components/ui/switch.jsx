import React from "react";

/**
 * Switch Component
 * @param {Object} props
 * @param {boolean} props.checked - The state of the switch (on/off).
 * @param {function} props.onCheckedChange - Callback to handle the state change when the switch is toggled.
 * @param {string} props.id - The `id` attribute of the switch element.
 * @param {string} props.className - Additional CSS classes for styling.
 * @returns {JSX.Element} Switch component.
 */
export const Switch = ({ checked, onCheckedChange, id, className, ...props }) => {
  const handleChange = () => {
    onCheckedChange(!checked);
  };

  return (
    <div className={`relative inline-flex items-center cursor-pointer ${className}`} {...props}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="sr-only"
      />
      <div
        className={`w-11 h-6 bg-gray-300 rounded-full transition-all duration-200 ${checked ? 'bg-blue-600' : ''}`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-md transition-all duration-200 transform ${checked ? 'translate-x-5' : ''}`}
        />
      </div>
    </div>
  );
};
