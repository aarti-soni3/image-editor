const Caman = window.Caman;

Caman.Filter.register("sharpen", function (amount) {
    amount = amount / 100;
    return this.processKernel("Sharpen", [
        0, -amount, 0,
        -amount, 4 * amount + 1, -amount,
        0, -amount, 0
    ]);
});