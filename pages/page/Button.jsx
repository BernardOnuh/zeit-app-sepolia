
export default function Button({ onClickHandler, children }) {
  return (
    <button className="w-full medium-btn default-btn" onClick={onClickHandler}>
      { 
        children
      }
    </button>
  );
}
