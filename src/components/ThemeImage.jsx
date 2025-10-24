function ThemeImage() {
  return (
    <img
      src={isDark ? "/images/eyercall-gif.gif" : "/images/lightmoodlogo.gif"}
      alt="Eyercall Logo"
      className="w-40 h-auto"
    />
  );
}

export default ThemeImage;