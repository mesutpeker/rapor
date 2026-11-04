// ==================== Teacher Types ====================
export interface Teacher {
  id: string;
  fullName: string;
  branch: string;
  isClassTeacher: boolean;
}

export type ChairpersonTitle = 'Okul Müdürü' | 'Müdür Yardımcısı';

// ==================== Meeting Types ====================
export type GradeLevel = 9 | 10 | 11 | 12;

// Ortaöğretim ŞÖK düzenli takvimi (Yönerge Madde 10/(2)): Kasım ve Nisan.
// sene-sonu: ihtiyaç hâlinde / yıl sonu karar sonuçlarının değerlendirilmesi.
export type MeetingPeriod = 'kasim' | 'nisan' | 'sene-sonu';

export type AchievementLevelId =
  | 'veryHigh'
  | 'high'
  | 'medium'
  | 'needsSupport'
  | 'low'
  | 'mixed';

export interface MeetingInfo {
  schoolName: string;
  academicYear: string;
  // Toplantı dönemi — içerik üretimini yönlendiren ana alan.
  period: MeetingPeriod;
  // Görünen dönem etiketi (ör. "1. Dönem"). period'tan türetilir.
  term: string;
  date: string;
  time: string;
  location: string;
  className: string;
  gradeLevel: GradeLevel;
  classAchievementLevel: AchievementLevelId;
  // Kurul başkanı: müdür veya görevlendirdiği müdür yardımcısı (Madde 10/(4)).
  chairpersonName: string;
  chairpersonTitle: ChairpersonTitle;
  // Tutanağı yazan öğretmen (üye listesinden seçilir).
  clerkId: string;
  // Kararları onaylayan okul müdürü (Madde 10/(7)).
  principalName: string;
}

// ==================== Agenda Types ====================
export type SpeakerCountMode = 'two' | 'three' | 'four' | 'random';

// Gündem maddesinin konu kategorisi. 'auto' (veya tanımsız) → başlıktan otomatik
// tahmin edilir; diğer değerler kullanıcının elle seçtiği konu türüdür.
export type AgendaCategory =
  | 'auto'
  | 'akademik-basari'
  | 'devamsizlik'
  | 'davranis-disiplin'
  | 'motivasyon-katilim'
  | 'sosyal-duygusal'
  | 'olcme-degerlendirme'
  | 'veli-iletisim'
  | 'destekleme'
  | 'ogretim-programi'
  | 'kaynastirma'
  | 'etkinlik-sosyal'
  | 'degerler-egitimi'
  | 'okul-sagligi-isg'
  | 'dilek-temenniler'
  | 'genel'
  | 'acilis'
  | 'kapanis';

export interface AgendaItem {
  id: string;
  title: string;
  enabled: boolean;
  speakerCountMode: SpeakerCountMode;
  // Konu türü. Tanımsız veya 'auto' ise başlıktan otomatik belirlenir.
  category?: AgendaCategory;
}

// ==================== Student evaluation (KVKK-aware) ====================
// Tam kimlik / sağlık / aile ayrıntısı yerine gözlenebilir eğitimsel durum.
export interface StudentEvaluation {
  id: string;
  // Örn. "A.Y." veya yalnızca ad; T.C. / tam liste zorunlu değildir.
  studentLabel: string;
  observation: string;
  measure: string;
}

// ==================== Generation Settings ====================
export type ToneType = 'official' | 'balanced' | 'detailed';
export type SpeechLengthType = 'short' | 'medium' | 'long';

export interface GenerationSettings {
  variationMode: 'random' | 'manual';
  variationId: number;
  tone: ToneType;
  speechLength: SpeechLengthType;
}

// ==================== Minutes Types ====================
export interface TeacherSpeech {
  teacherId: string;
  teacherName: string;
  branch: string;
  content: string;
}

export interface DecisionRecord {
  text: string;
  responsible: string;
  followUp: string;
}

export interface AgendaMinutes {
  agendaId: string;
  agendaTitle: string;
  agendaNumber: number;
  speeches: TeacherSpeech[];
  decisions: DecisionRecord[];
  // Konuşma içermeyen (açılış / kapanış gibi) maddeler için düz anlatı metni.
  bodyText?: string;
}

export interface GeneratedMinutes {
  id: string;
  title: string;
  meetingInfo: MeetingInfo;
  teachers: Teacher[];
  // Numaralı gündem özeti (görüşmelerden önce).
  agendaSummary: string[];
  studentEvaluations: StudentEvaluation[];
  agendaMinutes: AgendaMinutes[];
  closingText: string;
  generatedAt: string;
  variationId: number;
  clerkName: string;
}

// ==================== Data Structure Types ====================
export interface GradeVariation {
  id: number;
  title: string;
  focus: string;
  keywords: string[];
  agendaHints: Record<string, string[]>;
  speechTemplates: Record<string, string[]>;
  decisionTemplates: string[];
}

export interface GradeProfile {
  level: GradeLevel;
  label: string;
  variations: GradeVariation[];
}

export interface AchievementLevelVersion {
  versionId: number;
  positiveEmphasis: string[];
  commonIssues: string[];
  decisionHints: string[];
  speechModifiers: string[];
}

export interface AchievementLevel {
  id: AchievementLevelId;
  label: string;
  description: string;
  academicTone: string;
  versions: AchievementLevelVersion[];
}

export interface BranchSpeechStyle {
  branch: string;
  focusAreas: string[];
  sentenceStarters: string[];
  suggestions: string[];
  agendaRelevance: Record<string, number>;
}
