import express from "express"
import {
    TrainModel,
    GenerateImage,
    GenerateImagesFromPack,
  } from "common/types";
import { prismaClient } from "db";

const PORT = process.env.PORT || 8080;

const app = express();

const USERID = "123"

app.post("/ai/training", async (req, res) => {
  const parsedBody = TrainModel.safeParse(req.body)

  if(!parsedBody.success){
    res.status(411).json({
      message: "Input incorrect"
    })
    return
  }

  const data = await prismaClient.model.create({
    data: {
      name : parsedBody.data.name,
      type : parsedBody.data.type,
      age  : parsedBody.data.age,
      ethinicity: parsedBody.data.ethinicity,
      eyeColor : parsedBody.data.eyeColor,
      bald : parsedBody.data.bald,
      userId : USERID
    }
  })

  res.json({
    modelId : data.id
  })
})

app.post("/ai/generate", async (req, res) => {
    const parsedBody = GenerateImage.safeParse(req.body)

    if (!parsedBody.success){
      res.status(411).json({
        message : "Input Incorrect"
      })
      return;
    }

    const data = await prismaClient.outputImages.create({
      data : {
        prompt: parsedBody.data.prompt,
        userId : USERID,
        modelId : parsedBody.data.modelId,
        imageUrl: ""
      }
    })
    res.json({
      imageId : data.id
    })
})

app.post("/pack/generate", async(req, res) => {
    const parsedBody = GenerateImagesFromPack.safeParse(req.body)

    if(!parsedBody.success){
      res.status(411).json({
        message: "Input Incorrect"
      })
      return;
    }

    const prompts = await prismaClient.packPrompts.findMany({
      where: {
        packId : parsedBody.data.packId,
      }
    })

    const images = await prismaClient.outputImages.createManyAndReturn({
      data: prompts.map((prompt) => ({
        prompt : prompt.prompt,
        userID : USERID,
        modelID : parsedBody.data.modelId,
        imageUrl : ""
      }))
    })

    res.json({
      images : images.map((image) => image.id)
    })
})

app.get("/pack/bulk", async(req, res) => {
   const packs = await prismaClient.packs.findMany({})

   res.json({
    packs
   })
})

app.get("/image/bulk", async (req, res) => {
    const ids = req.query.images as string[]
    const limit = req.query.limit as string ?? "10";
    const offset = req.query.offset as string ?? "0" ;

    const imagesData = await prismaClient.outputImages.findMany({
      where: {
        id: {in : ids},
        userId : USERID
      },
      skip : parseInt(offset),
      take : parseInt(limit)
    })

    res.json({
      images: imagesData
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
