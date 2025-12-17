# StudyComp Web Application

## 1. Төслийн товч танилцуулга

StudyComp нь Next.js framework дээр суурилсан, Supabase backend ашигласан вэб аппликейшн юм. Тус төсөл нь орчин үеийн веб хөгжүүлэлтийн Continuous Integration (CI), Continuous Deployment (CD), serverless архитектурын ойлголтуудыг бодит жишээгээр хэрэгжүүлэх зорилготой.

---

## 2. Ашигласан технологи, хэрэгслүүд

- **Frontend / Backend**: Next.js (App Router)
- **Backend as a Service**: Supabase (PostgreSQL)
- **CI хэрэгсэл**: GitHub Actions
- **CD хэрэгсэл**: Vercel
- **Runtime орчин**: Node.js (20 ба түүнээс дээш)
- **Package manager**: npm

---

## 3. Суулгах заавар

### 3.1 Төслийг татаж авах

```bash
git clone https://github.com/your-repository-name.git
cd your-repository-name
```

### 3.2 Supabase тохиргоо хийх

1. Supabase системд нэвтэрч шинэ project үүсгэнэ.
2. Project Settings → API хэсгээс дараах мэдээллийг авна:
   - Project URL
   - Anon public key

3. Төслийн root хавтсанд `.env.local` файл үүсгээд дараах утгуудыг хадгална:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_public_key
```

> ⚠️ `.env.local` файл нь аюулгүй байдлын үүднээс version control-д орохгүй.

### 3.3 Package-ууд суулгах

```bash
npm install
```

---

## 4. Ашиглах заавар

### 4.1 Development орчинд ажиллуулах

```bash
npm run dev
```

Амжилттай ажилласан тохиолдолд дараах хаягаар хандах боломжтой:

```
http://localhost:3000
```

### 4.2 Production build шалгах

```bash
npm run build
```

---

## 5. CI/CD хэрэгжилт

### 5.1 Continuous Integration (CI)

GitHub Actions ашиглан код `main` болон `develop` салбаруудад push эсвэл pull request хийх бүрд дараах шалгалтууд автоматаар хийгдэнэ:

- Dependency суулгалт
- Build шалгалт
- Алдааны хяналт

### 5.2 Continuous Deployment (CD)

CI амжилттай дууссаны дараа Vercel платформ дээр production орчинд автоматаар deploy хийгдэнэ.

---

## 6. Орчны ангилал

| Орчин | Тайлбар |
|-------|---------|
| Development | Локал хөгжүүлэлт (`npm run dev`) |
| Production | Vercel дээр байршуулсан орчин |

---

## 7. Багийн гишүүд

- **Төслийн гишүүд**: Ганцаараа
- **Гүйцэтгэсэн үүрэг**: Системийн дизайн, frontend, backend, CI/CD тохиргоо

---

## 8. Төслийн тайлан

### 8.1 Хийсэн зүйлс

- Next.js ашиглан вэб аппликейшн хөгжүүлсэн
- Supabase ашиглан өгөгдлийн сан болон authentication шийдэл холбосон
- GitHub Actions ашиглан CI pipeline байгуулсан
- Vercel дээр автомат deploy бүхий CD тохируулсан
- Environment variable ашиглан аюулгүй байдлыг хангаж ажилласан

### 8.2 Тулгарсан бэрхшээлүүд

- CI орчинд TypeScript суурьтай тохиргооны файл ашигласнаас build алдаа үүссэн
- Node.js хувилбарын зөрүүнээс шалтгаалж CI тасалдсан
- Supabase-ийн environment variable тохиргоо дутуугаас runtime алдаа гарсан

### 8.3 Сурсан зүйлс

- CI/CD pipeline-ийг бодит төсөл дээр хэрэгжүүлэх арга барил
- `npm install` болон `npm ci` командын ялгаа
- Environment variable ашиглалтын ач холбогдол
- Serverless архитектурын үндсэн ойлголтууд
- Development болон Production орчны ялгаа

---

## 9. Дүгнэлт

Энэхүү төсөл нь орчин үеийн веб хөгжүүлэлтийн стандартуудыг ашиглан бодит систем хөгжүүлэх туршлага олгосон бөгөөд автоматжуулалт, найдвартай байдал, орчны зөв зохион байгуулалтын ач холбогдлыг ойлгоход чиглэсэн.

---
