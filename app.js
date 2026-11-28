/* Google Analytics 4 */
(function () {
  var id = "G-MFHB37ELXG";
  var s = document.createElement("script"); s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + id; document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag("js", new Date());
  gtag("config", id);
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("#goDl");
    if (a) gtag("event", "tai_tai_lieu", { link_url: a.href, page_title: document.title, page_location: location.href });
    if (e.target.closest && e.target.closest("[data-donate], #hdDonate")) gtag("event", "mo_ung_ho", { page_location: location.href });
    if (e.target.closest && e.target.closest("[data-service]")) gtag("event", "dat_dich_vu", { page_location: location.href });
  });
})();

/* ==========================================================================
   ✏️  PHẦN CẦN SỬA: CONFIG (thông tin web + tài khoản) và DOCS (tài liệu)
   ========================================================================== */
const CONFIG = {
  siteName: "Kho Tiếng Anh Free",
  heroTitle: "Tài liệu Tiếng Anh lớp 1–12, thi vào 10, thi THPT — tải miễn phí",
  heroDesc: "Đề thi, bài tập, file nghe, bài giảng và giáo án Tiếng Anh được sắp xếp theo lớp và theo kỳ thi. Tải thẳng từ Google Drive, không cần đăng ký.",

  // Tài khoản nhận ủng hộ. Mã BIN ngân hàng (để tạo VietQR, quét được bằng mọi app ngân hàng):
  // Vietcombank 970436 · VietinBank 970415 · BIDV 970418 · Agribank 970405 · MB 970422
  // Techcombank 970407 · ACB 970416 · VPBank 970432 · TPBank 970423 · Sacombank 970403
  bank: { bin: "970436", name: "Vietcombank", account: "0491000085112", owner: "NGUYEN VAN CUONG" },
  transferNote: "Ung ho Kho Tieng Anh",       // nội dung chuyển khoản (không dấu)
  amounts: [20000, 30000, 50000, 100000],      // mức gợi ý
  defaultAmount: 30000,
  qrImage: "",   // nếu muốn dùng ảnh QR MoMo/ZaloPay riêng: dán data:image/png;base64,... (khi đó tắt chọn mức tiền)

  // Thanh mục tiêu (đặt show:false để ẩn). Cập nhật số tay mỗi tháng.
  goal: { show: true, label: "Chi phí duy trì tháng này", target: 500000, current: 0 },
  uses: ["🌐 Tên miền & hosting", "☁️ Dung lượng lưu trữ", "📚 Cập nhật tài liệu mới"],

  contact: "Zalo: 0388 202 311",
  // Cách ủng hộ thứ 2: đặt dịch vụ của nhóm quản trị web
  serviceZalo: "https://zalo.me/0388202311",
  servicePhone: "0388 202 311",
  supportPage: "/ho-tro-giao-vien",
  // Ảnh giao dịch thành công (đã che tên & nội dung) – để trống thì ẩn mục này: [{src:"/img/gd1.jpg", cap:"..."}]
  proofs: [],
  services: ["📝 Sáng kiến kinh nghiệm (SKKN)", "🏆 Bài thi Giáo viên giỏi", "📄 Đề thi & ma trận theo yêu cầu", "🎮 Game dạy học", "📑 Bài dự thi theo quy định"],              // để người dùng báo link hỏng / xin tài liệu
  footer: "Tài liệu chỉ phục vụ mục đích học tập, phi thương mại. Nếu bạn là tác giả và muốn gỡ tài liệu, vui lòng liên hệ."
};

// Danh mục kỳ thi / chuyên đề (mục nào chưa có tài liệu sẽ tự ẩn)
const EXAMS = [
  { key: "thi-vao-10", name: "Thi vào lớp 10", icon: "🏫", color: "#fdeedd", desc: "Đề thi tuyển sinh các tỉnh, chuyên & không chuyên, đề ôn theo cấu trúc mới" },
  { key: "thpt-qg", name: "Thi tốt nghiệp THPT", icon: "🏆", color: "#e6f6e6", desc: "Đề minh họa, đề thi thử các trường/sở, chuyên đề ôn thi" },
  { key: "hsg", name: "Học sinh giỏi", icon: "🥇", color: "#fff4cc", desc: "Đề thi HSG, chuyên đề nâng cao, đề chuyên" },
  { key: "thi-vao-6", name: "Thi vào lớp 6", icon: "🎒", color: "#ffe6ef", desc: "Đề ôn thi vào lớp 6 trường chất lượng cao" },
  { key: "dgnl", name: "Đánh giá năng lực (ĐGNL)", icon: "🧠", color: "#efe6ff", desc: "Đề ôn thi ĐGNL HSA, V-ACT, đánh giá tư duy – trọn bộ và phần Tiếng Anh" },
  { key: "ielts", name: "IELTS", icon: "🌍", color: "#e3ecff", desc: "Du học, xét tuyển & miễn thi ngoại ngữ" },
  { key: "toeic", name: "TOEIC", icon: "💼", color: "#e2f5ef", desc: "Chuẩn đầu ra đại học, tuyển dụng doanh nghiệp" },
  { key: "vstep", name: "VSTEP (B1–C1)", icon: "🇻🇳", color: "#fff0d9", desc: "Chứng chỉ 6 bậc của Bộ GD&ĐT" },
  { key: "cambridge-yle", name: "Starters · Movers · Flyers", icon: "🧸", color: "#ffe6ef", desc: "Cambridge cho học sinh tiểu học" },
  { key: "luyen-nghe", name: "Luyện nghe", icon: "🎧", color: "#e0f4fb", desc: "File nghe, bài nghe chép chính tả, luyện nghe theo chủ đề" },
  { key: "ky-nang", name: "Ngữ pháp & kỹ năng", icon: "🔤", color: "#eef2f6", desc: "Ngữ pháp, từ vựng, đọc – viết dùng cho nhiều lớp" },
  { key: "game-day-hoc", name: "Game dạy học PowerPoint", icon: "🎮", color: "#ffe6f4", desc: "Game khởi động, ôn tập, kiểm tra bài cũ — tải về, thay câu hỏi là dùng ngay" },
  { key: "giao-vien", name: "Dành cho giáo viên", icon: "👩‍🏫", color: "#e8f0e0", desc: "Giáo án, bài giảng PowerPoint, tài liệu chuyên môn" }
];

// Loại tài liệu
const TYPES = {
  de:   { name: "Đề thi – kiểm tra", icon: "📝", long: "Bộ đề thi, đề kiểm tra" },
  bt:   { name: "Bài tập",           icon: "📘", long: "Bài tập luyện tập" },
  tv:   { name: "Từ vựng – Ngữ pháp", icon: "🔤", long: "Tài liệu từ vựng, ngữ pháp" },
  nghe: { name: "Luyện nghe",        icon: "🎧", long: "Tài liệu luyện nghe" },
  ppt:  { name: "Bài giảng PowerPoint", icon: "📊", long: "Bài giảng PowerPoint" },
  ga:   { name: "Giáo án",           icon: "👩‍🏫", long: "Giáo án / kế hoạch bài dạy" },
  hsg:  { name: "Bồi dưỡng HSG",     icon: "🥇", long: "Tài liệu bồi dưỡng học sinh giỏi" },
  game: { name: "Game PowerPoint",   icon: "🎮", long: "Game dạy học PowerPoint" },
  khac: { name: "Tài liệu tổng hợp", icon: "📚", long: "Tài liệu tổng hợp" }
};
const FLAGS = { nghe: "🎧 Có file nghe", da: "✅ Có đáp án", word: "📄 File Word chỉnh sửa được", ppt: "📊 Có PowerPoint", pdf: "📕 File PDF", moi: "🆕 Theo cấu trúc / chương trình mới" };

/* RAW — dữ liệu lấy từ Google Drive: [id thư mục, tên, mục, loại, bộ sách, đặc điểm, ngày cập nhật] */
const RAW = [["1_C_ku9TL3xlQocruyys02WKCtQo8DLmf","Trắc nghiệm tiếng anh 8","lop-8","khac","","","2026-11-15"],
["1D3XeKCNNNWv52km4W_sGCxvR9x1J9WZA","TỔNG HỢP ĐỀ CHUYÊN ANH SỞ 34 TỈNH TP","lop-9","hsg","","","2026-11-04"],
["1Vzst5SOhR0GYzt_hx4vvHLyNCfis9mB1","BỘ ĐỀ TUYỂN SINH VÀO 10 CHUYÊN ANH 2026-2027 - CHỈ FILE ĐỀ THI","lop-9","hsg","","moi","2026-11-04"],
["10Xrfl5G1Cut_Sy4-NTQniKPZ_-IXzvAp","ĐỀ CƯƠNG ÔN TẬP GIỮA HK1 -TA6","lop-6","de","","","2026-10-29"],
["1Zndq-iWIm5rfXCGFxGw96xuAMFLG1MAx","05 đề thi giữa kì 1 anh 10 form 2026","lop-10","de","","moi","2026-10-25"],
["1Fsb5zd99VAg3U_54CUKYZla31SlZdXRo","Bộ tài liệu Tiếng Anh 8 theo Unit 1-12 (PPT Word PDF)","lop-8","ppt","","word,ppt,pdf","2026-10-18"],
["1uSOZ7AuHlCrl7l7VefdxBw5IxUuVWXoi","Bộ tài liệu Tiếng Anh 9 theo Unit 1-12 (PPT Word PDF)","lop-9","ppt","","word,ppt,pdf","2026-10-18"],
["1Uwaxf0jqoi0NeEe98O1PnCueCurGSy7p","PPT Tiếng Anh 10 Global Success - AI (Unit 1-10 & Review)","lop-10","ppt","Global Success","ppt","2026-10-16"],
["1uEhb7i2G0PXydVlvowb6Yg7BQkzCQRnp","PPT dạy thêm Tiếng Anh 6 Global Success - từ Gmail","lop-6","ppt","Global Success","ppt","2026-10-16"],
["1caBB45_GMcMQEtk7FbrbSBTIWzSQLKda","Bộ đề thi giữa kì anh 8 có nghe 2026","lop-8","nghe","","nghe,moi","2026-10-15"],
["1_AIGOqNNKuz9gtgzaQukliSdiwtwH8l-","CHUYÊN ĐỀ BỒI DƯỠNG HSG THPT","lop-12","hsg","","","2026-10-09"],
["1He0ivJMBal7IaZ5RXp4fx04E3DtaHtDC","10 đề thi giữa kì 1 năm 26 27","lop-6","de","","moi","2026-10-06"],
["1dGwAbp5dlUV6UIt_pmZvj5zgWxT9GnTE","10 đề kiểm tra giữa kì 1 tiếng anh 8 năm 26 27","lop-8","de","","moi","2026-10-06"],
["1NnNKLTEawgflduisDMb2aXgI1qb5H384","10 de thi giua ki 1 nam 26-27","lop-7","khac","","moi","2026-10-05"],
["1CZn2t1NkqbstKlZzaO26YCw0VJaIggWp","10 đề thi giữa kì anh 9 form 2026","lop-9","de","","moi","2026-10-01"],
["1FDhcUkwJohH6RU0G3zkjfD18N-MAtpZA","CÁC DẠNG BÀI TẬP ÔN GIỮA HK1 TA7","lop-7","bt","","","2026-09-29"],
["1EcmzSiizrSONzpsOZhKUi5D5w-jEMXpC","Bài Tập Global Success Lớp 10 Có File Nghe HK 1","lop-10","nghe","Global Success","nghe","2026-09-16"],
["16ymHIo61I-ZF2tAL2q4_szdfZ-PXNZKS","PPT ANH 6 AI","lop-6","ppt","","ppt","2026-09-11"],
["18gp61O21cGYG6wFMSnDBTAKG4HtTPjhF","PPT Anh 8 AI","lop-8","ppt","","ppt","2026-09-11"],
["1AcoVCGklw7tOxXl79DMOSKBbc5eZE7Ps","PPT AI Global success 8 New","lop-8","ppt","Global Success","ppt","2026-09-11"],
["1CC55jiV19apOT3buNY4HLSMtSsFk37GZ","PPT ANH 7 AI","lop-7","ppt","","ppt","2026-09-11"],
["1NUl2ZZYuq8_GLAt5ftBYhXkLDHE9wEbU","PPT ANH 9 AI","lop-9","ppt","","ppt","2026-09-11"],
["1T9o2JmFEib9FZlaXtCFX_E1IDPGvwtU1","BỘ ĐỀ HSG TIẾNG ANH 11 CÁC TRƯỜNG CHUYÊN KV DUYÊN HẢI NĂM 2026 WORD","lop-11","hsg","","word,moi","2026-09-09"],
["15dySUe1IIEHlFZwTGy3eu1_UXK06hi43","BÀI GIẢNG PPT AI LỚP 5","lop-5","ppt","","ppt","2026-09-05"],
["1iGSNNp7jnYhUVtc48U_b7C49h4PUO5lr","PPT anh 4","lop-4","ppt","","ppt","2026-09-05"],
["1KAeNaZhJ3fIOKU3bBNdaR4R4pd1UikGw","ĐỀ KIỂM TRA TA7","lop-7","de","","","2026-08-26"],
["1h4CYirr_zTZVc3_RT9bwJsSVRk9shq92","BÀI KIỂM TRA TA6 GS","lop-6","de","Global Success","","2026-08-26"],
["18a4G8So_6x5dV5cwyMiS09fTfddjaGt_","Bo kiem tra Tieng Anh 5 Global Success","lop-5","khac","Global Success","","2026-08-09"],
["1w8kdsDGwwqzMMnTMynv7QH9BUIlmh2LZ","BT ANH 11 FORM 2026","lop-11","bt","","moi","2026-07-02"],
["1T5pfPKZ2hH_oBAFs5CHDyQ8_mXMV0FnN","Chủ điểm ôn hè anh 8","lop-8","bt","","","2026-06-23"],
["1L0jfmCi961U6G_CGverKED-MQRY1OAdh","On he anh 6 global","lop-6","khac","Global Success","","2026-06-16"],
["1Hmjk2JR_FjK5g1pABZ2L0gHCrovu9upK","Bt On he Anh 9","lop-9","bt","","","2026-06-15"],
["1Jik3qGBS6hoWbLSM4fXRj6UUcEr1HLT4","on he TA 9 global","lop-9","khac","Global Success","","2026-06-12"],
["1GIYx4ryS1b_SYetdjCig_OmqjYDl-HkP","thuyết trình Tiếng Anh 9 Global Success cả năm","lop-9","khac","Global Success","","2026-06-05"],
["1X_M0KVQgpWl-UuvhaUkGzLk0o4Uj7Pcx","THUYẾT TRÌNH TA5-Cả năm","lop-5","khac","","","2026-06-04"],
["1QOSdSPrNSFU1WgUuBn12-IKoGYD9uEb8","60 bài đọc hiểu ôn thi tốt nghiệp THPT","thpt-qg","tv","","","2026-06-01"],
["1RYnCz_9JdNp-6iZx1jsQXWPFmc8-7-1A","50 TỜ RƠI - THÔNG BÁO","thpt-qg","bt","","","2026-05-25"],
["1-XHVZzBhE6U9RLYZ8wF_JfNZ5WDw1-Dr","ĐỀ THI THỬ TỐT NGHIỆP THPT","thpt-qg","de","","","2026-05-21"],
["1UV5JkNYkoLQzaU2Y2HJICi6sIXgXxk-e","35 ĐỀ ÔN VÀO 10- HÀ NỘI 2026-2027","thi-vao-10","de","","moi","2026-05-21"],
["1rE1pHO1nxTnlDBHFSXdc9ILu4LfxRhsM","ĐỀ THAM KHẢO 10 HẢI PHÒNG -26-27","thi-vao-10","de","","moi","2026-05-14"],
["1wtVzFyIXQcdIpRtzG3l6OIiw5swVL0GZ","24 CHUYÊN ĐỀ NGỮ PHÁP ÔN VÀO 10","thi-vao-10","de","","","2026-05-13"],
["1o0cxlpOsw8JG_RyjubcoeEu7hSEqcj55","14 CHUYÊN ĐỀ NGỮ PHÁP ÔN VÀO LỚP 10","thi-vao-10","de","","","2026-04-28"],
["1Fe4ea5A2_LkR03pGWzi6ssl17BhjCq0b","ĐỀ ÔN THI VÀO 10 TP.HCM 2026","thi-vao-10","de","","moi","2026-04-22"],
["18z6ukLxyl0RpyLQca5gL_4KD9aY40OK4","ĐỀ ÔN THI VÀO 10 TP.HCM","thi-vao-10","de","","","2026-04-21"],
["17NCEzpFiDPuHv2IcJita0m2cBn_yetRC","60 ĐỀ TUYỂN SINH VÀO 10","thi-vao-10","de","","","2026-04-18"],
["14D9PxpGsy-w6_X-7QIf8VmGRHiWM0J_F","L8 2026 BỘ ĐỀ THI CUỐI HK2 ĐỀ 1-20","lop-8","de","","moi","2026-04-14"],
["1rJSPrtnTwADo0cNDSKKS-gsj596e_jKr","L7 2026 BỘ ĐỀ THI CUỐI HK2 ĐỀ 1-20","lop-7","de","","moi","2026-04-13"],
["14QQAbemK56Gg1VUQ2maTdS7aigKevTqu","Tat ca de thi MA tran anh 9 cuoi ki 2","lop-9","khac","","","2026-04-12"],
["1Rg-h-dEGTS02tLy5cvgKOva8lWGeaSOp","ĐỀ CƯƠNG ÔN TẬP GIỮA HK2-TA9","lop-9","de","","","2026-04-10"],
["1iEYhoFPKbCzSGWopEwvjefm8z5VtOQ5u","TRỌNG TÂM ÔN TẬP VÀO LỚP 10","thi-vao-10","bt","","","2026-04-04"],
["1Lea6z5jIaL1DX_R5MJxjOv7eblzdW7nj","ĐỀ THI THỬ TỐT NGHIỆP 2026 MÔN TIẾNG ANH CÓĐÁP ÁN","thpt-qg","de","","da,moi","2026-03-30"],
["1d0i_0IheNEI-2OFuBixx_P57sQ-H-giq","TỔNG ÔN TỪ VỰNG NGỮ PHÁP VÀO 10 2025-2026","thi-vao-10","tv","","moi","2026-03-24"],
["1qHJqeyOGgBzSRYj-bIUwiYHowa-ZOU-m","SPEAKING ENGLISH 7- Unit","lop-7","khac","","","2026-03-24"],
["1Iz50vdLgCN-M47vAOaV4AtEWWP7j1Hl8","BỘ ĐỀ 8+ TỐT NGHIỆP THPT-2026","thpt-qg","de","","moi","2026-03-21"],
["100DQBA4OoD5r_sECG4_3cib-2hJzvUuD","BỘ ĐỀ ÔN VÀO 10 NĂM 2026-2027","thi-vao-10","de","","moi","2026-03-18"],
["12Ct0nAulnJmZ8Uz2P95Ff_1dZNVhidb5","30 ĐỀ ÔN NƯỚC RÚT TỐT NGHIỆP THPT 2026","thpt-qg","de","","moi","2026-03-17"],
["17bPgeIWBbWk1YwLR7ZFQLyqcKLqGPAev","De thi thu vao 10 Ninh Binh 2026","thi-vao-10","khac","","moi","2026-03-16"],
["1MaFpHtp9r9awoiAw4dsKE-AomaPn1uJ2","ĐỀ THI GIỮA HK2-TA12","lop-12","de","","","2026-03-16"],
["1Y6sxRCdna4jCxqmdEGkMFSA2HDRiAOo7","20 đề TNTHPT 2016 môn Anh có đáp án chi tiết","thpt-qg","de","","da","2026-03-10"],
["1KP6kwu67ktB9BVjPuSzp-zbDYsMTE0b_","DE TN","thpt-qg","khac","","","2026-03-03"],
["1qAdCDNpjCcVtcDA8z2KVahF1yaittzAK","ĐỀ THI GIỮA HK2-TA6 2026 2027","lop-6","de","","moi","2026-02-24"],
["1aCj9EV6KhM9NJwfVMd1YHFt2sjPLHY6m","ĐỀ THI GIỮA HK2-TA9","lop-9","de","","","2026-02-06"],
["1gMUQv5mMjCPZ1349gVGwI3Ii4LPRWnAt","ĐỀ THI VÀO 10 CHUYÊN ANH","thi-vao-10","hsg","","","2026-02-05"],
["1Sy4YKM-ovtb-Xhd6cabEowYCoxCC9iQH","20 ĐỀ ĐỌC HIỂU ÔN THI TỐT NGHIỆP THPT","thpt-qg","de","","","2026-02-03"],
["1lsChhEhQyqxV5x2OEeTyOcbpRiwIHXre","ĐỀ THI GIỮA HK2-TA8-GS","lop-8","de","Global Success","","2026-02-03"],
["1n0MqBbdh65HoP6_yv8nVhUwI6g0Rt7Yj","TỔNG HỢP ĐỀ THI HSG TA12","lop-12","hsg","","","2026-01-30"],
["11axOERMY62rozLYJtP8XphkrUN7CwpAB","25 BỘ ĐỀ VÀO 10 FORM HÀ NỘI CÓ ĐÁP ÁN","thi-vao-10","de","","da","2026-01-28"],
["13fD5dvYuJ95TIp2lOoBSlcHChuSHIlmm","Lớp 8 - TỔNG HỢP TÀI LIỆU LUYỆN IOE","lop-8","bt","","","2026-01-27"],
["16fxhZI3jaILzCWMb-mOAsdo3T_VQ6mvb","Lớp 9 - TỔNG HỢP TÀI LIỆU LUYỆN IOE","lop-9","bt","","","2026-01-27"],
["1wq1Jiox9_Hu5-ytEV0wH9jve_ZYa2Nzr","60 ĐỀ MINH HỌA TỐT NGHIỆP THPT 2026","thpt-qg","de","","moi","2026-01-20"],
["1bAs6obi6mh-jT2uRFjXDECwlcZdyhD4X","92 BÀI ĐỌC ĐƯỢC BIÊN SOẠN THEO CÂU HỎI ĐÁNH GIÁ NĂNG LỰC ĐỌC CHUẨN FORM 2025","dgnl","khac","","moi","2026-01-07"],
["1Jr915IF2ywQbAU-RjBs5Ajnt7z5I4b_S","Đề Dự Đoán Đặc Biệt File Word","thpt-qg","de","","word","2026-01-05"],
["1mGmI_Aw1csleBI5k7C-NkhXLi6FXr80I","Tuần 1 (Done)","thpt-qg","khac","","","2026-01-05"],
["1udr-X1WfRQdjvFR4b25Ya8tSC4VB-DrZ","Tài liệu ôn TN THPT theo tuần cực hay","thpt-qg","bt","","","2026-01-05"],
["1-aU_KgQc-9wjRu0UxedynWnTQ4Xy-aYK","15 ĐỀ THI CUỐI HK1-TA8-GS","lop-8","de","Global Success","","2025-12-31"],
["19O37DFlBtOzPzxKcG2LQIBWcGr4lFb0T","CÁC CHUYÊN ĐỀ NGỮ PHÁP ÔN TẬP THI TỐT NGHIỆP","thpt-qg","de","","","2025-12-30"],
["1g_j6lb5-Hw61TUxbHMcVz9vrJLUbnSgI","15 ĐỀ THI CUỐI HK1-TA6-GS form 2026","lop-6","de","Global Success","moi","2025-12-30"],
["1NWI-pdB4PaL9qR-JgbNJm1tmHWq-D8yy","ĐỀ THI CUỐI HK1-TA12-GS","lop-12","de","Global Success","","2025-12-24"],
["1B25VEn28kf8rBATf1TDXYWaIQE3zhO9E","ĐỀ CƯƠNG ÔN TẬP CUỐI HK1-TA11-GS","lop-11","de","Global Success","","2025-12-16"],
["1UdaGZrJAY5Tdj8LEvUgHmDU2bjaRPbOj","KẾ HOẠCH DẠY HỌC TÍCH HỢP NĂNG LỰC SỐ","lop-9","ga","","","2025-11-18"],
["1AOIGWlPQQdfzXGPFR-Pf4M8BaCC-9EQv","150 GUIDED CLOZE TESTS","thpt-qg","de","","","2025-11-12"],
["1YkJw-56yOxtbQ3N42EVjXgQWkmrYpOUB","ĐỀ CƯƠNG ÔN TẬP GIỮA HK1 TA6789","lop-9","de","","","2025-11-06"],
["1FmWbcxMtu41H0T2QEpJDfLRLsCS5djeP","SĂP XẾP FORM MỚI TIẾNG ANH LỚP 9","lop-9","khac","","","2025-10-31"],
["1LuPJGwpBhFbLsaJ31Z1RDFy_FhU-EUJF","SẮP XẾP FORM MỚI LỚP 9","lop-9","khac","","","2025-10-31"],
["1mbv8OHNm0F3tpRcCE54kpo-VgLoYZ6ha","PHIẾU ÔN TẬP GIỮA HỌC KỲ 1 - TIẾNG ANH 6 - 7 - GLOBAL SUCCESS - FORM 2026","lop-6","bt","Global Success","moi","2025-10-14"],
["1lf0Vl4cAHORrLfr1JNKMXQtoKraiJsPN","LỚP 9 GHK1 FORM 2026 TEST","lop-9","de","","moi","2025-10-13"],
["1OURrlCCypvEvDmfGp3Zu9u-eq1-rvgGp","LỚP 8 GHK1 FORM 2026 TEST","lop-8","de","","moi","2025-10-09"],
["1eD0f_3Pg25ohbJClgYooG_c1kFZWsVRg","LỚP 7 GHK1 FORM 2026 TEST","lop-7","de","","moi","2025-10-09"],
["1jQiGKq_tdL--jzU3GTP5sYA-XoFuzmc_","LỚP 6 GHK1 FORM 2026 TEST","lop-6","de","","moi","2025-10-08"],
["1I9r0bt5PcnMqJvQ-L7kCcNgPzzXjKmJW","GIÁO ÁN TA12 GLOBAL","lop-12","ga","Global Success","","2025-09-15"],
["13RcnYz1J6zbLTskb--dvdXwgUydHFLlB","ppt TA 12 Global","lop-12","ppt","Global Success","ppt","2025-09-09"],
["1E0PLeFLKlW13ymciXML9ozHxlURayLRu","GA TA 7 2 cột 2025","lop-7","ga","","","2025-09-08"],
["15h7ANVJdeDFLapLTTSfJgxU4-cZsuB9z","PPT Anh 9","lop-9","ppt","","ppt","2025-09-05"],
["1bwAHDwI-VYWFjOTTn2__kz5DacpTNoYC","BÀI TẬP TỪ VỰNG TA12 GLOBAL","lop-12","tv","Global Success","","2025-09-03"],
["1CqJIC45-2yz0mb4W94CjASpJvkIRJacm","Bt ĐTTT Lớp 9","lop-9","bt","","","2025-08-26"],
["1GPCGNJZxyXmK-icZS3z3tMonhDlJAfZz","BÀI TẬP TA11 GLOBAL SUCCESS","lop-11","bt","Global Success","","2025-08-25"],
["1r-WnevM4XydcV1UmHXCZQo9pU_y7wfzX","PPt Anh 3 Global","lop-3","ppt","Global Success","ppt","2025-08-20"],
["16Hq5zPQk5pAGDAeKsvmVd-9qRY5tXO-q","BỘ ĐỀ KIỂM TRA TA12 FORM 2025","lop-12","de","","moi","2025-08-12"],
["1n7OGhjQD3QdG4scZN1BtENhYKzehx_29","Bt 4 kỹ năng 2026 bản cập nhật","lop-9","bt","","moi","2025-08-05"],
["1to24ZhWnvu6X4609vdIuoQfI9P2IV6KT","BÀI TẬP TIẾNG ANH 2 - GLOBAL SUCCESS","lop-2","bt","Global Success","","2025-08-04"],
["19HvCfuqiYiwF8h-ZxI2MMr0OComWk5QA","Anh 9 form 2026","lop-9","khac","","moi","2025-08-01"],
["1lCyLFtyYbCeu7PeW1GK-XF9QNDe7MoCt","DISCOVERY 4","lop-4","khac","","","2025-07-31"],
["1dpsPVNfESEEWpBaHcc8uO-Je_i8ahmmL","BÀI TẬP TRẮC NGHIỆM SẮP XẾP CÂU TA7","lop-7","bt","","","2025-07-29"],
["1zHGTcZrgjE8fhHOX7HI8IE_QZgQVHcL7","THÌ TIẾNG ANH POWERPOINT","lop-9","ppt","","ppt","2025-07-29"],
["1PPnO8YuRlnQZxYEXOA6LpPQ6U-Y3qskW","Luyện chuyên sâu cả năm","lop-6","bt","","","2025-07-28"],
["1Ry07a9ycPFnDNgcp5Qiyis_48pH-7I27","BÀI TẬP LUYỆN NGHE TA5","lop-5","nghe","","nghe","2025-07-28"],
["1ApnxX80lbBLXvDV_Fyo2W5w_U2h91aJR","PPT Dạy thêm Anh 6 global","lop-6","ppt","Global Success","ppt","2025-07-25"],
["1gUdwDBVHRcsh3iVzPlhj1JAQMw4GAUL1","POWERPOINT WORD FORM","lop-9","ppt","","word,ppt","2025-07-25"],
["1toidznNLV94u26w0TLfkP5Gvs8-5wHsB","GLOBAL 5 EXTRA WORKBOOK + AUDIO","lop-5","nghe","","nghe","2025-07-24"],
["1-StUo8oPGGCAYepvy82Vj1nM7kB3-Cwl","Bài giảng và lời giải chi tiết Friends Global 11- Hoàng Thái Dương","lop-11","ppt","Global Success","da","2025-07-17"],
["1FKgSprvaRelfe_wdLtIvy5aWRr3RQzzu","BÀI KIỂM TRA TA12-GIẢI CHI TIẾT","lop-12","de","","da","2025-07-15"],
["1LuAhl2bIzuEQoQAFa5p3lKpzW20DKa62","ppt day them 6,7,8,9 LH zalo 0388202311","lop-9","ppt","","ppt","2025-07-11"],
["1-iXYeMxjvlZVhMLWEFXpoHt22F_qogMk","TỪ VỰNG NGỮ PHÁP BÀI TẬP TA10 FRIENDS PLUS","lop-10","tv","Friends Plus","","2025-07-03"],
["1ayxDe1nsmj_DO8l8-q-JAPFrS2_JKUt6","BÀI TẬP LÀM THÊM BRIGHT 11 WORD VÀ AUDIO","lop-11","nghe","Bright","nghe,word","2025-07-03"],
["1ARuDjqQfW-cVyjDhY_HLvif6phEtjGGa","BÀI TẬP SẮP XẾP CÂU TẠO THÀNH ĐOẠN VĂN TA6","lop-6","bt","","","2025-07-02"],
["1UljXTw4TTviLN9jhG9gThMLbOFQV11fQ","GRAMMAR","lop-5","tv","","","2025-07-02"],
["1hZ6RswY0mokrITY5kmNDtasftVJjbPeO","ppt tiếng anh tiểu học","lop-5","ppt","","ppt","2025-07-02"],
["1XbA2KzM370iWC2PgmF-kpFOMJcFCxF5k","GIÁO ÁN DẠY THÊM TA6-GLOBAL","lop-6","ga","Global Success","","2025-06-30"],
["1hmRh53l02qaXcLB-PMSUhKJGPVxFrVt-","Chinh phục NP và BT Anh 9","lop-9","bt","","","2025-06-26"],
["1JM04JpqhSj_choQ-NEL-pO5aWpJcEBCM","BỘ ĐỀ KIỂM TRA TA6 GLOBAL","lop-6","de","Global Success","","2025-06-20"],
["1ojyWPFUTgbQMig0YFrcf6rnIOPnv2tqR","SPEAKING TA4 GLOBAL","lop-4","khac","Global Success","","2025-06-20"],
["1O6sA1-nVs5PbwsoIsYt3Mw6qE7TgLSgW","ĐỀ KIỂM TRA THEO TỪNG ĐƠN VỊ BÀI HỌC - TIẾNG ANH 7","lop-7","de","","","2025-06-19"],
["1gmIXUnw7da8tQn9mC3OZeigq1m3nBDlF","ĐỀ KIỂM TRA THEO UNIT TA8 - GLOBAL SUCCESS","lop-8","de","Global Success","","2025-06-19"],
["1ww9hvjlpimtGtqrx13chPL4HuinQR0jQ","100 ĐỀ LUYỆN THI VÀO 10 CHUYÊN ANH","thi-vao-10","hsg","","","2025-06-19"],
["1mSq2FIS_LTCnRXnLESTfLHV0SwxQRPYk","ĐỀ KIỂM TRA TA9 GLOBAL","lop-9","de","Global Success","","2025-06-18"],
["1WI7FsBWGONJsf4YulL2kdHkRk1YM7fl7","Tiếng anh 7 PTNL Global","lop-7","khac","Global Success","","2025-06-17"],
["1WQ3kjG1hX9XOrGGqRjy4aP28waOsf__t","Tổng ôn các chuyên đề ngữ pháp Tiếng Anh ôn thi Tốt nghiệp THPT - 2025 + Đáp án","thpt-qg","de","","da","2025-06-16"],
["1MVJdhk4adnYjJF74iwGyWi6LeGBRZk2r","BÀI TẬP DẠY THÊM TA11 GLOBAL","lop-11","bt","Global Success","","2025-06-12"],
["1DfDIat8RLsgymnGSHc66oP8xiQ9SiVPW","30 CHỦ ĐỀ TỪ VỰNG TIẾNG ANH","thpt-qg","de","","","2025-06-11"],
["1Mai4Qsm4gMVoG4smFSUDVarKqOeQLDSk","cô Mai Phương","thpt-qg","khac","","","2025-06-10"],
["1RefUzSnfUtdQnyaBT74NjVgtPO5EQTPZ","TRỌNG TÂM KIẾN THỨC ÔN THI TỐT NGHIỆP THPT","thpt-qg","bt","","","2025-06-09"],
["1TvH-8Vi8MssQHji782tRUxe3M3joY9oH","ĐỀ THI VÀO 10 NĂM 25-26 CHÍNH THỨC","thi-vao-10","de","","","2025-06-04"],
["1-FPnHY0zwZq955KlTIlnMqCaAq7sT8Rm","BÀI TẬP TĂNG CƯỜNG TIẾNG ANH 8 - GLOBAL SUCCESS","lop-8","bt","Global Success","","2025-06-03"],
["1iyjsJ6qBYncLoiVfiGEPpcEt_zqZCoFt","ĐỀ DỰ ĐOÁN ĐẶC BIỆT","thpt-qg","de","","","2025-06-02"],
["184oC8QjaRe1E7tG3xcckVB4lhzWd5ugU","ĐỀ TN THPT TIẾNG ANH 2025","thpt-qg","de","","","2025-05-28"],
["1f_pu7oOuA8PrMcepOK-Fb4pSRExSuBay","đề quảng ninh","thi-vao-10","de","","","2025-05-26"],
["1fz6jEUCWSf7QQJalSLA1lue1KB6dvaEv","Thi 10 - 25 ĐỀ THI THỬ VÀO 10 HÀ NỘI 2025 - hay","thi-vao-10","de","","","2025-05-26"],
["1kyT36-w0WbwHR28D6ICcKfJLc4uoqDvh","ÔN TẬP TUYỂN SINH VÀO 10","thi-vao-10","de","","","2025-05-26"],
["1huwWGTbwyzcON3tVTweQQpAdLHvQ0IPz","50 BỘ ĐỀ THI VÀO 10 THPT CHUYEN","thi-vao-10","de","","","2025-05-21"],
["1_hxJoyEQBoQzE09aIyYmmv3h9crx39BD","ĐỀ THI CUỐI HK2 TA12","lop-12","de","","","2025-05-20"],
["1iC5gKNaeFGtTXZ7jizOPK-JeupZiE6c6","25 đề thi thử TS lớp 10","thi-vao-10","de","","","2025-05-20"],
["1365K7wzs6Hi3i_34UE4U7JaQUE9gpTD-","10 VDEC 2025","thi-vao-10","khac","","","2025-05-14"],
["1AF-ZJqUu5ZTY86pbb-1wZhnJswRFcJuf","ĐỀ ÔN THI TỐT NGHIỆP THPT 2025-TRANG ANH","thpt-qg","de","","","2025-05-14"],
["1WawxhXKi6DoqBKMi7JnZH_83ho3oDGdE","TÀI LIỆU ÔN THI TỐT NGHIỆP MÔN TIẾNG ANH SPTH2025 NAM ĐỊNH WORD","thpt-qg","bt","","word","2025-05-14"],
["1xLX1_5idbAzb6hrDV_aJloQFBHKX8_Oy","BỘ ĐỀ LUYỆN THI VÀO LỚP 10 HN-HCM","thi-vao-10","de","","","2025-04-29"],
["1Ho_G7oNPNL1-VBH5O4rnr_sCG_nuytAl","BỘ 35 ĐỀ LÊN 10 - GV- Nghệ An","thi-vao-10","de","","","2025-04-21"],
["1VY57TpdaHkXYWPdC4mP0FOF8dy4m1ACC","22 đề vào 10 form 2025","thi-vao-10","de","","moi","2025-04-14"],
["1Nc-Kb4a85_tsG5G3SEWbLRJrT2jXbqM9","BỘ ĐỀ ÔN THI TN THPT CÔ MAI PHƯƠNG","thpt-qg","de","","","2025-04-11"],
["10hGk3deQOQ4zRPsgnlJvt2uuxUd2eGS6","Luyện Chuyên Sâu Ngữ Pháp Và Từ Vựng Tiếng Anh Lớp 4 - Tập 12 (Global Success)","lop-4","tv","Global Success","","2025-04-01"],
["1d8wZHgRwgKm89yljZDf0zwAMR0LH1NMr","BỘ ĐỀ MINH HỌA KỲ THI TN THPT 2025","thpt-qg","de","","","2025-03-19"],
["15cGHVf7ahMuHAm84cByrDHFuUuO_3oMc","ĐỀ CƯƠNG ÔN TẬP VÀO LỚP 10","thi-vao-10","de","","","2025-03-18"],
["1WMH6RaGtgP70Gk32mgkpC_UowuetfpEv","5 ĐỀ VỀ ĐÍCH - THI VÀO 10 HÀ NỘI","thi-vao-10","de","","","2025-03-17"],
["1hpXAmJgacWgTKj5HaWHpQkgKhXdcN4OH","De thi Cac mon","thpt-qg","khac","","","2025-03-13"],
["1vIHI0JADF4GIUwbnPcxxa8-uUz2W3WSp","ÔN THI 10 MÔN ANH PHẠM NGỌC TUẤN","thi-vao-10","bt","","","2025-03-12"],
["1cbevak_QmYSwgfszvFWaLmN8xr9onWCj","BỘ 50 ĐỀ THỰC CHIẾN ÔN THI VÀO 10","thi-vao-10","de","","","2025-03-06"],
["148RXZU-swmSUL8wQQthQhdSd78thOH1g","ĐỀ 1 - ĐỀ 22","thpt-qg","de","","","2025-03-01"],
["1AsP7UH6JUfu16woDoULPihaAlqSofDnr","ĐỀ CƯƠNG TA10 GIỮA HK2-GLOBAL-CÓ ĐÁP ÁN","lop-10","de","Global Success","da","2025-02-18"],
["16BJsqp0pLudYgPNIZcdlUaU1y51xjaf7","ÔN THI 10. PHẠM NGỌC TUẤN","thi-vao-10","bt","","","2025-02-12"],
["1-yzDwFjiCSgg2XDqwPNtaenlLxd9c_aw","15 đề NGUYỄN THỊ CHI","thi-vao-10","de","","","2025-02-11"],
["1T84aUE9x5PNO6gIbAFHgwXuH9BAmt6Qx","TỔNG ÔN 9.1","thi-vao-10","bt","","","2025-02-11"],
["1-4cmJUCSyPwih4IX-Nny7h_bRrFiRscz","Bài tập BIỂN BÁO có key","thi-vao-10","bt","","da","2025-02-10"],
["1G-9ynddR2FqpmJEg3ELR7pPEAa2NeXai","25 đề thi thử vào lớp 10 TA","thi-vao-10","de","","","2025-02-07"],
["1I5UyifgMLS5mKJOnYjXC2_RonR6e7U1p","ÔN THI VÀO 10 THEO PTNL","thi-vao-10","bt","","","2025-02-07"],
["1Z_zq0m180nAPPERz7Hc74-xZriLBcZdR","22 đề vào 10 form 2025 Hay chưa làm","thi-vao-10","de","","moi","2025-02-05"],
["16QicEBYONxOjIxYQ1H__SdecCIRQcIXC","50 ĐỀ ÔN VÀO 10 HÀ NỘI","lop-9","de","","","2025-01-22"],
["1aRGITtpWlFiplU_8Vd1KnBel_6gPhk2d","BỘ ĐỀ ÔN THI TỐT NGHIỆP THPT","thpt-qg","de","","","2025-01-22"],
["1-tpEqU-sLWFseHKDandfmCBeYFQyJ6cH","BỘ 8 CHUYÊN SÂU","lop-8","khac","","","2025-01-21"],
["19sg49FlPr_bfJbiWL8pdfaCzUTWMKHQL","50 ĐỀ ÔN VÀO 10 HÀ NỘI","thi-vao-10","de","","","2025-01-21"],
["1tkkZ5vT1tMlIp-2XwqzckK6CTt2YjHQf","CHINH PHỤC NGỮ PHÁP VÀ BÀI TẬP TA9 GLOBAL","lop-9","tv","Global Success","","2025-01-08"],
["1aWrumfIpuy1Gg5zERcNBpxxqk8xmW0eR","70 ĐỀ ĐÁNH GIÁ NĂNG LỰC 2022","dgnl","de","","","2025-01-06"],
["1IKujUJvRKnBAeZkbd4g2gjTQ6ZC7kpIh","ke-hoach-bai-day-tieng-anh-6-global-success 983","lop-6","khac","Global Success","","2025-01-01"],
["1Hls_8iFHCFt0zeC9o6flD1JkqQq4DKQt","BỘ ĐỀ PHÁT TRIỂN MINH HỌA MÔN TIẾNG ANH 2025 (MỚI NHẤT)","thpt-qg","de","","","2024-12-31"],
["1_rL3CuVDOUy8Yv1kBbDxQskEWKRUo5Bk","ĐỀ CƯƠNG ÔN TẬP CUỐI HK1 -TA9","lop-9","de","","","2024-12-30"],
["1wOZlmWw_G4bB6qBTVWdptzpik2o1XkCG","SGK ISS5- Ôn tập cuối HK1","lop-5","bt","","","2024-12-21"],
["1Hrkk5cWs8MwgscifqGvmJKypfkn34S1J","HƯỚNG DẪN THI VÀO 10.FORM HN 2025","thi-vao-10","khac","","","2024-12-17"],
["17nX0DTfkJZyW3w9lWO6GfxnohcFQ_aL6","BỘ CHUYÊN ĐỀ TIẾNG ANH BỒI DƯỠNG HỌC SINH GIỎI KV DUYÊN HẢI NĂM 2024 WORD","lop-12","hsg","","word","2024-12-11"],
["1VGmAmxD_u-iFvRmbGr2S3LJ1ufd_safM","Đề Kiểm Tra Global Success 9","lop-9","de","Global Success","","2024-11-19"],
["1DhsqQl-OuoY05H0RTjbQe9ely-uqGc66","BỘ 17 ĐỀ TNTHPT MÔN TIẾNG ANH THEO MẪU MỚI 2025 WORD","thpt-qg","de","","word","2024-11-13"],
["1HZxf0Apof7RHdemwcGrVplAZD2Ltke1X","BỘ ĐỀ PHÁT TRIỂN MINH HỌA 2025 (MỚI NHẤT)","thpt-qg","de","","","2024-11-12"],
["16vEQm1SzhirIdu9iUdj2zhq84_jbUIxs","Bộ đề + HDC Minh hoạ TS vào lớp 10 THPT","thi-vao-10","de","","","2024-11-11"],
["1BtZ1XF_2woXPYJ-du4Ja_HuwAW-EEota","Form 2025","thi-vao-10","khac","","moi","2024-11-06"],
["1OjrpOXsztSM83SL-eTHM8APhAVcbD6sf","ĐỀ PHÁT TRIỂN MINH HOẠ THPT 2025","thpt-qg","de","","","2024-11-06"],
["1sLa6S59LBWUw63cu1uZzcz3YQ6ENs0xz","Link tải đề 12 theo MH 2025 mới nhất","lop-12","de","","","2024-11-04"],
["1PGmLXZ-DZ5aS9c5LI72co-c9H5OIGUsa","Giáo án tiếng anh 9 Global 2 cột bản chuẩn","lop-9","ga","Global Success","","2024-10-21"],
["10lv--2TEBlfx_vm-E852a-wE9wtR-F5B","Friends plus TA9","lop-9","khac","Friends Plus","","2024-10-16"],
["1LNWbpcrDo_BDj3iYMBKfZW5WHFN61hNQ","BT PT NL E 9 CHIỀU LỚP( 24-25)","lop-9","bt","","","2024-10-12"],
["1i77tWCBz5nWXbUaNEl9OGN-Kf4gXSkpv","BỘ ĐỀ KIỂM TRA ĐỊNH KỲ TA9 GLOBAL","lop-9","de","Global Success","","2024-09-29"],
["1UnqV2WMNFgTdaSYUI11jPWwTLgnssJQ7","BTPTNL TA 9","lop-9","bt","","","2024-09-27"],
["1oTz7Oa-anqSQx6SKJfujjc_OChhb6RlQ","20 ĐỀ THI VÀO 10- Theo Form 2025","thi-vao-10","de","","moi","2024-09-26"],
["1XcjpjpCq5lTJuXiVkwbeegz3M40C3MUj","Bai tập anh 9 global","lop-9","khac","Global Success","","2024-09-12"],
["1t6ZISTsSTNmPi4LuaR9zJuITR--VUb_H","BÀI TẬP Bổ trợ tiếng anh lớp 9 GLOBAL cả năm có đáp án","lop-9","bt","Global Success","da","2024-09-12"],
["1yTgmTvRuHrouih55hzkoSRCRm2kHRlOw","ĐỀ KHẢO SÁT ĐẦU NĂM ANH 9 GLOBAL SUCCESS CÓ FILE NGHE ĐÁP ÁN","lop-9","nghe","Global Success","nghe,da","2024-09-11"],
["1wa2EFcqT5vJXs-nXUDnMXRgz9ji7InEF","Bài tập tiếng anh 9 Global trọn bộ cả năm","lop-9","bt","Global Success","","2024-09-10"],
["1SZ3quvNAMPBliAmbtazgOFdtm64Zur-n","GIÁO ÁN LỚP 5","lop-5","ga","","","2024-09-09"],
["1387_nSXcAGz3rWmYMmSsJiteAM3_2sEO","Giáo án 9 GS hai cột - đã sửa","lop-9","ga","Global Success","","2024-09-04"],
["14DdLF-Q048vUIcAWflv1-j3Rh4WVz5L0","GLOBAL SUCCESS 5 (TUẦN 4 TIẾT)","lop-5","khac","Global Success","","2024-09-04"],
["1LkdnvoPmFMwLcV_ZbgigEbEhetHK2qZ3","Hướng dẫn ôn thi TN THPT GDPT 2018 form 2025","thpt-qg","bt","","moi","2024-08-30"],
["1oH1skvVH-bRBV_z1DKJWP-feY3R7OwQH","BÀI TẬP PTNL GLOBAL LỚP 11","lop-11","bt","Global Success","","2024-08-29"],
["1xTChpcKQyM136l_bgKmxBTb-Fx2evddk","Than Toc ngu phap thi vao 10 BVV","thi-vao-10","tv","","","2024-08-29"],
["1uwLBgj8TQ3xAwjl5x2IHsC3hzrosi461","BT tiếng anh 12","lop-12","bt","","","2024-08-27"],
["11hnGFjrVE_6QsOcLHq9Y69xWbwO8BtV3","BÀI TẬP ANH 11- TRAN TRUONG THANH","lop-11","bt","","","2024-08-26"],
["1pNULEaI9VUwQF501iNmUSzD4SWLrCxME","Practice tiếng anh 11 I learn smart word","lop-11","khac","","word","2024-08-20"],
["175K_Y3TkdJtzZRPlkK68julR2_p0qe9X","BT 6 plus co dap an","lop-6","bt","","","2024-08-19"],
["1x-2wohJuA9IrOYflc13p4WgcfbxFBQQ1","Thi vào 10 24 25","thi-vao-10","khac","","","2024-08-19"],
["1KXdMPcHzk6It2zQoQrWmexrAOEngAPDo","Anh 9 global success CHINH PHỤC NGỮ PHÁP VÀ BÀI TẬP","lop-9","tv","Global Success","","2024-08-14"],
["1Lnn-Dv8Dy_shpAIEOXOw61VtJkoh-Sdm","BÀI GIẢNG LỜI GIẢI CHI TIẾT TA10 GLOBAL","lop-10","ppt","Global Success","da","2024-08-07"],
["1mVjzP4YZHo6GzZF36KHwX08ak18Jg0RD","HÁT TRIỂN NĂNG LỰC TA9","lop-9","khac","","","2024-08-07"],
["1J9YCY2KjiMvA4_HXGmeyiruOx5fEUL3l","HỌC TỐT","lop-10","khac","","","2024-08-05"],
["1rlW3kCd-8KY_dZnnzdQdaf6C4xsVSAwt","BÀI TẬP TĂNG CƯỜNG-ĐỀ KIỂM TRA TA9 GLOBAL","lop-9","de","Global Success","","2024-07-30"],
["1FrRaP2Fv9Gx6YSoL1_niYXoKLXtI1DmV","Tiếng Anh 11 Friends Global- Đề kiểm tra nâng cao","lop-11","khac","Global Success","","2024-07-29"],
["1r_9uAz7w7m95qOpeHl1nOlOuDE6xWcsM","ĐỀ LUYỆN TẬP FORM MỚI","lop-12","de","","","2024-07-25"],
["15olyQyBrGjrp0gCTjxPa4-ZQL8KqR7mq","Bài tập Anh 8 Global Siêu Hay","lop-8","bt","Global Success","","2024-07-24"],
["1f6_iBmEUewGVx-smS7s-OdRRqkrV66Xg","BỘ ĐỀ KT (THANH LY)","lop-11","de","","","2024-07-22"],
["10lehbkXwTrkp-2Go0O3uGpQvt1Axzvyh","TỪ VỰNG NGỮ PHÁP BÀI TẬP LÀM THÊM TIẾNG ANH 5","lop-5","tv","","","2024-07-21"],
["1YaOuk7J1pBo9XoAmAb8TGKcd1BEO86VM","Chuyên đề luyện thi Bùi Văn Vinh","thi-vao-10","de","","","2024-07-21"],
["18ZJka3lXeb70ako1vGHoDpwVlOOuucze","LỚP 8.MLH-HTU","lop-8","khac","","","2024-07-14"],
["16fd69D3Oz5lvSX6_PVCUcKV-cfIvobrk","MLH HTU 6","lop-6","khac","","","2024-07-09"],
["1mmvx1V5mvDvk0sYbZR2RKT3eYR9JFiuf","Hk1-Wonderful World TA5","lop-5","khac","","","2024-07-08"],
["1G-maElF_esIM7FNjUWxM09tuA_X1yrdN","ÔN TẬP HÈ TIẾNG ANH 6 GLOBAL SUCCESS","lop-6","bt","Global Success","","2024-06-25"],
["1pVJ44R69hrmw4wr2_YmQk8tNIG-CA0Oj","Bài tập global success 12 - bổ trợ thi tốt nghiệp THPT 2025","lop-12","bt","Global Success","","2024-06-25"],
["17icVc8e_0eSIF_s_G6G8_b1Xgp1ZoQEO","Bộ 20 đề dự đoán cô MP 2024","thpt-qg","de","","","2024-06-24"],
["18FR2qW-dkeBCvC5IHOYsmoGgo46ud1Pu","BÀI TẬP ÔN HÈ TIẾNG ANH 7 GLOBAL SUCCESS","lop-7","bt","Global Success","","2024-06-24"],
["1VjpsddSZYiCin380v4IYGw8ZuJ4XFFhD","Ngữ pháp & Bài tập","lop-6","tv","","","2024-06-18"],
["1H9jjVrNGGWj-jFaoSSJhYd-oM4XVB4AX","Bài tập Anh 11 Global success HXH","lop-11","bt","Global Success","","2024-06-17"],
["1HIuUgJtMri0EYxO-fpPW538AE-7vufef","BÀI TẬP BỔ TRỢ GLOBAL 5-HK1-NHÃ ĐAN","lop-5","bt","","","2024-06-17"],
["1nW2ZmE1DFsLC27TN5JgCfWGthN-Hoow_","20 đề ôn TN","thpt-qg","de","","","2024-06-06"],
["15ddZ6NH-yUQ5IIU8ee6a0a03tkInNvvw","Bài tập Từ vựng tiếng anh 9 Global Success","lop-9","tv","Global Success","","2024-05-29"],
["1RxekN5B5Je1Q44qsR-jBiYW4HT6hKEtI","SPEAKING ENGLISH 6","lop-6","khac","","","2024-05-28"],
["1ZuBnEk0xGSJp6AkEj9H7C9a08cmoGt1A","SPEAKING ENGLISH 7","lop-7","khac","","","2024-05-28"],
["1VlYcNJlTT-lJKOVJeVW-WpslCoyzcvNr","BỘ ĐỀ TUYỆT MẬT TN THPT MÔN TIẾNG ANH NĂM 2024 có lời giải chi tiết đề","thpt-qg","de","","da","2024-05-22"],
["1C8IqIdUIcYYNCHj5mxj2PDQMs5ECq6Qh","Bộ đề đề xuất Tiếng Anh 12 Bình Thuận","thpt-qg","de","","","2024-05-21"],
["1iwAv6YP9Wz3-jvL4fODuXTpRvxo3zgJY","ĐỀ THI THỬ TN THPT 2024 CÁC SỞ - TRƯỜNG","thpt-qg","de","","","2024-05-17"],
["1xfYD8KDGTw72nTHinGnxYIZO-WVXUzvv","ĐỀ THI THỬ TN THPT 2024 CÁC SỞ - TRƯỜNG","thpt-qg","de","","","2024-05-17"],
["1ZgKKA7eIA8ZAylMGZHBqnvyJ2SgmVVEi","12 ĐỀ ÔN THI VÀO 10 CHUNG","thi-vao-10","de","","","2024-05-16"],
["1egNNQPTU9quJmuEjmyFQwgy4m3hCl2GS","BÀI TẬP LÀM THÊM TA9 GLOBAL HK1","lop-9","bt","Global Success","","2024-05-14"],
["1lcky86OX_N-LtDlNJ_4mbQjZUAafvH5C","BÀI TẬP TỪ VỰNG TA12 HK1","lop-12","tv","","","2024-05-14"],
["1vivgueC9QAJcs2PcQKtPx7rFFaD02TvI","CUỐI KÌ 2 E10","lop-10","khac","","","2024-05-14"],
["1Zs_t4uJBYi9_tdTrfrU4Xm8fM4htDYNH","CUỐI KÌ 2","lop-11","khac","","","2024-05-13"],
["1aT_pF7ib9Dljq07lYeVIikli5IXXA-pP","TS 10 - 407 câu trắc nghiệm - HCM - Anh Đinh","thi-vao-10","khac","","","2024-05-13"],
["1mkPxxYbdrh0lIsIPca_BttAl5XKLJ-0X","BAI TAP DAY THEM 6 GLOBAL","lop-6","khac","Global Success","","2024-05-13"],
["14aTEhBMSIjCOFGP9kXHEeh7tn5zg7CeU","ÔN VÀO 10 THÀNH PHỐ HỒ CHÍ MINH","thi-vao-10","bt","","","2024-05-09"],
["1pWUtpaAXzkek4ohKggIc_vhf1cybSeZQ","Đề HN 2024 - 2025","thi-vao-10","de","","","2024-05-09"],
["1gXzUapkTUz-geRW16DBw1EV7efgnAk4v","150 ĐỀ Tiếng anh thi vào 10 FORM HÀ NỘI Trắc Nghiệm 40 CÂU","thi-vao-10","de","","","2024-05-05"],
["1uPl61DuC5G4WM5x8ObOgElRCjWm07fP-","Bộ đề ôn then chốt file word +key","thi-vao-10","de","","da,word","2024-04-22"],
["1W2lozYz1nxGS8H_3pdcd0rfFkheKeO2-","TA 3","lop-3","khac","","","2024-03-30"],
["1l8n5A7oNqhVqKzVBTt0NHGJ2D9ZdeSA_","GA Anh 4","lop-4","ga","","","2024-03-30"],
["1HGG9WaF5ftj8bQwuMVjyAoJIMv0GJvFn","ĐỀ ÔN BÁM SÁT MINH HỌA","thpt-qg","de","","","2024-03-26"],
["1IP7n_6q6YTeT5RhHxmnLUM4bjlWQsiUv","40 BT Tiếng Anh K5","lop-5","bt","","","2024-03-21"],
["1xdWnS2SIdGDhoDB-yxo2j9vJfqxzxno0","Đề cương -TA11 ISW","lop-8","de","i-Learn Smart World","","2024-03-19"],
["1s-6bjLnh_SVEAVFwl3gCmlNj189zE51w","BÀI TẬP LUYÊN NGHE TA8 GLOBAL GIỮA HK2","lop-8","nghe","Global Success","nghe","2024-03-11"],
["1GszVhQCCbcOfq_gjpW750epJH3eBMWxF","ĐỀ THI THỬ TỐT NGHIỆP THPT Môn Anh 2024","thpt-qg","de","","","2024-02-29"],
["1eFQ7p3VMK_gNmDW9FCCiZc4Nf1Vuh_oj","ĐỀ CƯƠNG ÔN TẬP GIỮA HK2 TA8 SMART WORLD","lop-8","de","i-Learn Smart World","","2024-02-26"],
["1U5-gn_yM3T9Xom33b1KMvJBNAktrRVcB","5 ĐỀ LUYỆN THI TA10","thi-vao-10","de","","","2024-02-23"],
["1jhdblEL6kIM2x0tA3zNAU_wvRI_LdHj5","BỘ 52 ĐỀ THI TUYỂN SINH CÍNH THỨC VÀO 10 TIẾNG ANH 2023-2024 WORD","lop-9","de","","word","2024-02-21"],
["1LBzrsy0K0CkY9EeGx8hIrVt5GfyshdPI","Học tốt TA","lop-11","khac","","","2024-02-20"],
["1FefRBbRLqffFU5euo3S8qVIi0af73KEj","BÀI TẬP ÔN THI TỐT NGHIỆP THPT THEO TUẦN","thpt-qg","bt","","","2024-02-16"],
["1KuSjQbSWuBzVdvQni56spziURR1szOSv","ĐỀ KIỂM TRA TA 11","lop-11","de","","","2024-01-30"],
["1V1fDqTz2xpfVSCaMf8rpyy_qfEnqy4Tf","Bài tập anh 4 cả năm","lop-4","bt","","","2024-01-23"],
["1xsiakyZ9ml7XMhTKzib7drvwd7ERxylx","NGỮ PHÁP & BÀI TẬP","lop-8","tv","","","2024-01-23"],
["1Vn0TuouvNMqzEmiqhI9ONW8JFR4v7bLn","ĐỀ KIỂM TRA TIẾNG ANH 11 I LEARN SMART WORLD CUỐI HỌC KÌ 2","lop-11","de","i-Learn Smart World","","2024-01-10"],
["1-FN_WNEu3-KGam3Sz32O4QCawhKteVRy","Bài tập bổ trợ học kì 2 Anh 4 global có file nghe siêu hay","lop-4","nghe","Global Success","nghe","2024-01-09"],
["1Es3pzJdwlHLm76mPBIIg-r1450dx3xGM","Học tốt TA 11 Global","lop-11","khac","Global Success","","2024-01-08"],
["12EW8_b3Vlfit8fzNc7ALPkNlKmbMz2dr","BỒI DƯỠNG TIẾNG ANH SMART WORLD 7","lop-7","hsg","i-Learn Smart World","","2023-12-26"],
["1fI_zaKVskSglDYWBb6Nojtg18lhwSd64","Bài tập bổ trợ global success 4","lop-4","bt","Global Success","","2023-12-25"],
["1ugZChw3AaIOM0xHJ8VFYy6XTXQpnjm6X","Giao an 10 Thuận 22-23","lop-10","ga","","","2023-12-25"],
["1AsErJE1trY_UyvzfzErEKf-6INAVo9pU","TEST DISCOVERY 4","lop-4","de","","","2023-12-20"],
["1Rw4fFIXqTgqloNeYBOUOzgSdJhhQssUy","MINDMAP TA4 GLOBAL-chuyenanhvan.com","lop-7","khac","Global Success","","2023-12-12"],
["1-u9ATXmi0zAp9GCdMELanYCMlch5X-_X","Bt Anh 4 Global nâng cao","lop-4","bt","Global Success","","2023-12-08"],
["1DNz8fA-THnojrJG_QisXMCyaFAbpSuE5","ISW 8 ĐỀ CƯƠNG và BÀI ÔN TẬP","lop-8","de","i-Learn Smart World","","2023-12-07"],
["1r_xMpMXs5I9hH5BJYQq44VbCoKGsq95B","Bài Tập Tiếng Anh Global Success 8 Cơ Bản Và Chuyên Sâu","lop-8","bt","Global Success","","2023-12-06"],
["1piFL8-KlZp6gtW7KjAQw9x7SBY7OgO9Y","Bài tập đọc hiểu tiếng anh 8 Global có đáp án","lop-8","tv","Global Success","da","2023-12-05"],
["1CXQH6zVB2KZNSQUlqUSfqOaHpxIwFiF_","20 Đề vào 10 form Hải Phòng","lop-9","de","","","2023-11-16"],
["1b0XhfuV5CaL1ImcAcpu_eLqm4Qqtiwft","THI VÀO 10- ( DÀNH CHO HỌC SINH) ÔN LUYỆN THEO HƯỚNG ỨNG DỤNG THỰC TẾ DÀNH CHO HS","lop-9","bt","","","2023-11-09"],
["1wM0AcaKTFRaJG975sIP0CpMvbKXq7oOM","Bộ đề kiểm tra định kỳ","lop-8","khac","","","2023-11-02"],
["1n95lv5oQ18xpviNLuHSe6KJ1HCH8HFBR","BT Cung co TA 8 Global","lop-8","bt","Global Success","","2023-10-31"],
["1T2w6o6I7BAG8iyyOk0ZvBUuMRIWkIuvy","BT BT Friends Global 11","lop-11","bt","Global Success","","2023-10-13"],
["1wA7Z70N1xKbp8Sr5b42pCKPKcNQ_ykgw","Bài tập bổ trợ nâng cao tiếng anh Global success 11 kì 1 có đáp án","lop-11","bt","Global Success","da","2023-10-04"],
["1veQBUHIlOfSwRSq-u6MUFC3X4uH6aGAs","BÀI TẬP BỔ TRỢ TA11 SMART WORLD CÓ FILE NGHE","lop-11","nghe","i-Learn Smart World","nghe","2023-10-02"],
["10oppU0pk_jnZNjZ4cSpPEYLceDFiHTl5","Lưu Hoằng Trí - Global success 10","lop-10","khac","Global Success","","2023-09-20"],
["1m8u5Ymf-WVilmeWj4FXFavXZmuZMlnDW","BÀI TẬP WORD FORM TA8 FRIENDS PLUS","lop-8","bt","Friends Plus","word","2023-08-29"],
["1pJNunYwOuJbfWjEi-WoVAr0mmD24DYIS","BÀI TẬP THỰC HÀNH TIẾNG ANH 11 GLOBAL","lop-11","bt","Global Success","","2023-08-23"],
["1QczXQiDW0gXlu1GKrWJZEHxs2GX6NijI","BÀI TẬP THỰC HÀNH TA8 GLOBAL","lop-8","bt","Global Success","","2023-08-20"],
["1WfUC2soIjmM0-tigCy31ow2DocT6Z5lS","E4 NEW HK1 2 COT 4 TIET-MH","lop-4","khac","","","2023-08-16"],
["1WsflhZ0GtGJcmYEUJvMjfyctrGrBjTi2","TRỌN GÓI TEST GLOBAL 8 HK1 23-24","lop-8","de","Global Success","","2023-08-07"],
["1E8yl-P5RopDRZZKld0-F46cKEr0u3EGG","GIAO AN GLOBAL 3 AG 1COT 22-23","lop-3","ga","Global Success","","2023-01-04"],
["1Q1EwR1ONSwSS2Nh7uIhJ_QjHFZ4t4apx","Cung co va on luyen anh 9","lop-9","khac","","","2023-01-04"],
["1Ta6KPTavhqslmmvyKDwj3u4kxuRqao8H","Bộ đề kiểm tra Tiếng Anh 7 - Tập 2 (Nguyễn Thị Thu Huế)","lop-7","de","","","2023-01-04"],
["1MAyEr9o3RhmNKIXt1Qa3oewlhNQOyhbq","Bài tập bổ trợ Anh 10 Global có file nghe và đáp án HK 2 (cập nhật)","lop-7","nghe","Global Success","nghe,da","2023-01-03"],
["16FPKEA-5KUSxcPYzF0oC4LOmulJnh0W7","Chinh phục đề thị vào 10 chuyên khối chuyên Anh","thi-vao-10","hsg","","","2023-01-02"],
["1DeieXUCxfPWx8iAbHqdzmhC6mQaaNRsA","Bài tập bổ trợ tiếng anh 7 Global đủ ngữ pháp, word fom, phát âm, bài tập thực hành","lop-7","tv","Global Success","word","2023-01-02"],
["1o-dd8vwkjLapH_1NJdYAwU0TjPe_MzJ4","Bài tập tiếng anh 6 - Vũ Thị Phượng (Word)","lop-6","bt","","word","2023-01-02"],
["1JFjwhKXdymSsGYHaZuV9P-zWVnzuhjus","Bt bo tro anh 7 global co dap an","lop-7","bt","Global Success","","2022-12-30"],
["1-7mkJHfxgHQcQrQXOayWLuFGg9mG8iYi","Đề kiểm tra tiếng anh 7 giữa kì có ma trận","lop-7","de","","","2022-12-26"],
["1-GxiK8PYokFDyNfiF7B4WqUSeEBmUDQj","Đề kiểm tra anh 7 Global Cuối HK 1 có ma trận","lop-7","de","Global Success","","2022-12-26"],
["18bPFEjL07IxDVbdHTHCgLWflV6LtHWoA","Đề kiểm tra anh 10 iSW có file nghe và đáp án học kì 1","lop-10","nghe","i-Learn Smart World","nghe,da","2022-12-26"],
["1D8yOcM5Ew00RFCdAFQfd_dYIeojqxQVY","10 ĐỀ WORD FILE NGHE 6","lop-6","nghe","","nghe,word","2022-12-23"],
["1BMOnE0ryFb8_IiD-w_tlY6TdPX81VL2k","Đề thi học kì anh 3 Smart Start","lop-3","de","i-Learn Smart Start","","2022-12-18"],
["1Yqn86U1hBxiBN3Of2rGU6Re0VBJfsV-4","Bài tập bổ trợ SW 7 cả năm có fiel nghe và đáp án","lop-7","nghe","i-Learn Smart World","nghe,da","2022-12-18"],
["1Xy4k2QWbaBqi3zJPBxsQ77WpavUyKY3X","Bai tập bổ trợ ILSW 10","lop-7","khac","i-Learn Smart World","","2022-12-05"],
["1RgGBziF7PKuGi5pTfEwBU3Iax5-EFWJB","Thi tieng anh 7 ILSW HK 1","lop-7","khac","i-Learn Smart World","","2022-12-01"],
["117AvExQqlOTvoOFAS24c0SU7owcBfpIH","GTBDHSG VÀ CHUYÊN ANH 2025","thi-vao-10","hsg","","","2022-11-29"],
["1ZLzICdjV1UvbrBtosTlY2YoOZf3wl7Q-","Đề thi anh 7 Global cả năm","lop-7","de","Global Success","","2022-11-29"],
["1vAfZRpFXaCIhwlDFMFnK1V92XveXuQhm","ĐỀ THI HK1 TA6 CÓ FILE NGHE-chuyenanhvan.com","lop-6","nghe","","nghe","2022-11-29"],
["1NA9wn_oqGboI2XjsvqZFbX0PiQNp7tUq","Giáo án","lop-1","ga","","","2022-11-28"],
["1D0uf5NWJHNsvc0ZMN-cORlhrzCCHOOaM","Đề Ôn tập học kì anh 10","lop-10","de","","","2022-11-27"],
["1pscQNrTBIcgvVjSgQuuJcjg2WcMIfrUE","BTBT UNIT 1-12 GLOBAL 6","lop-6","bt","Global Success","","2022-11-11"],
["1rrxQIm8ScTr60sGiM2R-f1LXmTUoGb68","Đề kiểm tra anh 10 Global tự soạn","lop-10","de","Global Success","","2022-11-04"],
["1njA7KzSFNUwMRW9X-n7twawnpz7PEqkN","Bài giảng trình chiếu Tiếng anh 6 i-Learn Smart World","lop-6","ppt","i-Learn Smart World","","2022-11-02"],
["1CDJvS3RIr601ByH-t78ubeSt7UgFstJJ","ĐỀ HK ANH 7 GLOBAL","lop-7","de","Global Success","","2022-10-14"],
["1tiaLFVSyQ5Xnp8DGfA5nIM6kkinXZo93","Anh 7 Practice test","lop-7","de","","","2022-10-13"],
["1VNuGA06mlSwTEpBOEZZUDpjycESNucIH","Em giỏi tiếng anh 7 tập 1","lop-7","khac","","","2022-10-12"],
["1v68hFoLK8UAIuPsmym5S9nBVVVG1RIiu","Từ vựng ngữ pháp Bt thực hành anh 9 thí điểm","lop-9","tv","","","2022-10-06"],
["11hz9NdzzcdjcT_oXUc_I-qzfkOYMVUwO","Bài tập Thưc hành MLH 8","lop-8","bt","","","2022-10-05"],
["1EZYW2HNX2MT6WptW2iRn8uxjNSzOnNCJ","Bài tập Thực Hành MLH","lop-9","bt","","","2022-10-05"],
["19A-K7BVCqg5BO01pg_-B_0JbbzPEOT1K","Đề kiểm tra định kì theo unit anh 10 smart world có đáp án 10 Units","lop-10","de","i-Learn Smart World","da","2022-10-04"],
["1ObTGi5lCoFpgYshDsuRvx4-284jjPsao","Lam chu Tieng anh 6 Global success","lop-6","khac","Global Success","","2022-10-04"],
["1NpK7vugit0aCLOTGlgzANHKUjjfr_sCi","Bài tập bổ trợ Anh 7 Global Bùi Văn Vinh có key","lop-7","bt","Global Success","da","2022-09-29"],
["11rNV5RbZappHoJr6UUhHL5oeVYMTh0l3","bai tap MLH 12","lop-12","khac","","","2022-09-27"],
["1zgDv9IRhYXVf3oUvjZ_BUvvB_rv8u_9N","ĐỀ ÔN LUYỆN NGỮ PHÁP TIẾNG ANH MỚI - LỚP 9","lop-9","de","","","2022-09-27"],
["119aymt0gOJsWmv2cPPxZdFWRR40E69Wk","TA 10 Friends Global Bài kiểm tra tham khảo giữa học kỳ 1","lop-10","de","Global Success","","2022-09-26"],
["1FfJYCS-QDferfYjrHnMTchZ3K1RDuRUd","Bài đăng bộ sách ôn thi vào 10","thi-vao-10","bt","","","2022-09-24"],
["1eF9UYv605iNX9F7zNThB9z3GI457Ii0W","Bộ sách ôn thi vào 10","thi-vao-10","bt","","","2022-09-24"],
["1-HbkYcmQoP3cmTRWj5wAWmp8TSRyKvJX","Bộ đề kiểm tra tiếng anh 10 Global success có đáp án kì 1","lop-10","de","Global Success","da","2022-09-22"],
["12J063B2MbVvcvun5_W2YbfmBksMsT-PU","Bài tập bổ trợ anh 2 global","lop-2","bt","Global Success","","2022-09-22"],
["1XYq-2YSZ45uZDMamPVWU7LmdpMI88MdZ","PRACTICE GLOBAL 6 2022","lop-6","khac","Global Success","","2022-09-21"],
["1rqio12I1F1xHi9dq20EvOTseBgHW_vxm","Lý thuyết Từ vựng Ngữ pháp Anh 7 Smart World","lop-7","tv","i-Learn Smart World","","2022-09-21"],
["1qhVIJqNjYMGtlwdp21XukV7mBAvJIJ9f","Tiếng anh 5 lên 6 BÙi văn Vinh","lop-6","khac","","","2022-09-19"],
["1EI-r9dOJLmFnmQfmpuRmmI89Rbb2V52h","TÀI LIỆU DẠY THÊM 10 GLOBAL SUCCESS","lop-10","khac","Global Success","","2022-09-18"],
["1qyYP5CLOhtDzRyF1Oyxh-hSDwP5K0Fxr","Ngu pháp và bài tập thực hành","lop-7","bt","","","2022-09-16"],
["1-5VvYKY0ewpwCrM2OsYKpBfaHNgXOfxd","Mind map tiếng anh 5 BGD bản đẹp","lop-5","tv","","","2022-09-13"],
["1MZOzamKypiNporo41FwlboPCb379J1E8","GA Anh 2 Global","lop-2","ga","Global Success","","2022-09-13"],
["1cKn37GLhfp3bgmREPID0RIZgdgmFTjun","Đề kiểm tra Tiếng anh 7 Global Success có key","lop-7","de","Global Success","da","2022-09-13"],
["1WVCz13m1I28Cs0OmidjyxN7Fpq6CzRHK","TA7 RO Tests HK1","lop-7","de","","","2022-09-09"],
["1gpS8YFnnnkOGMU7KlcWeuGPND9BqSgQU","BÀI TẬP BỔ TRỢ TA10 SMART WORLD","lop-10","bt","i-Learn Smart World","","2022-09-07"],
["17z3Zu8M2a3GLbdApDgMxo8chZ59v3rUm","Ma trận-Đề Kiểm tra cuối HK1-E6-Global (2022-2023)","lop-6","de","Global Success","","2022-09-06"],
["1S4cUE4k8MaT0jO25U0EwcRjhHZ0nuDl3","Ma trận-Đề Kiểm tra cuối HK2-E6-Global (2022-2023)","lop-6","de","Global Success","","2022-09-06"],
["1F5sO2OlyToKVIMWUafjA_pKMV0ysaWm_","Luyên chuyên sâu từ vựng và bài tập anh 7 Global tập 2","lop-7","tv","Global Success","","2022-09-05"],
["1LDxM8O4ZsKL7kOSK9yMJdZnbG1wjuz6v","Tiếng anh 6 Friends Plus Sample tests Unit123","lop-6","de","Friends Plus","","2022-09-05"],
["1g2bieJgB3i_rgaeBvAX05kdSHm6CH5X1","Anh 10 Global","lop-10","khac","Global Success","","2022-08-30"],
["1DQDB9E6P3ARvs9jtthYFT1g79BSNEhCQ","Bộ sách bài tập bổ trợ friend flus","lop-7","bt","","","2022-08-28"],
["17hu4-pY5KaVT7Jbiot-GNtxHgx-ge7LI","Anh 3 Discovery","lop-3","khac","","","2022-08-23"],
["1epKA_VKG7iPDaNLSFwe-erNVSb9zFjMZ","GIẢI THÍCH TỪ VỰNG B2-C1","ky-nang","tv","","da",""],
["1tgj_hnI71t9xuptL-IBTyM75kI-cozBl","Powerpoint các chủ đề và chủ điểm ngữ pháp tiểu học","ky-nang","ppt","","ppt",""],
["16UtE2fsXtIVl6lWEWYZfuVnNEuCVvH8v","VIẾT LẠI CÂU ÔN HSG TA10-11-12","hsg","hsg","","",""],
["1T4u7I_rEzkifteD7-LFHm9pDZeLM9-_C","PRACTICE LISTENING","luyen-nghe","nghe","","nghe",""],
["1haOFFNxno6Ui4N-CzKGxyG0yBSDx1B5o","KẾ HOẠCH DẠY HỌC TÍCH HỢP NLS 345 ILSW","giao-vien","ga","i-Learn Smart World","",""],
["1B5XaehUxYi9HY0JcpCbKtZbUcMHdK3AL","PPT ÔN TẬP GIỮA HK1 - TA6789","giao-vien","ppt","","ppt",""],
["1_IzZ65L4p0oevCtOhz07exhd1cM4dGsC","KHGD TIẾNG ANH 6 7 8 9 NĂM HỌC 2025 2026 WORD","giao-vien","ga","","word,moi",""],
["1qFafsphbUdsgzH4MhKmcs25kPqPJyZKm","LUYỆN KỸ NĂNG NGHE IELTS FCE","ielts","nghe","","nghe",""],
["1XM780xvGjcg-6dkxKXjcNCHYKx539t47","B1+ LISTENING EXERCISES","luyen-nghe","nghe","","nghe",""],
["1uEStSXKPM_MQq5bWCckNGkRJTebZlh8z","A2 LISTENING EXERCISES","luyen-nghe","nghe","","nghe",""],
["1XZR9-6dsNNVMPJYhgdf_xreleJyg2DJc","ĐỀ ÔN THI VÀO LỚP 6 CHẤT LƯỢNG CAO","thi-vao-6","de","","",""],
["11ajT5j5LkTmDKOWY8dI64UuLylBWGFlg","Đánh Giá Năng Lực ĐHQG Hà Nội HSA năm 2025 -2024","dgnl","khac","","",""],
["1Fh_fO3KJFVqHMKO3ezFy49P0IodmsDht","Đề cương ôn tập","ky-nang","de","","",""],
["1Dj6sBDL7lJG_r1I_lKUUWBqmZ7kFYCpi","SLIDE TRÒ CHƠI TƯƠNG TÁC HỌC SINH","giao-vien","ppt","","",""],
["1DpNWbDOCcTHf9Dnlxcjps1-5iit5xlEI","ĐỀ ÔN THI VÀO 10-2024 THANH HOA","thi-vao-10","de","","",""],
["1t48EMwaa7RfYYiPsjOYyVX43hjE3x67g","PPT DẠY PHÁT ÂM","ky-nang","ppt","","ppt",""],
["1sYvB-Dihs6hufeTSxMwEf8aF1xQdtn1F","Anh 7 SW CUOI KY 1- CO NGHE","lop-7","nghe","i-Learn Smart World","nghe",""],
["16Solc07pCaw5xVeZ3seGpNZmpBrsvoqZ","5 CHUYÊN ĐỀ NGỮ PHÁP (LÝ THUYẾT BÀI TẬP)","ky-nang","de","","",""],
["1QiiPo6YqeQWjhbIHQ6VXMWvnNn8N3cKN","Giai thich ngu phap tieng anh","ky-nang","tv","","",""],
["1qaHbTfL595AU3NqQINLZn23aoWeXayv9","LUYỆN ĐỀ HS GIOI VA HS NANG KHIEU 6789","hsg","hsg","","",""]];
/* ============================ HẾT PHẦN CẦN SỬA ============================ */

const NEW_DAYS = 45;
// Mục là 1 tệp (cờ "file") thì mở tệp, còn lại mở thư mục
function driveLink(id, f) { return (f || []).includes("file") ? "https://drive.google.com/file/d/" + id + "/view" : "https://drive.google.com/drive/folders/" + id; }
const DOCS = RAW.map(([id, title, cat, type, series, flags, date]) => {
  const f = flags ? flags.split(",") : [];
  return { id, title, cat, type, series, flags: f, date,
    isNew: !!date && (Date.now() - new Date(date)) / 864e5 <= NEW_DAYS,
    link: driveLink(id, f) };
});

const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d");
const fmt = n => n.toLocaleString("vi-VN") + "đ";
const state = { q: "", type: "all", series: "all" };

/* ---------- Danh mục ---------- */
const LEVELS = [
  { name: "Tiểu học", grades: [1,2,3,4,5], color: "#ffe9dc" },
  { name: "THCS", grades: [6,7,8,9], color: "#e1efff" },
  { name: "THPT", grades: [10,11,12], color: "#e3f6ec" }
];
function catInfo(key) {
  const m = /^lop-(\d+)$/.exec(key);
  if (m) {
    const g = +m[1], lv = LEVELS.find(l => l.grades.includes(g));
    return { key, name: "Tiếng Anh lớp " + g, short: "Lớp " + g, icon: "✏️", color: lv.color, group: lv.name,
             desc: "Sách giáo khoa, sách bài tập, file nghe, đề kiểm tra và giáo án Tiếng Anh lớp " + g + " theo các bộ sách mới." };
  }
  const e = EXAMS.find(x => x.key === key);
  return e ? { ...e, short: e.name, group: "Chứng chỉ & kỳ thi" } : null;
}
const count = key => DOCS.filter(d => d.cat === key).length;
const EXAMS_ON = EXAMS.filter(e => count(e.key) > 0);
const SCHOOL = ["Tiểu học", "THCS", "THPT"];
function audience(d) {
  if (d.type === "ga" || d.type === "ppt" || d.type === "game" || d.cat === "giao-vien" || d.cat === "game-day-hoc") return "giáo viên Tiếng Anh cần tài liệu soạn giảng";
  const m = /^lop-(\d+)$/.exec(d.cat);
  if (m) { const g = +m[1]; return g <= 5 ? "học sinh tiểu học, phụ huynh kèm con học ở nhà và giáo viên" : `học sinh lớp ${g} tự ôn luyện, giáo viên và phụ huynh`; }
  return { "thi-vao-10": "học sinh lớp 9 ôn thi tuyển sinh vào lớp 10", "thpt-qg": "học sinh lớp 12 ôn thi tốt nghiệp THPT", "hsg": "học sinh khá giỏi, đội tuyển HSG và giáo viên bồi dưỡng",
    "thi-vao-6": "học sinh lớp 5 ôn thi vào lớp 6", "dgnl": "học sinh ôn thi đánh giá năng lực", "luyen-nghe": "người học muốn cải thiện kỹ năng nghe" }[d.cat] || "học sinh, giáo viên và người tự học";
}
function shortOf(d) {
  const t = TYPES[d.type] || TYPES.khac, c = catInfo(d.cat) || {};
  const bits = [t.long + (c.key?.startsWith("lop-") ? " lớp " + c.key.slice(4) : " – " + c.short)];
  if (d.series) bits.push("bộ " + d.series);
  const extra = d.flags.filter(f => f === "nghe" || f === "da").map(f => f === "nghe" ? "có file nghe" : "có đáp án");
  return bits.join(", ") + (extra.length ? " — " + extra.join(", ") : "") + ".";
}
function introOf(d) {
  const t = TYPES[d.type] || TYPES.khac, c = catInfo(d.cat) || {};
  return `<p><b>${esc(d.title)}</b> là ${esc(t.long[0].toLowerCase() + t.long.slice(1))} thuộc mục <b>${esc(c.name)}</b>${d.series ? `, bám theo bộ sách <b>${esc(d.series)}</b>` : ""}.</p>
    <p><b>Phù hợp:</b> ${esc(audience(d))}.</p>
    <p>Tài liệu lưu trên Google Drive: bấm tải để mở thư mục, xem trước từng tệp hoặc tải cả thư mục (nút <i>Tải xuống</i> góc trên bên phải của Drive).</p>`;
}

/* ---------- Header / footer ---------- */
$("#logoName").textContent = CONFIG.siteName;
$("#nav").innerHTML = `<a href="/#">Trang chủ</a><a href="/#cac-lop">Lớp 1–12</a><a href="/#chung-chi">Chứng chỉ</a><a href="/#thi-vao-10">Thi vào 10</a><a href="/#thpt-qg">Thi THPT</a><a href="/#dgnl">ĐGNL</a><a href="/#game-day-hoc">Game</a><a href="/#giao-vien">Giáo viên</a>`;
$("#hdDonate").onclick = () => openDonate();
$("#foot").innerHTML = `
  <div><h4>${esc(CONFIG.siteName)}</h4><p style="margin:0 0 8px">${esc(CONFIG.footer)}</p><p style="margin:0">Báo link hỏng / xin tài liệu: <b style="color:#fff">${esc(CONFIG.contact)}</b></p></div>
  <div><h4>Theo lớp</h4>${LEVELS.map(l => `<a href="/#lop-${l.grades[0]}">${l.name} (lớp ${l.grades[0]}–${l.grades.at(-1)})</a>`).join("")}</div>
  <div><h4>Chứng chỉ</h4>${EXAMS_ON.slice(0,6).map(e => `<a href="/#${e.key}">${esc(e.name)}</a>`).join("")}</div>
  <div><h4>Thông tin</h4><a href="/gioi-thieu">Giới thiệu</a><a href="/lien-he">Liên hệ</a><a href="/ho-tro-giao-vien">Hỗ trợ giáo viên</a><a href="/chinh-sach-bao-mat">Chính sách bảo mật</a><a href="/dieu-khoan">Điều khoản sử dụng</a></div>`;

/* ---------- Thẻ tài liệu ---------- */
function card(d) {
  const c = catInfo(d.cat) || {}, t = TYPES[d.type] || {};
  return `<a class="card" href="/#tl-${d.id}">
    <div class="cover" style="background:${c.color}">
      <div class="badges"><span class="bd">${esc(c.short)}</span>${d.isNew ? '<span class="bd new">Mới</span>' : ''}</div>${t.icon || "📄"}
    </div>
    <div class="body">
      <h3>${esc(d.title)}</h3><p>${esc(shortOf(d))}</p>
      <div class="meta"><span>${esc(t.name)}</span>${d.series ? `<span>${esc(d.series)}</span>` : ""}${d.flags.includes("nghe") ? "<span>🎧</span>" : ""}${d.flags.includes("da") ? "<span>✅ Đáp án</span>" : ""}</div>
    </div></a>`;
}
const PAGE = 24;
let shown = PAGE;
const grid = list => `<div class="grid">${list.length ? list.map(card).join("") : `<div class="empty">Chưa có tài liệu ở mục này — đang cập nhật. Cần gấp? Nhắn ${esc(CONFIG.contact)} 📩</div>`}</div>`;

/* ---------- Khối ủng hộ ---------- */
function donateBanner() {
  const g = CONFIG.goal, pct = Math.min(100, Math.round(g.current / g.target * 100));
  return `<div class="dbanner2">
    <div class="dbh">
      <h2>💚 Giữ kho tài liệu luôn miễn phí</h2>
      <span class="dsub">Các bạn có thể chọn ủng hộ theo 1 trong 2 cách 👇</span>
    </div>
    <div class="dopt">
      <div class="dcard">
        <div class="dtop"><span class="dtag">Cách 1</span><h3>☕ Ủng hộ duy trì web</h3></div>
        <p>Một ly cà phê <b>20K–30K</b> — quét mã QR hoặc chuyển khoản bằng app ngân hàng bất kỳ.</p>
        ${g.show ? `<div class="goal"><div class="bar"><i style="width:${pct}%"></i></div><small><span>${esc(g.label)}</span><span>${fmt(g.current)} / ${fmt(g.target)}</span></small></div>` : ""}
        <button class="btn-big" data-donate>☕ Ủng hộ ngay</button>
      </div>
      <div class="dcard svc">
        <div class="dtop"><span class="dtag">Cách 2</span><h3>🤝 Nhờ nhóm hỗ trợ giáo viên</h3></div>
        <ul class="svcs">${CONFIG.services.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
        <a class="btn-big btn-zalo" data-service href="${esc(CONFIG.serviceZalo)}" target="_blank" rel="noopener">💬 Nhắn Zalo ${esc(CONFIG.servicePhone)}</a>
      </div>
    </div>
  </div>`;
}
function svcStrip() {
  return `<div class="svcstrip">
    <div class="ss-t"><a href="/ho-tro-giao-vien"><b>🤝 Hỗ trợ giáo viên:</b></a> <span>SKKN</span><span>Bài thi GVG</span><span>Đề thi</span><span>Game dạy học</span><span>Bài dự thi</span></div>
    <div class="ss-b"><a class="ss-z" data-service href="${esc(CONFIG.serviceZalo)}" target="_blank" rel="noopener">💬 Zalo ${esc(CONFIG.servicePhone)}</a><button class="ss-d" data-donate>☕ Ủng hộ web</button></div>
  </div>`;
}
/* Nút Zalo nổi + nút "Dịch vụ GV" trên thanh đầu trang */
(function () {
  const f = document.createElement("a");
  f.className = "zfloat"; f.href = CONFIG.serviceZalo; f.target = "_blank"; f.rel = "noopener"; f.setAttribute("data-service", "");
  f.innerHTML = `<i>💬</i><span>Hỗ trợ giáo viên<br><b>Zalo ${esc(CONFIG.servicePhone)}</b></span>`;
  document.body.appendChild(f);
  const hd = document.getElementById("hdDonate");
  if (hd) {
    const b = document.createElement("a");
    b.className = "btn-svc"; b.href = CONFIG.supportPage;
    b.textContent = "🤝 Hỗ trợ giáo viên";
    hd.parentNode.insertBefore(b, hd);
  }
})();

/* ---------- Trang chủ ---------- */
function viewHome(anchor) {
  $("#view").innerHTML = `
  <div class="hero"><div class="wrap">
    <h1>${esc(CONFIG.heroTitle)}</h1>
    <p>${esc(CONFIG.heroDesc)}</p>
    <form class="searchbar" id="sf"><input id="sq" placeholder="Tìm: lớp 6 Global Success, IELTS, đề thi vào 10…" aria-label="Tìm tài liệu"><button>Tìm</button></form>
  </div></div>

  <div class="wrap">
    ${donateBanner()}
    <section class="block" id="cac-lop">
      <div class="sec-h"><div><h2>Tài liệu theo lớp</h2><p>Global Success, i-Learn Smart World, Friends Plus, Bright…</p></div></div>
      <div class="levels">${LEVELS.map(l => `
        <div class="level"><h3>${l.name}<small>Lớp ${l.grades[0]}–${l.grades.at(-1)}</small></h3>
          <div class="grades">${l.grades.map(g => `<a class="grade" href="/#lop-${g}" style="background:${l.color}">${g}<small>${count("lop-"+g)} bộ</small></a>`).join("")}</div>
        </div>`).join("")}
      </div>
    </section>

    <section class="block" id="chung-chi">
      <div class="sec-h"><div><h2>Luyện thi & chuyên đề</h2><p>Thi vào 10, thi tốt nghiệp THPT, HSG và tài liệu cho giáo viên</p></div></div>
      <div class="exams">${EXAMS_ON.map(e => `
        <a class="exam" href="/#${e.key}"><div class="ic" style="background:${e.color}">${e.icon}</div>
          <div><h3>${esc(e.name)}</h3><p>${esc(e.desc)}</p><span class="n">${count(e.key)} bộ tài liệu →</span></div></a>`).join("")}
      </div>
    </section>

    <section class="block">
      <div class="sec-h"><div><h2>Mới cập nhật</h2><p>Tài liệu vừa được thêm vào kho</p></div></div>
      ${grid(DOCS.filter(d => d.date).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8))}
    </section>
  </div>`;
  $("#sf").onsubmit = e => { e.preventDefault(); state.q = $("#sq").value.trim(); go("tim-kiem"); };
  if (anchor) document.getElementById(anchor)?.scrollIntoView();
  else window.scrollTo(0, 0);
}

/* ---------- Trang danh mục ---------- */
function viewCat(key) {
  const c = catInfo(key);
  if (!c) return; // chờ data.json, giữ nội dung dựng sẵn
  const all = DOCS.filter(d => d.cat === key);
  const types = [...new Set(all.map(d => d.type))];
  const series = [...new Set(all.map(d => d.series).filter(Boolean))];
  const list = all.filter(d => (state.type === "all" || d.type === state.type) && (state.series === "all" || d.series === state.series));
  const isGrade = key.startsWith("lop-");
  const siblings = isGrade ? LEVELS.flatMap(l => l.grades).map(g => `<a class="chip ${key === "lop-"+g ? "on" : ""}" href="/#lop-${g}">Lớp ${g}</a>`).join("") : "";
  $("#view").innerHTML = `<div class="wrap">
    <div class="crumb"><a href="/#">Trang chủ</a> › <a href="/#${isGrade ? "cac-lop" : "chung-chi"}">${esc(c.group)}</a> › ${esc(c.short)}</div>
    <div class="phead" style="background:${c.color}"><div class="ic">${c.icon}</div><div><h1>${esc(c.name)}</h1><p>${esc(c.desc)}</p></div></div>
    ${svcStrip()}
    <div class="filters">
      ${isGrade ? `<div class="chips"><b>Chọn lớp:</b>${siblings}</div>` : ""}
      ${types.length > 1 ? `<div class="chips"><b>Loại:</b><button class="chip ${state.type==="all"?"on":""}" data-type="all">Tất cả</button>${types.map(t => `<button class="chip ${state.type===t?"on":""}" data-type="${t}">${TYPES[t].icon} ${esc(TYPES[t].name)}</button>`).join("")}</div>` : ""}
      ${series.length > 1 ? `<div class="chips"><b>Bộ sách:</b><button class="chip ${state.series==="all"?"on":""}" data-series="all">Tất cả</button>${series.map(s => `<button class="chip ${state.series===s?"on":""}" data-series="${esc(s)}">${esc(s)}</button>`).join("")}</div>` : ""}
    </div>
    <p style="color:var(--muted);margin:0 0 12px">${list.length} bộ tài liệu</p>
    ${grid(list.slice(0, shown))}
    ${list.length > shown ? `<div style="text-align:center;margin:18px 0"><button class="chip on" id="more">Xem thêm ${Math.min(PAGE, list.length - shown)} bộ ↓</button></div>` : ""}
    ${donateBanner()}
  </div>`;
  document.querySelectorAll("[data-type]").forEach(b => b.onclick = () => { state.type = b.dataset.type; shown = PAGE; viewCat(key); });
  document.querySelectorAll("[data-series]").forEach(b => b.onclick = () => { state.series = b.dataset.series; shown = PAGE; viewCat(key); });
  const y = window.scrollY; $("#more")?.addEventListener("click", () => { shown += PAGE; viewCat(key); window.scrollTo(0, y); });
}

/* ---------- Tìm kiếm ---------- */
function viewSearch() {
  const q = norm(state.q);
  const list = q ? DOCS.filter(d => {
    const c = catInfo(d.cat) || {};
    return norm([d.title, d.series, c.name, c.short, (TYPES[d.type]||{}).name].join(" ")).includes(q);
  }) : [];
  $("#view").innerHTML = `<div class="wrap">
    <div class="crumb"><a href="/#">Trang chủ</a> › Tìm kiếm</div>
    <form class="searchbar" id="sf2" style="max-width:none;margin-bottom:18px;box-shadow:none;border:1px solid var(--line)"><input id="sq2" value="${esc(state.q)}" placeholder="Nhập từ khóa…"><button>Tìm</button></form>
    <p style="color:var(--muted);margin:0 0 14px">${q ? `${list.length} kết quả cho “${esc(state.q)}”` : "Nhập từ khóa để tìm tài liệu."}</p>
    ${grid(list)}
  </div>`;
  $("#sf2").onsubmit = e => { e.preventDefault(); state.q = $("#sq2").value.trim(); viewSearch(); };
  window.scrollTo(0, 0);
}

/* ---------- Chi tiết tài liệu ---------- */
function viewDoc(d) {
  const c = catInfo(d.cat), t = TYPES[d.type];
  const related = DOCS.filter(x => x.cat === d.cat && x.id !== d.id && (x.type === d.type || x.series && x.series === d.series)).slice(0, 4);
  $("#view").innerHTML = `<div class="wrap">
    <div class="crumb"><a href="/#">Trang chủ</a> › <a href="/#${d.cat}">${esc(c.short)}</a> › ${esc(t.name)}</div>
    <div class="phead" style="background:${c.color}"><div class="ic">${t.icon}</div>
      <div><h1>${esc(d.title)} <span class="vc" id="vc" title="Lượt xem thực tế">👁 <b>…</b> lượt xem</span></h1><p>${esc(c.name)} · ${esc(t.name)}${d.series ? " · " + esc(d.series) : ""}${d.date ? " · Cập nhật " + d.date.split("-").reverse().join("/") : ""}</p></div></div>
    <div class="cols">
      <div style="display:flex;flex-direction:column;gap:20px">
        <div class="panel intro"><h3>Giới thiệu</h3>${introOf(d)}</div>
        <div class="panel"><h3>Thông tin bộ tài liệu</h3><ul class="files">
          <li><span>Mục</span><span>${esc(c.name)}</span></li><li><span>Loại</span><span>${esc(t.name)}</span></li>
          ${d.series ? `<li><span>Bộ sách</span><span>${esc(d.series)}</span></li>` : ""}
          ${d.flags.map(f => FLAGS[f] ? `<li><span>${FLAGS[f]}</span><span>✓</span></li>` : "").join("")}
          <li><span>Lưu trữ</span><span>Google Drive</span></li></ul></div>
      </div>
      <div class="side"><div class="panel sticky">
        <h3>Tải về miễn phí</h3>
        <div class="mini"><div class="mq" id="qrMini"></div>
          <div><b>☕ Ủng hộ nếu thấy hữu ích</b><p>Quét mã bằng app ngân hàng bất kỳ. Mỗi đóng góp giúp web duy trì miễn phí.</p></div></div>
        <p class="svcmini">🤝 Các bạn cũng có thể ủng hộ bằng cách nhờ nhóm hỗ trợ SKKN, bài thi GVG, đề thi, game dạy học: <a data-service href="${esc(CONFIG.serviceZalo)}" target="_blank" rel="noopener">Zalo ${esc(CONFIG.servicePhone)}</a></p>
        <button class="dl" data-dl="${esc(d.flags.includes("file") ? "https://drive.google.com/uc?export=download&id=" + d.id : d.link)}" data-size="${d.flags.includes("file") ? "Tải tệp về máy / điện thoại" : "Google Drive"}">⬇ Tải miễn phí<small>${d.flags.includes("file") ? "Mở tệp trên Google Drive" : "Mở thư mục Google Drive"}</small></button>
        <p class="note">Không cần đăng ký. Link hỏng? Báo qua <b>${esc(CONFIG.contact)}</b></p>
      </div></div>
    </div>
    ${related.length ? `<section class="block"><div class="sec-h"><h2>Tài liệu cùng mục</h2></div>${grid(related)}</section>` : ""}
  </div>`;
  makeQR($("#qrMini"), 86, 0);
  countView(d.id);
  document.querySelectorAll("[data-dl]").forEach(b => b.onclick = () => openDonate({ url: b.dataset.dl, size: b.dataset.size }));
  window.scrollTo(0, 0);
}

/* ---------- Lượt xem thật (Abacus counter, đếm 1 lần/phiên/tài liệu) ---------- */
function countView(id) {
  const el = document.getElementById("vc"); if (!el) return;
  const key = String(id).replace(/[^A-Za-z0-9_.-]/g, "").slice(0, 60);
  const show = n => { const b = el.querySelector("b"); if (b) b.textContent = Number(n).toLocaleString("vi-VN"); el.style.display = ""; };
  let cached = null; try { cached = localStorage.getItem("vc_" + key); } catch (e) {}
  if (cached !== null) show(cached); else el.style.display = "none";
  const bot = /bot|crawl|spider|slurp|preview|lighthouse/i.test(navigator.userAgent);
  let seen = false; try { seen = sessionStorage.getItem("v_" + key) === "1"; } catch (e) {}
  const op = (bot || seen) ? "get" : "hit";
  const ctl = window.AbortController ? new AbortController() : null; if (ctl) setTimeout(() => ctl.abort(), 12000);
  fetch("https://abacus.jasoncameron.dev/" + op + "/hoclieuxanh-tailieu/" + key, ctl ? { signal: ctl.signal } : {})
    .then(r => r.ok ? r.json() : r.status === 404 ? { value: 0 } : Promise.reject())
    .then(j => { const n = Number(j.value) || 0; show(n);
      try { localStorage.setItem("vc_" + key, String(n)); if (op === "hit") sessionStorage.setItem("v_" + key, "1"); } catch (e) {} })
    .catch(() => {});
}

/* ---------- VietQR (chuẩn NAPAS/EMVCo) ---------- */
function tlv(id, v) { return id + String(v.length).padStart(2, "0") + v; }
function crc16(s) {
  let crc = 0xFFFF;
  for (let i = 0; i < s.length; i++) {
    crc ^= s.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) & 0xFFFF : (crc << 1) & 0xFFFF;
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}
function vietQR(amount) {
  const b = CONFIG.bank;
  const acc = tlv("00", "A000000727") + tlv("01", tlv("00", b.bin) + tlv("01", b.account)) + tlv("02", "QRIBFTTA");
  let s = tlv("00", "01") + tlv("01", amount ? "12" : "11") + tlv("38", acc) + tlv("53", "704");
  if (amount) s += tlv("54", String(amount));
  s += tlv("58", "VN") + tlv("62", tlv("08", CONFIG.transferNote));
  s += "6304";
  return s + crc16(s);
}
function makeQR(el, size, amount) {
  el.innerHTML = "";
  if (CONFIG.qrImage) { el.innerHTML = `<img src="${CONFIG.qrImage}" alt="Mã QR ủng hộ">`; return; }
  if (window.QRCode) new QRCode(el, { text: vietQR(amount), width: size, height: size, colorDark: "#152033", correctLevel: QRCode.CorrectLevel.M });
}

/* ---------- Popup ủng hộ / trước khi tải ---------- */
let amount = CONFIG.defaultAmount;
function renderAmounts() {
  if (CONFIG.qrImage) { $("#amts").innerHTML = ""; return; }
  $("#amts").innerHTML = CONFIG.amounts.map(a => `<button class="amt ${a === amount ? "on" : ""}" data-a="${a}">${a/1000}K</button>`).join("")
    + `<button class="amt ${amount === 0 ? "on" : ""}" data-a="0">Tùy ý</button>`;
  document.querySelectorAll(".amt").forEach(b => b.onclick = () => { amount = +b.dataset.a; renderAmounts(); makeQR($("#qrModal"), 196, amount); });
}
function renderBank() {
  const b = CONFIG.bank;
  $("#bankBox").innerHTML = `<div><span>Ngân hàng</span><b>${esc(b.name)}</b></div>
    <div><span>Số tài khoản</span><b>${esc(b.account)}<button class="copy" data-c="${esc(b.account)}">Chép</button></b></div>
    <div><span>Chủ tài khoản</span><b>${esc(b.owner)}</b></div>
    <div><span>Nội dung</span><b>${esc(CONFIG.transferNote)}</b></div>`;
  $("#bankBox").querySelectorAll(".copy").forEach(btn => btn.onclick = async () => {
    try { await navigator.clipboard.writeText(btn.dataset.c); btn.textContent = "Đã chép ✓"; } catch { btn.textContent = "Chép tay giúp mình"; }
    setTimeout(() => btn.textContent = "Chép", 1800);
  });
}
function openDonate(dl) {
  if (dl) {
    $("#ovTitle").textContent = "☕ Trước khi tải, ủng hộ một ly cà phê nhé?";
    $("#ovSub").textContent = "Tài liệu luôn miễn phí. Mỗi đóng góp nhỏ giúp web duy trì và cập nhật thêm tài liệu mới.";
    $("#ovAction").innerHTML = `<a class="dl" href="${esc(dl.url)}" target="_blank" rel="noopener" id="goDl">⬇ Tiếp tục tải xuống${dl.size ? `<small>${esc(dl.size)}</small>` : ""}</a>
      <span class="later">Chưa tiện ủng hộ cũng không sao — bạn vẫn tải bình thường 💚</span>
      ${/uc\?export=download/.test(dl.url) ? "" : `<p class="mtip">📱 Trên điện thoại: mở thư mục, bấm <b>⋮</b> cạnh tệp cần lấy → <b>Tải xuống</b> (hoặc mở bằng app Google Drive).</p>`}
      <p class="svcmini">🤝 Các bạn cũng có thể ủng hộ bằng cách nhờ nhóm hỗ trợ <b>SKKN, bài thi GVG, đề thi, game dạy học</b>: <a data-service href="${esc(CONFIG.serviceZalo)}" target="_blank" rel="noopener">Zalo ${esc(CONFIG.servicePhone)}</a></p>`;
    $("#goDl").addEventListener("click", () => setTimeout(closeDonate, 300));
  } else {
    $("#ovTitle").textContent = "☕ Ủng hộ Kho Tài Liệu";
    $("#ovSub").textContent = "Chọn mức bạn muốn rồi quét mã bằng app ngân hàng bất kỳ — số tiền và nội dung được điền sẵn.";
    $("#ovAction").innerHTML = `<p class="thanks">Cảm ơn bạn rất nhiều! Mọi đóng góp đều dùng để duy trì web ❤️</p>
      <p class="svcmini">🤝 Các bạn cũng có thể ủng hộ bằng cách nhờ nhóm hỗ trợ <b>SKKN, bài thi GVG, đề thi, game dạy học</b>: <a data-service href="${esc(CONFIG.serviceZalo)}" target="_blank" rel="noopener">Zalo ${esc(CONFIG.servicePhone)}</a></p>`;
  }
  renderAmounts(); renderBank(); makeQR($("#qrModal"), 196, amount);
  if (!$("#qrTip")) $("#qrModal").insertAdjacentHTML("afterend", '<p class="mtip" id="qrTip">📱 Đang dùng điện thoại? Chụp màn hình mã QR rồi mở app ngân hàng → <b>Quét mã từ ảnh</b>, hoặc bấm <b>Chép</b> số tài khoản bên dưới.</p>');
  $("#ov").classList.add("show");
}
function closeDonate() { $("#ov").classList.remove("show"); }
$("#ovX").onclick = closeDonate;
$("#ov").onclick = e => { if (e.target.id === "ov") closeDonate(); };
document.addEventListener("keydown", e => { if (e.key === "Escape") closeDonate(); });
document.addEventListener("click", e => { if (e.target.closest("[data-donate]")) openDonate(); });

/* ---------- Trang Hỗ trợ giáo viên ---------- */
function viewSupport() {
  const Z = esc(CONFIG.serviceZalo), P = esc(CONFIG.servicePhone);
  const J = window.__PVJ || {}, TH = (id, w) => "https://drive.google.com/thumbnail?id=" + id + "&sz=w" + w;
  const withImg = DOCS.filter(d => J[d.id] && J[d.id].p && J[d.id].p[0]);
  const games = withImg.filter(d => d.cat === "game-day-hoc"), docs = withImg.filter(d => d.cat !== "game-day-hoc");
  const show = [...games.slice(0, 4), ...docs.slice(0, 4)];
  const hero3 = [games[0], docs[0], games[1]].filter(Boolean);
  const nDocs = DOCS.length, nGame = DOCS.filter(d => d.cat === "game-day-hoc").length;
  const round = n => n >= 20 ? Math.floor(n / 10) * 10 + "+" : String(n);
  const svc = [
    ["📄", "Đề thi & ma trận", "Đề giữa kì, cuối kì, HSG, ôn thi vào 10 – đủ ma trận, bản đặc tả, đáp án, hướng dẫn chấm đúng quy định.", "c1"],
    ["🏆", "Bài thi Giáo viên giỏi", "Thiết kế tiến trình, hoạt động, phiếu học tập và bài giảng trình chiếu cho thi GVG các cấp.", "c2"],
    ["🖥️", "Bài giảng PowerPoint, E-learning", "Bài giảng điện tử đẹp, đúng sách Global Success và các bộ sách khác, có hiệu ứng, file nghe, trò chơi.", "c3"],
    ["📝", "Sáng kiến kinh nghiệm", "Hỗ trợ ý tưởng, khung, minh chứng và trình bày SKKN đúng mẫu, đúng thể thức.", "c4"],
    ["🎮", "Game dạy học", "Game PowerPoint khởi động, ôn tập theo bài học thầy cô yêu cầu – thay câu hỏi dễ dàng.", "c5"],
    ["📑", "Bài dự thi theo quy định", "Bài dự thi, hồ sơ, sản phẩm theo yêu cầu các cuộc thi dành cho giáo viên và học sinh.", "c6"]
  ];
  const steps = [["💬", "Nhắn Zalo", "Gửi yêu cầu, mẫu và thời hạn."], ["🤝", "Trao đổi & báo giá", "Thống nhất nội dung, chi phí, thời gian."], ["✍️", "Gửi bản nháp", "Thầy cô góp ý, nhóm chỉnh sửa."], ["📦", "Bàn giao file gốc", "File Word / PowerPoint dễ chỉnh sửa."]];
  const proofs = (CONFIG.proofs || []).filter(p => p && p.src);
  const docLink = d => "/#tl-" + d.id;
  document.title = "Hỗ trợ giáo viên – Đề thi, bài thi GVG, bài giảng, SKKN | " + CONFIG.siteName;
  $("#view").innerHTML = `<div class="sup">
  <section class="sup-hero"><span class="blob b1"></span><span class="blob b2"></span><div class="wrap sup-hero-in">
    <div class="sup-hero-t">
      <div class="crumb"><a href="/#">Trang chủ</a> › Hỗ trợ giáo viên</div>
      <span class="sup-badge">⭐ Đội ngũ giáo viên · Trên 10 năm kinh nghiệm</span>
      <h1>Đồng hành cùng thầy cô<br><em>trong mọi công việc chuyên môn</em></h1>
      <p class="lead">Đứng sau <b>Kho Tiếng Anh Free</b> là nhóm thầy cô có <b>trên 10 năm kinh nghiệm</b> giảng dạy và biên soạn tài liệu. Nhóm nhận hỗ trợ <b>đề thi, bài thi GVG, bài giảng PowerPoint, SKKN…</b> – làm kỹ, đúng hạn, bảo mật.</p>
      <div class="sup-cta"><a class="sup-z pulse" data-service href="${Z}" target="_blank" rel="noopener">💬 Nhắn Zalo ${P}</a><span>✓ Tư vấn miễn phí<br>✓ Phản hồi nhanh</span></div>
    </div>
    <div class="sup-hero-v">
      <div class="stack">${hero3.map((d, i) => `<img class="s${i}" src="${TH(J[d.id].p[0], 600)}" alt="">`).join("") || `<div class="ph">📚</div>`}</div>
      <div class="medal"><b>10+</b><span>năm<br>kinh nghiệm</span></div>
    </div>
  </div></section>
  <div class="sup-stats wrap">
    <div><b>10+</b><span>năm đứng lớp & biên soạn</span></div>
    <div><b>${round(nDocs)}</b><span>bộ tài liệu đã chia sẻ miễn phí</span></div>
    <div><b>${round(nGame)}</b><span>game dạy học PowerPoint</span></div>
    <div><b>1–12</b><span>đủ các khối lớp & kỳ thi</span></div>
  </div>
  <div class="wrap">
    <section class="block"><div class="sup-h"><span>Dịch vụ</span><h2>Nhóm nhận hỗ trợ thầy cô</h2></div>
      <div class="sup-grid">${svc.map(x => `<div class="sup-card ${x[3]}"><i>${x[0]}</i><h3>${x[1]}</h3><p>${x[2]}</p><a data-service href="${Z}" target="_blank" rel="noopener">Nhận tư vấn →</a></div>`).join("")}</div></section>
    ${show.length ? `<section class="block"><div class="sup-h"><span>Sản phẩm thật</span><h2>Một số sản phẩm do nhóm biên soạn</h2><p>Tất cả đều có trên web – bấm để xem và tải miễn phí.</p></div>
      <div class="sup-show">${show.map(d => `<a href="${docLink(d)}"><img src="${TH(J[d.id].p[0], 500)}" alt="${esc(d.title)}" loading="lazy"><span>${esc(d.title)}</span></a>`).join("")}</div></section>` : ""}
    <section class="block sup-why"><div class="sup-h"><span>Vì sao chọn chúng tôi</span><h2>Uy tín được xây từ chất lượng</h2></div>
      <div class="sup-about">
        <div><i>👩‍🏫</i><b>Trên 10 năm đứng lớp</b><p>Hiểu rõ chương trình GDPT 2018, sách Global Success và yêu cầu thực tế khi ra đề, dự giờ, thi GVG.</p></div>
        <div><i>📚</i><b>Biên soạn thật, cập nhật mỗi ngày</b><p>Hàng trăm bộ đề, đề cương, bài giảng trên kho tài liệu này do chính nhóm biên soạn và chia sẻ miễn phí.</p></div>
        <div><i>🔒</i><b>Rõ ràng & bảo mật</b><p>Thống nhất yêu cầu, chi phí và thời hạn trước khi làm; thông tin và sản phẩm của thầy cô được giữ kín.</p></div>
      </div></section>
    <section class="block"><div class="sup-h"><span>Quy trình</span><h2>4 bước đơn giản</h2></div>
      <ol class="sup-steps">${steps.map(x => `<li><i>${x[0]}</i><b>${x[1]}</b><span>${x[2]}</span></li>`).join("")}</ol></section>
    ${proofs.length ? `<section class="block"><div class="sup-h"><span>Khách hàng</span><h2>Một số giao dịch thành công</h2><p>Ảnh chụp từ Zalo, đã che tên và nội dung để bảo mật cho thầy cô.</p></div>
      <div class="sup-proofs">${proofs.map(p => `<figure><img src="${esc(p.src)}" alt="Giao dịch thành công" loading="lazy">${p.cap ? `<figcaption>${esc(p.cap)}</figcaption>` : ""}</figure>`).join("")}</div></section>` : ""}
    <section class="sup-end"><span class="blob b3"></span>
      <h2>Thầy cô cần hỗ trợ?</h2>
      <p>Nhận làm <b>đề thi, bài thi GVG, bài giảng PowerPoint, SKKN…</b> Liên hệ ngay để được tư vấn miễn phí.</p>
      <a class="sup-z pulse" data-service href="${Z}" target="_blank" rel="noopener">💬 Zalo ${P}</a>
      <small>Hoặc gọi / nhắn số <b>${P}</b></small>
    </section>
  </div></div>`;
  window.scrollTo(0, 0);
}

/* ---------- Trang thông tin: Giới thiệu, Liên hệ, Chính sách bảo mật, Điều khoản ---------- */
const LEGAL = {
  "gioi-thieu": { title: "Giới thiệu", html: `
    <p class="lg-lead"><b>Kho Tiếng Anh Free</b> (tailieu.hoclieuxanh.com) là trang chia sẻ tài liệu Tiếng Anh miễn phí cho giáo viên, phụ huynh và học sinh từ lớp 1 đến lớp 12, thuộc hệ thống <b>Học Liệu Xanh</b> (hoclieuxanh.com).</p>
    <h2>Chúng tôi là ai</h2>
    <p>Trang do nhóm giáo viên Tiếng Anh có <b>trên 10 năm kinh nghiệm</b> giảng dạy và biên soạn tài liệu xây dựng và quản lý. Người phụ trách: <b>Nguyễn Văn Cương</b>.</p>
    <h2>Trang có gì</h2>
    <ul><li>Đề kiểm tra giữa kì, cuối kì, đề cương ôn tập có đáp án, bám sát chương trình GDPT 2018 (Global Success và các bộ sách khác).</li>
    <li>Tài liệu ôn thi vào lớp 10, thi tốt nghiệp THPT, đánh giá năng lực (V-ACT), học sinh giỏi.</li>
    <li>Game dạy học PowerPoint, bài giảng và tài liệu chuyên môn cho giáo viên.</li></ul>
    <p>Nhiều bộ đề trên trang do nhóm <b>tự biên soạn</b>, có đáp án và giải thích chi tiết; tài liệu mới được cập nhật hằng ngày. Tất cả đều tải miễn phí, không cần đăng ký.</p>
    <h2>Mục tiêu</h2>
    <p>Giúp thầy cô tiết kiệm thời gian chuẩn bị bài, giúp học sinh có nguồn ôn luyện chất lượng, đúng cấu trúc đề thi mới.</p>
    <h2>Kênh chính thức</h2>
    <ul><li>Zalo: <a href="https://zalo.me/0388202311" target="_blank" rel="noopener">0388 202 311</a></li>
    <li>Fanpage: <a href="https://www.facebook.com/profile.php?id=61596536435359" target="_blank" rel="noopener">Tiếng Anh Vui Mỗi Ngày</a></li>
    <li>TikTok: <a href="https://www.tiktok.com/@hoclieuxanh" target="_blank" rel="noopener">@hoclieuxanh</a> · YouTube: <a href="https://www.youtube.com/@alienenglish9331" target="_blank" rel="noopener">Alien English</a></li></ul>
    <p>Xem thêm: <a href="/ho-tro-giao-vien">Đội ngũ hỗ trợ giáo viên</a> · <a href="/lien-he">Liên hệ</a>.</p>` },
  "lien-he": { title: "Liên hệ", html: `
    <p class="lg-lead">Thầy cô, phụ huynh và các em học sinh có thể liên hệ với Kho Tiếng Anh Free qua các kênh sau. Chúng tôi phản hồi sớm nhất có thể.</p>
    <div class="lg-cards">
      <a class="lg-c" href="https://zalo.me/0388202311" target="_blank" rel="noopener"><i>💬</i><b>Zalo</b><span>0388 202 311</span></a>
      <a class="lg-c" href="https://www.facebook.com/profile.php?id=61596536435359" target="_blank" rel="noopener"><i>📘</i><b>Facebook</b><span>Tiếng Anh Vui Mỗi Ngày</span></a>
      <a class="lg-c" href="https://www.youtube.com/@alienenglish9331" target="_blank" rel="noopener"><i>▶️</i><b>YouTube</b><span>Alien English</span></a>
      <a class="lg-c" href="https://www.tiktok.com/@hoclieuxanh" target="_blank" rel="noopener"><i>🎵</i><b>TikTok</b><span>@hoclieuxanh</span></a>
    </div>
    <h2>Chúng tôi có thể giúp gì</h2>
    <ul><li><b>Báo link hỏng, xin tài liệu:</b> gửi tên hoặc đường dẫn tài liệu qua Zalo.</li>
    <li><b>Yêu cầu gỡ tài liệu:</b> nếu bạn là tác giả hoặc chủ sở hữu bản quyền của một tài liệu trên trang, vui lòng gửi đường dẫn tài liệu và thông tin chứng minh quyền sở hữu; chúng tôi sẽ kiểm tra và gỡ bỏ sớm nhất.</li>
    <li><b>Hỗ trợ chuyên môn:</b> đề thi, bài thi GVG, bài giảng PowerPoint, SKKN… – xem <a href="/ho-tro-giao-vien">trang Hỗ trợ giáo viên</a>.</li>
    <li><b>Góp ý, hợp tác:</b> mọi ý kiến đóng góp để trang tốt hơn đều được trân trọng.</li></ul>` },
  "chinh-sach-bao-mat": { title: "Chính sách bảo mật", html: `
    <p class="lg-lead">Chính sách này cho biết Kho Tiếng Anh Free (tailieu.hoclieuxanh.com) thu thập, sử dụng và bảo vệ thông tin của người truy cập như thế nào. Cập nhật lần cuối: 25/11/2026.</p>
    <h2>1. Thông tin chúng tôi thu thập</h2>
    <p>Trang <b>không yêu cầu đăng ký tài khoản</b> và không thu thập họ tên, số điện thoại hay email của bạn khi bạn xem hoặc tải tài liệu. Khi bạn truy cập, một số thông tin kỹ thuật có thể được ghi nhận tự động: loại trình duyệt, thiết bị, trang đã xem, thời gian truy cập và địa chỉ IP (ở dạng thống kê).</p>
    <h2>2. Cookie và công nghệ tương tự</h2>
    <ul><li><b>Google Analytics:</b> dùng cookie để thống kê lượt truy cập, giúp chúng tôi biết tài liệu nào hữu ích và cải thiện trang.</li>
    <li><b>Lưu trữ trên trình duyệt:</b> trang lưu một số dữ liệu nhỏ (ví dụ đánh dấu tài liệu đã xem, số lượt xem gần nhất) ngay trên trình duyệt của bạn; dữ liệu này không gửi danh tính của bạn cho chúng tôi.</li>
    <li><b>Bộ đếm lượt xem:</b> khi mở trang tài liệu, trình duyệt gửi một yêu cầu tới dịch vụ đếm của bên thứ ba (Abacus) chỉ kèm mã tài liệu để tăng số lượt xem.</li></ul>
    <h2>3. Quảng cáo của Google</h2>
    <p>Trang có thể hiển thị quảng cáo do Google AdSense cung cấp. Các nhà cung cấp bên thứ ba, bao gồm Google, sử dụng cookie để phân phát quảng cáo dựa trên các lần truy cập trước đây của bạn vào trang này hoặc các trang web khác. Việc Google sử dụng cookie quảng cáo cho phép Google và đối tác hiển thị quảng cáo phù hợp với bạn.</p>
    <p>Bạn có thể tắt quảng cáo được cá nhân hóa tại <a href="https://adssettings.google.com" target="_blank" rel="noopener">Cài đặt quảng cáo của Google</a>, hoặc tắt cookie của nhà cung cấp bên thứ ba tại <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener">aboutads.info</a>. Tìm hiểu thêm về cách Google sử dụng dữ liệu tại <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">policies.google.com/technologies/partner-sites</a>.</p>
    <h2>4. Liên kết bên ngoài</h2>
    <p>Tài liệu được lưu trên Google Drive; trang còn có liên kết tới Zalo, Facebook, YouTube, TikTok. Khi bạn bấm vào các liên kết này, chính sách bảo mật của các dịch vụ đó sẽ được áp dụng.</p>
    <h2>5. Ủng hộ và liên hệ</h2>
    <p>Khi bạn ủng hộ qua mã QR chuyển khoản, giao dịch diễn ra trực tiếp trong ứng dụng ngân hàng của bạn; trang không thu thập thông tin thẻ hay tài khoản. Thông tin bạn tự gửi khi nhắn Zalo chỉ dùng để trả lời yêu cầu của bạn và không chia sẻ cho bên khác.</p>
    <h2>6. Trẻ em</h2>
    <p>Trang phục vụ cả học sinh. Chúng tôi không cố ý thu thập thông tin cá nhân của trẻ em; phụ huynh nên hướng dẫn con khi sử dụng Internet.</p>
    <h2>7. Quyền của bạn</h2>
    <p>Bạn có thể xóa cookie và dữ liệu lưu trên trình duyệt bất cứ lúc nào trong phần cài đặt trình duyệt. Mọi câu hỏi về dữ liệu cá nhân, vui lòng <a href="/lien-he">liên hệ</a> với chúng tôi. Chúng tôi xử lý dữ liệu cá nhân theo quy định pháp luật Việt Nam về bảo vệ dữ liệu cá nhân.</p>
    <h2>8. Thay đổi chính sách</h2>
    <p>Chính sách có thể được cập nhật; phiên bản mới nhất luôn được đăng tại trang này.</p>` },
  "dieu-khoan": { title: "Điều khoản sử dụng", html: `
    <p class="lg-lead">Khi sử dụng Kho Tiếng Anh Free (tailieu.hoclieuxanh.com), bạn đồng ý với các điều khoản dưới đây. Cập nhật lần cuối: 25/11/2026.</p>
    <h2>1. Mục đích sử dụng</h2>
    <p>Tài liệu trên trang được chia sẻ miễn phí cho mục đích <b>học tập và giảng dạy, phi thương mại</b>. Bạn được tải về, in và dùng trong lớp học, ôn tập cá nhân.</p>
    <h2>2. Những việc không được làm</h2>
    <ul><li>Bán lại, đăng tải lại tài liệu để thu phí hoặc mạo nhận là tác giả.</li>
    <li>Sao chép hàng loạt nội dung trang sang website khác khi chưa được đồng ý.</li>
    <li>Dùng công cụ tự động gây quá tải cho trang hoặc can thiệp vào hoạt động của trang.</li></ul>
    <h2>3. Bản quyền</h2>
    <p>Các tài liệu do nhóm Kho Tiếng Anh Free biên soạn thuộc quyền của nhóm. Một số tài liệu khác được sưu tầm, ghi rõ nguồn khi có thể và chỉ dùng cho mục đích học tập. Nếu bạn là tác giả hoặc chủ sở hữu bản quyền và không muốn tài liệu xuất hiện trên trang, vui lòng <a href="/lien-he">liên hệ</a>; chúng tôi sẽ kiểm tra và gỡ bỏ sớm nhất.</p>
    <h2>4. Miễn trừ trách nhiệm</h2>
    <p>Chúng tôi cố gắng kiểm tra kỹ đề và đáp án, nhưng không tránh khỏi sai sót. Thầy cô nên xem lại tài liệu trước khi sử dụng. Trang không chịu trách nhiệm về nội dung của các website bên ngoài được liên kết tới.</p>
    <h2>5. Quảng cáo và ủng hộ</h2>
    <p>Để duy trì trang miễn phí, trang có thể hiển thị quảng cáo và nhận ủng hộ tự nguyện. Việc ủng hộ là không bắt buộc và không ảnh hưởng đến quyền tải tài liệu.</p>
    <h2>6. Thay đổi điều khoản</h2>
    <p>Điều khoản có thể được cập nhật; phiên bản mới nhất luôn được đăng tại trang này. Xem thêm <a href="/chinh-sach-bao-mat">Chính sách bảo mật</a>.</p>` }
};
function viewLegal(k) {
  const p = LEGAL[k]; if (!p) return viewHome();
  document.title = p.title + " – " + CONFIG.siteName;
  $("#view").innerHTML = `<div class="lg"><div class="lg-hero"><div class="wrap"><div class="crumb"><a href="/#">Trang chủ</a> › ${p.title}</div><h1>${p.title}</h1></div></div>
  <div class="wrap"><article class="lg-body">${p.html}</article>
  <nav class="lg-nav">${Object.keys(LEGAL).map(x => `<a href="/${x}"${x === k ? ' class="on"' : ""}>${LEGAL[x].title}</a>`).join("")}<a href="/ho-tro-giao-vien">Hỗ trợ giáo viên</a></nav></div></div>`;
  window.scrollTo(0, 0);
}

/* ---------- Điều hướng ---------- */
function go(h) { if (location.hash.slice(1) === h) route(); else location.hash = h; }
function route() {
  closeDonate();
  document.title = CONFIG.siteName + " – Tài liệu Tiếng Anh miễn phí";
  const h = location.hash.slice(1);
  if (!h && window.__PAGE === "hotro") return viewSupport();
  if (!h && window.__PAGE && LEGAL[window.__PAGE]) return viewLegal(window.__PAGE);
  if (!h && window.__CAT) { shown = 100000; state.type = "all"; state.series = "all"; return viewCat(window.__CAT); }
  if (!h && window.__DOC) { const d0 = DOCS.find(x => x.id === window.__DOC); if (d0) return viewDoc(d0); return; }
  if (h.startsWith("tl-") && window.__SLUG && window.__SLUG[h.slice(3)]) return location.replace("/tai-lieu/" + window.__SLUG[h.slice(3)]);
  document.querySelectorAll(".nav a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "/#" + h || (!h && a.getAttribute("href") === "/#")));
  if (h.startsWith("tl-")) { const d = DOCS.find(x => "tl-" + x.id === h); if (d) return viewDoc(d); }
  if (h === "ho-tro-giao-vien") return location.replace(CONFIG.supportPage);
  if (h === "tim-kiem") return viewSearch();
  if (catInfo(h)) { shown = PAGE; state.type = "all"; state.series = "all"; return viewCat(h); }
  viewHome(h === "cac-lop" || h === "chung-chi" ? h : null);
}
window.addEventListener("hashchange", route);
route();

;

/* ===== Nâng cấp: ảnh xem trước + bài giới thiệu chi tiết (dữ liệu từ data.json) ===== */
(function () {
  const css = `
  .card .cover.img{padding:0;overflow:hidden;position:relative;font-size:0}
  .card .cover.img img.th{width:100%;height:100%;object-fit:cover;object-position:top;display:block;background:#fff}
  .card .cover.img .badges{position:absolute;top:8px;left:8px;z-index:2}
  .gal{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px;margin-top:6px}
  .gal button{border:1px solid var(--line);border-radius:12px;padding:0;background:#fff;cursor:zoom-in;overflow:hidden;aspect-ratio:3/4;box-shadow:0 2px 8px rgba(20,30,60,.06);transition:transform .15s}
  .gal button:hover{transform:translateY(-3px)}
  .gal img{width:100%;height:100%;object-fit:cover;object-position:top;display:block}
  .gal small{display:block;color:var(--muted);font-size:12px;margin-top:8px}
  .hl{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;margin:12px 0 4px;padding:0;list-style:none}
  .hl li{background:#f5f8ff;border-radius:10px;padding:10px 12px;font-size:14px;line-height:1.45}
  .stats{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}
  .stats span{background:#eef3ff;color:#1d3c8f;border-radius:999px;padding:5px 12px;font-size:13px;font-weight:600}
  .tree{list-style:none;margin:0;padding:0;font-size:14px}
  .tree li{padding:7px 0;border-bottom:1px dashed var(--line);display:flex;gap:8px;align-items:flex-start;word-break:break-word}
  .tree li:last-child{border:0}
  .tree .more{color:var(--muted);font-style:italic}
  .tips{margin:8px 0 0;padding-left:20px}.tips li{margin:4px 0}
  #lb{position:fixed;inset:0;background:rgba(10,15,30,.86);display:none;align-items:center;justify-content:center;z-index:99;padding:20px;flex-direction:column;gap:12px}
  #lb.show{display:flex}#lb img{max-width:min(900px,95vw);max-height:80vh;border-radius:10px;background:#fff}
  #lb a,#lb button{color:#fff;font-size:14px}#lb button{position:absolute;top:14px;right:18px;background:none;border:0;font-size:30px;cursor:pointer}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  const lb = document.createElement("div"); lb.id = "lb";
  lb.innerHTML = '<button aria-label="Đóng">×</button><img alt="Xem trước"><a target="_blank" rel="noopener">Mở tệp này trên Google Drive ↗</a>';
  document.body.appendChild(lb);
  lb.onclick = e => { if (e.target === lb || e.target.tagName === "BUTTON") lb.classList.remove("show"); };
  document.addEventListener("keydown", e => { if (e.key === "Escape") lb.classList.remove("show"); });

  const TH = (id, w) => "https://drive.google.com/thumbnail?id=" + id + "&sz=w" + w;
  const CNT = (e, list) => list.reduce((a, k) => a + (e[k] || 0), 0);
  let PV = {};

  function facts(d) {
    const p = PV[d.id] || { t: 0, e: {}, n: [], s: [], p: [], sc: 0 };
    const e = p.e || {};
    const word = CNT(e, ["doc", "docx"]), pdf = CNT(e, ["pdf"]), ppt = CNT(e, ["ppt", "pptx"]), audio = CNT(e, ["mp3", "wav", "m4a", "wma"]), zip = CNT(e, ["zip", "rar", "7z"]);
    const all = (p.n || []).concat(p.s || []).join(" ") + " " + d.title;
    return { p, word, pdf, ppt, audio, zip,
      key: /key|đáp án|dap an|answer|hướng dẫn chấm|huong dan cham/i.test(all) || d.flags.includes("da"),
      unit: /unit\s*\d/i.test(all), exam: /giữa k|cuối k|học k|giua ki|cuoi ki|hk ?[12]|semester|midterm|final/i.test(all),
      moi: d.flags.includes("moi") || /2025|2026|form mới|cấu trúc mới/i.test(all) };
  }
  const plus = f => f.p.more ? "+" : "";

  shortOf = function (d) {
    const f = facts(d), bits = [];
    if (f.p.t) bits.push(f.p.t + plus(f) + " tệp");
    if (f.word) bits.push("Word"); if (f.pdf) bits.push("PDF"); if (f.ppt) bits.push("PowerPoint");
    if (f.audio || d.flags.includes("nghe")) bits.push("có file nghe");
    if (f.key) bits.push("có đáp án");
    const t = TYPES[d.type] || TYPES.khac;
    return (bits.length ? bits.join(" · ") : t.long) + (d.series ? " — " + d.series : "");
  };

  card = function (d) {
    const c = catInfo(d.cat) || {}, t = TYPES[d.type] || {}, p = PV[d.id], img = p && p.p && p.p[0];
    const badges = '<div class="badges"><span class="bd">' + esc(c.short) + '</span>' + (d.isNew ? '<span class="bd new">Mới</span>' : '') + '</div>';
    const cover = img
      ? '<div class="cover img" style="background:' + c.color + '">' + badges + '<img class="th" loading="lazy" src="' + TH(img, 400) + '" alt="Xem trước ' + esc(d.title) + '" onerror="this.remove()"></div>'
      : '<div class="cover" style="background:' + c.color + '">' + badges + (t.icon || "📄") + '</div>';
    return '<a class="card" href="' + (window.__SLUG && window.__SLUG[d.id] ? '/tai-lieu/' + window.__SLUG[d.id] : '/#tl-' + d.id) + '">' + cover + '<div class="body"><h3>' + esc(d.title) + '</h3><p>' + esc(shortOf(d)) + '</p><div class="meta"><span>' + esc(t.name) + '</span>' + (d.series ? '<span>' + esc(d.series) + '</span>' : '') + '</div></div></a>';
  };

  const HOOK = {
    "thi-vao-10": "Kỳ thi tuyển sinh vào lớp 10 là cột mốc quan trọng, và luyện đề sát cấu trúc thật là cách ôn hiệu quả nhất.",
    "thpt-qg": "Kỳ thi tốt nghiệp THPT môn Tiếng Anh đòi hỏi vừa chắc kiến thức vừa quen tốc độ làm bài.",
    "hsg": "Ôn thi học sinh giỏi cần nguồn tài liệu nâng cao, có hệ thống và có đáp án để tự kiểm tra.",
    "thi-vao-6": "Thi vào lớp 6 trường chất lượng cao cần làm quen sớm với dạng đề và mức độ khó.",
    "dgnl": "Phần Tiếng Anh trong bài thi đánh giá năng lực có cách ra đề riêng, cần luyện đúng dạng.",
    "giao-vien": "Tiết kiệm thời gian soạn bài là điều mọi giáo viên Tiếng Anh đều cần.",
    "game-day-hoc": "Một trò chơi 5 phút đầu giờ có thể làm cả lớp hào hứng suốt tiết học.",
    "luyen-nghe": "Nghe là kỹ năng nhiều bạn ngại nhất, nhưng chỉ cần luyện đều đặn mỗi ngày là tiến bộ rõ.",
    "ky-nang": "Ngữ pháp và từ vựng vững là nền tảng cho mọi kỹ năng nghe – nói – đọc – viết.",
    "ielts": "IELTS cần luyện đều cả bốn kỹ năng với tài liệu đúng định dạng đề thi."
  };
  const TYPEDESC = {
    de: "tuyển tập đề thi, đề kiểm tra được biên soạn theo đúng định dạng, giúp học sinh làm quen cấu trúc đề, rèn tốc độ và phát hiện lỗ hổng kiến thức trước kỳ thi",
    bt: "hệ thống bài tập luyện tập theo từng nội dung, đi từ cơ bản đến nâng cao, giúp học sinh củng cố kiến thức đã học trên lớp",
    tv: "tài liệu tổng hợp từ vựng và ngữ pháp trọng tâm, trình bày rõ ràng kèm bài tập vận dụng",
    nghe: "tài liệu luyện nghe kèm file audio, giúp học sinh quen giọng đọc, ngữ điệu và các dạng câu hỏi nghe thường gặp",
    ppt: "bộ bài giảng PowerPoint trình chiếu sẵn, bố cục rõ ràng, giáo viên có thể dùng ngay hoặc chỉnh sửa theo lớp mình",
    ga: "bộ giáo án / kế hoạch bài dạy soạn theo mẫu hiện hành, định dạng dễ chỉnh sửa",
    hsg: "tài liệu bồi dưỡng học sinh giỏi gồm các chuyên đề nâng cao và đề luyện có độ phân hóa cao",
    khac: "bộ tài liệu tổng hợp nhiều dạng nội dung hữu ích cho việc dạy và học",
    game: "game PowerPoint dùng cho khởi động, ôn tập hoặc kiểm tra bài cũ; giáo viên chỉ cần thay câu hỏi theo bài học là dùng được ngay"
  };
  const TIPS = {
    de: ["In đề ra giấy và bấm giờ như thi thật.", "Làm xong toàn bộ rồi mới đối chiếu đáp án, ghi lại các câu sai.", "Ôn lại phần kiến thức còn yếu trước khi chuyển sang đề tiếp theo."],
    bt: ["Làm bài tập ngay sau khi học xong bài tương ứng trên lớp.", "Đánh dấu dạng bài hay sai để ôn lại cuối tuần.", "Giáo viên có thể chọn lọc bài tập để giao về nhà."],
    tv: ["Học mỗi ngày một ít, đọc to từ và ví dụ.", "Tự đặt câu với từ / cấu trúc vừa học.", "Làm phần bài tập vận dụng để nhớ lâu hơn."],
    nghe: ["Nghe lần đầu không xem lời, sau đó mới đối chiếu.", "Nghe lại những đoạn chưa rõ, tập nói theo (shadowing).", "Luyện 15–20 phút mỗi ngày thay vì dồn một lúc."],
    ppt: ["Mở bằng PowerPoint để chỉnh sửa nội dung, hình ảnh theo lớp.", "Kết hợp với sách giáo khoa và phiếu bài tập.", "Kiểm tra trước phần âm thanh / video nhúng (nếu có)."],
    ga: ["Đối chiếu với phân phối chương trình của trường.", "Điều chỉnh hoạt động cho phù hợp trình độ học sinh.", "Kết hợp cùng bài giảng PowerPoint để tiết dạy sinh động."],
    hsg: ["Học theo từng chuyên đề, làm hết bài tập rồi mới xem key.", "Tổng hợp lỗi sai và cấu trúc hay vào sổ tay riêng.", "Luyện đề tổng hợp có bấm giờ khi gần đến kỳ thi."],
    game: ["Tải về và mở bằng PowerPoint trên máy tính (không trình chiếu trực tiếp trên Google Drive).", "Thay câu hỏi, từ vựng theo bài học trước khi lên lớp.", "Chia lớp thành đội và bấm giờ để tăng tinh thần thi đua."],
    khac: ["Xem nhanh danh sách tệp để chọn phần cần dùng.", "Tải về máy để dùng cả khi không có mạng.", "Chia sẻ cho bạn bè, đồng nghiệp nếu thấy hữu ích."]
  };
  const ICON = n => /\.(docx?)$/i.test(n) ? "📄" : /\.pdf$/i.test(n) ? "📕" : /\.pptx?$/i.test(n) ? "📊" : /\.(mp3|wav|m4a)$/i.test(n) ? "🎧" : /\.(zip|rar|7z)$/i.test(n) ? "🗜️" : /\.(jpe?g|png)$/i.test(n) ? "🖼️" : /\.mp4$/i.test(n) ? "🎬" : "📄";

  function introHTML(d) {
    const f = facts(d), c = catInfo(d.cat) || {}, gm = /^lop-(\d+)$/.exec(d.cat);
    const hook = HOOK[d.cat] || (gm ? "Tiếng Anh lớp " + gm[1] + " theo chương trình GDPT 2018 có nhiều kiến thức mới, học sinh cần được luyện tập thường xuyên để nắm chắc." : "");
    const what = TYPEDESC[d.type] || TYPEDESC.khac;
    const hl = [];
    if (d.series) hl.push("📘 Bám sát sách giáo khoa <b>" + esc(d.series) + "</b>");
    if (f.moi) hl.push("🆕 Cập nhật theo cấu trúc / chương trình mới");
    if (f.key) hl.push("✅ Có đáp án hoặc key để tự kiểm tra");
    if (f.audio || d.flags.includes("nghe")) hl.push("🎧 Kèm " + (f.audio ? f.audio + " " : "") + "file nghe");
    if (f.word) hl.push("📄 " + f.word + " file Word – chỉnh sửa, in ấn dễ dàng");
    if (f.pdf) hl.push("📕 " + f.pdf + " file PDF – xem đẹp trên mọi thiết bị");
    if (f.ppt) hl.push("📊 " + f.ppt + " bài trình chiếu PowerPoint");
    if (f.unit) hl.push("🗂️ Sắp xếp theo từng Unit, dễ tra cứu");
    if (f.exam) hl.push("🗓️ Phù hợp ôn kiểm tra giữa kì, cuối kì");
    if (f.zip) hl.push("🗜️ " + f.zip + " tệp nén – tải một lần là đủ bộ");
    const stats = [];
    if (f.p.t) stats.push(f.p.t + plus(f) + " tệp");
    if (f.p.sc) stats.push(f.p.sc + " thư mục");
    if (d.date) stats.push("Cập nhật " + d.date.split("-").reverse().join("/"));
    if (f.p.d) return f.p.d.map(x => "<p>" + esc(x) + "</p>").join("")
      + (stats.length ? '<div class="stats">' + stats.map(s => "<span>" + esc(s) + "</span>").join("") + "</div>" : "")
      + (f.p.h ? '<h4 style="margin:16px 0 4px">Điểm nổi bật</h4><ul class="hl">' + f.p.h.map(h => "<li>" + esc(h) + "</li>").join("") + "</ul>" : "")
      + '<h4 style="margin:16px 0 4px">Gợi ý sử dụng hiệu quả</h4><ul class="tips">' + (TIPS[d.type] || TIPS.khac).map(t => "<li>" + t + "</li>").join("") + "</ul>";
    return "<p>" + esc(hook) + "</p><p><b>" + esc(d.title) + "</b> là " + what + ". Tài liệu thuộc mục <b>" + esc(c.name) + "</b>, phù hợp với " + esc(audience(d)) + ".</p>"
      + (stats.length ? '<div class="stats">' + stats.map(s => "<span>" + esc(s) + "</span>").join("") + "</div>" : "")
      + (hl.length ? '<h4 style="margin:16px 0 4px">Điểm nổi bật</h4><ul class="hl">' + hl.map(h => "<li>" + h + "</li>").join("") + "</ul>" : "")
      + '<h4 style="margin:16px 0 4px">Gợi ý sử dụng hiệu quả</h4><ul class="tips">' + (TIPS[d.type] || TIPS.khac).map(t => "<li>" + t + "</li>").join("") + "</ul>";
  }

  function treeHTML(d) {
    const p = PV[d.id]; if (!p) return "";
    const items = (p.s || []).map(s => "<li><span>📁</span><span>" + esc(s) + "</span></li>").concat((p.n || []).map(n => "<li><span>" + ICON(n) + "</span><span>" + esc(n) + "</span></li>"));
    if (!items.length) return "";
    const rest = Math.max(0, (p.t || 0) - (p.n || []).length);
    return '<div class="panel"><h3>Bên trong bộ tài liệu có gì?</h3><ul class="tree">' + items.join("") + (rest ? '<li class="more"><span>➕</span><span>và ' + rest + (p.more ? "+" : "") + " tệp khác…</span></li>" : "") + "</ul></div>";
  }

  function galHTML(d) {
    const p = PV[d.id]; if (!p || !p.p || !p.p.length) return "";
    return '<div class="panel"><h3>📸 Xem trước nội dung</h3><div class="gal">' + p.p.map((id, i) => '<button data-pv="' + id + '" aria-label="Phóng to trang ' + (i + 1) + '"><img src="' + TH(id, 500) + '" alt="Trang xem trước ' + (i + 1) + " – " + esc(d.title) + '" onerror="this.parentNode.remove()"></button>').join("") + "</div><small>Bấm vào ảnh để phóng to. Đây là một số trang trích từ bộ tài liệu.</small></div>";
  }

  const _viewDoc = viewDoc;
  viewDoc = function (d) {
    _viewDoc(d);
    const intro = document.querySelector(".panel.intro");
    if (intro) {
      intro.innerHTML = "<h3>Giới thiệu bộ tài liệu</h3>" + introHTML(d);
      intro.insertAdjacentHTML("beforebegin", galHTML(d));
      const info = intro.nextElementSibling;
      if (info) info.insertAdjacentHTML("beforebegin", treeHTML(d));
    }
    document.querySelectorAll("[data-pv]").forEach(b => b.onclick = () => {
      lb.querySelector("img").src = TH(b.dataset.pv, 1400);
      lb.querySelector("a").href = "https://drive.google.com/file/d/" + b.dataset.pv + "/view";
      lb.classList.add("show");
    });
    document.title = d.title + " – " + CONFIG.siteName;
  };

  fetch("/data.json", { cache: "no-cache" }).then(r => r.json()).then(j => {
    PV = j; window.__PVJ = j; window.__SLUG = j.__slug || {};
    (j.__cats || []).forEach(c => { if (!EXAMS.find(e => e.key === c.key)) EXAMS.push(c); });
    (j.__new || []).forEach(([id, title, cat, type, series, flags, date]) => {
      if (!DOCS.find(x => x.id === id)) DOCS.push({ id, title, cat, type, series, flags: flags ? flags.split(",") : [], date,
        isNew: !!date && (Date.now() - new Date(date)) / 864e5 <= NEW_DAYS, link: driveLink(id, flags ? flags.split(",") : []) });
    });
    DOCS.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    EXAMS_ON.length = 0; EXAMS.filter(e => DOCS.some(d => d.cat === e.key)).forEach(e => EXAMS_ON.push(e));
    route();
  }).catch(() => {});
})();

;/* ===== SEO: link tĩnh cho chuyên mục + dữ liệu có cấu trúc ===== */
(function () {
  const SITE = "https://tailieu.hoclieuxanh.com";
  const isCat = k => /^lop-\d+$/.test(k) || EXAMS.some(e => e.key === k);
  const fix = root => root.querySelectorAll('a[href^="/#"]').forEach(a => { const k = a.getAttribute("href").slice(2); if (isCat(k)) a.setAttribute("href", "/" + k); });
  new MutationObserver(() => fix(document)).observe(document.body, { childList: true, subtree: true }); fix(document);
  function ld(o) { let s = document.getElementById("ld"); if (!s) { s = document.createElement("script"); s.type = "application/ld+json"; s.id = "ld"; document.head.appendChild(s); } s.textContent = JSON.stringify(o); }
  const crumb = items => ({ "@type": "BreadcrumbList", itemListElement: items.map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x[0], item: x[1] })) });
  const _vd = viewDoc;
  viewDoc = function (d) {
    _vd(d);
    const c = catInfo(d.cat) || {}, url = SITE + "/tai-lieu/" + ((window.__SLUG || {})[d.id] || "");
    ld({ "@context": "https://schema.org", "@graph": [crumb([["Trang chủ", SITE + "/"], [c.name, SITE + "/" + d.cat], [d.title, url]]),
      { "@type": "LearningResource", name: d.title, url, description: shortOf(d), inLanguage: "vi", isAccessibleForFree: true, educationalLevel: c.name,
        learningResourceType: (TYPES[d.type] || {}).name, about: "Tiếng Anh", datePublished: d.date || undefined,
        provider: { "@type": "Organization", name: CONFIG.siteName, url: SITE + "/" } }] });
  };
  const _vc = viewCat;
  viewCat = function (k) {
    _vc(k);
    const c = catInfo(k); if (!c) return;
    document.title = c.name + " – Đề thi, bài tập, tài liệu miễn phí | " + CONFIG.siteName;
    ld({ "@context": "https://schema.org", "@graph": [crumb([["Trang chủ", SITE + "/"], [c.name, SITE + "/" + k]]),
      { "@type": "CollectionPage", name: c.name, url: SITE + "/" + k, description: c.desc, inLanguage: "vi" }] });
  };
  const _vh = viewHome;
  viewHome = function (a) { _vh(a); ld({ "@context": "https://schema.org", "@type": "WebSite", name: CONFIG.siteName, url: SITE + "/", inLanguage: "vi" }); };
})();
