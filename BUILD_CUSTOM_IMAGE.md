# คู่มือสร้าง Custom Morphic Image

## 📋 ขั้นตอนการสร้าง Custom Image

### 1. Fork และ Clone Repository

```bash
# 1. ไปที่ https://github.com/miurla/morphic แล้วกด Fork

# 2. Clone repo ของคุณ
git clone https://github.com/YOUR_USERNAME/morphic.git morphic-custom
cd morphic-custom
```

### 2. แก้ไขไฟล์ที่ต้องการ

#### 2.1 ลบ Models ที่ไม่ต้องการ

**ไฟล์: `public/config/models.json`**
```json
{
  "models": [
    {
      "id": "local-model",
      "name": "Local AI Model",
      "provider": "OpenAI Compatible",
      "providerId": "openai-compatible",
      "enabled": true,
      "toolCallType": "native"
    }
  ]
}
```

**ไฟล์: `lib/config/default-models.json`**
```json
{
  "models": [
    {
      "id": "local-model",
      "name": "Local AI Model",
      "provider": "OpenAI Compatible",
      "providerId": "openai-compatible",
      "enabled": true,
      "toolCallType": "native"
    }
  ]
}
```

#### 2.2 แก้ไข Hardcoded Models

**ไฟล์: `app/api/chat/route.ts`** (บรรทัดที่ 10-17)
```typescript
const DEFAULT_MODEL: Model = {
  id: 'local-model',
  name: 'Local AI Model',
  provider: 'OpenAI Compatible',
  providerId: 'openai-compatible',
  enabled: true,
  toolCallType: 'native'
}
```

**ไฟล์: `lib/utils/registry.ts`**
- แก้บรรทัด 139: `return getModel('openai-compatible:local-model')`
- แก้บรรทัด 141: `return getModel('openai-compatible:local-model')`

**ไฟล์: `lib/tools/search.ts`** (บรรทัด 98)
- เปลี่ยน `openai:gpt-4o-mini` เป็น `openai-compatible:local-model`

**ไฟล์: `lib/tools/video-search.ts`** (บรรทัด 36)
- เปลี่ยน `openai:gpt-4o-mini` เป็น `openai-compatible:local-model`

**ไฟล์: `lib/tools/question.ts`** (บรรทัด 17)
- เปลี่ยน `openai:gpt-4o-mini` เป็น `openai-compatible:local-model`

#### 2.3 เพิ่ม Interactive Logo (ตาขยับตามเมาส์)

**ไฟล์: `components/ui/icons.tsx`**
```typescript
'use client'

import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

function IconLogo({ className, ...props }: React.ComponentProps<'svg'>) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [leftPupilPos, setLeftPupilPos] = useState({ x: 102, y: 128 })
  const [rightPupilPos, setRightPupilPos] = useState({ x: 154, y: 128 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return

      const rect = svgRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate mouse position relative to SVG center
      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      // Scale factor for pupil movement
      const scale = 0.08

      // Calculate pupil positions (constrained within eye bounds)
      const maxOffset = 6 // Maximum offset from center

      // Left eye (centered at 102, 128)
      const leftOffsetX = Math.max(-maxOffset, Math.min(maxOffset, mouseX * scale))
      const leftOffsetY = Math.max(-maxOffset, Math.min(maxOffset, mouseY * scale))
      
      // Right eye (centered at 154, 128)
      const rightOffsetX = Math.max(-maxOffset, Math.min(maxOffset, mouseX * scale))
      const rightOffsetY = Math.max(-maxOffset, Math.min(maxOffset, mouseY * scale))

      setLeftPupilPos({ x: 102 + leftOffsetX, y: 128 + leftOffsetY })
      setRightPupilPos({ x: 154 + rightOffsetX, y: 128 + rightOffsetY })
    }

    // Add event listener
    window.addEventListener('mousemove', handleMouseMove)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      fill="currentColor"
      viewBox="0 0 256 256"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <circle cx="128" cy="128" r="128" fill="black"></circle>
      {/* Left eye white */}
      <circle cx="102" cy="128" r="18" fill="white"></circle>
      {/* Right eye white */}
      <circle cx="154" cy="128" r="18" fill="white"></circle>
      {/* Left pupil */}
      <circle 
        cx={leftPupilPos.x} 
        cy={leftPupilPos.y} 
        r="8" 
        fill="black"
        style={{ transition: 'all 0.1s ease-out' }}
      />
      {/* Right pupil */}
      <circle 
        cx={rightPupilPos.x} 
        cy={rightPupilPos.y} 
        r="8" 
        fill="black"
        style={{ transition: 'all 0.1s ease-out' }}
      />
    </svg>
  )
}

export { IconLogo }
```

### 3. ตั้งค่า GitHub Container Registry

```bash
# 1. สร้าง Personal Access Token
# ไปที่ GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
# สร้าง token ใหม่ with permissions: write:packages, read:packages, delete:packages

# 2. Login to GitHub Container Registry
export CR_PAT=YOUR_TOKEN_HERE
echo $CR_PAT | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
```

### 4. Build และ Push Image

#### 4.1 แก้ไข Dockerfile (ถ้าจำเป็น)
ตรวจสอบว่า Dockerfile ไม่มีปัญหา

#### 4.2 Build Image
```bash
# Build image
docker build -t ghcr.io/YOUR_GITHUB_USERNAME/morphic-custom:latest .

# หรือถ้าต้องการ build แบบไม่มี cache
docker build --no-cache -t ghcr.io/YOUR_GITHUB_USERNAME/morphic-custom:latest .
```

#### 4.3 Push to Registry
```bash
docker push ghcr.io/YOUR_GITHUB_USERNAME/morphic-custom:latest
```

### 5. ตั้งค่า docker-compose.yaml

**ไฟล์: `docker-compose.yaml`**
```yaml
# Docker Compose configuration for the morphic-stack development environment

name: morphic-stack
services:
  morphic:
    image: ghcr.io/YOUR_GITHUB_USERNAME/morphic-custom:latest
    command: bun start -H 0.0.0.0
    env_file: .env.local
    ports:
      - '3030:3000'
    depends_on:
      - redis
      - searxng

  redis:
    image: redis:alpine
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes

  searxng:
    image: searxng/searxng
    ports:
      - '${SEARXNG_PORT:-8080}:8080'
    env_file: .env.local
    volumes:
      - ./searxng-limiter.toml:/etc/searxng/limiter.toml
      - ./searxng-settings.yml:/etc/searxng/settings.yml
      - searxng_data:/data

volumes:
  redis_data:
  searxng_data:
```

### 6. ตั้งค่า .env.local

**ไฟล์: `.env.local`**
```env
# Using OpenAI Compatible endpoint at localhost:5001
OPENAI_COMPATIBLE_API_KEY=c7632a7c-2661-492e-bd6f-aab994818998
OPENAI_COMPATIBLE_API_BASE_URL=http://koboldcpp:5001/v1

# Using container name 'koboldcpp' for Docker-to-Docker communication

# Search Configuration
TAVILY_API_KEY=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

# Optional Docker Configuration
BASE_URL=http://localhost:3030
```

### 7. รัน Custom Image

```bash
# 1. Pull image ใหม่ (ถ้า push แล้ว)
docker compose pull

# 2. Start all services
docker compose up -d && docker compose -f docker-compose.kobold.yaml up -d
```

## 🔧 การ Update Image

เมื่อแก้ไขโค้ดเพิ่มเติม:

```bash
# 1. Commit และ push changes to GitHub
git add .
git commit -m "Update feature X"
git push

# 2. Build new image
docker build -t ghcr.io/YOUR_GITHUB_USERNAME/morphic-custom:latest .

# 3. Push new version
docker push ghcr.io/YOUR_GITHUB_USERNAME/morphic-custom:latest

# 4. Update local deployment
docker compose pull
docker compose up -d
```

## 📝 Tips

1. **Tag versions**: ใช้ tag เพื่อเก็บ version
   ```bash
   docker tag ghcr.io/YOUR_GITHUB_USERNAME/morphic-custom:latest \
              ghcr.io/YOUR_GITHUB_USERNAME/morphic-custom:v1.0.0
   docker push ghcr.io/YOUR_GITHUB_USERNAME/morphic-custom:v1.0.0
   ```

2. **Multi-stage build**: Dockerfile ของ Morphic ใช้ multi-stage build อยู่แล้ว ทำให้ image เล็กลง

3. **GitHub Actions**: สามารถตั้ง CI/CD ให้ build อัตโนมัติเมื่อ push code

## ❗ หมายเหตุ

- ต้องแทนที่ `YOUR_GITHUB_USERNAME` ด้วย username จริงของคุณ
- ต้องแทนที่ `YOUR_TOKEN_HERE` ด้วย Personal Access Token ของคุณ
- Image แรกอาจใช้เวลา build นาน (10-15 นาที) เพราะต้อง compile TypeScript
- หลังจากนั้นจะเร็วขึ้นเพราะมี cache


## ตัวอย่างการตั้งค่า

- GitHub Repository: https://github.com/Peterfish/morphic.git
- YOUR_GITHUB_USERNAME: ใช้ username GitHub ของคุณ
- YOUR_TOKEN_HERE: สร้าง Personal Access Token จาก GitHub Settings

