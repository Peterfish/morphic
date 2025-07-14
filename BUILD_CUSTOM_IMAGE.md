# คู่มือสร้าง Custom Morphic Image

## 📊 สถานะปัจจุบัน (Status: ✅ Development Ready)

### ✅ สิ่งที่ทำเสร็จแล้ว:
1. **Fork และ Clone Repository** - เสร็จแล้ว
2. **แก้ไขไฟล์ Models** - เสร็จแล้ว
   - ✅ `public/config/models.json`
   - ✅ `lib/config/default-models.json`
   - ✅ `app/api/chat/route.ts`
   - ✅ `lib/utils/registry.ts`
   - ✅ `lib/tools/search.ts`
   - ✅ `lib/tools/video-search.ts`
   - ✅ `lib/tools/question.ts`
3. **เพิ่ม Interactive Logo** - เสร็จแล้ว
   - ✅ `components/ui/icons.tsx`
4. **ตั้งค่า Environment** - เสร็จแล้ว
   - ✅ `.env.local` configured
   - ✅ `.env.development` template
5. **Push to GitHub** - เสร็จแล้ว
   - ✅ Repository: https://github.com/Peterfish/morphic
6. **Development Mode** - พร้อมใช้งาน
   - ✅ KoboldCpp running on Docker
   - ✅ Morphic dev server running

### 🚀 สิ่งที่กำลังทำงาน:
- **KoboldCpp**: http://localhost:5001 (Model: C4AI Command A 03 2025 - 111B)
- **Morphic Dev**: http://localhost:3000

### ⏳ ขั้นตอนที่ยังไม่ได้ทำ (Optional for Production):
1. **Build Docker Image** - รอทำเมื่อพร้อม deploy production
2. **Push to GitHub Container Registry** - รอทำหลัง build image
3. **Production Deployment** - รอทำเมื่อพัฒนาเสร็จ

---

## 🔄 Current Workflow (Development Mode)

### การใช้งานปัจจุบัน:
```bash
# 1. KoboldCpp (Running in Docker)
docker compose -f docker-compose.kobold.yaml up -d
# API: http://localhost:5001

# 2. Morphic Development
bun dev  # or ./dev-start.sh
# Web: http://localhost:3000

# 3. Make changes and see real-time updates
# Edit any file and save - auto refresh!
```

### Environment Configuration:
```env
# .env.local (Current Settings)
OPENAI_COMPATIBLE_API_KEY=c7632a7c-2661-492e-bd6f-aab994818998
OPENAI_COMPATIBLE_API_BASE_URL=http://localhost:5001/v1
TAVILY_API_KEY=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
BASE_URL=http://localhost:3000
```

---

## 📦 Production Build (เมื่อพร้อม Deploy)

### 1. Build Docker Image
```bash
# Option 1: Build locally
docker compose build morphic

# Option 2: Build for registry (ต้องการ GitHub token)
docker build -t ghcr.io/peterfish/morphic-custom:latest .
```

### 2. Push to Registry (Optional)
```bash
# Login to GitHub Container Registry
export CR_PAT=YOUR_TOKEN_HERE
echo $CR_PAT | docker login ghcr.io -u Peterfish --password-stdin

# Push image
docker push ghcr.io/peterfish/morphic-custom:latest
```

### 3. Production docker-compose.yaml
```yaml
services:
  morphic:
    # For local build
    build:
      context: .
      dockerfile: Dockerfile
    # OR for registry image
    # image: ghcr.io/peterfish/morphic-custom:latest
    
    env_file: .env.local
    ports:
      - '3030:3000'
    depends_on:
      - redis
      - searxng
```

---

## 💻 Development Tips

### Quick Commands:
```bash
# Check status
docker ps                     # See running containers
lsof -i :3000                # Check if port is used
bun run type-check           # Check TypeScript

# Restart services
docker compose -f docker-compose.kobold.yaml restart
pkill -f "next dev" && bun dev  # Restart Morphic

# View logs
docker logs -f koboldcpp     # KoboldCpp logs
# Morphic logs show in terminal
```

### File Structure:
```
morphic/
├── 📝 Code Files (แก้ไขเสร็จแล้ว)
│   ├── public/config/models.json ✅
│   ├── lib/config/default-models.json ✅
│   ├── app/api/chat/route.ts ✅
│   ├── lib/utils/registry.ts ✅
│   ├── lib/tools/*.ts ✅
│   └── components/ui/icons.tsx ✅
│
├── 🔧 Development Files
│   ├── .env.local (configured)
│   ├── .env.development (template)
│   ├── dev-start.sh (helper script)
│   └── dev-stop.sh (helper script)
│
└── 🐳 Docker Files
    ├── docker-compose.yaml (Morphic)
    ├── docker-compose.kobold.yaml (KoboldCpp)
    └── .dockerignore (optimize builds)
```

---

## 📚 Resources

- **GitHub Repo**: https://github.com/Peterfish/morphic
- **Development Guide**: [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
- **Quick Start**: [DEVELOPMENT_QUICKSTART.md](./DEVELOPMENT_QUICKSTART.md)
- **Contributing**: [CONTRIBUTING_GUIDE.md](./CONTRIBUTING_GUIDE.md)

---

## ❓ Next Steps

1. **For Development**: Continue using `bun dev` mode
2. **For Testing**: Use current setup with local URLs
3. **For Production**: Build Docker image when ready to deploy
4. **For Sharing**: Push to GitHub Container Registry

**Current Focus**: Development Mode ✅ (Production build can wait)