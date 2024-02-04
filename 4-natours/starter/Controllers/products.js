const getProducts = async (req, res) => {
    res.status(200).json({
        message : "This  page is coming from router FOLDER."
    })
}

const getProductsTesting = async (req,res)=>{
    res.status(200).json({
        message : "This  page is coming from router FOLDER for testing purpose only."
    })
}

module.exports = {getProducts, getProductsTesting}