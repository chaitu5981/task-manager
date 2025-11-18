const Loader = ({ size = 15 }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="border-t-transparent border-2 border-white rounded-full animate-spin"
        style={{ width: `${size}px`, height: `${size}px` }}
      ></div>
    </div>
  );
};
export default Loader;
