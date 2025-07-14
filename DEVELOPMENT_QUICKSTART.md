# 🚀 Development Mode Quick Start

## Prerequisites
- Node.js 18+ 
- Bun (already installed)
- Redis (script will install if needed)
- KoboldCpp running on port 5001

## Quick Start

### 1. Start KoboldCpp (ในหน้าต่างแยก)
```bash
cd /path/to/koboldcpp
./koboldcpp --model your-model.gguf --port 5001 --usecublas all
```

### 2. Start Morphic Development
```bash
# ในโฟลเดอร์ morphic
./dev-start.sh
```

เปิด browser ไปที่: http://localhost:3000

### 3. Stop Everything
```bash
./dev-stop.sh
```

## 📝 การพัฒนา

### Hot Reload
- แก้ไขไฟล์ใดๆ แล้ว save
- Browser จะ refresh อัตโนมัติ
- ไม่ต้อง restart server

### ไฟล์สำคัญที่แก้บ่อย
```
app/
├── page.tsx          # หน้าแรก
├── layout.tsx        # Layout หลัก
└── globals.css       # Styles

components/
├── chat.tsx          # Chat interface
├── empty-screen.tsx  # Welcome screen
└── ui/              # UI components

lib/
├── tools/           # Search, video tools
└── utils/           # Utility functions
```

### Debug Tips

1. **ดู Console Logs**
   - Browser: F12 → Console
   - Terminal: ดู output จาก dev server

2. **Network Requests**
   - F12 → Network tab
   - ดู API calls ไป KoboldCpp

3. **React DevTools**
   - ติดตั้ง extension สำหรับ Chrome/Firefox
   - ช่วย debug components

## 🎨 ตัวอย่างการแก้ไข

### เปลี่ยนข้อความต้อนรับ
```typescript
// components/empty-screen.tsx
<h1 className="text-4xl font-bold">
  ยินดีต้อนรับสู่ Morphic
</h1>
```

### เปลี่ยนสีธีม
```css
/* app/globals.css */
:root {
  --primary: #your-color;
}
```

### เพิ่ม Feature ใหม่
1. สร้าง component ใน `components/`
2. Import และใช้ใน `app/page.tsx`
3. Save และดูผลทันที

## 🔧 Troubleshooting

### Port 3000 ถูกใช้แล้ว
```bash
# หา process ที่ใช้ port
lsof -i :3000
# Kill process
kill -9 <PID>
```

### Redis connection failed
```bash
# Start Redis manually
redis-server
```

### KoboldCpp ไม่ตอบสนอง
- ตรวจสอบว่ารันอยู่ที่ port 5001
- ดู logs ของ KoboldCpp
- ทดสอบ: `curl http://localhost:5001/v1/models`

## 💡 VS Code Setup

### Recommended Extensions
1. **Prettier** - Code formatter
2. **ESLint** - Linting
3. **Tailwind CSS IntelliSense** - CSS classes
4. **TypeScript + JavaScript** - Language support

### Settings (.vscode/settings.json)
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## 📚 Learning Resources

- [Next.js Tutorial](https://nextjs.org/learn)
- [React Basics](https://react.dev/learn)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)