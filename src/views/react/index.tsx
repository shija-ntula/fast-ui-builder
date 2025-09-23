import React from 'react'

// --------------------------
// Button Component
// --------------------------
export interface ButtonProps {
  label: string
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

// --------------------------
// Card Component
// --------------------------
export interface CardProps {
  title: string
  children?: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '6px',
        padding: '1rem',
        marginBottom: '1rem',
      }}
    >
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  )
}
