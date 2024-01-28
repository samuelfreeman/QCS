exports.time = async (req, res, next) => {
    const date = new Date();
    const formattedDate = date.toLocaleString();
    res.json({ currentDateTime: formattedDate });

    return next();
};
