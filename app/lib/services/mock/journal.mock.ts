import { BRAND } from "@/app/lib/brand";
import type {
  Author,
  Category,
  Editor,
  Issue,
  JournalMeta,
  JournalPage,
  Paper,
  Submission,
  Volume,
} from "@/app/utils/types/journal.type";

export const journalMeta: JournalMeta = {
  name: BRAND.nameRoman,
  nameDevanagari: BRAND.nameDeva,
  shloka: BRAND.shlokaDeva,
  shlokaTranslation: BRAND.shlokaTranslation,
  tagline: BRAND.subtitle,
  // TODO(client): replace ISSN placeholders once assigned by CSIR-NIScPR.
  issn: "0000-0000",
  eIssn: "0000-000X",
  publisher: "Mr. Siddhant Boliya",
  // TODO(client): supply the full postal address of the publishing body
  // (street, city, state, PIN, country) — required by ISSN India Point 2.
  publisherAddress:
    "Institute of Multidisciplinary Research & Journals (IMRJ), India",
  editorInChief: "Dr. Gopal Bharvad",
  contactEmail: "visvasamvidimrj@gmail.com",
  // TODO(client): supply a public contact phone.
  contactPhone: "+91 00000 00000",
  address: "IMRJ, India",
  frequency: "Quarterly (4 issues per year)",
  scope:
    "Education, humanities, social sciences, sciences, technology, management and interdisciplinary research.",
  startingYear: 2026,
  publicationFormat: "Online",
  subject: "Multidisciplinary — Education and Research",
  languages: ["English", "Hindi", "Gujarati"],
};

export const categories: Category[] = [
  { id: "c1", slug: "education", name: "Education", description: "Curriculum, pedagogy, policy." },
  { id: "c2", slug: "humanities", name: "Humanities", description: "Literature, philosophy, history." },
  { id: "c3", slug: "social-sciences", name: "Social Sciences", description: "Sociology, psychology, economics." },
  { id: "c4", slug: "sciences", name: "Sciences", description: "Physical, life & environmental sciences." },
  { id: "c5", slug: "technology", name: "Technology", description: "Engineering, computing, applied tech." },
  { id: "c6", slug: "management", name: "Management", description: "Business, organisations, strategy." },
  { id: "c7", slug: "interdisciplinary", name: "Interdisciplinary", description: "Cross-domain scholarship." },
];

const A = (id: string, fullName: string, affiliation: string, extras?: Partial<Author>): Author => ({
  id,
  fullName,
  affiliation,
  ...extras,
});

// --- Real authors from Volume 01, Issue 01 (August–October 2026) --------------
// TODO(client): affiliation for Dr. Bhavikaben C. Vasava (Paper 4) is not
// stated in the manuscript — request it and update below.
export const authorsPool: Author[] = [
  A(
    "a-bharat-bharvad",
    "Dr. Bharatbhai B. Bharvad",
    "Shree Bhikhabhai Patel Arts College, Sardar Patel University, Vallabh Vidyanagar, Gujarat, India",
    { country: "India", isCorresponding: true, email: "bharatbharvad07818@gmail.com" },
  ),
  A(
    "a-aashka-sharma",
    "Dr. Aashka R. Sharma",
    "Smt. P.K. Inamdar College of Education, Gujarat, India",
    { country: "India", isCorresponding: true, email: "1191aashka@gmail.com" },
  ),
  A(
    "a-nayan-parmar",
    "Dr. Nayan C. Parmar",
    "Composite Regional Centre for Skill Development, Rehabilitation & Empowerment of Persons with Disabilities (Divyangjan), Ahmedabad, India",
    { country: "India", isCorresponding: true, email: "drnayanparmar2023@gmail.com" },
  ),
  A(
    "a-bhavikaben-vasava",
    "डॉ. भाविकाबेन छत्रसिंह वसावा",
    // TODO(client): affiliation not stated in the manuscript — request it.
    "Affiliation to be confirmed",
    { country: "India", isCorresponding: true, email: "bhaviketan143@gmail.com" },
  ),
  A(
    "a-nishtha-ahuja",
    "Ms. Nishtha Ahuja",
    // TODO(client): manuscript states only "Agricultural Data Analyst and
    // Researcher"; confirm institutional affiliation if any.
    "Independent Researcher, India",
    { country: "India", isCorresponding: true, email: "nishthaahuja8070@gmail.com" },
  ),
  A(
    "a-darshan-gajjar",
    "Mr. Darshan Gajjar",
    "Institute of Language Studies and Applied Social Sciences (ILSASS), The CVM University, Vallabh Vidyanagar, Gujarat, India",
    { country: "India", isCorresponding: true, email: "darshangajjar30@gmail.com" },
  ),
  A(
    "a-bhavin-gadhvi",
    "ભાવિનકુમાર અજીતભાઈ ગઢવી",
    "Postgraduate Gujarati Department, Sardar Patel University, Vallabh Vidyanagar, Gujarat, India",
    { country: "India", isCorresponding: true, email: "bagadhvi@gmail.com" },
  ),
  A(
    "a-rashmikaben-bhoi",
    "डॉ. रश्मिकाबेन भीखाभाई भोई",
    "Maharaja Sayajirao University of Baroda, Vadodara, Gujarat, India",
    { country: "India", isCorresponding: true },
  ),
];

// --- Volumes ------------------------------------------------------------------
// Only Volume 01 exists so far. New volumes will be appended here as they
// publish; issues array below is the source of truth for issueIds.
export const volumes: Volume[] = [
  {
    id: "v01",
    slug: "volume-01",
    number: 1,
    year: 2026,
    title: "Volume 01",
    issueIds: ["i01-01"],
  },
];

// --- Issues -------------------------------------------------------------------
// Volume 01 → Issue 01 (August–October 2026). Publication date is a
// placeholder — // TODO(client): confirm the exact publication date.
export const issues: Issue[] = [
  {
    id: "i01-01",
    slug: "vol-01-issue-01",
    volumeId: "v01",
    number: 1,
    title: "Volume 01, Issue 01 · August–October 2026",
    month: "August–October",
    year: 2026,
    coverImage: null,
    publishedAt: "2026-08-01",
    paperIds: [
      "p01-01",
      "p01-02",
      "p01-03",
      "p01-04",
      "p01-05",
      "p01-06",
      "p01-07",
      "p01-08",
    ],
  },
];

// --- Papers -------------------------------------------------------------------
// Real papers for Vol. 01, Issue 01. Titles, abstracts, keywords, and author
// names/emails are the client-supplied manuscript metadata — use verbatim.
// TODO(client): confirm final page numbers (currently taken from manuscripts).
// TODO(client): confirm the exact publication date (currently "2026-08-01").

const P = (
  id: string,
  slug: string,
  title: string,
  abstract: string,
  authorIds: string[],
  keywords: string[],
  categoryId: string,
  volumeId: string,
  issueId: string,
  pageStart: number,
  pageEnd: number,
  publishedAt: string,
  extras?: Partial<Pick<Paper, "doi" | "language" | "titleAlt">>,
): Paper => ({
  id,
  slug,
  title,
  abstract,
  authors: authorIds
    .map((aid) => authorsPool.find((a) => a.id === aid))
    .filter((a): a is Author => Boolean(a)),
  keywords,
  categoryId,
  volumeId,
  issueId,
  pageStart,
  pageEnd,
  publishedAt,
  pdfUrl: `/papers/${slug}.pdf`,
  status: "published",
  language: extras?.language ?? "en",
  ...(extras?.titleAlt ? { titleAlt: extras.titleAlt } : {}),
  ...(extras?.doi ? { doi: extras.doi } : {}),
});

export const papers: Paper[] = [
  P(
    "p01-01",
    "multimedia-in-distance-education",
    "Use of Multimedia in Distance Education",
    "The advent of multimedia has revolutionized distance education, bridging the gap between educators and learners separated by geographical boundaries. Multimedia, encompassing text, audio, video, graphics, animations, and interactive tools, has enhanced the accessibility, engagement, and efficacy of distance learning. This research paper delves into the transformative role of multimedia in distance education, emphasizing its benefits, challenges, and future potential. Distance education has evolved from correspondence courses to sophisticated digital platforms leveraging multimedia technologies. These technologies facilitate dynamic and interactive learning environments that cater to diverse learner needs. Mayer's Cognitive Theory of Multimedia Learning underscores the psychological basis for integrating multimedia, suggesting that well-designed multimedia content can improve comprehension and retention. Tools such as virtual labs, video lectures, and gamified learning platforms have made education more engaging and accessible, especially in fields like STEM, arts, and professional training. While the advantages are significant, challenges persist. The digital divide and technological barriers hinder equitable access, especially in remote or underprivileged regions. Additionally, creating high-quality multimedia content often requires substantial resources and expertise. Case studies of platforms like Coursera, edX, and Open University highlight successful applications of multimedia in various educational contexts, demonstrating how thoughtful implementation can overcome these barriers. Looking ahead, emerging technologies like augmented reality, virtual reality, and artificial intelligence promise to further enhance multimedia's role in distance education. However, stakeholders must prioritize inclusivity and accessibility to ensure these advancements benefit all learners. This paper concludes that multimedia is indispensable for modern distance education. It not only enriches the learning experience but also democratizes education, making it more inclusive and effective. Policymakers, educators, and technologists must collaborate to address existing challenges and harness multimedia's full potential to transform the future of learning.",
    ["a-bharat-bharvad"],
    [
      "Distance Education",
      "Multimedia Learning",
      "E-Learning Tools",
      "Interactive Learning",
      "Educational Technology",
      "Digital Pedagogy",
      "Online Learning Platforms",
    ],
    "c1",
    "v01",
    "i01-01",
    1,
    10,
    "2026-08-01",
  ),
  P(
    "p01-02",
    "nep-2020-teacher-education-bed-colleges",
    "A Comparative Analysis of NEP 2020 and Existing Teacher Education Policies: Implementations for B.Ed Colleges",
    "The National Education Policy (NEP) 2020 has brought significant reforms to teacher education in India, aiming to improve the quality and relevance of teacher preparation. This research paper presents a comparative analysis of NEP 2020 and existing teacher education policies, focusing on implementations for B.Ed colleges. The study examines the key reforms introduced by NEP 2020, including the four-year integrated B.Ed. degree, multidisciplinary approach, experiential learning, and digital literacy. A comparative analysis of NEP 2020 and existing policies reveals significant differences in curriculum, teacher qualifications, and institutional frameworks. The paper highlights the implications of NEP 2020 for B.Ed colleges, including curriculum redesign, faculty development, and infrastructure upgrades. The study concludes that effective implementation of NEP 2020 requires collaborative efforts from policymakers, institutions, and stakeholders to ensure that B.Ed colleges are equipped to produce high-quality teachers who can meet the demands of 21st-century education.",
    ["a-aashka-sharma"],
    [
      "NEP 2020",
      "Teacher Education",
      "B.Ed Colleges",
      "Comparative Analysis",
      "Implementation",
    ],
    "c1",
    "v01",
    "i01-01",
    10,
    16,
    "2026-08-01",
  ),
  P(
    "p01-03",
    "educational-leadership-in-context-of-quality",
    "Leadership in Excellence: Development of Educational Leadership in the Context of Quality",
    "The pursuit of quality in education has become a global priority as societies increasingly recognize its role in economic growth, social equity, and cultural advancement. Educational leadership, a crucial determinant of institutional success, serves as the backbone for achieving this goal. This research examines the dynamics of educational leadership, analyzing its impact on quality improvement across various educational contexts. By integrating theoretical perspectives, real-world examples, and empirical evidence, the article explores how leadership practices influence teaching, learning, and organizational development. Specific emphasis is placed on leadership styles, the challenges leaders face, and strategies for fostering leadership excellence in education.",
    ["a-nayan-parmar"],
    [
      "Educational Leadership",
      "Quality Education",
      "Leadership Development",
      "Transformational Leadership",
      "Instructional Leadership",
      "Distributed Leadership",
    ],
    "c1",
    "v01",
    "i01-01",
    17,
    24,
    "2026-08-01",
  ),
  P(
    "p01-04",
    "hindi-language-teaching-ai-multilingualism-active-learning",
    "कृत्रिम बुद्धिमत्ता, बहुभाषिकता एवं सक्रिय अधिगम को एकीकृत करने वाली हिन्दी भाषा शिक्षण की शैक्षिक प्रतिमान",
    "वर्तमान समय में शिक्षा के क्षेत्र में कृत्रिम बुद्धिमत्ता (Artificial Intelligence), डिजिटल तकनीक, बहुभाषिकता एवं सक्रिय अधिगम का प्रभाव निरंतर बढ़ रहा है। भाषा शिक्षण के संदर्भ में इन नवीन आयामों का समन्वित उपयोग शिक्षण-अधिगम प्रक्रिया को अधिक विद्यार्थी-केंद्रित, संवादात्मक, सृजनात्मक एवं कौशल-आधारित बना सकता है। भारत जैसे बहुभाषिक देश में हिन्दी भाषा शिक्षण के लिए विद्यार्थियों की भाषाई विविधता को समझना तथा उसे शिक्षण संसाधन के रूप में प्रयोग करना आवश्यक है। इसी प्रकार कृत्रिम बुद्धिमत्ता के माध्यम से व्यक्तिगत अधिगम, त्वरित प्रतिक्रिया, डिजिटल सामग्री, संवादात्मक अभ्यास तथा भाषा कौशलों के विकास की संभावनाएँ बढ़ी हैं। प्रस्तुत शोध-पत्र का उद्देश्य कृत्रिम बुद्धिमत्ता, बहुभाषिकता एवं सक्रिय अधिगम के समन्वित प्रयोग की संभावनाओं का विश्लेषण करते हुए हिन्दी भाषा शिक्षण के लिए एक नवीन शैक्षिक प्रतिमान प्रस्तुत करना है। अध्ययन में वर्णनात्मक एवं विश्लेषणात्मक दृष्टिकोण के आधार पर संबंधित साहित्य, राष्ट्रीय शिक्षा नीति 2020, भाषा शिक्षण के सिद्धांत तथा सक्रिय अधिगम की अवधारणाओं का विश्लेषण किया गया है। अध्ययन के आधार पर यह स्पष्ट होता है कि AI को बहुभाषिक एवं सक्रिय अधिगम रणनीतियों के साथ एकीकृत करने से हिन्दी भाषा के सुनने, बोलने, पढ़ने एवं लिखने के कौशलों के विकास के साथ-साथ रचनात्मकता, आलोचनात्मक चिंतन, सहयोग एवं अधिगम अभिप्रेरणा को भी बढ़ावा दिया जा सकता है। साथ ही AI के प्रयोग में तथ्यात्मक शुद्धता, डिजिटल विभाजन, शिक्षक की भूमिका, डेटा गोपनीयता एवं नैतिकता जैसी चुनौतियों को ध्यान में रखना आवश्यक है।",
    ["a-bhavikaben-vasava"],
    [
      "कृत्रिम बुद्धिमत्ता",
      "हिन्दी भाषा शिक्षण",
      "बहुभाषिकता",
      "सक्रिय अधिगम",
      "डिजिटल शिक्षा",
      "भाषा दक्षता",
      "शैक्षिक प्रतिमान",
    ],
    "c1",
    "v01",
    "i01-01",
    24,
    35,
    "2026-08-01",
    {
      language: "hi",
      // TODO(client): confirm the official English title for the Hindi paper.
      titleAlt:
        "An Educational Model for Hindi Language Teaching Integrating Artificial Intelligence, Multilingualism and Active Learning",
    },
  ),
  P(
    "p01-05",
    "agricultural-data-security-digital-agriculture",
    "Agricultural Data Security: Safeguarding Digital Agriculture in the Era of Precision Farming and Smart Agriculture",
    "The rapid digital transformation of agriculture has fundamentally redefined agricultural production by integrating precision farming, artificial intelligence (AI), Internet of Things (IoT), cloud computing, remote sensing, blockchain, unmanned aerial vehicles (UAVs), and data-driven decision support systems into everyday farming operations. While these technological innovations have substantially improved agricultural productivity, sustainability, and resource efficiency, they have simultaneously generated unprecedented cybersecurity challenges. Agricultural data have emerged as strategic digital assets encompassing farm management records, geospatial information, sensor outputs, machinery telemetry, genomic databases, climate intelligence, and supply-chain information. Consequently, cyberattacks targeting agricultural systems now threaten not only data confidentiality but also food security, economic resilience, environmental sustainability, and national security. This article critically examines the concept of agricultural data security within the broader framework of Agriculture 4.0 and smart farming. It analyses the evolving agricultural data ecosystem, identifies major cyber threats confronting precision agriculture, evaluates contemporary technological and governance-based security solutions, and examines emerging policy frameworks governing agricultural data. Drawing upon recent peer-reviewed literature, international standards, and documented cybersecurity incidents affecting the global food and agriculture sector, the article argues that agricultural data security must evolve beyond conventional information security towards an integrated cyber-physical resilience framework. The study concludes that securing agricultural data represents one of the most significant prerequisites for achieving sustainable, resilient, and digitally inclusive agricultural systems in the era of Agriculture 5.0.",
    ["a-nishtha-ahuja"],
    [
      "Agricultural Data Security",
      "Precision Agriculture",
      "Smart Farming",
      "Agriculture 4.0",
      "Cybersecurity",
      "Internet of Things",
      "Food Security",
      "Digital Agriculture",
    ],
    "c5",
    "v01",
    "i01-01",
    36,
    58,
    "2026-08-01",
  ),
  P(
    "p01-06",
    "golwalkar-political-thought-modern-india",
    "Political Thought of M. S. Golwalkar and Its Contribution to the Formation of Modern India",
    "The political thought of Madhav Sadashiv Golwalkar (1906–1973), popularly known as Guruji, occupies a significant position in the intellectual history of modern India. As the second Sarsanghchalak of the Rashtriya Swayamsevak Sangh (RSS), Golwalkar transformed the organisation into one of the most influential socio-cultural movements in independent India. His writings, particularly We, or Our Nationhood Defined (1939) and Bunch of Thoughts (1966), articulated a conception of India grounded in cultural nationalism, civilisational continuity, and the primacy of Hindu identity. Although Golwalkar never occupied public office, his ideological influence has extended far beyond the RSS, shaping political organisations, public discourse, and debates concerning nationalism, secularism, and national integration. This article examines Golwalkar's political philosophy by analysing his understanding of nationhood, the state, democracy, cultural identity, and social organisation. It further evaluates the contribution of his ideas to the formation of modern India while acknowledging the scholarly criticisms regarding pluralism, minority rights, and constitutional secularism. The article argues that Golwalkar's political thought remains indispensable for understanding the evolution of Hindu nationalism and contemporary Indian politics, irrespective of ideological agreement or disagreement. His intellectual legacy continues to influence debates on national identity, governance, and the relationship between culture and politics in twenty-first-century India.",
    ["a-darshan-gajjar"],
    [
      "M. S. Golwalkar",
      "Hindutva",
      "Cultural Nationalism",
      "RSS",
      "Political Thought",
      "Modern India",
      "Hindu Nationalism",
    ],
    "c3",
    "v01",
    "i01-01",
    59,
    70,
    "2026-08-01",
  ),
  P(
    "p01-07",
    "marsiya-gujarati-folk-elegies",
    "ભારતીય લોકસંસ્કૃતિની મૂલ્યવાન સરવાણી: મરસિયા",
    "ભારતીય જ્ઞાનપરંપરાના સંદર્ભમાં અહીં મરસિયા વિશે વિસ્તૃત માહિતી આપવાનો પ્રયાસ કરવામાં આવ્યો છે. લોકસાહિત્યના વિવિધ સ્વરૂપોમાં એક મહત્ત્વનું સ્વરૂપ એટલે લોકગીત. વિવિધ સાહિત્યકારોએ પોતપોતાના મત મુજબ લોકગીતોનું વર્ગીકરણ કર્યું છે અને તેના પ્રકારો આપ્યા છે, જેમાં હાલરડાં, ગોરમાનાં ગીતો, લગ્નગીતો, રાંદલનાં ગીતો, તુલસી વિવાહનાં ગીતો, ઉત્સવ-મેળાનાં ગીતો, રાસ/રાસડા, ગરબા/ગરબીઓ, સંતવાણી/ભજન અને મરસિયાનો સમાવેશ થાય છે. આ દસ પ્રકારોમાંથી અહીં મરસિયા વિશે વાત કરવામાં આવી છે. ભારતીય સંતો, ઋષિમુનિઓ, ચિંતકો અને સમર્થ સાહિત્યકારોએ મૃત્યુ સંદર્ભે અનેક વાતો કરી છે. જે જન્મે છે તેનું મૃત્યુ નિશ્ચિત છે — એ સનાતન સત્ય છે, પરંતુ આત્મા અમર છે. ભગવાન શ્રી કૃષ્ણએ પણ કુરુક્ષેત્રના મેદાનમાં અર્જુનને પોતાના વિરાટ સ્વરૂપનું દર્શન કરાવીને આત્માની અમરતા, દેહની નશ્વરતા અને કર્મનો સિદ્ધાંત સમજાવ્યો હતો. માનવજીવનની નશ્વરતા શાશ્વત હોવા છતાં વ્યક્તિ દુન્યવી મોહમાયાને કારણે સંબંધોની માયાજાળમાં ફસાય છે, અને સ્વજનની વિદાય તેને ખટકે છે. આ પરંપરા માત્ર ગુજરાત કે ભારતમાં જ નહીં પણ વિશ્વના બધા દેશો, વિવિધ ભાષાઓ અને પ્રજાઓમાં દૃષ્ટિગોચર થાય છે — ભારતીય જ્ઞાનપરંપરાના સંદર્ભમાં આ વિષય સાર્વભૌમ અને સનાતન જણાય છે. પ્રસ્તુત લેખમાં મરસિયાનો અર્થ, વ્યાખ્યા, વિવિધ સાહિત્યમાંનાં વિલાપકાવ્યો તથા મરસિયાનાં વિષય-વૈવિધ્યની વિસ્તારપૂર્વક ચર્ચા કરવામાં આવી છે.",
    ["a-bhavin-gadhvi"],
    [
      "મરસિયા",
      "લોકસાહિત્ય",
      "લોકગીત",
      "વિલાપકાવ્ય",
      "કરુણપ્રશસ્તિ",
      "ભારતીય જ્ઞાનપરંપરા",
      "ગુજરાતી લોકસંસ્કૃતિ",
    ],
    "c2",
    "v01",
    "i01-01",
    71,
    88,
    "2026-08-01",
    {
      language: "gu",
      // TODO(client): confirm the official English title for the Gujarati paper.
      titleAlt:
        "The Valuable Stream of Indian Folk Culture: Marsiya (Elegies)",
    },
  ),
  P(
    "p01-08",
    "indian-childrens-literature-global-perspective",
    "भारतीय बालकथाओं का वैश्विक दृष्टिकोण से अभ्यास",
    "भारतीय बाल साहित्य हमारी प्राचीन विरासत है। यह एक तथ्य है कि भारत में 'बाल साहित्य' शब्द पश्चिम से आया है, लेकिन क्या इसका मतलब यह है कि बाल साहित्य हमारे पास पश्चिम से आया है? भारत के प्राचीन साहित्य — पंचतंत्र, हितोपदेश — में हमें बाल साहित्य के अवशेष मिलते हैं। भारत में हम व्यक्ति, समाज, संस्कृति, साहित्य आदि में वैश्विकता देखते हैं। इस शोध पत्र में भारतीय बाल कहानियों में वैश्विकता कैसे दिखती है, भारत की धरती पर जिस तरह से एक बच्चे का पालन-पोषण होता है वह दुनिया के बच्चों के लिए कैसे उपयोगी होगा, हमारी कहानियों से दुनिया के बच्चे कैसे बड़े हुए, दुनिया ने भारतीय बाल साहित्य से क्या लिया — इन सभी का अध्ययन इस शोध लेख में किया गया है। भारतीय बालकथाएँ न केवल बच्चों के लिए मनोरंजन का माध्यम रही हैं, बल्कि जीवन के नैतिक, सामाजिक और सांस्कृतिक पहलुओं की भी शिक्षा देती रही हैं। पंचतंत्र, हितोपदेश और जटायुकथा जैसे ग्रंथों में बाल साहित्य के प्राचीन स्वरूप के उदाहरण देखे जा सकते हैं। भारतीय बाल साहित्य की वैश्विकता न केवल भारतीय समाज, बल्कि पूरी दुनिया के बच्चों के जीवन में एक सकारात्मक बदलाव लाने में सक्षम है।",
    ["a-rashmikaben-bhoi"],
    [
      "भारतीय बाल साहित्य",
      "वैश्विक दृष्टिकोण",
      "पंचतंत्र",
      "हितोपदेश",
      "नैतिक शिक्षा",
      "सांस्कृतिक विविधता",
      "बालकथाएँ",
    ],
    "c2",
    "v01",
    "i01-01",
    89,
    95,
    "2026-08-01",
    {
      language: "hi",
      // TODO(client): confirm the official English title for the Hindi paper.
      titleAlt:
        "A Study of Indian Children's Stories from a Global Perspective",
    },
  ),
];

// Editorial board — real members supplied by the client.
// TODO(client): add member photos. Photos will be dropped into
//   public/editorial-board/<slug>.jpg and referenced via `photoUrl`.
// Do not add private data (DOB, home addresses, personal mobile numbers) —
// those were intentionally excluded.
export const editors: Editor[] = [
  {
    id: "bm-01",
    slug: "prabhat-m-kasra",
    fullName: "Dr. Prabhatbhai M. Kasra",
    designation: "Principal, Sardar Patel College of Education, Bakrol",
    affiliation:
      "Sardar Patel College of Education, Bakrol (Sardar Patel University)",
    country: "India",
    qualifications: [
      "Ph.D. (Education)",
      "M.Phil.",
      "M.Ed.",
      "B.Ed.",
      "M.A. (Sanskrit)",
      "B.A.",
    ],
    specializations: [
      "Teacher Education",
      "Indian Knowledge Systems",
      "Sanskrit Education",
      "NEP 2020",
      "Educational Research",
      "Research Methodology",
    ],
    bio: "Dr. Prabhatbhai M. Kasra is an experienced teacher educator, researcher, and academic administrator with over 22 years in higher education, currently serving as Principal of Sardar Patel College of Education, Bakrol. He holds a Ph.D. in Education from Sardar Patel University, with doctoral research on the educational philosophy of Shrimad Rajchandra. He has authored more than 25 research papers, published books and edited academic volumes, and presented widely at national and international conferences. His academic interests include Teacher Education, Indian Knowledge Systems, Sanskrit Education, NEP 2020, and Research Methodology.",
    honours: ["Best Principal Award", "National Excellency Award"],
    email: "prabhatkasra.bed@spec.edu.in",
    profileUrl:
      "https://www.spec.edu.in/specbed/Staff-Profile.aspx?cid=6&sid=336",
    photoUrl: null,
    // Moved from Chief Editor to Editor per client instruction. Kept at
    // displayOrder 2 so he sits at the top of the Editors grid — the senior
    // editor immediately below the new Chief.
    role: "associate_editor",
    boardGroup: "editor",
    boardRole: "Editor",
    displayOrder: 2,
  },
  {
    id: "bm-02",
    slug: "neha-j-nandaniya",
    fullName: "Dr. Neha J. Nandaniya",
    role: "associate_editor",
    boardGroup: "editor",
    boardRole: "Editor",
    designation: "Assistant Professor",
    affiliation:
      "M.B. Patel College of Education, Sardar Patel University, Vallabh Vidyanagar, Gujarat",
    country: "India",
    qualifications: [],
    specializations: [
      "Educational Psychology",
      "Language Education",
      "Educational Technology",
      "Teacher Training & Pedagogical Innovation",
      "Research Methodology",
    ],
    bio: "Dr. Neha J. Nandaniya is an academician and researcher specialising in educational psychology, language education, and educational technology, serving as Assistant Professor at M.B. Patel College of Education, Sardar Patel University. With teaching experience across primary, secondary, and higher education, she has published 15 research papers in UGC CARE-listed and peer-reviewed journals and authored five books. As a research supervisor at Sardar Patel University, she continues to mentor scholars and advance teacher education and innovative pedagogy.",
    email: "nehanandaniya@spuvvn.edu",
    profileUrl: "https://www.spuvvn.edu/team/dr-neha-j-nandaniya/",
    photoUrl: null,
    displayOrder: 2,
  },
  {
    id: "bm-03",
    slug: "dilipbhai-j-vasava",
    fullName: "Dr. Dilipbhai J. Vasava",
    role: "associate_editor",
    boardGroup: "editor",
    boardRole: "Editor",
    designation: "Assistant Professor",
    affiliation:
      "M.B. Patel College of Education, Sardar Patel University, Vallabh Vidyanagar, Gujarat",
    country: "India",
    qualifications: [
      "M.A. (Hindi)",
      "M.Ed.",
      "M.Phil. (Education)",
      "GSET (Education)",
      "Ph.D. (Education) — thesis submitted",
    ],
    specializations: [
      "Teacher Education",
      "Educational Research",
      "Hindi Literature",
      "Curriculum Development",
      "Scholarly Writing",
    ],
    bio: "Dr. Dilipbhai J. Vasava is a teacher educator, researcher, and author specialising in Education and Hindi Literature, serving as Assistant Professor at M.B. Patel College of Education, Sardar Patel University, with over 12 years of teaching experience. He has authored 13 books, translated two, and published more than 50 research papers in peer-reviewed and UGC CARE-listed journals, and has guided eight M.Ed. dissertations. A member of several academic bodies including the Sardar Patel University Board of Studies, he has participated in over 100 national and international conferences and workshops as a presenter and keynote speaker.",
    email: null,
    profileUrl: "https://www.spuvvn.edu/team/mr-dilipbhai-j-vasava/",
    photoUrl: null,
    displayOrder: 3,
  },
  {
    id: "bm-04",
    slug: "ajitsinh-r-gohil",
    fullName: "Dr. Ajitsinh R. Gohil",
    role: "associate_editor",
    boardGroup: "editor",
    boardRole: "Editor",
    designation:
      "Principal, Shri V.J. Patel College of Physical Education, Mogri",
    affiliation:
      "Shri V.J. Patel College of Physical Education, Mogri (Swarnim Gujarat Sports University)",
    country: "India",
    qualifications: [],
    specializations: [
      "Physical Education & Sports Science",
      "Sports Training & Coaching",
      "Curriculum Development",
      "Higher Education Administration",
      "Research Guidance",
    ],
    bio: "Dr. Ajitsinh R. Gohil is an academic leader in physical education and sports sciences, serving as Principal of Shri V.J. Patel College of Physical Education, Mogri, affiliated with Swarnim Gujarat Sports University. He is a Senate Member of Sardar Patel University and serves on the Board of Studies of the Faculty of Physical Education at Swarnim Gujarat Sports University. A recognised M.Phil. and Ph.D. guide, he has mentored research scholars and contributed extensively to teaching, research, and academic administration in sports education.",
    positions: [
      "Senate Member — Sardar Patel University",
      "Board of Studies (Physical Education) — Swarnim Gujarat Sports University",
    ],
    // TODO(client): confirm this is the preferred public email
    email: "ajit970@yahoo.com",
    profileUrl: "https://www.vjbped.ac.in/",
    photoUrl: null,
    displayOrder: 4,
  },
  {
    id: "bm-05",
    slug: "hamis-juma",
    fullName: "Dr. Hamis Juma",
    role: "associate_editor",
    boardGroup: "editor",
    boardRole: "Editor",
    designation: "Head of Research and Innovation, TUSOME",
    affiliation: "TUSOME, Tanzania",
    country: "Tanzania",
    qualifications: ["Ph.D. (Education), Gujarat University"],
    specializations: [
      "Digital Literacy",
      "AI in Education",
      "Psychometric Assessment",
      "Teacher Professional Development",
    ],
    bio: "Dr. Hamis Juma is an education researcher and learning specialist from Tanzania, serving as Head of Research and Innovation at TUSOME. He holds a Doctorate in Education from Gujarat University, and his work focuses on leveraging technology and innovative methodologies to advance education. He has contributed to global organisations including UNESCO, Open Education Global, and 1 Million Teachers, and has published widely on AI-assisted learning, competence-based assessment, and educational transformation.",
    email: "hamis@tusome.ac.tz",
    profileUrl: "https://tz.linkedin.com/in/hamisjuma",
    photoUrl: null,
    displayOrder: 5,
  },
  {
    id: "bm-06",
    slug: "edgar-fidel-nderego",
    fullName: "Dr. Edgar Fidel Nderego",
    role: "associate_editor",
    boardGroup: "editor",
    boardRole: "Editor",
    designation: "Lecturer & Director — Simiyu Regional Centre",
    affiliation:
      "Department of Curriculum and Instruction, The Open University of Tanzania",
    country: "Tanzania",
    qualifications: [
      "Ph.D. (Education), Gujarat University, India — Teacher Education & Curriculum Studies",
      "M.Ed. (Science Education)",
      "B.Ed. (Physical Education, Sport and Culture)",
    ],
    specializations: [
      "Curriculum Development",
      "Educational Technology",
      "Teacher Professionalism",
      "Measurement & Evaluation",
      "Education for Sustainable Development",
    ],
    bio: "Dr. Edgar Fidel Nderego is an accomplished educator, curriculum specialist, researcher, and academic leader with extensive experience in higher education, teacher education, curriculum development, and educational research. He holds a Ph.D. in Education from Gujarat University, India, with specialization in Teacher Education and Curriculum Studies, in addition to a Master of Education in Science Education and a Bachelor of Education in Physical Education, Sport and Culture. Currently serving as a Lecturer in the Department of Curriculum and Instruction at The Open University of Tanzania and Director of the Simiyu Regional Centre, he has over nine years of undergraduate teaching experience and postgraduate teaching and research supervision. His expertise includes curriculum development, educational technology, teacher professionalism, measurement and evaluation, and education for sustainable development. Dr. Nderego has contributed to UNESCO curriculum initiatives, authored several peer-reviewed research publications, presented papers at international conferences, supervised postgraduate research, and held various academic leadership positions. His commitment to quality education, innovative pedagogy, and sustainable development has established him as an active contributor to educational research, curriculum reform, and capacity building in Tanzania and beyond.",
    // Institutional email (ISSN-preferred). Alternative address on file:
    // needgarn@gmail.com — kept private per ISSN India guidelines that
    // discourage personal Gmail addresses on the public board.
    email: "edgar.nderego@out.ac.tz",
    profileUrl: null,
    photoUrl: "/editorial-board/edgar-fidel-nderego.jpg",
    displayOrder: 6,
  },
  {
    id: "bm-07",
    slug: "maheshkumar-parmar-sparsh",
    fullName: "Dr. Maheshkumar Parmar 'Sparsh'",
    role: "review_board",
    boardGroup: "associate",
    boardRole: "Associate Editor & Reviewer",
    designation: "Principal (I/C) & Assistant Professor of Gujarati",
    // TODO(client): source files list two locations (Godhra and Govt. Arts
    // College, Vav) — confirm current posting.
    affiliation: "Government Arts and Science College, Godhra, Gujarat",
    country: "India",
    qualifications: [],
    specializations: [
      "Gujarati Language & Literature",
      "Education",
      "Curriculum Development",
    ],
    bio: "Dr. Maheshkumar Parmar 'Sparsh' is an educator, researcher, author, and academic leader, currently serving as Principal (I/C) and Assistant Professor of Gujarati at Government Arts and Science College, Godhra. A prolific writer, he has authored over 25 books, with literary works incorporated into school textbooks in Gujarat and Maharashtra, and has served on textbook writing committees and the State Resource Group. He also actively promotes environmental awareness, community service, and educational innovation.",
    honours: [
      "State Best Teacher Award",
      "NCERT National Award",
      "Best Language Teacher Award",
      "Best Principal Award",
      "Gujarat Gaurav Puraskar",
      "Gujarat Sahitya Akademi literary awards",
    ],
    email: "pro.maheshsparsh@gmail.com",
    profileUrl: null,
    photoUrl: null,
    displayOrder: 7,
  },
  {
    id: "bm-08",
    slug: "mohsin-garana",
    fullName: "Dr. Mohsin S. Garana",
    role: "review_board",
    boardGroup: "associate",
    boardRole: "Associate Editor & Reviewer",
    designation: "Assistant Professor",
    affiliation:
      "Shree J.L.K. Kotecha Arts College, Shree Govind Guru University, Godhra, Gujarat",
    country: "India",
    qualifications: [],
    specializations: [
      "Indian Psychology",
      "Clinical Psychology & Mental Health",
      "Social Psychology",
      "Counselling Techniques",
      "Cognitive & Behavioural Analysis",
    ],
    bio: "Dr. Mohsin S. Garana is an academician specialising in Indian Psychology, Clinical Psychology, and Social Psychology, serving as Assistant Professor at Shree J.L.K. Kotecha Arts College, Shree Govind Guru University, Godhra. With over five years of teaching experience, he has contributed to the field through research, mentorship, and academic discourse, focusing on the application of psychological principles in diverse cultural and clinical settings.",
    email: "mohsingarana@gmail.com",
    profileUrl: null,
    photoUrl: null,
    displayOrder: 8,
  },
  {
    id: "bm-09",
    slug: "nilesh-n-gohil",
    fullName: "Mr. Nileshkumar N. Gohil",
    role: "review_board",
    boardGroup: "associate",
    boardRole: "Associate Editor & Reviewer",
    designation: "Assistant Professor",
    affiliation:
      "I.J. Patel M.Ed. College, Sardar Patel University, Vallabh Vidyanagar, Gujarat",
    country: "India",
    qualifications: [],
    specializations: [
      "Educational Technology",
      "Blended Learning",
      "Research Methodology",
      "Teacher Education",
      "Physics Education",
      "Assessment & Evaluation",
    ],
    bio: "Mr. Nileshkumar N. Gohil is an educator specialising in educational technology, blended learning, and experimental research, with five years of experience as an Assistant Professor at I.J. Patel M.Ed. College, affiliated with Sardar Patel University. His academic interests include blended and self-learning, research methodology, teacher education, physics education, and assessment and evaluation. He has presented research at national and international conferences and published on educational technology and effective instructional strategies.",
    email: null,
    // TODO(client): source link pointed to a shared department page also used
    // for another member — confirm correct profile URL.
    profileUrl: "https://ijpmed.ac.in/",
    photoUrl: null,
    displayOrder: 9,
  },
  {
    id: "bm-10",
    slug: "parth-s-kapadia",
    fullName: "Mr. Parth S. Kapadia",
    role: "deputy_chief_editor",
    boardGroup: "deputy-chief",
    boardRole: "Deputy Chief Editor",
    designation: "Assistant Professor of Political Science",
    affiliation: "Maharshi Dayanand Arts and Commerce College, Gujarat",
    country: "India",
    qualifications: [
      "B.E. (Mechanical Engineering)",
      "M.A. (Political Science with Gandhian Studies), IGNOU",
      "GSET",
      "UGC-NET",
      "Ph.D. (Political Science) — pursuing",
    ],
    specializations: [
      "Indian Politics",
      "Democracy & Youth Participation",
      "Rural Development",
      "Panchayati Raj",
      "Electoral Studies",
    ],
    bio: "Mr. Parth S. Kapadia is a young academic and Political Science educator with interdisciplinary qualifications, serving as Assistant Professor of Political Science at Maharshi Dayanand Arts and Commerce College. He holds a B.E. in Mechanical Engineering and a Master's in Political Science with Gandhian Studies (IGNOU), has qualified GSET and UGC-NET, and is pursuing a Ph.D. in Political Science at Hemchandracharya North Gujarat University. His research focuses on Indian politics, democracy, youth participation, Panchayati Raj, and electoral studies, and he has served as an expert with the Chief Electoral Office, Gujarat.",
    email: null,
    profileUrl: "https://in.linkedin.com/in/parth-kapadia-845800171",
    photoUrl: null,
    displayOrder: 2,
  },
  {
    id: "bm-11",
    slug: "sanjaykumar-r-thakor",
    fullName: "Mr. Sanjaykumar R. Thakor",
    role: "review_board",
    boardGroup: "associate",
    boardRole: "Associate Editor & Reviewer",
    designation: "Faculty Member",
    affiliation: "Shri I.J. Patel M.Ed. Course, Mogri, Gujarat",
    country: "India",
    qualifications: [
      "M.Sc. (Organic Chemistry)",
      "M.Ed.",
      "GSET (Education)",
    ],
    specializations: [
      "Science Education",
      "Educational Research",
      "Pedagogy",
      "Curriculum Development",
      "Teacher Training",
    ],
    bio: "Mr. Sanjaykumar R. Thakor is an educator and researcher with qualifications in M.Sc. (Organic Chemistry), M.Ed., and GSET (Education), currently serving as a faculty member at Shri I.J. Patel M.Ed. Course, Mogri. His academic interests include science education, educational research, pedagogy, curriculum development, and teacher training. He has published five research papers and a book chapter and presented at national and international seminars.",
    email: null,
    // TODO(client): same shared link as another member — confirm correct
    // profile URL.
    profileUrl: "https://ijpmed.ac.in/",
    photoUrl: null,
    displayOrder: 11,
  },
  {
    id: "bm-12",
    slug: "mithun-u-khandwala",
    fullName: "Dr. Mithun U. Khandwala",
    // TODO(client): confirm this member's exact role/group — the source file
    // did not specify a role for this journal.
    role: "associate_editor",
    boardGroup: "editor",
    boardRole: "Editorial Board Member",
    designation:
      "Founder, Knowlistic World Learning Foundation; ELT Educator & Teacher Trainer",
    affiliation: "Knowlistic World Learning Foundation",
    country: "India",
    qualifications: [
      "Ph.D. (English Language Teaching)",
      "M.Phil. (English)",
      "M.A. (English)",
      "B.Ed.",
      "TESOL (TCCP, TAAL)",
      "BTSTIW (University of Oregon)",
    ],
    specializations: [
      "English Language Teaching (ELT)",
      "Teacher Training",
      "Professional Development",
    ],
    bio: "Dr. Mithun U. Khandwala is an English educator, teacher trainer, and ELT specialist committed to bringing global best practices in English Language Teaching to local communities. He holds a Ph.D. in English Language Teaching (2016) and TESOL certifications, and has received more than six international ELT scholarships. In 2013 he was invited and awarded the International Visitor Leadership Program (IVLP) by the U.S. Department of State, and he serves as a mentor for U.S. Embassy exchange-alumni initiatives and the British Council's Aptis Action Research Mentoring Scheme.",
    positions: [
      "Founder — Knowlistic World Learning Foundation",
      "Director — BAPS Swaminarayan Vidyamandir (All Girls Residential School)",
      "President & Coordinator, Western India — English Language Teachers' Association of India",
      "Editor — ELT-Vibes International E-Journal (ISSN 2395-0595)",
      "Advisor — Gujarat Secondary and Higher Secondary Education Board",
    ],
    honours: [
      "International Visitor Leadership Program (IVLP), U.S. Department of State, 2013",
      "TESOL Core Certificate Program scholarship (RELO, U.S. Dept. of State)",
      "E-Teacher scholarship, University of Oregon (U.S. Dept. of State)",
      "Commonwealth Scholarship (Canada) nominee, Ministry of HRD, Govt. of India, 2004",
    ],
    publications: [
      "\"The Absurd: A Comparative Study of The Homecoming and The Vultures\", Lambert Academic Publishing (ISBN 978-613-9-99141-9)",
    ],
    email: "mithun.khandwala@cept.ac.in",
    profileUrl: null,
    photoUrl: null,
    displayOrder: 12,
  },
  {
    id: "bm-13",
    slug: "mahesh-b-bharvad",
    fullName: "Dr. Maheshbhai B. Bharvad",
    role: "associate_editor",
    boardGroup: "editor",
    boardRole: "Editor",
    designation: "Assistant Professor, Department of Psychology",
    affiliation: "Sardar Patel University, Vallabh Vidyanagar, Gujarat",
    country: "India",
    qualifications: [
      "Ph.D. (Psychology)",
      "M.Phil. (Psychology)",
      "M.A. (Psychology)",
      "B.Ed. (Geography)",
      "B.A. (Psychology)",
      "B.A. (Geography)",
    ],
    specializations: [
      "Psychological Research",
      "Innovative Teaching Methodologies",
      "Audio-Visual Aids in Education",
      "Holistic Learning",
      "Student Mentoring",
    ],
    bio: "Dr. Maheshbhai B. Bharvad is an accomplished academician and psychologist, currently serving as an Assistant Professor in the Department of Psychology at Sardar Patel University, Vallabh Vidyanagar, where he is actively engaged in teaching, research, student mentoring, and academic development. He holds a Ph.D., M.Phil., and M.A. in Psychology from Sardar Patel University, complemented by a B.Ed. in Geography and bachelor's degrees in Psychology and Geography. He brings extensive administrative and academic experience, having previously served in the Department of Psychology managing departmental records, examinations, student databases, and academic coordination of seminars and conferences. His areas of interest include psychological research, innovative teaching methodologies, the use of audio-visual aids in education, and promoting holistic learning.",
    // TODO(client): confirm this personal email should be shown publicly
    // (prefer an institutional address if available).
    email: "mahesh17585@gmail.com",
    profileUrl: null,
    photoUrl: null,
    displayOrder: 13,
  },
  {
    id: "bm-14",
    slug: "anand-pandya",
    fullName: "Dr. Anand Pandya",
    // TODO(client): confirm role/group — placed in the "Editor" tier by
    // default following the client-supplied pattern for new members.
    role: "associate_editor",
    boardGroup: "editor",
    boardRole: "Editor",
    designation: "Assistant Professor",
    affiliation:
      "M.T.B. Arts College, Veer Narmad South Gujarat University, Surat, Gujarat, India",
    country: "India",
    email: "anandpandya91@gmail.com",
    profileUrl: null,
    // TODO(client): add photo -> public/editorial-board/anand-pandya.jpg
    photoUrl: null,
    displayOrder: 14,
  },
  {
    id: "bm-15",
    slug: "bhavin-gadhvi",
    fullName: "Mr. Bhavin Gadhvi",
    role: "technical_associate",
    boardGroup: "technical",
    boardRole: "Technical Associate",
    designation: "Ph.D. Scholar, Postgraduate Gujarati Department",
    affiliation:
      "Postgraduate Gujarati Department, Sardar Patel University, Vallabh Vidyanagar, Gujarat, India",
    country: "India",
    qualifications: [
      "M.A. (Gujarati), Sardar Patel University",
      "M.Ed., Sardar Patel University",
      "B.Ed., Sardar Patel University",
      "B.A. (Gujarati), Sardar Patel University",
      "GSET (Gujarati)",
      "Ph.D. (Gujarati Literature) — pursuing",
    ],
    specializations: [
      "Gujarati Language & Literature",
      "Chāraṇī Sāhitya (Bardic Literature)",
      "Vīra Rasa Poetry",
      "Literary Research",
      "Academic Publishing Support",
    ],
    bio: "Mr. Bhavin Gadhvi is a scholar of Gujarati language and literature and a doctoral researcher at the Postgraduate Gujarati Department, Sardar Patel University, Vallabh Vidyanagar. He holds an M.A. in Gujarati, an M.Ed., a B.Ed., and a B.A. in Gujarati — all from Sardar Patel University — and has qualified the Gujarat State Eligibility Test (GSET) in Gujarati. He is currently pursuing his Ph.D. under the guidance of Dr. Mahendra K. Nayee on the topic \"Chāraṇī Sāhityamāṁ Vīra Rasa: Eka Adhyayana\" (a study of the heroic sentiment in Chāraṇī literature). He has participated in approximately 57 seminars, conferences and workshops, presented 19 research papers, and published in Shabdasrushti (Gujarat Sahitya Akademi), Mulya Shikshan, and the Ānanyāśāstram e-journal. He supports the journal on production, typesetting and technical publication tasks.",
    // TODO(client): confirm this personal email is acceptable for public
    // display; an institutional address (e.g. @spuvvn.edu) is preferred.
    email: "bagadhvi@gmail.com",
    profileUrl: null,
    // TODO(client): add photo -> public/editorial-board/bhavin-gadhvi.jpg
    photoUrl: null,
    orcid: "0009-0004-9786-3474",
    displayOrder: 15,
  },
  // Chief Editor slot — displayOrder 1 keeps this entry at the top of the
  // "Chief Editor" featured section irrespective of insertion order.
  // TODO(client): supply full profile for Gopal Bharvad — designation,
  // affiliation, qualifications, specialisations, bio, institutional email,
  // profile URL and photo. The fields below are minimal placeholders so the
  // Chief Editor slot renders while awaiting the complete information.
  {
    id: "bm-16",
    slug: "gopal-bharvad",
    fullName: "Dr. Gopal Bharvad",
    role: "editor_in_chief",
    boardGroup: "chief",
    boardRole: "Chief Editor",
    designation: "Chief Editor, Viśvasaṃvid",
    affiliation: "Affiliation to be confirmed",
    country: "India",
    qualifications: [],
    specializations: [],
    bio: "Dr. Gopal Bharvad serves as the Chief Editor of Viśvasaṃvid, leading the journal's editorial policy and final decisions on manuscripts. A detailed academic profile — qualifications, research interests, publications, and institutional affiliation — will be published here shortly.",
    email: null,
    profileUrl: null,
    photoUrl: null,
    displayOrder: 1,
  },
];

export const submissions: Submission[] = [
  { id: "s1", title: "Neural Foundations of Bilingual Reasoning", correspondingAuthor: "Prof. Ananya Iyer", email: "iyer@example.edu", categoryId: "c4", submittedAt: "2026-07-01", status: "under_review" },
  { id: "s2", title: "Micro-Enterprise Resilience during Regulatory Shocks", correspondingAuthor: "Dr. Kabir Fernandes", email: "kabir@example.edu", categoryId: "c3", submittedAt: "2026-07-05", status: "received" },
  { id: "s3", title: "Pedagogies of Care in Higher Education", correspondingAuthor: "Dr. Meera Bhattacharya", email: "meera@example.edu", categoryId: "c1", submittedAt: "2026-07-07", status: "revision_requested" },
  { id: "s4", title: "AI Ethics in South Asian Public Institutions", correspondingAuthor: "Dr. Leila Nakamura", email: "leila@example.jp", categoryId: "c5", submittedAt: "2026-07-10", status: "accepted" },
  { id: "s5", title: "Oral Traditions and Digital Preservation", correspondingAuthor: "Prof. Samuel Ortiz", email: "ortiz@example.es", categoryId: "c2", submittedAt: "2026-07-14", status: "under_review" },
  { id: "s6", title: "Handloom Cooperatives and Wage Equity", correspondingAuthor: "Prof. Sanjay Deshmukh", email: "sdeshmukh@example.edu", categoryId: "c6", submittedAt: "2026-07-18", status: "published" },
  { id: "s7", title: "Contemplative Practices in Teacher Training", correspondingAuthor: "Dr. Nirmala Rao", email: "nrao@example.edu", categoryId: "c1", submittedAt: "2026-07-20", status: "rejected" },
];

export const journalPages: JournalPage[] = [
  { id: "pg1", slug: "about", title: "About the Journal", updatedAt: "2026-06-01", status: "published" },
  { id: "pg2", slug: "aim-and-scope", title: "Aim & Scope", updatedAt: "2026-06-01", status: "published" },
  { id: "pg3", slug: "author-guidelines", title: "Instructions for Authors", updatedAt: "2026-06-01", status: "published" },
  { id: "pg4", slug: "publication-ethics", title: "Publication Ethics", updatedAt: "2026-06-01", status: "published" },
  { id: "pg5", slug: "copyright-policy", title: "Copyright Policy", updatedAt: "2026-06-01", status: "published" },
  { id: "pg6", slug: "peer-review-policy", title: "Peer Review Policy", updatedAt: "2026-06-01", status: "published" },
  { id: "pg7", slug: "privacy-policy", title: "Privacy Policy", updatedAt: "2026-06-01", status: "published" },
  { id: "pg8", slug: "terms", title: "Terms & Conditions", updatedAt: "2026-06-01", status: "published" },
];

export const indexingPartners = [
  "Google Scholar",
  "ROAD",
  "CrossRef (planned)",
  "DOAJ (in review)",
  "Scilit",
  "BASE",
];
