import { CSF_CATEGORIES } from '@/lib/mock-data';
import type { FunctionKey } from '@/lib/mock-data';

export interface ManualSubCategory {
  id: string;
  name: string;
  description: string;
  purpose: string;
  keyQuestions: string[];
}

export interface ManualFunction {
  id: FunctionKey;
  name: string;
  icon: string;
  description: string;
  purpose: string;
  subCategories: ManualSubCategory[];
}

export const NIST_CSF_DATA: ManualFunction[] = [
  {
    id: 'govern',
    name: 'Govern',
    icon: CSF_CATEGORIES.govern.icon,
    description:
      'Fungsi Govern menetapkan dan memantau strategi, ekspektasi, dan kebijakan manajemen risiko keamanan siber organisasi.',
    purpose:
      'Memastikan keamanan siber terintegrasi dengan strategi bisnis dan manajemen risiko perusahaan secara menyeluruh.',
    subCategories: [
      {
        id: 'GV.OC-01',
        name: 'Konteks Organisasi: Misi Organisasi',
        description:
          'Misi organisasi dipahami dan menjadi dasar pengelolaan risiko keamanan siber.',
        purpose:
          'Menyelaraskan prioritas keamanan siber dengan tujuan dan misi utama organisasi.',
        keyQuestions: [
          'Apakah misi organisasi telah didokumentasikan dan dikomunikasikan kepada tim keamanan?',
          'Bagaimana misi organisasi memengaruhi prioritas pengelolaan risiko siber?',
        ],
      },
      {
        id: 'GV.OC-02',
        name: 'Konteks Organisasi: Pemangku Kepentingan',
        description:
          'Pemangku kepentingan internal dan eksternal beserta kebutuhan dan ekspektasinya terkait keamanan siber dipahami dan dipertimbangkan.',
        purpose:
          'Memastikan kebutuhan pemangku kepentingan menjadi masukan dalam strategi keamanan siber.',
        keyQuestions: [
          'Siapa saja pemangku kepentingan utama yang memiliki ekspektasi terhadap keamanan siber organisasi?',
          'Bagaimana ekspektasi pemangku kepentingan dikumpulkan dan ditinjau secara berkala?',
        ],
      },
      {
        id: 'GV.RM-01',
        name: 'Strategi Manajemen Risiko: Tujuan Risiko',
        description:
          'Tujuan manajemen risiko ditetapkan dan disepakati oleh para pemangku kepentingan organisasi.',
        purpose:
          'Memberikan arah yang jelas dan terukur dalam pengelolaan risiko keamanan siber.',
        keyQuestions: [
          'Apakah tujuan manajemen risiko keamanan siber telah ditetapkan secara formal?',
          'Apakah tujuan tersebut telah disepakati oleh pimpinan dan pemangku kepentingan terkait?',
        ],
      },
      {
        id: 'GV.RM-02',
        name: 'Strategi Manajemen Risiko: Selera Risiko',
        description:
          'Selera risiko dan toleransi risiko ditetapkan, dikomunikasikan, dan dipelihara oleh organisasi.',
        purpose:
          'Menetapkan batasan risiko yang dapat diterima sebagai dasar pengambilan keputusan.',
        keyQuestions: [
          'Apakah selera dan toleransi risiko telah didefinisikan secara tertulis?',
          'Bagaimana selera risiko dikomunikasikan kepada pengambil keputusan di seluruh organisasi?',
        ],
      },
    ],
  },
  {
    id: 'identify',
    name: 'Identify',
    icon: CSF_CATEGORIES.identify.icon,
    description:
      'Fungsi Identify membantu organisasi memahami risiko keamanan siber saat ini terhadap aset, sistem, data, dan kapabilitasnya.',
    purpose:
      'Membangun pemahaman menyeluruh tentang aset dan risiko sebagai dasar prioritas upaya keamanan.',
    subCategories: [
      {
        id: 'ID.AM-01',
        name: 'Manajemen Aset: Inventaris Perangkat Keras',
        description:
          'Inventaris perangkat keras yang dikelola organisasi dipelihara secara akurat dan terkini.',
        purpose:
          'Memastikan seluruh perangkat fisik diketahui sehingga dapat dilindungi dan dipantau.',
        keyQuestions: [
          'Apakah organisasi memiliki inventaris perangkat keras yang lengkap dan diperbarui secara berkala?',
          'Bagaimana perangkat baru atau yang dihapus dicatat dalam inventaris?',
        ],
      },
      {
        id: 'ID.AM-02',
        name: 'Manajemen Aset: Inventaris Perangkat Lunak',
        description:
          'Inventaris perangkat lunak, layanan, dan sistem yang dikelola organisasi dipelihara.',
        purpose:
          'Mengetahui seluruh perangkat lunak yang digunakan untuk mengelola kerentanan dan lisensi.',
        keyQuestions: [
          'Apakah seluruh perangkat lunak dan layanan yang digunakan telah terdaftar dalam inventaris?',
          'Bagaimana organisasi mendeteksi perangkat lunak yang tidak sah?',
        ],
      },
      {
        id: 'ID.BE-01',
        name: 'Lingkungan Bisnis: Peran dalam Rantai Pasok',
        description:
          'Peran organisasi dalam rantai pasok dan ekosistem bisnis diidentifikasi dan dikomunikasikan.',
        purpose:
          'Memahami ketergantungan bisnis untuk menilai dampak gangguan keamanan siber.',
        keyQuestions: [
          'Apakah peran organisasi dalam rantai pasok telah dipetakan?',
          'Ketergantungan kritis apa saja yang dimiliki organisasi terhadap pihak ketiga?',
        ],
      },
      {
        id: 'ID.GV-01',
        name: 'Tata Kelola: Kebijakan Keamanan Siber',
        description:
          'Kebijakan keamanan siber organisasi ditetapkan, dikomunikasikan, dan ditegakkan.',
        purpose:
          'Menjadi landasan formal bagi seluruh aktivitas dan kontrol keamanan siber.',
        keyQuestions: [
          'Apakah kebijakan keamanan siber telah disahkan oleh pimpinan?',
          'Bagaimana kepatuhan terhadap kebijakan dipantau dan ditegakkan?',
        ],
      },
    ],
  },
  {
    id: 'protect',
    name: 'Protect',
    icon: CSF_CATEGORIES.protect.icon,
    description:
      'Fungsi Protect mencakup pengamanan untuk mengelola risiko keamanan siber dan mencegah atau mengurangi dampak insiden.',
    purpose:
      'Menerapkan kontrol yang membatasi kemungkinan dan dampak peristiwa keamanan siber.',
    subCategories: [
      {
        id: 'PR.AC-01',
        name: 'Kontrol Akses: Manajemen Identitas dan Kredensial',
        description:
          'Identitas dan kredensial untuk pengguna, layanan, dan perangkat yang sah dikelola sepanjang siklus hidupnya.',
        purpose:
          'Memastikan hanya entitas yang terverifikasi yang dapat mengakses sistem dan data.',
        keyQuestions: [
          'Bagaimana proses pembuatan, perubahan, dan pencabutan kredensial dikelola?',
          'Apakah autentikasi multifaktor diterapkan pada akun dengan hak istimewa?',
        ],
      },
      {
        id: 'PR.AC-02',
        name: 'Kontrol Akses: Pengelolaan Akses Fisik',
        description:
          'Akses fisik ke aset dikelola, dipantau, dan ditegakkan sesuai dengan risiko.',
        purpose:
          'Melindungi aset dari akses fisik yang tidak sah.',
        keyQuestions: [
          'Apakah akses ke ruang server dan area sensitif dibatasi dan dicatat?',
          'Bagaimana akses fisik tamu dan vendor dikendalikan?',
        ],
      },
      {
        id: 'PR.DS-01',
        name: 'Keamanan Data: Perlindungan Data Tersimpan',
        description:
          'Kerahasiaan, integritas, dan ketersediaan data tersimpan dilindungi.',
        purpose:
          'Mencegah kebocoran atau perubahan data yang tidak sah pada media penyimpanan.',
        keyQuestions: [
          'Apakah data sensitif yang tersimpan telah dienkripsi?',
          'Bagaimana integritas data tersimpan diverifikasi?',
        ],
      },
      {
        id: 'PR.AT-01',
        name: 'Kesadaran dan Pelatihan: Pelatihan Personel',
        description:
          'Personel diberikan kesadaran dan pelatihan agar memiliki pengetahuan dan keterampilan menjalankan tugas terkait keamanan siber.',
        purpose:
          'Mengurangi risiko akibat kesalahan manusia melalui peningkatan kompetensi.',
        keyQuestions: [
          'Apakah seluruh personel mengikuti pelatihan kesadaran keamanan secara berkala?',
          'Bagaimana efektivitas pelatihan diukur?',
        ],
      },
    ],
  },
  {
    id: 'detect',
    name: 'Detect',
    icon: CSF_CATEGORIES.detect.icon,
    description:
      'Fungsi Detect memungkinkan penemuan dan analisis tepat waktu terhadap anomali, indikator kompromi, dan peristiwa berpotensi merugikan.',
    purpose:
      'Menemukan serangan dan kompromi secepat mungkin untuk memungkinkan respons yang efektif.',
    subCategories: [
      {
        id: 'DE.AE-01',
        name: 'Anomali dan Peristiwa: Analisis Aktivitas',
        description:
          'Aktivitas dan peristiwa yang berpotensi merugikan dianalisis untuk memahami karakteristiknya.',
        purpose:
          'Membedakan aktivitas normal dari aktivitas yang mencurigakan.',
        keyQuestions: [
          'Apakah baseline aktivitas normal jaringan dan sistem telah ditetapkan?',
          'Bagaimana penyimpangan dari baseline dianalisis?',
        ],
      },
      {
        id: 'DE.AE-02',
        name: 'Anomali dan Peristiwa: Korelasi Informasi',
        description:
          'Informasi dari berbagai sumber dikorelasikan untuk memahami dan mendeteksi peristiwa keamanan.',
        purpose:
          'Meningkatkan akurasi deteksi melalui penggabungan data dari banyak sumber.',
        keyQuestions: [
          'Apakah log dari berbagai sistem dikumpulkan dan dikorelasikan secara terpusat?',
          'Bagaimana peristiwa dari sumber berbeda dihubungkan menjadi satu insiden?',
        ],
      },
      {
        id: 'DE.CM-01',
        name: 'Pemantauan Berkelanjutan: Pemantauan Jaringan',
        description:
          'Jaringan dan layanan jaringan dipantau untuk menemukan peristiwa yang berpotensi merugikan.',
        purpose:
          'Mendeteksi aktivitas berbahaya pada lalu lintas jaringan secara berkelanjutan.',
        keyQuestions: [
          'Apakah lalu lintas jaringan dipantau secara real-time?',
          'Alat apa yang digunakan untuk mendeteksi aktivitas jaringan yang tidak wajar?',
        ],
      },
    ],
  },
  {
    id: 'respond',
    name: 'Respond',
    icon: CSF_CATEGORIES.respond.icon,
    description:
      'Fungsi Respond mencakup tindakan yang diambil terkait insiden keamanan siber yang terdeteksi.',
    purpose:
      'Menahan dampak insiden dan memulihkan kendali secara terkoordinasi.',
    subCategories: [
      {
        id: 'RS.RP-01',
        name: 'Perencanaan Respons: Pelaksanaan Rencana',
        description:
          'Rencana respons insiden dijalankan secara terkoordinasi dengan pihak terkait ketika insiden terjadi.',
        purpose:
          'Memastikan respons insiden berjalan terstruktur dan tidak improvisatif.',
        keyQuestions: [
          'Apakah organisasi memiliki rencana respons insiden yang terdokumentasi?',
          'Kapan terakhir kali rencana tersebut diuji atau dilatihkan?',
        ],
      },
      {
        id: 'RS.CO-01',
        name: 'Komunikasi: Koordinasi Personel',
        description:
          'Personel mengetahui peran dan urutan tindakan mereka ketika respons insiden diperlukan.',
        purpose:
          'Menghindari kebingungan dan keterlambatan dalam penanganan insiden.',
        keyQuestions: [
          'Apakah setiap personel mengetahui perannya dalam penanganan insiden?',
          'Bagaimana jalur komunikasi internal dan eksternal ditetapkan saat insiden?',
        ],
      },
      {
        id: 'RS.AN-01',
        name: 'Analisis: Investigasi Notifikasi',
        description:
          'Notifikasi dari sistem deteksi diinvestigasi untuk menentukan sifat dan dampak insiden.',
        purpose:
          'Memahami penyebab dan cakupan insiden guna menentukan tindakan yang tepat.',
        keyQuestions: [
          'Bagaimana notifikasi keamanan ditriase dan diprioritaskan?',
          'Apakah akar penyebab insiden dianalisis dan didokumentasikan?',
        ],
      },
    ],
  },
  {
    id: 'recover',
    name: 'Recover',
    icon: CSF_CATEGORIES.recover.icon,
    description:
      'Fungsi Recover mendukung pemulihan tepat waktu terhadap operasi normal untuk mengurangi dampak insiden keamanan siber.',
    purpose:
      'Mengembalikan layanan dan kapabilitas yang terdampak insiden secara cepat dan terkendali.',
    subCategories: [
      {
        id: 'RC.RP-01',
        name: 'Perencanaan Pemulihan: Pelaksanaan Rencana',
        description:
          'Rencana pemulihan dijalankan selama atau setelah insiden keamanan siber.',
        purpose:
          'Memastikan pemulihan sistem dan data berjalan sesuai prioritas bisnis.',
        keyQuestions: [
          'Apakah rencana pemulihan telah mencakup sistem dan data kritis?',
          'Apakah cadangan data diuji secara berkala untuk memastikan dapat dipulihkan?',
        ],
      },
      {
        id: 'RC.CO-01',
        name: 'Komunikasi: Hubungan Masyarakat',
        description:
          'Aktivitas pemulihan dan komunikasi publik dikelola untuk menjaga reputasi organisasi.',
        purpose:
          'Menjaga kepercayaan pemangku kepentingan selama dan setelah pemulihan.',
        keyQuestions: [
          'Siapa yang bertanggung jawab atas komunikasi publik selama pemulihan?',
          'Bagaimana status pemulihan dikomunikasikan kepada pemangku kepentingan?',
        ],
      },
    ],
  },
];

export const TOTAL_MANUAL_SUBCATEGORIES: number = NIST_CSF_DATA.reduce(
  (total, fn) => total + fn.subCategories.length,
  0
);

export function findManualSubCategory(id: string): ManualSubCategory | null {
  for (const fn of NIST_CSF_DATA) {
    const found = fn.subCategories.find((sub) => sub.id === id);
    if (found) return found;
  }
  return null;
}

export function findManualFunctionBySubCategory(
  subCategoryId: string
): ManualFunction | null {
  return (
    NIST_CSF_DATA.find((fn) =>
      fn.subCategories.some((sub) => sub.id === subCategoryId)
    ) ?? null
  );
}
