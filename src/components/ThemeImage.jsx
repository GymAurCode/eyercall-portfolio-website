function ThemeImage() {
  return (
    <>
      {/* Light mode logo */}
      <img
        src="/images/lightmoodlogo.gif"
        alt="Eyercall Logo"
        className="w-40 h-auto dark:hidden"
      />

      {/* Dark mode logo */}
      <img
        src="/images/eyercall-gif.gif"
        alt="Eyercall Logo"
        className="w-40 h-auto hidden dark:block"
      />
    </>
  );
}

export default ThemeImage;
