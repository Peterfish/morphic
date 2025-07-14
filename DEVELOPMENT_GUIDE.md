# คู่มือการพัฒนา Morphic

## 📁 โครงสร้างไฟล์สำคัญ

### ไฟล์ที่แก้บ่อย:

1. **การแก้ไข UI/หน้าตา**
   - `app/page.tsx` - หน้าแรก
   - `components/` - ส่วนประกอบต่างๆ
   - `app/globals.css` - สไตล์หลัก

2. **การแก้ไขการทำงาน**
   - `app/api/chat/route.ts` - API สำหรับแชท
   - `lib/tools/` - เครื่องมือต่างๆ (search, video-search, etc.)
   - `lib/utils/` - ฟังก์ชันช่วยต่างๆ

3. **การตั้งค่า**
   - `public/config/models.json` - รายการ AI models
   - `.env.local` - ตั้งค่า API keys และ URLs

## 🛠️ วิธีการแก้ไข

### 1. Development Mode (ทดสอบแบบ real-time)

```bash
# ติดตั้ง dependencies (ครั้งแรก)
bun install

# รัน development server
bun dev

# เปิด http://localhost:3000
# แก้ไขไฟล์ได้เลย จะ refresh อัตโนมัติ
```

### 2. Production Mode (ใช้งานจริง)

```bash
# แก้ไขไฟล์ตามต้องการ

# Build Docker image ใหม่
docker compose build morphic

# Restart services
docker compose restart morphic

# หรือ restart ทั้งหมด
docker compose down
docker compose up -d
```

## 💡 ตัวอย่างการแก้ไข

### 1. เปลี่ยนชื่อแอพ
แก้ไฟล์ `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: 'ชื่อแอพของคุณ',
  description: 'คำอธิบายแอพ',
}
```

### 2. เปลี่ยนข้อความต้อนรับ
แก้ไฟล์ `components/empty-screen.tsx`:
```typescript
<h1>ข้อความต้อนรับของคุณ</h1>
```

### 3. เพิ่ม/ลด Search Results
แก้ไฟล์ `lib/tools/search.ts`:
```typescript
maxResults: number = 10, // เปลี่ยนจำนวนผลการค้นหา
```

### 4. แก้ไข Logo
แก้ไฟล์ `components/ui/icons.tsx` (ที่เราแก้ไปแล้ว)

## 🔍 Debug และ Logs

### ดู Logs แบบ Real-time
```bash
# Morphic logs
docker logs -f morphic-stack-morphic-1

# KoboldCpp logs
docker logs -f koboldcpp

# ทุก services
docker compose logs -f
```

### ดู Error ใน Browser
1. กด F12 เปิด Developer Tools
2. ดูที่ Console tab
3. ดูที่ Network tab สำหรับ API calls

## 📝 Tips สำหรับมือใหม่

1. **Backup ก่อนแก้**
   ```bash
   git add .
   git commit -m "backup before changes"
   ```

2. **แก้ทีละจุด**
   - แก้ทีละไฟล์
   - ทดสอบทุกครั้งที่แก้
   - ถ้าพัง ให้ `git checkout .` เพื่อคืนค่า

3. **ใช้ VS Code**
   - ติดตั้ง Extensions: Prettier, ESLint
   - จะช่วยจัด format โค้ดอัตโนมัติ

4. **อ่าน Error Messages**
   - Error messages บอกปัญหาค่อนข้างชัดเจน
   - Google error message ถ้าไม่เข้าใจ

## 🚀 Workflow แนะนำ

1. **Development**
   ```bash
   bun dev  # พัฒนาและทดสอบ
   ```

2. **Test**
   - ทดสอบใน browser
   - ดู console logs

3. **Build & Deploy**
   ```bash
   docker compose build morphic
   docker compose up -d
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "อธิบายสิ่งที่แก้ไข"
   git push
   ```

## ❓ ปัญหาที่พบบ่อย

### 1. Build ไม่ผ่าน
- ตรวจสอบ syntax error
- ดู error message
- ลอง `bun install` ใหม่

### 2. Container ไม่ start
- ดู logs: `docker logs morphic-stack-morphic-1`
- ตรวจสอบ .env.local
- ตรวจสอบ ports ว่าไม่ชนกัน

### 3. ไม่เชื่อมต่อ AI
- ตรวจสอบว่า KoboldCpp ทำงาน
- ดู URL ใน .env.local
- ทดสอบ: `curl http://localhost:5001/v1/models`

## 📚 แหล่งเรียนรู้เพิ่มเติม

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Docker Docs](https://docs.docker.com)