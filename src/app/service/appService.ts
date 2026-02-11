type fomat = "time00:44" | "dateAndTime";
class appService {
  normalizeDate(date: Date | string, format: fomat) {
    const _date = new Date(date);
    switch (format) {
      case "time00:44":
        return _date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
      case "dateAndTime":
        return _date.toLocaleDateString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    }
  }
}

export default new appService();
