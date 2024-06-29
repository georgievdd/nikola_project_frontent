import { HTMLAttributes, SVGProps } from "react";

export default function IconCircle(props: SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="18" height="18" rx="9" fill="#BCA37F"/>
        </svg>
    )
}