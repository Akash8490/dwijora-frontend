# Volume 01 · Issue 01 — paper PDF replacement (2026-10-16)

Client supplied corrected PDFs from `Downloads/` (filenames `1-BBB-C.pdf` … `8-RASHMIKABEN-C.pdf`).

Each file was matched to the existing mock paper **before** copy:

| # | Source file | Target `public/papers/<slug>.pdf` | Content checks |
|---|-------------|-----------------------------------|----------------|
| 1 | `1-BBB-C.pdf` | `multimedia-in-distance-education.pdf` | Author/email `Bharat`, `bharatbharvad`; **10** PDF pages = pp. 1–10 |
| 2 | `2-ARS-C.pdf` | `nep-2020-teacher-education-bed-colleges.pdf` | **ARS** = Aashka R. Sharma (paper 2 author); **7** pages = pp. 11–17 |
| 3 | `3-NAYAN-C.pdf` | `educational-leadership-in-context-of-quality.pdf` | `Nayan`, `Parmar` in file; **7** pages = pp. 18–24 |
| 4 | `4- BHAVIKA-C.pdf` | `hindi-language-teaching-ai-multilingualism-active-learning.pdf` | `bhaviketan` email; **11** pages = pp. 25–35 |
| 5 | `5-Nishtha Ahuja-C.pdf` | `agricultural-data-security-digital-agriculture.pdf` | `Nishtha`, `nishthaahuja`; **23** pages = pp. 36–58 |
| 6 | `6-Darshan Gajjar-C.pdf` | `golwalkar-political-thought-modern-india.pdf` | `Darshan`, `Gajjar`; **12** pages = pp. 59–70 |
| 7 | `7-BHAVIN-C.pdf` | `marsiya-gujarati-folk-elegies.pdf` | `Gadhvi` (Bhavin Gadhvi); **19** pages ≈ pp. 71–88 (issue layout) |
| 8 | `8-RASHMIKABEN-C.pdf` | `indian-childrens-literature-global-perspective.pdf` | `Rashmika`, `rashmikabhoi`; **7** pages = pp. 89–95 |

`pdfUrl` in `app/lib/services/mock/journal.mock.ts` is unchanged (`/papers/${slug}.pdf`).
