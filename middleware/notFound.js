module.exports = (req, res, next) => {
    return res.status(401).json({code: 401, message: "ULR no encontrada" });
}