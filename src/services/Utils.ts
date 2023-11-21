import { format, parse } from "date-fns";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

class Utils {
  static showErrorMessage(message: string) {
    toast.error(message, {
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  static showSuccessMessage(message: string) {
    toast.success(message, {
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
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

  static scrollToView(id: string, offsetValue?: number) {
    if (typeof window !== "undefined") {
      const element: any = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop ? element.offsetTop - (offsetValue || 204) : 0,
          behavior: "smooth",
        });
      }
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
      if (typeof res === "object" && Object.keys(res).length === 0) {
        return null;
      }

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

    return null;
  }

  static getAMPMTime(one: any, two: any) {
    const outputFormat = "h:mm:ss a";
    return `${format(new Date(`2000-01-01T${one}`), outputFormat)} - ${format(
      new Date(`2000-01-01T${two}`),
      outputFormat
    )}`;
  }

  static getTotalPages(data: any, itemPerPage: number) {
    return Math.ceil(data.length / itemPerPage);
  }

  static removeLSItem(name: string) {
    localStorage.removeItem(name);
  }

  static generatePageSlug(name: string) {
    let slug = name.replace(/[^a-zA-Z ]/g, "");
    if (slug) {
      let company_slug = slug
        ?.replace(" ", "-")
        .replace(/\s+/g, "")
        .toLowerCase();

      return company_slug;
    }

    return null;
  }

  static getWorkingHours(timeString: string) {
    if (timeString) {
      const parsedTime = parse(timeString, "HH:mm:ss", new Date());
      if (parsedTime) {
        return format(parsedTime, "h:mm a");
      }
    } else {
      return "N/A";
    }
  }

  static getYear(date: string) {
    if (date) {
      if (format(new Date(date), "yyyy")) {
        return format(new Date(date), "yyyy");
      }
    } else {
      return "N/A";
    }
  }

  static getPageSlug() {
    const result = this.getItem("slug");
    if (result) {
      return result;
    } else {
      return null;
    }
  }

  static setCompanyID(companyID: any) {
    this.setItem("IMAGE_UPLOAD_ID", companyID);
  }

  static getCompanyID() {
    const result = this.getItem("IMAGE_UPLOAD_ID");
    if (result) {
      return result;
    } else {
      return null;
    }
  }

  static setUserID(userID: any) {
    this.setItem("userID", userID);
  }

  static getUserID() {
    const result = this.getItem("userID");
    if (result) {
      return result;
    } else {
      return null;
    }
  }

  static getSelectedThemeID() {
    const result = this.getItem("themeID");
    if (result) {
      return result;
    } else {
      return null;
    }
  }

  static setSelectedThemeID(themeID: any) {
    this.setItem("themeID", themeID);
  }

  static getMondayToSundayDateTime(
    working_hours_from: string,
    working_hours_to: string
  ): string {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const workingHoursFrom = parse(working_hours_from, "HH:mm:ss", new Date());
    const workingHoursTo = parse(working_hours_to, "HH:mm:ss", new Date());

    const formattedWorkingHours = `${daysOfWeek[1]} - ${
      daysOfWeek[6]
    } Day: ${format(workingHoursFrom, "hh.mm")} to ${format(
      workingHoursTo,
      "hh.mm"
    )} - ${daysOfWeek[0]} Closed`;

    return formattedWorkingHours;
  }

  static getContent(data?: any) {
    return data ? data : "N/A";
  }

  static getCompressContent(data: string) {
    const result = data;
    if (result && result.length >= 95) {
      return `${result.slice(0, 95)}...`;
    } else {
      return result;
    }
  }
}

export default Utils;
