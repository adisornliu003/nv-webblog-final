const { Recom } = require('../models')
module.exports = {
    // get all blog
    async index(req, res) {
        try {
            const recom = await Recom.findAll()
            res.send(recom)
        } catch (err) {
            res.status(500).send({
                error: 'The recoms information was incorrect'
            })
        }
    },
    // create blog
    async create(req, res) {
        console.log(JSON.stringify(req.body))
        try {
            const recom = await Recom.create(req.body)
            res.send(recom.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create recom incorrect'
            })
        }
    },
    // edit blog, suspend, active
    async put(req, res) {
        try {
            await Recom.update(req.body, {
                where: {
                    id: req.params.recomId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update recom incorrect'
            })
        }
    },
    
// delete blog
async remove(req, res) {
        try {
            const recom = await Recom.findOne({
                where: {
                    id: req.params.recomId
                }
            })
            if (!recom) {
                return res.status(403).send({
                    error: 'The recom information was incorrect'
                })
            }
            await recom.destroy()
            res.send(recom)
        } catch (err) {
            res.status(500).send({
                error: 'The recom information was incorrect'
            })
        }
    },
    // get blog by id
    async show(req, res) {
        try {
            const recom = await Recom.findByPk(req.params.blogId)
            res.send(recom)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'The recom information was incorrect'
            })
        }
    }
}
