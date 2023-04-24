

function createUIOverlay(ctx, cnv) {
    let score = 0;
    let life = 3;
    let level = 1;

    function setScore(points) {
        score = points;
    }

    function resetScore() {
        score = 0;
    }

    function resetLife() {
        life = 3;
        return life;
    }

    function setLife() {
        if (life > 0) {
            life -= 1;
        }
    }

    function getLife() {
        return life;
    }

    function setLevel(levels) {
        level = levels;
    }

    function resetLevel() {
        level = 1;
    }

    function draw() {
        let margin = cnv.width * 0.01;

        ctx.save();

        ctx.resetTransform();
        ctx.strokeStyle = "#ffbb00";
        ctx.fillStyle = "#ffbb00";
        ctx.lineWidth = margin * 0.2;

        ctx.strokeRect(margin - ctx.lineWidth, margin - ctx.lineWidth, cnv.width - margin * 2 - ctx.lineWidth * 2, cnv.height - margin * 2 - ctx.lineWidth * 2);
        ctx.font = cnv.width / 75 + "px Roboto"
        ctx.fillText(`${score} Pts`, margin * 2 + ctx.lineWidth, margin * 2 + ctx.lineWidth);
        ctx.fillText(`Level ${level}`, cnv.width - margin * 3 - 50 - ctx.lineWidth, margin * 2 + ctx.lineWidth);
        ctx.fillText(`${life} Life`, cnv.width - margin * 2 - 50 - ctx.lineWidth * 2, cnv.height - margin * 2 - ctx.lineWidth * 2);

        ctx.restore();
    }

    return {
        draw, setScore, resetScore, setLife, resetLife, setLevel, resetLevel, getLife
    }
}

export default createUIOverlay;