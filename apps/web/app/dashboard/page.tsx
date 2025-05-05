import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {Train} from "@/app/train/page"
import { GenerateImage } from "@/components/GenerateImage"
import { Packs } from "@/components/Packs"
import { Camera } from "@/components/Camera"
export default function Dashboard(){
   return (<div className="flex justify-center mb-4">
        <div className="w-8xl">
            <div className="flex justify-center">
            <Tabs defaultValue="camera" className="w-[600px]">
                <div  className="flex justify-center">
                    <TabsList>
                    <TabsTrigger value="camera">Camera</TabsTrigger>
                    <TabsTrigger value="generate">Generate Image</TabsTrigger>
                    <TabsTrigger value="train">Train a modal</TabsTrigger>
                    <TabsTrigger value="packs">Packs</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="generate"><GenerateImage /></TabsContent>
                <TabsContent value="train"><Train /></TabsContent>
                <TabsContent value="packs"><Packs /></TabsContent>
                <TabsContent value="camera"><Camera /></TabsContent>
            </Tabs>
            </div>
        </div>

    </div>)
}