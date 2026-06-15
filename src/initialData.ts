import { Project, DevLog, UserProfile } from './types';

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Neon Obby Adventure',
    category: 'game',
    description: 'เกมแนวอุปสรรคหลบหลีก (Obby) ในธีมนีออนสุดมินิมอล มีระบบจับเวลาและบันทึกคะแนนส่วนตัว (Leaderboard) ออกแบบโครงสร้างเพื่อรองรับผู้เล่นสูงสุด 20 คนในเซิร์ฟเวอร์เดียว',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60',
    url: 'https://www.roblox.com/games/example',
    codeSnippet: `-- LocalScript in StarterPlayerScripts for Neon Trail effect
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local LocalPlayer = Players.LocalPlayer

local function createTrail(character)
    local humanoidRootPart = character:WaitForChild("HumanoidRootPart")
    local attachment0 = Instance.new("Attachment")
    attachment0.Position = Vector3.new(0, 1, 0)
    attachment0.Parent = humanoidRootPart
    
    local attachment1 = Instance.new("Attachment")
    attachment1.Position = Vector3.new(0, -1, 0)
    attachment1.Parent = humanoidRootPart
    
    local trail = Instance.new("Trail")
    trail.Attachment0 = attachment0
    trail.Attachment1 = attachment1
    trail.Color = ColorSequence.new({
        ColorSequenceKeypoint.new(0, Color3.fromRGB(0, 255, 235)),
        ColorSequenceKeypoint.new(1, Color3.fromRGB(255, 0, 128))
    })
    trail.LightEmission = 1
    trail.WidthScale = NumberSequence.new(1, 0)
    trail.Lifetime = 0.5
    trail.Parent = humanoidRootPart
end

LocalPlayer.CharacterAdded:Connect(createTrail)
if LocalPlayer.Character then
    createTrail(LocalPlayer.Character)
end`,
    status: 'public',
    visits: 1240,
    likesRate: 98,
    createdAt: '2026-01-10',
    lastUpdated: '2026-06-12',
    version: 'v1.4.2',
    tags: ['Obby', 'Neon', 'LocalScript', 'Speedrun']
  },
  {
    id: 'proj-2',
    title: 'Advanced Raycast Gun Engine',
    category: 'script',
    description: 'ระบบยิงปืนแบบ Raycast ที่แม่นยำสูง รองรับการคำนวณทิศทางการยิง กระสุนตกรวมถึงรองรับเสียงเอฟเฟกต์ ฝั่งเซิร์ฟเวอร์ตรวจสอบความถูกต้องอย่างรัดกุม',
    coverImage: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500&auto=format&fit=crop&q=60',
    codeSnippet: `-- ModuleScript inside ReplicatedStorage: RaycastService
local RaycastService = {}

function RaycastService.castBullet(origin, direction, range, ignoreList)
	local raycastParams = RaycastParams.new()
	raycastParams.FilterDescendantsInstances = ignoreList
	raycastParams.FilterType = Enum.RaycastFilterType.Exclude
	
	local raycastResult = workspace:Raycast(origin, direction * range, raycastParams)
	
	if raycastResult then
		local hitPart = raycastResult.Instance
		local hitPosition = raycastResult.Position
		local hitNormal = raycastResult.Normal
		
		-- Return detail
		return {
			Hit = hitPart,
			Position = hitPosition,
			Normal = hitNormal,
			Material = raycastResult.Material
		}
	end
	
	return {
		Hit = nil,
		Position = origin + (direction * range),
		Normal = Vector3.new(0, 1, 0)
	}
end

return RaycastService`,
    status: 'private',
    visits: 0,
    likesRate: 100,
    createdAt: '2026-03-22',
    lastUpdated: '2026-05-30',
    version: 'v2.1.0',
    tags: ['Weapon', 'Raycast', 'Backend', 'Optimization']
  },
  {
    id: 'proj-3',
    title: 'Minimalist Sci-fi UI Kit',
    category: 'gui',
    description: 'ชุดหน้าจอแสดงผลแนวไซไฟที่เรียบหรู ออกแบบให้ใช้งานร่วมกับระบบสเกลเลย์เอาต์อัตโนมัติของ Roblox รองรับธีมมืดและสว่าง สีสันสะดุดตา',
    coverImage: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=500&auto=format&fit=crop&q=60',
    status: 'draft',
    visits: 430,
    likesRate: 95,
    createdAt: '2026-05-15',
    lastUpdated: '2026-06-01',
    version: 'v0.9.1',
    tags: ['UI', 'Sci-fi', 'Modern', 'FigmaImport']
  },
  {
    id: 'proj-4',
    title: 'Low-Poly Autumn Pack',
    category: 'model',
    description: 'ชุดโมเดลแนวใบไม้ร่วง มีระดับความละเอียดต่ำ (Low-Poly) เหมาะสำหรับจัดวางสวนสาธารณะ หรือแมปแนวโคซี มีทั้งหมด 12 ชิ้นงาน พร้อมไฟล์คัดลอกลง Roblox Studio ได้ทันที',
    coverImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&auto=format&fit=crop&q=60',
    url: 'https://www.roblox.com/library/example',
    status: 'public',
    visits: 780,
    likesRate: 97,
    createdAt: '2026-02-18',
    lastUpdated: '2026-02-18',
    version: 'v1.0.0',
    tags: ['3D Model', 'Low-Poly', 'Nature', 'Environment']
  },
  {
    id: 'proj-5',
    title: 'Neon Vaporwave GFX Banner',
    category: 'gfx',
    description: 'งานภาพกราฟิกสไตล์ Vaporwave สำหรับใช้เป็นแบนเนอร์ครอบคลุมหัวข้อเกม ทำความสะอาดพื้นผิว เรนเดอร์ด้วย Blender Cycles 4.0 ความคมชัดระนาบ 4K',
    coverImage: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&auto=format&fit=crop&q=60',
    status: 'public',
    visits: 350,
    likesRate: 100,
    createdAt: '2026-04-05',
    lastUpdated: '2026-04-05',
    version: 'v1.0.0',
    tags: ['GFX', 'Render', 'Blender', 'Photoshop']
  }
];

export const initialLogs: DevLog[] = [
  {
    id: 'log-1',
    date: '2026-06-12',
    title: 'อัปเดตระบบ Neon Obby Adventure v1.4.2',
    description: 'เพิ่มเอฟเฟกต์ Trail ความละเอียดสูงให้ผู้เล่นเมื่อกระโดด คลี่คลายบั๊กการนับรอบเวลาสำหรับด่านที่ 7',
    type: 'update',
    projectId: 'proj-1'
  },
  {
    id: 'log-2',
    date: '2026-05-30',
    title: 'คัดคลี่บั๊ก Raycast Service รั่วไหล',
    description: 'แก้ไขปัญหา Memory Leak เมื่อสร้าง Raycast จำนวนมหาศาลภายในวินาทีเดียว ยืดอายุการใช้งานเซิร์ฟเวอร์',
    type: 'bugfix',
    projectId: 'proj-2'
  },
  {
    id: 'log-3',
    date: '2026-05-15',
    title: 'เริ่มสร้างชุดหน้าจอไซไฟ (UI Kit)',
    description: 'ร่างโมเดลเลย์เอาต์ ปูระบบขนาดและการปรับตามสัดส่วน (Aspect Ratio Constraint) ให้พร้อมใช้งานทุกอุปกรณ์',
    type: 'release',
    projectId: 'proj-3'
  },
  {
    id: 'log-4',
    date: '2026-04-20',
    title: 'บันทึกความเชี่ยวชาญครบรอบ 5 ผลงาน',
    description: 'เสร็จสิ้นการเขียนแบบจำลองและจัดเก็บผลงานรวม 5 ชนิดในระบบคลังชิ้นงาน',
    type: 'milestone'
  }
];

export const defaultUser: UserProfile = {
  username: 'RobloxCreator_Pro',
  displayName: 'BloxDeveloper 🛠️',
  bio: 'สวัสดีครับ ยินดีต้อนรับสู่ Archive ส่วนตัวของผม! แหล่งรวบรวมชิ้นงาน สคริปต์ โมเดล และไอเดียเกม Roblox มินิมอลที่ผมสร้างขึ้น สะสมไว้เพื่อหยิบไปใช้ต่ออย่างสะดวกสบาย ยินดีแลกเปลี่ยนโมดูลดีๆ เสมอครับ.',
  statusText: '🔨 กำลังเขียนสคริปต์สุนัขขับรถปิ๊กอัพ',
  robux: 84000,
  devPoints: 12500,
  avatar: {
    headColor: '#ECC94B', // classic Roblox yellow
    torsoColor: '#3182CE', // blue shirt
    leftArmColor: '#ECC94B',
    rightArmColor: '#ECC94B',
    leftLegColor: '#4A5568', // grey pants
    rightLegColor: '#4A5568',
    faceExpression: 'cool',
    hatType: 'fedora',
    accessory: 'glasses'
  }
};
