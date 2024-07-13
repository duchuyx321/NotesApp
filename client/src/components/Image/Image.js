import { useState, forwardRef } from "react";
import classNames from "classnames";
import styles from "./Image.module.scss";

const noImage =
    "https://res.cloudinary.com/dglgdtov0/image/upload/v1720861794/no-image_tycepk.png";
const Image = forwardRef(
    (
        { src, alt, className, fallback: customFallback = noImage, ...props },
        ref
    ) => {
        const [fallback, setFallback] = useState("");

        const handleError = () => {
            setFallback(customFallback);
        };

        return (
            <img
                className={classNames(styles.wrapper, className)}
                ref={ref}
                src={fallback || src ? src : noImage}
                alt={alt}
                {...props}
                onError={handleError}
            />
        );
    }
);

export default Image;
