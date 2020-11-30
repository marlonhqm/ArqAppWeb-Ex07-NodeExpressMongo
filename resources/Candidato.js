const express = require('express')
const Candidato = require('../models/Candidato') 


const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const cadidatos = await Candidato.find()

    return res.send(cadidatos)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
  
})

router.get('/:id', getCandidato, async (req, res) => {
  
  res.json(res.candidato)
})

router.post('/', async (req, res) => {
  
  const candidato = new Candidato({
    nome: req.body.nome,
    partido: req.body.partido,
    numero: req.body.numero,
    votos: req.body.votos,
    status: req.body.status
  })

  try {
    const created = await candidato.save()

    res.status(201).json(created)
  } catch (error) {
    res.status(400).json({message: error.message})
  }

})

router.patch('/:id', getCandidato, async (req, res) => {
  if (req.body.nome != null) {
    res.candidato.nome = req.body.nome
  }
  if (req.body.partido != null) {
    res.candidato.partido = req.body.partido
  }
  if (req.body.numero != null) {
    res.candidato.numero = req.body.numero
  }
  if (req.body.votos != null) {
    res.candidato.votos = req.body.votos
  }
  if (req.body.status != null) {
    res.candidato.status = req.body.status
  }

  try {
    const update = await res.candidato.save()

    res.json(update)
  } catch (error) {
    res.status(400).json({message: err.message})
  }

})

router.delete('/:id', getCandidato, async (req, res) => {

  try {
    await res.candidato.remove()

    res.json({message: 'Candidato deletado com sucesso'})
  } catch (error) {
    res.status(500).json({message: err.message})
  }
})

// middleware
async function getCandidato(req, res, next) {
  let candidato
  try {
    candidato = await Candidato.findById(req.params.id)

    if (candidato == null) {
      return res.status(404).json({message: 'Candidato não encontrado'})
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }

  res.candidato = candidato

  next()
}

module.exports = router

