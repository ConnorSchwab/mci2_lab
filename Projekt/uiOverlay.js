

function createUIOverlay(ctx, cnv) {
    let score = 0;
    let life = 3;

    function setScore(newPoints) {
        score += newPoints;
    }

    function resetScore() {
        score = 0;
    }

    function setLife() {
        life -= 1;
    }

    function draw() {
        let margin = cnv.width * 0.01;

        ctx.save();

        ctx.resetTransform();
        ctx.strokeStyle = "#ffbb00";
        ctx.fillStyle = "#ffbb00";
        ctx.lineWidth = margin * 0.2;

        ctx.strokeRect(margin - ctx.lineWidth, margin - ctx.lineWidth, cnv.width - margin * 2 - ctx.lineWidth * 2, cnv.height - margin * 2 - ctx.lineWidth * 2);
        ctx.font = cnv.width / 100 + "px Roboto"
        ctx.fillText(`${score} Pts`, margin * 2 + ctx.lineWidth, margin * 2 + ctx.lineWidth);
        ctx.fillText(`${life} Life`, cnv.width - margin * 2 - 50 - ctx.lineWidth * 2, cnv.height - margin * 2 - ctx.lineWidth * 2);

        ctx.restore();
    }

    return {
        draw, setScore, resetScore, setLife
    }
}

export default createUIOverlay;