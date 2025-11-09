import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  name: string;
}

export function Input({ label, error, name, className = '', ...props }: InputProps) {
  const inputId = `input-${name}`;
  const errorId = error ? `error-${name}` : undefined;

  return (
    <div className="input-wrapper">
      <label htmlFor={inputId} className="input-label">
        {label}
        {props.required && <span className="required">*</span>}
      </label>
      <input
        id={inputId}
        name={name}
        className={`input ${error ? 'input-error' : ''} ${className}`.trim()}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={errorId}
        {...props}
      />
      {error && (
        <span id={errorId} className="input-error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

