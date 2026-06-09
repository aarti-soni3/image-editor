import { FilterContext } from "@/context/createContext";
import { useContext, useEffect } from "react"
const Caman = window.Caman;

export const useCamanFilter = (canvasRef, isCanvasReady) => {

    // const timerRef = useRef(null);

    const {
        brightness,
        saturation,
        exposure,
        contrast,
        vibrance,
        /*sharpen,*/
        sepia,
        hue,
        // resetFilter,
        // reapplyFilter,
    } = useContext(FilterContext);

    console.log('isCanvasReady : ', isCanvasReady)

    useEffect(() => {

        // clearTimeout(timerRef);
        const canvas = canvasRef.current;
        const caman = window?.Caman || Caman;

        // timerRef.current = setTimeout(() => {
        console.log('Running...')
        if (
            !caman ||
            !canvas ||
            !canvasRef.current ||
            !isCanvasReady ||
            canvas.nodeName?.toUpperCase() !== "CANVAS"
        )
            return;

        caman(canvas, function () {
            this.revert(false);
            this.brightness(brightness);
            this.saturation(saturation);
            this.exposure(exposure);
            this.contrast(contrast);
            this.vibrance(vibrance);
            this.sepia(sepia);
            // this.sharpen(sharpen);
            this.hue(hue);
            this.render();
        });

        // },300)
        // return () => clearTimeout(timerRef)
    }, [canvasRef, brightness, saturation, exposure, contrast, vibrance, sepia, hue, isCanvasReady])
}