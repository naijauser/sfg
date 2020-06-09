const express = require('express')
const blogPostHTML = require('../htmltemplates/blogpost')
const router = express.Router()
const _ = require('lodash')
const fileModel = require('../models/files.model')

// Route to add a page
router.post('/add_page', async (req, res) => {

  if (_.isEmpty(req.files)) {
    return res.status(400).send(
      {
        success: "false",
        message: 'Please attach a file.'
      })
  }
  
  try {
    let filename = req.files.page.name

    filename = filename.slice(0, -3)
  
    const pageName = await fileModel.find({fileName: filename})
    
    if (!_.isEmpty(pageName)) {
      return res.status(401).send({
        success: "false",
        message: "Filename already exists!"
      })
    }

    console.log('Got here')

    const content = req.files.page.data.toString()

    const file = new fileModel({
      fileName: filename,
      fileContent: content
    })

    await file.save()

    res.status(201).send({
      success: "true",
      message: "File added"
    })

  } catch (err) {
    return res.status(500).send({
      success: "false",
      message: err
    })
  }
})

// Route to retrieve page HTML
router.get('/retrieve_page_html/:page_name', async (req, res) => {

  if (!req.params) {
    return res.status(400).send({
      success: "false",
      message: "You have not specified a filename!"
    })
  }
  
  const { page_name } = req.params
  
  try {
    const page = await fileModel.find({fileName: page_name})

    if (_.isEmpty(page)) {
      return res.status(400).send({
        success: "false",
        message: "Page not found!"
      })
    }

    res.status(200).send({
      success: "true",
      data: blogPostHTML(page[0].fileContent) 
    })
  } catch (err) {
    return res.status(500).send({
      success: "false",
      message: err
    })
  }
})

// Set Markdown of existing page
router.put('/set_page_markdown', async (req, res) => {

  if (_.isEmpty(req.files)) {
    return res.status(400).send(
      {
        success: "false",
        message: 'Please attach a file.'
      })
  }

  try {
    let filename = req.files.page.name
    
    filename = filename.slice(0, -3)

    let page = await fileModel.find({fileName: filename})

    if (_.isEmpty(page)) {
      return res.status(400).send({
        success: "false",
        message: "Page does not exist!"
      })
    }

    const content = req.files.page.data.toString()

    const query = { fileName: filename}
    page = await fileModel.findOneAndUpdate(
      query, { $set: { fileContent: content }}, {useFindAndModify: false}
    )

    res.status(200).send({
      success: "true",
      message: "File updated!"
    })
  } catch (err) {
    return res.status(500).send({
      success: "false",
      message: err
    })
  }
  // const { filename, filecontent} = req.body
  // res.status(201).send(`${filename} ${filecontent}`)
  // // res.status(201).send('Page markdown updated successfully')
})

// Get Pages List
router.get('/list_pages', async (req, res) => {

  try {
    const pages = await fileModel.find()

    if (_.isEmpty(pages)) {
      return res.status(200).send({
        success: "true",
        data: {}
      })
    }

    const pageList = pages.map((result) =>  result.fileName)

    res.status(200).send({
      success: "true",
      data: pageList
    })
  } catch (err) {
    return res.status(500).send({
      success: "false",
      message: err
    })
  }
  // res.status(200).send('This is your list')
})

module.exports = router









// // Set Markdown of existing page
// router.put('/set_page_markdown/:page_name', async (req, res) => {
//   if (_.isEmpty(req.body)) {
//     return res.status(400).send({
//       success: "false",
//       message: 'Request body is missing'
//     })
//   }

//   try {
//     const { page_name } = req.params

//     const page = await fileModel.find({fileName: page_name})

//     if (_.isEmpty(page)) {
//       return res.status(400).send({
//         success: "false",
//         message: "Page not found!"
//       })
//     }

//     const query = { fileName: page_name}
//     const page = await fileModel.findOneAndUpdate(
//       query, { $set: { fileContent:  }}
//     )

//     res.status(200).send({
//       success: "true",
//       message: "Page found!"
//     })

//   } catch (error) {
    
//   }
  
//   const { filename, filecontent} = req.body
//   res.status(201).send(`${filename} ${filecontent}`)
//   // res.status(201).send('Page markdown updated successfully')
// })