import { format } from "date-fns";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

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

  static async showWarningMessage(message: string) {
    return await Swal.fire({
      title: message,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
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
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(data));
    }

    return null;
  }

  static getItem(key: string) {
    if (typeof window !== "undefined") {
      const res = JSON.parse(localStorage.getItem(key) || "{}");
      return res;
    }

    return null;
  }

  static clearStorage() {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  }

  static capitalizeFirstLetter(string: string | null) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return "";
  }

  static getAMPMTime(one: any, two: any) {
    const outputFormat = "h:mm:ss a";
    return `${format(new Date(`2000-01-01T${one}`), outputFormat)} - ${format(
      new Date(`2000-01-01T${two}`),
      outputFormat
    )}`;
  }
}

export default Utils;
