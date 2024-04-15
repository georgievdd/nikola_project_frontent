import { Picture } from "@/entity/House";

export function needToShowBackground({width, height}: Picture) {
    if (width > height) {
        return width / height >= 1.4
    } else {
        return height / width >= 1.33
    }
}