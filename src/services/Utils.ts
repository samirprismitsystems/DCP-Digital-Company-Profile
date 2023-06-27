import { toast } from "react-toastify";

class Utils {
  static showErrorMessage(message: string) {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  static showSuccessMessage(message: string) {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  static scrollToView(id: string) {
    const element: any = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop ? element.offsetTop - 204 : 0,
        behavior: "smooth",
      });
    }
  }

  static setItem(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static getItem(key: string) {
    const res = JSON.parse(localStorage.getItem(key) || "{}");
    return res;
  }

  static clearStorage() {
    localStorage.clear();
  }
}

export default Utils;
