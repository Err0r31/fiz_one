import React, { useRef, useEffect } from "react";
import "./Input.css";

function Input({ label, id, name, placeholder }) {
  const inputRefs = useRef([]); 

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 1); 
  }, []);

  useEffect(() => {
    const updatePadding = () => {
      inputRefs.current.forEach((input) => {
        const label = input?.previousElementSibling;
        if (label) {
          const labelWidth = label.offsetWidth / 10;
          const padding = 2.5; 
          input.style.paddingLeft = `${labelWidth + padding}rem`; 
        }
      });
    };

    updatePadding();

    const timeout = setTimeout(updatePadding, 100);

    window.addEventListener("resize", updatePadding);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updatePadding);
    };
  }, []);

  return (
    <div className="custom-input">
      <label htmlFor={id} className="custom-input__label">
        {label}
      </label>
      <input
        className="custom-input__field"
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        autoComplete="off"
        ref={el => inputRefs.current[0] = el}
      />
    </div>
  );
}

export default Input;
