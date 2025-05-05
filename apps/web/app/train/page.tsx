"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import UploadModal from "@/components/ui/upload"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"

export function Train() {
    const { getToken } = useAuth();
    const [zipUrl, setZipUrl] = useState("");
    const [type, setType] = useState("Man")
    const [age, setAge] = useState<string>("")
    const [ethinicity, setEthinicity] = useState<string>("")
    const [eyeColor, setEyeColor] = useState<string>("")
    const [bald, setBald] = useState(false)
    const [name, setName] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    async function trainModal() {
        if (!name || !zipUrl || !type || !age || !ethinicity || !eyeColor) {
          alert("Please fill in all required fields.");
          return;
        }
      
        const input = {
            zipUrl: zipUrl,
            type: type,              
            age: Number(age),        
            ethinicity: ethinicity,  
            eyeColor: eyeColor,      
            bald: Boolean(bald),     
            name: name
          };
      
        console.log("Sending data:", input); // Add this to debug
      
        try {
          setIsLoading(true);
          const token = await getToken();
          if (!token) {
            alert("Authorization token is missing.");
            return;
          }
      
          const response = await axios.post(`${BACKEND_URL}/ai/training`, input, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          });
          
          console.log("Response:", response.data);
          router.push("/");
        } catch (error) {
            const err = error as any;
          console.error("Error creating model:", (error as any).response?.data || error);
          alert(err.response?.data?.message || "Failed to create model. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }

   return (
    <div className="flex flex-col items-center justify-center pt-4">
        <Card className="w-[650px]">
          <CardHeader>
            <CardTitle>Create Model</CardTitle>
            <CardDescription>Deploy your new AI model in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="grid w-full items-center gap-4">
                <div className="flex gap-4">
                <div className="flex flex-col space-y-1.5 flex-1">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    id="name" 
                    placeholder="Name of the model" 
                  />
                </div>
                <div className="flex flex-col space-y-1.5 flex-1">
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age" 
                    value={age}
                    type="number"
                    placeholder="Age of the model" 
                    onChange={(e) => setAge(e.target.value)} 
                  />
                </div>
                </div>
                <div className="flex gap-4 ">
                <div className="flex flex-col space-y-1.5 flex-1">
                  <Label htmlFor="Type">Type</Label>
                  <Select 
                    value={type}
                    onValueChange={(value) => setType(value)}
                  >
                    <SelectTrigger id="name">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="Man">Man</SelectItem>
                      <SelectItem value="Woman">Woman</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5 flex-1">
                  <Label htmlFor="ethinicity">Ethnicity</Label>
                  <Select
                    value={ethinicity}
                    onValueChange={(value) => setEthinicity(value)}
                  >
                    <SelectTrigger id="ethinicity">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="White">White</SelectItem>
                      <SelectItem value="Black">Black</SelectItem>
                      <SelectItem value="Asian_American">Asian American</SelectItem>
                      <SelectItem value="East_Asian">East Asian</SelectItem>
                      <SelectItem value="South_East_Asian">South East Asian</SelectItem>
                      <SelectItem value="South_Asian">South Asian</SelectItem>
                      <SelectItem value="Middle_Eastern">Middle Eastern</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                </div>
                <div className="flex flex-col space-y-1.5 ">
                  <Label htmlFor="eye">Eye Color</Label>
                  <Select
                    value={eyeColor}
                    onValueChange={(value) => setEyeColor(value)}
                  >
                    <SelectTrigger id="eye">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="Brown">Brown</SelectItem>
                      <SelectItem value="Blue">Blue</SelectItem>
                      <SelectItem value="Hazel">Hazel</SelectItem>
                      <SelectItem value="Gray">Gray</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="bald">Bald</Label>
                  <Switch 
                    checked={bald}
                    onCheckedChange={(checked) => setBald(checked)} 
                  />
               </div>
                </div>
                <UploadModal onUploadDone={(url) => {
                  console.log("Received ZIP URL:", url);
                  setZipUrl(url);
                }}/>
              </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/")}>
              Cancel
            </Button>
            <Button 
              disabled={!name || !zipUrl || !type || !age || !ethinicity || !eyeColor || isLoading}
              onClick={trainModal}
            >
              {isLoading ? "Creating..." : "Create Model"}
            </Button>
          </CardFooter>
        </Card>
    </div>
   )
}