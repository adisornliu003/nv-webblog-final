module.exports = ( sequelize, DataTypes ) => {
    const Recom = sequelize.define('Recom', {
        title: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.STRING,
        content: DataTypes.TEXT,
        category: DataTypes.STRING,
        status: DataTypes.STRING,
    })
    return Recom
}