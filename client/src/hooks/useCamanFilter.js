import { FilterContext } from "@/context/createContext";
import { useContext, useEffect } from "react"
const Caman = window.Caman;

Caman.Filter.register("sharpen", function (amount) {
    amount = amount / 100;
    return this.processKernel("Sharpen", [
        0, -amount, 0,
        -amount, 4 * amount + 1, -amount,
        0, -amount, 0
    ]);
});

export const useCamanFilter = (canvasRef, isCanvasReady) => {

    const {
        brightness,
        saturation,
        exposure,
        contrast,
        vibrance,
        sharpen,
        sepia,
        hue,
    } = useContext(FilterContext);

    useEffect(() => {

        const canvas = canvasRef.current;
        const caman = window?.Caman || Caman;

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
            this.sharpen(sharpen);
            this.hue(hue);
            this.render();
        });
    }, [canvasRef, brightness, saturation, exposure, contrast, vibrance, sepia, hue, sharpen, isCanvasReady])
}