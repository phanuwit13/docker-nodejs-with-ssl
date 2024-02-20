# กำหนด image พื้นฐาน
FROM node:14

# กำหนด working directory
WORKDIR /usr/src/app

# คัดลอกไฟล์ package.json และ package-lock.json (ถ้ามี)
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกทุกไฟล์จาก project ลงใน container
COPY . .

# ประกาศว่า container จะ listen ที่ port นี้เมื่อเริ่มต้น
EXPOSE 8081

# รัน application
CMD [ "node", "server/index.js" ]