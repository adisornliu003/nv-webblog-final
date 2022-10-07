module.exports = ( sequelize, DataTypes ) => {
    const Product = sequelize.define('Product', {
        name: DataTypes.STRING,
        time: DataTypes.STRING,
        type: DataTypes.STRING,
        menu: DataTypes.STRING,
        picture: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        status: DataTypes.STRING,
    })
    return Product
}