class Utils {
  static scrollToView = (id: string) => {
    const element: any = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop ? element.offsetTop - 204 : 0,
        behavior: "smooth",
      });
    }
  };
}

export default Utils;
