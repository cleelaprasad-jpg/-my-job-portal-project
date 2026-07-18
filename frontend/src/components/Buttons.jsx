//default button
export function Button({ children, variant = "primary", ...props }) {
  return (
    <button className={`btn text-btn-${variant}`} {...props}>
      {children}
    </button>
  );
}
