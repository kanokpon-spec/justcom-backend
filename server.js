import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.text({ type: "text/csv" }));

// ✅ บันทึกไฟล์ CSV ไว้ในโฟลเดอร์ data/
app.post("/save-csv", (req, res) => {
  const filePath = path.join(__dirname, "data", "justcom_inventory.csv");
  try {
    fs.writeFileSync(filePath, req.body, "utf8");
    res.send("✅ บันทึกไฟล์ justcom_inventory.csv เรียบร้อยแล้ว");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ เกิดข้อผิดพลาดในการบันทึกไฟล์");
  }
});

// ✅ ให้เปิดไฟล์ html ได้จาก browser
app.use(express.static(__dirname));

app.listen(3000, () => console.log("🚀 Server พร้อมใช้งานที่ http://localhost:3000"));
